import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import { compare } from "bcrypt";
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const GOOGLE_ID = process.env.GOOGLE_ID!;
const GOOGLE_SECRET = process.env.GOOGLE_SECRET!;

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "hello@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user) {
                    return null;
                }

                if (!user.password){
                    return null;
                }

                const valid = await compare(credentials.password, user.password);
                if (!valid) {
                    return null;
                }

                const userData = { ...user, id: user.id + "" };
                console.log("Authorize", userData);
                return userData;
            },
        }),
        GoogleProvider({
            clientId: GOOGLE_ID,
            clientSecret: GOOGLE_SECRET,
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    isVerified: token.isVerified,
                    image: token.image as string | null | undefined, // Use "image" for consistency
                    phone_number: token.phone_number,
                    created_at: token.created_at,
                },
            };
        },
        async jwt({ token, user, account, profile }) {
        
            // Handle Google Sign-In (or other OAuth providers)
            if (account?.provider === "google" && profile) {
                const email = profile.email as string;
                const name = profile.name as string;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const picture = (profile as any).picture || null; // Cast to access the picture property safely
        
                // Perform an upsert operation in the database
                const dbUser = await prisma.user.upsert({
                    where: { email },
                    update: {
                        name: name || "Unnamed User",
                        image: picture,
                    },
                    create: {
                        email,
                        name: name || "Unnamed User",
                        image: picture,
                        password: "", // OAuth users won't have a password
                        isVerified: true, // Assuming Google users are verified
                    },
                });
        
                // Attach user info to the token
                token.id = dbUser.id;
                token.isVerified = dbUser.isVerified;
                token.image = dbUser.image;
                token.phone_number = dbUser.phone_number;
                token.created_at = dbUser.created_at;
            }
        
            // Handle email/password login
            if (user) {
                const u = user as unknown as User;
                token.id = u.id;
                token.isVerified = u.isVerified;
                token.image = u.image;
                token.phone_number = u.phone_number;
                token.created_at = u.created_at;
            }
        
            return token;
        }
        
    },
    
};

const handle = NextAuth(authOptions);
export { handle as GET, handle as POST };


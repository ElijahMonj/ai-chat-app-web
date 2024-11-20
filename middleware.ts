import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define paths that should bypass authentication
const publicPaths = ["/login", "/register"];
// Define API routes that require authentication
const protectedApiRoutes = ["/api/create", "/api/getprompt", "/api/getresponse", "/api/upload"];

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Check if the request is for a public path
    if (publicPaths.some(path => pathname.startsWith(path))) {
        return NextResponse.next(); // Allow access to public paths
    }

    // Check if the request is for a protected API route
    if (protectedApiRoutes.some(path => pathname.startsWith(path))) {
        const token = await getToken({ req });

        // If the token doesn't exist, redirect to the login page
        if (!token) {
            const loginUrl = new URL("/login", req.url);
            loginUrl.searchParams.set("callbackUrl", req.url); // Redirect back after login
            return NextResponse.redirect(loginUrl);
        }
    }

    // Allow other requests to pass through
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!_next/static|favicon.ico).*)", // Apply middleware to all routes except static files
    ],
};

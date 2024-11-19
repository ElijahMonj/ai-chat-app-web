export { default } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define paths that should bypass authentication
const publicPaths = ["/login", "/register"];

export function middleware(req: NextRequest) {
    // Check if the request is for a public path
    if (publicPaths.some(path => req.nextUrl.pathname.startsWith(path))) {
        return NextResponse.next(); // Skip auth middleware for public paths
    }

    // Let NextAuth middleware handle other routes
    return NextResponse.rewrite(req.url);
}

export const config = {
    matcher: ["/((?!_next/static|favicon.ico).*)"], // Apply middleware to all routes except static files
};
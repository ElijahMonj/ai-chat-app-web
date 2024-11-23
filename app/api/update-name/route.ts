import getCurrentUser from "@/app/actions/getCurrentUser";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        // Parse the incoming request
        const { id, name } = await request.json();

        // Validate input
        if (!id || !name) {
            return NextResponse.json({ message: "Invalid data" }, { status: 400 });
        }

        // Retrieve the authenticated user's ID from the request headers (set in middleware)
        const user = await getCurrentUser()

        // Ensure the authenticated user can only modify their own data
        if (user && user.id !== id) {
            return NextResponse.json(
                { message: "You can only update your own profile" },
                { status: 403 }
            );
        }

        // Update the user's name in the database
        const updatedUser = await prisma.user.update({
            where: { id },
            data: { name },
        });

        return NextResponse.json({ message: "Name updated successfully", updatedUser });
    } catch (error) {
        console.error("Error updating name:", error);
        return NextResponse.json(
            { message: "Error updating name", error: (error as Error).message },
            { status: 500 }
        );
    }
}

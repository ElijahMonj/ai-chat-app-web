import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import getCurrentUser from "@/app/actions/getCurrentUser";

// Handler for the POST request
export async function POST(request: Request) {
    try {
        // Parse the request payload
        const { id, isPublic } = await request.json();

        // Validate the payload
        if (typeof id !== "number" || typeof isPublic !== "boolean") {
            return NextResponse.json(
                { message: "Invalid payload" },
                { status: 400 }
            );
        }

        // Get the current user's session
        const user = await getCurrentUser()

        // Check if the user is authenticated
        if (!user || !user || !user.id) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        // Fetch the AI from the database to verify ownership
        const ai = await prisma.aI.findUnique({
            where: { id },
        });

        if (!ai) {
            return NextResponse.json(
                { message: "AI not found" },
                { status: 404 }
            );
        }

        // Check if the current user is the owner of the AI
        if (ai.creatorId !== user.id) {
            return NextResponse.json(
                { message: "Forbidden: You do not own this AI" },
                { status: 403 }
            );
        }

        // Update the AI's public status in the database
        const updatedAI = await prisma.aI.update({
            where: { id },
            data: { isPublic },
        });

        return NextResponse.json({ message: "AI updated successfully", updatedAI });
    } catch (error) {
        console.error("Error updating AI:", error);
        return NextResponse.json(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-expect-error
            { message: "Error updating AI", error: error.message },
            { status: 500 }
        );
    }
}

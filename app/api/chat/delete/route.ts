import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function DELETE(request: Request) {
    try {
        // Parse the request body
        const { chatId } = await request.json();

        if (typeof chatId !== "number") {
            return NextResponse.json(
                { message: "Invalid chat ID" },
                { status: 400 }
            );
        }

        // Get the current user's session
        const user = await getCurrentUser()

        // Ensure the user is authenticated
        if (!user || !user.id) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        // Find the chat to ensure it exists and belongs to the user
        const chat = await prisma.chat.findUnique({
            where: { id: chatId },
        });

        if (!chat) {
            return NextResponse.json(
                { message: "Chat not found" },
                { status: 404 }
            );
        }

        if (chat.userId !== user.id) {
            return NextResponse.json(
                { message: "Forbidden: You do not own this chat" },
                { status: 403 }
            );
        }

        // Delete the chat
        await prisma.chat.delete({
            where: { id: chatId },
        });

        return NextResponse.json({ message: "Chat deleted successfully" });
    } catch (error) {
        console.error("Error deleting chat:", error);
        return NextResponse.json(
            { message: "Error deleting chat", error: (error as Error).message },
            { status: 500 }
        );
    }
}

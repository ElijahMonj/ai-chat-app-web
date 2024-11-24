import getCurrentUser from "@/app/actions/getCurrentUser";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

import ChatBox from "./Components/ChatBox";
import { User } from "@prisma/client";

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params;

    const user = await getCurrentUser();

    // Fetch AI details from the database
    const ai = await prisma.aI.findUnique({
        where: { id: parseInt(id) },
        include: { creator: true }, // Include related fields if needed
    });

    if (!ai || (ai.creatorId !== user?.id && !ai.isPublic)) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <h2 className="text-3xl font-bold">Pal Not Found</h2>
                    <p className=" mt-2">
                        The Pal with ID <span className="font-semibold">{id}</span> does not exist.
                    </p>
                    <Link href="/explore" className="btn btn-primary mt-4">
                       Explore Pals
                    </Link>
                </div>
            </div>
        );
    }
    if (!user) return null;

    // Check if the chat already exists
    let chat = await prisma.chat.findFirst({
        where: {
            userId: user?.id || 0, // Fallback for safety
            aiId: parseInt(id),
        },
        include: {
            messages: true, // Include messages if needed
        },
    });

    // If no chat exists, create it
    if (!chat) {
        chat = await prisma.chat.create({
            data: {
                user: {
                    connect: {
                        id: user?.id,
                    },
                },
                ai: {
                    connect: {
                        id: parseInt(id),
                    },
                },
            },
            include: {
                messages: true,
            },
        });

        // Add the first message from the AI
        if (ai?.greeting) {
            await prisma.message.create({
                data: {
                    chat: {
                        connect: {
                            id: chat.id,
                        },
                    },
                    sender: ai.name,
                    content: ai.greeting,
                },
            });

            // Re-fetch the chat to include the new message
            chat = await prisma.chat.findUnique({
                where: {
                    id: chat.id,
                },
                include: {
                    messages: true,
                },
            });
        }
    }

    return (
        <div className="container px-auto max-w-4xl">
            {chat && <ChatBox ai={ai} user={user as User} chat={chat} />}
        </div>
    );
}

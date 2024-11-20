import { prisma } from "@/lib/prisma";
import { getGroqChatCompletion } from "@/utils/groq";


type PreviousMessages = {
    role: "assistant" | "user";
    content: string;
}[];



export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { message, ai, chatId, user } = body;

        // Validate input
        if (!message || !ai || !chatId || !user) {
            return new Response("Invalid request data", { status: 400 });
        }

        // Fetch chat and include messages
        const chat = await prisma.chat.findUnique({
            where: { id: chatId },
            include: { messages: true },
        });

        if (!chat) {
            return new Response("Chat not found", { status: 404 });
        }

        // Convert chat messages to the required format
        const previousMessages: PreviousMessages = chat.messages.map((msg) => ({
            role: msg.sender === ai.name ? "assistant" : "user",
            content: msg.content,
        }));

        // Generate response from Groq
        const chatCompletion = await getGroqChatCompletion(previousMessages, ai, message);
        const aiResponse = chatCompletion.choices[0]?.message?.content;

        if (!aiResponse) {
            return new Response("AI response is empty or invalid", { status: 500 });
        }

        // Save both user and AI messages in a transaction
        await prisma.$transaction([
            prisma.message.create({
                data: {
                    chat: { connect: { id: chatId } },
                    sender: user,
                    content: message,
                },
            }),
            prisma.message.create({
                data: {
                    chat: { connect: { id: chatId } },
                    sender: ai.name,
                    content: aiResponse,
                },
            }),
        ]);

        // Respond with the AI's message
        return new Response(
            JSON.stringify({
                success: true,
                aiResponse,
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error handling chat POST:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}


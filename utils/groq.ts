
import { AI } from "@prisma/client";
import Groq from "groq-sdk";

type PreviousMessages = {
    role: "assistant" | "user";
    content: string;
}[];

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
export const getGroqChatCompletion = async (previousMessages: PreviousMessages, ai: AI, message: string) => {
    return groq.chat.completions.create({
        messages: [
            { role: "system", content: ai.prompt },
            ...previousMessages,
            { role: "user", content: message },
        ],
        model: "llama3-8b-8192",
        temperature: 0.5,
        max_tokens: 1024,
        top_p: 1,
        stop: null,
        stream: false,
    });
};

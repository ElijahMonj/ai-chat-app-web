'use client'
import {User} from '@prisma/client'
import AiChatBubble from './AiChatBubble';
import UserChatBubble from './UserChatBubble';
import Input from './Input';
import Image from 'next/image';
import { useState } from 'react';
import AiChatBubblePending from './AiChatBubblePending';

interface ChatBoxProps {
    user: User;
    ai: {
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
        description: string;
        creatorId: number | null;
        isPublic: boolean;
        prompt: string;
        tagline: string;
        greeting: string;
        avatar: string;
        creator: {
            id: number;
            name: string;
        } | null;
    };
    chat: {
        id: number;
        userId: number;
        aiId: number;
        created_at: Date;
        messages: {
            id: number;
            chatId: number;
            sender: string;
            content: string;
            created_at: Date;
        }[];
    };
}

const ChatBox: React.FC<ChatBoxProps> = ({ ai, chat, user }) => {

    const [newMessage, setNewMessage] = useState<string>("");
    const [isPending, setIsPending] = useState(false);
    const [messages, setMessages] = useState(chat.messages);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsPending(true);
        
        if (newMessage.trim() === "") {
            console.log("Cannot send an empty message.");
            return;
        }
        setNewMessage("");
        setMessages(prevMessages => [
            ...prevMessages,
            { id: prevMessages.length + 1, chatId: chat.id, sender: user.name, content: newMessage, created_at: new Date() }
        ]);
        const body = {
            message: newMessage,
            ai: ai,
            chatId: chat.id,
            user: user.name,
        }
       
        const res = await fetch("/api/getresponse", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Make sure to set headers for JSON body
            },
            body: JSON.stringify(body),
        });
        
        if (!res.ok) {
            // Handle error if the response is not OK
            console.error('Failed to fetch response');
            return;
        }
        
        // Parse the JSON response from the API
        const responseData = await res.json();
        
        const aiResponse = responseData.aiResponse;
        setMessages(prevMessages => [
            ...prevMessages,
            { id: prevMessages.length + 2, chatId: chat.id, sender: ai.name, content: aiResponse, created_at: new Date() }
        ]);
       
        setIsPending(false);
    };

    return (
        <div className="flex flex-col max-w-xl mx-auto px-3 min-h-screen py-5">
            <div className="flex flex-col items-center">
                <Image
                    src={ai.avatar}
                    alt={ai.name}
                    className="w-16 h-16 rounded-full shadow-md"
                    width={64}
                    height={64}
                />
                <h1 className="font-bold">{ai.name}</h1>
                <p className="text-xs">by {ai.creator?.name}</p>
            </div>
            <div className="flex-1">
                {messages.map((message,index) => {
                    if (message.sender === ai.name) {
                        return <AiChatBubble key={index} message={message} ai={ai} />;
                    } else {
                        return <UserChatBubble key={index} message={message} />;
                    }
                })}
                {isPending && <AiChatBubblePending ai={ai} />}
            </div>

            <Input 
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                isPending={isPending}
                setIsPending={setIsPending}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

export default ChatBox;

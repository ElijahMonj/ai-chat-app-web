import { Message } from "@prisma/client";
import Link from "next/link";

interface AiChatBubbleProps {
    message: Message;
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
}

const AiChatBubble: React.FC<AiChatBubbleProps> = ({ message, ai }) => {
    // Sample parsing function to split response into structured sections
    const parseResponse = (content: string) => {
        const sections = content.split("**"); // Example splitting by bold markers
        return sections.map((section, index) => (
            <p key={index} className="mb-2">
                {section.trim()}
            </p>
        ));
    };

    return (
        <div className="chat chat-start">
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <Link href={"/ai/" + ai.id}>
                        <img alt={ai.name} src={ai.avatar} />
                    </Link>
                </div>
            </div>
            <div className="chat-header">{message.sender}</div>
            <div className="chat-bubble">
                <div className="structured-response">
                    {parseResponse(message.content)}
                </div>
            </div>
        </div>
    );
};

export default AiChatBubble;

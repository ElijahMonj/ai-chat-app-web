import { Message } from "@prisma/client";

interface AiChatBubbleProps {
    message:Message
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
const AiChatBubble: React.FC<AiChatBubbleProps> = ({message,ai}) => {
    return ( 
        <div className="chat chat-start">
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                <img
                    alt={ai.name}
                    src={ai.avatar}
                />
                </div>
            </div>
            <div className="chat-header">
                {message.sender}     
            </div>
            <div className="chat-bubble">{message.content}</div>
        </div>
     );
}
 
export default AiChatBubble;
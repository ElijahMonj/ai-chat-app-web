interface AiChatBubblePendingProps {
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

const AiChatBubblePending: React.FC<AiChatBubblePendingProps> = ({ai}) => {
    return ( 
        <div className="chat chat-start">
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                <img
                    alt={ai.name}
                    src={ai.avatar} />
                </div>
            </div>
            <div className="chat-header">
                Obi-Wan Kenobi    
            </div>
            <div className="chat-bubble"><span className="loading loading-dots loading-md"></span></div>
        </div>
    );
}
 
export default AiChatBubblePending;
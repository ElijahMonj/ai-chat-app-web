import { Message } from "@prisma/client";

interface UserChatBubbleProps {
     message:Message   
    }

const UserChatBubble: React.FC<UserChatBubbleProps> = ({message}) => {
    return ( 
        <div className="chat chat-end">
            <div className="chat-bubble chat-bubble-primary">{message.content}</div>          
        </div>
     );
}
 
export default UserChatBubble;
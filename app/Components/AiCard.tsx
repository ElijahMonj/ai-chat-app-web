import { AI } from "@prisma/client";

interface AiCardProps {
    data:Omit<AI, "created_at" | "updated_at" | "chats">
}
const AiCard: React.FC<AiCardProps> = ({data}) => {
    return ( 
        <div className="card bg-base-200 shadow-xl hover:bg-base-300 select-none cursor-pointer transition-transform transform hover:scale-105">
        <figure className="px-10 pt-10">
          <img
            src={data.avatar}
            alt="Shoes"
            className="rounded-xl" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{data.name}</h2>
           <p className="text-sm text-gray-500 break-all">By @monjardinelijah120@gmail.com</p>
          <p>{data.description}</p>
          
        </div>
      </div>
     );
}
 
export default AiCard;
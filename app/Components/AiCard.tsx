import { AI } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface AiCardProps {
    data:Omit<AI, "created_at" | "updated_at" | "chats">
}
const AiCard: React.FC<AiCardProps> = ({data}) => {
    return ( 
      <Link href={`/ai/${data.id}`}
        className="card bg-base-200 shadow-xl hover:bg-base-300 select-none cursor-pointer transition-transform transform hover:scale-105">
        <figure className="px-10 pt-10">
          <div className="w-32 h-32 relative">
            <Image
              src={data.avatar}
              alt="Avatar"
              className="rounded-xl object-cover"
              fill // Makes the image fill its container
            />
          </div>
        </figure>
        <div className="card-body">
          <h2 className="card-title">{data.name}</h2>
          <p className="text-sm break-all">By @monjardinelijah120@gmail.com</p>
          <p>{data.description}</p>
        </div>
      </Link>
     );
}
 
export default AiCard;

import Image from "next/image";
import Link from "next/link";

interface AiCardProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
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
          <p className="text-sm break-all">By {data.creator.email}</p>
          <p>{data.tagline}</p>
        </div>
      </Link>
     );
}
 
export default AiCard;
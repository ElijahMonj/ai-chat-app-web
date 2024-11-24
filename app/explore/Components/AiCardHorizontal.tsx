
import Image from "next/image";
import Link from "next/link";

interface AiCardHorizontalProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
}
const AiCardHorizontal: React.FC<AiCardHorizontalProps> = ({data}) => {
    return ( 
        <Link
        href={`/ai/${data.id}`}
        key={data.id}
        className="flex items-center gap-4 p-4 bg-base-200 rounded-lg shadow-sm hover:bg-base-300 transition my-3"
        >
            {/* Image Container */}
            <div className="w-16 h-16 relative rounded-lg overflow-hidden flex-shrink-0">
                <Image
                    src={data.avatar}
                    alt="AI Image"
                    fill
                    className="object-cover"
                />
            </div>
            {/* Text Container */}
            <div className="flex-1">
                <h5 className="text-md font-semibold truncate">{data.name}</h5>
                <p className="text-xs line-clamp-2">
                    {data.tagline}
                </p>
                <p className="text-xs line-clamp-2 mt-3 break-all">
                    Description: {data.description} 
                </p>
            </div>
            
        </Link>
     );
}
 
export default AiCardHorizontal;
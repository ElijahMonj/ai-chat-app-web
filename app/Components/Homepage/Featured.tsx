import { prisma } from "@/lib/prisma";
import AiCard from "../AiCard";

const Featured = async () => {
    const ais = await prisma.aI.findMany({
        include: { creator: true },
        where: {
            isPublic: true,
            id: {
                in: [1, 7, 4, 2], // IDs you want to fetch
            },
        },
    });
    
    return ( 
        <div className="px-4">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Featured</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {ais.map((ai) => (
                    <AiCard data={ai} key={ai.id} />
                ))}
              </div>
          </div>
     );
}
 
export default Featured;
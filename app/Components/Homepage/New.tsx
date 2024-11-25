import AiCardHorizontal from "@/app/explore/Components/AiCardHorizontal";
import { prisma } from "@/lib/prisma";

const New = async () => {

    const ais = await prisma.aI.findMany({
        take: 6,
        include: { creator: true },
        where: {
            isPublic: true,
        },
        orderBy: {
            created_at: 'desc', // Orders by created_at in descending order
        },
    });

    return ( 
        <div className="px-4">
            <h2 className="text-xl md:text-2xl font-bold mb-4">New</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ais.map((ai) => (
                    <AiCardHorizontal data={ai} key={ai.id} />
                ))}
               
              </div>
          </div>
     );
}
 
export default New;
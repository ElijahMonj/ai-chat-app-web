
import { prisma } from '@/lib/prisma';
import AiCardHorizontal from './Components/AiCardHorizontal';

const ExplorePage = async () => {
    // Fetch public AIs with their creator details
    const ais = await prisma.aI.findMany({
        where: {
            isPublic: true,
        },
        include: {
            creator: true,
        },
    });

    return (ais.length === 0 ? (
                <p className="text-center">No Pals found. Check back later!</p>
            ) : (
                <div className="max-w-2xl mx-auto">
                    {ais.map((ai) => (
                        <AiCardHorizontal key={ai.id} data={ai} />
                    ))}
                </div>
            )
    );
};

export default ExplorePage;

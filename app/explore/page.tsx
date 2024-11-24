
import { prisma } from '@/lib/prisma';
import AiCard from '../Components/AiCard';

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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ais.map((ai) => (
                        <AiCard key={ai.id} data={ai} />
                    ))}
                </div>
            )
    );
};

export default ExplorePage;

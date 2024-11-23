
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

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6 text-center">Explore AIs</h1>
            <div className="flex justify-center mb-6">
                <label className="input input-bordered flex items-center gap-2 max-w-sm w-full">
                <input type="text" className="grow" placeholder="Search" />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd" />
                </svg>
                </label>
            </div>
            {ais.length === 0 ? (
                <p className="text-center">No AIs found. Check back later!</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ais.map((ai) => (
                        <AiCard key={ai.id} data={ai} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ExplorePage;

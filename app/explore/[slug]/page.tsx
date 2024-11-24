import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AiCard from "@/app/Components/AiCard";

export default async function Page({ params }: { params: { slug: string } }) {
    // Decode and trim the slug to handle spaces and special characters
    const slug = decodeURIComponent(params.slug).trim();

    try {
        // Search for AIs by name (case-insensitive, partial match)
        const ais = await prisma.aI.findMany({
            where: {
                name: {
                    contains: slug, // Partial match
                    mode: "insensitive", // Case-insensitive
                },
            },
            include: { creator: true }, // Include creator details
        });

        // If no AIs are found, display a message
        if (ais.length === 0) {
            return (
                <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">No AIs Found</h2>
                        <p className="mt-2">
                            No AIs matching <span className="font-semibold">{slug}</span> were found.
                        </p>
                        <Link href="/explore" className="btn btn-primary mt-4">
                            Explore AIs
                        </Link>
                    </div>
                </div>
            );
        }

        // Render the list of matching AIs
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {ais.map((ai) => (
                    <AiCard key={ai.id} data={ai} />
                ))}
            </div>
        );
    } catch (error) {
        console.error("Error fetching AIs:", error);
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <h2 className="text-3xl font-bold">Error</h2>
                    <p className="mt-2">Something went wrong while fetching AIs.</p>
                    <Link href="/explore" className="btn btn-primary mt-4">
                        Explore AIs
                    </Link>
                </div>
            </div>
        );
    }
}

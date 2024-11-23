import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = params;

    // Fetch AI details using the slug
    const ais = await prisma.aI.findMany({
        where: { 
            name: slug
         },
        include: { creator: true }, // Include related fields like creator details
    });

    if (ais.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <h2 className="text-3xl font-bold">AI Not Found</h2>
                    <p className="mt-2">
                        The AI with slug <span className="font-semibold">{slug}</span> does not exist.
                    </p>
                    <Link href="/explore" className="btn btn-primary mt-4">
                        Explore AIs
                    </Link>
                </div>
            </div>
        );
    }

    return (
       
    );
}

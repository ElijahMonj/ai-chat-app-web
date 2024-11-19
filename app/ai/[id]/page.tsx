import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    const { id } = params;

    const user = await prisma.user.findUnique({
        where: { email: session?.user?.email ?? undefined },
    });

    // Fetch AI details from the database
    const ai = await prisma.aI.findUnique({
        where: { id: parseInt(id) },
        include: { creator: true }, // Include related fields if needed
    });

    // Handle cases where the AI does not exist
    if (!ai) {
        return <div>AI with ID {id} not found.</div>;
    }

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-bold">{ai.name}</h1>
            <p className="text-gray-600 mt-2">{ai.description}</p>
            <img src={ai.avatar} alt={ai.name} className="w-32 h-32 rounded-full mt-4" />
            <p className="mt-4 text-sm">
                Created by: {ai.creator?.name || "Predefined AI"} on{" "}
                {new Date(ai.created_at).toLocaleDateString()}
            </p>
            {ai.creator?.id === user?.id && (
                <Link href={`my-ai/${ai.id}/edit`}
                className="btn btn-primary mt-4">Edit AI</Link>
            )}
        </div>
    );
}
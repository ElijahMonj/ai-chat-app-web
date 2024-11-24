
import getCurrentUser from "@/app/actions/getCurrentUser";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import ToggleButton from "./Components/ToggleButton";

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    const user = await getCurrentUser();
    // Fetch AI details from the database
    const ai = await prisma.aI.findUnique({
        where: { id: parseInt(id) },
        include: { creator: true }, // Include related fields if needed
    });

    // Handle cases where the AI does not exist
    if (!ai || (ai && !ai.isPublic && ai.creatorId !== user?.id)) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <h2 className="text-3xl font-bold">Pal Not Found</h2>
                    <p className=" mt-2">
                        The Pal with ID <span className="font-semibold">{id}</span> does not exist or is private.
                    </p>
                    <Link href="/explore" className="btn btn-primary mt-4">
                        Explore Pals
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto mt-10 max-w-3xl">
            <div className="card shadow-lg bg-base-100">
                <div className="card-body">
                    <div className="flex flex-col items-center">
                        <img
                            src={ai.avatar}
                            alt={ai.name}
                            className="w-36 h-36 rounded-full shadow-md object-cover"
                        />
                        <h1 className="text-3xl font-bold mt-4">{ai.name}</h1>
                        <p className=" mt-2">{ai.tagline}</p>
                        <div className="mt-4">
                            <span
                                className={`badge ${
                                    ai.isPublic ? "badge-success" : "badge-error"
                                }`}
                            >
                                {ai.isPublic ? "Public" : "Private"}
                            </span>
                        </div>
                    </div>
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold">Details</h2>
   
                        <div className="mt-4">
                            <p className="text-sm">Description:</p>
                            <p className="font-medium">{ai.description}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                                <p className="text-sm">Created by:</p>
                                <Link className="font-medium link-hover" href={`/profile/${ai.creatorId}`}>
                                    {ai.creator?.name || "Predefined AI"}
                                </Link>
                            </div>
                            <div>
                                <p className="text-sm">Created on:</p>
                                <p className="font-medium">
                                    {new Date(ai.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-5">
                        <div className="">
                            <Link href={`/chat/${ai.id}`} className="btn btn-primary w-full">
                                Chat
                            </Link>
                        </div>
                        {user?.id === ai.creatorId && <ToggleButton ai={ai}/>}
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

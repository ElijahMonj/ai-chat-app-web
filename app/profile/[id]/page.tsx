import getCurrentUser from "@/app/actions/getCurrentUser";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { RiGitRepositoryPrivateLine, RiGlobalLine } from "react-icons/ri";

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    const user = await getCurrentUser();

    const isUser = parseInt(id, 10) === user?.id;

    const profileData = await prisma.user.findUnique({
        where: {
            id: parseInt(id, 10),
        },
        include: {
            ais: {
                where: isUser ? {} : { isPublic: true }, // Include all AIs if isUser is true, otherwise only public AIs
            },
        },
    });

    if (!profileData) {
        return <div className="flex items-center justify-center h-screen text-xl font-semibold">User not found</div>;
    }

    return (
        <div className="container flex flex-col items-center justify-center min-h-screen px-4 py-8 space-y-8">
            {/* Profile Section */}
            <div className="flex flex-col items-center space-y-4">
                <div className="avatar">
                    {profileData.image ? (
                        <div className="w-24 h-24 rounded-full overflow-hidden">
                            <Image
                                src={profileData.image}
                                alt="Profile Image"
                                width={96}
                                height={96}
                                className="object-cover"
                                quality={100}   
                            />
                        </div>
                    ) : (
                        <div className="avatar placeholder">
                            <div className="bg-neutral text-neutral-content w-24 h-24 rounded-full flex items-center justify-center">
                                <span className="text-3xl">{profileData.name[0].toUpperCase()}</span>
                            </div>
                        </div>
                    )}
                </div>
                <div className="text-center">
                    <h3 className="text-2xl font-semibold">{profileData.name}</h3>
                    <h6 className="text-sm font-normal">{profileData.email}</h6>
                </div>
            </div>

            {/* Characters Section */}
            <div className="w-full max-w-lg">
                <h4 className="text-lg font-semibold mb-4 text-center">Characters</h4>
                <div className="space-y-1">
                    {profileData.ais.map((ai) => (
                        <Link
                            href={`/ai/${ai.id}`}
                            key={ai.id}
                            className="flex items-center gap-4 p-4 bg-base-100 rounded-lg shadow-sm hover:bg-base-200 transition"
                        >
                            {/* Image Container */}
                            <div className="w-16 h-16 relative rounded-lg overflow-hidden flex-shrink-0">
                                <Image
                                    src={ai.avatar}
                                    alt="AI Image"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            {/* Text Container */}
                            <div className="flex-1">
                                <h5 className="text-md font-semibold truncate">{ai.name}</h5>
                                <p className="text-xs line-clamp-2">
                                    {ai.description}
                                </p>
                            </div>
                            <div className="relative overflow-hidden flex-shrink-0">
                               {ai.isPublic ? <RiGlobalLine /> : <RiGitRepositoryPrivateLine />} 
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

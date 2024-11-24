
import { IoAddCircle, IoCompass } from "react-icons/io5";
import { RiChatSmile3Fill } from "react-icons/ri";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { User } from "@prisma/client";
import DropDown from "./DropDown";
import PrivacyTerms from "./PrivacyTerms";

interface DrawerSideProps {
    user: User;
}
const DrawerSide: React.FC<DrawerSideProps> = async ({user}) => {
    const chats = await prisma.chat.findMany({
        where: {
            userId: user?.id || 0,
        },
        include: {
            ai: true,
        },
    });

    return ( 
        <div className="drawer-side">  
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            <Link href={'/'} className="btn btn-ghost text-xl no-animation justify-start">
                NeoPal
            </Link>
            {/* Sidebar content here */}
            <li><Link href='/explore'><IoCompass  /> Explore</Link></li>
            <li><Link href='/create'><IoAddCircle />Create Pal</Link></li>
            <li>
                <details open>
                <summary><RiChatSmile3Fill />Chats</summary>
                <ul>
                    {chats.length === 0 ? (
                            <li className="flex flex-col items-center p-4 text-center">
                                No chats available

                                <Link href={'/explore'} className="mt-3 btn btn-outline btn-sm">Browse Characters</Link>

                            </li>
                        ) : (
                        chats.map((chat) => (
                            <li key={chat.id}>
                                <Link href={'/chat/' + chat.ai.id}>
                                    <div className="avatar">
                                        <div className="w-5 rounded-full">
                                            <img src={chat.ai.avatar} alt={chat.ai.name} className="object-cover" />
                                        </div>
                                    </div>
                                    {chat.ai.name}
                                </Link>
                            </li>
                        ))
                    )}
                </ul>

                </details>
            </li>
            <PrivacyTerms />

                <div className="dropdown dropdown-top dropdown-end">
 
                        <div tabIndex={0} role="button" className="btn w-full">
                            <div className="avatar">
                                {user.image ? (
                                    <div className="w-5 h-5 rounded-full overflow-hidden">
                                        <Image
                                            src={user.image}
                                            alt={user?.name}
                                            width={96}
                                            height={96}
                                            className="object-cover"
                                            quality={100}   
                                        />
                                    </div>
                                ) : (
                                    <div className="avatar placeholder">
                                        <div className="bg-neutral text-neutral-content w-5 h-5 rounded-full flex items-center justify-center">
                                            <span className="text-xs">{user.name[0].toUpperCase()}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {user?.name}
                        </div>
                        <DropDown user={user}/>
                   
                </div>
            </ul>
        </div>
     );
}
 
export default DrawerSide;
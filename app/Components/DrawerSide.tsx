
import { IoAddCircle, IoCompass } from "react-icons/io5";
import { RiChatSmile3Fill } from "react-icons/ri";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import getCurrentUser from "../actions/getCurrentUser";
import Image from "next/image";
import { MdOutlineAccountCircle, MdOutlineLogout, MdOutlineSettings } from "react-icons/md";
const DrawerSide = async () => {
    const user = await getCurrentUser();
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
                What the fuck is this
            </Link>
            {/* Sidebar content here */}
            <li><Link href='/explore'><IoCompass  /> Explore</Link></li>
            <li><Link href='/create'><IoAddCircle />Create AI</Link></li>
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
                                            <img src={chat.ai.avatar} />
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
            <li className="mt-auto w-full text-center text-xs">Privacy Policy • Terms of Service</li>

                <div className="dropdown dropdown-top dropdown-end">
 
                        <div tabIndex={0} role="button" className="btn w-full">
                            <div className="avatar">
                                <div className="w-5 rounded-full">
                                    <Image src={user?.image} 
                                    alt={user?.name}
                                    width={64}
                                    height={64}
                                    />
                                </div>
                            </div>
                            {user?.name}
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li>
                                <Link href={'/profile'}>Profile <MdOutlineAccountCircle className="ms-auto"/></Link>
                            </li>
                            <li><a>Settings <MdOutlineSettings className="ms-auto"/></a></li>
                            <li><a>Logout <MdOutlineLogout className="ms-auto"/></a></li>
                        </ul>
                   
                </div>
            </ul>
        </div>
     );
}
 
export default DrawerSide;
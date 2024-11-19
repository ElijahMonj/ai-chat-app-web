import Link from "next/link";
import { IoAddCircle, IoCompass } from "react-icons/io5";
import { RiChatSmile3Fill } from "react-icons/ri";

const DrawerSide = () => {
    return ( 
        <div className="drawer-side">  
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            <Link href={'/'} className="btn btn-ghost text-xl no-animation justify-start">
                What the fuck is this
            </Link>
            {/* Sidebar content here */}
            <li><a><IoCompass  /> Explore</a></li>
            <li><a><IoAddCircle />Create AI</a></li>
            <li>
                <details open>
                <summary><RiChatSmile3Fill />Chats</summary>
                <ul>
                    <li><a>Submenu 1</a></li>
                    <li><a>Submenu 2</a></li>
                </ul>
                </details>
            </li>
            <li className="mt-auto w-full text-center text-xs">Privacy Policy • Terms of Service</li>
            <li><a>Profile</a></li>
            </ul>
        </div>
     );
}
 
export default DrawerSide;
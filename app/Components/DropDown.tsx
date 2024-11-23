'use client'
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { MdOutlineAccountCircle, MdOutlineLogout, MdOutlineSettings } from "react-icons/md";
import ModalSettings from "./ModalSettings";

interface DropDownProps {
    user:User;
}

const DropDown: React.FC<DropDownProps> = ({user}) => {
    return ( 
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            <li>
                <Link href={'/profile/'+user.id}>Profile <MdOutlineAccountCircle className="ms-auto"/></Link>
            </li>
            <li><button
                onClick={() => {
                    const modal = document.getElementById('modal_settings');
                    if (modal) {
                        (modal as HTMLDialogElement).showModal();
                    }
                }}
                >Settings <MdOutlineSettings className="ms-auto"/></button></li>
            <li>
                <button
                    onClick={() => signOut()}
                >Logout <MdOutlineLogout className="ms-auto"/></button>
            </li>
            <ModalSettings user={user}/>
        </ul>
     );
}
 
export default DropDown;
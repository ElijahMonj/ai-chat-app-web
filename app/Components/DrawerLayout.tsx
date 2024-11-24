
import DrawerSide from "./DrawerSide";
import Link from "next/link";
import getCurrentUser from "../actions/getCurrentUser";

interface DrawerLayoutProps {
    children: React.ReactNode; 
}

const DrawerLayout: React.FC<DrawerLayoutProps> = async ({children}) => {
    const user = await getCurrentUser();
    return ( user ?
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center">
                
            <div className="navbar bg-base-100 lg:hidden">
                <div className="flex-none">
                    <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-5 w-5 stroke-current">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </label>
                </div>
                <div className="flex-1">
                    <Link href={'/'} className="btn btn-ghost text-xl no-animation">
                        NeoPal
                    </Link>
                </div>
            </div>
                {children}
            </div>
            <DrawerSide user={user}/>
        </div>
        :
        <div>
           {children}
        </div>
     );
}
 
export default DrawerLayout;
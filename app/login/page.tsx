
import getSession from "../actions/getSession";
import LoginCard from "./Components/LoginCard";
import { redirect } from 'next/navigation'
export default async function LoginPage() {

    const session = await getSession();
    if (session) {
        redirect('/')
    }
    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-base-200">
            <div className="card lg:card-side bg-base-100 shadow-xl max-w-4xl mx-auto">
                <figure>
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
                        alt="Album"
                    />
                </figure>
                <LoginCard />
            </div>
        </div>
    );
};


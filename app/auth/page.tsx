
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
            <div className="card bg-base-100 shadow-xl max-w-4xl mx-auto">
                <LoginCard />
            </div>
        </div>
    );
};


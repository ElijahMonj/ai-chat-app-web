'use client'

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
const LoginCard = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            redirect: true,
            email,
            password,
            callbackUrl: "/", // Adjust to your desired post-login route
        });
        console.log(result);
    };
    return ( 
        <div className="card-body flex flex-col items-center gap-8">
    <h1 className="text-3xl font-bold text-center">Welcome Back</h1>
    <p className=" text-center max-w-xs">
        Sign in to continue and connect with your favorite features.
    </p>
    <form 
        onSubmit={handleSubmit} 
        className="flex flex-col gap-6 w-full max-w-md"
    >
        <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium">
                Email
            </label>
            <input
                id="email"
                className="input input-bordered w-full"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
        </div>
        <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium">
                Password
            </label>
            <input
                id="password"
                className="input input-bordered w-full"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
        </div>
        <button type="submit" className="btn btn-primary w-full">
            Sign In
        </button>
    </form>
    <div className="text-center w-full">
        <p className="text-sm">
            Don’t have an account?{" "}
            <Link href="/register" className="text-primary font-medium">
                Sign up
            </Link>
        </p>
        <div className="divider text-sm">or</div>
    </div>
        <div className="flex justify-center gap-4 w-full">
            <button className="btn btn-outline btn-primary items-center gap-2 w-full" onClick={() => signIn("google")}>
                <FaGoogle />
                Continue With Google
            </button>
        </div>
    </div>

     );
}
 
export default LoginCard;
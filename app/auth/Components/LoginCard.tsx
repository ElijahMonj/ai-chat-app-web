'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import Image from "next/image";
import Logo from "@/app/fonts/logo.png"
const AuthCard = () => {
    const [isRegisterMode, setIsRegisterMode] = useState(false); // Toggle between login and register
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, name }),
        });

        if (res.ok) {
            alert("Registration successful! You can now log in.");
            setIsRegisterMode(false); // Switch to login mode after successful registration
        } else {
            const errorData = await res.json();
            alert(`Registration failed: ${errorData.error}`);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            redirect: true,
            email,
            password,
            callbackUrl: "/", // Adjust to your desired post-login route
        });

        if (result?.error) {
            alert("Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="card-body flex flex-col items-center gap-6">
            <Image src={Logo} width={1000} height={1000} alt="Logo" className="w-48"/>
            <h1 className="text-3xl font-bold text-center">
                {isRegisterMode ? "Create an Account" : "Welcome Back"}
            </h1>
            <p className="text-center max-w-xs">
                {isRegisterMode
                    ? "Sign up to start connecting with your Pals."
                    : "Sign in to continue and connect with your favorite Pals."}
            </p>
            <form
                onSubmit={isRegisterMode ? handleRegister : handleLogin}
                className="flex flex-col gap-6 w-full max-w-md"
            >
                {isRegisterMode && (
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name" className="text-sm font-medium">
                            Name
                        </label>
                        <input
                            id="name"
                            className="input input-bordered w-full"
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                )}
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
                {isRegisterMode && (
                    <div className="flex flex-col gap-1">
                        <label htmlFor="confirmPassword" className="text-sm font-medium">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            className="input input-bordered w-full"
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                )}
                <button type="submit" className="btn btn-primary w-full">
                    {isRegisterMode ? "Sign Up" : "Sign In"}
                </button>
            </form>
            <div className="text-center w-full">
                <p className="text-sm">
                    {isRegisterMode
                        ? "Already have an account? "
                        : "Don’t have an account? "}
                    <button
                        className="text-primary font-medium"
                        onClick={() => {
                            setIsRegisterMode(!isRegisterMode);
                            setPassword("");
                            setConfirmPassword("");
                        }}
                    >
                        {isRegisterMode ? "Sign in" : "Sign up"}
                    </button>
                </p>
                <div className="divider text-sm">or</div>
            </div>
            <div className="flex justify-center gap-4 w-full">
                <button
                    className="btn btn-outline btn-primary items-center gap-2 w-full"
                    onClick={() => signIn("google")}
                >
                    <FaGoogle />
                    Continue With Google
                </button>
            </div>
        </div>
    );
};

export default AuthCard;

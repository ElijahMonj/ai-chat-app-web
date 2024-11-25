'use client';
import { FaComments, FaSearch, FaPalette, FaUsers } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import about from "@/app/fonts/about.png";

const Landing = () => {
    // Animation Trigger
    useEffect(() => {
        const sections = document.querySelectorAll(".fade-in");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        });

        sections.forEach((section) => observer.observe(section));
    }, []);

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="w-full bg-base-200">
                <div className="container mx-auto py-16 px-4 text-center fade-in">
                    <h1 className="text-4xl font-bold mb-4">
                        Welcome to <span className="text-primary">NeoPal</span>
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Your ultimate platform to connect, create, and explore AI personalities.
                    </p>
                    <Link href="/auth" className="btn btn-primary btn-lg">
                        Sign In
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="w-full bg-base-100">
                <div className="container mx-auto py-16 px-4 fade-in">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: <FaComments />, title: "AI Conversations", description: "Chat with unique AI personalities tailored to your interests." },
                            { icon: <FaSearch />, title: "Explore AI", description: "Discover AI personalities created by others in the community." },
                            { icon: <FaPalette />, title: "Create Your Pal", description: "Design and customize your very own AI companion." },
                            { icon: <FaUsers />, title: "Global Community", description: "Connect with a diverse network of AI enthusiasts worldwide." },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="flex flex-col bg-base-200 items-center text-center space-y-4 shadow-lg p-6 rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl"
                            >
                                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="w-full bg-base-200">
                <div className="container mx-auto py-16 px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center fade-in">
                    <div>
                        <h2 className="text-3xl font-bold mb-4">About NeoPal</h2>
                        <p className="text-lg text-gray-600">
                            NeoPal is a platform where creativity meets technology. Whether you&apos;re looking for meaningful conversations, innovative ideas, or simply some fun, NeoPal has it all.
                        </p>
                        <p className="text-lg text-gray-600 mt-4">
                            Join us in this exciting way to connect, create, and explore AI personalities.
                        </p>
                    </div>
                    <div className="relative w-full h-64 md:h-96">
                        <Image src={about} alt="About NeoPal" layout="fill" className="object-contain" />
                    </div>
                </div>
            </section>

            {/* Join Now Section */}
            <section className="w-full bg-base-100">
                <div className="container mx-auto py-16 px-4 text-center fade-in">
                    <h2 className="text-3xl font-bold mb-6">Ready to Join?</h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Create your account today and start exploring the endless possibilities with NeoPal.
                    </p>
                    <Link href="/auth" className="btn btn-primary btn-lg">
                        Sign Up Now
                    </Link>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="w-full bg-base-200">
                <div className="container mx-auto py-8 px-4 text-center">
                    <p className="text-sm text-gray-600">
                        &copy; {new Date().getFullYear()} NeoPal. All Rights Reserved.
                    </p>
                    <p className="text-sm text-gray-600">
                        Contact us:{" "}
                        <a href="mailto:monjardinelijah120@gmail.com" className="text-primary">
                            monjardinelijah120@gmail.com
                        </a>
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Landing;

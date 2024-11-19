/* eslint-disable @next/next/no-img-element */
'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiUpload } from "react-icons/fi";

const SimpleForm = () => {
    const router = useRouter();
    const [avatar, setNewAvatar] = useState<File | null>(null);
    const [name, setName] = useState("");
    const [tagline, setTagline] = useState("");
    const [description, setDescription] = useState("");
    const [greeting, setGreeting] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isPublic, setIsPublic] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        //validate
        if (!name || !tagline || !description || !greeting || !avatar) {
            toast.error("Please fill in all fields");
            return;
        }
        const body = {
            name,
            tagline,
            description,
            greeting,
        };

        setIsLoading(true);
        const res = await fetch("/api/getprompt", {
             method: "POST",
             body: JSON.stringify(body),
        });
        
        if (res.ok) {
            const responseData = await res.json();
           
            let avatarUrl = "";
            const formData = new FormData();
            formData.append('avatar', avatar);

            try {
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });
    
                const data = await response.json();
                if (data.success) {
                    avatarUrl = data.url // Set the uploaded avatar URL
                    await createAI(body,responseData.content,avatarUrl);
                } else {
                    toast.error('Avatar upload failed');
                    console.log('Avatar upload failed:', data.message);
                }
            } catch (error) {
                console.error('Error:', error);
            }

        } else {
            console.error("Failed to create AI");
        }
        setIsLoading(false);
    }

    async function createAI(body: { name: string; tagline: string; description: string; greeting: string; },responseData:string,avatarUrl:string) {
        const parameter = {
            ...body,
            prompt: responseData,
            avatar: avatarUrl,
            isPublic,
        }

        const res = await fetch("/api/create", {
            method: "POST",
            body: JSON.stringify(parameter),
        });
        
        if(res.ok){
            toast.success("AI created successfully");

            setName("");
            setTagline("");
            setDescription("");
            setGreeting("");
            setNewAvatar(null);
            setIsPublic(false);

            const ai = await res.json();

            router.push(`/ai/${ai.id}`);
        }
    }

    return (
        <form className="bg-base-200 shadow-md rounded-lg p-6 space-y-6" onSubmit={handleSubmit}>
            {/* AI Name */}
            <div>
                <label className="block text-sm font-medium mb-2" htmlFor="name">
                    AI Name
                </label>
                <input
                    type="text"
                    id="name"
                    placeholder="Enter the AI's name"
                    className="input input-bordered w-full"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={20}
                />
                <div className="label">
                    <span className="label-text-alt"></span>
                    <span className="label-text-alt">{name.length}/20</span>
                </div>
            </div>

            {/* Tagline */}
            <div>
                <label className="block text-sm font-medium mb-2" htmlFor="tagline">
                    Tagline
                </label>
                <input
                    type="text"
                    id="tagline"
                    placeholder="Enter a short slogan or role for the AI"
                    className="input input-bordered w-full"
                    required
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    maxLength={50}
                />
                <div className="label">
                    <span className="label-text-alt"></span>
                    <span className="label-text-alt">{tagline.length}/50</span>
                </div>
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium mb-2" htmlFor="description">
                    Description
                </label>
                <textarea
                    id="description"
                    placeholder="Describe the AI's background and personality"
                    className="textarea textarea-bordered w-full"
                    rows={3}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength={1000}
                />
                <div className="label">
                    <span className="label-text-alt"></span>
                    <span className="label-text-alt">{description.length}/1000</span>
                </div>
            </div>

            {/* Greeting */}
            <div>
                <label className="block text-sm font-medium mb-2" htmlFor="greeting">
                    First Greeting
                </label>
                <textarea
                    id="greeting"
                    placeholder="What should the AI say when users start a conversation?"
                    className="textarea textarea-bordered w-full"
                    rows={3}
                    required
                    maxLength={500}
                    value={greeting}
                    onChange={(e) => setGreeting(e.target.value)}
                />
                <div className="label">
                    <span className="label-text-alt"></span>
                    <span className="label-text-alt">{greeting.length}/500</span>
                </div>
            </div>

            {/* Avatar Image */}
            <div className="flex items-center space-x-4">
                <div className="relative w-24 h-24 group">
                    {/* Placeholder or Avatar */}
                    <img
                        src={
                            avatar
                                ? URL.createObjectURL(avatar)
                                : "https://via.placeholder.com/96?text=Avatar"
                        }
                        alt="Avatar Placeholder"
                        className="rounded-lg w-full h-full object-cover"
                    />
                    {/* Hover Overlay with Icon */}
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        onClick={() => document.getElementById("avatar")?.click()}
                    >
                        <FiUpload className="text-white text-2xl" /> {/* React Icon */}
                    </div>
                    {/* Hidden Input */}
                    <input
                        type="file"
                        id="avatar"
                        className="hidden"
                        accept=".png, .jpg, .jpeg"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setNewAvatar(file);
                            }
                        }}
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium mb-2" htmlFor="avatar">
                        Upload Avatar
                    </label>
                    <p className="text-sm text-gray-500">
                        Click the placeholder or current avatar to upload an image (JPG, JPEG, PNG).
                    </p>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2" htmlFor="isPublic">
                    Public AI
                </label>
                <input
                    type="checkbox"
                    id="isPublic"
                    className="toggle toggle-primary"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                />
            </div>


            {/* Submit Button */}
            <div className="text-right">
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    Create AI
                </button>
            </div>
        </form>
    );
};

export default SimpleForm;

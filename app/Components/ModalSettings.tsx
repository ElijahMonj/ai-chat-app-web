"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface ModalSettingsProps {
    user: User;
}

const ModalSettings: React.FC<ModalSettingsProps> = ({ user }) => {
    const [name, setName] = useState(user.name);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isUpdatingName, setIsUpdatingName] = useState(false);
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
    const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);
    const [avatar, setAvatar] = useState<File | null>(null);
    const router = useRouter();
    const handleUpdateName = async () => {
        setIsUpdatingName(true);
        if (!name.trim()) {
            toast.error("Name cannot be empty!");
            setIsUpdatingName(false);
            return;
        }

        try {
            const response = await fetch("/api/update-name", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: user.id, name }),
            });

            if (!response.ok) throw new Error("Failed to update name");

            toast.success("Name updated successfully!");
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error("Error updating name.");
        } finally {
            setIsUpdatingName(false);
        }
    };

    const handleUpdatePassword = async () => {
        setIsUpdatingPassword(true);
    
        try {
            const response = await fetch("/api/update-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: user.id, newPassword, confirmPassword }),
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.message || "Failed to update password");
            }
    
            toast.success("Password updated successfully!");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            console.error(error);
            const errorMessage = error instanceof Error ? error.message : "Error updating password.";
            toast.error(errorMessage);
        } finally {
            setIsUpdatingPassword(false);
        }
    };

    const handleUpdateAvatar = async () => {
        if (!avatar) {
            toast.error("Please select an image to update avatar.");
            return;
        }

        try {
            setIsUpdatingAvatar(true)
            const formData = new FormData();
            formData.append("avatar", avatar);

            const response = await fetch("/api/update-avatar", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to update avatar");
            }

            toast.success("Avatar updated successfully!");
            setIsUpdatingAvatar(false);
            router.refresh();
        } catch (error) {
            console.error(error);
            const errorMessage = error instanceof Error ? error.message : "Error updating avatar.";
            toast.error(errorMessage);
        }
    }
    

    return (
        <dialog id="modal_settings" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">Account Settings</h3>
                {/* Update Avatar */}
                <div className="form-control">
                <div className="flex justify-evenly items-end mb-5">
                        {/* Avatar Rendering */}
                        {avatar ? (
                            <div className="avatar">
                                <div className="rounded-full w-16 h-16 ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img
                                        src={URL.createObjectURL(avatar)} // Create a preview URL for the uploaded avatar
                                        alt="avatar"
                                        className="rounded-full w-24 h-24"
                                    />
                                </div>
                            </div>
                        ) : user.image ? (
                            <div className="avatar">
                                <div className="rounded-full w-16 h-16 ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img
                                        src={user.image}
                                        alt="avatar"
                                        className="rounded-full w-24 h-24"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="avatar placeholder">
                                <div className="bg-neutral text-neutral-content w-16 rounded-full">
                                    <span>{user.name.charAt(0)}</span>
                                </div>
                            </div>
                        )}

                        {/* File Input for Avatar */}
                        <div>
                            <label className="label">
                                <span className="label-text">Avatar</span>
                            </label>
                            <input
                                type="file"
                                className="file-input file-input-bordered w-full max-w-xs"
                                accept="image/*" // Ensure only image files can be selected
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const validTypes = ["image/jpeg", "image/png", "image/gif"]; // Allowed file types
                                        const maxSize = 2 * 1024 * 1024; // Maximum size (2MB)

                                        if (!validTypes.includes(file.type)) {
                                            toast.error("Only JPEG, PNG, or GIF files are allowed.");
                                            return;
                                        }

                                        if (file.size > maxSize) {
                                            toast.error("File size must not exceed 2MB.");
                                            return;
                                        }

                                        setAvatar(file); // Update the state with the validated file
                                    }
                                }}
                            />

                        </div>
                    </div>

                   
                    <button onClick={handleUpdateAvatar} disabled={isUpdatingAvatar || !avatar}
                    className="btn btn-primary mt-2">Update Avatar</button>
                </div>
                {/* Update Name */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Name"
                        className="input input-bordered"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isUpdatingName}
                    />
                    <button
                        className={`btn btn-primary mt-2`}
                        onClick={(e) => {
                            e.preventDefault();
                            handleUpdateName();
                        }}
                        disabled={isUpdatingName || !name.trim() || name === user.name}
                    >
                        Update Name
                    </button>
                </div>

                {/* Update Password */}
                {user.password ? (
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">New Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="input input-bordered"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            disabled={isUpdatingPassword}
                        />

                        <label className="label">
                            <span className="label-text">Confirm Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="input input-bordered"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            disabled={isUpdatingPassword}
                        />
                        <button
                            className={`btn btn-primary mt-2`}
                            onClick={(e) => {
                                e.preventDefault();
                                handleUpdatePassword();
                            }}
                            disabled={isUpdatingPassword || !newPassword.trim() || !confirmPassword.trim()}
                        >
                            {isUpdatingPassword ? "Updating..." : "Update Password"}
                        </button>
                    </div>
                ) : (
                    <div className="py-5">
                        <p className="text-sm">You are signed in using Google. You can&apos;t change the password.</p>
                    </div>
                )}
            </div>
            <Toaster />
        </dialog>
    );
};

export default ModalSettings;

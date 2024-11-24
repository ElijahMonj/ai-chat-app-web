"use client";

import { AI } from "@prisma/client";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
interface ToggleButtonProps {
    ai: AI;
}

export default function ToggleButton({ ai }: ToggleButtonProps) {
    const [isPending, setPending] = useState(false);
    const [isPublicState, setPublicState] = useState(ai.isPublic);
    const [tempPublicState, setTempPublicState] = useState(ai.isPublic);
    const router = useRouter();
    const handleChange = () => {
        // Set the temporary state for the modal confirmation
        setTempPublicState(!isPublicState);
        const modal = document.getElementById("modal_confirm");
        if (modal) {
            (modal as HTMLDialogElement).showModal();
        }
    };

    const handleConfirm = async () => {
        setPending(true);
        const modal = document.getElementById("modal_confirm");
        if (modal) {
            (modal as HTMLDialogElement).close();
        }
    
        try {
            const response = await fetch("/api/ai/togglePublic", {
                method: "POST",
                body: JSON.stringify({ id: ai.id, isPublic: tempPublicState }),
                headers: { "Content-Type": "application/json" },
            });
    
            if (!response.ok) {
                throw new Error("Failed to update AI public status");
            }
    
            const data = await response.json();
            console.log("AI updated successfully:", data);
            setPublicState(tempPublicState); // Update the state after a successful call
            toast.success("AI updated successfully");
            router.refresh();
        } catch (error) {
            console.error("Failed to update AI state:", error);
            toast.error("Failed to update AI state");
        } finally {
            setPending(false);
        }
    };
    

    const handleCancel = () => {
        const modal = document.getElementById("modal_confirm");
        if (modal) {
            (modal as HTMLDialogElement).close();
        }
    };

    return (
        <div className="form-control w-52">
            <label className="label cursor-pointer">
                <span className="label-text">Public Character</span>
                <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={isPublicState} // Bind to the actual state
                    disabled={isPending}
                    onChange={handleChange}
                />
            </label>

            <dialog id="modal_confirm" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">
                        {tempPublicState ? "Make Character Public" : "Make Character Private"}
                    </h3>
                    <p className="py-4">
                        Are you sure you want to make <strong>{ai.name}</strong>{" "}
                        {tempPublicState ? "public" : "private"}?
                    </p>
                    <div className="modal-action">
                        {/* Cancel button */}
                        <button className="btn" onClick={handleCancel}>
                            Cancel
                        </button>
                        {/* Confirm button */}
                        <button
                            className={`btn btn-primary`}
                            onClick={handleConfirm}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </dialog>
            <Toaster />
        </div>
    );
}

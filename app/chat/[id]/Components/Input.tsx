import React from "react";
import { IoMdSend } from "react-icons/io";
import { useRouter } from "next/navigation"; // Next.js 13+ useRouter for navigation

interface InputProps {
    newMessage: string;
    setNewMessage: React.Dispatch<React.SetStateAction<string>>;
    isPending: boolean;
    setIsPending: React.Dispatch<React.SetStateAction<boolean>>;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    chatId: number; // Add chatId to identify the chat to delete
}

const Input: React.FC<InputProps> = ({
    newMessage,
    setNewMessage,
    isPending,
    handleSubmit,
    chatId,
}) => {
    const [isDeleting, setIsDeleting] = React.useState(false);
    const router = useRouter();

    async function handleDeleteChat() {
        setIsDeleting(true);
        try {
            const response = await fetch(`/api/chat/delete`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ chatId }),
            });

            if (!response.ok) {
                throw new Error("Failed to delete chat.");
            }

            //close modal
            (document.getElementById("delete_chat") as HTMLDialogElement)?.close();

            // Redirect to homepage on success
            router.push("/");
            router.refresh();
        } catch (error) {
            console.error("Error deleting chat:", error);
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <>
        <form
            onSubmit={handleSubmit}
            className="flex items-center flex-col gap-2 bottom-0 w-full max-w-xl p-3 fixed bg-base-100"
        >
            <label className="input input-bordered flex items-center w-full">
                <input
                    disabled={isPending}
                    type="text"
                    className="grow p-2"
                    placeholder="Type message here..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)} // Update state on input change
                    maxLength={255} // Set maximum length to 255 characters
                />
                {newMessage.trim() && (
                    <button type="submit" className="ps-2" disabled={isPending}>
                        <IoMdSend className="text-lg" />
                    </button>
                )}
            </label>
            <div className="flex justify-between w-full">
                <div className="text-xs text-base-content-secondary">
                    This is an AI and not a real person.
                </div>

                <div
                    className="text-xs text-base-content-secondary hover:underline cursor-pointer"
                    onClick={() =>
                        (document.getElementById("delete_chat") as HTMLDialogElement)?.showModal()
                    }
                >
                    Delete Chat
                </div>
            </div>
            
        </form>
        <dialog id="delete_chat" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Deleting Chat</h3>
                    <p className="py-4">Are you sure you want to delete this chat?</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn me-2"
                                disabled={isDeleting}
                            >Close</button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleDeleteChat}
                                disabled={isDeleting}
                            >
                                {isDeleting ? "Deleting..." : "Delete"}
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default Input;

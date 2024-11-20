import React from "react";
import { IoMdSend } from "react-icons/io";

interface InputProps {
    newMessage: string;
    setNewMessage: React.Dispatch<React.SetStateAction<string>>;
    isPending: boolean;
    setIsPending: React.Dispatch<React.SetStateAction<boolean>>;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Input: React.FC<InputProps> = ({ newMessage, setNewMessage, isPending ,handleSubmit}) => {

    

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
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
        </form>
    );
};

export default Input;

'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

const Searchbar = () => {
    const [searchQuery, setSearchQuery] = useState(""); // State to store the search input
    const router = useRouter(); // Next.js navigation router

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        if (searchQuery.trim()) {
            // Navigate to /explore with the query as a search parameter
            router.push(`/explore/${encodeURIComponent(searchQuery.trim())}`);
        } else {
            // Reset to /explore if search is empty
            router.push("/explore");
        }
    };

    return ( 
        <form className="flex justify-center mb-6" onSubmit={handleSearch}>
            <label className="input input-bordered flex items-center gap-2 max-w-sm w-full">
            <input type="text" className="grow" placeholder="Search" 
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)} 
            />
            <button type="submit">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                >
                    <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            </label>
        </form>
     );
}
 
export default Searchbar;
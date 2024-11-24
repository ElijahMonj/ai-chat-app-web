import Searchbar from "./Components/Searchbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6 text-center">Explore Pals</h1>
            <Searchbar />
            {children}
        </div>
    );
}
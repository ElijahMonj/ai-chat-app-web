// app/not-found.tsx
import { GiArtificialIntelligence } from "react-icons/gi";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-center p-4">
      <GiArtificialIntelligence className="text-6xl mb-4" />
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-lg mt-2">
        Oops! The page you are looking for does not exist.
      </p>
      <Link href="/" className="mt-4 btn">
        Go back to Home
      </Link>
    </div>
  );
}

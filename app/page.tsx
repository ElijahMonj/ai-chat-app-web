
import Landing from "./Components/Landing";
import AiCard from "./Components/AiCard";
import { AI } from "@prisma/client";
import getSession from "./actions/getSession";

export default async function Home() {
  const session = await getSession();
  const ais: Omit<AI, "created_at" | "updated_at" | "chats">[] = [
    
  ];
  
  return (session ?
      <main className="container mx-auto  min-h-screen">
          {/* Cards Section */}
          <div className="px-4 py-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4">For you</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {ais.map((ai) => (
                    <AiCard data={ai} key={ai.id} />
                ))}
              </div>

          </div>

      </main> 
     : 
     <Landing />
  );
}

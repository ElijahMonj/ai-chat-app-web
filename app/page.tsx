
import Landing from "./Components/Landing";
import AiCard from "./Components/AiCard";
import getSession from "./actions/getSession";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const session = await getSession();
  const ais= await prisma.aI.findMany({
    take: 4,
    include: { creator: true },
  });
  
  return (session ?
      <main className="container mx-auto  min-h-screen">
          {/* Cards Section */}
          <div className="px-4 py-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Featured you</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {ais.map((ai) => (
                    <AiCard data={ai} key={ai.id} />
                ))}
              </div>
          </div>
          <div className="px-4">
            <h2 className="text-xl md:text-2xl font-bold mb-4">New</h2>
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

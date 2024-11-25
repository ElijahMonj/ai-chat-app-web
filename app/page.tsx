
import Landing from "./Components/Landing";
import getSession from "./actions/getSession";
import Showcase from "./Components/Homepage/Showcase";
import New from "./Components/Homepage/New";
import Featured from "./Components/Homepage/Featured";

export default async function Home() {
  const session = await getSession();
  
  
  return (session ?
      <main className="container mx-auto  min-h-screen">
          {/* Cards Section */}
          <Showcase />
          <Featured />
          <New />
      </main> 
     : 
     <Landing />
  );
}

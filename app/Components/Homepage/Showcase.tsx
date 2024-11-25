import getCurrentUser from "@/app/actions/getCurrentUser";
import Link from "next/link";

const Showcase = async () => {
    const user = await getCurrentUser();

    return ( 
        <div className="flex w-full flex-col lg:flex-row px-4 py-8">
            <div className="lg:w-1/2 card bg-base-100 image-full shadow-xl">
                <figure>
                    <img
                    src="https://res.cloudinary.com/di3a7ifvr/image/upload/v1732530863/explore_zber51.jpg"
                    alt="Explore" />
                </figure>
                <div className="card-body">
                    <h1 className="card-title text-3xl">Welcome back, {user?.name}</h1>
                    <p>Explore Pals created by other users and start chatting with them.</p>
                    <div className="card-actions justify-end">
                    <Link className="btn btn-primary" href="/explore">Explore Pals</Link>
                    </div>
                </div>
            </div>
            <div className="divider lg:divider-horizontal">OR</div>
            <div className="lg:w-1/2 card bg-base-100 image-full shadow-xl">
                <figure>
                    <img
                    src="https://res.cloudinary.com/di3a7ifvr/image/upload/v1732506296/bg-create_bd6ug0.png"
                    alt="Create" />
                </figure>
                <div className="card-body">
                    <h1 className="card-title text-3xl">Create your own Pal</h1>
                    <p>Start creating your own Pal and share it with the world.</p>
                    <div className="card-actions justify-end">
                    <Link className="btn btn-secondary" href="/create">Create Pal</Link>
                    </div>
                </div>
            </div>
            </div>
     );
}
 
export default Showcase;
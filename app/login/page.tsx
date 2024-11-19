import LoginCard from "./Components/LoginCard";

const LoginPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-base-200">
            <div className="card lg:card-side bg-base-100 shadow-xl max-w-4xl mx-auto">
                <figure>
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
                        alt="Album"
                    />
                </figure>
                <LoginCard />
            </div>
        </div>
    );
};

export default LoginPage;

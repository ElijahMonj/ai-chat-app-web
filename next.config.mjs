/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '', // No need for a port unless specified
                pathname: '/**', // Matches all paths under this domain
            },
        ],
    },
};

export default nextConfig;

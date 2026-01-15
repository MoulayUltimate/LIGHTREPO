/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
    },
    // Commented out for development - enable for Cloudflare static deployment
    // output: 'export',
};

export default nextConfig;

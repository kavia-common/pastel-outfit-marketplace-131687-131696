/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'placehold.co'],
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;

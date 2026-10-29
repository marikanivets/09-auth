/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ac.goit.global',
      }
    ],
  },
  experimental: {
    serverMinification: false,
  }
};

export default nextConfig;

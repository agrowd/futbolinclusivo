/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'futbolinclusivo.org.ar',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

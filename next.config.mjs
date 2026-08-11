/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'futbolinclusivo.org.ar',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.weserv.nl',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'copaargentina.s3.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/**',
      },
    ],

  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'canchas.futbolinclusivo.org.ar',
          },
        ],
        destination: 'http://149.50.128.73:9191/:path*',
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.canchas.futbolinclusivo.org.ar',
          },
        ],
        destination: 'http://149.50.128.73:9191/:path*',
      },
    ];
  },
};

export default nextConfig;

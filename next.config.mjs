/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['assets.coingecko.com'], // Allow images from assets.coingecko.com
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'assets.coingecko.com',
          port: '',
          pathname: 'api/v3/coins/**', 
        },
      ],
    },
  };
  
  export default nextConfig;
  
import type { NextConfig } from "next";

const nextConfig: NextConfig = {

};

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        pathname: '/thumbnail',
      },
    ],
  },
};

/* another option but cusing a warning
module.exports = {
  images: {
    domains: ['drive.google.com'],
  },
};*/
export default nextConfig;

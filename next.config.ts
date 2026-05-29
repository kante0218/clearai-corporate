import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
      },
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
      },
      {
        protocol: "https",
        hostname: "api.iconify.design",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/humanoid",
        destination: "/robot-rental",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

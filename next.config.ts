import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 実験的: ページ遷移で View Transitions API を使う（Chromium/Safari18+ で有効）
  experimental: {
    viewTransition: true,
  },
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

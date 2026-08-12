import type { NextConfig } from "next";
import { withBotId } from "botid/next/config";

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
      // 2026-08-08 ロボットレンタル再開（Unitree R1 / G1 / Go2）。旧 /humanoid のみ集約継続
      { source: "/humanoid", destination: "/robot-rental", permanent: false },
      // 2026-07-15 サービスページ縮小: FDEコンサル(/ai-consulting)へ集約
      { source: "/spatial-scan", destination: "/ai-consulting", permanent: false },
      { source: "/ai-agent", destination: "/ai-consulting", permanent: false },
      { source: "/advisor", destination: "/ai-consulting", permanent: false },
      { source: "/subsidy", destination: "/ai-consulting", permanent: false },
      { source: "/claude", destination: "/ai-consulting", permanent: false },
      { source: "/website", destination: "/ai-consulting", permanent: false },
      { source: "/advertising", destination: "/ai-consulting", permanent: false },
      { source: "/sns", destination: "/ai-consulting", permanent: false },
      { source: "/research", destination: "/ai-consulting", permanent: false },
    ];
  },
};

export default withBotId(nextConfig);

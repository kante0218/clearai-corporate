import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "clearAI株式会社（クリアエーアイ）",
    short_name: "clearAI",
    description:
      "AI導入コンサルティング・AI顧問・AI研修・補助金サポート・Claude特化導入・AI広告運用・ウェブサイト制作を提供する中小企業向けAI企業。",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#111827",
    lang: "ja",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    categories: ["business", "productivity"],
  };
}

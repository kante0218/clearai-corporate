import type { Metadata } from "next";

const description =
  "ClearAI株式会社（クリアエーアイ）の導入実績。製造業のフライス盤とAIエージェントを接続した受注自動化、SES企業のSNS運用と事務作業の自動化、不動産コンサルティング会社のコーポレートサイト構築など、実際にお受けした案件の課題・つくったもの・結果をまとめています。";

export const metadata: Metadata = {
  title: "導入実績 | AI・システム開発の事例",
  description,
  keywords: [
    "AI導入 事例",
    "AIエージェント 導入実績",
    "製造業 AI 事例",
    "業務自動化 事例",
    "システム開発 実績",
    "ホームページ制作 実績",
    "ClearAI",
    "クリアエーアイ",
  ],
  alternates: { canonical: "https://clearai.jp/case-studies" },
  openGraph: {
    title: "導入実績 | ClearAI株式会社",
    description,
    url: "https://clearai.jp/case-studies",
    type: "website",
    locale: "ja_JP",
    siteName: "ClearAI株式会社",
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "導入実績 | ClearAI株式会社",
    description,
    images: ["/images/logo.png"],
  },
};

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

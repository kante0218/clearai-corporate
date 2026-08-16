import type { Metadata } from "next";

const description =
  "ClearAI株式会社（クリアエーアイ）のコラム。AI受託開発の見積の読み方、開発会社の選び方、生成AI研修と助成金、AI顧問の使い方、ロボット実証の進め方まで、発注する側が判断するために必要な実務情報をまとめています。";

export const metadata: Metadata = {
  title: "コラム | AI導入・開発発注の実務情報",
  description,
  keywords: [
    "AI導入 コラム",
    "AI受託開発 発注",
    "生成AI 導入 実務",
    "AI開発 見積",
    "AI研修 助成金",
    "ClearAI",
    "クリアエーアイ",
  ],
  alternates: { canonical: "https://clearai.jp/column" },
  openGraph: {
    title: "コラム | ClearAI株式会社",
    description,
    url: "https://clearai.jp/column",
    type: "website",
    locale: "ja_JP",
    siteName: "ClearAI株式会社",
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "コラム | ClearAI株式会社",
    description,
    images: ["/images/logo.png"],
  },
};

export default function ColumnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

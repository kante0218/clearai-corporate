import type { Metadata } from "next";

const description =
  "ClearAI株式会社（クリアエーアイ）のサイトマップ。AI受託開発・AI内製化研修・FDEコンサルティング・ロボットレンタルの各事業ページ、導入実績、コラム、会社概要への一覧です。";

export const metadata: Metadata = {
  title: { absolute: "サイトマップ | ClearAI株式会社" },
  description,
  alternates: { canonical: "https://clearai.jp/sitemap-page" },
  openGraph: {
    title: "サイトマップ | ClearAI株式会社",
    description,
    url: "https://clearai.jp/sitemap-page",
    type: "website",
    locale: "ja_JP",
    siteName: "ClearAI株式会社",
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary",
    title: "サイトマップ | ClearAI株式会社",
    description,
    images: ["/images/logo.png"],
  },
};

export default function SitemapPageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

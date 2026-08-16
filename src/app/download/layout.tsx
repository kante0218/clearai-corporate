import type { Metadata } from "next";

const description =
  "ClearAI株式会社（クリアエーアイ）の事業紹介資料をご請求いただけます。会社紹介、システム・ソフトウェア開発（AI受託開発）、ロボットレンタル、AI内製化研修の4種類。フォーム送信後、ご入力のメールアドレス宛にお送りします。";

export const metadata: Metadata = {
  title: "資料請求｜事業紹介資料のダウンロード",
  description,
  keywords: [
    "ClearAI 資料請求",
    "AI開発 会社 資料",
    "AI受託開発 資料",
    "ロボットレンタル 資料",
    "AI研修 資料",
    "ClearAI",
    "クリアエーアイ",
  ],
  alternates: { canonical: "https://clearai.jp/download" },
  openGraph: {
    title: "資料請求 | ClearAI株式会社",
    description,
    url: "https://clearai.jp/download",
    type: "website",
    locale: "ja_JP",
    siteName: "ClearAI株式会社",
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "資料請求 | ClearAI株式会社",
    description,
    images: ["/images/logo.png"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: "https://clearai.jp" },
    { "@type": "ListItem", position: 2, name: "資料請求", item: "https://clearai.jp/download" },
  ],
};

export default function DownloadLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

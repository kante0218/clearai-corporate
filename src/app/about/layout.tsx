import type { Metadata } from "next";
import Script from "next/script";

const description =
  "clearAI株式会社（クリアエーアイ／読み方：クリアエーアイ）の会社概要。2026年4月設立、茨城県拠点、代表取締役 髙橋 敢輝。AIコンサルティング事業と農業×エンジニアリング事業を通じて、企業のDXと日本の一次産業の課題解決に取り組むAIスタートアップ。英文表記は clearAI Inc.。";

export const metadata: Metadata = {
  title: "会社概要（clearAI / クリアエーアイ）",
  description,
  keywords: [
    "clearAI", "clearAI株式会社", "クリアエーアイ", "クリアAI",
    "クリア・エーアイ", "クリアーエーアイ", "clearAI 読み方",
    "clearAI 会社概要", "clearAI 茨城", "clearAI 設立",
    "clear AI", "clearai.jp", "髙橋 敢輝",
  ],
  alternates: { canonical: "https://clearai.jp/about" },
  openGraph: {
    title: "会社概要 | clearAI株式会社",
    description,
    url: "https://clearai.jp/about",
    type: "website",
    locale: "ja_JP",
    siteName: "clearAI株式会社",
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "会社概要 | clearAI株式会社",
    description,
    images: ["/images/logo.png"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: "https://clearai.jp" },
    { "@type": "ListItem", position: 2, name: "会社概要", item: "https://clearai.jp/about" },
  ],
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Script
        id="schema-breadcrumb-about"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

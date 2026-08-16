import type { Metadata } from "next";

const description =
  "ClearAI株式会社（クリアエーアイ／読み方：クリアエーアイ）の会社概要。2026年4月設立、茨城県拠点、代表取締役 髙橋 敢輝。AI顧問・AI研修・AIコンサル/DX・ウェブ制作を通じて、日本の中小企業のAI活用とDXを支援するAIスタートアップ。英文表記は ClearAI Inc.。";

export const metadata: Metadata = {
  title: "会社概要（ClearAI / クリアエーアイ）",
  description,
  keywords: [
    "ClearAI", "ClearAI株式会社", "クリアエーアイ", "クリアAI",
    "クリア・エーアイ", "クリアーエーアイ", "ClearAI 読み方",
    "ClearAI 会社概要", "ClearAI 茨城", "ClearAI 設立",
    "clear AI", "clearai.jp", "髙橋 敢輝",
  ],
  alternates: { canonical: "https://clearai.jp/about" },
  openGraph: {
    title: "会社概要 | ClearAI株式会社",
    description,
    url: "https://clearai.jp/about",
    type: "website",
    locale: "ja_JP",
    siteName: "ClearAI株式会社",
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "会社概要 | ClearAI株式会社",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

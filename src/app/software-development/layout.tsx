import type { Metadata } from "next";

const description =
  "ClearAI株式会社（クリアエーアイ）のシステム・ソフトウェア受託開発。AIを組み込んだ業務システム・AIエージェント・Webアプリ・モバイルアプリを、要件定義から設計・開発・本番リリース・運用保守まで一貫してお引き受けします。最短2週間で動くプロトタイプを提示。費用は個別お見積り。";

export const metadata: Metadata = {
  title: "システム・ソフトウェア開発 | AI受託開発を要件定義から運用まで",
  description,
  keywords: [
    "システム開発",
    "ソフトウェア開発",
    "受託開発",
    "AI受託開発",
    "業務システム開発",
    "AIエージェント開発",
    "Webアプリ開発",
    "アプリ開発",
    "システム開発会社",
    "AI開発会社",
    "生成AI 業務システム",
    "Next.js 開発",
    "ClearAI",
    "クリアエーアイ",
  ],
  alternates: { canonical: "https://clearai.jp/software-development" },
  openGraph: {
    title: "システム・ソフトウェア開発 | ClearAI株式会社",
    description,
    url: "https://clearai.jp/software-development",
    type: "website",
    locale: "ja_JP",
    siteName: "ClearAI株式会社",
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "システム・ソフトウェア開発 | ClearAI株式会社",
    description,
    images: ["/images/logo.png"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "システム・ソフトウェア受託開発",
  provider: {
    "@type": "Organization",
    name: "ClearAI株式会社",
    url: "https://clearai.jp",
  },
  areaServed: { "@type": "Country", name: "日本" },
  name: "システム・ソフトウェア開発サービス",
  description,
  url: "https://clearai.jp/software-development",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: "https://clearai.jp" },
    { "@type": "ListItem", position: 2, name: "システム・ソフトウェア開発", item: "https://clearai.jp/software-development" },
  ],
};

export default function SoftwareDevelopmentLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

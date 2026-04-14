import type { Metadata } from "next";
import Script from "next/script";

const description =
  "clear AI株式会社の農業×エンジニアリング事業。田んぼの水流管理・ビニールハウスの自動化から、農家向けEC構築・利益率改善・業務効率化まで、エンジニアの力で日本の一次産業を次世代に。将来は宇宙・防衛産業の極限環境へ展開。";

export const metadata: Metadata = {
  title: "農業×エンジニアリング | 農家をテクノロジーで支援",
  description,
  keywords: [
    "農業DX",
    "農業エンジニアリング",
    "スマート農業",
    "農家支援",
    "農業EC",
    "農業自動化",
    "ビニールハウス自動化",
    "水流管理",
    "AgriTech",
  ],
  alternates: { canonical: "https://clearai.jp/ai-agriculture" },
  openGraph: {
    title: "農業×エンジニアリング | clear AI株式会社",
    description,
    url: "https://clearai.jp/ai-agriculture",
    type: "website",
    locale: "ja_JP",
    siteName: "clear AI株式会社",
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "農業×エンジニアリング | clear AI株式会社",
    description,
    images: ["/images/logo.png"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "農業エンジニアリング",
  provider: {
    "@type": "Organization",
    name: "clear AI株式会社",
    url: "https://clearai.jp",
  },
  areaServed: { "@type": "Country", name: "日本" },
  name: "農業×エンジニアリングサービス",
  description,
  url: "https://clearai.jp/ai-agriculture",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: "https://clearai.jp" },
    { "@type": "ListItem", position: 2, name: "農業×エンジニアリング", item: "https://clearai.jp/ai-agriculture" },
  ],
};

export default function AiAgricultureLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Script
        id="schema-service-agriculture"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="schema-breadcrumb-agriculture"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

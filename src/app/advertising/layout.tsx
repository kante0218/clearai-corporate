import type { Metadata } from "next";
import Script from "next/script";

const description =
  "clearAIのAI広告運用サービス。Google広告・Meta広告・YouTube広告の運用を、生成AIとデータ分析で最適化。コピー生成、クリエイティブ制作、入札最適化、レポート自動化まで、AIネイティブな広告運用チームが伴走します。";

export const metadata: Metadata = {
  title: "AI広告運用 | 生成AIで広告効果を最大化",
  description,
  keywords: [
    "AI広告運用",
    "生成AI広告",
    "リスティング広告",
    "Google広告",
    "Meta広告",
    "広告クリエイティブ AI",
    "広告コピー 自動生成",
  ],
  alternates: { canonical: "https://clearai.jp/advertising" },
  openGraph: {
    title: "AI広告運用 | clearAI株式会社",
    description,
    url: "https://clearai.jp/advertising",
    type: "website",
    locale: "ja_JP",
    siteName: "clearAI株式会社",
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI広告運用 | clearAI株式会社",
    description,
    images: ["/images/logo.png"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "AI広告運用",
  provider: { "@type": "Organization", name: "clearAI株式会社", url: "https://clearai.jp" },
  areaServed: { "@type": "Country", name: "日本" },
  name: "AI活用型 広告運用支援",
  description,
  url: "https://clearai.jp/advertising",
  offers: { "@type": "Offer", availability: "https://schema.org/InStock" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: "https://clearai.jp" },
    { "@type": "ListItem", position: 2, name: "AI広告運用", item: "https://clearai.jp/advertising" },
  ],
};

export default function AdvertisingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Script id="schema-service-advertising" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="schema-breadcrumb-advertising" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}

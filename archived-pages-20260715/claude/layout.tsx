import type { Metadata } from "next";
import Script from "next/script";

const description =
  "clearAIのClaude特化サービス。経営者向けプライベートスクール（月5万円・使いこなせなければ全額返金）と、オンラインでのClaude導入支援を提供。Claude Code・Projectsなどの高度機能を実務成果に直結させる、日本屈指の専門支援です。";

export const metadata: Metadata = {
  title: "Claude特化 | 経営者プライベートスクール＆オンライン導入支援",
  description,
  keywords: [
    "Claude",
    "Claude Code",
    "Anthropic",
    "Claude 導入",
    "経営者 AIスクール",
    "Claude プライベートスクール",
    "Claude 企業導入",
  ],
  alternates: { canonical: "https://clearai.jp/claude" },
  openGraph: {
    title: "Claude特化 | clearAI株式会社",
    description,
    url: "https://clearai.jp/claude",
    type: "website",
    locale: "ja_JP",
    siteName: "clearAI株式会社",
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Claude特化 | clearAI株式会社",
    description,
    images: ["/images/logo.png"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Claude特化支援",
  provider: { "@type": "Organization", name: "clearAI株式会社", url: "https://clearai.jp" },
  areaServed: { "@type": "Country", name: "日本" },
  name: "Claude経営者スクール・Claude導入支援",
  description,
  url: "https://clearai.jp/claude",
  offers: {
    "@type": "Offer",
    price: "50000",
    priceCurrency: "JPY",
    availability: "https://schema.org/InStock",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: "https://clearai.jp" },
    { "@type": "ListItem", position: 2, name: "Claude特化", item: "https://clearai.jp/claude" },
  ],
};

export default function ClaudeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Script id="schema-service-claude" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="schema-breadcrumb-claude" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}

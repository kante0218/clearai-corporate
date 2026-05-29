import type { Metadata } from "next";
import Script from "next/script";

const description =
  "clearAIのSNS運用代行。Instagram・X・TikTok等の戦略設計からコンテンツ制作・投稿・分析改善まで一括代行。AIでネタ出しと制作を高速化し、続くSNS運用を仕組み化します。";

export const metadata: Metadata = {
  title: "SNS運用代行 | AI活用でコンテンツ制作・投稿・分析まで",
  description,
  keywords: [
    "SNS運用代行",
    "SNS運用",
    "Instagram運用代行",
    "X運用代行",
    "TikTok運用",
    "SNSマーケティング",
    "コンテンツ制作",
    "AI SNS",
    "投稿代行",
    "SNSコンサル",
  ],
  alternates: { canonical: "https://clearai.jp/sns" },
  openGraph: {
    title: "SNS運用代行 | clearAI株式会社",
    description,
    url: "https://clearai.jp/sns",
    type: "website",
    locale: "ja_JP",
    siteName: "clearAI株式会社",
  },
  twitter: {
    card: "summary_large_image",
    title: "SNS運用代行 | clearAI株式会社",
    description,
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "SNS運用代行（コンサル・DX）",
  provider: {
    "@type": "Organization",
    name: "clearAI株式会社",
    url: "https://clearai.jp",
  },
  areaServed: { "@type": "Country", name: "日本" },
  name: "SNS運用代行",
  description,
  url: "https://clearai.jp/sns",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: "https://clearai.jp" },
    { "@type": "ListItem", position: 2, name: "SNS運用代行", item: "https://clearai.jp/sns" },
  ],
};

export default function SnsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Script id="schema-service-sns" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="schema-breadcrumb-sns" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}

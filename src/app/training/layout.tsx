import type { Metadata } from "next";
import Script from "next/script";

const description =
  "clearAIのAI研修サービス。経営層・管理職・現場担当者まで、階層別にAIリテラシーを底上げ。ChatGPT・Claudeなど生成AIの実務活用から、社内プロンプトガイドライン策定、チーム別ハンズオンまで、自走できる組織づくりを支援します。";

export const metadata: Metadata = {
  title: "AI研修 | 階層別・実務特化のAIリテラシー研修",
  description,
  keywords: [
    "AI研修",
    "生成AI研修",
    "ChatGPT研修",
    "Claude研修",
    "企業AI研修",
    "AIリテラシー",
    "社内AI教育",
  ],
  alternates: { canonical: "https://clearai.jp/training" },
  openGraph: {
    title: "AI研修 | clearAI株式会社",
    description,
    url: "https://clearai.jp/training",
    type: "website",
    locale: "ja_JP",
    siteName: "clearAI株式会社",
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI研修 | clearAI株式会社",
    description,
    images: ["/images/logo.png"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "AI研修",
  provider: { "@type": "Organization", name: "clearAI株式会社", url: "https://clearai.jp" },
  areaServed: { "@type": "Country", name: "日本" },
  name: "企業向けAI研修プログラム",
  description,
  url: "https://clearai.jp/training",
  offers: { "@type": "Offer", availability: "https://schema.org/InStock" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: "https://clearai.jp" },
    { "@type": "ListItem", position: 2, name: "AI研修", item: "https://clearai.jp/training" },
  ],
};

export default function TrainingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Script id="schema-service-training" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="schema-breadcrumb-training" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}

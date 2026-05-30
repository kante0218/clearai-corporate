import type { Metadata } from "next";
import Script from "next/script";

const description =
  "clearAI株式会社（クリアエーアイ）のAIエージェント開発サービス。Claude / GPT / Geminiなどの最新LLMを基盤に、業務を自律的にこなすAIエージェントを設計・開発・運用まで一気通貫で提供。カスタマーサポート、営業、コーディング、調査・分析、社内ナレッジ活用などの業務エージェントを、PoCから本番運用、継続改善まで伴走支援します。";

export const metadata: Metadata = {
  title: "AIエージェント開発 | 業務を任せられる自律型AIを設計・実装・運用",
  description,
  keywords: [
    "AIエージェント",
    "AIエージェント開発",
    "LLMエージェント",
    "自律型AI",
    "Agentic AI",
    "Claude Agent",
    "GPT Agent",
    "業務自動化エージェント",
    "Customer Service Agent",
    "Sales Agent",
    "Coding Agent",
    "LangGraph",
    "CrewAI",
    "Mastra",
    "AIエージェント受託開発",
    "clearAI",
    "クリアエーアイ",
  ],
  alternates: { canonical: "https://clearai.jp/ai-agent" },
  openGraph: {
    title: "AIエージェント開発 | clearAI株式会社",
    description,
    url: "https://clearai.jp/ai-agent",
    type: "website",
    locale: "ja_JP",
    siteName: "clearAI株式会社",
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AIエージェント開発 | clearAI株式会社",
    description,
    images: ["/images/logo.png"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "AIエージェント開発",
  provider: {
    "@type": "Organization",
    name: "clearAI株式会社",
    url: "https://clearai.jp",
  },
  areaServed: { "@type": "Country", name: "日本" },
  name: "AIエージェント開発サービス",
  description,
  url: "https://clearai.jp/ai-agent",
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
    { "@type": "ListItem", position: 2, name: "AIエージェント開発", item: "https://clearai.jp/ai-agent" },
  ],
};

export default function AiAgentLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Script
        id="schema-service-ai-agent"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="schema-breadcrumb-ai-agent"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

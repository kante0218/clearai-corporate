import type { Metadata } from "next";

const description =
  "ClearAI株式会社（クリアエーアイ）のAI導入コンサルティング。生成AI活用・業務自動化・DX推進まで、戦略策定から開発・実装・運用まで一気通貫でサポート。中小企業から大企業まで、貴社に最適なAIソリューションを共に創り上げます。AI顧問・Claude特化導入・CEO向けAI活用にも対応。";

export const metadata: Metadata = {
  title: "AIコンサルティング | 戦略・実装・運用を一気通貫で伴走",
  description,
  keywords: [
    "AIコンサルティング",
    "AI導入支援",
    "AI顧問",
    "生成AI活用",
    "DX推進",
    "業務自動化",
    "企業AI",
    "AI戦略",
    "LLM導入",
    "Claude導入",
    "CEO向けAI",
    "ClearAI",
    "クリアエーアイ",
    "クリアAI",
  ],
  alternates: { canonical: "https://clearai.jp/ai-consulting" },
  openGraph: {
    title: "AIコンサルティング | ClearAI株式会社",
    description,
    url: "https://clearai.jp/ai-consulting",
    type: "website",
    locale: "ja_JP",
    siteName: "ClearAI株式会社",
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AIコンサルティング | ClearAI株式会社",
    description,
    images: ["/images/logo.png"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "AIコンサルティング",
  provider: {
    "@type": "Organization",
    name: "ClearAI株式会社",
    url: "https://clearai.jp",
  },
  areaServed: { "@type": "Country", name: "日本" },
  name: "AI導入コンサルティングサービス",
  description,
  url: "https://clearai.jp/ai-consulting",
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
    { "@type": "ListItem", position: 2, name: "AIコンサルティング", item: "https://clearai.jp/ai-consulting" },
  ],
};

export default function AiConsultingLayout({ children }: { children: React.ReactNode }) {
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

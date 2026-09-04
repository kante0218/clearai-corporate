import type { Metadata } from "next";

const description =
  "ClearAI株式会社（クリアエーアイ）のAI内製化研修。AIを使って社内システムを自社で作れる人材を育てる実践型プログラム。Claude / ChatGPT / Gemini / Microsoft Copilot から選べるカリキュラムで、非エンジニアでも研修中に動く社内ツールが完成します。人材開発支援助成金の活用を見据え、訓練実施機関として必要な添付資料を提供します。";

export const metadata: Metadata = {
  title: "AI内製化研修 | 社内システムを自社で作れるようになる",
  description,
  keywords: [
    "AI研修",
    "AI内製化研修",
    "社員研修",
    "生成AI研修",
    "内製化",
    "人材開発支援助成金",
    "事業展開等リスキリング支援コース",
    "Claude研修",
    "Claude Code研修",
    "ChatGPT研修",
    "Gemini研修",
    "Copilot研修",
    "ノーコード開発",
    "DX人材育成",
    "ClearAI",
    "クリアエーアイ",
    "クリアAI",
  ],
  alternates: { canonical: "https://clearai.jp/training" },
  openGraph: {
    title: "AI内製化研修 | ClearAI株式会社",
    description,
    url: "https://clearai.jp/training",
    type: "website",
    locale: "ja_JP",
    siteName: "ClearAI株式会社",
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI内製化研修 | ClearAI株式会社",
    description,
    images: ["/images/logo.png"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "AI内製化研修",
  provider: {
    "@type": "Organization",
    name: "ClearAI株式会社",
    url: "https://clearai.jp",
  },
  areaServed: { "@type": "Country", name: "日本" },
  name: "AI内製化研修",
  description,
  url: "https://clearai.jp/training",
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
    { "@type": "ListItem", position: 2, name: "AI内製化研修", item: "https://clearai.jp/training" },
  ],
};

export default function TrainingLayout({ children }: { children: React.ReactNode }) {
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

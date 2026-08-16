import type { Metadata } from "next";

const description =
  "ClearAI株式会社（クリアエーアイ）の事業内容一覧。AIを組み込んだ業務システムの受託開発、ヒューマノイド・四足ロボットのレンタル、現場に入り込むFDEコンサルティング、社内で作れる人材を育てるAI内製化研修の4事業をご紹介します。";

export const metadata: Metadata = {
  title: "事業内容｜AI受託開発・ロボットレンタル・コンサル・研修",
  description,
  keywords: [
    "ClearAI 事業内容",
    "AI受託開発",
    "ロボットレンタル",
    "AIコンサルティング",
    "AI内製化研修",
    "ClearAI",
    "クリアエーアイ",
  ],
  alternates: { canonical: "https://clearai.jp/service" },
  openGraph: {
    title: "事業内容 | ClearAI株式会社",
    description,
    url: "https://clearai.jp/service",
    type: "website",
    locale: "ja_JP",
    siteName: "ClearAI株式会社",
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "事業内容 | ClearAI株式会社",
    description,
    images: ["/images/logo.png"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: "https://clearai.jp" },
    { "@type": "ListItem", position: 2, name: "事業内容", item: "https://clearai.jp/service" },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "ClearAI 事業一覧",
  itemListElement: [
    { name: "システム・ソフトウェア開発", url: "https://clearai.jp/software-development" },
    { name: "ロボットレンタル", url: "https://clearai.jp/robot-rental" },
    { name: "FDEコンサルティング", url: "https://clearai.jp/ai-consulting" },
    { name: "AI内製化研修", url: "https://clearai.jp/training" },
  ].map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.name,
    url: s.url,
  })),
};

export default function ServiceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
    </>
  );
}

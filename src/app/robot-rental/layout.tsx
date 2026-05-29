import type { Metadata } from "next";
import Script from "next/script";

const description =
  "clearAIのヒューマノイドロボット レンタル・PoC（実証実験）・イベント活用支援。高額な人型ロボットを購入前に現場で試せます。搬入・セットアップ・オペレーター・AI連携まで一括対応。";

export const metadata: Metadata = {
  title: "ロボットレンタル | ヒューマノイドの短期レンタル・PoC・実証",
  description,
  keywords: [
    "ロボットレンタル",
    "ヒューマノイドレンタル",
    "人型ロボット レンタル",
    "ロボット PoC",
    "ロボット 実証実験",
    "ヒューマノイド",
    "イベント ロボット",
    "ロボット 展示会",
    "AI ロボット",
    "ロボティクス",
  ],
  alternates: { canonical: "https://clearai.jp/robot-rental" },
  openGraph: {
    title: "ロボットレンタル | clearAI株式会社",
    description,
    url: "https://clearai.jp/robot-rental",
    type: "website",
    locale: "ja_JP",
    siteName: "clearAI株式会社",
    images: ["/images/humanoid/workskin-hero-tricolor.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "ロボットレンタル | clearAI株式会社",
    description,
    images: ["/images/humanoid/workskin-hero-tricolor.png"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "ヒューマノイドロボット レンタル・PoC・実証実験支援",
  provider: {
    "@type": "Organization",
    name: "clearAI株式会社",
    url: "https://clearai.jp",
  },
  areaServed: { "@type": "Country", name: "日本" },
  name: "ロボットレンタル（ヒューマノイド）",
  description,
  url: "https://clearai.jp/robot-rental",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: "https://clearai.jp" },
    { "@type": "ListItem", position: 2, name: "ロボットレンタル", item: "https://clearai.jp/robot-rental" },
  ],
};

export default function RobotRentalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Script id="schema-service-robot-rental" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="schema-breadcrumb-robot-rental" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}

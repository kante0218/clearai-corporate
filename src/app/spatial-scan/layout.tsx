import type { Metadata } from "next";
import Script from "next/script";

const description =
  "現場をカメラで撮影するだけで工場・倉庫・施設まるごとを3Dデータ化。その3Dデジタルツインの上で点検・巡回ロボットの稼働を事前にシミュレーションし、ルート・カバー範囲・必要台数・ROIを導入前に見える化します。高価な専用機材も大規模工事も不要。clearAIがデータ化からロボットの選定・レンタル・運用まで一気通貫で支援します。";

export const metadata: Metadata = {
  title: "空間3Dスキャン | 現場を3Dデータ化してロボット導入を設計",
  description,
  keywords: [
    "3Dスキャン",
    "空間データ化",
    "デジタルツイン",
    "工場 3D化",
    "倉庫 3Dスキャン",
    "設備点検 ロボット",
    "巡回ロボット 導入",
    "点検ロボット シミュレーション",
    "ロボット導入 計画",
    "3D点群",
    "施設 巡回 自動化",
    "robot simulation",
    "spatial digitization",
    "digital twin",
    "clearAI",
  ],
  alternates: { canonical: "https://clearai.jp/spatial-scan" },
  openGraph: {
    title: "空間3Dスキャン | clearAI株式会社",
    description,
    url: "https://clearai.jp/spatial-scan",
    type: "website",
    locale: "ja_JP",
    siteName: "clearAI株式会社",
  },
  twitter: {
    card: "summary_large_image",
    title: "空間3Dスキャン | clearAI株式会社",
    description,
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "空間3Dデータ化・ロボット導入シミュレーション",
  provider: {
    "@type": "Organization",
    name: "clearAI株式会社",
    url: "https://clearai.jp",
  },
  areaServed: { "@type": "Country", name: "日本" },
  name: "空間3Dスキャン（現場のデータ化 → ロボット導入設計）",
  description,
  url: "https://clearai.jp/spatial-scan",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: "https://clearai.jp" },
    { "@type": "ListItem", position: 2, name: "空間3Dスキャン", item: "https://clearai.jp/spatial-scan" },
  ],
};

export default function SpatialScanLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Script id="schema-service-spatial-scan" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="schema-breadcrumb-spatial-scan" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}

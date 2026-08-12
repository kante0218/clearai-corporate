import type { Metadata } from "next";

const description =
  "ClearAI株式会社（クリアエーアイ）のロボットレンタル。Unitree R1・G1（ヒューマノイド）と Go2（四足歩行ロボット）を1泊2日から全国配送でレンタルできます。1泊2日 Go2は5,000円（税別）〜、R1・G1は50,000円（税別）〜。月単位の長期プラン・安心補償付き・免責費用なし。展示会・PoC・研究開発にご利用いただけます。";

export const metadata: Metadata = {
  title: "ロボットレンタル | Unitree R1・G1・Go2を1泊2日から",
  description,
  keywords: [
    "ロボットレンタル",
    "ロボット レンタル 料金",
    "ヒューマノイド レンタル",
    "Unitree レンタル",
    "Unitree R1 レンタル",
    "Unitree G1 レンタル",
    "Unitree Go2 レンタル",
    "四足歩行ロボット レンタル",
    "人型ロボット レンタル",
    "ロボット 展示会 レンタル",
    "ロボット PoC 実証実験",
    "ロボット 短期レンタル",
    "ClearAI",
    "クリアエーアイ",
  ],
  alternates: { canonical: "https://clearai.jp/robot-rental" },
  openGraph: {
    title: "ロボットレンタル | ClearAI株式会社",
    description,
    url: "https://clearai.jp/robot-rental",
    type: "website",
    locale: "ja_JP",
    siteName: "ClearAI株式会社",
    images: ["/images/robot-rental/g1.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "ロボットレンタル | ClearAI株式会社",
    description,
    images: ["/images/robot-rental/g1.png"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "ロボットレンタル（ヒューマノイド・四足歩行ロボット）",
  provider: {
    "@type": "Organization",
    name: "ClearAI株式会社",
    url: "https://clearai.jp",
  },
  areaServed: { "@type": "Country", name: "日本" },
  name: "ロボットレンタル",
  description,
  url: "https://clearai.jp/robot-rental",
  offers: [
    {
      "@type": "Offer",
      name: "Unitree R1（1泊2日・Basic）",
      price: "50000",
      priceCurrency: "JPY",
      availability: "https://schema.org/InStock",
      url: "https://clearai.jp/robot-rental#pricing-r1",
    },
    {
      "@type": "Offer",
      name: "Unitree G1（1泊2日・Basic）",
      price: "50000",
      priceCurrency: "JPY",
      availability: "https://schema.org/InStock",
      url: "https://clearai.jp/robot-rental#pricing-g1",
    },
    {
      "@type": "Offer",
      name: "Unitree Go2（1泊2日・Air）",
      price: "5000",
      priceCurrency: "JPY",
      availability: "https://schema.org/InStock",
      url: "https://clearai.jp/robot-rental#pricing-go2",
    },
  ],
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

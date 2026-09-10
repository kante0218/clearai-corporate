import type { Metadata } from "next";
import RelatedReading from "@/components/seo/RelatedReading";

// 検索結果向けの短い説明。長文は Service スキーマと OG/Twitter 側に温存する。
const description =
  "ヒューマノイド・四足歩行ロボットのレンタル。Unitree R1・G1・Go2を1泊2日から全国配送。展示会・PoC・研究開発向け、補償付き・免責費用なし。";

const serviceDescription =
  "ClearAI株式会社（クリアエーアイ）のロボットレンタル。Unitree R1・G1（ヒューマノイド）と Go2（四足歩行ロボット）を1泊2日から全国配送でレンタルできます。1泊2日 Go2は5,000円（税別）〜、R1・G1は50,000円（税別）〜。月単位の長期プラン・安心補償付き・免責費用なし。展示会・PoC・研究開発にご利用いただけます。";

export const metadata: Metadata = {
  title: { absolute: "ヒューマノイド・四足歩行ロボットレンタル | ClearAI" },
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
    description: serviceDescription,
    url: "https://clearai.jp/robot-rental",
    type: "website",
    locale: "ja_JP",
    siteName: "ClearAI株式会社",
    images: ["/images/robot-rental/g1.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "ロボットレンタル | ClearAI株式会社",
    description: serviceDescription,
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
  description: serviceDescription,
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
      <RelatedReading
        description="借りる前に決めておくことと、ロボットを使った検証の進め方をまとめています。"
        links={[
          {
            href: "/column/humanoid-robot-rental-poc",
            label: "ヒューマノイド・四足ロボットの実証（PoC）の進め方",
            note: "レンタルで検証を始める前に決めておく項目を整理しています。",
          },
          {
            href: "/software-development",
            label: "AI受託開発",
            note: "検証のあと、実運用のシステムまで作る場合はこちらです。",
          },
          {
            href: "/ai-consulting",
            label: "FDEコンサル・AI顧問",
            note: "検証の設計から社内展開まで伴走してほしい場合はこちらです。",
          },
          {
            href: "/download",
            label: "資料請求",
            note: "機体仕様と料金をまとめた資料をその場でダウンロードできます。",
          },
          {
            href: "/faq",
            label: "よくあるご質問",
            note: "配送・補償・操作の可否についてまとめています。",
          },
          {
            href: "/column",
            label: "コラム一覧",
            note: "ロボットとAI活用の実務記事をまとめています。",
          },
        ]}
      />
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

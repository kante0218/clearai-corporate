import type { Metadata } from "next";
import { RelatedReading } from "@/components/PageHeader";

// Search snippet (under 120 chars). The long form below stays on OG/Twitter and the Service schema.
const description =
  "Unitree R1・G1（ヒューマノイド）とGo2（四足歩行ロボット）を1泊2日から全国配送でレンタル。Go2は5,000円（税別）〜、R1・G1は50,000円（税別）〜。展示会・PoC・研究開発向け。";

const serviceDescription =
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

const RELATED = [
  {
    href: "/column/humanoid-robot-rental-poc",
    label: "ヒューマノイド・四足ロボットの実証（PoC）の進め方",
    note: "測るべき指標、環境条件の制約、レンタルと購入の判断、安全と法令の確認事項。",
  },
  {
    href: "/download",
    label: "ロボットレンタルの事業紹介資料",
    note: "社内検討用に、ロボットレンタル事業の紹介資料をダウンロードできます。",
  },
  {
    href: "/faq",
    label: "よくあるご質問",
    note: "費用・期間・契約形態についての回答。",
  },
  {
    href: "/software-development",
    label: "AI受託開発",
    note: "ロボットと業務システムをつなぐ開発が必要な場合。",
  },
  {
    href: "/case-studies",
    label: "導入実績",
    note: "実際にお受けした案件の記録。",
  },
  {
    href: "/column",
    label: "コラム一覧",
    note: "発注検討者向けの実務情報。",
  },
];

export default function RobotRentalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <RelatedReading
        heading="レンタルを検討する前に読む実務情報"
        intro="展示会や実証実験でロボットを使う前に、決めておくことと確認事項をまとめています。"
        links={RELATED}
        more={[
          { href: "/column", label: "コラム一覧" },
          { href: "/case-studies", label: "導入実績一覧" },
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

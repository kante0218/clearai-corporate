import type { Metadata } from "next";
import { RelatedReading } from "@/components/PageHeader";

// Search snippet (under 120 chars). The long form below stays on OG/Twitter and the Service schema.
const description =
  "社内システムを自社で作れる人材を育てるAI内製化研修。Claude・ChatGPT・Gemini・Copilotから選べる実践型カリキュラムで、非エンジニアも研修中に社内ツールを完成させます。人材開発支援助成金の対象になる場合があります。";

const serviceDescription =
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
    description: serviceDescription,
    url: "https://clearai.jp/training",
    type: "website",
    locale: "ja_JP",
    siteName: "ClearAI株式会社",
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI内製化研修 | ClearAI株式会社",
    description: serviceDescription,
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
  description: serviceDescription,
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

const RELATED = [
  {
    href: "/column/seisei-ai-kenshu-joseikin",
    label: "生成AI研修に使える助成金｜人材開発支援助成金の要件",
    note: "事業展開等リスキリング支援コースの対象要件と、計画届から支給申請までの順序。",
  },
  {
    href: "/column/ai-kaihatsu-naisei-gaichu",
    label: "AI開発の内製と外注をどう分けるか",
    note: "研修で社内に残す範囲と、外部に任せる範囲を業務ごとに決める基準。",
  },
  {
    href: "/claude-bootcamp",
    label: "Claude Code 法人研修（Webアプリ内製化ブートキャンプ）",
    note: "Claude・Codex と GitHub・Vercel・Firebase で、社内向けWebアプリを作れるようになるプログラム。",
  },
  {
    href: "/column/ai-komon-souba",
    label: "AI顧問は何をする人か",
    note: "研修後の定着を外部の伴走で支える場合に、契約前に決めておく役割。",
  },
  {
    href: "/software-development",
    label: "AI受託開発",
    note: "接続や設計の難所だけを外部に任せたい場合の受託開発。",
  },
  {
    href: "/case-studies",
    label: "導入実績",
    note: "実際にお受けした案件の記録。",
  },
];

export default function TrainingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <RelatedReading
        heading="研修を検討する前に読む実務情報"
        intro="助成金の要件や、研修後に何を社内で作れるようにするかを決めるための情報をまとめています。"
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

import type { Metadata } from "next";
import { RelatedReading } from "@/components/PageHeader";

// Search snippet (under 120 chars). The long form below stays on OG/Twitter and the Service schema.
const description =
  "現場に入り込むFDE型のAIコンサルティング・AI顧問。業務の棚卸しとAI活用の戦略策定から、開発・実装・運用の定着まで一気通貫で伴走します。中小企業向け、茨城県拠点・全国対応。";

const serviceDescription =
  "ClearAI株式会社（クリアエーアイ）のAI導入コンサルティング。生成AI活用・業務自動化・DX推進まで、戦略策定から開発・実装・運用まで一気通貫でサポート。中小企業から大企業まで、貴社に最適なAIソリューションを共に創り上げます。AI顧問・Claude特化導入・CEO向けAI活用にも対応。";

export const metadata: Metadata = {
  title: { absolute: "AIコンサルティング・AI顧問・FDE | ClearAI株式会社" },
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
    description: serviceDescription,
    url: "https://clearai.jp/ai-consulting",
    type: "website",
    locale: "ja_JP",
    siteName: "ClearAI株式会社",
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AIコンサルティング | ClearAI株式会社",
    description: serviceDescription,
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
  description: serviceDescription,
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

const RELATED = [
  {
    href: "/column/ai-komon-souba",
    label: "AI顧問は何をする人か｜契約前に決めるべき役割",
    note: "助言型と実装伴走型の違いと、月額契約が形骸化する理由、契約前に決める5項目。",
  },
  {
    href: "/column/ai-kaihatsu-naisei-gaichu",
    label: "AI開発の内製と外注をどう分けるか",
    note: "どこまで社内で持ち、どこから外部に頼むかを業務ごとに決める基準。",
  },
  {
    href: "/column/ai-agent-kaihatsu-hiyou",
    label: "AIエージェント開発の費用はどう決まるか",
    note: "PoCで終わらせないために、着手前に決める3つの数値。",
  },
  {
    href: "/case-studies/milling-machine-ai-agent",
    label: "導入実績：製造業の受注から設計までの自動化",
    note: "現場の業務を棚卸ししてAIエージェントにつないだ事例。",
  },
  {
    href: "/training",
    label: "AI内製化研修",
    note: "コンサルで決めた施策を社内で回すための実践型研修。",
  },
  {
    href: "/software-development",
    label: "AI受託開発",
    note: "決まった施策を実装まで任せる場合の受託開発。",
  },
];

export default function AiConsultingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <RelatedReading
        heading="AI顧問・コンサルを検討する前に読む実務情報"
        intro="月額契約が形骸化しないように、契約前に決めておくことと、実装まで進んだ事例をまとめています。"
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

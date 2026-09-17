import type { Metadata } from "next";
import { RelatedReading } from "@/components/PageHeader";

// Search snippet (under 120 chars). The long form below stays on OG/Twitter and the Service schema.
const description =
  "AIを組み込んだ業務システム・AIエージェント・Webアプリを、要件定義から設計・開発・運用保守まで一貫して受託開発。最短2週間で動くプロトタイプを提示します。茨城県拠点・全国対応、費用は個別お見積り。";

const serviceDescription =
  "ClearAI株式会社（クリアエーアイ）のシステム・ソフトウェア受託開発。AIを組み込んだ業務システム・AIエージェント・Webアプリ・モバイルアプリを、要件定義から設計・開発・本番リリース・運用保守まで一貫してお引き受けします。最短2週間で動くプロトタイプを提示。費用は個別お見積り。";

export const metadata: Metadata = {
  title: { absolute: "AI受託開発・AIエージェント開発 | ClearAI株式会社" },
  description,
  keywords: [
    "システム開発",
    "ソフトウェア開発",
    "受託開発",
    "AI受託開発",
    "業務システム開発",
    "AIエージェント開発",
    "Webアプリ開発",
    "アプリ開発",
    "システム開発会社",
    "AI開発会社",
    "生成AI 業務システム",
    "Next.js 開発",
    "ClearAI",
    "クリアエーアイ",
  ],
  alternates: { canonical: "https://clearai.jp/software-development" },
  openGraph: {
    title: "システム・ソフトウェア開発 | ClearAI株式会社",
    description: serviceDescription,
    url: "https://clearai.jp/software-development",
    type: "website",
    locale: "ja_JP",
    siteName: "ClearAI株式会社",
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "システム・ソフトウェア開発 | ClearAI株式会社",
    description: serviceDescription,
    images: ["/images/logo.png"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "システム・ソフトウェア受託開発",
  provider: {
    "@type": "Organization",
    name: "ClearAI株式会社",
    url: "https://clearai.jp",
  },
  areaServed: { "@type": "Country", name: "日本" },
  name: "システム・ソフトウェア開発サービス",
  description: serviceDescription,
  url: "https://clearai.jp/software-development",
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
    { "@type": "ListItem", position: 2, name: "システム・ソフトウェア開発", item: "https://clearai.jp/software-development" },
  ],
};

const RELATED = [
  {
    href: "/column/ai-agent-kaihatsu-hiyou",
    label: "AIエージェント開発の費用はどう決まるか",
    note: "工数を左右する7つの変数と、見積書で必ず確認すべき5項目。相場表ではなく見積の組み上がり方から説明します。",
  },
  {
    href: "/column/ai-jutaku-kaihatsu-gaisha-erabikata",
    label: "AI受託開発会社の選び方｜商談で聞くべき7つの質問",
    note: "契約前に確認する権利・データ・体制の条項と、発注先の規模による向き不向き。",
  },
  {
    href: "/column/ai-kaihatsu-naisei-gaichu",
    label: "AI開発の内製と外注をどう分けるか",
    note: "どの工程を社内に残し、どこを外部に任せるか。業務ごとに判断するための4つの基準。",
  },
  {
    href: "/case-studies/milling-machine-ai-agent",
    label: "導入実績：フライス盤とAIエージェントを接続した製造業",
    note: "発注書の受信から設計・NC出力までをつないだ受託開発の事例。",
  },
  {
    href: "/case-studies/ses-sns-automation",
    label: "導入実績：SNS投稿とDMを自動化したSES企業",
    note: "AIエージェントに定型の事務作業を任せた事例。",
  },
  {
    href: "/training",
    label: "AI内製化研修",
    note: "納品後の改善を社内で回したい場合に、開発と並行して受けられる実践型研修。",
  },
];

export default function SoftwareDevelopmentLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <RelatedReading
        heading="発注前に読む実務情報"
        intro="AI受託開発を検討するときに、見積の比較や発注先選びで迷いやすい点を、コラムと導入実績にまとめています。"
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

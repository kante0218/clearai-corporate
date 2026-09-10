import type { Metadata } from "next";
import RelatedReading from "@/components/seo/RelatedReading";

// 検索結果向けの短い説明。長文は Service スキーマと OG/Twitter 側に温存する。
const description =
  "中小企業向けのAI受託開発。AIエージェント・業務システム・Webアプリを要件定義から開発・運用保守まで一貫対応。最短2週間で動くプロトタイプ。茨城発・全国対応、費用は個別見積り。";

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

export default function SoftwareDevelopmentLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <RelatedReading
        description="発注前に決めておくこと、見積の読み方、実際の開発事例をまとめています。"
        links={[
          {
            href: "/column/ai-jutaku-kaihatsu-gaisha-erabikata",
            label: "AI受託開発会社の選び方｜商談で必ず聞くべき7つの質問",
            note: "PoC止まりを避けるために、商談の場で確認しておく論点を整理しています。",
          },
          {
            href: "/column/ai-agent-kaihatsu-hiyou",
            label: "AIエージェント開発の費用はどう決まるか",
            note: "見積がどの工程から積み上がるのか、内訳の構造を解説しています。",
          },
          {
            href: "/case-studies/milling-machine-ai-agent",
            label: "事例：フライス盤とAIエージェントを接続した製造業",
            note: "発注書の受領から設計・NC出力までを自動化した実装の記録です。",
          },
          {
            href: "/case-studies/ses-sns-automation",
            label: "事例：SES企業のSNS投稿とDMの自動化",
            note: "事務作業をAIエージェントに移すときの切り分け方を紹介しています。",
          },
          {
            href: "/training",
            label: "AI内製化研修",
            note: "開発を外注せず、社内で作れる体制に移したい場合はこちらです。",
          },
          {
            href: "/column",
            label: "コラム一覧",
            note: "AI開発・研修・顧問の実務記事をまとめています。",
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

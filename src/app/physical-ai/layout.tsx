import type { Metadata } from "next";
import Script from "next/script";

const description =
  "clearAIのフィジカルAI受託開発。カメラ・センサー・ロボットとAIをつなぎ、設備点検・構内搬送・接客案内・外観検査といった現場作業を自動化します。PoCパック150万円から、本番実装は600万円〜。ソースコード・IPはすべて顧客に帰属します。";

export const metadata: Metadata = {
  title: "フィジカルAI受託開発 | ロボット×AIを現場で動くシステムに",
  description,
  keywords: [
    "フィジカルAI",
    "フィジカルAI 受託開発",
    "Physical AI",
    "Embodied AI",
    "ロボット 受託開発",
    "ロボット AI 開発",
    "ロボット システム開発",
    "設備点検 自動化",
    "外観検査 AI",
    "ヒューマノイド 開発",
    "四足歩行ロボット 点検",
    "現場 AI 自動化",
    "中小企業 ロボット導入",
  ],
  alternates: { canonical: "https://clearai.jp/physical-ai" },
  openGraph: {
    title: "フィジカルAI受託開発 | clearAI株式会社",
    description,
    url: "https://clearai.jp/physical-ai",
    type: "website",
    locale: "ja_JP",
    siteName: "clearAI株式会社",
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "フィジカルAI受託開発 | clearAI株式会社",
    description,
    images: ["/images/logo.png"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://clearai.jp/physical-ai#service",
  serviceType: "フィジカルAI受託開発",
  name: "フィジカルAI受託開発（ロボット×AIのシステム開発）",
  description,
  url: "https://clearai.jp/physical-ai",
  provider: { "@type": "Organization", name: "clearAI株式会社", url: "https://clearai.jp" },
  areaServed: { "@type": "Country", name: "日本" },
  audience: { "@type": "BusinessAudience", audienceType: "中小企業・製造業・物流・施設運営" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "フィジカルAI受託開発プラン",
    itemListElement: [
      {
        "@type": "Offer",
        name: "PoCパック",
        description: "業務理解〜設計〜PoC構築・現場検証まで。約4〜6週間。",
        price: "1500000",
        priceCurrency: "JPY",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "本番開発パック",
        description: "本番実装・既存システム統合・運用基盤構築まで。3〜6ヶ月。",
        price: "6000000",
        priceCurrency: "JPY",
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: "6000000",
          maxPrice: "30000000",
          priceCurrency: "JPY",
        },
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "運用・改善",
        description: "稼働後の品質モニタリング、モデル・プロンプトのチューニング、新ユースケース追加。",
        price: "300000",
        priceCurrency: "JPY",
        availability: "https://schema.org/InStock",
      },
    ],
  },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": "https://clearai.jp/physical-ai#howto",
  name: "フィジカルAI導入の進め方",
  description:
    "現場ヒアリングからシステム設計、PoCによる現場検証、本番実装、運用・継続改善まで、フィジカルAIを段階的に導入する標準的な進め方。",
  totalTime: "P6M",
  step: [
    { "@type": "HowToStep", position: 1, name: "業務理解・現場ヒアリング", text: "対象業務の流れと現場条件を可視化し、AI・ロボットで置き換える範囲とKPI、投資対効果の見立てを整理します（1〜2週間）。" },
    { "@type": "HowToStep", position: 2, name: "システム設計", text: "機体構成、センサー、AIモデル、連携先システム、安全設計、Human-in-the-loopの置き方、評価軸を定義します（1〜2週間）。" },
    { "@type": "HowToStep", position: 3, name: "PoC開発・現場検証", text: "レンタル機体などを使い実環境でプロトタイプを稼働させ、20〜50ケースで成功率を測定しながら改善します（3〜6週間）。" },
    { "@type": "HowToStep", position: 4, name: "本番実装・統合", text: "既存システム連携、認証・権限、監視・ログ、コスト最適化、Runbook整備を経て本番稼働へ移行します（3〜6ヶ月）。" },
    { "@type": "HowToStep", position: 5, name: "運用・継続改善", text: "稼働後も品質モニタリング、モデル・プロンプトのチューニング、新しいユースケースの追加を継続します（月次継続）。" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://clearai.jp/physical-ai#faq",
  mainEntity: [
    {
      "@type": "Question",
      name: "フィジカルAIとは何ですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "カメラ・センサー・ロボットなど物理的な機器と生成AIを組み合わせ、現実世界で「認識し、判断し、動く」ことを目的としたAIの領域です。画面の中で完結する従来のAIと異なり、設備点検・搬送・接客・外観検査といった現場作業そのものを自動化の対象にできます。",
      },
    },
    {
      "@type": "Question",
      name: "ロボットは自社で購入する必要がありますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "必ずしも必要ありません。clearAIはロボットレンタル事業も行っているため、PoC期間中はレンタル機体で検証し、本番稼働が決まってから購入いただく進め方が可能です。購入・レンタルどちらの前提でも設計できます。",
      },
    },
    {
      "@type": "Question",
      name: "既存の基幹システムと連携できますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "できます。API・データベース・ファイル連携など、既存システム側の仕様に合わせて接続します。連携先が3システム以上になる場合は、設計フェーズを厚めに取って進めます。",
      },
    },
    {
      "@type": "Question",
      name: "PoCで期待した結果が出なかった場合はどうなりますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PoCの段階で成功率や所要時間を数値で測定し、本番化の可否をレポートとしてお渡しします。数値が基準に届かない場合は、本番開発に進まないという判断も含めて率直にお伝えします。",
      },
    },
    {
      "@type": "Question",
      name: "開発したシステムの権利はどちらに帰属しますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "納品するソースコード・リポジトリ・IP・改変権はすべてお客様に帰属します。ベンダーロックインを避け、社内または他社でも継続開発できる状態でお渡しします。",
      },
    },
    {
      "@type": "Question",
      name: "開発期間と費用はどのくらいかかりますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PoCパックが150万円・約4〜6週間、本番実装が600万円〜・3〜6ヶ月が目安です。対象業務が単一で連携システムが少ない場合は、より短期間で稼働するケースもあります。",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: "https://clearai.jp" },
    { "@type": "ListItem", position: 2, name: "フィジカルAI受託開発", item: "https://clearai.jp/physical-ai" },
  ],
};

export default function PhysicalAiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Script id="schema-service-physical-ai" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="schema-howto-physical-ai" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <Script id="schema-faq-physical-ai" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="schema-breadcrumb-physical-ai" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}

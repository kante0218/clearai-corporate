import type { Metadata } from "next";
import Script from "next/script";
import HomeContent from "@/components/HomeContent";
import NewsList from "@/components/NewsList";

export const revalidate = 60;

const description =
  "clearAI株式会社（クリアエーアイ）は、フィジカルAIの受託開発・ロボットレンタル・AI研修の3事業で、中小企業の現場にロボットとAIを実装します。四足歩行ロボットは1日1万円から、受託開発はPoC150万円から、研修は助成金活用で最大75%OFF。茨城県拠点・全国対応。";

export const metadata: Metadata = {
  // レイアウト側の title.template（"%s | clearAI株式会社"）を適用させない
  title: { absolute: "フィジカルAI受託開発・ロボットレンタル・AI研修 | clearAI株式会社" },
  description,
  alternates: { canonical: "https://clearai.jp" },
  openGraph: {
    title: "フィジカルAI受託開発・ロボットレンタル・AI研修 | clearAI株式会社",
    description,
    url: "https://clearai.jp",
    type: "website",
    locale: "ja_JP",
    siteName: "clearAI株式会社",
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "フィジカルAI受託開発・ロボットレンタル・AI研修 | clearAI株式会社",
    description,
    images: ["/images/logo.png"],
  },
};

/* ── 主力3事業の ItemList（AI検索エンジンが事業構成を把握しやすいよう明示） ── */
const coreServicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": "https://clearai.jp/#core-services",
  name: "clearAI 3つの主力事業",
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  numberOfItems: 3,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Service",
        name: "フィジカルAI受託開発",
        url: "https://clearai.jp/physical-ai",
        serviceType: "システム受託開発",
        description:
          "カメラ・センサー・ロボットとAIをつなぎ、設備点検・構内搬送・接客案内・外観検査といった現場作業を自動化するシステムを受託開発します。PoCパック150万円、本番実装600万円〜。",
        provider: { "@id": "https://clearai.jp/#organization" },
        areaServed: { "@type": "Country", name: "日本" },
        offers: { "@type": "Offer", price: "1500000", priceCurrency: "JPY", availability: "https://schema.org/InStock" },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Service",
        name: "ロボットレンタル",
        url: "https://clearai.jp/robot-rental",
        serviceType: "ロボットレンタル",
        description:
          "Unitree・AgiBot などのヒューマノイド・四足歩行ロボットを1日単位でレンタル。四足歩行は1日1万円から、ヒューマノイドは1日10万円から。購入前の現場検証・展示会・PoCに利用できます。",
        provider: { "@id": "https://clearai.jp/#organization" },
        areaServed: { "@type": "Country", name: "日本" },
        offers: { "@type": "Offer", price: "10000", priceCurrency: "JPY", availability: "https://schema.org/InStock" },
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Service",
        name: "AI研修",
        url: "https://clearai.jp/training",
        serviceType: "企業研修",
        description:
          "経営層・管理職・現場担当まで階層別に設計した実践型AI研修。Claude・Vibe Coding のハンズオンで、社員が自分の業務システムを作れる状態を目指します。人材開発支援助成金で研修費は最大75%OFF。",
        provider: { "@id": "https://clearai.jp/#organization" },
        areaServed: { "@type": "Country", name: "日本" },
        offers: { "@type": "Offer", price: "200000", priceCurrency: "JPY", availability: "https://schema.org/InStock" },
      },
    },
  ],
};

/* ── トップページ掲載のQ&Aと1対1で対応するFAQPage ── */
const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://clearai.jp/#home-faq",
  mainEntity: [
    {
      "@type": "Question",
      name: "フィジカルAIとは何ですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "カメラ・センサー・ロボットなど物理的な機器と生成AIを組み合わせ、現実世界で作業や判断を行わせる技術領域を指します。画面の中だけで完結する従来のAIと異なり、点検・搬送・接客といった現場作業そのものを対象にできる点が特徴です。clearAIはこの領域の受託開発を行っています。",
      },
    },
    {
      "@type": "Question",
      name: "ロボットは買わずにレンタルだけでも使えますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "はい。四足歩行ロボットは1日1万円から、ヒューマノイドは1日10万円からレンタルいただけます。展示会での1日利用から、現場PoCのための1ヶ月利用まで対応しており、購入前の適合性検証としてご利用いただくケースが最も多いです。",
      },
    },
    {
      "@type": "Question",
      name: "AIの知識がない社員でも研修についていけますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "問題ありません。コードを書いた経験がない社員を前提に設計しており、AIへ日本語で指示するだけで業務ツールを作る「Vibe Coding」形式のハンズオンから始めます。階層別（経営層・管理職・現場担当）にカリキュラムを分けているため、役割に必要な内容だけを学べます。",
      },
    },
    {
      "@type": "Question",
      name: "補助金・助成金は使えますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "使えます。研修では厚生労働省の人材開発支援助成金により、中小企業は研修経費の最大75%と受講者の賃金が助成対象になります。AI導入・システム開発ではIT導入補助金などが該当する場合があり、対象制度の見極めから申請書類の作成までサポートします。",
      },
    },
    {
      "@type": "Question",
      name: "開発期間と費用はどのくらいかかりますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "フィジカルAIの受託開発は、PoCパックが150万円・約4〜6週間、本番実装が600万円〜・3〜6ヶ月が目安です。研修はスポット20万円〜、パッケージ80万円〜（3ヶ月）。トップページの料金シミュレーションで、条件を選ぶだけで概算をその場で確認できます。",
      },
    },
    {
      "@type": "Question",
      name: "地方の中小企業でも対応してもらえますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "対応可能です。clearAIは茨城県を拠点に全国対応しており、研修・打ち合わせはオンラインで実施できます。ロボットの搬入設置やオペレーター同行が必要な場合も、現地への出張対応を行っています。",
      },
    },
  ],
};

/* ── ご相談から導入までの流れ（HowTo） ── */
const homeHowToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": "https://clearai.jp/#howto-flow",
  name: "clearAIへのご相談から導入までの流れ",
  description:
    "無料相談・現場ヒアリングから、提案、レンタルによる実証、本番開発、研修・内製化までの標準的な進め方。",
  step: [
    { "@type": "HowToStep", position: 1, name: "無料相談・現場ヒアリング", text: "現状の課題と現場条件をうかがい、ロボット・AIで効果が出そうな領域を一緒に特定します（30分・オンライン可）。" },
    { "@type": "HowToStep", position: 2, name: "ご提案・お見積り", text: "受託開発・レンタル・研修のうち最適な組み合わせと、費用・スケジュール・使える補助金をご提案します（1〜2週間）。" },
    { "@type": "HowToStep", position: 3, name: "レンタル実証・PoC", text: "いきなり買わず・作らず、まずはレンタル機体や小規模PoCで現場適合性を検証します（1日〜6週間）。" },
    { "@type": "HowToStep", position: 4, name: "本番開発・導入", text: "検証結果をもとに本番システムを開発し、既存システム連携・監視・運用手順の整備まで行います（3〜6ヶ月）。" },
    { "@type": "HowToStep", position: 5, name: "研修・内製化・運用", text: "社員向け研修で運用能力を社内に残し、稼働後も品質モニタリングと改善を継続します（継続）。" },
  ],
};

/* ── AI検索/音声要約向けに、要点段落を speakable として明示 ── */
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://clearai.jp/#webpage",
  url: "https://clearai.jp",
  name: "フィジカルAI受託開発・ロボットレンタル・AI研修 | clearAI株式会社",
  description,
  inLanguage: "ja",
  isPartOf: { "@id": "https://clearai.jp/#website" },
  about: { "@id": "https://clearai.jp/#organization" },
  primaryImageOfPage: { "@type": "ImageObject", url: "https://clearai.jp/images/logo.png" },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "#services", "#reason"],
  },
};

export default function HomePage() {
  return (
    <>
      <HomeContent newsSlot={<NewsList />} />
      <Script id="schema-home-core-services" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(coreServicesSchema) }} />
      <Script id="schema-home-faq" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }} />
      <Script id="schema-home-howto" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeHowToSchema) }} />
      <Script id="schema-home-webpage" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
    </>
  );
}

import type { Metadata } from "next";
import Script from "next/script";

const description =
  "1日で御社の現場がClaude Codeを使えるようになる出張ブートキャンプ。全国47都道府県をキャラバン形式で巡回し、地方の中小企業の社員でも、その日のうちに自分の業務をAIで自動化できる状態まで引き上げます。最大75%の助成金活用可・成果保証つき。";

export const metadata: Metadata = {
  title: "Claude Code 1DAYブートキャンプ | 全国出張・1日で現場が使えるAI研修",
  description,
  keywords: [
    "Claude Code 研修",
    "Claude Code ブートキャンプ",
    "出張AI研修",
    "地方 AI研修",
    "中小企業 AI内製化",
    "バイブコーディング研修",
    "全国 AI研修",
    "AI 自動化 研修",
  ],
  alternates: { canonical: "https://clearai.jp/claude-bootcamp" },
  openGraph: {
    title: "Claude Code 1DAYブートキャンプ | clearAI株式会社",
    description,
    url: "https://clearai.jp/claude-bootcamp",
    type: "website",
    locale: "ja_JP",
    siteName: "clearAI株式会社",
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Claude Code 1DAYブートキャンプ | clearAI株式会社",
    description,
    images: ["/images/logo.png"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Claude Code 出張研修",
  provider: { "@type": "Organization", name: "clearAI株式会社", url: "https://clearai.jp" },
  areaServed: { "@type": "Country", name: "日本" },
  name: "Claude Code 1DAYブートキャンプ（全国キャラバン）",
  description,
  url: "https://clearai.jp/claude-bootcamp",
  offers: { "@type": "Offer", availability: "https://schema.org/InStock", priceCurrency: "JPY", price: "200000" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: "https://clearai.jp" },
    { "@type": "ListItem", position: 2, name: "Claude Code 1DAYブートキャンプ", item: "https://clearai.jp/claude-bootcamp" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "プログラミング未経験の社員でも本当に大丈夫ですか？",
      acceptedAnswer: { "@type": "Answer", text: "はい。むしろ非エンジニアの方を主対象に設計しています。Claude Codeは自然言語で指示するため、PCの基本操作ができれば参加でき、当日は全員が動くものを完成させて帰ります。" },
    },
    {
      "@type": "Question",
      name: "地方でも、本当に来てもらえますか？",
      acceptedAnswer: { "@type": "Answer", text: "はい。全国47都道府県が対象です。地方の中小企業にこそ届けたく、キャラバン形式で全国を回っています。日程は近隣の開催と合わせて調整します。" },
    },
    {
      "@type": "Question",
      name: "成果保証とは具体的に何を指しますか？",
      acceptedAnswer: { "@type": "Answer", text: "受講者全員が、自分の業務を動かすツール／自動化を最低1つ完成させることを到達基準としており、万一その日のうちに到達できなかった場合は研修費を申し受けません。" },
    },
  ],
};

export default function ClaudeBootcampLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Script id="schema-service-bootcamp" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="schema-breadcrumb-bootcamp" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="schema-faq-bootcamp" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}

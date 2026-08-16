import type { Metadata } from "next";

const description =
  "Claude・Codex × GitHub・Vercel・Firebase で、Webアプリ開発の内製化を実現する出張ブートキャンプ。外注に頼らず自社のチームが、その日のうちに本番Webアプリを作って公開できる状態に。複数講師が全国47都道府県を巡回、成果保証つき・最大75%の助成金活用可。";

export const metadata: Metadata = {
  title: "Webアプリ内製化ブートキャンプ | Claude・Codex × GitHub・Vercel・Firebase",
  description,
  keywords: [
    "Webアプリ 内製化",
    "AI開発 研修",
    "Claude Code 研修",
    "Codex 研修",
    "GitHub Vercel Firebase 研修",
    "出張 開発研修",
    "中小企業 内製化",
    "バイブコーディング研修",
  ],
  alternates: { canonical: "https://clearai.jp/claude-bootcamp" },
  openGraph: {
    title: "Webアプリ内製化ブートキャンプ | ClearAI株式会社",
    description,
    url: "https://clearai.jp/claude-bootcamp",
    type: "website",
    locale: "ja_JP",
    siteName: "ClearAI株式会社",
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Webアプリ内製化ブートキャンプ | ClearAI株式会社",
    description,
    images: ["/images/logo.png"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Claude Code 出張研修",
  provider: { "@type": "Organization", name: "ClearAI株式会社", url: "https://clearai.jp" },
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
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}

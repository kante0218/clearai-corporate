import type { Metadata } from "next";
import RelatedReading from "@/components/seo/RelatedReading";

// 検索結果向けの短い説明。長文は Service スキーマと OG/Twitter 側に温存する。
const description =
  "法人向けのAI内製化研修・生成AI研修。Claude / ChatGPT / Gemini / Copilot から選べ、非エンジニアでも研修中に動く社内ツールが完成。人材開発支援助成金の添付資料も提供、全国対応。";

const serviceDescription =
  "ClearAI株式会社（クリアエーアイ）のAI内製化研修。AIを使って社内システムを自社で作れる人材を育てる実践型プログラム。Claude / ChatGPT / Gemini / Microsoft Copilot から選べるカリキュラムで、非エンジニアでも研修中に動く社内ツールが完成します。人材開発支援助成金の活用を見据え、訓練実施機関として必要な添付資料を提供します。";

export const metadata: Metadata = {
  title: { absolute: "AI内製化研修・生成AI研修 | ClearAI株式会社" },
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

export default function TrainingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <RelatedReading
        description="助成金の使い方、研修後の内製化の進め方、開発を任せる場合の判断材料をまとめています。"
        links={[
          {
            href: "/column/seisei-ai-kenshu-joseikin",
            label: "生成AI研修に使える助成金｜人材開発支援助成金の対象要件と申請の流れ",
            note: "対象になる訓練の条件と、申請の順番を整理しています。",
          },
          {
            href: "/claude-bootcamp",
            label: "Claude Code 法人研修",
            note: "Claude Code でWebアプリを内製するコースの詳細です。",
          },
          {
            href: "/column/ai-jutaku-kaihatsu-gaisha-erabikata",
            label: "AI受託開発会社の選び方｜商談で必ず聞くべき7つの質問",
            note: "内製と外注を切り分けるときの判断材料になります。",
          },
          {
            href: "/software-development",
            label: "AI受託開発",
            note: "研修と並行して、最初の一本を一緒に作る場合はこちらです。",
          },
          {
            href: "/case-studies/ses-sns-automation",
            label: "事例：SES企業のSNS投稿とDMの自動化",
            note: "社内の事務作業をAIに移した実例です。",
          },
          {
            href: "/column",
            label: "コラム一覧",
            note: "AI研修・助成金・内製化の実務記事をまとめています。",
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

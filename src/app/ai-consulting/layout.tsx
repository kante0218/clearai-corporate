import type { Metadata } from "next";
import RelatedReading from "@/components/seo/RelatedReading";

// 検索結果向けの短い説明。長文は Service スキーマと OG/Twitter 側に温存する。
const description =
  "中小企業向けのAIコンサルティング・AI顧問。Forward Deployed Engineer型で現場に入り、生成AI活用の戦略策定から実装・運用定着まで伴走します。茨城発・全国対応。";

const serviceDescription =
  "ClearAI株式会社（クリアエーアイ）のAI導入コンサルティング。生成AI活用・業務自動化・DX推進まで、戦略策定から開発・実装・運用まで一気通貫でサポート。中小企業から大企業まで、貴社に最適なAIソリューションを共に創り上げます。AI顧問・Claude特化導入・CEO向けAI活用にも対応。";

export const metadata: Metadata = {
  title: { absolute: "AIコンサルティング・AI顧問 | ClearAI株式会社" },
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

export default function AiConsultingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <RelatedReading
        description="契約前に決めておく役割分担と、AI顧問の使い方をまとめています。"
        links={[
          {
            href: "/column/ai-komon-souba",
            label: "AI顧問は何をする人か｜契約前に決めるべき役割と、成果が出る使い方",
            note: "顧問に任せる範囲と、社内に残す判断を切り分けて解説しています。",
          },
          {
            href: "/column/ai-jutaku-kaihatsu-gaisha-erabikata",
            label: "AI受託開発会社の選び方｜商談で必ず聞くべき7つの質問",
            note: "実装まで任せる相手を選ぶときの確認事項です。",
          },
          {
            href: "/column/ai-agent-kaihatsu-hiyou",
            label: "AIエージェント開発の費用はどう決まるか",
            note: "構想を実装に移すとき、見積がどう積み上がるかを整理しています。",
          },
          {
            href: "/case-studies/milling-machine-ai-agent",
            label: "事例：フライス盤とAIエージェントを接続した製造業",
            note: "現場に入って自動化の対象を決めた過程を記録しています。",
          },
          {
            href: "/training",
            label: "AI内製化研修",
            note: "伴走と並行して、社内に運用できる人を育てる場合はこちらです。",
          },
          {
            href: "/case-studies",
            label: "導入実績一覧",
            note: "業種別の取り組みと、実際に決めたことをまとめています。",
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

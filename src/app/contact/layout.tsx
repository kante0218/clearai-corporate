import type { Metadata } from "next";
import { RelatedReading } from "@/components/PageHeader";

const description =
  "ClearAI株式会社（クリアエーアイ）へのお問い合わせ。AI受託開発・AI内製化研修・AI顧問・ロボットレンタルの無料相談とお見積もりを受け付けています。2営業日以内に返信、全国対応。";

export const metadata: Metadata = {
  title: "お問い合わせ | 無料相談受付中",
  description,
  keywords: [
    "ClearAI 問い合わせ",
    "クリアエーアイ 問い合わせ",
    "AI導入 相談",
    "AI顧問 相談",
    "AIコンサル 見積もり",
    "AI研修 問い合わせ",
  ],
  alternates: { canonical: "https://clearai.jp/contact" },
  openGraph: {
    title: "お問い合わせ | ClearAI株式会社",
    description,
    url: "https://clearai.jp/contact",
    type: "website",
    locale: "ja_JP",
    siteName: "ClearAI株式会社",
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "お問い合わせ | ClearAI株式会社",
    description,
    images: ["/images/logo.png"],
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "お問い合わせ | ClearAI株式会社",
  url: "https://clearai.jp/contact",
  description,
};

const CONSULT_LINKS = [
  {
    href: "/software-development",
    label: "AI受託開発・AIエージェント開発",
    note: "業務システムやAIエージェントを、要件定義から運用保守まで一貫して開発します。フォームでは「システム・ソフトウェア開発」を選んでください。",
  },
  {
    href: "/training",
    label: "AI内製化研修・生成AI研修",
    note: "社内でシステムを作れる人材を育てる実践型研修です。人材開発支援助成金の対象になる場合があります。",
  },
  {
    href: "/ai-consulting",
    label: "FDEコンサルティング・AI顧問",
    note: "何から手をつけるかが決まっていない段階でも、現場に入って業務の棚卸しから一緒に進めます。",
  },
  {
    href: "/robot-rental",
    label: "ロボットレンタル（Unitree R1・G1・Go2）",
    note: "展示会・実証実験向けのヒューマノイド・四足歩行ロボットの短期レンタルです。料金と対応機種はページでご確認いただけます。",
  },
  {
    href: "/flow",
    label: "ご依頼の流れ",
    note: "お問い合わせのあと、ヒアリング・提案・契約・開発・定着までの各ステップと、止められる地点をまとめています。",
  },
  {
    href: "/faq",
    label: "よくあるご質問（費用・期間・契約形態）",
    note: "費用の考え方、期間、契約形態など、お問い合わせ前によくいただく質問への回答です。",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: "https://clearai.jp" },
    { "@type": "ListItem", position: 2, name: "お問い合わせ", item: "https://clearai.jp/contact" },
  ],
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h1 className="sr-only">お問い合わせ（ClearAI株式会社・無料相談）</h1>
      {children}
      <RelatedReading
        heading="ご相談内容から選ぶ"
        intro="お問い合わせの前に、ご検討中の内容に近いページをご覧いただくと、ヒアリングで確認する項目が分かります。返信は2営業日以内、対応はメールとオンライン面談で全国どこからでも可能です。"
        links={CONSULT_LINKS}
        more={[
          { href: "/case-studies", label: "導入実績を見る" },
          { href: "/download", label: "事業紹介資料をダウンロード" },
          { href: "/column", label: "発注前に読むコラム" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

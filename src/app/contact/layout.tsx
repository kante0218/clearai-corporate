import type { Metadata } from "next";
import Script from "next/script";

const description =
  "clearAI株式会社（クリアエーアイ）へのお問い合わせ。AI導入コンサルティング、AI顧問、AI研修、補助金サポート、Claude特化導入、農業×エンジニアリングなど、無料相談・お見積もりのご依頼はこちらから。メール・オンライン面談で全国対応、平日9:00〜18:00。";

export const metadata: Metadata = {
  title: "お問い合わせ | 無料相談受付中",
  description,
  keywords: [
    "clearAI 問い合わせ",
    "クリアエーアイ 問い合わせ",
    "AI導入 相談",
    "AI顧問 相談",
    "AIコンサル 見積もり",
    "AI研修 問い合わせ",
    "農業 EC 構築 相談",
  ],
  alternates: { canonical: "https://clearai.jp/contact" },
  openGraph: {
    title: "お問い合わせ | clearAI株式会社",
    description,
    url: "https://clearai.jp/contact",
    type: "website",
    locale: "ja_JP",
    siteName: "clearAI株式会社",
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "お問い合わせ | clearAI株式会社",
    description,
    images: ["/images/logo.png"],
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "お問い合わせ | clearAI株式会社",
  url: "https://clearai.jp/contact",
  description,
};

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
      {children}
      <Script
        id="schema-contactpage"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <Script
        id="schema-breadcrumb-contact"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

import type { Metadata } from "next";
import Script from "next/script";
import { faqItems } from "./faq-data";

const description =
  "clearAI株式会社のよくあるご質問。AIコンサルティングの費用感・導入期間・契約形態、補助金の活用可否、中小企業や個人事業主でも依頼できるか、秘密保持、茨城県外からの相談まで。検討前の疑問にまとめてお答えします。";

export const metadata: Metadata = {
  title: "よくあるご質問 | clearAI株式会社",
  description,
  keywords: [
    "clearAI FAQ",
    "AIコンサル 費用",
    "AI導入 中小企業",
    "AI研修 料金",
    "AI 補助金",
    "生成AI 契約",
    "NDA AI",
  ],
  alternates: { canonical: "https://clearai.jp/faq" },
  openGraph: {
    title: "よくあるご質問 | clearAI株式会社",
    description,
    url: "https://clearai.jp/faq",
    type: "website",
    locale: "ja_JP",
    siteName: "clearAI株式会社",
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "よくあるご質問 | clearAI株式会社",
    description,
    images: ["/images/logo.png"],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: "https://clearai.jp" },
    { "@type": "ListItem", position: 2, name: "よくあるご質問", item: "https://clearai.jp/faq" },
  ],
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Script id="schema-faq" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="schema-breadcrumb-faq" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}

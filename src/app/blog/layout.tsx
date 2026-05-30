import type { Metadata } from "next";
import Script from "next/script";

const description =
  "clearAI株式会社のお知らせ・ブログ。AI活用、生成AI、DX推進、AI研修・顧問、ロボットレンタルに関する最新情報や導入事例、技術ナレッジを発信しています。";

export const metadata: Metadata = {
  title: "お知らせ・ブログ",
  description,
  alternates: { canonical: "https://clearai.jp/blog" },
  openGraph: {
    title: "お知らせ・ブログ | clearAI株式会社",
    description,
    url: "https://clearai.jp/blog",
    type: "website",
    locale: "ja_JP",
    siteName: "clearAI株式会社",
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "お知らせ・ブログ | clearAI株式会社",
    description,
    images: ["/images/logo.png"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: "https://clearai.jp" },
    { "@type": "ListItem", position: 2, name: "お知らせ", item: "https://clearai.jp/blog" },
  ],
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Script
        id="schema-breadcrumb-blog"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

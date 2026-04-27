import type { Metadata } from "next";
import Script from "next/script";

const description =
  "翡翠（かわせみ）プロジェクトは、志ある若者を一次産業（農業・林業・漁業）の現場へ導き、産業として再設計し、日本の自然と田舎を未来へ引き継ぐ実践型プロジェクトです。";

export const metadata: Metadata = {
  title: "翡翠（かわせみ）プロジェクト | clearAI株式会社",
  description,
  keywords: [
    "翡翠プロジェクト",
    "かわせみプロジェクト",
    "Kawasemi Project",
    "一次産業",
    "農業",
    "林業",
    "漁業",
    "地方創生",
    "後継者育成",
    "担い手",
    "人材育成",
    "地域共創",
    "clearAI",
    "クリアエーアイ",
  ],
  alternates: { canonical: "https://clearai.jp/ai-agriculture/kawasemi" },
  openGraph: {
    title: "翡翠（かわせみ）プロジェクト | clearAI株式会社",
    description,
    url: "https://clearai.jp/ai-agriculture/kawasemi",
    type: "website",
    locale: "ja_JP",
    siteName: "clearAI株式会社",
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "翡翠（かわせみ）プロジェクト | clearAI株式会社",
    description,
    images: ["/images/logo.png"],
  },
};

const projectSchema = {
  "@context": "https://schema.org",
  "@type": "Project",
  name: "翡翠（かわせみ）プロジェクト",
  description,
  url: "https://clearai.jp/ai-agriculture/kawasemi",
  funder: {
    "@type": "Organization",
    name: "clearAI株式会社",
    url: "https://clearai.jp",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: "https://clearai.jp" },
    { "@type": "ListItem", position: 2, name: "農業×エンジニアリング", item: "https://clearai.jp/ai-agriculture" },
    { "@type": "ListItem", position: 3, name: "翡翠（かわせみ）プロジェクト", item: "https://clearai.jp/ai-agriculture/kawasemi" },
  ],
};

export default function KawasemiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Script
        id="schema-project-kawasemi"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <Script
        id="schema-breadcrumb-kawasemi"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

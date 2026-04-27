import type { Metadata } from "next";
import Script from "next/script";

const description =
  "clearAIのウェブサイト作成サービス。コーポレートサイト・LP・採用サイトをAI活用で高速制作。Next.js + Vercelによる高速表示、SEO対応、Headless CMSによる運用しやすさ、AI時代の検索（SGE/AI Overviews）対応まで一貫支援します。";

export const metadata: Metadata = {
  title: "ウェブサイト作成 | AI時代に成果が出るサイトを高速制作",
  description,
  keywords: [
    "ウェブサイト制作",
    "ホームページ作成",
    "コーポレートサイト",
    "LP制作",
    "Next.js 制作",
    "AI SEO",
    "Headless CMS",
  ],
  alternates: { canonical: "https://clearai.jp/website" },
  openGraph: {
    title: "ウェブサイト作成 | clearAI株式会社",
    description,
    url: "https://clearai.jp/website",
    type: "website",
    locale: "ja_JP",
    siteName: "clearAI株式会社",
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "ウェブサイト作成 | clearAI株式会社",
    description,
    images: ["/images/logo.png"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "ウェブサイト制作",
  provider: { "@type": "Organization", name: "clearAI株式会社", url: "https://clearai.jp" },
  areaServed: { "@type": "Country", name: "日本" },
  name: "AI時代のウェブサイト制作",
  description,
  url: "https://clearai.jp/website",
  offers: { "@type": "Offer", availability: "https://schema.org/InStock" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: "https://clearai.jp" },
    { "@type": "ListItem", position: 2, name: "ウェブサイト作成", item: "https://clearai.jp/website" },
  ],
};

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Script id="schema-service-website" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="schema-breadcrumb-website" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}

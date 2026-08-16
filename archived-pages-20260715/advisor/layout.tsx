import type { Metadata } from "next";
import Script from "next/script";

const description =
  "clearAIのAI顧問サービス。月2.5万円〜、AIアドバイザーがチャット相談、会議参加、内製化支援、IT・テクノロジー全般の相談まで継続伴走します。ライトは限定10社。";

export const metadata: Metadata = {
  title: "AI顧問 | 月2.5万円〜、AI活用を継続伴走するアドバイザー",
  description,
  keywords: [
    "AI顧問",
    "AIアドバイザー",
    "AI顧問サービス",
    "生成AI顧問",
    "AI相談",
    "AI戦略顧問",
    "月額AI支援",
  ],
  alternates: { canonical: "https://clearai.jp/advisor" },
  openGraph: {
    title: "AI顧問 | clearAI株式会社",
    description,
    url: "https://clearai.jp/advisor",
    type: "website",
    locale: "ja_JP",
    siteName: "clearAI株式会社",
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI顧問 | clearAI株式会社",
    description,
    images: ["/images/logo.png"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "AI顧問",
  provider: {
    "@type": "Organization",
    name: "clearAI株式会社",
    url: "https://clearai.jp",
  },
  areaServed: { "@type": "Country", name: "日本" },
  name: "AI顧問サービス",
  description,
  url: "https://clearai.jp/advisor",
  offers: {
    "@type": "Offer",
    price: "25000",
    priceCurrency: "JPY",
    availability: "https://schema.org/InStock",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: "https://clearai.jp" },
    { "@type": "ListItem", position: 2, name: "AI顧問", item: "https://clearai.jp/advisor" },
  ],
};

export default function AdvisorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Script id="schema-service-advisor" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="schema-breadcrumb-advisor" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}

import type { Metadata } from "next";
import Script from "next/script";

const description =
  "clearAIのヒューマノイド外装事業。家庭・店舗・オフィスに溶け込むヒューマノイドの外装（シェル・パネル・仕上げ）を、デザインから量産まで一貫して請け負います。受託デザイン・試作・小ロット製造・量産支援に対応。";

export const metadata: Metadata = {
  title: "ヒューマノイド外装 | デザインから量産までを一気通貫で",
  description,
  keywords: [
    "ヒューマノイド",
    "ヒューマノイドロボット",
    "ロボット外装",
    "ロボットデザイン",
    "ロボティクス",
    "外装受託",
    "ロボット筐体",
  ],
  alternates: { canonical: "https://clearai.jp/humanoid" },
  openGraph: {
    title: "ヒューマノイド外装 | clearAI株式会社",
    description,
    url: "https://clearai.jp/humanoid",
    type: "website",
    locale: "ja_JP",
    siteName: "clearAI株式会社",
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "ヒューマノイド外装 | clearAI株式会社",
    description,
    images: ["/images/logo.png"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "ヒューマノイド外装デザイン・製造",
  provider: {
    "@type": "Organization",
    name: "clearAI株式会社",
    url: "https://clearai.jp",
  },
  areaServed: { "@type": "Country", name: "日本" },
  name: "ヒューマノイド外装事業",
  description,
  url: "https://clearai.jp/humanoid",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: "https://clearai.jp" },
    { "@type": "ListItem", position: 2, name: "ヒューマノイド外装", item: "https://clearai.jp/humanoid" },
  ],
};

export default function HumanoidLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Script id="schema-service-humanoid" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="schema-breadcrumb-humanoid" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}

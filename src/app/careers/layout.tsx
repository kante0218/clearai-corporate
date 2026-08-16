import type { Metadata } from "next";

const description =
  "ClearAI株式会社の採用情報。ハードウェアエンジニア、共同創業者、営業、バックオフィスを募集しています。AIとロボティクスで日本の現場を変えるチームに参加してください。茨城・東京・リモート併用可。";

export const metadata: Metadata = {
  title: "採用情報 | ClearAI株式会社",
  description,
  alternates: { canonical: "https://clearai.jp/careers" },
  openGraph: {
    title: "採用情報 | ClearAI株式会社",
    description,
    url: "https://clearai.jp/careers",
    type: "website",
    locale: "ja_JP",
    siteName: "ClearAI株式会社",
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "採用情報 | ClearAI株式会社",
    description,
    images: ["/images/logo.png"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: "https://clearai.jp" },
    { "@type": "ListItem", position: 2, name: "採用情報", item: "https://clearai.jp/careers" },
  ],
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

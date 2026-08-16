import type { Metadata } from "next";

const description =
  "ClearAI株式会社（クリアエーアイ）の無料相談をオンラインで日程予約。Googleカレンダーからご都合の良い時間を選ぶだけで、30分のAI活用無料相談を予約できます。全国オンライン対応。";

export const metadata: Metadata = {
  title: "無料相談を予約 | 日程調整",
  description,
  keywords: [
    "ClearAI 無料相談 予約",
    "クリアエーアイ 日程調整",
    "AI導入 相談 予約",
    "AI顧問 無料相談",
    "オンライン面談 予約",
  ],
  alternates: { canonical: "https://clearai.jp/reserve" },
  openGraph: {
    title: "無料相談を予約 | ClearAI株式会社",
    description,
    url: "https://clearai.jp/reserve",
    type: "website",
    locale: "ja_JP",
    siteName: "ClearAI株式会社",
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "無料相談を予約 | ClearAI株式会社",
    description,
    images: ["/images/logo.png"],
  },
};

const reserveSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "無料相談を予約 | ClearAI株式会社",
  url: "https://clearai.jp/reserve",
  description,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: "https://clearai.jp" },
    { "@type": "ListItem", position: 2, name: "無料相談を予約", item: "https://clearai.jp/reserve" },
  ],
};

export default function ReserveLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reserveSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

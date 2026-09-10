import type { Metadata } from "next";

const description =
  "ClearAI株式会社（クリアエーアイ）の全ページ一覧。AI受託開発・AI内製化研修・FDEコンサル・ロボットレンタルの各ページへ移動できます。";

export const metadata: Metadata = {
  // absolute にしないとルートの template が付き、トップと同じ title になって重複扱いになる。
  title: { absolute: "サイトマップ | ClearAI株式会社" },
  description,
  alternates: { canonical: "https://clearai.jp/sitemap-page" },
  openGraph: {
    title: "サイトマップ | ClearAI株式会社",
    description,
    url: "https://clearai.jp/sitemap-page",
    type: "website",
    locale: "ja_JP",
    siteName: "ClearAI株式会社",
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "サイトマップ | ClearAI株式会社",
    description,
    images: ["/images/logo.png"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: "https://clearai.jp" },
    { "@type": "ListItem", position: 2, name: "サイトマップ", item: "https://clearai.jp/sitemap-page" },
  ],
};

export default function SitemapPageLayout({ children }: { children: React.ReactNode }) {
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

import type { Metadata } from "next";

const description = "ClearAIのAIO（AI検索最適化）支援。既存SEOを土台に、AI回答で参照される情報の整理、サイト構造の見直し、表示・引用状況の確認を進めます。引用や順位を保証するものではありません。";
export const metadata: Metadata = {
  title: "AIO・AI検索最適化支援",
  description,
  alternates: { canonical: "https://clearai.jp/aio" },
  openGraph: { title: "AIO・AI検索最適化支援 | ClearAI株式会社", description, url: "https://clearai.jp/aio", type: "website", locale: "ja_JP", images: ["/images/logo.png"] },
  twitter: { card: "summary_large_image", title: "AIO・AI検索最適化支援 | ClearAI株式会社", description, images: ["/images/logo.png"] },
};
export default function AioLayout({ children }: { children: React.ReactNode }) {
  const schema = { "@context": "https://schema.org", "@type": "Service", name: "AIO・AI検索最適化支援", description, url: "https://clearai.jp/aio", provider: { "@type": "Organization", name: "ClearAI株式会社", url: "https://clearai.jp" } };
  return <>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /></>;
}

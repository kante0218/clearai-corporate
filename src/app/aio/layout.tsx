import type { Metadata } from "next";

const description = "AI回答で比較・検討されるための情報を整える、ClearAIのAIO・AI検索最適化支援。質問の分析、一次情報の設計、サイトの制作・技術改善、公開後の測定まで。対応範囲と費用は個別にお見積りします。";
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

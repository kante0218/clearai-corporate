import type { Metadata } from "next";
import type { ReactNode } from "react";
const description = "ClearAIのGoogleマップ・MEO支援。Googleビジネスプロフィールの店舗情報整備、写真・投稿の運用、口コミ返信、レポートと改善提案を、必要な範囲からご相談いただけます。料金は要相談。順位や売上は保証していません。";
const url = "https://clearai.jp/meo";
export const metadata: Metadata = {
  title: "Googleマップ・MEO支援",
  description,
  alternates: { canonical: url },
  openGraph: { title: "Googleマップ・MEO支援 | ClearAI株式会社", description, url, type: "website", locale: "ja_JP", siteName: "ClearAI株式会社", images: ["/images/logo.png"] },
  twitter: { card: "summary_large_image", title: "Googleマップ・MEO支援 | ClearAI株式会社", description, images: ["/images/logo.png"] },
};
export default function Layout({ children }: { children: ReactNode }) { return children; }

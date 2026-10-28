import type { Metadata } from "next";
import type { ReactNode } from "react";
const description = "ClearAIのSNS運用代行。発信の目的と対象を整理し、投稿企画・文章と画像の制作・投稿管理・分析改善を支援します。AIによる下書きと人による確認を組み合わせ、企業の承認を経て運用します。費用は個別にお見積りします。";
const url = "https://clearai.jp/sns-management";
export const metadata: Metadata = {
  title: "SNS運用代行",
  description,
  alternates: { canonical: url },
  openGraph: { title: "SNS運用代行 | ClearAI株式会社", description, url, type: "website", locale: "ja_JP", siteName: "ClearAI株式会社", images: ["/images/logo.png"] },
  twitter: { card: "summary_large_image", title: "SNS運用代行 | ClearAI株式会社", description, images: ["/images/logo.png"] },
};
export default function Layout({ children }: { children: ReactNode }) { return children; }

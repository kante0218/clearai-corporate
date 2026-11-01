import type { Metadata } from "next";
import type { ReactNode } from "react";

const description = "ClearAIのMEO事業。Googleビジネスプロフィールの店舗情報整備、写真・投稿の運用、口コミ返信、レポートと改善提案を支援します。支援範囲と料金は個別にご相談いただけます。";
const url = "https://clearai.jp/web-marketing";

export const metadata: Metadata = {
  title: "Googleマップ・MEO支援",
  description,
  alternates: { canonical: url },
  openGraph: { title: "Googleマップ・MEO支援 | ClearAI株式会社", description, url, type: "website", locale: "ja_JP", siteName: "ClearAI株式会社", images: ["/images/logo.png"] },
  twitter: { card: "summary_large_image", title: "Googleマップ・MEO支援 | ClearAI株式会社", description, images: ["/images/logo.png"] },
};

export default function Layout({ children }: { children: ReactNode }) { return children; }

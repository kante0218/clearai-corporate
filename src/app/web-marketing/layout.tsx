import type { Metadata } from "next";
import type { ReactNode } from "react";

const description = "ClearAIのウェブマーケティング事業。MEO・AIO・SEO、フォーム営業自動化、SNS運用、ホームページ制作・改善の4つを、集客・営業の目的に合わせて支援します。";
const url = "https://clearai.jp/web-marketing";

export const metadata: Metadata = {
  title: "ウェブマーケティング事業",
  description,
  alternates: { canonical: url },
  openGraph: { title: "ウェブマーケティング事業 | ClearAI株式会社", description, url, type: "website", locale: "ja_JP", siteName: "ClearAI株式会社", images: ["/images/logo.png"] },
  twitter: { card: "summary_large_image", title: "ウェブマーケティング事業 | ClearAI株式会社", description, images: ["/images/logo.png"] },
};

export default function Layout({ children }: { children: ReactNode }) { return children; }

import type { Metadata } from "next";
import type { ReactNode } from "react";
const description = "ClearAIのサービス一覧。Aqua、まぜまぜReadingの公式サイトと、準備中の猫シフト、Stella、PR Businessをご紹介します。";
export const metadata: Metadata = {
  title: "サービス・プロダクト一覧",
  description,
  alternates: { canonical: "https://clearai.jp/products" },
  openGraph: { title: "サービス・プロダクト一覧 | ClearAI株式会社", description, url: "https://clearai.jp/products", type: "website", locale: "ja_JP" },
};
export default function Layout({ children }: { children: ReactNode }) { return children; }

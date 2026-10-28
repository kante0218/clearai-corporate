import type { Metadata } from "next";
import type { ReactNode } from "react";
const description = "ClearAIのホームページ制作。事業の強みと伝えたい内容を整理し、構成・デザイン・実装・公開まで支援します。新規制作・リニューアルの範囲、費用、スケジュールはご相談のうえ決定します。";
export const metadata: Metadata = {
  title: "ホームページ制作・リニューアル",
  description,
  alternates: { canonical: "https://clearai.jp/website-production" },
  openGraph: { title: "ホームページ制作 | ClearAI株式会社", description, url: "https://clearai.jp/website-production", type: "website", locale: "ja_JP" },
};
export default function Layout({ children }: { children: ReactNode }) { return children; }

import type { Metadata } from "next";

// ローカル検証専用の書体比較ページ。検索エンジンには出さない。
export const metadata: Metadata = {
  title: "Font Lab（社内検証用）",
  robots: { index: false, follow: false },
};

export default function FontLabLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

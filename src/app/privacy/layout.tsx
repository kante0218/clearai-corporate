import type { Metadata } from "next";

const description =
  "ClearAI株式会社（クリアエーアイ）のプライバシーポリシー。個人情報の取り扱い・利用目的・第三者提供・開示請求などの方針について。";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description,
  alternates: { canonical: "https://clearai.jp/privacy" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    title: "プライバシーポリシー | ClearAI株式会社",
    description,
    url: "https://clearai.jp/privacy",
    type: "website",
    locale: "ja_JP",
    siteName: "ClearAI株式会社",
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

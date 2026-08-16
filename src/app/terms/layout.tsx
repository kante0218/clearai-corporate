import type { Metadata } from "next";

const description =
  "ClearAI株式会社（クリアエーアイ）の利用規約。当社サービスのご利用にあたっての規約をご確認いただけます。";

export const metadata: Metadata = {
  title: "利用規約",
  description,
  alternates: { canonical: "https://clearai.jp/terms" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    title: "利用規約 | ClearAI株式会社",
    description,
    url: "https://clearai.jp/terms",
    type: "website",
    locale: "ja_JP",
    siteName: "ClearAI株式会社",
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

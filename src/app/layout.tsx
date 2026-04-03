import type { Metadata } from "next";
import { Noto_Sans_JP, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://clearai.jp"),
  title: {
    default: "clear AI株式会社 | AIで、ビジネスの未来を切り拓く",
    template: "%s | clear AI株式会社",
  },
  description:
    "clear AI株式会社は、AI導入支援とAI面接プラットフォーム「導（みちびき）」の2事業で企業のDX推進を支援します。",
  keywords: [
    "clear AI", "AI導入", "AI面接", "DX推進", "導", "みちびき",
    "企業AI", "AI活用", "採用AI", "生成AI導入",
  ],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "clear AI株式会社",
  },
  alternates: {
    canonical: "https://clearai.jp",
  },
  verification: {
    google: "nE6Ji9Kv43p2EsW5odNprPtSSmKWya33nWYBZNJ5lSc",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${inter.variable}`}>
      <body className="font-sans antialiased text-navy-950 bg-white">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

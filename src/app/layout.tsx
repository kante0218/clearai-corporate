import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Inter } from "next/font/google";
import Script from "next/script";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#2563eb",
};

const ogDescription =
  "clearAI株式会社は、AIコンサルティング事業と農業×エンジニアリング事業を展開。企業のAI戦略策定から実装・運用まで伴走し、農家にはEC構築・利益率改善・業務効率化をエンジニアの力で支援。2026年創業、茨城県拠点。";

export const metadata: Metadata = {
  metadataBase: new URL("https://clearai.jp"),
  title: {
    default: "clearAI株式会社 | AI導入コンサルティング & 農業×エンジニアリング",
    template: "%s | clearAI株式会社",
  },
  description: ogDescription,
  keywords: [
    "clearAI", "AIコンサルティング", "AI導入", "農業EC", "農家支援",
    "企業AI", "AI活用", "生成AI", "DX推進", "利益率改善", "農業エンジニアリング",
  ],
  authors: [{ name: "clearAI株式会社" }],
  creator: "clearAI株式会社",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "clearAI株式会社",
    url: "https://clearai.jp",
    title: "clearAI株式会社",
    description: ogDescription,
    images: [
      {
        url: "/images/logo.png",
        width: 1207,
        height: 366,
        alt: "clearAI株式会社",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "clearAI株式会社",
    description: ogDescription,
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://clearai.jp",
  },
  verification: {
    google: "nE6Ji9Kv43p2EsW5odNprPtSSmKWya33nWYBZNJ5lSc",
  },
  category: "technology",
  applicationName: "clearAI",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "clearAI株式会社",
  "alternateName": "clearAI Inc.",
  "url": "https://clearai.jp",
  "logo": "https://clearai.jp/images/logo.png",
  "foundingDate": "2026-04",
  "description": "AIコンサルティングと農業×エンジニアリングの2事業を展開する日本のAI企業。",
  "founder": { "@type": "Person", "name": "髙橋 敢輝" },
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "茨城県",
    "addressCountry": "JP",
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "info@and-clearai.com",
    "availableLanguage": ["Japanese"],
  },
  "sameAs": [],
  "knowsAbout": [
    "AIコンサルティング",
    "生成AI",
    "DX推進",
    "業務自動化",
    "農業DX",
    "スマート農業",
    "AgriTech",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "clearAI株式会社",
  "url": "https://clearai.jp",
  "inLanguage": "ja",
  "publisher": {
    "@type": "Organization",
    "name": "clearAI株式会社",
    "url": "https://clearai.jp",
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://clearai.jp/blog?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning className={`${notoSansJP.variable} ${inter.variable}`}>
      <body className="font-sans antialiased text-navy-950 bg-white">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Script
          id="schema-organization"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="schema-website"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </body>
    </html>
  );
}

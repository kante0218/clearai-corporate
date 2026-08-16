import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IntroLoader from "@/components/IntroLoader";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

// 2026-08-11: 固定幅ビューポート(PC縮小表示)を試したが、横並びレイアウトが
// 電話幅に押し込まれて変な改行が多発するため標準のレスポンシブへ回帰。
// モバイルの不満点(ヒーローが画面を使いすぎる/横ムニムニ)は
// コンポーネント側のモバイル用スタイルで解消している。
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111827",
};

const ogDescription =
  "ClearAI株式会社（クリアエーアイ／読み方：クリアエーアイ）は、日本の中小企業向けにAIの受託開発・導入支援を行うAI企業です。AIを組み込んだ業務システムやAIエージェントの受託開発、現場に入り込むFDEコンサルティング、社内で作れる人材を育てるAI内製化研修の3つを軸に、要件定義から実装・運用・定着まで一気通貫で伴走します。2026年4月創業、茨城県拠点、全国対応。";

export const metadata: Metadata = {
  metadataBase: new URL("https://clearai.jp"),
  title: {
    default: "ClearAI株式会社｜AI受託開発・FDEコンサルティング・AI内製化研修",
    template: "%s | ClearAI株式会社",
  },
  description: ogDescription,
  keywords: [
    // 正式名称・主要表記
    "ClearAI", "ClearAI株式会社", "clear AI", "Clear AI", "Clear Ai",
    "クリアエーアイ", "クリアAI", "クリア・エーアイ", "クリアーエーアイ",
    "クリアエイアイ", "clearai", "clearai.jp", "クリアエーアイ株式会社",
    // 事業キーワード
    "AI受託開発", "AIエージェント開発", "業務システム開発", "システム開発会社",
    "AIコンサルティング", "AI導入", "AI顧問", "AI導入支援", "AI活用",
    "生成AI", "LLM活用", "DX推進", "業務自動化", "AI研修", "AI内製化",
    "生成AI研修", "AI研修 助成金", "Claude", "Claude Code", "Claude導入",
    // 地域・業種
    "茨城県 AI", "関東 AIコンサル", "中小企業 AI導入", "日本 AI企業",
  ],
  authors: [{ name: "ClearAI株式会社" }],
  creator: "ClearAI株式会社",
  publisher: "ClearAI株式会社",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "ClearAI株式会社",
    url: "https://clearai.jp",
    title: "ClearAI株式会社",
    description: ogDescription,
    images: [
      {
        url: "/images/logo.png",
        width: 1254,
        height: 1254,
        alt: "ClearAI株式会社",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ClearAI株式会社",
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
    languages: {
      "ja-JP": "https://clearai.jp",
      "x-default": "https://clearai.jp",
    },
  },
  verification: {
    google: "nE6Ji9Kv43p2EsW5odNprPtSSmKWya33nWYBZNJ5lSc",
  },
  category: "technology",
  applicationName: "ClearAI",
  icons: {
    icon: [
      { url: "/icon.png?v=20260812", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/icon.png?v=20260812",
    apple: "/apple-icon.png?v=20260812",
  },
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
  "@id": "https://clearai.jp/#organization",
  "name": "ClearAI株式会社",
  "legalName": "ClearAI株式会社",
  "alternateName": [
    "ClearAI Inc.",
    "ClearAI",
    "clear AI",
    "Clear AI",
    "clearai",
    "クリアエーアイ",
    "クリアエーアイ株式会社",
    "クリアAI",
    "クリア・エーアイ",
    "クリアーエーアイ",
    "クリアエイアイ",
    "クリア AI",
  ],
  "url": "https://clearai.jp",
  "logo": {
    "@type": "ImageObject",
    "url": "https://clearai.jp/images/logo.png",
    "width": 1254,
    "height": 1254,
  },
  "image": "https://clearai.jp/images/logo.png",
  "foundingDate": "2026-04",
  "foundingLocation": {
    "@type": "Place",
    "name": "茨城県",
    "address": { "@type": "PostalAddress", "addressRegion": "茨城県", "addressCountry": "JP" },
  },
  "description":
    "ClearAI株式会社（読み方：クリアエーアイ）は、日本の中小企業向けにAIの受託開発・導入支援を行うAI企業。AIを組み込んだ業務システムやAIエージェントの受託開発、FDEコンサルティング、AI内製化研修の3領域を提供する。",
  "slogan": "AIで、すべてをクリアにする。",
  "founder": { "@type": "Person", "name": "髙橋 敢輝" },
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "茨城県",
    "addressCountry": "JP",
  },
  "areaServed": { "@type": "Country", "name": "日本" },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "info@clearai.jp",
      "availableLanguage": ["Japanese", "ja"],
      "areaServed": "JP",
    },
    {
      "@type": "ContactPoint",
      "contactType": "sales",
      "email": "info@clearai.jp",
      "availableLanguage": ["Japanese", "ja"],
      "areaServed": "JP",
    },
  ],
  "email": "info@clearai.jp",
  "sameAs": [],
  "knowsAbout": [
    "AI受託開発",
    "AIエージェント開発",
    "業務システム開発",
    "AIコンサルティング",
    "AI導入支援",
    "AI顧問",
    "AI内製化研修",
    "生成AI",
    "LLM活用",
    "DX推進",
    "業務自動化",
    "Claude",
    "Claude Code",
    "ヒューマノイドロボット",
    "四足歩行ロボット",
  ],
  "makesOffer": [
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "システム・ソフトウェア開発（AI受託開発）", "url": "https://clearai.jp/software-development" } },
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "FDEコンサルティング", "url": "https://clearai.jp/ai-consulting" } },
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI内製化研修", "url": "https://clearai.jp/training" } },
  ],
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://clearai.jp/#professionalservice",
  "name": "ClearAI株式会社（クリアエーアイ）",
  "alternateName": ["ClearAI Inc.", "ClearAI", "クリアエーアイ", "クリアAI"],
  "url": "https://clearai.jp",
  "logo": "https://clearai.jp/images/logo.png",
  "image": "https://clearai.jp/images/logo.png",
  "description":
    "AIを組み込んだ業務システム・AIエージェントの受託開発、現場に入り込むFDEコンサルティング、社内で作れる人材を育てるAI内製化研修を提供する日本のAI専門企業。",
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "茨城県",
    "addressCountry": "JP",
  },
  "areaServed": { "@type": "Country", "name": "日本" },
  "priceRange": "¥¥",
  "openingHours": "Mo-Fr 09:00-18:00",
  "email": "info@clearai.jp",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "ClearAI サービス一覧",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "システム・ソフトウェア開発（AI受託開発）",
          "description": "AIを組み込んだ業務システム・AIエージェント・Webアプリ・モバイルアプリを、要件定義から設計・開発・リリース・運用保守まで一貫して受託開発。",
          "url": "https://clearai.jp/software-development",
        },
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "FDEコンサルティング",
          "description": "Forward Deployed Engineer型で現場に入り込み、AI活用の戦略策定から実装・定着まで一気通貫で伴走するコンサルティング。",
          "url": "https://clearai.jp/ai-consulting",
        },
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI内製化研修",
          "description": "AIを使って社内システムを自社で作れる人材を育てる実践型研修。Claude / ChatGPT / Gemini / Microsoft Copilot から選べるカリキュラム。",
          "url": "https://clearai.jp/training",
        },
      },
    ],
  },
};


const siteNavigationSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    { "@type": "SiteNavigationElement", "position": 1, "name": "システム・ソフトウェア開発", "url": "https://clearai.jp/software-development" },
    { "@type": "SiteNavigationElement", "position": 2, "name": "ロボットレンタル", "url": "https://clearai.jp/robot-rental" },
    { "@type": "SiteNavigationElement", "position": 3, "name": "FDEコンサルティング", "url": "https://clearai.jp/ai-consulting" },
    { "@type": "SiteNavigationElement", "position": 4, "name": "AI内製化研修", "url": "https://clearai.jp/training" },
    { "@type": "SiteNavigationElement", "position": 5, "name": "導入実績", "url": "https://clearai.jp/case-studies" },
    { "@type": "SiteNavigationElement", "position": 6, "name": "コラム", "url": "https://clearai.jp/column" },
    { "@type": "SiteNavigationElement", "position": 7, "name": "私たちについて", "url": "https://clearai.jp/about" },
    { "@type": "SiteNavigationElement", "position": 8, "name": "お問い合わせ", "url": "https://clearai.jp/contact" },
    { "@type": "SiteNavigationElement", "position": 9, "name": "よくある質問", "url": "https://clearai.jp/faq" },
    { "@type": "SiteNavigationElement", "position": 10, "name": "お知らせ・ブログ", "url": "https://clearai.jp/blog" },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://clearai.jp/#website",
  "name": "ClearAI株式会社",
  "alternateName": [
    "ClearAI",
    "clear AI",
    "クリアエーアイ",
    "クリアAI",
    "クリアーエーアイ",
    "クリア・エーアイ",
    "clearai.jp",
  ],
  "url": "https://clearai.jp",
  "inLanguage": "ja",
  "publisher": { "@id": "https://clearai.jp/#organization" },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://clearai.jp/blog?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

// NOTE: no site-wide BreadcrumbList here on purpose. A breadcrumb emitted from the
// root layout would declare the same trail on every URL, which contradicts the
// per-page BreadcrumbList each route already emits.
const jsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    organizationSchema,
    websiteSchema,
    professionalServiceSchema,
    siteNavigationSchema,
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
      </head>
      <body className="font-sans antialiased text-neutral-900 bg-white">
        <IntroLoader />
        <LanguageProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}

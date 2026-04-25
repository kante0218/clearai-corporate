import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

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
  "clearAI株式会社（クリアエーアイ／読み方：クリアエーアイ）は、AIコンサルティング事業と農業×エンジニアリング事業を展開。企業のAI戦略策定から実装・運用まで伴走し、農家にはEC構築・利益率改善・業務効率化をエンジニアの力で支援。AI顧問・AI研修・補助金サポート・Claude特化導入にも対応。2026年創業、茨城県拠点。";

export const metadata: Metadata = {
  metadataBase: new URL("https://clearai.jp"),
  title: {
    default: "clearAI株式会社（クリアエーアイ） | AI導入コンサルティング & 農業×エンジニアリング",
    template: "%s | clearAI株式会社（クリアエーアイ）",
  },
  description: ogDescription,
  keywords: [
    // 正式名称・主要表記
    "clearAI", "clearAI株式会社", "clear AI", "Clear AI", "Clear Ai",
    "クリアエーアイ", "クリアAI", "クリア・エーアイ", "クリアーエーアイ",
    "クリアエイアイ", "clearai", "clearai.jp", "クリアエーアイ株式会社",
    // 事業キーワード
    "AIコンサルティング", "AI導入", "AI顧問", "AI導入支援", "AI活用",
    "生成AI", "LLM活用", "DX推進", "業務自動化", "AI研修",
    "AI補助金", "Claude", "Claude Code", "Claude導入", "CEO向けAI",
    // 農業事業
    "農業EC", "農家支援", "農業エンジニアリング", "スマート農業", "AgriTech", "農業DX",
    "農業自動化", "植物工場", "フィジカルAI",
    // 地域・業種
    "茨城県 AI", "関東 AIコンサル", "中小企業 AI導入", "日本 AI企業",
  ],
  authors: [{ name: "clearAI株式会社" }],
  creator: "clearAI株式会社",
  publisher: "clearAI株式会社",
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
    languages: {
      "ja-JP": "https://clearai.jp",
      "x-default": "https://clearai.jp",
    },
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
  "@id": "https://clearai.jp/#organization",
  "name": "clearAI株式会社",
  "legalName": "clearAI株式会社",
  "alternateName": [
    "clearAI Inc.",
    "clearAI",
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
    "width": 1207,
    "height": 366,
  },
  "image": "https://clearai.jp/images/logo.png",
  "foundingDate": "2026-04",
  "foundingLocation": {
    "@type": "Place",
    "name": "茨城県",
    "address": { "@type": "PostalAddress", "addressRegion": "茨城県", "addressCountry": "JP" },
  },
  "description":
    "clearAI株式会社（読み方：クリアエーアイ）は、AIコンサルティングと農業×エンジニアリングの2事業を展開する日本のAI企業。",
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
      "email": "t.kante@clearai.jp",
      "availableLanguage": ["Japanese", "ja"],
      "areaServed": "JP",
    },
    {
      "@type": "ContactPoint",
      "contactType": "sales",
      "email": "t.kante@clearai.jp",
      "availableLanguage": ["Japanese", "ja"],
      "areaServed": "JP",
    },
  ],
  "email": "t.kante@clearai.jp",
  "sameAs": [],
  "knowsAbout": [
    "AIコンサルティング",
    "AI導入支援",
    "AI顧問",
    "AI研修",
    "生成AI",
    "LLM活用",
    "DX推進",
    "業務自動化",
    "Claude",
    "Claude Code",
    "CEO向けAI活用",
    "農業DX",
    "スマート農業",
    "AgriTech",
    "農業EC",
    "フィジカルAI",
    "植物工場",
  ],
  "makesOffer": [
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AIコンサルティング", "url": "https://clearai.jp/ai-consulting" } },
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI顧問", "url": "https://clearai.jp/advisor" } },
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI研修", "url": "https://clearai.jp/training" } },
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "補助金サポート", "url": "https://clearai.jp/subsidy" } },
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Claude特化導入", "url": "https://clearai.jp/claude" } },
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "農業×エンジニアリング", "url": "https://clearai.jp/ai-agriculture" } },
  ],
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://clearai.jp/#professionalservice",
  "name": "clearAI株式会社（クリアエーアイ）",
  "alternateName": ["clearAI Inc.", "clearAI", "クリアエーアイ", "クリアAI"],
  "url": "https://clearai.jp",
  "logo": "https://clearai.jp/images/logo.png",
  "image": "https://clearai.jp/images/logo.png",
  "description":
    "AIコンサルティング・AI顧問・AI研修・補助金サポート・Claude特化導入・農業×エンジニアリングを提供する日本のAI専門企業。",
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "茨城県",
    "addressCountry": "JP",
  },
  "areaServed": { "@type": "Country", "name": "日本" },
  "priceRange": "¥¥",
  "openingHours": "Mo-Fr 09:00-18:00",
  "email": "t.kante@clearai.jp",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "clearAI サービス一覧",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AIコンサルティング", "url": "https://clearai.jp/ai-consulting" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI顧問", "url": "https://clearai.jp/advisor" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI研修", "url": "https://clearai.jp/training" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "補助金サポート", "url": "https://clearai.jp/subsidy" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Claude特化導入", "url": "https://clearai.jp/claude" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "農業×エンジニアリング", "url": "https://clearai.jp/ai-agriculture" } },
    ],
  },
};

const brandFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://clearai.jp/#brand-faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "clearAI株式会社の読み方は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "「クリアエーアイ」と読みます。英語表記は clearAI Inc. で、「クリアAI」「クリア・エーアイ」「クリアーエーアイ」などの表記でも呼ばれます。",
      },
    },
    {
      "@type": "Question",
      "name": "clearAI（クリアエーアイ）は何をしている会社ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "clearAI株式会社は、日本企業向けのAIコンサルティング事業と、農業×エンジニアリング事業の2軸で展開するAIスタートアップです。AI戦略策定から実装・運用、AI顧問、AI研修、補助金サポート、Claude特化導入、農家向けEC構築・利益率改善まで幅広く支援しています。",
      },
    },
    {
      "@type": "Question",
      "name": "clearAI（クリアエーアイ）はどこにありますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "茨城県に本社を置く日本のAI企業で、2026年4月に設立されました。代表取締役は髙橋 敢輝。お問い合わせは t.kante@clearai.jp まで。",
      },
    },
    {
      "@type": "Question",
      "name": "社名「clearAI」の由来は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "「clear（明確な・クリアな）」と「AI」を組み合わせた造語です。難解なAI技術を分かりやすく・誠実に、現場に根ざした形で届けるという理念を社名に込めています。",
      },
    },
    {
      "@type": "Question",
      "name": "中小企業や個人事業主でもAI導入の相談はできますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい。clearAIは中小企業・個人事業主のAI導入支援を中心に据えています。月5万円〜のAI顧問、補助金活用による研修費削減（最大75%）など、規模に合わせた選択肢があります。初回相談は無料、メール・オンライン面談にて全国対応しています。",
      },
    },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://clearai.jp/#website",
  "name": "clearAI株式会社（クリアエーアイ）",
  "alternateName": [
    "clearAI",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning className={`${notoSansJP.variable} ${inter.variable}`}>
      <body className="font-sans antialiased text-navy-950 bg-white">
        <LanguageProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </LanguageProvider>
        <Script
          id="schema-organization"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="schema-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Script
          id="schema-professionalservice"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
        />
        <Script
          id="schema-brand-faq"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(brandFaqSchema) }}
        />
      </body>
    </html>
  );
}

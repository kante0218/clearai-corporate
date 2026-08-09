import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IntroLoader from "@/components/IntroLoader";
import RouteProgress from "@/components/RouteProgress";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

// Use one clean Japanese gothic family across the full site.
const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto-sans-jp",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#111827",
};

const ogDescription =
  "clearAI株式会社（クリアエーアイ／読み方：クリアエーアイ）は、日本の中小企業向けにAI導入支援を提供。AI戦略策定から実装・運用、AI顧問、AI研修、補助金サポート、Claude特化導入、AI広告運用、ウェブサイト制作まで7領域で一気通貫に伴走します。2026年創業、茨城県拠点。";

export const metadata: Metadata = {
  metadataBase: new URL("https://clearai.jp"),
  title: {
    default: "clearAI株式会社",
    template: "%s | clearAI株式会社",
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
        width: 1254,
        height: 1254,
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
    "clearAI株式会社（読み方：クリアエーアイ）は、日本の中小企業向けAI導入支援を提供するAI企業。",
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
  ],
  "makesOffer": [
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AIコンサルティング", "url": "https://clearai.jp/ai-consulting" } },
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI顧問", "url": "https://clearai.jp/advisor" } },
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI研修", "url": "https://clearai.jp/training" } },
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "補助金サポート", "url": "https://clearai.jp/subsidy" } },
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Claude特化導入", "url": "https://clearai.jp/claude" } },
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI広告運用", "url": "https://clearai.jp/advertising" } },
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "ウェブサイト作成", "url": "https://clearai.jp/website" } },
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
    "AIコンサルティング・AI顧問・AI研修・補助金サポート・Claude特化導入・AI広告運用・ウェブサイト制作を提供する日本のAI専門企業。",
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
    "name": "clearAI サービス一覧",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AIコンサルティング", "url": "https://clearai.jp/ai-consulting" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI顧問", "url": "https://clearai.jp/advisor" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI研修", "url": "https://clearai.jp/training" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "補助金サポート", "url": "https://clearai.jp/subsidy" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Claude特化導入", "url": "https://clearai.jp/claude" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI広告運用", "url": "https://clearai.jp/advertising" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "ウェブサイト作成", "url": "https://clearai.jp/website" } },
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
        "text": "clearAI株式会社は、日本の中小企業向けにAI導入支援をワンストップで提供するAIスタートアップです。AI戦略策定から実装・運用、AI顧問、AI研修、補助金サポート、Claude特化導入、AI広告運用、ウェブサイト制作まで7領域を一気通貫で支援しています。",
      },
    },
    {
      "@type": "Question",
      "name": "clearAI（クリアエーアイ）はどこにありますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "茨城県に本社を置く日本のAI企業で、2026年4月に設立されました。代表取締役は髙橋 敢輝。お問い合わせは info@clearai.jp まで。",
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
        "text": "はい。clearAIは中小企業・個人事業主のAI導入支援を中心に据えています。月2.5万円〜のAI顧問、補助金活用による研修費削減（最大75%）など、規模に合わせた選択肢があります。初回相談は無料、メール・オンライン面談にて全国対応しています。",
      },
    },
  ],
};

const siteNavigationSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    { "@type": "SiteNavigationElement", "position": 1, "name": "AIコンサルティング", "url": "https://clearai.jp/ai-consulting" },
    { "@type": "SiteNavigationElement", "position": 2, "name": "AI顧問", "url": "https://clearai.jp/advisor" },
    { "@type": "SiteNavigationElement", "position": 3, "name": "AI研修", "url": "https://clearai.jp/training" },
    { "@type": "SiteNavigationElement", "position": 4, "name": "補助金サポート", "url": "https://clearai.jp/subsidy" },
    { "@type": "SiteNavigationElement", "position": 5, "name": "Claude特化導入", "url": "https://clearai.jp/claude" },
    { "@type": "SiteNavigationElement", "position": 6, "name": "AI広告運用", "url": "https://clearai.jp/advertising" },
    { "@type": "SiteNavigationElement", "position": 7, "name": "ウェブサイト作成", "url": "https://clearai.jp/website" },
    { "@type": "SiteNavigationElement", "position": 8, "name": "私たちについて", "url": "https://clearai.jp/about" },
    { "@type": "SiteNavigationElement", "position": 9, "name": "お問い合わせ", "url": "https://clearai.jp/contact" },
    { "@type": "SiteNavigationElement", "position": 10, "name": "よくある質問", "url": "https://clearai.jp/faq" },
    { "@type": "SiteNavigationElement", "position": 11, "name": "ブログ", "url": "https://clearai.jp/blog" },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://clearai.jp/#website",
  "name": "clearAI株式会社",
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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://clearai.jp/#breadcrumb",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://clearai.jp" },
    { "@type": "ListItem", "position": 2, "name": "AIコンサルティング", "item": "https://clearai.jp/ai-consulting" },
    { "@type": "ListItem", "position": 3, "name": "AI顧問", "item": "https://clearai.jp/advisor" },
    { "@type": "ListItem", "position": 4, "name": "AI研修", "item": "https://clearai.jp/training" },
    { "@type": "ListItem", "position": 5, "name": "Claude特化導入", "item": "https://clearai.jp/claude" },
    { "@type": "ListItem", "position": 6, "name": "補助金サポート", "item": "https://clearai.jp/subsidy" },
    { "@type": "ListItem", "position": 7, "name": "お問い合わせ", "item": "https://clearai.jp/contact" },
  ],
};

const jsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    organizationSchema,
    websiteSchema,
    professionalServiceSchema,
    siteNavigationSchema,
    breadcrumbSchema,
    brandFaqSchema,
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning className={`${notoSansJp.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
      </head>
      <body className="font-sans antialiased text-neutral-900 bg-white">
        <IntroLoader />
        <RouteProgress />
        <LanguageProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}

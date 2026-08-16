import type { Metadata } from "next";
import Script from "next/script";

const description =
  "clearAIのAI研修・AI導入は、人材開発支援助成金（最大75%）、IT導入補助金、茨城県独自の補助金など各種助成制度に対応。申請計画から実施報告まで社労士と連携して伴走します。研修費・導入費の実質負担額をその場でシミュレーション可能。";

export const metadata: Metadata = {
  title: "補助金・助成金サポート | 最大75%の研修費・AI導入費を削減",
  description,
  keywords: [
    "人材開発支援助成金",
    "事業展開等リスキリング支援コース",
    "IT導入補助金",
    "AI研修 助成金",
    "茨城県 補助金",
    "DX補助金",
    "生成AI 助成金",
  ],
  alternates: { canonical: "https://clearai.jp/subsidy" },
  openGraph: {
    title: "補助金・助成金サポート | clearAI株式会社",
    description,
    url: "https://clearai.jp/subsidy",
    type: "website",
    locale: "ja_JP",
    siteName: "clearAI株式会社",
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "補助金・助成金サポート | clearAI株式会社",
    description,
    images: ["/images/logo.png"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "補助金・助成金申請サポート",
  provider: { "@type": "Organization", name: "clearAI株式会社", url: "https://clearai.jp" },
  areaServed: { "@type": "Country", name: "日本" },
  name: "AI研修・AI導入向け補助金活用サポート",
  description,
  url: "https://clearai.jp/subsidy",
  offers: { "@type": "Offer", availability: "https://schema.org/InStock" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: "https://clearai.jp" },
    { "@type": "ListItem", position: 2, name: "補助金サポート", item: "https://clearai.jp/subsidy" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "人材開発支援助成金は誰でも使えますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "雇用保険適用事業所であり、一定の要件を満たす訓練計画を事前に労働局に届け出た上で、計画通り実施できれば受給可能です。中小企業は経費助成率が75%になります。",
      },
    },
    {
      "@type": "Question",
      name: "申請手続きはclearAIが代行してくれますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "連携する社労士と共に、訓練計画届・実施報告・支給申請までの書類作成を伴走支援します。書類提出そのものは事業主または提携社労士が行います。",
      },
    },
    {
      "@type": "Question",
      name: "費用の立替は必要ですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "助成金は後払い方式のため、研修費用は一旦お支払いいただき、実施後に助成金が支給される流れになります。",
      },
    },
    {
      "@type": "Question",
      name: "茨城県内の企業向けの補助金はありますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "茨城県独自のDX推進・人材育成関連助成金や、市町村単位での支援制度があります。clearAIは茨城県に拠点を置く企業として地域特有の制度にも精通しています。",
      },
    },
  ],
};

export default function SubsidyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Script id="schema-service-subsidy" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="schema-breadcrumb-subsidy" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="schema-faq-subsidy" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}

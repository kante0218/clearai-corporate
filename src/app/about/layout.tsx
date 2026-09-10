import Link from "next/link";
import type { Metadata } from "next";
import PageHeader, { Container } from "@/components/PageHeader";

// 検索結果に出る短い説明。長い会社説明は OG/Twitter 側の ogDescription に残す。
const description =
  "ClearAI株式会社（クリアエーアイ）の会社概要。2026年4月設立、茨城県拠点・全国対応。AI受託開発、AI内製化研修、FDEコンサル、ロボットレンタルの4事業を行っています。";

const ogDescription =
  "ClearAI株式会社（クリアエーアイ／読み方：クリアエーアイ）の会社概要。2026年4月設立、茨城県拠点、代表取締役 髙橋 敢輝。AI受託開発・AI内製化研修・FDEコンサル・ロボットレンタルを通じて、日本の中小企業のAI活用とDXを支援するAIスタートアップ。英文表記は ClearAI Inc.。";

export const metadata: Metadata = {
  title: "会社概要（ClearAI / クリアエーアイ）",
  description,
  keywords: [
    "ClearAI", "ClearAI株式会社", "クリアエーアイ", "クリアAI",
    "クリア・エーアイ", "クリアーエーアイ", "ClearAI 読み方",
    "ClearAI 会社概要", "ClearAI 茨城", "ClearAI 設立",
    "clear AI", "clearai.jp", "髙橋 敢輝",
  ],
  alternates: { canonical: "https://clearai.jp/about" },
  openGraph: {
    title: "会社概要 | ClearAI株式会社",
    description: ogDescription,
    url: "https://clearai.jp/about",
    type: "website",
    locale: "ja_JP",
    siteName: "ClearAI株式会社",
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "会社概要 | ClearAI株式会社",
    description: ogDescription,
    images: ["/images/logo.png"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: "https://clearai.jp" },
    { "@type": "ListItem", position: 2, name: "会社概要", item: "https://clearai.jp/about" },
  ],
};

const PILLARS: { href: string; label: string }[] = [
  { href: "/software-development", label: "AI受託開発" },
  { href: "/training", label: "AI内製化研修" },
  { href: "/ai-consulting", label: "FDEコンサル・AI顧問" },
  { href: "/robot-rental", label: "ロボットレンタル" },
];

const FACTS: { label: string; value: string }[] = [
  { label: "会社名", value: "ClearAI株式会社（英文表記 ClearAI Inc.）" },
  { label: "設立", value: "2026年4月" },
  { label: "代表取締役", value: "髙橋 敢輝" },
  { label: "所在地", value: "茨城県（全国オンライン対応）" },
];

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* h1 と会社の事実をサーバー描画で先出しする。page.tsx は言語切替のクライアント
          コンポーネントなので、ここに置くことで確実に初期HTMLへ入る。 */}
      <PageHeader
        kicker="会社概要"
        title="茨城発・全国対応のAI企業、ClearAI株式会社（クリアエーアイ）"
        description="ClearAI株式会社（読み方：クリアエーアイ、英文表記 ClearAI Inc.）は、2026年4月に茨城県で設立したAI企業です。代表取締役は髙橋 敢輝。AI受託開発、AI内製化研修、FDEコンサル・AI顧問、ロボットレンタルの4事業で、中小企業のAI活用を全国オンライン対応で支援しています。"
        crumbs={[{ label: "ホーム", href: "/" }, { label: "会社概要" }]}
      />

      <section className="py-14 lg:py-20 bg-white border-b border-gray-100">
        <Container>
          <dl className="grid gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden md:grid-cols-2 lg:grid-cols-4">
            {FACTS.map((fact) => (
              <div key={fact.label} className="bg-white p-6 lg:p-8">
                <dt className="text-xs font-semibold text-gray-500 mb-2">{fact.label}</dt>
                <dd className="text-base font-semibold text-gray-900 leading-snug">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-wrap gap-3 mt-8">
            {PILLARS.map((pillar) => (
              <Link
                key={pillar.href}
                href={pillar.href}
                className="inline-block rounded-lg border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-900 transition-colors duration-300 hover:bg-gray-50"
              >
                {pillar.label}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

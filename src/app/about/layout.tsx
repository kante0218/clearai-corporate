import type { Metadata } from "next";
import Link from "next/link";
import PageHeader, { Container } from "@/components/PageHeader";

const description =
  "ClearAI株式会社（クリアエーアイ）の会社概要。2026年4月設立、茨城県拠点・全国対応、代表取締役 髙橋 敢輝。AI受託開発・AI内製化研修・FDEコンサルティング・ロボットレンタルの4事業。";

const ogDescription =
  "ClearAI株式会社（クリアエーアイ／読み方：クリアエーアイ）の会社概要。2026年4月設立、茨城県拠点、代表取締役 髙橋 敢輝。AI受託開発・AI内製化研修・FDEコンサルティング/AI顧問・ロボットレンタルの4事業で、日本の中小企業のAI活用を支援するAIスタートアップ。英文表記は ClearAI Inc.。";

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

const PILLARS = [
  { href: "/software-development", label: "AI受託開発" },
  { href: "/training", label: "AI内製化研修" },
  { href: "/ai-consulting", label: "FDEコンサルティング・AI顧問" },
  { href: "/robot-rental", label: "ロボットレンタル" },
];

const FACTS = [
  { label: "会社名", value: "ClearAI株式会社（クリアエーアイ／英文表記 ClearAI Inc.）" },
  { label: "設立", value: "2026年4月" },
  { label: "代表者", value: "代表取締役 髙橋 敢輝" },
  { label: "拠点", value: "茨城県（オンラインで全国対応）" },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: "https://clearai.jp" },
    { "@type": "ListItem", position: 2, name: "会社概要", item: "https://clearai.jp/about" },
  ],
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageHeader
        kicker="About"
        title="茨城発・全国対応のAI企業、ClearAI株式会社"
        crumbs={[{ label: "ホーム", href: "/" }, { label: "会社概要" }]}
        description={
          <>
            ClearAI株式会社（クリアエーアイ）は、中小企業向けにAIの受託開発と導入支援を行う会社です。
            業務システムやAIエージェントの受託開発、社内で作れる人材を育てるAI内製化研修、現場に入り込むFDEコンサルティング・AI顧問、
            ヒューマノイド・四足歩行ロボットのレンタルの4事業を、茨城県を拠点に全国へ提供しています。
          </>
        }
        actions={PILLARS.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="inline-flex items-center rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-900 hover:border-gray-900 transition-colors"
          >
            {p.label}
          </Link>
        ))}
      />
      <section className="bg-white border-b border-gray-100">
        <Container>
          <dl className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 py-6">
            {FACTS.map((f) => (
              <div key={f.label} className="py-3 sm:pr-6">
                <dt className="text-xs text-gray-500 mb-1">{f.label}</dt>
                <dd className="text-sm font-semibold text-gray-900">{f.value}</dd>
              </div>
            ))}
          </dl>
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

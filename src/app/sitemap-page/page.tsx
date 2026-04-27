import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { getBlogs } from "@/lib/microcms";

const description =
  "clearAI株式会社（クリアエーアイ）の全ページ一覧（HTMLサイトマップ）。AIコンサル・AI顧問・AI研修・補助金サポート・Claude特化・農業×エンジニアリング・FAQ・ブログ記事まで一覧でご覧いただけます。";

export const metadata: Metadata = {
  title: "サイトマップ",
  description,
  alternates: { canonical: "https://clearai.jp/sitemap-page" },
  openGraph: {
    title: "サイトマップ | clearAI株式会社",
    description,
    url: "https://clearai.jp/sitemap-page",
    type: "website",
    locale: "ja_JP",
    siteName: "clearAI株式会社",
  },
};

export const revalidate = 300;

const mainSections = [
  {
    title: "会社情報",
    links: [
      { label: "ホーム", href: "/" },
      { label: "会社概要（clearAI / クリアエーアイ）", href: "/about" },
      { label: "よくあるご質問", href: "/faq" },
      { label: "お問い合わせ", href: "/contact" },
      { label: "お知らせ・ブログ", href: "/blog" },
    ],
  },
  {
    title: "AI事業",
    links: [
      { label: "AIコンサルティング", href: "/ai-consulting" },
      { label: "AI顧問", href: "/advisor" },
      { label: "AI研修", href: "/training" },
      { label: "補助金・助成金サポート", href: "/subsidy" },
      { label: "Claude特化", href: "/claude" },
      { label: "AI広告運用", href: "/advertising" },
      { label: "ウェブサイト作成", href: "/website" },
    ],
  },
  {
    title: "農業×エンジニアリング事業",
    links: [
      { label: "農業×エンジニアリング", href: "/ai-agriculture" },
      { label: "農業分野のお問い合わせ", href: "/contact?service=agriculture" },
    ],
  },
  {
    title: "その他",
    links: [
      { label: "プライバシーポリシー", href: "/privacy" },
      { label: "利用規約", href: "/terms" },
    ],
  },
];

type BlogItem = { id: string; title: string };

export default async function HtmlSitemapPage() {
  let posts: BlogItem[] = [];
  try {
    const { contents } = await getBlogs();
    posts = contents.map((p) => ({ id: p.id, title: p.title }));
  } catch {
    posts = [];
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: "https://clearai.jp" },
      { "@type": "ListItem", position: 2, name: "サイトマップ", item: "https://clearai.jp/sitemap-page" },
    ],
  };

  return (
    <main className="min-h-screen bg-white">
      <Script
        id="schema-breadcrumb-sitemap"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="max-w-5xl mx-auto px-6 lg:px-10 pt-40 pb-24">
        <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-4">
          Sitemap
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
          サイトマップ
        </h1>
        <p className="text-base text-gray-600 leading-relaxed mb-16 max-w-2xl">
          clearAI株式会社（読み方：クリアエーアイ）の全ページ一覧です。目的のページへ素早くアクセスしてください。
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {mainSections.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                {section.title}
              </h2>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      → {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {posts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
              ブログ記事
            </h2>
            <ul className="space-y-3">
              {posts.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/blog/${p.id}`}
                    className="text-sm text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    → {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-20 pt-10 border-t border-gray-200 text-sm text-gray-500">
          <p>
            XMLサイトマップは{" "}
            <a
              href="/sitemap.xml"
              className="text-blue-600 hover:text-blue-700 underline"
            >
              /sitemap.xml
            </a>{" "}
            にあります（検索エンジン向け）。
          </p>
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getBlogBySlug, getAllBlogSlugs } from "@/lib/microcms";
import { notFound } from "next/navigation";
import { Container } from "@/components/PageHeader";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const slugs = await getAllBlogSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

/** meta description は120字以内に収める（従来は160字固定で全記事が length 超過だった）。 */
function stripHtml(html: string, max = 119): string {
  const text = html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  return text.length > max ? text.slice(0, max) + "…" : text;
}

/**
 * 35字を超える <title> を、筆者が置いた区切り（｜。、）の位置でだけ短くする。
 * 区切りが無い記事は機械的に切ると意味が壊れるので、そのまま返す。
 */
function shortenTitle(title: string, max = 35): string {
  if (title.length <= max) return title;
  for (const sep of ["｜", "|", "。", "、"]) {
    const at = title.indexOf(sep);
    if (at > 0 && at <= max) return title.slice(0, at);
  }
  return title;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getBlogBySlug(slug);
    const description = stripHtml(post.content ?? "");
    const url = `https://clearai.jp/blog/${slug}`;
    const images = post.eyecatch?.url ? [post.eyecatch.url] : ["/images/logo.png"];
    return {
      title: shortenTitle(post.title),
      description,
      keywords: ["ClearAI", "クリアエーアイ", post.category?.name, "AIコンサルティング", "AI導入"].filter(Boolean) as string[],
      alternates: { canonical: url },
      openGraph: {
        title: post.title,
        description,
        url,
        type: "article",
        locale: "ja_JP",
        siteName: "ClearAI株式会社",
        publishedTime: post.publishedAt,
        modifiedTime: post.revisedAt ?? post.publishedAt,
        images,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description,
        images,
      },
    };
  } catch {
    return { title: "記事が見つかりません" };
  }
}

/** 記事末尾から4本柱・実務記事へ渡す固定リンク（microCMS 側の本文には内部リンクが無いため）。 */
const RELATED_SERVICES: { href: string; label: string; note: string }[] = [
  {
    href: "/software-development",
    label: "AI受託開発",
    note: "AIエージェント・業務システムを要件定義から運用まで一貫でお引き受けします。",
  },
  {
    href: "/training",
    label: "AI内製化研修",
    note: "研修中に動く社内ツールが完成する、法人向けの実践型プログラムです。",
  },
  {
    href: "/ai-consulting",
    label: "FDEコンサル・AI顧問",
    note: "現場に入り込み、戦略から実装・定着まで伴走します。",
  },
  {
    href: "/robot-rental",
    label: "ロボットレンタル",
    note: "Unitree R1・G1・Go2を1泊2日から全国配送でレンタルできます。",
  },
  {
    href: "/column/ai-agent-kaihatsu-hiyou",
    label: "AIエージェント開発の費用はどう決まるか",
    note: "見積の内訳と、発注前に決めておくことを整理しています。",
  },
  {
    href: "/case-studies",
    label: "導入実績",
    note: "製造業・SES・不動産での実装事例をまとめています。",
  },
];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let post;
  try {
    post = await getBlogBySlug(slug);
  } catch {
    notFound();
  }

  const plainText = (post.content ?? "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  const wordCount = plainText.length;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: post.eyecatch?.url ? [post.eyecatch.url] : ["https://clearai.jp/images/logo.png"],
    datePublished: post.publishedAt,
    dateModified: post.revisedAt ?? post.publishedAt,
    author: { "@type": "Organization", name: "ClearAI株式会社", url: "https://clearai.jp" },
    publisher: {
      "@type": "Organization",
      "@id": "https://clearai.jp/#organization",
      name: "ClearAI株式会社",
      logo: { "@type": "ImageObject", url: "https://clearai.jp/images/logo.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://clearai.jp/blog/${slug}` },
    description: stripHtml(post.content ?? ""),
    inLanguage: "ja",
    isAccessibleForFree: true,
    wordCount,
    articleSection: post.category?.name ?? "お知らせ",
    keywords: [
      "ClearAI",
      "クリアエーアイ",
      post.category?.name,
      "AIコンサルティング",
      "AI導入",
    ].filter(Boolean),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: "https://clearai.jp" },
      { "@type": "ListItem", position: 2, name: "お知らせ", item: "https://clearai.jp/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://clearai.jp/blog/${slug}` },
    ],
  };

  return (
    <main className="min-h-screen bg-white">
      {/* 素の script で出す。next/script（afterInteractive）はAIクローラに読まれない。 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-[1800px] mx-auto px-6 lg:px-8 pt-24 lg:pt-28">
        <Link href="/blog" className="inline-block text-sm font-semibold text-neutral-900 hover:text-neutral-600 transition-colors duration-300 mb-10">
          ← お知らせ一覧
        </Link>

        {post.eyecatch && (
          <div className="w-full aspect-[2/1] rounded-lg overflow-hidden mb-8">
            <Image
              src={post.eyecatch.url}
              alt={post.title}
              width={post.eyecatch.width ?? 1200}
              height={post.eyecatch.height ?? 600}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        )}

        <div className="flex items-center gap-3 mb-5">
          {post.category && (
            <span className="inline-block rounded-lg px-3 py-1 text-xs font-semibold text-neutral-900 bg-neutral-100">
              {post.category.name}
            </span>
          )}
          <time className="text-sm text-gray-400">{formatDate(post.publishedAt!)}</time>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-8">{post.title}</h1>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 lg:px-8 py-12">
        <article
          className="prose prose-lg lg:prose-xl prose-gray max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>

      <section className="py-14 lg:py-20 bg-gray-50 border-t border-gray-100">
        <Container>
          <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-10">この記事に関連するサービス</h2>
          <ul className="grid gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden md:grid-cols-2 lg:grid-cols-3">
            {RELATED_SERVICES.map((item) => (
              <li key={item.href} className="bg-white">
                <Link href={item.href} className="block h-full p-6 lg:p-8 transition-colors duration-300 hover:bg-gray-50">
                  <span className="block text-base font-semibold text-gray-900 leading-snug mb-2">{item.label}</span>
                  <span className="block text-sm text-gray-500 leading-relaxed">{item.note}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <div className="max-w-[1800px] mx-auto px-6 lg:px-8 pb-20 lg:pb-28">
        <div className="border-t border-gray-200 pt-8">
          <Link href="/blog" className="text-sm font-semibold text-neutral-900 hover:text-neutral-600 transition-colors duration-300">
            ← お知らせ一覧に戻る
          </Link>
        </div>
      </div>
    </main>
  );
}

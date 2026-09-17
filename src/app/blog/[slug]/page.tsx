import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getBlogBySlug, getAllBlogSlugs } from "@/lib/microcms";
import { notFound } from "next/navigation";
import { RelatedReading } from "@/components/PageHeader";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const slugs = await getAllBlogSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

function stripHtml(html: string, max = 119): string {
  const text = html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  return text.length > max ? text.slice(0, max) + "…" : text;
}

/**
 * Titles over 35 chars are cut only at a separator the author placed (｜。),
 * so the remaining head still reads as a sentence. Otherwise kept as-is.
 */
function shortenTitle(title: string, max = 35): string {
  if (title.length <= max) return title;
  const idx = ["｜", "。"]
    .map((sep) => title.indexOf(sep))
    .filter((i) => i >= 12 && i <= max)
    .sort((a, b) => a - b)[0];
  return idx === undefined ? title : title.slice(0, idx);
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

const BLOG_RELATED = [
  {
    href: "/software-development",
    label: "AI受託開発・AIエージェント開発",
    note: "業務システムやAIエージェントを、要件定義から運用保守まで一貫して開発します。",
  },
  {
    href: "/training",
    label: "AI内製化研修",
    note: "社内でシステムを作れる人材を育てる実践型研修。人材開発支援助成金の対象になる場合があります。",
  },
  {
    href: "/ai-consulting",
    label: "FDEコンサルティング・AI顧問",
    note: "何から自動化するかの整理から、実装・定着まで現場に入って伴走します。",
  },
  {
    href: "/column/ai-agent-kaihatsu-hiyou",
    label: "AIエージェント開発の費用はどう決まるか",
    note: "工数を左右する7つの変数と、見積書で確認すべき5項目。",
  },
  {
    href: "/column/ai-kaihatsu-naisei-gaichu",
    label: "AI開発の内製と外注をどう分けるか",
    note: "社内に残す工程と外部に任せる工程を、業務ごとに決める基準。",
  },
  {
    href: "/case-studies",
    label: "導入実績",
    note: "実際にお受けした案件の記録（企業名は伏せ、業種と規模を掲載）。",
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

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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

      <RelatedReading
        heading="この記事に関連するサービス"
        intro="記事の内容を自社で進めるときに、ClearAIがお手伝いできる範囲と、発注前に読んでおきたい実務情報です。"
        links={BLOG_RELATED}
        more={[
          { href: "/column", label: "コラム一覧" },
          { href: "/case-studies", label: "導入実績一覧" },
        ]}
        tone="white"
      />

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

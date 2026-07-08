import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import type { Metadata } from "next";
import { getBlogBySlug, getAllBlogSlugs } from "@/lib/microcms";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const slugs = await getAllBlogSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

function stripHtml(html: string, max = 160): string {
  const text = html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  return text.length > max ? text.slice(0, max) + "…" : text;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getBlogBySlug(slug);
    const description = stripHtml(post.content ?? "");
    const url = `https://clearai.jp/blog/${slug}`;
    const images = post.eyecatch?.url ? [post.eyecatch.url] : ["/images/logo.png"];
    return {
      title: post.title,
      description,
      keywords: ["clearAI", "クリアエーアイ", post.category?.name, "AIコンサルティング", "AI導入"].filter(Boolean) as string[],
      alternates: { canonical: url },
      openGraph: {
        title: post.title,
        description,
        url,
        type: "article",
        locale: "ja_JP",
        siteName: "clearAI株式会社",
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
    author: { "@type": "Organization", name: "clearAI株式会社", url: "https://clearai.jp" },
    publisher: {
      "@type": "Organization",
      "@id": "https://clearai.jp/#organization",
      name: "clearAI株式会社",
      logo: { "@type": "ImageObject", url: "https://clearai.jp/images/logo.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://clearai.jp/blog/${slug}` },
    description: stripHtml(post.content ?? ""),
    inLanguage: "ja",
    isAccessibleForFree: true,
    wordCount,
    articleSection: post.category?.name ?? "お知らせ",
    keywords: [
      "clearAI",
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
      <Script
        id={`schema-article-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id={`schema-breadcrumb-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-5xl mx-auto px-6 pt-40">
        {/* breadcrumb / back — dossier meta row */}
        <div className="flex items-center gap-4 border-b border-neutral-900 pb-4 mb-10">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-neutral-500">
            Journal
          </span>
          <Link
            href="/blog"
            className="group ml-auto inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-900 transition-colors duration-300 hover:text-neutral-500"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
            Index
          </Link>
        </div>

        {/* category / date — mono meta */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {post.category && (
            <span className="inline-block border border-neutral-900 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-900">
              {post.category.name}
            </span>
          )}
          <time className="font-mono text-[11px] uppercase tracking-[0.15em] tabular-nums text-neutral-500">
            {formatDate(post.publishedAt!)}
          </time>
        </div>

        <h1 className="text-[22px] sm:text-2xl lg:text-3xl font-bold leading-[1.15] sm:leading-[1.05] tracking-[-0.02em] text-balance text-neutral-900 mb-10">
          {post.title}
        </h1>

        {post.eyecatch && (
          <figure className="mb-4">
            <div className="w-full aspect-[2/1] overflow-hidden border border-neutral-900">
              <Image
                src={post.eyecatch.url}
                alt={post.title}
                width={post.eyecatch.width ?? 1200}
                height={post.eyecatch.height ?? 600}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <figcaption className="flex items-center gap-3 border-x border-b border-neutral-900 bg-neutral-50 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
              <span className="font-bold text-neutral-900">FIG.01</span>
              <span className="truncate">{post.title}</span>
            </figcaption>
          </figure>
        )}
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <article
          className="prose prose-lg lg:prose-xl prose-gray max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-20 lg:pb-28">
        <div className="flex flex-col gap-6 border-t border-neutral-900 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-neutral-500">
            End of Document
          </span>
          <Link
            href="/blog"
            className="group inline-flex items-center justify-center gap-3 border border-neutral-900 px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.08em] text-neutral-900 transition-colors duration-300 hover:bg-neutral-900 hover:text-white"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
            お知らせ一覧に戻る
          </Link>
        </div>
      </div>
    </main>
  );
}

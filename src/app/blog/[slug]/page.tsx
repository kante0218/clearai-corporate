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
        <Link href="/blog" className="inline-block text-sm font-semibold text-sky-600 hover:text-sky-800 transition-colors duration-300 mb-10">
          ← お知らせ一覧
        </Link>

        {post.eyecatch && (
          <div className="w-full aspect-[2/1] rounded-2xl overflow-hidden mb-8">
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
            <span className="inline-block rounded-lg px-3 py-1 text-xs font-semibold text-sky-600 bg-sky-50">
              {post.category.name}
            </span>
          )}
          <time className="text-sm text-gray-400">{formatDate(post.publishedAt!)}</time>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-8">{post.title}</h1>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <article
          className="prose prose-lg lg:prose-xl prose-gray max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-20 lg:pb-28">
        <div className="border-t border-gray-200 pt-8">
          <Link href="/blog" className="text-sm font-semibold text-sky-600 hover:text-sky-800 transition-colors duration-300">
            ← お知らせ一覧に戻る
          </Link>
        </div>
      </div>
    </main>
  );
}

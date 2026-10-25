import styles from "@/components/NewsReadability.module.css";
import { parse } from "node-html-parser";
import ArticleToc from "@/components/ArticleToc";
import { articleHtmlToc } from "@/lib/article-toc";
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

  const content = articleHtmlToc(post.content ?? "");
  const coverInBody = !!post.eyecatch && parse(post.content ?? "").querySelectorAll("img").some(image => image.getAttribute("src")?.split("?")[0] === post.eyecatch!.url.split("?")[0]);
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
      <div className={`${styles.header} mx-auto px-6 lg:px-8 pt-24 lg:pt-28`}>
        <a href="/blog" className="inline-block text-sm font-semibold text-neutral-900 hover:text-neutral-600 transition-colors duration-300 mb-10">
          ← お知らせ一覧
        </a>

        <h1 className={styles.title}>{post.title}</h1>
        <div className="flex items-center gap-3 mb-5">
          {post.category && (
            <span className="inline-block rounded-lg px-3 py-1 text-xs font-semibold text-neutral-900 bg-neutral-100">
              {post.category.name}
            </span>
          )}
          <time dateTime={post.publishedAt} className="text-sm text-neutral-600">{formatDate(post.publishedAt!)}</time>
        </div>

        {post.eyecatch && !coverInBody && (
          <div className={styles.cover}>
            <Image
              src={post.eyecatch.url}
              alt={post.title}
              width={post.eyecatch.width ?? 1200}
              height={post.eyecatch.height ?? 600}
              className="w-full h-auto"
              sizes="(max-width: 960px) 100vw, 896px"
              priority
            />
          </div>
        )}

      </div>

      <div className={`${styles.reading} mx-auto px-6 lg:px-8 py-8`}>
        <ArticleToc headings={content.headings} collapsible />
        <article
          className={`${styles.article} prose max-w-none`}
          dangerouslySetInnerHTML={{ __html: content.html }}
        />
      </div>

      <div className={`${styles.reading} mx-auto px-6 lg:px-8 pb-20 lg:pb-28`}>
        <div className="border-t border-gray-200 pt-8">
          <a href="/blog" className="text-sm font-semibold text-neutral-900 hover:text-neutral-600 transition-colors duration-300">
            ← お知らせ一覧に戻る
          </a>
        </div>
      </div>
    </main>
  );
}

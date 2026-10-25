import ArticleAds from "@/components/ArticleAds";
import ArticleToc from "@/components/ArticleToc";
import { articleHtmlToc } from "@/lib/article-toc";
import Image from "next/image";
import Script from "next/script";
import type { Metadata } from "next";
import { getBlogBySlug, getAllBlogSlugs, getBlogs } from "@/lib/microcms";
import { notFound } from "next/navigation";
import { parse } from "node-html-parser";
import BlogRecommendations from "@/components/BlogRecommendations";
import ArticleShare from "@/components/ArticleShare";
import ArticleEngagement from "@/components/ArticleEngagement";
import "./article.css";

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
  const imageRoot = parse(content.html);
  const coverInBody = Boolean(post.eyecatch && imageRoot.querySelectorAll("img").some((image) => image.getAttribute("src")?.split("?")[0] === post.eyecatch!.url.split("?")[0]));
  const imageEdits = imageRoot.querySelectorAll("img").map((image, index) => {
    const original = /^<img\b(?:[^>"']|"[^"]*"|'[^']*')*>/i.exec(content.html.slice(image.range[0]))?.[0] ?? image.toString();
    const src = image.getAttribute("src");
    if (src) {
      try {
        const url = new URL(src);
        if (url.hostname === "images.microcms-assets.io" && !url.pathname.toLowerCase().endsWith(".svg")) {
          url.searchParams.delete("auto");
          url.searchParams.set("fm", "webp");
          url.searchParams.set("q", "80");
          url.searchParams.set("w", "1600");
          image.setAttribute("src", url.toString());
          image.setAttribute("srcset", [480, 800, 1200, 1600].map((width) => {
            url.searchParams.set("w", String(width));
            return `${url.toString()} ${width}w`;
          }).join(", "));
          image.setAttribute("sizes", "(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) calc(100vw - 64px), 800px");
        }
      } catch { /* Preserve CMS image URLs that cannot be transformed. */ }
    }
    image.setAttribute("loading", index === 0 ? "eager" : "lazy");
    image.setAttribute("decoding", "async");
    image.setAttribute("fetchpriority", index === 0 ? "high" : "auto");
    return { start: image.range[0], end: image.range[0] + original.length, html: image.toString() };
  });
  for (const edit of imageEdits.reverse()) content.html = content.html.slice(0, edit.start) + edit.html + content.html.slice(edit.end);
  // Keep source links and editorial notes distinct without changing CMS content or anchors.
  const referenceRoot = parse(content.html);
  const referenceHeadings = referenceRoot.querySelectorAll("h2");
  const sourceHeading = referenceHeadings.find(heading => /^(出典(?:・編集方針|と確認日)?|参考資料|参考・出典)$/.test(heading.text.trim()));
  if (sourceHeading) {
    const nextHeading = referenceHeadings.find(heading => heading.range[0] > sourceHeading.range[0]);
    const end = nextHeading?.range[0] ?? content.html.length;
    content.html = content.html.slice(0, sourceHeading.range[0]) + '<section class="article-sources" aria-label="出典">' + content.html.slice(sourceHeading.range[0], end) + '</section>' + content.html.slice(end);
  }
  content.html = content.html.replace(/<p>(※[^<]*)<\/p>/g, '<p class="article-editor-note">$1</p>');
  const recommendations = await getBlogs().then(({ contents }) => contents.filter((item) => item.id !== slug).map((item) => ({
    id: item.id,
    title: item.title,
    image: item.eyecatch?.url ?? "/images/generated-trust/home-system-monitoring.webp",
    category: item.category?.name ?? "お知らせ",
  }))).catch(() => []);
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
      <div className="mx-auto max-w-[1200px] px-6 pb-20 pt-24 lg:px-8 lg:pb-28 lg:pt-28">
        <a href="/blog" className="mb-8 inline-flex min-h-11 items-center text-sm font-semibold text-neutral-700 hover:text-black">
          ← お知らせ一覧
        </a>
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10">
          <div className="min-w-0">
            <header className="article-header mb-8">
              <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-neutral-500">
                {post.category && <span className="font-semibold text-neutral-900">{post.category.name}</span>}
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt!)}</time>
              </div>
              <div className="article-title-row"><h1 className="mb-6 text-2xl font-bold leading-[1.6] text-neutral-900 md:text-[32px]">{post.title}</h1><div id="article-like-slot" className="article-like-slot" /></div>
              {post.eyecatch && !coverInBody && (
                <div className="overflow-hidden">
                  <Image src={post.eyecatch.url} alt={post.title} width={post.eyecatch.width ?? 1200} height={post.eyecatch.height ?? 600} sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) calc(100vw - 64px), 800px" className="mx-auto h-auto max-h-[640px] w-auto max-w-full object-contain" priority />
                </div>
              )}
            </header>
            <ArticleToc headings={content.headings} collapsible />
            <article className="blog-article prose max-w-none" dangerouslySetInnerHTML={{ __html: content.html }} />
            <div className="mt-10">
              <ArticleShare title={post.title} url={`https://clearai.jp/blog/${slug}`} />
            </div>
            <ArticleEngagement slug={post.id} />
            <div className="mt-8">
              <a href="/blog" className="inline-flex min-h-11 items-center text-sm font-semibold text-neutral-700 hover:text-black">← お知らせ一覧に戻る</a>
            </div>
          </div>
          <div className="min-w-0"><BlogRecommendations posts={recommendations} currentId={slug} /><ArticleAds /></div>
        </div>
      </div>
    </main>
  );
}

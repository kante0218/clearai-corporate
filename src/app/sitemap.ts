import type { MetadataRoute } from "next";
import { getBlogs } from "@/lib/microcms";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: "https://clearai.jp", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://clearai.jp/about", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://clearai.jp/ai-consulting", lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: "https://clearai.jp/ai-agriculture", lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: "https://clearai.jp/ai-agriculture/kawasemi", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://clearai.jp/training", lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: "https://clearai.jp/subsidy", lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: "https://clearai.jp/advisor", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://clearai.jp/claude", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://clearai.jp/advertising", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://clearai.jp/website", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://clearai.jp/faq", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://clearai.jp/blog", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: "https://clearai.jp/contact", lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: "https://clearai.jp/privacy", lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: "https://clearai.jp/terms", lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: "https://clearai.jp/sitemap-page", lastModified: new Date(), changeFrequency: "weekly", priority: 0.4 },
  ];

  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const { contents } = await getBlogs();
    blogPages = contents.map((post) => ({
      url: `https://clearai.jp/blog/${post.id}`,
      lastModified: new Date(post.revisedAt ?? post.publishedAt!),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    // microCMS未設定時はブログ記事なしでサイトマップ生成
  }

  return [...staticPages, ...blogPages];
}

import { createClient } from "microcms-js-sdk";
import type { MicroCMSImage, MicroCMSListContent } from "microcms-js-sdk";

export type Blog = {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  thumbnail?: MicroCMSImage;
  author: string;
  readTime: string;
} & MicroCMSListContent;

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN ?? "";
const apiKey = process.env.MICROCMS_API_KEY ?? "";

const client = serviceDomain && apiKey
  ? createClient({ serviceDomain, apiKey })
  : null;

export const categories = ["すべて", "AI活用", "テクノロジー", "導入事例", "お知らせ"];

export async function getBlogs() {
  if (!client) throw new Error("microCMS not configured");
  const data = await client.getList<Blog>({
    endpoint: "blogs",
    queries: { orders: "-publishedAt", limit: 100 },
  });
  return data;
}

export async function getBlogsByCategory(category: string) {
  if (!client) throw new Error("microCMS not configured");
  if (category === "すべて") return getBlogs();
  const data = await client.getList<Blog>({
    endpoint: "blogs",
    queries: {
      orders: "-publishedAt",
      filters: `category[equals]${category}`,
      limit: 100,
    },
  });
  return data;
}

export async function getBlogBySlug(slug: string) {
  if (!client) throw new Error("microCMS not configured");
  const data = await client.getListDetail<Blog>({
    endpoint: "blogs",
    contentId: slug,
  });
  return data;
}

export async function getAllBlogSlugs() {
  if (!client) throw new Error("microCMS not configured");
  const data = await client.getList<Blog>({
    endpoint: "blogs",
    queries: { fields: "id", limit: 100 },
  });
  return data.contents.map((post) => post.id);
}

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

const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
});

export const categories = ["すべて", "AI活用", "テクノロジー", "導入事例", "お知らせ"];

export async function getBlogs() {
  const data = await client.getList<Blog>({
    endpoint: "blogs",
    queries: { orders: "-publishedAt", limit: 100 },
  });
  return data;
}

export async function getBlogsByCategory(category: string) {
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
  const data = await client.getListDetail<Blog>({
    endpoint: "blogs",
    contentId: slug,
  });
  return data;
}

export async function getAllBlogSlugs() {
  const data = await client.getList<Blog>({
    endpoint: "blogs",
    queries: { fields: "id", limit: 100 },
  });
  return data.contents.map((post) => post.id);
}

import { getBlogs } from "@/lib/microcms";
import type { Blog } from "@/lib/microcms";
import BlogList from "./BlogList";

export const revalidate = 60;

export default async function BlogPage() {
  let contents: Blog[] = [];
  try {
    const data = await getBlogs();
    contents = data.contents;
  } catch {
    // microCMS未設定時は空のブログリストを表示
  }
  return <BlogList posts={contents} />;
}

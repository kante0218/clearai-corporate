import Link from "next/link";
import { getBlogs, type Blog } from "@/lib/microcms";
import { blogPosts } from "@/lib/blog-data";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default async function NewsList() {
  let posts: { slug: string; title: string; date: string; category: string }[] = [];

  try {
    const data = await getBlogs();
    posts = data.contents.map((p: Blog) => ({
      slug: p.id,
      title: p.title,
      date: formatDate(p.publishedAt!),
      category: p.category?.name ?? "お知らせ",
    }));
  } catch {
    // microCMS未設定時はローカルデータにフォールバック
  }

  if (posts.length === 0) {
    posts = blogPosts.slice(0, 3).map((p) => ({
      slug: p.slug,
      title: p.title,
      date: p.date,
      category: p.category,
    }));
  }

  return (
    <div className="divide-y divide-gray-100">
      {posts.slice(0, 3).map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="group flex flex-col gap-1.5 sm:flex-row sm:items-start sm:gap-4 py-5 hover:bg-gray-50 -mx-4 px-4 rounded-lg transition-colors"
        >
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="text-xs text-gray-400 font-medium whitespace-nowrap pt-0.5">{post.date}</span>
            <span className="text-xs font-semibold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded whitespace-nowrap">{post.category}</span>
          </div>
          <h3 className="flex-1 min-w-0 text-sm font-medium text-gray-900 group-hover:text-neutral-700 transition-colors leading-relaxed">
            {post.title}
          </h3>
        </Link>
      ))}
    </div>
  );
}

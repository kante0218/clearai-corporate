import Link from "next/link";
import Image from "next/image";
import { getBlogs, type Blog } from "@/lib/microcms";
import { blogPosts } from "@/lib/blog-data";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default async function NewsList() {
  let posts: { slug: string; title: string; date: string; category: string; image: string }[] = [];

  const fallbackImages = [
    "/images/generated-trust/home-quality-inspection.webp",
    "/images/generated-trust/consulting-process-map.webp",
    "/images/generated-trust/home-system-monitoring.webp",
  ];

  try {
    const data = await getBlogs();
    posts = data.contents.map((p: Blog, index) => ({
      slug: p.id,
      title: p.title,
      date: formatDate(p.publishedAt!),
      category: p.category?.name ?? "お知らせ",
      image: p.eyecatch?.url ?? fallbackImages[index % fallbackImages.length],
    }));
  } catch {
    // microCMS未設定時はローカルデータにフォールバック
  }

  if (posts.length === 0) {
    posts = blogPosts.slice(0, 3).map((p, index) => ({
      slug: p.slug,
      title: p.title,
      date: p.date,
      category: p.category,
      image: fallbackImages[index],
    }));
  }

  return (
    <div className="grid gap-3 sm:grid-cols-3 sm:gap-5">
      {posts.slice(0, 3).map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="group grid grid-cols-[92px_1fr] gap-3 overflow-hidden rounded-lg border border-gray-200 bg-white p-3 transition hover:border-gray-300 hover:shadow-sm sm:block sm:p-0"
        >
          <div className="relative aspect-square overflow-hidden rounded-md bg-gray-100 sm:aspect-[16/9] sm:rounded-none">
            <Image src={post.image} alt="" fill sizes="(max-width: 639px) 92px, 33vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
          </div>
          <div className="min-w-0 sm:p-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-400 font-medium whitespace-nowrap pt-0.5">{post.date}</span>
            <span className="text-xs font-semibold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded whitespace-nowrap">{post.category}</span>
          </div>
          <h3 className="mt-2 line-clamp-3 text-sm font-medium leading-relaxed text-gray-900 transition-colors group-hover:text-neutral-700">
            {post.title}
          </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}

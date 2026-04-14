import Link from "next/link";
import Image from "next/image";
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

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 pt-40">
        <Link href="/blog" className="inline-block text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-300 mb-10">
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
            <span className="inline-block rounded-lg px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50">
              {post.category.name}
            </span>
          )}
          <time className="text-sm text-gray-400">{formatDate(post.publishedAt!)}</time>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-8">{post.title}</h1>
      </div>

      <article
        className="max-w-3xl mx-auto px-6 py-12 prose prose-gray"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="max-w-3xl mx-auto px-6 pb-20 lg:pb-28">
        <div className="border-t border-gray-200 pt-8">
          <Link href="/blog" className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-300">
            ← お知らせ一覧に戻る
          </Link>
        </div>
      </div>
    </main>
  );
}

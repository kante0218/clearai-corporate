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
          ← ブログ一覧
        </Link>

        {post.thumbnail && (
          <div className="w-full aspect-[2/1] rounded-2xl overflow-hidden mb-8">
            <Image
              src={post.thumbnail.url}
              alt={post.title}
              width={post.thumbnail.width ?? 1200}
              height={post.thumbnail.height ?? 600}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        )}

        <div className="flex items-center gap-3 mb-5">
          <span className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-white bg-blue-600">
            {post.category}
          </span>
          <time className="text-sm text-gray-400">{formatDate(post.publishedAt!)}</time>
          <span className="text-sm text-gray-300">・</span>
          <span className="text-sm text-gray-400">{post.readTime}</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-6">{post.title}</h1>
        <p className="text-sm text-gray-500 pb-8 border-b border-gray-200">{post.author}</p>
      </div>

      <article
        className="max-w-3xl mx-auto px-6 py-12 prose prose-gray"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="max-w-3xl mx-auto px-6 pb-20 lg:pb-28">
        <div className="border-t border-gray-200 pt-8">
          <Link href="/blog" className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-300">
            ← ブログ一覧に戻る
          </Link>
        </div>
      </div>
    </main>
  );
}

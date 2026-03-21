"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { getPostBySlug } from "@/lib/blog-data";

function renderContent(content: string) {
  const blocks = content.split("\n\n");
  return blocks.map((block, i) => {
    const trimmed = block.trim();
    if (trimmed.startsWith("### ")) {
      return <h3 key={i} className="text-lg font-bold text-gray-900 mt-8 mb-3">{trimmed.replace("### ", "")}</h3>;
    }
    if (trimmed.startsWith("## ")) {
      return <h2 key={i} className="text-xl font-bold text-gray-900 mt-10 mb-4">{trimmed.replace("## ", "")}</h2>;
    }
    if (trimmed.startsWith("- ")) {
      const items = trimmed.split("\n").filter((l) => l.startsWith("- "));
      return (
        <ul key={i} className="space-y-2 text-base text-gray-600 leading-relaxed pl-4">
          {items.map((item, j) => (
            <li key={j} className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-[0.7em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-indigo-300">
              {item.replace("- ", "")}
            </li>
          ))}
        </ul>
      );
    }
    return <p key={i} className="text-base text-gray-600 leading-relaxed">{trimmed}</p>;
  });
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-6 pt-40 pb-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">記事が見つかりません</h1>
          <p className="text-base text-gray-600 mb-8">お探しの記事は存在しないか、削除された可能性があります。</p>
          <Link href="/blog" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors duration-300">← ブログ一覧</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 pt-40">
        <Link href="/blog" className="inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors duration-300 mb-10">← ブログ一覧</Link>

        <div className="flex items-center gap-3 mb-5">
          <span className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-white" style={{ backgroundColor: post.thumbnail }}>{post.category}</span>
          <time className="text-sm text-gray-400">{post.date}</time>
          <span className="text-sm text-gray-300">・</span>
          <span className="text-sm text-gray-400">{post.readTime}</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-6">{post.title}</h1>
        <p className="text-sm text-gray-500 pb-8 border-b border-gray-200">{post.author}</p>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-12 space-y-5">
        {renderContent(post.content)}
      </article>

      <div className="max-w-3xl mx-auto px-6 pb-20 lg:pb-28">
        <div className="border-t border-gray-200 pt-8">
          <Link href="/blog" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors duration-300">← ブログ一覧に戻る</Link>
        </div>
      </div>
    </main>
  );
}

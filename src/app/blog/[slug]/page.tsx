"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { getPostBySlug } from "@/lib/blog-data";

function renderContent(content: string) {
  const blocks = content.split("\n\n");
  return blocks.map((block, i) => {
    const trimmed = block.trim();
    if (trimmed.startsWith("### ")) {
      return <h3 key={i} className="text-lg font-light text-gray-700 mt-10 mb-3">{trimmed.replace("### ", "")}</h3>;
    }
    if (trimmed.startsWith("## ")) {
      return <h2 key={i} className="text-xl font-light text-gray-700 mt-12 mb-4">{trimmed.replace("## ", "")}</h2>;
    }
    if (trimmed.startsWith("- ")) {
      const items = trimmed.split("\n").filter((l) => l.startsWith("- "));
      return (
        <ul key={i} className="space-y-2 text-[14px] text-gray-500 leading-[2.4] font-light pl-4">
          {items.map((item, j) => (
            <li key={j} className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-[0.85em] before:w-[4px] before:h-[4px] before:rounded-full before:bg-gray-300">
              {item.replace("- ", "")}
            </li>
          ))}
        </ul>
      );
    }
    return <p key={i} className="text-[14px] text-gray-500 leading-[2.4] font-light">{trimmed}</p>;
  });
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-[700px] mx-auto px-6 pt-40 pb-32 text-center">
          <h1 className="text-[clamp(1.5rem,3vw,2.2rem)] font-extralight text-gray-900 mb-4">記事が見つかりません</h1>
          <p className="text-[14px] text-gray-500 font-light mb-10">お探しの記事は存在しないか、削除された可能性があります。</p>
          <Link href="/blog" className="text-[12px] tracking-[0.1em] text-gray-400 hover:text-gray-700 transition-colors duration-300">← ブログ一覧</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-[700px] mx-auto px-6 pt-40">
        <Link href="/blog" className="inline-block text-[12px] tracking-[0.05em] text-gray-400 hover:text-gray-700 transition-colors duration-300 mb-12">← ブログ一覧</Link>

        <div className="flex items-center gap-4 mb-6">
          <span className="inline-block px-3 py-1 text-[10px] tracking-[0.15em] uppercase text-white" style={{ backgroundColor: post.thumbnail }}>{post.category}</span>
          <time className="text-[11px] tracking-[0.05em] text-gray-400">{post.date}</time>
          <span className="text-[11px] text-gray-300">・</span>
          <span className="text-[11px] tracking-[0.05em] text-gray-400">{post.readTime}</span>
        </div>

        <h1 className="text-[clamp(1.5rem,3vw,2.2rem)] font-extralight text-gray-900 leading-[1.35] mb-8">{post.title}</h1>
        <p className="text-[12px] tracking-[0.05em] text-gray-400 font-light pb-10 border-b border-gray-200">{post.author}</p>
      </div>

      <article className="max-w-[700px] mx-auto px-6 py-16 space-y-6">
        {renderContent(post.content)}
      </article>

      <div className="max-w-[700px] mx-auto px-6 pb-32 lg:pb-44">
        <div className="border-t border-gray-200 pt-10">
          <Link href="/blog" className="text-[12px] tracking-[0.1em] text-gray-400 hover:text-gray-700 transition-colors duration-300">← ブログ一覧に戻る</Link>
        </div>
      </div>
    </main>
  );
}

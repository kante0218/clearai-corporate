"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, blogPosts } from "@/lib/blog-data";

function renderContent(content: string) {
  const blocks = content.split("\n\n");
  return blocks.map((block, i) => {
    const trimmed = block.trim();
    if (trimmed.startsWith("### ")) {
      return (
        <h3
          key={i}
          className="text-xl font-bold text-navy-950 mt-10 mb-4"
        >
          {trimmed.replace("### ", "")}
        </h3>
      );
    }
    if (trimmed.startsWith("## ")) {
      return (
        <h2
          key={i}
          className="text-2xl font-bold text-navy-950 mt-12 mb-4 pb-2 border-b border-gray-200"
        >
          {trimmed.replace("## ", "")}
        </h2>
      );
    }
    if (trimmed.startsWith("- ")) {
      const items = trimmed.split("\n").filter((l) => l.startsWith("- "));
      return (
        <ul key={i} className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed">
          {items.map((item, j) => (
            <li key={j}>{item.replace("- ", "")}</li>
          ))}
        </ul>
      );
    }
    return (
      <p key={i} className="text-gray-700 leading-relaxed">
        {trimmed}
      </p>
    );
  });
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <main className="pt-20 min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-6 py-32 text-center">
          <h1 className="text-3xl font-bold text-navy-950 mb-4">
            記事が見つかりません
          </h1>
          <p className="text-gray-600 mb-8">
            お探しの記事は存在しないか、削除された可能性があります。
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-dark font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            ブログ一覧に戻る
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20 min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-accent transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            ブログ一覧
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span
              className="inline-block px-3 py-1 text-xs font-semibold text-white rounded-full"
              style={{ backgroundColor: post.thumbnail }}
            >
              {post.category}
            </span>
            <time className="text-sm text-gray-500">{post.date}</time>
            <span className="text-sm text-gray-500">・{post.readTime}</span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-navy-950 leading-tight">
            {post.title}
          </h1>

          <div className="mt-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-navy-950">{post.author}</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-6 py-12 space-y-6">
        {renderContent(post.content)}
      </article>

      {/* Back Link */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <div className="border-t border-gray-200 pt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-dark font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            ブログ一覧に戻る
          </Link>
        </div>
      </section>
    </main>
  );
}

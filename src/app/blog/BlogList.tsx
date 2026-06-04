"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Blog } from "@/lib/microcms";

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); } },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    }}>{children}</div>
  );
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function BlogList({ posts, categories }: { posts: Blog[]; categories: string[] }) {
  const [selectedCategory, setSelectedCategory] = useState("すべて");

  const filteredPosts =
    selectedCategory === "すべて"
      ? posts
      : posts.filter((post) => post.category?.name === selectedCategory);

  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-5xl mx-auto px-6 pt-40 pb-16">
        <Reveal>
          <p className="text-xs font-semibold tracking-widest uppercase text-sky-600 mb-4">News</p>
          <h1 className="text-3xl font-bold text-gray-900">お知らせ</h1>
        </Reveal>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-12">
        <Reveal>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gray-900 text-white"
                    : "text-gray-500 border border-gray-200 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-20 lg:pb-28">
        {filteredPosts.length === 0 ? (
          <p className="text-center text-gray-400 py-20 text-sm">該当する記事がありません</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredPosts.map((post, i) => (
              <Reveal key={post.id} delay={i * 60}>
                <Link href={`/blog/${post.id}`} className="group flex items-start gap-4 py-6 hover:bg-gray-50 -mx-4 px-4 rounded-lg transition-colors">
                  {post.eyecatch && (
                    <div className="w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 hidden sm:block">
                      <Image
                        src={post.eyecatch.url}
                        alt={post.title}
                        width={80}
                        height={56}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1.5">
                      <time className="text-xs text-gray-400 font-medium">{formatDate(post.publishedAt!)}</time>
                      {post.category && (
                        <span className="text-xs font-semibold text-sky-600 bg-sky-50 px-2 py-0.5 rounded">{post.category.name}</span>
                      )}
                    </div>
                    <h2 className="text-base font-medium text-gray-900 group-hover:text-sky-600 transition-colors leading-relaxed">
                      {post.title}
                    </h2>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

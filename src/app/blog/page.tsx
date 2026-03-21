"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import { blogPosts, categories } from "@/lib/blog-data";

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
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    }}>{children}</div>
  );
}

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("すべて");

  const filteredPosts =
    selectedCategory === "すべて"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="max-w-5xl mx-auto px-6 pt-40 pb-16">
        <Reveal>
          <p className="text-sm font-semibold text-indigo-600 mb-4">Blog</p>
          <h1 className="text-3xl font-bold text-gray-900">
            最新の記事
          </h1>
        </Reveal>
      </section>

      {/* Category Filter */}
      <section className="max-w-5xl mx-auto px-6 pb-12">
        <Reveal>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
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

      {/* Blog Grid */}
      <section className="max-w-5xl mx-auto px-6 pb-20 lg:pb-28">
        {filteredPosts.length === 0 ? (
          <p className="text-center text-gray-400 py-20 text-sm">
            該当する記事がありません
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 100}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div
                    className="w-full aspect-[4/3] rounded-2xl mb-4 transition-transform duration-500 group-hover:scale-[1.02]"
                    style={{ backgroundColor: post.thumbnail }}
                  />
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-semibold text-indigo-600">{post.category}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <time className="text-sm text-gray-400">{post.date}</time>
                  </div>
                  <h2 className="text-base font-semibold text-gray-900 leading-relaxed group-hover:text-indigo-600 transition-colors duration-300">
                    {post.title}
                  </h2>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

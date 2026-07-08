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
      {/* ─── 00. MASTHEAD ────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pt-40 pb-16 lg:pb-24">
        <Reveal>
          <div className="flex items-center gap-4 border-b border-neutral-900 pb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
            <span className="font-bold text-neutral-900">§00</span>
            <span>News</span>
            <span className="ml-auto tabular-nums text-neutral-400">
              {String(posts.length).padStart(2, "0")} / ARCHIVE
            </span>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-10 text-[8vw] sm:text-4xl lg:text-5xl font-bold leading-[0.95] tracking-[-0.04em] text-balance text-neutral-900">
            お知らせ
          </h1>
        </Reveal>
      </section>

      {/* ─── CATEGORY FILTER (angular mono chips) ────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pb-12">
        <Reveal>
          <div className="flex items-center gap-4 border-b border-neutral-900 pb-4 mb-6">
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-neutral-500">
              Filter
            </span>
            <span className="ml-auto font-mono text-[10px] tabular-nums text-neutral-400">
              {String(categories.length).padStart(2, "0")}
            </span>
          </div>
          <div className="flex flex-wrap gap-0 -ml-px">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`-ml-px border px-4 py-2 font-mono text-[12px] uppercase tracking-[0.12em] transition-colors duration-200 ${
                  selectedCategory === category
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-300 bg-white text-neutral-500 hover:border-neutral-900 hover:text-neutral-900"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ─── BLOG INDEX (mono ruled list) ────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pb-20 lg:pb-28">
        {filteredPosts.length === 0 ? (
          <div className="border-y border-neutral-900 py-20 text-center">
            <p className="font-mono text-[13px] uppercase tracking-[0.15em] text-neutral-400">該当する記事がありません</p>
          </div>
        ) : (
          <div className="border-t border-neutral-900">
            {filteredPosts.map((post, i) => (
              <Reveal key={post.id} delay={i * 60}>
                <Link
                  href={`/blog/${post.id}`}
                  className="group flex items-start gap-4 border border-transparent border-b-neutral-200 -mx-4 px-4 py-6 transition-colors duration-300 hover:border-neutral-900 hover:bg-neutral-50"
                >
                  <span className="hidden sm:block pt-1 font-mono text-[10px] tabular-nums text-neutral-400 group-hover:text-neutral-900">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {post.eyecatch && (
                    <div className="w-20 h-14 overflow-hidden flex-shrink-0 hidden sm:block border border-neutral-900">
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
                      <time className="font-mono text-[11px] tabular-nums text-neutral-400">{formatDate(post.publishedAt!)}</time>
                      {post.category && (
                        <span className="border border-neutral-300 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-neutral-500 group-hover:border-neutral-900 group-hover:text-neutral-900 transition-colors">
                          {post.category.name}
                        </span>
                      )}
                    </div>
                    <h2 className="text-base font-medium text-neutral-900 leading-relaxed text-pretty">
                      {post.title}
                    </h2>
                  </div>
                  <span className="ml-auto pt-1 font-mono text-neutral-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-neutral-900">
                    →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

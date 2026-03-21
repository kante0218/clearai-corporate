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
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(50px)",
      transition: `opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
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
      <section className="max-w-[1100px] mx-auto px-6 pt-40 pb-20">
        <Reveal>
          <p className="text-[11px] tracking-[0.25em] uppercase text-gray-400 mb-6 font-medium">Blog</p>
          <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-extralight tracking-tight text-gray-900 leading-[1.15]">
            最新の記事
          </h1>
        </Reveal>
      </section>

      {/* Category Filter */}
      <section className="max-w-[1100px] mx-auto px-6 pb-16">
        <Reveal>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 text-[12px] tracking-[0.1em] transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gray-900 text-white"
                    : "text-gray-400 border border-gray-200 hover:text-gray-600 hover:border-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Blog Grid */}
      <section className="max-w-[1100px] mx-auto px-6 pb-32 lg:pb-44">
        {filteredPosts.length === 0 ? (
          <p className="text-center text-gray-400 py-20 text-[14px] tracking-wide">
            該当する記事がありません
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {filteredPosts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 100}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div
                    className="w-full aspect-[4/3] mb-5 transition-transform duration-700 group-hover:scale-[1.02]"
                    style={{ backgroundColor: post.thumbnail }}
                  />
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[11px] tracking-[0.15em] text-gray-400 uppercase">{post.category}</span>
                    <span className="w-[3px] h-[3px] rounded-full bg-gray-300" />
                    <time className="text-[11px] tracking-[0.05em] text-gray-400">{post.date}</time>
                  </div>
                  <h2 className="text-[15px] font-light text-gray-700 leading-[1.8] group-hover:text-gray-900 transition-colors duration-300">
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

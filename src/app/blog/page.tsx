"use client";

import { useState } from "react";
import Link from "next/link";
import { blogPosts, categories } from "@/lib/blog-data";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("すべて");

  const filteredPosts =
    selectedCategory === "すべて"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <main className="pt-20 min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-navy-950 tracking-tight">
            ブログ
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            AI活用の最新情報、導入事例、テクノロジートレンドをお届けします
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-accent text-white shadow-md shadow-accent/25"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-navy-950"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        {filteredPosts.length === 0 ? (
          <p className="text-center text-gray-500 py-16">
            該当する記事がありません
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 hover:border-gray-300 transition-all duration-300"
              >
                {/* Thumbnail */}
                <div
                  className="h-48 w-full relative overflow-hidden"
                  style={{ backgroundColor: post.thumbnail }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-navy-950 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                    <time>{post.date}</time>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-lg font-bold text-navy-950 leading-snug group-hover:text-accent transition-colors duration-200 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

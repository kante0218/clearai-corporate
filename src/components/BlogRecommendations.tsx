"use client";

import Image from "next/image";
import { cmsImage } from "@/lib/cms-image";
import Link from "next/link";
import { useEffect, useState } from "react";

export type RecommendedBlog = { id: string; title: string; image: string; category: string };

export default function BlogRecommendations({ posts, currentId }: { posts: RecommendedBlog[]; currentId: string }) {
  const candidates = posts.filter((post) => post.id !== currentId);
  const [selected, setSelected] = useState(candidates.slice(0, 5));

  useEffect(() => {
    let history: string[] = [];
    try {
      const saved: unknown = JSON.parse(localStorage.getItem("clearai-read-articles") ?? "[]");
      if (Array.isArray(saved)) history = saved.filter((id): id is string => typeof id === "string");
      localStorage.setItem("clearai-read-articles", JSON.stringify([currentId, ...history.filter((id) => id !== currentId)].slice(0, 50)));
    } catch { /* Recommendations also work when browser storage is unavailable. */ }
    const shuffled = posts.filter((post) => post.id !== currentId).map((post) => ({ post, random: Math.random() }));
    shuffled.sort((a, b) => Number(history.includes(a.post.id)) - Number(history.includes(b.post.id)) || a.random - b.random);
    setSelected(shuffled.slice(0, 5).map(({ post }) => post));
  }, [posts, currentId]);

  if (!selected.length) return null;
  return (
    <aside aria-label="おすすめ記事" className="min-w-0 border-t border-neutral-900 pt-5 lg:border-t-0 lg:border-l lg:border-neutral-200 lg:pl-6">
      <h2 className="mb-5 text-base font-bold text-neutral-900">おすすめ記事</h2>
      <div className="divide-y divide-neutral-200">
        {selected.map((post) => (
          <Link key={post.id} href={`/blog/${post.id}`} className="group flex gap-3 py-5 first:pt-0 focus-visible:outline-2 focus-visible:outline-offset-4">
            <div className="relative h-[64px] w-[88px] shrink-0 overflow-hidden bg-neutral-100">
              <Image src={cmsImage(post.image, 264)} unoptimized alt="" fill sizes="88px" className="object-cover" />
            </div>
            <div className="min-w-0">
              <p className="mb-1 text-xs text-neutral-500">{post.category}</p>
              <h3 className="text-sm font-semibold leading-relaxed text-neutral-900 group-hover:underline">{post.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}

"use client";

import Link from "next/link";
import styles from "@/components/NewsReadability.module.css";
import Image from "next/image";
import { cmsImage } from "@/lib/cms-image";
import type { Blog } from "@/lib/microcms";
import PageHeader from "@/components/PageHeader";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function BlogList({ posts }: { posts: Blog[] }) {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        kicker="News"
        title="お知らせ"
        crumbs={[{ label: "ホーム", href: "/" }, { label: "お知らせ" }]}
      />

      <section className="max-w-[1120px] mx-auto px-6 lg:px-8 pt-14 lg:pt-20 pb-20 lg:pb-28">
        {posts.length === 0 ? (
          <p className="text-center text-neutral-600 py-20 text-sm">該当する記事がありません</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {posts.map((post) => (
              <div key={post.id}>
                <Link href={`/blog/${post.id}`} className={`${styles.listLink} group flex items-start gap-4 py-6 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-4`}>
                  {post.eyecatch && (
                    <div className={styles.thumbnail}>
                      <Image
                        src={cmsImage(post.eyecatch.url, 480)}
                        unoptimized
                        alt=""
                        width={160}
                        height={90}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-1.5">
                      <time dateTime={post.publishedAt} className="text-xs text-neutral-600 font-medium">{formatDate(post.publishedAt!)}</time>
                      {post.category && (
                        <span className="text-xs font-semibold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded">{post.category.name}</span>
                      )}
                    </div>
                    <h2 className={styles.listTitle}>
                      {post.title}
                    </h2>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

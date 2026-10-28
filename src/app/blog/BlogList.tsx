"use client";
import LocalizedContent from "@/components/LocalizedContent";


import { isCompanyAnnouncement } from "@/lib/blog-classification";
import { formatBlogDate } from "@/lib/blog-date";

import Link from "next/link";
import styles from "@/components/NewsReadability.module.css";
import Image from "next/image";
import { cmsImage } from "@/lib/cms-image";
import type { Blog } from "@/lib/microcms";
import PageHeader from "@/components/PageHeader";



export default function BlogList({ posts }: { posts: Blog[] }) {
  const groups = [{ title: "ClearAIからのお知らせ", posts: posts.filter(isCompanyAnnouncement) }, { title: "AI・技術・導入事例の記事", posts: posts.filter(post => !isCompanyAnnouncement(post)) }];
  return <LocalizedContent>{(
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
          <div className="space-y-10">
            {groups.filter(group => group.posts.length > 0).map(group => <section key={group.title}><h2 className="mb-3 text-xl font-bold text-neutral-900">{group.title}</h2><div className="divide-y divide-gray-100">{group.posts.map((post) => (
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
                      <time dateTime={post.publishedAt} className="text-xs text-neutral-600 font-medium">{formatBlogDate(post.publishedAt!)}</time>
                      {post.category && (
                        <span className="text-xs font-semibold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded">{post.category.name}</span>
                      )}
                    </div>
                    <h3 className={styles.listTitle}>
                      {post.title}
                    </h3>
                  </div>
                </Link>
              </div>
            ))}</div></section>)}
          </div>
        )}
      </section>
    </main>
  )}</LocalizedContent>;
}

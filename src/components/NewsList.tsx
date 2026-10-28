import Link from "next/link";
import styles from "./NewsReadability.module.css";
import Image from "next/image";
import { cmsImage } from "@/lib/cms-image";
import { getBlogs, type Blog } from "@/lib/microcms";
import { formatBlogDate } from "@/lib/blog-date";
import { isCompanyAnnouncement } from "@/lib/blog-classification";

export default async function NewsList() {
  let posts: { slug: string; title: string; date: string; category: string; image: string; company: boolean }[] = [];

  const fallbackImages = [
    "/images/generated-trust/home-quality-inspection.webp",
    "/images/generated-trust/consulting-process-map.webp",
    "/images/generated-trust/home-system-monitoring.webp",
  ];

  try {
    const data = await getBlogs();
    posts = data.contents.map((p: Blog, index) => ({
      slug: p.id,
      title: p.title,
      date: formatBlogDate(p.publishedAt!),
      company: isCompanyAnnouncement(p),
      category: p.category?.name ?? "記事",
      image: p.eyecatch?.url ?? fallbackImages[index % fallbackImages.length],
    }));
  } catch {
    // microCMS未設定時はローカルデータにフォールバック
  }

  if (posts.length === 0) {
    return <p className="text-sm leading-7 text-neutral-600">現在、お知らせを取得できません。<Link href="/service" className="ml-2 font-semibold underline underline-offset-4">提供サービスを見る</Link></p>;
  }
  const ordered = [...posts.filter(post => post.company), ...posts.filter(post => !post.company)].slice(0, 3);

  return (
    <div className="grid gap-3 sm:grid-cols-3 sm:gap-5">
      {ordered.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className={`${styles.homeCard} group grid grid-cols-[92px_1fr] gap-3 overflow-hidden rounded-lg border border-gray-200 bg-white p-3 transition hover:border-gray-300 hover:shadow-sm sm:block sm:p-0`}
        >
          <div className="relative aspect-[16/9] overflow-hidden rounded-md bg-gray-100 sm:aspect-[16/9] sm:rounded-none">
            <Image src={cmsImage(post.image, 800)} unoptimized alt="" fill sizes="(max-width: 639px) 92px, 33vw" className="object-contain" />
          </div>
          <div className="min-w-0 sm:p-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-neutral-600 font-medium whitespace-nowrap pt-0.5">{post.date}</span>
            <span className="text-xs font-semibold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded">{post.company ? "ClearAIからのお知らせ" : `記事 / ${post.category}`}</span>
          </div>
          <h3 className="mt-2 text-sm font-medium leading-relaxed text-gray-900 transition-colors group-hover:text-neutral-700">
            {post.title}
          </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}

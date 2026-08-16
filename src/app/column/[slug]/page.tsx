import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Prose from "@/components/column/Prose";
import { articles, getArticle, relatedArticles } from "@/lib/column";
import { headingId, tocOf } from "@/lib/column/types";
import { BOOKING_URL } from "@/lib/booking";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "記事が見つかりません" };

  const url = `https://clearai.jp/column/${article.slug}`;
  return {
    // Deliberately absolute: article titles already run 25–40 full-width chars,
    // so appending "| ClearAI株式会社" would only be truncated in the SERP.
    // The brand still appears in og:title below.
    title: { absolute: article.title },
    description: article.description,
    keywords: [...article.keywords, "ClearAI", "クリアエーアイ"],
    alternates: { canonical: url },
    openGraph: {
      title: `${article.title} | ClearAI株式会社`,
      description: article.description,
      url,
      type: "article",
      locale: "ja_JP",
      siteName: "ClearAI株式会社",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      images: ["/images/logo.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | ClearAI株式会社`,
      description: article.description,
      images: ["/images/logo.png"],
    },
  };
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${y}年${Number(m)}月${Number(d)}日`;
}

export default async function ColumnArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const url = `https://clearai.jp/column/${article.slug}`;
  const toc = tocOf(article);
  const related = relatedArticles(article);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: article.title,
    description: article.description,
    abstract: article.summary,
    url,
    inLanguage: "ja",
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    articleSection: article.category,
    keywords: article.keywords.join(", "),
    author: { "@type": "Organization", name: "ClearAI株式会社", url: "https://clearai.jp" },
    publisher: { "@id": "https://clearai.jp/#organization" },
    isPartOf: { "@id": "https://clearai.jp/#website" },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: "https://clearai.jp/images/logo.png",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: article.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: "https://clearai.jp" },
      { "@type": "ListItem", position: 2, name: "コラム", item: "https://clearai.jp/column" },
      { "@type": "ListItem", position: 3, name: article.h1, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <article className="bg-white">
        {/* Title block */}
        <header className="border-b border-gray-100 pt-24 pb-8 lg:pt-28 lg:pb-10">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
            <nav aria-label="パンくず" className="mb-8 text-xs text-neutral-500">
              <Link href="/" className="hover:text-neutral-900 transition-colors">ホーム</Link>
              <span className="mx-2 text-neutral-300">/</span>
              <Link href="/column" className="hover:text-neutral-900 transition-colors">コラム</Link>
              <span className="mx-2 text-neutral-300">/</span>
              <span className="text-neutral-900">{article.category}</span>
            </nav>

            <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-neutral-500">
              <span className="border border-neutral-200 px-2.5 py-1 font-medium text-neutral-900">
                {article.category}
              </span>
              <span>
                公開 <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
              </span>
              {article.updatedAt !== article.publishedAt && (
                <span>
                  更新 <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time>
                </span>
              )}
            </div>

            {/* Same scale as PageHeader so every page opens at the same size. */}
            <h1 className="text-3xl lg:text-4xl font-bold leading-tight text-gray-900">
              {article.h1}
            </h1>
          </div>
        </header>

        <div className="py-14 lg:py-20">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
            {/* Answer-first summary — the block AI assistants and snippets pull from. */}
            <section className="mb-12 border border-neutral-900 p-6 md:p-8">
              <h2 className="mb-4 text-sm font-bold text-neutral-900">結論から</h2>
              <p className="mb-7 text-[15px] leading-[1.95] text-neutral-700">{article.summary}</p>
              <h2 className="mb-3 text-sm font-bold text-neutral-900">この記事の要点</h2>
              <ul className="space-y-2">
                {article.keyPoints.map((p, i) => (
                  <li key={i} className="relative pl-5 text-sm leading-[1.85] text-neutral-600">
                    <span aria-hidden className="absolute left-0 top-[0.7em] h-1.5 w-1.5 rounded-full bg-neutral-900" />
                    {p}
                  </li>
                ))}
              </ul>
            </section>

            {/* Table of contents */}
            {toc.length > 1 && (
              <nav aria-label="目次" className="mb-14 bg-neutral-50 p-6 md:p-8">
                <p className="mb-4 text-sm font-bold text-neutral-900">目次</p>
                <ol className="space-y-2.5">
                  {toc.map((h, i) => (
                    <li key={h.id} className="flex gap-3 text-sm leading-relaxed">
                      <span className="shrink-0 tabular-nums text-neutral-400">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <a
                        href={`#${h.id}`}
                        className="text-neutral-700 underline-offset-4 hover:text-neutral-900 hover:underline transition-colors"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <Prose blocks={article.body} />

            {/* FAQ */}
            {article.faq.length > 0 && (
              <section className="mt-20 border-t border-neutral-200 pt-14">
                <h2 id={headingId("よくあるご質問")} className="scroll-mt-28 mb-8 text-2xl lg:text-3xl font-bold text-gray-900">
                  よくあるご質問
                </h2>
                <dl className="divide-y divide-neutral-200 border-y border-neutral-200">
                  {article.faq.map((f, i) => (
                    <div key={i} className="py-7">
                      <dt className="mb-3 flex gap-3 text-base font-bold leading-snug text-neutral-900">
                        <span aria-hidden className="shrink-0 text-neutral-400">Q.</span>
                        <span>{f.q}</span>
                      </dt>
                      <dd className="flex gap-3 text-[15px] leading-[1.95] text-neutral-600">
                        <span aria-hidden className="shrink-0 text-neutral-400">A.</span>
                        <span>{f.a}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            {/* Sources */}
            {article.sources && article.sources.length > 0 && (
              <section className="mt-14">
                <h2 className="mb-4 text-sm font-bold text-neutral-900">参照</h2>
                <ul className="space-y-2">
                  {article.sources.map((s) => (
                    <li key={s.url} className="text-sm leading-relaxed">
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-600 underline underline-offset-4 decoration-neutral-300 hover:text-neutral-900 hover:decoration-neutral-900 transition-colors"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* CTA */}
            <section className="mt-16 bg-neutral-950 p-8 md:p-12">
              <h2 className="mb-4 text-2xl md:text-3xl font-bold leading-snug text-white">
                {article.cta.heading}
              </h2>
              <p className="mb-8 text-sm leading-[1.9] text-white/60">{article.cta.text}</p>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white px-7 py-3.5 text-sm font-semibold text-neutral-900 transition-opacity hover:opacity-80"
              >
                {article.cta.buttonLabel}
                <span aria-hidden>→</span>
              </a>
            </section>

            {/* Related */}
            {related.length > 0 && (
              <section className="mt-20 border-t border-neutral-200 pt-12">
                <h2 className="mb-7 text-sm font-bold text-neutral-900">関連する記事</h2>
                <ul className="divide-y divide-neutral-200 border-t border-neutral-200">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link href={`/column/${r.slug}`} className="group block py-5">
                        <span className="mb-1.5 block text-xs text-neutral-500">{r.category}</span>
                        <span className="block text-base font-bold leading-snug text-neutral-900 group-hover:underline underline-offset-4 decoration-neutral-400">
                          {r.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className="mt-14">
              <Link
                href="/column"
                className="text-sm text-neutral-500 underline-offset-4 hover:text-neutral-900 hover:underline transition-colors"
              >
                ← コラム一覧に戻る
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

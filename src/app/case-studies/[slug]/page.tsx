import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Prose from "@/components/column/Prose";
import { caseStudies, getCaseStudy, relatedCaseStudies } from "@/lib/cases";
import { headingId, tocOf } from "@/lib/cases/types";
import { articlesBySlug } from "@/lib/column";
import { BOOKING_URL } from "@/lib/booking";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "事例が見つかりません" };

  const url = `https://clearai.jp/case-studies/${study.slug}`;
  return {
    // Absolute: case titles already run long, so a "| ClearAI株式会社" suffix
    // would only be truncated in the SERP. The brand still appears in og:title.
    title: { absolute: study.title },
    description: study.description,
    keywords: [...study.keywords, "ClearAI", "クリアエーアイ", "導入実績"],
    alternates: { canonical: url },
    openGraph: {
      title: `${study.title} | ClearAI株式会社`,
      description: study.description,
      url,
      type: "article",
      locale: "ja_JP",
      siteName: "ClearAI株式会社",
      publishedTime: study.publishedAt,
      modifiedTime: study.updatedAt,
      images: [study.image.src],
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.title} | ClearAI株式会社`,
      description: study.description,
      images: [study.image.src],
    },
  };
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${y}年${Number(m)}月${Number(d)}日`;
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const url = `https://clearai.jp/case-studies/${study.slug}`;
  const toc = tocOf(study);
  const related = relatedCaseStudies(study);
  const relatedColumns = (study.relatedColumns ?? [])
    .map((s) => articlesBySlug[s])
    .filter(Boolean);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: study.title,
    description: study.description,
    abstract: study.summary,
    url,
    inLanguage: "ja",
    datePublished: study.publishedAt,
    dateModified: study.updatedAt,
    articleSection: study.category,
    keywords: study.keywords.join(", "),
    author: { "@type": "Organization", name: "ClearAI株式会社", url: "https://clearai.jp" },
    publisher: { "@id": "https://clearai.jp/#organization" },
    isPartOf: { "@id": "https://clearai.jp/#website" },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: `https://clearai.jp${study.image.src}`,
    about: { "@type": "Thing", name: study.industry },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: study.faq.map((f) => ({
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
      { "@type": "ListItem", position: 2, name: "導入実績", item: "https://clearai.jp/case-studies" },
      { "@type": "ListItem", position: 3, name: study.h1, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <article data-original-language="ja" lang="ja" className="bg-white">
        {/* Title block */}
        <header className="border-b border-gray-100 pt-24 pb-8 lg:pt-28 lg:pb-10">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-8">


            <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-neutral-500">
              <span className="border border-neutral-200 px-2.5 py-1 font-medium text-neutral-900">
                {study.category}
              </span>
              <span>{study.industry}</span>
              <span>
                公開 <time dateTime={study.publishedAt}>{formatDate(study.publishedAt)}</time>
              </span>
              {study.updatedAt !== study.publishedAt && (
                <span>
                  更新 <time dateTime={study.updatedAt}>{formatDate(study.updatedAt)}</time>
                </span>
              )}
            </div>

            {/* Same scale as PageHeader so every page opens at the same size. */}
            <h1 className="text-3xl lg:text-4xl font-bold leading-tight text-gray-900">
              {study.h1}
            </h1>
          </div>
        </header>

        <div className="py-14 lg:py-20">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-8">


            {/* Answer-first summary */}
            <section className="mb-12 border border-neutral-900 p-6 md:p-8">
              <h2 className="mb-4 text-sm font-bold text-neutral-900">概要</h2>
              <p className="mb-7 text-[15px] leading-[1.95] text-neutral-700">{study.summary}</p>
              <h2 className="mb-3 text-sm font-bold text-neutral-900">この事例の要点</h2>
              <ul className="space-y-2">
                {study.keyPoints.map((p, i) => (
                  <li key={i} className="relative pl-5 text-sm leading-[1.85] text-neutral-600">
                    <span aria-hidden className="absolute left-0 top-[0.7em] h-1.5 w-1.5 rounded-full bg-neutral-900" />
                    {p}
                  </li>
                ))}
              </ul>
            </section>

            <figure className="mb-12">
              <div className="relative aspect-[16/9] max-w-4xl overflow-hidden bg-neutral-100 md:aspect-[21/9]">
                <Image
                  src={study.image.src}
                  alt={study.image.alt}
                  fill
                  priority
                  sizes="(max-width: 767px) calc(100vw - 3rem), (max-width: 1799px) calc(100vw - 4rem), 1736px"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-xs leading-relaxed text-neutral-500">
                ※ 掲載写真は支援内容・活用場面を伝えるためのイメージです。実際の導入先・現場を撮影したものではありません。
              </figcaption>
            </figure>

            {/* Fact sheet */}
            <section className="mb-12 bg-neutral-50 p-6 md:p-8">
              <h2 className="mb-5 text-sm font-bold text-neutral-900">案件の概要</h2>
              <dl className="divide-y divide-neutral-200 border-y border-neutral-200">
                {study.facts.map((f) => (
                  <div key={f.label} className="flex flex-col gap-1 py-3.5 sm:flex-row sm:gap-6">
                    <dt className="shrink-0 text-xs font-semibold text-neutral-500 sm:w-32 sm:pt-0.5">
                      {f.label}
                    </dt>
                    <dd className="text-sm leading-relaxed text-neutral-800">{f.value}</dd>
                  </div>
                ))}
              </dl>
              {study.stack.length > 0 && (
                <div className="mt-6">
                  <p className="mb-3 text-xs font-semibold text-neutral-500">主な技術</p>
                  <ul className="flex flex-wrap gap-2">
                    {study.stack.map((s) => (
                      <li
                        key={s}
                        className="border border-neutral-300 bg-white px-2.5 py-1 text-xs text-neutral-700"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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

            {study.slug === "milling-machine-ai-agent" && <section className="mb-10 rounded-lg border border-neutral-300 p-5" aria-label="人とAIの工程図">
              <h2 className="mb-4 text-lg font-bold text-neutral-900">発注書から機械への転送まで</h2>
              <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[{role:"システム",step:"発注書の受信・仕分け"},{role:"AI",step:"仕様を項目に分けて抽出"},{role:"システム",step:"過去実績・形状との照合"},{role:"AI",step:"3Dモデル・加工パス・NC生成"},{role:"人",step:"切削条件とNCコードの承認"},{role:"システム",step:"承認済みデータを転送"}].map((item,index) => <li key={item.step} className={`rounded-md border p-4 ${item.role === "人" ? "border-amber-400 bg-amber-50" : item.role === "AI" ? "border-indigo-300 bg-indigo-50" : "border-neutral-300 bg-neutral-50"}`}><p className="mb-2 text-xs font-bold">{index+1} → {item.role}</p><p className="text-sm leading-relaxed text-neutral-800">{item.step}</p></li>)}
              </ol>
              <p className="mt-4 text-sm leading-relaxed text-neutral-700">新規品は照合段階で設計者へ回します。抽出結果が未確定・公差外の場合も自動処理を停止し、人が確認します。</p>
            </section>}
            {study.slug === "ses-sns-automation" && <section className="mb-10 rounded-lg border border-neutral-300 p-5" aria-label="SNS運用画面の説明図">
              <h2 className="mb-3 text-lg font-bold text-neutral-900">下書きから返信までの確認箇所</h2>
              <p className="mb-5 text-sm leading-relaxed text-neutral-600">既存の事例説明を整理した説明図です。実際の運用画面や顧客データのスクリーンショットではありません。</p>
              <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <li className="rounded-md border border-indigo-300 bg-indigo-50 p-4"><p className="mb-2 text-xs font-bold">1 下書き・宛先候補</p><p className="text-sm leading-relaxed">投稿カレンダー・下書き、条件に沿う宛先、個別化したDM文面を準備。</p></li>
                <li className="rounded-md border border-amber-400 bg-amber-50 p-4"><p className="mb-2 text-xs font-bold">2 人が修正・承認</p><p className="text-sm leading-relaxed">担当者が文面を確認。未承認のまま投稿・送信へ進めません。</p></li>
                <li className="rounded-md border border-neutral-300 bg-neutral-50 p-4"><p className="mb-2 text-xs font-bold">3 投稿・送信履歴</p><p className="text-sm leading-relaxed">承認した投稿・送信の結果を記録。送信済み・対応中の相手を宛先から除外。</p></li>
                <li className="rounded-md border border-amber-400 bg-amber-50 p-4"><p className="mb-2 text-xs font-bold">4 人が返信対応</p><p className="text-sm leading-relaxed">返信を通知し、その後の会話や日程調整は担当者が対応。</p></li>
              </ol>
            </section>}
            <Prose blocks={study.body} />

            {/* FAQ */}
            {study.faq.length > 0 && (
              <section className="mt-20 border-t border-neutral-200 pt-14">
                <h2 id={headingId("よくあるご質問")} className="scroll-mt-28 mb-8 text-2xl lg:text-3xl font-bold text-gray-900">
                  よくあるご質問
                </h2>
                <dl className="divide-y divide-neutral-200 border-y border-neutral-200">
                  {study.faq.map((f, i) => (
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

            {/* CTA */}
            <section className="mt-16 bg-neutral-950 p-8 md:p-12">
              <h2 className="mb-4 text-2xl md:text-3xl font-bold leading-snug text-white">
                {study.cta.heading}
              </h2>
              <p className="mb-8 text-sm leading-[1.9] text-white/60">{study.cta.text}</p>
              <a data-ui-with-icon data-ui-button="filled"
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-cta hover:bg-cta-hover px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-80"
              ><span className="ui-button-label">{study.cta.buttonLabel}</span><span className="ui-button-icon" data-ui-side="end" aria-hidden="true"><span aria-hidden>→</span></span></a>
            </section>

            {/* Related case studies */}
            {related.length > 0 && (
              <section className="mt-20 border-t border-neutral-200 pt-12">
                <h2 className="mb-7 text-sm font-bold text-neutral-900">ほかの導入実績</h2>
                <ul className="divide-y divide-neutral-200 border-t border-neutral-200">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link href={`/case-studies/${r.slug}`} className="group block py-5">
                        <span className="mb-1.5 block text-xs text-neutral-500">
                          {r.category}／{r.industry}
                        </span>
                        <span className="block text-base font-bold leading-snug text-neutral-900 group-hover:underline underline-offset-4 decoration-neutral-400">
                          {r.h1}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Related columns */}
            {relatedColumns.length > 0 && (
              <section className="mt-14">
                <h2 className="mb-5 text-sm font-bold text-neutral-900">あわせて読む</h2>
                <ul className="divide-y divide-neutral-200 border-y border-neutral-200">
                  {relatedColumns.map((a) => (
                    <li key={a.slug}>
                      <Link href={`/column/${a.slug}`} className="group block py-4">
                        <span className="mb-1 block text-xs text-neutral-500">コラム／{a.category}</span>
                        <span className="block text-sm font-semibold leading-snug text-neutral-900 group-hover:underline underline-offset-4 decoration-neutral-400">
                          {a.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className="mt-14">
              <Link
                href="/case-studies"
                className="text-sm text-neutral-500 underline-offset-4 hover:text-neutral-900 hover:underline transition-colors"
              >
                ← 導入実績一覧に戻る
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

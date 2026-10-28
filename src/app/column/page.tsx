import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { articles, COLUMN_CATEGORIES } from "@/lib/column";

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://clearai.jp/column#collection",
  name: "コラム | ClearAI株式会社",
  description:
    "AI受託開発の見積の読み方、開発会社の選び方、生成AI研修と助成金、AI顧問の使い方、ロボット実証の進め方まで、発注する側が判断するために必要な実務情報。",
  url: "https://clearai.jp/column",
  inLanguage: "ja",
  isPartOf: { "@id": "https://clearai.jp/#website" },
  publisher: { "@id": "https://clearai.jp/#organization" },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: articles.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://clearai.jp/column/${a.slug}`,
      name: a.title,
    })),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: "https://clearai.jp" },
    { "@type": "ListItem", position: 2, name: "コラム", item: "https://clearai.jp/column" },
  ],
};

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${y}.${m}.${d}`;
}

export default async function ColumnIndexPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const selected = COLUMN_CATEGORIES.includes(category ?? "") ? category : undefined;
  const visibleArticles = selected ? articles.filter((article) => article.category === selected) : articles;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="bg-white">
        <PageHeader
          kicker="Column"
          title="発注する側が判断するための実務情報"
          description="AIやロボットの導入は、技術の良し悪しより「何を任せ、どこで合格とするか」を決められるかで結果が分かれます。見積の読み方、発注先の見極め方、助成金の要件など、検討している側が知っておくと判断が速くなる内容をまとめています。"
          crumbs={[{ label: "ホーム", href: "/" }, { label: "コラム" }]}
        />

        {/* Categories */}
        <section className="border-b border-gray-100 py-6 bg-white">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-8 flex flex-wrap gap-2">
            <Link data-ui-button="filled" href="/column" aria-current={!selected ? "page" : undefined} className={`border px-3 py-1.5 text-xs font-medium ${!selected ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 text-neutral-600"}`}><span className="ui-button-label">すべて ({articles.length})</span></Link>
            {COLUMN_CATEGORIES.map((c) => (
              <Link data-ui-button="filled"
                key={c}
                href={`/column?category=${encodeURIComponent(c)}`}
                aria-current={selected === c ? "page" : undefined}
                className={`border px-3 py-1.5 text-xs font-medium ${selected === c ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 text-neutral-600"}`}
              ><span className="ui-button-label">{c}({articles.filter((article) => article.category === c).length})
              </span></Link>
            ))}
          </div>
        </section>

        {/* List */}
        <section className="py-14 lg:py-20 bg-white">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
            <ul className="divide-y divide-neutral-200 border-t border-neutral-200">
              {visibleArticles.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/column/${a.slug}`}
                    className="group flex flex-col gap-3 py-8 md:flex-row md:items-start md:gap-10"
                  >
                    <div className="flex shrink-0 items-center gap-3 md:w-48 md:flex-col md:items-start md:gap-2">
                      <time dateTime={a.publishedAt} className="text-xs tabular-nums text-neutral-400">
                        {formatDate(a.publishedAt)}
                      </time>
                      <span className="text-xs font-medium text-neutral-900">{a.category}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="mb-2.5 text-lg md:text-xl font-bold leading-snug text-neutral-900 group-hover:underline underline-offset-4 decoration-neutral-400">
                        {a.title}
                      </h2>
                      <p className="line-clamp-3 text-sm leading-[1.9] text-neutral-600">{a.summary}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-neutral-200 bg-neutral-950 py-20 md:py-28">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-8 text-center">
            <h2 className="mb-5 text-2xl md:text-3xl font-bold leading-snug text-white">
              読んで終わりにせず、一度話しませんか。
            </h2>
            <p className="mb-10 text-[15px] leading-[1.9] text-white/60">
              「何を自動化すべきか分からない」「他社の見積が妥当か分からない」段階でのご相談を歓迎しています。
              初回のご相談は無料です。
            </p>
            <Link data-ui-with-icon data-ui-button="filled"
              href="/contact"
              className="inline-flex items-center gap-2 bg-white px-8 py-4 text-sm font-semibold text-neutral-900 transition-opacity hover:opacity-80"
            ><span className="ui-button-label">無料で相談する
              </span><span className="ui-button-icon" data-ui-side="end" aria-hidden="true"><span aria-hidden>→</span></span></Link>
          </div>
        </section>
      </div>
    </>
  );
}

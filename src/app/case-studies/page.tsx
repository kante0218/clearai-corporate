"use client";

import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import { caseStudies, type CaseStudy } from "@/lib/cases";
import { useLanguage, type Language } from "@/lib/i18n/LanguageContext";

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://clearai.jp/case-studies#collection",
  name: "導入実績 | ClearAI株式会社",
  description:
    "製造業のフライス盤とAIエージェントを接続した受注自動化、SES企業のSNS運用と事務作業の自動化、不動産コンサルティング会社のコーポレートサイト構築など、ClearAIが実際にお受けした案件の記録。",
  url: "https://clearai.jp/case-studies",
  inLanguage: "ja",
  isPartOf: { "@id": "https://clearai.jp/#website" },
  publisher: { "@id": "https://clearai.jp/#organization" },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: caseStudies.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://clearai.jp/case-studies/${c.slug}`,
      name: c.title,
    })),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: "https://clearai.jp" },
    { "@type": "ListItem", position: 2, name: "導入実績", item: "https://clearai.jp/case-studies" },
  ],
};

type Copy = {
  kicker: string;
  title: string;
  description: string;
  crumbHome: string;
  crumbCases: string;
  anonymityNote: string;
  photoNote: string;
  ctaHeading: string;
  ctaText: string;
  ctaButton: string;
};

const COPY: Record<Language, Copy> = {
  ja: {
    kicker: "Case Studies",
    title: "導入実績",
    description:
      "実際にお受けした案件を、課題・つくったもの・結果の順で記録しています。うまくいった部分だけでなく、あえて自動化しなかった範囲や、お断りした要望も書いています。ご検討中の内容に近いものがあれば、そのままご相談の材料としてお使いください。",
    crumbHome: "ホーム",
    crumbCases: "導入実績",
    anonymityNote:
      "※ クライアント企業名は伏せ、業種と規模のみを記載しています。写真は支援内容を伝えるためのイメージです。",
    photoNote:
      "※ 掲載写真は支援内容・活用場面を伝えるためのイメージです。実際の導入先・現場を撮影したものではありません。",
    ctaHeading: "近い事例があれば、そのまま持ち込んでください。",
    ctaText:
      "「この事例のこの部分を自社でもやりたい」というご相談が一番進みが速いです。実現できない範囲もその場でお伝えします。初回のご相談は無料です。",
    ctaButton: "無料で相談する",
  },
  en: {
    kicker: "Case Studies",
    title: "Case Studies",
    description:
      "Each engagement is recorded in the same order: the problem, what we built, and the result. We include what we deliberately left un-automated and the requests we turned down, not only the parts that went well. If something here is close to what you have in mind, bring it straight into a consultation.",
    crumbHome: "Home",
    crumbCases: "Case Studies",
    anonymityNote:
      "* Client names are withheld; only the industry and company size are given. Photographs illustrate the type of work described.",
    photoNote:
      "* Photographs illustrate the type of work and setting. They were not taken at the client sites.",
    ctaHeading: "If one of these is close to your situation, bring it to us as it is.",
    ctaText:
      "“We want the part of this case that applies to us” is the kind of enquiry that moves fastest. We will also tell you on the spot what is not feasible. The first consultation is free.",
    ctaButton: "Book a free consultation",
  },
};

/**
 * Listing fields for the active language. Cases without `en` fall back to the
 * Japanese text rather than disappearing from the list.
 */
function listingCopy(c: CaseStudy, lang: Language) {
  if (lang === "en" && c.en) {
    return {
      h1: c.en.h1,
      summary: c.en.summary,
      category: c.en.category,
      industry: c.en.industry,
      companySize: c.en.companySize,
      imageAlt: c.en.imageAlt,
    };
  }
  return {
    h1: c.h1,
    summary: c.summary,
    category: c.category,
    industry: c.industry,
    companySize: c.companySize,
    imageAlt: c.image.alt,
  };
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${y}.${m}.${d}`;
}

export default function CaseStudiesIndexPage() {
  const { lang } = useLanguage();
  const t = COPY[lang];

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
          kicker={t.kicker}
          title={t.title}
          description={t.description}
          crumbs={[{ label: t.crumbHome, href: "/" }, { label: t.crumbCases }]}
          actions={
            <p className="text-xs leading-relaxed text-neutral-500">{t.anonymityNote}</p>
          }
        />

        {/* List */}
        <section className="py-14 lg:py-20 bg-white">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
            <ul className="divide-y divide-neutral-200 border-t border-neutral-200">
              {caseStudies.map((c) => {
                const l = listingCopy(c, lang);
                return (
                  <li key={c.slug}>
                    <Link
                      href={`/case-studies/${c.slug}`}
                      className="group flex flex-col gap-5 py-8 md:flex-row md:items-center md:gap-10"
                    >
                      <div className="relative order-first aspect-[3/2] w-full shrink-0 overflow-hidden bg-neutral-100 md:order-last md:w-72 lg:w-80">
                        <Image
                          src={c.image.src}
                          alt={l.imageAlt}
                          fill
                          sizes="(max-width: 767px) calc(100vw - 3rem), (max-width: 1279px) 18rem, 20rem"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      </div>
                      <div className="flex shrink-0 items-center gap-3 md:w-48 md:flex-col md:items-start md:gap-2">
                        <time dateTime={c.publishedAt} className="text-xs tabular-nums text-neutral-400">
                          {formatDate(c.publishedAt)}
                        </time>
                        <span className="text-xs font-medium text-neutral-900">{l.category}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="mb-2 text-xs text-neutral-500">
                          {l.industry}
                          {lang === "ja" ? "／" : " / "}
                          {l.companySize}
                        </p>
                        <h2 className="mb-2.5 text-lg md:text-xl font-bold leading-snug text-neutral-900 group-hover:underline underline-offset-4 decoration-neutral-400">
                          {l.h1}
                        </h2>
                        <p className="line-clamp-3 text-sm leading-[1.9] text-neutral-600">{l.summary}</p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <p className="mt-5 text-xs leading-relaxed text-neutral-500">{t.photoNote}</p>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-neutral-200 bg-neutral-950 py-20 md:py-28">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-8 text-center">
            <h2 className="mb-5 text-2xl md:text-3xl font-bold leading-snug text-white">
              {t.ctaHeading}
            </h2>
            <p className="mb-10 text-[15px] leading-[1.9] text-white/60">{t.ctaText}</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white px-8 py-4 text-sm font-semibold text-neutral-900 transition-opacity hover:opacity-80"
            >
              {t.ctaButton}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

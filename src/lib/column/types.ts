/**
 * Structured article content for /column.
 *
 * Articles are plain data so every page is fully server-rendered (no client
 * i18n gate), which is what makes them indexable and quotable by AI crawlers.
 * Inline markup is limited on purpose: `[text](href)` links and `**bold**`.
 */

export type Block =
  | { t: "p"; text: string }
  | { t: "h2"; text: string }
  | { t: "h3"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }
  | { t: "table"; head: string[]; rows: string[][]; note?: string }
  | { t: "callout"; title: string; text: string }
  | { t: "quote"; text: string; cite?: string };

export type FaqItem = { q: string; a: string };

/** Contact form key so the CTA pre-fills the enquiry (see src/lib/validators.ts). */
export type CtaService =
  | "software-development"
  | "consulting"
  | "advisor"
  | "education"
  | "subsidy";

export type Article = {
  slug: string;
  /** <title> without the site suffix. */
  title: string;
  /** On-page H1. Can differ from <title> — usually shorter. */
  h1: string;
  description: string;
  keywords: string[];
  category: string;
  /** ISO date, e.g. "2026-08-06". */
  publishedAt: string;
  updatedAt: string;
  /** One-paragraph answer placed above the fold, for featured snippets and LLM extraction. */
  summary: string;
  /** 3–5 factual takeaways. Rendered as a "この記事の要点" list. */
  keyPoints: string[];
  body: Block[];
  faq: FaqItem[];
  cta: {
    service: CtaService;
    heading: string;
    text: string;
    buttonLabel: string;
  };
  /** Slugs of sibling articles. */
  related: string[];
  /** External references shown at the bottom; keeps claims auditable. */
  sources?: { label: string; url: string }[];
};

import { headingIds, type TocHeading } from "@/lib/article-toc";
export { headingId } from "@/lib/article-toc";

export function bodyHeadings(blocks: Block[]): (TocHeading & { blockIndex: number })[] {
  const allocate = headingIds();
  return blocks.flatMap((block, blockIndex) => block.t === "h2" || block.t === "h3"
    ? [{ id: allocate(block.text), text: block.text, level: block.t === "h2" ? 2 as const : 3 as const, blockIndex }]
    : []);
}

export function tocOf(article: Article): TocHeading[] {
  const headings = bodyHeadings(article.body);
  if (!article.faq.length) return headings;
  const allocate = headingIds(headings.map((heading) => heading.id));
  return [...headings, { id: allocate("よくあるご質問"), text: "よくあるご質問", level: 2 }];
}

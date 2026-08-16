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

/** Headings that become the table of contents and the anchor ids. */
export function tocOf(article: Article): { id: string; text: string }[] {
  return article.body
    .filter((b): b is { t: "h2"; text: string } => b.t === "h2")
    .map((b) => ({ id: headingId(b.text), text: b.text }));
}

/** Deterministic, ASCII-safe anchor id (Japanese headings would otherwise be percent-encoded). */
export function headingId(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  }
  return `s-${hash.toString(36)}`;
}

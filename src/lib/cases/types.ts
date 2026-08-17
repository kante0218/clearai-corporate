/**
 * Structured content for /case-studies (導入実績).
 *
 * Shares the Block/Prose renderer with /column so both content types stay
 * fully server-rendered and quotable by AI crawlers. Clients are described by
 * industry and size rather than by name — publishing a name needs the client's
 * permission, and the mechanism is what actually persuades a reader.
 */

import type { Block, FaqItem, CtaService } from "@/lib/column/types";
import { headingId } from "@/lib/column/types";

export type { Block, FaqItem, CtaService };
export { headingId };

export type CaseStudy = {
  slug: string;
  /** <title> without the site suffix. */
  title: string;
  /** On-page H1. Usually shorter than the <title>. */
  h1: string;
  description: string;
  keywords: string[];
  /** Listing label, e.g. "システム開発". */
  category: string;
  /** Anonymised client, e.g. "製造業（金属加工）". */
  industry: string;
  /** Anonymised scale, e.g. "従業員数十名規模". */
  companySize: string;
  /** Illustrative visual for cards and the article hero. Never present it as client photography. */
  image: { src: string; alt: string };
  /** ISO date, e.g. "2026-08-08". */
  publishedAt: string;
  updatedAt: string;
  /** One-paragraph answer placed above the fold. */
  summary: string;
  /** 3–5 takeaways. Rendered as "この事例の要点". */
  keyPoints: string[];
  /** Fact table shown beside the summary. Values must be verifiable, not estimated. */
  facts: { label: string; value: string }[];
  /** Technologies actually used. */
  stack: string[];
  body: Block[];
  faq: FaqItem[];
  cta: {
    service: CtaService;
    heading: string;
    text: string;
    buttonLabel: string;
  };
  /** Slugs of sibling case studies. */
  related: string[];
  /** Column slugs worth reading alongside this case. */
  relatedColumns?: string[];
  /**
   * English copy for the /case-studies listing. Only covers what the index
   * renders — the article body stays Japanese. Missing entries fall back to
   * the Japanese fields, so a case without `en` still lists correctly.
   */
  en?: {
    h1: string;
    summary: string;
    category: string;
    industry: string;
    companySize: string;
    imageAlt: string;
  };
};

/** Headings that become the table of contents and the anchor ids. */
export function tocOf(study: CaseStudy): { id: string; text: string }[] {
  return study.body
    .filter((b): b is { t: "h2"; text: string } => b.t === "h2")
    .map((b) => ({ id: headingId(b.text), text: b.text }));
}

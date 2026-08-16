import type { CaseStudy } from "./types";
import { study as millingMachineAiAgent } from "./studies/milling-machine-ai-agent";
import { study as sesSnsAutomation } from "./studies/ses-sns-automation";
import { study as realEstateConsultingSite } from "./studies/real-estate-consulting-site";

/** Newest first — this order drives the /case-studies listing. */
export const caseStudies: CaseStudy[] = [
  millingMachineAiAgent,
  sesSnsAutomation,
  realEstateConsultingSite,
];

export const caseStudiesBySlug: Record<string, CaseStudy> = Object.fromEntries(
  caseStudies.map((c) => [c.slug, c])
);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudiesBySlug[slug];
}

export function relatedCaseStudies(study: CaseStudy): CaseStudy[] {
  return study.related
    .map((slug) => caseStudiesBySlug[slug])
    .filter((c): c is CaseStudy => Boolean(c) && c.slug !== study.slug);
}

export type { CaseStudy } from "./types";

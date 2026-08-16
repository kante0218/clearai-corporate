import type { Article } from "./types";
import { article as aiAgentKaihatsuHiyou } from "./articles/ai-agent-kaihatsu-hiyou";
import { article as aiJutakuKaihatsuGaishaErabikata } from "./articles/ai-jutaku-kaihatsu-gaisha-erabikata";
import { article as seiseiAiKenshuJoseikin } from "./articles/seisei-ai-kenshu-joseikin";
import { article as aiKomonSouba } from "./articles/ai-komon-souba";
import { article as humanoidRobotRentalPoc } from "./articles/humanoid-robot-rental-poc";

/** Newest first — this order drives the /column listing. */
export const articles: Article[] = [
  aiAgentKaihatsuHiyou,
  aiJutakuKaihatsuGaishaErabikata,
  seiseiAiKenshuJoseikin,
  aiKomonSouba,
  humanoidRobotRentalPoc,
];

export const articlesBySlug: Record<string, Article> = Object.fromEntries(
  articles.map((a) => [a.slug, a])
);

export function getArticle(slug: string): Article | undefined {
  return articlesBySlug[slug];
}

export function relatedArticles(article: Article): Article[] {
  return article.related
    .map((slug) => articlesBySlug[slug])
    .filter((a): a is Article => Boolean(a) && a.slug !== article.slug);
}

export const COLUMN_CATEGORIES = Array.from(new Set(articles.map((a) => a.category)));

export type { Article } from "./types";

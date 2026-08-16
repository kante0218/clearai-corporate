import type { MetadataRoute } from "next";

/**
 * We want this site quoted by AI answer engines, so the AI crawlers are listed
 * explicitly rather than left to the wildcard rule. Google-Extended in
 * particular is a separate opt-out token from Googlebot: without an explicit
 * entry it is ambiguous whether the content may be used for AI answers.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "cohere-ai",
  "Meta-ExternalAgent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/hero-mecha-preview"],
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/api/", "/hero-mecha-preview"],
      })),
    ],
    sitemap: "https://clearai.jp/sitemap.xml",
    host: "https://clearai.jp",
  };
}

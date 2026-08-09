import type { MetadataRoute } from "next";

/*
 * AIO（AI検索最適化）方針:
 *   生成AI・AI検索のクローラーを明示的に許可する。ワイルドカード(*)だけでも
 *   技術的には許可扱いだが、個別に列挙しておくことで「意図して許可している」
 *   ことが明確になり、既定でオプトアウト扱いにする一部クローラーにも届く。
 *
 *   llms.txt / llms-full.txt（public/）に、AI向けのサイト要約を置いている。
 */
const AI_CRAWLERS = [
  // OpenAI
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  // Google（Gemini / AI Overviews 向けの拡張枠）
  "Google-Extended",
  // Microsoft / Bing
  "bingbot",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Apple
  "Applebot",
  "Applebot-Extended",
  // その他の主要AI/検索クローラー
  "Amazonbot",
  "meta-externalagent",
  "FacebookBot",
  "cohere-ai",
  "YouBot",
  "DuckAssistBot",
  "Diffbot",
  "Timpibot",
  "Bytespider",
  "PetalBot",
];

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/api/", "/_next/", "/hero-mecha-preview"];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow,
      })),
    ],
    sitemap: "https://clearai.jp/sitemap.xml",
    host: "https://clearai.jp",
  };
}

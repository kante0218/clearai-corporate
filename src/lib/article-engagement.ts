import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";

export const VISITOR_COOKIE = "clearai_article_visitor";
export const COMMENT_COOLDOWN_COOKIE = "clearai_comment_cooldown";
export const COOKIE_AGE = 60 * 60 * 24 * 365;
export type ArticleComment = { id: string; name: string; body: string; publishedAt: string };
export class EngagementError extends Error {
  constructor(public status: number, message: string) { super(message); }
}

function apiKey() { return process.env.MICROCMS_ENGAGEMENT_API_KEY ?? process.env.MICROCMS_API_KEY ?? ""; }
function secret() {
  return process.env.ARTICLE_ENGAGEMENT_SECRET ?? (apiKey() ? createHmac("sha256", apiKey()).update("clearai:article-visitor:v1").digest("hex") : "");
}
export function engagementConfigured() {
  return Boolean(secret().length >= 32 && process.env.MICROCMS_SERVICE_DOMAIN && apiKey());
}
export function sign(value: string) { return `${value}.${createHmac("sha256", secret()).update(value).digest("hex")}`; }
export function verify(value: string | undefined) {
  if (!value || !secret()) return null;
  const split = value.lastIndexOf(".");
  if (split < 1) return null;
  const body = value.slice(0, split);
  const expected = Buffer.from(sign(body));
  const received = Buffer.from(value);
  return received.length === expected.length && timingSafeEqual(received, expected) ? body : null;
}
export function visitorIdentity(cookie: string | undefined) {
  const existing = verify(cookie);
  const id = existing && /^[a-f0-9-]{36}$/.test(existing) ? existing : randomUUID();
  return { cookie: sign(id), hash: createHmac("sha256", secret()).update(id).digest("hex") };
}
export function addressHash(address: string) {
  return createHmac("sha256", secret()).update(`ip:${address}`).digest("hex");
}
export function likeId(slug: string, visitorHash: string) {
  return createHmac("sha256", secret()).update(`${slug}:${visitorHash}`).digest("hex").slice(0, 40);
}
export function validateComment(value: unknown): { name: string; body: string } {
  if (!value || typeof value !== "object") throw new EngagementError(400, "入力内容を確認してください。");
  const { name, body } = value as Record<string, unknown>;
  if (typeof name !== "string" || typeof body !== "string" || !name.trim() || name.trim().length > 40 || !body.trim() || body.trim().length > 2000 || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(name + body)) {
    throw new EngagementError(400, "お名前は40文字以内、コメントは1〜2,000文字で入力してください。");
  }
  return { name: name.trim(), body: body.trim() };
}

async function cms(path: string, init: RequestInit = {}) {
  const response = await fetch(`https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/${path}`, {
    ...init, cache: "no-store", signal: AbortSignal.timeout(8000),
    headers: { "X-MICROCMS-API-KEY": apiKey(), "Content-Type": "application/json" },
  });
  if (!response.ok) throw new EngagementError(response.status === 404 ? 503 : 502, "現在ご利用いただけません。時間をおいて再度お試しください。");
  return init.method === "DELETE" || response.status === 204 ? null : response.json();
}
function query(slug: string) { return new URLSearchParams({ filters: `article[equals]${slug}` }); }
export async function readEngagement(slug: string, visitorHash: string) {
  const likesQuery = query(slug); likesQuery.set("limit", "0");
  const ownQuery = query(slug); ownQuery.set("filters", `article[equals]${slug}[and]visitorHash[equals]${visitorHash}`); ownQuery.set("limit", "0");
  const commentsQuery = query(slug); commentsQuery.set("orders", "-publishedAt"); commentsQuery.set("limit", "50"); commentsQuery.set("fields", "id,name,body,publishedAt");
  const [likes, own, comments] = await Promise.all([cms(`blog-likes?${likesQuery}`), cms(`blog-likes?${ownQuery}`), cms(`blog-comments?${commentsQuery}`)]);
  return { likes: likes.totalCount as number, liked: own.totalCount > 0, comments: comments.contents.filter((comment: ArticleComment) => Boolean(comment.publishedAt)) as ArticleComment[] };
}
export async function setArticleLike(slug: string, visitorHash: string, liked: boolean) {
  const path = `blog-likes/${likeId(slug, visitorHash)}`;
  if (liked) {
    // microCMS PUT rejects an existing content ID; repeated likes remain idempotent.
    try { await cms(path, { method: "PUT", body: JSON.stringify({ article: slug, visitorHash }) }); }
    catch (error) {
      const q = query(slug); q.set("filters", `article[equals]${slug}[and]visitorHash[equals]${visitorHash}`); q.set("limit", "0");
      if (!(await cms(`blog-likes?${q}`)).totalCount) throw error;
    }
  } else {
    const q = query(slug); q.set("filters", `article[equals]${slug}[and]visitorHash[equals]${visitorHash}`); q.set("limit", "0");
    if ((await cms(`blog-likes?${q}`)).totalCount) await cms(path, { method: "DELETE" });
  }
}
export async function submitArticleComment(slug: string, visitorHash: string, comment: { name: string; body: string }) {
  return cms("blog-comments?status=draft", { method: "POST", body: JSON.stringify({ article: slug, visitorHash, ...comment }) });
}

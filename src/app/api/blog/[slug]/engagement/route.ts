import { isIP } from "node:net";
import { NextRequest, NextResponse } from "next/server";
import { getBlogBySlug } from "@/lib/microcms";
import { COMMENT_COOLDOWN_COOKIE, COOKIE_AGE, EngagementError, VISITOR_COOKIE, addressHash, engagementConfigured, readEngagement, setArticleLike, sign, submitArticleComment, validateComment, verify, visitorIdentity } from "@/lib/article-engagement";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
type Context = { params: Promise<{ slug: string }> };
const cookieOptions = { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" as const, path: "/", maxAge: COOKIE_AGE };
// shortcut: limits are per server instance; add a shared limiter if traffic grows.
const bursts = new Map<string, { count: number; until: number }>();
const commentCooldowns = new Map<string, number>();

function requestAddress(request: NextRequest) {
  const forwarded = request.headers.get("x-vercel-forwarded-for") ?? (process.env.VERCEL ? null : request.headers.get("x-forwarded-for"));
  const address = forwarded?.split(",")[0].trim().toLowerCase() ?? "";
  return addressHash(isIP(address) ? address : "unknown");
}

async function context(request: NextRequest, params: Context["params"]) {
  const { slug } = await params;
  if (!/^[a-zA-Z0-9_-]{1,100}$/.test(slug)) throw new EngagementError(404, "記事が見つかりません。");
  try { await getBlogBySlug(slug); } catch (error) {
    const missing = error instanceof Error && /^fetch API response status: 404(?:\n|$)/.test(error.message);
    throw new EngagementError(missing ? 404 : 502, missing ? "記事が見つかりません。" : "記事を読み込めません。時間をおいて再度お試しください。");
  }
  if (!engagementConfigured()) throw new EngagementError(503, "コメント・いいね機能は現在準備中です。");
  return { slug, visitor: visitorIdentity(request.cookies.get(VISITOR_COOKIE)?.value) };
}
function json(data: unknown, cookie?: string, status = 200) {
  const response = NextResponse.json(data, { status, headers: { "Cache-Control": "private, no-store" } });
  if (cookie) response.cookies.set(VISITOR_COOKIE, cookie, cookieOptions);
  return response;
}
function failure(error: unknown) {
  return json({ error: error instanceof EngagementError ? error.message : "読み込みに失敗しました。時間をおいて再度お試しください。" }, undefined, error instanceof EngagementError ? error.status : 502);
}
export async function GET(request: NextRequest, { params }: Context) {
  try {
    const { slug, visitor } = await context(request, params);
    return json(await readEngagement(slug, visitor.hash), visitor.cookie);
  } catch (error) { return failure(error); }
}
export async function POST(request: NextRequest, { params }: Context) {
  try {
    if (request.headers.get("origin") !== new URL(request.url).origin || !request.headers.get("content-type")?.startsWith("application/json")) throw new EngagementError(403, "この操作は許可されていません。");
    if (Number(request.headers.get("content-length") ?? 0) > 10000) throw new EngagementError(413, "入力内容が長すぎます。");
    const raw = await request.text();
    if (Buffer.byteLength(raw) > 10000) throw new EngagementError(413, "入力内容が長すぎます。");
    let body: Record<string, unknown>;
    try { body = JSON.parse(raw); if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error(); } catch { throw new EngagementError(400, "入力内容を確認してください。"); }
    const { slug, visitor } = await context(request, params);
    const now = Date.now();
    const ipHash = requestAddress(request);
    for (const [key, value] of bursts) if (value.until <= now) bursts.delete(key);
    for (const key of [`visitor:${visitor.hash}`, `ip:${ipHash}`]) {
      const burst = bursts.get(key) ?? { count: 0, until: now + 60000 };
      if (burst.count >= 15 || bursts.size >= 10000) throw new EngagementError(429, "操作が続いています。1分ほどお待ちください。");
      burst.count++; bursts.set(key, burst);
    }
    if (body.action === "like" && typeof body.liked === "boolean") {
      await setArticleLike(slug, visitor.hash, body.liked);
      return json(await readEngagement(slug, visitor.hash), visitor.cookie);
    }
    if (body.action === "comment") {
      const comment = validateComment(body);
      for (const [key, until] of commentCooldowns) if (until <= now) commentCooldowns.delete(key);
      if (commentCooldowns.has(ipHash) || commentCooldowns.size >= 10000) throw new EngagementError(429, "次のコメントは1分ほどお待ちください。");
      const lastComment = Number(verify(request.cookies.get(COMMENT_COOLDOWN_COOKIE)?.value));
      if (lastComment && now - lastComment < 60000) throw new EngagementError(429, "次のコメントは1分ほどお待ちください。");
      commentCooldowns.set(ipHash, now + 60000);
      try { await submitArticleComment(slug, visitor.hash, comment); }
      catch (error) { commentCooldowns.delete(ipHash); throw error; }
      const response = json({ message: "コメントを受け付けました。内容の確認後に公開します。" }, visitor.cookie, 201);
      response.cookies.set(COMMENT_COOLDOWN_COOKIE, sign(String(now)), { ...cookieOptions, maxAge: 60 });
      return response;
    }
    throw new EngagementError(400, "操作内容を確認してください。");
  } catch (error) { return failure(error); }
}

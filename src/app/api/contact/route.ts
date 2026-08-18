import { Resend } from "resend";
import { createHash, createHmac } from "node:crypto";
import { validateContactForm, INQUIRY_TYPES, SERVICE_KEYS, SERVICE_LABELS, DOCUMENT_KEYS, DOCUMENT_LABELS, type InquiryType, type ServiceKey, type DocumentKey } from "@/lib/validators";

export const runtime = "nodejs";

// TODO: Implement rate limiting (e.g. with upstash/ratelimit) before going to production.

const JSON_HEADERS = { "Content-Type": "application/json" };

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "info@clearai.jp";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "ClearAI <onboarding@resend.dev>";

const INQUIRY_LABEL: Record<InquiryType, string> = {
  business: "ご相談・お見積もり",
  engineer: "エンジニア採用応募",
  other: "お問い合わせ",
};

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

interface EmailPayload {
  inquiryType: InquiryType;
  service?: ServiceKey;
  /** Set when the enquiry came from /download — a deck request rather than a general enquiry. */
  document?: DocumentKey;
  company?: string;
  name: string;
  email: string;
  phone?: string;
  size?: string;
  position?: string;
  experience?: string;
  portfolio?: string;
  message: string;
}

/**
 * 社内ダッシュボードへ問い合わせを転送する。
 * メール送信を主経路として維持し、社内連携の一時障害で訪問者の送信を失敗させない。
 */
async function forwardToDashboard(
  payload: EmailPayload,
  submissionId: string,
  fingerprint: string,
): Promise<boolean> {
  const endpoint = process.env.CONTACT_DASHBOARD_ENDPOINT;
  const secret = process.env.CONTACT_INGEST_SECRET;
  if (!endpoint || !secret) {
    console.warn("[contact] dashboard forwarding is not configured");
    return false;
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
        source: "clearai.jp",
        submissionId,
        fingerprint,
      }),
      signal: AbortSignal.timeout(8_000),
      cache: "no-store",
    });
    if (!response.ok) {
      console.error("[contact] dashboard forwarding failed", { status: response.status });
      return false;
    }
    return true;
  } catch (error) {
    console.error("[contact] dashboard forwarding error", error);
    return false;
  }
}

function buildEmail(payload: EmailPayload) {
  const typeLabel = INQUIRY_LABEL[payload.inquiryType];
  const isEngineer = payload.inquiryType === "engineer";

  const rows: Array<[string, string]> = [["種別", payload.document ? "資料請求" : typeLabel]];
  if (payload.document) rows.push(["請求資料", DOCUMENT_LABELS[payload.document]]);
  if (payload.service) rows.push(["対象サービス", SERVICE_LABELS[payload.service]]);
  if (payload.company) rows.push(["会社名", payload.company]);
  rows.push(["お名前", payload.name]);
  rows.push(["メール", payload.email]);
  if (payload.phone) rows.push(["電話", payload.phone]);
  if (payload.size) rows.push(["従業員規模", payload.size]);
  if (payload.position) rows.push(["希望ポジション", payload.position]);
  if (payload.experience) rows.push(["経験年数", payload.experience]);
  if (payload.portfolio) rows.push(["ポートフォリオ/GitHub", payload.portfolio]);

  const textLines = rows.map(([k, v]) => `${k}: ${v}`);
  textLines.push("", isEngineer ? "自己紹介:" : "ご相談内容:", payload.message);
  const text = textLines.join("\n");

  const htmlRows = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding: 8px 0; color: #6b7280; width: 160px;">${escapeHtml(k)}</td><td style="padding: 8px 0;">${
          k === "メール"
            ? `<a href="mailto:${escapeHtml(v)}">${escapeHtml(v)}</a>`
            : k === "ポートフォリオ/GitHub"
            ? `<a href="${escapeHtml(v)}">${escapeHtml(v)}</a>`
            : escapeHtml(v)
        }</td></tr>`
    )
    .join("");

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #111;">
      <h2 style="margin: 0 0 16px; font-size: 18px; border-bottom: 2px solid #111827; padding-bottom: 8px;">新しいお問い合わせ（${escapeHtml(typeLabel)}）</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        ${htmlRows}
      </table>
      <h3 style="margin: 24px 0 8px; font-size: 14px; color: #6b7280;">${isEngineer ? "自己紹介" : "ご相談内容"}</h3>
      <div style="white-space: pre-wrap; background: #f9fafb; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.7;">${escapeHtml(payload.message)}</div>
    </div>
  `;

  return { text, html };
}

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get("content-length") ?? "0");
    if (Number.isFinite(contentLength) && contentLength > 20_000) {
      return new Response(
        JSON.stringify({ ok: false, errors: { _form: "リクエストが大きすぎます。" } }),
        { status: 413, headers: JSON_HEADERS }
      );
    }

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return new Response(
        JSON.stringify({ ok: false, errors: { _form: "リクエストの形式が正しくありません。" } }),
        { status: 400, headers: JSON_HEADERS }
      );
    }

    // Honeypot: if the hidden "website" field is filled, silently succeed (spam trap).
    if (body.website && String(body.website).trim().length > 0) {
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers: JSON_HEADERS });
    }

    const rawType = typeof body.inquiryType === "string" ? body.inquiryType : "business";
    const inquiryType: InquiryType = (INQUIRY_TYPES as readonly string[]).includes(rawType)
      ? (rawType as InquiryType)
      : "business";

    const rawDocument = typeof body.document === "string" ? body.document : "";
    const documentKey: DocumentKey | undefined = (DOCUMENT_KEYS as readonly string[]).includes(rawDocument)
      ? (rawDocument as DocumentKey)
      : undefined;

    const rawService = typeof body.service === "string" ? body.service : "";
    const service: ServiceKey | undefined = (SERVICE_KEYS as readonly string[]).includes(rawService)
      ? (rawService as ServiceKey)
      : undefined;

    const payload = {
      inquiryType,
      service,
      document: documentKey,
      company: typeof body.company === "string" ? body.company : "",
      name: typeof body.name === "string" ? body.name : "",
      email: typeof body.email === "string" ? body.email : "",
      phone: typeof body.phone === "string" ? body.phone : undefined,
      size: typeof body.size === "string" ? body.size : undefined,
      position: typeof body.position === "string" ? body.position : undefined,
      experience: typeof body.experience === "string" ? body.experience : undefined,
      portfolio: typeof body.portfolio === "string" ? body.portfolio : undefined,
      message: typeof body.message === "string" ? body.message : "",
    };

    const errors = validateContactForm(payload);
    if (Object.keys(errors).length > 0) {
      return new Response(
        JSON.stringify({ ok: false, errors }),
        { status: 400, headers: JSON_HEADERS }
      );
    }

    const relaySecret = process.env.CONTACT_INGEST_SECRET;
    if (!relaySecret) {
      console.error("[contact] CONTACT_INGEST_SECRET is not configured");
      return new Response(
        JSON.stringify({ ok: false, errors: { _form: "問い合わせ受付設定が未完了です。" } }),
        { status: 500, headers: JSON_HEADERS }
      );
    }
    const sourceIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip")?.trim() ||
      "unknown";
    const fingerprint = createHmac("sha256", relaySecret).update(sourceIp).digest("hex");
    // 同一内容のネットワーク再試行を10分単位で同じIDに束ねる。
    const bucket = Math.floor(Date.now() / 600_000);
    const submissionDigest = createHash("sha256")
      .update(`${fingerprint}\0${JSON.stringify(payload)}\0${bucket}`)
      .digest("hex");
    // ダッシュボード側のUUID契約を満たす決定的ID（同一内容の再試行で不変）。
    const submissionId = [
      submissionDigest.slice(0, 8),
      submissionDigest.slice(8, 12),
      `5${submissionDigest.slice(13, 16)}`,
      `a${submissionDigest.slice(17, 20)}`,
      submissionDigest.slice(20, 32),
    ].join("-");

    const dashboardForwarded = await forwardToDashboard(payload, submissionId, fingerprint);
    if (!dashboardForwarded) {
      return new Response(
        JSON.stringify({ ok: false, errors: { _form: "受付処理に失敗しました。時間をおいて再度お試しください。" } }),
        { status: 502, headers: JSON_HEADERS }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("[contact] RESEND_API_KEY is not configured");
      return new Response(
        JSON.stringify({ ok: false, errors: { _form: "メール送信設定が未完了です。時間をおいて再度お試しください。" } }),
        { status: 500, headers: JSON_HEADERS }
      );
    }

    const { text, html } = buildEmail(payload);
    const resend = new Resend(apiKey);

    const subjectLabel = documentKey
      ? `資料請求 / ${DOCUMENT_LABELS[documentKey]}`
      : service
        ? SERVICE_LABELS[service]
        : INQUIRY_LABEL[inquiryType];
    const subjectPrefix = `【ClearAI ${subjectLabel}】`;
    const subjectBody = payload.company ? `${payload.company} / ${payload.name}様` : `${payload.name}様`;

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: payload.email,
      subject: `${subjectPrefix}${subjectBody}`,
      text,
      html,
    });

    if (error) {
      console.error("[contact] resend error", error);
      return new Response(
        JSON.stringify({ ok: false, errors: { _form: "メール送信に失敗しました。時間をおいて再度お試しください。" } }),
        { status: 502, headers: JSON_HEADERS }
      );
    }

    console.log("[contact] sent", {
      id: data?.id,
      to: TO_EMAIL,
      type: inquiryType,
      dashboardForwarded,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: JSON_HEADERS });
  } catch (err) {
    console.error("[contact] unexpected error", err);
    return new Response(
      JSON.stringify({ ok: false, errors: { _form: "サーバーエラーが発生しました。" } }),
      { status: 500, headers: JSON_HEADERS }
    );
  }
}

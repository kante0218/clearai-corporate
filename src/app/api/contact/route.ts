import { Resend } from "resend";
import { validateContactForm, INQUIRY_TYPES, type InquiryType } from "@/lib/validators";

export const runtime = "nodejs";

// TODO: Implement rate limiting (e.g. with upstash/ratelimit) before going to production.

const JSON_HEADERS = { "Content-Type": "application/json" };

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "t.kante@clearai.jp";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "clear AI <onboarding@resend.dev>";

const INQUIRY_LABEL: Record<InquiryType, string> = {
  business: "ご相談・お見積もり",
  engineer: "エンジニア採用応募",
  other: "その他",
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

function buildEmail(payload: EmailPayload) {
  const typeLabel = INQUIRY_LABEL[payload.inquiryType];
  const isEngineer = payload.inquiryType === "engineer";

  const rows: Array<[string, string]> = [["種別", typeLabel]];
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
      <h2 style="margin: 0 0 16px; font-size: 18px; border-bottom: 2px solid #2563eb; padding-bottom: 8px;">新しいお問い合わせ（${escapeHtml(typeLabel)}）</h2>
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

    const payload = {
      inquiryType,
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

    const subjectPrefix = `【clear AI ${INQUIRY_LABEL[inquiryType]}】`;
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

    console.log("[contact] sent", { id: data?.id, to: TO_EMAIL, type: inquiryType });

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: JSON_HEADERS });
  } catch (err) {
    console.error("[contact] unexpected error", err);
    return new Response(
      JSON.stringify({ ok: false, errors: { _form: "サーバーエラーが発生しました。" } }),
      { status: 500, headers: JSON_HEADERS }
    );
  }
}

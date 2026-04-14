import { Resend } from "resend";
import { validateContactForm } from "@/lib/validators";

export const runtime = "nodejs";

// TODO: Implement rate limiting (e.g. with upstash/ratelimit) before going to production.

const JSON_HEADERS = { "Content-Type": "application/json" };

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "t.kante@clearai.jp";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "clear AI <onboarding@resend.dev>";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmail(payload: {
  company: string;
  name: string;
  email: string;
  phone?: string;
  size?: string;
  message: string;
}) {
  const lines = [
    `会社名: ${payload.company}`,
    `ご担当者名: ${payload.name}`,
    `メールアドレス: ${payload.email}`,
    payload.phone ? `電話番号: ${payload.phone}` : null,
    payload.size ? `従業員規模: ${payload.size}` : null,
    "",
    "ご相談内容:",
    payload.message,
  ].filter(Boolean);

  const text = lines.join("\n");

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #111;">
      <h2 style="margin: 0 0 16px; font-size: 18px; border-bottom: 2px solid #2563eb; padding-bottom: 8px;">新しいお問い合わせ</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 8px 0; color: #6b7280; width: 140px;">会社名</td><td style="padding: 8px 0;">${escapeHtml(payload.company)}</td></tr>
        <tr><td style="padding: 8px 0; color: #6b7280;">ご担当者名</td><td style="padding: 8px 0;">${escapeHtml(payload.name)}</td></tr>
        <tr><td style="padding: 8px 0; color: #6b7280;">メール</td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(payload.email)}">${escapeHtml(payload.email)}</a></td></tr>
        ${payload.phone ? `<tr><td style="padding: 8px 0; color: #6b7280;">電話</td><td style="padding: 8px 0;">${escapeHtml(payload.phone)}</td></tr>` : ""}
        ${payload.size ? `<tr><td style="padding: 8px 0; color: #6b7280;">従業員規模</td><td style="padding: 8px 0;">${escapeHtml(payload.size)}</td></tr>` : ""}
      </table>
      <h3 style="margin: 24px 0 8px; font-size: 14px; color: #6b7280;">ご相談内容</h3>
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

    const payload = {
      company: typeof body.company === "string" ? body.company : "",
      name: typeof body.name === "string" ? body.name : "",
      email: typeof body.email === "string" ? body.email : "",
      phone: typeof body.phone === "string" ? body.phone : undefined,
      size: typeof body.size === "string" ? body.size : undefined,
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

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: payload.email,
      subject: `【clear AI お問い合わせ】${payload.company} / ${payload.name}様`,
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

    console.log("[contact] sent", { id: data?.id, to: TO_EMAIL });

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: JSON_HEADERS });
  } catch (err) {
    console.error("[contact] unexpected error", err);
    return new Response(
      JSON.stringify({ ok: false, errors: { _form: "サーバーエラーが発生しました。" } }),
      { status: 500, headers: JSON_HEADERS }
    );
  }
}

import { createBooking } from "@/lib/google-calendar";
import { isValidEmail } from "@/lib/validators";

export const runtime = "nodejs";

const JSON_HEADERS = { "Content-Type": "application/json" };

export async function POST(request: Request) {
  try {
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ ok: false, error: "リクエストの形式が正しくありません。" }), { status: 400, headers: JSON_HEADERS });
    }

    // Honeypot: silently succeed for bots.
    if (body.website && String(body.website).trim().length > 0) {
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers: JSON_HEADERS });
    }

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const date = String(body.date ?? "");
    const time = String(body.time ?? "");
    const company = String(body.company ?? "").trim();
    const note = String(body.note ?? "").trim();

    const errors: Record<string, string> = {};
    if (!name) errors.name = "お名前は必須です。";
    else if (name.length > 100) errors.name = "お名前は100文字以内でご入力ください。";
    if (!email) errors.email = "メールアドレスは必須です。";
    else if (!isValidEmail(email)) errors.email = "有効なメールアドレスを入力してください。";
    if (!date || !time) errors.slot = "ご希望の日時を選択してください。";
    if (note.length > 5000) errors.note = "5000文字以内でご入力ください。";
    if (company.length > 200) errors.company = "会社名は200文字以内でご入力ください。";

    if (Object.keys(errors).length > 0) {
      return new Response(JSON.stringify({ ok: false, errors }), { status: 400, headers: JSON_HEADERS });
    }

    const result = await createBooking({ date, time, name, email, company, note });

    if (!result.ok) {
      const status = result.code === "slot_taken" ? 409 : result.code === "invalid" ? 400 : result.code === "not_configured" ? 503 : 500;
      return new Response(JSON.stringify({ ok: false, code: result.code, error: result.error }), { status, headers: JSON_HEADERS });
    }

    return new Response(
      JSON.stringify({ ok: true, meetLink: result.meetLink, htmlLink: result.htmlLink, startISO: result.startISO }),
      { status: 200, headers: JSON_HEADERS }
    );
  } catch (err) {
    console.error("[book] unexpected error", err);
    return new Response(JSON.stringify({ ok: false, code: "server", error: "サーバーエラーが発生しました。" }), { status: 500, headers: JSON_HEADERS });
  }
}

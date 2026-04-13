import { validateContactForm } from "@/lib/validators";

export const runtime = "nodejs";

// TODO: Implement rate limiting (e.g. with upstash/ratelimit) before going to production.

const JSON_HEADERS = { "Content-Type": "application/json" };

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

    // TODO: Send to Resend / SendGrid / CRM instead of just logging.
    console.log("[contact]", payload);

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: JSON_HEADERS });
  } catch (err) {
    console.error("[contact] unexpected error", err);
    return new Response(
      JSON.stringify({ ok: false, errors: { _form: "サーバーエラーが発生しました。" } }),
      { status: 500, headers: JSON_HEADERS }
    );
  }
}

import { POST as submitContact } from "@/app/api/contact/route";
import { prepareMeoApplication } from "@/lib/meo-application";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).byteLength > 20_000) return Response.json({ ok: false, errors: { _form: "入力内容が大きすぎます。" } }, { status: 413 });
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid body");
    body = parsed as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false, errors: { _form: "入力形式が正しくありません。" } }, { status: 400 });
  }
  const { payload, errors } = prepareMeoApplication(body);
  if (!payload.website && Object.keys(errors).length) return Response.json({ ok: false, errors }, { status: 400 });
  const headers = new Headers(request.headers);
  headers.delete("content-length");
  return submitContact(new Request(request.url, {
    method: "POST", headers, body: JSON.stringify(payload),
  }));
}

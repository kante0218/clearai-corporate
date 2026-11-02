import { POST as submitContact } from "@/app/api/contact/route";
import { prepareMeoApplication } from "@/lib/meo-application";
import { createHmac } from "node:crypto";
import { prepareMeoAccount, meoOnboardingConfig, meoSubmissionId, sendMeoSetupInvitation, trustedMeoContactIds } from "@/lib/meo-onboarding";

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
  if (payload.website) return Response.json({ ok: true });
  const applicationId = meoSubmissionId(body.applicationId, payload);
  if (!applicationId) return Response.json({ ok: false, errors: { _form: "ページを再読み込みして、もう一度お申し込みください。" } }, { status: 400 });
  try { meoOnboardingConfig(); if (!process.env.CONTACT_INGEST_SECRET) throw new Error("Missing contact secret"); } catch {
    return Response.json({ ok: false, errors: { _form: "アカウントの受付設定を確認中です。時間をおいて再度お試しください。" } }, { status: 503 });
  }
  const sourceIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip")?.trim() || "unknown";
  const fingerprint = createHmac("sha256", process.env.CONTACT_INGEST_SECRET!).update(sourceIp).digest("hex");
  const application = { applicationId, email: payload.email.toLowerCase(), name: payload.name, company: payload.company, store: String(body.store).trim(), location: String(body.location).trim(), fingerprint };
  let prepared;
  try { prepared = await prepareMeoAccount(application); } catch (error) {
    const limited = typeof error === "object" && error !== null && "status" in error && error.status === 429;
    return Response.json({ ok: false, errors: { _form: limited ? "短時間のお申し込み回数が上限に達しました。時間をおいて再度お試しください。" : "アカウントの準備を完了できず、お申し込みは受け付けていません。時間をおいて再度お試しください。" } }, { status: limited ? 429 : 502 });
  }
  const headers = new Headers(request.headers);
  headers.delete("content-length");
  const contactRequest = new Request(request.url, { method: "POST", headers, body: JSON.stringify(payload) });
  trustedMeoContactIds.set(contactRequest, applicationId);
  const contact = await submitContact(contactRequest);
  if (!contact.ok) return contact;
  try {
    const result = await sendMeoSetupInvitation(application, prepared);
    return Response.json({ ok: true, ...result });
  } catch {
    return Response.json({ ok: false, errors: { _form: "お申し込み内容は受け付けましたが、アカウントの準備・案内メールの送信を完了できませんでした。入力を変えずにもう一度送信してください。解決しない場合は info@clearai.jp へご連絡ください。" } }, { status: 502 });
  }
}

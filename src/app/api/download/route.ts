import { createHash } from "crypto";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { DOCUMENT_KEYS, isValidEmail, type DocumentKey } from "@/lib/validators";

import { buildDownloadDelivery } from "@/lib/download-delivery";

export const runtime = "nodejs";

const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "ClearAI <onboarding@resend.dev>";
// 資料請求はリードなので、社内にも必ず通知する（問い合わせフォームと同じ宛先）
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "info@clearai.jp";

function requestOrigin(request: Request) {
  const requestUrl = new URL(request.url);
  const origin = request.headers.get("origin");
  if (!origin) return null;
  try {
    const originUrl = new URL(origin);
    const isSameHost = originUrl.host === requestUrl.host;
    const isProduction = ["clearai.jp", "www.clearai.jp"].includes(originUrl.hostname);
    const isLocal = ["localhost", "127.0.0.1"].includes(originUrl.hostname);
    return isSameHost || isProduction || isLocal ? originUrl.origin : null;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const origin = requestOrigin(request);
  if (!origin) {
    return NextResponse.json({ error: "無効なリクエストです。" }, { status: 403 });
  }

  let parsed: unknown;
  try {
    parsed = await request.json();
  } catch {
    return NextResponse.json({ error: "入力内容を確認できませんでした。" }, { status: 400 });
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return NextResponse.json({ error: "入力内容を確認できませんでした。" }, { status: 400 });
  }
  const body = parsed as Record<string, unknown>;

  if (typeof body.website === "string" && body.website) {
    return NextResponse.json({ ok: true, downloadUrl: `${origin}/download`, files: [], zipUrl: null });
  }

  // チェックリストで複数選べるようにしたので配列で受ける（旧クライアントの単数も通す）
  const rawDocs: unknown = Array.isArray(body.documents) ? body.documents : [body.document];
  const documents = [
    ...new Set(
      (rawDocs as unknown[]).filter(
        (d): d is DocumentKey => typeof d === "string" && (DOCUMENT_KEYS as readonly string[]).includes(d),
      ),
    ),
  ];
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";

  if (documents.length === 0) {
    return NextResponse.json({ error: "ダウンロードする資料を選んでください。" }, { status: 400 });
  }
  if (!company || company.length > 100) {
    return NextResponse.json({ error: "会社名を入力してください。" }, { status: 400 });
  }
  if (!name || name.length > 60) {
    return NextResponse.json({ error: "お名前を入力してください。" }, { status: 400 });
  }
  // 数字が3つ以上あれば電話番号として受ける（国番号・内線・区切り文字の書き方を縛らない）
  if (!phone || phone.length > 20 || (phone.match(/\d/g) ?? []).length < 3) {
    return NextResponse.json({ error: "電話番号を入力してください。" }, { status: 400 });
  }
  if (!email || email.length > 254 || !isValidEmail(email)) {
    return NextResponse.json({ error: "有効なメールアドレスを入力してください。" }, { status: 400 });
  }

  const { files, zipUrl, downloadUrl, title, text, html } = buildDownloadDelivery(documents)!;
  const safeTitle = title.replace(/[<>&"']/g, "");
  const hash = createHash("sha256")
    .update(`${documents.slice().sort().join(",")}:${email}`)
    .digest("hex")
    .slice(0, 32);

  // 主役はその場のダウンロード。メールは控えなので、送れなくても downloadUrl は返す。
  // (ここで失敗を返すと、入力したのに資料を受け取れない人が出る)
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[download] RESEND_API_KEY 未設定のため控えメールを送れませんでした");
    return NextResponse.json({ ok: true, downloadUrl, files, zipUrl, mailed: false });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send(
      {
        from: FROM_EMAIL,
        to: [email],
        subject: `【ClearAI】${title}をお送りします`,
        text,
        html,
      },
      { idempotencyKey: `download-${hash}` },
    );

    if (error) {
      console.error("[download] resend error", error);
      return NextResponse.json({ ok: true, downloadUrl, files, zipUrl, mailed: false });
    }

    // 社内通知。ここが落ちても請求者側のダウンロードは成立させる。
    try {
      const rows = [
        ["請求資料", files.map((f) => f.title).join(" / ")],
        ["会社名", company],
        ["お名前", name],
        ["電話番号", phone],
        ["メール", email],
      ]
        .map(([k, v]) => `${k}：${v}`)
        .join("\n");
      await resend.emails.send(
        {
          from: FROM_EMAIL,
          to: [TO_EMAIL],
          replyTo: email,
          subject: `【ClearAI 資料請求 / ${safeTitle}】${company.replace(/[<>&"']/g, "")}`,
          text: `資料請求がありました。\n\n${rows}\n`,
        },
        { idempotencyKey: `download-notify-${hash}` },
      );
    } catch (notifyError) {
      console.error("[download] 社内通知に失敗", notifyError instanceof Error ? notifyError.message : "unknown");
    }

    return NextResponse.json({ ok: true, downloadUrl, files, zipUrl, mailed: true });
  } catch (error) {
    console.error("[download] unexpected error", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json({ ok: true, downloadUrl, files, zipUrl, mailed: false });
  }
}

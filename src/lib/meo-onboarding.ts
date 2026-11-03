import { createHash } from "node:crypto";
import { Resend } from "resend";
import { BOOKING_URL } from "./booking";

// Only requests created by the validated MEO handler can opt into stable contact IDs.
export const trustedMeoContactIds = new WeakMap<Request, string>();

export function meoSubmissionId(applicationId: unknown, payload: unknown) {
  if (typeof applicationId !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(applicationId)) return null;
  const hash = createHash("sha256").update(applicationId + "\0" + JSON.stringify(payload)).digest("hex");
  return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-4${hash.slice(13, 16)}-a${hash.slice(17, 20)}-${hash.slice(20, 32)}`;
}

export function meoOnboardingConfig() {
  const raw = process.env.MEO_DASHBOARD_URL;
  const secret = process.env.MEO_ONBOARDING_SECRET;
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!raw || !secret || !apiKey || !from || from.includes("resend.dev")) throw new Error("MEO onboarding is not configured");
  const origin = new URL(raw);
  if (origin.protocol !== "https:" || origin.username || origin.password || origin.pathname !== "/" || origin.search || origin.hash) throw new Error("Invalid dashboard origin");
  return { origin: origin.origin, secret, apiKey, from };
}

type MeoApplication = { applicationId: string; email: string; name: string; company: string; store: string; location: string; fingerprint?: string; consent?: { version: string; acceptedAt: string; privacy: boolean; acknowledged: boolean; authority: boolean; scope: boolean } };
type PreparedAccount = { setup_url: string | null };

export async function prepareMeoAccount(application: MeoApplication): Promise<PreparedAccount> {
  const config = meoOnboardingConfig();
  const response = await fetch(`${config.origin}/api/onboarding`, {
    method: "POST", headers: { Authorization: `Bearer ${config.secret}`, "Content-Type": "application/json" },
    body: JSON.stringify(application), cache: "no-store", signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw Object.assign(new Error("MEO account preparation failed"), { status: response.status });
  const data = await response.json();
  if (data.setup_url !== null && typeof data.setup_url !== "string") throw new Error("Missing MEO setup URL");
  if (typeof data.setup_url === "string" && new URL(data.setup_url).origin !== config.origin) throw new Error("Invalid MEO setup URL");
  return { setup_url: data.setup_url };
}

export async function sendMeoSetupInvitation(application: MeoApplication, prepared?: PreparedAccount) {
  const config = meoOnboardingConfig();
  const data = prepared ?? await prepareMeoAccount(application);
  let setup: URL | null = null;
  if (data.setup_url !== null) {
    if (typeof data.setup_url !== "string") throw new Error("Missing MEO setup URL");
    setup = new URL(data.setup_url);
    if (setup.origin !== config.origin || setup.username || setup.password) throw new Error("Invalid MEO setup URL");
  }
  const loginUrl = `${config.origin}/account.html`;
  const accountInstructions = setup
    ? `1. アカウントを設定する\n${setup.href}\nメールアドレスを確認し、ログイン用パスワードを設定してください。パスキーも登録できます。リンクの有効期限は24時間です。`
    : `1. ダッシュボードにログインする\n${loginUrl}\nパスワードまたはパスキーを登録済みの方はログインしてください。初期設定のリンクが期限切れの場合やパスワードを忘れた場合は、ログイン画面から再設定メールを申請してください。届いたメールから設定を再開できます。`;
  const resend = new Resend(config.apiKey);
  const { error } = await resend.emails.send({
    from: config.from, to: [application.email], subject: "【ClearAI MEO】アカウント設定と初回面談のご案内",
    text: `${application.name}様\n\nMEO支援のお申し込みを受け付けました。\n\n${accountInstructions}\n\n2. 初回面談を予約する\n${BOOKING_URL}\nTimeRexで日時を選択し、予約の確定までお進みください。すでに予約済みの場合は再予約不要です。\n\n3. 店舗のGoogleアカウントを接続する\n設定後のダッシュボードから、Googleビジネスプロフィールの管理権限を持つアカウントで接続に同意してください。GoogleのパスワードをClearAIへお知らせいただく必要はありません。\n\nダッシュボード：${loginUrl}\nこのお申し込みだけで契約・料金は発生しません。月額30,000円（税別）／33,000円（税込）、最低契約期間6か月・初期6か月総額198,000円（税込）／店舗・初期6か月の通常の中途解約不可（法令上の権利や当社債務不履行等による解除を除く）の条件・支援範囲を確認後、別途契約手続きを行います。利用条件：https://clearai.jp/meo/terms\n\nお心当たりがない場合は設定せず、このメールを破棄してください。お問い合わせ：info@clearai.jp`,
  }, { idempotencyKey: `meo-${setup ? "setup" : "signin"}/${application.applicationId}` });
  if (error) throw new Error("MEO invitation delivery failed");
  return { dashboard_url: loginUrl };
}

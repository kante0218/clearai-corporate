import { validateContactForm } from "./validators";

export const MEO_CONSENT_VERSION = "2026-11-03";

export function prepareMeoApplication(body: Record<string, unknown>) {
  const value = (key: string) => typeof body[key] === "string" ? body[key].trim() : "";
  const store = value("store");
  const location = value("location");
  const details = value("details");
  const payload = {
    inquiryType: "business", service: "meo",
    company: value("company"), name: value("name"), email: value("email"), phone: value("phone"),
    website: value("website"),
    message: `【MEO支援のお申し込み】\n申込プラン：月額30,000円（税別）／33,000円（税込）、最低契約期間6か月、初期6か月総額198,000円（税込）／店舗\n店舗名：${store}\n店舗所在地：${location}\n補足：${details || "なし"}\n同意規約バージョン：${MEO_CONSENT_VERSION}\n同意記録：privacy=${body.privacy === true}, acknowledged=${body.acknowledged === true}, authority=${body.authority === true}, scope=${body.scope === true}\nMEO利用条件・プライバシー、初期6か月の通常の中途解約不可（法令・当社債務不履行等の例外を除く）、管理権限・Google連携、支援範囲・投稿前承認・順位保証なしを確認。送信時点で契約・料金は発生しないことを確認済み。\n参照ページ：/meo/apply`,
  };
  const errors = validateContactForm(payload);
  if (!store || store.length > 200) errors.store = "店舗名を200文字以内で入力してください。";
  if (!location || location.length > 500) errors.location = "店舗所在地を500文字以内で入力してください。";
  if (details.length > 3000) errors.details = "補足は3000文字以内で入力してください。";
  if (body.privacy !== true) errors.privacy = "プライバシーポリシーへの同意が必要です。";
  if (body.acknowledged !== true) errors.acknowledged = "お申し込み後の手続きについて確認してください。";
  if (body.authority !== true) errors.authority = "店舗の管理権限とGoogle連携の条件を確認してください。";
  if (body.scope !== true) errors.scope = "支援範囲・承認手順・成果の条件を確認してください。";
  if (body.consentVersion !== MEO_CONSENT_VERSION) errors.consentVersion = "条件が更新されました。ページを再読み込みしてください。";
  return { payload, errors };
}

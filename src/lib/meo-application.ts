import { validateContactForm } from "./validators";

export function prepareMeoApplication(body: Record<string, unknown>) {
  const value = (key: string) => typeof body[key] === "string" ? body[key].trim() : "";
  const store = value("store");
  const location = value("location");
  const details = value("details");
  const payload = {
    inquiryType: "business", service: "meo",
    company: value("company"), name: value("name"), email: value("email"), phone: value("phone"),
    website: value("website"),
    message: `【MEO支援のお申し込み】\n申込プラン：月額30,000円（税別）／33,000円（税込）、最低契約期間6か月\n店舗名：${store}\n店舗所在地：${location}\n補足：${details || "なし"}\nプライバシーポリシーに同意済み。送信時点で契約・料金は発生しないことを確認済み。\n参照ページ：/meo/apply`,
  };
  const errors = validateContactForm(payload);
  if (!store || store.length > 200) errors.store = "店舗名を200文字以内で入力してください。";
  if (!location || location.length > 500) errors.location = "店舗所在地を500文字以内で入力してください。";
  if (details.length > 3000) errors.details = "補足は3000文字以内で入力してください。";
  if (body.privacy !== true) errors.privacy = "プライバシーポリシーへの同意が必要です。";
  if (body.acknowledged !== true) errors.acknowledged = "お申し込み後の手続きについて確認してください。";
  return { payload, errors };
}

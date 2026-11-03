"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { MEO_CONSENT_VERSION, prepareMeoApplication } from "@/lib/meo-application";
import { BOOKING_URL } from "@/lib/booking";
import styles from "./TrainingLeadForm.module.css";

const fields = [
  ["company", "会社名・屋号", 200, "organization", "text"],
  ["store", "店舗名", 200, "off", "text"],
  ["location", "店舗所在地", 500, "street-address", "text"],
  ["name", "ご担当者名", 100, "name", "text"],
  ["email", "メールアドレス", 254, "email", "email"],
  ["phone", "電話番号", 50, "tel", "tel"],
] as const;

export default function MeoApplicationForm() {
  const sending = useRef(false);
  const applicationId = useRef<string | null>(null);
  const [result, setResult] = useState<{ dashboard_url: string } | null>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  useEffect(() => {
    if (status === "success") {
      successRef.current?.focus({ preventScroll: true });
      successRef.current?.scrollIntoView({ block: "center", behavior: "instant" });
    }
  }, [status]);
  useEffect(() => { if (errors._form) errorRef.current?.focus(); }, [errors]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    applicationId.current ??= crypto.randomUUID();
    const body = { applicationId: applicationId.current, ...Object.fromEntries(values), consentVersion: MEO_CONSENT_VERSION, privacy: values.get("privacy") === "on", acknowledged: values.get("acknowledged") === "on", authority: values.get("authority") === "on", scope: values.get("scope") === "on" };
    const validation = prepareMeoApplication(body).errors;
    setErrors(validation);
    if (Object.keys(validation).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(validation)[0]}"]`)?.focus();
      return;
    }
    sending.current = true;
    setStatus("submitting");
    try {
      const response = await fetch("/api/meo/apply", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const data = await response.json();
      if (response.ok && data.ok === true) { setResult(data); setStatus("success"); return; }
      setErrors({ ...data.errors, _form: data.errors?._form || "入力内容を確認して再度送信してください。" });
      setStatus("idle");
    } catch {
      setErrors({ _form: "送信が完了しませんでした。通信環境を確認して再度送信してください。入力内容は保持されています。" });
      setStatus("idle");
    } finally { sending.current = false; }
  }
  const error = (name: string) => errors[name] ? <span id={`meo-${name}-error`} className={styles.error}>{errors[name]}</span> : null;
  const accessibility = (name: string) => ({ "aria-invalid": !!errors[name], "aria-describedby": errors[name] ? `meo-${name}-error` : undefined });
  if (status === "success") return <div ref={successRef} className={styles.success} role="status" tabIndex={-1}>
    <h2 className="text-xl font-bold">お申し込みを受け付けました</h2>
    <p>ご登録のメールアドレスに、ご利用の案内を送りました。初めての方はメール内のリンクからパスワードを設定してください。パスキーも登録できます。設定済みの方はメールの案内に沿ってログインしてください。届かない場合は迷惑メールフォルダをご確認ください。</p>
    <h3 className="text-base font-bold">続けて、初回面談の日時をお選びください</h3>
    <p>TimeRexで予約の確定まで進むと日程調整が完了します。すでに予約済みの方は再予約不要です。</p>
    <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={styles.booking}>初回面談を予約する（別タブ）</a>
    <p>アカウント設定後、ダッシュボードから店舗のGoogleアカウントを接続してください。Googleのパスワードをお知らせいただく必要はありません。</p>
    {result?.dashboard_url && <a href={result.dashboard_url} className="inline-flex min-h-12 items-center justify-center underline underline-offset-4">ダッシュボードへ</a>}
    <p>送信だけで契約・料金は発生しません。支援範囲・契約条件の確認後に運用を開始します。</p>
  </div>;
  return <form className={`${styles.form} ${styles.meo}`} onSubmit={submit} aria-label="MEO支援のお申し込み" aria-busy={status === "submitting"}>
    <div className={styles.honeypot} aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <fieldset className={styles.fields} disabled={status === "submitting"}>
      <legend className={styles.srOnly}>店舗情報とご連絡先</legend>
      {fields.map(([name, label, maxLength, autoComplete, type]) => <label key={name} className={styles.field} htmlFor={`meo-${name}`}><span>{label}<span className={name === "phone" ? styles.optional : styles.required}>{name === "phone" ? "任意" : "必須"}</span></span><input id={`meo-${name}`} name={name} type={type} maxLength={maxLength} autoComplete={autoComplete} required={name !== "phone"} {...accessibility(name)} />{error(name)}</label>)}
      <label className={styles.field} htmlFor="meo-details"><span>ご希望・補足<span className={styles.optional}>任意</span></span><textarea id="meo-details" name="details" rows={4} maxLength={3000} placeholder="複数店舗のお申し込み、ご希望の開始時期など" {...accessibility("details")} />{error("details")}</label>
      <label className={styles.consent}><input name="privacy" type="checkbox" required {...accessibility("privacy")} /><span><a href="/meo/terms" target="_blank" rel="noopener noreferrer">MEO利用条件（別タブ）</a>と<a href="/privacy" target="_blank" rel="noopener noreferrer">プライバシーポリシー（別タブ）</a>、MEO利用条件内のデータの取り扱いに同意する<span className={styles.required}>必須</span></span></label>{error("privacy")}
      <label className={styles.consent}><input name="acknowledged" type="checkbox" required {...accessibility("acknowledged")} /><span>月額30,000円（税別）／33,000円（税込）、最低契約期間6か月・1店舗あたり初期6か月総額198,000円（税込）を確認しました。契約開始後の初期6か月は通常の中途解約ができません（法令上の権利、当社の債務不履行等による解除を除く）。送信後に支援範囲・最終的な契約条件・開始日を確認し、別途契約手続きを行うことを確認しました。送信だけで契約・料金は発生しません。<span className={styles.required}>必須</span></span></label>{error("acknowledged")}
      <label className={styles.consent}><input name="authority" type="checkbox" required {...accessibility("authority")} /><span>店舗を申し込む正当な権限があります。Google上の取得・投稿には店舗管理者の権限、接続同意、必要なAPI承認が必要で、GoogleのパスワードをClearAIへ渡さないことを確認しました。<span className={styles.required}>必須</span></span></label>{error("authority")}
      <label className={styles.consent}><input name="scope" type="checkbox" required {...accessibility("scope")} /><span>1店舗につき月4回の投稿支援、口コミ返信案は2営業日以内、月次レポートと合意したキーワード・地点での月次順位計測が対象です。投稿・返信は店舗責任者の承認後に行います。検索順位・売上は保証されず、Google連携の利用条件がそろうまでは自動取得・投稿を開始しないことを確認しました。<span className={styles.required}>必須</span></span></label>{error("scope")}
      {errors.consentVersion && <p className={styles.formError} role="alert">{errors.consentVersion}</p>}
      {errors._form && <p ref={errorRef} tabIndex={-1} className={styles.formError} role="alert">{errors._form}</p>}
      <button className={styles.submit} data-ui-button="filled" type="submit" disabled={status === "submitting"}><span className="ui-button-label">{status === "submitting" ? "送信しています…" : "MEO支援を申し込む"}</span></button>
    </fieldset>
  </form>;
}

"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { prepareMeoApplication } from "@/lib/meo-application";
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
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  useEffect(() => { if (status === "success") successRef.current?.focus(); }, [status]);
  useEffect(() => { if (errors._form) errorRef.current?.focus(); }, [errors]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    const body = { ...Object.fromEntries(values), privacy: values.get("privacy") === "on", acknowledged: values.get("acknowledged") === "on" };
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
      if (response.ok && data.ok === true) { setStatus("success"); return; }
      setErrors({ ...data.errors, _form: data.errors?._form || "入力内容を確認して再度送信してください。" });
      setStatus("idle");
    } catch {
      setErrors({ _form: "送信が完了しませんでした。通信環境を確認して再度送信してください。入力内容は保持されています。" });
      setStatus("idle");
    } finally { sending.current = false; }
  }
  const error = (name: string) => errors[name] ? <span id={`meo-${name}-error`} className={styles.error}>{errors[name]}</span> : null;
  const accessibility = (name: string) => ({ "aria-invalid": !!errors[name], "aria-describedby": errors[name] ? `meo-${name}-error` : undefined });
  if (status === "success") return <div ref={successRef} className={styles.success} role="status" tabIndex={-1}><h2 className="text-xl font-bold">MEO支援のお申し込みを受け付けました</h2><p>ご登録のメールアドレスへ、担当者より支援範囲・費用と契約手続きについてご連絡します。</p><p>現時点では契約・お支払いは発生していません。</p><a href="/meo" className="inline-flex min-h-12 items-center justify-center underline">MEO支援のページへ戻る</a></div>;
  return <form className={styles.form} onSubmit={submit} aria-label="MEO支援のお申し込み" aria-busy={status === "submitting"}>
    <div className={styles.honeypot} aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <fieldset className={styles.fields} disabled={status === "submitting"}>
      <legend className={styles.srOnly}>店舗情報とご連絡先</legend>
      {fields.map(([name, label, maxLength, autoComplete, type]) => <label key={name} className={styles.field} htmlFor={`meo-${name}`}><span>{label}<span className={name === "phone" ? styles.optional : styles.required}>{name === "phone" ? "任意" : "必須"}</span></span><input id={`meo-${name}`} name={name} type={type} maxLength={maxLength} autoComplete={autoComplete} required={name !== "phone"} {...accessibility(name)} />{error(name)}</label>)}
      <label className={styles.field} htmlFor="meo-details"><span>ご希望・補足<span className={styles.optional}>任意</span></span><textarea id="meo-details" name="details" rows={4} maxLength={3000} placeholder="複数店舗のお申し込み、ご希望の開始時期など" {...accessibility("details")} />{error("details")}</label>
      <label className={styles.consent}><input name="privacy" type="checkbox" required {...accessibility("privacy")} /><span><a href="/privacy" target="_blank" rel="noopener noreferrer">プライバシーポリシー（別タブ）</a>に同意する<span className={styles.required}>必須</span></span></label>{error("privacy")}
      <label className={styles.consent}><input name="acknowledged" type="checkbox" required {...accessibility("acknowledged")} /><span>月額30,000円（税別）／33,000円（税込）、最低契約期間6か月を確認しました。送信後に支援範囲・最終的な契約条件・開始日を確認し、別途契約手続きを行うことを確認しました。送信だけで契約・料金は発生しません。<span className={styles.required}>必須</span></span></label>{error("acknowledged")}
      {errors._form && <p ref={errorRef} tabIndex={-1} className={styles.formError} role="alert">{errors._form}</p>}
      <button className={styles.submit} data-ui-button="filled" type="submit" disabled={status === "submitting"}><span className="ui-button-label">{status === "submitting" ? "送信しています…" : "MEO支援を申し込む"}</span></button>
    </fieldset>
  </form>;
}

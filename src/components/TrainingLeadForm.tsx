"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { BOOKING_URL } from "@/lib/booking";
import { validateContactForm } from "@/lib/validators";
import styles from "./TrainingLeadForm.module.css";

export default function TrainingLeadForm({ courseName, sourcePath, compact = false }: { courseName: string; sourcePath: string; compact?: boolean }) {
  const id = useId();
  const sending = useRef(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    const payload = {
      inquiryType: "business", service: "education",
      company: String(values.get("company") ?? "").trim(),
      name: String(values.get("name") ?? "").trim(),
      email: String(values.get("email") ?? "").trim(),
      phone: String(values.get("phone") ?? "").trim(),
      website: String(values.get("website") ?? ""),
      message: `研修：${courseName}\nご希望：${values.get("purpose")}\n参照ページ：${sourcePath}\nご相談内容：${values.get("message") || "詳細は担当者との相談を希望します。"}`,
    };
    const validation = validateContactForm(payload);
    if (values.get("privacy") !== "on") validation.privacy = "プライバシーポリシーへの同意が必要です。";
    setErrors(validation);
    if (Object.keys(validation).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(validation)[0]}"]`)?.focus();
      return;
    }
    sending.current = true;
    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok && data.ok === true) {
        setStatus("success");
        return;
      }
      setErrors(data.errors && typeof data.errors === "object"
        ? { ...data.errors, _form: data.errors._form || "入力内容を確認して、もう一度送信してください。" }
        : { _form: "送信できませんでした。時間をおいて、もう一度お試しください。" });
      setStatus("idle");
    } catch {
      setErrors({ _form: "通信が完了しませんでした。接続を確認して、もう一度送信してください。入力内容は保持されています。" });
      setStatus("idle");
    } finally {
      sending.current = false;
    }
  }

  function fieldError(name: string) {
    return errors[name] ? <span id={`${id}-${name}-error`} className={styles.error}>{errors[name]}</span> : null;
  }

  function fieldAccessibility(name: string) {
    return { "aria-invalid": !!errors[name], "aria-describedby": errors[name] ? `${id}-${name}-error` : undefined };
  }

  if (status === "success") return (
    <div className={styles.success} role="status" aria-live="polite">
      <span className={styles.successMark} aria-hidden="true">✓</span>
      <h3>お問い合わせを受け付けました</h3>
      <p>{courseName}について、担当者より2営業日以内にご連絡します。</p>
      <p>ご都合のよい日時が決まっている場合は、このまま無料相談をご予約いただけます。</p>
      <a data-ui-button="filled" className={styles.booking} href={BOOKING_URL} target="_blank" rel="noopener noreferrer"><span className="ui-button-label">無料相談の日程を選ぶ<span className={styles.srOnly}>（新しいタブで開きます）</span></span></a>
    </div>
  );

  return (
    <form className={`${styles.form} ${compact ? styles.compact : ""}`} onSubmit={handleSubmit} aria-label={`${courseName}のお問い合わせ`} aria-busy={status === "submitting"}>
      {!compact && <p className={styles.intro}>ご相談は無料です。課題や人数が決まっていない段階でも、お気軽にご相談ください。</p>}
      <div className={styles.honeypot} aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <fieldset className={styles.fields} disabled={status === "submitting"}>
        <legend className={styles.srOnly}>ご連絡先とご相談内容</legend>
        {compact ? <input type="hidden" name="purpose" value="無料相談・見積もり" /> : <label className={styles.field} htmlFor={`${id}-purpose`}><span>ご希望<span className={styles.required}>必須</span></span>
          <select id={`${id}-purpose`} name="purpose" required defaultValue="無料相談・見積もり"><option>無料相談・見積もり</option><option>受講申し込みの相談</option><option>資料について相談</option></select>
        </label>}
        <label className={styles.field} htmlFor={`${id}-company`}><span>会社名・団体名<span className={styles.required}>必須</span></span>
          <input id={`${id}-company`} name="company" autoComplete="organization" required maxLength={200} placeholder="株式会社〇〇" {...fieldAccessibility("company")} />{fieldError("company")}
        </label>
        <div className={styles.row}>
          <label className={styles.field} htmlFor={`${id}-name`}><span>お名前<span className={styles.required}>必須</span></span>
            <input id={`${id}-name`} name="name" autoComplete="name" required maxLength={100} placeholder="山田 太郎" {...fieldAccessibility("name")} />{fieldError("name")}
          </label>
          {!compact && <label className={styles.field} htmlFor={`${id}-phone`}><span>電話番号<span className={styles.optional}>任意</span></span>
            <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" maxLength={50} placeholder="03-1234-5678" {...fieldAccessibility("phone")} />{fieldError("phone")}
          </label>}
        </div>
        <label className={styles.field} htmlFor={`${id}-email`}><span>メールアドレス<span className={styles.required}>必須</span></span>
          <input id={`${id}-email`} name="email" type="email" autoComplete="email" required maxLength={254} placeholder="name@example.co.jp" {...fieldAccessibility("email")} />{fieldError("email")}
        </label>
        {!compact && <label className={styles.field} htmlFor={`${id}-message`}><span>ご相談内容<span className={styles.optional}>任意</span></span>
          <textarea id={`${id}-message`} name="message" rows={4} maxLength={4000} placeholder="研修の対象者・人数、導入したい業務、ご希望の時期などをお聞かせください。未定でも構いません。" {...fieldAccessibility("message")} />{fieldError("message")}
        </label>}
        <label className={styles.consent} htmlFor={`${id}-privacy`}>
          <input id={`${id}-privacy`} type="checkbox" name="privacy" required {...fieldAccessibility("privacy")} />
          <span><a href="/privacy" target="_blank" rel="noopener noreferrer">プライバシーポリシー<span className={styles.srOnly}>（新しいタブで開きます）</span></a>に同意する<span className={styles.required}>必須</span></span>
        </label>{fieldError("privacy")}
        {errors._form && <p className={styles.formError} role="alert">{errors._form}</p>}
        <button data-ui-button="filled" className={styles.submit} type="submit" disabled={status === "submitting"}><span className="ui-button-label">{status === "submitting" ? "送信しています…" : (compact ? "無料相談を申し込む" : "この内容で相談・申し込みを送信")}</span></button>
        <p className={styles.note}>{compact ? "送信だけで料金は発生しません" : "送信だけで契約・料金は発生しません。担当者より2営業日以内にご連絡します。"}</p>
      </fieldset>
    </form>
  );
}

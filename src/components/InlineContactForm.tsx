"use client";

import { useState, type FormEvent } from "react";

/**
 * トップCTA用のインライン問い合わせフォーム。
 * 別ページ(/contact)へ遷移せず、その場で /api/contact に送信できる。
 * inquiryType は "business" 固定（会社名・お名前・メール・ご相談内容が必須）。
 */
const L = {
  ja: {
    heading: "30秒でかんたんお問い合わせ",
    sub: "別ページに移動せず、その場で送信できます。",
    company: "会社名",
    name: "お名前",
    email: "メールアドレス",
    messagePlaceholder: "例）バックオフィス業務をAIで効率化したい など（10文字以上）",
    submit: "無料で相談する",
    sending: "送信中…",
    ok: "送信しました。2営業日以内にご返信します。",
    err: "送信に失敗しました。お手数ですが時間をおいて再度お試しください。",
  },
  en: {
    heading: "Quick inquiry in 30 seconds",
    sub: "Send it right here — no need to leave the page.",
    company: "Company",
    name: "Name",
    email: "Email",
    messagePlaceholder: "e.g. We'd like to streamline back-office work with AI (10+ chars)",
    submit: "Book a free consultation",
    sending: "Sending…",
    ok: "Thanks! We'll reply within 2 business days.",
    err: "Something went wrong. Please try again later.",
  },
} as const;

export default function InlineContactForm({ lang = "ja" }: { lang?: "ja" | "en" }) {
  const t = L[lang];
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      inquiryType: "business",
      company: String(fd.get("company") || ""),
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      message: String(fd.get("message") || ""),
      website: String(fd.get("website") || ""), // honeypot
    };
    setStatus("sending");
    setErrMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("ok");
        form.reset();
      } else {
        setStatus("error");
        const firstErr = data?.errors?._form || (data?.errors && Object.values(data.errors)[0]);
        setErrMsg(typeof firstErr === "string" ? firstErr : t.err);
      }
    } catch {
      setStatus("error");
      setErrMsg(t.err);
    }
  }

  if (status === "ok") {
    return (
      <div className="mx-auto max-w-xl rounded-lg border border-gray-200 bg-white p-8 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-white">✓</div>
        <p className="text-base font-semibold text-gray-900">{t.ok}</p>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 transition";

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-xl rounded-lg border border-gray-200 bg-white p-6 sm:p-8 text-left">
      <p className="text-base font-bold text-gray-900">{t.heading}</p>
      <p className="mt-1 mb-5 text-xs text-gray-500">{t.sub}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="company" placeholder={t.company} autoComplete="organization" required className={inputCls} />
        <input name="name" placeholder={t.name} autoComplete="name" required className={inputCls} />
      </div>
      <input name="email" type="email" placeholder={t.email} autoComplete="email" required className={`${inputCls} mt-3`} />
      <textarea name="message" rows={3} minLength={10} placeholder={t.messagePlaceholder} required className={`${inputCls} mt-3 resize-y`} />
      {/* honeypot: 人間には見えない。埋まっていたらスパム扱い */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      {status === "error" && <p className="mt-3 text-sm text-red-600">{errMsg}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-neutral-900 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-black hover:-translate-y-0.5 disabled:opacity-60"
      >
        {status === "sending" ? t.sending : t.submit}
        <span aria-hidden>→</span>
      </button>
    </form>
  );
}

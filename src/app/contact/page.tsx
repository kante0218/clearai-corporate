"use client";

import { Suspense, useState, useEffect, useRef, FormEvent, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { validateContactForm, SERVICE_KEYS, SERVICE_LABELS, type ServiceKey } from "@/lib/validators";

// ---------------------------------------------------------------------------
// Bilingual copy dictionary — co-located, NOT imported from translations.ts
// ---------------------------------------------------------------------------
const COPY = {
  ja: {
    // Header
    headerKicker: "Contact",
    headerTitle: "お問い合わせ",
    headerDesc: "ご質問・ご相談は2営業日以内にご返信します。お急ぎの方は",
    headerDescEmail: "まで。",
    // Success screen
    successTitle: "送信ありがとうございます",
    successBody: "2営業日以内にご連絡いたします（確認メールが届かない場合は迷惑メールフォルダをご確認ください）。",
    successReset: "もう一件送る",
    // Field labels
    labelName: "お名前",
    labelEmail: "メールアドレス",
    labelCompany: "会社名",
    labelMessage: "お問い合わせ内容",
    labelRequired: "*",
    labelOptional: "（任意）",
    // Placeholders
    placeholderName: "山田 太郎",
    placeholderEmail: "info@example.com",
    placeholderCompany: "株式会社〇〇",
    messagePlaceholderDefault: "ご質問やご相談内容をご記入ください（10文字以上）",
    messagePlaceholderService: "について、検討背景や聞きたいことをご記入ください",
    // Submit
    submitSending: "送信中...",
    submitButton: "送信する",
    // Privacy
    privacyPrefix: "送信いただいた情報は、当社",
    privacyLink: "プライバシーポリシー",
    privacySuffix: "に従い適切に管理します。",
    // Server error
    serverError: "通信エラーが発生しましたので、しばらく経ってから再試行してください。",
    // Info strip
    infoReplyLabel: "返信目安",
    infoReplyValue: "2営業日以内",
    infoMethodLabel: "対応方法",
    infoMethodValue: "メール / オンライン",
    infoHoursLabel: "営業時間",
    infoHoursValue: "平日 9:00–18:00",
    infoDirectLabel: "直接連絡",
    infoDirectValue: "info@clearai.jp",
  },
  en: {
    // Header
    headerKicker: "Contact",
    headerTitle: "Contact Us",
    headerDesc: "Feel free to reach out — we reply within 2 business days, or email",
    headerDescEmail: "for urgent matters.",
    // Success screen
    successTitle: "Message sent — thank you.",
    successBody: "We'll be in touch within 2 business days (if no confirmation email arrives, check your spam folder).",
    successReset: "Send another message",
    // Field labels
    labelName: "Full name",
    labelEmail: "Email address",
    labelCompany: "Company name",
    labelMessage: "Your message",
    labelRequired: "*",
    labelOptional: "(optional)",
    // Placeholders
    placeholderName: "Jane Smith",
    placeholderEmail: "info@example.com",
    placeholderCompany: "Acme Inc.",
    messagePlaceholderDefault: "Please describe your question or inquiry (10+ characters).",
    messagePlaceholderService: " — please share the background and what you'd like to know.",
    // Submit
    submitSending: "Sending...",
    submitButton: "Send message",
    // Privacy
    privacyPrefix: "Information you submit is handled in accordance with our",
    privacyLink: "Privacy Policy",
    privacySuffix: ".",
    // Server error
    serverError: "A network error occurred — please wait a moment and try again.",
    // Info strip
    infoReplyLabel: "Response time",
    infoReplyValue: "Within 2 business days",
    infoMethodLabel: "How we respond",
    infoMethodValue: "Email / Online",
    infoHoursLabel: "Business hours",
    infoHoursValue: "Mon–Fri 9:00–18:00",
    infoDirectLabel: "Direct contact",
    infoDirectValue: "info@clearai.jp",
  },
} as const;

// ---------------------------------------------------------------------------
// Reveal animation component
// ---------------------------------------------------------------------------
function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>{children}</div>
  );
}

// ---------------------------------------------------------------------------
// Types & constants
// ---------------------------------------------------------------------------
// Service may still arrive via ?service= (e.g. from a plan card) — it is sent
// silently with the message for context, but no longer shown as a selector.
type ExtendedServiceKey = ServiceKey | "robot-rental" | "sns";
const EXTENDED_SERVICE_KEYS: readonly string[] = [...(SERVICE_KEYS as readonly string[]), "robot-rental", "sns"];

const EMPTY_FORM = {
  // General-inquiry form: "other" keeps only name / email / message required.
  inquiryType: "other" as const,
  service: "" as ExtendedServiceKey | "",
  company: "",
  name: "",
  email: "",
  message: "",
  website: "",
};

// ---------------------------------------------------------------------------
// Page entry point (Suspense wrapper required for useSearchParams)
// ---------------------------------------------------------------------------
export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ContactPageInner />
    </Suspense>
  );
}

// ---------------------------------------------------------------------------
// Inner page component
// ---------------------------------------------------------------------------
function ContactPageInner() {
  const searchParams = useSearchParams();
  const { lang } = useLanguage();
  const t = COPY[lang];

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  // Silently capture ?service= for context (no UI).
  useEffect(() => {
    const serviceParam = searchParams.get("service");
    if (serviceParam && EXTENDED_SERVICE_KEYS.includes(serviceParam)) {
      setForm((prev) => ({ ...prev, service: serviceParam as ExtendedServiceKey }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors((prev) => { const next = { ...prev }; delete next[e.target.name]; return next; });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError(null);
    const clientErrors = validateContactForm({
      inquiryType: form.inquiryType,
      company: form.company,
      name: form.name,
      email: form.email,
      message: form.message,
    });
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      const firstField = Object.keys(clientErrors)[0];
      document.getElementById(firstField)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { setStatus("success"); return; }
      if (res.status === 400) {
        const data = await res.json();
        setErrors(data.errors ?? {});
        setStatus("idle");
        return;
      }
      setServerError(t.serverError);
      setStatus("error");
    } catch {
      setServerError(t.serverError);
      setStatus("error");
    }
  };

  const handleReset = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setServerError(null);
    setStatus("idle");
    const serviceParam = searchParams.get("service");
    if (serviceParam && EXTENDED_SERVICE_KEYS.includes(serviceParam)) {
      setForm((prev) => ({ ...prev, service: serviceParam as ExtendedServiceKey }));
    }
  };

  const inputClass = (field: string) =>
    `w-full border bg-white px-4 py-3.5 text-base text-neutral-900 placeholder-neutral-400 outline-none transition-[border-color,background-color,box-shadow] duration-200 focus:border-neutral-900 focus:shadow-[inset_0_0_0_1px_#171717] ${
      errors[field] ? "border-neutral-900 bg-neutral-50" : "border-neutral-900 hover:border-neutral-900"
    }`;

  const getMessagePlaceholder = (): string => {
    if (form.service) {
      const label =
        (SERVICE_LABELS as Record<string, string>)[form.service] ??
        ({ "robot-rental": "ロボットレンタル", sns: "SNS運用代行" } as Record<string, string>)[form.service] ??
        form.service;
      return `${label}${t.messagePlaceholderService}`;
    }
    return t.messagePlaceholderDefault;
  };

  return (
    <main className="min-h-screen bg-white">
      {/* MASTHEAD */}
      <section className="bg-white pt-32 lg:pt-40 pb-10 lg:pb-12">
        <div className="max-w-2xl mx-auto px-6">
          <Reveal>
            {/* technical meta bar */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-neutral-900 pb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
              <span className="font-bold text-neutral-900">§00</span>
              <span>{t.headerKicker}</span>
              <span className="text-neutral-300">/</span>
              <span>Inquiry</span>
              <span className="text-neutral-300">/</span>
              <span>info@clearai.jp</span>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="mt-10 text-[12vw] sm:text-6xl lg:text-[104px] font-bold leading-[0.95] tracking-[-0.04em] text-balance text-neutral-900">
              {t.headerTitle}
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-8 max-w-xl text-base lg:text-lg leading-relaxed text-pretty text-neutral-600">
              {t.headerDesc}{" "}
              <a href="mailto:info@clearai.jp" className="font-mono text-neutral-900 underline underline-offset-2 decoration-neutral-400 hover:decoration-neutral-900">info@clearai.jp</a>{" "}
              {t.headerDescEmail}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-6 pb-20 lg:pb-28">
        {status === "success" ? (
          <Reveal>
            <div className="border border-neutral-900 bg-white">
              <div className="flex items-center justify-between border-b border-neutral-900 bg-neutral-50 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                <span>Status</span>
                <span className="text-neutral-900">Received / OK</span>
              </div>
              <div className="px-8 py-16 text-center">
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center border border-neutral-900">
                  <svg className="h-6 w-6 text-neutral-900" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="mb-3 text-xl lg:text-2xl font-bold tracking-tight text-balance text-neutral-900">{t.successTitle}</h2>
                <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-pretty text-neutral-600">
                  {t.successBody}
                </p>
                <button type="button" onClick={handleReset}
                  className="inline-flex items-center gap-2 border border-neutral-900 bg-white px-6 py-3 font-mono text-sm font-bold uppercase tracking-[0.08em] text-neutral-900 transition-[color,background-color,scale] duration-300 hover:bg-neutral-900 hover:text-white active:scale-[0.96]">
                  {t.successReset}
                </button>
              </div>
            </div>
          </Reveal>
        ) : (
          <Reveal>
            <form onSubmit={handleSubmit} noValidate className="border border-neutral-900 bg-white">
              {/* form meta bar */}
              <div className="flex items-center justify-between border-b border-neutral-900 bg-neutral-50 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 sm:px-10">
                <span className="text-neutral-900">§01 / Message Form</span>
                <span>Required *</span>
              </div>
              <div className="space-y-6 p-6 sm:p-10">
              {/* Honeypot */}
              <input type="text" name="website" value={form.website} onChange={handleChange}
                tabIndex={-1} autoComplete="off" aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }} />

              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="mb-1.5 block font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-500">
                    {t.labelName} <span className="text-neutral-900">{t.labelRequired}</span>
                  </label>
                  <input id="name" type="text" name="name" value={form.name} onChange={handleChange}
                    placeholder={t.placeholderName} autoComplete="name"
                    aria-invalid={!!errors.name} className={inputClass("name")} />
                  {errors.name && <p className="mt-1.5 font-mono text-xs font-medium text-neutral-900">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-500">
                    {t.labelEmail} <span className="text-neutral-900">{t.labelRequired}</span>
                  </label>
                  <input id="email" type="email" name="email" value={form.email} onChange={handleChange}
                    placeholder={t.placeholderEmail} autoComplete="email"
                    aria-invalid={!!errors.email} className={inputClass("email")} />
                  {errors.email && <p className="mt-1.5 font-mono text-xs font-medium text-neutral-900">{errors.email}</p>}
                </div>
              </div>

              {/* Company (optional) */}
              <div>
                <label htmlFor="company" className="mb-1.5 block font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-500">
                  {t.labelCompany} <span className="font-normal text-neutral-400">{t.labelOptional}</span>
                </label>
                <input id="company" type="text" name="company" value={form.company} onChange={handleChange}
                  placeholder={t.placeholderCompany} autoComplete="organization"
                  aria-invalid={!!errors.company} className={inputClass("company")} />
                {errors.company && <p className="mt-1.5 font-mono text-xs font-medium text-neutral-900">{errors.company}</p>}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="mb-1.5 block font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-500">
                  {t.labelMessage} <span className="text-neutral-900">{t.labelRequired}</span>
                </label>
                <textarea id="message" name="message" rows={6} value={form.message} onChange={handleChange}
                  placeholder={getMessagePlaceholder()}
                  aria-invalid={!!errors.message}
                  className={`${inputClass("message")} resize-none min-h-[160px]`} />
                {errors.message && <p className="mt-1.5 font-mono text-xs font-medium text-neutral-900">{errors.message}</p>}
              </div>

              {/* Server error */}
              <div aria-live="polite">
                {serverError && (
                  <p className="border border-neutral-900 bg-neutral-50 px-4 py-3 text-sm text-neutral-900">{serverError}</p>
                )}
              </div>

              {/* Submit (full width) */}
              <div className="space-y-4 pt-2">
                <button type="submit" disabled={status === "submitting"}
                  className={`group inline-flex w-full items-center justify-center gap-2 border border-neutral-900 bg-neutral-900 px-10 py-4 font-mono text-sm font-bold uppercase tracking-[0.08em] text-white transition-[color,background-color,border-color,scale] duration-300 hover:bg-transparent hover:text-neutral-900 active:scale-[0.96] ${
                    status === "submitting" ? "cursor-not-allowed opacity-60" : ""
                  }`}>
                  {status === "submitting" && (
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  )}
                  {status === "submitting" ? t.submitSending : t.submitButton}
                  {status !== "submitting" && (
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  )}
                </button>
                <p className="text-center text-xs leading-relaxed text-neutral-500">
                  {t.privacyPrefix}{" "}
                  <a href="/privacy" className="underline underline-offset-2 hover:text-neutral-900">{t.privacyLink}</a>
                  {t.privacySuffix}
                </p>
              </div>
              </div>
            </form>
          </Reveal>
        )}
      </section>

      {/* Mini info strip */}
      {status !== "success" && (
        <section className="max-w-2xl mx-auto px-6 pb-24">
          <Reveal>
            <div className="grid grid-cols-2 gap-px border border-neutral-900 bg-neutral-900 sm:grid-cols-4">
              {[
                { no: "01", label: t.infoReplyLabel, value: t.infoReplyValue },
                { no: "02", label: t.infoMethodLabel, value: t.infoMethodValue },
                { no: "03", label: t.infoHoursLabel, value: t.infoHoursValue },
                { no: "04", label: t.infoDirectLabel, value: t.infoDirectValue },
              ].map((item) => (
                <div key={item.label} className="bg-white p-5">
                  <p className="mb-2 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-400">
                    <span className="tabular-nums text-neutral-900">{item.no}</span> — {item.label}
                  </p>
                  <p className="break-all font-mono text-[13px] font-semibold text-neutral-900">{item.value}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>
      )}
    </main>
  );
}

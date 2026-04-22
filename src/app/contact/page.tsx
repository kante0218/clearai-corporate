"use client";

import { Suspense, useState, useEffect, useRef, FormEvent, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { validateContactForm, SERVICE_KEYS, SERVICE_LABELS, type ServiceKey } from "@/lib/validators";

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); } },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

type InquiryType = "business" | "engineer" | "other";

const INQUIRY_OPTIONS: { value: InquiryType; label: string; desc: string }[] = [
  { value: "business", label: "ご相談・お見積もり", desc: "AI導入・コンサル・開発のご依頼" },
  { value: "engineer", label: "エンジニア採用", desc: "一緒に農業を変える仲間を募集中" },
  { value: "other", label: "その他", desc: "取材・提携・一般的なお問い合わせ" },
];

const SERVICE_OPTIONS: { value: ServiceKey; label: string; color: string }[] = [
  { value: "consulting", label: "AIコンサルティング", color: "blue" },
  { value: "advisor", label: "AI顧問 + ウェブサイト監修", color: "indigo" },
  { value: "agriculture", label: "農業×エンジニアリング", color: "emerald" },
  { value: "education", label: "AI導入・教育", color: "amber" },
  { value: "ceo", label: "CEO向けAI活用", color: "violet" },
  { value: "claude-code", label: "Claude Code特化導入", color: "orange" },
];

const EMPTY_FORM = {
  inquiryType: "business" as InquiryType,
  service: "" as ServiceKey | "",
  company: "",
  name: "",
  email: "",
  phone: "",
  size: "",
  position: "",
  experience: "",
  portfolio: "",
  message: "",
  website: "", // honeypot
};

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ContactPageInner />
    </Suspense>
  );
}

function ContactPageInner() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  // Read ?service= param on mount and pre-select service
  useEffect(() => {
    const serviceParam = searchParams.get("service");
    if (serviceParam && (SERVICE_KEYS as readonly string[]).includes(serviceParam)) {
      setForm((prev) => ({
        ...prev,
        inquiryType: "business" as InquiryType,
        service: serviceParam as ServiceKey,
      }));
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear field error on change
    if (errors[e.target.name]) {
      setErrors((prev) => { const next = { ...prev }; delete next[e.target.name]; return next; });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Client-side validation
    const clientErrors = validateContactForm({
      inquiryType: form.inquiryType,
      company: form.company,
      name: form.name,
      email: form.email,
      phone: form.phone,
      size: form.size,
      position: form.position,
      experience: form.experience,
      portfolio: form.portfolio,
      message: form.message,
    });
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        return;
      }

      if (res.status === 400) {
        const data = await res.json();
        setErrors(data.errors ?? {});
        setStatus("idle");
        return;
      }

      // 5xx or unexpected
      setServerError("通信エラーが発生しました。時間をおいて再度お試しください。");
      setStatus("error");
    } catch {
      setServerError("通信エラーが発生しました。時間をおいて再度お試しください。");
      setStatus("error");
    }
  };

  const handleReset = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setServerError(null);
    setStatus("idle");
    // If there was a service param, keep it
    const serviceParam = searchParams.get("service");
    if (serviceParam && (SERVICE_KEYS as readonly string[]).includes(serviceParam)) {
      setForm((prev) => ({ ...prev, service: serviceParam as ServiceKey }));
    }
  };

  const inputClass = (field: string) =>
    `w-full rounded-lg border px-4 py-3 text-base text-gray-900 placeholder-gray-400 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors duration-200 ${
      errors[field] ? "border-red-400" : "border-gray-200"
    }`;

  const selectInquiry = (t: InquiryType) => {
    setForm({ ...form, inquiryType: t, service: t === "business" ? form.service : "" });
    setErrors({});
  };

  const selectService = (s: ServiceKey | "") => {
    setForm({ ...form, service: s });
  };

  const isBusiness = form.inquiryType === "business";
  const isEngineer = form.inquiryType === "engineer";

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="max-w-5xl mx-auto px-6 pt-40 pb-16">
        <Reveal>
          <p className="text-sm font-semibold text-blue-600 mb-4">Contact</p>
          <h1 className="text-3xl font-bold text-gray-900">
            お問い合わせ
          </h1>
          {form.service && (
            <p className="text-base text-gray-500 mt-3">
              {SERVICE_LABELS[form.service]}に関するお問い合わせ
            </p>
          )}
        </Reveal>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-20 lg:pb-28">
        {status === "success" ? (
          /* Success State */
          <Reveal>
            <div className="max-w-md mx-auto text-center py-20">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-7 h-7 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                お問い合わせありがとうございます
              </h2>
              <p className="text-base text-gray-600 mb-8">
                担当者より2営業日以内にご連絡いたします。お急ぎの場合は{" "}
                <a href="mailto:t.kante@clearai.jp" className="text-blue-600 underline">
                  t.kante@clearai.jp
                </a>{" "}
                まで直接ご連絡ください。
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-xl border border-blue-600 text-blue-600 font-semibold px-8 py-3 hover:bg-blue-50 transition-colors duration-300"
              >
                別のお問い合わせを送る
              </button>
            </div>
          </Reveal>
        ) : (
          /* Form Layout */
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Left: Info */}
            <Reveal className="lg:col-span-2">
              <div className="space-y-8">
                <div>
                  {form.service && isBusiness && (
                    <p className="text-sm font-semibold text-blue-600 mb-2">
                      {SERVICE_LABELS[form.service]}
                    </p>
                  )}
                  <p className="text-base text-gray-600 leading-relaxed">
                    {isEngineer
                      ? "clearAIでは、農業×エンジニアリングに共感いただける仲間を募集しています。お気軽にご連絡ください。"
                      : isBusiness
                      ? "AI導入やサービスに関するご質問、お見積もりのご依頼など、どのようなことでもお気軽にお問い合わせください。"
                      : "取材・提携・その他のお問い合わせを承ります。まずはお気軽にご連絡ください。"}
                  </p>
                </div>

                <div className="space-y-6 pt-2">
                  <div className="bg-gray-50 rounded-2xl p-5">
                    <p className="text-sm font-semibold text-gray-500 mb-1">EMAIL</p>
                    <p className="text-base text-gray-900">t.kante@clearai.jp</p>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-5">
                    <p className="text-sm font-semibold text-gray-500 mb-1">対応方法</p>
                    <p className="text-base text-gray-900">メール・オンライン面談</p>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-5">
                    <p className="text-sm font-semibold text-gray-500 mb-1">営業時間</p>
                    <p className="text-base text-gray-900">平日 9:00〜18:00（土日祝休み）</p>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-5">
                    <p className="text-sm font-semibold text-gray-500 mb-1">返信目安</p>
                    <p className="text-base text-gray-900">2営業日以内</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right: Form */}
            <Reveal className="lg:col-span-3" delay={150}>
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Honeypot — hidden from real users */}
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}
                />

                {/* Inquiry type selector */}
                <div>
                  <p className="block text-sm font-semibold text-gray-700 mb-3">
                    お問い合わせ種別 <span className="text-red-400">*</span>
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {INQUIRY_OPTIONS.map((opt) => {
                      const active = form.inquiryType === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => selectInquiry(opt.value)}
                          aria-pressed={active}
                          className={`text-left rounded-xl border px-4 py-4 transition-all duration-200 ${
                            active
                              ? "border-blue-600 bg-blue-50/60 ring-1 ring-blue-600"
                              : "border-gray-200 bg-white hover:border-gray-300"
                          }`}
                        >
                          <span className={`block text-sm font-bold ${active ? "text-blue-700" : "text-gray-900"}`}>
                            {opt.label}
                          </span>
                          <span className="block text-xs text-gray-500 mt-1 leading-snug">{opt.desc}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Service selector (visible when business is selected) */}
                {isBusiness && (
                  <div>
                    <p className="block text-sm font-semibold text-gray-700 mb-3">
                      ご興味のあるサービス
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {SERVICE_OPTIONS.map((opt) => {
                        const active = form.service === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => selectService(active ? "" : opt.value)}
                            aria-pressed={active}
                            className={`text-left rounded-lg border px-3.5 py-3 transition-all duration-200 ${
                              active
                                ? "border-blue-600 bg-blue-50/60 ring-1 ring-blue-600"
                                : "border-gray-200 bg-white hover:border-gray-300"
                            }`}
                          >
                            <span className={`block text-sm font-semibold ${active ? "text-blue-700" : "text-gray-900"}`}>
                              {opt.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Common: name + email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      {isEngineer ? "お名前" : "ご担当者名"} <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="山田 太郎"
                      autoComplete="name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className={inputClass("name")}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      メールアドレス <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="info@example.com"
                      autoComplete="email"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className={inputClass("email")}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Business: company + size */}
                {isBusiness && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                          会社名 <span className="text-red-400">*</span>
                        </label>
                        <input
                          id="company"
                          type="text"
                          name="company"
                          value={form.company}
                          onChange={handleChange}
                          placeholder="株式会社〇〇"
                          autoComplete="organization"
                          aria-invalid={!!errors.company}
                          aria-describedby={errors.company ? "company-error" : undefined}
                          className={inputClass("company")}
                        />
                        {errors.company && (
                          <p id="company-error" className="mt-1 text-sm text-red-500">{errors.company}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                          電話番号
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="03-XXXX-XXXX"
                          autoComplete="tel"
                          aria-invalid={!!errors.phone}
                          aria-describedby={errors.phone ? "phone-error" : undefined}
                          className={inputClass("phone")}
                        />
                        {errors.phone && (
                          <p id="phone-error" className="mt-1 text-sm text-red-500">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="size" className="block text-sm font-semibold text-gray-700 mb-2">
                        従業員規模
                      </label>
                      <select
                        id="size"
                        name="size"
                        value={form.size}
                        onChange={handleChange}
                        aria-invalid={!!errors.size}
                        aria-describedby={errors.size ? "size-error" : undefined}
                        className={`${inputClass("size")} appearance-none cursor-pointer bg-white`}
                      >
                        <option value="">選択してください</option>
                        <option value="~50名">〜50名</option>
                        <option value="51-200名">51〜200名</option>
                        <option value="201-500名">201〜500名</option>
                        <option value="501-1000名">501〜1000名</option>
                        <option value="1001名~">1001名〜</option>
                      </select>
                      {errors.size && (
                        <p id="size-error" className="mt-1 text-sm text-red-500">{errors.size}</p>
                      )}
                    </div>
                  </>
                )}

                {/* Engineer: position + experience + portfolio */}
                {isEngineer && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="position" className="block text-sm font-semibold text-gray-700 mb-2">
                          希望ポジション <span className="text-red-400">*</span>
                        </label>
                        <select
                          id="position"
                          name="position"
                          value={form.position}
                          onChange={handleChange}
                          aria-invalid={!!errors.position}
                          aria-describedby={errors.position ? "position-error" : undefined}
                          className={`${inputClass("position")} appearance-none cursor-pointer bg-white`}
                        >
                          <option value="">選択してください</option>
                          <option value="フロントエンド">フロントエンド</option>
                          <option value="バックエンド">バックエンド</option>
                          <option value="フルスタック">フルスタック</option>
                          <option value="デザイナー">デザイナー</option>
                          <option value="インフラ・SRE">インフラ・SRE</option>
                          <option value="AI/ML">AI / ML</option>
                          <option value="その他">その他</option>
                        </select>
                        {errors.position && (
                          <p id="position-error" className="mt-1 text-sm text-red-500">{errors.position}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="experience" className="block text-sm font-semibold text-gray-700 mb-2">
                          エンジニア経験年数
                        </label>
                        <select
                          id="experience"
                          name="experience"
                          value={form.experience}
                          onChange={handleChange}
                          aria-invalid={!!errors.experience}
                          aria-describedby={errors.experience ? "experience-error" : undefined}
                          className={`${inputClass("experience")} appearance-none cursor-pointer bg-white`}
                        >
                          <option value="">選択してください</option>
                          <option value="学生">学生</option>
                          <option value="1年未満">1年未満</option>
                          <option value="1-3年">1〜3年</option>
                          <option value="3-5年">3〜5年</option>
                          <option value="5-10年">5〜10年</option>
                          <option value="10年以上">10年以上</option>
                        </select>
                        {errors.experience && (
                          <p id="experience-error" className="mt-1 text-sm text-red-500">{errors.experience}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="portfolio" className="block text-sm font-semibold text-gray-700 mb-2">
                        GitHub / ポートフォリオ URL
                      </label>
                      <input
                        id="portfolio"
                        type="url"
                        name="portfolio"
                        value={form.portfolio}
                        onChange={handleChange}
                        placeholder="https://github.com/your-id"
                        autoComplete="url"
                        aria-invalid={!!errors.portfolio}
                        aria-describedby={errors.portfolio ? "portfolio-error" : undefined}
                        className={inputClass("portfolio")}
                      />
                      {errors.portfolio && (
                        <p id="portfolio-error" className="mt-1 text-sm text-red-500">{errors.portfolio}</p>
                      )}
                    </div>
                  </>
                )}

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    {isEngineer ? "自己紹介・志望動機" : "ご相談内容"} <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder={
                      isEngineer
                        ? "使用技術・得意分野・志望動機などをご記入ください"
                        : "ご質問やご相談内容をご記入ください"
                    }
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={`${inputClass("message")} resize-none min-h-[140px]`}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-sm text-red-500">{errors.message}</p>
                  )}
                </div>

                {/* Server error */}
                <div aria-live="polite">
                  {serverError && (
                    <p className="text-sm text-red-500 bg-red-50 rounded-lg px-4 py-3">{serverError}</p>
                  )}
                </div>

                <div className="pt-2 space-y-4">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className={`inline-flex items-center gap-2 rounded-xl bg-blue-600 text-white font-semibold px-10 py-3.5 hover:bg-blue-700 transition-colors duration-300 ${
                      status === "submitting" ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                  >
                    {status === "submitting" && (
                      <svg
                        className="w-4 h-4 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                    )}
                    {status === "submitting" ? "送信中..." : "送信する"}
                  </button>

                  <p className="text-xs text-gray-500">
                    送信いただいた情報は、当社{" "}
                    <a href="/privacy" className="underline hover:text-gray-700">
                      プライバシーポリシー
                    </a>
                    に従い適切に管理します。
                  </p>
                </div>
              </form>
            </Reveal>
          </div>
        )}
      </section>
    </main>
  );
}

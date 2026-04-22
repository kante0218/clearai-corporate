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

type InquiryType = "business" | "engineer" | "other";

const INQUIRY_OPTIONS: { value: InquiryType; label: string; desc: string; icon: ReactNode }[] = [
  {
    value: "business",
    label: "サービス相談",
    desc: "AI導入・顧問・研修・農業など",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /><path d="M12 8v4l2.5 2.5" />
      </svg>
    ),
  },
  {
    value: "engineer",
    label: "エンジニア採用",
    desc: "チームに参加したい方",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m8 4 8 16M4 8l4 4-4 4M20 8l-4 4 4 4" />
      </svg>
    ),
  },
  {
    value: "other",
    label: "その他",
    desc: "取材・提携など",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
      </svg>
    ),
  },
];

const SERVICE_OPTIONS: { value: ServiceKey; label: string }[] = [
  { value: "consulting", label: "AIコンサル・DX" },
  { value: "advisor", label: "AI顧問" },
  { value: "education", label: "AI研修" },
  { value: "claude-code", label: "Claude特化" },
  { value: "agriculture", label: "農業×AI" },
  { value: "ceo", label: "経営者向けAI活用" },
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
  website: "",
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
  const [showOptional, setShowOptional] = useState(false);

  useEffect(() => {
    const serviceParam = searchParams.get("service");
    if (serviceParam && (SERVICE_KEYS as readonly string[]).includes(serviceParam)) {
      setForm((prev) => ({ ...prev, inquiryType: "business", service: serviceParam as ServiceKey }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      phone: form.phone,
      size: form.size,
      position: form.position,
      experience: form.experience,
      portfolio: form.portfolio,
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
    setShowOptional(false);
    const serviceParam = searchParams.get("service");
    if (serviceParam && (SERVICE_KEYS as readonly string[]).includes(serviceParam)) {
      setForm((prev) => ({ ...prev, service: serviceParam as ServiceKey }));
    }
  };

  const inputClass = (field: string) =>
    `w-full rounded-xl border bg-white px-4 py-3.5 text-base text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 ${
      errors[field] ? "border-red-300 bg-red-50/30" : "border-gray-200 hover:border-gray-300"
    }`;

  const selectInquiry = (t: InquiryType) => {
    setForm({ ...form, inquiryType: t, service: t === "business" ? form.service : "" });
    setErrors({});
  };

  const selectService = (s: ServiceKey | "") => setForm({ ...form, service: s });

  const isBusiness = form.inquiryType === "business";
  const isEngineer = form.inquiryType === "engineer";

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50/50 to-white">
      {/* Header */}
      <section className="max-w-3xl mx-auto px-6 pt-32 lg:pt-40 pb-10 lg:pb-12 text-center">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.2em] text-blue-600 uppercase mb-4">Contact</p>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">お問い合わせ</h1>
          <p className="text-sm lg:text-base text-gray-600 leading-relaxed max-w-xl mx-auto">
            2営業日以内にご返信します。お急ぎの方は{" "}
            <a href="mailto:t.kante@clearai.jp" className="text-blue-600 underline underline-offset-2">t.kante@clearai.jp</a>{" "}
            まで直接ご連絡ください。
          </p>
        </Reveal>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-20 lg:pb-28">
        {status === "success" ? (
          <Reveal>
            <div className="bg-white border border-gray-200 rounded-3xl px-8 py-16 text-center shadow-sm">
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">送信ありがとうございます</h2>
              <p className="text-sm text-gray-600 leading-relaxed max-w-md mx-auto mb-8">
                担当者より2営業日以内にご連絡いたします。確認用メールが届かない場合は迷惑メールフォルダもご確認ください。
              </p>
              <button type="button" onClick={handleReset}
                className="rounded-lg border border-gray-300 text-gray-700 font-semibold px-6 py-3 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
                もう一件送る
              </button>
            </div>
          </Reveal>
        ) : (
          <Reveal>
            <form onSubmit={handleSubmit} noValidate className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-10">
              {/* Honeypot */}
              <input type="text" name="website" value={form.website} onChange={handleChange}
                tabIndex={-1} autoComplete="off" aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }} />

              {/* STEP 1: Inquiry type */}
              <div>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-xs font-bold text-blue-600">01</span>
                  <h2 className="text-sm font-semibold text-gray-900">お問い合わせ種別</h2>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {INQUIRY_OPTIONS.map((opt) => {
                    const active = form.inquiryType === opt.value;
                    return (
                      <button key={opt.value} type="button" onClick={() => selectInquiry(opt.value)}
                        aria-pressed={active}
                        className={`text-center rounded-2xl border px-3 py-4 sm:py-5 transition-all duration-200 ${
                          active ? "border-blue-600 bg-blue-50/70 ring-2 ring-blue-600/20" : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50"
                        }`}>
                        <div className={`mx-auto mb-2 w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                          active ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500"
                        }`}>{opt.icon}</div>
                        <span className={`block text-xs sm:text-sm font-bold ${active ? "text-blue-700" : "text-gray-900"}`}>{opt.label}</span>
                        <span className="hidden sm:block text-[11px] text-gray-500 mt-1 leading-snug">{opt.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STEP 2: Service (business only) */}
              {isBusiness && (
                <div>
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-xs font-bold text-blue-600">02</span>
                    <h2 className="text-sm font-semibold text-gray-900">ご興味のあるサービス <span className="font-normal text-gray-400">（任意）</span></h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {SERVICE_OPTIONS.map((opt) => {
                      const active = form.service === opt.value;
                      return (
                        <button key={opt.value} type="button"
                          onClick={() => selectService(active ? "" : opt.value)}
                          aria-pressed={active}
                          className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                            active ? "border-blue-600 bg-blue-600 text-white" : "border-gray-200 bg-white text-gray-700 hover:border-gray-400 hover:text-gray-900"
                          }`}>
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 3: Basic info */}
              <div>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-xs font-bold text-blue-600">{isBusiness ? "03" : "02"}</span>
                  <h2 className="text-sm font-semibold text-gray-900">ご連絡先</h2>
                </div>
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-gray-600 mb-1.5">
                        {isEngineer ? "お名前" : "ご担当者名"} <span className="text-red-500">*</span>
                      </label>
                      <input id="name" type="text" name="name" value={form.name} onChange={handleChange}
                        placeholder="山田 太郎" autoComplete="name"
                        aria-invalid={!!errors.name} className={inputClass("name")} />
                      {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-gray-600 mb-1.5">
                        メールアドレス <span className="text-red-500">*</span>
                      </label>
                      <input id="email" type="email" name="email" value={form.email} onChange={handleChange}
                        placeholder="info@example.com" autoComplete="email"
                        aria-invalid={!!errors.email} className={inputClass("email")} />
                      {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
                    </div>
                  </div>

                  {isBusiness && (
                    <div>
                      <label htmlFor="company" className="block text-xs font-semibold text-gray-600 mb-1.5">
                        会社名 <span className="text-red-500">*</span>
                      </label>
                      <input id="company" type="text" name="company" value={form.company} onChange={handleChange}
                        placeholder="株式会社〇〇" autoComplete="organization"
                        aria-invalid={!!errors.company} className={inputClass("company")} />
                      {errors.company && <p className="mt-1.5 text-xs text-red-500">{errors.company}</p>}
                    </div>
                  )}

                  {/* Engineer-specific required */}
                  {isEngineer && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="position" className="block text-xs font-semibold text-gray-600 mb-1.5">
                          希望ポジション <span className="text-red-500">*</span>
                        </label>
                        <select id="position" name="position" value={form.position} onChange={handleChange}
                          aria-invalid={!!errors.position} className={`${inputClass("position")} appearance-none cursor-pointer pr-10 bg-[url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2212%22%20height=%2212%22%20viewBox=%220%200%2012%2012%22%20fill=%22none%22%20stroke=%22%23999%22%20stroke-width=%221.5%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22><path%20d=%22M3%204.5L6%207.5L9%204.5%22/></svg>')] bg-no-repeat bg-[right_1rem_center]`}>
                          <option value="">選択してください</option>
                          <option value="フロントエンド">フロントエンド</option>
                          <option value="バックエンド">バックエンド</option>
                          <option value="フルスタック">フルスタック</option>
                          <option value="デザイナー">デザイナー</option>
                          <option value="インフラ・SRE">インフラ・SRE</option>
                          <option value="AI/ML">AI / ML</option>
                          <option value="その他">その他</option>
                        </select>
                        {errors.position && <p className="mt-1.5 text-xs text-red-500">{errors.position}</p>}
                      </div>
                      <div>
                        <label htmlFor="experience" className="block text-xs font-semibold text-gray-600 mb-1.5">経験年数 <span className="font-normal text-gray-400">（任意）</span></label>
                        <select id="experience" name="experience" value={form.experience} onChange={handleChange}
                          className={`${inputClass("experience")} appearance-none cursor-pointer pr-10 bg-[url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2212%22%20height=%2212%22%20viewBox=%220%200%2012%2012%22%20fill=%22none%22%20stroke=%22%23999%22%20stroke-width=%221.5%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22><path%20d=%22M3%204.5L6%207.5L9%204.5%22/></svg>')] bg-no-repeat bg-[right_1rem_center]`}>
                          <option value="">選択してください</option>
                          <option value="学生">学生</option>
                          <option value="1年未満">1年未満</option>
                          <option value="1-3年">1〜3年</option>
                          <option value="3-5年">3〜5年</option>
                          <option value="5-10年">5〜10年</option>
                          <option value="10年以上">10年以上</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Optional collapsible */}
                  {(isBusiness || isEngineer) && (
                    <div>
                      <button type="button" onClick={() => setShowOptional((v) => !v)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors">
                        <svg className={`w-3 h-3 transition-transform ${showOptional ? "rotate-180" : ""}`} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 4.5L6 7.5L9 4.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        {isBusiness ? "電話番号・従業員規模を追加" : "ポートフォリオURLを追加"}
                        <span className="font-normal text-gray-400">（任意）</span>
                      </button>
                      {showOptional && (
                        <div className="mt-4 pt-4 border-t border-gray-100 space-y-5">
                          {isBusiness && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                              <div>
                                <label htmlFor="phone" className="block text-xs font-semibold text-gray-600 mb-1.5">電話番号</label>
                                <input id="phone" type="tel" name="phone" value={form.phone} onChange={handleChange}
                                  placeholder="03-XXXX-XXXX" autoComplete="tel" className={inputClass("phone")} />
                                {errors.phone && <p className="mt-1.5 text-xs text-red-500">{errors.phone}</p>}
                              </div>
                              <div>
                                <label htmlFor="size" className="block text-xs font-semibold text-gray-600 mb-1.5">従業員規模</label>
                                <select id="size" name="size" value={form.size} onChange={handleChange}
                                  className={`${inputClass("size")} appearance-none cursor-pointer pr-10 bg-[url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2212%22%20height=%2212%22%20viewBox=%220%200%2012%2012%22%20fill=%22none%22%20stroke=%22%23999%22%20stroke-width=%221.5%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22><path%20d=%22M3%204.5L6%207.5L9%204.5%22/></svg>')] bg-no-repeat bg-[right_1rem_center]`}>
                                  <option value="">選択してください</option>
                                  <option value="~50名">〜50名</option>
                                  <option value="51-200名">51〜200名</option>
                                  <option value="201-500名">201〜500名</option>
                                  <option value="501-1000名">501〜1000名</option>
                                  <option value="1001名~">1001名〜</option>
                                </select>
                              </div>
                            </div>
                          )}
                          {isEngineer && (
                            <div>
                              <label htmlFor="portfolio" className="block text-xs font-semibold text-gray-600 mb-1.5">GitHub / ポートフォリオ URL</label>
                              <input id="portfolio" type="url" name="portfolio" value={form.portfolio} onChange={handleChange}
                                placeholder="https://github.com/your-id" autoComplete="url" className={inputClass("portfolio")} />
                              {errors.portfolio && <p className="mt-1.5 text-xs text-red-500">{errors.portfolio}</p>}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* STEP 4: Message */}
              <div>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-xs font-bold text-blue-600">{isBusiness ? "04" : "03"}</span>
                  <h2 className="text-sm font-semibold text-gray-900">
                    {isEngineer ? "自己紹介・志望動機" : "ご相談内容"}
                  </h2>
                </div>
                <textarea id="message" name="message" rows={5} value={form.message} onChange={handleChange}
                  placeholder={
                    isEngineer
                      ? "使用技術・得意分野・志望動機など、自由にご記入ください"
                      : form.service
                      ? `${SERVICE_LABELS[form.service as ServiceKey]}について、検討背景や聞きたいことをご記入ください`
                      : "ご質問やご相談内容をご記入ください（10文字以上）"
                  }
                  aria-invalid={!!errors.message}
                  className={`${inputClass("message")} resize-none min-h-[150px]`} />
                {errors.message && <p className="mt-1.5 text-xs text-red-500">{errors.message}</p>}
              </div>

              {/* Server error */}
              <div aria-live="polite">
                {serverError && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{serverError}</p>
                )}
              </div>

              {/* Submit */}
              <div className="pt-2 space-y-4">
                <button type="submit" disabled={status === "submitting"}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 text-white font-semibold px-10 py-4 hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 shadow-sm hover:shadow-md ${
                    status === "submitting" ? "opacity-60 cursor-not-allowed" : ""
                  }`}>
                  {status === "submitting" && (
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  )}
                  {status === "submitting" ? "送信中..." : "送信する"}
                  {status !== "submitting" && (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  )}
                </button>
                <p className="text-xs text-gray-500 leading-relaxed">
                  送信いただいた情報は、当社{" "}
                  <a href="/privacy" className="underline hover:text-gray-700">プライバシーポリシー</a>
                  {" "}に従い適切に管理します。
                </p>
              </div>
            </form>
          </Reveal>
        )}
      </section>

      {/* Mini info strip */}
      {status !== "success" && (
        <section className="max-w-3xl mx-auto px-6 pb-24">
          <Reveal>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-gray-200 rounded-2xl overflow-hidden">
              {[
                { label: "返信目安", value: "2営業日以内" },
                { label: "対応方法", value: "メール / オンライン" },
                { label: "営業時間", value: "平日 9:00–18:00" },
                { label: "直接連絡", value: "t.kante@clearai.jp" },
              ].map((item) => (
                <div key={item.label} className="bg-white p-4 text-center">
                  <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase mb-1">{item.label}</p>
                  <p className="text-xs font-semibold text-gray-900 break-all">{item.value}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>
      )}
    </main>
  );
}

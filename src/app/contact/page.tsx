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
    headerDesc: "2営業日以内にご返信します。お急ぎの方は",
    headerDescEmail: "まで直接ご連絡ください。",
    // Success screen
    successTitle: "送信ありがとうございます",
    successBody: "担当者より2営業日以内にご連絡いたします。確認用メールが届かない場合は迷惑メールフォルダもご確認ください。",
    successReset: "もう一件送る",
    // Step labels
    step1Title: "お問い合わせ種別",
    step2Title: "ご興味のあるサービス",
    step2Optional: "（任意）",
    step3Title: "ご連絡先",
    step4TitleBusiness: "ご相談内容",
    step4TitleEngineer: "自己紹介・志望動機",
    // Inquiry type options
    inquiryBusiness: "サービス相談",
    inquiryBusinessDesc: "AI導入・顧問・研修・農業など",
    inquiryEngineer: "エンジニア採用",
    inquiryEngineerDesc: "チームに参加したい方",
    inquiryOther: "その他",
    inquiryOtherDesc: "取材・提携など",
    // Service option labels
    serviceConsulting: "AIコンサル・DX",
    serviceAdvisor: "AI顧問",
    serviceEducation: "AI研修",
    serviceSubsidy: "補助金サポート",
    serviceClaudeCode: "Claude特化",
    serviceAdvertising: "AI広告運用",
    serviceWebsite: "ウェブサイト作成",
    serviceSns: "SNS運用代行",
    serviceAgriculture: "農業×AI",
    serviceCeo: "経営者向けAI活用",
    serviceRobotRental: "ロボットレンタル",
    // Field labels
    labelName: "ご担当者名",
    labelNameEngineer: "お名前",
    labelRequired: "*",
    labelEmail: "メールアドレス",
    labelCompany: "会社名",
    labelPosition: "希望ポジション",
    labelExperience: "経験年数",
    labelOptional: "（任意）",
    labelPhone: "電話番号",
    labelSize: "従業員規模",
    labelPortfolio: "GitHub / ポートフォリオ URL",
    // Placeholders
    placeholderName: "山田 太郎",
    placeholderEmail: "info@example.com",
    placeholderCompany: "株式会社〇〇",
    placeholderPhone: "03-XXXX-XXXX",
    placeholderPortfolioUrl: "https://github.com/your-id",
    // Optional section toggles
    optionalToggleBusiness: "電話番号・従業員規模を追加",
    optionalToggleEngineer: "ポートフォリオURLを追加",
    // Select defaults
    selectDefault: "選択してください",
    // Position options
    positionFrontend: "フロントエンド",
    positionBackend: "バックエンド",
    positionFullstack: "フルスタック",
    positionDesigner: "デザイナー",
    positionInfra: "インフラ・SRE",
    positionAiMl: "AI / ML",
    positionOther: "その他",
    // Experience options
    experienceStudent: "学生",
    experienceLt1: "1年未満",
    experience1to3: "1〜3年",
    experience3to5: "3〜5年",
    experience5to10: "5〜10年",
    experienceGt10: "10年以上",
    // Size options
    sizeLt50: "〜50名",
    size51to200: "51〜200名",
    size201to500: "201〜500名",
    size501to1000: "501〜1000名",
    sizeGt1000: "1001名〜",
    // Message placeholders
    messagePlaceholderEngineer: "使用技術・得意分野・志望動機など、自由にご記入ください",
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
    serverError: "通信エラーが発生しました。時間をおいて再度お試しください。",
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
    headerDesc: "We reply within 2 business days. For urgent matters, email",
    headerDescEmail: "directly.",
    // Success screen
    successTitle: "Message sent — thank you.",
    successBody: "A member of our team will be in touch within 2 business days. If you don't receive a confirmation email, please check your spam folder.",
    successReset: "Send another message",
    // Step labels
    step1Title: "Inquiry type",
    step2Title: "Service of interest",
    step2Optional: "(optional)",
    step3Title: "Contact details",
    step4TitleBusiness: "Inquiry details",
    step4TitleEngineer: "Introduction & motivation",
    // Inquiry type options
    inquiryBusiness: "Service inquiry",
    inquiryBusinessDesc: "AI adoption, advisory, training, etc.",
    inquiryEngineer: "Engineering roles",
    inquiryEngineerDesc: "Join our team",
    inquiryOther: "Other",
    inquiryOtherDesc: "Press, partnerships, etc.",
    // Service option labels
    serviceConsulting: "AI Consulting & DX",
    serviceAdvisor: "AI Advisory",
    serviceEducation: "AI Training",
    serviceSubsidy: "Subsidy Support",
    serviceClaudeCode: "Claude-Focused",
    serviceAdvertising: "AI Ad Operations",
    serviceWebsite: "Website Creation",
    serviceSns: "SNS Management",
    serviceAgriculture: "Agriculture × AI",
    serviceCeo: "AI for Executives",
    serviceRobotRental: "Robot Rental",
    // Field labels
    labelName: "Contact person",
    labelNameEngineer: "Full name",
    labelRequired: "*",
    labelEmail: "Email address",
    labelCompany: "Company name",
    labelPosition: "Desired position",
    labelExperience: "Years of experience",
    labelOptional: "(optional)",
    labelPhone: "Phone number",
    labelSize: "Company size",
    labelPortfolio: "GitHub / Portfolio URL",
    // Placeholders
    placeholderName: "Jane Smith",
    placeholderEmail: "info@example.com",
    placeholderCompany: "Acme Inc.",
    placeholderPhone: "+81-3-XXXX-XXXX",
    placeholderPortfolioUrl: "https://github.com/your-id",
    // Optional section toggles
    optionalToggleBusiness: "Add phone & company size",
    optionalToggleEngineer: "Add portfolio URL",
    // Select defaults
    selectDefault: "Please select",
    // Position options
    positionFrontend: "Frontend",
    positionBackend: "Backend",
    positionFullstack: "Full-stack",
    positionDesigner: "Designer",
    positionInfra: "Infrastructure / SRE",
    positionAiMl: "AI / ML",
    positionOther: "Other",
    // Experience options
    experienceStudent: "Student",
    experienceLt1: "Less than 1 year",
    experience1to3: "1–3 years",
    experience3to5: "3–5 years",
    experience5to10: "5–10 years",
    experienceGt10: "10+ years",
    // Size options
    sizeLt50: "Up to 50",
    size51to200: "51–200",
    size201to500: "201–500",
    size501to1000: "501–1,000",
    sizeGt1000: "1,001+",
    // Message placeholders
    messagePlaceholderEngineer: "Tell us about your tech stack, strengths, and why you want to join clearAI.",
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
    serverError: "A network error occurred. Please wait a moment and try again.",
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
type InquiryType = "business" | "engineer" | "other";

// Extended service key that includes robot-rental (not in validators SERVICE_KEYS)
type ExtendedServiceKey = ServiceKey | "robot-rental" | "sns";

const INQUIRY_ICONS: Record<InquiryType, ReactNode> = {
  business: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /><path d="M12 8v4l2.5 2.5" />
    </svg>
  ),
  engineer: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m8 4 8 16M4 8l4 4-4 4M20 8l-4 4 4 4" />
    </svg>
  ),
  other: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
    </svg>
  ),
};

const INQUIRY_TYPE_KEYS: InquiryType[] = ["business", "engineer", "other"];
const SERVICE_OPTION_KEYS: ExtendedServiceKey[] = [
  "consulting", "advisor", "education", "subsidy", "claude-code",
  "advertising", "website", "sns", "agriculture", "ceo", "robot-rental",
];

// Extended SERVICE_KEYS including robot-rental and sns for query-param handling
const EXTENDED_SERVICE_KEYS: readonly string[] = [...(SERVICE_KEYS as readonly string[]), "robot-rental", "sns"];

const EMPTY_FORM = {
  inquiryType: "business" as InquiryType,
  service: "" as ExtendedServiceKey | "",
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
  const [showOptional, setShowOptional] = useState(false);

  useEffect(() => {
    const serviceParam = searchParams.get("service");
    if (serviceParam && EXTENDED_SERVICE_KEYS.includes(serviceParam)) {
      setForm((prev) => ({ ...prev, inquiryType: "business", service: serviceParam as ExtendedServiceKey }));
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
    setShowOptional(false);
    const serviceParam = searchParams.get("service");
    if (serviceParam && EXTENDED_SERVICE_KEYS.includes(serviceParam)) {
      setForm((prev) => ({ ...prev, service: serviceParam as ExtendedServiceKey }));
    }
  };

  const inputClass = (field: string) =>
    `w-full rounded-xl border bg-white px-4 py-3.5 text-base text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 ${
      errors[field] ? "border-red-300 bg-red-50/30" : "border-gray-200 hover:border-gray-300"
    }`;

  const selectInquiry = (type: InquiryType) => {
    setForm({ ...form, inquiryType: type, service: type === "business" ? form.service : "" });
    setErrors({});
  };

  const selectService = (s: ExtendedServiceKey | "") => setForm({ ...form, service: s });

  const isBusiness = form.inquiryType === "business";
  const isEngineer = form.inquiryType === "engineer";

  // Service label lookup including robot-rental
  const getServiceLabel = (key: ExtendedServiceKey): string => {
    const labelMap: Record<ExtendedServiceKey, string> = {
      consulting: t.serviceConsulting,
      advisor: t.serviceAdvisor,
      education: t.serviceEducation,
      subsidy: t.serviceSubsidy,
      "claude-code": t.serviceClaudeCode,
      advertising: t.serviceAdvertising,
      website: t.serviceWebsite,
      sns: t.serviceSns,
      agriculture: t.serviceAgriculture,
      ceo: t.serviceCeo,
      "robot-rental": t.serviceRobotRental,
    };
    return labelMap[key] ?? key;
  };

  // Message placeholder — uses SERVICE_LABELS for known keys, falls back to t.serviceRobotRental
  const getMessagePlaceholder = (): string => {
    if (isEngineer) return t.messagePlaceholderEngineer;
    if (form.service) {
      const label = (SERVICE_LABELS as Record<string, string>)[form.service] ?? getServiceLabel(form.service as ExtendedServiceKey);
      return `${label}${t.messagePlaceholderService}`;
    }
    return t.messagePlaceholderDefault;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50/50 to-white">
      {/* Header */}
      <section className="max-w-3xl mx-auto px-6 pt-32 lg:pt-40 pb-10 lg:pb-12 text-center">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.2em] text-blue-600 uppercase mb-4">{t.headerKicker}</p>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{t.headerTitle}</h1>
          <p className="text-sm lg:text-base text-gray-600 leading-relaxed max-w-xl mx-auto">
            {t.headerDesc}{" "}
            <a href="mailto:info@clearai.jp" className="text-blue-600 underline underline-offset-2">info@clearai.jp</a>{" "}
            {t.headerDescEmail}
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
              <h2 className="text-xl font-bold text-gray-900 mb-3">{t.successTitle}</h2>
              <p className="text-sm text-gray-600 leading-relaxed max-w-md mx-auto mb-8">
                {t.successBody}
              </p>
              <button type="button" onClick={handleReset}
                className="rounded-lg border border-gray-300 text-gray-700 font-semibold px-6 py-3 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
                {t.successReset}
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
                  <h2 className="text-sm font-semibold text-gray-900">{t.step1Title}</h2>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {INQUIRY_TYPE_KEYS.map((key) => {
                    const active = form.inquiryType === key;
                    const labelKey = key === "business" ? "inquiryBusiness" : key === "engineer" ? "inquiryEngineer" : "inquiryOther";
                    const descKey = key === "business" ? "inquiryBusinessDesc" : key === "engineer" ? "inquiryEngineerDesc" : "inquiryOtherDesc";
                    return (
                      <button key={key} type="button" onClick={() => selectInquiry(key)}
                        aria-pressed={active}
                        className={`text-center rounded-2xl border px-3 py-4 sm:py-5 transition-all duration-200 ${
                          active ? "border-blue-600 bg-blue-50/70 ring-2 ring-blue-600/20" : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50"
                        }`}>
                        <div className={`mx-auto mb-2 w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                          active ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500"
                        }`}>{INQUIRY_ICONS[key]}</div>
                        <span className={`block text-xs sm:text-sm font-bold ${active ? "text-blue-700" : "text-gray-900"}`}>{t[labelKey]}</span>
                        <span className="hidden sm:block text-[11px] text-gray-500 mt-1 leading-snug">{t[descKey]}</span>
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
                    <h2 className="text-sm font-semibold text-gray-900">{t.step2Title} <span className="font-normal text-gray-400">{t.step2Optional}</span></h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {SERVICE_OPTION_KEYS.map((key) => {
                      const active = form.service === key;
                      return (
                        <button key={key} type="button"
                          onClick={() => selectService(active ? "" : key)}
                          aria-pressed={active}
                          className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                            active ? "border-blue-600 bg-blue-600 text-white" : "border-gray-200 bg-white text-gray-700 hover:border-gray-400 hover:text-gray-900"
                          }`}>
                          {getServiceLabel(key)}
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
                  <h2 className="text-sm font-semibold text-gray-900">{t.step3Title}</h2>
                </div>
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-gray-600 mb-1.5">
                        {isEngineer ? t.labelNameEngineer : t.labelName} <span className="text-red-500">{t.labelRequired}</span>
                      </label>
                      <input id="name" type="text" name="name" value={form.name} onChange={handleChange}
                        placeholder={t.placeholderName} autoComplete="name"
                        aria-invalid={!!errors.name} className={inputClass("name")} />
                      {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-gray-600 mb-1.5">
                        {t.labelEmail} <span className="text-red-500">{t.labelRequired}</span>
                      </label>
                      <input id="email" type="email" name="email" value={form.email} onChange={handleChange}
                        placeholder={t.placeholderEmail} autoComplete="email"
                        aria-invalid={!!errors.email} className={inputClass("email")} />
                      {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
                    </div>
                  </div>

                  {isBusiness && (
                    <div>
                      <label htmlFor="company" className="block text-xs font-semibold text-gray-600 mb-1.5">
                        {t.labelCompany} <span className="text-red-500">{t.labelRequired}</span>
                      </label>
                      <input id="company" type="text" name="company" value={form.company} onChange={handleChange}
                        placeholder={t.placeholderCompany} autoComplete="organization"
                        aria-invalid={!!errors.company} className={inputClass("company")} />
                      {errors.company && <p className="mt-1.5 text-xs text-red-500">{errors.company}</p>}
                    </div>
                  )}

                  {/* Engineer-specific required */}
                  {isEngineer && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="position" className="block text-xs font-semibold text-gray-600 mb-1.5">
                          {t.labelPosition} <span className="text-red-500">{t.labelRequired}</span>
                        </label>
                        <select id="position" name="position" value={form.position} onChange={handleChange}
                          aria-invalid={!!errors.position} className={`${inputClass("position")} appearance-none cursor-pointer pr-10 bg-[url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2212%22%20height=%2212%22%20viewBox=%220%200%2012%2012%22%20fill=%22none%22%20stroke=%22%23999%22%20stroke-width=%221.5%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22><path%20d=%22M3%204.5L6%207.5L9%204.5%22/></svg>')] bg-no-repeat bg-[right_1rem_center]`}>
                          <option value="">{t.selectDefault}</option>
                          <option value="フロントエンド">{t.positionFrontend}</option>
                          <option value="バックエンド">{t.positionBackend}</option>
                          <option value="フルスタック">{t.positionFullstack}</option>
                          <option value="デザイナー">{t.positionDesigner}</option>
                          <option value="インフラ・SRE">{t.positionInfra}</option>
                          <option value="AI/ML">{t.positionAiMl}</option>
                          <option value="その他">{t.positionOther}</option>
                        </select>
                        {errors.position && <p className="mt-1.5 text-xs text-red-500">{errors.position}</p>}
                      </div>
                      <div>
                        <label htmlFor="experience" className="block text-xs font-semibold text-gray-600 mb-1.5">{t.labelExperience} <span className="font-normal text-gray-400">{t.labelOptional}</span></label>
                        <select id="experience" name="experience" value={form.experience} onChange={handleChange}
                          className={`${inputClass("experience")} appearance-none cursor-pointer pr-10 bg-[url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2212%22%20height=%2212%22%20viewBox=%220%200%2012%2012%22%20fill=%22none%22%20stroke=%22%23999%22%20stroke-width=%221.5%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22><path%20d=%22M3%204.5L6%207.5L9%204.5%22/></svg>')] bg-no-repeat bg-[right_1rem_center]`}>
                          <option value="">{t.selectDefault}</option>
                          <option value="学生">{t.experienceStudent}</option>
                          <option value="1年未満">{t.experienceLt1}</option>
                          <option value="1-3年">{t.experience1to3}</option>
                          <option value="3-5年">{t.experience3to5}</option>
                          <option value="5-10年">{t.experience5to10}</option>
                          <option value="10年以上">{t.experienceGt10}</option>
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
                        {isBusiness ? t.optionalToggleBusiness : t.optionalToggleEngineer}
                        <span className="font-normal text-gray-400">{t.labelOptional}</span>
                      </button>
                      {showOptional && (
                        <div className="mt-4 pt-4 border-t border-gray-100 space-y-5">
                          {isBusiness && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                              <div>
                                <label htmlFor="phone" className="block text-xs font-semibold text-gray-600 mb-1.5">{t.labelPhone}</label>
                                <input id="phone" type="tel" name="phone" value={form.phone} onChange={handleChange}
                                  placeholder={t.placeholderPhone} autoComplete="tel" className={inputClass("phone")} />
                                {errors.phone && <p className="mt-1.5 text-xs text-red-500">{errors.phone}</p>}
                              </div>
                              <div>
                                <label htmlFor="size" className="block text-xs font-semibold text-gray-600 mb-1.5">{t.labelSize}</label>
                                <select id="size" name="size" value={form.size} onChange={handleChange}
                                  className={`${inputClass("size")} appearance-none cursor-pointer pr-10 bg-[url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2212%22%20height=%2212%22%20viewBox=%220%200%2012%2012%22%20fill=%22none%22%20stroke=%22%23999%22%20stroke-width=%221.5%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22><path%20d=%22M3%204.5L6%207.5L9%204.5%22/></svg>')] bg-no-repeat bg-[right_1rem_center]`}>
                                  <option value="">{t.selectDefault}</option>
                                  <option value="~50名">{t.sizeLt50}</option>
                                  <option value="51-200名">{t.size51to200}</option>
                                  <option value="201-500名">{t.size201to500}</option>
                                  <option value="501-1000名">{t.size501to1000}</option>
                                  <option value="1001名~">{t.sizeGt1000}</option>
                                </select>
                              </div>
                            </div>
                          )}
                          {isEngineer && (
                            <div>
                              <label htmlFor="portfolio" className="block text-xs font-semibold text-gray-600 mb-1.5">{t.labelPortfolio}</label>
                              <input id="portfolio" type="url" name="portfolio" value={form.portfolio} onChange={handleChange}
                                placeholder={t.placeholderPortfolioUrl} autoComplete="url" className={inputClass("portfolio")} />
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
                    {isEngineer ? t.step4TitleEngineer : t.step4TitleBusiness}
                  </h2>
                </div>
                <textarea id="message" name="message" rows={5} value={form.message} onChange={handleChange}
                  placeholder={getMessagePlaceholder()}
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
                  {status === "submitting" ? t.submitSending : t.submitButton}
                  {status !== "submitting" && (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  )}
                </button>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {t.privacyPrefix}{" "}
                  <a href="/privacy" className="underline hover:text-gray-700">{t.privacyLink}</a>
                  {t.privacySuffix}
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
                { label: t.infoReplyLabel, value: t.infoReplyValue },
                { label: t.infoMethodLabel, value: t.infoMethodValue },
                { label: t.infoHoursLabel, value: t.infoHoursValue },
                { label: t.infoDirectLabel, value: t.infoDirectValue },
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

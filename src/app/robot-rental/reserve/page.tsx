"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

// 予約受付開始日。これより前は入力はできるが確定（送信）はできない。
const BOOKING_OPEN_DATE = "2026-08-01"; // JST

type Copy = {
  kicker: string;
  title: string;
  subtitle: string;
  notOpenNotice: (d: string) => string;
  openNotice: string;
  selectedLabel: string;
  step1: string;
  step2: string;
  company: string;
  companyPh: string;
  name: string;
  namePh: string;
  email: string;
  emailPh: string;
  phone: string;
  phonePh: string;
  postal: string;
  postalPh: string;
  address: string;
  addressPh: string;
  optional: string;
  required: string;
  next: string;
  back: string;
  startDate: string;
  days: string;
  daysUnit: string;
  notes: string;
  notesPh: string;
  dateHint: (d: string) => string;
  submit: string;
  submitClosed: string;
  sending: string;
  thanksTitle: string;
  thanksBody: string;
  backToList: string;
  errName: string;
  errEmail: string;
  errAddress: string;
  errDate: string;
  errDateRange: (d: string) => string;
  sendError: string;
};

const COPY: Record<"ja" | "en", Copy> = {
  ja: {
    kicker: "Robot Rental / Reservation",
    title: "レンタル予約",
    subtitle: "ご利用者情報とご利用先をご入力いただいたのち、ご希望の日程をお選びください。",
    notOpenNotice: (d) =>
      `ご予約の受付は ${d} から開始します（それまでは事前のご入力のみ可能です）。`,
    openNotice: "ご予約を受け付けていますので、内容をご確認のうえお進みください。",
    selectedLabel: "ご選択中の機体",
    step1: "ご利用者情報・ご利用先",
    step2: "ご利用日程",
    company: "会社名・団体名",
    companyPh: "株式会社clearAI",
    name: "お名前",
    namePh: "山田 太郎",
    email: "メールアドレス",
    emailPh: "you@example.com",
    phone: "電話番号",
    phonePh: "090-1234-5678",
    postal: "郵便番号",
    postalPh: "310-0001",
    address: "ご利用先住所",
    addressPh: "茨城県水戸市〇〇 1-2-3 ◯◯ビル",
    optional: "任意",
    required: "必須",
    next: "次へ：日程の選択",
    back: "戻る",
    startDate: "ご利用開始日",
    days: "ご利用日数",
    daysUnit: "日間",
    notes: "ご要望・ご連絡事項",
    notesPh: "用途、設置環境、帯同オペレーターの要否など",
    dateHint: (d) => `※ ご利用開始日は ${d} 以降でお選びいただけます。`,
    submit: "この内容で予約をリクエストする",
    submitClosed: "8月1日 予約受付開始",
    sending: "送信中…",
    thanksTitle: "予約リクエストを受け付けました",
    thanksBody:
      "担当より折り返しご連絡いたします（控えはご入力のメールアドレス宛にお送りします）。",
    backToList: "ロボット一覧に戻る",
    errName: "お名前をご入力ください。",
    errEmail: "有効なメールアドレスをご入力ください。",
    errAddress: "ご利用先住所をご入力ください。",
    errDate: "ご利用開始日をお選びください。",
    errDateRange: (d) => `ご利用開始日は ${d} 以降でお選びください。`,
    sendError: "送信に失敗しました。時間をおいて再度お試しください。",
  },
  en: {
    kicker: "Robot Rental / Reservation",
    title: "Rental Reservation",
    subtitle:
      "Enter your details and rental location, then choose your preferred dates.",
    notOpenNotice: (d) =>
      `Reservations open on ${d}; you may pre-fill this form until then, but bookings cannot be confirmed.`,
    openNotice: "Reservations are open — please review your details and proceed.",
    selectedLabel: "Selected unit",
    step1: "Your details & location",
    step2: "Rental dates",
    company: "Company / Organization",
    companyPh: "clearAI Inc.",
    name: "Name",
    namePh: "Taro Yamada",
    email: "Email",
    emailPh: "you@example.com",
    phone: "Phone",
    phonePh: "+81 90-1234-5678",
    postal: "Postal code",
    postalPh: "310-0001",
    address: "Rental location address",
    addressPh: "1-2-3 ..., Mito, Ibaraki",
    optional: "Optional",
    required: "Required",
    next: "Next: choose dates",
    back: "Back",
    startDate: "Start date",
    days: "Number of days",
    daysUnit: "days",
    notes: "Notes",
    notesPh: "Use case, site environment, operator needs, etc.",
    dateHint: (d) => `Start date can be selected from ${d} onward.`,
    submit: "Request this reservation",
    submitClosed: "Opens Aug 1",
    sending: "Sending…",
    thanksTitle: "Your reservation request has been received",
    thanksBody:
      "Our team will get back to you shortly, and a confirmation copy will be sent to the email you provided.",
    backToList: "Back to robot list",
    errName: "Please enter your name.",
    errEmail: "Please enter a valid email address.",
    errAddress: "Please enter the rental location address.",
    errDate: "Please choose a start date.",
    errDateRange: (d) => `Start date must be on or after ${d}.`,
    sendError: "Failed to send. Please try again later.",
  },
};

function Field({
  label,
  badge,
  children,
  error,
}: {
  label: string;
  badge?: string;
  children: ReactNode;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-1.5">
        {label}
        {badge && (
          <span className="text-[10px] font-bold tracking-wide text-gray-400 border border-gray-200 rounded px-1.5 py-0.5">
            {badge}
          </span>
        )}
      </span>
      {children}
      {error && <span className="block text-xs text-red-600 mt-1">{error}</span>}
    </label>
  );
}

const inputCls =
  "w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-colors";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function RobotReservePage() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<{ maker: string; robot: string; price: string; unit: string }>({
    maker: "",
    robot: "",
    price: "",
    unit: "",
  });

  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    postal: "",
    address: "",
    startDate: "",
    days: "1",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  // 日付・クエリはマウント後に確定（ビルド時固定を避ける）
  useEffect(() => {
    setMounted(true);
    const open = new Date() >= new Date(`${BOOKING_OPEN_DATE}T00:00:00+09:00`);
    setIsOpen(open);
    const q = new URLSearchParams(window.location.search);
    setSelected({
      maker: q.get("maker") ?? "",
      robot: q.get("robot") ?? "",
      price: q.get("price") ?? "",
      unit: q.get("unit") ?? "",
    });
  }, []);

  // タイムゾーン非依存に固定日付文字列から整形（SSR=UTCとクライアント=JSTの不一致を防ぐ）
  const openDateLabel = useMemo(() => {
    const [y, m, d] = BOOKING_OPEN_DATE.split("-").map(Number);
    if (lang === "ja") return `${y}年${m}月${d}日`;
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    return `${months[m - 1]} ${d}, ${y}`;
  }, [lang]);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = t.errName;
    if (!isValidEmail(form.email.trim())) e.email = t.errEmail;
    if (!form.address.trim()) e.address = t.errAddress;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goNext = () => {
    if (validateStep1()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const submit = async () => {
    const e: Record<string, string> = {};
    if (!form.startDate) e.startDate = t.errDate;
    else if (form.startDate < BOOKING_OPEN_DATE) e.startDate = t.errDateRange(openDateLabel);
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    if (!isOpen) return; // 8月までは確定不可

    setStatus("sending");
    const message = [
      `【ロボットレンタル予約リクエスト】`,
      `機体: ${selected.maker ? selected.maker + " / " : ""}${selected.robot}`,
      selected.price ? `料金: ${selected.price} ${selected.unit}` : "",
      `ご利用開始日: ${form.startDate}`,
      `ご利用日数: ${form.days} ${t.daysUnit}`,
      `郵便番号: ${form.postal || "-"}`,
      `ご利用先住所: ${form.address}`,
      `電話: ${form.phone || "-"}`,
      form.notes ? `ご要望: ${form.notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inquiryType: "business",
          service: "robot-rental",
          company: form.company,
          name: form.name,
          email: form.email,
          phone: form.phone,
          message,
        }),
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("done");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <section className="pt-24 pb-24 lg:pt-28 bg-white min-h-[70vh]">
        <div className="max-w-xl mx-auto px-6 text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-900 text-white text-2xl">
            ✓
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">{t.thanksTitle}</h1>
          <p className="text-sm text-gray-600 leading-relaxed mb-8">{t.thanksBody}</p>
          <a
            href="/robot-rental"
            className="inline-block rounded-lg border border-gray-300 text-gray-700 font-semibold px-6 py-3 hover:border-gray-500 hover:text-gray-900 transition-colors"
          >
            {t.backToList}
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-24 pb-20 lg:pt-28 bg-white">
      <div className="max-w-xl mx-auto px-6">
        <p className="text-sm font-semibold text-neutral-900 mb-2">{t.kicker}</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{t.title}</h1>
        <p className="text-sm text-gray-600 leading-relaxed mb-6">{t.subtitle}</p>

        {/* 受付開始の告知 */}
        <div
          className={`rounded-lg border px-4 py-3 mb-6 text-sm ${
            mounted && isOpen
              ? "border-gray-200 bg-gray-50 text-gray-700"
              : "border-neutral-900 bg-neutral-900 text-white"
          }`}
        >
          {mounted && isOpen ? t.openNotice : t.notOpenNotice(openDateLabel)}
        </div>

        {/* 選択中の機体 */}
        {selected.robot && (
          <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 mb-8">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
              {t.selectedLabel}
            </p>
            <div className="flex items-baseline justify-between gap-3 flex-wrap">
              <p className="text-base font-bold text-gray-900">
                {selected.maker && <span className="text-gray-500 font-semibold">{selected.maker} / </span>}
                {selected.robot}
              </p>
              {selected.price && (
                <p className="text-sm font-bold text-gray-900">
                  {selected.price} <span className="text-xs font-normal text-gray-500">{selected.unit}</span>
                </p>
              )}
            </div>
          </div>
        )}

        {/* ステップ表示 */}
        <div className="flex items-center gap-2 mb-6 text-xs font-semibold">
          <span className={step === 1 ? "text-neutral-900" : "text-gray-400"}>1. {t.step1}</span>
          <span className="text-gray-300">—</span>
          <span className={step === 2 ? "text-neutral-900" : "text-gray-400"}>2. {t.step2}</span>
        </div>

        {step === 1 ? (
          <div className="space-y-5">
            <Field label={t.company} badge={t.optional}>
              <input className={inputCls} value={form.company} placeholder={t.companyPh} onChange={(e) => set("company", e.target.value)} />
            </Field>
            <Field label={t.name} badge={t.required} error={errors.name}>
              <input className={inputCls} value={form.name} placeholder={t.namePh} onChange={(e) => set("name", e.target.value)} />
            </Field>
            <Field label={t.email} badge={t.required} error={errors.email}>
              <input type="email" className={inputCls} value={form.email} placeholder={t.emailPh} onChange={(e) => set("email", e.target.value)} />
            </Field>
            <Field label={t.phone} badge={t.optional}>
              <input type="tel" className={inputCls} value={form.phone} placeholder={t.phonePh} onChange={(e) => set("phone", e.target.value)} />
            </Field>
            <Field label={t.postal} badge={t.optional}>
              <input className={inputCls} value={form.postal} placeholder={t.postalPh} onChange={(e) => set("postal", e.target.value)} />
            </Field>
            <Field label={t.address} badge={t.required} error={errors.address}>
              <input className={inputCls} value={form.address} placeholder={t.addressPh} onChange={(e) => set("address", e.target.value)} />
            </Field>
            <button
              type="button"
              onClick={goNext}
              className="w-full rounded-lg bg-neutral-900 text-white font-semibold py-3 hover:bg-neutral-800 transition-colors"
            >
              {t.next}
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            <Field label={t.startDate} badge={t.required} error={errors.startDate}>
              <input
                type="date"
                className={inputCls}
                value={form.startDate}
                min={BOOKING_OPEN_DATE}
                onChange={(e) => set("startDate", e.target.value)}
              />
              <span className="block text-xs text-gray-500 mt-1">{t.dateHint(openDateLabel)}</span>
            </Field>
            <Field label={t.days} badge={t.optional}>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  className={`${inputCls} max-w-[120px]`}
                  value={form.days}
                  onChange={(e) => set("days", e.target.value)}
                />
                <span className="text-sm text-gray-500">{t.daysUnit}</span>
              </div>
            </Field>
            <Field label={t.notes} badge={t.optional}>
              <textarea rows={4} className={inputCls} value={form.notes} placeholder={t.notesPh} onChange={(e) => set("notes", e.target.value)} />
            </Field>

            {status === "error" && <p className="text-sm text-red-600">{t.sendError}</p>}

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="rounded-lg border border-gray-300 text-gray-700 font-semibold px-5 py-3 hover:border-gray-500 transition-colors"
              >
                {t.back}
              </button>
              <button
                type="button"
                onClick={submit}
                disabled={!mounted || !isOpen || status === "sending"}
                className="flex-1 rounded-lg bg-neutral-900 text-white font-semibold py-3 hover:bg-neutral-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {status === "sending" ? t.sending : !isOpen ? t.submitClosed : t.submit}
              </button>
            </div>
            {mounted && !isOpen && (
              <p className="text-xs text-gray-500 text-center">{t.notOpenNotice(openDateLabel)}</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

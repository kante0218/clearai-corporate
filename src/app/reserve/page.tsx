"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

// Fallback: the original Google appointment scheduler, used only when the
// self-hosted booking API isn't configured yet (env vars missing).
const BOOKING_EMBED =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2AjAEDjZC29o7AeG-sI8jZ7ClXXwG-KPlTcCthkUpwzE-UKuZUu5oHcRe59MV79iEDerNb4ijV?gv=true";
const BOOKING_LINK = "https://calendar.app.google/zw3n45jzmxzWw2oC8";

interface DayAvailability {
  date: string; // YYYY-MM-DD
  weekday: number;
  slots: string[];
}
interface AvailabilityResult {
  configured: boolean;
  timezone: string;
  slotMinutes: number;
  days: DayAvailability[];
}

const COPY = {
  ja: {
    kicker: "Free Consultation",
    title: "無料相談を予約する",
    desc: "ご都合の日時を選ぶだけで、30分のオンライン相談でAI活用の進め方をご提案します（強引な営業は一切ありません）。",
    points: [
      { label: "30分", sub: "オンライン面談" },
      { label: "無料", sub: "事前準備不要" },
      { label: "Google Meet", sub: "リンク自動発行" },
    ],
    loading: "空き状況を読み込んでいます…",
    pickDate: "日付を選択",
    pickTime: "時間を選択",
    noTimePrompt: "左のカレンダーから日付をお選びください。",
    noSlots: "この日に空きはありません。",
    weekdays: ["日", "月", "火", "水", "木", "金", "土"],
    monthLabel: (y: number, m: number) => `${y}年${m}月`,
    selected: "選択中",
    formTitle: "ご連絡先を入力",
    name: "お名前",
    email: "メールアドレス",
    company: "会社名",
    note: "ご相談内容",
    required: "*",
    optional: "（任意）",
    namePh: "山田 太郎",
    emailPh: "info@example.com",
    companyPh: "株式会社〇〇",
    notePh: "ご相談されたい内容を簡単にご記入ください（任意）",
    submit: "この日時で予約する",
    submitting: "予約しています…",
    back: "日時を選び直す",
    successTitle: "ご予約ありがとうございます",
    successBody: "確認メールをお送りしましたので、当日はGoogle Meetでお会いしましょう。",
    successWhen: "ご予約日時",
    meetLabel: "Google Meet リンク",
    errSlotTaken: "その枠は直前に埋まりましたので、別の時間をお選びください。",
    errServer: "通信エラーが発生しましたので、時間をおいて再度お試しください。",
    privacyPrefix: "送信いただいた情報は、当社",
    privacyLink: "プライバシーポリシー",
    privacySuffix: "に従い適切に管理します。",
    fallbackLead: "カレンダーが表示されない場合は",
    fallbackLink: "こちらから別タブで予約",
  },
  en: {
    kicker: "Free Consultation",
    title: "Book a free consultation",
    desc: "Pick a time that works for you and we'll show you in a 30-minute online session how AI can fit your business — no pushy sales, ever.",
    points: [
      { label: "30 min", sub: "Online meeting" },
      { label: "Free", sub: "No prep needed" },
      { label: "Google Meet", sub: "Link auto-issued" },
    ],
    loading: "Loading availability…",
    pickDate: "Select a date",
    pickTime: "Select a time",
    noTimePrompt: "Please choose a date from the calendar.",
    noSlots: "No openings on this day.",
    weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    monthLabel: (y: number, m: number) => `${y}/${String(m).padStart(2, "0")}`,
    selected: "Selected",
    formTitle: "Your contact details",
    name: "Full name",
    email: "Email address",
    company: "Company",
    note: "Message",
    required: "*",
    optional: "(optional)",
    namePh: "Jane Smith",
    emailPh: "info@example.com",
    companyPh: "Acme Inc.",
    notePh: "Briefly tell us what you'd like to discuss (optional)",
    submit: "Confirm this time",
    submitting: "Booking…",
    back: "Pick a different time",
    successTitle: "Your booking is confirmed",
    successBody: "We've emailed you a confirmation — see you on Google Meet.",
    successWhen: "Your appointment",
    meetLabel: "Google Meet link",
    errSlotTaken: "That slot was just taken — please choose another time.",
    errServer: "A network error occurred — please wait a moment and try again.",
    privacyPrefix: "Information you submit is handled in accordance with our",
    privacyLink: "Privacy Policy",
    privacySuffix: ".",
    fallbackLead: "If the calendar doesn't appear,",
    fallbackLink: "book in a new tab here",
  },
} as const;

function monthOf(dateStr: string) {
  return dateStr.slice(0, 7); // YYYY-MM
}
function shiftMonth(ym: string, delta: number) {
  const [y, m] = ym.split("-").map(Number);
  const d = new Date(y, m - 1 + delta, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export default function ReservePage() {
  const { lang } = useLanguage();
  const t = COPY[lang === "en" ? "en" : "ja"];

  const [avail, setAvail] = useState<AvailabilityResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [embedLoaded, setEmbedLoaded] = useState(false);

  const [viewMonth, setViewMonth] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  const [form, setForm] = useState({ name: "", email: "", company: "", note: "", website: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ meetLink?: string; startISO?: string } | null>(null);

  useEffect(() => {
    let alive = true;
    fetch("/api/availability")
      .then((r) => r.json())
      .then((data: AvailabilityResult) => {
        if (!alive) return;
        setAvail(data);
        if (data.configured && data.days.length > 0) {
          setViewMonth(monthOf(data.days[0].date));
          setSelectedDate(data.days[0].date);
        }
      })
      .catch(() => { if (alive) setAvail({ configured: false, timezone: "Asia/Tokyo", slotMinutes: 30, days: [] }); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, []);

  const dayMap = useMemo(() => {
    const map = new Map<string, string[]>();
    avail?.days.forEach((d) => map.set(d.date, d.slots));
    return map;
  }, [avail]);

  const monthBounds = useMemo(() => {
    if (!avail || avail.days.length === 0) return null;
    return { min: monthOf(avail.days[0].date), max: monthOf(avail.days[avail.days.length - 1].date) };
  }, [avail]);

  // Build the month grid (weeks of 7 cells) for viewMonth.
  const weeks = useMemo(() => {
    if (!viewMonth) return [];
    const [y, m] = viewMonth.split("-").map(Number);
    const first = new Date(y, m - 1, 1);
    const startWeekday = first.getDay();
    const daysInMonth = new Date(y, m, 0).getDate();
    const cells: Array<string | null> = [];
    for (let i = 0; i < startWeekday; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(`${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`);
    while (cells.length % 7 !== 0) cells.push(null);
    const rows: Array<Array<string | null>> = [];
    for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));
    return rows;
  }, [viewMonth]);

  const slots = selectedDate ? dayMap.get(selectedDate) ?? [] : [];

  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
    setSelectedTime("");
    setStatus("idle");
    setServerError(null);
  };

  const formatWhen = (date: string, time: string) => {
    const [y, m, d] = date.split("-").map(Number);
    const wd = t.weekdays[new Date(y, m - 1, d).getDay()];
    return lang === "en" ? `${date} (${wd}) ${time}` : `${y}年${m}月${d}日(${wd}) ${time}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = lang === "en" ? "Required." : "お名前は必須です。";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = lang === "en" ? "Enter a valid email." : "有効なメールアドレスを入力してください。";
    if (!selectedDate || !selectedTime) errs.slot = lang === "en" ? "Select a time." : "日時を選択してください。";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus("submitting");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, date: selectedDate, time: selectedTime }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setSuccess({ meetLink: data.meetLink, startISO: data.startISO });
        setStatus("success");
        return;
      }
      if (res.status === 409) {
        setServerError(t.errSlotTaken);
        setStatus("error");
        // refresh availability
        const fresh = await fetch("/api/availability").then((r) => r.json());
        setAvail(fresh);
        setSelectedTime("");
        return;
      }
      if (res.status === 400 && data.errors) { setErrors(data.errors); setStatus("idle"); return; }
      setServerError(t.errServer);
      setStatus("error");
    } catch {
      setServerError(t.errServer);
      setStatus("error");
    }
  };

  // ---- Fallback to Google embed when not configured -----------------------
  const showFallback = !loading && avail && !avail.configured;

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-28 lg:pt-32 pb-6 lg:pb-8 text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-gray-400 uppercase mb-4">{t.kicker}</p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-[1.15] mb-5">{t.title}</h1>
        <p className="text-sm lg:text-base text-gray-600 leading-relaxed max-w-xl mx-auto">{t.desc}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {t.points.map((p) => (
            <div key={p.label} className="flex items-baseline gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2">
              <span className="text-sm font-bold text-gray-900">{p.label}</span>
              <span className="text-xs text-gray-500">{p.sub}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-24">
        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center gap-4 py-24">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-neutral-900" />
            <p className="text-sm text-gray-400">{t.loading}</p>
          </div>
        )}

        {/* Fallback: Google embed */}
        {showFallback && (
          <>
            <div className="relative rounded-2xl border border-gray-200 bg-white shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)] overflow-hidden">
              {!embedLoaded && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-neutral-900" />
                </div>
              )}
              <iframe src={BOOKING_EMBED} title={t.title} onLoad={() => setEmbedLoaded(true)} loading="lazy" className="w-full" style={{ height: "min(78vh, 760px)", border: 0 }} />
            </div>
            <p className="mt-5 text-center text-sm text-gray-500">
              {t.fallbackLead}{" "}
              <a href={BOOKING_LINK} target="_blank" rel="noopener noreferrer" className="font-semibold text-neutral-900 underline underline-offset-4 hover:text-neutral-600">{t.fallbackLink}</a>
            </p>
          </>
        )}

        {/* Success */}
        {status === "success" && success && (
          <div className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white px-8 py-14 text-center shadow-sm">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-900">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="mb-3 text-xl font-bold text-gray-900">{t.successTitle}</h2>
            <p className="mx-auto mb-6 max-w-sm text-sm leading-relaxed text-gray-600">{t.successBody}</p>
            <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">{t.successWhen}</div>
            <div className="mb-6 text-base font-bold text-gray-900">{selectedDate && formatWhen(selectedDate, selectedTime)}</div>
            {success.meetLink && (
              <a href={success.meetLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800">
                {t.meetLabel}
                <span aria-hidden>→</span>
              </a>
            )}
          </div>
        )}

        {/* Custom booking UI */}
        {avail?.configured && status !== "success" && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            {/* Calendar */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-bold text-gray-900">{t.pickDate}</span>
                <div className="flex items-center gap-1">
                  <button type="button" aria-label="prev" disabled={!monthBounds || viewMonth <= monthBounds.min}
                    onClick={() => setViewMonth((v) => shiftMonth(v, -1))}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent">‹</button>
                  <span className="min-w-[88px] text-center text-sm font-semibold text-gray-900">
                    {viewMonth && t.monthLabel(Number(viewMonth.split("-")[0]), Number(viewMonth.split("-")[1]))}
                  </span>
                  <button type="button" aria-label="next" disabled={!monthBounds || viewMonth >= monthBounds.max}
                    onClick={() => setViewMonth((v) => shiftMonth(v, 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent">›</button>
                </div>
              </div>
              <div className="mb-2 grid grid-cols-7 text-center text-[11px] font-semibold text-gray-400">
                {t.weekdays.map((w) => <div key={w} className="py-1">{w}</div>)}
              </div>
              <div className="space-y-1">
                {weeks.map((row, ri) => (
                  <div key={ri} className="grid grid-cols-7 gap-1">
                    {row.map((cell, ci) => {
                      if (!cell) return <div key={ci} />;
                      const dayNum = Number(cell.split("-")[2]);
                      const available = dayMap.has(cell);
                      const isSelected = cell === selectedDate;
                      return (
                        <button key={ci} type="button" disabled={!available} onClick={() => handleSelectDate(cell)}
                          className={`flex aspect-square items-center justify-center rounded-full text-sm transition-colors ${
                            isSelected ? "bg-neutral-900 font-bold text-white"
                              : available ? "font-semibold text-gray-900 hover:bg-neutral-100"
                              : "text-gray-300"
                          }`}>{dayNum}</button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Times + form */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm">
              {!selectedDate ? (
                <div className="flex h-full min-h-[200px] items-center justify-center text-center text-sm text-gray-400">{t.noTimePrompt}</div>
              ) : (
                <>
                  <div className="mb-4 flex items-baseline justify-between">
                    <span className="text-sm font-bold text-gray-900">{t.pickTime}</span>
                    <span className="text-xs text-gray-500">{formatWhen(selectedDate, "").trim()}</span>
                  </div>
                  {slots.length === 0 ? (
                    <p className="py-8 text-center text-sm text-gray-400">{t.noSlots}</p>
                  ) : (
                    <div className="mb-6 grid grid-cols-3 gap-2 sm:grid-cols-4">
                      {slots.map((s) => (
                        <button key={s} type="button" onClick={() => setSelectedTime(s)}
                          className={`rounded-lg border px-2 py-2.5 text-sm font-semibold transition-colors ${
                            selectedTime === s ? "border-neutral-900 bg-neutral-900 text-white"
                              : "border-gray-200 text-gray-700 hover:border-gray-400"
                          }`}>{s}</button>
                      ))}
                    </div>
                  )}

                  {/* Contact form (appears once a time is picked) */}
                  {selectedTime && (
                    <form onSubmit={handleSubmit} noValidate className="space-y-4 border-t border-gray-100 pt-5">
                      <input type="text" name="website" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })}
                        tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }} />
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="name" className="mb-1.5 block text-xs font-semibold text-gray-600">{t.name} <span className="text-neutral-900">{t.required}</span></label>
                          <input id="name" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={t.namePh}
                            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-neutral-900 focus:ring-2 focus:ring-neutral-200" />
                          {errors.name && <p className="mt-1 text-xs text-neutral-900">{errors.name}</p>}
                        </div>
                        <div>
                          <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-gray-600">{t.email} <span className="text-neutral-900">{t.required}</span></label>
                          <input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder={t.emailPh}
                            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-neutral-900 focus:ring-2 focus:ring-neutral-200" />
                          {errors.email && <p className="mt-1 text-xs text-neutral-900">{errors.email}</p>}
                        </div>
                      </div>
                      <div>
                        <label htmlFor="company" className="mb-1.5 block text-xs font-semibold text-gray-600">{t.company} <span className="font-normal text-gray-400">{t.optional}</span></label>
                        <input id="company" type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder={t.companyPh}
                          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-neutral-900 focus:ring-2 focus:ring-neutral-200" />
                      </div>
                      <div>
                        <label htmlFor="note" className="mb-1.5 block text-xs font-semibold text-gray-600">{t.note} <span className="font-normal text-gray-400">{t.optional}</span></label>
                        <textarea id="note" rows={3} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder={t.notePh}
                          className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-neutral-900 focus:ring-2 focus:ring-neutral-200" />
                      </div>

                      {serverError && <p className="rounded-lg border border-neutral-300 bg-neutral-100 px-3 py-2.5 text-sm text-neutral-900">{serverError}</p>}

                      <button type="submit" disabled={status === "submitting"}
                        className={`flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-900 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 ${status === "submitting" ? "cursor-not-allowed opacity-60" : ""}`}>
                        {status === "submitting" && <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>}
                        {status === "submitting" ? t.submitting : t.submit}
                      </button>
                      <p className="text-center text-[11px] leading-relaxed text-gray-400">
                        {t.privacyPrefix}{" "}
                        <Link href="/privacy" className="underline hover:text-gray-600">{t.privacyLink}</Link>
                        {t.privacySuffix}
                      </p>
                    </form>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>{children}</div>
  );
}

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
    desc: "ご都合の日時を選ぶだけで、30分のオンライン相談でAI活用・ロボットレンタルの進め方をご提案します（強引な営業は一切ありません）。",
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
    desc: "Pick a time that works for you and we'll show you in a 30-minute online session how AI and robot rental can fit your business — no pushy sales, ever.",
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
      {/* MASTHEAD */}
      <section className="bg-white pt-32 lg:pt-40">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Reveal>
            {/* technical meta bar */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-neutral-900 pb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
              <span className="font-bold text-neutral-900">§00</span>
              <span>{t.kicker}</span>
              <span className="text-neutral-300">/</span>
              <span>30&nbsp;Min</span>
              <span className="text-neutral-300">/</span>
              <span>Online</span>
              <span className="text-neutral-300">/</span>
              <span>Google&nbsp;Meet</span>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="mt-10 text-[7vw] sm:text-3xl lg:text-4xl font-bold leading-[0.95] tracking-[-0.04em] text-balance text-neutral-900">
              {t.title}
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-8 max-w-2xl text-base lg:text-lg leading-relaxed text-pretty text-neutral-600">{t.desc}</p>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-12 grid grid-cols-1 border border-neutral-900 sm:grid-cols-3">
              {t.points.map((p, i) => (
                <div
                  key={p.label}
                  className={`flex flex-col gap-1 p-6 ${i > 0 ? "border-t border-neutral-900 sm:border-t-0 sm:border-l" : ""}`}
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-1 text-2xl font-bold tabular-nums text-neutral-900">{p.label}</span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-neutral-500">{p.sub}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center gap-4 border border-neutral-200 py-24">
            <div className="h-8 w-8 animate-spin rounded-none border-2 border-neutral-200 border-t-neutral-900" />
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-400">{t.loading}</p>
          </div>
        )}

        {/* Fallback: Google embed */}
        {showFallback && (
          <>
            <div className="relative overflow-hidden border border-neutral-900 bg-white">
              <div className="flex items-center justify-between border-b border-neutral-900 bg-neutral-50 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-neutral-500">
                <span>FIG.01 — Booking scheduler</span>
                <span className="text-neutral-900">↗</span>
              </div>
              {!embedLoaded && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white">
                  <div className="h-8 w-8 animate-spin rounded-none border-2 border-neutral-200 border-t-neutral-900" />
                </div>
              )}
              <iframe src={BOOKING_EMBED} title={t.title} onLoad={() => setEmbedLoaded(true)} loading="lazy" className="w-full" style={{ height: "min(78vh, 760px)", border: 0 }} />
            </div>
            <p className="mt-5 text-center font-mono text-[11px] uppercase tracking-[0.15em] text-neutral-500">
              {t.fallbackLead}{" "}
              <a href={BOOKING_LINK} target="_blank" rel="noopener noreferrer" className="font-bold text-neutral-900 underline underline-offset-4 hover:text-neutral-600">{t.fallbackLink}</a>
            </p>
          </>
        )}

        {/* Success */}
        {status === "success" && success && (
          <div className="mx-auto max-w-md border border-neutral-900 bg-white px-8 py-14 text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center border border-neutral-900 bg-neutral-900">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="mb-3 text-xl font-bold tracking-tight text-balance text-neutral-900">{t.successTitle}</h2>
            <p className="mx-auto mb-6 max-w-sm text-sm leading-relaxed text-pretty text-neutral-600">{t.successBody}</p>
            <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-400">{t.successWhen}</div>
            <div className="mb-6 text-base font-bold tabular-nums text-neutral-900">{selectedDate && formatWhen(selectedDate, selectedTime)}</div>
            {success.meetLink && (
              <a href={success.meetLink} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 border border-neutral-900 bg-neutral-900 px-6 py-3 font-mono text-sm font-bold uppercase tracking-[0.08em] text-white transition-[color,background-color,border-color,scale] duration-300 hover:bg-transparent hover:text-neutral-900 active:scale-[0.96]">
                {t.meetLabel}
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            )}
          </div>
        )}

        {/* Custom booking UI */}
        {avail?.configured && status !== "success" && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            {/* Calendar */}
            <div className="border border-neutral-900 bg-white p-5 sm:p-6">
              <div className="mb-5 flex items-center justify-between border-b border-neutral-200 pb-3">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-900">{t.pickDate}</span>
                <div className="flex items-center gap-1">
                  <button type="button" aria-label="prev" disabled={!monthBounds || viewMonth <= monthBounds.min}
                    onClick={() => setViewMonth((v) => shiftMonth(v, -1))}
                    className="flex h-8 w-8 items-center justify-center border border-neutral-300 font-mono text-neutral-700 transition-[color,background-color,border-color,scale] duration-200 hover:border-neutral-900 active:scale-[0.96] disabled:opacity-30 disabled:hover:border-neutral-300">‹</button>
                  <span className="min-w-[88px] text-center font-mono text-sm font-semibold tabular-nums text-neutral-900">
                    {viewMonth && t.monthLabel(Number(viewMonth.split("-")[0]), Number(viewMonth.split("-")[1]))}
                  </span>
                  <button type="button" aria-label="next" disabled={!monthBounds || viewMonth >= monthBounds.max}
                    onClick={() => setViewMonth((v) => shiftMonth(v, 1))}
                    className="flex h-8 w-8 items-center justify-center border border-neutral-300 font-mono text-neutral-700 transition-[color,background-color,border-color,scale] duration-200 hover:border-neutral-900 active:scale-[0.96] disabled:opacity-30 disabled:hover:border-neutral-300">›</button>
                </div>
              </div>
              <div className="mb-2 grid grid-cols-7 text-center font-mono text-[10px] uppercase tracking-[0.1em] text-neutral-400">
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
                          className={`flex aspect-square items-center justify-center font-mono text-sm tabular-nums transition-[color,background-color,border-color] duration-200 ${
                            isSelected ? "border border-neutral-900 bg-neutral-900 font-bold text-white"
                              : available ? "border border-neutral-300 font-semibold text-neutral-900 hover:border-neutral-900"
                              : "text-neutral-300"
                          }`}>{dayNum}</button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Times + form */}
            <div className="border border-neutral-900 bg-white p-5 sm:p-6">
              {!selectedDate ? (
                <div className="flex h-full min-h-[200px] items-center justify-center text-center font-mono text-[11px] uppercase tracking-[0.15em] text-neutral-400">{t.noTimePrompt}</div>
              ) : (
                <>
                  <div className="mb-5 flex items-baseline justify-between border-b border-neutral-200 pb-3">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-900">{t.pickTime}</span>
                    <span className="font-mono text-xs tabular-nums text-neutral-500">{formatWhen(selectedDate, "").trim()}</span>
                  </div>
                  {slots.length === 0 ? (
                    <p className="py-8 text-center font-mono text-[11px] uppercase tracking-[0.15em] text-neutral-400">{t.noSlots}</p>
                  ) : (
                    <div className="mb-6 grid grid-cols-3 gap-2 sm:grid-cols-4">
                      {slots.map((s) => (
                        <button key={s} type="button" onClick={() => setSelectedTime(s)}
                          className={`border px-2 py-2.5 font-mono text-sm font-semibold tabular-nums transition-[color,background-color,border-color,scale] duration-200 active:scale-[0.96] ${
                            selectedTime === s ? "border-neutral-900 bg-neutral-900 text-white"
                              : "border-neutral-300 text-neutral-700 hover:border-neutral-900"
                          }`}>{s}</button>
                      ))}
                    </div>
                  )}

                  {/* Contact form (appears once a time is picked) */}
                  {selectedTime && (
                    <form onSubmit={handleSubmit} noValidate className="space-y-4 border-t border-neutral-900 pt-6">
                      <input type="text" name="website" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })}
                        tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }} />
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="name" className="mb-2 block font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-500">{t.name} <span className="text-neutral-900">{t.required}</span></label>
                          <input id="name" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={t.namePh}
                            className="w-full rounded-none border border-neutral-300 px-3 py-2.5 text-sm text-neutral-900 outline-none transition-[border-color] duration-200 focus:border-neutral-900" />
                          {errors.name && <p className="mt-1 font-mono text-[11px] text-neutral-900">{errors.name}</p>}
                        </div>
                        <div>
                          <label htmlFor="email" className="mb-2 block font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-500">{t.email} <span className="text-neutral-900">{t.required}</span></label>
                          <input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder={t.emailPh}
                            className="w-full rounded-none border border-neutral-300 px-3 py-2.5 text-sm text-neutral-900 outline-none transition-[border-color] duration-200 focus:border-neutral-900" />
                          {errors.email && <p className="mt-1 font-mono text-[11px] text-neutral-900">{errors.email}</p>}
                        </div>
                      </div>
                      <div>
                        <label htmlFor="company" className="mb-2 block font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-500">{t.company} <span className="font-normal text-neutral-400">{t.optional}</span></label>
                        <input id="company" type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder={t.companyPh}
                          className="w-full rounded-none border border-neutral-300 px-3 py-2.5 text-sm text-neutral-900 outline-none transition-[border-color] duration-200 focus:border-neutral-900" />
                      </div>
                      <div>
                        <label htmlFor="note" className="mb-2 block font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-500">{t.note} <span className="font-normal text-neutral-400">{t.optional}</span></label>
                        <textarea id="note" rows={3} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder={t.notePh}
                          className="w-full resize-none rounded-none border border-neutral-300 px-3 py-2.5 text-sm text-neutral-900 outline-none transition-[border-color] duration-200 focus:border-neutral-900" />
                      </div>

                      {serverError && <p className="border border-neutral-900 bg-neutral-100 px-3 py-2.5 text-sm text-neutral-900">{serverError}</p>}

                      <button type="submit" disabled={status === "submitting"}
                        className={`flex w-full items-center justify-center gap-2 border border-neutral-900 bg-neutral-900 px-6 py-3.5 font-mono text-sm font-bold uppercase tracking-[0.08em] text-white transition-[color,background-color,border-color,scale] duration-300 hover:bg-transparent hover:text-neutral-900 active:scale-[0.96] ${status === "submitting" ? "cursor-not-allowed opacity-60" : ""}`}>
                        {status === "submitting" && <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>}
                        {status === "submitting" ? t.submitting : t.submit}
                      </button>
                      <p className="text-center font-mono text-[10px] leading-relaxed uppercase tracking-[0.1em] text-neutral-400">
                        {t.privacyPrefix}{" "}
                        <Link href="/privacy" className="underline hover:text-neutral-600">{t.privacyLink}</Link>
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

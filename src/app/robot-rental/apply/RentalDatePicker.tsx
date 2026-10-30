"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translateText } from "@/lib/i18n/localize";
import LocalizedContent from "@/components/LocalizedContent";
import { useRef, useState, type KeyboardEvent } from "react";
import { addDays, formatRentalDate, moveMonth, todayInJapan } from "./rental-date";

export default function RentalDatePicker({ value, nights, onChange }: { value: string; nights: number; onChange: (date: string) => void }) {
  const { locale } = useLanguage();
  const today = todayInJapan();
  const [month, setMonth] = useState(() => (value || today).slice(0, 7));
  const [focusDate, setFocusDate] = useState(value || today);
  const gridRef = useRef<HTMLDivElement>(null);
  const first = `${month}-01`;
  const offset = new Date(`${first}T12:00:00Z`).getUTCDay();
  const last = new Date(Date.UTC(Number(month.slice(0, 4)), Number(month.slice(5, 7)), 0)).getUTCDate();
  const end = value ? addDays(value, nights) : "";
  const monthLabel = new Intl.DateTimeFormat(locale, { year: "numeric", month: "long", timeZone: "UTC" }).format(new Date(`${first}T12:00:00Z`));
  const weekdays = Array.from({ length: 7 }, (_, day) => new Intl.DateTimeFormat(locale, { weekday: "short", timeZone: "UTC" }).format(new Date(Date.UTC(2026, 10, 1 + day))));

  function focusDay(date: string) {
    const next = date < today ? today : date;
    setFocusDate(next);
    setMonth(next.slice(0, 7));
    requestAnimationFrame(() => gridRef.current?.querySelector<HTMLButtonElement>(`[data-date="${next}"]`)?.focus());
  }

  function navigate(event: KeyboardEvent<HTMLButtonElement>, date: string) {
    let next: string | undefined;
    const weekday = new Date(`${date}T12:00:00Z`).getUTCDay();
    if (event.key === "ArrowLeft") next = addDays(date, -1);
    if (event.key === "ArrowRight") next = addDays(date, 1);
    if (event.key === "ArrowUp") next = addDays(date, -7);
    if (event.key === "ArrowDown") next = addDays(date, 7);
    if (event.key === "Home") next = addDays(date, -weekday);
    if (event.key === "End") next = addDays(date, 6 - weekday);
    if (event.key === "PageUp") next = moveMonth(date, -1);
    if (event.key === "PageDown") next = moveMonth(date, 1);
    if (next) { event.preventDefault(); focusDay(next); }
  }

  return <LocalizedContent><div className="min-w-0">
    <div className="flex items-center justify-between gap-3">
      <h3 id="rental-date-label" className="text-sm font-semibold text-neutral-800">利用開始日<span className="ml-2 text-xs text-red-700">必須</span></h3>
      <button type="button" onClick={() => { onChange(today); focusDay(today); }} className="inline-flex min-h-11 items-center justify-center rounded-md px-3 text-sm font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2">今日を選ぶ</button>
    </div>
    <p id="rental-date-help" className="mb-3 text-xs leading-5 text-slate-500">開始日を選ぶと、利用終了日まで表示されます。</p>
    <div className="rounded-lg border border-slate-200 bg-white p-2 sm:p-4">
      <div className="mb-3 flex items-center justify-between">
        <button type="button" aria-label="前の月" disabled={month <= today.slice(0, 7)} onClick={() => { const next = moveMonth(first, -1); setMonth(next.slice(0, 7)); setFocusDate(next < today ? today : next); }} className="inline-flex size-11 items-center justify-center rounded-full border border-slate-200 text-xl hover:bg-slate-50 focus-visible:outline-2 disabled:opacity-25">‹</button>
        <p aria-live="polite" className="text-base font-bold text-neutral-900">{monthLabel}</p>
        <button type="button" aria-label="次の月" onClick={() => { const next = moveMonth(first, 1); setMonth(next.slice(0, 7)); setFocusDate(next); }} className="inline-flex size-11 items-center justify-center rounded-full border border-slate-200 text-xl hover:bg-slate-50 focus-visible:outline-2">›</button>
      </div>
      <div ref={gridRef} role="group" aria-labelledby="rental-date-label" aria-describedby="rental-date-help">
        <div className="grid grid-cols-7 text-center text-xs text-slate-500" aria-hidden="true">{weekdays.map(day => <span key={day} className="py-2">{day}</span>)}</div>
        <div className="grid grid-cols-7 gap-y-1">
          {Array.from({ length: offset }, (_, index) => <span key={`blank-${index}`} />)}
          {Array.from({ length: last }, (_, index) => {
            const date = `${month}-${String(index + 1).padStart(2, "0")}`;
            const selected = date === value;
            const inRange = Boolean(value && date > value && date <= end);
            return <button key={date} type="button" data-date={date} disabled={date < today} tabIndex={date === focusDate ? 0 : -1} aria-label={`${formatRentalDate(date, locale)}${selected ? `, ${translateText("利用開始日", locale)}` : date === end ? `, ${translateText("利用終了日", locale)}` : inRange ? `, ${translateText("利用期間", locale)}` : ""}`} aria-pressed={selected} aria-current={date === today ? "date" : undefined} onFocus={() => setFocusDate(date)} onKeyDown={event => navigate(event, date)} onClick={() => onChange(date)} className={`relative inline-flex min-h-11 items-center justify-center text-base font-medium outline-offset-2 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-[#315b73] disabled:cursor-not-allowed disabled:text-slate-300 ${selected ? "rounded-md bg-[#315b73] text-white" : inRange ? "bg-[#315b73]/10 text-[#23465c]" : "rounded-md text-neutral-800 enabled:hover:bg-slate-100"} ${date === today && !selected ? "font-bold underline underline-offset-4" : ""}`}>{index + 1}</button>;
          })}
        </div>
      </div>
    </div>
    <p className="mt-2 text-xs leading-5 text-slate-500">矢印キーで日付移動、Enterで選択できます。在庫状況を示すものではありません。</p>
    <input type="hidden" name="startDate" value={value} />
  </div></LocalizedContent>;
}

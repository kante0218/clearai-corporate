"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { useLanguage, type Language } from "@/lib/i18n/LanguageContext";

const options: { value: Language; label: string }[] = [
  { value: "ja", label: "日本語" },
  { value: "en", label: "English" },
  { value: "zh-CN", label: "中文（简体）" },
  { value: "ko", label: "한국어" },
];
export default function LanguageToggle({ variant = "desktop", className = "" }: { variant?: "desktop" | "mobile"; className?: string }) {
  const { locale, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const container = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const items = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const selected = options.findIndex(option => option.value === locale);
  useEffect(() => {
    if (!open) return;
    const bottom = trigger.current?.getBoundingClientRect().bottom ?? 0;
    if (bottom + 210 > window.innerHeight) trigger.current?.scrollIntoView({ block: "center" });
    items.current[active]?.focus();
  }, [open, active]);
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!container.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);
  function close() { setOpen(false); trigger.current?.focus(); }
  function keyboard(event: KeyboardEvent) {
    if (event.key === "Escape" && open) { event.preventDefault(); event.stopPropagation(); close(); return; }
    if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      event.preventDefault();
      setActive(event.key === "Home" ? 0 : event.key === "End" ? options.length - 1 : !open ? selected : (active + (event.key === "ArrowDown" ? 1 : -1) + options.length) % options.length);
      setOpen(true);
    }
  }
  return <div ref={container} className={`language-select ${variant === "mobile" ? "language-select-mobile" : ""} ${className}`} onKeyDown={keyboard} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
    <button ref={trigger} type="button" data-ui-button="control" aria-label={`Language: ${options[selected].label}`} aria-haspopup="listbox" aria-expanded={open} aria-controls={id} className="language-trigger" onClick={() => { setActive(selected); setOpen(!open); }}>
      <span className="ui-button-label" lang={locale}>{options[selected].label}</span>
      <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14"><path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
    </button>
    {open && <div id={id} role="listbox" aria-label="Language" className="language-menu">
      {options.map((option, index) => <button key={option.value} ref={element => { items.current[index] = element; }} type="button" role="option" aria-selected={locale === option.value} tabIndex={active === index ? 0 : -1} lang={option.value} onClick={() => { setLang(option.value); close(); }}>{option.label}<span aria-hidden="true">{locale === option.value ? "✓" : ""}</span></button>)}
    </div>}
  </div>;
}

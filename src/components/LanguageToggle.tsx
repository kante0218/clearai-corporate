"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { toggle as toggleDict } from "@/lib/i18n/translations";

type Props = {
  variant?: "desktop" | "mobile";
  className?: string;
};

// Fixed pill — both buttons are identical width and the coloured thumb
// slides between them, so neither the toggle itself nor neighbouring
// elements can shift when the active language changes.
export default function LanguageToggle({ variant = "desktop", className = "" }: Props) {
  const { lang, setLang, mounted } = useLanguage();
  const t = toggleDict[lang];
  const isJa = lang === "ja";

  const isDesktop = variant === "desktop";
  const buttonSize = isDesktop ? "w-9 h-7 text-[11px]" : "w-12 h-9 text-sm";
  const thumbSize = isDesktop ? "w-9 h-7" : "w-12 h-9";

  return (
    <div
      className={`relative inline-flex items-center rounded-full bg-gray-100 ring-1 ring-gray-200/70 p-0.5 font-semibold select-none ${className}`}
      role="group"
      aria-label={t.switchTo}
      style={{ opacity: mounted ? 1 : 0.7 }}
    >
      <span
        aria-hidden="true"
        className={`absolute top-0.5 left-0.5 ${thumbSize} rounded-full shadow-sm transition-transform duration-300 ease-out`}
        style={{
          background: "var(--accent-solid)",
          transform: isJa ? "translateX(0)" : "translateX(100%)",
        }}
      />
      <button
        type="button"
        onClick={() => setLang("ja")}
        aria-pressed={isJa}
        className={`relative z-10 inline-flex items-center justify-center ${buttonSize} rounded-full tracking-wider transition-colors duration-300 ${
          isJa ? "text-white" : "text-gray-500 hover:text-gray-800"
        }`}
      >
        {t.ja}
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={!isJa}
        className={`relative z-10 inline-flex items-center justify-center ${buttonSize} rounded-full tracking-wider transition-colors duration-300 ${
          !isJa ? "text-white" : "text-gray-500 hover:text-gray-800"
        }`}
      >
        {t.en}
      </button>
    </div>
  );
}

"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Language = "ja" | "en" | "zh-CN" | "ko";
export type ContentLanguage = "ja" | "en";
export const LANGUAGES = ["ja", "en", "zh-CN", "ko"] as const;

type LanguageContextValue = {
  lang: ContentLanguage;
  locale: Language;
  setLang: (l: Language) => void;
  toggleLang: () => void;
  mounted: boolean;
};

const STORAGE_KEY = "clearai-lang";

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("ja");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (LANGUAGES.some(value => value === stored)) {
        setLangState(stored as Language);
      }
    } catch {
      /* ignore localStorage errors */
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang, mounted]);

  const setLang = (l: Language) => { if (LANGUAGES.includes(l)) setLangState(l); };
  const toggleLang = () => setLangState((prev) => (prev === "ja" ? "en" : "ja"));

  return (
    <LanguageContext.Provider value={{ lang: lang === "en" ? "en" : "ja", locale: lang, setLang, toggleLang, mounted }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    // Default to JA when used outside the provider (e.g. SSR fallback).
    return {
      lang: "ja",
      locale: "ja",
      setLang: () => {},
      toggleLang: () => {},
      mounted: false,
    };
  }
  return ctx;
}

"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Language = "ja" | "en";

type LanguageContextValue = {
  lang: Language;
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
      if (stored === "ja" || stored === "en") {
        setLangState(stored);
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

  const setLang = (l: Language) => setLangState(l);
  const toggleLang = () => setLangState((prev) => (prev === "ja" ? "en" : "ja"));

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, mounted }}>
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
      setLang: () => {},
      toggleLang: () => {},
      mounted: false,
    };
  }
  return ctx;
}

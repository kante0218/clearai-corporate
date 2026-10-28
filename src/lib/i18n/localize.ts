import messages from "./messages.json";
import type { Language } from "./LanguageContext";
export type Translation = { en: string; "zh-CN": string; ko: string };
const catalog: Record<string, Translation> = messages;
export function translateText(text: string, locale: Language): string {
  if (locale === "ja") return text;
  const key = text.trim().replace(/\s+/g, " ");
  const translation = catalog[key]?.[locale];
  if (!translation) return text;
  return text.replace(text.trim(), translation);
}

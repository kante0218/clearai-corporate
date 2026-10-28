"use client";

import { cloneElement, isValidElement, type ReactNode, type ReactElement } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translateText } from "@/lib/i18n/localize";

/** Translate render-time text only: links, form values, handlers and identities stay intact. */
export default function LocalizedContent({ children }: { children: ReactNode }) {
  const { locale } = useLanguage();
  function visit(nodes: ReactNode): ReactNode {
    if (Array.isArray(nodes)) return nodes.map((child, index) => {
      const translated = visit(child);
      return isValidElement(translated) && translated.key === null ? cloneElement(translated, { key: index }) : translated;
    });
    const node = nodes;
    if (typeof node === "string") return translateText(node, locale);
    if (!isValidElement(node)) return node;
    const element = node as ReactElement<Record<string, unknown>>;
    if (["script", "style", "code", "pre"].includes(String(element.type)) || element.props["data-original-language"]) return element;
    const props: Record<string, unknown> = {};
    for (const name of ["title", "alt", "placeholder", "aria-label"]) {
      if (typeof element.props[name] === "string") props[name] = translateText(element.props[name], locale);
    }
    if (element.props.children !== undefined) props.children = visit(element.props.children as ReactNode);
    return cloneElement(element, props);
  }
  return visit(children);
}

export function LocalizedText({ text }: { text: string }) {
  const { locale } = useLanguage();
  return translateText(text, locale);
}

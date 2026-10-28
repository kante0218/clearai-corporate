"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { consentCookie, disableAnalytics, enableAnalytics, readCookieConsent, reconcileAnalyticsConsent, trackPageView, type CookieConsent } from "@/lib/cookie-consent";

export default function CookieConsentBanner() {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const returnFocus = useRef<HTMLElement | null>(null);
  const panel = useRef<HTMLElement | null>(null);
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-6QRFTC9K8K";
  const en = lang === "en";
  const pathname = usePathname();

  useEffect(() => {
    function reconcile() {
      const consent = reconcileAnalyticsConsent(measurementId);
      if (consent === null) setOpen(true);
      return consent;
    }
    const consent = reconcile();
    if (consent === "accepted") {
      enableAnalytics(measurementId);
      trackPageView(measurementId);
    }
    const show = () => {
      returnFocus.current = document.activeElement as HTMLElement;
      setOpen(true);
      requestAnimationFrame(() => panel.current?.focus());
    };
    const visible = () => { if (document.visibilityState === "visible") reconcile(); };
    window.addEventListener("clearai-cookie-settings", show);
    window.addEventListener("focus", reconcile);
    window.addEventListener("pageshow", reconcile);
    document.addEventListener("visibilitychange", visible);
    return () => {
      window.removeEventListener("clearai-cookie-settings", show);
      window.removeEventListener("focus", reconcile);
      window.removeEventListener("pageshow", reconcile);
      document.removeEventListener("visibilitychange", visible);
    };
  }, [measurementId, pathname]);

  function choose(value: CookieConsent) {
    const previous = readCookieConsent(document.cookie);
    document.cookie = consentCookie(value, window.location.protocol === "https:");
    if (readCookieConsent(document.cookie) !== value) {
      disableAnalytics(measurementId);
      setError(true);
      return;
    }
    if (value === "accepted") {
      enableAnalytics(measurementId);
      if (previous !== "accepted") trackPageView(measurementId);
    }
    else disableAnalytics(measurementId);
    setError(false);
    setOpen(false);
    const focusTarget = returnFocus.current ?? document.getElementById("footer-cookie-settings") ?? document.querySelector("main");
    if (focusTarget?.tagName === "MAIN" && !focusTarget.hasAttribute("tabindex")) focusTarget.setAttribute("tabindex", "-1");
    focusTarget?.focus({ preventScroll: true });
    // A fresh page removes already-loaded Analytics listeners after consent withdrawal.
    if (previous === "accepted" && value === "rejected") window.location.reload();
  }

  if (!open) return null;
  return (
    <section ref={panel} tabIndex={-1} className="cookie-banner" role="region" aria-labelledby="cookie-title" aria-describedby="cookie-description">
      <div>
        <h2 id="cookie-title">{en ? "Cookie settings" : "Cookieの設定"}</h2>
        <p id="cookie-description">{en ? "We use essential cookies to remember your choice and support service functions. With your permission, Google Analytics uses cookies to measure visits and improve this site. You can change your choice in the footer." : "選択内容の保存やサービスの動作に必要なCookieを使用します。許可いただいた場合のみ、Google AnalyticsのCookieで閲覧状況を分析し、サイトの改善に利用します。設定はフッターから変更できます。"} <Link href="/privacy">{en ? "Privacy policy" : "プライバシーポリシー"}</Link></p>
        {error && <p role="alert">{en ? "Your browser could not save this choice. Analytics remains off. Please allow first-party cookies and try again." : "ブラウザに設定を保存できませんでした。アクセス解析は無効です。ファーストパーティCookieを許可して再度お試しください。"}</p>}
      </div>
      <div className="cookie-actions">
        <button data-ui-button="control" type="button" onClick={() => choose("rejected")}><span className="ui-button-label">{en ? "Essential only" : "必要なCookieのみ"}</span></button>
        <button data-ui-button="control" type="button" onClick={() => choose("accepted")}><span className="ui-button-label">{en ? "Allow analytics" : "アクセス解析を許可"}</span></button>
      </div>
    </section>
  );
}

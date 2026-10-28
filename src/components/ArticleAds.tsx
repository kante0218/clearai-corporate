"use client";

import { useEffect, useState } from "react";
import { adsConsentCookie, disableAds, enableAds, readAdsConsent, validPublisherId, type AdsConsent } from "@/lib/adsense";

export default function ArticleAds() {
  const publisherId = validPublisherId(process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID);
  const [ready, setReady] = useState(false);
  const [consent, setConsent] = useState<AdsConsent | null>(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!publisherId) return;
    function reconcile() {
      const choice = readAdsConsent(document.cookie);
      const wasLoaded = Boolean(document.getElementById("clearai-adsense"));
      setConsent(choice); setReady(true);
      if (choice === "accepted") enableAds(publisherId!);
      else {
        disableAds();
        if (wasLoaded) window.location.reload();
      }
    }
    const visible = () => { if (document.visibilityState === "visible") reconcile(); };
    reconcile();
    window.addEventListener("focus", reconcile);
    window.addEventListener("pageshow", reconcile);
    document.addEventListener("visibilitychange", visible);
    return () => {
      window.removeEventListener("focus", reconcile);
      window.removeEventListener("pageshow", reconcile);
      document.removeEventListener("visibilitychange", visible);
      disableAds();
    };
  }, [publisherId]);

  function choose(value: AdsConsent) {
    const previous = readAdsConsent(document.cookie);
    document.cookie = adsConsentCookie(value, window.location.protocol === "https:");
    if (readAdsConsent(document.cookie) !== value) { disableAds(); setError(true); return; }
    setConsent(value); setError(false); setOpen(false);
    if (value === "accepted") enableAds(publisherId!);
    else disableAds();
    // Reloading removes code that was already executed before consent withdrawal.
    if (previous === "accepted" && value === "rejected") window.location.reload();
  }

  if (!publisherId || !ready) return null;
  return <section className="mt-8 border-t border-neutral-200 pt-5" aria-label="広告の設定">
    {consent !== null && !open ? <button data-ui-button="control" type="button" onClick={() => setOpen(true)} className="min-h-11 text-xs text-neutral-600 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">広告の設定を変更</button> : <>
      <h2 className="mb-2 text-base font-semibold text-neutral-900">広告の設定</h2>
      <p className="text-sm leading-6 text-neutral-600">許可した場合のみ、Google AdSenseのCookieを使用する広告を表示します。閲覧履歴に基づく広告はリクエストしません。アクセス解析とは別の設定です。<a href="/privacy" className="underline underline-offset-4">プライバシーポリシー</a></p>
      <div className="mt-3 flex flex-wrap gap-2"><button data-ui-button="control" type="button" onClick={() => choose("rejected")} className="min-h-11 rounded border border-neutral-300 px-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-4">許可しない</button><button data-ui-button="filled" type="button" onClick={() => choose("accepted")} className="min-h-11 rounded bg-neutral-900 px-3 text-sm text-white focus-visible:outline-2 focus-visible:outline-offset-4">広告Cookieを許可</button></div>
    </>}
    {error && <p role="alert" className="mt-3 text-sm leading-6 text-neutral-600">設定を保存できませんでした。広告は無効です。Cookieを保存できる状態で再度お試しください。</p>}
  </section>;
}

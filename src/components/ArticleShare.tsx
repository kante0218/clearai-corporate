"use client";

import { useEffect, useState } from "react";

export default function ArticleShare({ title, url }: { title: string; url: string }) {
  const [message, setMessage] = useState("");
  const [nativeShare, setNativeShare] = useState(false);
  useEffect(() => { setNativeShare(typeof navigator.share === "function"); }, []);
  const encoded = encodeURIComponent(url);
  const buttonClass = "inline-flex h-11 w-11 items-center justify-center border border-neutral-300 text-sm font-medium text-neutral-800 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-4";

  async function copyUrl() {
    try { await navigator.clipboard.writeText(url); setMessage("URLをコピーしました"); }
    catch { setMessage("コピーできませんでした。アドレスバーからURLをコピーしてください。"); }
  }
  async function share() {
    try { await navigator.share({ title, url }); setMessage("共有しました"); }
    catch (error) { if (!(error instanceof Error && error.name === "AbortError")) setMessage("共有できませんでした。URLコピーをご利用ください。"); }
  }
  return (
    <section aria-label="この記事を共有" className="border-y border-neutral-200 py-5">
      <p className="mb-3 text-sm font-bold">この記事を共有する</p>
      <div className="flex flex-wrap gap-2">
        <button data-ui-button="icon" type="button" className={buttonClass} onClick={copyUrl} aria-label="記事のURLをコピー" title="URLをコピー"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7 .2l3-3a5 5 0 0 0-7-7l-1.7 1.7" /><path d="M14 11a5 5 0 0 0-7-.2l-3 3a5 5 0 0 0 7 7l1.7-1.7" /></svg></button>
        <a data-ui-button="icon" className={buttonClass} href={`https://twitter.com/intent/tweet?url=${encoded}&text=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer" aria-label="Xで共有（新しいタブ）" title="Xで共有"><img src="/images/social/x.png" width="22" height="22" className="h-[22px] w-[22px] object-contain" alt="" /></a>
        <a data-ui-button="icon" className={buttonClass} href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`} target="_blank" rel="noopener noreferrer" aria-label="Facebookで共有（新しいタブ）" title="Facebookで共有"><img src="/images/social/facebook.png" width="24" height="24" className="h-6 w-6 object-contain" alt="" /></a>
        <a data-ui-button="icon" className={buttonClass} href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`} target="_blank" rel="noopener noreferrer" aria-label="LinkedInで共有（新しいタブ）" title="LinkedInで共有"><img src="/images/social/linkedin.png" width="28" height="24" className="h-6 w-7 object-contain" alt="" /></a>
        {nativeShare && <button data-ui-button="icon" type="button" className={buttonClass} onClick={share} aria-label="その他の方法で共有" title="その他の共有"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 16V3m-4 4 4-4 4 4M5 13v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7" /></svg></button>}
      </div>
      <p role="status" className="mt-2 min-h-5 text-xs text-neutral-600">{message}</p>
    </section>
  );
}

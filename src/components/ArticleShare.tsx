"use client";

import { useEffect, useState } from "react";

export default function ArticleShare({ title, url }: { title: string; url: string }) {
  const [message, setMessage] = useState("");
  const [nativeShare, setNativeShare] = useState(false);
  useEffect(() => { setNativeShare(typeof navigator.share === "function"); }, []);
  const encoded = encodeURIComponent(url);
  const buttonClass = "inline-flex min-h-11 items-center justify-center border border-neutral-300 px-4 text-sm font-medium text-neutral-800 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-4";

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
        <button type="button" className={buttonClass} onClick={copyUrl}>URLをコピー</button>
        <a className={buttonClass} href={`https://twitter.com/intent/tweet?url=${encoded}&text=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer" aria-label="Xで共有（新しいタブ）">X</a>
        <a className={buttonClass} href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`} target="_blank" rel="noopener noreferrer" aria-label="Facebookで共有（新しいタブ）">Facebook</a>
        <a className={buttonClass} href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`} target="_blank" rel="noopener noreferrer" aria-label="LinkedInで共有（新しいタブ）">LinkedIn</a>
        {nativeShare && <button type="button" className={buttonClass} onClick={share}>その他の共有</button>}
      </div>
      <p role="status" className="mt-2 min-h-5 text-xs text-neutral-600">{message}</p>
    </section>
  );
}

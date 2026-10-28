"use client";

import { useEffect, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";

type Comment = { id: string; name: string; body: string; publishedAt: string };
type Engagement = { likes: number; liked: boolean; comments: Comment[] };

export default function ArticleEngagement({ slug }: { slug: string }) {
  const [likeTarget, setLikeTarget] = useState<HTMLElement | null>(null);
  useEffect(() => { setLikeTarget(document.getElementById("article-like-slot")); }, []);
  const [data, setData] = useState<Engagement | null>(null);
  const [unavailable, setUnavailable] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const endpoint = `/api/blog/${encodeURIComponent(slug)}/engagement`;

  useEffect(() => {
    const controller = new AbortController();
    setData(null); setUnavailable("");
    fetch(endpoint, { cache: "no-store", signal: controller.signal }).then(async response => {
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setData(result);
    }).catch(error => { if (error.name !== "AbortError") setUnavailable(error.message || "読み込みに失敗しました。"); });
    return () => controller.abort();
  }, [endpoint]);

  async function send(payload: object) {
    setBusy(true); setMessage("");
    try {
      const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      if (result.message) { setMessage(result.message); setBody(""); }
      else setData(result);
    } catch (error) { setMessage(error instanceof Error ? error.message : "操作に失敗しました。"); }
    finally { setBusy(false); }
  }
  function submit(event: FormEvent) { event.preventDefault(); void send({ action: "comment", name, body }); }

  return (
    <section className="mt-10 border-t border-neutral-200 pt-8" aria-label="記事へのリアクション">
      {likeTarget && createPortal(<div><button data-ui-button="control" type="button" disabled={!data || busy} aria-pressed={data?.liked ?? false} onClick={() => void send({ action: "like", liked: !data?.liked })} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-neutral-300 px-5 text-sm font-semibold text-neutral-800 enabled:hover:border-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-4 disabled:opacity-50">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill={data?.liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" /></svg>
        いいね{data ? ` ${data.likes}` : ""}
      </button><p role="status" className="mt-2 max-w-64 text-xs leading-5 text-neutral-600">{unavailable || message}</p></div>, likeTarget)}
      <h2 id="article-comments" className="mb-5 mt-8 text-xl font-bold text-neutral-900">コメント{data ? `（${data.comments.length}${data.comments.length === 50 ? "+" : ""}）` : ""}</h2>
      {unavailable ? <p className="text-sm leading-6 text-neutral-600" role="status">{unavailable}</p> : !data ? <p className="text-sm text-neutral-600" role="status">読み込み中…</p> : <>
        <p className="mb-5 text-sm leading-6 text-neutral-600">コメントは内容の確認後に公開します。個人情報や機密情報の投稿はお控えください。</p>
        <form onSubmit={submit} className="space-y-4">
          <div><label htmlFor="comment-name" className="mb-2 block text-sm font-semibold">お名前</label><input id="comment-name" value={name} onChange={event => setName(event.target.value)} maxLength={40} required autoComplete="nickname" className="min-h-11 w-full rounded border border-neutral-300 px-3 text-base focus-visible:outline-2 focus-visible:outline-offset-2" /></div>
          <div><label htmlFor="comment-body" className="mb-2 block text-sm font-semibold">コメント</label><textarea id="comment-body" value={body} onChange={event => setBody(event.target.value)} maxLength={2000} required rows={4} className="w-full rounded border border-neutral-300 p-3 text-base focus-visible:outline-2 focus-visible:outline-offset-2" /></div>
          <button data-ui-button="filled" type="submit" disabled={busy} className="min-h-11 rounded bg-neutral-900 px-5 text-sm font-semibold text-white enabled:hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-4 disabled:opacity-50">{busy ? "送信中…" : "コメントを投稿"}</button>
        </form>
        <ul className="mt-8 divide-y divide-neutral-200">{data.comments.map(comment => <li key={comment.id} className="py-6"><div className="mb-3 flex flex-wrap items-center gap-3"><span className="text-sm font-semibold text-neutral-900">{comment.name}</span><time dateTime={comment.publishedAt} className="text-xs text-neutral-500">{new Date(comment.publishedAt).toLocaleDateString("ja-JP")}</time></div><p className="whitespace-pre-wrap break-words text-sm leading-7 text-neutral-700">{comment.body}</p></li>)}</ul>
        {data.comments.length === 0 && <p className="mt-6 text-sm text-neutral-500">まだコメントはありません。</p>}
      </>}
      {message && <p className="mt-4 text-sm leading-6 text-neutral-700" role="status">{message}</p>}
    </section>
  );
}

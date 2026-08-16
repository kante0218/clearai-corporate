"use client";

import { FormEvent, useState } from "react";
import { DOCUMENT_KEYS, type DocumentKey } from "@/lib/validators";

type Deck = { key: DocumentKey; no: string; title: string; lead: string };

type Props = { decks: Deck[] };

type Fields = { company: string; name: string; phone: string; email: string };

const EMPTY: Fields = { company: "", name: "", phone: "", email: "" };

// 資料請求はリード獲得の入口。会社名・氏名・電話番号まで必須にして、
// 誰からの請求かが分かる状態にする（メールだけだと後追いできない）。
const FIELDS: {
  key: keyof Fields; label: string; type: string; placeholder: string; autoComplete: string; max: number;
}[] = [
  { key: "company", label: "会社名", type: "text", placeholder: "株式会社◯◯", autoComplete: "organization", max: 100 },
  { key: "name", label: "お名前", type: "text", placeholder: "山田 太郎", autoComplete: "name", max: 60 },
  { key: "phone", label: "電話番号", type: "tel", placeholder: "03-1234-5678", autoComplete: "tel", max: 20 },
  { key: "email", label: "メールアドレス", type: "email", placeholder: "name@example.com", autoComplete: "email", max: 254 },
];

type Result = { files: { key: string; title: string; url: string }[]; zipUrl: string | null; mailed: boolean };

export default function DownloadRequestForm({ decks }: Props) {
  const [selected, setSelected] = useState<DocumentKey[]>([]);
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [sentTo, setSentTo] = useState("");

  const allSelected = selected.length === DOCUMENT_KEYS.length;

  function toggle(key: DocumentKey) {
    setSelected((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  }

  function toggleAll() {
    setSelected(allSelected ? [] : [...DOCUMENT_KEYS]);
  }

  function set(key: keyof Fields, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    if (selected.length === 0) {
      setError("ダウンロードする資料を選んでください。");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documents: selected, ...fields, website }),
      });
      const data = (await response.json()) as Result & { ok?: boolean; error?: string };
      if (!response.ok || !data.ok || !data.files?.length) {
        throw new Error(data.error || "資料を取得できませんでした。");
      }
      setSentTo(fields.email.trim());
      setResult({ files: data.files, zipUrl: data.zipUrl ?? null, mailed: data.mailed !== false });
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "資料を取得できませんでした。");
    } finally {
      setLoading(false);
    }
  }

  // 入力できた時点でその場でダウンロードさせる。メールは控えとして別途届く。
  if (result) {
    return (
      <div className="border border-neutral-200 bg-neutral-50 p-6 lg:p-8" aria-live="polite">
        <p className="text-base font-bold text-neutral-900">
          ご入力ありがとうございます。資料をダウンロードできます。
        </p>

        {result.zipUrl && (
          <a
            href={result.zipUrl}
            download
            className="mt-5 inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-md bg-cta px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-cta-hover sm:w-auto sm:px-10"
          >
            <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 19h16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            4資料をまとめてダウンロード（ZIP）
          </a>
        )}

        <ul className="mt-5 divide-y divide-neutral-200 border-t border-neutral-200">
          {result.files.map((f) => (
            <li key={f.key} className="flex flex-wrap items-center justify-between gap-3 py-3">
              <span className="text-sm text-neutral-900">{f.title}</span>
              <a
                href={f.url}
                download
                className="inline-flex items-center gap-1.5 rounded-md border border-neutral-300 px-4 py-2 text-xs font-bold text-neutral-900 transition-colors hover:border-neutral-900"
              >
                PDFを開く
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-4 text-xs leading-relaxed text-neutral-500">
          {result.mailed
            ? `同じリンクを ${sentTo} にもお送りしました。あとから見返す場合はそちらをご利用ください。`
            : "このページを閉じる前にダウンロードをお願いします。"}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="border border-neutral-200 p-6 lg:p-8" aria-label="事業紹介資料のダウンロードフォーム">
      <fieldset>
        <legend className="mb-4 flex items-center gap-2 text-sm font-bold text-neutral-900">
          ダウンロードする資料を選ぶ
          <span className="rounded-sm bg-neutral-900 px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">
            必須
          </span>
        </legend>

        {/* 一括の項目を先頭に。4回チェックさせない。 */}
        <label className="flex cursor-pointer items-start gap-3 border border-neutral-900 bg-neutral-50 p-4">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={toggleAll}
            className="mt-0.5 h-4 w-4 shrink-0 accent-neutral-900"
          />
          <span>
            <span className="block text-sm font-bold text-neutral-900">すべての資料（4点）をまとめて受け取る</span>
            <span className="mt-1 block text-xs leading-relaxed text-neutral-500">
              ZIPで一括ダウンロードできます。社内で回覧する場合はこちらが便利です。
            </span>
          </span>
        </label>

        <ul className="mt-3 divide-y divide-neutral-200 border border-neutral-200">
          {decks.map((d) => (
            <li key={d.key}>
              <label className="flex cursor-pointer items-start gap-3 p-4 transition-colors hover:bg-neutral-50">
                <input
                  type="checkbox"
                  checked={selected.includes(d.key)}
                  onChange={() => toggle(d.key)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-neutral-900"
                />
                <span>
                  <span className="block text-sm font-bold text-neutral-900">
                    <span className="mr-2 text-xs font-semibold text-neutral-400">{d.no}</span>
                    {d.title}
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-neutral-500">{d.lead}</span>
                </span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        {FIELDS.map((f) => (
          <div key={f.key}>
            <label htmlFor={`dl-${f.key}`} className="mb-2 flex items-center gap-2 text-xs font-semibold text-neutral-900">
              {f.label}
              <span className="rounded-sm bg-neutral-900 px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">
                必須
              </span>
            </label>
            <input
              id={`dl-${f.key}`}
              type={f.type}
              autoComplete={f.autoComplete}
              required
              maxLength={f.max}
              value={fields[f.key]}
              onChange={(event) => set(f.key, event.target.value)}
              placeholder={f.placeholder}
              className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900"
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 inline-flex min-h-[54px] w-full items-center justify-center whitespace-nowrap rounded-lg bg-cta px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-cta-hover disabled:cursor-wait disabled:opacity-60"
      >
        {loading ? "準備中…" : selected.length > 1 ? `${selected.length}点の資料をダウンロード` : "資料をダウンロード"}
      </button>

      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website-dl">Webサイト</label>
        <input id="website-dl" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} />
      </div>

      {error && <p role="alert" className="mt-3 text-xs text-red-600">{error}</p>}
      <p className="mt-3 text-xs leading-relaxed text-neutral-500">
        入力するとこの場ですぐダウンロードできます。控えとして同じリンクをメールでもお送りします。
      </p>
    </form>
  );
}

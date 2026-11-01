"use client";
import LocalizedContent from "@/components/LocalizedContent";


import Link from "next/link";
import { useEffect, useState } from "react";

type Status = "checking" | "unavailable" | "paid" | "payment_processing" | "expired" | "verified" | "processing" | "timeout" | "requires_input" | "canceled" | "missing" | "error";

export default function RentalApplicationCompletePage() {
  const [status, setStatus] = useState<Status>("checking");
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    let attempts = 0;

    async function check() {
      try {
        const response = await fetch("/api/robot-rental/application-status", { method: "POST" });
        const result = await response.json();
        if (!active) return;
        if (!response.ok) return setStatus(result.status === "missing" ? "missing" : "error");
        if (result.status === "verified") {
          if (typeof result.checkoutUrl !== "string" || !result.checkoutUrl) return setStatus("error");
          setCheckoutUrl(result.checkoutUrl ?? null);
          return setStatus("verified");
        }
        if ((result.status === "processing" || result.status === "payment_processing") && attempts < 12) {
          attempts += 1;
          setStatus(result.status);
          window.setTimeout(check, Math.min(2500 * 2 ** Math.floor(attempts / 3), 10000));
          return;
        }
        if (result.status === "processing") return setStatus("timeout");
        if (result.status === "payment_processing") return setStatus("payment_processing");
        if (result.status === "requires_input" && typeof result.resumeUrl === "string") setResumeUrl(result.resumeUrl);
        if (["unavailable", "paid", "expired", "requires_input", "canceled", "missing"].includes(result.status)) {
          setStatus(result.status);
        } else {
          setStatus("error");
        }
      } catch {
        if (active) setStatus("error");
      }
    }

    check();
    return () => { active = false; };
  }, []);

  const content = {
    unavailable: ["レンタルはお問い合わせで受け付けています", "ご希望の日程や機種をお問い合わせください。担当者がご案内します。"],
    paid: ["お支払いが完了しました", "clearAIが在庫を確認し、送料を別途ご案内します。在庫確認後にレンタル予約が確定します。"],
    payment_processing: ["お支払い結果を確認しています", "決済の処理中です。再度お支払いせず、時間をおいて結果をもう一度確認してください。"],
    expired: ["決済画面の有効期限が切れました", "決済は再作成されていません。お手続きについてinfo@clearai.jpまでお問い合わせください。"],
    checking: ["本人確認結果を確認しています", "画面を閉じずにそのままお待ちください。"],
    processing: ["本人確認を処理しています", "通常は数秒で完了します。そのままお待ちください。"],
    timeout: ["本人確認を引き続き処理しています", "処理に時間がかかっています。数分後にもう一度結果を確認してください。"],
    verified: ["本人確認が完了しました", "続けてStripeの安全な決済画面で、レンタル料と初日のエンジニア帯同費をお支払いください。"],
    requires_input: ["本人確認が完了していません", "Stripeの画面に戻り、免許証の提出を完了してください。"],
    canceled: ["本人確認が中断されました", "もう一度申込画面から本人確認を開始してください。"],
    missing: ["申込情報を確認できませんでした", "同じブラウザで申込画面からやり直してください。"],
    error: ["確認結果を取得できませんでした", "時間をおいて再度読み込むか、info@clearai.jpまでご連絡ください。"],
  }[status];

  return <LocalizedContent>{(
    <main className="min-h-[75vh] bg-[#f4f7f9] px-5 pb-20 pt-32 lg:px-8 lg:pt-40">
      <section className="mx-auto max-w-2xl rounded-lg border border-slate-200 bg-white p-8 text-center lg:p-12">
        <div className={`mx-auto flex size-12 items-center justify-center rounded-full ${(status === "verified" || status === "paid") ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-neutral-900"}`} aria-hidden="true">
          {(status === "verified" || status === "paid") ? "✓" : "…"}
        </div>
        <h1 className="mt-6 text-2xl font-bold text-neutral-900">{content[0]}</h1>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-600">{content[1]}</p>

        {status === "verified" && (
          <div className="mt-7 rounded-md bg-slate-50 p-5 text-left text-sm leading-7 text-slate-600">
            <p className="font-bold text-neutral-900">この後の流れ</p>
            <p>1. Stripeでレンタル料と初日エンジニア帯同費を決済</p>
            <p>2. clearAIが在庫を確認し、送料を別途ご案内</p>
            <p>3. 在庫確認後にレンタル予約確定</p>
          </div>
        )}

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          {status === "unavailable" && <Link data-ui-button="filled" href="/contact?service=robot-rental" className="flex items-center justify-center rounded-md bg-cta px-6 py-3 text-sm font-bold text-white"><span className="ui-button-label">レンタルについて問い合わせる</span></Link>}
          {resumeUrl && <a data-ui-button="filled" href={resumeUrl} className="rounded-md bg-[#12314b] px-6 py-3 text-sm font-bold text-white"><span className="ui-button-label">本人確認を再開する</span></a>}
          {checkoutUrl && <a data-ui-button="filled" href={checkoutUrl} className="rounded-md bg-cta px-6 py-3 text-sm font-bold text-white"><span className="ui-button-label">Stripeで決済へ進む</span></a>}
          {(status === "timeout" || status === "payment_processing" || status === "error") && <button data-ui-button="filled" type="button" onClick={() => window.location.reload()} className="rounded-md bg-[#12314b] px-6 py-3 text-sm font-bold text-white"><span className="ui-button-label">結果をもう一度確認</span></button>}
          <Link data-ui-button="control" href="/robot-rental" className="rounded-md border border-slate-300 px-6 py-3 text-sm font-bold text-slate-700"><span className="ui-button-label">ロボットレンタルへ戻る</span></Link>
        </div>
      </section>
    </main>
  )}</LocalizedContent>;
}

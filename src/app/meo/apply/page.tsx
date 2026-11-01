import type { Metadata } from "next";
import Link from "next/link";
import MeoApplicationForm from "@/components/MeoApplicationForm";
import { BOOKING_URL } from "@/lib/booking";

export const metadata: Metadata = {
  title: "MEO支援のお申し込み",
  description: "ClearAIのMEO支援のお申し込みフォーム。店舗情報とご連絡先をご入力ください。支援範囲・費用を確認したうえで契約手続きをご案内します。",
  alternates: { canonical: "https://clearai.jp/meo/apply" },
  openGraph: { title: "MEO支援のお申し込み | ClearAI株式会社", url: "https://clearai.jp/meo/apply" },
};

export default function MeoApplyPage() {
  return <main className="mx-auto max-w-2xl px-6 pb-16 pt-28 text-neutral-800 sm:pt-36">
    <Link href="/meo" className="inline-flex min-h-11 items-center text-sm underline underline-offset-4">MEO支援について</Link>
    <h1 className="mt-5 text-2xl font-bold sm:text-4xl">MEO支援のお申し込み</h1>
    <p className="mt-5 text-sm leading-[1.9]">店舗情報とご連絡先を入力して、そのままお申し込みいただけます。担当者より支援範囲・費用と契約手続きについてご連絡します。</p>
    <p className="mt-3 text-sm leading-[1.9]">送信時点では契約・お支払いは発生しません。契約条件をご確認いただいてから運用を開始します。</p>
    <dl className="mt-7 grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 border-y border-neutral-200 py-5 text-sm"><dt className="font-bold">月額料金</dt><dd>30,000円（税別）／33,000円（税込）</dd><dt className="font-bold">最低契約期間</dt><dd>6か月</dd></dl>
    <div className="my-8 border-y border-neutral-200 py-5 text-sm leading-[1.9]">先に打ち合わせをご希望の方は、<a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline underline-offset-4">髙橋との打ち合わせを予約（別タブ）</a>から日時をお選びください。</div>
    <MeoApplicationForm />
  </main>;
}

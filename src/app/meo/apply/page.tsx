import type { Metadata } from "next";
import Image from "next/image";
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
    <h1 className="sr-only">MEO支援のお申し込み</h1>
    <span className="relative mt-5 block h-[62px] w-[180px] overflow-hidden"><Image src="/images/meo/meo-logo.png?v=20261102-gradient" alt="meo" width={2008} height={783} className="absolute -left-[62px] -top-[33px] h-auto w-[301px] max-w-none" priority /></span>
    <p className="mt-5 text-sm leading-[1.9]">店舗情報とご連絡先を入力すると、アカウント設定の案内メールが届きます。パスワードの設定後、ダッシュボードへログインできます。パスキーも登録できます。</p>
    <div role="region" className="my-8 border-b border-neutral-200 pb-6 text-sm leading-[1.9]" aria-labelledby="meo-start-steps">
      <h2 id="meo-start-steps" className="text-xl font-bold">運用開始までの準備</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5">
        <li>下のフォームからお申し込みください。</li>
        <li><a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline underline-offset-4">初回面談の日時を選ぶ（別タブ）</a>。TimeRexで予約の確定までお進みください。送信後の画面からも予約できます。</li>
        <li>案内メールからアカウントを設定し、ダッシュボードでGoogleビジネスプロフィールを接続してください。</li>
      </ol>
      <p className="mt-4">Googleの管理権限を持つアカウントで接続に同意してください。GoogleのパスワードをClearAIへお知らせいただく必要はありません。</p>
    </div>
    <MeoApplicationForm />
  </main>;
}

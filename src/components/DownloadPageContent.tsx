"use client";
import LocalizedContent from "@/components/LocalizedContent";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Image from "next/image";
import { CLIENT_LOGOS } from "@/components/ClientLogoGrid";
import DownloadRequestForm from "@/components/DownloadRequestForm";
import { DOCUMENT_LABELS, type DocumentKey } from "@/lib/validators";
import { BOOKING_URL } from "@/lib/booking";

const DECKS = (["meo", "software-development", "robot-rental", "training"] as const).map((key, index) => ({
  key,
  no: String(index + 1).padStart(2, "0"),
  title: DOCUMENT_LABELS[key],
}));

export default function DownloadPageContent({ initialDocument }: { initialDocument?: DocumentKey }) {
  return <LocalizedContent>{(
    <div className="bg-white">
      <PageHeader
        kicker="Download"
        title="事業紹介資料"
        description="社内での検討・稟議にそのままお使いいただける資料をご用意しています。ご希望の資料を選び、必要事項を入力するとその場でPDFをダウンロードできます。すべての資料をまとめて受け取ることもできます。"
        crumbs={[{ label: "ホーム", href: "/" }, { label: "資料請求" }]}
      />

      {/* 資料選択 ＋ 実績（実績は全幅の帯をやめ、左に小さく添える） */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-14">
            {/* 左: 実績 */}
            <aside>
              <h2 className="text-xs font-bold tracking-[0.14em] text-neutral-400">過去の取引実績</h2>
              <ul className="mt-4 grid grid-cols-3 gap-px">
                {CLIENT_LOGOS.map((logo) => (
                  <li key={logo.name} className="flex h-16 items-center justify-center bg-white px-3">
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={logo.width}
                      height={logo.height}
                      sizes="100px"
                      className="max-h-6 w-auto object-contain"
                    />
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[11px] leading-relaxed text-neutral-500">
                掲載についてご了承いただいた企業様のみ掲載しています。
              </p>
              <p className="mt-6 text-xs leading-[1.9] text-neutral-600">
                どの資料も、社内での検討・稟議にそのままお使いいただける構成です。
                迷われる場合は「すべての資料」を選んでください。
              </p>
            </aside>

            {/* 右: 資料の選択とフォーム */}
            <div>
              <DownloadRequestForm key={initialDocument ?? "all"} decks={DECKS} initialDocument={initialDocument} />
            </div>
          </div>
        </div>
      </section>

      {/* Notes */}
      <section className="border-t border-gray-100 py-14 lg:py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <h2 className="mb-5 text-sm font-bold text-neutral-900">ご請求にあたって</h2>
          <ul className="space-y-2.5">
            {[
              "選択した資料をその場でダウンロードでき、同じリンクをメールでもお送りします。",
              "ご入力いただいた情報は資料送付とご連絡のみに使用し、第三者へ提供することはありません。",
              "資料の内容についてご質問がある場合は、お問い合わせフォームまたは無料相談をご利用ください。",
            ].map((n) => (
              <li key={n} className="relative pl-5 text-sm leading-[1.9] text-neutral-600">
                <span aria-hidden className="absolute left-0 top-[0.75em] h-1.5 w-1.5 rounded-full bg-neutral-400" />
                {n}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-neutral-500">
            個人情報の取り扱いについては
            <Link href="/privacy" className="mx-1 underline underline-offset-4 hover:text-neutral-900">プライバシーポリシー</Link>
            をご確認ください。
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-neutral-200 bg-neutral-950 py-20 md:py-28">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8 text-center">
          <h2 className="mb-5 text-2xl md:text-3xl font-bold leading-snug text-white">
            資料より先に、話したほうが早いかもしれません。
          </h2>
          <p className="mb-10 text-[15px] leading-[1.9] text-white/60">
            課題が具体的に決まっている場合は、30分お話しいただくほうが早く進みます。初回のご相談は無料です。
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a data-ui-with-icon data-ui-button="filled"
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-cta hover:bg-cta-hover px-8 py-4 text-sm font-semibold text-white transition-opacity hover:opacity-80"
            ><span className="ui-button-label">無料相談を予約する
              </span><span className="ui-button-icon" data-ui-side="end" aria-hidden="true"><span aria-hidden>→</span></span></a>
            <Link
              href="/contact"
              className="text-sm font-semibold text-white/70 underline-offset-4 hover:text-white hover:underline transition-colors"
            >
              フォームで相談する
            </Link>
          </div>
        </div>
      </section>
    </div>
  )}</LocalizedContent>;
}

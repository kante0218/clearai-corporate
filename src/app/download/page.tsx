import guideMetadata from "@/lib/download-guide-metadata.json";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Image from "next/image";
import { CLIENT_LOGOS } from "@/components/ClientLogoGrid";
import DownloadRequestForm from "@/components/DownloadRequestForm";
import { DOCUMENT_KEYS, type DocumentKey } from "@/lib/validators";
import { BOOKING_URL } from "@/lib/booking";

type Deck = {
  key: DocumentKey;
  no: string;
  title: string;
  lead: string;
  contents: string[];
  audience: string;
  /** Service page this deck belongs to, if any. */
  href?: string;
};

const DECKS: Deck[] = [
  {
    key: "robot-rental",
    no: "03",
    title: "ロボットレンタル 事業紹介資料",
    lead:
      "Unitree R1・G1・Go2 のレンタルについて。全機種の料金表、補償とキャンセルの条件、そして「自社の現場で本当に動くのか」を判断するための環境条件まで記載しています。",
    contents: [
      "ラインナップと機種ごとの特徴",
      "グレードの違い（2次開発が可能なのはR&Dのみ）",
      "料金表（日単位・月単位）／延長・送料",
      "補償とキャンセルの条件",
      "現場の環境条件チェックリスト",
      "実証で測るべき指標",
    ],
    audience: "購入前の実機検証、展示会、巡回点検のPoCをご検討中の方",
    href: "/robot-rental",
  },
  {
    key: "aio",
    no: "05",
    title: "AIO・AI検索最適化 事業紹介資料",
    lead: "AI検索で自社の情報が理解・参照される状態を整える支援について。対象質問の整理、文章・サイト構造の改善、公開後の確認方法をまとめています。",
    contents: ["対象質問と一次情報の整理", "文章・構造の改善と支援の進め方", "言及・引用・流入を分けた確認方法", "見積り前の確認事項と保証しない事項"],
    audience: "AI検索での情報の伝わり方を改善したい方",
    href: "/aio",
  },
  {
    key: "website-production",
    no: "06",
    title: "ホームページ制作 事業紹介資料",
    lead: "会社やサービスの強みを伝え、問い合わせにつなげるホームページ制作について。企画から制作・公開までの流れと、費用を決める条件をまとめています。",
    contents: ["目的と掲載情報の整理", "企画・デザイン・実装・公開の流れ", "対応範囲と納品・運用の確認事項", "費用の考え方と相談前のチェックリスト"],
    audience: "新規制作やサイトのリニューアルを検討中の方",
    href: "/website-production",
  },
  {
    key: "sns-management",
    no: "07",
    title: "SNS運用代行 事業紹介資料",
    lead: "企業のSNS発信を継続するための運用支援について。方針づくり、投稿制作、承認の手順、振り返りと改善の進め方をまとめています。",
    contents: ["目的・媒体・対象者の整理", "投稿企画と文章・画像の制作", "公開前の確認と運用体制", "レポート・費用・対応範囲の確認事項"],
    audience: "SNSの発信方針や日々の運用に課題がある方",
    href: "/sns-management",
  },
  {
    key: "meo",
    no: "08",
    title: "Googleマップ・MEO支援 事業紹介資料",
    lead: "Googleビジネスプロフィールの情報整備と日々の運用について。店舗情報、写真・投稿、口コミ返信、振り返りの進め方をまとめています。",
    contents: ["店舗情報の整備と運用内容", "写真・投稿・口コミ返信の確認手順", "レポートと改善の進め方", "費用・対応範囲と運用上の注意点"],
    audience: "店舗の情報更新やGoogleマップでの案内を改善したい方",
    href: "/meo",
  },
];

export default async function DownloadPage({ searchParams }: { searchParams: Promise<{ document?: string }> }) {
  const { document } = await searchParams;
  const initialDocument = DOCUMENT_KEYS.find((key) => key === document);
  return (
    <div className="bg-white">
      <PageHeader
        kicker="Download"
        title="事業紹介資料"
        description="社内での検討・稟議にそのままお使いいただける資料をご用意しています。ご希望の資料を選び、必要事項を入力するとその場でPDFをダウンロードできます。すべての資料をまとめて受け取ることもできます。"
        crumbs={[{ label: "ホーム", href: "/" }, { label: "資料請求" }]}
      />

      <div className="mx-auto max-w-[1800px] px-6 pt-5 lg:px-8"><a href="#guide-preview-title" className="inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4">入力前に資料の表紙・目次・本文冒頭をプレビューする</a></div>
      {/* 資料選択 ＋ 実績（実績は全幅の帯をやめ、左に小さく添える） */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-14">
            {/* 左: 実績 */}
            <aside>
              <h2 className="text-xs font-bold tracking-[0.14em] text-neutral-400">過去の取引実績</h2>
              <ul className="mt-4 grid grid-cols-3 gap-px border border-neutral-200 bg-neutral-200">
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
              <p className="mb-6 text-sm leading-7 text-neutral-600">会社紹介・開発・旧研修の資料は掲載内容を見直しているため配布を停止しています。Codex研修の現在の内容・費用は<a href="/training/codex" className="underline underline-offset-4">Codex研修ページ</a>でご確認ください。</p>
              <DownloadRequestForm key={initialDocument ?? "all"} decks={DECKS} initialDocument={initialDocument} />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 py-10" aria-labelledby="guide-preview-title">
        <div className="mx-auto max-w-[1800px] px-6 lg:px-8"><h2 id="guide-preview-title" className="scroll-mt-28 text-2xl font-bold text-neutral-900">資料の中身を登録せず確認する</h2><p className="mt-3 text-sm leading-7 text-neutral-600">各資料の表紙と本文冒頭をプレビューできます。ページ数とPDF作成日も比較して、必要な資料をお選びください。</p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">{DECKS.map(deck => {
            const fileKey = `${deck.key}-guide`;
            const info = guideMetadata[fileKey as keyof typeof guideMetadata];
            return <details key={deck.key} className="rounded-lg border border-neutral-300 p-5"><summary className="cursor-pointer text-base font-bold text-neutral-900">{deck.title}<span className="mt-2 block text-sm font-normal text-neutral-600">全{info.pages}ページ / PDF作成日 {info.pdfCreated} / 表紙・本文を開く</span></summary><p className="my-4 text-sm leading-7 text-neutral-700">{deck.contents.join(" / ")}</p><div className="grid grid-cols-2 gap-3">{info.previews.map((image,index) => <a key={image} href={image} target="_blank" rel="noopener noreferrer" className="block border border-neutral-200"><Image src={image} alt={`${deck.title} ${index+1}ページ目`} width={700} height={1000} className="h-auto w-full" /><span className="block px-2 py-2 text-xs underline">{index+1}ページ目を拡大（別タブ）</span></a>)}</div><Link href={`/download?document=${deck.key}`} className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4">この資料を選択する</Link></details>;
          })}</div>
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
            <a data-ui-button="filled"
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-cta hover:bg-cta-hover px-8 py-4 text-sm font-semibold text-white transition-opacity hover:opacity-80"
            >
              無料相談を予約する
              <span aria-hidden>→</span>
            </a>
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
  );
}

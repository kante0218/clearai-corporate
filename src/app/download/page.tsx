import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Image from "next/image";
import { CLIENT_LOGOS } from "@/components/ClientLogoGrid";
import DownloadRequestForm from "@/components/DownloadRequestForm";
import type { DocumentKey } from "@/lib/validators";
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
    key: "company",
    no: "01",
    title: "会社紹介資料",
    lead:
      "ClearAIの事業全体像、支援の進め方、体制、これまでにお受けした案件をまとめた1部です。どの事業からご相談すべきか決まっていない段階の方へ。",
    contents: [
      "事業の全体像（開発・レンタル・研修・コンサルティング）",
      "支援の進め方と、意思決定のタイミング",
      "これまでにお受けした案件",
      "会社概要・連絡先",
    ],
    audience: "何から相談すべきか決めかねている方",
  },
  {
    key: "software-development",
    no: "02",
    title: "システム・ソフトウェア開発 事業紹介資料",
    lead:
      "AIを組み込んだ業務システムの受託開発について。見積がどう組み上がるか、着手前に何を決めるか、なぜ「作ったが使われない」が起きるのかまで踏み込んだ内容です。",
    contents: [
      "AI開発が失敗する構造と、その対処",
      "着手前に決める3つのこと（対象業務・合格ライン・測り方）",
      "進め方と、最短2週間のプロトタイプ",
      "対応領域6つと技術スタック",
      "費用の考え方／見積書で確認すべき5項目",
      "契約・成果物の権利・データの扱い",
    ],
    audience: "開発の外注先を検討中／他社見積を比較中の方",
    href: "/software-development",
  },
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
    key: "training",
    no: "04",
    title: "AI内製化研修 事業紹介資料",
    lead:
      "社内システムを自社で作れる状態をつくる研修について。カリキュラム、料金プラン、そして人材開発支援助成金の要件と申請フローをまとめています。",
    contents: [
      "外注依存の構造と、内製化で戻せる範囲",
      "カリキュラム（基礎・実装・定着）",
      "研修で作る成果物の例",
      "料金プラン3種",
      "人材開発支援助成金の仕組みと申請フロー",
      "受講の流れとアフターフォロー",
    ],
    audience: "社内にAIで開発できる人材を増やしたい方、助成金の活用を検討中の方",
    href: "/training",
  },
];

export default function DownloadPage() {
  return (
    <div className="bg-white">
      <PageHeader
        kicker="Download"
        title="事業紹介資料"
        description="社内での検討・稟議にそのままお使いいただける資料をご用意しています。ご希望の資料を選び、必要事項を入力するとその場でPDFをダウンロードできます。4資料まとめて受け取ることもできます。"
        crumbs={[{ label: "ホーム", href: "/" }, { label: "資料請求" }]}
      />

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
            <DownloadRequestForm decks={DECKS} />
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
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white px-8 py-4 text-sm font-semibold text-neutral-900 transition-opacity hover:opacity-80"
            >
              無料相談を予約する
              <span aria-hidden>→</span>
            </a>
            <Link
              href="/contact"
              className="text-sm font-semibold text-white/70 underline-offset-4 hover:text-white hover:underline transition-colors"
            >
              メールで相談する
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

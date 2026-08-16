import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { BOOKING_URL } from "@/lib/booking";

type Service = {
  no: string;
  title: string;
  href: string;
  lead: string;
  points: { label: string; value: string }[];
  bullets: string[];
  forWhom: string;
  docKey?: string;
};

const SERVICES: Service[] = [
  {
    no: "01",
    title: "システム・ソフトウェア開発",
    href: "/software-development",
    lead:
      "AIを組み込んだ業務システム、AIエージェント、Webアプリ、モバイル・デスクトップアプリを、要件定義から設計・開発・本番リリース・運用保守まで一貫して受託します。",
    points: [
      { label: "プロトタイプ", value: "最短2週間" },
      { label: "本番リリース", value: "3〜6ヶ月が目安" },
      { label: "費用", value: "個別お見積り" },
    ],
    bullets: [
      "AI組込の業務システム",
      "AIエージェント",
      "Webアプリケーション",
      "モバイル・デスクトップ（Swift / Kotlin / Electron）",
      "既存システム・SaaS連携",
      "インフラ構築・運用保守",
    ],
    forWhom: "外注先を検討中の方、他社見積を比較している方、要件が固まっていない段階の方",
    docKey: "software-development",
  },
  {
    no: "02",
    title: "ロボットレンタル",
    href: "/robot-rental",
    lead:
      "Unitree R1・G1（ヒューマノイド）と Go2（四足歩行）を1泊2日から全国配送でお貸しします。カタログでは分からない「自社の現場で動くか」を実機で確かめられます。",
    points: [
      { label: "最短", value: "1泊2日から" },
      { label: "補償", value: "全商品付き・免責費用なし" },
      { label: "料金", value: "¥5,000〜（税別）" },
    ],
    bullets: [
      "購入前の実機検証",
      "展示会・イベント・撮影",
      "巡回・点検のPoC",
      "研究開発（R&Dグレードは2次開発可）",
      "社内デモ・稟議用",
      "月単位の長期プラン",
    ],
    forWhom: "購入前に試したい方、実証で導入判断の材料を取りたい方",
    docKey: "robot-rental",
  },
  {
    no: "03",
    title: "FDEコンサルティング",
    href: "/ai-consulting",
    lead:
      "Forward Deployed Engineer型。助言だけで終わらせず現場に入り込み、AI活用の戦略策定から実装・定着までを一気通貫で伴走します。",
    points: [
      { label: "関与", value: "実装まで担当" },
      { label: "起点", value: "対象業務の見極めから" },
      { label: "費用", value: "個別お見積り" },
    ],
    bullets: [
      "対象業務の棚卸しと優先順位づけ",
      "合格ラインの定義と評価設計",
      "PoCから本番実装まで",
      "業務自動化の設計",
      "社内展開・定着の支援",
    ],
    forWhom: "何から手をつけるべきか決まっていない方、推進担当が不在の方",
  },
  {
    no: "04",
    title: "AI内製化研修",
    href: "/training",
    lead:
      "AIを使って社内システムを自社で作れる人材を育てる実践型プログラム。研修が終わるときには、動く社内システムが1つ完成しています。",
    points: [
      { label: "対象", value: "非エンジニアも可" },
      { label: "標準", value: "全10回・計20時間〜" },
      { label: "助成金", value: "対象となる場合あり" },
    ],
    bullets: [
      "基礎：生成AIの全体像・限界・プロンプト設計",
      "実装：ノーコード＋AIでの社内ツール構築",
      "定着：社内展開・レビュー運用・改善サイクル",
      "Claude / ChatGPT / Gemini / Copilot から選択",
      "助成金の制度選定〜申請サポート",
      "研修後のアフターフォロー",
    ],
    forWhom: "外注依存から脱したい方、社内に作れる人を増やしたい方",
    docKey: "training",
  },
];

export default function ServicePage() {
  return (
    <div className="bg-white">
      <PageHeader
        kicker="Service"
        title="事業内容"
        description="AIを現場で動く形にするために、4つの事業でご支援しています。どれが合うか決まっていない段階でも構いません。課題を伺って、そもそも取り組むべきかどうかからご相談に乗ります。"
        crumbs={[{ label: "ホーム", href: "/" }, { label: "事業内容" }]}
      />

      {/* Services */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <ul className="divide-y divide-neutral-200 border-t border-neutral-200">
            {SERVICES.map((s) => (
              <li key={s.href} className="py-12 md:py-16">
                <div className="grid gap-8 md:grid-cols-[auto_1fr] md:gap-12">
                  <div className="md:w-28">
                    <span className="text-sm font-semibold tracking-widest text-neutral-400">{s.no}</span>
                  </div>

                  <div className="min-w-0">
                    <h2 className="mb-4 text-2xl md:text-3xl font-bold leading-snug text-neutral-900">
                      <Link href={s.href} className="underline-offset-4 hover:underline decoration-neutral-400">
                        {s.title}
                      </Link>
                    </h2>

                    <p className="mb-8 text-[15px] leading-[1.95] text-neutral-600">{s.lead}</p>

                    <dl className="mb-8 grid gap-px border border-neutral-200 bg-neutral-200 sm:grid-cols-3">
                      {s.points.map((p) => (
                        <div key={p.label} className="bg-white px-5 py-4">
                          <dt className="mb-1 text-xs text-neutral-500">{p.label}</dt>
                          <dd className="text-sm font-bold text-neutral-900">{p.value}</dd>
                        </div>
                      ))}
                    </dl>

                    <ul className="mb-8 grid gap-2 sm:grid-cols-2">
                      {s.bullets.map((b) => (
                        <li key={b} className="relative pl-5 text-sm leading-[1.85] text-neutral-600">
                          <span aria-hidden className="absolute left-0 top-[0.72em] h-1.5 w-1.5 rounded-full bg-neutral-400" />
                          {b}
                        </li>
                      ))}
                    </ul>

                    <p className="mb-8 border-l-2 border-neutral-900 bg-neutral-50 px-5 py-3.5 text-sm leading-relaxed text-neutral-600">
                      <span className="font-semibold text-neutral-900">こんな方へ：</span>
                      {s.forWhom}
                    </p>

                    <div className="flex flex-wrap items-center gap-5">
                      <Link
                        href={s.href}
                        className="inline-flex items-center gap-2 bg-neutral-900 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
                      >
                        詳しく見る
                        <span aria-hidden>→</span>
                      </Link>
                      {s.docKey && (
                        <Link
                          href={`/contact?doc=${s.docKey}`}
                          className="text-sm text-neutral-500 underline-offset-4 hover:text-neutral-900 hover:underline transition-colors"
                        >
                          資料を請求する
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Cross links */}
      <section className="border-t border-gray-100 py-14 lg:py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <h2 className="mb-6 text-sm font-bold text-neutral-900">あわせてご覧ください</h2>
          <ul className="grid gap-4 sm:grid-cols-3">
            {[
              { href: "/flow", title: "ご依頼の流れ", desc: "ご相談から納品・定着まで、何がいつ起きるか" },
              { href: "/case-studies", title: "導入実績", desc: "実際にお受けした案件の課題とつくったもの" },
              { href: "/download", title: "資料請求", desc: "社内検討用の事業紹介資料をお送りします" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="group block border border-neutral-200 p-6 transition-colors hover:border-neutral-900">
                  <span className="mb-2 block text-base font-bold text-neutral-900">{l.title}</span>
                  <span className="block text-[13px] leading-relaxed text-neutral-600">{l.desc}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-neutral-200 bg-neutral-950 py-20 md:py-28">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8 text-center">
          <h2 className="mb-5 text-2xl md:text-3xl font-bold leading-snug text-white">
            どれが合うか、一緒に決めましょう。
          </h2>
          <p className="mb-10 text-[15px] leading-[1.9] text-white/60">
            課題を伺ったうえで、開発・レンタル・研修のどれで解くのが早いかをお伝えします。初回のご相談は無料です。
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white px-8 py-4 text-sm font-semibold text-neutral-900 transition-opacity hover:opacity-80"
          >
            無料相談を予約する
            <span aria-hidden>→</span>
          </a>
        </div>
      </section>
    </div>
  );
}

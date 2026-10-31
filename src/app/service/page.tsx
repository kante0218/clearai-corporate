"use client";
import LocalizedContent from "@/components/LocalizedContent";
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
      { label: "料金", value: "¥10,000〜（税別）" },
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
    title: "Codex研修",
    href: "/training/codex",
    lead: "要件整理から実装、テスト、レビュー、チームへの引き継ぎまで、自社の仕事を題材に学ぶ法人向け実践研修です。",
    points: [{ label: "費用", value: "個別お見積もり" }],
    bullets: ["自社の実務課題で試作・確認", "回数・内容・実施形式は個別に相談"],
    forWhom: "Codexをチームの実務に活用したい方",
  },
  {
    no: "04",
    title: "ウェブマーケティング事業",
    href: "/web-marketing",
    lead: "MEO・AIO・SEO、フォーム営業自動化、SNS運用、ホームページ制作・改善の4つを、集客や営業の目的に合わせて支援します。必要な支援だけでもご相談いただけます。",
    points: [
      { label: "起点", value: "集客・営業の課題を整理" },
      { label: "対応", value: "4つの支援から必要な範囲を選択" },
      { label: "費用", value: "個別お見積り" },
    ],
    bullets: ["MEO・AIO・SEO", "フォーム営業自動化", "SNS運用", "ホームページ制作・改善"],
    forWhom: "検索・SNS・営業・ホームページを通じて、顧客との接点を整えたい方",
  },
];

export default function ServicePage() {
  return <LocalizedContent>{(
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
                      <Link data-ui-with-icon data-ui-button="filled"
                        href={s.href}
                        className="inline-flex items-center gap-2 bg-neutral-900 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
                      ><span className="ui-button-label">詳しく見る
                        </span><span className="ui-button-icon" data-ui-side="end" aria-hidden="true"><span aria-hidden>→</span></span></Link>
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
            課題を伺ったうえで、開発・レンタル・研修・ウェブマーケティングのどれで取り組むかをお伝えします。初回のご相談は無料です。
          </p>
          <a data-ui-with-icon data-ui-button="filled"
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-cta hover:bg-cta-hover px-8 py-4 text-sm font-semibold text-white transition-opacity hover:opacity-80"
          ><span className="ui-button-label">無料相談を予約する
            </span><span className="ui-button-icon" data-ui-side="end" aria-hidden="true"><span aria-hidden>→</span></span></a>
        </div>
      </section>
    </div>
  )}</LocalizedContent>;
}

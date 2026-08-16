import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { BOOKING_URL } from "@/lib/booking";

type Step = {
  no: string;
  title: string;
  duration: string;
  desc: string;
  /** What ClearAI delivers at this step. */
  ours: string[];
  /** What we ask the client to prepare. */
  yours: string[];
  /** Shown when the client can still walk away here. */
  exit?: string;
};

const DEV_STEPS: Step[] = [
  {
    no: "01",
    title: "無料相談",
    duration: "30分",
    desc: "対象業務と現状の課題を伺います。この場で「AIで解くべきではない」とお伝えすることもあります。",
    ours: ["論点の整理", "実現可否の初期見立て", "進め方の提案"],
    yours: ["対象業務のイメージ", "現状かかっている時間と人数（分かる範囲で）"],
    exit: "ここで終了しても費用は一切かかりません。",
  },
  {
    no: "02",
    title: "業務ヒアリング",
    duration: "1〜2週間",
    desc: "実際のデータと業務フローを見せていただき、対象業務を絞り込みます。工数を左右する接続要件もここで洗い出します。",
    ours: ["業務フローの整理", "対象業務の絞り込み案", "合格ラインの案"],
    yours: [
      "実データのサンプル（機密部分はマスク可）",
      "接続したいシステムの一覧（API・仕様書・テスト環境の有無）",
      "現場担当者へのヒアリング時間",
    ],
  },
  {
    no: "03",
    title: "要件定義・お見積り",
    duration: "1〜2週間",
    desc: "要件定義書と構成図をお出しし、工程ごとの工数を明示したお見積りをご提示します。合格ラインはここで確定させます。",
    ours: ["要件定義書", "システム構成図", "工程別の見積書", "概算スケジュール"],
    yours: ["合格ラインの合意（対象業務・数値・測り方）", "社内の意思決定者との調整"],
    exit: "他社と比較検討いただいて構いません。要件定義書はそのまま比較にお使いください。",
  },
  {
    no: "04",
    title: "ご契約",
    duration: "—",
    desc: "成果物の権利、提供データの取り扱い、体制の継続性を契約に明記します。プロンプトと評価データセットは発注者側に帰属します。",
    ours: ["契約書のご提示", "NDA締結"],
    yours: ["社内稟議・押印"],
  },
  {
    no: "05",
    title: "プロトタイプ",
    duration: "最短2週間",
    desc: "実際に触れるものを構築します。御社の実データで精度を測り、本番開発に進むかどうかをここで判断していただきます。",
    ours: ["動くプロトタイプ", "実データでの評価結果", "本番化した場合の工数と構成"],
    yours: ["現場担当者に触っていただく時間", "評価データの提供"],
    exit: "評価結果を見て、対象業務の絞り込み・方式変更・中止のいずれも選べます。",
  },
  {
    no: "06",
    title: "本番開発・リリース",
    duration: "2〜5ヶ月",
    desc: "設計・実装・テスト・既存システム連携・データ移行を行い、本番稼働まで担当します。定例で進捗と判断事項を共有します。",
    ours: ["設計・実装・テスト", "既存システム連携", "データ移行", "運用手順書・引き継ぎ資料"],
    yours: ["定例での意思決定", "受け入れテストの実施"],
  },
  {
    no: "07",
    title: "運用保守・改善",
    duration: "継続",
    desc: "リリース後の監視・改善・機能追加を担当します。社内で回せる状態にしたい場合は、引き継ぎまで設計します。",
    ours: ["監視・障害対応", "機能追加・改善", "社内エンジニアへの引き継ぎ支援"],
    yours: ["改善要望の集約"],
  },
];

const OTHER_FLOWS = [
  {
    title: "ロボットレンタル",
    href: "/robot-rental",
    steps: [
      "お問い合わせ（利用日・機種・設置場所をお知らせください）",
      "空き状況の確認・お見積り（レンタル料金＋送料込み）",
      "ご契約・お支払い（キャンセルは発送日の1営業日前まで無料）",
      "発送・お受け取り（全国配送）",
      "ご利用（延長は1日単位で当日対応可）",
      "ご返却",
    ],
  },
  {
    title: "AI内製化研修",
    href: "/training",
    steps: [
      "無料相談・内製化診断（30分〜。助成金の対象可否もこの場で試算）",
      "プラン確定・助成金の計画届（2〜4週間）",
      "研修の実施（全10回・計20時間〜／週1回×2時間を目安に約2〜3ヶ月）",
      "内製の定着・アフターフォロー（3ヶ月〜。支給申請もサポート）",
    ],
  },
];

export default function FlowPage() {
  return (
    <div className="bg-white">
      <PageHeader
        kicker="Flow"
        title="ご依頼の流れ"
        description="発注してから何が起きるのかが見えないと、判断はできません。各ステップで「私たちが出すもの」「お願いすること」「どこで止められるか」を先に書いておきます。"
        crumbs={[{ label: "ホーム", href: "/" }, { label: "ご依頼の流れ" }]}
      />

      {/* Principle */}
      <section className="border-b border-gray-100 py-14 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <div className="border-l-2 border-neutral-900 bg-neutral-50 px-6 py-6">
            <p className="mb-2 text-sm font-bold text-neutral-900">進め方の原則</p>
            <p className="text-[15px] leading-[1.95] text-neutral-600">
              いきなりフルスコープでお受けすることはしません。工程を区切り、そのつど判断できる状態でお渡しします。
              数百万円の本番開発に進んでから「思っていたものと違う」と気づくより、はるかに安く済むためです。
            </p>
          </div>
        </div>
      </section>

      {/* Dev steps */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="mb-3 text-2xl md:text-3xl font-bold text-neutral-900">
              システム・ソフトウェア開発の場合
            </h2>
            <p className="text-sm leading-relaxed text-neutral-600">
              ご相談から本番リリースまで、標準で3〜6ヶ月が目安です（スコープと連携先の数により変動します）。
            </p>
          </div>

          <ol className="divide-y divide-neutral-200 border-t border-neutral-200">
            {DEV_STEPS.map((s) => (
              <li key={s.no} className="py-10 md:py-12">
                <div className="grid gap-6 md:grid-cols-[auto_1fr] md:gap-10">
                  <div className="md:w-40">
                    <div className="flex items-baseline gap-3 md:flex-col md:items-start md:gap-2">
                      <span className="text-sm font-semibold tracking-widest text-neutral-400">{s.no}</span>
                      <span className="border border-neutral-200 px-2.5 py-1 text-xs text-neutral-600">{s.duration}</span>
                    </div>
                  </div>

                  <div className="min-w-0">
                    <h3 className="mb-3 text-xl font-bold leading-snug text-neutral-900">{s.title}</h3>
                    <p className="mb-7 text-[15px] leading-[1.95] text-neutral-600">{s.desc}</p>

                    <div className="grid gap-px border border-neutral-200 bg-neutral-200 sm:grid-cols-2">
                      <div className="bg-white p-5">
                        <p className="mb-3 text-xs font-bold text-neutral-900">ClearAI が出すもの</p>
                        <ul className="space-y-1.5">
                          {s.ours.map((o) => (
                            <li key={o} className="relative pl-4 text-[13px] leading-relaxed text-neutral-600">
                              <span aria-hidden className="absolute left-0 top-[0.62em] h-1 w-1 rounded-full bg-neutral-400" />
                              {o}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white p-5">
                        <p className="mb-3 text-xs font-bold text-neutral-900">お願いすること</p>
                        <ul className="space-y-1.5">
                          {s.yours.map((y) => (
                            <li key={y} className="relative pl-4 text-[13px] leading-relaxed text-neutral-600">
                              <span aria-hidden className="absolute left-0 top-[0.62em] h-1 w-1 rounded-full bg-neutral-400" />
                              {y}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {s.exit && (
                      <p className="mt-5 text-[13px] leading-relaxed text-neutral-500">
                        <span className="font-semibold text-neutral-900">ここで止められます：</span>
                        {s.exit}
                      </p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Other flows */}
      <section className="border-t border-gray-100 py-14 lg:py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <h2 className="mb-10 text-2xl md:text-3xl font-bold text-neutral-900">その他の事業の流れ</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {OTHER_FLOWS.map((f) => (
              <div key={f.href} className="border border-neutral-200 p-7 md:p-8">
                <h3 className="mb-5 text-lg font-bold text-neutral-900">
                  <Link href={f.href} className="underline-offset-4 hover:underline decoration-neutral-400">
                    {f.title}
                  </Link>
                </h3>
                <ol className="space-y-3">
                  {f.steps.map((s, i) => (
                    <li key={s} className="relative pl-9 text-[13px] leading-[1.85] text-neutral-600">
                      <span
                        aria-hidden
                        className="absolute left-0 top-[0.1em] flex h-6 w-6 items-center justify-center rounded-full bg-neutral-900 text-[11px] font-bold text-white"
                      >
                        {i + 1}
                      </span>
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-neutral-200 bg-neutral-950 py-20 md:py-28">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8 text-center">
          <h2 className="mb-5 text-2xl md:text-3xl font-bold leading-snug text-white">
            まずは30分、話を聞かせてください。
          </h2>
          <p className="mb-10 text-[15px] leading-[1.9] text-white/60">
            要件が固まっていない段階のご相談が最も多いです。この場で終了しても費用は一切かかりません。
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
              href="/download"
              className="text-sm font-semibold text-white/70 underline-offset-4 hover:text-white hover:underline transition-colors"
            >
              先に資料を見る
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

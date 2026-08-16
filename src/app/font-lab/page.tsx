"use client";

import { useState } from "react";
import { CANDIDATES, type FontCandidate } from "./fonts";

/**
 * 書体比較用のローカル検証ページ（本番導線には出さない）。
 * /robot-rental 基準のクラス（text-3xl / text-base / text-sm / leading-relaxed 等）を
 * そのまま使い、書体だけを差し替えて見比べられるようにしている。
 */

const CARDS = [
  { num: "01", title: "AI組込業務システム", desc: "申請・管理・集計といった社内業務システムに、生成AIによる自動入力・要約・判定を組み込んで開発します。" },
  { num: "02", title: "AIエージェント開発", desc: "問い合わせ対応・書類作成・情報収集などを自律的に処理するAIエージェントを設計・開発し、実際の業務フローに組み込みます。" },
  { num: "03", title: "モバイル・デスクトップアプリ", desc: "iOS・macOSはSwift、WindowsはElectronなど、プラットフォーム標準の技術でネイティブ品質のアプリを開発します。" },
];

const ROWS = [
  { period: "1泊2日", basic: "¥50,000", rd: "¥100,000" },
  { period: "3泊4日", basic: "¥125,000", rd: "¥250,000" },
  { period: "1ヶ月", basic: "¥600,000", rd: "¥1,200,000" },
];

function Sample({ font }: { font: FontCandidate }) {
  return (
    <div style={{ fontFamily: font.stack }} className="bg-white">
      {/* PAGE HEADER 相当 */}
      <section className="pt-10 pb-4 lg:pb-5 bg-white border-b border-gray-100">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <p className="text-sm font-semibold text-neutral-900 mb-3">System &amp; Software Development</p>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">システム・ソフトウェア開発</h1>
          <p className="text-base text-gray-600 leading-relaxed w-full mb-6">
            AIを組み込んだ業務システムを、要件定義から設計・開発・本番運用まで受託で一貫してお引き受けします。
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center justify-center rounded-lg bg-neutral-900 text-white text-sm font-semibold px-6 py-3">開発の相談をする</span>
            <span className="inline-flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 text-sm font-semibold px-6 py-3">ご提供プランを見る</span>
          </div>
        </div>
      </section>

      {/* カード */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <p className="text-sm font-semibold text-neutral-900 mb-4">Development Areas</p>
          <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">開発できるもの</h2>
          <p className="text-base text-gray-500 leading-relaxed mb-8">
            実績・安定性・サポート体制が確立された技術を軸に採用し、記載以外の言語・フレームワークにも貴社の既存環境に合わせて対応します。
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {CARDS.map((c) => (
              <div key={c.num} className="bg-white rounded-lg border border-gray-200 p-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-bold text-neutral-900 flex-shrink-0">{c.num}</span>
                  <h3 className="text-xl font-bold text-gray-900">{c.title}</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 数字（料金表） */}
      <section className="py-14 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <p className="text-sm font-semibold text-neutral-900 mb-4">Pricing</p>
          <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-8">レンタル料金</h2>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 lg:p-8 md:max-w-2xl">
            <div className="flex items-baseline gap-3 mb-6">
              <h3 className="text-xl font-bold text-gray-900">Unitree G1</h3>
              <span className="text-xs text-gray-500">ヒューマノイド（2足歩行）</span>
            </div>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left font-semibold text-gray-900 py-2.5 pr-4">期間</th>
                  <th className="text-right font-semibold text-gray-900 py-2.5 pl-4">Basic</th>
                  <th className="text-right font-semibold text-gray-900 py-2.5 pl-4">R&amp;D</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.period} className="border-b border-gray-100">
                    <td className="py-2.5 pr-4 text-gray-600 whitespace-nowrap">{r.period}</td>
                    <td className="py-2.5 pl-4 text-right text-gray-900 font-medium tabular-nums">{r.basic}</td>
                    <td className="py-2.5 pl-4 text-right text-gray-900 font-medium tabular-nums">{r.rd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 流れ + FAQ */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <p className="text-sm font-semibold text-neutral-900 mb-4">Process</p>
          <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-8">開発の流れ</h2>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-10 border-b border-gray-200">
            <div className="lg:col-span-1"><span className="text-sm font-bold text-neutral-900">01</span></div>
            <div className="lg:col-span-3">
              <h3 className="text-xl font-bold text-gray-900">ヒアリング・要件定義</h3>
              <p className="text-sm text-gray-400 mt-1">Requirements</p>
            </div>
            <div className="lg:col-span-8">
              <p className="text-sm text-gray-600 leading-relaxed">
                現場の業務フローと課題を伺い、何を作るべきかを整理します。要件が固まっていない段階からご相談いただけます。
              </p>
            </div>
          </div>
          <div className="border-b border-gray-200 py-5">
            <p className="font-semibold text-gray-900 mb-3">要件が固まっていない状態でも相談できますか？</p>
            <p className="text-gray-600 text-sm leading-relaxed">
              はい。「何を作るべきか」の整理から一緒に行い、要件定義そのものもお引き受けしますので、構想段階でお声がけください。
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-neutral-900 mb-4">Contact</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">作りたいものを、聞かせてください。</h2>
          <p className="text-base text-gray-600 leading-relaxed mb-10">
            「これはシステムで解決できるのか」という段階でも構いません。実現可能性と概算の進め方を、率直にお伝えします。
          </p>
          <span className="rounded-lg bg-neutral-900 text-white font-semibold px-10 py-4 inline-block">開発の相談をする</span>
        </div>
      </section>
    </div>
  );
}

export default function FontLabPage() {
  const [activeId, setActiveId] = useState(CANDIDATES[0].id);
  const [stacked, setStacked] = useState(false);
  const active = CANDIDATES.find((f) => f.id === activeId) ?? CANDIDATES[0];
  const shown = stacked ? CANDIDATES : [active];

  return (
    <div className="pt-20">
      {/* コントロールバー */}
      <div className="sticky top-16 z-40 border-y border-gray-200 bg-white/95 backdrop-blur">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8 py-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 mr-1">Font Lab</span>
            {CANDIDATES.map((f) => (
              <button
                key={f.id}
                onClick={() => { setActiveId(f.id); setStacked(false); }}
                style={{ fontFamily: f.stack }}
                className={`rounded-lg border px-3 py-1.5 text-sm font-semibold transition-colors ${
                  !stacked && activeId === f.id
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900"
                }`}
              >
                {f.name}
              </button>
            ))}
            <button
              onClick={() => setStacked((v) => !v)}
              className={`ml-auto rounded-lg border px-3 py-1.5 text-sm font-semibold transition-colors ${
                stacked ? "border-neutral-900 bg-neutral-900 text-white" : "border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900"
              }`}
            >
              {stacked ? "1書体ずつ表示" : "6書体を縦に並べる"}
            </button>
          </div>
        </div>
      </div>

      {shown.map((f) => (
        <div key={f.id}>
          <div className="max-w-[1800px] mx-auto px-6 lg:px-8 pt-10 pb-4">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: f.stack }}>{f.name}</h2>
              {f.current && <span className="rounded-md bg-neutral-900 px-2 py-0.5 text-xs font-semibold text-white">現行</span>}
              <span className="rounded-md border border-gray-200 px-2 py-0.5 text-xs font-semibold text-gray-600">{f.delivery}</span>
              <span className="text-xs text-gray-500">欧文: {f.latin}</span>
            </div>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">{f.note}</p>
            <p className="mt-1 text-sm text-gray-500 leading-relaxed">印象: {f.impression}</p>
          </div>
          <div className="border-y border-gray-200">
            <Sample font={f} />
          </div>
        </div>
      ))}

      <div className="max-w-[1800px] mx-auto px-6 lg:px-8 py-10">
        <p className="text-xs text-gray-400 leading-relaxed">
          このページはローカル検証用です。決めた書体は globals.css の --font-sans / --font-display と layout.tsx の next/font 設定に反映します。
        </p>
      </div>
    </div>
  );
}

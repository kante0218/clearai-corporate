"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>{children}</div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <p className="text-sm font-semibold text-sky-600 mb-4">{children}</p>;
}

export default function AdvertisingPage() {
  return (
    <>
      {/* PAGE HEADER */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <p className="text-sm font-semibold text-sky-600 mb-3">AI Advertising</p>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">AI広告運用</h1>
          <p className="text-base text-gray-600 leading-relaxed max-w-2xl">生成AIで、コピー・クリエイティブ・入札・分析までを高速化。AIで磨き続ける広告運用へ転換するご支援を行います。</p>
        </div>
      </section>

      {/* CHALLENGES */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Challenges</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-snug mb-14 max-w-2xl">こんな課題、ありませんか？</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "クリエイティブが枯渇", desc: "広告バナー・動画・コピーの量産が追いつかず、CTRが頭打ちになっている。" },
              { title: "運用工数が重い", desc: "入札調整・除外設定・レポート作成に時間を取られ、戦略を考える余裕がない。" },
              { title: "効果測定が曖昧", desc: "媒体ごとのCPA／ROASは見えても、事業KPIへの寄与度まで踏み込めていない。" },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="rounded-2xl border border-gray-200 bg-white p-8 hover:shadow-lg transition-all duration-300 h-full">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Services</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">提供サービス</h2>
            <p className="text-sm text-gray-500 mb-14 max-w-2xl leading-relaxed">
              Google広告・Meta広告・YouTube広告・LINE広告など主要媒体に対応。AIネイティブな運用フローで、人手では不可能な検証速度を実現します。
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { num: "01", title: "AIクリエイティブ生成", desc: "テキスト・バナー・動画のバリエーションをAIで大量生成し、最も刺さるパターンをデータドリブンに見つけ出します。" },
              { num: "02", title: "広告コピー最適化", desc: "ターゲット・媒体ごとに数十パターンのコピーをLLMで自動生成し、ABテストの設計から効果検証まで支援します。" },
              { num: "03", title: "入札・配信最適化", desc: "媒体APIと連携した自動運用ルールを構築。週次の手動最適化を、日次・時間次の自動最適化に置き換えます。" },
              { num: "04", title: "レポート自動化", desc: "GA4・各媒体・CRMを統合したダッシュボードを構築。週次レポート作成の工数を90%以上削減します。" },
              { num: "05", title: "オーディエンス設計", desc: "1stパーティデータを活用した類似拡張・除外設計を、AIによるセグメント分析で精緻化します。" },
              { num: "06", title: "LP最適化（CRO）", desc: "広告クリエイティブとLPの一貫性をAIでチェック。離脱要因の特定と改善案提示までセットで提供します。" },
            ].map((item, i) => (
              <Reveal key={item.num} delay={i * 80}>
                <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:border-sky-200 hover:shadow-lg transition-all duration-300 h-full">
                  <span className="text-sm font-bold text-sky-600 mb-3 inline-block">{item.num}</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CHANNELS */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Channels</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-14">対応媒体</h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "Google広告", desc: "リスティング・P-MAX・YouTube広告" },
              { title: "Meta広告", desc: "Facebook・Instagram・Reels" },
              { title: "LINE広告", desc: "LINE広告・LINE公式アカウント連携" },
              { title: "X / TikTok 他", desc: "新興媒体の効果検証・拡張運用" },
            ].map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <div className="rounded-xl border border-gray-200 bg-white p-5 h-full">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Features</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-14">clearAI広告運用の特徴</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { num: "01", title: "AIネイティブな運用体制", desc: "従来の運用代行とは異なり、AIを「使う前提」でフローを再設計。検証サイクルを2〜5倍に加速します。" },
              { num: "02", title: "事業KPIから逆算", desc: "CPA／ROASだけでなく、LTV・粗利・CAC回収期間まで踏み込んだ運用設計を行います。" },
              { num: "03", title: "コンサル × エンジニア体制", desc: "戦略コンサル出身者と実装エンジニアが同じチームで運用。媒体APIや独自ツール開発もワンストップ。" },
              { num: "04", title: "透明性の高いレポート", desc: "施策単位の意思決定ログをすべて開示。代理店ブラックボックスを排除します。" },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="rounded-2xl border border-gray-200 bg-white p-8 hover:shadow-lg transition-all duration-300 h-full">
                  <span className="text-xs font-semibold text-sky-600 tracking-widest">{item.num}</span>
                  <h3 className="text-lg font-bold text-gray-900 mt-2 mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Pricing</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">料金の目安</h2>
            <p className="text-sm text-gray-500 mb-14 max-w-2xl leading-relaxed">
              月額固定＋広告費に対する成果報酬の組み合わせも可能です。詳しくはお気軽にご相談ください。
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {[
              { name: "スタート", price: "15万円〜", unit: "/ 月", desc: "1媒体・小規模スタートに。", features: ["1媒体運用", "週次レポート", "AIクリエイティブ生成（月10案）", "Slack質問対応"], featured: false },
              { name: "グロース", price: "35万円〜", unit: "/ 月", desc: "複数媒体での本格運用。", features: ["3媒体まで運用", "日次ダッシュボード", "AIクリエイティブ生成（月30案）", "LP最適化提案", "月次戦略MTG"], featured: true },
              { name: "エンタープライズ", price: "ご相談", unit: "", desc: "全社マーケティング統合。", features: ["媒体無制限", "専用ダッシュボード構築", "独自ツール開発", "事業KPIダッシュボード", "戦略コンサル込み"], featured: false },
            ].map((plan, i) => (
              <Reveal key={plan.name} delay={i * 100} className="flex">
                <div className={`rounded-2xl p-8 lg:p-10 transition-all duration-300 flex flex-col w-full ${plan.featured ? "bg-sky-600 text-white shadow-xl" : "bg-white border border-gray-200 hover:shadow-lg"}`}>
                  {plan.featured && <span className="inline-block rounded-full bg-white/20 text-white px-3 py-1 text-sm font-semibold mb-4 self-start">Popular</span>}
                  <h3 className={`text-lg font-bold mb-2 ${plan.featured ? "text-white" : "text-gray-900"}`}>{plan.name}</h3>
                  <div className="mb-4 flex items-baseline gap-1">
                    <span className={`text-3xl font-bold ${plan.featured ? "text-white" : "text-gray-900"}`}>{plan.price}</span>
                    {plan.unit && <span className={`text-sm ${plan.featured ? "text-white/80" : "text-gray-500"}`}>{plan.unit}</span>}
                  </div>
                  <p className={`text-sm leading-relaxed mb-6 ${plan.featured ? "text-white/80" : "text-gray-600"}`}>{plan.desc}</p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${plan.featured ? "bg-white/40" : "bg-sky-500"}`} />
                        <span className={`text-sm ${plan.featured ? "text-white/90" : "text-gray-600"}`}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="/contact?service=advertising" className={`block text-center text-sm font-semibold py-3 rounded-lg transition-all duration-300 mt-auto ${plan.featured ? "bg-white text-sky-600 hover:bg-sky-50" : "border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900"}`}>相談する</a>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300}>
            <p className="text-xs text-gray-500 text-center mt-8">表示価格は税抜。広告費は別途。業種・媒体構成により個別見積もりとなる場合があります。</p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Reveal>
            <Label>Contact</Label>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">広告運用を、AIで磨き続ける。</h2>
            <p className="text-base text-gray-600 leading-relaxed mb-10">現在の広告運用を無料診断します。改善ポイントの洗い出しから、具体的な実行プランまでご提案します。</p>
            <a href="/contact?service=advertising" className="rounded-lg bg-sky-600 text-white font-semibold px-10 py-4 hover:bg-sky-700 transition-colors duration-300 inline-block">無料診断を申し込む</a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

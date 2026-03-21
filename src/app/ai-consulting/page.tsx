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
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(50px)",
      transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>{children}</div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <p className="text-[11px] tracking-[0.25em] uppercase mb-6 font-medium text-gray-400">{children}</p>;
}

export default function AiConsultingPage() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setHeroLoaded(true), 100); }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute bottom-1/3 right-1/4 w-[1px] h-[1px] shadow-[0_0_300px_150px_rgba(37,99,235,0.07)]" />
        <div className="relative z-10 max-w-[900px] mx-auto px-8 text-center">
          <p className="text-[12px] tracking-[0.3em] uppercase text-gray-400 mb-8 transition-all duration-1000" style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "300ms" }}>AI Implementation Support</p>
          <h1 className="text-[clamp(2rem,5vw,4rem)] font-extralight text-gray-900 leading-[1.4] tracking-[0.04em] mb-8 transition-all duration-1000" style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(30px)", transitionDelay: "500ms" }}>
            AI導入を、<br /><span className="font-light">共に考え、共に創る。</span>
          </h1>
          <p className="text-[14px] text-gray-500 leading-[2.2] max-w-lg mx-auto mb-14 font-light transition-all duration-1000" style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "700ms" }}>
            戦略策定から開発・実装・運用まで、一気通貫でサポート。<br />貴社のビジネスに最適なAIソリューションを共に創り上げます。
          </p>
          <div className="flex items-center justify-center gap-6 transition-all duration-1000" style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "900ms" }}>
            <a href="/contact" className="text-[12px] tracking-[0.1em] text-white bg-[#2563eb] px-8 py-3.5 hover:bg-[#1d4ed8] transition-all duration-500">無料相談を申し込む</a>
            <a href="#services" className="text-[12px] tracking-[0.1em] text-gray-400 hover:text-gray-900 transition-colors duration-300">サービスを見る →</a>
          </div>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-[9px] tracking-[0.3em] text-gray-300 uppercase">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-gray-300 to-transparent origin-top animate-[lineGrow_1.5s_ease-out_1.2s_both]" />
        </div>
      </section>

      {/* INTRO */}
      <section className="py-32 lg:py-44 bg-white">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <Reveal>
            <Label>About</Label>
            <div className="max-w-3xl">
              <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-extralight text-gray-900 leading-[1.6] tracking-[0.02em] mb-8">AIは魔法ではなく、道具です。<br />正しく使えば、確実に成果が出ます。</h2>
              <p className="text-[14px] text-gray-500 leading-[2.4] font-light">
                多くの企業が「AIを導入したい」と考えながら、何から始めればいいかわからずに立ち止まっています。clear AIは、AIの専門知識がない企業でも安心して始められるよう、ヒアリングから運用定着まで伴走します。派手な提案ではなく、貴社の課題に合った地に足のついたAI活用を、一緒に見つけていきます。
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICE AREAS - hover color cards */}
      <section id="services" className="py-32 lg:py-44 bg-[#f9fafb]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <Reveal>
            <Label>Service Areas</Label>
            <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-extralight text-gray-900 leading-[1.5] tracking-[0.02em] mb-20 max-w-xl">4つの支援領域</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200">
            {[
              { num: "01", title: "AI戦略策定", desc: "現状分析から導入ロードマップの策定まで。ROIを試算し、優先度の高い領域から着手する実行可能な計画を立案します。", hoverBg: "hover:bg-blue-50" },
              { num: "02", title: "データ分析・活用", desc: "社内データの棚卸しと分析基盤の構築。散在するデータを統合し、AIが活用できる形に整備します。", hoverBg: "hover:bg-emerald-50" },
              { num: "03", title: "業務自動化", desc: "繰り返しの多い業務をAIで自動化。カスタマーサポート、文書処理、データ入力など、人がやらなくていい仕事を見つけ出します。", hoverBg: "hover:bg-amber-50" },
              { num: "04", title: "生成AI活用", desc: "ChatGPT・Claudeなどの生成AIを業務フローに組み込むご支援。社内ナレッジベースとの連携やカスタムチャットボットの構築も。", hoverBg: "hover:bg-purple-50" },
            ].map((item, i) => (
              <Reveal key={item.num} delay={i * 100}>
                <div className={`bg-white p-10 lg:p-14 transition-all duration-500 cursor-default group ${item.hoverBg}`}>
                  <span className="text-[11px] tracking-[0.2em] text-[#2563eb] font-medium group-hover:text-[#1d4ed8] transition-colors duration-500">{item.num}</span>
                  <h3 className="text-xl font-light text-gray-900 mt-4 mb-5 tracking-[0.02em] group-hover:translate-x-2 transition-transform duration-500">{item.title}</h3>
                  <p className="text-[13px] text-gray-500 leading-[2.2] font-light group-hover:text-gray-600 transition-colors duration-500">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-32 lg:py-44 bg-white">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <Reveal>
            <Label>Process</Label>
            <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-extralight text-gray-900 leading-[1.5] tracking-[0.02em] mb-20 max-w-xl">導入の流れ</h2>
          </Reveal>
          {[
            { num: "01", title: "ヒアリング", en: "Hearing", desc: "課題・目標の整理と現状分析を実施。現場へのインタビューも行い、本当に効果が出る領域を特定します。" },
            { num: "02", title: "戦略提案", en: "Strategy", desc: "ROIを試算した具体的な導入計画をご提案。実現可能なスケジュールと、段階的なゴール設定をお示しします。" },
            { num: "03", title: "開発・実装", en: "Development", desc: "アジャイルで迅速に開発。PoCで効果を検証しながら段階的に実装。既存システムとの連携も一貫して対応します。" },
            { num: "04", title: "運用・改善", en: "Operation", desc: "導入後の定着支援とKPI計測。社内トレーニングも実施し、自走できる体制づくりを支援します。" },
          ].map((step, i) => (
            <Reveal key={step.num} delay={i * 100}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-16 border-b border-gray-100 last:border-0 group hover:bg-gray-50/50 transition-colors duration-500 px-4 -mx-4">
                <div className="lg:col-span-1"><span className="text-[11px] tracking-[0.2em] text-[#2563eb] font-medium">{step.num}</span></div>
                <div className="lg:col-span-3">
                  <h3 className="text-xl font-light text-gray-900 tracking-[0.02em]">{step.title}</h3>
                  <p className="text-[11px] text-gray-400 tracking-[0.15em] uppercase mt-1">{step.en}</p>
                </div>
                <div className="lg:col-span-8"><p className="text-[14px] text-gray-500 leading-[2.2] font-light">{step.desc}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="py-32 lg:py-44 bg-[#f9fafb]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <Reveal>
            <Label>Pricing</Label>
            <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-extralight text-gray-900 leading-[1.5] tracking-[0.02em] mb-20 max-w-xl">料金プラン</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "スポットコンサル", price: "¥500,000〜", unit: "回", desc: "現状分析とAI活用の方向性をご提案。", features: ["現状ヒアリング（2時間）", "AI活用レポート作成", "導入ロードマップ素案", "2週間のメールサポート"], featured: false },
              { name: "スタンダード", price: "¥1,500,000〜", unit: "月", desc: "PoC〜本番実装まで。伴走型の導入支援。", features: ["月次ヒアリング・進捗会議", "AI戦略策定・設計", "PoC開発・検証", "本番実装・テスト", "社内トレーニング"], featured: true },
              { name: "エンタープライズ", price: "要相談", unit: "", desc: "大規模導入・複数部署展開に対応。", features: ["専任コンサルタント配置", "複数部署への横展開", "カスタムAI開発", "24/7サポート", "KPI計測・改善サイクル"], featured: false },
            ].map((plan, i) => (
              <Reveal key={plan.name} delay={i * 100}>
                <div className={`p-10 lg:p-12 transition-all duration-500 ${plan.featured ? "bg-[#2563eb] text-white" : "bg-white border border-gray-200 hover:border-gray-300"}`}>
                  {plan.featured && <p className="text-[10px] tracking-[0.2em] uppercase text-white/60 mb-4">Recommended</p>}
                  <h3 className={`text-lg font-light tracking-[0.02em] mb-2 ${plan.featured ? "text-white" : "text-gray-900"}`}>{plan.name}</h3>
                  <div className="mb-4">
                    <span className={`text-2xl font-extralight ${plan.featured ? "text-white" : "text-gray-900"}`}>{plan.price}</span>
                    {plan.unit && <span className={`text-[12px] ml-1 ${plan.featured ? "text-white/60" : "text-gray-400"}`}>/ {plan.unit}</span>}
                  </div>
                  <p className={`text-[13px] leading-[2] font-light mb-8 ${plan.featured ? "text-white/70" : "text-gray-500"}`}>{plan.desc}</p>
                  <ul className="space-y-3 mb-10">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span className={`text-[13px] mt-0.5 ${plan.featured ? "text-white/30" : "text-gray-300"}`}>—</span>
                        <span className={`text-[13px] font-light ${plan.featured ? "text-white/80" : "text-gray-500"}`}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="/contact" className={`block text-center text-[12px] tracking-[0.1em] py-3 transition-all duration-500 ${plan.featured ? "bg-white text-[#2563eb] hover:bg-white/90" : "border border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-900"}`}>相談する</a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 lg:py-44 bg-white">
        <div className="max-w-[700px] mx-auto px-8 text-center">
          <Reveal>
            <Label>Contact</Label>
            <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-extralight text-gray-900 leading-[1.6] tracking-[0.04em] mb-6">まずは、お話しませんか。</h2>
            <p className="text-[14px] text-gray-500 leading-[2.2] font-light mb-14">「何から始めればいいかわからない」でも大丈夫です。<br />貴社の状況をお聞きした上で、最適な進め方をご提案します。</p>
            <a href="/contact" className="text-[12px] tracking-[0.1em] text-white bg-[#2563eb] px-10 py-4 hover:bg-[#1d4ed8] transition-all duration-500 inline-block">無料で相談する</a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

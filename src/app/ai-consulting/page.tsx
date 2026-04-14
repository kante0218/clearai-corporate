"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import DXScene from "@/components/illustrations/DXScene";

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
  return <p className="text-sm font-semibold text-blue-600 mb-4">{children}</p>;
}

export default function AiConsultingPage() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setHeroLoaded(true), 100); }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Illustration — full-width background layer */}
        <div
          className="absolute inset-0 transition-all duration-1000"
          style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "200ms" }}
          aria-hidden="true"
        >
          <DXScene className="w-full h-full" />
        </div>

        {/* Gradient overlay for text legibility */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to right, rgba(255,255,255,0.90) 0%, rgba(255,255,255,0.76) 40%, rgba(255,255,255,0.22) 75%, rgba(255,255,255,0) 100%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.60))" }}
        />

        {/* Copy — overlaid, left-aligned */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-10 py-20">
          <div className="max-w-xl">
            <span
              className="inline-block rounded-full bg-blue-50/90 text-blue-600 px-3 py-1 text-sm font-semibold mb-6 transition-all duration-700"
              style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "300ms" }}
            >
              AI Implementation Support
            </span>
            <h1
              className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6 transition-all duration-700"
              style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(24px)", transitionDelay: "500ms" }}
            >
              AI導入を、<br />共に考え、共に創る。
            </h1>
            <p
              className="text-base text-gray-700 leading-relaxed mb-10 transition-all duration-700"
              style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "700ms" }}
            >
              戦略策定から開発・実装・運用まで、一気通貫でサポート。<br />貴社のビジネスに最適なAIソリューションを共に創り上げます。
            </p>
            <div
              className="flex items-center gap-4 transition-all duration-700"
              style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "900ms" }}
            >
              <a href="/contact" className="rounded-lg bg-blue-600 text-white font-semibold px-8 py-3.5 hover:bg-blue-700 transition-colors duration-300">無料相談を申し込む</a>
              <a href="#services" className="text-sm text-gray-600 font-semibold hover:text-gray-900 transition-colors duration-300">サービスを見る →</a>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              {[
                { value: "100+", label: "支援可能な業種" },
                { value: "4領域", label: "ワンストップ提供" },
                { value: "PoC→本番", label: "伴走支援" },
                { value: "2営業日", label: "初回返信" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center justify-center py-6 px-4 text-center">
                  <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                  <span className="text-xs text-gray-500 mt-1">{stat.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>About</Label>
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-gray-900 leading-snug mb-6">AIは魔法ではなく、道具です。<br />正しく使えば、確実に成果が出ます。</h2>
              <p className="text-base text-gray-600 leading-relaxed">
                多くの企業が「AIを導入したい」と考えながら、何から始めればいいかわからずに立ち止まっています。clear AIは、AIの専門知識がない企業でも安心して始められるよう、ヒアリングから運用定着まで伴走します。派手な提案ではなく、貴社の課題に合った地に足のついたAI活用を、一緒に見つけていきます。
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section id="services" className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Service Areas</Label>
            <h2 className="text-2xl font-bold text-gray-900 mb-14">4つの支援領域</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { num: "01", title: "AI戦略策定", desc: "現状分析から導入ロードマップの策定まで。ROIを試算し、優先度の高い領域から着手する実行可能な計画を立案します。", hoverBg: "hover:bg-blue-50" },
              { num: "02", title: "データ分析・活用", desc: "社内データの棚卸しと分析基盤の構築。散在するデータを統合し、AIが活用できる形に整備します。", hoverBg: "hover:bg-emerald-50" },
              { num: "03", title: "業務自動化", desc: "繰り返しの多い業務をAIで自動化。カスタマーサポート、文書処理、データ入力など、人がやらなくていい仕事を見つけ出します。", hoverBg: "hover:bg-amber-50" },
              { num: "04", title: "生成AI活用", desc: "ChatGPT・Claudeなどの生成AIを業務フローに組み込むご支援。社内ナレッジベースとの連携やカスタムチャットボットの構築も。", hoverBg: "hover:bg-cyan-50" },
            ].map((item, i) => (
              <Reveal key={item.num} delay={i * 100}>
                <div className={`bg-white rounded-2xl border border-gray-200 p-8 transition-all duration-300 cursor-default group ${item.hoverBg} hover:shadow-lg`}>
                  <span className="text-sm font-bold text-blue-600">{item.num}</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-3 mb-4">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DIFFERENTIATION */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Why Us</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-14">なぜ clear AI が選ばれるのか</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {[
              { num: "01", title: "課題ドリブン", desc: "流行ではなく、貴社の業務課題から逆算してAIを選定します。" },
              { num: "02", title: "技術選定に中立", desc: "特定ベンダー縛りなし。OpenAI、Anthropic、Google、オープンソースを横断比較。" },
              { num: "03", title: "実装まで一気通貫", desc: "戦略だけで終わらせない。PoCから本番稼働、運用定着まで。" },
              { num: "04", title: "経営との対話", desc: "現場と経営層の両方の言葉で話せる。ROI議論が可能です。" },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 100} className="h-full">
                <div className="rounded-2xl border border-gray-200 bg-white p-8 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  <span className="text-xs font-semibold text-blue-600 tracking-widest">{item.num}</span>
                  <h3 className="text-lg font-bold text-gray-900 mt-2 mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Process</Label>
            <h2 className="text-2xl font-bold text-gray-900 mb-14">導入の流れ</h2>
          </Reveal>
          {[
            { num: "01", title: "ヒアリング", en: "Hearing", desc: "課題・目標の整理と現状分析を実施。現場へのインタビューも行い、本当に効果が出る領域を特定します。" },
            { num: "02", title: "戦略提案", en: "Strategy", desc: "ROIを試算した具体的な導入計画をご提案。実現可能なスケジュールと、段階的なゴール設定をお示しします。" },
            { num: "03", title: "開発・実装", en: "Development", desc: "アジャイルで迅速に開発。PoCで効果を検証しながら段階的に実装。既存システムとの連携も一貫して対応します。" },
            { num: "04", title: "運用・改善", en: "Operation", desc: "導入後の定着支援とKPI計測。社内トレーニングも実施し、自走できる体制づくりを支援します。" },
          ].map((step, i) => (
            <Reveal key={step.num} delay={i * 100}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-10 border-b border-gray-100 last:border-0">
                <div className="lg:col-span-1"><span className="text-sm font-bold text-blue-600">{step.num}</span></div>
                <div className="lg:col-span-3">
                  <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{step.en}</p>
                </div>
                <div className="lg:col-span-8"><p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Pricing</Label>
            <h2 className="text-2xl font-bold text-gray-900 mb-14">料金プラン</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {[
              { name: "スポットコンサル", price: "ご相談", desc: "現状分析とAI活用の方向性をご提案。", features: ["現状ヒアリング（2時間）", "AI活用レポート作成", "導入ロードマップ素案", "2週間のメールサポート"], featured: false },
              { name: "スタンダード", price: "ご相談", desc: "PoC〜本番実装まで。伴走型の導入支援。", features: ["月次ヒアリング・進捗会議", "AI戦略策定・設計", "PoC開発・検証", "本番実装・テスト", "社内トレーニング"], featured: true },
              { name: "エンタープライズ", price: "ご相談", desc: "大規模導入・複数部署展開に対応。", features: ["専任コンサルタント配置", "複数部署への横展開", "カスタムAI開発", "24/7サポート", "KPI計測・改善サイクル"], featured: false },
            ].map((plan, i) => (
              <Reveal key={plan.name} delay={i * 100} className="flex">
                <div className={`rounded-2xl p-8 lg:p-10 transition-all duration-300 flex flex-col w-full ${plan.featured ? "bg-blue-600 text-white shadow-xl" : "bg-white border border-gray-200 hover:shadow-lg"}`}>
                  {plan.featured && <span className="inline-block rounded-full bg-white/20 text-white px-3 py-1 text-sm font-semibold mb-4 self-start">Recommended</span>}
                  <h3 className={`text-lg font-bold mb-2 ${plan.featured ? "text-white" : "text-gray-900"}`}>{plan.name}</h3>
                  <div className="mb-4">
                    <span className={`text-2xl font-bold ${plan.featured ? "text-white" : "text-gray-900"}`}>{plan.price}</span>
                  </div>
                  <p className={`text-sm leading-relaxed mb-6 ${plan.featured ? "text-white/80" : "text-gray-600"}`}>{plan.desc}</p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${plan.featured ? "bg-white/40" : "bg-blue-600"}`} />
                        <span className={`text-sm ${plan.featured ? "text-white/90" : "text-gray-600"}`}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="/contact" className={`block text-center text-sm font-semibold py-3 rounded-lg transition-all duration-300 mt-auto ${plan.featured ? "bg-white text-blue-600 hover:bg-blue-50" : "border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900"}`}>相談する</a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Case Studies</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-6">導入事例</h2>
            <p className="text-sm text-gray-500 bg-white border border-gray-200 rounded-xl px-5 py-4 mb-12 leading-relaxed">
              業種・規模に応じた導入パターンをご紹介します。詳細は個別にご案内いたします。
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                tag: "業務自動化",
                title: "製造業A社 / 品質検査自動化",
                desc: "画像認識AIで目視検査を自動化。検査時間を70%削減、見逃し率も改善。",
                effect: "検査時間 -70%",
              },
              {
                tag: "データ分析",
                title: "小売B社 / 需要予測",
                desc: "POSデータと気象情報を組み合わせた需要予測AI。廃棄ロスを40%削減。",
                effect: "廃棄ロス -40%",
              },
              {
                tag: "生成AI活用",
                title: "金融C社 / 生成AI導入",
                desc: "社内ナレッジと連携した生成AIチャットボットで問い合わせ対応を半自動化。",
                effect: "対応工数 -50%",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="rounded-2xl border border-gray-200 bg-white p-8 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
                  <span className="inline-block rounded-full bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 mb-4 self-start">{item.tag}</span>
                  <h3 className="text-base font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1">{item.desc}</p>
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-400 mb-1">想定効果</p>
                    <p className="text-lg font-bold text-blue-600">{item.effect}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>FAQ</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-14">よくあるご質問</h2>
          </Reveal>
          <div className="max-w-3xl">
            {[
              {
                q: "AIについての知識がなくても相談できますか？",
                a: "もちろんです。当社は「AIの専門知識ゼロ」の企業様を最も得意としています。現状把握から一緒に行いますので、まずはお気軽にご相談ください。",
              },
              {
                q: "どのくらいの期間でAI導入ができますか？",
                a: "PoC（概念実証）フェーズで1〜3ヶ月、本番実装で3〜6ヶ月が目安です。業務範囲と複雑性により変動します。",
              },
              {
                q: "費用感を教えてください。",
                a: "サービス内容や規模に応じて異なります。まずはヒアリングの上、最適なプランと費用感をご提案いたしますので、お気軽にご相談ください。",
              },
              {
                q: "特定のAIベンダーに縛られますか？",
                a: "いいえ。当社はベンダーニュートラルな立場で、OpenAI・Anthropic・Google・オープンソース（Llama等）を横断的に比較・選定します。",
              },
              {
                q: "既存システムとの連携は可能ですか？",
                a: "可能です。ERP・CRM・SaaS等、お使いのシステムとのAPI連携やデータ統合を前提に設計します。",
              },
              {
                q: "オンサイト対応はありますか？",
                a: "必要に応じて全国対応いたします。リモートとオンサイトを組み合わせた柔軟なプロジェクト進行が可能です。",
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <details className="border-b border-gray-100 py-5 group">
                  <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between gap-4">
                    <span>{item.q}</span>
                    <span className="text-gray-400 text-lg leading-none flex-shrink-0 transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <p className="text-gray-600 text-sm leading-relaxed mt-3">{item.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Reveal>
            <Label>Contact</Label>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">まずは、お話しませんか。</h2>
            <p className="text-base text-gray-600 leading-relaxed mb-10">「何から始めればいいかわからない」でも大丈夫です。<br />貴社の状況をお聞きした上で、最適な進め方をご提案します。</p>
            <a href="/contact" className="rounded-lg bg-blue-600 text-white font-semibold px-10 py-4 hover:bg-blue-700 transition-colors duration-300 inline-block">無料で相談する</a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

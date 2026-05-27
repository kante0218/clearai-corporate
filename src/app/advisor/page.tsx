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

export default function AdvisorPage() {
  return (
    <>
      {/* PAGE HEADER */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <p className="text-sm font-semibold text-sky-600 mb-3">AI Advisor</p>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">AI顧問</h1>
          <p className="text-base text-gray-600 leading-relaxed max-w-2xl">月額契約で、AI活用の意思決定を継続的に伴走します。戦略から技術選定、PoC評価、社内教育まで。月5万円〜／最低契約期間なし。</p>
        </div>
      </section>

      {/* WHY */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Why Advisor</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-snug mb-6 max-w-2xl">こんなお悩みに、月5万円からお応えします。</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "誰に聞けばいいかわからない", desc: "社内にAI人材がいない、外部ベンダーに聞くと売り込みに変わる。中立な相談相手が欲しい。" },
              { title: "情報の陳腐化が早すぎる", desc: "生成AIは毎月のように新機能が出る。何を試すべきか、何を無視していいかを選別してほしい。" },
              { title: "単発コンサルは続かない", desc: "一度きりの提案書より、日々の意思決定を継続サポートしてくれる顧問の方が成果につながる。" },
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
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>What We Do</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-14">顧問として提供する内容</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { num: "01", title: "経営・戦略相談", desc: "AI投資の優先順位、組織体制、競合動向まで。大手コンサル出身者が経営の視点で壁打ち相手になります。" },
              { num: "02", title: "技術選定アドバイス", desc: "ChatGPT・Claude・Gemini・オープンソース。中立な立場で貴社のユースケースに合うモデルとツールを選定。" },
              { num: "03", title: "PoC・導入プロジェクト評価", desc: "現在進行中のAIプロジェクトに対するレビュー、リスク洗い出し、改善提案を行います。" },
              { num: "04", title: "社内AIリテラシー支援", desc: "経営会議での勉強会、現場向けのプロンプト指南、社内ガイドライン策定を必要に応じてサポート。" },
            ].map((item, i) => (
              <Reveal key={item.num} delay={i * 100}>
                <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:border-sky-200 hover:shadow-lg transition-all duration-300">
                  <span className="text-sm font-bold text-sky-600">{item.num}</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-3 mb-4">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section id="plans" className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Plans</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-14">料金プラン</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {[
              {
                name: "ライト",
                price: "5万円",
                unit: "/ 月",
                desc: "Slack/メール相談中心。スタートアップ・小規模企業向け。",
                features: ["Slack/メール相談（営業日内返信）", "月1回のオンライン定例（45分）", "最新AIニュース・モデル動向の共有", "最低契約期間なし"],
                featured: false,
              },
              {
                name: "スタンダード",
                price: "15万円",
                unit: "/ 月",
                desc: "定例会議＋PoC評価。推進中プロジェクトがある企業に。",
                features: ["月2回のオンライン定例（各60分）", "Slack/メール無制限相談", "PoC・プロジェクト定期レビュー", "技術選定ドキュメント作成", "社内勉強会（年2回まで）"],
                featured: true,
              },
              {
                name: "エグゼクティブ",
                price: "30万円〜",
                unit: "/ 月",
                desc: "経営層直下で意思決定に参画。戦略〜実装を横断。",
                features: ["週次定例＋必要に応じてオンサイト", "経営会議への同席（月1回）", "AI戦略ロードマップ策定", "複数部署の横断アドバイザリー", "外部ベンダー選定同席"],
                featured: false,
              },
            ].map((plan, i) => (
              <Reveal key={plan.name} delay={i * 100} className="flex">
                <div className={`rounded-2xl p-8 lg:p-10 transition-all duration-300 flex flex-col w-full ${plan.featured ? "bg-sky-600 text-white shadow-xl" : "bg-white border border-gray-200 hover:shadow-lg"}`}>
                  {plan.featured && <span className="inline-block rounded-full bg-white/20 text-white px-3 py-1 text-sm font-semibold mb-4 self-start">Recommended</span>}
                  <h3 className={`text-lg font-bold mb-2 ${plan.featured ? "text-white" : "text-gray-900"}`}>{plan.name}</h3>
                  <div className="mb-4 flex items-baseline gap-1">
                    <span className={`text-3xl font-bold ${plan.featured ? "text-white" : "text-gray-900"}`}>{plan.price}</span>
                    <span className={`text-sm ${plan.featured ? "text-white/80" : "text-gray-500"}`}>{plan.unit}</span>
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
                  <a href="/contact" className={`block text-center text-sm font-semibold py-3 rounded-lg transition-all duration-300 mt-auto ${plan.featured ? "bg-white text-sky-600 hover:bg-sky-50" : "border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900"}`}>申し込む</a>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300}>
            <p className="text-xs text-gray-500 text-center mt-8">表示価格は税抜。業種・業態により個別見積もりとなる場合があります。</p>
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Process</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-14">開始までの流れ</h2>
          </Reveal>
          {[
            { num: "01", title: "無料相談", en: "Consultation", desc: "貴社の現状と、顧問に期待したい役割をお伺いします（30〜45分）。" },
            { num: "02", title: "プラン提案", en: "Proposal", desc: "お話を踏まえ、最適なプランと担当顧問をご提案します。" },
            { num: "03", title: "契約・キックオフ", en: "Kickoff", desc: "契約締結後、Slackチャンネル開設と初回オンサイト訪問を実施。" },
            { num: "04", title: "継続伴走", en: "Ongoing", desc: "定例会議＋日常相談。成果と運用体制を定期的に見直します。" },
          ].map((step, i) => (
            <Reveal key={step.num} delay={i * 100}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-10 border-b border-gray-100 last:border-0">
                <div className="lg:col-span-1"><span className="text-sm font-bold text-sky-600">{step.num}</span></div>
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

      {/* FAQ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>FAQ</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-14">よくあるご質問</h2>
          </Reveal>
          <div className="max-w-3xl">
            {[
              { q: "顧問とコンサルの違いは？", a: "コンサルが「特定プロジェクトの提案・実装」であるのに対し、顧問は「継続的な相談相手」です。必要に応じてコンサルプランとの併用も可能です。" },
              { q: "契約期間の縛りはありますか？", a: "ありません。月単位で更新可能で、合わないと感じた場合はいつでも解約いただけます。" },
              { q: "誰が担当してくれますか？", a: "大手コンサルティングファーム出身者、もしくはAI実装経験豊富なエンジニアが担当します。事前の面談で相性をご確認ください。" },
              { q: "NDAには対応していますか？", a: "もちろんです。顧問契約締結時に相互NDAを結びます。" },
              { q: "オンサイト対応はありますか？", a: "エグゼクティブプランでは月1回を目安に訪問可能です。他プランでも追加料金で対応できます。" },
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">月5万円から、AIの相談相手を。</h2>
            <p className="text-base text-gray-600 leading-relaxed mb-10">まずは30分の無料相談で、貴社にフィットするかをご確認ください。</p>
            <a href="/contact" className="rounded-lg bg-sky-600 text-white font-semibold px-10 py-4 hover:bg-sky-700 transition-colors duration-300 inline-block">無料で相談する</a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

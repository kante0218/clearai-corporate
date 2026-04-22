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

export default function TrainingPage() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setHeroLoaded(true), 100); }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute bottom-1/3 right-1/4 w-[1px] h-[1px] shadow-[0_0_300px_150px_rgba(56,189,248,0.10)]" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <span className="inline-block rounded-full bg-sky-50 text-sky-600 px-3 py-1 text-sm font-semibold mb-6 transition-all duration-700" style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "300ms" }}>AI Training</span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6 transition-all duration-700" style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(24px)", transitionDelay: "500ms" }}>
            AIを「使える」組織に、<br />研修で変える。
          </h1>
          <p className="text-base text-gray-600 leading-relaxed max-w-lg mx-auto mb-10 transition-all duration-700" style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "700ms" }}>
            経営層から現場まで、階層別に設計したAI実務研修。<br />ツールを「知っている」ではなく「成果が出せる」状態へ引き上げます。
          </p>
          <div className="flex items-center justify-center gap-4 transition-all duration-700" style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "900ms" }}>
            <a href="/contact" className="rounded-lg bg-sky-600 text-white font-semibold px-8 py-3.5 hover:bg-sky-700 transition-colors duration-300">研修の相談をする</a>
            <a href="#programs" className="text-sm text-gray-500 font-semibold hover:text-gray-900 transition-colors duration-300">プログラムを見る →</a>
          </div>
        </div>
      </section>

      {/* TARGET */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>For</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-snug mb-14 max-w-2xl">階層別に、必要なスキルを。</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { role: "経営層", title: "意思決定のためのAI", desc: "AI投資判断・競合動向把握・事業インパクト試算。経営会議で使えるレベルの理解を身につけます。" },
              { role: "管理職", title: "チームを動かすAI", desc: "業務の棚卸し、AI活用ポイントの見極め、部下の評価への反映。現場導入のリーダーを育成します。" },
              { role: "現場担当", title: "日々使えるAI", desc: "議事録・メール・資料作成など、明日から実務で使えるプロンプトとワークフローを習得。" },
            ].map((item, i) => (
              <Reveal key={item.role} delay={i * 100}>
                <div className="rounded-2xl border border-gray-200 bg-white p-8 hover:shadow-lg transition-all duration-300 h-full">
                  <span className="inline-block text-xs font-bold tracking-widest text-sky-600 uppercase mb-3">{item.role}</span>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section id="programs" className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Programs</Label>
            <h2 className="text-2xl font-bold text-gray-900 mb-14">主な研修プログラム</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { num: "01", title: "生成AI入門（2時間）", desc: "ChatGPT・Claude・Geminiを実際に触りながら、「何ができて・何ができないか」を体感。情報リテラシーと著作権・セキュリティの基礎も押さえます。" },
              { num: "02", title: "業務活用ハンズオン（半日）", desc: "部署別に業務を棚卸しし、AIで効率化できる工程を特定。参加者が自分の業務に使えるプロンプトを持ち帰れる設計です。" },
              { num: "03", title: "プロンプトエンジニアリング（半日）", desc: "再現性のある指示の出し方、Few-shot、Chain of Thought、RAGの基礎など、一段深いスキルを習得します。" },
              { num: "04", title: "社内ガイドライン策定ワークショップ", desc: "情シス・法務・現場を巻き込み、AI利用ポリシーを共同策定。ドキュメント化までサポートします。" },
              { num: "05", title: "経営層向けエグゼクティブセッション（90分）", desc: "役員会前後に実施する少人数セッション。自社の事業・KPIに引きつけてAI戦略を議論します。" },
              { num: "06", title: "継続型スキルアップ（月次定期）", desc: "毎月新しいテーマを扱う継続研修。最新モデル検証、事例共有、質疑応答で社内知を蓄積します。" },
            ].map((item, i) => (
              <Reveal key={item.num} delay={i * 80}>
                <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:border-sky-200 hover:shadow-lg transition-all duration-300 h-full">
                  <span className="text-sm font-bold text-sky-600">{item.num}</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-3 mb-4">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Features</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-14">clearAI研修の特徴</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { num: "01", title: "貴社の実務に合わせて設計", desc: "事前ヒアリングで業務課題を把握し、実際の業務データを題材に組み立てます。" },
              { num: "02", title: "実装者が直接登壇", desc: "机上の空論ではなく、現場でAIを実装してきたエンジニア・コンサル出身者が講師を務めます。" },
              { num: "03", title: "研修後のフォロー込み", desc: "Slackでの質問対応や、1か月後の振り返りセッションもセットで提供可能です。" },
              { num: "04", title: "オンライン／オンサイト両対応", desc: "全国どこでも実施可能。録画アーカイブの納品にも対応します。" },
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
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Pricing</Label>
            <h2 className="text-2xl font-bold text-gray-900 mb-14">料金の目安</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {[
              { name: "スポット研修", price: "20万円〜", unit: "/ 回", desc: "単発で完結する研修。2時間〜半日程度。", features: ["事前ヒアリング", "オリジナル教材作成", "当日の実施（講師1名）", "Q&A対応"], featured: false },
              { name: "パッケージ研修", price: "80万円〜", unit: "/ 3ヶ月", desc: "複数回の研修を組み合わせて全社展開。", features: ["階層別3〜5コース実施", "参加者アンケート分析", "社内展開用の録画配信", "研修後Slackサポート"], featured: true },
              { name: "カスタム", price: "ご相談", unit: "", desc: "全社AI変革プロジェクトに合わせて設計。", features: ["年間研修ロードマップ策定", "部署別カリキュラム作成", "講師チーム編成", "効果測定・レポート"], featured: false },
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
                  <a href="/contact" className={`block text-center text-sm font-semibold py-3 rounded-lg transition-all duration-300 mt-auto ${plan.featured ? "bg-white text-sky-600 hover:bg-sky-50" : "border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900"}`}>相談する</a>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300}>
            <p className="text-xs text-gray-500 text-center mt-8">表示価格は税抜。参加人数・地域・業種により個別見積もりとなる場合があります。</p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Reveal>
            <Label>Contact</Label>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">「使える」を、研修から。</h2>
            <p className="text-base text-gray-600 leading-relaxed mb-10">貴社の課題に合わせて、カリキュラムからご提案します。</p>
            <a href="/contact" className="rounded-lg bg-sky-600 text-white font-semibold px-10 py-4 hover:bg-sky-700 transition-colors duration-300 inline-block">無料で相談する</a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

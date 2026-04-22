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
  return <p className="text-sm font-semibold text-orange-600 mb-4">{children}</p>;
}

export default function ClaudePage() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setHeroLoaded(true), 100); }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute bottom-1/3 right-1/4 w-[1px] h-[1px] shadow-[0_0_300px_150px_rgba(249,115,22,0.10)]" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <span className="inline-block rounded-full bg-orange-50 text-orange-600 px-3 py-1 text-sm font-semibold mb-6 transition-all duration-700" style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "300ms" }}>Claude Specialized</span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6 transition-all duration-700" style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(24px)", transitionDelay: "500ms" }}>
            Claudeを、<br />経営の武器にする。
          </h1>
          <p className="text-base text-gray-600 leading-relaxed max-w-lg mx-auto mb-6 transition-all duration-700" style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "700ms" }}>
            AnthropicのClaudeに特化した、国内屈指の専門支援。<br />経営者プライベートスクールと、企業向けオンライン導入支援の2本立てで、Claudeを成果に直結させます。
          </p>
          <p className="inline-flex items-center gap-2 text-xs font-semibold text-orange-700 bg-orange-50 border border-orange-100 rounded-full px-4 py-2 mb-10 transition-all duration-700" style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "800ms" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />使いこなせなかったら、全額返金保証
          </p>
          <div className="flex items-center justify-center gap-4 transition-all duration-700" style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "900ms" }}>
            <a href="/contact" className="rounded-lg bg-orange-600 text-white font-semibold px-8 py-3.5 hover:bg-orange-700 transition-colors duration-300">無料相談を申し込む</a>
            <a href="#services" className="text-sm text-gray-500 font-semibold hover:text-gray-900 transition-colors duration-300">サービスを見る →</a>
          </div>
        </div>
      </section>

      {/* WHY CLAUDE */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Why Claude</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-snug mb-6 max-w-2xl">なぜ、Claudeに特化するのか。</h2>
            <p className="text-base text-gray-600 leading-relaxed max-w-3xl mb-14">
              Claudeは文章品質・コード生成・長文脈理解で世界トップクラスの性能を誇り、特にClaude Codeは「AIに任せられる業務範囲」を劇的に広げました。一方で、真価を引き出すには正しい使い方と設計が必要です。clearAIは、Claudeにだけ深く張るチームだからこそ提供できる、一段深い支援を行います。
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "最高クラスの言語能力", desc: "日本語の文章理解・生成・要約は、いま最も信頼できるレベル。議事録・契約レビュー・社内文書に強い。" },
              { title: "Claude Codeの破壊力", desc: "コーディングだけでなく、データ整形・調査・検証まで「実行する相棒」として使える唯一無二のAI。" },
              { title: "安全性と透明性", desc: "Anthropicのポリシーは企業の情報統制と相性が良く、ガバナンスを重視する日本企業でも安心して導入できる。" },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="rounded-2xl border border-gray-200 bg-white p-8 hover:border-orange-200 hover:shadow-lg transition-all duration-300 h-full">
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
            <h2 className="text-2xl font-bold text-gray-900 mb-14">2つのサービス</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* School */}
            <Reveal>
              <div className="rounded-2xl border-2 border-orange-500 bg-gradient-to-br from-orange-50 to-white p-8 lg:p-10 h-full flex flex-col shadow-xl">
                <span className="inline-block rounded-full bg-orange-600 text-white px-3 py-1 text-xs font-bold tracking-widest mb-6 self-start">FOR EXECUTIVES</span>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">経営者向けプライベートスクール</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">少人数・完全プライベート形式で、経営者自身が「自分の手でClaudeを使いこなせる」状態になるまで伴走します。経営判断・採用・事業開発に直結する使い方に特化。</p>
                <div className="bg-white rounded-xl border border-orange-100 p-5 mb-6">
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-3xl font-bold text-gray-900">5万円</span>
                    <span className="text-sm text-gray-500">/ 月</span>
                  </div>
                  <p className="text-xs text-orange-700 font-semibold">使いこなせるようにならなかった場合、全額返金保証</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    "経営者1名へのマンツーマン個別指導",
                    "週1回のオンライン/対面セッション（60分）",
                    "経営課題をテーマにした実務演習",
                    "Claude Code・Projects・MCPなど高度機能の習熟",
                    "いつでも質問できる専用Slackチャンネル",
                    "3ヶ月経過時点で効果に満足できなければ全額返金",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-orange-500" />
                      <span className="text-sm text-gray-700">{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="/contact" className="block text-center text-sm font-semibold py-3.5 rounded-lg bg-orange-600 text-white hover:bg-orange-700 transition-all duration-300 mt-auto">スクールの相談をする</a>
              </div>
            </Reveal>

            {/* Online Implementation */}
            <Reveal delay={150}>
              <div className="rounded-2xl border border-gray-200 bg-white p-8 lg:p-10 h-full flex flex-col hover:shadow-lg transition-all duration-300">
                <span className="inline-block rounded-full bg-orange-50 text-orange-600 px-3 py-1 text-xs font-bold tracking-widest mb-6 self-start">FOR TEAMS</span>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">オンラインClaude導入支援</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">企業・チーム向けに、Claudeを業務フローへ組み込むための導入支援をオンラインで提供。ライセンス設計・社内展開・運用定着までセットでお任せいただけます。</p>
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-6">
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-3xl font-bold text-gray-900">ご相談</span>
                  </div>
                  <p className="text-xs text-gray-500">プロジェクト規模・支援範囲に応じて個別お見積もり</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    "Claude Team/Enterprise契約の選定・設定",
                    "社内Projects・ナレッジベース設計",
                    "Claude Code導入（エンジニア向け）",
                    "MCP連携によるツール/データ接続",
                    "社内ガイドライン・プロンプトテンプレ整備",
                    "運用定着まで伴走（3ヶ月〜）",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-orange-500" />
                      <span className="text-sm text-gray-700">{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="/contact" className="block text-center text-sm font-semibold py-3.5 rounded-lg border border-orange-300 text-orange-700 hover:bg-orange-50 transition-all duration-300 mt-auto">導入支援の相談をする</a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="rounded-3xl bg-gradient-to-br from-orange-500 to-amber-500 text-white p-10 lg:p-14 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-white/10 blur-3xl" />
              <div className="relative">
                <p className="text-sm font-semibold tracking-widest uppercase mb-4 opacity-90">Money-Back Guarantee</p>
                <h2 className="text-3xl lg:text-4xl font-bold leading-tight mb-6">使えるようにならなかったら、<br />全額返金します。</h2>
                <p className="text-sm lg:text-base leading-relaxed opacity-90 mb-2">プライベートスクールでは、開始3ヶ月経過時点で「Claudeを実務で使いこなせている」と実感できない場合、受講料を全額返金します。</p>
                <p className="text-xs opacity-75">※ 所定の課題提出・セッション出席など、最低限の条件を満たしていただくことが前提です。詳細は契約時にご確認ください。</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CURRICULUM */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Curriculum</Label>
            <h2 className="text-2xl font-bold text-gray-900 mb-14">スクールで学べること</h2>
          </Reveal>
          {[
            { num: "01", title: "Claudeの原則", en: "Fundamentals", desc: "他のAIとの違い、得意・不得意、指示の出し方。経営者がまず押さえるべき思考の型を習得します。" },
            { num: "02", title: "経営業務への応用", en: "Executive Use", desc: "事業計画のレビュー、会議前ブリーフ、採用面接の質問設計、投資家向け資料のブラッシュアップなど。" },
            { num: "03", title: "Claude Code 実践", en: "Claude Code", desc: "コーディングだけでなく、社内データ分析や調査タスクを「自律的に実行させる」レベルまで引き上げます。" },
            { num: "04", title: "Projects と MCP", en: "Advanced", desc: "社内ナレッジの取り込み、外部ツール連携、データベース接続など、一段上のセットアップを構築します。" },
            { num: "05", title: "チーム展開の設計", en: "Team Rollout", desc: "自分で使えるようになった上で、役員・部門長への展開を設計。組織への導入まで一貫支援します。" },
          ].map((step, i) => (
            <Reveal key={step.num} delay={i * 100}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-10 border-b border-gray-200 last:border-0">
                <div className="lg:col-span-1"><span className="text-sm font-bold text-orange-600">{step.num}</span></div>
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
              { q: "プライベートスクールは本当に月5万円だけですか？", a: "はい。初期費用・教材費などは不要で、月額5万円（税抜）のみです。Claude本体のサブスクリプション費用は別途、各社でご契約いただきます。" },
              { q: "全額返金の条件を教えてください。", a: "開始から3ヶ月時点で、貴社が「実務で使いこなせている」と実感できない場合に全額返金します。ただし、毎週のセッションに出席いただくこと、所定の課題に取り組んでいただくことが条件です。" },
              { q: "AI初心者でも大丈夫ですか？", a: "むしろ初心者の経営者が最も成長を実感します。ITに詳しくない方でも、マンツーマンで伴走するため安心です。" },
              { q: "企業のチーム全体に展開できますか？", a: "可能です。スクール卒業後、または並行して「オンラインClaude導入支援」で組織展開をサポートします。" },
              { q: "オフライン開催はありますか？", a: "原則オンラインですが、経営者スクールに限り、東京・大阪での対面実施も月1回目安で対応可能です。" },
              { q: "他社のAI（ChatGPT等）も扱いますか？", a: "スクール内ではClaudeに集中しますが、比較観点での他社モデル解説は行います。組織導入時は中立的に選定支援が可能です。" },
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Claudeで、経営を一段進める。</h2>
            <p className="text-base text-gray-600 leading-relaxed mb-10">30分の無料面談で、貴社にフィットする支援形態をご提案します。</p>
            <a href="/contact" className="rounded-lg bg-orange-600 text-white font-semibold px-10 py-4 hover:bg-orange-700 transition-colors duration-300 inline-block">無料で相談する</a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

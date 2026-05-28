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
  return (
    <>
      {/* PAGE HEADER */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <p className="text-sm font-semibold text-orange-600 mb-3">Claude Specialized</p>
          <div className="flex items-center gap-3 mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/claude-symbol.svg" alt="" aria-hidden="true" className="w-8 h-8 lg:w-10 lg:h-10" />
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">Claude特化支援</h1>
          </div>
          <p className="text-base text-gray-600 leading-relaxed max-w-2xl">AnthropicのClaudeに特化した、経営者向けマンツーマンスクール。月2回の対面指導（オフライン版10万円/月）と、SNSで気軽に質問できるオンライン版（5万円/月）の2形態でご提供します。使いこなせなかったら全額返金保証。</p>
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
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-14">2つのサービス</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Offline */}
            <Reveal>
              <div className="rounded-2xl border-2 border-orange-500 bg-gradient-to-br from-orange-50 to-white p-8 lg:p-10 h-full flex flex-col shadow-xl">
                <span className="inline-block rounded-full bg-orange-600 text-white px-3 py-1 text-xs font-bold tracking-widest mb-6 self-start">OFFLINE / 対面</span>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">オフライン版（対面マンツーマン）</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">月2回、経営者と直接お会いしてマンツーマンで指導。経営課題を題材に、その場で手を動かしてClaudeを使いこなせる状態まで引き上げます。</p>
                <div className="bg-white rounded-xl border border-orange-100 p-5 mb-6">
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-3xl font-bold text-gray-900">10万円</span>
                    <span className="text-sm text-gray-500">/ 月</span>
                  </div>
                  <p className="text-xs text-orange-700 font-semibold">使いこなせるようにならなかった場合、全額返金保証</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    "月2回の対面マンツーマンレッスン（各60分）",
                    "経営課題をテーマにしたその場での実務演習",
                    "Claude Code・Projects・MCPなど高度機能の習熟",
                    "セッション間もいつでも質問できる専用Slackチャンネル",
                    "3ヶ月経過時点で効果に満足できなければ全額返金",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-orange-500" />
                      <span className="text-sm text-gray-700">{f}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-center text-orange-700 mb-3">※最低6ヶ月契約から</p>
                <a href="https://buy.stripe.com/aFafZafg8daw8iKexKd7q02" className="block text-center text-sm font-semibold py-3.5 rounded-lg bg-orange-600 text-white hover:bg-orange-700 transition-all duration-300 mt-auto">オフライン版に申し込む</a>
              </div>
            </Reveal>

            {/* Online */}
            <Reveal delay={150}>
              <div className="rounded-2xl border border-gray-200 bg-white p-8 lg:p-10 h-full flex flex-col hover:shadow-lg transition-all duration-300">
                <span className="inline-block rounded-full bg-orange-50 text-orange-600 px-3 py-1 text-xs font-bold tracking-widest mb-6 self-start">ONLINE / オンライン</span>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">オンライン版（SNSサポート）</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">対面セッションなしで、初期セットアップガイド＋SNS/チャットでの継続サポートを提供。まずは自分のペースでClaudeを使いこなしたい経営者向けの軽量プラン。</p>
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-6">
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-3xl font-bold text-gray-900">5万円</span>
                    <span className="text-sm text-gray-500">/ 月</span>
                  </div>
                  <p className="text-xs text-gray-500">対面レッスンなし・サポートはオンラインのみ</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    "初期セットアップガイド（環境構築・初期設定の伴走）",
                    "SNS/チャットでの継続的なQ&Aサポート",
                    "Claude Code・Projects・MCPなど主要機能の使い方解説",
                    "実務テンプレ・プロンプト集の共有",
                    "オフライン版へのアップグレードはいつでも可能",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-orange-500" />
                      <span className="text-sm text-gray-700">{f}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-center text-gray-500 mb-3">※最低6ヶ月契約から</p>
                <a href="https://buy.stripe.com/14AfZa2tm5I4dD4gFSd7q03" className="block text-center text-sm font-semibold py-3.5 rounded-lg border border-orange-300 text-orange-700 hover:bg-orange-50 transition-all duration-300 mt-auto">オンライン版に申し込む</a>
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
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-14">スクールで学べること</h2>
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
              { q: "オフライン版とオンライン版の違いは？", a: "オフライン版（月10万円）は経営者ご本人と直接お会いして月2回のマンツーマン対面レッスンを行う、最も濃い形態です。オンライン版（月5万円）は対面セッションなしで、初期セットアップガイド＋SNS/チャットでの継続サポートをご提供します。途中でオフライン版にアップグレードすることもできます。" },
              { q: "料金以外に費用はかかりますか？", a: "初期費用・教材費などは不要で、月額料金（税抜）のみです。Claude本体のサブスクリプション費用は別途、各社でご契約いただきます。" },
              { q: "全額返金の条件を教えてください。", a: "オフライン版で、開始から3ヶ月時点で「実務で使いこなせている」と実感できない場合に全額返金します。所定の対面レッスンに出席いただくこと、課題に取り組んでいただくことが条件です。" },
              { q: "AI初心者でも大丈夫ですか？", a: "むしろ初心者の経営者が最も成長を実感します。ITに詳しくない方でも、マンツーマンで伴走するため安心です。" },
              { q: "オフライン版はどこで受けられますか？", a: "東京・水戸を中心に、経営者のご都合に合わせて月2回お伺いします。その他のエリアもご相談ください。" },
              { q: "他社のAI（ChatGPT等）も扱いますか？", a: "スクール内ではClaudeに集中しますが、比較観点での他社モデル解説は行います。" },
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

"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); } },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    }}>{children}</div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="text-sm font-semibold text-blue-600 mb-4">{children}</p>;
}

export default function MichibikiPage() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setHeroLoaded(true), 100); return () => clearTimeout(t); }, []);

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute top-1/3 left-1/3 w-[1px] h-[1px] shadow-[0_0_300px_150px_rgba(79,70,229,0.08)]" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <span className="inline-block rounded-full bg-blue-50 text-blue-600 px-3 py-1 text-sm font-semibold mb-6 transition-all duration-700"
            style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "300ms" }}>
            AI Interview Platform
          </span>
          <h1 className="text-[clamp(3rem,8vw,7rem)] font-bold text-gray-900 leading-[1.1] mb-2 transition-all duration-700"
            style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(24px)", transitionDelay: "500ms" }}>
            導
          </h1>
          <p className="text-lg text-gray-500 font-medium mb-6 transition-all duration-700"
            style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "700ms" }}>
            みちびき
          </p>
          <p className="text-base text-gray-600 leading-relaxed max-w-md mx-auto mb-10 transition-all duration-700"
            style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "900ms" }}>
            AIが面接を行い、候補者のスキルを客観的に評価。
            <br />録画・分析データを企業に提供する、AI面接プラットフォーム。
          </p>
          <div className="flex items-center justify-center gap-4 transition-all duration-700"
            style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "1100ms" }}>
            <a href="https://www.michibiki.tech" target="_blank" rel="noopener noreferrer"
              className="rounded-xl bg-blue-600 text-white font-semibold px-8 py-3.5 hover:bg-blue-700 transition-colors duration-300">
              導を体験する
            </a>
          </div>
        </div>
      </section>

      {/* ═══ WHAT IS 導 ═══ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <SectionLabel>What is 導</SectionLabel>
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-gray-900 leading-snug mb-6">
                求職者がAIと面接し、
                <br />そのすべてを企業に届ける。
              </h2>
              <p className="text-base text-gray-600 leading-relaxed">
                導は、求職者がいつでもどこからでもAI面接を受けられるプラットフォームです。
                面接の全録画データ、AIによるスキル評価、回答の文字起こしを企業に提供し、
                採用の判断材料を飛躍的に充実させます。面接官の工数を削減しながら、
                バイアスのない公平な評価を実現します。
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <SectionLabel>How it works</SectionLabel>
            <h2 className="text-2xl font-bold text-gray-900 mb-14">
              面接の流れ
            </h2>
          </Reveal>

          <div className="space-y-0">
            {[
              {
                num: "01",
                title: "オンラインテスト",
                desc: "まず、候補者は職種に応じた技術テスト（選択式・記述式）を受験します。プログラミング、データ分析、ビジネスケースなど、カテゴリごとに最適化された問題が出題されます。",
                detail: "テスト結果はAIが自動採点し、強み・弱みを分析。この結果を元に、次のビデオ面接の質問が候補者ごとにカスタマイズされます。",
              },
              {
                num: "02",
                title: "AIビデオ面接",
                desc: "カメラ・マイクを使ったビデオ面接がスタート。AIが面接官として質問を読み上げ、候補者は声またはテキストで回答します。面接は開始から終了まで全て自動録画されます。",
                detail: "質問は構造化されており、技術力・コミュニケーション力・問題解決力を多角的に評価。候補者の回答に応じてAIが追加質問を生成するため、画一的な面接ではなく、個人に合わせた深掘りが可能です。",
              },
              {
                num: "03",
                title: "AI評価レポート生成",
                desc: "面接終了後、AIが回答内容を分析し、総合評価レポートを自動生成します。技術力・コミュニケーション・問題解決力のスコアリング、強み・改善点のフィードバック付きです。",
                detail: "候補者にもフィードバックが即座に提供されるため、不合格でも次に活かせる学びがあります。これにより、プラットフォーム自体が候補者の成長を支援します。",
              },
              {
                num: "04",
                title: "企業への全データ提供",
                desc: "面接の全録画動画、AI評価レポート、テスト結果、回答の文字起こし ― すべてのデータが採用企業に共有されます。",
                detail: "採用担当者は録画を見ながらAIの評価スコアを確認し、チーム全体で候補者を議論できます。面接官が不在でも、AIが一次スクリーニングを完了しているため、採用のスピードと質が大幅に向上します。",
              },
            ].map((step, i) => (
              <Reveal key={step.num} delay={i * 100}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-10 border-b border-gray-200 last:border-0">
                  <div className="lg:col-span-1">
                    <span className="text-sm font-bold text-blue-600">{step.num}</span>
                  </div>
                  <div className="lg:col-span-4">
                    <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                  </div>
                  <div className="lg:col-span-7">
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">{step.desc}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{step.detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <SectionLabel>Features</SectionLabel>
            <h2 className="text-2xl font-bold text-gray-900 mb-14">
              導の機能
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "AI音声面接官",
                desc: "Edge TTS・VOICEVOXなど複数の音声エンジンに対応。面接準備画面で声を試聴・選択でき、自然な日本語で質問を読み上げます。男性・女性、落ち着いたトーン・カジュアルなど、場面に応じた声を選べます。",
              },
              {
                title: "自動録画・データ共有",
                desc: "面接開始と同時にカメラ録画が自動スタート。手動操作は不要です。録画データ、音声認識によるリアルタイム文字起こし、AIの評価スコア ― すべてが企業に提供されます。",
              },
              {
                title: "構造化AI質問生成",
                desc: "職種・テスト結果・会話履歴を踏まえ、AIが質問を動的に生成。テンプレートの質問リストではなく、候補者一人ひとりに最適化された深掘り質問で、真のスキルを引き出します。",
              },
              {
                title: "多角的スコアリング",
                desc: "技術力・コミュニケーション力・問題解決力の3軸でスコアリング。総合評価、強み・改善点の具体的なフィードバック、推薦コメントを自動生成します。",
              },
              {
                title: "オンラインテスト",
                desc: "選択式・記述式・ケーススタディなど多様な問題形式。Software Engineering、Data Science、PM、Design、Business、Healthcareなど6つ以上のカテゴリに対応しています。",
              },
              {
                title: "候補者への即時フィードバック",
                desc: "面接終了直後に、候補者自身にも評価結果とフィードバックを提供。どの面接でも学びがあるため、プラットフォームへのリピート利用と候補者プールの拡大につながります。",
              },
            ].map((feature, i) => (
              <Reveal key={feature.title} delay={i * 80}>
                <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-base font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOR COMPANIES / FOR CANDIDATES ═══ */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 企業向け */}
            <Reveal>
              <div className="bg-blue-600 rounded-2xl p-8 lg:p-10 min-h-[480px] flex flex-col justify-between">
                <div>
                  <span className="inline-block rounded-full bg-white/10 text-white/80 px-3 py-1 text-sm font-semibold mb-6">For Companies</span>
                  <h3 className="text-2xl font-bold text-white mb-6">企業の方へ</h3>
                  <ul className="space-y-4">
                    {[
                      "面接官の工数を大幅に削減。AIが一次スクリーニングを完了",
                      "全候補者を同じ基準で評価。バイアスのない公平な採用",
                      "録画・文字起こし・スコアを採用チーム全体で共有",
                      "求人ごとにカスタマイズされたAI面接フローを自動設計",
                      "候補者の辞退を減らす、いつでもどこでも受けられる面接体験",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-white/40 mt-0.5">-</span>
                        <span className="text-sm text-white/90 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <a href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white text-blue-600 font-semibold px-6 py-3 hover:bg-blue-50 transition-colors duration-300 w-fit">
                  導入を相談する <span>→</span>
                </a>
              </div>
            </Reveal>

            {/* 求職者向け */}
            <Reveal delay={100}>
              <div className="bg-white rounded-2xl border border-gray-200 p-8 lg:p-10 min-h-[480px] flex flex-col justify-between">
                <div>
                  <span className="inline-block rounded-full bg-blue-50 text-blue-600 px-3 py-1 text-sm font-semibold mb-6">For Candidates</span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">求職者の方へ</h3>
                  <ul className="space-y-4">
                    {[
                      "いつでもどこでも、自分のペースでAI面接を受験",
                      "面接後すぐに評価フィードバックを確認できる",
                      "練習モードで何度でもリハーサル可能",
                      "一度の面接結果が複数の企業に共有される効率的な就活",
                      "テスト結果に基づくAIの追加質問で、真の実力をアピール",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-gray-300 mt-0.5">-</span>
                        <span className="text-sm text-gray-600 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <a href="https://www.michibiki.tech" target="_blank" rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 text-white font-semibold px-6 py-3 hover:bg-blue-700 transition-colors duration-300 w-fit">
                  導を始める <span>→</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ TECH STACK ═══ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <SectionLabel>Technology</SectionLabel>
            <h2 className="text-2xl font-bold text-gray-900 mb-14">
              支える技術
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "AI面接エンジン", tech: "Claude API" },
              { label: "音声合成", tech: "Edge TTS / VOICEVOX" },
              { label: "音声認識", tech: "Web Speech API" },
              { label: "フロントエンド", tech: "Next.js / React" },
              { label: "データベース", tech: "Supabase" },
              { label: "認証", tech: "Supabase Auth" },
              { label: "ストレージ", tech: "Supabase Storage" },
              { label: "ホスティング", tech: "Vercel" },
            ].map((item, i) => (
              <Reveal key={item.label} delay={i * 50}>
                <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow duration-300">
                  <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                  <p className="text-base font-bold text-gray-900">{item.tech}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STATUS ═══ */}
      <section className="py-20 lg:py-28 bg-blue-50 rounded-2xl mx-4 lg:mx-8 my-4">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <SectionLabel>Current Status</SectionLabel>
              <h2 className="text-2xl font-bold text-gray-900 leading-snug">
                導は、まだ始まったばかり。
                <br /><span className="text-gray-500">一社一社、丁寧に。</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { label: "導入企業", value: "1", suffix: "社" },
              { label: "対応職種", value: "6", suffix: "カテゴリ" },
              { label: "音声エンジン", value: "3", suffix: "種類" },
              { label: "リリース", value: "2025", suffix: "年" },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 100}>
                <div className="text-center py-8">
                  <p className="text-4xl font-bold text-blue-600">
                    {stat.value}<span className="text-base text-gray-500 font-medium ml-1">{stat.suffix}</span>
                  </p>
                  <p className="text-sm text-gray-600 mt-2">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Reveal>
            <SectionLabel>Get Started</SectionLabel>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              導で、採用を変える。
            </h2>
            <p className="text-base text-gray-600 leading-relaxed mb-10">
              求職者の方はそのまま無料でご利用いただけます。
              <br />企業の方は、まずはお問い合わせください。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://www.michibiki.tech" target="_blank" rel="noopener noreferrer"
                className="rounded-xl bg-blue-600 text-white font-semibold px-10 py-4 hover:bg-blue-700 transition-colors duration-300">
                導を始める（無料）
              </a>
              <a href="/contact"
                className="text-sm text-gray-500 font-semibold hover:text-gray-900 transition-colors duration-300">
                企業向けお問い合わせ →
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function CountUp({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-4xl lg:text-5xl font-bold text-white">
      {count.toLocaleString()}
      <span className="text-xl lg:text-2xl text-accent-light">{suffix}</span>
    </div>
  );
}

const features = [
  {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
        />
      </svg>
    ),
    title: "AI構造化面接",
    subtitle: "Structured AI Interview",
    description:
      "AIが最適な質問を自動生成し、候補者の能力を多角的に評価。面接官のバイアスを排除し、一貫性のある公平な面接を実現します。",
  },
  {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
        />
      </svg>
    ),
    title: "客観的スキル評価",
    subtitle: "Objective Skill Assessment",
    description:
      "回答内容・論理性・コミュニケーション力をAIがスコアリング。定量的なデータに基づく採用判断で、ミスマッチを大幅に削減します。",
  },
  {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
        />
      </svg>
    ),
    title: "録画・データ提供",
    subtitle: "Recording & Data Sharing",
    description:
      "面接の録画データとAI分析レポートを企業に提供。採用チーム全体で候補者情報を共有し、より精度の高い意思決定を支援します。",
  },
  {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
        />
      </svg>
    ),
    title: "多言語対応",
    subtitle: "Multi-language Support",
    description:
      "日本語・英語をはじめ複数言語に対応。グローバル人材の採用や、海外拠点での活用もスムーズに行えます。",
  },
];

const steps = [
  {
    number: "01",
    title: "企業登録・求人設定",
    description:
      "企業情報と求人要件を登録。AIが職種に最適な面接フローを自動設計します。",
  },
  {
    number: "02",
    title: "AI面接の実施",
    description:
      "候補者はいつでもどこからでもAI面接を受験。構造化された質問で公平に評価されます。",
  },
  {
    number: "03",
    title: "マッチング・採用",
    description:
      "AI分析レポートと録画データをもとに、最適な候補者とマッチング。採用を効率化します。",
  },
];

export default function MichibikiPage() {
  return (
    <main className="pt-20">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-accent via-accent to-accent-dark py-28 lg:py-40">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-dark/40 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 mb-8 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-sm text-white/90 tracking-wide font-medium">
                AI Interview Platform
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white leading-tight mb-4 tracking-tight">
              導
              <span className="text-3xl sm:text-4xl lg:text-5xl font-light ml-2 opacity-80">
                （みちびき）
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="text-xl lg:text-2xl text-white/80 font-medium mb-6">
              AI面接プラットフォーム
            </p>
          </FadeIn>

          <FadeIn delay={300}>
            <p className="text-base lg:text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              AIが面接を構造化し、候補者のスキルを客観的に評価。
              <br className="hidden sm:block" />
              採用プロセスに公平性と効率性をもたらします。
            </p>
          </FadeIn>

          <FadeIn delay={400}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://www.michibiki.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-white text-accent-dark px-8 py-4 rounded-full text-base font-semibold transition-all hover:bg-white/90 hover:shadow-xl hover:shadow-black/10 hover:-translate-y-0.5"
              >
                導を体験する
              </a>
              <Link
                href="/contact"
                className="w-full sm:w-auto border-2 border-white/30 text-white px-8 py-4 rounded-full text-base font-medium hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                お問い合わせ
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Problem Section ── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16 lg:mb-20">
              <span className="text-xs font-semibold text-accent tracking-widest uppercase mb-3 block">
                Problem
              </span>
              <h2 className="text-3xl lg:text-5xl font-bold text-navy-950 tracking-tight mb-4">
                従来の採用が抱える課題
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-base lg:text-lg">
                多くの企業が採用プロセスで同じ課題に直面しています
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {[
              {
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                title: "面接に膨大な時間",
                description:
                  "面接官のスケジュール調整、面接実施、評価会議。一人の採用に何十時間もの人的コストが発生しています。",
              },
              {
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
                    />
                  </svg>
                ),
                title: "評価のばらつき",
                description:
                  "面接官によって評価基準が異なり、主観的な判断が採用の質を左右。優秀な人材を見逃すリスクがあります。",
              },
              {
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                    />
                  </svg>
                ),
                title: "採用のミスマッチ",
                description:
                  "印象や相性に頼った採用は、入社後のミスマッチを引き起こし、早期離職率の上昇とコスト増大につながります。",
              },
            ].map((problem, i) => (
              <FadeIn key={i} delay={i * 150}>
                <div className="relative group">
                  <div className="absolute -inset-px bg-gradient-to-b from-accent/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative bg-gray-50 rounded-2xl p-8 lg:p-10 h-full border border-gray-100 group-hover:border-accent/20 transition-colors">
                    <div className="w-14 h-14 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-6">
                      {problem.icon}
                    </div>
                    <h3 className="text-xl font-bold text-navy-950 mb-3">
                      {problem.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed text-sm">
                      {problem.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16 lg:mb-20">
              <span className="text-xs font-semibold text-accent tracking-widest uppercase mb-3 block">
                Features
              </span>
              <h2 className="text-3xl lg:text-5xl font-bold text-navy-950 tracking-tight mb-4">
                導が選ばれる理由
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-base lg:text-lg">
                AIテクノロジーで採用プロセスを根本から変革します
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {features.map((feature, i) => (
              <FadeIn key={i} delay={i * 120}>
                <div className="group bg-white rounded-2xl p-8 lg:p-10 border border-gray-100 hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 h-full">
                  <div className="flex items-start gap-5">
                    <div className="shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-accent-dark text-white flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-navy-950 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-xs font-medium text-accent tracking-wide mb-3">
                        {feature.subtitle}
                      </p>
                      <p className="text-gray-500 leading-relaxed text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16 lg:mb-20">
              <span className="text-xs font-semibold text-accent tracking-widest uppercase mb-3 block">
                How It Works
              </span>
              <h2 className="text-3xl lg:text-5xl font-bold text-navy-950 tracking-tight mb-4">
                3ステップで始める
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-base lg:text-lg">
                シンプルなプロセスで、すぐにAI面接を導入できます
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-gradient-to-r from-accent/20 via-accent/40 to-accent/20" />

            {steps.map((step, i) => (
              <FadeIn key={i} delay={i * 200}>
                <div className="text-center relative">
                  <div className="relative inline-flex items-center justify-center w-32 h-32 mb-8">
                    <div className="absolute inset-0 rounded-full bg-accent/5" />
                    <div className="absolute inset-3 rounded-full bg-accent/10" />
                    <span className="relative text-4xl font-bold text-accent">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-navy-950 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed text-sm max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats Section ── */}
      <section className="py-24 lg:py-28 bg-navy-950 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-xs font-semibold text-accent-light tracking-widest uppercase mb-3 block">
                Achievements
              </span>
              <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">
                導の実績
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { target: 50000, suffix: "+", label: "AI面接実施数" },
              { target: 200, suffix: "+", label: "導入企業数" },
              { target: 98, suffix: "%", label: "企業満足度" },
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 150}>
                <div className="text-center p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <CountUp target={stat.target} suffix={stat.suffix} />
                  <p className="text-gray-400 mt-3 text-sm font-medium tracking-wide">
                    {stat.label}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-3xl -translate-y-1/2" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <span className="text-xs font-semibold text-accent tracking-widest uppercase mb-3 block">
              Get Started
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-navy-950 tracking-tight mb-6">
              AIで、採用を変えよう
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-base lg:text-lg mb-10 leading-relaxed">
              導を使えば、面接の手間を削減しながら、
              <br className="hidden sm:block" />
              より公平で精度の高い採用を実現できます。
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://www.michibiki.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-full text-base font-semibold transition-all hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5"
              >
                導を始める
              </a>
              <Link
                href="/contact"
                className="w-full sm:w-auto border border-gray-200 text-navy-950 px-8 py-4 rounded-full text-base font-medium hover:bg-gray-50 transition-all"
              >
                お問い合わせ
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}

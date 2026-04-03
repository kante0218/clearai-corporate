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
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return (
    <p className="text-sm font-semibold text-blue-600 mb-4">
      {children}
    </p>
  );
}

const companyInfo = [
  { label: "会社名", value: "clear AI株式会社" },
  { label: "設立", value: "2025年" },
  { label: "代表", value: "代表取締役" },
  { label: "所在地", value: "東京都" },
  { label: "事業内容", value: "AI導入支援事業 / AI面接プラットフォーム「導」" },
];

const timeline = [
  {
    year: "2025",
    title: "clear AI株式会社 設立",
    description: "AIの力をすべての企業に届けるというミッションのもと創業。",
  },
  {
    year: "2025",
    title: "AI面接プラットフォーム「導」リリース",
    description: "日本市場に特化したAI面接サービスの提供を開始。",
  },
  {
    year: "2026",
    title: "AI導入支援事業 開始",
    description: "企業のAI活用を包括的にサポートするコンサルティング事業を本格展開。",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="max-w-5xl mx-auto px-6 pt-40 pb-16">
        <Reveal>
          <Label>About</Label>
          <h1 className="text-3xl font-bold text-gray-900">
            会社概要
          </h1>
        </Reveal>
      </section>

      {/* Mission */}
      <section className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <Label>Mission</Label>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug mb-6">
              AIの力を、すべての企業に。
            </h2>
            <p className="max-w-2xl text-base text-gray-600 leading-relaxed">
              私たちclear AIは、まだ小さなチームですが、AI技術を活用して企業の成長と変革を支援するという大きなビジョンを持っています。AI面接プラットフォーム「導（みちびき）」と企業向けAI導入支援を通じて、すべての企業がAIの恩恵を受けられる社会を目指し、一歩一歩前進しています。
            </p>
          </Reveal>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <Label>Company</Label>
            <h2 className="text-2xl font-bold text-gray-900 mb-10">
              企業情報
            </h2>
          </Reveal>

          <div className="max-w-2xl bg-white rounded-2xl border border-gray-200 overflow-hidden">
            {companyInfo.map((item, i) => (
              <Reveal key={item.label} delay={i * 80}>
                <div className="flex flex-col sm:flex-row sm:items-baseline px-6 py-5 border-b border-gray-100 last:border-0">
                  <span className="sm:w-[160px] shrink-0 text-sm font-semibold text-gray-500 mb-1 sm:mb-0">
                    {item.label}
                  </span>
                  <span className="text-base text-gray-900">
                    {item.value}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <Label>History</Label>
            <h2 className="text-2xl font-bold text-gray-900 mb-10">
              沿革
            </h2>
          </Reveal>

          <div className="relative max-w-2xl">
            {/* Vertical line */}
            <div className="absolute left-[3px] top-2 bottom-2 w-px bg-blue-200" />

            <div className="space-y-12">
              {timeline.map((item, i) => (
                <Reveal key={i} delay={i * 120}>
                  <div className="relative pl-10">
                    {/* Dot */}
                    <div className="absolute left-0 top-1.5 w-[7px] h-[7px] rounded-full bg-blue-600" />

                    <span className="block text-sm font-semibold text-blue-600 mb-1">
                      {item.year}
                    </span>
                    <h3 className="text-base font-bold text-gray-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

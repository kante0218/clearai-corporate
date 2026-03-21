"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/* ─── Scroll-triggered reveal ─── */
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
        transform: visible ? "translateY(0)" : "translateY(50px)",
        transition: `opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] tracking-[0.25em] uppercase text-white/20 mb-6 font-medium">
      {children}
    </p>
  );
}

const companyInfo = [
  { label: "会社名", value: "clear AI株式会社" },
  { label: "設立", value: "2025年" },
  { label: "代表", value: "［準備中］" },
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
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <section className="max-w-[1100px] mx-auto px-6 pt-40 pb-20">
        <Reveal>
          <Label>About</Label>
          <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-extralight tracking-tight text-white/90 leading-[1.15]">
            会社概要
          </h1>
        </Reveal>
      </section>

      {/* Mission */}
      <section className="py-32 lg:py-44">
        <div className="max-w-[1100px] mx-auto px-6">
          <Reveal>
            <Label>Mission</Label>
            <h2 className="text-[clamp(1.6rem,3.5vw,2.8rem)] font-extralight tracking-tight text-white/90 leading-[1.3] mb-10">
              AIの力を、すべての企業に。
            </h2>
            <p className="max-w-[600px] text-[14px] text-white/35 leading-[2.4] font-light">
              私たちclear AIは、まだ小さなチームですが、AI技術を活用して企業の成長と変革を支援するという大きなビジョンを持っています。AI面接プラットフォーム「導（みちびき）」と企業向けAI導入支援を通じて、すべての企業がAIの恩恵を受けられる社会を目指し、一歩一歩前進しています。
            </p>
          </Reveal>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-32 lg:py-44 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto px-6">
          <Reveal>
            <Label>Company</Label>
            <h2 className="text-[clamp(1.4rem,3vw,2.2rem)] font-extralight tracking-tight text-white/90 leading-[1.3] mb-16">
              企業情報
            </h2>
          </Reveal>

          <div className="max-w-[700px]">
            {companyInfo.map((item, i) => (
              <Reveal key={item.label} delay={i * 80}>
                <div className="flex flex-col sm:flex-row sm:items-baseline py-6 border-b border-white/5">
                  <span className="sm:w-[160px] shrink-0 text-[12px] tracking-[0.1em] text-white/25 font-medium mb-1 sm:mb-0">
                    {item.label}
                  </span>
                  <span className="text-[14px] text-white/50 font-light">
                    {item.value}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-32 lg:py-44 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto px-6">
          <Reveal>
            <Label>History</Label>
            <h2 className="text-[clamp(1.4rem,3vw,2.2rem)] font-extralight tracking-tight text-white/90 leading-[1.3] mb-16">
              沿革
            </h2>
          </Reveal>

          <div className="relative max-w-[700px]">
            {/* Vertical line */}
            <div className="absolute left-[3px] top-2 bottom-2 w-px bg-white/8" />

            <div className="space-y-16">
              {timeline.map((item, i) => (
                <Reveal key={i} delay={i * 120}>
                  <div className="relative pl-10">
                    {/* Dot */}
                    <div className="absolute left-0 top-1.5 w-[7px] h-[7px] rounded-full bg-black/20" />

                    <span className="block text-[11px] tracking-[0.2em] text-white/25 font-medium mb-2">
                      {item.year}
                    </span>
                    <h3 className="text-[16px] font-light text-white/60 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[13px] text-white/25 font-light leading-[1.8]">
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

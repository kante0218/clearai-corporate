"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { faqItems } from "./faq-data";
import { useLanguage } from "@/lib/i18n/LanguageContext";

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>{children}</div>
  );
}

function SectionHead({
  index,
  kicker,
  title,
  desc,
  dark = false,
}: {
  index: string;
  kicker: ReactNode;
  title: ReactNode;
  desc?: ReactNode;
  dark?: boolean;
}) {
  return (
    <Reveal className="mb-7 lg:mb-9 max-w-3xl">
      <div className={`flex items-center gap-4 border-b pb-4 ${dark ? "border-white/25" : "border-neutral-900"}`}>
        <span className={`font-mono text-xs font-bold tabular-nums ${dark ? "text-white" : "text-neutral-900"}`}>§{index}</span>
        <span className={`font-mono text-[11px] font-medium uppercase tracking-[0.25em] ${dark ? "text-neutral-400" : "text-neutral-500"}`}>{kicker}</span>
      </div>
      <h2 className={`mt-8 text-[18px] sm:text-xl lg:text-2xl font-bold leading-[1.15] sm:leading-[1.05] tracking-[-0.02em] text-balance ${dark ? "text-white" : "text-neutral-900"}`}>
        {title}
      </h2>
      {desc && <p className={`mt-6 text-[15px] leading-relaxed text-pretty ${dark ? "text-neutral-400" : "text-neutral-600"}`}>{desc}</p>}
    </Reveal>
  );
}

type Copy = {
  heroChip: string;
  heroTitle: string;
  heroDesc: string;
  heroBtnPrimary: string;
  heroBtnSecondary: string;
  listLabel: string;
  listTitle: string;
  ctaLabel: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaButton: string;
};

const COPY: Record<"ja" | "en", Copy> = {
  ja: {
    heroChip: "FAQ",
    heroTitle: "よくあるご質問",
    heroDesc: "お問い合わせ前によく寄せられる12の質問をまとめましたので、ここにない内容はお気軽にご連絡ください。",
    heroBtnPrimary: "質問を見る",
    heroBtnSecondary: "直接相談する →",
    listLabel: "Questions",
    listTitle: "12の質問にお答えします",
    ctaLabel: "Contact",
    ctaTitle: "答えが見つからないときは。",
    ctaDesc: "お問い合わせフォームからご連絡いただければ、2営業日以内にご返信します（NDA締結にも対応）。",
    ctaButton: "無料で相談する",
  },
  en: {
    heroChip: "FAQ",
    heroTitle: "Frequently Asked Questions",
    heroDesc: "We've compiled 12 common pre-enquiry questions — for anything not covered here, please feel free to reach out.",
    heroBtnPrimary: "View questions",
    heroBtnSecondary: "Talk to us directly →",
    listLabel: "Questions",
    listTitle: "Answers to 12 common questions",
    ctaLabel: "Contact",
    ctaTitle: "Didn't find your answer?",
    ctaDesc: "Send your question through the contact form and we'll reply within 2 business days — NDA signing available.",
    ctaButton: "Book a free consultation",
  },
};

export default function FaqPage() {
  const { lang } = useLanguage();
  const t = COPY[lang];
  const [heroLoaded, setHeroLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setHeroLoaded(true), 100); }, []);

  return (
    <>
      {/* MASTHEAD */}
      <section className="bg-white pt-32 lg:pt-40 pb-16 lg:pb-24">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          {/* technical meta bar */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-neutral-900 pb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500 transition-opacity duration-700" style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "300ms" }}>
            <span className="font-bold text-neutral-900">§00</span>
            <span>{t.heroChip}</span>
            <span className="text-neutral-300">/</span>
            <span>Support</span>
            <span className="text-neutral-300">/</span>
            <span>Pre&nbsp;Enquiry</span>
          </div>
          <h1 className="mt-10 text-[7vw] sm:text-3xl lg:text-4xl font-bold leading-[0.95] tracking-[-0.04em] text-balance text-neutral-900 transition-[opacity,transform] duration-700" style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(24px)", transitionDelay: "500ms" }}>
            {t.heroTitle}
          </h1>
          <p className="mt-8 max-w-2xl text-base lg:text-lg leading-relaxed text-pretty text-neutral-600 transition-[opacity,transform] duration-700" style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "700ms" }}>
            {t.heroDesc.split("\n").map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </p>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center transition-[opacity,transform] duration-700" style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "900ms" }}>
            <a href="#list" className="group inline-flex items-center justify-center gap-3 border border-neutral-900 bg-neutral-900 px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.08em] text-white transition-[color,background-color,border-color,scale] duration-300 hover:bg-transparent hover:text-neutral-900 active:scale-[0.96]">
              {t.heroBtnPrimary}
              <span className="transition-transform duration-300 group-hover:translate-x-1">↓</span>
            </a>
            <a href="/contact" className="inline-flex items-center justify-center gap-2 border border-neutral-300 px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.08em] text-neutral-600 transition-[color,border-color,scale] duration-300 hover:border-neutral-900 hover:text-neutral-900 active:scale-[0.96]">
              {t.heroBtnSecondary}
            </a>
          </div>
        </div>
      </section>

      {/* LIST */}
      <section id="list" className="py-12 lg:py-16 bg-neutral-50 border-y border-neutral-900">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="01" kicker={t.listLabel} title={t.listTitle} />
          <div className="max-w-3xl border-t border-neutral-900">
            {faqItems.map((f, i) => (
              <Reveal key={i} delay={i * 30}>
                <details className="group border-b border-neutral-300 py-5">
                  <summary className="flex cursor-pointer list-none items-start gap-4 text-base font-semibold text-neutral-900">
                    <span className="mt-0.5 font-mono text-xs tabular-nums text-neutral-400">Q{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex-1">{f.q[lang]}</span>
                    <span className="font-mono text-lg leading-none text-neutral-400 transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 pl-9 text-sm leading-relaxed text-pretty text-neutral-600">{f.a[lang]}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-neutral-900 py-16 lg:py-20">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="flex items-center gap-4 border-b border-neutral-700 pb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
              <span className="font-bold text-white">§02</span>
              <span>{t.ctaLabel}</span>
            </div>
            <div className="mt-12 grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <h2 className="text-[18px] sm:text-xl lg:text-2xl font-bold leading-[1.15] sm:leading-[1.05] tracking-[-0.02em] text-balance text-white">{t.ctaTitle}</h2>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-pretty text-neutral-400">
                  {t.ctaDesc.split("\n").map((line, i, arr) => (
                    <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                  ))}
                </p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <a href="/reserve" className="group inline-flex items-center gap-3 border border-white bg-white px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.08em] text-neutral-900 transition-[color,background-color,border-color,scale] duration-300 hover:bg-transparent hover:text-white active:scale-[0.96]">
                  {t.ctaButton}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

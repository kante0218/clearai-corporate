"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { faqItems } from "./faq-data";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { BOOKING_URL } from "@/lib/booking";

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

function Label({ children }: { children: ReactNode }) {
  return <p className="text-sm font-semibold text-neutral-900 mb-4">{children}</p>;
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
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute bottom-1/3 right-1/4 w-[1px] h-[1px] shadow-[0_0_300px_150px_rgba(0,0,0,0.04)]" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <span className="inline-block rounded-md bg-neutral-100 text-neutral-900 px-3 py-1 text-sm font-semibold mb-6 transition-all duration-700" style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "300ms" }}>{t.heroChip}</span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6 transition-all duration-700" style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(24px)", transitionDelay: "500ms" }}>
            {t.heroTitle}
          </h1>
          <p className="text-base text-gray-600 leading-relaxed max-w-lg mx-auto mb-10 transition-all duration-700" style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "700ms" }}>
            {t.heroDesc.split("\n").map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </p>
          <div className="flex items-center justify-center gap-4 transition-all duration-700" style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "900ms" }}>
            <a href="#list" className="rounded-lg bg-neutral-900 text-white font-semibold px-8 py-3.5 hover:bg-neutral-800 transition-colors duration-300">{t.heroBtnPrimary}</a>
            <a href="/contact" className="text-sm text-gray-500 font-semibold hover:text-gray-900 transition-colors duration-300">{t.heroBtnSecondary}</a>
          </div>
        </div>
      </section>

      {/* LIST */}
      <section id="list" className="py-14 lg:py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.listLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-8">{t.listTitle}</h2>
          </Reveal>
          <div className="space-y-3">
            {faqItems.map((f, i) => (
              <Reveal key={i} delay={i * 30}>
                <details className="group bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <summary className="cursor-pointer list-none p-3.5 md:p-5 flex items-start justify-between gap-4 hover:bg-gray-50 transition-colors">
                    <span className="text-sm lg:text-base font-semibold text-gray-900">{f.q[lang]}</span>
                    <span className="flex-shrink-0 text-neutral-900 text-xl transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <div className="px-3.5 pb-3.5 md:px-5 md:pb-5 text-sm text-gray-600 leading-relaxed">{f.a[lang]}</div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Reveal>
            <Label>{t.ctaLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.ctaTitle}</h2>
            <p className="text-base text-gray-600 leading-relaxed mb-10">
              {t.ctaDesc.split("\n").map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </p>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-neutral-900 text-white font-semibold px-10 py-4 hover:bg-neutral-800 transition-colors duration-300 inline-block">{t.ctaButton}</a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

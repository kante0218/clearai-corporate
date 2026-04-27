"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { faqItems } from "./faq-data";

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
  return <p className="text-sm font-semibold text-blue-600 mb-4">{children}</p>;
}

export default function FaqPage() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setHeroLoaded(true), 100); }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute bottom-1/3 right-1/4 w-[1px] h-[1px] shadow-[0_0_300px_150px_rgba(37,99,235,0.08)]" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <span className="inline-block rounded-full bg-blue-50 text-blue-600 px-3 py-1 text-sm font-semibold mb-6 transition-all duration-700" style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "300ms" }}>FAQ</span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6 transition-all duration-700" style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(24px)", transitionDelay: "500ms" }}>
            よくあるご質問
          </h1>
          <p className="text-base text-gray-600 leading-relaxed max-w-lg mx-auto mb-10 transition-all duration-700" style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "700ms" }}>
            お問い合わせ前に多く寄せられる質問を12項目まとめました。<br />ここに無い内容は、お気軽にお問い合わせください。
          </p>
          <div className="flex items-center justify-center gap-4 transition-all duration-700" style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "900ms" }}>
            <a href="#list" className="rounded-lg bg-blue-600 text-white font-semibold px-8 py-3.5 hover:bg-blue-700 transition-colors duration-300">質問を見る</a>
            <a href="/contact" className="text-sm text-gray-500 font-semibold hover:text-gray-900 transition-colors duration-300">直接相談する →</a>
          </div>
        </div>
      </section>

      {/* LIST */}
      <section id="list" className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Questions</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-14">12の質問にお答えします</h2>
          </Reveal>
          <div className="space-y-3">
            {faqItems.map((f, i) => (
              <Reveal key={f.q} delay={i * 30}>
                <details className="group bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <summary className="cursor-pointer list-none p-5 flex items-start justify-between gap-4 hover:bg-gray-50 transition-colors">
                    <span className="text-sm lg:text-base font-semibold text-gray-900">{f.q}</span>
                    <span className="flex-shrink-0 text-blue-600 text-xl transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">{f.a}</div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Reveal>
            <Label>Contact</Label>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">答えが見つからないときは。</h2>
            <p className="text-base text-gray-600 leading-relaxed mb-10">
              個別のご質問は、お問い合わせフォームからご連絡ください。<br />初回返信は2営業日以内、NDA締結にも対応します。
            </p>
            <a href="/contact" className="rounded-lg bg-blue-600 text-white font-semibold px-10 py-4 hover:bg-blue-700 transition-colors duration-300 inline-block">無料で相談する</a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

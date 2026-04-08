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
  return <p className="text-sm font-semibold text-emerald-600 mb-4">{children}</p>;
}

export default function AiAgriculturePage() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setHeroLoaded(true), 100); }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute bottom-1/3 right-1/4 w-[1px] h-[1px] shadow-[0_0_300px_150px_rgba(16,185,129,0.07)]" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <span className="inline-block rounded-full bg-emerald-50 text-emerald-600 px-3 py-1 text-sm font-semibold mb-6 transition-all duration-700" style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "300ms" }}>AI × Agriculture</span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6 transition-all duration-700" style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(24px)", transitionDelay: "500ms" }}>
            日本の農業を、<br />AIでアップデートする。
          </h1>
          <p className="text-base text-gray-600 leading-relaxed max-w-lg mx-auto mb-10 transition-all duration-700" style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "700ms" }}>
            栽培管理・収穫予測・スマート農業ソリューション。<br />日本の生産者の現場に寄り添い、AIの力で農業の未来を支えます。
          </p>
          <div className="flex items-center justify-center gap-4 transition-all duration-700" style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "900ms" }}>
            <a href="/contact" className="rounded-xl bg-emerald-600 text-white font-semibold px-8 py-3.5 hover:bg-emerald-700 transition-colors duration-300">無料相談を申し込む</a>
            <a href="#services" className="text-sm text-gray-500 font-semibold hover:text-gray-900 transition-colors duration-300">ソリューションを見る →</a>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>About</Label>
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-gray-900 leading-snug mb-6">人手不足、高齢化、気候変動。<br />日本の農業の課題に、AIで応える。</h2>
              <p className="text-base text-gray-600 leading-relaxed">
                日本の農業は今、深刻な担い手不足と気候変動の影響に直面しています。私たちclear AIは、AIと最新テクノロジーを活用して、生産者の負担を減らし、収量と品質を高めるソリューションを提供します。派手な提案ではなく、現場で本当に使える形で、AIを農業に届けます。
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section id="services" className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Solutions</Label>
            <h2 className="text-2xl font-bold text-gray-900 mb-14">4つのソリューション</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { num: "01", title: "栽培管理AI", desc: "気温・湿度・土壌データをAIが分析し、最適な水やり・施肥タイミングを提案。経験と勘を、データで裏付けます。", hoverBg: "hover:bg-emerald-50" },
              { num: "02", title: "収穫予測・出荷最適化", desc: "過去の収量データと気象情報から、収穫時期と量を予測。出荷計画と市場価格戦略を最適化します。", hoverBg: "hover:bg-lime-50" },
              { num: "03", title: "病害虫検知", desc: "画像認識AIで作物の病害虫を早期発見。スマホで撮るだけで、対処法まで提案。被害を最小限に抑えます。", hoverBg: "hover:bg-teal-50" },
              { num: "04", title: "スマート農業導入支援", desc: "ドローン、センサー、IoT機器の選定から導入まで。補助金活用も含めて、現場に合った形でご提案します。", hoverBg: "hover:bg-green-50" },
            ].map((item, i) => (
              <Reveal key={item.num} delay={i * 100}>
                <div className={`bg-white rounded-2xl border border-gray-200 p-8 transition-all duration-300 cursor-default group ${item.hoverBg} hover:shadow-lg`}>
                  <span className="text-sm font-bold text-emerald-600">{item.num}</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-3 mb-4">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Process</Label>
            <h2 className="text-2xl font-bold text-gray-900 mb-14">導入の流れ</h2>
          </Reveal>
          {[
            { num: "01", title: "現場ヒアリング", en: "Hearing", desc: "農園・圃場を訪問し、栽培品目・規模・課題を整理。生産者の声を起点に、本当に効果が出る領域を特定します。" },
            { num: "02", title: "ソリューション提案", en: "Proposal", desc: "現場に合った技術選定と導入計画をご提案。補助金活用やROI試算も含めて、無理のないプランをお示しします。" },
            { num: "03", title: "実装・現場導入", en: "Implementation", desc: "センサー設置・AI設定・運用テストまで対応。生産者が自ら使いこなせるよう、現場で丁寧にレクチャーします。" },
            { num: "04", title: "運用・改善", en: "Operation", desc: "シーズンごとにデータを振り返り、精度を改善。生産者と二人三脚で、収量・品質の向上を目指します。" },
          ].map((step, i) => (
            <Reveal key={step.num} delay={i * 100}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-10 border-b border-gray-100 last:border-0">
                <div className="lg:col-span-1"><span className="text-sm font-bold text-emerald-600">{step.num}</span></div>
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

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Reveal>
            <Label>Contact</Label>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">まずは、お話しませんか。</h2>
            <p className="text-base text-gray-600 leading-relaxed mb-10">「うちの農園でも使えるのか」というご相談から大歓迎です。<br />現場の状況をお聞きした上で、最適な進め方をご提案します。</p>
            <a href="/contact" className="rounded-xl bg-emerald-600 text-white font-semibold px-10 py-4 hover:bg-emerald-700 transition-colors duration-300 inline-block">無料で相談する</a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.unobserve(el); }
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
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

type Copy = {
  heroKicker: string;
  heroTitle: string;
  heroDesc: string;
  heroChips: string[];
  heroCta: string;
  offerLabel: string; offerTitle: string; offerDesc: string;
  offers: { title: string; desc: string }[];
  includeLabel: string; includeTitle: string; includeDesc: string;
  includes: string[];
  useLabel: string; useTitle: string; useDesc: string;
  useCases: { name: string; tag: string; desc: string }[];
  processLabel: string; processTitle: string;
  process: { num: string; title: string; en: string; desc: string }[];
  faqLabel: string; faqTitle: string;
  faq: { q: string; a: string }[];
  ctaKicker: string; ctaTitle: string; ctaDesc: string; ctaButton: string;
  note: string;
};

const COPY: Record<"ja" | "en", Copy> = {
  ja: {
    heroKicker: "Humanoid Robot Rental",
    heroTitle: "最新のヒューマノイドを、導入前に現場で試す。",
    heroDesc: "人型ロボットの短期レンタル・PoC（実証実験）・イベント活用をワンストップで。高額な機体をいきなり購入せず、自社の現場で「本当に使えるか」を確かめてから判断できます。搬入・セットアップ・オペレーターまで含めてclearAIが伴走します。",
    heroChips: ["短期レンタル", "PoC・実証実験", "イベント・PR活用", "AI連携デモ"],
    heroCta: "レンタルの相談をする",
    offerLabel: "What We Offer",
    offerTitle: "「買う」前に、「試す」という選択肢。",
    offerDesc: "ヒューマノイドはまだ高額で、用途も発展途上。だからこそ、現場での実証から始めるのが最も賢い投資です。clearAIは4つの形でヒューマノイド活用を支援します。",
    offers: [
      { title: "短期レンタル", desc: "日単位・週単位・月単位で人型ロボットをレンタル。展示会、店舗、工場、研究用途まで、期間と目的に合わせて柔軟に提供します。" },
      { title: "PoC・実証実験の設計と運用", desc: "「自社の業務で使えるか」を検証するPoCを設計。成功基準の設定からデータ取得、レポートまで、導入判断に必要な材料を揃えます。" },
      { title: "イベント・PR活用", desc: "展示会、店頭プロモーション、メディア撮影、投資家向けデモなど。人型ロボットの集客力・話題性を、安全管理込みで最大化します。" },
      { title: "AI連携・カスタムデモ", desc: "Claude等の生成AIと連携した対話・案内デモを構築。貴社のユースケースに合わせた動作シナリオを企画・実装します。" },
    ],
    includeLabel: "Included",
    includeTitle: "レンタルに含まれるもの",
    includeDesc: "「機体だけ届いて動かせない」を防ぎます。現場で価値を出すために必要なものを、まとめて提供します。",
    includes: ["ヒューマノイド機体一式", "搬入・設置・撤収", "現地オペレーター対応（オプション）", "安全管理・リスクアセスメント", "AI連携・動作シナリオ設計", "実証後の効果レポート"],
    useLabel: "Use Cases",
    useTitle: "こんな現場で、試されています。",
    useDesc: "用途に合わせて最適な機種・構成をご提案します。下記以外のご相談も歓迎です。",
    useCases: [
      { name: "展示会・イベント", tag: "PR・集客", desc: "ブースの集客装置として。来場者対応や撮影スポットで話題性を生みます。" },
      { name: "店舗・施設", tag: "接客・案内", desc: "受付・案内・呼び込みなど、接客シーンでの実証導入を短期で検証できます。" },
      { name: "工場・物流", tag: "省人化検証", desc: "搬送・点検補助などの省人化ユースケースを、本番環境に近い形でPoC。" },
      { name: "研究・教育機関", tag: "R&D・教材", desc: "ロボティクス研究、AI連携の実験、教育デモ用途での短期利用に対応。" },
    ],
    processLabel: "Process",
    processTitle: "ご相談から実証までの流れ",
    process: [
      { num: "01", title: "ヒアリング・目的整理", en: "Discovery", desc: "活用シーン、検証したいこと、期間、設置環境、予算感を整理します。" },
      { num: "02", title: "機種選定・構成提案", en: "Proposal", desc: "目的に合うヒューマノイド機種と、AI連携・オペレーター体制を含む構成・見積をご提案します。" },
      { num: "03", title: "搬入・セットアップ", en: "Setup", desc: "現場への搬入、初期設定、動作シナリオの実装、安全確認までを実施します。" },
      { num: "04", title: "実証・運用", en: "Operation", desc: "レンタル期間中の稼働をサポート。必要に応じてオペレーターが帯同します。" },
      { num: "05", title: "撤収・効果レポート", en: "Report", desc: "撤収後、取得データをもとに効果と課題を整理し、本格導入の判断材料をご提供します。" },
    ],
    faqLabel: "FAQ",
    faqTitle: "よくあるご質問",
    faq: [
      { q: "どんな機種をレンタルできますか？", a: "用途に応じて最適なヒューマノイド機種をご提案します。具体的な機種・在庫状況はお問い合わせ時にご案内します。" },
      { q: "1日だけ、イベントの間だけでも借りられますか？", a: "可能です。展示会やイベントなど、日単位・期間限定のスポット利用にも対応します。" },
      { q: "ロボットの操作に専門知識は必要ですか？", a: "不要です。オペレーター帯同オプションや、現場スタッフ向けの操作レクチャーをご用意します。" },
      { q: "Claude等のAIと連携した動作はできますか？", a: "対応できます。対話・案内・受付などのシナリオを、生成AIと連携してカスタム実装します。" },
      { q: "費用感を教えてください。", a: "機種・期間・オペレーター有無・AI連携の範囲により変動します。目的をお伺いした上で概算レンジをご提示します。" },
      { q: "NDAには対応していますか？", a: "もちろんです。未公開の実証プロジェクトについても、初回相談前に相互NDAを締結できます。" },
    ],
    ctaKicker: "Contact",
    ctaTitle: "「まず試してみたい」から、お気軽に。",
    ctaDesc: "「展示会で人型ロボットを使いたい」「自社業務で実証してみたい」など、ラフな段階からご相談ください。最適な機種と進め方をご提案します。",
    ctaButton: "無料で相談する",
    note: "※ 機種・在庫・対応エリアは時期により変動します。詳細はお問い合わせください。",
  },
  en: {
    heroKicker: "Humanoid Robot Rental",
    heroTitle: "Try the latest humanoids on-site, before you buy.",
    heroDesc: "Short-term rental, PoC (proof of concept), and event use of humanoid robots — all in one place. Instead of buying an expensive unit outright, verify whether it truly works in your own environment first. clearAI supports you through delivery, setup, and operation.",
    heroChips: ["Short-term rental", "PoC & demos", "Events & PR", "AI-linked demos"],
    heroCta: "Ask about rental",
    offerLabel: "What We Offer",
    offerTitle: "An option to 'try' before you 'buy.'",
    offerDesc: "Humanoids are still expensive and their use cases still evolving — which is exactly why starting with an on-site trial is the smartest investment. We support humanoid adoption in four ways.",
    offers: [
      { title: "Short-term rental", desc: "Rent humanoid robots by the day, week, or month. Flexible provision for trade shows, stores, factories, and research — matched to your timeline and goal." },
      { title: "PoC design & operation", desc: "We design a PoC to verify 'can this work in our operations.' From success criteria to data capture and reporting, we assemble what you need to make an adoption decision." },
      { title: "Events & PR", desc: "Trade shows, in-store promotions, media shoots, investor demos — we maximize the draw and buzz of a humanoid, safety management included." },
      { title: "AI-linked custom demos", desc: "We build conversational and guidance demos linked with generative AI such as Claude, designing and implementing motion scenarios tailored to your use case." },
    ],
    includeLabel: "Included",
    includeTitle: "What the rental includes",
    includeDesc: "We prevent the 'a unit arrived but we can't run it' problem — bundling everything needed to create value on-site.",
    includes: ["Humanoid robot unit", "Delivery, setup & removal", "On-site operator (optional)", "Safety management & risk assessment", "AI integration & motion scenario design", "Post-trial impact report"],
    useLabel: "Use Cases",
    useTitle: "Where it's being tried.",
    useDesc: "We propose the optimal model and setup for your purpose. Inquiries beyond the below are welcome too.",
    useCases: [
      { name: "Trade shows & events", tag: "PR & draw", desc: "As a crowd-drawing device for your booth — visitor interaction and photo spots that create buzz." },
      { name: "Stores & facilities", tag: "Hospitality", desc: "Reception, guidance, and greeting — verify a hospitality trial in a short window." },
      { name: "Factories & logistics", tag: "Labor-saving", desc: "PoC labor-saving use cases like transport and inspection assistance, close to real conditions." },
      { name: "Research & education", tag: "R&D & teaching", desc: "Short-term use for robotics research, AI-integration experiments, and educational demos." },
    ],
    processLabel: "Process",
    processTitle: "From inquiry to proof of concept",
    process: [
      { num: "01", title: "Discovery", en: "Discovery", desc: "We organize the use scene, what you want to verify, the period, the install environment, and budget." },
      { num: "02", title: "Model & setup proposal", en: "Proposal", desc: "We propose a fitting humanoid model and a setup — including AI integration and operator support — with a quote." },
      { num: "03", title: "Delivery & setup", en: "Setup", desc: "On-site delivery, initial configuration, motion-scenario implementation, and safety checks." },
      { num: "04", title: "Trial & operation", en: "Operation", desc: "We support operation through the rental period, with an operator on hand as needed." },
      { num: "05", title: "Removal & report", en: "Report", desc: "After removal, we organize impact and issues from the captured data — material for a full-adoption decision." },
    ],
    faqLabel: "FAQ",
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "What models can we rent?", a: "We propose the optimal humanoid model for your purpose. Specific models and availability are shared at the inquiry stage." },
      { q: "Can we rent for just one day or only during an event?", a: "Yes. We support per-day and period-limited spot use for trade shows and events." },
      { q: "Do we need expertise to operate the robot?", a: "No. We offer an operator-accompaniment option and operating lectures for your on-site staff." },
      { q: "Can it run with AI like Claude?", a: "Yes. We custom-build conversation, guidance, and reception scenarios integrated with generative AI." },
      { q: "What about cost?", a: "It varies by model, period, operator option, and the scope of AI integration. We'll share a rough range after hearing your goal." },
      { q: "Do you handle NDAs?", a: "Of course. We can sign a mutual NDA before the first consultation, including for unannounced trial projects." },
    ],
    ctaKicker: "Contact",
    ctaTitle: "Start from 'we'd just like to try it.'",
    ctaDesc: "'We want to use a humanoid at a trade show,' 'We'd like to run a trial in our operations' — reach out at any rough stage. We'll propose the right model and approach.",
    ctaButton: "Book a free consultation",
    note: "* Models, availability, and service areas vary by season. Please contact us for details.",
  },
};

export default function RobotRentalPage() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#090b0f] pt-24 lg:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(34,211,238,0.16),transparent_34%),linear-gradient(120deg,rgba(15,23,42,0.92),rgba(8,10,14,0.72))]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pb-16 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <Reveal className="lg:col-span-5">
              <p className="text-sm font-semibold text-cyan-300 mb-4">{t.heroKicker}</p>
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">{t.heroTitle}</h1>
              <p className="text-base lg:text-lg text-slate-300 leading-relaxed mb-8">{t.heroDesc}</p>
              <div className="flex flex-wrap gap-3 mb-8">
                {t.heroChips.map((item) => (
                  <span key={item} className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-semibold text-slate-100">{item}</span>
                ))}
              </div>
              <a href="/contact?service=robot-rental" className="inline-flex rounded-lg bg-cyan-400 px-8 py-4 text-sm font-bold text-slate-950 transition-colors duration-300 hover:bg-cyan-300">
                {t.heroCta}
              </a>
            </Reveal>
            <Reveal className="lg:col-span-7" delay={120}>
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/humanoid/workskin-hero-tricolor.png" alt={t.heroTitle} className="w-full rounded-lg border border-white/12 shadow-2xl shadow-cyan-950/40" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* OFFER */}
      <section className="bg-[#0f1218] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.18em] uppercase text-cyan-300 mb-4">{t.offerLabel}</p>
            <h2 className="max-w-3xl text-3xl lg:text-5xl font-bold text-white leading-tight mb-6">{t.offerTitle}</h2>
            <p className="max-w-3xl text-base text-slate-300 leading-relaxed mb-12">{t.offerDesc}</p>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {t.offers.map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="h-full rounded-lg border border-white/10 bg-white/[0.04] p-7">
                  <span className="text-sm font-bold text-cyan-300">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-xl font-bold text-white mt-3 mb-4">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-300">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INCLUDED */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.18em] uppercase text-sky-600 mb-4">{t.includeLabel}</p>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-950 leading-tight mb-6">{t.includeTitle}</h2>
            <p className="max-w-3xl text-base text-gray-600 leading-relaxed mb-12">{t.includeDesc}</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.includes.map((item, i) => (
              <Reveal key={item} delay={i * 60}>
                <div className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-5">
                  <svg className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-800 leading-snug">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.18em] uppercase text-sky-600 mb-4">{t.useLabel}</p>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-950 leading-tight mb-6">{t.useTitle}</h2>
            <p className="max-w-3xl text-base text-gray-600 leading-relaxed mb-12">{t.useDesc}</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.useCases.map((item, i) => (
              <Reveal key={item.name} delay={i * 80}>
                <div className="h-full rounded-lg border border-gray-200 bg-white p-6">
                  <span className="inline-block rounded-full bg-sky-50 text-sky-600 text-xs font-bold px-3 py-1 mb-4">{item.tag}</span>
                  <h3 className="text-lg font-bold text-gray-950 mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.18em] uppercase text-sky-600 mb-4">{t.processLabel}</p>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-950 leading-tight mb-14">{t.processTitle}</h2>
          </Reveal>
          {t.process.map((step, i) => (
            <Reveal key={step.num} delay={i * 80}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-9 border-b border-gray-100 last:border-0">
                <div className="lg:col-span-1"><span className="text-sm font-bold text-sky-600">{step.num}</span></div>
                <div className="lg:col-span-3">
                  <h3 className="text-xl font-bold text-gray-950">{step.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{step.en}</p>
                </div>
                <div className="lg:col-span-8"><p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.18em] uppercase text-sky-600 mb-4">{t.faqLabel}</p>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-950 leading-tight mb-14">{t.faqTitle}</h2>
          </Reveal>
          <div className="max-w-3xl">
            {t.faq.map((item, i) => (
              <Reveal key={item.q} delay={i * 60}>
                <details className="border-b border-gray-200 py-5 group">
                  <summary className="font-semibold text-gray-950 cursor-pointer list-none flex items-center justify-between gap-4">
                    <span>{item.q}</span>
                    <span className="text-gray-400 text-lg leading-none flex-shrink-0 transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <p className="text-gray-600 text-sm leading-relaxed mt-3">{item.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-8 max-w-3xl">{t.note}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#090b0f] py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.18em] uppercase text-cyan-300 mb-4">{t.ctaKicker}</p>
            <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-5">{t.ctaTitle}</h2>
            <p className="text-base text-slate-300 leading-relaxed mb-10">{t.ctaDesc}</p>
            <a href="/contact?service=robot-rental" className="inline-flex rounded-lg bg-cyan-400 px-10 py-4 text-sm font-bold text-slate-950 transition-colors duration-300 hover:bg-cyan-300">
              {t.ctaButton}
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

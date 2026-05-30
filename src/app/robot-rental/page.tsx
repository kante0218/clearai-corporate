"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";

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
  return <p className="text-sm font-semibold text-sky-600 mb-4">{children}</p>;
}

type Copy = {
  heroKicker: string; comingSoon: string; heroTitle: string; heroDesc: string;
  heroCta: string; heroNote: string;
  bannerTitle: string; bannerDesc: string;
  lineupLabel: string; lineupTitle: string; lineupDesc: string;
  lineup: { name: string; type: string; desc: string; image?: string }[];
  lineupFootnote: string;
  planLabel: string; planTitle: string; planDesc: string;
  plans: { title: string; desc: string }[];
  useLabel: string; useTitle: string; useDesc: string;
  useCases: { name: string; desc: string }[];
  ctaLabel: string; ctaTitle: string; ctaDesc: string; ctaButton: string;
};

const COPY: Record<"ja" | "en", Copy> = {
  ja: {
    heroKicker: "Robot Rental",
    comingSoon: "Coming Soon",
    heroTitle: "ロボットレンタル",
    heroDesc: "Unitree・AGIBOT など、海外の最先端ヒューマノイド／ロボットを輸入し、レンタルで提供するサービスを準備中です。高額な機体を購入する前に、自社の現場で試せる選択肢を間もなくお届けします。",
    heroCta: "先行してご相談する",
    heroNote: "正式リリースに向けて準備を進めています",
    bannerTitle: "サービス準備中（Coming Soon）",
    bannerDesc: "ロボットレンタルは現在ローンチ準備中です。機体ラインナップ・料金・提供開始時期は順次公開します。導入をご検討の方には、先行してご相談・先行ご案内を承っています。",
    lineupLabel: "Lineup",
    lineupTitle: "導入予定のロボット",
    lineupDesc: "海外の最先端メーカーから輸入予定。ラインナップは順次拡大していきます。",
    lineup: [
      { name: "Unitree G1", type: "ヒューマノイド", desc: "コンパクトな人型ロボット。研究・実証・展示など幅広い用途を想定。", image: "/images/robot-rental/g1.jpg" },
      { name: "Unitree Go2", type: "四足歩行ロボット", desc: "機動性の高い四足歩行型。点検・巡回・イベント演出などに。", image: "/images/robot-rental/go2.webp" },
      { name: "Unitree R1", type: "ヒューマノイド", desc: "鮮やかなカラーリングが特徴の中型ヒューマノイド。接客・展示・撮影など視認性が求められる現場に。", image: "/images/robot-rental/r1.webp" },
      { name: "Unitree H1", type: "ヒューマノイド", desc: "高い運動性能を持つ大型人型ロボット。先進的なデモ・実証向け。", image: "/images/robot-rental/h1.png" },
      { name: "AGIBOT", type: "ヒューマノイド", desc: "中国発の次世代ヒューマノイド。作業・接客系ユースケースを想定。" },
    ],
    lineupFootnote: "※ 機種名は導入予定の一例です。最終的なラインナップ・仕様は変更となる場合があります。",
    planLabel: "Plan",
    planTitle: "提供予定の内容",
    planDesc: "「買う前に試す」を軸に、現場で価値を確かめられる形で提供予定です。",
    plans: [
      { title: "短期レンタル", desc: "日・週・月単位での貸し出しを予定。目的と期間に合わせて柔軟に。" },
      { title: "導入前トライアル", desc: "購入を検討中の機体を、実際の現場で試せるトライアル提供を予定。" },
      { title: "イベント・展示活用", desc: "展示会・店頭・撮影など、集客・PR用途での活用を予定。" },
      { title: "運用サポート", desc: "搬入・セットアップ・操作レクチャー・AI連携まで伴走予定。" },
    ],
    useLabel: "Use Cases",
    useTitle: "想定する活用シーン",
    useDesc: "公開に向けて、以下のような現場での活用を想定しています。",
    useCases: [
      { name: "展示会・イベント", desc: "ブースの集客装置・撮影スポットとして話題性を生む。" },
      { name: "店舗・施設", desc: "受付・案内・呼び込みなど接客シーンでの実証。" },
      { name: "工場・物流", desc: "搬送・点検補助などの省人化ユースケースの検証。" },
      { name: "研究・教育", desc: "ロボティクス研究・AI連携実験・教育デモ用途。" },
    ],
    ctaLabel: "Contact",
    ctaTitle: "先行のご相談を承っています。",
    ctaDesc: "「こういう用途で使いたい」「提供開始時期を知りたい」など、ローンチ前の段階からお気軽にご相談ください。準備が整い次第、優先的にご案内します。",
    ctaButton: "先行して相談する",
  },
  en: {
    heroKicker: "Robot Rental",
    comingSoon: "Coming Soon",
    heroTitle: "Robot Rental",
    heroDesc: "We're preparing a service to import and rent cutting-edge humanoids and robots from overseas — such as Unitree and AGIBOT. Soon you'll be able to try them on-site before committing to an expensive purchase.",
    heroCta: "Get an early consultation",
    heroNote: "We're getting ready for the official launch",
    bannerTitle: "Service coming soon",
    bannerDesc: "Robot Rental is currently preparing to launch. The lineup, pricing, and availability will be announced progressively. If you're considering adoption, we're happy to take early inquiries and add you to the early-access list.",
    lineupLabel: "Lineup",
    lineupTitle: "Robots planned for the lineup",
    lineupDesc: "Planned for import from leading overseas makers. The lineup will expand over time.",
    lineup: [
      { name: "Unitree G1", type: "Humanoid", desc: "A compact humanoid robot, intended for research, PoC, and exhibitions.", image: "/images/robot-rental/g1.jpg" },
      { name: "Unitree Go2", type: "Quadruped", desc: "A highly agile quadruped — for inspection, patrol, and event production.", image: "/images/robot-rental/go2.webp" },
      { name: "Unitree R1", type: "Humanoid", desc: "A mid-size humanoid with a striking color scheme — ideal for hospitality, exhibition, and photo-shoot settings where presence matters.", image: "/images/robot-rental/r1.webp" },
      { name: "Unitree H1", type: "Humanoid", desc: "A larger humanoid with high mobility — for advanced demos and proof of concept.", image: "/images/robot-rental/h1.png" },
      { name: "AGIBOT", type: "Humanoid", desc: "A next-generation humanoid from China, aimed at task and hospitality use cases." },
    ],
    lineupFootnote: "* Model names are examples planned for import. The final lineup and specs may change.",
    planLabel: "Plan",
    planTitle: "What we plan to offer",
    planDesc: "Centered on 'try before you buy,' offered so you can verify value on-site.",
    plans: [
      { title: "Short-term rental", desc: "Rental by the day, week, or month — flexible to your goal and timeline." },
      { title: "Pre-purchase trial", desc: "Try a unit you're considering buying in your actual environment." },
      { title: "Events & exhibitions", desc: "For trade shows, storefronts, and shoots — drawing crowds and PR." },
      { title: "Operation support", desc: "From delivery and setup to operating lectures and AI integration." },
    ],
    useLabel: "Use Cases",
    useTitle: "Anticipated use cases",
    useDesc: "Toward launch, we envision use in settings like the following.",
    useCases: [
      { name: "Trade shows & events", desc: "A crowd-drawing device and photo spot that creates buzz." },
      { name: "Stores & facilities", desc: "PoC for hospitality: reception, guidance, and greeting." },
      { name: "Factories & logistics", desc: "Verify labor-saving use cases like transport and inspection." },
      { name: "Research & education", desc: "Robotics research, AI-integration experiments, and teaching demos." },
    ],
    ctaLabel: "Contact",
    ctaTitle: "We welcome early inquiries.",
    ctaDesc: "'We'd like to use it for this,' or 'When does it launch?' — reach out even before launch. We'll prioritize your inquiry as soon as we're ready.",
    ctaButton: "Get an early consultation",
  },
};

export default function RobotRentalPage() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  return (
    <>
      {/* PAGE HEADER */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 bg-white border-b border-gray-100">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <p className="text-sm font-semibold text-sky-600">{t.heroKicker}</p>
            <span className="inline-flex items-center rounded-full bg-sky-50 text-sky-700 border border-sky-200 px-3 py-1 text-xs font-bold tracking-wide">
              {t.comingSoon}
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">{t.heroTitle}</h1>
          <p className="text-base text-gray-600 leading-relaxed max-w-2xl mb-8">{t.heroDesc}</p>
          <div className="flex items-center gap-4 flex-wrap">
            <a href="/contact?service=robot-rental" className="rounded-lg bg-sky-600 text-white font-semibold px-8 py-3.5 hover:bg-sky-700 transition-colors duration-300 inline-block">
              {t.heroCta}
            </a>
            <span className="text-sm text-gray-400">{t.heroNote}</span>
          </div>
        </div>
      </section>

      {/* COMING SOON BANNER */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="rounded-3xl border border-sky-100 bg-gradient-to-br from-sky-50 to-white p-8 lg:p-12 text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-white border border-sky-200 px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-sky-600 mb-5">
                <span className="w-2 h-2 rounded-full bg-sky-500" />{t.comingSoon}
              </span>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-snug mb-4">{t.bannerTitle}</h2>
              <p className="text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">{t.bannerDesc}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* LINEUP */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.lineupLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.lineupTitle}</h2>
            <p className="text-sm text-gray-500 mb-14 max-w-2xl leading-relaxed">{t.lineupDesc}</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.lineup.map((item, i) => (
              <Reveal key={item.name} delay={i * 80}>
                <div className="relative h-full rounded-2xl border border-gray-200 bg-white overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
                  <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-contain p-6"
                      />
                    ) : (
                      <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">Image Coming Soon</span>
                    )}
                    <span className="absolute top-3 right-3 inline-flex items-center rounded-full bg-white/90 backdrop-blur text-gray-500 px-2.5 py-0.5 text-[10px] font-bold tracking-wide border border-gray-200">
                      {t.comingSoon}
                    </span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <span className="inline-block text-xs font-bold tracking-widest text-sky-600 uppercase mb-3">{item.type}</span>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.name}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <p className="text-xs text-gray-400 mt-8">{t.lineupFootnote}</p>
          </Reveal>
        </div>
      </section>

      {/* PLAN */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.planLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.planTitle}</h2>
            <p className="text-sm text-gray-500 mb-14 max-w-2xl leading-relaxed">{t.planDesc}</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.plans.map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:border-sky-200 hover:shadow-lg transition-all duration-300">
                  <span className="text-sm font-bold text-sky-600">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-3 mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.useLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.useTitle}</h2>
            <p className="text-sm text-gray-500 mb-14 max-w-2xl leading-relaxed">{t.useDesc}</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.useCases.map((item, i) => (
              <Reveal key={item.name} delay={i * 80}>
                <div className="h-full rounded-2xl border border-gray-200 bg-white p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Reveal>
            <Label>{t.ctaLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.ctaTitle}</h2>
            <p className="text-base text-gray-600 leading-relaxed mb-10">{t.ctaDesc}</p>
            <a href="/contact?service=robot-rental" className="rounded-lg bg-sky-600 text-white font-semibold px-10 py-4 hover:bg-sky-700 transition-colors duration-300 inline-block">{t.ctaButton}</a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

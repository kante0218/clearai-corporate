"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
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
  return <p className="text-sm font-semibold text-neutral-900 mb-4">{children}</p>;
}

type Copy = {
  heroKicker: string;
  heroTitle: string;
  heroDesc: string;
  heroCta: string;
  heroCta2: string;
  whyLabel: string;
  whyTitle: string;
  whyDesc: string;
  why: { num: string; title: string; desc: string }[];
  stepLabel: string;
  stepTitle: string;
  stepDesc: string;
  steps: { num: string; title: string; en: string; desc: string }[];
  outLabel: string;
  outTitle: string;
  outDesc: string;
  outputs: { title: string; desc: string }[];
  useLabel: string;
  useTitle: string;
  useDesc: string;
  uses: { tag: string; title: string; desc: string }[];
  whyUsLabel: string;
  whyUsTitle: string;
  whyUsDesc: string;
  whyUs: { title: string; desc: string }[];
  faqLabel: string;
  faqTitle: string;
  faq: { q: string; a: string }[];
  ctaLabel: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaButton: string;
};

const COPY: Record<"ja" | "en", Copy> = {
  ja: {
    heroKicker: "空間3Dスキャン",
    heroTitle: "現場を3Dデータにして、ロボット導入を設計する。",
    heroDesc: "カメラで現場を撮影するだけで3D化し、専用機材・工事不要で点検・巡回ロボットの台数・ルート・所要時間を導入前にシミュレーションできます。",
    heroCta: "相談する",
    heroCta2: "ロボットレンタルを見る",
    whyLabel: "Why now",
    whyTitle: "ロボットを入れる前に、現場をデータにする。",
    whyDesc: "現場を正確な3Dデータ化してシミュレーションすることで、無駄な投資も「入れてみたけど動かない」も避けられます。",
    why: [
      { num: "01", title: "導入前にROIが見える", desc: "実機を入れる前に巡回ルート・カバー範囲・所要時間・必要台数をシミュレーションで確認し、投資判断をデータで下せます。" },
      { num: "02", title: "専用機材がいらない", desc: "現場を歩いて撮影するだけで3Dデータ化できるため、高価な機器も大掛かりな工事も不要です。" },
      { num: "03", title: "失敗を仮想空間で先に済ませる", desc: "危険箇所・死角・通路幅の問題をデジタルツイン上で先に洗い出し、安全かつ手戻りなく導入を進められます。" },
      { num: "04", title: "導入後も活き続けるデータ", desc: "一度つくった3Dデータは、レイアウト変更の検討、点検記録、現場の変化の比較など、ロボット導入後も継続して使える資産になります。" },
    ],
    stepLabel: "How it works",
    stepTitle: "撮影から導入まで、4ステップ。",
    stepDesc: "カメラ1台で撮影するところから導入計画まで、特別な準備なしに一気通貫で支援します。",
    steps: [
      { num: "01", title: "現場を撮影", en: "Capture", desc: "撮影方法はガイドするので、カメラを持って現場を歩くだけで完了します（専用機材不要）。" },
      { num: "02", title: "3Dデータ化", en: "Digitize", desc: "撮影データから設備・通路・障害物の位置関係を正確に再現した3Dデジタルツインを生成します。" },
      { num: "03", title: "ロボットをシミュレーション", en: "Simulate", desc: "3Dデータ上でロボットを仮想的に走らせ、ルート・カバー範囲・所要時間・必要台数を複数パターンで算出・比較できます。" },
      { num: "04", title: "導入・運用", en: "Deploy", desc: "シミュレーション結果をもとに最適な機体とプランを選定し、レンタルから実機導入・運用までを支援します。" },
    ],
    outLabel: "Deliverables",
    outTitle: "お渡しするもの",
    outDesc: "意思決定と現場運用にそのまま使える成果物をお渡しします。",
    outputs: [
      { title: "現場の3Dデジタルツイン", desc: "ブラウザで閲覧・共有でき、関係者が現場を見ながら検討できます。" },
      { title: "ロボット稼働シミュレーション", desc: "巡回ルート・カバー率・所要時間・死角を可視化し、複数案を比較できます。" },
      { title: "導入計画・台数見積もり", desc: "必要な機体・台数・配置・概算コストをまとめた投資判断にそのまま使える導入プランです。" },
      { title: "変化の比較（オプション）", desc: "期間をあけて再撮影すれば前回との差分を比較でき、点検記録やレイアウト変更の検討に活用できます。" },
    ],
    useLabel: "Use cases",
    useTitle: "こんな現場で",
    useDesc: "人手不足・危険作業・点検負荷の大きい現場ほど、データ化とロボット導入の効果が大きく出ます。",
    uses: [
      { tag: "製造", title: "工場・プラントの設備点検", desc: "広い敷地の設備巡回・メーター確認・異常検知を、ロボットによる定常点検に置き換える前提でデータ化します。" },
      { tag: "物流", title: "倉庫・物流拠点の巡回", desc: "棚・通路・在庫エリアを3D化し、巡回・棚卸し・警備ロボットの動線を設計します。" },
      { tag: "インフラ", title: "危険箇所・狭所の点検", desc: "人が入りにくい・危険を伴う箇所を先に3Dデータ化し、ロボットでの代替点検を計画します。" },
      { tag: "施設", title: "ビル・施設の警備・巡回", desc: "施設全体を3D化し、警備・巡回ロボットの配置と巡回計画をシミュレーションします。" },
    ],
    whyUsLabel: "Why clearAI",
    whyUsTitle: "データ化からロボット運用まで、一社で。",
    whyUsDesc: "clearAIは現場のデータ化からロボットの選定・レンタル・運用までを一気通貫で担います。",
    whyUs: [
      { title: "ロボットレンタルと直結", desc: "シミュレーションで選んだ機体をそのまま短期レンタルで試し、現場で効果を確かめてから導入できます。" },
      { title: "現場に入り込む伴走型", desc: "撮影のガイドから導入後の運用改善まで現場に入り込み、丸投げでも進められる体制で伴走します。" },
      { title: "ロボティクスの研究開発が土台", desc: "自社でロボットの制御・学習・Sim2Realの研究開発に取り組むチームが、現場適応とシミュレーションの精度を支えます。" },
    ],
    faqLabel: "FAQ",
    faqTitle: "よくあるご質問",
    faq: [
      { q: "本当にカメラの撮影だけで3Dデータ化できますか？", a: "専用機材は不要で現場を撮影するだけで3D化でき（撮影方法はガイドします）、高精度が必要な場合は追加計測を組み合わせてご提案します。" },
      { q: "どれくらいの期間でできますか？", a: "現場規模により異なりますが、対象範囲をお伺いしたうえで、撮影から初期シミュレーションまでのスケジュールをご提案します。" },
      { q: "ロボットの購入は必須ですか？", a: "シミュレーションで選んだ機体は短期レンタルで試せるため、現場で効果を確かめてから本格導入をご判断いただけます。" },
      { q: "まだロボット導入を決めていなくても相談できますか？", a: "「現場でロボットが使えるか知りたい」段階からでもご相談いただけますので、現場をデータ化して可能性を一緒に見極めるところから始めましょう。" },
    ],
    ctaLabel: "Contact",
    ctaTitle: "まずは、現場をデータにするところから。",
    ctaDesc: "「うちの現場でロボットは使えるのか」——現場と課題をお聞かせいただければ、データとシミュレーションでお答えします。",
    ctaButton: "相談する",
  },
  en: {
    heroKicker: "3D Spatial Scan",
    heroTitle: "Turn your site into 3D data, then design the robot rollout.",
    heroDesc: "Film your site with a camera and we build a 3D digital twin — simulating inspection robot routes, fleet size, and coverage time before you deploy, with no expensive sensors or major construction required.",
    heroCta: "Talk to us",
    heroCta2: "See Robot Rental",
    whyLabel: "Why now",
    whyTitle: "Digitize the site before you bring in robots.",
    whyDesc: "Turning the site into accurate 3D data first and simulating on top of it avoids wasted spend and the dreaded \"deployed it but it doesn't work.\"",
    why: [
      { num: "01", title: "See ROI before deploying", desc: "Simulate patrol routes, coverage, time, and fleet size before any hardware arrives — turning investment decisions from guesswork into data." },
      { num: "02", title: "No special equipment", desc: "Walking the site with a camera is enough — no costly gear or major construction, dramatically lowering upfront cost." },
      { num: "03", title: "Fail first in the virtual world", desc: "Hazards, blind spots, and aisle-width issues surface on the digital twin first — not on real hardware — enabling a safe, rework-free rollout." },
      { num: "04", title: "Data that keeps working", desc: "The 3D data you build stays useful after deployment—for layout studies, inspection records, and comparing how the site changes over time." },
    ],
    stepLabel: "How it works",
    stepTitle: "From filming to rollout, in four steps.",
    stepDesc: "Starting with a single camera and no special preparation, we support you all the way from filming to a rollout plan.",
    steps: [
      { num: "01", title: "Capture the site", en: "Capture", desc: "We guide you on how to film, so simply walking the site with a camera is all it takes — no special equipment needed." },
      { num: "02", title: "Build the 3D data", en: "Digitize", desc: "From the footage we generate a 3D digital twin of the whole site, accurately capturing the layout of equipment, aisles, and obstacles." },
      { num: "03", title: "Simulate the robots", en: "Simulate", desc: "We run inspection and patrol robots virtually on the 3D data, computing routes, coverage, time, and fleet size—comparing multiple plans." },
      { num: "04", title: "Deploy & operate", en: "Deploy", desc: "Based on the simulation, we select the optimal units and plan, and support you through rental, deployment, and operations." },
    ],
    outLabel: "Deliverables",
    outTitle: "What you receive",
    outDesc: "You get deliverables ready to drive decisions and day-to-day operations.",
    outputs: [
      { title: "3D digital twin of the site", desc: "A full 3D model of your site, viewable and shareable in the browser, so stakeholders can review the site together." },
      { title: "Robot operation simulation", desc: "A simulation visualizing patrol routes, coverage, time, and blind spots—with multiple plans to compare." },
      { title: "Rollout plan & fleet estimate", desc: "A plan covering units, fleet size, placement, operations, and a rough cost estimate—ready for your investment decision." },
      { title: "Change comparison (optional)", desc: "Re-film later and compare the difference, useful for inspection records and layout-change studies." },
    ],
    useLabel: "Use cases",
    useTitle: "Where it fits",
    useDesc: "The bigger the labor shortage, hazardous work, or inspection load, the greater the impact of digitization and robotics.",
    uses: [
      { tag: "Manufacturing", title: "Factory & plant inspection", desc: "Digitize large sites to plan replacing equipment patrols, meter checks, and anomaly detection with routine robot inspection." },
      { tag: "Logistics", title: "Warehouse & DC patrol", desc: "Turn racks, aisles, and inventory zones into 3D to design routes for patrol, stocktaking, and security robots." },
      { tag: "Infrastructure", title: "Hazardous & confined inspection", desc: "Digitize hard-to-reach or hazardous areas first, then plan robotic inspection as a safer alternative." },
      { tag: "Facilities", title: "Building security & patrol", desc: "Digitize the whole facility and simulate placement and patrol plans for security robots." },
    ],
    whyUsLabel: "Why clearAI",
    whyUsTitle: "From data to robot operations, all in one place.",
    whyUsDesc: "clearAI handles everything from digitizing the site to selecting, renting, and operating robots.",
    whyUs: [
      { title: "Directly tied to Robot Rental", desc: "The units chosen in simulation can be tried right away via short-term rental—verify on-site before you commit to buying." },
      { title: "Hands-on, embedded support", desc: "From filming guidance to post-deployment improvement, we embed in your site and walk alongside you—workable even fully delegated." },
      { title: "Built on robotics R&D", desc: "Our in-house team researching robot control, learning, and Sim2Real underpins the accuracy of site adaptation and simulation." },
    ],
    faqLabel: "FAQ",
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "Can you really build 3D data from camera footage alone?", a: "No dedicated gear is required — filming the site is enough (we guide you on how), and for higher-precision needs we combine additional measurement." },
      { q: "How long does it take?", a: "It depends on site size — share your target scope and we'll propose a schedule from filming through initial simulation." },
      { q: "Do I have to buy the robots?", a: "Units selected in simulation can be tried via short-term rental so you can verify impact on-site before deciding on full deployment." },
      { q: "Can I consult even before deciding to adopt robots?", a: "We welcome inquiries at the \"can robots work at my site?\" stage — we can start by digitizing the site and assessing the possibilities together." },
    ],
    ctaLabel: "Contact",
    ctaTitle: "Start by turning your site into data.",
    ctaDesc: "Tell us about your site and challenges — we answer the question with data and simulation.",
    ctaButton: "Talk to us",
  },
};

export default function SpatialScanPage() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  return (
    <>
      {/* PAGE HEADER */}
      <section className="pt-24 pb-10 lg:pt-28 lg:pb-12 bg-white border-b border-gray-100">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <p className="text-sm font-semibold text-neutral-900 mb-3">{t.heroKicker}</p>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4 max-w-4xl">{t.heroTitle}</h1>
          <p className="text-base text-gray-600 leading-relaxed max-w-3xl">{t.heroDesc}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="/contact" className="rounded-lg bg-neutral-900 text-white font-semibold px-8 py-3.5 hover:bg-neutral-800 transition-colors duration-300 inline-block">{t.heroCta}</a>
            <a href="/robot-rental" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-gray-900 px-2 py-3.5 transition-colors">
              {t.heroCta2}
              <span aria-hidden>↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* WHY NOW */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.whyLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-snug mb-4 max-w-3xl">{t.whyTitle}</h2>
            <p className="text-sm text-gray-500 mb-8 max-w-3xl leading-relaxed">{t.whyDesc}</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6">
            {t.why.map((item, i) => (
              <Reveal key={item.num} delay={i * 80}>
                <div className="rounded-lg border border-gray-200 bg-white p-8 hover:shadow-lg transition-all duration-300 h-full">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-bold text-neutral-900 flex-shrink-0">{item.num}</span>
                    <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="py-14 lg:py-20 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.stepLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4 max-w-3xl">{t.stepTitle}</h2>
            <p className="text-sm text-gray-500 mb-8 max-w-3xl leading-relaxed">{t.stepDesc}</p>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.steps.map((s, i) => (
              <Reveal key={s.num} delay={i * 80} className="h-full">
                <div className="h-full rounded-lg border border-gray-200 bg-white p-6 lg:p-7 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-baseline justify-between">
                    <span className="text-3xl font-bold text-gray-900">{s.num}</span>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-900 rounded-md bg-neutral-100 px-2.5 py-1">{s.en}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-gray-900">{s.title}</h3>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.outLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4 max-w-3xl">{t.outTitle}</h2>
            <p className="text-sm text-gray-500 mb-8 max-w-3xl leading-relaxed">{t.outDesc}</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6">
            {t.outputs.map((o, i) => (
              <Reveal key={o.title} delay={i * 80} className="h-full">
                <div className="h-full rounded-lg border border-gray-200 bg-white p-7 lg:p-8 hover:shadow-lg transition-all duration-300 flex gap-5">
                  <span className="flex-shrink-0 w-9 h-9 rounded-full bg-neutral-900 text-white flex items-center justify-center text-sm font-bold">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{o.title}</h3>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">{o.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-14 lg:py-20 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.useLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4 max-w-3xl">{t.useTitle}</h2>
            <p className="text-sm text-gray-500 mb-8 max-w-3xl leading-relaxed">{t.useDesc}</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.uses.map((u, i) => (
              <Reveal key={u.title} delay={i * 80} className="h-full">
                <div className="h-full rounded-lg border border-gray-200 bg-white p-6 lg:p-7 hover:shadow-lg transition-all duration-300 flex flex-col">
                  <span className="inline-block text-[10px] font-bold tracking-widest text-neutral-900 uppercase mb-3 self-start rounded-md bg-neutral-100 px-2.5 py-1">{u.tag}</span>
                  <h3 className="text-base font-bold text-gray-900 leading-snug mb-3">{u.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{u.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY clearAI */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.whyUsLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4 max-w-3xl">{t.whyUsTitle}</h2>
            <p className="text-sm text-gray-500 mb-8 max-w-3xl leading-relaxed">{t.whyUsDesc}</p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {t.whyUs.map((w, i) => (
              <Reveal key={w.title} delay={i * 80} className="h-full">
                <div className="h-full rounded-lg border border-gray-200 bg-white p-8 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-lg font-bold text-gray-900">{w.title}</h3>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 lg:py-20 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.faqLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-8">{t.faqTitle}</h2>
          </Reveal>
          <div className="max-w-3xl">
            {t.faq.map((item, i) => (
              <Reveal key={i} delay={i * 60}>
                <details className="border-b border-gray-200 py-2.5 md:py-5 group">
                  <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between gap-4">
                    <span>{item.q}</span>
                    <span className="text-gray-400 text-lg leading-none flex-shrink-0 transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <p className="text-gray-600 text-sm leading-relaxed mt-3">{item.a}</p>
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
            <p className="text-base text-gray-600 leading-relaxed mb-10">{t.ctaDesc}</p>
            <a href="/contact" className="rounded-md bg-neutral-900 text-white font-semibold px-10 py-4 hover:bg-neutral-800 transition-colors duration-300 inline-block">{t.ctaButton}</a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

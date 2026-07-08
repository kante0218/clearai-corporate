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
    <Reveal className="mb-12 lg:mb-16 max-w-3xl">
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
      {/* MASTHEAD */}
      <section className="bg-white pt-32 lg:pt-40">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            {/* technical meta bar */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-neutral-900 pb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
              <span className="font-bold text-neutral-900">§00</span>
              <span>{t.heroKicker}</span>
              <span className="text-neutral-300">/</span>
              <span>Digital&nbsp;Twin</span>
              <span className="text-neutral-300">/</span>
              <span>Simulation</span>
              <span className="text-neutral-300">/</span>
              <span>Robotics</span>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="mt-10 text-[7vw] sm:text-3xl lg:text-4xl font-bold leading-[0.95] tracking-[-0.04em] text-balance text-neutral-900">
              {t.heroTitle}
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-8 max-w-2xl text-base lg:text-lg leading-relaxed text-pretty text-neutral-600">{t.heroDesc}</p>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-10 mb-14 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
              <a
                href="/contact"
                className="group inline-flex items-center justify-center gap-3 border border-neutral-900 bg-neutral-900 px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.08em] text-white transition-[color,background-color,border-color,scale] duration-300 hover:bg-transparent hover:text-neutral-900 active:scale-[0.96]"
              >
                {t.heroCta}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a
                href="/robot-rental"
                className="group inline-flex items-center justify-center gap-2 border border-neutral-300 px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.08em] text-neutral-600 transition-[color,border-color,scale] duration-300 hover:border-neutral-900 hover:text-neutral-900 active:scale-[0.96]"
              >
                {t.heroCta2}
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHY NOW */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="01" kicker={t.whyLabel} title={t.whyTitle} desc={t.whyDesc} />
          <div className="grid sm:grid-cols-2 gap-4">
            {t.why.map((item, i) => (
              <Reveal key={item.num} delay={i * 80}>
                <div className="group h-full border border-neutral-900 bg-white p-8 lg:p-10 transition-colors duration-300 hover:bg-neutral-900">
                  <div className="flex items-baseline justify-between border-b border-neutral-200 pb-4 transition-colors duration-300 group-hover:border-neutral-700">
                    <span className="font-mono text-2xl font-bold tabular-nums text-neutral-900 transition-colors duration-300 group-hover:text-white">
                      {item.num}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">Why / {item.num}</span>
                  </div>
                  <h3 className="mt-6 text-xl lg:text-2xl font-bold tracking-tight text-balance text-neutral-900 transition-colors duration-300 group-hover:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-pretty text-neutral-600 transition-colors duration-300 group-hover:text-neutral-300">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="py-20 lg:py-28 bg-neutral-50 border-y border-neutral-900">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="02" kicker={t.stepLabel} title={t.stepTitle} desc={t.stepDesc} />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.steps.map((s, i) => (
              <Reveal key={s.num} delay={i * 80} className="h-full">
                <div className="flex h-full flex-col border border-neutral-900 bg-white p-7 lg:p-8">
                  <div className="mb-6 flex items-center justify-between border-b border-neutral-200 pb-3">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-900">{s.en}</span>
                    <span className="font-mono text-[10px] tabular-nums text-neutral-400">{s.num}</span>
                  </div>
                  <span className="font-mono text-3xl font-bold tabular-nums text-neutral-900">{s.num}</span>
                  <h3 className="mt-4 text-lg font-bold tracking-tight text-balance text-neutral-900">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-pretty text-neutral-600">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="03" kicker={t.outLabel} title={t.outTitle} desc={t.outDesc} />
          <div className="grid sm:grid-cols-2 gap-4">
            {t.outputs.map((o, i) => (
              <Reveal key={o.title} delay={i * 80} className="h-full">
                <div className="group h-full border border-neutral-900 bg-white p-7 lg:p-8 transition-colors duration-300 hover:bg-neutral-900">
                  <span className="mb-4 block font-mono text-xs font-bold tabular-nums text-neutral-400 transition-colors duration-300 group-hover:text-white">
                    OUT.{String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mb-3 text-lg font-bold tracking-tight text-balance text-neutral-900 transition-colors duration-300 group-hover:text-white">
                    {o.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-pretty text-neutral-600 transition-colors duration-300 group-hover:text-neutral-300">
                    {o.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-20 lg:py-28 bg-neutral-50 border-y border-neutral-900">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="04" kicker={t.useLabel} title={t.useTitle} desc={t.useDesc} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.uses.map((u, i) => (
              <Reveal key={u.title} delay={i * 80} className="h-full">
                <div className="flex h-full flex-col border border-neutral-900 bg-white p-6 lg:p-7">
                  <div className="mb-6 flex items-center justify-between border-b border-neutral-200 pb-3">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-900">{u.tag}</span>
                    <span className="font-mono text-[10px] tabular-nums text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mb-3 text-base font-bold tracking-tight text-balance text-neutral-900 leading-snug">{u.title}</h3>
                  <p className="text-sm leading-relaxed text-pretty text-neutral-600">{u.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY clearAI */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="05" kicker={t.whyUsLabel} title={t.whyUsTitle} desc={t.whyUsDesc} />
          <div className="grid md:grid-cols-3 gap-4">
            {t.whyUs.map((w, i) => (
              <Reveal key={w.title} delay={i * 80} className="h-full">
                <div className="group h-full border border-neutral-900 bg-white p-8 lg:p-10 transition-colors duration-300 hover:bg-neutral-900">
                  <span className="mb-6 block font-mono text-xs font-bold tabular-nums text-neutral-400 transition-colors duration-300 group-hover:text-white">
                    {String(i + 1).padStart(2, "0")} / {String(t.whyUs.length).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg lg:text-xl font-bold tracking-tight text-balance text-neutral-900 transition-colors duration-300 group-hover:text-white">{w.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-pretty text-neutral-600 transition-colors duration-300 group-hover:text-neutral-300">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28 bg-neutral-50 border-t border-neutral-900">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="06" kicker={t.faqLabel} title={t.faqTitle} />
          <div className="max-w-3xl border-t border-neutral-900">
            {t.faq.map((item, i) => (
              <Reveal key={i} delay={i * 60}>
                <details className="group border-b border-neutral-300 py-5">
                  <summary className="flex cursor-pointer list-none items-start gap-4 text-base font-semibold text-neutral-900">
                    <span className="mt-0.5 font-mono text-xs tabular-nums text-neutral-400">Q{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex-1">{item.q}</span>
                    <span className="font-mono text-lg leading-none text-neutral-400 transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 pl-9 text-sm leading-relaxed text-pretty text-neutral-600">{item.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-neutral-900 py-24 lg:py-32">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="flex items-center gap-4 border-b border-neutral-700 pb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
              <span className="font-bold text-white">§07</span>
              <span>{t.ctaLabel}</span>
            </div>
            <div className="mt-12 grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <h2 className="text-[18px] sm:text-xl lg:text-2xl font-bold leading-[1.15] sm:leading-[1.05] tracking-[-0.02em] text-balance text-white">{t.ctaTitle}</h2>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-pretty text-neutral-400">{t.ctaDesc}</p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <a
                  href="/contact"
                  className="group inline-flex items-center gap-3 border border-white bg-white px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.08em] text-neutral-900 transition-[color,background-color,border-color,scale] duration-300 hover:bg-transparent hover:text-white active:scale-[0.96]"
                >
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

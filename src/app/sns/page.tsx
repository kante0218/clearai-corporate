"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import CardCarousel from "@/components/CardCarousel";
import PricingCarousel from "@/components/PricingCarousel";

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
    <Reveal className="mb-7 lg:mb-9">
      <div className={`flex items-center gap-4 border-b pb-4 ${dark ? "border-white/25" : "border-neutral-900"}`}>
        <span className={`font-mono text-xs font-bold tabular-nums ${dark ? "text-white" : "text-neutral-900"}`}>§{index}</span>
        <span className={`font-mono text-[11px] font-medium uppercase tracking-[0.25em] ${dark ? "text-neutral-400" : "text-neutral-500"}`}>{kicker}</span>
      </div>
      <h2 className={`mt-8 max-w-4xl text-[18px] sm:text-xl lg:text-2xl font-bold leading-[1.15] sm:leading-[1.05] tracking-[-0.02em] text-balance ${dark ? "text-white" : "text-neutral-900"}`}>
        {title}
      </h2>
      {desc && <p className={`mt-5 max-w-2xl text-[15px] leading-relaxed text-pretty ${dark ? "text-neutral-400" : "text-neutral-600"}`}>{desc}</p>}
    </Reveal>
  );
}

type Plan = { name: string; price: string; unit: string; desc: string; features: string[]; featured: boolean; badge?: string };

type Copy = {
  heroKicker: string; heroTitle: string; heroDesc: string;
  whyLabel: string; whyTitle: string;
  why: { title: string; desc: string }[];
  whatLabel: string; whatTitle: string;
  what: { num: string; title: string; desc: string }[];
  platformsLabel: string; platformsTitle: string; platformsDesc: string;
  platforms: string[];
  aiLabel: string; aiTitle: string; aiDesc: string;
  aiPoints: string[];
  processLabel: string; processTitle: string;
  process: { num: string; title: string; en: string; desc: string }[];
  pricingLabel: string; pricingTitle: string;
  plans: Plan[];
  recommended: string; planCta: string; pricingNote: string;
  faqLabel: string; faqTitle: string;
  faq: { q: string; a: string }[];
  ctaLabel: string; ctaTitle: string; ctaDesc: string; ctaButton: string;
};

const COPY: Record<"ja" | "en", Copy> = {
  ja: {
    heroKicker: "SNS Management",
    heroTitle: "SNS運用代行",
    heroDesc: "戦略設計からコンテンツ制作・投稿・分析改善まで、AIで高速化しながら「続かない」「ネタ切れ」を仕組みで解決します。",
    whyLabel: "Why SNS",
    whyTitle: "SNS、こんな状態になっていませんか？",
    why: [
      { title: "投稿が続かない", desc: "本業に追われて更新が止まり、担当者が辞めると終わる典型パターン。" },
      { title: "ネタ切れ・質のばらつき", desc: "毎回ゼロから考えるため、投稿の質とトーンが安定しない。" },
      { title: "効果が見えない", desc: "フォロワーは増えても、問い合わせや売上につながっているか分からない。" },
    ],
    whatLabel: "What We Do",
    whatTitle: "運用を、まるごとお任せいただけます。",
    what: [
      { num: "01", title: "アカウント戦略設計", desc: "ターゲット・コンセプト・KPI・投稿方針を設計し、ブランドの「らしさ」を言語化して運用の軸を作ります。" },
      { num: "02", title: "コンテンツ企画・制作", desc: "AIでテーマ案を大量生成し、人がブランドトーンに編集しながら画像・動画・キャプションまで一貫制作します。" },
      { num: "03", title: "投稿運用・スケジュール管理", desc: "最適な時間帯に自動投稿し、コメント・DMの一次対応や炎上リスク監視まで対応可能です。" },
      { num: "04", title: "分析・改善レポート", desc: "リーチ・保存・遷移・CVを月次で分析し、次月の方針に反映して成果が出る投稿を増やします。" },
    ],
    platformsLabel: "Platforms",
    platformsTitle: "主要SNSに対応",
    platformsDesc: "貴社の顧客がいるプラットフォームに合わせて、最適な組み合わせをご提案します。",
    platforms: ["Instagram", "X (Twitter)", "TikTok", "YouTube", "LINE公式", "Facebook"],
    aiLabel: "AI-Powered",
    aiTitle: "AIで、運用を「続く」仕組みに。",
    aiDesc: "clearAIはAIでネタ出し・制作・投稿を半自動化し、担当者が変わっても止まらない運用体制をつくります。",
    aiPoints: [
      "ペルソナに基づくテーマバンクをAIで自動生成",
      "ブランドトーンを学習させた一貫性のある文章生成",
      "投稿スケジュールの自動化・定期投稿",
      "コメント分析・トレンド検知による改善",
    ],
    processLabel: "Process",
    processTitle: "開始までの流れ",
    process: [
      { num: "01", title: "無料相談・現状分析", en: "Discovery", desc: "現在のSNS・競合・目的をヒアリングし、勝ち筋を一緒に整理します。" },
      { num: "02", title: "戦略・運用設計", en: "Strategy", desc: "ターゲット・コンセプト・投稿方針・KPIを設計し、運用プランをご提案します。" },
      { num: "03", title: "運用開始", en: "Operation", desc: "AIで制作を高速化しながら品質を担保し、コンテンツ制作と投稿運用を開始します。" },
      { num: "04", title: "月次改善", en: "Improvement", desc: "分析レポートをもとに方針を見直し、成果が出る投稿を増やしていきます。" },
    ],
    pricingLabel: "Pricing",
    pricingTitle: "料金の目安",
    plans: [
      { name: "コンテンツ制作", price: "10万円〜", unit: "/ 月", desc: "投稿コンテンツの企画・制作のみ。運用は自社で行いたい方に。", features: ["月8〜12投稿の企画・制作", "AIテーマ生成＋人の編集", "画像/キャプション制作", "投稿カレンダー提供"], featured: false },
      { name: "運用代行", price: "25万円〜", unit: "/ 月", desc: "企画から投稿・分析まで、運用をまるごと代行。", features: ["1〜2媒体の運用代行", "コンテンツ制作（月12〜20投稿）", "投稿・スケジュール管理", "コメント一次対応", "月次分析レポート"], featured: true, badge: "おすすめ" },
      { name: "フルマネージド", price: "ご相談", unit: "", desc: "複数媒体＋広告連携まで含む包括運用。", features: ["複数媒体の統合運用", "SNS広告運用との連携", "インフルエンサー施策の企画", "撮影・動画制作の手配", "週次レポート＋専任担当"], featured: false },
    ],
    recommended: "おすすめ",
    planCta: "相談する",
    pricingNote: "表示価格は税抜。媒体数・投稿頻度・撮影有無により個別見積もりとなります。",
    faqLabel: "FAQ",
    faqTitle: "よくあるご質問",
    faq: [
      { q: "どのSNSから始めればいいか分かりません。", a: "貴社の顧客層・商材・目的をお伺いし、最も成果が出やすい1媒体からご提案します。" },
      { q: "投稿のネタは誰が考えますか？", a: "clearAIがAIでテーマ案を大量生成し、貴社のブランドトーンに合わせて人が編集するため、ネタ切れの心配がありません。" },
      { q: "アカウントは自社のものを使えますか？", a: "既存アカウントの引き継ぎも、新規開設からの支援もどちらも可能です。" },
      { q: "炎上が心配です。", a: "投稿前のダブルチェックとリスク表現ガイドラインに従って運用し、コメント監視にも対応します。" },
      { q: "広告運用とまとめてお願いできますか？", a: "SNS運用と広告運用（/advertising）を組み合わせ、オーガニックと広告の両輪で成果を最大化できます。" },
    ],
    ctaLabel: "Contact",
    ctaTitle: "SNS運用、丸投げしてください。",
    ctaDesc: "「何を投稿すればいいか分からない」段階からまずは無料相談で、貴社に合う進め方をご提案します。",
    ctaButton: "無料で相談する",
  },
  en: {
    heroKicker: "SNS Management",
    heroTitle: "Social Media Management",
    heroDesc: "Full-service social media management — from strategy to posting and analytics — powered by AI to solve 'can't keep it up' and 'out of ideas' with a repeatable system.",
    whyLabel: "Why SNS",
    whyTitle: "Does your social media look like this?",
    why: [
      { title: "Can't keep it up", desc: "Updates stall when the day job takes over, and the operation ends when the person in charge leaves." },
      { title: "Out of ideas, uneven quality", desc: "Starting from scratch every time is hard, and the quality and tone of posts drift." },
      { title: "Can't see results", desc: "Followers grow, but it's unclear whether it drives inquiries or sales." },
    ],
    whatLabel: "What We Do",
    whatTitle: "Hand over the whole operation.",
    what: [
      { num: "01", title: "Account strategy", desc: "We design target, concept, KPIs, and posting policy — articulating your brand voice and setting the operating axis." },
      { num: "02", title: "Content planning & production", desc: "AI generates theme ideas at scale, humans edit to your brand tone, and images, video, and captions are produced end to end." },
      { num: "03", title: "Posting & scheduling", desc: "Auto-posting at optimal times, with first-line comment and DM replies and reputational risk monitoring available." },
      { num: "04", title: "Analytics & improvement", desc: "Monthly analysis of reach, saves, click-through, and conversions — feeding next month's plan to grow what works." },
    ],
    platformsLabel: "Platforms",
    platformsTitle: "Major platforms supported",
    platformsDesc: "We propose the optimal mix based on where your customers actually are.",
    platforms: ["Instagram", "X (Twitter)", "TikTok", "YouTube", "LINE Official", "Facebook"],
    aiLabel: "AI-Powered",
    aiTitle: "AI turns operation into something that lasts.",
    aiDesc: "clearAI semi-automates ideation, production, and posting with AI — building an operation that doesn't stop when the person in charge changes.",
    aiPoints: [
      "Persona-based theme banks generated automatically with AI",
      "Consistent copy generation trained on your brand tone",
      "Automated scheduling and recurring posting",
      "Improvement via comment analysis and trend detection",
    ],
    processLabel: "Process",
    processTitle: "How to get started",
    process: [
      { num: "01", title: "Free consult & audit", en: "Discovery", desc: "We learn your current social, competitors, and goals, and map the path to wins together." },
      { num: "02", title: "Strategy & design", en: "Strategy", desc: "We design target, concept, posting policy, and KPIs, and propose an operating plan." },
      { num: "03", title: "Go live", en: "Operation", desc: "We start content production and posting — accelerating with AI while safeguarding quality." },
      { num: "04", title: "Monthly improvement", en: "Improvement", desc: "We revise the plan from analytics reports and grow the posts that deliver results." },
    ],
    pricingLabel: "Pricing",
    pricingTitle: "Indicative pricing",
    plans: [
      { name: "Content production", price: "From JPY 100K", unit: "/ mo", desc: "Planning and production of post content only — for teams who want to operate in-house.", features: ["8–12 posts/month planned & produced", "AI theme generation + human editing", "Image/caption production", "Posting calendar provided"], featured: false },
      { name: "Managed operation", price: "From JPY 250K", unit: "/ mo", desc: "Full operation from planning to posting and analytics.", features: ["Operation of 1–2 channels", "Content production (12–20 posts/mo)", "Posting & schedule management", "First-line comment replies", "Monthly analytics report"], featured: true, badge: "Popular" },
      { name: "Fully managed", price: "Let's talk", unit: "", desc: "Comprehensive operation across multiple channels plus ad integration.", features: ["Integrated multi-channel operation", "Integration with social ads", "Influencer campaign planning", "Shoot & video production coordination", "Weekly reports + dedicated lead"], featured: false },
    ],
    recommended: "Popular",
    planCta: "Get in touch",
    pricingNote: "Prices exclude tax. Custom quotes apply depending on channels, frequency, and whether shoots are involved.",
    faqLabel: "FAQ",
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "We don't know which platform to start with.", a: "We learn your customers, product, and goals, then propose the single channel most likely to perform." },
      { q: "Who comes up with the post ideas?", a: "clearAI generates theme ideas at scale with AI and edits them to your brand tone — so you never run out of ideas." },
      { q: "Can we use our own account?", a: "We can take over an existing account or support you from a brand-new launch." },
      { q: "We're worried about backlash.", a: "We operate with a pre-post double-check and guidelines that avoid high-risk expressions, plus comment monitoring." },
      { q: "Can you handle ads together with this?", a: "We combine social management with ad operations (/advertising) to maximize results across organic and paid." },
    ],
    ctaLabel: "Contact",
    ctaTitle: "Leave your social media to us.",
    ctaDesc: "Start with a free consultation — even at the 'we don't know what to post' stage — and we'll propose the right approach.",
    ctaButton: "Book a free consultation",
  },
};

export default function SnsPage() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  return (
    <>
      {/* MASTHEAD */}
      <section className="bg-white pt-32 pb-12 lg:pt-40 lg:pb-16">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-neutral-900 pb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
              <span className="font-bold text-neutral-900">§00</span>
              <span>{t.heroKicker}</span>
              <span className="text-neutral-300">/</span>
              <span>Instagram</span>
              <span className="text-neutral-300">/</span>
              <span>X</span>
              <span className="text-neutral-300">/</span>
              <span>TikTok</span>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="mt-10 text-[7vw] sm:text-3xl lg:text-4xl font-bold leading-[0.95] tracking-[-0.04em] text-balance text-neutral-900">{t.heroTitle}</h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-8 max-w-2xl text-base lg:text-lg leading-relaxed text-pretty text-neutral-600">{t.heroDesc}</p>
          </Reveal>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-12 lg:py-16 bg-neutral-50 border-y border-neutral-900">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="01" kicker={t.pricingLabel} title={t.pricingTitle} />
          <PricingCarousel>
            {t.plans.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 100} className="flex">
                <div className={`flex flex-col w-full border border-neutral-900 p-7 lg:p-8 ${plan.featured ? "bg-neutral-900 text-white" : "bg-white"}`}>
                  <div className={`mb-6 flex items-center justify-between border-b pb-3 ${plan.featured ? "border-neutral-700" : "border-neutral-200"}`}>
                    <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.18em] ${plan.featured ? "text-white" : "text-neutral-900"}`}>{plan.name}</span>
                    <span className={`font-mono text-[10px] tabular-nums ${plan.featured ? "text-neutral-500" : "text-neutral-400"}`}>{`PLAN.${String(i + 1).padStart(2, "0")}`}</span>
                  </div>
                  {plan.featured && plan.badge && <span className="mb-4 inline-block self-start border border-white px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white">{plan.badge}</span>}
                  <div className="mb-3 flex items-baseline gap-1.5">
                    <span className={`font-mono text-2xl font-bold tabular-nums tracking-tight ${plan.featured ? "text-white" : "text-neutral-900"}`}>{plan.price}</span>
                    {plan.unit && <span className={`font-mono text-xs ${plan.featured ? "text-neutral-400" : "text-neutral-500"}`}>{plan.unit}</span>}
                  </div>
                  <p className={`text-[13px] leading-relaxed text-pretty mb-6 ${plan.featured ? "text-neutral-300" : "text-neutral-600"}`}>{plan.desc}</p>
                  <ul className={`space-y-2.5 mb-8 flex-1 font-mono border-t pt-5 ${plan.featured ? "border-neutral-700" : "border-neutral-200"}`}>
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs">
                        <span className={`flex-shrink-0 ${plan.featured ? "text-white" : "text-neutral-900"}`}>→</span>
                        <span className={plan.featured ? "text-neutral-300" : "text-neutral-500"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="/contact?service=sns" className={`group mt-auto inline-flex items-center justify-center gap-2 border px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.08em] transition-[color,background-color,border-color,scale] duration-300 active:scale-[0.96] ${plan.featured ? "border-white bg-white text-neutral-900 hover:bg-transparent hover:text-white" : "border-neutral-900 bg-white text-neutral-900 hover:bg-neutral-900 hover:text-white"}`}>
                    {t.planCta}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </Reveal>
            ))}
          </PricingCarousel>
          <Reveal delay={300}>
            <p className="mt-10 font-mono text-[11px] leading-relaxed text-neutral-500">{t.pricingNote}</p>
          </Reveal>
        </div>
      </section>

      {/* WHY */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="02" kicker={t.whyLabel} title={t.whyTitle} />
          <CardCarousel gridClass="md:grid-cols-3">
            {t.why.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="group h-full border border-neutral-900 bg-white p-8 lg:p-10 transition-colors duration-300 hover:bg-neutral-900">
                  <div className="mb-6 flex items-center justify-between border-b border-neutral-200 pb-3 transition-colors duration-300 group-hover:border-neutral-700">
                    <span className="font-mono text-2xl font-bold tabular-nums text-neutral-900 transition-colors duration-300 group-hover:text-white">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">Issue / {String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold tracking-tight text-balance text-neutral-900 transition-colors duration-300 group-hover:text-white">{item.title}</h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-pretty text-neutral-600 transition-colors duration-300 group-hover:text-neutral-300">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="py-12 lg:py-16 bg-neutral-50 border-y border-neutral-900">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="03" kicker={t.whatLabel} title={t.whatTitle} />
          <CardCarousel gridClass="md:grid-cols-2">
            {t.what.map((item, i) => (
              <Reveal key={item.num} delay={i * 80}>
                <div className="group h-full border border-neutral-900 bg-white p-8 lg:p-10 transition-colors duration-300 hover:bg-neutral-900">
                  <div className="flex items-baseline justify-between border-b border-neutral-200 pb-4 transition-colors duration-300 group-hover:border-neutral-700">
                    <span className="font-mono text-2xl font-bold tabular-nums text-neutral-900 transition-colors duration-300 group-hover:text-white">{item.num}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">Service / {item.num}</span>
                  </div>
                  <h3 className="mt-6 text-xl lg:text-2xl font-bold tracking-tight text-balance text-neutral-900 transition-colors duration-300 group-hover:text-white">{item.title}</h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-pretty text-neutral-600 transition-colors duration-300 group-hover:text-neutral-300">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* PLATFORMS */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="04" kicker={t.platformsLabel} title={t.platformsTitle} desc={t.platformsDesc} />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px border border-neutral-900 bg-neutral-900">
            {t.platforms.map((p, i) => (
              <Reveal key={p} delay={i * 60}>
                <div className="group flex h-full flex-col justify-between gap-6 bg-white px-5 py-6 transition-colors duration-300 hover:bg-neutral-900">
                  <span className="font-mono text-[10px] tabular-nums uppercase tracking-[0.2em] text-neutral-400">{`CH.${String(i + 1).padStart(2, "0")}`}</span>
                  <span className="font-mono text-sm font-bold uppercase tracking-[0.06em] text-neutral-900 transition-colors duration-300 group-hover:text-white">{p}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AI-POWERED */}
      <section className="py-12 lg:py-16 bg-neutral-900 border-y border-neutral-900">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="05" kicker={t.aiLabel} title={t.aiTitle} desc={t.aiDesc} dark />
          <Reveal delay={120}>
            <ul className="grid gap-px border border-neutral-700 bg-neutral-700 md:grid-cols-2">
              {t.aiPoints.map((p, i) => (
                <li key={p} className="flex items-start gap-4 bg-neutral-900 p-6 lg:p-7">
                  <span className="font-mono text-xs font-bold tabular-nums text-neutral-500">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[15px] font-medium leading-relaxed text-pretty text-neutral-200">{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-12 lg:py-16 bg-neutral-50 border-y border-neutral-900">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="06" kicker={t.processLabel} title={t.processTitle} />
          <div className="hidden lg:grid grid-cols-12 gap-6 border-b border-neutral-900 pb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
            <div className="col-span-1">No.</div>
            <div className="col-span-3">Phase</div>
            <div className="col-span-8">Detail</div>
          </div>
          {t.process.map((step, i) => (
            <Reveal key={step.num} delay={i * 60}>
              <div className="group grid grid-cols-1 gap-2 border-b border-neutral-200 py-7 transition-colors duration-300 hover:bg-white lg:grid-cols-12 lg:gap-6">
                <div className="lg:col-span-1">
                  <span className="font-mono text-lg font-bold tabular-nums text-neutral-900">{step.num}</span>
                </div>
                <div className="lg:col-span-3">
                  <h3 className="text-lg font-bold tracking-tight text-balance text-neutral-900">{step.title}</h3>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">{step.en}</p>
                </div>
                <div className="lg:col-span-8">
                  <p className="text-[15px] leading-relaxed text-pretty text-neutral-600">{step.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="07" kicker={t.faqLabel} title={t.faqTitle} />
          <div className="max-w-3xl border-t border-neutral-900">
            {t.faq.map((item, i) => (
              <Reveal key={i} delay={i * 50}>
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
      <section className="bg-neutral-900 py-16 lg:py-20">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="flex items-center gap-4 border-b border-neutral-700 pb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
              <span className="font-bold text-white">§08</span>
              <span>{t.ctaLabel}</span>
            </div>
            <div className="mt-12 grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <h2 className="text-[18px] sm:text-xl lg:text-2xl font-bold leading-[1.15] sm:leading-[1.05] tracking-[-0.02em] text-balance text-white">{t.ctaTitle}</h2>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-pretty text-neutral-400">{t.ctaDesc}</p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <a
                  href="/contact?service=sns"
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

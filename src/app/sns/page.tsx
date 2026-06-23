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
    heroDesc: "戦略設計からコンテンツ制作・投稿・分析改善まで、SNS運用をまるごと代行。AIでネタ出しと制作を高速化し、「続かない」「ネタ切れ」を仕組みで解決します。",
    whyLabel: "Why SNS",
    whyTitle: "SNS、こんな状態になっていませんか？",
    why: [
      { title: "投稿が続かない", desc: "最初は頑張っても、本業に追われて更新が止まる。属人化して担当者が辞めると終わる。" },
      { title: "ネタ切れ・質のばらつき", desc: "毎回ゼロから考えるのは大変。投稿の質とトーンが安定しない。" },
      { title: "効果が見えない", desc: "フォロワーは増えても、問い合わせや売上につながっているか分からない。" },
    ],
    whatLabel: "What We Do",
    whatTitle: "運用を、まるごとお任せいただけます。",
    what: [
      { num: "01", title: "アカウント戦略設計", desc: "ターゲット・コンセプト・KPI・投稿方針を設計。ブランドの「らしさ」を言語化し、運用の軸を作ります。" },
      { num: "02", title: "コンテンツ企画・制作", desc: "AIでテーマ案を大量生成し、人がブランドトーンに編集。画像・動画・キャプションまで一貫制作。" },
      { num: "03", title: "投稿運用・スケジュール管理", desc: "最適な時間帯に自動投稿。コメント・DMの一次対応や、炎上リスクの監視まで対応可能です。" },
      { num: "04", title: "分析・改善レポート", desc: "リーチ・保存・遷移・CVを月次で分析。次月の方針に反映し、成果が出る投稿を増やしていきます。" },
    ],
    platformsLabel: "Platforms",
    platformsTitle: "主要SNSに対応",
    platformsDesc: "貴社の顧客がいるプラットフォームに合わせて、最適な組み合わせをご提案します。",
    platforms: ["Instagram", "X (Twitter)", "TikTok", "YouTube", "LINE公式", "Facebook"],
    aiLabel: "AI-Powered",
    aiTitle: "AIで、運用を「続く」仕組みに。",
    aiDesc: "clearAIの強みは、AIを使った運用の仕組み化です。属人的な「頑張り」に頼らず、ネタ出し・制作・投稿を半自動化。担当者が変わっても止まらない運用体制をつくります。",
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
      { num: "03", title: "運用開始", en: "Operation", desc: "コンテンツ制作と投稿運用を開始。AIで制作を高速化しながら品質を担保します。" },
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
      { q: "どのSNSから始めればいいか分かりません。", a: "問題ありません。貴社の顧客層・商材・目的をお伺いし、最も成果が出やすい媒体からご提案します。1媒体からの開始もできます。" },
      { q: "投稿のネタは誰が考えますか？", a: "clearAIが企画します。AIでテーマ案を大量生成し、貴社のブランドトーンに合わせて人が編集するため、ネタ切れの心配がありません。" },
      { q: "アカウントは自社のものを使えますか？", a: "はい。既存アカウントの運用を引き継ぐことも、新規開設からの支援も可能です。" },
      { q: "炎上が心配です。", a: "投稿前のダブルチェック体制と、リスクの高い表現を避けるガイドラインで運用します。コメント監視にも対応します。" },
      { q: "広告運用とまとめてお願いできますか？", a: "可能です。SNS運用と広告運用（/advertising）を組み合わせ、オーガニックと広告の両輪で成果を最大化します。" },
    ],
    ctaLabel: "Contact",
    ctaTitle: "SNS運用、丸投げしてください。",
    ctaDesc: "「何を投稿すればいいか分からない」段階からで大丈夫です。まずは無料相談で、貴社に合う進め方をご提案します。",
    ctaButton: "無料で相談する",
  },
  en: {
    heroKicker: "SNS Management",
    heroTitle: "Social Media Management",
    heroDesc: "Full-service social media management — from strategy to content production, posting, and analytics. We use AI to accelerate ideation and production, solving 'we can't keep it up' and 'we're out of ideas' with a repeatable system.",
    whyLabel: "Why SNS",
    whyTitle: "Does your social media look like this?",
    why: [
      { title: "Can't keep it up", desc: "You start strong, then the day job takes over and updates stop. It's person-dependent, and ends when the owner leaves." },
      { title: "Out of ideas, uneven quality", desc: "Starting from scratch every time is hard, and the quality and tone of posts drift." },
      { title: "Can't see results", desc: "Followers grow, but it's unclear whether it drives inquiries or sales." },
    ],
    whatLabel: "What We Do",
    whatTitle: "Hand over the whole operation.",
    what: [
      { num: "01", title: "Account strategy", desc: "We design target, concept, KPIs, and posting policy — articulating your brand voice and setting the operating axis." },
      { num: "02", title: "Content planning & production", desc: "AI generates many theme ideas; humans edit to your brand tone. Images, video, and captions produced end to end." },
      { num: "03", title: "Posting & scheduling", desc: "Auto-posting at optimal times. We can also handle first-line replies to comments/DMs and monitor reputational risk." },
      { num: "04", title: "Analytics & improvement", desc: "Monthly analysis of reach, saves, click-through, and conversions — feeding next month's plan to grow what works." },
    ],
    platformsLabel: "Platforms",
    platformsTitle: "Major platforms supported",
    platformsDesc: "We propose the optimal mix based on where your customers actually are.",
    platforms: ["Instagram", "X (Twitter)", "TikTok", "YouTube", "LINE Official", "Facebook"],
    aiLabel: "AI-Powered",
    aiTitle: "AI turns operation into something that lasts.",
    aiDesc: "clearAI's edge is systematizing operations with AI. Instead of relying on individual effort, we semi-automate ideation, production, and posting — building an operation that doesn't stop when the person in charge changes.",
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
      { q: "We don't know which platform to start with.", a: "No problem. We learn your customers, product, and goals, then propose the channel most likely to perform. You can start with just one." },
      { q: "Who comes up with the post ideas?", a: "clearAI does. We generate many theme ideas with AI and edit them to your brand tone, so you never run out of ideas." },
      { q: "Can we use our own account?", a: "Yes. We can take over an existing account or support you from a brand-new launch." },
      { q: "We're worried about backlash.", a: "We operate with a pre-post double-check and guidelines that avoid high-risk expressions, plus comment monitoring." },
      { q: "Can you handle ads together with this?", a: "Yes. We combine social management with ad operations (/advertising) to maximize results across organic and paid." },
    ],
    ctaLabel: "Contact",
    ctaTitle: "Leave your social media to us.",
    ctaDesc: "It's fine to start from 'we don't know what to post.' Begin with a free consultation and we'll propose the right approach for you.",
    ctaButton: "Book a free consultation",
  },
};

export default function SnsPage() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  return (
    <>
      {/* PAGE HEADER */}
      <section className="pt-24 pb-4 lg:pt-28 lg:pb-5 bg-white border-b border-gray-100">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <p className="text-sm font-semibold text-neutral-900 mb-3">{t.heroKicker}</p>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">{t.heroTitle}</h1>
          <p className="text-base text-gray-600 leading-relaxed w-full">{t.heroDesc}</p>
        </div>
      </section>

      {/* PRICING */}
      <section className="pt-6 pb-10 lg:pt-8 lg:pb-12 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.pricingLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.pricingTitle}</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {t.plans.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 100} className="flex">
                <div className={`rounded-lg p-5 lg:p-6 transition-all duration-300 flex flex-col w-full ${plan.featured ? "bg-neutral-900 text-white shadow-xl" : "bg-white border border-gray-200 hover:shadow-lg"}`}>
                  {plan.featured && plan.badge && <span className="inline-block rounded-md bg-white/20 text-white px-3 py-1 text-sm font-semibold mb-3 self-start">{plan.badge}</span>}
                  <h3 className={`text-base font-bold mb-1.5 ${plan.featured ? "text-white" : "text-gray-900"}`}>{plan.name}</h3>
                  <div className="mb-2 flex items-baseline gap-1">
                    <span className={`text-xl font-bold ${plan.featured ? "text-white" : "text-gray-900"}`}>{plan.price}</span>
                    {plan.unit && <span className={`text-sm ${plan.featured ? "text-white/80" : "text-gray-500"}`}>{plan.unit}</span>}
                  </div>
                  <p className={`text-xs leading-relaxed mb-3 ${plan.featured ? "text-white/80" : "text-gray-600"}`}>{plan.desc}</p>
                  <ul className="space-y-2 mb-4 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${plan.featured ? "bg-white/40" : "bg-neutral-900"}`} />
                        <span className={`text-xs ${plan.featured ? "text-white/90" : "text-gray-600"}`}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="/contact?service=sns" className={`block text-center text-sm font-semibold py-2 rounded-lg transition-all duration-300 mt-auto ${plan.featured ? "bg-white text-neutral-900 hover:bg-neutral-50" : "border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900"}`}>{t.planCta}</a>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300}>
            <p className="text-xs text-gray-500 text-center mt-8">{t.pricingNote}</p>
          </Reveal>
        </div>
      </section>

      {/* WHY */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.whyLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-snug mb-8 w-full">{t.whyTitle}</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.why.map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="rounded-lg border border-gray-200 bg-white p-8 hover:shadow-lg transition-all duration-300 h-full">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="py-14 lg:py-20 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.whatLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-8">{t.whatTitle}</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.what.map((item, i) => (
              <Reveal key={item.num} delay={i * 100}>
                <div className="bg-white rounded-lg border border-gray-200 p-8 hover:border-neutral-300 hover:shadow-lg transition-all duration-300">
                  <span className="text-sm font-bold text-neutral-900">{item.num}</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-3 mb-4">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PLATFORMS */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.platformsLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.platformsTitle}</h2>
            <p className="text-sm text-gray-500 mb-12 w-full leading-relaxed">{t.platformsDesc}</p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {t.platforms.map((p, i) => (
              <Reveal key={p} delay={i * 60}>
                <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-5 text-center">
                  <span className="text-sm font-bold text-gray-800">{p}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AI-POWERED */}
      <section className="py-14 lg:py-20 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <Reveal>
                <Label>{t.aiLabel}</Label>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-snug mb-5">{t.aiTitle}</h2>
                <p className="text-sm text-gray-600 leading-relaxed">{t.aiDesc}</p>
              </Reveal>
              <Reveal delay={120}>
                <ul className="space-y-3">
                  {t.aiPoints.map((p) => (
                    <li key={p} className="flex items-start gap-3 rounded-lg bg-white border border-neutral-200 p-4">
                      <svg className="w-5 h-5 text-neutral-900 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm font-medium text-gray-800 leading-snug">{p}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.processLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-8">{t.processTitle}</h2>
          </Reveal>
          {t.process.map((step, i) => (
            <Reveal key={step.num} delay={i * 100}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-10 border-b border-gray-100 last:border-0">
                <div className="lg:col-span-1"><span className="text-sm font-bold text-neutral-900">{step.num}</span></div>
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

      {/* FAQ */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.faqLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-8">{t.faqTitle}</h2>
          </Reveal>
          <div className="max-w-3xl">
            {t.faq.map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <details className="border-b border-gray-100 py-5 group">
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
      <section className="py-14 lg:py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Reveal>
            <Label>{t.ctaLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.ctaTitle}</h2>
            <p className="text-base text-gray-600 leading-relaxed mb-10">{t.ctaDesc}</p>
            <a href="/contact?service=sns" className="rounded-lg bg-neutral-900 text-white font-semibold px-10 py-4 hover:bg-neutral-800 transition-colors duration-300 inline-block">{t.ctaButton}</a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

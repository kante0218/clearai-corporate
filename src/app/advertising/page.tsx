"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import PricingCarousel from "@/components/PricingCarousel";
import CardCarousel from "@/components/CardCarousel";

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
    <Reveal className="mb-12 lg:mb-16">
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

type Copy = {
  headerKicker: string;
  headerTitle: string;
  headerDesc: string;
  challengesLabel: string;
  challengesTitle: string;
  challenges: { title: string; desc: string }[];
  servicesLabel: string;
  servicesTitle: string;
  servicesDesc: string;
  services: { num: string; title: string; desc: string }[];
  channelsLabel: string;
  channelsTitle: string;
  channels: { title: string; desc: string }[];
  featuresLabel: string;
  featuresTitle: string;
  features: { num: string; title: string; desc: string }[];
  pricingLabel: string;
  pricingTitle: string;
  pricingDesc: string;
  plans: { name: string; price: string; unit: string; desc: string; features: string[]; featured: boolean; href: string; cta: string; minTerm: string }[];
  pricingNote: string;
  ctaLabel: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaButton: string;
};

const COPY: Record<"ja" | "en", Copy> = {
  ja: {
    headerKicker: "AI Advertising",
    headerTitle: "AI広告運用",
    headerDesc: "生成AIでコピー・クリエイティブ・入札・分析を高速化し、AIで磨き続ける広告運用への転換を支援します。",
    challengesLabel: "Challenges",
    challengesTitle: "こんな課題、ありませんか？",
    challenges: [
      { title: "クリエイティブが枯渇", desc: "広告バナー・動画・コピーの量産が追いつかず、CTRが頭打ちになっている。" },
      { title: "運用工数が重い", desc: "入札調整・除外設定・レポート作成に時間を取られ、戦略を考える余裕がない。" },
      { title: "効果測定が曖昧", desc: "媒体ごとのCPA／ROASは見えても、事業KPIへの寄与度まで踏み込めていない。" },
    ],
    servicesLabel: "Services",
    servicesTitle: "提供サービス",
    servicesDesc: "Google広告・Meta広告・YouTube広告・LINE広告など主要媒体に対応し、AIネイティブな運用フローで人手では不可能な検証速度を実現します。",
    services: [
      { num: "01", title: "AIクリエイティブ生成", desc: "テキスト・バナー・動画のバリエーションをAIで大量生成し、最も刺さるパターンをデータドリブンに見つけ出します。" },
      { num: "02", title: "広告コピー最適化", desc: "ターゲット・媒体ごとに数十パターンのコピーをLLMで自動生成し、ABテストの設計から効果検証まで支援します。" },
      { num: "03", title: "入札・配信最適化", desc: "媒体APIと連携した自動運用ルールを構築し、週次の手動最適化を日次・時間次の自動最適化に置き換えます。" },
      { num: "04", title: "レポート自動化", desc: "GA4・各媒体・CRMを統合したダッシュボードを構築し、週次レポート作成の工数を90%以上削減します。" },
      { num: "05", title: "オーディエンス設計", desc: "1stパーティデータを活用した類似拡張・除外設計を、AIによるセグメント分析で精緻化します。" },
      { num: "06", title: "LP最適化（CRO）", desc: "広告クリエイティブとLPの一貫性をAIでチェックし、離脱要因の特定と改善案提示までセットで提供します。" },
    ],
    channelsLabel: "Channels",
    channelsTitle: "対応媒体",
    channels: [
      { title: "Google広告", desc: "リスティング・P-MAX・YouTube広告" },
      { title: "Meta広告", desc: "Facebook・Instagram・Reels" },
      { title: "LINE広告", desc: "LINE広告・LINE公式アカウント連携" },
      { title: "X / TikTok 他", desc: "新興媒体の効果検証・拡張運用" },
    ],
    featuresLabel: "Features",
    featuresTitle: "clearAI広告運用の特徴",
    features: [
      { num: "01", title: "AIネイティブな運用体制", desc: "AIを前提にフローを再設計し、検証サイクルを2〜5倍に加速します。" },
      { num: "02", title: "事業KPIから逆算", desc: "CPA／ROASだけでなく、LTV・粗利・CAC回収期間まで踏み込んだ運用設計を行います。" },
      { num: "03", title: "コンサル × エンジニア体制", desc: "戦略コンサル出身者と実装エンジニアが同じチームで運用し、媒体API連携や独自ツール開発もワンストップで対応します。" },
      { num: "04", title: "透明性の高いレポート", desc: "施策単位の意思決定ログをすべて開示し、代理店ブラックボックスを排除します。" },
    ],
    pricingLabel: "Pricing",
    pricingTitle: "料金の目安",
    pricingDesc: "月額固定と成果報酬の組み合わせも可能ですので、詳しくはお気軽にご相談ください。",
    plans: [
      { name: "スタート", price: "15万円〜", unit: "/ 月", desc: "1媒体・小規模スタートに。", features: ["1媒体運用", "週次レポート", "AIクリエイティブ生成（月10案）", "Slack質問対応"], featured: false, href: "https://buy.stripe.com/aFa8wIec4c6s56y89md7q04", cta: "申し込む", minTerm: "最低3ヶ月契約から" },
      { name: "グロース", price: "35万円〜", unit: "/ 月", desc: "複数媒体での本格運用。", features: ["3媒体まで運用", "日次ダッシュボード", "AIクリエイティブ生成（月30案）", "LP最適化提案", "月次戦略MTG"], featured: true, href: "https://buy.stripe.com/14A28k9VO7QcdD40GUd7q05", cta: "申し込む", minTerm: "最低3ヶ月契約から" },
      { name: "エンタープライズ", price: "ご相談", unit: "", desc: "全社マーケティング統合。", features: ["媒体無制限", "専用ダッシュボード構築", "独自ツール開発", "事業KPIダッシュボード", "戦略コンサル込み"], featured: false, href: "/contact?service=advertising", cta: "相談する", minTerm: "" },
    ],
    pricingNote: "表示価格は税抜。広告費は別途。業種・媒体構成により個別見積もりとなる場合があります。",
    ctaLabel: "Contact",
    ctaTitle: "広告運用を、AIで磨き続ける。",
    ctaDesc: "現在の広告運用を無料診断し、改善ポイントから具体的な実行プランまでご提案します。",
    ctaButton: "無料診断を申し込む",
  },
  en: {
    headerKicker: "AI Advertising",
    headerTitle: "AI-Powered Ad Operations",
    headerDesc: "We accelerate copy, creative, bidding, and analytics with generative AI — helping you transition to an operation that improves continuously.",
    challengesLabel: "Challenges",
    challengesTitle: "Do any of these sound familiar?",
    challenges: [
      { title: "Creative running dry", desc: "You can't produce ad banners, videos, and copy fast enough — CTR has plateaued." },
      { title: "Operations too heavy", desc: "Bid adjustments, exclusion settings, and report writing eat up your time, leaving no room to think strategically." },
      { title: "Measurement too vague", desc: "You can see CPA/ROAS per channel, but you haven't been able to connect them to your business KPIs." },
    ],
    servicesLabel: "Services",
    servicesTitle: "What We Offer",
    servicesDesc: "We support all major channels — Google, Meta, YouTube, LINE, and more — with an AI-native operations flow that delivers verification speed manual processes cannot match.",
    services: [
      { num: "01", title: "AI creative generation", desc: "We mass-generate text, banner, and video variations with AI, then identify which patterns resonate through a data-driven process." },
      { num: "02", title: "Ad copy optimization", desc: "We auto-generate dozens of copy patterns per target and channel with LLMs, supporting everything from A/B test design to results validation." },
      { num: "03", title: "Bid & delivery optimization", desc: "We build automated rules integrated with channel APIs — replacing weekly manual optimization with daily and hourly automated optimization." },
      { num: "04", title: "Report automation", desc: "We build a unified dashboard connecting GA4, each channel, and your CRM — cutting weekly reporting time by over 90%." },
      { num: "05", title: "Audience design", desc: "We refine lookalike expansion and exclusion design using first-party data through AI-driven segment analysis." },
      { num: "06", title: "LP optimization (CRO)", desc: "We use AI to check consistency between ad creatives and landing pages, identifying drop-off causes and delivering improvement recommendations as a bundle." },
    ],
    channelsLabel: "Channels",
    channelsTitle: "Supported Channels",
    channels: [
      { title: "Google Ads", desc: "Search, P-MAX, YouTube Ads" },
      { title: "Meta Ads", desc: "Facebook, Instagram, Reels" },
      { title: "LINE Ads", desc: "LINE Ads & LINE Official Account integration" },
      { title: "X / TikTok & more", desc: "Effectiveness testing and scaled operations on emerging channels" },
    ],
    featuresLabel: "Features",
    featuresTitle: "What sets clearAI ad ops apart",
    features: [
      { num: "01", title: "AI-native operations model", desc: "Unlike conventional ad agencies, we redesign the entire workflow with AI built in from the start — accelerating the testing cycle 2–5×." },
      { num: "02", title: "Working backward from business KPIs", desc: "We design operations that go beyond CPA/ROAS — factoring in LTV, gross margin, and CAC payback period." },
      { num: "03", title: "Consulting × engineering team", desc: "Former strategy consultants and hands-on engineers operate as one team, with media API integration and proprietary tool development included." },
      { num: "04", title: "High-transparency reporting", desc: "We disclose every decision log at the initiative level — eliminating the agency black box." },
    ],
    pricingLabel: "Pricing",
    pricingTitle: "Pricing overview",
    pricingDesc: "A combination of fixed monthly fee and performance-based fee on ad spend is also available — feel free to reach out for details.",
    plans: [
      { name: "Starter", price: "¥150,000+", unit: "/ mo", desc: "For single-channel small-scale starts.", features: ["1 channel", "Weekly reports", "AI creative generation (10 concepts/mo)", "Slack Q&A support"], featured: false, href: "https://buy.stripe.com/aFa8wIec4c6s56y89md7q04", cta: "Get started", minTerm: "Minimum 3-month contract" },
      { name: "Growth", price: "¥350,000+", unit: "/ mo", desc: "Full-scale operations across multiple channels.", features: ["Up to 3 channels", "Daily dashboard", "AI creative generation (30 concepts/mo)", "LP optimization proposals", "Monthly strategy MTG"], featured: true, href: "https://buy.stripe.com/14A28k9VO7QcdD40GUd7q05", cta: "Get started", minTerm: "Minimum 3-month contract" },
      { name: "Enterprise", price: "Custom", unit: "", desc: "Company-wide marketing integration.", features: ["Unlimited channels", "Custom dashboard build", "Proprietary tool development", "Business KPI dashboard", "Strategy consulting included"], featured: false, href: "/contact?service=advertising", cta: "Talk to us", minTerm: "" },
    ],
    pricingNote: "Prices exclude tax. Ad spend is billed separately. Custom quotes may apply depending on industry and channel mix.",
    ctaLabel: "Contact",
    ctaTitle: "Keep sharpening your ad ops with AI.",
    ctaDesc: "We offer a free audit of your current ad operations — from identifying improvement points to laying out a concrete action plan.",
    ctaButton: "Request a free audit",
  },
};

export default function AdvertisingPage() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  return (
    <>
      {/* MASTHEAD */}
      <section className="bg-white pt-32 lg:pt-40">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-neutral-900 pb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
              <span className="font-bold text-neutral-900">§00</span>
              <span>{t.headerKicker}</span>
              <span className="text-neutral-300">/</span>
              <span>Google</span>
              <span className="text-neutral-300">/</span>
              <span>Meta</span>
              <span className="text-neutral-300">/</span>
              <span>LINE</span>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="mt-10 text-[7vw] sm:text-3xl lg:text-4xl font-bold leading-[0.95] tracking-[-0.04em] text-balance text-neutral-900">{t.headerTitle}</h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-8 mb-4 max-w-2xl text-base lg:text-lg leading-relaxed text-pretty text-neutral-600">{t.headerDesc}</p>
          </Reveal>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="01" kicker={t.pricingLabel} title={t.pricingTitle} desc={t.pricingDesc} />
          <PricingCarousel>
            {t.plans.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 100} className="flex">
                <div className={`flex w-full flex-col border p-7 lg:p-8 ${plan.featured ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-900 bg-white"}`}>
                  <div className={`mb-6 flex items-center justify-between border-b pb-3 ${plan.featured ? "border-neutral-700" : "border-neutral-200"}`}>
                    <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.18em] ${plan.featured ? "text-white" : "text-neutral-900"}`}>{plan.name}</span>
                    <span className={`font-mono text-[10px] tabular-nums ${plan.featured ? "text-neutral-500" : "text-neutral-400"}`}>{plan.featured ? "★ Popular" : `PLAN.${String(i + 1).padStart(2, "0")}`}</span>
                  </div>
                  <div className="mb-2 flex items-baseline gap-1.5">
                    <span className={`font-mono text-2xl font-bold tabular-nums tracking-tight ${plan.featured ? "text-white" : "text-neutral-900"}`}>{plan.price}</span>
                    {plan.unit && <span className={`font-mono text-xs ${plan.featured ? "text-neutral-400" : "text-neutral-500"}`}>{plan.unit}</span>}
                  </div>
                  <p className={`mb-5 text-xs leading-relaxed text-pretty ${plan.featured ? "text-neutral-400" : "text-neutral-600"}`}>{plan.desc}</p>
                  <ul className={`mb-5 flex-1 space-y-2 border-t pt-4 font-mono ${plan.featured ? "border-neutral-700" : "border-neutral-200"}`}>
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs">
                        <span className={`flex-shrink-0 ${plan.featured ? "text-white" : "text-neutral-900"}`}>→</span>
                        <span className={plan.featured ? "text-neutral-400" : "text-neutral-500"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  {plan.minTerm && (
                    <p className={`mb-4 font-mono text-[10px] uppercase tracking-[0.1em] ${plan.featured ? "text-neutral-500" : "text-neutral-400"}`}>※{plan.minTerm}</p>
                  )}
                  <a href={plan.href} className={`group mt-auto inline-flex items-center justify-center gap-2 border px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.08em] transition-[color,background-color,border-color,scale] duration-300 active:scale-[0.96] ${plan.featured ? "border-white bg-white text-neutral-900 hover:bg-transparent hover:text-white" : "border-neutral-900 bg-white text-neutral-900 hover:bg-neutral-900 hover:text-white"}`}>
                    {plan.cta}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </Reveal>
            ))}
          </PricingCarousel>
          <Reveal delay={300}>
            <p className="mt-8 font-mono text-[11px] leading-relaxed text-neutral-500">{t.pricingNote}</p>
          </Reveal>
        </div>
      </section>

      {/* CHALLENGES */}
      <section className="py-20 lg:py-28 bg-neutral-50 border-y border-neutral-900">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="02" kicker={t.challengesLabel} title={t.challengesTitle} />
          <CardCarousel gridClass="md:grid-cols-3">
            {t.challenges.map((item, i) => (
              <Reveal key={item.title} delay={i * 100} className="flex">
                <div className="flex h-full w-full flex-col border border-neutral-900 bg-white p-7 lg:p-8">
                  <div className="mb-6 flex items-center justify-between border-b border-neutral-200 pb-3">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-900">Issue</span>
                    <span className="font-mono text-[10px] tabular-nums text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mb-3 text-lg font-bold tracking-tight text-balance text-neutral-900">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-pretty text-neutral-600">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="03" kicker={t.servicesLabel} title={t.servicesTitle} desc={t.servicesDesc} />
          <CardCarousel gridClass="md:grid-cols-2">
            {t.services.map((item, i) => (
              <Reveal key={item.num} delay={i * 80} className="flex">
                <div className="group h-full w-full border border-neutral-900 bg-white p-7 lg:p-8 transition-colors duration-300 hover:bg-neutral-900">
                  <div className="mb-4 flex items-baseline justify-between border-b border-neutral-200 pb-4 transition-colors duration-300 group-hover:border-neutral-700">
                    <span className="font-mono text-2xl font-bold tabular-nums text-neutral-900 transition-colors duration-300 group-hover:text-white">{item.num}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">Service / {item.num}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-bold tracking-tight text-balance text-neutral-900 transition-colors duration-300 group-hover:text-white">{item.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-pretty text-neutral-600 transition-colors duration-300 group-hover:text-neutral-300">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* CHANNELS */}
      <section className="py-20 lg:py-28 bg-neutral-50 border-y border-neutral-900">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="04" kicker={t.channelsLabel} title={t.channelsTitle} />
          <CardCarousel gridClass="md:grid-cols-4">
            {t.channels.map((f, i) => (
              <Reveal key={f.title} delay={i * 80} className="flex">
                <div className="flex h-full w-full flex-col border border-neutral-900 bg-white p-6">
                  <div className="mb-4 flex items-center justify-between border-b border-neutral-200 pb-3">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-900">Channel</span>
                    <span className="font-mono text-[10px] tabular-nums text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mb-2 text-sm font-bold tracking-tight text-balance text-neutral-900">{f.title}</h3>
                  <p className="text-xs leading-relaxed text-pretty text-neutral-600">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="05" kicker={t.featuresLabel} title={t.featuresTitle} />
          <CardCarousel gridClass="md:grid-cols-2">
            {t.features.map((item, i) => (
              <Reveal key={item.title} delay={i * 100} className="flex">
                <div className="group h-full w-full border border-neutral-900 bg-white p-7 lg:p-8 transition-colors duration-300 hover:bg-neutral-900">
                  <div className="mb-4 flex items-baseline justify-between border-b border-neutral-200 pb-4 transition-colors duration-300 group-hover:border-neutral-700">
                    <span className="font-mono text-2xl font-bold tabular-nums text-neutral-900 transition-colors duration-300 group-hover:text-white">{item.num}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">Feature / {item.num}</span>
                  </div>
                  <h3 className="mt-6 text-lg lg:text-xl font-bold tracking-tight text-balance text-neutral-900 transition-colors duration-300 group-hover:text-white">{item.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-pretty text-neutral-600 transition-colors duration-300 group-hover:text-neutral-300">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-neutral-900 py-24 lg:py-32">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="flex items-center gap-4 border-b border-neutral-700 pb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
              <span className="font-bold text-white">§06</span>
              <span>{t.ctaLabel}</span>
            </div>
            <div className="mt-12 grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <h2 className="text-[18px] sm:text-xl lg:text-2xl font-bold leading-[1.15] sm:leading-[1.05] tracking-[-0.02em] text-balance text-white">{t.ctaTitle}</h2>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-pretty text-neutral-400">{t.ctaDesc}</p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <a
                  href="/contact?service=advertising"
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

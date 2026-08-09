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
    <Reveal className="mb-7 lg:mb-9 max-w-3xl">
      <div className={`flex items-center gap-4 border-b pb-4 ${dark ? "border-white/25" : "border-neutral-900"}`}>
        <span className={`font-mono text-xs font-bold tabular-nums ${dark ? "text-white" : "text-neutral-900"}`}>§{index}</span>
        <span className={`font-mono text-[11px] font-medium uppercase tracking-[0.25em] ${dark ? "text-neutral-400" : "text-neutral-500"}`}>{kicker}</span>
      </div>
      <h2 className={`mt-8 text-[18px] sm:text-xl lg:text-2xl font-bold leading-[1.15] sm:leading-[1.05] tracking-[-0.02em] text-balance whitespace-pre-line ${dark ? "text-white" : "text-neutral-900"}`}>
        {title}
      </h2>
      {desc && <p className={`mt-6 text-[15px] leading-relaxed text-pretty ${dark ? "text-neutral-400" : "text-neutral-600"}`}>{desc}</p>}
    </Reveal>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <p className="text-sm font-semibold text-neutral-900 mb-4">{children}</p>;
}

type Copy = {
  pageKicker: string;
  pageTitle: string;
  pageDesc: string;
  pageImgAlt: string;
  whyLabel: string;
  whyTitle: string;
  whyDesc: string;
  whyCards: { title: string; desc: string }[];
  servicesLabel: string;
  servicesTitle: string;
  offlineTag: string;
  offlineTitle: string;
  offlineDesc: string;
  offlinePrice: string;
  offlinePriceUnit: string;
  offlineGuaranteeNote: string;
  offlineFeatures: string[];
  offlineMinNote: string;
  offlineCta: string;
  onlineTag: string;
  onlineTitle: string;
  onlineDesc: string;
  onlinePrice: string;
  onlinePriceUnit: string;
  onlineSubNote: string;
  onlineFeatures: string[];
  onlineMinNote: string;
  onlineCta: string;
  guaranteeLabel: string;
  guaranteeTitle: string;
  guaranteeDesc: string;
  guaranteeDisclaimer: string;
  curriculumLabel: string;
  curriculumTitle: string;
  curriculum: { num: string; title: string; en: string; desc: string }[];
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
    pageKicker: "Claude Specialized",
    pageTitle: "Claude特化支援",
    pageDesc: "AnthropicのClaudeに特化した経営者向けマンツーマンスクールで、月2回対面のオフライン版（10万円/月）とチャットサポートのオンライン版（5万円/月）の2形態をご提供します（全額返金保証付き）。",
    pageImgAlt: "",
    whyLabel: "Why Claude",
    whyTitle: "なぜ、Claudeに特化するのか。",
    whyDesc: "Claude Codeを含むClaudeは文章品質・コード生成・長文脈理解で世界トップクラスですが、真価を引き出すには正しい使い方が必要で、Claudeにだけ深く張るclearAIだからこそ一段深い支援が可能です。",
    whyCards: [
      { title: "最高クラスの言語能力", desc: "日本語の文章理解・生成・要約は現在最も信頼できるレベルで、議事録・契約レビュー・社内文書に強みを発揮します。" },
      { title: "Claude Codeの破壊力", desc: "コーディングだけでなく、データ整形・調査・検証まで「実行する相棒」として使える唯一無二のAI。" },
      { title: "安全性と透明性", desc: "Anthropicのポリシーは企業の情報統制と相性が良く、ガバナンスを重視する日本企業でも安心して導入できる。" },
    ],
    servicesLabel: "Services",
    servicesTitle: "2つのサービス",
    offlineTag: "OFFLINE / 対面",
    offlineTitle: "オフライン版（対面マンツーマン）",
    offlineDesc: "月2回経営者と直接お会いし、経営課題を題材に手を動かしながらClaudeを使いこなせる状態まで引き上げます。",
    offlinePrice: "10万円",
    offlinePriceUnit: "/ 月",
    offlineGuaranteeNote: "使いこなせるようにならなかった場合、全額返金保証",
    offlineFeatures: [
      "月2回の対面マンツーマンレッスン（各60分）",
      "経営課題をテーマにしたその場での実務演習",
      "Claude Code・Projects・MCPなど高度機能の習熟",
      "セッション間もいつでも質問できる専用Slackチャンネル",
      "3ヶ月経過時点で効果に満足できなければ全額返金",
    ],
    offlineMinNote: "※最低3ヶ月契約から",
    offlineCta: "オフライン版に申し込む",
    onlineTag: "ONLINE / オンライン",
    onlineTitle: "オンライン版（SNSサポート）",
    onlineDesc: "対面セッションなしで初期セットアップガイド＋SNS/チャットでの継続サポートを提供する、自分のペースでClaudeを習得したい経営者向けの軽量プランです。",
    onlinePrice: "5万円",
    onlinePriceUnit: "/ 月",
    onlineSubNote: "対面レッスンなし・サポートはオンラインのみ",
    onlineFeatures: [
      "初期セットアップガイド（環境構築・初期設定の伴走）",
      "SNS/チャットでの継続的なQ&Aサポート",
      "Claude Code・Projects・MCPなど主要機能の使い方解説",
      "実務テンプレ・プロンプト集の共有",
      "オフライン版へのアップグレードはいつでも可能",
    ],
    onlineMinNote: "※最低3ヶ月契約から",
    onlineCta: "オンライン版に申し込む",
    guaranteeLabel: "Money-Back Guarantee",
    guaranteeTitle: "使えるようにならなかったら、\n全額返金します。",
    guaranteeDesc: "プライベートスクールでは、開始3ヶ月経過時点で「Claudeを実務で使いこなせている」と実感できない場合、受講料を全額返金します。",
    guaranteeDisclaimer: "※ 所定の課題提出・セッション出席など最低限の条件を満たしていただくことが前提です（詳細は契約時にご確認ください）。",
    curriculumLabel: "Curriculum",
    curriculumTitle: "スクールで学べること",
    curriculum: [
      { num: "01", title: "Claudeの原則", en: "Fundamentals", desc: "他のAIとの違い、得意・不得意、指示の出し方など、経営者がまず押さえるべき思考の型を習得します。" },
      { num: "02", title: "経営業務への応用", en: "Executive Use", desc: "事業計画のレビュー、会議前ブリーフ、採用面接の質問設計、投資家向け資料のブラッシュアップなど。" },
      { num: "03", title: "Claude Code 実践", en: "Claude Code", desc: "コーディングだけでなく、社内データ分析や調査タスクを「自律的に実行させる」レベルまで引き上げます。" },
      { num: "04", title: "Projects と MCP", en: "Advanced", desc: "社内ナレッジの取り込み、外部ツール連携、データベース接続など、一段上のセットアップを構築します。" },
      { num: "05", title: "チーム展開の設計", en: "Team Rollout", desc: "自分で使えるようになった上で、役員・部門長への展開設計から組織導入まで一貫支援します。" },
    ],
    faqLabel: "FAQ",
    faqTitle: "よくあるご質問",
    faq: [
      { q: "オフライン版とオンライン版の違いは？", a: "オフライン版（月10万円）は月2回の対面マンツーマンレッスン、オンライン版（月5万円）は初期セットアップガイド＋SNS/チャットサポートで、途中でオフライン版へのアップグレードも可能です。" },
      { q: "料金以外に費用はかかりますか？", a: "初期費用・教材費は不要で月額料金（税抜）のみですが、Claudeのサブスクリプション費用は各社で別途ご契約いただきます。" },
      { q: "全額返金の条件を教えてください。", a: "オフライン版で開始から3ヶ月時点で「実務で使いこなせている」と実感できない場合に全額返金します（所定のレッスン出席・課題取り組みが条件）。" },
      { q: "AI初心者でも大丈夫ですか？", a: "むしろAI初心者の経営者が最も成長を実感しており、ITに詳しくない方でもマンツーマンで伴走するため安心です。" },
      { q: "オフライン版はどこで受けられますか？", a: "東京・水戸を中心に経営者のご都合に合わせて月2回お伺いしますので、その他のエリアもお気軽にご相談ください。" },
      { q: "他社のAI（ChatGPT等）も扱いますか？", a: "スクール内ではClaudeに集中しますが、比較観点での他社モデル解説は行います。" },
    ],
    ctaLabel: "Contact",
    ctaTitle: "Claudeで、経営を一段進める。",
    ctaDesc: "30分の無料面談で、貴社にフィットする支援形態をご提案します。",
    ctaButton: "無料で相談する",
  },
  en: {
    pageKicker: "Claude Specialized",
    pageTitle: "Claude Specialist Support",
    pageDesc: "One-on-one coaching for executives focused entirely on Anthropic's Claude, offered in two formats — in-person sessions (Offline, ¥100,000/month) and online chat support (Online, ¥50,000/month) — with a full refund if you don't master it.",
    pageImgAlt: "",
    whyLabel: "Why Claude",
    whyTitle: "Why focus exclusively on Claude?",
    whyDesc: "Claude leads the world in writing quality, code generation, and long-context understanding, and while Claude Code has dramatically expanded what you can delegate to AI, unlocking its full potential requires the right approach — which is exactly what clearAI, as a dedicated Claude specialist team, delivers.",
    whyCards: [
      { title: "World-class language ability", desc: "Japanese reading, writing, and summarization at the highest level of reliability today — ideal for meeting notes, contract reviews, and internal documents." },
      { title: "The power of Claude Code", desc: "Beyond coding — the only AI you can use as an autonomous partner for data wrangling, research, and verification tasks." },
      { title: "Safety and transparency", desc: "Anthropic's policies align well with corporate information governance, making Claude a safe choice for Japanese enterprises that prioritize compliance." },
    ],
    servicesLabel: "Services",
    servicesTitle: "Two service formats",
    offlineTag: "OFFLINE / In-Person",
    offlineTitle: "Offline Plan (In-Person One-on-One)",
    offlineDesc: "Two in-person sessions per month using your real business challenges as the curriculum, guiding you hands-on until you can command Claude with confidence.",
    offlinePrice: "¥100,000",
    offlinePriceUnit: "/ month",
    offlineGuaranteeNote: "Full refund if you don't achieve proficiency",
    offlineFeatures: [
      "2 in-person one-on-one sessions per month (60 min each)",
      "Hands-on practice using your actual business challenges",
      "Mastery of advanced features: Claude Code, Projects, MCP",
      "Dedicated Slack channel for questions between sessions",
      "Full refund if not satisfied with results after 3 months",
    ],
    offlineMinNote: "* Minimum 3-month contract",
    offlineCta: "Enroll in the Offline Plan",
    onlineTag: "ONLINE / Remote",
    onlineTitle: "Online Plan (Chat Support)",
    onlineDesc: "No in-person sessions — initial setup guidance plus ongoing Q&A via chat for executives who want to learn Claude at their own pace.",
    onlinePrice: "¥50,000",
    onlinePriceUnit: "/ month",
    onlineSubNote: "No in-person sessions · online support only",
    onlineFeatures: [
      "Initial setup guide (environment setup and configuration walkthrough)",
      "Ongoing Q&A support via chat",
      "Explanations of key features: Claude Code, Projects, MCP",
      "Practical templates and prompt library",
      "Upgrade to the Offline Plan at any time",
    ],
    onlineMinNote: "* Minimum 3-month contract",
    onlineCta: "Enroll in the Online Plan",
    guaranteeLabel: "Money-Back Guarantee",
    guaranteeTitle: "If you don't master it,\nwe refund every yen.",
    guaranteeDesc: "In the private school, if you don't feel that you are using Claude productively in real work by the 3-month mark, we will refund your full tuition.",
    guaranteeDisclaimer: "* Subject to minimum conditions including session attendance and assigned exercises; full terms confirmed at contract signing.",
    curriculumLabel: "Curriculum",
    curriculumTitle: "What you'll learn",
    curriculum: [
      { num: "01", title: "Claude fundamentals", en: "Fundamentals", desc: "How Claude differs from other AI, what it excels and struggles at, and how to give effective instructions — the mental model every executive needs first." },
      { num: "02", title: "Executive applications", en: "Executive Use", desc: "Business plan reviews, pre-meeting briefs, interview question design, polishing investor materials, and more." },
      { num: "03", title: "Claude Code in practice", en: "Claude Code", desc: "Beyond coding — we bring you to the level where you can have Claude autonomously run in-house data analysis and research tasks." },
      { num: "04", title: "Projects & MCP", en: "Advanced", desc: "Ingesting internal knowledge, connecting external tools, and linking databases — building a more powerful setup." },
      { num: "05", title: "Team rollout design", en: "Team Rollout", desc: "Once you've mastered it yourself, we help you design the rollout to executives and department heads for organization-wide adoption." },
    ],
    faqLabel: "FAQ",
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "What is the difference between the Offline and Online plans?", a: "The Offline plan (¥100,000/month) delivers two dedicated in-person sessions per month, while the Online plan (¥50,000/month) provides an initial setup guide plus ongoing chat support — with a free upgrade to Offline available any time." },
      { q: "Are there any costs beyond the monthly fee?", a: "No setup fees or materials costs — the monthly fee (excl. tax) is all you pay, with your Claude subscription contracted separately by your company." },
      { q: "What are the conditions for the full refund?", a: "For the Offline plan, if at the 3-month mark you don't feel you're using Claude productively in real work, we refund in full — provided you attended the scheduled sessions and completed the assigned exercises." },
      { q: "Is this suitable for someone new to AI?", a: "Executives who are new to AI tend to see the most dramatic growth, and one-on-one coaching means you're never on your own even if you're not technical." },
      { q: "Where are the Offline sessions held?", a: "We primarily serve Tokyo and Mito, Ibaraki, visiting twice a month at the executive's convenience — other areas are also available on request." },
      { q: "Do you cover other AI tools like ChatGPT?", a: "The school stays focused on Claude, but we do provide comparative overviews of other models for context." },
    ],
    ctaLabel: "Contact",
    ctaTitle: "Take your business further with Claude.",
    ctaDesc: "In a free 30-minute consultation, we'll recommend the plan that fits your company.",
    ctaButton: "Book a free consultation",
  },
};

export default function ClaudePage() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  return (
    <>
      {/* PAGE HEADER */}
      <section className="pt-24 pb-10 lg:pt-28 lg:pb-12 bg-white border-b border-gray-100">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <p className="text-sm font-semibold text-neutral-900 mb-3">{t.pageKicker}</p>
          <div className="flex items-center gap-3 mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/claude-symbol.svg" alt={t.pageImgAlt} aria-hidden="true" className="w-8 h-8 lg:w-10 lg:h-10" />
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">{t.pageTitle}</h1>
          </div>
          <p className="text-base text-gray-600 leading-relaxed w-full">{t.pageDesc}</p>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-14 lg:py-20 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.servicesLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-8">{t.servicesTitle}</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Offline */}
            <Reveal>
              <div className="rounded-lg border-2 border-neutral-900 bg-neutral-50 p-8 lg:p-10 h-full flex flex-col shadow-xl">
                <span className="inline-block rounded-md bg-neutral-900 text-white px-3 py-1 text-xs font-bold tracking-widest mb-6 self-start">{t.offlineTag}</span>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{t.offlineTitle}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">{t.offlineDesc}</p>
                <div className="bg-white rounded-lg border border-neutral-200 p-5 mb-6">
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-3xl font-bold text-gray-900">{t.offlinePrice}</span>
                    <span className="text-sm text-gray-500">{t.offlinePriceUnit}</span>
                  </div>
                  <p className="text-xs text-neutral-900 font-semibold">{t.offlineGuaranteeNote}</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {t.offlineFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-neutral-900" />
                      <span className="text-sm text-gray-700">{f}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-center text-neutral-900 mb-3">{t.offlineMinNote}</p>
                <a href="https://buy.stripe.com/aFafZafg8daw8iKexKd7q02" className="block text-center text-sm font-semibold py-3.5 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 transition-all duration-300 mt-auto">{t.offlineCta}</a>
              </div>
            </Reveal>

            {/* Online */}
            <Reveal delay={150}>
              <div className="rounded-lg border border-gray-200 bg-white p-8 lg:p-10 h-full flex flex-col hover:shadow-lg transition-all duration-300">
                <span className="inline-block rounded-md bg-neutral-100 text-neutral-900 px-3 py-1 text-xs font-bold tracking-widest mb-6 self-start">{t.onlineTag}</span>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{t.onlineTitle}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">{t.onlineDesc}</p>
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-6">
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-3xl font-bold text-gray-900">{t.onlinePrice}</span>
                    <span className="text-sm text-gray-500">{t.onlinePriceUnit}</span>
                  </div>
                  <p className="text-xs text-gray-500">{t.onlineSubNote}</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {t.onlineFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-neutral-900" />
                      <span className="text-sm text-gray-700">{f}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-center text-gray-500 mb-3">{t.onlineMinNote}</p>
                <a href="https://buy.stripe.com/14AfZa2tm5I4dD4gFSd7q03" className="block text-center text-sm font-semibold py-3.5 rounded-lg border border-neutral-300 text-neutral-900 hover:bg-neutral-50 transition-all duration-300 mt-auto">{t.onlineCta}</a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHY CLAUDE */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.whyLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-snug mb-6 w-full">{t.whyTitle}</h2>
            <p className="text-base text-gray-600 leading-relaxed w-full mb-8">{t.whyDesc}</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.whyCards.map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="rounded-lg border border-gray-200 bg-white p-8 hover:border-neutral-300 hover:shadow-lg transition-all duration-300 h-full">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="rounded-lg bg-neutral-900 text-white p-10 lg:p-14 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-white/10 blur-3xl" />
              <div className="relative">
                <p className="text-sm font-semibold tracking-widest uppercase mb-4 opacity-90">{t.guaranteeLabel}</p>
                <h2 className="text-3xl lg:text-4xl font-bold leading-tight mb-6 whitespace-pre-line">{t.guaranteeTitle}</h2>
                <p className="text-sm lg:text-base leading-relaxed opacity-90 mb-2">{t.guaranteeDesc}</p>
                <p className="text-xs opacity-75">{t.guaranteeDisclaimer}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CURRICULUM */}
      <section className="py-14 lg:py-20 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.curriculumLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-8">{t.curriculumTitle}</h2>
          </Reveal>
          {t.curriculum.map((step, i) => (
            <Reveal key={step.num} delay={i * 100}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-10 border-b border-gray-200 last:border-0">
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
            <a href="/contact" className="rounded-lg bg-neutral-900 text-white font-semibold px-10 py-4 hover:bg-neutral-800 transition-colors duration-300 inline-block">{t.ctaButton}</a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

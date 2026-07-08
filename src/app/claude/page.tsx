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
      <h2 className={`mt-8 text-[20px] sm:text-2xl lg:text-3xl font-bold leading-[1.15] sm:leading-[1.05] tracking-[-0.02em] text-balance whitespace-pre-line ${dark ? "text-white" : "text-neutral-900"}`}>
        {title}
      </h2>
      {desc && <p className={`mt-6 text-[15px] leading-relaxed text-pretty ${dark ? "text-neutral-400" : "text-neutral-600"}`}>{desc}</p>}
    </Reveal>
  );
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
      {/* MASTHEAD */}
      <section className="bg-white pt-32 lg:pt-40 pb-14 lg:pb-20 border-b border-neutral-900">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            {/* technical meta bar */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-neutral-900 pb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
              <span className="font-bold text-neutral-900">§00</span>
              <span>{t.pageKicker}</span>
              <span className="text-neutral-300">/</span>
              <span>Anthropic</span>
              <span className="text-neutral-300">/</span>
              <span>Claude&nbsp;Code</span>
              <span className="text-neutral-300">/</span>
              <span>Executive</span>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <div className="mt-10 flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/claude-symbol.svg" alt={t.pageImgAlt} aria-hidden="true" className="w-9 h-9 lg:w-12 lg:h-12 shrink-0" />
              <h1 className="text-[8vw] sm:text-4xl lg:text-5xl font-bold leading-[0.95] tracking-[-0.04em] text-balance text-neutral-900">
                {t.pageTitle}
              </h1>
            </div>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-8 max-w-3xl text-base lg:text-lg leading-relaxed text-pretty text-neutral-600">{t.pageDesc}</p>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 lg:py-28 bg-neutral-50 border-b border-neutral-900">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="01" kicker={t.servicesLabel} title={t.servicesTitle} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            {/* Offline — primary spec cell */}
            <Reveal>
              <div className="flex h-full flex-col border border-neutral-900 bg-white">
                <div className="flex items-center justify-between border-b border-neutral-900 bg-neutral-900 px-6 py-3">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white">{t.offlineTag}</span>
                  <span className="font-mono text-[10px] tabular-nums text-neutral-400">PLAN.01</span>
                </div>
                <div className="flex flex-1 flex-col p-7 lg:p-8">
                  <h3 className="text-xl font-bold tracking-tight text-balance text-neutral-900 mb-2">{t.offlineTitle}</h3>
                  <p className="text-sm leading-relaxed text-pretty text-neutral-600 mb-6">{t.offlineDesc}</p>
                  <div className="border border-neutral-900 p-5 mb-6">
                    <div className="flex items-baseline gap-1.5 mb-2">
                      <span className="font-mono text-3xl font-bold tabular-nums text-neutral-900">{t.offlinePrice}</span>
                      <span className="font-mono text-sm text-neutral-500">{t.offlinePriceUnit}</span>
                    </div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-neutral-900 font-bold">{t.offlineGuaranteeNote}</p>
                  </div>
                  <ul className="space-y-2.5 mb-6 flex-1 font-mono">
                    {t.offlineFeatures.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-neutral-600">
                        <span className="flex-shrink-0 text-neutral-900">→</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-neutral-500 mb-4">{t.offlineMinNote}</p>
                  <a href="https://buy.stripe.com/aFafZafg8daw8iKexKd7q02" className="group inline-flex items-center justify-center gap-3 border border-neutral-900 bg-neutral-900 px-6 py-3.5 font-mono text-sm font-bold uppercase tracking-[0.08em] text-white transition-[color,background-color,border-color,scale] duration-300 hover:bg-white hover:text-neutral-900 active:scale-[0.96] mt-auto">
                    {t.offlineCta}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Online — secondary spec cell */}
            <Reveal delay={150}>
              <div className="flex h-full flex-col border border-neutral-900 bg-white">
                <div className="flex items-center justify-between border-b border-neutral-900 px-6 py-3">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-900">{t.onlineTag}</span>
                  <span className="font-mono text-[10px] tabular-nums text-neutral-400">PLAN.02</span>
                </div>
                <div className="flex flex-1 flex-col p-7 lg:p-8">
                  <h3 className="text-xl font-bold tracking-tight text-balance text-neutral-900 mb-2">{t.onlineTitle}</h3>
                  <p className="text-sm leading-relaxed text-pretty text-neutral-600 mb-6">{t.onlineDesc}</p>
                  <div className="border border-neutral-300 p-5 mb-6">
                    <div className="flex items-baseline gap-1.5 mb-2">
                      <span className="font-mono text-3xl font-bold tabular-nums text-neutral-900">{t.onlinePrice}</span>
                      <span className="font-mono text-sm text-neutral-500">{t.onlinePriceUnit}</span>
                    </div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-neutral-500">{t.onlineSubNote}</p>
                  </div>
                  <ul className="space-y-2.5 mb-6 flex-1 font-mono">
                    {t.onlineFeatures.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-neutral-600">
                        <span className="flex-shrink-0 text-neutral-900">→</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-neutral-500 mb-4">{t.onlineMinNote}</p>
                  <a href="https://buy.stripe.com/14AfZa2tm5I4dD4gFSd7q03" className="group inline-flex items-center justify-center gap-3 border border-neutral-900 bg-white px-6 py-3.5 font-mono text-sm font-bold uppercase tracking-[0.08em] text-neutral-900 transition-[color,background-color,border-color,scale] duration-300 hover:bg-neutral-900 hover:text-white active:scale-[0.96] mt-auto">
                    {t.onlineCta}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHY CLAUDE */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="02" kicker={t.whyLabel} title={t.whyTitle} desc={t.whyDesc} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {t.whyCards.map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="group h-full border border-neutral-900 bg-white p-7 lg:p-8 transition-colors duration-300 hover:bg-neutral-900">
                  <div className="mb-6 flex items-baseline justify-between border-b border-neutral-200 pb-4 transition-colors duration-300 group-hover:border-neutral-700">
                    <span className="font-mono text-2xl font-bold tabular-nums text-neutral-900 transition-colors duration-300 group-hover:text-white">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">Why / {String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mb-3 text-lg lg:text-xl font-bold tracking-tight text-balance text-neutral-900 transition-colors duration-300 group-hover:text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-pretty text-neutral-600 transition-colors duration-300 group-hover:text-neutral-300">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="py-20 lg:py-28 bg-neutral-950">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="03" kicker={t.guaranteeLabel} title={t.guaranteeTitle} desc={t.guaranteeDesc} dark />
          <Reveal delay={120}>
            <div className="max-w-3xl border-t border-white/25 pt-6">
              <p className="font-mono text-[11px] leading-relaxed text-pretty text-neutral-400">{t.guaranteeDisclaimer}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CURRICULUM */}
      <section className="py-20 lg:py-28 bg-neutral-50 border-y border-neutral-900">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="04" kicker={t.curriculumLabel} title={t.curriculumTitle} />
          {/* table header */}
          <div className="hidden lg:grid grid-cols-12 gap-6 border-b border-neutral-900 pb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
            <div className="col-span-1">No.</div>
            <div className="col-span-3">Module</div>
            <div className="col-span-8">Detail</div>
          </div>
          {t.curriculum.map((step, i) => (
            <Reveal key={step.num} delay={i * 100}>
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
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="05" kicker={t.faqLabel} title={t.faqTitle} />
          <div className="max-w-3xl border-t border-neutral-900">
            {t.faq.map((item, i) => (
              <Reveal key={i} delay={i * 80}>
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
              <span className="font-bold text-white">§06</span>
              <span>{t.ctaLabel}</span>
            </div>
            <div className="mt-12 grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <h2 className="text-[20px] sm:text-2xl lg:text-3xl font-bold leading-[1.15] sm:leading-[1.05] tracking-[-0.02em] text-balance text-white">{t.ctaTitle}</h2>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-pretty text-neutral-400">{t.ctaDesc}</p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <a
                  href="/reserve"
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

"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import PricingCarousel from "@/components/PricingCarousel";
import CardCarousel from "@/components/CardCarousel";
import { BOOKING_URL } from "@/lib/booking";

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

const DEVELOPMENT_AREA_IMAGES = [
  {
    src: "/images/generated-pages/development-requirements-20260809.webp",
    alt: { ja: "顧客の業務フローを整理するシステム開発の要件定義", en: "A requirements workshop mapping the client's business workflow" },
  },
  {
    src: "/images/generated-pages/development-code-review-20260809.webp",
    alt: { ja: "開発中のシステムを複数人でレビューするエンジニア", en: "Engineers reviewing a system together during development" },
  },
  {
    src: "/images/generated-pages/development-release-20260809.webp",
    alt: { ja: "システムのリリースと運用状況を確認する開発チーム", en: "A development team checking release and production operations" },
  },
  {
    src: "/images/generated-trust/dev-mobile-testing.webp",
    alt: { ja: "モバイルとパソコンで画面設計を確認する開発作業", en: "Reviewing an application design across mobile and desktop" },
  },
  {
    src: "/images/generated-trust/dev-architecture.webp",
    alt: { ja: "既存システムとの連携構成をホワイトボードで設計する様子", en: "Designing an integration architecture with existing systems" },
  },
  {
    src: "/images/generated-trust/home-system-monitoring.webp",
    alt: { ja: "本番システムの稼働状況を監視する運用担当者", en: "An operator monitoring a production system" },
  },
] as const;

type Copy = {
  heroKicker: string;
  heroTitle: string;
  heroDesc: string;
  heroCta: string;
  heroCta2: string;
  stats: { value: string; label: string }[];
  aboutLabel: string;
  aboutTitle: string;
  aboutDesc: string;
  pricingLabel: string;
  pricingTitle: string;
  pricingDesc: string;
  plans: { name: string; price: string; unit: string; desc: string; features: string[]; featured: boolean }[];
  planCta: string;
  areasLabel: string;
  areasTitle: string;
  areas: { num: string; title: string; desc: string }[];
  whyLabel: string;
  whyTitle: string;
  why: { num: string; title: string; desc: string }[];
  processLabel: string;
  processTitle: string;
  process: { num: string; title: string; en: string; desc: string }[];
  techLabel: string;
  techTitle: string;
  techDesc: string;
  techGroups: { category: string; label: string; items: { name: string; icon: string; color?: string }[] }[];
  faqLabel: string;
  faqTitle: string;
  faq: { q: string; a: string }[];
  ctaKicker: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaButton: string;
};

const TECH_GROUPS_JA: Copy["techGroups"] = [
  { category: "Frontend", label: "フロントエンド", items: [
    { name: "Next.js", icon: "logos:nextjs-icon" },
    { name: "React", icon: "logos:react" },
    { name: "TypeScript", icon: "logos:typescript-icon" },
    { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
    { name: "Vite", icon: "logos:vitejs" },
  ]},
  { category: "Backend", label: "バックエンド", items: [
    { name: "Python", icon: "logos:python" },
    { name: "Node.js", icon: "logos:nodejs-icon" },
    { name: "FastAPI", icon: "logos:fastapi-icon" },
    { name: "Go", icon: "simple-icons:go", color: "111827" },
    { name: "Rails", icon: "simple-icons:rubyonrails", color: "111827" },
  ]},
  { category: "AI / ML", label: "AI・機械学習", items: [
    { name: "Claude", icon: "simple-icons:anthropic", color: "111827" },
    { name: "OpenAI", icon: "simple-icons:openai", color: "000000" },
    { name: "Gemini", icon: "simple-icons:googlegemini", color: "111827" },
    { name: "PyTorch", icon: "logos:pytorch-icon" },
    { name: "LangChain", icon: "simple-icons:langchain", color: "1C3C3C" },
  ]},
  { category: "Mobile / Desktop", label: "モバイル・デスクトップ", items: [
    { name: "Swift", icon: "logos:swift" },
    { name: "iOS / macOS", icon: "simple-icons:apple", color: "111827" },
    { name: "Electron", icon: "logos:electron" },
    { name: "Kotlin", icon: "logos:kotlin-icon" },
    { name: "Android", icon: "logos:android-icon" },
  ]},
  { category: "Database", label: "データベース", items: [
    { name: "PostgreSQL", icon: "logos:postgresql" },
    { name: "MySQL", icon: "logos:mysql-icon" },
    { name: "Redis", icon: "logos:redis" },
    { name: "Supabase", icon: "logos:supabase-icon" },
    { name: "Firebase", icon: "logos:firebase-icon" },
  ]},
  { category: "Cloud", label: "クラウド・インフラ", items: [
    { name: "AWS", icon: "logos:aws" },
    { name: "Google Cloud", icon: "logos:google-cloud" },
    { name: "Vercel", icon: "logos:vercel-icon" },
    { name: "Cloudflare", icon: "logos:cloudflare-icon" },
    { name: "Docker", icon: "logos:docker-icon" },
  ]},
  { category: "Business Integrations", label: "業務連携・コラボレーション", items: [
    { name: "Salesforce", icon: "logos:salesforce" },
    { name: "Slack", icon: "logos:slack-icon" },
    { name: "Microsoft 365", icon: "logos:microsoft-icon" },
    { name: "Notion", icon: "logos:notion-icon" },
    { name: "Jira", icon: "logos:jira" },
  ]},
];

const TECH_GROUPS_EN: Copy["techGroups"] = TECH_GROUPS_JA.map((g) => ({
  ...g,
  label: g.category === "Mobile / Desktop" ? "Mobile & Desktop"
    : g.category === "Frontend" ? "Frontend"
    : g.category === "Backend" ? "Backend"
    : g.category === "AI / ML" ? "AI / ML"
    : g.category === "Database" ? "Database"
    : g.category === "Cloud" ? "Cloud & Infra"
    : "Business Integrations",
}));

const COPY: Record<"ja" | "en", Copy> = {
  ja: {
    heroKicker: "System & Software Development",
    heroTitle: "システム・ソフトウェア開発",
    heroDesc: "AIを組み込んだ業務システムを、要件定義から設計・開発・本番運用まで受託で一貫してお引き受けします。",
    heroCta: "開発の相談をする",
    heroCta2: "ご提供プランを見る",
    stats: [
      { value: "受託開発", label: "要件定義から運用まで一貫" },
      { value: "最短2週間", label: "動くプロトタイプを提出" },
      { value: "AI組込", label: "設計段階から前提にする" },
      { value: "2営業日", label: "初回返信" },
    ],
    aboutLabel: "About",
    aboutTitle: "仕様書ではなく、\n動くシステムを納品します。",
    aboutDesc: "「AIで何かしたいが、何を作ればいいかわからない」という段階からご相談いただけます。業務のヒアリングと要件定義から着手し、最短2週間で動くプロトタイプをお見せしたうえで、本番稼働・運用保守まで責任を持ってお引き受けします。",
    pricingLabel: "Pricing",
    pricingTitle: "ご提供プラン",
    pricingDesc: "開発規模・要件によって費用が大きく変わるため、金額は一律で個別お見積りとしています。概算だけ知りたい段階でもお気軽にご相談ください。",
    plans: [
      { name: "プロトタイプ開発", price: "要見積", unit: "", desc: "アイデアを短期間で動くものにし、投資判断できる状態にします。", features: ["要件ヒアリング・スコープ確定", "動くプロトタイプの構築", "技術選定・構成図の提示", "そのまま本番化できる設計"], featured: false },
      { name: "業務システム受託開発", price: "要見積", unit: "", desc: "要件定義から設計・実装・テスト・本番リリースまで一括で担います。", features: ["業務フロー整理・要件定義", "設計・実装・テスト", "既存システム／SaaS連携", "本番リリース・データ移行", "運用手順書・引き継ぎ資料"], featured: true },
      { name: "継続開発・運用保守", price: "要見積", unit: "", desc: "リリース後の改善・監視・機能追加を継続的に担当します。", features: ["機能追加・改善の継続開発", "障害対応・監視", "インフラ運用・コスト最適化", "社内エンジニアへの引き継ぎ支援"], featured: false },
    ],
    planCta: "見積を依頼する",
    areasLabel: "Development Areas",
    areasTitle: "開発できるもの",
    areas: [
      { num: "01", title: "AI組込業務システム", desc: "申請・管理・集計といった社内業務システムに、生成AIによる自動入力・要約・判定を組み込んで開発します。" },
      { num: "02", title: "AIエージェント開発", desc: "問い合わせ対応・書類作成・情報収集などを自律的に処理するAIエージェントを設計・開発し、実際の業務フローに組み込みます。" },
      { num: "03", title: "Webアプリケーション", desc: "Next.js + Vercelを中心に、社内ツールから顧客向けサービスまで、後から拡張できる構成でWebアプリを開発します。" },
      { num: "04", title: "モバイル・デスクトップアプリ", desc: "iOS・macOSはSwift、WindowsはElectronなど、プラットフォーム標準の技術でネイティブ品質のアプリを開発します。" },
      { num: "05", title: "既存システム連携・API開発", desc: "ERP・CRM・SaaS・基幹システムとのAPI連携やデータ統合を設計し、既存資産を活かしたまま新しい機能を足します。" },
      { num: "06", title: "インフラ・運用保守", desc: "AWS・Google Cloud・Vercel上での構築からCI/CD、監視、コスト最適化まで、リリース後に壊れない体制を整えます。" },
    ],
    whyLabel: "Why Us",
    whyTitle: "受託先としてClearAIを選ぶ理由",
    why: [
      { num: "01", title: "AIを前提に設計する", desc: "後付けではなく、要件定義の段階から「どこにAIを使うと効くか」を設計に織り込みます。" },
      { num: "02", title: "提案で終わらせない", desc: "戦略や資料だけで終わらせず、実際にコードを書いて本番稼働まで持っていくのが標準です。" },
      { num: "03", title: "小さく作って早く見せる", desc: "仕様書の読み合わせではなく、動く実物を早期にお見せして意思決定していただきます。" },
      { num: "04", title: "引き継げる形で残す", desc: "属人化しない構成とドキュメントで納品し、貴社が自走できる状態を目指します。" },
    ],
    processLabel: "Process",
    processTitle: "開発の流れ",
    process: [
      { num: "01", title: "ヒアリング・要件定義", en: "Requirements", desc: "現場の業務フローと課題を伺い、何を作るべきかを整理します。要件が固まっていない段階からご相談いただけます。" },
      { num: "02", title: "設計・お見積り", en: "Design", desc: "システム構成・技術選定・スケジュールを設計し、スコープを明確にしたうえでお見積りをご提示します。" },
      { num: "03", title: "プロトタイプ", en: "Prototype", desc: "最短2週間で動くプロトタイプを構築し、実物を触っていただいたうえで仕様を確定します。" },
      { num: "04", title: "開発・テスト", en: "Development", desc: "短いサイクルで実装と確認を繰り返し、既存システムとの連携やテストまで一貫して対応します。" },
      { num: "05", title: "リリース・運用保守", en: "Operation", desc: "本番リリースとデータ移行を行い、その後の監視・障害対応・機能追加まで継続的に担当します。" },
    ],
    techLabel: "Tech Stack",
    techTitle: "使用技術",
    techDesc: "実績・安定性・サポート体制が確立された技術を軸に採用し、記載以外の言語・フレームワークにも貴社の既存環境に合わせて対応します。",
    techGroups: TECH_GROUPS_JA,
    faqLabel: "FAQ",
    faqTitle: "よくあるご質問",
    faq: [
      { q: "要件が固まっていない状態でも相談できますか？", a: "はい。「何を作るべきか」の整理から一緒に行い、要件定義そのものもお引き受けしますので、構想段階でお声がけください。" },
      { q: "開発期間はどのくらいですか？", a: "プロトタイプは2〜4週間、業務システムの本番リリースは3〜6ヶ月が目安で、スコープと連携先の数により変動します。" },
      { q: "費用感を教えてください。", a: "要件・規模で大きく変わるため個別お見積りとしており、ヒアリング後に概算レンジと内訳をご提示します。" },
      { q: "既存システムと連携できますか？", a: "ERP・CRM・SaaS・基幹システムとのAPI連携やデータ移行を前提に設計しますので、既存環境をそのまま活かせます。" },
      { q: "納品物の権利はどうなりますか？", a: "ソースコードを含む納品物の権利範囲は契約時に取り決め、お客様への譲渡を含めて柔軟に対応します。" },
      { q: "リリース後の保守もお願いできますか？", a: "継続開発・運用保守として、機能追加・障害対応・インフラ運用まで継続的にお引き受けします。" },
      { q: "社内に開発できる人がいなくても大丈夫ですか？", a: "問題ありません。運用手順書と引き継ぎを前提に設計し、必要に応じて内製化研修も組み合わせられます。" },
    ],
    ctaKicker: "Contact",
    ctaTitle: "作りたいものを、聞かせてください。",
    ctaDesc: "「これはシステムで解決できるのか」という段階でも構いません。実現可能性と概算の進め方を、率直にお伝えします。",
    ctaButton: "開発の相談をする",
  },
  en: {
    heroKicker: "System & Software Development",
    heroTitle: "System & Software Development",
    heroDesc: "We build AI-embedded business systems on a contract basis — owning everything from requirements definition through design, development, and production operations.",
    heroCta: "Discuss your project",
    heroCta2: "See plans",
    stats: [
      { value: "Full contract", label: "Requirements to operations" },
      { value: "From 2 weeks", label: "To a working prototype" },
      { value: "AI-embedded", label: "Designed in from the start" },
      { value: "2 biz days", label: "First response" },
    ],
    aboutLabel: "About",
    aboutTitle: "We deliver working systems,\nnot specification documents.",
    aboutDesc: "You can come to us at the stage of \"we want to use AI but don't know what to build.\" We start from interviews and requirements definition, show you a working prototype in as little as two weeks, and then own the build through production launch and ongoing maintenance.",
    pricingLabel: "Pricing",
    pricingTitle: "Engagement models",
    pricingDesc: "Because cost varies widely with scope and requirements, every engagement is quoted individually. Feel free to reach out even if you only need a rough range.",
    plans: [
      { name: "Prototype build", price: "Custom quote", unit: "", desc: "Turn an idea into something that runs, so you can make an investment decision.", features: ["Requirements interview & scope definition", "A working prototype", "Technology selection & architecture diagram", "Built to become the production system"], featured: false },
      { name: "Contract system development", price: "Custom quote", unit: "", desc: "End-to-end ownership from requirements through design, implementation, testing, and launch.", features: ["Workflow mapping & requirements definition", "Design, implementation & testing", "Integration with existing systems / SaaS", "Production launch & data migration", "Runbooks & handover documentation"], featured: true },
      { name: "Ongoing development & maintenance", price: "Custom quote", unit: "", desc: "Continuous improvement, monitoring, and feature work after launch.", features: ["Ongoing feature development", "Incident response & monitoring", "Infrastructure operations & cost optimization", "Handover support for your engineers"], featured: false },
    ],
    planCta: "Request a quote",
    areasLabel: "Development Areas",
    areasTitle: "What we build",
    areas: [
      { num: "01", title: "AI-embedded business systems", desc: "We build internal systems for approvals, records, and reporting with generative AI handling data entry, summarization, and judgment calls." },
      { num: "02", title: "AI agent development", desc: "We design and build autonomous AI agents for inquiry handling, document drafting, and research — then embed them in your real workflows." },
      { num: "03", title: "Web applications", desc: "Centered on Next.js and Vercel, we build everything from internal tools to customer-facing services, on an architecture you can extend later." },
      { num: "04", title: "Mobile & desktop apps", desc: "Native-quality apps using each platform's standard stack — Swift for iOS and macOS, Electron for Windows." },
      { num: "05", title: "Integrations & API development", desc: "We design API integrations and data consolidation with your ERP, CRM, SaaS, and core systems, so new features build on existing assets." },
      { num: "06", title: "Infrastructure & maintenance", desc: "From provisioning on AWS, Google Cloud, and Vercel to CI/CD, monitoring, and cost optimization — so nothing breaks after launch." },
    ],
    whyLabel: "Why Us",
    whyTitle: "Why choose ClearAI as your development partner",
    why: [
      { num: "01", title: "AI designed in, not bolted on", desc: "From the requirements stage we work out where AI actually pays off and build that into the design." },
      { num: "02", title: "We don't stop at proposals", desc: "Strategy decks aren't the deliverable — writing the code and getting it into production is our standard." },
      { num: "03", title: "Build small, show it early", desc: "Instead of reviewing specification documents, you make decisions by using something that actually runs." },
      { num: "04", title: "Handover-ready by default", desc: "We deliver architecture and documentation that don't depend on any one person, so your team can take over." },
    ],
    processLabel: "Process",
    processTitle: "How we work",
    process: [
      { num: "01", title: "Interviews & requirements", en: "Requirements", desc: "We learn your workflows and pain points and work out what should be built — including when requirements aren't defined yet." },
      { num: "02", title: "Design & quote", en: "Design", desc: "We design the architecture, technology choices, and schedule, then quote against a clearly defined scope." },
      { num: "03", title: "Prototype", en: "Prototype", desc: "In as little as two weeks we build a working prototype, so specifications are finalized with something real in hand." },
      { num: "04", title: "Development & testing", en: "Development", desc: "Short build-and-review cycles, covering integration with existing systems and testing throughout." },
      { num: "05", title: "Launch & maintenance", en: "Operation", desc: "We handle production launch and data migration, then monitoring, incident response, and new features on an ongoing basis." },
    ],
    techLabel: "Tech Stack",
    techTitle: "Technologies we use",
    techDesc: "We build primarily on technologies with proven track records, stability, and strong support — and adapt to languages and frameworks beyond this list to fit your existing environment.",
    techGroups: TECH_GROUPS_EN,
    faqLabel: "FAQ",
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "Can we talk to you before requirements are defined?", a: "Yes — we work through what should be built with you and can take on the requirements definition itself, so reach out at the concept stage." },
      { q: "How long does development take?", a: "A prototype typically takes 2–4 weeks and a production business system 3–6 months, varying with scope and the number of integrations." },
      { q: "What does it cost?", a: "Every project is quoted individually since cost depends heavily on requirements and scale; after an interview we share a rough range and breakdown." },
      { q: "Can you integrate with our existing systems?", a: "We design for API integration and data migration with your ERP, CRM, SaaS, and core systems, so your current environment keeps working." },
      { q: "Who owns the deliverables?", a: "The scope of rights to deliverables, including source code, is agreed in the contract — assignment to you included." },
      { q: "Can you maintain the system after launch?", a: "Yes — as an ongoing engagement we handle feature work, incident response, and infrastructure operations." },
      { q: "What if we have no developers in-house?", a: "That's fine. We design with runbooks and handover in mind, and can combine the project with in-house enablement training." },
    ],
    ctaKicker: "Contact",
    ctaTitle: "Tell us what you want built.",
    ctaDesc: "Even \"can software actually solve this?\" is a fine place to start — we'll give you a straight answer on feasibility and a rough path forward.",
    ctaButton: "Discuss a project",
  },
};

export default function SoftwareDevelopmentPage() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  return (
    <>
      {/* PAGE HEADER — /robot-rental と同一の標準ヘッダー帯 */}
      <section className="pt-24 pb-4 lg:pt-28 lg:pb-5 bg-white border-b border-gray-100">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <p className="text-sm font-semibold text-neutral-900 mb-3">{t.heroKicker}</p>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">{t.heroTitle}</h1>
        </div>
      </section>

      {/* PLANS */}
      <section id="pricing" className="pt-6 pb-10 lg:pt-8 lg:pb-12 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.pricingLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.pricingTitle}</h2>
            <p className="text-base text-gray-500 leading-relaxed w-full mb-8">{t.pricingDesc}</p>
          </Reveal>
          <PricingCarousel>
            {t.plans.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 100} className="flex">
                <div className={`rounded-lg p-5 lg:p-6 transition-all duration-300 flex flex-col w-full ${plan.featured ? "bg-neutral-900 text-white shadow-xl" : "bg-white border border-gray-200 hover:shadow-lg"}`}>
                  {plan.featured && <span className="inline-block rounded-md bg-white/20 text-white px-3 py-1 text-sm font-semibold mb-3 self-start">Recommended</span>}
                  <h3 className={`text-base font-bold mb-1.5 ${plan.featured ? "text-white" : "text-gray-900"}`}>{plan.name}</h3>
                  <div className="mb-3 flex items-baseline gap-1">
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
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="block text-center text-sm font-semibold py-2 rounded-lg transition-all duration-300 mt-auto bg-cta text-white hover:bg-cta-hover">{t.planCta}</a>
                </div>
              </Reveal>
            ))}
          </PricingCarousel>
        </div>
      </section>

      {/* TRUST */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              {t.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center justify-center py-6 px-4 text-center">
                  <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                  <span className="text-xs text-gray-500 mt-1">{stat.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* DEVELOPMENT AREAS */}
      <section id="areas" className="py-14 lg:py-20 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.areasLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-8">{t.areasTitle}</h2>
          </Reveal>
          <CardCarousel gridClass="md:grid-cols-2 lg:grid-cols-3">
            {t.areas.map((item, i) => {
              const image = DEVELOPMENT_AREA_IMAGES[i];
              return (
                <Reveal key={`${item.num}-${i}`} delay={(i % 3) * 100} className="h-full">
                  <div className="h-full overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-300 hover:shadow-lg">
                    {image && (
                      <Image
                        src={image.src}
                        alt={image.alt[lang]}
                        width={1536}
                        height={1024}
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 88vw"
                        className="aspect-[3/2] w-full object-cover"
                      />
                    )}
                    <div className="p-6 lg:p-8">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-bold text-neutral-900 flex-shrink-0">{item.num}</span>
                        <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </CardCarousel>
        </div>
      </section>

      {/* DIFFERENTIATION */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.whyLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-8">{t.whyTitle}</h2>
          </Reveal>
          <CardCarousel gridClass="md:grid-cols-2">
            {t.why.map((item, i) => (
              <Reveal key={item.title} delay={i * 100} className="h-full">
                <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-8 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-semibold text-neutral-900 tracking-widest flex-shrink-0">{item.num}</span>
                    <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-14 lg:py-20 bg-gray-50">
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

      {/* TECH STACK */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.techLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.techTitle}</h2>
            <p className="text-base text-gray-500 w-full leading-relaxed mb-8">{t.techDesc}</p>
          </Reveal>
          <div className="space-y-0">
            {t.techGroups.map((group, gi) => (
              <Reveal key={group.category} delay={gi * 40}>
                <div className="border-t border-gray-200 py-5">
                  <div className="grid lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-2">
                      <p className="text-[10px] font-semibold tracking-widest text-neutral-900 uppercase">{group.category}</p>
                      <h3 className="text-sm font-bold text-gray-900 mt-0.5">{group.label}</h3>
                    </div>
                    <div className="lg:col-span-10">
                      <div className="grid grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
                        {group.items.map((tech) => (
                          <div key={tech.name} className="bg-white border border-gray-200 rounded-lg px-3.5 py-2 flex items-center gap-2.5 hover:border-gray-300 transition-colors">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={`https://api.iconify.design/${tech.icon}.svg${tech.color ? `?color=%23${tech.color}` : ''}`} alt={tech.name} className="w-8 h-8 object-contain" loading="lazy" />
                            <p className="text-xs font-medium text-gray-600 text-center leading-tight">{tech.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.faqLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-8">{t.faqTitle}</h2>
          </Reveal>
          <div>
            {t.faq.map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <details className="border-b border-gray-100 py-2.5 md:py-5 group">
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
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8 text-center">
          <Reveal>
            <Label>{t.ctaKicker}</Label>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.ctaTitle}</h2>
            <p className="text-base text-gray-600 leading-relaxed mb-10">{t.ctaDesc}</p>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-neutral-900 text-white font-semibold px-10 py-4 hover:bg-neutral-800 transition-colors duration-300 inline-block">{t.ctaButton}</a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

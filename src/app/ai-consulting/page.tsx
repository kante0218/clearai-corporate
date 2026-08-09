"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import PricingCarousel from "@/components/PricingCarousel";
import CardCarousel from "@/components/CardCarousel";

// 使用技術ロゴは public/logos/tech/ のself-host版を利用（ホームと同一・確実に色付き表示）
const techSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

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

type Copy = {
  heroKicker: string;
  heroTitle: string;
  heroDesc: string;
  stats: { value: string; label: string }[];
  aboutLabel: string;
  aboutTitle: string;
  aboutDesc: string;
  servicesLabel: string;
  servicesTitle: string;
  services: { num: string; title: string; desc: string; hoverBg: string }[];
  whyLabel: string;
  whyTitle: string;
  why: { num: string; title: string; desc: string }[];
  processLabel: string;
  processTitle: string;
  process: { num: string; title: string; en: string; desc: string }[];
  pricingLabel: string;
  pricingTitle: string;
  plans: { name: string; price: string; unit: string; desc: string; features: string[]; featured: boolean }[];
  planCta: string;
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

const COPY: Record<"ja" | "en", Copy> = {
  ja: {
    heroKicker: "AI Consulting & DX",
    heroTitle: "AIコンサルティング・DX",
    heroDesc: "戦略策定から開発・実装・運用まで、大手コンサルティングファーム出身者が監修し一気通貫でご支援します。",
    stats: [
      { value: "100+", label: "支援可能な業種" },
      { value: "4領域", label: "ワンストップ提供" },
      { value: "PoC→本番", label: "伴走支援" },
      { value: "2営業日", label: "初回返信" },
    ],
    aboutLabel: "About",
    aboutTitle: "AIは魔法ではなく、道具です。\n正しく使えば、確実に成果が出ます。",
    aboutDesc: "AIの専門知識がない企業でも安心して始められるよう、ヒアリングから運用定着まで伴走し、貴社の課題に合った地に足のついたAI活用を一緒に見つけていきます。",
    servicesLabel: "Service Areas",
    servicesTitle: "4つの支援領域",
    services: [
      { num: "01", title: "AI戦略策定", desc: "現状分析からROIを試算し、優先度の高い領域から着手する実行可能な導入ロードマップを立案します。", hoverBg: "hover:bg-neutral-50" },
      { num: "02", title: "データ分析・活用", desc: "社内データを棚卸・統合し、AIが活用できる分析基盤を構築します。", hoverBg: "hover:bg-neutral-50" },
      { num: "03", title: "業務自動化", desc: "カスタマーサポート・文書処理・データ入力など、繰り返しの多い業務をAIで自動化し人がやらなくていい仕事を解放します。", hoverBg: "hover:bg-neutral-50" },
      { num: "04", title: "生成AI活用", desc: "ChatGPT・Claudeなどの生成AIを業務フローに組み込み、社内ナレッジベース連携やカスタムチャットボット構築も対応します。", hoverBg: "hover:bg-neutral-50" },
    ],
    whyLabel: "Why Us",
    whyTitle: "なぜclearAIが選ばれるのか",
    why: [
      { num: "01", title: "課題ドリブン", desc: "流行ではなく、貴社の業務課題から逆算してAIを選定します。" },
      { num: "02", title: "技術選定に中立", desc: "特定ベンダー縛りなく、OpenAI・Anthropic・Google・オープンソースを横断比較します。" },
      { num: "03", title: "実装まで一気通貫", desc: "PoCから本番稼働・運用定着まで、戦略だけで終わらせません。" },
      { num: "04", title: "経営との対話", desc: "現場と経営層の両方の言葉で話せるためROI議論がスムーズです。" },
    ],
    processLabel: "Process",
    processTitle: "導入の流れ",
    process: [
      { num: "01", title: "ヒアリング", en: "Hearing", desc: "課題・目標の整理と現状分析、現場インタビューを通じて本当に効果が出る領域を特定します。" },
      { num: "02", title: "戦略提案", en: "Strategy", desc: "ROIを試算した具体的な導入計画と、実現可能なスケジュール・段階的なゴール設定をご提案します。" },
      { num: "03", title: "開発・実装", en: "Development", desc: "アジャイル開発でPoCを通じながら段階的に実装し、既存システムとの連携まで一貫して対応します。" },
      { num: "04", title: "運用・改善", en: "Operation", desc: "導入後の定着支援・KPI計測・社内トレーニングを通じ、自走できる体制づくりを支援します。" },
    ],
    pricingLabel: "Pricing",
    pricingTitle: "料金プラン",
    plans: [
      { name: "スポットコンサル", price: "50万円〜", unit: "/ 回", desc: "現状分析とAI活用の方向性をご提案。", features: ["現状ヒアリング（2時間）", "AI活用レポート作成", "導入ロードマップ素案", "2週間のメールサポート"], featured: false },
      { name: "スタンダード", price: "150万円〜", unit: "/ 月", desc: "PoCから本番実装まで伴走する導入支援。", features: ["月次ヒアリング・進捗会議", "AI戦略策定・設計", "PoC開発・検証", "本番実装・テスト", "社内トレーニング"], featured: true },
      { name: "エンタープライズ", price: "要相談", unit: "", desc: "大規模導入・複数部署展開に対応。", features: ["専任コンサルタント配置", "複数部署への横展開", "カスタムAI開発", "24/7サポート", "KPI計測・改善サイクル"], featured: false },
    ],
    planCta: "申し込む",
    techLabel: "Tech Stack",
    techTitle: "使用技術",
    techDesc: "中小企業でも安心して導入できるよう、実績・安定性・サポート体制が確立された技術のみを採用しています。",
    techGroups: [
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
      { category: "EC / Commerce", label: "EC・決済", items: [
        { name: "Shopify", icon: "logos:shopify" },
        { name: "Stripe", icon: "simple-icons:stripe", color: "111827" },
        { name: "Square", icon: "simple-icons:square", color: "000000" },
        { name: "WooCommerce", icon: "logos:woocommerce-icon" },
        { name: "Amazon Pay", icon: "simple-icons:amazonpay", color: "111827" },
      ]},
      { category: "Business Integrations", label: "業務連携・コラボレーション", items: [
        { name: "Salesforce", icon: "logos:salesforce" },
        { name: "Slack", icon: "logos:slack-icon" },
        { name: "Microsoft 365", icon: "logos:microsoft-icon" },
        { name: "Notion", icon: "logos:notion-icon" },
        { name: "Jira", icon: "logos:jira" },
      ]},
    ],
    faqLabel: "FAQ",
    faqTitle: "よくあるご質問",
    faq: [
      { q: "AIについての知識がなくても相談できますか？", a: "「AIの専門知識ゼロ」の企業様を最も得意としており、現状把握から一緒に取り組みますのでお気軽にご相談ください。" },
      { q: "どのくらいの期間でAI導入ができますか？", a: "PoCフェーズで1〜3ヶ月、本番実装で3〜6ヶ月が目安で、業務範囲と複雑性により変動します。" },
      { q: "費用感を教えてください。", a: "サービス内容・規模に応じて異なるため、ヒアリングの上で最適なプランと費用感をご提案いたします。" },
      { q: "特定のAIベンダーに縛られますか？", a: "ベンダーニュートラルな立場でOpenAI・Anthropic・Google・オープンソース（Llama等）を横断的に比較・選定します。" },
      { q: "既存システムとの連携は可能ですか？", a: "ERP・CRM・SaaS等、お使いのシステムとのAPI連携やデータ統合を前提に設計します。" },
      { q: "オンサイト対応はありますか？", a: "必要に応じて全国対応し、リモートとオンサイトを組み合わせた柔軟な進行が可能です。" },
    ],
    ctaKicker: "Contact",
    ctaTitle: "まずは、お話ししませんか。",
    ctaDesc: "「何から始めればいいかわからない」でも、まずは貴社の状況をお聞きして最適な進め方をご提案します。",
    ctaButton: "無料で相談する",
  },
  en: {
    heroKicker: "AI Consulting & DX",
    heroTitle: "AI Consulting & Digital Transformation",
    heroDesc: "End-to-end support from strategy through development, implementation, and operations, supervised by alumni of leading consulting firms.",
    stats: [
      { value: "100+", label: "Industries served" },
      { value: "4 domains", label: "One-stop delivery" },
      { value: "PoC→Prod", label: "Hands-on support" },
      { value: "2 biz days", label: "First response" },
    ],
    aboutLabel: "About",
    aboutTitle: "AI is a tool, not magic.\nUsed correctly, it delivers real results.",
    aboutDesc: "clearAI walks alongside you from the initial interview through to full operational adoption, helping even organizations with no AI expertise find practical solutions grounded in your actual business challenges.",
    servicesLabel: "Service Areas",
    servicesTitle: "Four areas of support",
    services: [
      { num: "01", title: "AI strategy", desc: "From current-state analysis to roadmap development, calculating ROI and drafting an actionable plan that starts with the highest-priority areas.", hoverBg: "hover:bg-neutral-50" },
      { num: "02", title: "Data analytics & activation", desc: "Auditing and consolidating internal data into an analytics foundation that AI can actually use.", hoverBg: "hover:bg-neutral-50" },
      { num: "03", title: "Process automation", desc: "Automating repetitive work — customer support, document processing, data entry — to free people from tasks that don't need a human touch.", hoverBg: "hover:bg-neutral-50" },
      { num: "04", title: "Generative AI integration", desc: "Embedding generative AI such as ChatGPT and Claude into your workflows, including internal knowledge-base integration and custom chatbot development.", hoverBg: "hover:bg-neutral-50" },
    ],
    whyLabel: "Why Us",
    whyTitle: "Why companies choose clearAI",
    why: [
      { num: "01", title: "Problem-driven", desc: "We select AI based on your operational challenges — not trends." },
      { num: "02", title: "Vendor-neutral", desc: "No lock-in — we compare across OpenAI, Anthropic, Google, and open-source options." },
      { num: "03", title: "End-to-end execution", desc: "We go from PoC to live production and stable operations, not stopping at strategy." },
      { num: "04", title: "Boardroom fluency", desc: "We speak both the shop floor and the C-suite, making ROI conversations natural." },
    ],
    processLabel: "Process",
    processTitle: "How we work together",
    process: [
      { num: "01", title: "Discovery", en: "Hearing", desc: "We organize your challenges and goals through current-state analysis and on-site interviews to identify where AI will actually move the needle." },
      { num: "02", title: "Strategy proposal", en: "Strategy", desc: "A concrete adoption plan with ROI estimates, a feasible schedule, and phased goal-setting." },
      { num: "03", title: "Development & implementation", en: "Development", desc: "Agile, rapid development in stages while validating impact through PoC, covering integration with existing systems throughout." },
      { num: "04", title: "Operations & improvement", en: "Operation", desc: "Post-launch adoption support, KPI tracking, and internal training to build a self-sustaining team." },
    ],
    pricingLabel: "Pricing",
    pricingTitle: "Pricing plans",
    plans: [
      { name: "Spot Consult", price: "JPY 500K~", unit: "/ session", desc: "Current-state analysis and AI direction proposal.", features: ["Discovery session (2 hrs)", "AI utilization report", "Roadmap draft", "2-week email support"], featured: false },
      { name: "Standard", price: "JPY 1.5M~", unit: "/ mo", desc: "Hands-on adoption support from PoC through full implementation.", features: ["Monthly check-ins & progress reviews", "AI strategy & design", "PoC development & validation", "Production implementation & testing", "Internal training"], featured: true },
      { name: "Enterprise", price: "Contact us", unit: "", desc: "Large-scale rollout and multi-department expansion.", features: ["Dedicated consultant", "Cross-department rollout", "Custom AI development", "24/7 support", "KPI tracking & improvement cycle"], featured: false },
    ],
    planCta: "Get started",
    techLabel: "Tech Stack",
    techTitle: "Technologies we use",
    techDesc: "We use only technologies with proven track records, stability, and established support — so even SMEs can adopt with confidence.",
    techGroups: [
      { category: "Frontend", label: "Frontend", items: [
        { name: "Next.js", icon: "logos:nextjs-icon" },
        { name: "React", icon: "logos:react" },
        { name: "TypeScript", icon: "logos:typescript-icon" },
        { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
        { name: "Vite", icon: "logos:vitejs" },
      ]},
      { category: "Backend", label: "Backend", items: [
        { name: "Python", icon: "logos:python" },
        { name: "Node.js", icon: "logos:nodejs-icon" },
        { name: "FastAPI", icon: "logos:fastapi-icon" },
        { name: "Go", icon: "simple-icons:go", color: "111827" },
        { name: "Rails", icon: "simple-icons:rubyonrails", color: "111827" },
      ]},
      { category: "AI / ML", label: "AI / ML", items: [
        { name: "Claude", icon: "simple-icons:anthropic", color: "111827" },
        { name: "OpenAI", icon: "simple-icons:openai", color: "000000" },
        { name: "Gemini", icon: "simple-icons:googlegemini", color: "111827" },
        { name: "PyTorch", icon: "logos:pytorch-icon" },
        { name: "LangChain", icon: "simple-icons:langchain", color: "1C3C3C" },
      ]},
      { category: "Database", label: "Database", items: [
        { name: "PostgreSQL", icon: "logos:postgresql" },
        { name: "MySQL", icon: "logos:mysql-icon" },
        { name: "Redis", icon: "logos:redis" },
        { name: "Supabase", icon: "logos:supabase-icon" },
        { name: "Firebase", icon: "logos:firebase-icon" },
      ]},
      { category: "Cloud", label: "Cloud & Infra", items: [
        { name: "AWS", icon: "logos:aws" },
        { name: "Google Cloud", icon: "logos:google-cloud" },
        { name: "Vercel", icon: "logos:vercel-icon" },
        { name: "Cloudflare", icon: "logos:cloudflare-icon" },
        { name: "Docker", icon: "logos:docker-icon" },
      ]},
      { category: "EC / Commerce", label: "E-commerce & Payments", items: [
        { name: "Shopify", icon: "logos:shopify" },
        { name: "Stripe", icon: "simple-icons:stripe", color: "111827" },
        { name: "Square", icon: "simple-icons:square", color: "000000" },
        { name: "WooCommerce", icon: "logos:woocommerce-icon" },
        { name: "Amazon Pay", icon: "simple-icons:amazonpay", color: "111827" },
      ]},
      { category: "Business Integrations", label: "Business Integrations", items: [
        { name: "Salesforce", icon: "logos:salesforce" },
        { name: "Slack", icon: "logos:slack-icon" },
        { name: "Microsoft 365", icon: "logos:microsoft-icon" },
        { name: "Notion", icon: "logos:notion-icon" },
        { name: "Jira", icon: "logos:jira" },
      ]},
    ],
    faqLabel: "FAQ",
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "Can we consult without any AI knowledge?", a: "Our specialty is companies starting from zero AI expertise, and we work through the current-state assessment together — reach out at any stage." },
      { q: "How long does an AI implementation take?", a: "The PoC phase typically runs 1–3 months and full production 3–6 months, varying by scope and complexity." },
      { q: "What does it cost?", a: "Costs vary by scope and scale; we'll listen to your situation first and propose the right plan with a realistic estimate." },
      { q: "Are we tied to a specific AI vendor?", a: "We maintain a vendor-neutral position and compare across OpenAI, Anthropic, Google, and open-source options (Llama, etc.)." },
      { q: "Can you integrate with our existing systems?", a: "We design with API integration and data connectivity to your existing ERP, CRM, SaaS, and other tools from the start." },
      { q: "Do you offer on-site support?", a: "Nationwide, we run projects flexibly by combining remote and on-site visits as needed." },
    ],
    ctaKicker: "Contact",
    ctaTitle: "Let's talk first.",
    ctaDesc: "Not knowing where to start is fine — just tell us your situation and we'll propose the best path forward.",
    ctaButton: "Book a free consultation",
  },
};

export default function AiConsultingPage() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  // 使用技術：全ロゴを2列に分けて逆方向に流すマーキー用
  const allTech = t.techGroups.flatMap((g) => g.items);
  const techMid = Math.ceil(allTech.length / 2);
  const techRowA = allTech.slice(0, techMid);
  const techRowB = allTech.slice(techMid);

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
              <span>Strategy</span>
              <span className="text-neutral-300">/</span>
              <span>Implementation</span>
              <span className="text-neutral-300">/</span>
              <span>Operations</span>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="mt-10 text-[7vw] sm:text-3xl lg:text-4xl font-bold leading-[0.95] tracking-[-0.04em] text-balance text-neutral-900">
              {t.heroTitle}
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-8 mb-14 max-w-2xl text-base lg:text-lg leading-relaxed text-pretty text-neutral-600">{t.heroDesc}</p>
          </Reveal>
        </div>
      </section>

      {/* TRUST — spec strip */}
      <section className="bg-white pb-16 lg:pb-20">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-2 border border-neutral-900 md:grid-cols-4">
              {t.stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`flex flex-col py-7 px-6 ${i % 2 === 1 ? "border-l border-neutral-900" : ""} ${i >= 2 ? "border-t border-neutral-900" : ""} md:border-t-0 ${i > 0 ? "md:border-l md:border-neutral-900" : ""}`}
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mt-3 text-2xl lg:text-3xl font-bold tabular-nums tracking-tight text-neutral-900">{stat.value}</span>
                  <span className="mt-1 text-xs text-neutral-500">{stat.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* INTRO / ABOUT */}
      <section className="py-12 lg:py-16 bg-neutral-50 border-y border-neutral-900">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="01" kicker={t.aboutLabel} title={t.aboutTitle} desc={t.aboutDesc} />
        </div>
      </section>

      {/* PRICING */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="02" kicker={t.pricingLabel} title={t.pricingTitle} />
          <PricingCarousel>
            {t.plans.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 100} className="flex">
                <div className={`group flex w-full flex-col border border-neutral-900 p-7 lg:p-8 ${plan.featured ? "bg-neutral-900 text-white" : "bg-white transition-colors duration-300 hover:bg-neutral-50"}`}>
                  <div className={`mb-6 flex items-center justify-between border-b pb-4 ${plan.featured ? "border-neutral-700" : "border-neutral-200"}`}>
                    <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.18em] ${plan.featured ? "text-white" : "text-neutral-900"}`}>
                      {plan.featured ? "Recommended" : "Plan"}
                    </span>
                    <span className={`font-mono text-[10px] tabular-nums ${plan.featured ? "text-neutral-400" : "text-neutral-400"}`}>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className={`text-lg font-bold tracking-tight text-balance ${plan.featured ? "text-white" : "text-neutral-900"}`}>{plan.name}</h3>
                  <div className="mt-3 mb-3 flex items-baseline gap-1.5">
                    <span className={`font-mono text-2xl font-bold tabular-nums tracking-tight ${plan.featured ? "text-white" : "text-neutral-900"}`}>{plan.price}</span>
                    {plan.unit && <span className={`font-mono text-xs ${plan.featured ? "text-neutral-400" : "text-neutral-500"}`}>{plan.unit}</span>}
                  </div>
                  <p className={`mb-5 text-sm leading-relaxed text-pretty ${plan.featured ? "text-neutral-300" : "text-neutral-600"}`}>{plan.desc}</p>
                  <ul className={`mb-6 flex-1 space-y-2.5 border-t pt-5 font-mono ${plan.featured ? "border-neutral-700" : "border-neutral-200"}`}>
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs">
                        <span className={`flex-shrink-0 ${plan.featured ? "text-white" : "text-neutral-900"}`}>→</span>
                        <span className={plan.featured ? "text-neutral-300" : "text-neutral-600"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="/contact" className={`group/btn mt-auto inline-flex items-center justify-center gap-3 border px-6 py-3.5 font-mono text-sm font-bold uppercase tracking-[0.08em] transition-[color,background-color,border-color,scale] duration-300 active:scale-[0.96] ${plan.featured ? "border-white bg-white text-neutral-900 hover:bg-transparent hover:text-white" : "border-neutral-900 bg-white text-neutral-900 hover:bg-neutral-900 hover:text-white"}`}>
                    {t.planCta}
                    <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                  </a>
                </div>
              </Reveal>
            ))}
          </PricingCarousel>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section id="services" className="py-12 lg:py-16 bg-neutral-50 border-y border-neutral-900">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="03" kicker={t.servicesLabel} title={t.servicesTitle} />
          <CardCarousel gridClass="md:grid-cols-2">
            {t.services.map((item, i) => (
              <Reveal key={item.num} delay={i * 80}>
                <div className="group flex h-full flex-col border border-neutral-900 bg-white p-7 lg:p-8 transition-colors duration-300 hover:bg-neutral-900">
                  <div className="mb-6 flex items-baseline justify-between border-b border-neutral-200 pb-4 transition-colors duration-300 group-hover:border-neutral-700">
                    <span className="font-mono text-2xl font-bold tabular-nums text-neutral-900 transition-colors duration-300 group-hover:text-white">{item.num}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">Area / {item.num}</span>
                  </div>
                  <h3 className="mb-3 text-xl lg:text-2xl font-bold tracking-tight text-balance text-neutral-900 transition-colors duration-300 group-hover:text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-pretty text-neutral-600 transition-colors duration-300 group-hover:text-neutral-300">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* DIFFERENTIATION */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="04" kicker={t.whyLabel} title={t.whyTitle} />
          <CardCarousel gridClass="md:grid-cols-2">
            {t.why.map((item, i) => (
              <Reveal key={item.title} delay={i * 80} className="h-full">
                <div className="group flex h-full flex-col border border-neutral-900 bg-white p-7 lg:p-8 transition-colors duration-300 hover:bg-neutral-900">
                  <div className="mb-6 flex items-baseline justify-between border-b border-neutral-200 pb-4 transition-colors duration-300 group-hover:border-neutral-700">
                    <span className="font-mono text-xl font-bold tabular-nums text-neutral-900 transition-colors duration-300 group-hover:text-white">{item.num}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">Why / {item.num}</span>
                  </div>
                  <h3 className="mb-3 text-lg lg:text-xl font-bold tracking-tight text-balance text-neutral-900 transition-colors duration-300 group-hover:text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-pretty text-neutral-600 transition-colors duration-300 group-hover:text-neutral-300">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-12 lg:py-16 bg-neutral-50 border-y border-neutral-900">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="05" kicker={t.processLabel} title={t.processTitle} />
          {/* table header */}
          <div className="hidden lg:grid grid-cols-12 gap-6 border-b border-neutral-900 pb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
            <div className="col-span-1">No.</div>
            <div className="col-span-3">Phase</div>
            <div className="col-span-8">Detail</div>
          </div>
          {t.process.map((step, i) => (
            <Reveal key={step.num} delay={i * 60}>
              <div className="group grid grid-cols-1 gap-2 border-b border-neutral-300 py-7 transition-colors duration-300 hover:bg-white lg:grid-cols-12 lg:gap-6">
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

      {/* TECH STACK */}
      <section className="py-12 lg:py-16 bg-white overflow-x-clip">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="06" kicker={t.techLabel} title={t.techTitle} desc={t.techDesc} />
        </div>
        {/* 使用技術：色付きロゴが流れるマーキー（2列・逆方向・両端フェード・hoverで一時停止） */}
        <div className="mt-8 md:mt-10 space-y-3 md:space-y-4">
          {[techRowA, techRowB].map((row, ri) => (
            <div key={ri} className="relative overflow-hidden">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent md:w-28" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent md:w-28" />
              <div
                className={`flex w-max items-center gap-3 md:gap-4 hover:[animation-play-state:paused] ${
                  ri === 0 ? "animate-[marquee_55s_linear_infinite]" : "animate-[marqueeReverse_55s_linear_infinite]"
                }`}
              >
                {[...row, ...row].map((tech, i) => (
                  <span
                    key={`${tech.name}-${i}`}
                    className="inline-flex shrink-0 items-center gap-2 border border-neutral-300 bg-white px-3.5 py-2 font-mono text-[13px] text-neutral-700"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/logos/tech/${techSlug(tech.name)}.svg`}
                      alt={tech.name}
                      className="w-4 h-4 object-contain"
                      loading="lazy"
                    />
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 lg:py-16 bg-neutral-50 border-t border-neutral-900">
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
              <span>{t.ctaKicker}</span>
            </div>
            <div className="mt-12 grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <h2 className="text-[18px] sm:text-xl lg:text-2xl font-bold leading-[1.15] sm:leading-[1.05] tracking-[-0.02em] text-balance whitespace-pre-line text-white">{t.ctaTitle}</h2>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-pretty whitespace-pre-line text-neutral-400">{t.ctaDesc}</p>
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

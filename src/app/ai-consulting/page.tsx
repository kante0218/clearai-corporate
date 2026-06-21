"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
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

function Label({ children }: { children: ReactNode }) {
  return <p className="text-sm font-semibold text-neutral-900 mb-4">{children}</p>;
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
  plans: { name: string; price: string; desc: string; features: string[]; featured: boolean }[];
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
    heroDesc: "戦略策定から開発・実装・運用まで、一気通貫でご支援します。大手コンサルティングファーム出身者が監修。",
    stats: [
      { value: "100+", label: "支援可能な業種" },
      { value: "4領域", label: "ワンストップ提供" },
      { value: "PoC→本番", label: "伴走支援" },
      { value: "2営業日", label: "初回返信" },
    ],
    aboutLabel: "About",
    aboutTitle: "AIは魔法ではなく、道具です。\n正しく使えば、確実に成果が出ます。",
    aboutDesc: "多くの企業が「AIを導入したい」と考えながら、何から始めればいいかわからずに立ち止まっています。clearAIは、AIの専門知識がない企業でも安心して始められるよう、ヒアリングから運用定着まで伴走します。派手な提案ではなく、貴社の課題に合った地に足のついたAI活用を、一緒に見つけていきます。",
    servicesLabel: "Service Areas",
    servicesTitle: "4つの支援領域",
    services: [
      { num: "01", title: "AI戦略策定", desc: "現状分析から導入ロードマップの策定まで。ROIを試算し、優先度の高い領域から着手する実行可能な計画を立案します。", hoverBg: "hover:bg-neutral-50" },
      { num: "02", title: "データ分析・活用", desc: "社内データの棚卸しと分析基盤の構築。散在するデータを統合し、AIが活用できる形に整備します。", hoverBg: "hover:bg-neutral-50" },
      { num: "03", title: "業務自動化", desc: "繰り返しの多い業務をAIで自動化。カスタマーサポート、文書処理、データ入力など、人がやらなくていい仕事を見つけ出します。", hoverBg: "hover:bg-neutral-50" },
      { num: "04", title: "生成AI活用", desc: "ChatGPT・Claudeなどの生成AIを業務フローに組み込むご支援。社内ナレッジベースとの連携やカスタムチャットボットの構築も。", hoverBg: "hover:bg-neutral-50" },
    ],
    whyLabel: "Why Us",
    whyTitle: "なぜclearAIが選ばれるのか",
    why: [
      { num: "01", title: "課題ドリブン", desc: "流行ではなく、貴社の業務課題から逆算してAIを選定します。" },
      { num: "02", title: "技術選定に中立", desc: "特定ベンダー縛りなし。OpenAI、Anthropic、Google、オープンソースを横断比較。" },
      { num: "03", title: "実装まで一気通貫", desc: "戦略だけで終わらせない。PoCから本番稼働、運用定着まで。" },
      { num: "04", title: "経営との対話", desc: "現場と経営層の両方の言葉で話せる。ROI議論が可能です。" },
    ],
    processLabel: "Process",
    processTitle: "導入の流れ",
    process: [
      { num: "01", title: "ヒアリング", en: "Hearing", desc: "課題・目標の整理と現状分析を実施。現場へのインタビューも行い、本当に効果が出る領域を特定します。" },
      { num: "02", title: "戦略提案", en: "Strategy", desc: "ROIを試算した具体的な導入計画をご提案。実現可能なスケジュールと、段階的なゴール設定をお示しします。" },
      { num: "03", title: "開発・実装", en: "Development", desc: "アジャイルで迅速に開発。PoCで効果を検証しながら段階的に実装。既存システムとの連携も一貫して対応します。" },
      { num: "04", title: "運用・改善", en: "Operation", desc: "導入後の定着支援とKPI計測。社内トレーニングも実施し、自走できる体制づくりを支援します。" },
    ],
    pricingLabel: "Pricing",
    pricingTitle: "料金プラン",
    plans: [
      { name: "スポットコンサル", price: "ご相談", desc: "現状分析とAI活用の方向性をご提案。", features: ["現状ヒアリング（2時間）", "AI活用レポート作成", "導入ロードマップ素案", "2週間のメールサポート"], featured: false },
      { name: "スタンダード", price: "ご相談", desc: "PoC〜本番実装まで。伴走型の導入支援。", features: ["月次ヒアリング・進捗会議", "AI戦略策定・設計", "PoC開発・検証", "本番実装・テスト", "社内トレーニング"], featured: true },
      { name: "エンタープライズ", price: "ご相談", desc: "大規模導入・複数部署展開に対応。", features: ["専任コンサルタント配置", "複数部署への横展開", "カスタムAI開発", "24/7サポート", "KPI計測・改善サイクル"], featured: false },
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
      { q: "AIについての知識がなくても相談できますか？", a: "もちろんです。当社は「AIの専門知識ゼロ」の企業様を最も得意としています。現状把握から一緒に行いますので、まずはお気軽にご相談ください。" },
      { q: "どのくらいの期間でAI導入ができますか？", a: "PoC（概念実証）フェーズで1〜3ヶ月、本番実装で3〜6ヶ月が目安です。業務範囲と複雑性により変動します。" },
      { q: "費用感を教えてください。", a: "サービス内容や規模に応じて異なります。まずはヒアリングの上、最適なプランと費用感をご提案いたしますので、お気軽にご相談ください。" },
      { q: "特定のAIベンダーに縛られますか？", a: "いいえ。当社はベンダーニュートラルな立場で、OpenAI・Anthropic・Google・オープンソース（Llama等）を横断的に比較・選定します。" },
      { q: "既存システムとの連携は可能ですか？", a: "可能です。ERP・CRM・SaaS等、お使いのシステムとのAPI連携やデータ統合を前提に設計します。" },
      { q: "オンサイト対応はありますか？", a: "必要に応じて全国対応いたします。リモートとオンサイトを組み合わせた柔軟なプロジェクト進行が可能です。" },
    ],
    ctaKicker: "Contact",
    ctaTitle: "まずは、お話ししませんか。",
    ctaDesc: "「何から始めればいいかわからない」でも大丈夫です。\n貴社の状況をお聞きした上で、最適な進め方をご提案します。",
    ctaButton: "無料で相談する",
  },
  en: {
    heroKicker: "AI Consulting & DX",
    heroTitle: "AI Consulting & Digital Transformation",
    heroDesc: "End-to-end support from strategy through development, implementation, and operations. Supervised by alumni of leading consulting firms.",
    stats: [
      { value: "100+", label: "Industries served" },
      { value: "4 domains", label: "One-stop delivery" },
      { value: "PoC→Prod", label: "Hands-on support" },
      { value: "2 biz days", label: "First response" },
    ],
    aboutLabel: "About",
    aboutTitle: "AI is a tool, not magic.\nUsed correctly, it delivers real results.",
    aboutDesc: "Many companies want to adopt AI but don't know where to start. clearAI walks alongside you — from the initial interview through to full operational adoption — so even organizations with no AI expertise can begin with confidence. Rather than flashy proposals, we find practical AI applications that are grounded in your actual business challenges.",
    servicesLabel: "Service Areas",
    servicesTitle: "Four areas of support",
    services: [
      { num: "01", title: "AI strategy", desc: "From current-state analysis to roadmap development. We calculate ROI and draft an actionable plan that starts with the highest-priority areas.", hoverBg: "hover:bg-neutral-50" },
      { num: "02", title: "Data analytics & activation", desc: "Auditing internal data and building an analytics foundation. We consolidate scattered data into a form AI can actually use.", hoverBg: "hover:bg-neutral-50" },
      { num: "03", title: "Process automation", desc: "Automating repetitive tasks with AI — customer support, document processing, data entry. We identify the work that doesn't need a human.", hoverBg: "hover:bg-neutral-50" },
      { num: "04", title: "Generative AI integration", desc: "Embedding generative AI such as ChatGPT and Claude into your workflows. Including internal knowledge-base integration and custom chatbot development.", hoverBg: "hover:bg-neutral-50" },
    ],
    whyLabel: "Why Us",
    whyTitle: "Why companies choose clearAI",
    why: [
      { num: "01", title: "Problem-driven", desc: "We select AI based on your operational challenges — not trends." },
      { num: "02", title: "Vendor-neutral", desc: "No vendor lock-in. We compare across OpenAI, Anthropic, Google, and open-source." },
      { num: "03", title: "End-to-end execution", desc: "Strategy alone isn't enough. We go from PoC to live production and stable operations." },
      { num: "04", title: "Boardroom fluency", desc: "We speak both the language of the shop floor and the C-suite. ROI conversations are our default." },
    ],
    processLabel: "Process",
    processTitle: "How we work together",
    process: [
      { num: "01", title: "Discovery", en: "Hearing", desc: "We organize your challenges and goals through current-state analysis and on-site interviews to identify where AI will actually move the needle." },
      { num: "02", title: "Strategy proposal", en: "Strategy", desc: "A concrete adoption plan with ROI estimates. We present a feasible schedule and phased goal-setting." },
      { num: "03", title: "Development & implementation", en: "Development", desc: "Agile, rapid development. We implement in stages while validating impact through PoC — covering integration with existing systems throughout." },
      { num: "04", title: "Operations & improvement", en: "Operation", desc: "Post-launch adoption support and KPI tracking. Internal training included to build a self-sustaining team." },
    ],
    pricingLabel: "Pricing",
    pricingTitle: "Pricing plans",
    plans: [
      { name: "Spot Consult", price: "Contact us", desc: "Current-state analysis and AI direction proposal.", features: ["Discovery session (2 hrs)", "AI utilization report", "Roadmap draft", "2-week email support"], featured: false },
      { name: "Standard", price: "Contact us", desc: "PoC through full implementation. Hands-on adoption support.", features: ["Monthly check-ins & progress reviews", "AI strategy & design", "PoC development & validation", "Production implementation & testing", "Internal training"], featured: true },
      { name: "Enterprise", price: "Contact us", desc: "Large-scale rollout and multi-department expansion.", features: ["Dedicated consultant", "Cross-department rollout", "Custom AI development", "24/7 support", "KPI tracking & improvement cycle"], featured: false },
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
      { q: "Can we consult without any AI knowledge?", a: "Absolutely. Our specialty is companies starting from zero AI expertise. We work through the current-state assessment together, so please reach out at any stage." },
      { q: "How long does an AI implementation take?", a: "The PoC phase typically runs 1–3 months; full production implementation 3–6 months. This varies by scope and complexity." },
      { q: "What does it cost?", a: "It depends on scope and scale. We'll listen to your situation first and then propose the right plan and a realistic cost range — just get in touch." },
      { q: "Are we tied to a specific AI vendor?", a: "No. We maintain a vendor-neutral position and compare across OpenAI, Anthropic, Google, and open-source options (Llama, etc.)." },
      { q: "Can you integrate with our existing systems?", a: "Yes. We design with API integration and data connectivity to your existing ERP, CRM, SaaS, and other tools from the start." },
      { q: "Do you offer on-site support?", a: "Yes, nationwide. We run projects flexibly, combining remote and on-site as needed." },
    ],
    ctaKicker: "Contact",
    ctaTitle: "Let's talk first.",
    ctaDesc: "Not knowing where to start is perfectly fine.\nTell us your situation and we'll propose the best path forward.",
    ctaButton: "Book a free consultation",
  },
};

export default function AiConsultingPage() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  return (
    <>
      {/* PAGE HEADER */}
      <section className="pt-24 pb-10 lg:pt-28 lg:pb-12 bg-white border-b border-gray-100">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <p className="text-sm font-semibold text-neutral-900 mb-3">{t.heroKicker}</p>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">{t.heroTitle}</h1>
          <p className="text-base text-gray-600 leading-relaxed w-full">{t.heroDesc}</p>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.pricingLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-8">{t.pricingTitle}</h2>
          </Reveal>
          <PricingCarousel>
            {t.plans.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 100} className="flex">
                <div className={`rounded-lg p-8 lg:p-10 transition-all duration-300 flex flex-col w-full ${plan.featured ? "bg-neutral-900 text-white shadow-xl" : "bg-white border border-gray-200 hover:shadow-lg"}`}>
                  {plan.featured && <span className="inline-block rounded-md bg-white/20 text-white px-3 py-1 text-sm font-semibold mb-4 self-start">Recommended</span>}
                  <h3 className={`text-lg font-bold mb-2 ${plan.featured ? "text-white" : "text-gray-900"}`}>{plan.name}</h3>
                  <div className="mb-4">
                    <span className={`text-2xl font-bold ${plan.featured ? "text-white" : "text-gray-900"}`}>{plan.price}</span>
                  </div>
                  <p className={`text-sm leading-relaxed mb-6 ${plan.featured ? "text-white/80" : "text-gray-600"}`}>{plan.desc}</p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${plan.featured ? "bg-white/40" : "bg-neutral-900"}`} />
                        <span className={`text-sm ${plan.featured ? "text-white/90" : "text-gray-600"}`}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="/contact" className={`block text-center text-sm font-semibold py-3 rounded-lg transition-all duration-300 mt-auto ${plan.featured ? "bg-white text-neutral-900 hover:bg-neutral-50" : "border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900"}`}>{t.planCta}</a>
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

      {/* INTRO */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.aboutLabel}</Label>
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-gray-900 leading-snug mb-6">
                {t.aboutTitle.split("\n").map((line, i, arr) => (
                  <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                ))}
              </h2>
              <p className="text-base text-gray-600 leading-relaxed">
                {t.aboutDesc}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section id="services" className="py-14 lg:py-20 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.servicesLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-8">{t.servicesTitle}</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.services.map((item, i) => (
              <Reveal key={item.num} delay={i * 100}>
                <div className={`bg-white rounded-lg border border-gray-200 p-8 transition-all duration-300 cursor-default group ${item.hoverBg} hover:shadow-lg`}>
                  <span className="text-sm font-bold text-neutral-900">{item.num}</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-3 mb-4">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DIFFERENTIATION */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.whyLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-8">{t.whyTitle}</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {t.why.map((item, i) => (
              <Reveal key={item.title} delay={i * 100} className="h-full">
                <div className="rounded-lg border border-gray-200 bg-white p-8 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  <span className="text-xs font-semibold text-neutral-900 tracking-widest">{item.num}</span>
                  <h3 className="text-lg font-bold text-gray-900 mt-2 mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
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
            <p className="text-base text-gray-500 w-full leading-relaxed mb-8">
              {t.techDesc}
            </p>
          </Reveal>
          <div className="space-y-0">
            {t.techGroups.map((group, gi) => (
              <Reveal key={group.category} delay={gi * 40}>
                <div className="border-t border-gray-200 py-8">
                  <div className="grid lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-2">
                      <p className="text-[10px] font-semibold tracking-widest text-neutral-900 uppercase">{group.category}</p>
                      <h3 className="text-sm font-bold text-gray-900 mt-0.5">{group.label}</h3>
                    </div>
                    <div className="lg:col-span-10">
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                        {group.items.map((tech) => (
                          <div key={tech.name} className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col items-center justify-center gap-3 hover:border-gray-300 hover:shadow-sm transition-all aspect-square">
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
            <Label>{t.ctaKicker}</Label>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.ctaTitle}</h2>
            <p className="text-base text-gray-600 leading-relaxed mb-10">
              {t.ctaDesc.split("\n").map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </p>
            <a href="/contact" className="rounded-lg bg-neutral-900 text-white font-semibold px-10 py-4 hover:bg-neutral-800 transition-colors duration-300 inline-block">{t.ctaButton}</a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

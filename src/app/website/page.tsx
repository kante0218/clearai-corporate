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
    <Reveal className="mb-12 lg:mb-16 max-w-3xl">
      <div className={`flex items-center gap-4 border-b pb-4 ${dark ? "border-white/25" : "border-neutral-900"}`}>
        <span className={`font-mono text-xs font-bold tabular-nums ${dark ? "text-white" : "text-neutral-900"}`}>§{index}</span>
        <span className={`font-mono text-[11px] font-medium uppercase tracking-[0.25em] ${dark ? "text-neutral-400" : "text-neutral-500"}`}>{kicker}</span>
      </div>
      <h2 className={`mt-8 text-[22px] sm:text-3xl lg:text-4xl font-bold leading-[1.15] sm:leading-[1.05] tracking-[-0.02em] text-balance ${dark ? "text-white" : "text-neutral-900"}`}>
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
  whyLabel: string;
  whyTitle: string;
  whyItems: { title: string; desc: string }[];
  typesLabel: string;
  typesTitle: string;
  typesDesc: string;
  typeItems: { num: string; title: string; desc: string }[];
  stackLabel: string;
  stackTitle: string;
  stackItems: { title: string; desc: string }[];
  stackNote: string;
  processLabel: string;
  processTitle: string;
  processItems: { num: string; title: string; desc: string }[];
  pricingLabel: string;
  pricingTitle: string;
  pricingDesc: string;
  plans: {
    name: string;
    price: string;
    unit: string;
    desc: string;
    features: string[];
    featured: boolean;
    href: string;
    cta: string;
    bundleNote: string;
  }[];
  pricingFootnote: string;
  ctaLabel: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaButton: string;
};

const COPY: Record<"ja" | "en", Copy> = {
  ja: {
    pageKicker: "Website Production",
    pageTitle: "ウェブサイト制作",
    pageDesc: "clearai.jp と同じ Next.js + Vercel + Headless CMS スタックで、表示速度・SEO・運用しやすさを最高水準に仕上げます。",
    whyLabel: "Why Now",
    whyTitle: "なぜ今、AIネイティブなサイトが必要か。",
    whyItems: [
      { title: "AI検索への対応", desc: "Google AI Overviews / SGE、ChatGPT Searchなど、AIに引用されるための構造化データ・E-E-A-T設計が必須に。" },
      { title: "速度＝信頼", desc: "表示が3秒遅れるだけで離脱率が大幅に増加し、Core Web Vitalsはコンバージョンと直結します。" },
      { title: "更新運用のコスト", desc: "更新のたびに外部委託する時代は終わり、社内で安全に更新できるCMSと運用設計が必要です。" },
    ],
    typesLabel: "Types",
    typesTitle: "対応する制作タイプ",
    typesDesc: "すべての制作で「速い・直しやすい・AIに見つかる」を標準装備します。",
    typeItems: [
      { num: "01", title: "コーポレートサイト", desc: "ブランド表現と採用・営業のコンバージョンを両立した、会社案内からSEO集客サイトまで対応します。" },
      { num: "02", title: "サービスサイト / LP", desc: "1サービスに特化したLPから複数サービスのハブまで、広告連動で成果が出る構成を設計します。" },
      { num: "03", title: "採用サイト", desc: "母集団形成と志望度向上に効くストーリー設計から、応募フォーム・ATS連携まで対応します。" },
      { num: "04", title: "メディア・オウンドメディア", desc: "Headless CMSとSEO設計で、運用しながら強くなるメディア基盤を構築します。" },
      { num: "05", title: "リニューアル", desc: "既存サイトを全面刷新し、アクセス資産を引き継ぎながらCV率・表示速度・運用性を改善します。" },
      { num: "06", title: "AI機能付きサイト", desc: "サイト内検索のAI化、LLMチャット、自動FAQ生成など、AI機能を組み込んだサイトを構築します。" },
    ],
    stackLabel: "Tech Stack",
    stackTitle: "標準技術スタック",
    stackItems: [
      { title: "Next.js / React", desc: "高速で、長期運用に耐えるモダンフレームワーク。" },
      { title: "Vercel", desc: "世界最速クラスのCDN／自動デプロイ環境。" },
      { title: "microCMS / Sanity", desc: "国内外のHeadless CMSを業務要件に応じて選定。" },
      { title: "GA4 / Search Console", desc: "計測・SEO監視まで初期セットアップ込み。" },
    ],
    stackNote: "※ ご要望に応じてWordPress・Shopify等のCMSにも対応可能です。",
    processLabel: "Process",
    processTitle: "制作プロセス",
    processItems: [
      { num: "01", title: "ヒアリング・要件定義", desc: "事業目標・ターゲット・KPIを言語化し、サイトの役割を明確に定義します。" },
      { num: "02", title: "情報設計・ワイヤー", desc: "サイトマップ・ワイヤーフレーム・コンテンツ要件を整理し、AIで競合・検索意図も分析します。" },
      { num: "03", title: "デザイン・実装", desc: "FigmaでデザインしNext.jsで実装、AI支援で開発スピードを2〜3倍に。" },
      { num: "04", title: "公開・運用支援", desc: "公開後の運用設計、CMS研修、SEO継続改善まで伴走します。" },
    ],
    pricingLabel: "Pricing",
    pricingTitle: "料金の目安",
    pricingDesc: "ページ数・機能要件・運用範囲により変動しますので、要件整理段階での無料お見積もりをご活用ください。",
    plans: [
      {
        name: "6ヶ月パック",
        price: "初期15万円",
        unit: "+ 月2万円",
        desc: "LP1枚〜小規模サイトの初期構築＋6ヶ月の運用サポート付きセット。",
        features: ["ヒアリング・構成設計", "デザイン・実装（1〜3ページ）", "スマホ対応", "月次運用サポート（6ヶ月）", "コンテンツ更新・改善提案"],
        featured: true,
        href: "https://buy.stripe.com/bJe00c9VOeeAgPgdtGd7q06",
        cta: "申し込む",
        bundleNote: "× 6ヶ月（合計¥270,000）",
      },
      {
        name: "スタンダード",
        price: "50万円〜",
        unit: "/ 一式",
        desc: "コーポレートサイト・LP・採用サイトの標準プラン。",
        features: ["要件定義・構成設計", "デザイン・実装", "GA4・SEO初期設定", "Headless CMS構築（任意）", "公開後30日サポート"],
        featured: false,
        href: "/contact?service=website",
        cta: "相談する",
        bundleNote: "",
      },
      {
        name: "カスタム",
        price: "ご相談",
        unit: "",
        desc: "大規模サイト・独自機能・AI連携をご希望の方へ。",
        features: ["要件・技術選定コンサル", "独自機能・AI連携開発", "段階リリース計画", "運用体制構築", "保守・継続改善"],
        featured: false,
        href: "/contact?service=website",
        cta: "相談する",
        bundleNote: "",
      },
    ],
    pricingFootnote: "表示価格は税抜。要件・分量により個別見積もりとなります。IT導入補助金の活用も可能です。",
    ctaLabel: "Contact",
    ctaTitle: "サイトを、事業の武器に。",
    ctaDesc: "「現状のサイトをどう変えるべきか」のご相談から、要件整理段階での無料診断まで承ります。",
    ctaButton: "無料相談を申し込む",
  },
  en: {
    pageKicker: "Website Production",
    pageTitle: "Website Production",
    pageDesc: "We build your site with the same Next.js + Vercel + Headless CMS stack powering clearai.jp, delivering top-tier speed, SEO, and ease of operation.",
    whyLabel: "Why Now",
    whyTitle: "Why AI-native websites matter right now.",
    whyItems: [
      { title: "Visibility in AI search", desc: "Google AI Overviews/SGE, ChatGPT Search — structured data and E-E-A-T design are now essential to be cited by AI." },
      { title: "Speed equals trust", desc: "A 3-second delay sharply raises bounce rates, and Core Web Vitals are directly tied to conversions." },
      { title: "The cost of manual updates", desc: "Depending on an agency for every content change is over — you need a CMS and workflow your team can manage safely in-house." },
    ],
    typesLabel: "Types",
    typesTitle: "Production types we handle",
    typesDesc: "Every project ships fast, editable, and discoverable by AI — as standard.",
    typeItems: [
      { num: "01", title: "Corporate site", desc: "Balance brand expression with conversion for recruiting and sales — from a company profile to a site that earns traffic through SEO." },
      { num: "02", title: "Service site / LP", desc: "From a single-service LP to a multi-service hub, we design structures that convert from ad traffic." },
      { num: "03", title: "Recruiting site", desc: "Story-driven design that builds your candidate pool and raises intent, including application forms and ATS integration." },
      { num: "04", title: "Media / owned media", desc: "Headless CMS and SEO architecture — a media foundation that gets stronger as you publish." },
      { num: "05", title: "Redesign", desc: "Full-site overhaul that carries over your traffic equity while improving conversion rate, speed, and operability." },
      { num: "06", title: "AI-powered site", desc: "AI site search, LLM chat, auto FAQ generation — we build sites with AI features embedded." },
    ],
    stackLabel: "Tech Stack",
    stackTitle: "Standard tech stack",
    stackItems: [
      { title: "Next.js / React", desc: "A modern framework built for speed and long-term maintainability." },
      { title: "Vercel", desc: "World-class CDN and automated deployment infrastructure." },
      { title: "microCMS / Sanity", desc: "We select the right Headless CMS — domestic or international — for your operational needs." },
      { title: "GA4 / Search Console", desc: "Full initial setup for measurement and SEO monitoring included." },
    ],
    stackNote: "* We also support WordPress, Shopify, and other CMS platforms on request.",
    processLabel: "Process",
    processTitle: "Production process",
    processItems: [
      { num: "01", title: "Discovery & requirements", desc: "We articulate your business goals, target audience, and KPIs — and define the role your site will play." },
      { num: "02", title: "Information architecture & wireframes", desc: "Sitemap, wireframes, and content requirements — with AI-assisted competitive and search-intent analysis." },
      { num: "03", title: "Design & build", desc: "Figma design → Next.js implementation, with AI assistance cutting development time by 2–3x." },
      { num: "04", title: "Launch & ongoing support", desc: "We partner on post-launch operations, CMS training, and continuous SEO improvement." },
    ],
    pricingLabel: "Pricing",
    pricingTitle: "Pricing guide",
    pricingDesc: "Varies by page count, feature requirements, and operational scope — a free estimate is available at the requirements stage.",
    plans: [
      {
        name: "6-Month Pack",
        price: "¥150,000 initial",
        unit: "+ ¥20,000/mo",
        desc: "One-page LP to small site — initial build plus 6 months of operational support.",
        features: ["Discovery & structure design", "Design & build (1–3 pages)", "Mobile-responsive", "Monthly ops support (6 months)", "Content updates & improvement suggestions"],
        featured: true,
        href: "https://buy.stripe.com/bJe00c9VOeeAgPgdtGd7q06",
        cta: "Purchase",
        bundleNote: "× 6 months (total ¥270,000)",
      },
      {
        name: "Standard",
        price: "¥500,000+",
        unit: "/ project",
        desc: "Standard plan for corporate sites, LPs, and recruiting sites.",
        features: ["Requirements & structure design", "Design & build", "GA4 & SEO initial setup", "Headless CMS (optional)", "30-day post-launch support"],
        featured: false,
        href: "/contact?service=website",
        cta: "Inquire",
        bundleNote: "",
      },
      {
        name: "Custom",
        price: "Contact us",
        unit: "",
        desc: "For large-scale sites, proprietary features, or AI integration.",
        features: ["Requirements & technology consulting", "Custom feature & AI integration development", "Phased release planning", "Operations setup", "Maintenance & continuous improvement"],
        featured: false,
        href: "/contact?service=website",
        cta: "Inquire",
        bundleNote: "",
      },
    ],
    pricingFootnote: "Prices shown exclude tax. Final quote based on scope and volume. Japan's IT Introduction Subsidy may apply.",
    ctaLabel: "Contact",
    ctaTitle: "Turn your website into a business asset.",
    ctaDesc: "We start from 'how should we change our current site?' — with a free assessment available at the requirements stage.",
    ctaButton: "Book a free consultation",
  },
};

export default function WebsitePage() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  return (
    <>
      {/* MASTHEAD */}
      <section className="bg-white pt-32 lg:pt-40 pb-12 lg:pb-16">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-neutral-900 pb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
              <span className="font-bold text-neutral-900">§00</span>
              <span>{t.pageKicker}</span>
              <span className="text-neutral-300">/</span>
              <span>Next.js</span>
              <span className="text-neutral-300">/</span>
              <span>Vercel</span>
              <span className="text-neutral-300">/</span>
              <span>Headless&nbsp;CMS</span>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="mt-10 text-[10vw] sm:text-5xl lg:text-7xl font-bold leading-[0.95] tracking-[-0.04em] text-balance text-neutral-900">
              {t.pageTitle}
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-8 max-w-2xl text-base lg:text-lg leading-relaxed text-pretty text-neutral-600">{t.pageDesc}</p>
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
                <div className={`flex flex-col w-full border border-neutral-900 p-7 lg:p-8 ${plan.featured ? "bg-neutral-900 text-white" : "bg-white"}`}>
                  <div className={`mb-5 flex items-center justify-between border-b pb-3 ${plan.featured ? "border-neutral-700" : "border-neutral-200"}`}>
                    <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.18em] ${plan.featured ? "text-white" : "text-neutral-900"}`}>{plan.name}</span>
                    {plan.featured ? (
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">Popular</span>
                    ) : (
                      <span className="font-mono text-[10px] tabular-nums text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
                    )}
                  </div>
                  <div className="mb-4">
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      <span className={`font-mono text-2xl font-bold tabular-nums tracking-tight ${plan.featured ? "text-white" : "text-neutral-900"}`}>{plan.price}</span>
                      {plan.unit && <span className={`font-mono text-sm ${plan.featured ? "text-neutral-300" : "text-neutral-500"}`}>{plan.unit}</span>}
                    </div>
                    {plan.bundleNote && (
                      <p className={`mt-1.5 font-mono text-[11px] tabular-nums ${plan.featured ? "text-neutral-400" : "text-neutral-500"}`}>{plan.bundleNote}</p>
                    )}
                  </div>
                  <p className={`mb-5 text-sm leading-relaxed text-pretty ${plan.featured ? "text-neutral-300" : "text-neutral-600"}`}>{plan.desc}</p>
                  <ul className={`mb-6 flex-1 space-y-2.5 border-t pt-4 font-mono ${plan.featured ? "border-neutral-700" : "border-neutral-200"}`}>
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs">
                        <span className={`flex-shrink-0 ${plan.featured ? "text-white" : "text-neutral-900"}`}>→</span>
                        <span className={plan.featured ? "text-neutral-300" : "text-neutral-600"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={plan.href} className={`group mt-auto inline-flex items-center justify-center gap-2 border px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.08em] transition-[color,background-color,border-color,scale] duration-300 active:scale-[0.96] ${plan.featured ? "border-white bg-white text-neutral-900 hover:bg-transparent hover:text-white" : "border-neutral-900 bg-white text-neutral-900 hover:bg-neutral-900 hover:text-white"}`}>
                    {plan.cta}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </Reveal>
            ))}
          </PricingCarousel>
          <Reveal delay={300}>
            <p className="mt-8 font-mono text-[11px] leading-relaxed text-neutral-400">{t.pricingFootnote}</p>
          </Reveal>
        </div>
      </section>

      {/* WHY */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="02" kicker={t.whyLabel} title={t.whyTitle} />
          <CardCarousel gridClass="md:grid-cols-3">
            {t.whyItems.map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="group h-full border border-neutral-900 bg-white p-8 lg:p-10 transition-colors duration-300 hover:bg-neutral-900">
                  <span className="mb-4 block font-mono text-xs font-bold tabular-nums text-neutral-400 transition-colors duration-300 group-hover:text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mb-3 text-lg lg:text-xl font-bold tracking-tight text-balance text-neutral-900 transition-colors duration-300 group-hover:text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-pretty text-neutral-600 transition-colors duration-300 group-hover:text-neutral-300">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* TYPES */}
      <section id="types" className="py-20 lg:py-28 bg-neutral-50 border-y border-neutral-900">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="03" kicker={t.typesLabel} title={t.typesTitle} desc={t.typesDesc} />
          <CardCarousel gridClass="md:grid-cols-2 lg:grid-cols-3">
            {t.typeItems.map((item, i) => (
              <Reveal key={item.num} delay={i * 80}>
                <div className="flex h-full flex-col border border-neutral-900 bg-white p-7 lg:p-8">
                  <div className="mb-6 flex items-center justify-between border-b border-neutral-200 pb-3">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-900">Type</span>
                    <span className="font-mono text-[10px] tabular-nums text-neutral-400">{item.num}</span>
                  </div>
                  <h3 className="mb-3 text-lg lg:text-xl font-bold tracking-tight text-balance text-neutral-900">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-pretty text-neutral-600">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* STACK */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="04" kicker={t.stackLabel} title={t.stackTitle} />
          <div className="border-t border-neutral-900">
            {t.stackItems.map((f, i) => (
              <Reveal key={f.title} delay={i * 60}>
                <div className="grid grid-cols-1 gap-2 border-b border-neutral-300 py-6 lg:grid-cols-12 lg:gap-8">
                  <div className="lg:col-span-4">
                    <h3 className="flex items-baseline gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-neutral-900">
                      <span className="text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
                      {f.title}
                    </h3>
                  </div>
                  <div className="lg:col-span-8">
                    <p className="text-sm leading-relaxed text-pretty text-neutral-600">{f.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <p className="mt-6 font-mono text-[11px] leading-relaxed text-neutral-400">{t.stackNote}</p>
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 lg:py-28 bg-neutral-50 border-y border-neutral-900">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="05" kicker={t.processLabel} title={t.processTitle} />
          <div className="hidden lg:grid grid-cols-12 gap-6 border-b border-neutral-900 pb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
            <div className="col-span-1">No.</div>
            <div className="col-span-4">Phase</div>
            <div className="col-span-7">Detail</div>
          </div>
          {t.processItems.map((item, i) => (
            <Reveal key={item.title} delay={i * 60}>
              <div className="group grid grid-cols-1 gap-2 border-b border-neutral-300 py-7 transition-colors duration-300 hover:bg-neutral-100 lg:grid-cols-12 lg:gap-6">
                <div className="lg:col-span-1">
                  <span className="font-mono text-lg font-bold tabular-nums text-neutral-900">{item.num}</span>
                </div>
                <div className="lg:col-span-4">
                  <h3 className="text-lg font-bold tracking-tight text-balance text-neutral-900">{item.title}</h3>
                </div>
                <div className="lg:col-span-7">
                  <p className="text-[15px] leading-relaxed text-pretty text-neutral-600">{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
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
                <h2 className="text-[22px] sm:text-3xl lg:text-4xl font-bold leading-[1.15] sm:leading-[1.05] tracking-[-0.02em] text-balance text-white">{t.ctaTitle}</h2>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-pretty text-neutral-400">{t.ctaDesc}</p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <a
                  href="/contact?service=website"
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

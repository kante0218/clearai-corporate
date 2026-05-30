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
  return <p className="text-sm font-semibold text-sky-600 mb-4">{children}</p>;
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
    pageDesc: "Next.js + Vercel + Headless CMS で、表示速度・SEO・運用しやすさを最高水準に。このサイト（clearai.jp）と同じ技術スタックで、貴社のサイトも制作します。",
    whyLabel: "Why Now",
    whyTitle: "なぜ今、AIネイティブなサイトが必要か。",
    whyItems: [
      { title: "AI検索への対応", desc: "Google AI Overviews / SGE、ChatGPT Searchなど、AIに引用されるための構造化データ・E-E-A-T設計が必須に。" },
      { title: "速度＝信頼", desc: "表示が3秒遅れるだけで離脱率が大幅に増加。Core Web Vitalsはコンバージョンと直結します。" },
      { title: "更新運用のコスト", desc: "更新のたびに制作会社に依頼する時代は終わり。社内で安全に更新できるCMSと運用設計が必要です。" },
    ],
    typesLabel: "Types",
    typesTitle: "対応する制作タイプ",
    typesDesc: "すべての制作で「速い・直しやすい・AIに見つかる」を標準装備します。",
    typeItems: [
      { num: "01", title: "コーポレートサイト", desc: "ブランド表現と採用・営業のコンバージョンを両立。会社案内のレベルから、SEOで集客できるサイトまで。" },
      { num: "02", title: "サービスサイト / LP", desc: "1サービスに特化したLPから、複数サービスのハブまで。広告連動で成果が出る構成を設計します。" },
      { num: "03", title: "採用サイト", desc: "母集団形成と志望度向上に効くストーリー設計。応募フォーム・ATS連携まで対応。" },
      { num: "04", title: "メディア・オウンドメディア", desc: "Headless CMSとSEO設計で、運用しながら強くなるメディア基盤を構築します。" },
      { num: "05", title: "リニューアル", desc: "既存サイトの全面刷新。アクセス資産を引き継ぎつつ、CV率・表示速度・運用性を全面的に改善。" },
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
      { num: "01", title: "ヒアリング・要件定義", desc: "事業目標・ターゲット・KPIを言語化。サイトの役割を明確に定義します。" },
      { num: "02", title: "情報設計・ワイヤー", desc: "サイトマップ・ワイヤーフレーム・コンテンツ要件を整理。AIで競合・検索意図も分析。" },
      { num: "03", title: "デザイン・実装", desc: "Figmaでデザイン → Next.jsで実装。AI支援で開発スピードを2〜3倍に。" },
      { num: "04", title: "公開・運用支援", desc: "公開後の運用設計、CMS研修、SEO継続改善まで伴走します。" },
    ],
    pricingLabel: "Pricing",
    pricingTitle: "料金の目安",
    pricingDesc: "ページ数・機能要件・運用範囲により変動します。要件整理段階での無料お見積もりが可能です。",
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
    ctaDesc: "「現状のサイトをどう変えるべきか」のご相談から承ります。要件整理段階での無料診断が可能です。",
    ctaButton: "無料相談を申し込む",
  },
  en: {
    pageKicker: "Website Production",
    pageTitle: "Website Production",
    pageDesc: "Next.js + Vercel + Headless CMS — top-tier speed, SEO, and ease of operation. We build your site with the same stack powering clearai.jp.",
    whyLabel: "Why Now",
    whyTitle: "Why AI-native websites matter right now.",
    whyItems: [
      { title: "Visibility in AI search", desc: "Google AI Overviews/SGE, ChatGPT Search — structured data and E-E-A-T design are now essential to be cited by AI." },
      { title: "Speed equals trust", desc: "A 3-second delay sharply raises bounce rates. Core Web Vitals are directly tied to conversions." },
      { title: "The cost of manual updates", desc: "Depending on an agency for every content change is over. You need a CMS and workflow your team can manage safely in-house." },
    ],
    typesLabel: "Types",
    typesTitle: "Production types we handle",
    typesDesc: "Every project ships fast, editable, and discoverable by AI — as standard.",
    typeItems: [
      { num: "01", title: "Corporate site", desc: "Balance brand expression with conversion for recruiting and sales — from a company profile to a site that earns traffic through SEO." },
      { num: "02", title: "Service site / LP", desc: "From a single-service LP to a multi-service hub. We design structures that convert from ad traffic." },
      { num: "03", title: "Recruiting site", desc: "Story-driven design that builds your candidate pool and raises intent. Includes application forms and ATS integration." },
      { num: "04", title: "Media / owned media", desc: "Headless CMS and SEO architecture — a media foundation that gets stronger as you publish." },
      { num: "05", title: "Redesign", desc: "Full-site overhaul. Carry over your traffic equity while improving conversion rate, speed, and operability across the board." },
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
      { num: "03", title: "Design & build", desc: "Figma design → Next.js implementation. AI assistance cuts development time by 2–3x." },
      { num: "04", title: "Launch & ongoing support", desc: "We partner on post-launch operations, CMS training, and continuous SEO improvement." },
    ],
    pricingLabel: "Pricing",
    pricingTitle: "Pricing guide",
    pricingDesc: "Varies by page count, feature requirements, and operational scope. A free estimate is available at the requirements stage.",
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
    ctaDesc: "We start from 'how should we change our current site?' A free assessment is available at the requirements stage.",
    ctaButton: "Book a free consultation",
  },
};

export default function WebsitePage() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  return (
    <>
      {/* PAGE HEADER */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 bg-white border-b border-gray-100">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <p className="text-sm font-semibold text-sky-600 mb-3">{t.pageKicker}</p>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">{t.pageTitle}</h1>
          <p className="text-base text-gray-600 leading-relaxed max-w-2xl">{t.pageDesc}</p>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Pricing</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.pricingTitle}</h2>
            <p className="text-sm text-gray-500 mb-14 max-w-2xl leading-relaxed">
              {t.pricingDesc}
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {t.plans.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 100} className="flex">
                <div className={`rounded-2xl p-8 lg:p-10 transition-all duration-300 flex flex-col w-full ${plan.featured ? "bg-sky-600 text-white shadow-xl" : "bg-white border border-gray-200 hover:shadow-lg"}`}>
                  {plan.featured ? (
                    <span className="inline-block rounded-full bg-white/20 text-white px-3 py-1 text-sm font-semibold mb-4 self-start">Popular</span>
                  ) : (
                    <span aria-hidden="true" className="invisible inline-block rounded-full px-3 py-1 text-sm font-semibold mb-4 self-start">Popular</span>
                  )}
                  <h3 className={`text-lg font-bold mb-2 ${plan.featured ? "text-white" : "text-gray-900"}`}>{plan.name}</h3>
                  <div className="mb-4">
                    <div className="flex items-baseline gap-1 flex-wrap">
                      <span className={`text-3xl font-bold ${plan.featured ? "text-white" : "text-gray-900"}`}>{plan.price}</span>
                      {plan.unit && <span className={`text-sm ${plan.featured ? "text-white/80" : "text-gray-500"}`}>{plan.unit}</span>}
                    </div>
                    {plan.bundleNote && (
                      <p className={`text-xs mt-1 ${plan.featured ? "text-white/80" : "text-gray-500"}`}>{plan.bundleNote}</p>
                    )}
                  </div>
                  <p className={`text-sm leading-relaxed mb-6 ${plan.featured ? "text-white/80" : "text-gray-600"}`}>{plan.desc}</p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${plan.featured ? "bg-white/40" : "bg-sky-500"}`} />
                        <span className={`text-sm ${plan.featured ? "text-white/90" : "text-gray-600"}`}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={plan.href} className={`block text-center text-sm font-semibold py-3 rounded-lg transition-all duration-300 mt-auto ${plan.featured ? "bg-white text-sky-600 hover:bg-sky-50" : "border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900"}`}>{plan.cta}</a>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300}>
            <p className="text-xs text-gray-500 text-center mt-8">{t.pricingFootnote}</p>
          </Reveal>
        </div>
      </section>

      {/* WHY */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Why Now</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-snug mb-14 max-w-2xl">{t.whyTitle}</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.whyItems.map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="rounded-2xl border border-gray-200 bg-white p-8 hover:shadow-lg transition-all duration-300 h-full">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TYPES */}
      <section id="types" className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Types</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.typesTitle}</h2>
            <p className="text-sm text-gray-500 mb-14 max-w-2xl leading-relaxed">
              {t.typesDesc}
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.typeItems.map((item, i) => (
              <Reveal key={item.num} delay={i * 80}>
                <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:border-sky-200 hover:shadow-lg transition-all duration-300 h-full">
                  <span className="text-sm font-bold text-sky-600 mb-3 inline-block">{item.num}</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STACK */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Tech Stack</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-14">{t.stackTitle}</h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {t.stackItems.map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <div className="rounded-xl border border-gray-200 bg-white p-5 h-full">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <p className="text-xs text-gray-500 mt-6">{t.stackNote}</p>
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Process</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-14">{t.processTitle}</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.processItems.map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="rounded-2xl border border-gray-200 bg-white p-8 hover:shadow-lg transition-all duration-300 h-full">
                  <span className="text-xs font-semibold text-sky-600 tracking-widest">{item.num}</span>
                  <h3 className="text-lg font-bold text-gray-900 mt-2 mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Reveal>
            <Label>Contact</Label>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.ctaTitle}</h2>
            <p className="text-base text-gray-600 leading-relaxed mb-10">{t.ctaDesc}</p>
            <a href="/contact?service=website" className="rounded-lg bg-sky-600 text-white font-semibold px-10 py-4 hover:bg-sky-700 transition-colors duration-300 inline-block">{t.ctaButton}</a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

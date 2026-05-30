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

type Plan = {
  name: string; price: string; unit: string; desc: string; features: string[];
  featured: boolean; href: string; cta: string; minTerm: string;
};

type Copy = {
  heroKicker: string; heroTitle: string; heroDesc: string;
  whyLabel: string; whyTitle: string;
  why: { title: string; desc: string }[];
  whatLabel: string; whatTitle: string;
  what: { num: string; title: string; desc: string }[];
  claudeLabel: string; claudeTitle: string; claudeDesc: string;
  claudePoints: string[];
  plansLabel: string; plansTitle: string;
  recommended: string;
  plans: Plan[];
  plansNote: string;
  processLabel: string; processTitle: string;
  process: { num: string; title: string; en: string; desc: string }[];
  faqLabel: string; faqTitle: string;
  faq: { q: string; a: string }[];
  ctaLabel: string; ctaTitle: string; ctaDesc: string; ctaButton: string;
};

const COPY: Record<"ja" | "en", Copy> = {
  ja: {
    heroKicker: "AI Advisor",
    heroTitle: "AI顧問",
    heroDesc: "月額契約で、AI活用の意思決定を継続的に伴走します。戦略から技術選定、PoC評価、社内教育まで。月5万円〜／最低契約期間なし。",
    whyLabel: "Why Advisor",
    whyTitle: "こんなお悩みに、月5万円からお応えします。",
    why: [
      { title: "誰に聞けばいいかわからない", desc: "社内にAI人材がいない、外部ベンダーに聞くと売り込みに変わる。中立な相談相手が欲しい。" },
      { title: "情報の陳腐化が早すぎる", desc: "生成AIは毎月のように新機能が出る。何を試すべきか、何を無視していいかを選別してほしい。" },
      { title: "単発コンサルは続かない", desc: "一度きりの提案書より、日々の意思決定を継続サポートしてくれる顧問の方が成果につながる。" },
    ],
    whatLabel: "What We Do",
    whatTitle: "顧問として提供する内容",
    what: [
      { num: "01", title: "経営・戦略相談", desc: "AI投資の優先順位、組織体制、競合動向まで。大手コンサル出身者が経営の視点で壁打ち相手になります。" },
      { num: "02", title: "技術選定アドバイス", desc: "ChatGPT・Claude・Gemini・オープンソース。中立な立場で貴社のユースケースに合うモデルとツールを選定。" },
      { num: "03", title: "PoC・導入プロジェクト評価", desc: "現在進行中のAIプロジェクトに対するレビュー、リスク洗い出し、改善提案を行います。" },
      { num: "04", title: "社内AIリテラシー支援", desc: "経営会議での勉強会、現場向けのプロンプト指南、社内ガイドライン策定を必要に応じてサポート。" },
    ],
    claudeLabel: "Advisor × Claude",
    claudeTitle: "Claudeの業務導入も、顧問として伴走します。",
    claudeDesc: "AnthropicのClaudeを「導入して終わり」にしないために。顧問契約の中で、Claudeの選定・社内ルール整備・運用定着までを月次で継続支援します。特定ツールの押し売りはせず、貴社の業務に本当に合うかを中立に見極めた上で進めます。",
    claudePoints: [
      "Claude / ChatGPT / Gemini の中立比較と使い分け設計",
      "Claudeの社内導入・アカウント/権限・セキュリティ方針の整備",
      "業務別プロンプト・運用ルールの設計と定着支援",
      "MCP・サブエージェントなど高度活用の継続アドバイス",
    ],
    plansLabel: "Plans",
    plansTitle: "料金プラン",
    recommended: "Recommended",
    plans: [
      {
        name: "ライト", price: "5万円", unit: "/ 月",
        desc: "従業員5名以下の小規模企業・スタートアップ向け。Slack/メール相談中心。",
        features: ["従業員5名以下の企業向け", "Slack/メール相談（営業日内返信）", "月1回のオンライン定例（45分）", "最新AIニュース・モデル動向の共有"],
        featured: false, href: "https://buy.stripe.com/bJe28kd803zWfLc2P2d7q00", cta: "申し込む", minTerm: "最低6ヶ月契約から",
      },
      {
        name: "スタンダード", price: "15万円", unit: "/ 月",
        desc: "従業員6名以上の企業向け。定例会議＋PoC評価で本格推進。",
        features: ["従業員6名以上の企業向け", "ライトプランの全内容を含む", "月2回のオンライン定例（各60分）", "Slack/メール無制限相談（当日返信目安）", "PoC・導入プロジェクトの定期レビュー", "業務フロー別のAI活用設計・技術選定ドキュメント作成", "部署横断のAI活用ロードマップ作成", "社内勉強会（年4回まで）", "導入効果の月次レポーティング"],
        featured: true, href: "https://buy.stripe.com/6oU4gs2tm1rO9mO4Xad7q01", cta: "申し込む", minTerm: "最低6ヶ月契約から",
      },
      {
        name: "エグゼクティブ", price: "30万円〜", unit: "/ 月",
        desc: "経営層直下で意思決定に参画。戦略〜実装を横断。",
        features: ["週次定例＋必要に応じてオンサイト", "経営会議への同席（月1回）", "AI戦略ロードマップ策定", "複数部署の横断アドバイザリー", "外部ベンダー選定同席"],
        featured: false, href: "/contact?service=advisor", cta: "相談する", minTerm: "",
      },
    ],
    plansNote: "表示価格は税抜。業種・業態により個別見積もりとなる場合があります。",
    processLabel: "Process",
    processTitle: "開始までの流れ",
    process: [
      { num: "01", title: "無料相談", en: "Consultation", desc: "貴社の現状と、顧問に期待したい役割をお伺いします（30〜45分）。" },
      { num: "02", title: "プラン提案", en: "Proposal", desc: "お話を踏まえ、最適なプランと担当顧問をご提案します。" },
      { num: "03", title: "契約・キックオフ", en: "Kickoff", desc: "契約締結後、Slackチャンネル開設と初回オンサイト訪問を実施。" },
      { num: "04", title: "継続伴走", en: "Ongoing", desc: "定例会議＋日常相談。成果と運用体制を定期的に見直します。" },
    ],
    faqLabel: "FAQ",
    faqTitle: "よくあるご質問",
    faq: [
      { q: "顧問とコンサルの違いは？", a: "コンサルが「特定プロジェクトの提案・実装」であるのに対し、顧問は「継続的な相談相手」です。必要に応じてコンサルプランとの併用も可能です。" },
      { q: "契約期間の縛りはありますか？", a: "ありません。月単位で更新可能で、合わないと感じた場合はいつでも解約いただけます。" },
      { q: "誰が担当してくれますか？", a: "大手コンサルティングファーム出身者、もしくはAI実装経験豊富なエンジニアが担当します。事前の面談で相性をご確認ください。" },
      { q: "NDAには対応していますか？", a: "もちろんです。顧問契約締結時に相互NDAを結びます。" },
      { q: "オンサイト対応はありますか？", a: "エグゼクティブプランでは月1回を目安に訪問可能です。他プランでも追加料金で対応できます。" },
    ],
    ctaLabel: "Contact",
    ctaTitle: "月5万円から、AIの相談相手を。",
    ctaDesc: "まずは30分の無料相談で、貴社にフィットするかをご確認ください。",
    ctaButton: "無料で相談する",
  },
  en: {
    heroKicker: "AI Advisor",
    heroTitle: "AI Advisor",
    heroDesc: "A monthly engagement that supports your AI decisions on an ongoing basis — from strategy and tool selection to PoC review and internal training. From JPY 50K/month, with no minimum commitment.",
    whyLabel: "Why Advisor",
    whyTitle: "We answer these concerns — from JPY 50K/month.",
    why: [
      { title: "We don't know who to ask", desc: "No AI talent in-house, and asking a vendor turns into a sales pitch. You want a neutral sounding board." },
      { title: "Information goes stale too fast", desc: "Generative AI ships new features almost monthly. You want someone to sort what's worth trying from what to ignore." },
      { title: "One-off consulting doesn't last", desc: "More than a one-time proposal deck, an advisor who supports daily decisions drives real results." },
    ],
    whatLabel: "What We Do",
    whatTitle: "What we provide as your advisor",
    what: [
      { num: "01", title: "Management & strategy", desc: "AI investment priorities, org structure, competitive trends — ex-top-tier consultants as your sparring partner from a management lens." },
      { num: "02", title: "Tool selection advice", desc: "ChatGPT, Claude, Gemini, open source — we neutrally pick the model and tools that fit your use case." },
      { num: "03", title: "PoC & project review", desc: "We review your in-flight AI projects, surface risks, and propose improvements." },
      { num: "04", title: "Internal AI literacy", desc: "Study sessions for leadership, prompt guidance for the field, and internal guideline development as needed." },
    ],
    claudeLabel: "Advisor × Claude",
    claudeTitle: "We support adopting Claude, too — as your advisor.",
    claudeDesc: "So Anthropic's Claude doesn't end at 'we rolled it out.' Within the advisory engagement, we provide ongoing monthly support for selecting Claude, setting internal rules, and embedding it into operations. No tool push — we first judge neutrally whether it truly fits your operations.",
    claudePoints: [
      "Neutral comparison and role split across Claude / ChatGPT / Gemini",
      "Claude rollout: accounts, permissions, and security policy",
      "Per-workflow prompt and operating-rule design, with adoption support",
      "Ongoing advice on advanced use such as MCP and sub-agents",
    ],
    plansLabel: "Plans",
    plansTitle: "Pricing plans",
    recommended: "Recommended",
    plans: [
      {
        name: "Light", price: "JPY 50K", unit: "/ mo",
        desc: "For small companies and startups with 5 or fewer employees. Mainly Slack/email support.",
        features: ["For companies with 5 or fewer employees", "Slack/email support (reply within business days)", "Monthly online session (45 min)", "Latest AI news & model trends"],
        featured: false, href: "https://buy.stripe.com/bJe28kd803zWfLc2P2d7q00", cta: "Get started", minTerm: "6-month minimum",
      },
      {
        name: "Standard", price: "JPY 150K", unit: "/ mo",
        desc: "For companies with 6 or more employees. Regular sessions + PoC review for serious rollout.",
        features: ["For companies with 6 or more employees", "Everything in Light", "2 online sessions/month (60 min each)", "Unlimited Slack/email support (same-day reply)", "Regular PoC & rollout project reviews", "Per-workflow AI design & tool-selection docs", "Cross-department AI adoption roadmap", "Internal study sessions (up to 4/year)", "Monthly impact reporting"],
        featured: true, href: "https://buy.stripe.com/6oU4gs2tm1rO9mO4Xad7q01", cta: "Get started", minTerm: "6-month minimum",
      },
      {
        name: "Executive", price: "From JPY 300K", unit: "/ mo",
        desc: "Engaged directly with leadership in decision-making. Strategy to implementation.",
        features: ["Weekly sessions + on-site as needed", "Board-meeting attendance (monthly)", "AI strategy roadmap", "Cross-department advisory", "Vendor-selection support"],
        featured: false, href: "/contact?service=advisor", cta: "Get in touch", minTerm: "",
      },
    ],
    plansNote: "Prices exclude tax. Custom quotes may apply depending on industry and business type.",
    processLabel: "Process",
    processTitle: "How to get started",
    process: [
      { num: "01", title: "Free consultation", en: "Consultation", desc: "We learn about your current state and the role you'd want an advisor to play (30–45 min)." },
      { num: "02", title: "Plan proposal", en: "Proposal", desc: "Based on the conversation, we propose the best plan and your assigned advisor." },
      { num: "03", title: "Contract & kickoff", en: "Kickoff", desc: "After signing, we open a Slack channel and run the first on-site visit." },
      { num: "04", title: "Ongoing partnership", en: "Ongoing", desc: "Regular sessions plus day-to-day support, reviewing outcomes and structure regularly." },
    ],
    faqLabel: "FAQ",
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "How is an advisor different from consulting?", a: "Consulting is 'proposing and implementing a specific project,' while an advisor is 'an ongoing sounding board.' The two can be combined as needed." },
      { q: "Is there a lock-in period?", a: "No. It renews monthly, and you can cancel anytime if it isn't a fit." },
      { q: "Who will be in charge?", a: "An ex-top-tier consultant or an engineer with deep AI implementation experience. Check the fit in an upfront meeting." },
      { q: "Do you handle NDAs?", a: "Of course. We sign a mutual NDA when the advisory contract begins." },
      { q: "Do you offer on-site support?", a: "The Executive plan includes roughly monthly visits. Other plans can add visits for an extra fee." },
    ],
    ctaLabel: "Contact",
    ctaTitle: "An AI sounding board — from JPY 50K/month.",
    ctaDesc: "Start with a free 30-minute consultation to see if we're a fit.",
    ctaButton: "Book a free consultation",
  },
};

export default function AdvisorPage() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  return (
    <>
      {/* PAGE HEADER */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 bg-white border-b border-gray-100">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <p className="text-sm font-semibold text-sky-600 mb-3">{t.heroKicker}</p>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">{t.heroTitle}</h1>
          <p className="text-base text-gray-600 leading-relaxed max-w-2xl">{t.heroDesc}</p>
        </div>
      </section>

      {/* PLANS */}
      <section id="plans" className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.plansLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-14">{t.plansTitle}</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {t.plans.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 100} className="flex">
                <div className={`rounded-2xl p-8 lg:p-10 transition-all duration-300 flex flex-col w-full ${plan.featured ? "bg-sky-600 text-white shadow-xl" : "bg-white border border-gray-200 hover:shadow-lg"}`}>
                  {plan.featured && <span className="inline-block rounded-full bg-white/20 text-white px-3 py-1 text-sm font-semibold mb-4 self-start">{t.recommended}</span>}
                  <h3 className={`text-lg font-bold mb-2 ${plan.featured ? "text-white" : "text-gray-900"}`}>{plan.name}</h3>
                  <div className="mb-4 flex items-baseline gap-1">
                    <span className={`text-3xl font-bold ${plan.featured ? "text-white" : "text-gray-900"}`}>{plan.price}</span>
                    <span className={`text-sm ${plan.featured ? "text-white/80" : "text-gray-500"}`}>{plan.unit}</span>
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
                  {plan.minTerm && (
                    <p className={`text-xs text-center mb-3 ${plan.featured ? "text-white/80" : "text-gray-500"}`}>※{plan.minTerm}</p>
                  )}
                  <a href={plan.href} className={`block text-center text-sm font-semibold py-3 rounded-lg transition-all duration-300 mt-auto ${plan.featured ? "bg-white text-sky-600 hover:bg-sky-50" : "border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900"}`}>{plan.cta}</a>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300}>
            <p className="text-xs text-gray-500 text-center mt-8">{t.plansNote}</p>
          </Reveal>
        </div>
      </section>

      {/* WHY */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.whyLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-snug mb-6 max-w-2xl">{t.whyTitle}</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.why.map((item, i) => (
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

      {/* SERVICES */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.whatLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-14">{t.whatTitle}</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.what.map((item, i) => (
              <Reveal key={item.num} delay={i * 100}>
                <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:border-sky-200 hover:shadow-lg transition-all duration-300">
                  <span className="text-sm font-bold text-sky-600">{item.num}</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-3 mb-4">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CLAUDE INTEGRATION */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <div className="rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <Reveal>
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 mb-4">
                  <span className="w-2 h-2 rounded-full bg-orange-500" />{t.claudeLabel}
                </p>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-snug mb-5">{t.claudeTitle}</h2>
                <p className="text-sm text-gray-600 leading-relaxed">{t.claudeDesc}</p>
              </Reveal>
              <Reveal delay={120}>
                <ul className="space-y-3">
                  {t.claudePoints.map((p) => (
                    <li key={p} className="flex items-start gap-3 rounded-xl bg-white border border-orange-100 p-4">
                      <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
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
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.processLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-14">{t.processTitle}</h2>
          </Reveal>
          {t.process.map((step, i) => (
            <Reveal key={step.num} delay={i * 100}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-10 border-b border-gray-100 last:border-0">
                <div className="lg:col-span-1"><span className="text-sm font-bold text-sky-600">{step.num}</span></div>
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
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.faqLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-14">{t.faqTitle}</h2>
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
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Reveal>
            <Label>{t.ctaLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.ctaTitle}</h2>
            <p className="text-base text-gray-600 leading-relaxed mb-10">{t.ctaDesc}</p>
            <a href="/contact?service=advisor" className="rounded-lg bg-sky-600 text-white font-semibold px-10 py-4 hover:bg-sky-700 transition-colors duration-300 inline-block">{t.ctaButton}</a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

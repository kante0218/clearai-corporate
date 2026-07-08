"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
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
      <h2 className={`mt-8 max-w-4xl text-[22px] sm:text-3xl lg:text-4xl font-bold leading-[1.15] sm:leading-[1.05] tracking-[-0.02em] text-balance ${dark ? "text-white" : "text-neutral-900"}`}>
        {title}
      </h2>
      {desc && <p className={`mt-5 max-w-2xl text-[15px] leading-relaxed text-pretty ${dark ? "text-neutral-400" : "text-neutral-600"}`}>{desc}</p>}
    </Reveal>
  );
}

type Plan = {
  name: string; price: string; unit: string; desc: string; features: string[];
  featured: boolean; href: string; cta: string; minTerm: string;
};

/* Pricing plans: 3-up grid on desktop, swipeable + auto-advancing carousel on mobile (SP). */
function PlansCarousel({ plans, recommended }: { plans: Plan[]; recommended: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const pausedRef = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const indexFromScroll = (el: HTMLDivElement) => {
    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-plan-card]"));
    const center = el.scrollLeft + el.clientWidth / 2;
    let best = 0, bestDist = Infinity;
    cards.forEach((c, i) => {
      const cc = c.offsetLeft + c.offsetWidth / 2;
      const d = Math.abs(cc - center);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    return best;
  };

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelectorAll<HTMLElement>("[data-plan-card]")[i];
    if (!card) return;
    el.scrollTo({ left: card.offsetLeft - (el.clientWidth - card.clientWidth) / 2, behavior: "smooth" });
  };

  // Track the active card as the user scrolls.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setActive(indexFromScroll(el)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => { el.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  // Auto-advance on mobile only, paused on interaction / when off-screen / reduced motion.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.3 });
    io.observe(el);
    const isMobile = () => window.matchMedia("(max-width: 767px)").matches;
    const id = setInterval(() => {
      if (pausedRef.current || !visible || !isMobile()) return;
      const cards = el.querySelectorAll<HTMLElement>("[data-plan-card]");
      if (cards.length < 2) return;
      goTo((indexFromScroll(el) + 1) % cards.length);
    }, 3500);
    return () => { clearInterval(id); io.disconnect(); };
  }, []);

  const pause = () => { pausedRef.current = true; if (resumeTimer.current) clearTimeout(resumeTimer.current); };
  const resumeLater = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => { pausedRef.current = false; }, 5000);
  };

  return (
    <>
      <div
        ref={trackRef}
        onPointerDown={pause}
        onPointerUp={resumeLater}
        onMouseEnter={pause}
        onMouseLeave={resumeLater}
        className="flex md:grid md:grid-cols-3 gap-5 md:gap-6 items-stretch overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none -mx-6 px-6 md:mx-0 md:px-0 pb-1 md:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {plans.map((plan, pi) => (
          <div key={plan.name} data-plan-card className="snap-center shrink-0 w-[82%] sm:w-[60%] md:w-full flex">
            <div className={`p-6 lg:p-8 flex flex-col w-full border ${plan.featured ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-900 bg-white"}`}>
              <div className={`mb-5 flex items-center justify-between border-b pb-3 ${plan.featured ? "border-white/25" : "border-neutral-200"}`}>
                <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.18em] ${plan.featured ? "text-white" : "text-neutral-900"}`}>
                  {plan.featured ? recommended : `Plan ${String(pi + 1).padStart(2, "0")}`}
                </span>
                <span className={`font-mono text-[10px] tabular-nums ${plan.featured ? "text-white/50" : "text-neutral-400"}`}>{String(pi + 1).padStart(2, "0")}</span>
              </div>
              <h3 className={`text-base font-bold tracking-tight mb-2 ${plan.featured ? "text-white" : "text-neutral-900"}`}>{plan.name}</h3>
              <div className="mb-3 flex items-baseline gap-1">
                <span className={`font-mono text-2xl font-bold tabular-nums tracking-tight ${plan.featured ? "text-white" : "text-neutral-900"}`}>{plan.price}</span>
                <span className={`font-mono text-xs ${plan.featured ? "text-white/70" : "text-neutral-500"}`}>{plan.unit}</span>
              </div>
              <p className={`text-xs leading-relaxed text-pretty mb-5 ${plan.featured ? "text-white/80" : "text-neutral-600"}`}>{plan.desc}</p>
              <ul className={`space-y-2.5 mb-5 flex-1 border-t pt-4 font-mono ${plan.featured ? "border-white/25" : "border-neutral-200"}`}>
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className={`flex-shrink-0 ${plan.featured ? "text-white" : "text-neutral-900"}`}>→</span>
                    <span className={`text-xs leading-snug ${plan.featured ? "text-white/90" : "text-neutral-600"}`}>{f}</span>
                  </li>
                ))}
              </ul>
              {plan.minTerm && (
                <p className={`font-mono text-[10px] uppercase tracking-[0.12em] text-center mb-4 ${plan.featured ? "text-white/70" : "text-neutral-400"}`}>※{plan.minTerm}</p>
              )}
              <a href={plan.href} className={`group/cta inline-flex items-center justify-center gap-2 text-center border font-mono text-xs font-bold uppercase tracking-[0.08em] py-3 mt-auto transition-[color,background-color,border-color,scale] duration-300 active:scale-[0.96] ${plan.featured ? "border-white bg-white text-neutral-900 hover:bg-transparent hover:text-white" : "border-neutral-900 bg-white text-neutral-900 hover:bg-neutral-900 hover:text-white"}`}>
                {plan.cta}
                <span className="transition-transform duration-300 group-hover/cta:translate-x-1">→</span>
              </a>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination dots (mobile only) */}
      <div className="flex items-center md:hidden justify-center gap-1.5 mt-1">
        {plans.map((plan, i) => (
          <button
            key={plan.name}
            type="button"
            aria-label={`${plan.name}を表示`}
            aria-current={active === i}
            onClick={() => { pause(); goTo(i); resumeLater(); }}
            style={{ display: "block", flex: "none", alignSelf: "center", width: active === i ? 8 : 6, height: active === i ? 8 : 6, minWidth: 0, minHeight: 0, padding: 0, border: 0, borderRadius: 9999, background: active === i ? "#171717" : "#d1d5db", appearance: "none", WebkitAppearance: "none", transition: "background .3s, width .3s, height .3s" }}
          />
        ))}
      </div>
    </>
  );
}

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
    heroDesc: "月額2.5万円〜でAI活用の意思決定を継続的に伴走し、チャット相談から内製化支援・IT全般まで対応します（ライトは限定10社）。",
    whyLabel: "Why Advisor",
    whyTitle: "こんなお悩みに、月2.5万円からお応えします。",
    why: [
      { title: "誰に聞けばいいかわからない", desc: "社内にAI人材がおらず外部ベンダーは売り込みに変わるため、中立な相談相手を求めている。" },
      { title: "情報の陳腐化が早すぎる", desc: "生成AIは毎月のように新機能が出るため、試すべきものと無視していいものを選別してほしい。" },
      { title: "単発コンサルは続かない", desc: "一度きりの提案書より、日々の意思決定を継続サポートしてくれる顧問の方が成果につながる。" },
    ],
    whatLabel: "What We Do",
    whatTitle: "顧問として提供する内容",
    what: [
      { num: "01", title: "経営・戦略相談", desc: "AI投資の優先順位・組織体制・競合動向まで、大手コンサル出身者が経営の視点で壁打ち相手になります。" },
      { num: "02", title: "技術選定アドバイス", desc: "ChatGPT・Claude・Gemini・オープンソースを中立な立場で比較し、貴社のユースケースに合うモデルとツールを選定します。" },
      { num: "03", title: "PoC・導入プロジェクト評価", desc: "現在進行中のAIプロジェクトに対するレビュー、リスク洗い出し、改善提案を行います。" },
      { num: "04", title: "社内AIリテラシー支援", desc: "経営会議での勉強会、現場向けのプロンプト指南、社内ガイドライン策定を必要に応じてサポート。" },
    ],
    claudeLabel: "Advisor × Claude",
    claudeTitle: "Claudeの業務導入も、顧問として伴走します。",
    claudeDesc: "顧問契約の中でClaudeの選定・社内ルール整備・運用定着まで月次で継続支援し、特定ツールの押し売りをせず中立に見極めた上で進めます。",
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
        name: "ライト", price: "2.5万円", unit: "/ 月",
        desc: "まず相談先を持ちたい小規模企業向け。LINE・Slack・Discord等で日常相談を受け付けます。",
        features: ["限定10社", "LINE / Slack / Discord などでのサポート", "月2回以上のミーティング参加", "AIツール選定・使い方の相談", "最新AIニュース・モデル動向の共有"],
        featured: false, href: "https://buy.stripe.com/4gM8wI0legmI6aCexKd7q0e", cta: "限定枠に申し込む", minTerm: "限定10社",
      },
      {
        name: "スタンダード", price: "10万円", unit: "/ 月",
        desc: "AI活用を社内に根付かせたい企業向け。実地・オンラインを組み合わせて内製化を支援します。",
        features: ["ライトプランの全内容を含む", "内製化に向けた実地・オンライン伴走", "業務フロー別のAI活用設計", "PoC・導入プロジェクトのレビュー", "社内勉強会・運用ルール整備", "IT・テクノロジー全般の相談対応"],
        featured: true, href: "https://buy.stripe.com/5kQdR2aZS8Ug8iKdtGd7q0c", cta: "申し込む", minTerm: "最低3ヶ月契約から",
      },
      {
        name: "エンタープライズ", price: "20万円", unit: "/ 月",
        desc: "大企業・エンタープライズ向け。複数部署・経営層をまたぐAI/IT活用を支援します。",
        features: ["スタンダードプランの全内容を含む", "複数部署の横断アドバイザリー", "経営会議・重要会議への参加", "AI/IT戦略ロードマップ策定", "外部ベンダー選定・要件整理の支援", "セキュリティ・ガバナンス観点の壁打ち"],
        featured: false, href: "https://buy.stripe.com/aFa3coaZS1rO6aCdtGd7q0d", cta: "申し込む", minTerm: "大企業・エンプラ向け",
      },
    ],
    plansNote: "表示価格は税抜。業種・業態により個別見積もりとなる場合があります。",
    processLabel: "Process",
    processTitle: "開始までの流れ",
    process: [
      { num: "01", title: "無料相談", en: "Consultation", desc: "貴社の現状と、顧問に期待したい役割をお伺いします（30〜45分）。" },
      { num: "02", title: "プラン提案", en: "Proposal", desc: "お話を踏まえ、最適なプランと担当顧問をご提案します。" },
      { num: "03", title: "契約・キックオフ", en: "Kickoff", desc: "契約締結後、連絡チャンネルを整備し、初回キックオフで支援範囲と進め方を確定します。" },
      { num: "04", title: "継続伴走", en: "Ongoing", desc: "定例会議＋日常相談で継続支援し、成果と運用体制を定期的に見直します。" },
    ],
    faqLabel: "FAQ",
    faqTitle: "よくあるご質問",
    faq: [
      { q: "顧問とコンサルの違いは？", a: "コンサルが「特定プロジェクトの提案・実装」であるのに対し、顧問は「継続的な相談相手」で、必要に応じてコンサルプランとの併用も可能です。" },
      { q: "契約期間の縛りはありますか？", a: "ライトは限定10社の月額制、スタンダード以上は最低3ヶ月契約からで、以降は月単位で更新可能です。" },
      { q: "誰が担当してくれますか？", a: "大手コンサルファーム出身者またはAI実装経験豊富なエンジニアが担当し、事前の面談で相性をご確認いただけます。" },
      { q: "NDAには対応していますか？", a: "もちろんです。顧問契約締結時に相互NDAを結びます。" },
      { q: "オンサイト対応はありますか？", a: "エンタープライズプランでは対面対応が可能で、他プランも追加料金で対応できます。" },
    ],
    ctaLabel: "Contact",
    ctaTitle: "月2.5万円から、AIの相談相手を。",
    ctaDesc: "まずは30分の無料相談で、貴社にフィットするかをご確認ください。",
    ctaButton: "無料で相談する",
  },
  en: {
    heroKicker: "AI Advisor",
    heroTitle: "AI Advisor",
    heroDesc: "A monthly engagement (from JPY 25K) that supports your AI decisions on an ongoing basis — chat consultation, internalization, and IT/technology advice; Light plan is limited to 10 companies.",
    whyLabel: "Why Advisor",
    whyTitle: "We answer these concerns — from JPY 25K/month.",
    why: [
      { title: "We don't know who to ask", desc: "With no AI talent in-house and vendors that turn into sales pitches, you need a neutral sounding board." },
      { title: "Information goes stale too fast", desc: "Generative AI ships new features almost monthly, and you need someone to sort what's worth trying from what to ignore." },
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
    claudeDesc: "Within the advisory engagement, we provide ongoing monthly support for selecting Claude, setting internal rules, and embedding it into operations — without pushing the tool until we've neutrally confirmed it fits.",
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
        name: "Light", price: "JPY 25K", unit: "/ mo",
        desc: "For small companies wanting a first point of contact. Daily support via LINE/Slack/Discord.",
        features: ["Limited to 10 companies", "Support via LINE / Slack / Discord", "2+ meetings per month", "AI tool selection & usage advice", "Latest AI news & model trends"],
        featured: false, href: "https://buy.stripe.com/4gM8wI0legmI6aCexKd7q0e", cta: "Apply for a limited slot", minTerm: "Limited to 10 companies",
      },
      {
        name: "Standard", price: "JPY 100K", unit: "/ mo",
        desc: "For companies embedding AI in-house. On-site + online support to drive internalization.",
        features: ["Everything in Light", "On-site & online support for internalization", "Per-workflow AI adoption design", "PoC & rollout project reviews", "Internal study sessions & operating rules", "IT & technology general consultation"],
        featured: true, href: "https://buy.stripe.com/5kQdR2aZS8Ug8iKdtGd7q0c", cta: "Get started", minTerm: "3-month minimum",
      },
      {
        name: "Enterprise", price: "JPY 200K", unit: "/ mo",
        desc: "For large/enterprise companies. Supports cross-department, executive-level AI/IT adoption.",
        features: ["Everything in Standard", "Cross-department advisory", "Board & key-meeting attendance", "AI/IT strategy roadmap", "Vendor selection & requirements support", "Security & governance sparring"],
        featured: false, href: "https://buy.stripe.com/aFa3coaZS1rO6aCdtGd7q0d", cta: "Get started", minTerm: "For large enterprises",
      },
    ],
    plansNote: "Prices exclude tax. Custom quotes may apply depending on industry and business type.",
    processLabel: "Process",
    processTitle: "How to get started",
    process: [
      { num: "01", title: "Free consultation", en: "Consultation", desc: "We learn about your current state and the role you'd want an advisor to play (30–45 min)." },
      { num: "02", title: "Plan proposal", en: "Proposal", desc: "Based on the conversation, we propose the best plan and your assigned advisor." },
      { num: "03", title: "Contract & kickoff", en: "Kickoff", desc: "After signing, we set up communication channels and run the first kickoff to define scope and approach." },
      { num: "04", title: "Ongoing partnership", en: "Ongoing", desc: "Regular sessions plus day-to-day support, reviewing outcomes and structure regularly." },
    ],
    faqLabel: "FAQ",
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "How is an advisor different from consulting?", a: "Consulting is 'proposing and implementing a specific project,' while an advisor is 'an ongoing sounding board' — the two can be combined as needed." },
      { q: "Is there a lock-in period?", a: "Light is a monthly plan limited to 10 companies; Standard and above start with a 3-month minimum, then renew monthly." },
      { q: "Who will be in charge?", a: "An ex-top-tier consultant or engineer with deep AI implementation experience — check fit in an upfront meeting." },
      { q: "Do you handle NDAs?", a: "Of course. We sign a mutual NDA when the advisory contract begins." },
      { q: "Do you offer on-site support?", a: "The Enterprise plan includes in-person support such as key-meeting attendance; other plans can add visits for an extra fee." },
    ],
    ctaLabel: "Contact",
    ctaTitle: "An AI sounding board — from JPY 25K/month.",
    ctaDesc: "Start with a free 30-minute consultation to see if we're a fit.",
    ctaButton: "Book a free consultation",
  },
};

export default function AdvisorPage() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  return (
    <>
      {/* MASTHEAD */}
      <section className="bg-white pt-32 lg:pt-40 pb-4 lg:pb-5">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-neutral-900 pb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
              <span className="font-bold text-neutral-900">§00</span>
              <span>{t.heroKicker}</span>
              <span className="text-neutral-300">/</span>
              <span>Advisory</span>
              <span className="text-neutral-300">/</span>
              <span>Ongoing</span>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="mt-10 text-[10vw] sm:text-5xl lg:text-7xl font-bold leading-[0.95] tracking-[-0.04em] text-balance text-neutral-900">
              {t.heroTitle}
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-8 max-w-2xl text-base lg:text-lg leading-relaxed text-pretty text-neutral-600">{t.heroDesc}</p>
          </Reveal>
        </div>
      </section>

      {/* PLANS */}
      <section id="plans" className="py-20 lg:py-28 bg-neutral-50 border-y border-neutral-900">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="01" kicker={t.plansLabel} title={t.plansTitle} />
          <PlansCarousel plans={t.plans} recommended={t.recommended} />
          <Reveal delay={300}>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.12em] text-neutral-500 text-center">{t.plansNote}</p>
          </Reveal>
        </div>
      </section>

      {/* WHY */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="02" kicker={t.whyLabel} title={t.whyTitle} />
          <CardCarousel gridClass="md:grid-cols-3">
            {t.why.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="group h-full border border-neutral-900 bg-white p-8 lg:p-10 transition-colors duration-300 hover:bg-neutral-900">
                  <div className="mb-6 flex items-center justify-between border-b border-neutral-200 pb-3 transition-colors duration-300 group-hover:border-neutral-700">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-900 transition-colors duration-300 group-hover:text-white">Pain</span>
                    <span className="font-mono text-[10px] tabular-nums text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mb-3 text-lg lg:text-xl font-bold tracking-tight text-balance text-neutral-900 transition-colors duration-300 group-hover:text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-pretty text-neutral-600 transition-colors duration-300 group-hover:text-neutral-300">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 lg:py-28 bg-neutral-50 border-y border-neutral-900">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="03" kicker={t.whatLabel} title={t.whatTitle} />
          <CardCarousel gridClass="md:grid-cols-2">
            {t.what.map((item, i) => (
              <Reveal key={item.num} delay={i * 80}>
                <div className="group h-full border border-neutral-900 bg-white p-8 lg:p-10 transition-colors duration-300 hover:bg-neutral-900">
                  <div className="flex items-baseline justify-between border-b border-neutral-200 pb-4 transition-colors duration-300 group-hover:border-neutral-700">
                    <span className="font-mono text-2xl font-bold tabular-nums text-neutral-900 transition-colors duration-300 group-hover:text-white">{item.num}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">Service / {item.num}</span>
                  </div>
                  <h3 className="mt-6 text-xl lg:text-2xl font-bold tracking-tight text-balance text-neutral-900 transition-colors duration-300 group-hover:text-white">{item.title}</h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-pretty text-neutral-600 transition-colors duration-300 group-hover:text-neutral-300">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* CLAUDE INTEGRATION */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <div className="border border-neutral-900 bg-white">
            <div className="grid lg:grid-cols-2">
              <Reveal className="border-b border-neutral-900 p-8 lg:p-12 lg:border-b-0 lg:border-r">
                <div className="flex items-center gap-4 border-b border-neutral-900 pb-4">
                  <span className="font-mono text-xs font-bold tabular-nums text-neutral-900">§04</span>
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-neutral-500">{t.claudeLabel}</span>
                </div>
                <h2 className="mt-8 text-[24px] sm:text-3xl lg:text-4xl font-bold leading-[1.15] sm:leading-[1.05] tracking-[-0.02em] text-balance text-neutral-900">{t.claudeTitle}</h2>
                <p className="mt-5 text-[15px] leading-relaxed text-pretty text-neutral-600">{t.claudeDesc}</p>
              </Reveal>
              <Reveal delay={120} className="p-8 lg:p-12">
                <ul className="border-t border-neutral-200 font-mono">
                  {t.claudePoints.map((p, i) => (
                    <li key={p} className="flex items-start gap-3 border-b border-neutral-200 py-4">
                      <span className="flex-shrink-0 font-mono text-[10px] tabular-nums text-neutral-400 mt-1">{String(i + 1).padStart(2, "0")}</span>
                      <span className="flex-shrink-0 text-neutral-900">→</span>
                      <span className="text-sm leading-snug text-neutral-700">{p}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 lg:py-28 bg-neutral-50 border-y border-neutral-900">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="05" kicker={t.processLabel} title={t.processTitle} />
          <div className="hidden lg:grid grid-cols-12 gap-6 border-b border-neutral-900 pb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
            <div className="col-span-1">No.</div>
            <div className="col-span-3">Phase</div>
            <div className="col-span-8">Detail</div>
          </div>
          {t.process.map((step, i) => (
            <Reveal key={step.num} delay={i * 60}>
              <div className="group grid grid-cols-1 gap-2 border-b border-neutral-300 py-7 transition-colors duration-300 hover:bg-neutral-100 lg:grid-cols-12 lg:gap-6">
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
          <SectionHead index="06" kicker={t.faqLabel} title={t.faqTitle} />
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
      <section className="bg-neutral-900 py-24 lg:py-32">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="flex items-center gap-4 border-b border-neutral-700 pb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
              <span className="font-bold text-white">§07</span>
              <span>{t.ctaLabel}</span>
            </div>
            <div className="mt-12 grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <h2 className="text-[22px] sm:text-3xl lg:text-4xl font-bold leading-[1.15] sm:leading-[1.05] tracking-[-0.02em] text-balance text-white">{t.ctaTitle}</h2>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-pretty text-neutral-400">{t.ctaDesc}</p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <a
                  href="/contact?service=advisor"
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

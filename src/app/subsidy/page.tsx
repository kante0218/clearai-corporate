"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)",
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
      <h2 className={`mt-8 text-[20px] sm:text-2xl lg:text-3xl font-bold leading-[1.15] sm:leading-[1.05] tracking-[-0.02em] text-balance ${dark ? "text-white" : "text-neutral-900"}`}>
        {title}
      </h2>
      {desc && <p className={`mt-6 text-[15px] leading-relaxed text-pretty ${dark ? "text-neutral-400" : "text-neutral-600"}`}>{desc}</p>}
    </Reveal>
  );
}

type CompanySize = "small" | "large";

function formatYen(n: number) {
  return "¥" + Math.round(n).toLocaleString("ja-JP");
}

type Copy = {
  pageLabel: string;
  pageTitle: string;
  pageDesc: string;
  programsLabel: string;
  programsTitle: string;
  programsDesc: string;
  programs: {
    tag: string;
    title: string;
    subtitle: string;
    desc: string;
    metrics: { label: string; value: string }[];
    ideal: string;
    idealLabel: string;
  }[];
  simulatorLabel: string;
  simulatorTitle: string;
  simulatorDesc: string;
  simCondTitle: string;
  simCompanySize: string;
  simSmall: string;
  simLarge: string;
  simPeople: string;
  simPeopleUnit: string;
  simHours: string;
  simHoursUnit: string;
  simHoursWarning: string;
  simHourlyFee: string;
  simWage: string;
  simResultTitle: string;
  simRowTraining: string;
  simRowExpense: (rate: string) => string;
  simRowWage: (rate: string) => string;
  simNetLabel: string;
  simTotalLabel: string;
  simNote: string;
  simCta: string;
  supportLabel: string;
  supportTitle: string;
  support: { num: string; title: string; desc: string }[];
  supportDisclaimer: string;
  supportDisclaimerBody: string;
  flowLabel: string;
  flowTitle: string;
  flow: { step: string; title: string; desc: string; duration: string }[];
  faqLabel: string;
  faqTitle: string;
  faq: { q: string; a: string }[];
  ctaLabel: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaButton: string;
  ctaSecondary: string;
};

const COPY: Record<"ja" | "en", Copy> = {
  ja: {
    pageLabel: "Subsidy Support",
    pageTitle: "補助金サポート",
    pageDesc: "人材開発支援助成金・IT導入補助金・茨城県独自制度を活用し、研修費・AI導入費を最大75%削減できるよう計画策定から支給申請まで一貫サポートします。",
    programsLabel: "Programs",
    programsTitle: "対応する3つの支援制度",
    programsDesc: "AI研修・AI導入プロジェクトに最も適した制度を、貴社の事業ステージと目的に合わせてご提案します。",
    programs: [
      {
        tag: "国",
        title: "人材開発支援助成金",
        subtitle: "事業展開等リスキリング支援コース",
        desc: "新規事業・DX推進の研修に使える厚労省の制度で、AI・生成AI研修に極めて相性が良く、経費最大75%と受講者賃金を助成。",
        metrics: [
          { label: "経費助成（中小）", value: "75%" },
          { label: "賃金助成", value: "960円/人・時間" },
          { label: "1人あたり上限", value: "最大50万円" },
        ],
        ideal: "AI研修・プロンプト研修・DX人材育成",
        idealLabel: "活用シーン：",
      },
      {
        tag: "国",
        title: "IT導入補助金",
        subtitle: "通常枠 / インボイス対応枠 等",
        desc: "AIツール・SaaS・業務自動化システムの導入費用を補助する制度で、clearAIのコンサル＋導入パッケージと組み合わせて活用できます。",
        metrics: [
          { label: "補助率", value: "最大 1/2〜3/4" },
          { label: "補助額", value: "〜450万円" },
          { label: "対象", value: "ソフトウェア・導入費" },
        ],
        ideal: "AIツール導入・業務自動化・RAG構築",
        idealLabel: "活用シーン：",
      },
      {
        tag: "県・市",
        title: "茨城県・地方自治体支援",
        subtitle: "DX推進／中小企業人材開発等",
        desc: "茨城県および県内市町村が独自に実施するDX・生成AI・人材育成の助成制度で、当社拠点の茨城県制度に特に精通しています。",
        metrics: [
          { label: "対象", value: "県内中小企業等" },
          { label: "補助率", value: "制度により50〜75%" },
          { label: "特徴", value: "国制度と併用可の場合あり" },
        ],
        ideal: "地元企業のDX支援・小規模導入",
        idealLabel: "活用シーン：",
      },
    ],
    simulatorLabel: "Simulator",
    simulatorTitle: "実質負担額を、その場で計算。",
    simulatorDesc: "受講人数・研修時間・企業規模を入力するだけで、人材開発支援助成金（事業展開等リスキリング支援コース）の概算が即座に表示されます。",
    simCondTitle: "シミュレーション条件",
    simCompanySize: "企業規模",
    simSmall: "中小企業（75%）",
    simLarge: "大企業（60%）",
    simPeople: "受講者数",
    simPeopleUnit: "人",
    simHours: "研修時間（1人あたり）",
    simHoursUnit: "時間",
    simHoursWarning: "※ 助成金は研修時間10時間以上が要件です。",
    simHourlyFee: "研修単価（1人・1時間）",
    simWage: "受講者の平均時給",
    simResultTitle: "試算結果",
    simRowTraining: "研修費用（通常）",
    simRowExpense: (rate) => `経費助成（${rate}%）`,
    simRowWage: (rate) => `賃金助成（${rate}円/人・時間）`,
    simNetLabel: "実質負担額",
    simTotalLabel: "助成金総額",
    simNote: "※ 本試算は「人材開発支援助成金・事業展開等リスキリング支援コース」を前提にした概算です。実際の支給額は労働局の審査により変動します。正確な見積もりは無料相談をご利用ください。",
    simCta: "この条件で相談する →",
    supportLabel: "Our Support",
    supportTitle: "clearAIのサポート範囲",
    support: [
      { num: "01", title: "制度診断", desc: "事業規模・目的・実施予定からベストな助成金の組み合わせをご提案。" },
      { num: "02", title: "訓練計画策定", desc: "カリキュラム・時間数・対象者を助成金要件に合致する形で設計。" },
      { num: "03", title: "書類作成伴走", desc: "提携社労士と連携し、訓練計画届・実施報告・支給申請まで書類作成を支援。" },
      { num: "04", title: "実施・記録", desc: "研修の実施から出席簿・賃金台帳までのエビデンス管理をサポート。" },
    ],
    supportDisclaimer: "書類の最終提出は事業主または提携社労士が行います",
    supportDisclaimerBody: "clearAIは計画策定・研修実施・エビデンス管理まで責任を持って伴走し、労働局への正式申請は提携社労士（紹介可）が担当します。",
    flowLabel: "Flow",
    flowTitle: "申請から受給までの流れ",
    flow: [
      { step: "STEP 1", title: "無料相談・制度診断", desc: "貴社の事業内容・目的・規模をヒアリングし、活用可能な助成金を特定します。", duration: "約30分" },
      { step: "STEP 2", title: "訓練計画策定", desc: "助成金要件に適合したカリキュラム・時間数・対象者を設計します。", duration: "2〜3週間" },
      { step: "STEP 3", title: "訓練計画届の提出", desc: "研修開始日の原則1ヶ月前までに、管轄の都道府県労働局へ提出します。", duration: "事前提出必須" },
      { step: "STEP 4", title: "研修の実施", desc: "計画通りに研修を実施し、出席簿・賃金台帳等のエビデンスを整備します。", duration: "カリキュラムに応じる" },
      { step: "STEP 5", title: "支給申請", desc: "研修終了日の翌日から2ヶ月以内に、支給申請書類を労働局へ提出します。", duration: "終了後2ヶ月以内" },
      { step: "STEP 6", title: "助成金の受給", desc: "労働局の審査後、助成金が事業主の口座に振り込まれます。", duration: "申請後 数ヶ月" },
    ],
    faqLabel: "FAQ",
    faqTitle: "よくあるご質問",
    faq: [
      {
        q: "人材開発支援助成金は誰でも使えますか？",
        a: "雇用保険適用事業所が要件を満たす訓練計画を事前に届け出て計画通り実施すれば受給可能で、中小企業の経費助成率は75%です。",
      },
      {
        q: "申請手続きはclearAIが代行してくれますか？",
        a: "提携社労士と連携し、訓練計画届・実施報告・支給申請まで書類作成を伴走支援します（最終提出は事業主または提携社労士が行います）。",
      },
      {
        q: "費用の立替は必要ですか？",
        a: "助成金は後払い方式で研修費用は一旦お支払いいただきますが、資金繰りのご相談にも対応しています。",
      },
      {
        q: "どれくらいの期間で受給できますか？",
        a: "計画届（開始1ヶ月前）→研修実施→支給申請（終了後2ヶ月以内）→労働局審査の流れで、全体で4〜8ヶ月程度を見込んでください。",
      },
      {
        q: "IT導入補助金と人材開発支援助成金は併用できますか？",
        a: "同一費用の二重受給は不可ですが、AIツール導入費はIT導入補助金・研修費は人材開発支援助成金と用途を分けての併用は可能で、個別にご提案します。",
      },
      {
        q: "茨城県内の企業向けの補助金はありますか？",
        a: "茨城県および市町村独自のDX推進・人材育成関連助成金があり、茨城県拠点のclearAIは地域制度に精通しています。",
      },
    ],
    ctaLabel: "Contact",
    ctaTitle: "補助金を、損なく使い切る。",
    ctaDesc: "「どの制度が合うか」「書類が不安」という段階から、30分の無料診断でご相談いただけます。",
    ctaButton: "無料相談を予約する",
    ctaSecondary: "研修プログラムを見る →",
  },
  en: {
    pageLabel: "Subsidy Support",
    pageTitle: "Subsidy Support",
    pageDesc: "From the Human Resources Development Subsidy (人材開発支援助成金) and IT Introduction Subsidy (IT導入補助金) to Ibaraki Prefecture's own programs — clearAI provides full support from planning through reporting and grant application, helping you reduce training and AI implementation costs by up to 75%.",
    programsLabel: "Programs",
    programsTitle: "Three support programs we handle",
    programsDesc: "We propose the best combination of subsidies matched to your company's stage and objectives for AI training and AI implementation projects.",
    programs: [
      {
        tag: "National",
        title: "Human Resources Development Subsidy",
        subtitle: "Business Expansion / Reskilling Support Course (人材開発支援助成金)",
        desc: "A Ministry of Health, Labour and Welfare program for training in new business and DX promotion. Highly compatible with AI and generative AI training — covering up to 75% of expenses plus participant wages.",
        metrics: [
          { label: "Expense subsidy (SME)", value: "75%" },
          { label: "Wage subsidy", value: "¥960/person/hour" },
          { label: "Cap per person", value: "up to ¥500,000" },
        ],
        ideal: "AI training, prompt engineering, DX talent development",
        idealLabel: "Best for:",
      },
      {
        tag: "National",
        title: "IT Introduction Subsidy",
        subtitle: "Standard / Invoice-compliance track, etc. (IT導入補助金)",
        desc: "Subsidizes costs for AI tools, SaaS, and business automation systems. Combinable with clearAI's consulting and implementation packages.",
        metrics: [
          { label: "Subsidy rate", value: "up to 1/2–3/4" },
          { label: "Subsidy amount", value: "up to ¥4,500,000" },
          { label: "Eligible costs", value: "Software & implementation" },
        ],
        ideal: "AI tool adoption, workflow automation, RAG implementation",
        idealLabel: "Best for:",
      },
      {
        tag: "Pref. / City",
        title: "Ibaraki Prefecture & Local Government Programs",
        subtitle: "DX Promotion / SME Human Resource Development, etc.",
        desc: "Subsidy programs run by Ibaraki Prefecture and its municipalities for DX, generative AI, and talent development — with deep expertise in local programs as our home base.",
        metrics: [
          { label: "Eligible", value: "Ibaraki-based SMEs" },
          { label: "Subsidy rate", value: "50–75% (varies by program)" },
          { label: "Feature", value: "May stack with national programs" },
        ],
        ideal: "Local business DX support, small-scale implementations",
        idealLabel: "Best for:",
      },
    ],
    simulatorLabel: "Simulator",
    simulatorTitle: "Calculate your net cost on the spot.",
    simulatorDesc: "Enter headcount, training hours, and company size to get an instant estimate based on the Human Resources Development Subsidy (Business Expansion / Reskilling Support Course).",
    simCondTitle: "Simulation parameters",
    simCompanySize: "Company size",
    simSmall: "SME (75%)",
    simLarge: "Large enterprise (60%)",
    simPeople: "Number of trainees",
    simPeopleUnit: " people",
    simHours: "Training hours (per person)",
    simHoursUnit: " hrs",
    simHoursWarning: "* The subsidy requires at least 10 training hours.",
    simHourlyFee: "Training unit cost (per person / hour)",
    simWage: "Average hourly wage of trainees",
    simResultTitle: "Estimate",
    simRowTraining: "Training cost (standard)",
    simRowExpense: (rate) => `Expense subsidy (${rate}%)`,
    simRowWage: (rate) => `Wage subsidy (¥${rate}/person/hr)`,
    simNetLabel: "Net cost",
    simTotalLabel: "Total subsidy",
    simNote: "* This estimate is based on the Human Resources Development Subsidy — Business Expansion / Reskilling Support Course. Actual grant amounts are subject to review by the Labour Bureau. Please use our free consultation for an accurate figure.",
    simCta: "Consult on these parameters →",
    supportLabel: "Our Support",
    supportTitle: "What clearAI covers",
    support: [
      { num: "01", title: "Program diagnosis", desc: "We identify the best subsidy combination based on your business scale, goals, and planned activities." },
      { num: "02", title: "Training plan design", desc: "We design curriculum, hours, and eligible participants in a form that meets subsidy requirements." },
      { num: "03", title: "Documentation support", desc: "Working with our affiliated labor/social insurance consultant, we support all paperwork: training plan submission, implementation reports, and grant applications." },
      { num: "04", title: "Implementation & records", desc: "We support evidence management from training delivery through attendance records and payroll ledgers." },
    ],
    supportDisclaimer: "Final document submission is made by the employer or an affiliated licensed consultant",
    supportDisclaimerBody: "clearAI provides end-to-end support for planning, training delivery, and evidence management; formal application to the Labour Bureau is handled by our affiliated licensed consultant (referral available).",
    flowLabel: "Flow",
    flowTitle: "From application to grant receipt",
    flow: [
      { step: "STEP 1", title: "Free consultation & program diagnosis", desc: "We hear your business content, goals, and scale to identify applicable subsidies.", duration: "~30 min" },
      { step: "STEP 2", title: "Training plan design", desc: "We design a curriculum, hours, and target participants that comply with subsidy requirements.", duration: "2–3 weeks" },
      { step: "STEP 3", title: "Training plan submission", desc: "Filed with the prefectural Labour Bureau in principle at least one month before the training start date.", duration: "Prior submission required" },
      { step: "STEP 4", title: "Training delivery", desc: "Training is conducted as planned, and evidence such as attendance records and payroll ledgers is prepared.", duration: "Per curriculum" },
      { step: "STEP 5", title: "Grant application", desc: "Application documents are submitted to the Labour Bureau within two months of the training completion date.", duration: "Within 2 months of completion" },
      { step: "STEP 6", title: "Grant receipt", desc: "After review by the Labour Bureau, the subsidy is transferred to the employer's account.", duration: "Several months after application" },
    ],
    faqLabel: "FAQ",
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "Is the Human Resources Development Subsidy available to any company?",
        a: "Any employment-insurance-covered business that files a compliant training plan in advance and carries it out as planned is eligible, with SMEs qualifying for a 75% expense subsidy rate.",
      },
      {
        q: "Will clearAI handle the application process on our behalf?",
        a: "Together with our affiliated consultant, we support all documentation — training plan filings, implementation reports, and grant applications — with final submission made by the employer or affiliated licensed consultant.",
      },
      {
        q: "Do we need to front the costs?",
        a: "Subsidies are paid after training delivery, so costs must be fronted — we're available to discuss cash-flow concerns.",
      },
      {
        q: "How long does it take to receive the grant?",
        a: "File one month before training, submit the grant application within two months of completion, then await Labour Bureau review — roughly 4–8 months in total.",
      },
      {
        q: "Can the IT Introduction Subsidy and Human Resources Development Subsidy be combined?",
        a: "Double-claiming the same expense is not permitted, but applying the IT Introduction Subsidy to tool costs and the Human Resources Development Subsidy to training costs separately is possible — we'll propose a tailored approach.",
      },
      {
        q: "Are there subsidies specifically for companies in Ibaraki Prefecture?",
        a: "Yes — Ibaraki Prefecture and its municipalities offer their own DX and talent development subsidies, and as an Ibaraki-based company, clearAI has deep expertise in local programs.",
      },
    ],
    ctaLabel: "Contact",
    ctaTitle: "Use every subsidy yen available to you.",
    ctaDesc: "'Not sure which program fits' or 'not confident about the paperwork' — start with a free 30-minute diagnosis at any stage.",
    ctaButton: "Book a free consultation",
    ctaSecondary: "View training programs →",
  },
};

function Simulator() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  const [people, setPeople] = useState(10);
  const [hours, setHours] = useState(40);
  const [hourlyFee, setHourlyFee] = useState(5000);
  const [wage, setWage] = useState(2500);
  const [size, setSize] = useState<CompanySize>("small");

  const result = useMemo(() => {
    const totalTrainingCost = hourlyFee * hours * people;
    const totalWageCost = wage * hours * people;

    const expenseRate = size === "small" ? 0.75 : 0.6;
    const wagePerHour = size === "small" ? 960 : 480;

    const capPerPerson = hours < 10 ? 0 : hours < 100 ? 300_000 : hours < 200 ? 400_000 : 500_000;
    const expenseSubsidyRaw = totalTrainingCost * expenseRate;
    const expenseCap = capPerPerson * people;
    const expenseSubsidy = Math.min(expenseSubsidyRaw, expenseCap);

    const wageSubsidy = wagePerHour * hours * people;

    const totalSubsidy = expenseSubsidy + wageSubsidy;
    const netCost = totalTrainingCost - expenseSubsidy;
    const effectiveRate = totalTrainingCost > 0 ? (expenseSubsidy / totalTrainingCost) * 100 : 0;

    return {
      totalTrainingCost,
      totalWageCost,
      expenseSubsidy,
      wageSubsidy,
      totalSubsidy,
      netCost,
      effectiveRate,
      hoursEligible: hours >= 10,
    };
  }, [people, hours, hourlyFee, wage, size]);

  return (
    <div className="border border-neutral-900 bg-white">
      <div className="grid lg:grid-cols-2">
        {/* Input */}
        <div className="border-b border-neutral-900 p-6 lg:border-b-0 lg:border-r lg:p-10">
          <div className="mb-8 flex items-center justify-between border-b border-neutral-200 pb-3">
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-900">{t.simCondTitle}</h3>
            <span className="font-mono text-[10px] tabular-nums text-neutral-400">INPUT</span>
          </div>
          <div className="space-y-7">
            <div>
              <label className="mb-2.5 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.15em] text-neutral-500">
                <span>{t.simCompanySize}</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(["small", "large"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`py-3 font-mono text-[12px] font-bold uppercase tracking-[0.06em] transition-[color,background-color,border-color,scale] duration-200 active:scale-[0.96] ${
                      size === s
                        ? "border border-neutral-900 bg-neutral-900 text-white"
                        : "border border-neutral-300 bg-white text-neutral-600 hover:border-neutral-900"
                    }`}
                  >
                    {s === "small" ? t.simSmall : t.simLarge}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2.5 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.15em] text-neutral-500">
                <span>{t.simPeople}</span>
                <span className="tabular-nums text-neutral-900">{people}{t.simPeopleUnit}</span>
              </label>
              <input type="range" min={1} max={100} value={people} onChange={(e) => setPeople(Number(e.target.value))} className="w-full accent-neutral-900" />
            </div>

            <div>
              <label className="mb-2.5 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.15em] text-neutral-500">
                <span>{t.simHours}</span>
                <span className="tabular-nums text-neutral-900">{hours}{t.simHoursUnit}</span>
              </label>
              <input type="range" min={1} max={300} value={hours} onChange={(e) => setHours(Number(e.target.value))} className="w-full accent-neutral-900" />
              {!result.hoursEligible && (
                <p className="mt-2 font-mono text-[11px] text-neutral-900">{t.simHoursWarning}</p>
              )}
            </div>

            <div>
              <label className="mb-2.5 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.15em] text-neutral-500">
                <span>{t.simHourlyFee}</span>
                <span className="tabular-nums text-neutral-900">{formatYen(hourlyFee)}</span>
              </label>
              <input type="range" min={1000} max={20000} step={500} value={hourlyFee} onChange={(e) => setHourlyFee(Number(e.target.value))} className="w-full accent-neutral-900" />
            </div>

            <div>
              <label className="mb-2.5 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.15em] text-neutral-500">
                <span>{t.simWage}</span>
                <span className="tabular-nums text-neutral-900">{formatYen(wage)}</span>
              </label>
              <input type="range" min={1000} max={6000} step={100} value={wage} onChange={(e) => setWage(Number(e.target.value))} className="w-full accent-neutral-900" />
            </div>
          </div>
        </div>

        {/* Result */}
        <div className="bg-neutral-50 p-6 lg:p-10">
          <div className="mb-8 flex items-center justify-between border-b border-neutral-200 pb-3">
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-900">{t.simResultTitle}</h3>
            <span className="font-mono text-[10px] tabular-nums text-neutral-400">OUTPUT</span>
          </div>
          <div className="space-y-0">
            <div className="flex items-baseline justify-between border-b border-neutral-200 py-3.5">
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-neutral-500">{t.simRowTraining}</span>
              <span className="font-mono text-lg font-bold tabular-nums text-neutral-900">{formatYen(result.totalTrainingCost)}</span>
            </div>
            <div className="flex items-baseline justify-between border-b border-neutral-200 py-3.5">
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-neutral-500">{t.simRowExpense(size === "small" ? "75" : "60")}</span>
              <span className="font-mono text-lg font-bold tabular-nums text-neutral-900">− {formatYen(result.expenseSubsidy)}</span>
            </div>
            <div className="flex items-baseline justify-between border-b border-neutral-200 py-3.5">
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-neutral-500">{t.simRowWage(size === "small" ? "960" : "480")}</span>
              <span className="font-mono text-lg font-bold tabular-nums text-neutral-900">+ {formatYen(result.wageSubsidy)}</span>
            </div>
            <div className="mt-6 border border-neutral-900 bg-white p-5">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">{t.simNetLabel}</p>
              <p className="mt-1.5 text-3xl lg:text-4xl font-bold tabular-nums tracking-tight text-neutral-900">{formatYen(result.netCost)}</p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-neutral-500">
                {t.simTotalLabel} <span className="font-bold tabular-nums text-neutral-900">{formatYen(result.totalSubsidy)}</span>
              </p>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-pretty text-neutral-500">{t.simNote}</p>
            <a href="/contact?service=subsidy" className="group mt-4 flex w-full items-center justify-center gap-3 border border-neutral-900 bg-neutral-900 px-6 py-3.5 text-center font-mono text-sm font-bold uppercase tracking-[0.08em] text-white transition-[color,background-color,border-color,scale] duration-300 hover:bg-transparent hover:text-neutral-900 active:scale-[0.96]">
              {t.simCta}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SubsidyPage() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  return (
    <>
      {/* PAGE HEADER / MASTHEAD */}
      <section className="bg-white pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-neutral-900 pb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
              <span className="font-bold text-neutral-900">§00</span>
              <span>{t.pageLabel}</span>
              <span className="text-neutral-300">/</span>
              <span>Grants</span>
              <span className="text-neutral-300">/</span>
              <span>Reskilling</span>
              <span className="text-neutral-300">/</span>
              <span>Ibaraki</span>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="mt-10 text-[8vw] sm:text-4xl lg:text-5xl font-bold leading-[0.95] tracking-[-0.04em] text-balance text-neutral-900">{t.pageTitle}</h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-8 max-w-2xl text-base lg:text-lg leading-relaxed text-pretty text-neutral-600">{t.pageDesc}</p>
          </Reveal>
        </div>
      </section>

      {/* 3 programs */}
      <section className="py-20 lg:py-28 bg-white border-t border-neutral-900">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="01" kicker={t.programsLabel} title={t.programsTitle} desc={t.programsDesc} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {t.programs.map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
                <div className="flex h-full flex-col border border-neutral-900 bg-white p-7 lg:p-8">
                  <div className="mb-6 flex items-center justify-between border-b border-neutral-200 pb-3">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-900">{p.tag}</span>
                    <span className="font-mono text-[10px] tabular-nums text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mb-1 text-lg lg:text-xl font-bold tracking-tight text-balance text-neutral-900">{p.title}</h3>
                  <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-neutral-400">{p.subtitle}</p>
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-pretty text-neutral-600">{p.desc}</p>
                  <div className="mb-4 border-t border-neutral-200 pt-4">
                    {p.metrics.map((m) => (
                      <div key={m.label} className="flex items-baseline justify-between gap-3 border-b border-neutral-100 py-2 last:border-b-0">
                        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-neutral-500">{m.label}</span>
                        <span className="font-mono text-sm font-bold tabular-nums text-neutral-900">{m.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto flex items-start gap-2 border-t border-neutral-900 pt-4 font-mono text-xs text-neutral-500">
                    <span className="flex-shrink-0 text-neutral-900">→</span>
                    <span><span className="text-neutral-900">{p.idealLabel}</span>{p.ideal}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Simulator */}
      <section id="simulator" className="py-20 lg:py-28 bg-neutral-50 border-y border-neutral-900">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="02" kicker={t.simulatorLabel} title={t.simulatorTitle} desc={t.simulatorDesc} />
          <Reveal delay={150}>
            <Simulator />
          </Reveal>
        </div>
      </section>

      {/* Support scope */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="03" kicker={t.supportLabel} title={t.supportTitle} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.support.map((item, i) => (
              <Reveal key={item.num} delay={i * 80}>
                <div className="group h-full border border-neutral-900 bg-white p-7 lg:p-8 transition-colors duration-300 hover:bg-neutral-900">
                  <div className="flex items-baseline justify-between border-b border-neutral-200 pb-3 transition-colors duration-300 group-hover:border-neutral-700">
                    <span className="font-mono text-xl font-bold tabular-nums text-neutral-900 transition-colors duration-300 group-hover:text-white">{item.num}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">Support / {item.num}</span>
                  </div>
                  <h3 className="mb-3 mt-6 text-lg font-bold tracking-tight text-balance text-neutral-900 transition-colors duration-300 group-hover:text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-pretty text-neutral-600 transition-colors duration-300 group-hover:text-neutral-300">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={400}>
            <div className="mt-12 flex flex-col gap-4 border border-neutral-900 bg-neutral-50 p-6 lg:flex-row lg:items-center lg:gap-6 lg:p-8">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center border border-neutral-900 bg-neutral-900">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="mb-1 flex items-start gap-2 text-sm font-bold text-neutral-900">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 mt-1">NOTE</span>
                  <span>{t.supportDisclaimer}</span>
                </p>
                <p className="text-sm leading-relaxed text-pretty text-neutral-600">{t.supportDisclaimerBody}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FLOW */}
      <section className="py-20 lg:py-28 bg-neutral-50 border-y border-neutral-900">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="04" kicker={t.flowLabel} title={t.flowTitle} />
          {/* table header */}
          <div className="hidden lg:grid grid-cols-12 gap-6 border-b border-neutral-900 pb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
            <div className="col-span-2">Step</div>
            <div className="col-span-7">Detail</div>
            <div className="col-span-3 text-right">Duration</div>
          </div>
          {t.flow.map((f, i) => (
            <Reveal key={f.step} delay={i * 60}>
              <div className="group grid grid-cols-1 gap-2 border-b border-neutral-300 py-7 transition-colors duration-300 hover:bg-white lg:grid-cols-12 lg:gap-6">
                <div className="lg:col-span-2">
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-neutral-900">{f.step}</span>
                </div>
                <div className="lg:col-span-7">
                  <h3 className="text-lg font-bold tracking-tight text-balance text-neutral-900">{f.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-pretty text-neutral-600">{f.desc}</p>
                </div>
                <div className="lg:col-span-3 lg:text-right">
                  <span className="font-mono text-xs tabular-nums text-neutral-500">{f.duration}</span>
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
            {t.faq.map((f, i) => (
              <Reveal key={f.q} delay={i * 40}>
                <details className="group border-b border-neutral-300 py-5">
                  <summary className="flex cursor-pointer list-none items-start gap-4 text-base font-semibold text-neutral-900">
                    <span className="mt-0.5 font-mono text-xs tabular-nums text-neutral-400">Q{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex-1">{f.q}</span>
                    <span className="flex-shrink-0 font-mono text-lg leading-none text-neutral-400 transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 pl-9 text-sm leading-relaxed text-pretty text-neutral-600">{f.a}</p>
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
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center lg:col-span-4 lg:flex-col lg:items-end">
                <a
                  href="/reserve"
                  className="group inline-flex items-center justify-center gap-3 border border-white bg-white px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.08em] text-neutral-900 transition-[color,background-color,border-color,scale] duration-300 hover:bg-transparent hover:text-white active:scale-[0.96]"
                >
                  {t.ctaButton}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
                <a href="/training" className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-neutral-400 transition-colors duration-300 hover:text-white">
                  {t.ctaSecondary}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

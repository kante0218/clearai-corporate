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

type Plan = { name: string; price: string; unit: string; desc: string; features: string[]; featured: boolean; badge?: string };

type Copy = {
  heroKicker: string; heroTitle: string; heroDesc: string; heroSubsidyLink: string;
  forLabel: string; forTitle: string;
  targets: { role: string; title: string; desc: string }[];
  programsLabel: string; programsTitle: string; programsDesc: string;
  programs: { num: string; title: string; hours: string; desc: string }[];
  claudeLabel: string; claudeTitle: string; claudeDesc: string;
  claudePoints: { title: string; desc: string }[];
  formatsLabel: string; formatsTitle: string;
  formats: { title: string; desc: string }[];
  formatsNote: string;
  featuresLabel: string; featuresTitle: string;
  features: { num: string; title: string; desc: string }[];
  subsidyLabel: string; subsidyTitlePre: string; subsidyTitleHighlight: string; subsidyTitlePost: string;
  subsidyDescA: string; subsidyDescB: string;
  subsidyCards: { label: string; value: string; unit: string; desc: string }[];
  subsidyCtaPrimary: string; subsidyCtaSecondary: string;
  pricingLabel: string; pricingTitle: string; pricingDescA: string; pricingSim: string; pricingDescB: string;
  plans: Plan[];
  planCta: string; pricingNote: string;
  ctaLabel: string; ctaTitle: string; ctaDesc: string; ctaButton: string;
};

const COPY: Record<"ja" | "en", Copy> = {
  ja: {
    heroKicker: "AI Training",
    heroTitle: "AI研修",
    heroDesc: "経営層から現場まで、階層別に設計したAI実務研修。最大75%の研修費を助成金で削減可能。",
    heroSubsidyLink: "助成金の活用について詳しく見る",
    forLabel: "For",
    forTitle: "階層別に、必要なスキルを。",
    targets: [
      { role: "経営層", title: "意思決定のためのAI", desc: "AI投資判断・競合動向把握・事業インパクト試算。経営会議で使えるレベルの理解を身につけます。" },
      { role: "管理職", title: "チームを動かすAI", desc: "業務の棚卸し、AI活用ポイントの見極め、部下の評価への反映。現場導入のリーダーを育成します。" },
      { role: "現場担当", title: "日々使えるAI", desc: "議事録・メール・資料作成など、明日から実務で使えるプロンプトとワークフローを習得。" },
    ],
    programsLabel: "Programs",
    programsTitle: "主な研修プログラム",
    programsDesc: "標準時間は助成金の要件（10時間以上）を満たす設計。貴社の目的に合わせて8h／40h／100hのボリュームで自由に組み合わせ可能です。",
    programs: [
      { num: "01", title: "生成AI入門（2時間）", hours: "2h", desc: "ChatGPT・Claude・Geminiを実際に触りながら、「何ができて・何ができないか」を体感。情報リテラシーと著作権・セキュリティの基礎も押さえます。" },
      { num: "02", title: "業務活用ハンズオン（半日）", hours: "4h", desc: "部署別に業務を棚卸しし、AIで効率化できる工程を特定。参加者が自分の業務に使えるプロンプトを持ち帰れる設計です。" },
      { num: "03", title: "プロンプトエンジニアリング（半日）", hours: "4h", desc: "再現性のある指示の出し方、Few-shot、Chain of Thought、RAGの基礎など、一段深いスキルを習得します。" },
      { num: "04", title: "社内ガイドライン策定ワークショップ", hours: "6h", desc: "情シス・法務・現場を巻き込み、AI利用ポリシーを共同策定。ドキュメント化までサポートします。" },
      { num: "05", title: "経営層向けエグゼクティブセッション（90分）", hours: "1.5h", desc: "役員会前後に実施する少人数セッション。自社の事業・KPIに引きつけてAI戦略を議論します。" },
      { num: "06", title: "継続型スキルアップ（月次定期）", hours: "月2h〜", desc: "毎月新しいテーマを扱う継続研修。最新モデル検証、事例共有、質疑応答で社内知を蓄積します。" },
    ],
    claudeLabel: "Training × Claude",
    claudeTitle: "Claudeを「使いこなす」実践研修。",
    claudeDesc: "AnthropicのClaudeに特化した実践研修も提供します。汎用的な操作説明で終わらせず、貴社の現場ユースケースに即して、明日から成果につながる使い方まで落とし込みます。",
    claudePoints: [
      { title: "Claude実務ハンズオン", desc: "Projects・Artifacts・ファイル添付など、Claudeの機能を実際の業務データで体験。" },
      { title: "現場ユースケース別プロンプト", desc: "議事録・提案書・分析・カスタマー対応など、部署別に再現性のあるプロンプトを設計。" },
      { title: "Claude Code / 開発組織向け", desc: "エンジニア向けにClaude Code・MCP・サブエージェント活用の実践セッションも対応。" },
      { title: "安全な社内運用ルール", desc: "機密情報の扱い、社内ガイドライン、定着の仕組みづくりまでカバー。" },
    ],
    formatsLabel: "Formats",
    formatsTitle: "4つの実施形態から選べる",
    formats: [
      { title: "eラーニング", desc: "好きな時間に各自で視聴。録画＋確認テスト形式。" },
      { title: "オンライン集合", desc: "Zoomで一斉実施。講師と双方向でQ&A可能。" },
      { title: "対面研修", desc: "会議室で対面実施。チームビルディング効果も。" },
      { title: "ハイブリッド併用", desc: "eラーニング＋ワークショップで定着率最大化。" },
    ],
    formatsNote: "※ すべての形態で修了証明書（電子版）を発行します。",
    featuresLabel: "Features",
    featuresTitle: "clearAI研修の特徴",
    features: [
      { num: "01", title: "貴社の実務に合わせて設計", desc: "事前ヒアリングで業務課題を把握し、実際の業務データを題材に組み立てます。" },
      { num: "02", title: "実装者が直接登壇", desc: "机上の空論ではなく、現場でAIを実装してきたエンジニア・コンサル出身者が講師を務めます。" },
      { num: "03", title: "研修後のフォロー込み", desc: "Slackでの質問対応や、1か月後の振り返りセッションもセットで提供可能です。" },
      { num: "04", title: "オンライン／オンサイト両対応", desc: "全国どこでも実施可能。録画アーカイブの納品にも対応します。" },
    ],
    subsidyLabel: "Subsidy",
    subsidyTitlePre: "研修費を、",
    subsidyTitleHighlight: "最大75%",
    subsidyTitlePost: "削減できます。",
    subsidyDescA: "厚生労働省「人材開発支援助成金」を活用すれば、中小企業は研修経費の75%＋受講者の賃金も助成対象に。",
    subsidyDescB: "clearAIは申請計画から実施報告まで、社労士と連携して伴走します。",
    subsidyCards: [
      { label: "経費助成", value: "75", unit: "%", desc: "中小企業の研修経費。大企業は60%が上限。" },
      { label: "賃金助成", value: "960", unit: "円/人・時間", desc: "受講者の研修中の賃金も助成対象。中小企業の場合。" },
      { label: "上限額", value: "50", unit: "万円", desc: "200時間以上の研修で1人あたりの上限。" },
    ],
    subsidyCtaPrimary: "補助金の詳細と実質負担額を計算 →",
    subsidyCtaSecondary: "補助金活用について相談する",
    pricingLabel: "Pricing",
    pricingTitle: "料金の目安",
    pricingDescA: "下記は通常価格。助成金適用後の実質負担額は",
    pricingSim: "シミュレーター",
    pricingDescB: "でご確認いただけます。",
    plans: [
      { name: "スポット研修", price: "20万円〜", unit: "/ 回", desc: "単発で完結する研修。2時間〜半日程度。", features: ["事前ヒアリング", "オリジナル教材作成", "当日の実施（講師1名）", "Q&A対応"], featured: false },
      { name: "パッケージ研修", price: "80万円〜", unit: "/ 3ヶ月", desc: "複数回の研修を組み合わせて全社展開。", features: ["階層別3〜5コース実施", "参加者アンケート分析", "社内展開用の録画配信", "研修後Slackサポート", "助成金申請サポート付き"], featured: true, badge: "Popular" },
      { name: "カスタム", price: "ご相談", unit: "", desc: "全社AI変革プロジェクトに合わせて設計。", features: ["年間研修ロードマップ策定", "部署別カリキュラム作成", "講師チーム編成", "効果測定・レポート", "助成金申請フルサポート"], featured: false },
    ],
    planCta: "申し込む",
    pricingNote: "表示価格は税抜。参加人数・地域・業種により個別見積もりとなる場合があります。",
    ctaLabel: "Contact",
    ctaTitle: "「使える」を、研修から。",
    ctaDesc: "貴社の課題に合わせて、カリキュラムからご提案します。助成金活用もあわせてご相談ください。",
    ctaButton: "無料で相談する",
  },
  en: {
    heroKicker: "AI Training",
    heroTitle: "AI Training",
    heroDesc: "Role-based, hands-on AI training from leadership to the front line. Up to 75% of training costs can be covered by subsidies.",
    heroSubsidyLink: "Learn how to use subsidies",
    forLabel: "For",
    forTitle: "The right skills, by role.",
    targets: [
      { role: "Leadership", title: "AI for decisions", desc: "AI investment calls, competitive trends, business-impact estimates — an understanding you can use in the boardroom." },
      { role: "Managers", title: "AI to move teams", desc: "Inventory workflows, spot where AI helps, and reflect it in evaluation — developing the leaders of on-the-ground adoption." },
      { role: "Front line", title: "AI you use daily", desc: "Minutes, email, document drafting — prompts and workflows you can use in real work starting tomorrow." },
    ],
    programsLabel: "Programs",
    programsTitle: "Core training programs",
    programsDesc: "Standard durations are designed to meet subsidy requirements (10+ hours). Freely combine into 8h / 40h / 100h volumes to fit your goals.",
    programs: [
      { num: "01", title: "Intro to Generative AI (2h)", hours: "2h", desc: "Hands-on with ChatGPT, Claude, and Gemini to feel 'what they can and can't do.' Covers information literacy plus copyright and security basics." },
      { num: "02", title: "Workflow Hands-on (half day)", hours: "4h", desc: "Inventory workflows by department and identify steps AI can streamline. Designed so participants leave with prompts for their own work." },
      { num: "03", title: "Prompt Engineering (half day)", hours: "4h", desc: "Reproducible instructions, few-shot, chain of thought, and RAG basics — a deeper level of skill." },
      { num: "04", title: "Internal Guideline Workshop", hours: "6h", desc: "Co-author your AI usage policy with IT, legal, and the field — including documentation support." },
      { num: "05", title: "Executive Session (90 min)", hours: "1.5h", desc: "A small-group session around board meetings, discussing AI strategy tied to your business and KPIs." },
      { num: "06", title: "Continuous Upskilling (monthly)", hours: "2h+/mo", desc: "Ongoing training on a new theme each month — latest-model testing, case sharing, and Q&A to build internal knowledge." },
    ],
    claudeLabel: "Training × Claude",
    claudeTitle: "Hands-on training to truly master Claude.",
    claudeDesc: "We also offer training dedicated to Anthropic's Claude. Rather than generic how-tos, we ground it in your real use cases — down to ways of working that drive results from day one.",
    claudePoints: [
      { title: "Claude hands-on practice", desc: "Experience Claude features — Projects, Artifacts, file attachments — with your actual work data." },
      { title: "Prompts by real use case", desc: "Design reproducible prompts by department: minutes, proposals, analysis, customer support." },
      { title: "Claude Code / for dev teams", desc: "Practical sessions on Claude Code, MCP, and sub-agents for engineering organizations." },
      { title: "Safe internal operating rules", desc: "Covers handling of confidential data, internal guidelines, and mechanisms for adoption." },
    ],
    formatsLabel: "Formats",
    formatsTitle: "Choose from four delivery formats",
    formats: [
      { title: "e-Learning", desc: "Watch anytime, individually. Recordings plus comprehension checks." },
      { title: "Online live", desc: "Delivered together via Zoom, with interactive Q&A." },
      { title: "In-person", desc: "Run on-site in a meeting room, with team-building effect." },
      { title: "Hybrid", desc: "e-Learning plus workshops to maximize retention." },
    ],
    formatsNote: "* A digital certificate of completion is issued for every format.",
    featuresLabel: "Features",
    featuresTitle: "What sets clearAI training apart",
    features: [
      { num: "01", title: "Designed around your work", desc: "We capture your challenges in an upfront interview and build around your real work data." },
      { num: "02", title: "Implementers as instructors", desc: "Not theory — engineers and ex-consultants who've implemented AI in the field lead the sessions." },
      { num: "03", title: "Post-training follow-up included", desc: "Slack Q&A support and a one-month retrospective session can be bundled in." },
      { num: "04", title: "Online & on-site", desc: "Deliverable nationwide, with recorded archives available." },
    ],
    subsidyLabel: "Subsidy",
    subsidyTitlePre: "Cut training costs by ",
    subsidyTitleHighlight: "up to 75%",
    subsidyTitlePost: ".",
    subsidyDescA: "With Japan's Human Resources Development Subsidy, SMEs can have 75% of training expenses — plus participants' wages — subsidized.",
    subsidyDescB: "clearAI partners with a labor consultant to support you from application planning to completion reports.",
    subsidyCards: [
      { label: "Expense subsidy", value: "75", unit: "%", desc: "Training expenses for SMEs. Large companies cap at 60%." },
      { label: "Wage subsidy", value: "960", unit: "JPY/person·hour", desc: "Participants' wages during training are also covered (for SMEs)." },
      { label: "Cap", value: "JPY 500K", unit: "", desc: "Per-person cap for 200+ hours of training." },
    ],
    subsidyCtaPrimary: "See details & estimate net cost →",
    subsidyCtaSecondary: "Ask about using subsidies",
    pricingLabel: "Pricing",
    pricingTitle: "Indicative pricing",
    pricingDescA: "Below are standard prices. Check your net cost after subsidies with the ",
    pricingSim: "simulator",
    pricingDescB: ".",
    plans: [
      { name: "Spot training", price: "From JPY 200K", unit: "/ session", desc: "A self-contained one-off session, 2 hours to half a day.", features: ["Upfront interview", "Original materials", "Delivery (1 instructor)", "Q&A support"], featured: false },
      { name: "Package", price: "From JPY 800K", unit: "/ 3 mo", desc: "Combine multiple sessions for company-wide rollout.", features: ["3–5 role-based courses", "Participant survey analysis", "Recorded distribution for rollout", "Post-training Slack support", "Subsidy application support"], featured: true, badge: "Popular" },
      { name: "Custom", price: "Let's talk", unit: "", desc: "Designed around a company-wide AI transformation.", features: ["Annual training roadmap", "Department-specific curriculum", "Instructor team assembly", "Impact measurement & reports", "Full subsidy application support"], featured: false },
    ],
    planCta: "Get started",
    pricingNote: "Prices exclude tax. Custom quotes may apply depending on headcount, region, and industry.",
    ctaLabel: "Contact",
    ctaTitle: "Start with training that sticks.",
    ctaDesc: "We tailor the curriculum to your challenges. Ask about subsidies too.",
    ctaButton: "Book a free consultation",
  },
};

export default function TrainingPage() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  return (
    <>
      {/* PAGE HEADER */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <p className="text-sm font-semibold text-sky-600 mb-3">{t.heroKicker}</p>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">{t.heroTitle}</h1>
          <p className="text-base text-gray-600 leading-relaxed max-w-2xl mb-5">{t.heroDesc}</p>
          <a href="/subsidy" className="group inline-flex items-center gap-2 text-sm font-semibold text-amber-700 hover:text-amber-800 transition-colors duration-300">
            {t.heroSubsidyLink} <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </section>

      {/* TARGET */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.forLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-snug mb-14 max-w-2xl">{t.forTitle}</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.targets.map((item, i) => (
              <Reveal key={item.role} delay={i * 100}>
                <div className="rounded-2xl border border-gray-200 bg-white p-8 hover:shadow-lg transition-all duration-300 h-full">
                  <span className="inline-block text-xs font-bold tracking-widest text-sky-600 uppercase mb-3">{item.role}</span>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section id="programs" className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.programsLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.programsTitle}</h2>
            <p className="text-sm text-gray-500 mb-14 max-w-2xl leading-relaxed">{t.programsDesc}</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.programs.map((item, i) => (
              <Reveal key={item.num} delay={i * 80}>
                <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:border-sky-200 hover:shadow-lg transition-all duration-300 h-full">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-sm font-bold text-sky-600">{item.num}</span>
                    <span className="text-xs font-semibold text-gray-500 bg-gray-100 rounded-full px-3 py-1">{item.hours}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CLAUDE INTEGRATION */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-8 lg:p-12">
            <Reveal>
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 mb-4">
                <span className="w-2 h-2 rounded-full bg-orange-500" />{t.claudeLabel}
              </p>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-snug mb-4 max-w-2xl">{t.claudeTitle}</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-10 max-w-2xl">{t.claudeDesc}</p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {t.claudePoints.map((p, i) => (
                <Reveal key={p.title} delay={i * 80}>
                  <div className="rounded-xl bg-white border border-orange-100 p-6 h-full">
                    <h3 className="text-base font-bold text-gray-900 mb-2">{p.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FORMATS */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.formatsLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-14">{t.formatsTitle}</h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {t.formats.map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <div className="rounded-xl border border-gray-200 bg-white p-5 h-full">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <p className="text-xs text-gray-500 mt-6">{t.formatsNote}</p>
          </Reveal>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.featuresLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-14">{t.featuresTitle}</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.features.map((item, i) => (
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

      {/* 補助金 CTA SECTION */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-amber-50 via-white to-sky-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <Label>{t.subsidyLabel}</Label>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
                {t.subsidyTitlePre}<span className="text-amber-600">{t.subsidyTitleHighlight}</span>{t.subsidyTitlePost}
              </h2>
              <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
                {t.subsidyDescA}
                <br />{t.subsidyDescB}
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {t.subsidyCards.map((card, i) => (
              <Reveal key={card.label} delay={i * 100}>
                <div className="bg-white rounded-2xl border border-amber-200 p-8 h-full">
                  <span className="inline-block text-xs font-bold tracking-widest text-amber-600 uppercase mb-3">{card.label}</span>
                  <p className="text-4xl font-bold text-gray-900 mb-2">{card.value}<span className="text-xl">{card.unit}</span></p>
                  <p className="text-sm text-gray-600 leading-relaxed">{card.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a href="/subsidy" className="rounded-lg bg-amber-500 text-white font-semibold px-8 py-3.5 hover:bg-amber-600 transition-colors duration-300">
                {t.subsidyCtaPrimary}
              </a>
              <a href="/contact?service=subsidy" className="text-sm text-gray-700 font-semibold hover:text-gray-900 transition-colors duration-300">
                {t.subsidyCtaSecondary}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.pricingLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.pricingTitle}</h2>
            <p className="text-sm text-gray-500 mb-14 max-w-2xl leading-relaxed">
              {t.pricingDescA}<a href="/subsidy" className="text-amber-600 font-semibold hover:underline">{t.pricingSim}</a>{t.pricingDescB}
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {t.plans.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 100} className="flex">
                <div className={`rounded-2xl p-8 lg:p-10 transition-all duration-300 flex flex-col w-full ${plan.featured ? "bg-sky-600 text-white shadow-xl" : "bg-white border border-gray-200 hover:shadow-lg"}`}>
                  {plan.featured && plan.badge && <span className="inline-block rounded-full bg-white/20 text-white px-3 py-1 text-sm font-semibold mb-4 self-start">{plan.badge}</span>}
                  <h3 className={`text-lg font-bold mb-2 ${plan.featured ? "text-white" : "text-gray-900"}`}>{plan.name}</h3>
                  <div className="mb-4 flex items-baseline gap-1">
                    <span className={`text-3xl font-bold ${plan.featured ? "text-white" : "text-gray-900"}`}>{plan.price}</span>
                    {plan.unit && <span className={`text-sm ${plan.featured ? "text-white/80" : "text-gray-500"}`}>{plan.unit}</span>}
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
                  <a href="/contact?service=training" className={`block text-center text-sm font-semibold py-3 rounded-lg transition-all duration-300 mt-auto ${plan.featured ? "bg-white text-sky-600 hover:bg-sky-50" : "border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900"}`}>{t.planCta}</a>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300}>
            <p className="text-xs text-gray-500 text-center mt-8">{t.pricingNote}</p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Reveal>
            <Label>{t.ctaLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.ctaTitle}</h2>
            <p className="text-base text-gray-600 leading-relaxed mb-10">{t.ctaDesc}</p>
            <a href="/contact?service=training" className="rounded-lg bg-sky-600 text-white font-semibold px-10 py-4 hover:bg-sky-700 transition-colors duration-300 inline-block">{t.ctaButton}</a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

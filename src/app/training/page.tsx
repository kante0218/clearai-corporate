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

function Label({ children }: { children: ReactNode }) {
  return <p className="text-sm font-semibold text-neutral-900 mb-4">{children}</p>;
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
  vibeLabel: string; vibeTitle: string; vibeDesc: string;
  vibePoints: { title: string; desc: string }[];
  vibeExamplesLabel: string; vibeExamples: string[];
  curriculumLabel: string; curriculumTitle: string; curriculumDesc: string; curriculumNote: string;
  curriculumRows: { time: string; title: string; desc: string }[];
  outcomesLabel: string; outcomesTitle: string; outcomesDesc: string;
  outcomes: { dept: string; before: string; after: string; metric: string }[];
  flowLabel: string; flowTitle: string; flowDesc: string;
  flowSteps: { num: string; title: string; desc: string }[];
  faqLabel: string; faqTitle: string;
  faqItems: { q: string; a: string }[];
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
      { num: "07", title: "バイブコーディング入門（非エンジニア向け・半日）", hours: "4h", desc: "コードを書かずに、AIへの自然言語の指示だけで業務ツールやアプリを作る実践ハンズオン。現場の小さな手作業を、自分の手でツール化できるようになります。" },
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
    vibeLabel: "Training × Vibe Coding",
    vibeTitle: "コードが書けなくても、自分で業務ツールが作れる。",
    vibeDesc: "「バイブコーディング」は、AIに自然言語で話しかけるだけで、業務アプリ・自動化ツール・社内システムを形にする新しい働き方。本研修は非エンジニアの業務担当者・管理職をメインに、明日から自分の手で“小さなDX”を起こせる人材を育てます。",
    vibePoints: [
      { title: "自然言語でアプリを作る", desc: "ClaudeやCursorなどのAIツールに「こういうものが欲しい」と話しかけるだけで、動くツールを形にする流れを体験します。" },
      { title: "現場の困りごとを自分で解決", desc: "Excel集計・申請フォーム・日報集約など、現場の小さな手作業をその場でツール化。情シスを待ちません。" },
      { title: "つまずき所と安全の勘所", desc: "AIに任せきりで失敗しないチェック観点、機密データの扱い、社内で共有・公開する際の注意点まで押さえます。" },
      { title: "作ったものを社内へ広げる", desc: "個人の試作で終わらせず、チームで使える形に整え、社内に横展開する進め方まで学びます。" },
    ],
    vibeExamplesLabel: "受講者が研修中に作れるものの例",
    vibeExamples: ["問い合わせ自動分類ツール", "見積書PDFの自動生成", "日報集計ダッシュボード", "社内FAQチャットボット", "アンケート集計・可視化", "在庫アラートの自動通知"],
    curriculumLabel: "Sample Curriculum",
    curriculumTitle: "サンプルカリキュラム（業務活用ハンズオン・半日）",
    curriculumDesc: "実際の半日研修の一例です。貴社の業務内容・参加者のレベルに合わせて、毎回オーダーメイドで設計します。",
    curriculumRows: [
      { time: "0:00", title: "オリエンテーション", desc: "AIで「できること／できないこと」の現在地を共有し、本日のゴールを設定。" },
      { time: "0:20", title: "基本操作ハンズオン", desc: "実際にClaude／ChatGPTを触り、文章生成・要約・翻訳・アイデア出しを体験。" },
      { time: "1:15", title: "自部署の業務を棚卸し", desc: "参加者が自分の業務を洗い出し、AIで効率化できる工程を特定します。" },
      { time: "2:15", title: "実務プロンプト作成", desc: "議事録・メール・資料作成など、自分の業務で使えるプロンプトを実際に作成。" },
      { time: "3:15", title: "成果共有・質疑応答", desc: "各自が作ったプロンプトを共有し、明日からの実践計画に落とし込みます。" },
      { time: "3:45", title: "まとめ・持ち帰り", desc: "テンプレート集とチェックリストを配布。研修後のフォロー体制を案内。" },
    ],
    curriculumNote: "※ これは一例です。経営層向け90分セッションから全社100時間プログラムまで、目的に応じて構成します。",
    outcomesLabel: "Outcomes",
    outcomesTitle: "研修後、現場はこう変わる。",
    outcomesDesc: "受講後に多くの現場で起きる、典型的な変化のイメージです。（業務内容・習熟度により効果には差があります）",
    outcomes: [
      { dept: "営業", before: "提案書のたたき台に半日", after: "30分でドラフト完成", metric: "約80%短縮" },
      { dept: "管理部門", before: "議事録の清書に1時間", after: "録音から要約まで10分", metric: "約85%短縮" },
      { dept: "カスタマー対応", before: "返信文を毎回ゼロから作成", after: "AIドラフト＋微修正で即返信", metric: "対応件数 約1.5倍" },
      { dept: "企画・マーケ", before: "市場・競合調査に数日", after: "初期リサーチが数時間に", metric: "立ち上がり大幅短縮" },
    ],
    flowLabel: "Flow",
    flowTitle: "ご相談から実施まで",
    flowDesc: "最短2週間で初回研修を実施できます。助成金を活用する場合は、申請計画から実施報告まで伴走します。",
    flowSteps: [
      { num: "01", title: "お問い合わせ・ヒアリング", desc: "課題・対象者・目的をお伺いします。オンライン30分のご相談から。" },
      { num: "02", title: "カリキュラム設計・お見積り", desc: "貴社専用のカリキュラムと費用、助成金の活用プランをご提案します。" },
      { num: "03", title: "事前準備・教材作成", desc: "実際の業務データを題材に、オリジナル教材を作成します。" },
      { num: "04", title: "研修実施", desc: "オンライン／対面／ハイブリッドで実施。修了証明書を発行します。" },
      { num: "05", title: "フォローアップ", desc: "Slackでの質問対応、1か月後の振り返り、助成金の実施報告まで。" },
    ],
    faqLabel: "FAQ",
    faqTitle: "よくあるご質問",
    faqItems: [
      { q: "AIにまったく触れたことのない社員でも大丈夫ですか？", a: "はい。受講者のレベルに合わせて内容を調整します。「PCの基本操作ができれば参加できる」入門コースから、開発者向けの実践コースまで対応しています。" },
      { q: "最低何名から依頼できますか？", a: "1名のエグゼクティブセッションから、数百名規模の全社研修まで対応可能です。少人数ほど、一人ひとりの業務に密着した内容にできます。" },
      { q: "オンラインと対面、どちらがおすすめですか？", a: "定着を重視するなら、ハンズオンを含む対面またはハイブリッドがおすすめです。全国どこでもオンライン実施が可能で、録画アーカイブの納品にも対応します。" },
      { q: "助成金は必ず使えますか？", a: "厚生労働省「人材開発支援助成金」は、要件（研修10時間以上など）を満たせば中小企業で経費の最大75%が対象です。要件確認から申請、社労士連携まで伴走しますが、支給可否は審査により決定されます。" },
      { q: "研修で使うAIツールは何ですか？", a: "ChatGPT・Claude・Geminiなど主要な生成AIを扱います。特にAnthropic Claudeに特化した実践研修や、非エンジニア向けのバイブコーディング研修もご用意しています。" },
      { q: "自社の業務に合わせた内容にできますか？", a: "はい。事前ヒアリングで業務課題を把握し、実際の業務データを題材にカリキュラムをオーダーメイドします。汎用的な操作説明だけでは終わりません。" },
      { q: "研修後のサポートはありますか？", a: "Slackでの質問対応や、1か月後の振り返りセッションをセットで提供できます。学んだことを現場に定着させるところまで伴走します。" },
    ],
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
      { num: "07", title: "Intro to Vibe Coding (non-engineers, half day)", hours: "4h", desc: "A hands-on session to build internal tools and apps with plain-language instructions to AI — no coding. Turn the small manual tasks on your team into tools, yourself." },
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
    vibeLabel: "Training × Vibe Coding",
    vibeTitle: "Build your own work tools — no coding required.",
    vibeDesc: "\"Vibe coding\" is a new way of working: you just describe what you want to AI in plain language, and it builds the app, automation, or internal tool for you. This program is aimed mainly at non-engineer staff and managers — growing people who can start their own 'small DX' from day one.",
    vibePoints: [
      { title: "Build apps in plain language", desc: "Experience turning 'I want something like this' into a working tool, just by talking to AI tools like Claude and Cursor." },
      { title: "Solve your own pain points", desc: "Turn small manual tasks — Excel aggregation, request forms, daily-report roll-ups — into tools on the spot. No waiting on IT." },
      { title: "Pitfalls and safety basics", desc: "Learn the checks that keep you from failing by over-trusting AI, how to handle confidential data, and what to watch when sharing or publishing." },
      { title: "Roll it out across the company", desc: "Go beyond a personal prototype — shape it into something the team can use and spread it internally." },
    ],
    vibeExamplesLabel: "Examples participants can build during the session",
    vibeExamples: ["Inquiry auto-classifier", "Auto-generated quote PDFs", "Daily-report dashboard", "Internal FAQ chatbot", "Survey aggregation & charts", "Inventory alert notifications"],
    curriculumLabel: "Sample Curriculum",
    curriculumTitle: "Sample curriculum (Workflow Hands-on, half day)",
    curriculumDesc: "An example of an actual half-day session. We design each one to order, around your workflows and participants' levels.",
    curriculumRows: [
      { time: "0:00", title: "Orientation", desc: "Share where AI stands on 'what it can and can't do,' and set the day's goals." },
      { time: "0:20", title: "Hands-on basics", desc: "Use Claude / ChatGPT directly — generation, summarizing, translation, ideation." },
      { time: "1:15", title: "Inventory your team's work", desc: "Participants map their own work and pinpoint steps AI can streamline." },
      { time: "2:15", title: "Build real-work prompts", desc: "Create prompts you can use in your own work — minutes, email, documents." },
      { time: "3:15", title: "Share & Q&A", desc: "Share the prompts each person built and turn them into a plan for tomorrow." },
      { time: "3:45", title: "Wrap-up & takeaways", desc: "Distribute a template set and checklist; explain post-training follow-up." },
    ],
    curriculumNote: "* This is one example. We compose anything from a 90-minute executive session to a company-wide 100-hour program.",
    outcomesLabel: "Outcomes",
    outcomesTitle: "How the front line changes after training.",
    outcomesDesc: "A picture of the typical change many teams see after training. (Results vary by work and proficiency.)",
    outcomes: [
      { dept: "Sales", before: "Half a day for a proposal draft", after: "A draft in 30 minutes", metric: "~80% faster" },
      { dept: "Back office", before: "An hour to clean up minutes", after: "Recording to summary in 10 min", metric: "~85% faster" },
      { dept: "Customer support", before: "Every reply from scratch", after: "AI draft + light edits, sent fast", metric: "~1.5× volume" },
      { dept: "Planning & marketing", before: "Days of market & competitor research", after: "Initial research in hours", metric: "Much faster ramp-up" },
    ],
    flowLabel: "Flow",
    flowTitle: "From inquiry to delivery",
    flowDesc: "We can run a first session in as little as two weeks. If you use subsidies, we support you from application planning to the completion report.",
    flowSteps: [
      { num: "01", title: "Inquiry & interview", desc: "We learn your challenges, audience, and goals — starting from a 30-minute online chat." },
      { num: "02", title: "Curriculum design & quote", desc: "We propose a curriculum built for you, the cost, and a subsidy plan." },
      { num: "03", title: "Prep & materials", desc: "We create original materials based on your real work data." },
      { num: "04", title: "Delivery", desc: "Delivered online / in-person / hybrid. A certificate of completion is issued." },
      { num: "05", title: "Follow-up", desc: "Slack Q&A, a one-month retrospective, and the subsidy completion report." },
    ],
    faqLabel: "FAQ",
    faqTitle: "Frequently asked questions",
    faqItems: [
      { q: "Is it OK for staff who've never touched AI?", a: "Yes. We tailor the content to participants' levels — from an intro course you can join 'if you can use a PC,' to practical courses for developers." },
      { q: "What's the minimum headcount?", a: "Anything from a one-person executive session to a company-wide program of several hundred. The smaller the group, the more closely we can tie it to each person's work." },
      { q: "Online or in-person — which do you recommend?", a: "If retention matters, we recommend in-person or hybrid with hands-on work. Online delivery is available nationwide, and we can deliver recorded archives too." },
      { q: "Can I always use subsidies?", a: "Japan's Human Resources Development Subsidy covers up to 75% of expenses for SMEs if requirements are met (e.g., 10+ training hours). We support you from eligibility check to application and labor-consultant coordination, but approval is decided by review." },
      { q: "Which AI tools do you use in training?", a: "Major generative AI including ChatGPT, Claude, and Gemini. We also offer training dedicated to Anthropic Claude, and vibe-coding training for non-engineers." },
      { q: "Can it be tailored to our work?", a: "Yes. We capture your challenges in an upfront interview and build the curriculum to order around your real work data — never just generic how-tos." },
      { q: "Is there post-training support?", a: "We can bundle Slack Q&A and a one-month retrospective session, supporting you until what was learned takes hold on the ground." },
    ],
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
      <section className="pt-24 pb-4 lg:pt-28 lg:pb-5 bg-white border-b border-gray-100">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <p className="text-sm font-semibold text-neutral-900 mb-3">{t.heroKicker}</p>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">{t.heroTitle}</h1>
          <p className="text-base text-gray-600 leading-relaxed w-full mb-5">{t.heroDesc}</p>
          <a href="/subsidy" className="group inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 hover:text-neutral-700 transition-colors duration-300">
            {t.heroSubsidyLink} <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </section>

      {/* PRICING */}
      <section className="pt-6 pb-10 lg:pt-8 lg:pb-12 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.pricingLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.pricingTitle}</h2>
            <p className="text-sm text-gray-500 mb-6 w-full leading-relaxed">
              {t.pricingDescA}<a href="/subsidy" className="text-neutral-900 font-semibold hover:underline">{t.pricingSim}</a>{t.pricingDescB}
            </p>
          </Reveal>
          <PricingCarousel>
            {t.plans.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 100} className="flex">
                <div className={`rounded-lg p-5 lg:p-6 transition-all duration-300 flex flex-col w-full ${plan.featured ? "bg-neutral-900 text-white shadow-xl" : "bg-white border border-gray-200 hover:shadow-lg"}`}>
                  {plan.featured && plan.badge && <span className="inline-block rounded-md bg-white/20 text-white px-3 py-1 text-sm font-semibold mb-3 self-start">{plan.badge}</span>}
                  <h3 className={`text-base font-bold mb-1.5 ${plan.featured ? "text-white" : "text-gray-900"}`}>{plan.name}</h3>
                  <div className="mb-2 flex items-baseline gap-1">
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
                  <a href="/contact?service=training" className={`block text-center text-sm font-semibold py-2 rounded-md transition-all duration-300 mt-auto ${plan.featured ? "bg-white text-neutral-900 hover:bg-neutral-100" : "border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900"}`}>{t.planCta}</a>
                </div>
              </Reveal>
            ))}
          </PricingCarousel>
          <Reveal delay={300}>
            <p className="text-xs text-gray-500 text-center mt-8">{t.pricingNote}</p>
          </Reveal>
        </div>
      </section>

      {/* TARGET */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.forLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-snug mb-8 w-full">{t.forTitle}</h2>
          </Reveal>
          <CardCarousel gridClass="md:grid-cols-3">
            {t.targets.map((item, i) => (
              <Reveal key={item.role} delay={i * 100}>
                <div className="rounded-lg border border-gray-200 bg-white p-8 hover:shadow-lg transition-all duration-300 h-full">
                  <span className="inline-block text-xs font-bold tracking-widest text-neutral-900 uppercase mb-3">{item.role}</span>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* PROGRAMS */}
      <section id="programs" className="py-14 lg:py-20 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.programsLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.programsTitle}</h2>
            <p className="text-sm text-gray-500 mb-8 w-full leading-relaxed">{t.programsDesc}</p>
          </Reveal>
          <CardCarousel gridClass="md:grid-cols-2">
            {t.programs.map((item, i) => (
              <Reveal key={item.num} delay={i * 80}>
                <div className="bg-white rounded-lg border border-gray-200 p-8 hover:border-neutral-300 hover:shadow-lg transition-all duration-300 h-full">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-sm font-bold text-neutral-900">{item.num}</span>
                    <span className="text-xs font-semibold text-gray-500 bg-gray-100 rounded-md px-3 py-1">{item.hours}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* CLAUDE INTEGRATION */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-8 lg:p-12">
            <Reveal>
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 mb-4">
                <span className="w-2 h-2 rounded-full bg-neutral-900" />{t.claudeLabel}
              </p>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-snug mb-4 w-full">{t.claudeTitle}</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-10 w-full">{t.claudeDesc}</p>
            </Reveal>
            <CardCarousel gridClass="md:grid-cols-2">
              {t.claudePoints.map((p, i) => (
                <Reveal key={p.title} delay={i * 80}>
                  <div className="rounded-lg bg-white border border-neutral-200 p-6 h-full">
                    <h3 className="text-base font-bold text-gray-900 mb-2">{p.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
                  </div>
                </Reveal>
              ))}
            </CardCarousel>
          </div>
        </div>
      </section>

      {/* VIBE CODING */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <div className="rounded-lg border border-neutral-900 bg-neutral-900 text-white p-8 lg:p-12">
            <Reveal>
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-white mb-4">
                <span className="w-2 h-2 rounded-full bg-white" />{t.vibeLabel}
              </p>
              <h2 className="text-2xl lg:text-3xl font-bold text-white leading-snug mb-4 w-full">{t.vibeTitle}</h2>
              <p className="text-sm text-white/80 leading-relaxed mb-10 w-full">{t.vibeDesc}</p>
            </Reveal>
            <CardCarousel gridClass="md:grid-cols-2" className="mb-10">
              {t.vibePoints.map((p, i) => (
                <Reveal key={p.title} delay={i * 80}>
                  <div className="rounded-lg bg-white/5 border border-white/15 p-6 h-full">
                    <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
                    <p className="text-sm text-white/75 leading-relaxed">{p.desc}</p>
                  </div>
                </Reveal>
              ))}
            </CardCarousel>
            <Reveal>
              <p className="text-xs font-semibold text-white/60 tracking-wide mb-3">{t.vibeExamplesLabel}</p>
              <div className="flex flex-wrap gap-2.5">
                {t.vibeExamples.map((ex) => (
                  <span key={ex} className="rounded-md bg-white/10 border border-white/15 text-white/90 text-xs font-medium px-3 py-1.5">{ex}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SAMPLE CURRICULUM */}
      <section className="py-14 lg:py-20 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.curriculumLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.curriculumTitle}</h2>
            <p className="text-sm text-gray-500 mb-8 w-full leading-relaxed">{t.curriculumDesc}</p>
          </Reveal>
          <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
            {t.curriculumRows.map((row, i) => (
              <Reveal key={row.time} delay={i * 60}>
                <div className={`flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6 px-6 py-5 ${i > 0 ? "border-t border-gray-100" : ""}`}>
                  <span className="text-sm font-bold text-neutral-900 tabular-nums sm:w-16 flex-shrink-0">{row.time}</span>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-gray-900 mb-1">{row.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{row.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <p className="text-xs text-gray-500 mt-6">{t.curriculumNote}</p>
          </Reveal>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.outcomesLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.outcomesTitle}</h2>
            <p className="text-sm text-gray-500 mb-8 w-full leading-relaxed">{t.outcomesDesc}</p>
          </Reveal>
          <CardCarousel gridClass="md:grid-cols-2">
            {t.outcomes.map((o, i) => (
              <Reveal key={o.dept} delay={i * 80}>
                <div className="rounded-lg border border-gray-200 bg-white p-6 lg:p-8 hover:shadow-lg transition-all duration-300 h-full">
                  <div className="flex items-center justify-between mb-5">
                    <span className="inline-block text-xs font-bold tracking-widest text-neutral-900 uppercase">{o.dept}</span>
                    <span className="rounded-md bg-neutral-900 text-white text-xs font-semibold px-3 py-1">{o.metric}</span>
                  </div>
                  <div className="flex items-stretch gap-4">
                    <div className="flex-1 rounded-md bg-gray-50 border border-gray-100 p-4">
                      <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1.5">Before</p>
                      <p className="text-sm text-gray-500 leading-relaxed">{o.before}</p>
                    </div>
                    <div className="flex items-center text-neutral-300 font-bold">→</div>
                    <div className="flex-1 rounded-md bg-neutral-900 p-4">
                      <p className="text-[10px] font-bold tracking-widest text-white/50 uppercase mb-1.5">After</p>
                      <p className="text-sm text-white leading-relaxed font-medium">{o.after}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* FORMATS */}
      <section className="py-14 lg:py-20 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.formatsLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-8">{t.formatsTitle}</h2>
          </Reveal>
          <CardCarousel gridClass="md:grid-cols-4">
            {t.formats.map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <div className="rounded-lg border border-gray-200 bg-white p-5 h-full">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
          <Reveal delay={200}>
            <p className="text-xs text-gray-500 mt-6">{t.formatsNote}</p>
          </Reveal>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.featuresLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-8">{t.featuresTitle}</h2>
          </Reveal>
          <CardCarousel gridClass="md:grid-cols-2">
            {t.features.map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="rounded-lg border border-gray-200 bg-white p-8 hover:shadow-lg transition-all duration-300 h-full">
                  <span className="text-xs font-semibold text-neutral-900 tracking-widest">{item.num}</span>
                  <h3 className="text-lg font-bold text-gray-900 mt-2 mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* FLOW */}
      <section className="py-14 lg:py-20 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.flowLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.flowTitle}</h2>
            <p className="text-sm text-gray-500 mb-8 w-full leading-relaxed">{t.flowDesc}</p>
          </Reveal>
          <CardCarousel gridClass="sm:grid-cols-2 lg:grid-cols-5">
            {t.flowSteps.map((step, i) => (
              <Reveal key={step.num} delay={i * 80}>
                <div className="relative rounded-lg border border-gray-200 bg-white p-6 h-full">
                  <span className="text-2xl font-bold text-neutral-200">{step.num}</span>
                  <h3 className="text-sm font-bold text-gray-900 mt-2 mb-2">{step.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* 補助金 CTA SECTION */}
      <section className="py-14 lg:py-20 bg-neutral-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <Label>{t.subsidyLabel}</Label>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
                {t.subsidyTitlePre}<span className="text-neutral-900">{t.subsidyTitleHighlight}</span>{t.subsidyTitlePost}
              </h2>
              <p className="text-base text-gray-600 w-full mx-auto leading-relaxed">
                {t.subsidyDescA}
                <br />{t.subsidyDescB}
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {t.subsidyCards.map((card, i) => (
              <Reveal key={card.label} delay={i * 100}>
                <div className="bg-white rounded-lg border border-neutral-200 p-8 h-full">
                  <span className="inline-block text-xs font-bold tracking-widest text-neutral-900 uppercase mb-3">{card.label}</span>
                  <p className="text-4xl font-bold text-gray-900 mb-2">{card.value}<span className="text-xl">{card.unit}</span></p>
                  <p className="text-sm text-gray-600 leading-relaxed">{card.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a href="/subsidy" className="rounded-md bg-neutral-900 text-white font-semibold px-8 py-3.5 hover:bg-neutral-800 transition-colors duration-300">
                {t.subsidyCtaPrimary}
              </a>
              <a href="/contact?service=subsidy" className="text-sm text-gray-700 font-semibold hover:text-gray-900 transition-colors duration-300">
                {t.subsidyCtaSecondary}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.faqLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-8">{t.faqTitle}</h2>
          </Reveal>
          <div className="space-y-3">
            {t.faqItems.map((item, i) => (
              <Reveal key={item.q} delay={i * 50}>
                <details className="group rounded-lg border border-gray-200 bg-white open:shadow-sm transition-all duration-300">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5">
                    <span className="text-sm lg:text-base font-bold text-gray-900">{item.q}</span>
                    <span className="text-neutral-400 text-xl font-light flex-shrink-0 transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <p className="px-6 pb-5 text-sm text-gray-600 leading-relaxed">{item.a}</p>
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
            <Label>{t.ctaLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.ctaTitle}</h2>
            <p className="text-base text-gray-600 leading-relaxed mb-10">{t.ctaDesc}</p>
            <a href="/reserve" className="rounded-md bg-neutral-900 text-white font-semibold px-10 py-4 hover:bg-neutral-800 transition-colors duration-300 inline-block">{t.ctaButton}</a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

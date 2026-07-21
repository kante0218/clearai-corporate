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
    <Reveal className="mb-7 lg:mb-9 max-w-4xl">
      <div className={`flex items-center gap-4 border-b pb-4 ${dark ? "border-white/25" : "border-neutral-900"}`}>
        <span className={`font-mono text-xs font-bold tabular-nums ${dark ? "text-white" : "text-neutral-900"}`}>§{index}</span>
        <span className={`font-mono text-[11px] font-medium uppercase tracking-[0.25em] ${dark ? "text-neutral-400" : "text-neutral-500"}`}>{kicker}</span>
      </div>
      <h2 className={`mt-8 text-[18px] sm:text-xl lg:text-2xl font-bold leading-[1.15] sm:leading-[1.05] tracking-[-0.02em] text-balance ${dark ? "text-white" : "text-neutral-900"}`}>
        {title}
      </h2>
      {desc && <p className={`mt-5 max-w-2xl text-[15px] leading-relaxed text-pretty ${dark ? "text-neutral-400" : "text-neutral-600"}`}>{desc}</p>}
    </Reveal>
  );
}

type Plan = { name: string; price: string; unit: string; desc: string; features: string[]; featured: boolean; badge?: string };

type Copy = {
  heroKicker: string; heroTitle: string; heroDesc: string; heroSubsidyLink: string;
  heroBadges: string[];
  lpEyebrow: string; lpTitle: string; lpDesc: string; lpCta: string;
  valueEyebrow: string; valueTitle: string; valueDesc: string;
  valueSteps: { k: string; label: string; value: string; desc: string }[];
  valueNote: string; valueCta: string;
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
    heroTitle: "社内システムを、\n絶対に作れるようになる。",
    heroDesc: "コードが書けない社員でも、Claude × Vibe Coding の実践研修で「AIで自分の業務システムを作り切る力」が身につく。外注すれば1億円規模のシステムを、助成金活用で実質50万円台から内製へ。",
    heroSubsidyLink: "助成金の活用について詳しく見る",
    heroBadges: ["絶対に、作れるようになる", "助成金 最大75%OFF", "コード知識ゼロでOK"],
    lpEyebrow: "専用ランディングページ",
    lpTitle: "「絶対に社内システムが作れるようになるAI研修」の詳細はこちら",
    lpDesc: "カリキュラム・料金プラン・助成金の実質負担シミュレーション・かんたん診断まで、専用ページで詳しくご案内しています。資料ダウンロードもこちらから。",
    lpCta: "専用ページを見る",
    valueEyebrow: "The Math",
    valueTitle: "実質50万円で、\n1億円規模のシステムを内製する。",
    valueDesc: "「AIを学ぶだけ」の研修では終わりません。助成金で実質負担を抑えながら、外注に頼らず“自社で作り切る力”を社員に残します。",
    valueSteps: [
      { k: "01", label: "研修投資", value: "約200万円", desc: "階層別・実務ハンズオンのフル研修プログラム（全社展開）。" },
      { k: "02", label: "助成金 −75%", value: "実質 約50万円", desc: "人材開発支援助成金で、研修費の最大75%＋受講者の賃金まで助成対象に。" },
      { k: "03", label: "内製で構築", value: "1億円規模のシステム", desc: "外注すれば1億円規模の業務システムを、社員が自分の手で作れるように。作る力は会社に残り続けます。" },
    ],
    valueNote: "※ 金額はモデルケースです。助成金の要件・支給上限により実質負担額は変動します。「1億円規模」は外注相当額の目安です。",
    valueCta: "実質負担額をシミュレーションする",
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
      { num: "01", title: "生成AI入門（2時間）", hours: "2h", desc: "ChatGPT・Claude・Geminiを実際に触りながら「何ができて・何ができないか」を体感し、情報リテラシーと著作権・セキュリティの基礎も押さえます。" },
      { num: "02", title: "業務活用ハンズオン（半日）", hours: "4h", desc: "部署別に業務を棚卸してAIで効率化できる工程を特定し、自分の業務に使えるプロンプトを持ち帰れる設計です。" },
      { num: "03", title: "プロンプトエンジニアリング（半日）", hours: "4h", desc: "再現性のある指示の出し方、Few-shot、Chain of Thought、RAGの基礎など、一段深いスキルを習得します。" },
      { num: "04", title: "社内ガイドライン策定ワークショップ", hours: "6h", desc: "情シス・法務・現場を巻き込んでAI利用ポリシーを共同策定し、ドキュメント化までサポートします。" },
      { num: "05", title: "経営層向けエグゼクティブセッション（90分）", hours: "1.5h", desc: "役員会前後に実施する少人数セッションで、自社の事業・KPIに引きつけてAI戦略を議論します。" },
      { num: "06", title: "継続型スキルアップ（月次定期）", hours: "月2h〜", desc: "毎月新しいテーマの継続研修で、最新モデル検証・事例共有・質疑応答を通じて社内知を蓄積します。" },
      { num: "07", title: "バイブコーディング入門（非エンジニア向け・半日）", hours: "4h", desc: "コードを書かずAIへの自然言語の指示だけで業務ツールやアプリを作る実践ハンズオンで、現場の小さな手作業を自分でツール化できるようになります。" },
    ],
    claudeLabel: "Training × Claude",
    claudeTitle: "Claudeを「使いこなす」実践研修。",
    claudeDesc: "AnthropicのClaudeに特化した実践研修を、貴社の現場ユースケースに即して明日から成果につながる使い方まで落とし込んで提供します。",
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
      { num: "04", title: "オンライン／オンサイト両対応", desc: "全国どこでも実施可能で、録画アーカイブの納品にも対応します。" },
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
    vibeDesc: "AIに自然言語で話しかけるだけで業務アプリ・自動化ツール・社内システムを形にする「バイブコーディング」を、非エンジニアの業務担当者・管理職が明日から活用できるまで育てる研修です。",
    vibePoints: [
      { title: "自然言語でアプリを作る", desc: "ClaudeやCursorなどのAIツールに「こういうものが欲しい」と話しかけるだけで、動くツールを形にする流れを体験します。" },
      { title: "現場の困りごとを自分で解決", desc: "Excel集計・申請フォーム・日報集約など、現場の小さな手作業をその場でツール化し、情シスを待たずに解決できます。" },
      { title: "つまずき所と安全の勘所", desc: "AIに任せきりで失敗しないチェック観点、機密データの扱い、社内で共有・公開する際の注意点まで押さえます。" },
      { title: "作ったものを社内へ広げる", desc: "個人の試作で終わらせず、チームで使える形に整え、社内に横展開する進め方まで学びます。" },
    ],
    vibeExamplesLabel: "受講者が研修中に作れるものの例",
    vibeExamples: ["問い合わせ自動分類ツール", "見積書PDFの自動生成", "日報集計ダッシュボード", "社内FAQチャットボット", "アンケート集計・可視化", "在庫アラートの自動通知"],
    curriculumLabel: "Sample Curriculum",
    curriculumTitle: "サンプルカリキュラム（業務活用ハンズオン・半日）",
    curriculumDesc: "貴社の業務内容・参加者のレベルに合わせてオーダーメイドで設計する、実際の半日研修の一例です。",
    curriculumRows: [
      { time: "0:00", title: "オリエンテーション", desc: "AIで「できること／できないこと」の現在地を共有し、本日のゴールを設定。" },
      { time: "0:20", title: "基本操作ハンズオン", desc: "実際にClaude／ChatGPTを触り、文章生成・要約・翻訳・アイデア出しを体験。" },
      { time: "1:15", title: "自部署の業務を棚卸し", desc: "参加者が自分の業務を洗い出し、AIで効率化できる工程を特定します。" },
      { time: "2:15", title: "実務プロンプト作成", desc: "議事録・メール・資料作成など、自分の業務で使えるプロンプトを実際に作成。" },
      { time: "3:15", title: "成果共有・質疑応答", desc: "各自が作ったプロンプトを共有し、明日からの実践計画に落とし込みます。" },
      { time: "3:45", title: "まとめ・持ち帰り", desc: "テンプレート集とチェックリストを配布し、研修後のフォロー体制を案内します。" },
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
    flowDesc: "最短2週間で初回研修を実施でき、助成金を活用する場合は申請計画から実施報告まで伴走します。",
    flowSteps: [
      { num: "01", title: "お問い合わせ・ヒアリング", desc: "課題・対象者・目的をオンライン30分のご相談からお伺いします。" },
      { num: "02", title: "カリキュラム設計・お見積り", desc: "貴社専用のカリキュラムと費用、助成金の活用プランをご提案します。" },
      { num: "03", title: "事前準備・教材作成", desc: "実際の業務データを題材に、オリジナル教材を作成します。" },
      { num: "04", title: "研修実施", desc: "オンライン／対面／ハイブリッドで実施し、修了証明書を発行します。" },
      { num: "05", title: "フォローアップ", desc: "Slackでの質問対応、1か月後の振り返り、助成金の実施報告まで。" },
    ],
    faqLabel: "FAQ",
    faqTitle: "よくあるご質問",
    faqItems: [
      { q: "AIにまったく触れたことのない社員でも大丈夫ですか？", a: "はい——PCの基本操作ができれば参加できる入門コースから開発者向けの実践コースまで、受講者のレベルに合わせて内容を調整します。" },
      { q: "最低何名から依頼できますか？", a: "1名のエグゼクティブセッションから数百名規模の全社研修まで対応でき、少人数ほど一人ひとりの業務に密着した内容にできます。" },
      { q: "オンラインと対面、どちらがおすすめですか？", a: "定着重視なら対面またはハイブリッドがおすすめですが、全国どこでもオンライン実施・録画アーカイブの納品にも対応します。" },
      { q: "助成金は必ず使えますか？", a: "要件（研修10時間以上など）を満たせば経費の最大75%が対象で、要件確認から申請・社労士連携まで伴走しますが、支給可否は審査により決定されます。" },
      { q: "研修で使うAIツールは何ですか？", a: "ChatGPT・Claude・Geminiなど主要な生成AIを扱い、Anthropic Claude特化の実践研修や非エンジニア向けのバイブコーディング研修もご用意しています。" },
      { q: "自社の業務に合わせた内容にできますか？", a: "はい——事前ヒアリングで業務課題を把握し、実際の業務データを題材にカリキュラムをオーダーメイドします。" },
      { q: "研修後のサポートはありますか？", a: "Slackでの質問対応と1か月後の振り返りセッションをセットで、学んだことが現場に定着するまで伴走します。" },
    ],
    ctaLabel: "Contact",
    ctaTitle: "「使える」を、研修から。",
    ctaDesc: "貴社の課題に合わせてカリキュラムからご提案し、助成金活用についてもあわせて相談できます。",
    ctaButton: "無料で相談する",
  },
  en: {
    heroKicker: "AI Training",
    heroTitle: "Build in-house systems—\nfor real, not someday.",
    heroDesc: "Even employees who can't code learn to build their own operational systems with Claude × Vibe Coding. Bring a system that would cost ¥100M to outsource in-house—from as little as ¥500K after subsidies.",
    heroSubsidyLink: "Learn how to use subsidies",
    heroBadges: ["You will build, guaranteed", "Up to 75% subsidized", "No coding required"],
    lpEyebrow: "Dedicated landing page",
    lpTitle: "See the full details of our AI in-house development training",
    lpDesc: "Curriculum, pricing, a subsidy cost simulator, and a quick eligibility check — all on the dedicated page. Download the brochure there too.",
    lpCta: "View the dedicated page",
    valueEyebrow: "The Math",
    valueTitle: "¥500K net to build\na ¥100M-class system in-house.",
    valueDesc: "This isn't training that ends at \"learning AI.\" With subsidies lowering your net cost, your team keeps the ability to build—without relying on outsourcing.",
    valueSteps: [
      { k: "01", label: "Training investment", value: "≈ ¥2M", desc: "Full role-based, hands-on program rolled out company-wide." },
      { k: "02", label: "Subsidy −75%", value: "≈ ¥500K net", desc: "Up to 75% of training cost—plus trainee wages—covered by the HRD subsidy." },
      { k: "03", label: "Built in-house", value: "¥100M-class system", desc: "A system that would cost ¥100M to outsource, built by your own people. The capability stays in the company." },
    ],
    valueNote: "※ Figures are a model case. Net cost varies with subsidy requirements and caps. \"¥100M-class\" is an outsourcing-equivalent estimate.",
    valueCta: "Simulate your net cost",
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
      { num: "01", title: "Intro to Generative AI (2h)", hours: "2h", desc: "Hands-on with ChatGPT, Claude, and Gemini to feel 'what they can and can't do,' covering information literacy plus copyright and security basics." },
      { num: "02", title: "Workflow Hands-on (half day)", hours: "4h", desc: "Inventory workflows by department, identify steps AI can streamline, and leave with prompts ready for your own work." },
      { num: "03", title: "Prompt Engineering (half day)", hours: "4h", desc: "Reproducible instructions, few-shot, chain of thought, and RAG basics — a deeper level of skill." },
      { num: "04", title: "Internal Guideline Workshop", hours: "6h", desc: "Co-author your AI usage policy with IT, legal, and the field — including documentation support." },
      { num: "05", title: "Executive Session (90 min)", hours: "1.5h", desc: "A small-group session around board meetings, discussing AI strategy tied to your business and KPIs." },
      { num: "06", title: "Continuous Upskilling (monthly)", hours: "2h+/mo", desc: "Ongoing training on a new theme each month — latest-model testing, case sharing, and Q&A to build internal knowledge." },
      { num: "07", title: "Intro to Vibe Coding (non-engineers, half day)", hours: "4h", desc: "A hands-on session to build internal tools and apps with plain-language instructions to AI — no coding — so you can turn small manual tasks into tools yourself." },
    ],
    claudeLabel: "Training × Claude",
    claudeTitle: "Hands-on training to truly master Claude.",
    claudeDesc: "Training dedicated to Anthropic's Claude, grounded in your real use cases — down to ways of working that drive results from day one.",
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
    vibeDesc: "\"Vibe coding\" means describing what you want to AI in plain language and it builds the tool — this program grows non-engineer staff and managers into people who can start their own 'small DX' from day one.",
    vibePoints: [
      { title: "Build apps in plain language", desc: "Experience turning 'I want something like this' into a working tool, just by talking to AI tools like Claude and Cursor." },
      { title: "Solve your own pain points", desc: "Turn small manual tasks — Excel aggregation, request forms, daily-report roll-ups — into tools on the spot, without waiting on IT." },
      { title: "Pitfalls and safety basics", desc: "Learn the checks that keep you from failing by over-trusting AI, how to handle confidential data, and what to watch when sharing or publishing." },
      { title: "Roll it out across the company", desc: "Go beyond a personal prototype — shape it into something the team can use and spread it internally." },
    ],
    vibeExamplesLabel: "Examples participants can build during the session",
    vibeExamples: ["Inquiry auto-classifier", "Auto-generated quote PDFs", "Daily-report dashboard", "Internal FAQ chatbot", "Survey aggregation & charts", "Inventory alert notifications"],
    curriculumLabel: "Sample Curriculum",
    curriculumTitle: "Sample curriculum (Workflow Hands-on, half day)",
    curriculumDesc: "An example of an actual half-day session, designed to order around your workflows and participants' levels.",
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
    outcomesDesc: "A picture of the typical change many teams see after training (results vary by work and proficiency).",
    outcomes: [
      { dept: "Sales", before: "Half a day for a proposal draft", after: "A draft in 30 minutes", metric: "~80% faster" },
      { dept: "Back office", before: "An hour to clean up minutes", after: "Recording to summary in 10 min", metric: "~85% faster" },
      { dept: "Customer support", before: "Every reply from scratch", after: "AI draft + light edits, sent fast", metric: "~1.5× volume" },
      { dept: "Planning & marketing", before: "Days of market & competitor research", after: "Initial research in hours", metric: "Much faster ramp-up" },
    ],
    flowLabel: "Flow",
    flowTitle: "From inquiry to delivery",
    flowDesc: "We can run a first session in as little as two weeks, supporting subsidy users from application planning to the completion report.",
    flowSteps: [
      { num: "01", title: "Inquiry & interview", desc: "We learn your challenges, audience, and goals — starting from a 30-minute online chat." },
      { num: "02", title: "Curriculum design & quote", desc: "We propose a curriculum built for you, the cost, and a subsidy plan." },
      { num: "03", title: "Prep & materials", desc: "We create original materials based on your real work data." },
      { num: "04", title: "Delivery", desc: "Delivered online / in-person / hybrid, with a certificate of completion issued." },
      { num: "05", title: "Follow-up", desc: "Slack Q&A, a one-month retrospective, and the subsidy completion report." },
    ],
    faqLabel: "FAQ",
    faqTitle: "Frequently asked questions",
    faqItems: [
      { q: "Is it OK for staff who've never touched AI?", a: "Yes — we tailor the content to participants' levels, from an intro course ('if you can use a PC') to practical courses for developers." },
      { q: "What's the minimum headcount?", a: "Anything from a one-person executive session to a company-wide program of several hundred; the smaller the group, the more closely tied to each person's work." },
      { q: "Online or in-person — which do you recommend?", a: "In-person or hybrid is best for retention, but online delivery is available nationwide with recorded archives too." },
      { q: "Can I always use subsidies?", a: "Japan's Human Resources Development Subsidy covers up to 75% for SMEs if requirements are met (e.g., 10+ training hours); we support you from eligibility through application, but approval is by review." },
      { q: "Which AI tools do you use in training?", a: "Major generative AI including ChatGPT, Claude, and Gemini — plus training dedicated to Anthropic Claude and vibe-coding training for non-engineers." },
      { q: "Can it be tailored to our work?", a: "Yes — we capture your challenges in an upfront interview and build the curriculum to order around your real work data, never just generic how-tos." },
      { q: "Is there post-training support?", a: "We can bundle Slack Q&A and a one-month retrospective session, supporting you until what was learned takes hold on the ground." },
    ],
    ctaLabel: "Contact",
    ctaTitle: "Start with training that sticks.",
    ctaDesc: "We tailor the curriculum to your challenges — ask about subsidies too.",
    ctaButton: "Book a free consultation",
  },
};

export default function TrainingPage() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  return (
    <>
      {/* MASTHEAD */}
      <section className="bg-white pt-32 lg:pt-40">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-neutral-900 pb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
              <span className="font-bold text-neutral-900">§00</span>
              <span>{t.heroKicker}</span>
              <span className="text-neutral-300">/</span>
              <span>Enablement</span>
              <span className="text-neutral-300">/</span>
              <span>Claude</span>
              <span className="text-neutral-300">/</span>
              <span>Subsidy&nbsp;75%</span>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="mt-10 text-[8.5vw] sm:text-4xl lg:text-[3.4rem] font-bold leading-[0.98] tracking-[-0.04em] whitespace-pre-line text-neutral-900">
              {t.heroTitle}
            </h1>
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-7 flex flex-wrap gap-2">
              {t.heroBadges.map((b, i) => (
                <span key={b} className={`inline-flex items-center gap-1.5 border px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.1em] ${i === 0 ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-300 text-neutral-700"}`}>
                  {i === 0 && <span aria-hidden>◆</span>}{b}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-8 max-w-2xl text-base lg:text-lg leading-relaxed text-pretty text-neutral-600">{t.heroDesc}</p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-9 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3">
              <a href="/contact?service=training" className="group inline-flex items-center justify-center gap-2 border border-neutral-900 bg-neutral-900 px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.08em] text-white transition-[color,background-color,scale] duration-300 hover:bg-transparent hover:text-neutral-900 active:scale-[0.96]">
                {t.ctaButton}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a href="/subsidy" className="group inline-flex items-center gap-2 border-b border-neutral-900 pb-1 font-mono text-xs font-bold uppercase tracking-[0.15em] text-neutral-900 transition-colors duration-300 hover:text-neutral-600">
                {t.heroSubsidyLink} <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* LP 導線バナー — 専用ランディングページ（clearai-kensyuu.jp） */}
      <section className="bg-white pt-2 pb-6 lg:pb-8">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <a
              href="https://clearai-kensyuu.jp"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden border border-[#0a1f3c] bg-[#0a1f3c] p-6 lg:p-8 transition-[scale] duration-300 active:scale-[0.995]"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
                <div className="max-w-3xl">
                  <div className="flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400">
                    <span aria-hidden>◆</span>
                    <span>{t.lpEyebrow}</span>
                  </div>
                  <p className="mt-4 text-2xl lg:text-[1.9rem] font-bold leading-[1.1] tracking-[-0.02em] text-balance text-white">
                    {t.lpTitle}
                  </p>
                  <p className="mt-3 text-sm lg:text-[15px] leading-relaxed text-pretty text-neutral-300">{t.lpDesc}</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-2.5 border border-amber-400 bg-amber-400 px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.08em] text-[#0a1f3c] transition-colors duration-300 group-hover:bg-transparent group-hover:text-amber-400">
                  {t.lpCta}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
                </span>
              </div>
            </a>
          </Reveal>
        </div>
      </section>

      {/* VALUE — 実質50万で1億円規模のシステムを内製 */}
      <section className="bg-neutral-900 py-14 lg:py-20 text-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="flex items-center gap-4 border-b border-white/25 pb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-400">
              <span className="font-bold text-white">◆</span>
              <span>{t.valueEyebrow}</span>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-8 max-w-4xl text-[7vw] sm:text-3xl lg:text-[2.6rem] font-bold leading-[1.05] tracking-[-0.03em] whitespace-pre-line text-white">
              {t.valueTitle}
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-2xl text-[15px] lg:text-base leading-relaxed text-pretty text-neutral-400">{t.valueDesc}</p>
          </Reveal>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {t.valueSteps.map((s, i) => (
              <Reveal key={s.k} delay={i * 110}>
                <div className={`relative flex h-full flex-col border p-7 lg:p-8 ${i === 2 ? "border-white bg-white text-neutral-900" : "border-white/20 bg-white/[0.04]"}`}>
                  <div className="flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
                    <span className={i === 2 ? "text-neutral-900" : "text-neutral-400"}>{s.label}</span>
                    <span className={i === 2 ? "text-neutral-400" : "text-neutral-600"}>{s.k}</span>
                  </div>
                  <p className={`mt-6 text-3xl lg:text-[2.1rem] font-bold tabular-nums tracking-tight leading-none text-balance ${i === 2 ? "text-neutral-900" : "text-white"}`}>{s.value}</p>
                  <p className={`mt-5 flex-1 text-sm leading-relaxed text-pretty ${i === 2 ? "text-neutral-600" : "text-neutral-400"}`}>{s.desc}</p>
                  {i < 2 && <span aria-hidden className="pointer-events-none absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 font-mono text-2xl text-white/40 lg:block">→</span>}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
              <a href="/subsidy" className="group inline-flex items-center justify-center gap-2 border border-white bg-white px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.08em] text-neutral-900 transition-[color,background-color,scale] duration-300 hover:bg-transparent hover:text-white active:scale-[0.96]">
                {t.valueCta}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <p className="max-w-xl font-mono text-[11px] leading-relaxed text-neutral-500">{t.valueNote}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-12 lg:py-16 bg-neutral-50 border-y border-neutral-900">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead
            index="01"
            kicker={t.pricingLabel}
            title={t.pricingTitle}
            desc={<>{t.pricingDescA}<a href="/subsidy" className="border-b border-neutral-900 font-semibold text-neutral-900 hover:text-neutral-600">{t.pricingSim}</a>{t.pricingDescB}</>}
          />
          <PricingCarousel>
            {t.plans.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 100} className="flex">
                <div className={`group flex w-full flex-col border border-neutral-900 p-7 lg:p-8 ${plan.featured ? "bg-neutral-900 text-white" : "bg-white"}`}>
                  <div className={`mb-5 flex items-center justify-between border-b pb-3 ${plan.featured ? "border-neutral-700" : "border-neutral-200"}`}>
                    <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.18em] ${plan.featured ? "text-white" : "text-neutral-900"}`}>{plan.name}</span>
                    <span className={`font-mono text-[10px] tabular-nums ${plan.featured ? "text-neutral-500" : "text-neutral-400"}`}>{plan.featured && plan.badge ? plan.badge : String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="mb-2 flex items-baseline gap-1.5">
                    <span className={`font-mono text-2xl font-bold tabular-nums ${plan.featured ? "text-white" : "text-neutral-900"}`}>{plan.price}</span>
                    {plan.unit && <span className={`font-mono text-xs ${plan.featured ? "text-neutral-400" : "text-neutral-500"}`}>{plan.unit}</span>}
                  </div>
                  <p className={`mb-5 text-sm leading-relaxed text-pretty ${plan.featured ? "text-neutral-400" : "text-neutral-600"}`}>{plan.desc}</p>
                  <ul className={`mb-6 flex-1 space-y-2 border-t pt-4 font-mono ${plan.featured ? "border-neutral-700" : "border-neutral-200"}`}>
                    {plan.features.map((f) => (
                      <li key={f} className={`flex items-start gap-2 text-xs ${plan.featured ? "text-neutral-400" : "text-neutral-500"}`}>
                        <span className={`flex-shrink-0 ${plan.featured ? "text-white" : "text-neutral-900"}`}>→</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="/contact?service=training" className={`mt-auto inline-flex items-center justify-center gap-3 border px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.08em] transition-[color,background-color,border-color,scale] duration-300 active:scale-[0.96] ${plan.featured ? "border-white bg-white text-neutral-900 hover:bg-transparent hover:text-white" : "border-neutral-900 bg-neutral-900 text-white hover:bg-transparent hover:text-neutral-900"}`}>
                    {t.planCta}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </Reveal>
            ))}
          </PricingCarousel>
          <Reveal delay={300}>
            <p className="mt-8 font-mono text-[11px] text-neutral-500">{t.pricingNote}</p>
          </Reveal>
        </div>
      </section>

      {/* TARGET */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="02" kicker={t.forLabel} title={t.forTitle} />
          <CardCarousel gridClass="md:grid-cols-3">
            {t.targets.map((item, i) => (
              <Reveal key={item.role} delay={i * 80}>
                <div className="flex h-full flex-col border border-neutral-900 bg-white p-7 lg:p-8">
                  <div className="mb-6 flex items-center justify-between border-b border-neutral-200 pb-3">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-900">{item.role}</span>
                    <span className="font-mono text-[10px] tabular-nums text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mb-3 text-lg lg:text-xl font-bold tracking-tight text-balance text-neutral-900">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-pretty text-neutral-600">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* PROGRAMS */}
      <section id="programs" className="py-12 lg:py-16 bg-neutral-50 border-y border-neutral-900">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="03" kicker={t.programsLabel} title={t.programsTitle} desc={t.programsDesc} />
          <CardCarousel gridClass="md:grid-cols-2">
            {t.programs.map((item, i) => (
              <Reveal key={item.num} delay={i * 70}>
                <div className="group h-full border border-neutral-900 bg-white p-7 lg:p-8 transition-colors duration-300 hover:bg-neutral-900">
                  <div className="mb-4 flex items-center justify-between border-b border-neutral-200 pb-3 transition-colors duration-300 group-hover:border-neutral-700">
                    <span className="font-mono text-2xl font-bold tabular-nums text-neutral-900 transition-colors duration-300 group-hover:text-white">{item.num}</span>
                    <span className="border border-neutral-300 px-2 py-0.5 font-mono text-[10px] tabular-nums uppercase tracking-[0.1em] text-neutral-500 transition-colors duration-300 group-hover:border-neutral-600 group-hover:text-neutral-300">{item.hours}</span>
                  </div>
                  <h3 className="mb-4 text-lg lg:text-xl font-bold tracking-tight text-balance text-neutral-900 transition-colors duration-300 group-hover:text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-pretty text-neutral-600 transition-colors duration-300 group-hover:text-neutral-300">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* CLAUDE INTEGRATION */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="04" kicker={t.claudeLabel} title={t.claudeTitle} desc={t.claudeDesc} />
          <CardCarousel gridClass="md:grid-cols-2">
            {t.claudePoints.map((p, i) => (
              <Reveal key={p.title} delay={i * 70}>
                <div className="flex h-full flex-col border border-neutral-900 bg-white p-7 lg:p-8">
                  <span className="mb-4 block font-mono text-[10px] font-bold tabular-nums uppercase tracking-[0.18em] text-neutral-400">
                    CLD.{String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mb-3 text-base lg:text-lg font-bold tracking-tight text-balance text-neutral-900">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-pretty text-neutral-600">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* VIBE CODING */}
      <section className="py-12 lg:py-16 bg-neutral-900">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="05" kicker={t.vibeLabel} title={t.vibeTitle} desc={t.vibeDesc} dark />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {t.vibePoints.map((p, i) => (
              <Reveal key={p.title} delay={i * 70} className="h-full">
                <div className="flex h-full flex-col border border-white/15 bg-white/[0.04] p-7 lg:p-8">
                  <span className="mb-4 block font-mono text-[10px] font-bold tabular-nums uppercase tracking-[0.18em] text-neutral-500">
                    VIBE.{String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mb-3 text-base lg:text-lg font-bold tracking-tight text-balance text-white">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-pretty text-neutral-400">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">{t.vibeExamplesLabel}</p>
            <div className="flex flex-wrap gap-2">
              {t.vibeExamples.map((ex) => (
                <span key={ex} className="border border-white/20 bg-transparent px-2.5 py-1 font-mono text-[13px] text-neutral-300 transition-colors duration-200 hover:border-white">{ex}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* SAMPLE CURRICULUM */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="06" kicker={t.curriculumLabel} title={t.curriculumTitle} desc={t.curriculumDesc} />
          {/* table header */}
          <div className="hidden lg:grid grid-cols-12 gap-6 border-b border-neutral-900 pb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
            <div className="col-span-2">Time</div>
            <div className="col-span-3">Session</div>
            <div className="col-span-7">Detail</div>
          </div>
          {t.curriculumRows.map((row, i) => (
            <Reveal key={row.time} delay={i * 60}>
              <div className="group grid grid-cols-1 gap-2 border-b border-neutral-200 py-7 transition-colors duration-300 hover:bg-neutral-50 lg:grid-cols-12 lg:gap-6">
                <div className="lg:col-span-2">
                  <span className="font-mono text-lg font-bold tabular-nums text-neutral-900">{row.time}</span>
                </div>
                <div className="lg:col-span-3">
                  <h3 className="text-base font-bold tracking-tight text-balance text-neutral-900">{row.title}</h3>
                </div>
                <div className="lg:col-span-7">
                  <p className="text-[15px] leading-relaxed text-pretty text-neutral-600">{row.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal delay={200}>
            <p className="mt-6 font-mono text-[11px] text-neutral-500">{t.curriculumNote}</p>
          </Reveal>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="py-12 lg:py-16 bg-neutral-50 border-y border-neutral-900">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="07" kicker={t.outcomesLabel} title={t.outcomesTitle} desc={t.outcomesDesc} />
          <CardCarousel gridClass="md:grid-cols-2">
            {t.outcomes.map((o, i) => (
              <Reveal key={o.dept} delay={i * 70}>
                <div className="flex h-full flex-col border border-neutral-900 bg-white p-7 lg:p-8">
                  <div className="mb-5 flex items-center justify-between border-b border-neutral-200 pb-3">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-900">{o.dept}</span>
                    <span className="border border-neutral-900 bg-neutral-900 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-white">{o.metric}</span>
                  </div>
                  <div className="flex items-stretch gap-3">
                    <div className="flex-1 border border-neutral-200 bg-neutral-50 p-4">
                      <p className="mb-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">Before</p>
                      <p className="text-sm leading-relaxed text-pretty text-neutral-500">{o.before}</p>
                    </div>
                    <div className="flex items-center font-mono text-neutral-400">→</div>
                    <div className="flex-1 border border-neutral-900 bg-neutral-900 p-4">
                      <p className="mb-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">After</p>
                      <p className="text-sm font-medium leading-relaxed text-pretty text-white">{o.after}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* FORMATS */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="08" kicker={t.formatsLabel} title={t.formatsTitle} />
          <CardCarousel gridClass="md:grid-cols-4">
            {t.formats.map((f, i) => (
              <Reveal key={f.title} delay={i * 70}>
                <div className="flex h-full flex-col border border-neutral-900 bg-white p-6">
                  <span className="mb-4 block font-mono text-[10px] font-bold tabular-nums uppercase tracking-[0.18em] text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mb-2 text-sm font-bold tracking-tight text-balance text-neutral-900">{f.title}</h3>
                  <p className="text-xs leading-relaxed text-pretty text-neutral-600">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
          <Reveal delay={200}>
            <p className="mt-6 font-mono text-[11px] text-neutral-500">{t.formatsNote}</p>
          </Reveal>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-12 lg:py-16 bg-neutral-50 border-y border-neutral-900">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="09" kicker={t.featuresLabel} title={t.featuresTitle} />
          <CardCarousel gridClass="md:grid-cols-2">
            {t.features.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="group h-full border border-neutral-900 bg-white p-7 lg:p-8 transition-colors duration-300 hover:bg-neutral-900">
                  <div className="mb-4 flex items-baseline justify-between border-b border-neutral-200 pb-4 transition-colors duration-300 group-hover:border-neutral-700">
                    <span className="font-mono text-2xl font-bold tabular-nums text-neutral-900 transition-colors duration-300 group-hover:text-white">{item.num}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">Feature / {item.num}</span>
                  </div>
                  <h3 className="mb-3 text-lg lg:text-xl font-bold tracking-tight text-balance text-neutral-900 transition-colors duration-300 group-hover:text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-pretty text-neutral-600 transition-colors duration-300 group-hover:text-neutral-300">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* FLOW */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="10" kicker={t.flowLabel} title={t.flowTitle} desc={t.flowDesc} />
          {/* table header */}
          <div className="hidden lg:grid grid-cols-12 gap-6 border-b border-neutral-900 pb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
            <div className="col-span-1">No.</div>
            <div className="col-span-4">Phase</div>
            <div className="col-span-7">Detail</div>
          </div>
          {t.flowSteps.map((step, i) => (
            <Reveal key={step.num} delay={i * 60}>
              <div className="group grid grid-cols-1 gap-2 border-b border-neutral-200 py-7 transition-colors duration-300 hover:bg-neutral-50 lg:grid-cols-12 lg:gap-6">
                <div className="lg:col-span-1">
                  <span className="font-mono text-lg font-bold tabular-nums text-neutral-900">{step.num}</span>
                </div>
                <div className="lg:col-span-4">
                  <h3 className="text-lg font-bold tracking-tight text-balance text-neutral-900">{step.title}</h3>
                </div>
                <div className="lg:col-span-7">
                  <p className="text-[15px] leading-relaxed text-pretty text-neutral-600">{step.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 補助金 CTA SECTION */}
      <section className="py-12 lg:py-16 bg-neutral-50 border-y border-neutral-900">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead
            index="11"
            kicker={t.subsidyLabel}
            title={<>{t.subsidyTitlePre}<span className="text-neutral-900">{t.subsidyTitleHighlight}</span>{t.subsidyTitlePost}</>}
            desc={<>{t.subsidyDescA}<br />{t.subsidyDescB}</>}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {t.subsidyCards.map((card, i) => (
              <Reveal key={card.label} delay={i * 80}>
                <div className="flex h-full flex-col border border-neutral-900 bg-white p-7 lg:p-8">
                  <div className="mb-6 flex items-center justify-between border-b border-neutral-200 pb-3">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-900">{card.label}</span>
                    <span className="font-mono text-[10px] tabular-nums text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <p className="font-mono text-4xl lg:text-5xl font-bold tabular-nums leading-none text-neutral-900">
                    {card.value}<span className="text-lg text-neutral-500">{card.unit}</span>
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-pretty text-neutral-600">{card.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="flex flex-wrap items-center gap-4">
              <a href="/subsidy" className="group inline-flex items-center gap-3 border border-neutral-900 bg-neutral-900 px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.08em] text-white transition-[color,background-color,border-color,scale] duration-300 hover:bg-transparent hover:text-neutral-900 active:scale-[0.96]">
                {t.subsidyCtaPrimary}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a href="/contact?service=subsidy" className="border-b border-neutral-900 pb-1 font-mono text-xs font-bold uppercase tracking-[0.1em] text-neutral-900 transition-colors duration-300 hover:text-neutral-600">
                {t.subsidyCtaSecondary}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="12" kicker={t.faqLabel} title={t.faqTitle} />
          <div className="max-w-3xl border-t border-neutral-900">
            {t.faqItems.map((item, i) => (
              <Reveal key={item.q} delay={i * 50}>
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
              <span className="font-bold text-white">§13</span>
              <span>{t.ctaLabel}</span>
            </div>
            <div className="mt-12 grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <h2 className="text-[18px] sm:text-xl lg:text-2xl font-bold leading-[1.15] sm:leading-[1.05] tracking-[-0.02em] text-balance text-white">{t.ctaTitle}</h2>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-pretty text-neutral-400">{t.ctaDesc}</p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <a href="/reserve" className="group inline-flex items-center gap-3 border border-white bg-white px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.08em] text-neutral-900 transition-[color,background-color,border-color,scale] duration-300 hover:bg-transparent hover:text-white active:scale-[0.96]">
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

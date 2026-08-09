"use client";

/*
 * フィジカルAI受託開発（/physical-ai）
 *
 * ロボット・現場設備 × AI を「実際に動くシステム」として受託開発する事業のLP。
 * 価格は /ai-agent の公開レンジ（PoC 150万円 / 本番 600万円〜 / 運用 30万円/月）に整合させている。
 */

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(24px)",
      transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    }}>{children}</div>
  );
}

function SectionHead({ index, kicker, title, desc }: { index: string; kicker: string; title: ReactNode; desc?: ReactNode }) {
  return (
    <Reveal className="mb-8 md:mb-7 lg:mb-9">
      <div className="flex items-center gap-4 border-b border-neutral-900 pb-4">
        <span className="font-mono text-xs font-bold tabular-nums text-neutral-900">§{index}</span>
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-neutral-500">{kicker}</span>
      </div>
      <h2 className="mt-6 md:mt-8 text-[18px] sm:text-xl lg:text-2xl font-bold leading-[1.15] sm:leading-[1.05] tracking-[-0.02em] text-balance text-neutral-900">{title}</h2>
      {desc && <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-pretty text-neutral-600">{desc}</p>}
    </Reveal>
  );
}

type Copy = {
  breadcrumb: string;
  heroBadges: string[];
  heroTitle: ReactNode;
  heroDesc: string;
  heroPrimary: string;
  heroSecondary: string;

  whatLabel: string; whatTitle: string; whatDesc: string;
  whatBlocks: { term: string; def: string }[];

  domainLabel: string; domainTitle: string; domainDesc: string;
  domains: { tag: string; title: string; desc: string; items: string[] }[];

  scopeLabel: string; scopeTitle: string; scopeDesc: string;
  scopes: { num: string; title: string; desc: string }[];

  processLabel: string; processTitle: string; processDesc: string;
  process: { num: string; title: string; en: string; desc: string; duration: string }[];

  deliverLabel: string; deliverTitle: string; deliverDesc: string;
  deliverables: { title: string; desc: string }[];

  priceLabel: string; priceTitle: string; priceDesc: string;
  plans: { name: string; price: string; unit: string; desc: string; features: string[]; featured: boolean; badge?: string }[];
  priceNote: string;

  faqLabel: string; faqTitle: string;
  faq: { q: string; a: string }[];

  ctaTitle: string; ctaDesc: string; ctaPrimary: string; ctaSecondary: string;
};

const COPY: Record<"ja" | "en", Copy> = {
  ja: {
    breadcrumb: "フィジカルAI受託開発",
    heroBadges: ["ロボット × AI", "PoC 150万円〜", "ソースコードは顧客帰属"],
    heroTitle: (<>フィジカルAIを、<br className="hidden sm:inline" />現場で動くシステムにする。</>),
    heroDesc: "カメラ・センサー・ロボットといった物理的な機器とAIをつなぎ、点検・搬送・接客・製造といった現場作業そのものを自動化します。構想から設計・実装・現場実証・運用まで、clearAIが受託開発として一貫して担います。",
    heroPrimary: "無料で相談する",
    heroSecondary: "料金プランを見る",

    whatLabel: "Definition",
    whatTitle: "フィジカルAIとは何か",
    whatDesc: "画面の中で完結する従来の生成AIに対し、フィジカルAI（Physical AI / Embodied AI）は現実世界で「認識し、判断し、動く」ことを目的としたAIの領域を指します。",
    whatBlocks: [
      { term: "認識する", def: "カメラ・LiDAR・各種センサーから現場の状態を取得し、計器の値・異常箇所・人や物の位置をAIが読み取ります。" },
      { term: "判断する", def: "取得した情報と業務ルール・過去データをもとに、次に何をすべきかをLLMや制御モデルが判断します。曖昧な指示や例外にも対応できる点が従来の自動化との違いです。" },
      { term: "動く", def: "ロボット・アーム・搬送機・既存設備へ指示を送り、実際の作業として実行します。結果は再び認識にフィードバックされ、継続的に精度が上がっていきます。" },
      { term: "残す", def: "実行のログ・判断根拠・例外対応の履歴を蓄積し、監査・改善・次の自動化に再利用できる資産として社内に残します。" },
    ],

    domainLabel: "Use Cases",
    domainTitle: "対応する領域",
    domainDesc: "ロボット単体の導入ではなく、既存の業務フロー・基幹システムと接続した状態で設計するため、現場の運用に無理なく組み込めます。",
    domains: [
      {
        tag: "点検・保全",
        title: "設備点検・巡回の自動化",
        desc: "四足歩行ロボットや固定カメラが工場・プラント・倉庫を巡回し、計器の読み取り・異音や発熱の検知・異常箇所の記録を自動化します。",
        items: ["自律巡回ルートの設計", "メーター・ゲージの自動読み取り", "異常検知アラートの業務システム連携", "夜間・休日の無人点検"],
      },
      {
        tag: "搬送・物流",
        title: "構内搬送・ピッキングの自動化",
        desc: "搬送ロボットや協働ロボットアームを在庫システムと接続し、指示出しから実行・実績記録までを一連の流れとして自動化します。",
        items: ["在庫・WMSとの連携", "ピッキング対象の画像認識", "動線シミュレーション", "人との協働を前提とした安全設計"],
      },
      {
        tag: "接客・案内",
        title: "ヒューマノイドによる接客・案内",
        desc: "受付・商業施設・展示会でヒューマノイドが案内や対話を行う体験を設計し、対話AIと施設側の情報を接続します。",
        items: ["対話シナリオとガードレール設計", "施設情報・予約システム連携", "多言語対応", "レンタル機体での短期実証"],
      },
      {
        tag: "製造・品質",
        title: "外観検査・工程の効率化",
        desc: "画像認識モデルで外観検査や作業手順の逸脱検知を行い、検査記録と改善サイクルまでを含めて仕組み化します。",
        items: ["外観検査モデルの構築・評価", "作業手順の逸脱検知", "検査記録の自動蓄積", "エッジ推論によるオンプレ実行"],
      },
    ],

    scopeLabel: "Scope",
    scopeTitle: "受託開発でお引き受けする範囲",
    scopeDesc: "ハードウェアの選定から、AIモデル、業務システム連携、現場オペレーションの設計まで、境界をまたぐ部分こそ私たちの担当領域です。",
    scopes: [
      { num: "01", title: "機体・センサーの選定", desc: "用途・現場条件・予算から最適な機体とセンサー構成を選定します。レンタルでの事前検証と組み合わせて、購入前に適合性を確認できます。" },
      { num: "02", title: "AIモデルの構築・評価", desc: "画像認識・異常検知・LLMによる判断など、用途に応じたモデルを構築し、実データで成功率を測定しながら改善します。" },
      { num: "03", title: "制御・連携ソフトウェアの実装", desc: "ロボットの制御、既存の基幹システム・WMS・SaaSとのAPI連携、現場担当者向けの操作アプリまで実装します。" },
      { num: "04", title: "現場実証（PoC）", desc: "本番に近い環境で稼働させ、想定ケースでの成功率・所要時間・例外の頻度を測定し、本番化の可否を数値で判断します。" },
      { num: "05", title: "本番実装・運用設計", desc: "認証・権限、監視・ログ、コスト最適化、障害時のRunbook整備まで行い、止まらない運用体制を構築します。" },
      { num: "06", title: "社内への引き継ぎ", desc: "操作・チューニング・トラブル対応を社員が担えるよう、ドキュメントと研修で引き継ぎます。外注依存を残しません。" },
    ],

    processLabel: "Process",
    processTitle: "開発の進め方",
    processDesc: "いきなり本番開発には入りません。小さく検証し、数値で確かめてから投資判断していただく進め方を標準としています。",
    process: [
      { num: "01", title: "業務理解・現場ヒアリング", en: "Discovery", desc: "対象業務の流れと現場条件を可視化し、AI・ロボットで置き換える範囲とKPI、投資対効果の見立てを整理します。", duration: "1〜2週間" },
      { num: "02", title: "システム設計", en: "Design", desc: "機体構成、センサー、AIモデル、連携先システム、安全設計、Human-in-the-loopの置き方、評価軸を定義します。", duration: "1〜2週間" },
      { num: "03", title: "PoC開発・現場検証", en: "PoC", desc: "レンタル機体などを使い実環境でプロトタイプを稼働させ、20〜50ケースで成功率を測定しながら改善します。", duration: "3〜6週間" },
      { num: "04", title: "本番実装・統合", en: "Production", desc: "既存システム連携、認証・権限、監視・ログ、コスト最適化、Runbook整備を経て本番稼働へ移行します。", duration: "3〜6ヶ月" },
      { num: "05", title: "運用・継続改善", en: "Operation", desc: "稼働後も品質モニタリング、モデル・プロンプトのチューニング、新しいユースケースの追加を継続します。", duration: "月次継続" },
    ],

    deliverLabel: "Deliverables",
    deliverTitle: "納品するもの",
    deliverDesc: "ブラックボックスは残しません。動くシステムと同時に、社内で運用・改変できる状態一式をお渡しします。",
    deliverables: [
      { title: "ソースコード一式", desc: "TypeScript / Python で実装し、リポジトリ・IP・改変権はすべて顧客に帰属します。" },
      { title: "インフラ構成（IaC）", desc: "Terraform / Pulumi / Vercel / Cloud Run などで構成し、顧客クラウドへのデプロイにも対応します。" },
      { title: "現場オペレーション手順書", desc: "起動・停止・充電・トラブル対応・安全確認まで、現場担当者が読める形で文書化します。" },
      { title: "評価・監視ダッシュボード", desc: "成功率・稼働時間・異常検知件数・コストを可視化し、改善の判断材料にできる状態で納品します。" },
      { title: "モデル・プロンプト定義集", desc: "使用したモデル、学習データの扱い、プロンプト、ツール定義をバージョン管理した状態でお渡しします。" },
      { title: "引き継ぎ研修", desc: "担当者向けに操作・チューニング・障害対応の研修を実施します（AI研修と組み合わせも可能）。" },
    ],

    priceLabel: "Pricing",
    priceTitle: "料金プラン",
    priceDesc: "まずはPoCパックで現場適合性を確かめ、結果を見てから本番開発へ進む形を推奨しています。",
    plans: [
      { name: "PoCパック", price: "150万円", unit: "/ 一式", desc: "業務理解〜設計〜PoC構築・現場検証まで。本番化前の意思決定に最適。", features: ["現場ヒアリング・要件整理", "機体・センサー構成の選定", "プロトタイプ実装", "実環境での成功率測定", "本番化の可否レポート"], featured: false },
      { name: "本番開発パック", price: "600万円〜", unit: "/ プロジェクト", desc: "PoCを踏まえた本番実装・既存システム統合・運用基盤構築まで。3〜6ヶ月で稼働。", features: ["本番システムの設計・実装", "既存システム・基幹連携", "認証・権限・監視・ログ", "現場オペレーション設計", "Runbook・手順書の整備", "引き継ぎ研修"], featured: true, badge: "Popular" },
      { name: "運用・改善", price: "30万円", unit: "/ 月〜", desc: "稼働後の品質モニタリング、モデル・プロンプトのチューニング、新ユースケース追加を継続支援。", features: ["月次の品質モニタリング", "モデル・プロンプト改善", "新ユースケース追加", "障害一次対応", "定例レポート"], featured: false },
    ],
    priceNote: "※ 価格は税抜。本番開発パックはスコープにより個別見積もり（600万〜3,000万円が目安）です。IT導入補助金などの活用可否もあわせてご案内します。",

    faqLabel: "Q&A",
    faqTitle: "よくある質問",
    faq: [
      { q: "ロボットは自社で購入する必要がありますか？", a: "必ずしも必要ありません。clearAIはロボットレンタル事業も行っているため、PoC期間中はレンタル機体で検証し、本番稼働が決まってから購入いただく進め方が可能です。購入・レンタルどちらの前提でも設計できます。" },
      { q: "既存の基幹システムと連携できますか？", a: "できます。API・データベース・ファイル連携など、既存システム側の仕様に合わせて接続します。連携先が3システム以上になる場合は、設計フェーズを厚めに取って進めます。" },
      { q: "PoCで期待した結果が出なかった場合はどうなりますか？", a: "PoCの段階で成功率や所要時間を数値で測定し、本番化の可否をレポートとしてお渡しします。数値が基準に届かない場合は、本番開発に進まないという判断も含めて率直にお伝えします。無理に本番開発をお勧めすることはありません。" },
      { q: "開発したシステムの権利はどちらに帰属しますか？", a: "納品するソースコード・リポジトリ・IP・改変権はすべてお客様に帰属します。ベンダーロックインを避け、社内または他社でも継続開発できる状態でお渡しします。" },
      { q: "補助金は使えますか？", a: "IT導入補助金やものづくり補助金など、システム開発・設備投資が対象となる制度が該当する場合があります。対象制度の見極めから申請書類の準備までサポートしますので、ご相談時にお伝えください。" },
      { q: "どのくらいの期間で稼働しますか？", a: "PoCが約4〜6週間、本番実装が3〜6ヶ月が目安です。対象業務が単一で連携システムが少ない場合は、より短期間で稼働するケースもあります。" },
    ],

    ctaTitle: "現場のどこを自動化できるか、まず一緒に見つけませんか。",
    ctaDesc: "初回30分の無料相談では、現場条件をうかがったうえで、ロボット・AIで効果が出そうな領域を1つ具体的にお返しします。営業色の強い提案はいたしません。",
    ctaPrimary: "無料相談を申し込む",
    ctaSecondary: "ロボットレンタルを見る",
  },

  en: {
    breadcrumb: "Physical AI development",
    heroBadges: ["Robots × AI", "PoC from JPY 1.5M", "Source code is yours"],
    heroTitle: (<>Physical AI, built into<br className="hidden sm:inline" />a system that runs on your floor.</>),
    heroDesc: "We connect cameras, sensors, and robots with AI to automate the floor work itself — inspection, transport, reception, manufacturing. clearAI owns the whole build: concept, design, implementation, on-site proof, and operations.",
    heroPrimary: "Book a free consultation",
    heroSecondary: "See pricing",

    whatLabel: "Definition",
    whatTitle: "What physical AI means",
    whatDesc: "Where conventional generative AI stays on a screen, physical AI (also called embodied AI) is built to perceive, decide, and act in the real world.",
    whatBlocks: [
      { term: "Perceive", def: "Cameras, LiDAR, and sensors capture the state of your site, and AI reads gauge values, anomalies, and the position of people and objects." },
      { term: "Decide", def: "An LLM or control model decides what to do next from that data, your business rules, and historical records — handling vague instructions and exceptions that scripted automation cannot." },
      { term: "Act", def: "Instructions go to robots, arms, conveyors, or existing equipment and are carried out as real work, with the result fed back into perception so accuracy improves over time." },
      { term: "Retain", def: "Execution logs, decision rationale, and exception handling accumulate as an asset your company keeps — for audit, improvement, and the next thing you automate." },
    ],

    domainLabel: "Use Cases",
    domainTitle: "Where we work",
    domainDesc: "We design for robots wired into your existing workflows and core systems, not robots dropped in on their own — so they fit how your site actually operates.",
    domains: [
      {
        tag: "Inspection",
        title: "Automated equipment inspection and patrol",
        desc: "Quadrupeds and fixed cameras patrol factories, plants, and warehouses — reading gauges, detecting abnormal sound and heat, and recording anomalies automatically.",
        items: ["Autonomous route design", "Automatic gauge reading", "Anomaly alerts wired into your systems", "Unmanned checks at night and weekends"],
      },
      {
        tag: "Logistics",
        title: "In-plant transport and picking",
        desc: "Transport robots and collaborative arms connected to your inventory system, automating everything from dispatch through execution and record-keeping.",
        items: ["Inventory / WMS integration", "Vision-based item recognition", "Traffic-flow simulation", "Safety design for human-robot collaboration"],
      },
      {
        tag: "Reception",
        title: "Humanoid reception and guidance",
        desc: "Humanoids that guide and converse at receptions, commercial facilities, and trade shows — with conversational AI wired into your facility's own information.",
        items: ["Dialogue scenarios and guardrails", "Facility and booking system integration", "Multilingual support", "Short-term proof with rental units"],
      },
      {
        tag: "Manufacturing",
        title: "Visual inspection and process efficiency",
        desc: "Vision models for surface inspection and procedure-deviation detection, systematized together with inspection records and the improvement loop.",
        items: ["Inspection model build and evaluation", "Procedure deviation detection", "Automatic inspection records", "Edge inference for on-premise execution"],
      },
    ],

    scopeLabel: "Scope",
    scopeTitle: "What the engagement covers",
    scopeDesc: "From hardware selection to AI models, system integration, and on-site operating design — the boundaries between them are exactly what we take on.",
    scopes: [
      { num: "01", title: "Hardware and sensor selection", desc: "We select the right unit and sensor configuration for your use case, site conditions, and budget — with rental trials so you can confirm fit before buying." },
      { num: "02", title: "AI model build and evaluation", desc: "Vision, anomaly detection, LLM-based judgement — we build what the use case needs and improve it against real data with measured success rates." },
      { num: "03", title: "Control and integration software", desc: "Robot control, API integration with your core systems, WMS, and SaaS, plus the operator-facing app your floor staff will use." },
      { num: "04", title: "On-site proof (PoC)", desc: "We run it in a near-production environment and measure success rate, cycle time, and exception frequency so the go/no-go decision rests on numbers." },
      { num: "05", title: "Production build and operating design", desc: "Authentication, permissions, monitoring, logging, cost optimization, and incident runbooks — everything needed to keep it running." },
      { num: "06", title: "Handover to your team", desc: "Documentation and training so your own staff can operate, tune, and troubleshoot it. We don't leave you dependent on us." },
    ],

    processLabel: "Process",
    processTitle: "How the work runs",
    processDesc: "We never start with a production build. The standard path is to verify small, measure it, and let you decide on investment from the numbers.",
    process: [
      { num: "01", title: "Discovery and site review", en: "Discovery", desc: "We map the workflow and site conditions, then define what AI and robots should replace, the KPIs, and the expected return.", duration: "1–2 weeks" },
      { num: "02", title: "System design", en: "Design", desc: "Hardware configuration, sensors, AI models, integration targets, safety design, human-in-the-loop placement, and evaluation criteria.", duration: "1–2 weeks" },
      { num: "03", title: "PoC build and on-site validation", en: "PoC", desc: "We run a prototype in the real environment, often on rental units, measuring success across 20–50 cases and improving as we go.", duration: "3–6 weeks" },
      { num: "04", title: "Production build and integration", en: "Production", desc: "System integration, authentication and permissions, monitoring and logging, cost optimization, and runbooks before go-live.", duration: "3–6 months" },
      { num: "05", title: "Operations and improvement", en: "Operation", desc: "Ongoing quality monitoring, model and prompt tuning, and new use cases added after launch.", duration: "Monthly" },
    ],

    deliverLabel: "Deliverables",
    deliverTitle: "What you receive",
    deliverDesc: "Nothing stays a black box. Alongside a working system you get everything needed to run and change it in-house.",
    deliverables: [
      { title: "Complete source code", desc: "Implemented in TypeScript / Python, with the repository, IP, and right to modify belonging entirely to you." },
      { title: "Infrastructure as code", desc: "Terraform / Pulumi / Vercel / Cloud Run configurations, deployable into your own cloud account." },
      { title: "On-site operating procedures", desc: "Startup, shutdown, charging, troubleshooting, and safety checks, documented for the people actually on the floor." },
      { title: "Evaluation and monitoring dashboards", desc: "Success rate, uptime, anomaly counts, and cost — visible enough to drive your improvement decisions." },
      { title: "Model and prompt definitions", desc: "Models used, data handling, prompts, and tool definitions, delivered under version control." },
      { title: "Handover training", desc: "Sessions for your team on operation, tuning, and incident response — combinable with our AI training programs." },
    ],

    priceLabel: "Pricing",
    priceTitle: "Plans",
    priceDesc: "We recommend confirming site fit with the PoC pack first, then moving to a production build once the results are in.",
    plans: [
      { name: "PoC pack", price: "JPY 1.5M", unit: "/ fixed", desc: "Discovery through design, PoC build, and on-site validation — built for the go/no-go decision.", features: ["Site review and requirements", "Hardware and sensor selection", "Prototype implementation", "Measured success rate in the field", "Go/no-go report"], featured: false },
      { name: "Production build", price: "From JPY 6M", unit: "/ project", desc: "Production implementation, system integration, and operating foundations, live in 3–6 months.", features: ["Production design and implementation", "Core system integration", "Auth, permissions, monitoring, logging", "On-site operating design", "Runbooks and procedures", "Handover training"], featured: true, badge: "Popular" },
      { name: "Operations", price: "JPY 300K", unit: "/ month+", desc: "Ongoing quality monitoring, model and prompt tuning, and new use cases after go-live.", features: ["Monthly quality monitoring", "Model and prompt improvement", "New use cases", "First-line incident response", "Regular reporting"], featured: false },
    ],
    priceNote: "* Prices exclude tax. Production builds are quoted per scope (typically JPY 6M–30M). We'll also tell you which Japanese subsidies may apply.",

    faqLabel: "Q&A",
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "Do we have to buy the robot ourselves?", a: "Not necessarily. Because clearAI also runs a robot rental business, you can validate on rental units during the PoC and buy only once production is confirmed. We can design for either model." },
      { q: "Can it integrate with our existing core systems?", a: "Yes. We connect via API, database, or file exchange, matching whatever your existing systems expose. Where three or more systems are involved, we allocate more time to the design phase." },
      { q: "What if the PoC doesn't produce the results we hoped for?", a: "The PoC measures success rate and cycle time as numbers, and we deliver a go/no-go report. If the numbers fall short, we say so plainly — including recommending that you don't proceed to a production build." },
      { q: "Who owns the system you build?", a: "The source code, repository, IP, and right to modify all belong to you. We deliver it in a state your team or another vendor can keep developing, with no lock-in." },
      { q: "Can we use government subsidies?", a: "Programs such as Japan's IT Introduction Subsidy and Monozukuri Subsidy may cover system development and capital investment. We support everything from eligibility assessment to the paperwork — just raise it when we talk." },
      { q: "How long until it's running?", a: "Roughly 4–6 weeks for the PoC and 3–6 months for production implementation. A single workflow with few integrations can go live considerably faster." },
    ],

    ctaTitle: "Let's find what on your floor can actually be automated.",
    ctaDesc: "In a free 30-minute consultation we listen to your site conditions and come back with one concrete area where robots and AI would pay off. No hard sell.",
    ctaPrimary: "Book a free consultation",
    ctaSecondary: "See robot rental",
  },
};

export default function PhysicalAiPage() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="border-b border-neutral-900 bg-white pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="mx-auto max-w-[1800px] px-6 lg:px-8">
          {/* breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-400">
              <li><Link href="/" className="transition-colors hover:text-neutral-900">Home</Link></li>
              <li aria-hidden>/</li>
              <li className="text-neutral-900">{t.breadcrumb}</li>
            </ol>
          </nav>

          <Reveal>
            <div className="mb-6 flex flex-wrap items-center gap-2 font-mono">
              {t.heroBadges.map((b) => (
                <span key={b} className="border border-neutral-900 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-neutral-900">{b}</span>
              ))}
            </div>
            <h1 className="max-w-4xl text-[1.75rem] font-bold leading-[1.14] tracking-tight text-balance text-neutral-900 sm:text-4xl lg:text-5xl">
              {t.heroTitle}
            </h1>
            <p className="mt-7 max-w-2xl text-[15px] leading-relaxed text-pretty text-neutral-600 md:text-base">
              {t.heroDesc}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
              <Link href="/contact?service=physical-ai" className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 border border-neutral-900 bg-neutral-900 px-8 py-3.5 font-mono text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors duration-300 hover:bg-neutral-800 sm:w-auto">
                {t.heroPrimary}<span aria-hidden>→</span>
              </Link>
              <Link href="#pricing" className="inline-flex min-h-[44px] items-center justify-center gap-1.5 py-2 text-sm font-semibold text-neutral-700 transition-colors hover:text-neutral-900 sm:justify-start">
                {t.heroSecondary}<span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ §01 DEFINITION ═══ */}
      <section className="bg-white py-8 md:py-12 lg:py-16">
        <div className="mx-auto max-w-[1800px] px-6 lg:px-8">
          <SectionHead index="01" kicker={t.whatLabel} title={t.whatTitle} desc={t.whatDesc} />
          <dl className="grid grid-cols-1 border-t border-neutral-900 md:grid-cols-2 lg:grid-cols-4">
            {t.whatBlocks.map((b, i) => (
              <Reveal key={b.term} delay={i * 70}>
                <div className="h-full border-b border-r border-neutral-300 px-6 py-7">
                  <dt className="mb-3 flex items-baseline gap-3">
                    <span className="font-mono text-[11px] font-bold tabular-nums text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-lg font-bold tracking-tight text-neutral-900">{b.term}</span>
                  </dt>
                  <dd className="text-[13px] leading-relaxed text-pretty text-neutral-600">{b.def}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* ═══ §02 USE CASES ═══ */}
      <section className="border-y border-neutral-900 bg-neutral-50 py-8 md:py-12 lg:py-16">
        <div className="mx-auto max-w-[1800px] px-6 lg:px-8">
          <SectionHead index="02" kicker={t.domainLabel} title={t.domainTitle} desc={t.domainDesc} />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {t.domains.map((d, i) => (
              <Reveal key={d.title} delay={i * 80} className="h-full">
                <article className="flex h-full flex-col border border-neutral-900 bg-white p-8 lg:p-10">
                  <div className="mb-4 flex items-center justify-between border-b border-neutral-200 pb-4">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-900">{d.tag}</span>
                    <span className="font-mono text-[10px] tabular-nums text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mb-4 text-lg font-bold tracking-tight text-balance text-neutral-900 lg:text-xl">{d.title}</h3>
                  <p className="mb-6 text-sm leading-relaxed text-pretty text-neutral-600">{d.desc}</p>
                  <ul className="mt-auto space-y-2 border-t border-neutral-200 pt-5">
                    {d.items.map((it) => (
                      <li key={it} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-neutral-700">
                        <span aria-hidden className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 bg-neutral-900" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ §03 SCOPE ═══ */}
      <section className="bg-white py-8 md:py-12 lg:py-16">
        <div className="mx-auto max-w-[1800px] px-6 lg:px-8">
          <SectionHead index="03" kicker={t.scopeLabel} title={t.scopeTitle} desc={t.scopeDesc} />
          <div className="grid grid-cols-1 border-t border-neutral-900 md:grid-cols-2 lg:grid-cols-3">
            {t.scopes.map((s, i) => (
              <Reveal key={s.num} delay={(i % 3) * 60}>
                <div className="h-full border-b border-r border-neutral-300 px-6 py-7">
                  <div className="mb-3 flex items-baseline gap-3">
                    <span className="font-mono text-xs font-bold tabular-nums text-neutral-400">{s.num}</span>
                    <h3 className="text-base font-bold tracking-tight text-neutral-900">{s.title}</h3>
                  </div>
                  <p className="text-[13px] leading-relaxed text-pretty text-neutral-600">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ §04 PROCESS ═══ */}
      <section className="border-y border-neutral-900 bg-neutral-50 py-8 md:py-12 lg:py-16">
        <div className="mx-auto max-w-[1800px] px-6 lg:px-8">
          <SectionHead index="04" kicker={t.processLabel} title={t.processTitle} desc={t.processDesc} />
          <div className="hidden grid-cols-12 gap-6 border-b border-neutral-900 pb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 lg:grid">
            <div className="col-span-1">No.</div>
            <div className="col-span-3">Phase</div>
            <div className="col-span-6">Detail</div>
            <div className="col-span-2">Duration</div>
          </div>
          {t.process.map((p, i) => (
            <Reveal key={p.num} delay={i * 60}>
              <div className="grid grid-cols-1 gap-2 border-b border-neutral-300 py-6 lg:grid-cols-12 lg:gap-6 lg:py-7">
                <div className="lg:col-span-1"><span className="font-mono text-lg font-bold tabular-nums text-neutral-900">{p.num}</span></div>
                <div className="lg:col-span-3">
                  <h3 className="text-base font-bold tracking-tight text-neutral-900">{p.title}</h3>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-400">{p.en}</p>
                </div>
                <div className="lg:col-span-6"><p className="text-[15px] leading-relaxed text-pretty text-neutral-600">{p.desc}</p></div>
                <div className="lg:col-span-2"><span className="font-mono text-xs text-neutral-500">{p.duration}</span></div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══ §05 DELIVERABLES ═══ */}
      <section className="bg-white py-8 md:py-12 lg:py-16">
        <div className="mx-auto max-w-[1800px] px-6 lg:px-8">
          <SectionHead index="05" kicker={t.deliverLabel} title={t.deliverTitle} desc={t.deliverDesc} />
          <div className="grid grid-cols-1 border-t border-neutral-900 md:grid-cols-2 lg:grid-cols-3">
            {t.deliverables.map((d, i) => (
              <Reveal key={d.title} delay={(i % 3) * 60}>
                <div className="h-full border-b border-r border-neutral-300 px-6 py-7">
                  <h3 className="mb-2.5 text-base font-bold tracking-tight text-neutral-900">{d.title}</h3>
                  <p className="text-[13px] leading-relaxed text-pretty text-neutral-600">{d.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ §06 PRICING ═══ */}
      <section id="pricing" className="scroll-mt-24 border-y border-neutral-900 bg-neutral-50 py-8 md:py-12 lg:py-16">
        <div className="mx-auto max-w-[1800px] px-6 lg:px-8">
          <SectionHead index="06" kicker={t.priceLabel} title={t.priceTitle} desc={t.priceDesc} />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {t.plans.map((p, i) => (
              <Reveal key={p.name} delay={i * 80} className="h-full">
                <article className={`relative flex h-full flex-col border border-neutral-900 p-8 lg:p-10 ${p.featured ? "bg-neutral-900 text-white" : "bg-white"}`}>
                  {p.badge && (
                    <span className={`absolute right-0 top-0 border-b border-l border-neutral-900 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] ${p.featured ? "bg-white text-neutral-900" : "bg-neutral-900 text-white"}`}>
                      {p.badge}
                    </span>
                  )}
                  <h3 className={`text-lg font-bold tracking-tight ${p.featured ? "text-white" : "text-neutral-900"}`}>{p.name}</h3>
                  <div className={`mt-5 flex items-baseline gap-2 border-b pb-5 ${p.featured ? "border-neutral-700" : "border-neutral-200"}`}>
                    <span className={`font-mono text-3xl font-bold tabular-nums tracking-tight ${p.featured ? "text-white" : "text-neutral-900"}`}>{p.price}</span>
                    <span className={`font-mono text-xs ${p.featured ? "text-neutral-400" : "text-neutral-500"}`}>{p.unit}</span>
                  </div>
                  <p className={`mt-5 text-sm leading-relaxed text-pretty ${p.featured ? "text-neutral-300" : "text-neutral-600"}`}>{p.desc}</p>
                  <ul className={`mt-6 mb-8 space-y-2.5 border-t pt-5 ${p.featured ? "border-neutral-700" : "border-neutral-200"}`}>
                    {p.features.map((f) => (
                      <li key={f} className={`flex items-start gap-2.5 text-[13px] leading-relaxed ${p.featured ? "text-neutral-300" : "text-neutral-700"}`}>
                        <span aria-hidden className={`mt-[7px] h-1.5 w-1.5 flex-shrink-0 ${p.featured ? "bg-white" : "bg-neutral-900"}`} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact?service=physical-ai"
                    className={`mt-auto inline-flex min-h-[48px] items-center justify-center gap-2 border px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.08em] transition-colors duration-300 ${
                      p.featured
                        ? "border-white bg-white text-neutral-900 hover:bg-neutral-200"
                        : "border-neutral-900 bg-white text-neutral-900 hover:bg-neutral-900 hover:text-white"
                    }`}
                  >
                    {t.heroPrimary}<span aria-hidden>→</span>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <p className="mt-6 text-xs leading-relaxed text-neutral-500">{t.priceNote}</p>
          </Reveal>
        </div>
      </section>

      {/* ═══ §07 Q&A ═══ */}
      <section className="bg-white py-8 md:py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <SectionHead index="07" kicker={t.faqLabel} title={t.faqTitle} />
          <div className="border-t border-neutral-900">
            {t.faq.map((item, i) => (
              <Reveal key={item.q} delay={i * 60}>
                <details className="group border-b border-neutral-300 py-4 md:py-5">
                  <summary className="flex cursor-pointer list-none items-start gap-4 text-base font-semibold text-neutral-900">
                    <span className="mt-0.5 font-mono text-xs tabular-nums text-neutral-400">Q{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="flex-1 text-base font-semibold">{item.q}</h3>
                    <span aria-hidden className="font-mono text-lg leading-none text-neutral-400 transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 pl-9 text-sm leading-relaxed text-pretty text-neutral-600">{item.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="border-t border-neutral-900 bg-neutral-900 py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <h2 className="text-xl font-bold leading-[1.2] tracking-tight text-balance text-white lg:text-2xl">{t.ctaTitle}</h2>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-pretty text-neutral-400">{t.ctaDesc}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
              <Link href="/contact?service=physical-ai" className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 border border-white bg-white px-8 py-3.5 font-mono text-sm font-bold uppercase tracking-[0.08em] text-neutral-900 transition-colors duration-300 hover:bg-neutral-200 sm:w-auto">
                {t.ctaPrimary}<span aria-hidden>→</span>
              </Link>
              <Link href="/robot-rental" className="inline-flex min-h-[44px] items-center justify-center gap-1.5 py-2 font-mono text-xs font-bold uppercase tracking-[0.08em] text-neutral-300 transition-colors hover:text-white sm:justify-start">
                {t.ctaSecondary}<span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

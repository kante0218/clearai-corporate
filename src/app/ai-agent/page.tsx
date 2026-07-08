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
  heroKicker: string;
  heroTitle: string;
  heroDesc: string;
  whyLabel: string;
  whyTitle: string;
  whyDesc: string;
  why: { num: string; title: string; desc: string }[];
  typesLabel: string;
  typesTitle: string;
  typesDesc: string;
  types: { tag: string; title: string; desc: string; examples: string[] }[];
  processLabel: string;
  processTitle: string;
  processDesc: string;
  process: { num: string; title: string; en: string; desc: string; duration: string }[];
  deliverablesLabel: string;
  deliverablesTitle: string;
  deliverablesDesc: string;
  deliverables: { title: string; desc: string }[];
  techLabel: string;
  techTitle: string;
  techDesc: string;
  tech: { category: string; items: string[] }[];
  pricingLabel: string;
  pricingTitle: string;
  pricingDesc: string;
  plans: { name: string; price: string; unit: string; desc: string; features: string[]; featured: boolean; href: string; cta: string; minTerm: string }[];
  pricingNote: string;
  faqLabel: string;
  faqTitle: string;
  faq: { q: string; a: string }[];
  ctaLabel: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaButton: string;
};

const COPY: Record<"ja" | "en", Copy> = {
  ja: {
    heroKicker: "AI Agent Development",
    heroTitle: "AIエージェント開発",
    heroDesc: "Claude / GPT / Geminiなど最新LLMを基盤に、要件定義からPoC・本番運用・継続改善まで一気通貫で伴走し、「実際に業務を任せられる」AIエージェントを構築します。",
    whyLabel: "Why Agent",
    whyTitle: "なぜ「AIエージェント」なのか。",
    whyDesc: "状況を判断し、ツールを使いこなし、複数ステップの業務を最後まで完遂する「働くAI」が、今の生成AIで実装可能になりました。",
    why: [
      { num: "01", title: "チャットボットの限界を超える", desc: "社内システム参照・データ更新・人間へのエスカレーションまで業務フロー全体を任せられる設計です。" },
      { num: "02", title: "RPA・既存自動化との違い", desc: "LLMの判断力で例外をハンドリングし、曖昧な指示・自然文の依頼にも対応できる柔軟性を持ちます。" },
      { num: "03", title: "人を採用するより速く・安く", desc: "1人月100万円超の業務の一部を月数万〜数十万円で継続実行し、スケールも即座に対応できます。" },
      { num: "04", title: "「使えるAI」だけを実装する", desc: "本番運用・効果測定・継続改善まで責任を持つ伴走体制で、「導入しただけ」のAIを作りません。" },
    ],
    typesLabel: "Agent Types",
    typesTitle: "提供するエージェントの種類",
    typesDesc: "業務領域ごとに専門化したエージェントテンプレートを、要件に応じてカスタマイズして提供します。",
    types: [
      { tag: "Customer Service", title: "カスタマーサポート エージェント", desc: "FAQ参照・社内DB照会・チケット起票・人手エスカレーション判断まで自律実行し、1次対応解決率70-90%を狙います。", examples: ["メール／チャット問い合わせ自動応答", "Zendesk / Intercom 連携", "回答品質モニタリングダッシュボード"] },
      { tag: "Sales / SDR", title: "営業・インサイドセールス エージェント", desc: "リード調査・パーソナライズメール生成・MA連携・商談前ブリーフ作成まで、SDR1名分の工数を1/3に圧縮します。", examples: ["企業情報の自動リサーチ", "コールド/フォローアップメール起案", "HubSpot / Salesforce 連携"] },
      { tag: "Coding / Engineer", title: "コーディング・エンジニア エージェント", desc: "Claude Code / GitHub Copilot を基盤に、社内コードベースを理解した上で実装・レビュー・テストまで自律実行。", examples: ["バグ修正の自律実装", "PR起票・コードレビュー", "リファクタリング・テスト追加"] },
      { tag: "Knowledge Worker", title: "ナレッジワーカー エージェント", desc: "社内ドキュメント・契約書・議事録・調査資料を横断検索し、回答・要約・提案資料の下書きまで作成します。", examples: ["Notion / Google Drive 横断検索", "契約書レビュー", "経営会議用ブリーフ自動生成"] },
      { tag: "Analyst", title: "データ分析 エージェント", desc: "BIツール／DBに接続し、自然文の質問に対してクエリ実行・可視化・示唆抽出まで自律実行。", examples: ["SQL 自動生成・実行", "GA4 / Looker Studio 連携", "週次レポート自動作成"] },
      { tag: "Custom", title: "業種特化・カスタムエージェント", desc: "不動産査定／旅館DMS／士業書類作成／医療事務など、業界知識を組み込んだ専用エージェントを設計します。", examples: ["業界DB / API との接続", "業務フロー全体の再設計", "Human-in-the-loop 設計"] },
    ],
    processLabel: "Process",
    processTitle: "開発プロセス",
    processDesc: "業務理解→設計→PoC→本番化→運用の5フェーズで、目安2〜4ヶ月で本番運用開始まで到達します。",
    process: [
      { num: "01", title: "業務理解 / 要件定義", en: "Discovery", desc: "対象業務のヒアリング・現状フロー可視化・AI化領域の切り分け・KPI設計から投資対効果の試算まで行います。", duration: "1〜2週間" },
      { num: "02", title: "エージェント設計", en: "Design", desc: "タスク分解、ツール定義（Function/API/DB）、メモリ設計、ガードレール、Human-in-the-loop 設計、評価軸の定義。", duration: "1〜2週間" },
      { num: "03", title: "PoC開発・検証", en: "PoC", desc: "実データ・本番に近い環境でプロトタイプを構築し、20-50ケースのテストで成功率を測定・改善を繰り返します。", duration: "3〜6週間" },
      { num: "04", title: "本番実装・統合", en: "Production", desc: "既存システム連携・認証/権限・監視/ログ・コスト最適化・Runbook整備を経て本番ローンチします。", duration: "3〜6週間" },
      { num: "05", title: "運用・継続改善", en: "Operation", desc: "週次/月次の品質モニタリング、プロンプト/ツールチューニング、新ユースケース追加、コスト最適化を継続。", duration: "月次継続" },
    ],
    deliverablesLabel: "Deliverables",
    deliverablesTitle: "納品物",
    deliverablesDesc: "「作って終わり」にしないため、運用継続に必要な資産をすべて納品します。",
    deliverables: [
      { title: "エージェント本体（ソースコード）", desc: "TypeScript / Python で実装し、リポジトリ・IP・改変権はすべて顧客に帰属します。" },
      { title: "インフラ構成（IaC）", desc: "Terraform / Pulumi / Vercel / Cloud Run 構成で、顧客クラウドへのデプロイにも対応します。" },
      { title: "評価・モニタリングダッシュボード", desc: "成功率・対応時間・コスト・ユーザー満足度をLangSmith / Langfuse等で可視化します。" },
      { title: "運用Runbook", desc: "障害対応、プロンプト更新手順、コストアラート対応、エスカレーションフローを文書化。" },
      { title: "プロンプト/ツール定義集", desc: "全プロンプトとTool定義をバージョン管理し、テンプレ化して横展開できる形で納品します。" },
      { title: "教育コンテンツ", desc: "担当者向けの操作説明・チューニング研修を動画＋ドキュメントで提供します。" },
    ],
    techLabel: "Tech Stack",
    techTitle: "使用技術",
    techDesc: "案件のセキュリティ・スキル・コスト要件に応じて最適な構成を選定し、特定ベンダーへの縛りはありません。",
    tech: [
      { category: "LLM / Foundation Model", items: ["Anthropic Claude（Opus / Sonnet / Haiku）", "OpenAI GPT-5 / o-series", "Google Gemini", "オープンソースモデル（Llama / Qwen / DeepSeek）"] },
      { category: "Orchestration", items: ["LangGraph", "Mastra", "CrewAI", "Claude Agent SDK", "OpenAI Agents SDK", "自社フレームワーク"] },
      { category: "Memory / Vector", items: ["Pinecone", "Weaviate", "Postgres + pgvector", "Redis", "顧客既存DBへの組み込み"] },
      { category: "Integration", items: ["Slack / Teams / LINE", "Salesforce / HubSpot / Zendesk", "Google Workspace / Microsoft 365", "顧客独自API"] },
      { category: "Observability", items: ["LangSmith", "Langfuse", "OpenTelemetry", "Datadog / New Relic"] },
      { category: "Deploy", items: ["Vercel / Cloudflare Workers", "AWS（Lambda / ECS / Bedrock）", "GCP（Cloud Run / Vertex AI）", "顧客オンプレ環境"] },
    ],
    pricingLabel: "Pricing",
    pricingTitle: "料金プラン",
    pricingDesc: "PoC一括＋月次運用支援を基本とし、成果連動型（解決チケット課金など）の設計もご相談可能です。",
    plans: [
      {
        name: "PoCパック",
        price: "150万円",
        unit: "/ 一括",
        desc: "業務理解〜エージェント設計〜PoC構築・検証まで。本番化前の意思決定に最適。",
        features: ["業務ヒアリング・現状可視化", "エージェント設計書納品", "プロトタイプ実装（最大3ユースケース）", "20-50ケース評価レポート", "本番化判断のための投資対効果試算"],
        featured: false,
        href: "https://buy.stripe.com/aFa7sE3xqdaw2Yq75id7q07",
        cta: "申し込む",
        minTerm: "",
      },
      {
        name: "本番開発パック",
        price: "600万円〜",
        unit: "/ 一括",
        desc: "PoCを踏まえた本番実装・既存システム統合・運用基盤構築まで。3〜4ヶ月で本番リリース。",
        features: ["既存システム / API 連携実装", "認証・権限・監視・ログ整備", "Runbook・教育コンテンツ作成", "本番リリース立ち会い", "リリース後1ヶ月のハイパーケア"],
        featured: true,
        href: "/contact?service=ai-agent",
        cta: "相談する",
        minTerm: "",
      },
      {
        name: "運用支援",
        price: "30万円",
        unit: "/ 月",
        desc: "本番稼働後の品質モニタリング、プロンプト/ツールチューニング、新ユースケース追加を継続支援。",
        features: ["週次品質モニタリング", "プロンプト・ツール継続改善", "LLMコスト最適化", "新ユースケース追加（月1件目安）", "Slack/メール無制限相談"],
        featured: false,
        href: "https://buy.stripe.com/00w5kw8RKb2o6aCblyd7q08",
        cta: "申し込む",
        minTerm: "最低3ヶ月契約から",
      },
    ],
    pricingNote: "価格は税抜。本番開発パックはスコープにより個別見積もり（600万〜3,000万円目安）、成果連動型の設計もご相談可能です。",
    faqLabel: "FAQ",
    faqTitle: "よくあるご質問",
    faq: [
      { q: "「AIエージェント」と「チャットボット」「RPA」の違いは？", a: "AIエージェントはLLMの判断力を中核に複数のツールを組み合わせて「業務を完遂」する点が、Q&Aに応答するチャットボットや決まった操作を自動化するRPAと根本的に異なります。" },
      { q: "PoCで止まらず本番運用まで持っていけるのですか？", a: "PoC→本番化の落とし穴（コスト・レイテンシ・ガードレール・Runbook・効果測定）を最初から織り込み、ハイパーケア期間（リリース後1ヶ月）を本番開発パックに標準で含めています。" },
      { q: "コードや知財（IP）の帰属は？", a: "ソースコード・プロンプト・Tool定義・ドキュメント類はすべて顧客に帰属し、ベンダーロックインのない設計で納品します。" },
      { q: "セキュリティ・データ保護はどうしていますか？", a: "顧客VPC/オンプレへのデプロイにも対応し、LLM学習除外・PII/秘匿情報マスキング・ログ暗号化・アクセス制御を標準実装します。" },
      { q: "どんなLLMを使いますか？特定のベンダーに縛られませんか？", a: "Claude・GPT・Gemini・オープンソースから案件のセキュリティ・性能・コスト要件で最適なものを選定し、マルチLLM構成も可能です。" },
      { q: "PoCに必要な期間と費用は？", a: "PoCパックは150万円・約4〜6週間が目安で（規模により変動）、最初の無料ヒアリングで概算をお伝えします。" },
      { q: "成果連動型の契約はできますか？", a: "対応可能で、「解決チケット1件あたり」「商談獲得1件あたり」など、最初に成功定義と計測手段を合意した上で設計します。" },
    ],
    ctaLabel: "Contact",
    ctaTitle: "業務を任せられるAIを、いま作りませんか。",
    ctaDesc: "「この業務を自動化したい」「PoCをやってみたい」など現状の課題を30分でお伺いし、投資対効果の概算もその場でお伝えします。",
    ctaButton: "無料で相談する",
  },
  en: {
    heroKicker: "AI Agent Development",
    heroTitle: "AI Agent Development",
    heroDesc: "Built on the latest LLMs (Claude, GPT, Gemini), we take you from requirements to PoC, production, and continuous improvement — delivering a partner that actually gets work done, not just a chatbot.",
    whyLabel: "Why Agent",
    whyTitle: "Why AI agents?",
    whyDesc: "The current generation of LLMs makes it possible to deploy AI that judges context, uses tools, and completes multi-step work end-to-end — far beyond chatbots or automation scripts.",
    why: [
      { num: "01", title: "Beyond chatbots", desc: "Goes beyond Q&A to query internal systems, update data, and escalate to humans — architected to own an entire workflow." },
      { num: "02", title: "Beyond RPA", desc: "Handles exceptions that scripted scenarios can't, adapting to vague and natural-language requests using LLM judgment." },
      { num: "03", title: "Faster and cheaper than hiring", desc: "Replaces parts of >¥1M/month white-collar work with agent operations costing a fraction, and scales instantly." },
      { num: "04", title: "Only ship what works", desc: "Our engagement model takes responsibility through production, measurement, and continuous improvement — we don't stop at PoC." },
    ],
    typesLabel: "Agent Types",
    typesTitle: "Types of agents we build",
    typesDesc: "We maintain specialized templates per business domain, customized to your requirements.",
    types: [
      { tag: "Customer Service", title: "Customer Support Agent", desc: "Autonomously references FAQs/internal DBs, opens tickets, and decides when to escalate, targeting 70-90% first-line resolution.", examples: ["Email/chat auto-response", "Zendesk/Intercom integration", "Quality monitoring dashboard"] },
      { tag: "Sales / SDR", title: "Sales / Inside Sales Agent", desc: "Handles research, personalized outreach, MA integration, and pre-call briefs, compressing one SDR's workload by 3x.", examples: ["Automated company research", "Cold/follow-up email drafts", "HubSpot/Salesforce integration"] },
      { tag: "Coding / Engineer", title: "Coding / Engineering Agent", desc: "Built on Claude Code/Copilot, with awareness of your codebase. Autonomously implements, reviews, and tests.", examples: ["Autonomous bug fixes", "PR creation and review", "Refactoring and test additions"] },
      { tag: "Knowledge Worker", title: "Knowledge Worker Agent", desc: "Cross-searches internal docs, contracts, meeting notes, and research to draft answers, summaries, and proposals.", examples: ["Notion/Drive cross-search", "Contract review", "Auto-generated exec briefs"] },
      { tag: "Analyst", title: "Data Analyst Agent", desc: "Connects to BI tools/DBs, runs queries, visualizes, and extracts insights from natural-language questions.", examples: ["Auto SQL generation/execution", "GA4/Looker Studio integration", "Auto weekly reports"] },
      { tag: "Custom", title: "Vertical / Custom Agent", desc: "Industry-specific agents — real estate, hospitality DMS, legal docs, medical admin — built with vertical knowledge.", examples: ["Industry DB/API integration", "Workflow redesign", "Human-in-the-loop design"] },
    ],
    processLabel: "Process",
    processTitle: "Development process",
    processDesc: "Five phases — Discovery, Design, PoC, Production, Operation — typically 2-4 months to production.",
    process: [
      { num: "01", title: "Discovery", en: "Discovery", desc: "Hearing/observation, current-state mapping, identification of AI-feasible areas, KPI design, ROI estimation.", duration: "1-2 weeks" },
      { num: "02", title: "Agent Design", en: "Design", desc: "Task decomposition, tool definition (Function/API/DB), memory design, guardrails, human-in-the-loop, eval criteria.", duration: "1-2 weeks" },
      { num: "03", title: "PoC & Validation", en: "PoC", desc: "Build a prototype on real data in a production-like environment, measure success across 20-50 cases, and iterate.", duration: "3-6 weeks" },
      { num: "04", title: "Production & Integration", en: "Production", desc: "Integrate systems, set up auth/permissions, monitoring/logs, cost optimization, and runbook, then launch.", duration: "3-6 weeks" },
      { num: "05", title: "Operation & Improvement", en: "Operation", desc: "Weekly/monthly quality monitoring, prompt/tool tuning, new use-case rollout, cost optimization.", duration: "Monthly" },
    ],
    deliverablesLabel: "Deliverables",
    deliverablesTitle: "What we deliver",
    deliverablesDesc: "So you can actually keep running it after we hand off — we deliver every asset operations needs.",
    deliverables: [
      { title: "Agent source code", desc: "Implemented in TypeScript/Python; repo, IP, and modification rights belong to you." },
      { title: "Infrastructure (IaC)", desc: "Terraform/Pulumi/Vercel/Cloud Run configuration, with deployment to your own cloud available." },
      { title: "Evaluation & monitoring dashboard", desc: "Success rate, response time, cost, user satisfaction — built on LangSmith/Langfuse or custom." },
      { title: "Operations runbook", desc: "Incident response, prompt update procedures, cost-alert response, escalation flow — all documented." },
      { title: "Prompt/tool library", desc: "All prompts and tool definitions under version control, templated for reuse." },
      { title: "Training content", desc: "Operator manuals and tuning training, delivered as video + docs." },
    ],
    techLabel: "Tech Stack",
    techTitle: "Tech stack",
    techDesc: "We select the optimal stack per security, skills, and cost constraints — no vendor lock-in.",
    tech: [
      { category: "LLM / Foundation Model", items: ["Anthropic Claude (Opus / Sonnet / Haiku)", "OpenAI GPT-5 / o-series", "Google Gemini", "Open source (Llama / Qwen / DeepSeek)"] },
      { category: "Orchestration", items: ["LangGraph", "Mastra", "CrewAI", "Claude Agent SDK", "OpenAI Agents SDK", "Custom frameworks"] },
      { category: "Memory / Vector", items: ["Pinecone", "Weaviate", "Postgres + pgvector", "Redis", "Customer existing DB"] },
      { category: "Integration", items: ["Slack / Teams / LINE", "Salesforce / HubSpot / Zendesk", "Google Workspace / Microsoft 365", "Customer custom APIs"] },
      { category: "Observability", items: ["LangSmith", "Langfuse", "OpenTelemetry", "Datadog / New Relic"] },
      { category: "Deploy", items: ["Vercel / Cloudflare Workers", "AWS (Lambda / ECS / Bedrock)", "GCP (Cloud Run / Vertex AI)", "Customer on-prem"] },
    ],
    pricingLabel: "Pricing",
    pricingTitle: "Pricing plans",
    pricingDesc: "PoC fixed fee + monthly operations support is the base; outcome-based pricing (per resolved ticket, etc.) is available on request.",
    plans: [
      {
        name: "PoC Package",
        price: "JPY 1.5M",
        unit: "/ fixed",
        desc: "Discovery to design to PoC build and validation. Ideal for pre-production decisions.",
        features: ["Discovery/current-state mapping", "Design document delivery", "Prototype (up to 3 use cases)", "20-50 case eval report", "Production-readiness ROI estimate"],
        featured: false,
        href: "https://buy.stripe.com/aFa7sE3xqdaw2Yq75id7q07",
        cta: "Apply now",
        minTerm: "",
      },
      {
        name: "Production Build",
        price: "From JPY 6M",
        unit: "/ fixed",
        desc: "Production implementation building on PoC. Systems integration and ops infra. 3-4 months to launch.",
        features: ["System/API integration", "Auth, permissions, monitoring, logs", "Runbook and training content", "Launch support", "1-month hypercare post-launch"],
        featured: true,
        href: "/contact?service=ai-agent",
        cta: "Get a quote",
        minTerm: "",
      },
      {
        name: "Operations Support",
        price: "JPY 300K",
        unit: "/ month",
        desc: "Post-launch quality monitoring, prompt/tool tuning, and new use-case rollout.",
        features: ["Weekly quality monitoring", "Ongoing prompt/tool improvement", "LLM cost optimization", "New use cases (~1/month)", "Unlimited Slack/email consultation"],
        featured: false,
        href: "https://buy.stripe.com/00w5kw8RKb2o6aCblyd7q08",
        cta: "Apply now",
        minTerm: "3-month minimum",
      },
    ],
    pricingNote: "Prices exclude tax; Production Build varies by scope (JPY 6M–30M) and outcome-based contracts are also available.",
    faqLabel: "FAQ",
    faqTitle: "FAQ",
    faq: [
      { q: "How does an AI agent differ from chatbots and RPA?", a: "AI agents use LLM judgment to combine tools (APIs, DBs, internal systems) and complete entire workflows, handling exceptions and ambiguous instructions in ways scripted chatbots and RPA cannot." },
      { q: "Can you actually go beyond PoC to production?", a: "Yes — we design for PoC-to-production pitfalls (cost, latency, guardrails, runbooks, measurement) from day one and include a 1-month hypercare period in the Production Build package." },
      { q: "Who owns the code and IP?", a: "Source code, prompts, tool definitions, and docs all belong to you — delivered as your asset with no vendor lock-in." },
      { q: "How do you handle security and data protection?", a: "We deploy to your VPC or on-prem, assume no-training LLM API contracts, and standardly implement PII masking, encrypted log storage, and access control." },
      { q: "Which LLM do you use? Are we locked into a vendor?", a: "We choose from Claude, GPT, Gemini, or open source per security, performance, and cost — multi-LLM configurations are also possible." },
      { q: "How long and how much for a PoC?", a: "The PoC Package is JPY 1.5M over ~4-6 weeks (shorter for simple tasks, longer for multi-workflow), with an estimate shared at the free initial call." },
      { q: "Do you offer outcome-based contracts?", a: "Yes — for example, per resolved ticket or per booked meeting — with clear success definitions and measurement agreed upfront." },
    ],
    ctaLabel: "Contact",
    ctaTitle: "Let's build an AI you can actually delegate to.",
    ctaDesc: "Tell us about work you want to delegate, a PoC to run, or a vendor that disappointed you — 30 minutes, and we'll share a rough ROI estimate.",
    ctaButton: "Free consultation",
  },
};

export default function AiAgentPage() {
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
              <span>LLM</span>
              <span className="text-neutral-300">/</span>
              <span>Agent</span>
              <span className="text-neutral-300">/</span>
              <span>Production</span>
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

      {/* PRICING */}
      <section id="pricing" className="py-20 lg:py-28 bg-neutral-50 border-y border-neutral-900">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="01" kicker={t.pricingLabel} title={t.pricingTitle} desc={t.pricingDesc} />
          <PricingCarousel>
            {t.plans.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 100} className="flex">
                <div className={`flex w-full flex-col border border-neutral-900 p-7 lg:p-8 ${plan.featured ? "bg-neutral-900 text-white" : "bg-white"}`}>
                  <div className={`mb-6 flex items-center justify-between border-b pb-3 ${plan.featured ? "border-neutral-700" : "border-neutral-200"}`}>
                    <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.18em] ${plan.featured ? "text-white" : "text-neutral-900"}`}>
                      {plan.featured ? "Recommended" : `Plan.${String(i + 1).padStart(2, "0")}`}
                    </span>
                    <span className={`font-mono text-[10px] tabular-nums ${plan.featured ? "text-neutral-500" : "text-neutral-400"}`}>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className={`text-base font-bold tracking-tight ${plan.featured ? "text-white" : "text-neutral-900"}`}>{plan.name}</h3>
                  <div className="mt-2 mb-2 flex items-baseline gap-1.5">
                    <span className={`font-mono text-2xl font-bold tabular-nums ${plan.featured ? "text-white" : "text-neutral-900"}`}>{plan.price}</span>
                    <span className={`font-mono text-xs uppercase tracking-[0.1em] ${plan.featured ? "text-neutral-400" : "text-neutral-500"}`}>{plan.unit}</span>
                  </div>
                  <p className={`text-xs leading-relaxed text-pretty mb-5 ${plan.featured ? "text-neutral-300" : "text-neutral-600"}`}>{plan.desc}</p>
                  <ul className={`space-y-2 mb-5 flex-1 border-t pt-4 font-mono ${plan.featured ? "border-neutral-700" : "border-neutral-200"}`}>
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <span className={`flex-shrink-0 ${plan.featured ? "text-white" : "text-neutral-900"}`}>→</span>
                        <span className={`text-xs ${plan.featured ? "text-neutral-300" : "text-neutral-600"}`}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  {plan.minTerm && (
                    <p className={`mb-3 font-mono text-[10px] uppercase tracking-[0.15em] ${plan.featured ? "text-neutral-400" : "text-neutral-500"}`}>※{plan.minTerm}</p>
                  )}
                  <a
                    href={plan.href}
                    className={`group mt-auto inline-flex items-center justify-center gap-2 border px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.08em] transition-[color,background-color,border-color,scale] duration-300 active:scale-[0.96] ${
                      plan.featured
                        ? "border-white bg-white text-neutral-900 hover:bg-transparent hover:text-white"
                        : "border-neutral-900 bg-white text-neutral-900 hover:bg-neutral-900 hover:text-white"
                    }`}
                  >
                    {plan.cta}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </Reveal>
            ))}
          </PricingCarousel>
          <Reveal delay={300}>
            <p className="mt-8 font-mono text-[11px] leading-relaxed text-neutral-500">{t.pricingNote}</p>
          </Reveal>
        </div>
      </section>

      {/* WHY */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="02" kicker={t.whyLabel} title={t.whyTitle} desc={t.whyDesc} />
          <CardCarousel gridClass="md:grid-cols-2">
            {t.why.map((item, i) => (
              <Reveal key={item.num} delay={i * 80}>
                <div className="group h-full border border-neutral-900 bg-white p-8 lg:p-10 transition-colors duration-300 hover:bg-neutral-900">
                  <div className="flex items-baseline justify-between border-b border-neutral-200 pb-4 transition-colors duration-300 group-hover:border-neutral-700">
                    <span className="font-mono text-2xl font-bold tabular-nums text-neutral-900 transition-colors duration-300 group-hover:text-white">
                      {item.num}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">Why / {item.num}</span>
                  </div>
                  <h3 className="mt-6 text-xl lg:text-2xl font-bold tracking-tight text-balance text-neutral-900 transition-colors duration-300 group-hover:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-pretty text-neutral-600 transition-colors duration-300 group-hover:text-neutral-300">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* TYPES */}
      <section className="py-20 lg:py-28 bg-neutral-50 border-y border-neutral-900">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="03" kicker={t.typesLabel} title={t.typesTitle} desc={t.typesDesc} />
          <CardCarousel gridClass="md:grid-cols-2 lg:grid-cols-3">
            {t.types.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <div className="flex h-full flex-col border border-neutral-900 bg-white p-7 lg:p-8">
                  <div className="mb-6 flex items-center justify-between border-b border-neutral-200 pb-3">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-900">{item.tag}</span>
                    <span className="font-mono text-[10px] tabular-nums text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mb-3 text-lg lg:text-xl font-bold tracking-tight text-balance text-neutral-900">{item.title}</h3>
                  <p className="mb-6 text-sm leading-relaxed text-pretty text-neutral-600">{item.desc}</p>
                  <ul className="mt-auto space-y-2 font-mono">
                    {item.examples.map((ex) => (
                      <li key={ex} className="flex items-start gap-2 text-xs text-neutral-500">
                        <span className="flex-shrink-0 text-neutral-900">→</span>
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="04" kicker={t.processLabel} title={t.processTitle} desc={t.processDesc} />
          <div className="hidden lg:grid grid-cols-12 gap-6 border-b border-neutral-900 pb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
            <div className="col-span-1">No.</div>
            <div className="col-span-3">Phase</div>
            <div className="col-span-6">Detail</div>
            <div className="col-span-2 text-right">Duration</div>
          </div>
          {t.process.map((step, i) => (
            <Reveal key={step.num} delay={i * 60}>
              <div className="group grid grid-cols-1 gap-2 border-b border-neutral-200 py-7 transition-colors duration-300 hover:bg-neutral-50 lg:grid-cols-12 lg:gap-6">
                <div className="lg:col-span-1">
                  <span className="font-mono text-lg font-bold tabular-nums text-neutral-900">{step.num}</span>
                </div>
                <div className="lg:col-span-3">
                  <h3 className="text-lg font-bold tracking-tight text-balance text-neutral-900">{step.title}</h3>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">{step.en}</p>
                </div>
                <div className="lg:col-span-6">
                  <p className="text-[15px] leading-relaxed text-pretty text-neutral-600">{step.desc}</p>
                </div>
                <div className="lg:col-span-2 lg:text-right">
                  <span className="font-mono text-xs tabular-nums text-neutral-700">{step.duration}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="py-20 lg:py-28 bg-neutral-50 border-y border-neutral-900">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="05" kicker={t.deliverablesLabel} title={t.deliverablesTitle} desc={t.deliverablesDesc} />
          <CardCarousel gridClass="md:grid-cols-2 lg:grid-cols-3">
            {t.deliverables.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <div className="group h-full border border-neutral-900 bg-white p-7 lg:p-8 transition-colors duration-300 hover:bg-neutral-900">
                  <span className="mb-4 block font-mono text-xs font-bold tabular-nums text-neutral-400 transition-colors duration-300 group-hover:text-white">
                    OUT.{String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mb-3 text-base lg:text-lg font-bold tracking-tight text-balance text-neutral-900 transition-colors duration-300 group-hover:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-pretty text-neutral-600 transition-colors duration-300 group-hover:text-neutral-300">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* TECH */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="06" kicker={t.techLabel} title={t.techTitle} desc={t.techDesc} />
          <CardCarousel gridClass="md:grid-cols-2 lg:grid-cols-3">
            {t.tech.map((item, i) => (
              <Reveal key={item.category} delay={i * 70}>
                <div className="flex h-full flex-col border border-neutral-900 bg-white p-7 lg:p-8">
                  <h3 className="mb-5 flex items-baseline gap-2 border-b border-neutral-200 pb-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-neutral-900">
                    <span className="text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
                    {item.category}
                  </h3>
                  <ul className="flex flex-wrap gap-2 font-mono text-[13px] text-neutral-700">
                    {item.items.map((s) => (
                      <li key={s} className="border border-neutral-300 bg-white px-2.5 py-1 transition-colors duration-200 hover:border-neutral-900">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28 bg-neutral-50 border-t border-neutral-900">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="07" kicker={t.faqLabel} title={t.faqTitle} />
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
              <span className="font-bold text-white">§08</span>
              <span>{t.ctaLabel}</span>
            </div>
            <div className="mt-12 grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <h2 className="text-[22px] sm:text-3xl lg:text-4xl font-bold leading-[1.15] sm:leading-[1.05] tracking-[-0.02em] text-balance text-white">{t.ctaTitle}</h2>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-pretty text-neutral-400">{t.ctaDesc}</p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <a
                  href="/contact?service=ai-agent"
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

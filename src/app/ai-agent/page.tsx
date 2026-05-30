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
  return <p className="text-sm font-semibold text-blue-600 mb-4">{children}</p>;
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
    heroDesc: "業務を「自律的にこなす」AIエージェントを設計・開発・運用まで一気通貫で支援します。Claude / GPT / Geminiなど最新LLMを基盤に、要件定義からPoC、本番運用、継続改善までを伴走。チャットボットではなく、「実際に業務を任せられる相棒」を構築します。",
    whyLabel: "Why Agent",
    whyTitle: "なぜ「AIエージェント」なのか。",
    whyDesc: "単なるチャットボットでも、単発の自動化スクリプトでもない。状況を判断し、ツールを使いこなし、複数ステップの業務を最後まで完遂する「働くAI」が、今の生成AIで実装可能になりました。",
    why: [
      { num: "01", title: "チャットボットの限界を超える", desc: "問い合わせに答えるだけでなく、社内システムを参照し、データを更新し、人間にエスカレーションする。業務フロー全体を任せられる設計に。" },
      { num: "02", title: "RPA・既存自動化との違い", desc: "事前定義のシナリオでは対応できない例外を、LLMの判断力でハンドリング。曖昧な指示・自然文の依頼にも対応できる柔軟性。" },
      { num: "03", title: "人を採用するより速く・安く", desc: "1人月100万円超のホワイトカラー業務の一部を、月数万〜数十万円のエージェント運用コストで継続実行。スケールも一瞬。" },
      { num: "04", title: "「使えるAI」だけを実装する", desc: "PoC止まりにしない。本番運用・効果測定・継続改善まで責任を持つ伴走体制で、「導入しただけ」のAIを作りません。" },
    ],
    typesLabel: "Agent Types",
    typesTitle: "提供するエージェントの種類",
    typesDesc: "業務領域ごとに専門化したエージェントテンプレートを保有。要件に応じてカスタマイズして提供します。",
    types: [
      { tag: "Customer Service", title: "カスタマーサポート エージェント", desc: "FAQ参照・社内DB照会・チケット起票・人手エスカレーション判断までを自律実行。1次対応の解決率70-90%を狙います。", examples: ["メール／チャット問い合わせ自動応答", "Zendesk / Intercom 連携", "回答品質モニタリングダッシュボード"] },
      { tag: "Sales / SDR", title: "営業・インサイドセールス エージェント", desc: "リード調査・パーソナライズメール生成・MA連携・商談前ブリーフ作成まで。SDR1名分の工数を1/3に圧縮。", examples: ["企業情報の自動リサーチ", "コールド/フォローアップメール起案", "HubSpot / Salesforce 連携"] },
      { tag: "Coding / Engineer", title: "コーディング・エンジニア エージェント", desc: "Claude Code / GitHub Copilot を基盤に、社内コードベースを理解した上で実装・レビュー・テストまで自律実行。", examples: ["バグ修正の自律実装", "PR起票・コードレビュー", "リファクタリング・テスト追加"] },
      { tag: "Knowledge Worker", title: "ナレッジワーカー エージェント", desc: "社内ドキュメント・契約書・議事録・調査資料を横断検索し、回答・要約・提案資料の下書きまで作成します。", examples: ["Notion / Google Drive 横断検索", "契約書レビュー", "経営会議用ブリーフ自動生成"] },
      { tag: "Analyst", title: "データ分析 エージェント", desc: "BIツール／DBに接続し、自然文の質問に対してクエリ実行・可視化・示唆抽出まで自律実行。", examples: ["SQL 自動生成・実行", "GA4 / Looker Studio 連携", "週次レポート自動作成"] },
      { tag: "Custom", title: "業種特化・カスタムエージェント", desc: "不動産査定／旅館DMS／士業書類作成／医療事務など、業界知識を組み込んだ専用エージェントを設計します。", examples: ["業界DB / API との接続", "業務フロー全体の再設計", "Human-in-the-loop 設計"] },
    ],
    processLabel: "Process",
    processTitle: "開発プロセス",
    processDesc: "業務理解→設計→PoC→本番化→運用の5フェーズで、目安2〜4ヶ月で本番運用開始まで到達します。",
    process: [
      { num: "01", title: "業務理解 / 要件定義", en: "Discovery", desc: "対象業務のヒアリング・観察、現状フロー可視化、AI化可能領域の切り分け、KPI設計。投資対効果の試算まで。", duration: "1〜2週間" },
      { num: "02", title: "エージェント設計", en: "Design", desc: "タスク分解、ツール定義（Function/API/DB）、メモリ設計、ガードレール、Human-in-the-loop 設計、評価軸の定義。", duration: "1〜2週間" },
      { num: "03", title: "PoC開発・検証", en: "PoC", desc: "実データ・本番に近い環境でプロトタイプを構築。20-50ケースのテストで成功率を測定し、改善イテレーション。", duration: "3〜6週間" },
      { num: "04", title: "本番実装・統合", en: "Production", desc: "既存システム連携、認証/権限、監視/ログ、コスト最適化、運用Runbook整備。本番ローンチ。", duration: "3〜6週間" },
      { num: "05", title: "運用・継続改善", en: "Operation", desc: "週次/月次の品質モニタリング、プロンプト/ツールチューニング、新ユースケース追加、コスト最適化を継続。", duration: "月次継続" },
    ],
    deliverablesLabel: "Deliverables",
    deliverablesTitle: "納品物",
    deliverablesDesc: "「作って終わり」にしないため、運用継続に必要な資産をすべて納品します。",
    deliverables: [
      { title: "エージェント本体（ソースコード）", desc: "TypeScript / Python で実装。リポジトリは顧客所有。IP・改変権は顧客に帰属。" },
      { title: "インフラ構成（IaC）", desc: "Terraform / Pulumi / Vercel / Cloud Run の構成。顧客クラウドへのデプロイも対応。" },
      { title: "評価・モニタリングダッシュボード", desc: "成功率、対応時間、コスト、ユーザー満足度を可視化。LangSmith / Langfuse / 自社実装で構築。" },
      { title: "運用Runbook", desc: "障害対応、プロンプト更新手順、コストアラート対応、エスカレーションフローを文書化。" },
      { title: "プロンプト/ツール定義集", desc: "全プロンプトとTool定義をバージョン管理。テンプレ化して横展開可能に。" },
      { title: "教育コンテンツ", desc: "担当者向けの操作説明・チューニング研修。動画＋ドキュメントで提供。" },
    ],
    techLabel: "Tech Stack",
    techTitle: "使用技術",
    techDesc: "案件のセキュリティ要件・スキル要件・コスト制約に応じて最適な構成を選定。特定ベンダーへの縛りはありません。",
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
    pricingDesc: "PoC一括＋月次運用支援の組み合わせを基本とします。成果連動型（解決チケット課金など）の設計もご相談可能。",
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
        minTerm: "最低6ヶ月契約から",
      },
    ],
    pricingNote: "表示価格は税抜。本番開発パックは難易度・スコープにより個別見積もり（600万〜3,000万円目安）。成果連動型（解決1件・商談獲得1件・売上連動など）の契約設計もご相談可能です。",
    faqLabel: "FAQ",
    faqTitle: "よくあるご質問",
    faq: [
      { q: "「AIエージェント」と「チャットボット」「RPA」の違いは？", a: "チャットボットは事前定義されたQ&Aやシナリオに応答するもの、RPAは決まった画面操作を自動化するものです。AIエージェントはLLMの判断力を中核に、状況に応じて複数のツール（API・DB・既存システム）を組み合わせて「業務を完遂する」点が決定的に異なります。例外処理や曖昧な依頼への対応力で大きな差が出ます。" },
      { q: "PoCで止まらず本番運用まで持っていけるのですか？", a: "はい、PoC→本番化の落とし穴（コスト、レイテンシ、ガードレール、運用Runbook、効果測定）を最初から織り込んで設計します。実際に本番運用までやり切らないと意味がないので、ハイパーケア期間（リリース後1ヶ月）を本番開発パックに標準で含めています。" },
      { q: "コードや知財（IP）の帰属は？", a: "ソースコード・プロンプト・Tool定義・ドキュメント類はすべて顧客に帰属します。汎用部品は弊社の社内テンプレを活用しますが、顧客成果物として納品します。ベンダーロックインの懸念がないように設計します。" },
      { q: "セキュリティ・データ保護はどうしていますか？", a: "顧客VPC / オンプレへのデプロイにも対応します。LLM API利用時は学習除外オプション（Claude/GPT/Gemini ともにEnterprise契約で対応）を前提とし、PII/秘匿情報のマスキング、入出力ログの暗号化保管、アクセス制御を標準実装します。" },
      { q: "どんなLLMを使いますか？特定のベンダーに縛られませんか？", a: "Anthropic Claude、OpenAI GPT、Google Gemini、オープンソース（Llama/Qwen等）など、案件のセキュリティ要件・性能要件・コスト要件で最適なものを選びます。複数モデルを使い分けるマルチLLM構成も可能です。" },
      { q: "PoCに必要な期間と費用は？", a: "PoCパックは150万円・約4〜6週間が目安です。シンプルな業務（1ユースケース）であれば短縮可能、複数業務にまたがるエージェントは延長することもあります。最初の無料ヒアリングで概算をお伝えします。" },
      { q: "成果連動型の契約はできますか？", a: "対応可能です。例えばカスタマーサポートエージェントなら「解決チケット1件あたり¥XXX」、SDRエージェントなら「商談獲得1件あたり¥XXX」のような設計も可能です。明確な成功定義と計測手段を最初に合意する前提となります。" },
    ],
    ctaLabel: "Contact",
    ctaTitle: "業務を任せられるAIを、いま作りませんか。",
    ctaDesc: "「この業務を自動化したい」「PoCをやってみたい」「他社の納品物が物足りなかった」など、現状の課題を30分でお伺いします。投資対効果の概算までその場でお伝えします。",
    ctaButton: "無料で相談する",
  },
  en: {
    heroKicker: "AI Agent Development",
    heroTitle: "AI Agent Development",
    heroDesc: "End-to-end AI agent design, build, and operation. Based on the latest LLMs (Claude, GPT, Gemini), we take you from requirements to PoC, production, and continuous improvement. Not a chatbot — a partner that actually gets work done.",
    whyLabel: "Why Agent",
    whyTitle: "Why AI agents?",
    whyDesc: "Not just a chatbot, not just an automation script. The current generation of LLMs makes it possible to deploy AI that judges context, uses tools, and completes multi-step work end-to-end.",
    why: [
      { num: "01", title: "Beyond chatbots", desc: "Goes beyond Q&A to query internal systems, update data, and escalate to humans. Architected to take ownership of an entire workflow." },
      { num: "02", title: "Beyond RPA", desc: "Handles exceptions that scripted scenarios can't, using LLM judgment. Adapts to vague instructions and natural-language requests." },
      { num: "03", title: "Faster and cheaper than hiring", desc: "Replaces parts of >¥1M/month white-collar work with agent operations costing a fraction. Instant scaling, too." },
      { num: "04", title: "Only ship what works", desc: "We don't stop at PoC. Our engagement model takes responsibility through production, measurement, and continuous improvement." },
    ],
    typesLabel: "Agent Types",
    typesTitle: "Types of agents we build",
    typesDesc: "We maintain specialized templates per business domain, customized to your requirements.",
    types: [
      { tag: "Customer Service", title: "Customer Support Agent", desc: "Autonomously references FAQs/internal DBs, opens tickets, and decides when to escalate. Targets 70-90% first-line resolution.", examples: ["Email/chat auto-response", "Zendesk/Intercom integration", "Quality monitoring dashboard"] },
      { tag: "Sales / SDR", title: "Sales / Inside Sales Agent", desc: "Research, personalized outreach, MA integration, pre-call briefs. Compresses one SDR's workload by 3x.", examples: ["Automated company research", "Cold/follow-up email drafts", "HubSpot/Salesforce integration"] },
      { tag: "Coding / Engineer", title: "Coding / Engineering Agent", desc: "Built on Claude Code/Copilot, with awareness of your codebase. Autonomously implements, reviews, and tests.", examples: ["Autonomous bug fixes", "PR creation and review", "Refactoring and test additions"] },
      { tag: "Knowledge Worker", title: "Knowledge Worker Agent", desc: "Cross-searches internal docs, contracts, meeting notes, and research. Drafts answers, summaries, and proposals.", examples: ["Notion/Drive cross-search", "Contract review", "Auto-generated exec briefs"] },
      { tag: "Analyst", title: "Data Analyst Agent", desc: "Connects to BI tools/DBs, runs queries, visualizes, and extracts insights from natural-language questions.", examples: ["Auto SQL generation/execution", "GA4/Looker Studio integration", "Auto weekly reports"] },
      { tag: "Custom", title: "Vertical / Custom Agent", desc: "Industry-specific agents — real estate, hospitality DMS, legal docs, medical admin — built with vertical knowledge.", examples: ["Industry DB/API integration", "Workflow redesign", "Human-in-the-loop design"] },
    ],
    processLabel: "Process",
    processTitle: "Development process",
    processDesc: "Five phases — Discovery, Design, PoC, Production, Operation — typically 2-4 months to production.",
    process: [
      { num: "01", title: "Discovery", en: "Discovery", desc: "Hearing/observation, current-state mapping, identification of AI-feasible areas, KPI design, ROI estimation.", duration: "1-2 weeks" },
      { num: "02", title: "Agent Design", en: "Design", desc: "Task decomposition, tool definition (Function/API/DB), memory design, guardrails, human-in-the-loop, eval criteria.", duration: "1-2 weeks" },
      { num: "03", title: "PoC & Validation", en: "PoC", desc: "Prototype built on real data in a production-like environment. Measure success across 20-50 cases and iterate.", duration: "3-6 weeks" },
      { num: "04", title: "Production & Integration", en: "Production", desc: "System integration, auth/permissions, monitoring/logs, cost optimization, runbook. Launch.", duration: "3-6 weeks" },
      { num: "05", title: "Operation & Improvement", en: "Operation", desc: "Weekly/monthly quality monitoring, prompt/tool tuning, new use-case rollout, cost optimization.", duration: "Monthly" },
    ],
    deliverablesLabel: "Deliverables",
    deliverablesTitle: "What we deliver",
    deliverablesDesc: "So you can actually keep running it after we hand off — we deliver every asset operations needs.",
    deliverables: [
      { title: "Agent source code", desc: "Implemented in TypeScript/Python. Repo owned by the customer. IP and modification rights belong to you." },
      { title: "Infrastructure (IaC)", desc: "Terraform/Pulumi/Vercel/Cloud Run. We can also deploy to your cloud." },
      { title: "Evaluation & monitoring dashboard", desc: "Success rate, response time, cost, user satisfaction — built on LangSmith/Langfuse or custom." },
      { title: "Operations runbook", desc: "Incident response, prompt update procedures, cost-alert response, escalation flow — all documented." },
      { title: "Prompt/tool library", desc: "All prompts and tool definitions under version control, templated for reuse." },
      { title: "Training content", desc: "Operator manuals and tuning training, delivered as video + docs." },
    ],
    techLabel: "Tech Stack",
    techTitle: "Tech stack",
    techDesc: "We select the optimal stack per security, skills, and cost constraints. No vendor lock-in.",
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
    pricingDesc: "Base model: PoC fixed fee + monthly operations support. Outcome-based pricing (per resolved ticket etc.) is available on request.",
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
        minTerm: "6-month minimum",
      },
    ],
    pricingNote: "Prices exclude tax. Production Build varies by scope (typically JPY 6M to 30M). Outcome-based contracts (per resolved ticket, per booked meeting, revenue share, etc.) are also supported.",
    faqLabel: "FAQ",
    faqTitle: "FAQ",
    faq: [
      { q: "How does an AI agent differ from chatbots and RPA?", a: "Chatbots reply to scripted Q&A. RPA automates predefined screen operations. AI agents use LLM judgment at the core, combining multiple tools (APIs, DBs, internal systems) to complete entire workflows — handling exceptions and ambiguous instructions in ways the others cannot." },
      { q: "Can you actually go beyond PoC to production?", a: "Yes — we design for PoC-to-production pitfalls (cost, latency, guardrails, runbooks, measurement) from day one. We include a 1-month hypercare period post-launch in the Production Build package." },
      { q: "Who owns the code and IP?", a: "Source code, prompts, tool definitions, and docs all belong to the customer. We use our internal templates but deliver everything as your asset. No vendor lock-in." },
      { q: "How do you handle security and data protection?", a: "We can deploy to your VPC or on-prem. LLM API usage is assumed to be no-training (Enterprise contracts with Claude/GPT/Gemini). We standardly implement PII masking, encrypted log storage, and access control." },
      { q: "Which LLM do you use? Are we locked into a vendor?", a: "Anthropic Claude, OpenAI GPT, Google Gemini, or open source — chosen per security, performance, and cost. Multi-LLM configurations are also possible." },
      { q: "How long and how much for a PoC?", a: "The PoC Package is JPY 1.5M over ~4-6 weeks. Simple single-use-case work can be shorter; cross-workflow agents may be longer. We share an estimate at the free initial call." },
      { q: "Do you offer outcome-based contracts?", a: "Yes. For example, a customer support agent can be priced per resolved ticket; an SDR agent per booked meeting. We agree on clear success definitions and measurement upfront." },
    ],
    ctaLabel: "Contact",
    ctaTitle: "Let's build an AI you can actually delegate to.",
    ctaDesc: "Tell us about the work you want to delegate, a PoC you want to run, or a vendor that disappointed you. 30 minutes — we'll also share a rough ROI estimate.",
    ctaButton: "Free consultation",
  },
};

export default function AiAgentPage() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  return (
    <>
      {/* HERO */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <p className="text-sm font-semibold text-blue-600 mb-3">{t.heroKicker}</p>
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">{t.heroTitle}</h1>
          <p className="text-base text-gray-600 leading-relaxed max-w-3xl mb-8">{t.heroDesc}</p>
          <div className="flex items-center gap-4 flex-wrap">
            <a href="/contact?service=ai-agent" className="rounded-lg bg-blue-600 text-white font-semibold px-8 py-3.5 hover:bg-blue-700 transition-colors duration-300 inline-block">
              {t.ctaButton}
            </a>
            <a href="#pricing" className="text-sm text-gray-500 font-semibold hover:text-gray-900 transition-colors duration-300">{t.pricingLabel} →</a>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.whyLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-snug mb-6 max-w-3xl">{t.whyTitle}</h2>
            <p className="text-sm text-gray-500 mb-14 max-w-3xl leading-relaxed">{t.whyDesc}</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.why.map((item, i) => (
              <Reveal key={item.num} delay={i * 100}>
                <div className="rounded-2xl border border-gray-200 bg-white p-8 hover:shadow-lg transition-all duration-300 h-full">
                  <span className="text-sm font-bold text-blue-600">{item.num}</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-3 mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TYPES */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.typesLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.typesTitle}</h2>
            <p className="text-sm text-gray-500 mb-14 max-w-3xl leading-relaxed">{t.typesDesc}</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.types.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="h-full rounded-2xl border border-gray-200 bg-white p-6 lg:p-7 hover:shadow-lg transition-all duration-300 flex flex-col">
                  <span className="inline-block text-[10px] font-bold tracking-widest text-blue-600 uppercase mb-3 self-start rounded-full bg-blue-50 px-2.5 py-1">{item.tag}</span>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{item.desc}</p>
                  <ul className="space-y-2 mt-auto">
                    {item.examples.map((ex) => (
                      <li key={ex} className="flex items-start gap-2 text-xs text-gray-500">
                        <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0 bg-blue-400" />
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.processLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.processTitle}</h2>
            <p className="text-sm text-gray-500 mb-14 max-w-3xl leading-relaxed">{t.processDesc}</p>
          </Reveal>
          {t.process.map((step, i) => (
            <Reveal key={step.num} delay={i * 100}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-8 border-b border-gray-100 last:border-0">
                <div className="lg:col-span-1"><span className="text-sm font-bold text-blue-600">{step.num}</span></div>
                <div className="lg:col-span-3">
                  <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{step.en}</p>
                  <p className="inline-block text-xs font-semibold text-blue-600 bg-blue-50 rounded-full px-2.5 py-1 mt-2">{step.duration}</p>
                </div>
                <div className="lg:col-span-8"><p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.deliverablesLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.deliverablesTitle}</h2>
            <p className="text-sm text-gray-500 mb-14 max-w-3xl leading-relaxed">{t.deliverablesDesc}</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.deliverables.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="h-full rounded-2xl border border-gray-200 bg-white p-6 lg:p-7">
                  <h3 className="text-base font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TECH */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.techLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.techTitle}</h2>
            <p className="text-sm text-gray-500 mb-14 max-w-3xl leading-relaxed">{t.techDesc}</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.tech.map((item, i) => (
              <Reveal key={item.category} delay={i * 80}>
                <div className="h-full rounded-2xl border border-gray-200 bg-gray-50 p-6">
                  <h3 className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-4">{item.category}</h3>
                  <ul className="space-y-2">
                    {item.items.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-blue-500" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.pricingLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.pricingTitle}</h2>
            <p className="text-sm text-gray-500 mb-14 max-w-3xl leading-relaxed">{t.pricingDesc}</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {t.plans.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 100} className="flex">
                <div className={`rounded-2xl p-8 lg:p-10 transition-all duration-300 flex flex-col w-full ${plan.featured ? "bg-blue-600 text-white shadow-xl" : "bg-white border border-gray-200 hover:shadow-lg"}`}>
                  {plan.featured && <span className="inline-block rounded-full bg-white/20 text-white px-3 py-1 text-sm font-semibold mb-4 self-start">Recommended</span>}
                  <h3 className={`text-lg font-bold mb-2 ${plan.featured ? "text-white" : "text-gray-900"}`}>{plan.name}</h3>
                  <div className="mb-4 flex items-baseline gap-1">
                    <span className={`text-3xl font-bold ${plan.featured ? "text-white" : "text-gray-900"}`}>{plan.price}</span>
                    <span className={`text-sm ${plan.featured ? "text-white/80" : "text-gray-500"}`}>{plan.unit}</span>
                  </div>
                  <p className={`text-sm leading-relaxed mb-6 ${plan.featured ? "text-white/80" : "text-gray-600"}`}>{plan.desc}</p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${plan.featured ? "bg-white/40" : "bg-blue-500"}`} />
                        <span className={`text-sm ${plan.featured ? "text-white/90" : "text-gray-600"}`}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  {plan.minTerm && (
                    <p className={`text-xs text-center mb-3 ${plan.featured ? "text-white/80" : "text-gray-500"}`}>※{plan.minTerm}</p>
                  )}
                  <a href={plan.href} className={`block text-center text-sm font-semibold py-3 rounded-lg transition-all duration-300 mt-auto ${plan.featured ? "bg-white text-blue-600 hover:bg-blue-50" : "border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900"}`}>{plan.cta}</a>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300}>
            <p className="text-xs text-gray-500 text-center mt-8">{t.pricingNote}</p>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.faqLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-14">{t.faqTitle}</h2>
          </Reveal>
          <div className="max-w-3xl">
            {t.faq.map((item, i) => (
              <Reveal key={i} delay={i * 60}>
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
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Reveal>
            <Label>{t.ctaLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.ctaTitle}</h2>
            <p className="text-base text-gray-600 leading-relaxed mb-10">{t.ctaDesc}</p>
            <a href="/contact?service=ai-agent" className="rounded-lg bg-blue-600 text-white font-semibold px-10 py-4 hover:bg-blue-700 transition-colors duration-300 inline-block">{t.ctaButton}</a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import HeroParticlesBg from "@/components/HeroParticlesBg";
import CardCarousel from "@/components/CardCarousel";

/* Scroll-triggered reveal - simplified, up direction only */
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

type SvcColor = "indigo" | "amber" | "sky" | "blue" | "rose" | "cyan";

const colorMap: Record<SvcColor, { hoverBorder: string; code: string; cta: string; ctaHover: string }> = {
  indigo: { hoverBorder: "hover:border-neutral-300", code: "text-neutral-900", cta: "text-neutral-900", ctaHover: "group-hover:text-neutral-700" },
  amber:  { hoverBorder: "hover:border-neutral-300", code: "text-neutral-900", cta: "text-neutral-900", ctaHover: "group-hover:text-neutral-700" },
  sky:    { hoverBorder: "hover:border-neutral-300", code: "text-neutral-900", cta: "text-neutral-900", ctaHover: "group-hover:text-neutral-700" },
  blue:   { hoverBorder: "hover:border-neutral-300", code: "text-neutral-900", cta: "text-neutral-900", ctaHover: "group-hover:text-neutral-700" },
  rose:   { hoverBorder: "hover:border-neutral-300", code: "text-neutral-900", cta: "text-neutral-900", ctaHover: "group-hover:text-neutral-700" },
  cyan:   { hoverBorder: "hover:border-neutral-300", code: "text-neutral-900", cta: "text-neutral-900", ctaHover: "group-hover:text-neutral-700" },
};

type Svc = {
  code: string; title: string; desc: string; tags: string[];
  href: string; cta: string; color: SvcColor; badge?: string; claudeNote?: string;
};

type HomeCopy = {
  heroChips: string[];
  heroTitle: ReactNode;
  heroDesc: ReactNode;
  heroPrimary: string;
  heroSecondary: string;
  trustStats: { value: string; label: string }[];
  whyLabel: string; whyTitle: string; whyDesc: string;
  why: { title: string; desc: string }[];
  visionLabel: string; visionTitle: string; visionBody1: string; visionBody2: string;
  visionStats: { value: string; label: string }[];
  getStartedLabel: string; getStartedTitle: string; getStartedDesc: string;
  steps: { step: string; title: string; desc: string; points: string[]; cta: string; href: string; color: SvcColor }[];
  servicesLabel: string; servicesTitle: string; servicesDesc: string;
  primaryHeading: string; secondaryHeading: string;
  claudeBadge: string;
  primaryServices: Svc[]; secondaryServices: Svc[];
  approachLabel: string; approachTitle: string;
  approach: { num: string; title: string; desc: string }[];
  processLabel: string; processTitle: string; processDesc: string;
  process: { num: string; title: string; desc: string }[];
  teamLabel: string; teamTitle: ReactNode; teamDesc: string;
  teamCard1Label: string; teamCard1Title: string; teamCard1Desc: string; teamCard1Tags: string[];
  teamCard2Label: string; teamCard2Title: string; teamCard2Desc: string; teamCard2Tags: string[];
  techLabel: string; techTitle: string; techDesc: string;
  techGroups: { frontend: string; backend: string; aiml: string; database: string; cloud: string; ec: string; biz: string };
  techMoreTitle: string; techMoreDesc: string;
  faqLabel: string; faqTitle: string; faqDesc: string; faqCta: string;
  faq: { q: string; a: string }[];
  newsLabel: string; newsTitle: string; newsCta: string; clientLogosLabel: string;
  ctaLabel: string; ctaTitle: string; ctaDesc: ReactNode;
  ctaCards: { label: string; service: string }[];
  ctaCardAction: string; ctaOthers: string;
};

const COPY: Record<"ja" | "en", HomeCopy> = {
  ja: {
    heroChips: ["ロボットレンタル × AIコンサル", "戦略から現場実装まで", "中小企業特化"],
    heroTitle: (
      <>日本の中小企業に、<br /><span className="text-neutral-900">ロボット</span>と<span className="text-neutral-900">AI</span>を。</>
    ),
    heroDesc: (
      <>ヒューマノイド・ロボットのレンタルとAIコンサルティングを軸に、<br className="hidden md:inline" />
      経営の意思決定から現場で動くものまで、責任を持って伴走します。</>
    ),
    heroPrimary: "まずは無料で相談する",
    heroSecondary: "サービスを見る",
    trustStats: [
      { value: "最大75%", label: "研修費を助成金で削減" },
      { value: "無料", label: "30分のAI診断" },
      { value: "全国対応", label: "オンライン実施可" },
      { value: "2営業日", label: "初回返信" },
    ],
    whyLabel: "Why clearAI",
    whyTitle: "「提案で終わらない」を、約束します。",
    whyDesc: "コンサルの戦略視点と、現場で鍛えたエンジニアリング。両方を一社で担えるから、絵に描いた餅では終わりません。",
    why: [
      { title: "実装まで責任を持つ", desc: "戦略提案だけでは終わりません。稼働するシステム・運用定着まで、エンジニアが手を動かして仕上げます。" },
      { title: "中立な立場で伴走", desc: "特定ツールの売り込みはしません。Claude・ChatGPT・Geminiから、貴社の課題に本当に合うものを中立に選びます。" },
      { title: "補助金をフル活用", desc: "人材開発支援助成金・IT導入補助金などを活用し、研修・導入コストを最大75%削減。実質負担を抑えて始められます。" },
    ],
    visionLabel: "Our Vision",
    visionTitle: "AIを、日本の現場へ届ける。",
    visionBody1: "AIはまだ、多くの企業にとって遠い存在です。難しい、コストが高い、何から始めればいいかわからない——そんな声を何度も聞いてきました。",
    visionBody2: "私たちはそのギャップを埋めるために生まれました。最先端のAI技術をビジネスの言葉に翻訳し、エンジニアの力で現場の経営を支える。一社一社に寄り添い、確かな価値を届けていきます。",
    visionStats: [
      { value: "顧問・研修・Web", label: "3つの主力支援" },
      { value: "日本", label: "市場特化" },
      { value: "2026", label: "創業" },
    ],
    getStartedLabel: "Get Started",
    getStartedTitle: "まずは、小さく始められます。",
    getStartedDesc: "いきなりの大型契約は不要です。30分の無料診断と3分で読める資料から、貴社に合うかを見極めてください。",
    steps: [
      { step: "STEP 01", title: "無料AI診断（30分）", desc: "現状の業務・課題をヒアリングし、AI活用で効果の高そうな領域を1つ特定してお返しします。営業色の強い提案はしません。", points: ["Zoom / 対面いずれも可", "NDA締結のうえ、機密情報も扱えます", "その場で簡易レポートを口頭共有"], cta: "申し込む →", href: "/contact?service=advisor", color: "indigo" },
      { step: "STEP 02", title: "3分でわかる会社資料", desc: "事業内容・代表的な支援パターン・料金レンジ・補助金活用例をまとめた1枚PDFを送付します。社内稟議用にどうぞ。", points: ["PDF 1ページ", "料金レンジと進め方の目安入り", "登録不要・当日返信"], cta: "資料をもらう →", href: "/contact?service=advisor&doc=company-deck", color: "amber" },
      { step: "STEP 03", title: "1部署・1業務からのPoC", desc: "いきなり全社展開ではなく、最も効果が出そうな1部署・1業務に絞って小さく試行導入。効果が見えてから拡張します。", points: ["PoC期間 1〜2ヶ月", "成功基準を事前合意", "人材開発支援助成金の活用も可"], cta: "相談する →", href: "/contact?service=training", color: "sky" },
    ],
    servicesLabel: "Our Services",
    servicesTitle: "AIで、日本の未来をつくる。",
    servicesDesc: "AI顧問・社員研修・ウェブサイト制作を主力に、戦略から実装・運用まで確実に成果を届けます。",
    primaryHeading: "主力サービス",
    secondaryHeading: "その他の支援",
    claudeBadge: "Claude対応",
    primaryServices: [
      {
        code: "01", title: "AI顧問", color: "indigo",
        desc: "月2.5万円〜、外部AI顧問としてチャット相談・会議参加・内製化支援まで継続伴走。技術選定からPoC評価、IT全般の相談まで支援します。",
        tags: ["月額契約", "限定10社枠", "経営伴走", "内製化支援"],
        href: "/advisor", cta: "顧問契約のご相談",
        claudeNote: "Claude（Anthropic）の業務導入・運用定着まで、顧問として継続的に伴走します。",
      },
      {
        code: "02", title: "AI研修", color: "amber", badge: "補助金 最大75%OFF",
        desc: "チームのAIリテラシーを底上げ。導入研修から部門別ワークショップ、実務適用まで、社員が主役になる学習プログラムを設計・提供します。",
        tags: ["社員研修", "部門別ワークショップ", "プロンプト設計", "業務適用"],
        href: "/training", cta: "研修プログラムを見る",
        claudeNote: "Claudeを実務で使いこなす実践研修も。現場のユースケースに即したプロンプト・運用ルールまで指南します。",
      },
      {
        code: "03", title: "ウェブサイト作成", color: "sky",
        desc: "AI時代に成果が出るサイトを高速制作。Next.js + Vercel + Headless CMSで、表示速度・SEO・運用しやすさを最高水準に。",
        tags: ["Next.js", "Vercel", "SEO", "Headless CMS"],
        href: "/website", cta: "詳しく見る",
      },
    ],
    secondaryServices: [
      {
        code: "04", title: "コンサル・DX", color: "blue",
        desc: "大手コンサル出身者が監修。戦略策定から実装・運用まで、AI活用を一気通貫で支援します。",
        tags: ["AI戦略策定", "業務自動化", "生成AI活用"],
        href: "/ai-consulting", cta: "詳しく見る",
      },
      {
        code: "05", title: "AI広告運用", color: "rose",
        desc: "AI活用で広告運用を最適化・自動化。クリエイティブ生成から効果検証までAIで効率化し、ROAS改善を伴走します。",
        tags: ["広告運用", "クリエイティブ生成", "効果検証"],
        href: "/advertising", cta: "詳しく見る",
      },
      {
        code: "06", title: "ロボットレンタル", color: "cyan", badge: "Coming Soon",
        desc: "【準備中】Unitree・AGIBOT等の最先端ロボットを輸入し、レンタルで提供予定。高額な機体を購入前に、自社の現場で試せます。",
        tags: ["Unitree / AGIBOT", "輸入レンタル", "Coming Soon"],
        href: "/robot-rental", cta: "詳しく見る",
      },
    ],
    approachLabel: "Our Approach",
    approachTitle: "私たちが大切にする3つのこと",
    approach: [
      { num: "01", title: "正直であること", desc: "実現可能性を率直に見極め、効果の高い領域から着実に進めます。過度な期待を煽らず、成果が出る順に一歩ずつ。" },
      { num: "02", title: "伴走すること", desc: "導入して終わりではなく、運用が定着するまで。お客様のチームの一員として、ともに歩みます。" },
      { num: "03", title: "現場に落とし込むこと", desc: "技術選定から運用設計まで、現場で使える形に落とし込みます。専門知識がなくても扱える、具体的な提案を。" },
    ],
    processLabel: "How It Works",
    processTitle: "ご相談から導入までの流れ",
    processDesc: "初回相談は無料。無理な営業はせず、貴社のペースに合わせて進めます。",
    process: [
      { num: "01", title: "無料相談・AI診断", desc: "現状の課題をヒアリングし、AI活用で効果の高い領域を一緒に特定します（30分・オンライン可）。" },
      { num: "02", title: "ご提案・お見積り", desc: "顧問・研修・Web制作のうち、最適な進め方と料金・補助金活用をご提案します。" },
      { num: "03", title: "スモールスタート", desc: "1部署・1業務に絞ったPoCや単発研修から開始。効果を確認しながら無理なく拡張します。" },
      { num: "04", title: "継続伴走・定着", desc: "運用が現場に根付くまで継続的に伴走。成果と体制を定期的に見直します。" },
    ],
    teamLabel: "Our Team",
    teamTitle: (<>戦略から実装・運用まで、<br className="hidden sm:inline" />信頼できるプロフェッショナルが担います。</>),
    teamDesc: "経営コンサルの視座と、現場で鍛え上げたエンジニアリングの実装力。二つを掛け合わせ、提案だけで終わらせず、稼働するシステムと継続的な価値創出まで一貫して責任を持ちます。",
    teamCard1Label: "Strategy & DX",
    teamCard1Title: "業務改革・DX領域の監修",
    teamCard1Desc: "大手コンサルティングファーム出身のメンバーが、業務改革・DX推進の設計を監修。経営課題の構造化から全社展開のロードマップまで、上流の意思決定に耐える品質でご支援します。",
    teamCard1Tags: ["大手コンサルファーム出身", "業務改革", "DX戦略", "全社展開"],
    teamCard2Label: "Engineering",
    teamCard2Title: "開発・デプロイ・メンテナンス",
    teamCard2Desc: "AIコンサルティング経験が豊富なエンジニア、シリコンバレーでバックエンド開発に従事した技術者、高専から筑波大学に進学し応用情報技術者を持つ情報技術者などが、ウェブアプリケーションの開発・デプロイ・運用保守を担当。リリース後の信頼性の担保まで一貫して責任を持ちます。",
    teamCard2Tags: ["AIコンサル経験豊富", "シリコンバレー開発経験", "高専→筑波大学", "応用情報技術者"],
    techLabel: "Tech Stack",
    techTitle: "使用技術",
    techDesc: "中小企業でも安心して導入できるよう、実績・安定性・サポート体制が確立された技術のみを採用しています。",
    techGroups: { frontend: "フロントエンド", backend: "バックエンド", aiml: "AI・機械学習", database: "データベース", cloud: "クラウド・インフラ", ec: "EC・決済", biz: "業務連携・コラボレーション" },
    techMoreTitle: "上記以外の技術にも対応可能",
    techMoreDesc: "お客様の既存環境・社内標準・業界要件に合わせて、記載以外の言語・フレームワーク・クラウド・SaaS連携にも柔軟に対応いたします。まずはお気軽にご相談ください。",
    faqLabel: "FAQ",
    faqTitle: "よくあるご質問",
    faqDesc: "ご相談前によく寄せられる質問をまとめました。",
    faqCta: "すべての質問を見る →",
    faq: [
      { q: "AIの知識がなくても相談できますか？", a: "もちろんです。「何から始めればいいかわからない」という段階からのご相談を最も多くいただきます。専門用語を使わず、現場の言葉でご説明します。" },
      { q: "小さく始めることはできますか？", a: "できます。単発の研修や、1部署・1業務に絞ったPoCなど、いきなり大型契約をせずに効果を確かめてから拡張いただけます。" },
      { q: "補助金は使えますか？", a: "研修・AI導入では人材開発支援助成金やIT導入補助金などを活用でき、実質負担を最大75%削減できる場合があります。申請書類もサポートします。" },
    ],
    newsLabel: "News",
    newsTitle: "お知らせ",
    newsCta: "一覧を見る →",
    clientLogosLabel: "実績企業",
    ctaLabel: "Contact",
    ctaTitle: "まずは、お話ししませんか。",
    ctaDesc: (<>AIのことがわからなくても大丈夫です。<br />貴社の状況に合わせて、一緒に考えます。</>),
    ctaCards: [
      { label: "AI顧問", service: "advisor" },
      { label: "AI研修・教育", service: "training" },
      { label: "ウェブサイト作成", service: "website" },
      { label: "コンサル・DX", service: "consulting" },
      { label: "AI広告運用", service: "advertising" },
      { label: "ロボットレンタル", service: "robot-rental" },
    ],
    ctaCardAction: "お問い合わせ →",
    ctaOthers: "その他のお問い合わせはこちら →",
  },
  en: {
    heroChips: ["Robot Rental × AI Consulting", "Strategy to deployment", "Built for SMEs"],
    heroTitle: (
      <><span className="text-neutral-900">Robots</span> and <span className="text-neutral-900">AI</span><br />for Japanese SMEs.</>
    ),
    heroDesc: (
      <>Centered on humanoid robot rental and AI consulting —<br className="hidden md:inline" />
      we partner with you from management decisions to systems that actually run on the floor.</>
    ),
    heroPrimary: "Book a free consultation",
    heroSecondary: "View services",
    trustStats: [
      { value: "Up to 75%", label: "Training cost cut by subsidies" },
      { value: "Free", label: "30-min AI assessment" },
      { value: "Nationwide", label: "Online delivery available" },
      { value: "2 business days", label: "First reply" },
    ],
    whyLabel: "Why clearAI",
    whyTitle: "We promise to never stop at a proposal.",
    whyDesc: "A consultant's strategic view and field-forged engineering — both under one roof. So plans don't stay on paper.",
    why: [
      { title: "We own the implementation", desc: "We don't stop at strategy decks. Our engineers build working systems and see them through to real adoption." },
      { title: "Neutral, on your side", desc: "No pushing a specific tool. From Claude, ChatGPT, and Gemini, we neutrally pick what truly fits your problem." },
      { title: "Full use of subsidies", desc: "Using Japan's HR development and IT-introduction subsidies, we cut training and adoption costs by up to 75%, so you can start with minimal net cost." },
    ],
    visionLabel: "Our Vision",
    visionTitle: "Bringing AI to Japan's front lines.",
    visionBody1: "For most companies, AI still feels out of reach — too hard, too expensive, with no obvious place to start. We've heard that story many times.",
    visionBody2: "We exist to close that gap. We translate state-of-the-art AI into the language of business and use engineering to support real operations — staying close to each company and delivering tangible value.",
    visionStats: [
      { value: "Advisor · Training · Web", label: "Three core services" },
      { value: "Japan", label: "market focus" },
      { value: "2026", label: "founded" },
    ],
    getStartedLabel: "Get Started",
    getStartedTitle: "Start small. Scale when it works.",
    getStartedDesc: "No big contract required. Start with a free 30-minute assessment and a 3-minute company deck, and see whether we're a fit.",
    steps: [
      { step: "STEP 01", title: "Free AI assessment (30 min)", desc: "We listen to your current workflows and challenges, then identify one high-impact area for AI. No hard sell.", points: ["Zoom or in-person", "NDA on request — we can handle confidential data", "Verbal summary on the spot"], cta: "Book a session →", href: "/contact?service=advisor", color: "indigo" },
      { step: "STEP 02", title: "3-minute company deck", desc: "A one-page PDF summarizing our services, typical engagements, price ranges, and subsidy examples. Perfect for internal review.", points: ["1-page PDF", "Price ranges and engagement model included", "No signup, same-day delivery"], cta: "Get the deck →", href: "/contact?service=advisor&doc=company-deck", color: "amber" },
      { step: "STEP 03", title: "PoC from a single team", desc: "No company-wide rollout upfront. We focus on the one team or workflow where AI is most likely to pay off, then expand from proven results.", points: ["1–2 month PoC", "Success criteria agreed up front", "Government training subsidies available"], cta: "Get in touch →", href: "/contact?service=training", color: "sky" },
    ],
    servicesLabel: "Our Services",
    servicesTitle: "Building Japan's future with AI.",
    servicesDesc: "Centered on AI advisory, employee training, and website production — delivering real outcomes from strategy to implementation and operation.",
    primaryHeading: "Core services",
    secondaryHeading: "Other support",
    claudeBadge: "Claude-ready",
    primaryServices: [
      {
        code: "01", title: "AI Advisor", color: "indigo",
        desc: "From JPY 25K/month, as your outside AI advisor we provide chat support, meeting participation, and in-house enablement — from tool selection to PoC review and broader IT advice.",
        tags: ["Monthly contract", "Limited slots", "Management partner", "In-house enablement"],
        href: "/advisor", cta: "Discuss an advisory engagement",
        claudeNote: "We support adopting and embedding Claude (Anthropic) into your operations — as an ongoing advisor.",
      },
      {
        code: "02", title: "AI Training", color: "amber", badge: "Up to 75% subsidy",
        desc: "Raise your team's AI literacy. From onboarding workshops to department-specific sessions and hands-on application — learning programs where employees take the lead.",
        tags: ["Employee training", "Department workshops", "Prompt design", "Workflow application"],
        href: "/training", cta: "View training programs",
        claudeNote: "Hands-on Claude training too — prompts and operating rules tailored to your real use cases.",
      },
      {
        code: "03", title: "Website Production", color: "sky",
        desc: "Fast production of websites that perform in the AI era. Next.js + Vercel + Headless CMS for top-tier speed, SEO, and ease of operation.",
        tags: ["Next.js", "Vercel", "SEO", "Headless CMS"],
        href: "/website", cta: "Learn more",
      },
    ],
    secondaryServices: [
      {
        code: "04", title: "Consulting & DX", color: "blue",
        desc: "Overseen by ex-top-tier consultants. End-to-end support for AI adoption — from strategy through implementation and operation.",
        tags: ["AI strategy", "Workflow automation", "Generative AI"],
        href: "/ai-consulting", cta: "Learn more",
      },
      {
        code: "05", title: "AI Advertising", color: "rose",
        desc: "Optimize and automate ad operations with AI. From creative generation to measurement, we improve efficiency and partner on ROAS.",
        tags: ["Ad operations", "Creative generation", "Measurement"],
        href: "/advertising", cta: "Learn more",
      },
      {
        code: "06", title: "Robot Rental", color: "cyan", badge: "Coming Soon",
        desc: "Coming soon — importing and renting cutting-edge robots like Unitree and AGIBOT. Try the latest humanoids on-site before you commit.",
        tags: ["Unitree / AGIBOT", "Import rental", "Coming Soon"],
        href: "/robot-rental", cta: "Learn more",
      },
    ],
    approachLabel: "Our Approach",
    approachTitle: "Three things we stand for",
    approach: [
      { num: "01", title: "Honesty", desc: "We candidly judge what's feasible and move forward where impact is highest. No hype — progress in order of demonstrated results." },
      { num: "02", title: "Partnership", desc: "Delivery isn't the finish line. We stay engaged until adoption takes root — walking alongside your team." },
      { num: "03", title: "Grounded execution", desc: "From technology choice to operational design, we translate everything into a form your team can actually use." },
    ],
    processLabel: "How It Works",
    processTitle: "From first call to adoption",
    processDesc: "The first consultation is free. No hard sell — we move at your pace.",
    process: [
      { num: "01", title: "Free consult & AI assessment", desc: "We listen to your challenges and identify high-impact areas for AI together (30 min, online available)." },
      { num: "02", title: "Proposal & quote", desc: "We propose the best path among advisory, training, and web production — with pricing and subsidy options." },
      { num: "03", title: "Start small", desc: "Begin with a focused PoC or a one-off training. Expand at a comfortable pace as results show." },
      { num: "04", title: "Ongoing partnership", desc: "We stay engaged until it sticks on the ground, reviewing outcomes and structure regularly." },
    ],
    teamLabel: "Our Team",
    teamTitle: (<>From strategy to implementation and operation,<br className="hidden sm:inline" />trusted professionals see it through.</>),
    teamDesc: "Management-consulting perspective combined with field-forged engineering execution. We don't stop at proposals — we own working systems and continuous value all the way through.",
    teamCard1Label: "Strategy & DX",
    teamCard1Title: "Business transformation & DX oversight",
    teamCard1Desc: "Members with backgrounds at top-tier consulting firms oversee business-transformation and DX design — from structuring management issues to company-wide rollout roadmaps, at quality that stands up to upstream decision-making.",
    teamCard1Tags: ["Top-tier consulting background", "Business transformation", "DX strategy", "Company-wide rollout"],
    teamCard2Label: "Engineering",
    teamCard2Title: "Development, deployment & maintenance",
    teamCard2Desc: "Engineers with deep AI-consulting experience, backend developers who worked in Silicon Valley, and Applied Information Technology engineers (Kosen → University of Tsukuba) build, deploy, and maintain our web applications — owning reliability after release.",
    teamCard2Tags: ["AI consulting experience", "Silicon Valley development", "Kosen → U. of Tsukuba", "Applied Information Technology"],
    techLabel: "Tech Stack",
    techTitle: "Technologies we use",
    techDesc: "We only adopt technologies with proven track record, stability, and strong support — so SMEs can deploy with confidence.",
    techGroups: { frontend: "Frontend", backend: "Backend", aiml: "AI / ML", database: "Database", cloud: "Cloud & Infrastructure", ec: "EC / Commerce", biz: "Business Integrations" },
    techMoreTitle: "We also support technologies beyond this list",
    techMoreDesc: "We flexibly support languages, frameworks, clouds, and SaaS integrations beyond this list — tailored to your environment, internal standards, and industry requirements. Please reach out.",
    faqLabel: "FAQ",
    faqTitle: "Frequently asked questions",
    faqDesc: "A few questions we're often asked before getting started.",
    faqCta: "See all questions →",
    faq: [
      { q: "Can we consult even without AI knowledge?", a: "Absolutely. 'We don't know where to start' is the most common starting point we hear. We explain in plain language, not jargon." },
      { q: "Can we start small?", a: "Yes. With one-off training or a PoC scoped to a single team or workflow, you can verify results before any large commitment." },
      { q: "Can we use subsidies?", a: "For training and AI adoption, programs like the HR Development Subsidy and IT Introduction Subsidy can cut your net cost by up to 75%. We support the paperwork too." },
    ],
    newsLabel: "News",
    newsTitle: "News",
    newsCta: "View all →",
    clientLogosLabel: "Client Work",
    ctaLabel: "Contact",
    ctaTitle: "Let's start with a conversation.",
    ctaDesc: (<>No AI expertise needed.<br />We'll think it through with you, tailored to your situation.</>),
    ctaCards: [
      { label: "AI Advisor", service: "advisor" },
      { label: "AI Training & Education", service: "training" },
      { label: "Website Production", service: "website" },
      { label: "Consulting & DX", service: "consulting" },
      { label: "AI Advertising", service: "advertising" },
      { label: "Robot Rental", service: "robot-rental" },
    ],
    ctaCardAction: "Get in touch →",
    ctaOthers: "Other inquiries →",
  },
};

// 各ロゴはコンテンツにタイトクロップした透過PNG（実寸）。表示は固定高さ＋等間隔gapで、
// ロゴ同士の距離が全て均一になるようにする。
const CLIENT_LOGOS = [
  { name: "JASO", src: "/images/clients/jaso.png", width: 1007, height: 424 },
  { name: "MIG", src: "/images/clients/mig.png", width: 337, height: 175 },
  { name: "TicketMe", src: "/images/clients/ticketme.png", width: 1200, height: 426 },
  { name: "エンジニアのミカタ", src: "/images/clients/engineer-no-mikata.png", width: 991, height: 143 },
  { name: "Gugen", src: "/images/clients/gugen.png", width: 1111, height: 346 },
  { name: "DiaL Shift", src: "/images/clients/dial-shift.png", width: 1950, height: 342 },
  { name: "EDUCAI", src: "/images/clients/educai.png", width: 556, height: 540 },
  { name: "ノイアーエーテル", src: "/images/clients/noir-aether.png", width: 656, height: 686 },
  { name: "Wave Leaf", src: "/images/clients/wave-leaf.png", width: 1164, height: 324 },
  { name: "AT", src: "/images/clients/at.png", width: 1030, height: 838 },
  { name: "Crew Robotics", src: "/images/clients/crew-robotics.png", width: 1791, height: 261 },
  { name: "ICONIQ", src: "/images/clients/iconiq.png", width: 1436, height: 304 },
];

const TECH_GROUPS: { key: keyof typeof COPY["ja"]["techGroups"]; items: { name: string; icon: string; color?: string }[] }[] = [
  { key: "frontend", items: [
    { name: "Next.js", icon: "logos:nextjs-icon" },
    { name: "React", icon: "logos:react" },
    { name: "TypeScript", icon: "logos:typescript-icon" },
    { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
    { name: "Vite", icon: "logos:vitejs" },
  ]},
  { key: "backend" as const, items: [
    { name: "Python", icon: "logos:python" },
    { name: "Node.js", icon: "logos:nodejs-icon" },
    { name: "FastAPI", icon: "logos:fastapi-icon" },
    { name: "Go", icon: "simple-icons:go", color: "111827" },
    { name: "Rails", icon: "simple-icons:rubyonrails", color: "111827" },
  ]},
  { key: "aiml" as const, items: [
    { name: "Claude", icon: "simple-icons:anthropic", color: "111827" },
    { name: "OpenAI", icon: "simple-icons:openai", color: "000000" },
    { name: "Gemini", icon: "simple-icons:googlegemini", color: "111827" },
    { name: "PyTorch", icon: "logos:pytorch-icon" },
    { name: "LangChain", icon: "simple-icons:langchain", color: "1C3C3C" },
  ]},
  { key: "database" as const, items: [
    { name: "PostgreSQL", icon: "logos:postgresql" },
    { name: "MySQL", icon: "logos:mysql-icon" },
    { name: "Redis", icon: "logos:redis" },
    { name: "Supabase", icon: "logos:supabase-icon" },
    { name: "Firebase", icon: "logos:firebase-icon" },
  ]},
  { key: "cloud" as const, items: [
    { name: "AWS", icon: "logos:aws" },
    { name: "Google Cloud", icon: "logos:google-cloud" },
    { name: "Vercel", icon: "logos:vercel-icon" },
    { name: "Cloudflare", icon: "logos:cloudflare-icon" },
    { name: "Docker", icon: "logos:docker-icon" },
  ]},
  { key: "ec" as const, items: [
    { name: "Shopify", icon: "logos:shopify" },
    { name: "Stripe", icon: "simple-icons:stripe", color: "111827" },
    { name: "Square", icon: "simple-icons:square", color: "000000" },
    { name: "WooCommerce", icon: "logos:woocommerce-icon" },
    { name: "Amazon Pay", icon: "simple-icons:amazonpay", color: "111827" },
  ]},
  { key: "biz" as const, items: [
    { name: "Salesforce", icon: "logos:salesforce" },
    { name: "Slack", icon: "logos:slack-icon" },
    { name: "Microsoft 365", icon: "logos:microsoft-icon" },
    { name: "Notion", icon: "logos:notion-icon" },
    { name: "Jira", icon: "logos:jira" },
  ]},
];

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold tracking-widest uppercase text-neutral-900 mb-4">{children}</p>
  );
}

function ClientLogoMarquee({ label }: { label: string }) {
  const logos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <div className="mt-12 border-t border-gray-200 pt-10 overflow-hidden">
      <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gray-400 mb-7">
        {label}
      </p>
      <div className="relative -mx-6 lg:-mx-8">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent md:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent md:w-28" />
        <div className="flex w-max items-center gap-14 animate-[marquee_38s_linear_infinite] hover:[animation-play-state:paused] md:gap-20">
          {logos.map((logo, index) => (
            <Image
              key={`${logo.name}-${index}`}
              src={logo.src}
              alt={`${logo.name} logo`}
              width={logo.width}
              height={logo.height}
              className="h-9 w-auto shrink-0 object-contain opacity-90 transition duration-300 hover:opacity-100 md:h-11"
              sizes="(max-width: 768px) 160px, 220px"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ svc, claudeBadge, compact }: { svc: Svc; claudeBadge: string; compact?: boolean }) {
  const c = colorMap[svc.color];
  return (
    <Link href={svc.href} className="group block h-full">
      <div className={`relative bg-white border border-gray-200 rounded-lg ${compact ? "p-6 lg:p-7" : "p-8 lg:p-10"} ${c.hoverBorder} hover:shadow-lg transition-all duration-300 h-full flex flex-col`}>
        {svc.badge && (
          <span className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-md bg-neutral-900 text-white text-[10px] font-bold px-2.5 py-1 tracking-wide">
            {svc.badge}
          </span>
        )}
        <div className="flex items-baseline gap-3 mb-3">
          <span className={`text-xs font-semibold tracking-widest uppercase ${c.code} flex-shrink-0`}>{svc.code}</span>
          <h3 className={`${compact ? "text-lg" : "text-xl"} font-bold text-gray-900`}>{svc.title}</h3>
        </div>
        <p className={`${compact ? "text-[13px]" : "text-sm"} text-gray-600 leading-relaxed mb-5 flex-1`}>{svc.desc}</p>
        {svc.claudeNote && (
          <div className="mb-5 rounded-lg bg-neutral-50 border border-neutral-200 px-3.5 py-2.5">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-neutral-900 uppercase tracking-wide mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />{claudeBadge}
            </span>
            <p className="text-[12px] text-neutral-700 leading-relaxed">{svc.claudeNote}</p>
          </div>
        )}
        <div className="flex items-center gap-2 flex-wrap mb-5">
          {svc.tags.map((tag) => (
            <span key={tag} className="text-xs text-gray-500 border border-gray-200 rounded px-2.5 py-1">{tag}</span>
          ))}
        </div>
        <span className={`text-sm font-semibold ${c.cta} ${c.ctaHover} transition-colors`}>{svc.cta} →</span>
      </div>
    </Link>
  );
}

export default function HomeContent({ newsSlot }: { newsSlot: ReactNode }) {
  const { lang } = useLanguage();
  const t = COPY[lang];
  const [heroLoaded, setHeroLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setHeroLoaded(true), 100); }, []);
  const heroFeatures = lang === "ja"
    ? [
        { title: "伴走支援", sub: "責任を持って支援" },
        { title: "安心・安全", sub: "信頼の技術と運用" },
        { title: "中小企業特化", sub: "業種・業界に最適化" },
      ]
    : [
        { title: "Hands-on support", sub: "We see it through" },
        { title: "Safe & reliable", sub: "Trusted tech & operations" },
        { title: "SME-focused", sub: "Tailored to your industry" },
      ];
  const heroFeatureIcons = [
    (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m11 17 2 2a1 1 0 1 0 3-3" /><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" /><path d="m21 3 1 11h-2" /><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" /><path d="M3 4h8" /></svg>
    ),
    (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></svg>
    ),
    (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" /><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" /><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" /><path d="M10 6h4" /><path d="M10 10h4" /><path d="M10 14h4" /><path d="M10 18h4" /></svg>
    ),
  ];

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[70svh] md:min-h-screen flex items-start md:items-center overflow-hidden bg-white">
        <HeroParticlesBg />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-robot.png"
          alt="clearAI ヒューマノイドロボットと四足歩行ロボット"
          className="pointer-events-none select-none absolute bottom-0 right-0 z-0 h-[78%] sm:h-[84%] w-auto object-contain object-bottom md:hidden"
          style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateX(0)" : "translateX(24px)", transition: "opacity 1s ease 300ms, transform 1s ease 300ms" }}
        />
        {/* White fade so the headline stays readable where it overlaps the robot */}
        <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-br from-white from-5% via-white/35 to-transparent to-70% md:hidden" />
        <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 lg:px-10 pt-24 pb-6 md:py-24 pointer-events-none">
          <div className="max-w-[18.5rem] sm:max-w-md md:max-w-2xl lg:max-w-3xl text-left pointer-events-auto">
            <div className="hidden md:flex md:flex-wrap md:justify-start gap-2 mb-6 transition-all duration-700" style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "200ms" }}>
              {t.heroChips.map((tag) => (
                <span key={tag} className="inline-flex items-center rounded-md bg-neutral-100 text-neutral-900 border border-neutral-200 px-3 py-1 text-xs font-semibold">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-[1.9rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.12] tracking-tight mb-8 transition-all duration-700" style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(24px)", transitionDelay: "400ms" }}>
              {t.heroTitle}
            </h1>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-[17rem] sm:max-w-sm md:max-w-xl mb-10 transition-all duration-700" style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "650ms" }}>
              {t.heroDesc}
            </p>
            <div className="flex flex-wrap justify-start items-center gap-5 transition-all duration-700" style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "850ms" }}>
              <Link href="/reserve" className="inline-flex items-center gap-2 rounded-md bg-neutral-900 text-white font-semibold px-7 py-3.5 hover:bg-neutral-800 transition-colors duration-300 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.3)]">
                {t.heroPrimary}
                <span aria-hidden>→</span>
              </Link>
              <Link href="#services" className="inline-flex items-center gap-1.5 text-sm text-gray-700 font-semibold hover:text-neutral-900 transition-colors duration-300">
                {t.heroSecondary}
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HERO TRUST CARD ═══ */}
      <section className="relative z-20 -mt-2 bg-transparent md:hidden">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="rounded-2xl border border-gray-200 bg-white shadow-[0_10px_40px_-15px_rgba(0,0,0,0.18)] grid grid-cols-3 divide-x divide-gray-100 overflow-hidden">
              {heroFeatures.map((f, i) => (
                <div key={f.title} className="flex items-center gap-2 px-2.5 py-4 sm:gap-3.5 sm:px-6 sm:py-5">
                  <span className="flex-shrink-0 text-neutral-900 [&>svg]:w-5 [&>svg]:h-5 sm:[&>svg]:w-[26px] sm:[&>svg]:h-[26px]">{heroFeatureIcons[i]}</span>
                  <div className="min-w-0">
                    <div className="text-[11px] sm:text-sm font-bold text-gray-900 leading-tight">{f.title}</div>
                    <div className="text-[9px] sm:text-xs text-gray-500 mt-0.5 leading-tight">{f.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ NEWS / BLOG ═══ */}
      <section className="pt-4 pb-8 md:pt-10 md:pb-20 lg:pt-12 lg:pb-28 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6 md:mb-12">
            <div>
              <SectionLabel>{t.newsLabel}</SectionLabel>
              <h2 className="text-3xl font-bold text-gray-900 leading-tight">{t.newsTitle}</h2>
            </div>
            <Link href="/blog" className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 hover:text-neutral-700 transition-colors">
              {t.newsCta}
            </Link>
          </div>
          {newsSlot}
          <div className="text-center mt-8 sm:hidden">
            <Link href="/blog" className="text-sm font-semibold text-neutral-900">{t.newsCta}</Link>
          </div>
        </div>
      </section>

      {/* ═══ TRUST METRICS ═══ */}
      <section className="py-6 md:py-12 bg-white border-b border-gray-100">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-2 gap-x-4 md:gap-0 md:divide-x divide-gray-200">
              {t.trustStats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center justify-center py-3 md:py-6 px-4 text-center">
                  <span className="text-lg font-bold text-gray-900">{stat.value}</span>
                  <span className="text-xs text-gray-500 mt-1">{stat.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <ClientLogoMarquee label={t.clientLogosLabel} />
        </div>
      </section>

      {/* ═══ WHY clearAI ═══ */}
      <section className="py-8 md:py-20 lg:py-28 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <SectionLabel>{t.whyLabel}</SectionLabel>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.whyTitle}</h2>
            <p className="text-base text-gray-500 mb-7 md:mb-14 w-full leading-relaxed">{t.whyDesc}</p>
          </Reveal>
          <CardCarousel>
            {t.why.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold flex-shrink-0">{i + 1}</div>
                    <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* ═══ VISION ═══ */}
      <section className="py-8 md:py-20 lg:py-28 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-5 lg:gap-16 items-start">
            <Reveal>
              <SectionLabel>{t.visionLabel}</SectionLabel>
              <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-6">{t.visionTitle}</h2>
            </Reveal>
            <Reveal delay={100}>
              <div className="space-y-5">
                <p className="text-base text-gray-600 leading-relaxed">{t.visionBody1}</p>
                <p className="text-base text-gray-600 leading-relaxed">{t.visionBody2}</p>
                <div className="h-px bg-gray-200 mt-6" />
                <div className="flex items-center gap-6 pt-4 flex-wrap">
                  {t.visionStats.map((s, i) => (
                    <div key={s.label} className="flex items-center gap-6">
                      {i > 0 && <div className="w-px h-10 bg-gray-200 hidden sm:block" />}
                      <div>
                        <p className="text-lg font-bold text-gray-900">{s.value}</p>
                        <p className="text-xs text-gray-400 mt-1">{s.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ ENTRY PRODUCTS ═══ */}
      <section className="py-8 md:py-20 lg:py-28 bg-white border-t border-gray-100">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <SectionLabel>{t.getStartedLabel}</SectionLabel>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.getStartedTitle}</h2>
            <p className="text-base text-gray-500 mb-7 md:mb-14 w-full leading-relaxed">{t.getStartedDesc}</p>
          </Reveal>
          <CardCarousel>
            {t.steps.map((step, i) => {
              const c = colorMap[step.color];
              return (
                <Reveal key={step.step} delay={i * 80}>
                  <Link href={step.href} className="group block h-full">
                    <div className={`bg-white border border-gray-200 rounded-lg p-8 lg:p-10 ${c.hoverBorder} hover:shadow-lg transition-all duration-300 h-full flex flex-col`}>
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`inline-block text-xs font-semibold tracking-widest uppercase ${c.code} flex-shrink-0`}>{step.step}</span>
                        <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-1">{step.desc}</p>
                      <ul className="space-y-2 text-xs text-gray-500 mb-6">
                        {step.points.map((p) => <li key={p}>・{p}</li>)}
                      </ul>
                      <span className={`text-sm font-semibold ${c.cta} ${c.ctaHover} transition-colors`}>{step.cta}</span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </CardCarousel>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section id="services" className="py-8 md:py-20 lg:py-28 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <SectionLabel>{t.servicesLabel}</SectionLabel>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.servicesTitle}</h2>
            <p className="text-base text-gray-500 mb-6 md:mb-12 w-full leading-relaxed">{t.servicesDesc}</p>
          </Reveal>

          <Reveal>
            <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-5">{t.primaryHeading}</p>
          </Reveal>
          <CardCarousel className="mb-7 md:mb-14">
            {t.primaryServices.map((svc, i) => (
              <Reveal key={svc.code} delay={(i % 3) * 80} className="h-full">
                <ServiceCard svc={svc} claudeBadge={t.claudeBadge} />
              </Reveal>
            ))}
          </CardCarousel>

          <Reveal>
            <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-5">{t.secondaryHeading}</p>
          </Reveal>
          <CardCarousel>
            {t.secondaryServices.map((svc, i) => (
              <Reveal key={svc.code} delay={(i % 3) * 80} className="h-full">
                <ServiceCard svc={svc} claudeBadge={t.claudeBadge} compact />
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* ═══ APPROACH ═══ */}
      <section className="py-8 md:py-20 lg:py-28 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <SectionLabel>{t.approachLabel}</SectionLabel>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-7 md:mb-14">{t.approachTitle}</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.approach.map((item, i) => (
              <Reveal key={item.num} delay={i * 80}>
                <div className="border-t-2 border-neutral-900 pt-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-semibold text-neutral-900 tracking-widest flex-shrink-0">{item.num}</span>
                    <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className="py-8 md:py-20 lg:py-28 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <SectionLabel>{t.processLabel}</SectionLabel>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.processTitle}</h2>
            <p className="text-base text-gray-500 mb-7 md:mb-14 w-full leading-relaxed">{t.processDesc}</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.process.map((step, i) => (
              <Reveal key={step.num} delay={i * 80}>
                <div className="group relative bg-white border border-gray-200 rounded-lg p-7 h-full transition-colors duration-300 hover:border-gray-300">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl font-bold text-neutral-200 transition-colors duration-300 group-hover:text-neutral-900 flex-shrink-0">{step.num}</span>
                    <h3 className="text-base font-bold text-gray-900">{step.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TEAM ═══ */}
      <section className="py-8 md:py-20 lg:py-28 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <SectionLabel>{t.teamLabel}</SectionLabel>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.teamTitle}</h2>
            <p className="text-base text-gray-500 mb-7 md:mb-14 w-full leading-relaxed">{t.teamDesc}</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            <Reveal delay={0} className="h-full">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 lg:p-10 h-full flex flex-col">
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-neutral-900 mb-4">{t.teamCard1Label}</span>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t.teamCard1Title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-1">{t.teamCard1Desc}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {t.teamCard1Tags.map((tag) => (
                    <span key={tag} className="text-xs text-gray-600 bg-white border border-gray-200 rounded px-2.5 py-1">{tag}</span>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={100} className="h-full">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 lg:p-10 h-full flex flex-col">
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-neutral-900 mb-4">{t.teamCard2Label}</span>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t.teamCard2Title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-1">{t.teamCard2Desc}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {t.teamCard2Tags.map((tag) => (
                    <span key={tag} className="text-xs text-gray-600 bg-white border border-gray-200 rounded px-2.5 py-1">{tag}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ TECH STACK ═══ */}
      <section className="py-8 md:py-20 lg:py-28 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <SectionLabel>{t.techLabel}</SectionLabel>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.techTitle}</h2>
            <p className="text-base text-gray-500 w-full leading-relaxed mb-7 md:mb-14">{t.techDesc}</p>
          </Reveal>
          <div className="space-y-0">
            {TECH_GROUPS.map((group, gi) => (
              <Reveal key={group.key} delay={gi * 40}>
                <div className="border-t border-gray-200 py-8">
                  <div className="grid lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-2">
                      <h3 className="text-sm font-bold text-gray-900">{t.techGroups[group.key as keyof typeof t.techGroups]}</h3>
                    </div>
                    <div className="lg:col-span-10">
                      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
                        {group.items.map((tech) => (
                          <div key={tech.name} className="bg-white border border-gray-200 rounded-xl p-3 sm:p-5 flex flex-col items-center justify-center gap-2 sm:gap-3 hover:border-gray-300 hover:shadow-sm transition-all aspect-square">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={`https://api.iconify.design/${tech.icon}.svg${"color" in tech && tech.color ? `?color=%23${tech.color}` : ''}`} alt={tech.name} className="w-7 h-7 sm:w-8 sm:h-8 object-contain" loading="lazy" />
                            <p className="text-[11px] sm:text-xs font-medium text-gray-600 text-center leading-tight">{tech.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-10 border-t border-gray-200 pt-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-neutral-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900 mb-1">{t.techMoreTitle}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{t.techMoreDesc}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ FAQ TEASER ═══ */}
      <section className="py-8 md:py-20 lg:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Reveal>
            <SectionLabel>{t.faqLabel}</SectionLabel>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.faqTitle}</h2>
            <p className="text-base text-gray-500 mb-10 leading-relaxed">{t.faqDesc}</p>
          </Reveal>
          <div className="mb-8">
            {t.faq.map((item, i) => (
              <Reveal key={i} delay={i * 70}>
                <details className="border-b border-gray-100 py-2.5 md:py-5 group">
                  <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between gap-4">
                    <span>{item.q}</span>
                    <span className="text-gray-400 text-lg leading-none flex-shrink-0 transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <p className="text-gray-600 text-sm leading-relaxed mt-3">{item.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <Link href="/faq" className="text-sm font-semibold text-neutral-900 hover:text-neutral-700 transition-colors">{t.faqCta}</Link>
          </Reveal>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-8 md:py-20 lg:py-28 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-6 md:mb-12">
              <SectionLabel>{t.ctaLabel}</SectionLabel>
              <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-6">{t.ctaTitle}</h2>
              <p className="text-base text-gray-600 leading-relaxed max-w-lg mx-auto">{t.ctaDesc}</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {t.ctaCards.map((item, i) => (
              <Reveal key={item.service} delay={i * 50}>
                <Link
                  href={`/contact?service=${item.service}`}
                  className="group block rounded-lg border border-gray-200 bg-white px-5 py-4 hover:border-neutral-300 hover:shadow-md transition-all duration-300"
                >
                  <span className="block text-sm font-bold text-gray-900 group-hover:text-neutral-700 transition-colors">
                    {item.label}
                  </span>
                  <span className="block text-xs text-gray-400 mt-1">{t.ctaCardAction}</span>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={350}>
            <div className="text-center mt-8">
              <Link href="/contact" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                {t.ctaOthers}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

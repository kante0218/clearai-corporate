"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import CardCarousel from "@/components/CardCarousel";
import { CLIENT_LOGOS } from "@/components/ClientLogoGrid";
import { BOOKING_URL } from "@/lib/booking";

/* NOTE (2026-08-08): the VISION / GET STARTED / SERVICES / APPROACH / TEAM sections were
   removed from the homepage on request. Their COPY entries below are intentionally kept so the
   sections can be restored without rewriting the copy; they are not rendered anywhere today. */

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
  techGroups: { frontend: string; backend: string; aiml: string; mobile: string; database: string; cloud: string; biz: string };
  techMoreTitle: string; techMoreDesc: string;
  faqLabel: string; faqTitle: string; faqDesc: string; faqCta: string;
  faq: { q: string; a: string }[];
  newsLabel: string; newsTitle: string; newsCta: string; clientLogosLabel: string;
  casesLabel: string; casesTitle: string; casesDesc: string; casesCta: string; casesNote: string;
  casesCardAction: string;
  cases: { category: string; industry: string; title: string; desc: string; href: string; image: { src: string; alt: string } }[];
  ctaLabel: string; ctaTitle: string; ctaDesc: ReactNode;
  ctaPrimary: string; ctaSecondary: string; ctaNote: string;
};

const COPY: Record<"ja" | "en", HomeCopy> = {
  ja: {
    heroChips: ["提案だけで終わらず、開発・本番運用まで一気通貫", "1部署・1業務から小さく始め、成果を見て本番へ"],
    heroTitle: (
      <>AI・システム開発<br /><span className="inline">戦略から実装まで。</span></>
    ),
    heroDesc: (
      <>経営課題の整理、AI戦略、システム開発、本番運用。<br className="hidden md:inline" />現場で使われる仕組みを、ひとつのチームでつくります。</>
    ),
    heroPrimary: "代表に無料で相談する",
    heroSecondary: "会社資料を受け取る",
    trustStats: [
      { value: "最大75%", label: "研修費を助成金で削減" },
      { value: "無料", label: "30分のAI診断" },
      { value: "全国対応", label: "オンライン実施可" },
      { value: "2営業日", label: "初回返信" },
    ],
    whyLabel: "Why ClearAI",
    whyTitle: "「提案で終わらない」を、約束します。",
    whyDesc: "コンサルの戦略視点と現場で鍛えたエンジニアリングを一社で担うから、絵に描いた餅で終わりません。",
    why: [
      { title: "実装まで責任を持つ", desc: "戦略提案で終わらせず、稼働するシステムと運用定着まで、エンジニアが手を動かして仕上げます。" },
      { title: "中立な立場で伴走", desc: "特定ツールを売り込まず、Claude・ChatGPT・Geminiから貴社の課題に本当に合うものを中立に選びます。" },
      { title: "補助金をフル活用", desc: "人材開発支援助成金・IT導入補助金などを活用し、研修・導入コストを最大75%削減して始められます。" },
    ],
    visionLabel: "Our Vision",
    visionTitle: "AIを、日本の現場へ届ける。",
    visionBody1: "難しい、コストが高い、何から始めればいいかわからない——AIはまだ多くの企業にとって遠い存在だという声を、何度も聞いてきました。",
    visionBody2: "私たちはそのギャップを埋めるため、最先端のAI技術をビジネスの言葉に翻訳し、エンジニアの力で一社一社の経営に寄り添い、確かな価値を届けます。",
    visionStats: [
      { value: "開発・顧問・研修・Web", label: "4つの主力支援" },
      { value: "日本", label: "市場特化" },
      { value: "2026", label: "創業" },
    ],
    getStartedLabel: "Get Started",
    getStartedTitle: "まずは、小さく始められます。",
    getStartedDesc: "いきなりの大型契約は不要、30分の無料診断と3分で読める資料から貴社に合うかを見極めてください。",
    steps: [
      { step: "STEP 01", title: "無料AI診断（30分）", desc: "営業色の強い提案はせず、現状の業務・課題をヒアリングしてAI活用で効果の高そうな領域を1つ特定してお返しします。", points: ["Zoom / 対面いずれも可", "NDA締結のうえ、機密情報も扱えます", "その場で簡易レポートを口頭共有"], cta: "申し込む →", href: "/contact?service=advisor", color: "indigo" },
      { step: "STEP 02", title: "3分でわかる会社資料", desc: "事業内容・代表的な支援パターン・料金レンジ・補助金活用例をまとめた1枚PDFを、社内稟議用に送付します。", points: ["PDF 1ページ", "料金レンジと進め方の目安入り", "登録不要・当日返信"], cta: "資料をもらう →", href: "/contact?service=advisor&doc=company-deck", color: "amber" },
      { step: "STEP 03", title: "1部署・1業務からのPoC", desc: "最も効果が出そうな1部署・1業務に絞って小さく試行導入し、効果が見えてから拡張します。", points: ["PoC期間 1〜2ヶ月", "成功基準を事前合意", "人材開発支援助成金の活用も可"], cta: "相談する →", href: "/contact?service=education", color: "sky" },
    ],
    servicesLabel: "Our Services",
    servicesTitle: "AIで、日本の未来をつくる。",
    servicesDesc: "システム・ソフトウェア開発を軸に、ロボットレンタル・FDEコンサルティング・AI内製化研修まで、戦略から実装・運用まで確実に成果を届けます。",
    primaryHeading: "主力サービス",
    secondaryHeading: "その他の支援",
    claudeBadge: "Claude対応",
    primaryServices: [
      {
        code: "01", title: "システム・ソフトウェア開発", color: "cyan",
        desc: "AIを組み込んだ業務システム・AIエージェント・Webアプリを、要件定義から設計・開発・本番運用まで受託で一貫してお引き受けします。",
        tags: ["受託開発", "AIエージェント", "業務システム", "運用保守"],
        href: "/software-development", cta: "開発の相談をする",
        claudeNote: "Claudeを組み込んだ社内システム・自律エージェントの設計から本番運用まで、実装まで含めて担います。",
      },
      {
        code: "02", title: "ロボットレンタル", color: "sky", badge: "1泊2日〜",
        desc: "Unitree R1・G1（ヒューマノイド）とGo2（四足歩行）を1泊2日から全国配送でお貸し出しし、購入前の実機検証・展示会・PoCをそのまま現場で試していただけます。",
        tags: ["Unitree R1 / G1 / Go2", "全国配送", "安心補償付き", "長期プランあり"],
        href: "/robot-rental", cta: "料金・機体を見る",
      },
      {
        code: "03", title: "AI顧問", color: "indigo",
        desc: "月2.5万円〜、外部AI顧問として技術選定からPoC評価・IT全般の相談まで、チャット相談・会議参加・内製化支援で継続伴走します。",
        tags: ["月額契約", "限定10社枠", "経営伴走", "内製化支援"],
        href: "/advisor", cta: "顧問契約のご相談",
        claudeNote: "Claude（Anthropic）の業務導入・運用定着まで、顧問として継続的に伴走します。",
      },
      {
        code: "04", title: "AI研修", color: "amber", badge: "補助金 最大75%OFF",
        desc: "導入研修から部門別ワークショップ・実務適用まで、社員が主役になる学習プログラムでチームのAIリテラシーを底上げします。",
        tags: ["社員研修", "部門別ワークショップ", "プロンプト設計", "業務適用"],
        href: "/training", cta: "研修プログラムを見る",
        claudeNote: "Claudeを実務で使いこなす実践研修も。現場のユースケースに即したプロンプト・運用ルールまで指南します。",
      },
      {
        code: "05", title: "ウェブサイト作成", color: "cyan",
        desc: "Next.js + Vercel + Headless CMSで、表示速度・SEO・運用しやすさを最高水準にしたサイトを高速制作します。",
        tags: ["Next.js", "Vercel", "SEO", "Headless CMS"],
        href: "/website", cta: "詳しく見る",
      },
    ],
    secondaryServices: [
      {
        code: "06", title: "コンサル・DX", color: "blue",
        desc: "大手コンサル出身者の監修で、戦略策定から実装・運用までAI活用を一気通貫で支援します。",
        tags: ["AI戦略策定", "業務自動化", "生成AI活用"],
        href: "/ai-consulting", cta: "詳しく見る",
      },
      {
        code: "07", title: "AI広告運用", color: "rose",
        desc: "クリエイティブ生成から効果検証までAIで広告運用を最適化・自動化し、ROAS改善を伴走します。",
        tags: ["広告運用", "クリエイティブ生成", "効果検証"],
        href: "/advertising", cta: "詳しく見る",
      },
    ],
    approachLabel: "Our Approach",
    approachTitle: "私たちが大切にする3つのこと",
    approach: [
      { num: "01", title: "正直であること", desc: "過度な期待を煽らず、実現可能性を率直に見極めて効果の高い領域から着実に進めます。" },
      { num: "02", title: "伴走すること", desc: "導入して終わりではなく、お客様のチームの一員として運用が定着するまでともに歩みます。" },
      { num: "03", title: "現場に落とし込むこと", desc: "技術選定から運用設計まで、専門知識がなくても扱える現場で使える形に落とし込みます。" },
    ],
    processLabel: "How It Works",
    processTitle: "ご相談から導入までの流れ",
    processDesc: "初回相談は無料。無理な営業はせず、貴社のペースに合わせて進めます。",
    process: [
      { num: "01", title: "無料相談・AI診断", desc: "現状の課題をヒアリングし、AI活用で効果の高い領域を一緒に特定します（30分・オンライン可）。" },
      { num: "02", title: "ご提案・お見積り", desc: "システム開発・顧問・研修・Web制作のうち、最適な進め方と料金・補助金活用をご提案します。" },
      { num: "03", title: "スモールスタート", desc: "1部署・1業務に絞ったPoCや単発研修から始め、効果を確認しながら無理なく拡張します。" },
      { num: "04", title: "継続伴走・定着", desc: "運用が現場に根付くまで継続的に伴走し、成果と体制を定期的に見直します。" },
    ],
    teamLabel: "Our Team",
    teamTitle: (<>戦略から実装・運用まで、<br className="hidden sm:inline" />信頼できるプロフェッショナルが担います。</>),
    teamDesc: "経営コンサルの視座と現場で鍛え上げたエンジニアリングの実装力を掛け合わせ、提案だけで終わらせず稼働するシステムと継続的な価値創出まで一貫して責任を持ちます。",
    teamCard1Label: "Strategy & DX",
    teamCard1Title: "業務改革・DX領域の監修",
    teamCard1Desc: "大手コンサルティングファーム出身のメンバーが、経営課題の構造化から全社展開のロードマップまで、上流の意思決定に耐える品質で業務改革・DX推進の設計を監修します。",
    teamCard1Tags: ["大手コンサルファーム出身", "業務改革", "DX戦略", "全社展開"],
    teamCard2Label: "Engineering",
    teamCard2Title: "開発・デプロイ・メンテナンス",
    teamCard2Desc: "AIコンサルティング経験が豊富なエンジニア、シリコンバレーでバックエンド開発に従事した技術者、高専から筑波大学に進学し応用情報技術者を持つ情報技術者などが、ウェブアプリケーションの開発・デプロイ・運用保守からリリース後の信頼性の担保まで一貫して責任を持ちます。",
    teamCard2Tags: ["AIコンサル経験豊富", "シリコンバレー開発経験", "高専→筑波大学", "応用情報技術者"],
    techLabel: "Tech Stack",
    techTitle: "使用技術",
    techDesc: "実績・安定性・サポート体制が確立された技術を軸に採用し、記載以外の言語・フレームワークにも貴社の既存環境に合わせて対応します。",
    techGroups: { frontend: "フロントエンド", backend: "バックエンド", aiml: "AI・機械学習", mobile: "モバイル・デスクトップ", database: "データベース", cloud: "クラウド・インフラ", biz: "業務連携・コラボレーション" },
    techMoreTitle: "上記以外の技術にも対応可能",
    techMoreDesc: "お客様の既存環境・社内標準・業界要件に合わせて、記載以外の言語・フレームワーク・クラウド・SaaS連携にも柔軟に対応いたしますので、まずはお気軽にご相談ください。",
    faqLabel: "FAQ",
    faqTitle: "よくあるご質問",
    faqDesc: "ご相談前によく寄せられる質問をまとめました。",
    faqCta: "すべての質問を見る →",
    faq: [
      { q: "AIの知識がなくても相談できますか？", a: "もちろんです。「何から始めればいいかわからない」段階からのご相談が最も多く、専門用語を使わず現場の言葉でご説明します。" },
      { q: "小さく始めることはできますか？", a: "できます。単発の研修や、1部署・1業務に絞ったPoCなど、いきなり大型契約をせずに効果を確かめてから拡張いただけます。" },
      { q: "補助金は使えますか？", a: "研修・AI導入では人材開発支援助成金やIT導入補助金などを活用でき、実質負担を最大75%削減できる場合があり、申請書類もサポートします。" },
    ],
    newsLabel: "News",
    newsTitle: "お知らせ",
    newsCta: "一覧を見る →",
    clientLogosLabel: "実績企業",
    casesLabel: "Case Studies",
    casesTitle: "導入実績",
    casesDesc: "実際にお受けした案件を、課題・つくったもの・結果の順で記録しています。あえて自動化しなかった範囲も書いています。",
    casesCta: "すべての実績を見る →",
    casesNote: "※ クライアント企業名は伏せ、業種と規模のみを記載しています。写真は支援内容を伝えるためのイメージで、実際の導入先・現場を撮影したものではありません。",
    casesCardAction: "詳しく見る",
    cases: [
      {
        category: "システム開発",
        industry: "製造業（金属加工）",
        title: "発注書が届いた瞬間に、設計からNC出力まで走る",
        desc: "フライス盤とAIエージェントを接続。仕様の構造化から3Dモデル・加工パス・NCコード生成までを自動化し、人の判断は最終承認1箇所に集約しました。",
        href: "/case-studies/milling-machine-ai-agent",
        image: {
          src: "/images/generated-trust/dev-field-tablet.webp",
          alt: "工場内で設備データを確認する担当者のイメージ",
        },
      },
      {
        category: "AIエージェント / 業務自動化",
        industry: "SES",
        title: "SNSの投稿とDMをAIエージェントに任せ、事務作業を減らす",
        desc: "投稿下書きの生成、DM文面の個別化、宛先の選定と送信履歴の管理を自動化。担当者の作業を「書く・探す」から「確認して返す」に切り替えました。",
        href: "/case-studies/ses-sns-automation",
        image: {
          src: "/images/generated-trust/dev-dashboard-review.webp",
          alt: "運用ダッシュボードを確認するチームのイメージ",
        },
      },
      {
        category: "Web制作",
        industry: "不動産コンサルティング",
        title: "「何をしてくれる会社か」が伝わるサイトへ",
        desc: "サービスの言語化から情報設計・実装まで一貫対応。商談の前に読んでもらえる状態をつくり、更新は社内で回せるようにして引き渡しました。",
        href: "/case-studies/real-estate-consulting-site",
        image: {
          src: "/images/generated-trust/flow-prototype.webp",
          alt: "複数端末でWebサイトを確認する制作工程のイメージ",
        },
      },
    ],
    ctaLabel: "Contact",
    ctaTitle: "まずは、代表と話してみませんか。",
    ctaDesc: (<>AIのことがわからなくても大丈夫、<br />貴社の状況に合わせて一緒に考えます。</>),
    ctaPrimary: "代表とのミーティングを予約する",
    ctaSecondary: "メールで問い合わせる",
    ctaNote: "オンライン30分・無料。営業色の強い提案はいたしません。",
  },
  en: {
    heroChips: ["We own delivery through production operations", "Start with one workflow, prove value, then scale"],
    heroTitle: (
      <>AI & software development<br /><span className="inline">from strategy to delivery.</span></>
    ),
    heroDesc: (
      <>Business priorities, AI strategy, system delivery, and live operations.<br className="hidden md:inline" />One accountable team builds what people actually use.</>
    ),
    heroPrimary: "Talk with our founder",
    heroSecondary: "Get the company deck",
    trustStats: [
      { value: "Up to 75%", label: "Training cost cut by subsidies" },
      { value: "Free", label: "30-min AI assessment" },
      { value: "Nationwide", label: "Online delivery available" },
      { value: "2 business days", label: "First reply" },
    ],
    whyLabel: "Why ClearAI",
    whyTitle: "We promise to never stop at a proposal.",
    whyDesc: "A consultant's strategic view and field-forged engineering under one roof, so plans don't stay on paper.",
    why: [
      { title: "We own the implementation", desc: "Our engineers don't stop at strategy decks — they build working systems and see them through to real adoption." },
      { title: "Neutral, on your side", desc: "Without pushing a specific tool, we neutrally pick what truly fits your problem from Claude, ChatGPT, and Gemini." },
      { title: "Full use of subsidies", desc: "Using Japan's HR development and IT-introduction subsidies, we cut training and adoption costs by up to 75%, so you can start with minimal net cost." },
    ],
    visionLabel: "Our Vision",
    visionTitle: "Bringing AI to Japan's front lines.",
    visionBody1: "For most companies, AI still feels out of reach — too hard, too expensive, with no obvious place to start — a story we've heard many times.",
    visionBody2: "We exist to close that gap — translating state-of-the-art AI into the language of business and using engineering to support real operations, staying close to each company and delivering tangible value.",
    visionStats: [
      { value: "Dev · Advisor · Training · Web", label: "Four core services" },
      { value: "Japan", label: "market focus" },
      { value: "2026", label: "founded" },
    ],
    getStartedLabel: "Get Started",
    getStartedTitle: "Start small. Scale when it works.",
    getStartedDesc: "No big contract required — start with a free 30-minute assessment and a 3-minute company deck to see whether we're a fit.",
    steps: [
      { step: "STEP 01", title: "Free AI assessment (30 min)", desc: "With no hard sell, we listen to your current workflows and challenges, then identify one high-impact area for AI.", points: ["Zoom or in-person", "NDA on request — we can handle confidential data", "Verbal summary on the spot"], cta: "Book a session →", href: "/contact?service=advisor", color: "indigo" },
      { step: "STEP 02", title: "3-minute company deck", desc: "A one-page PDF summarizing our services, typical engagements, price ranges, and subsidy examples — perfect for internal review.", points: ["1-page PDF", "Price ranges and engagement model included", "No signup, same-day delivery"], cta: "Get the deck →", href: "/contact?service=advisor&doc=company-deck", color: "amber" },
      { step: "STEP 03", title: "PoC from a single team", desc: "Rather than a company-wide rollout upfront, we focus on the one team or workflow where AI is most likely to pay off, then expand from proven results.", points: ["1–2 month PoC", "Success criteria agreed up front", "Government training subsidies available"], cta: "Get in touch →", href: "/contact?service=education", color: "sky" },
    ],
    servicesLabel: "Our Services",
    servicesTitle: "Building Japan's future with AI.",
    servicesDesc: "Centered on system and software development, plus robot rental, FDE consulting, and in-house AI enablement training — delivering real outcomes from strategy to implementation and operation.",
    primaryHeading: "Core services",
    secondaryHeading: "Other support",
    claudeBadge: "Claude-ready",
    primaryServices: [
      {
        code: "01", title: "System & Software Development", color: "cyan",
        desc: "AI-embedded business systems, AI agents, and web apps — built on a contract basis from requirements definition through design, development, and production operations.",
        tags: ["Contract development", "AI agents", "Business systems", "Maintenance"],
        href: "/software-development", cta: "Discuss a project",
        claudeNote: "We build Claude-powered internal systems and autonomous agents — design through production, implementation included.",
      },
      {
        code: "02", title: "Robot Rental", color: "sky", badge: "From 2 days",
        desc: "Rent the Unitree R1 and G1 humanoids or the Go2 quadruped from two days up, delivered nationwide — so you can validate on site before you buy, or run a trade show or PoC.",
        tags: ["Unitree R1 / G1 / Go2", "Nationwide delivery", "Insured", "Monthly plans"],
        href: "/robot-rental", cta: "See models and rates",
      },
      {
        code: "03", title: "AI Advisor", color: "indigo",
        desc: "From JPY 25K/month, as your outside AI advisor we provide chat support, meeting participation, and in-house enablement — from tool selection to PoC review and broader IT advice.",
        tags: ["Monthly contract", "Limited slots", "Management partner", "In-house enablement"],
        href: "/advisor", cta: "Discuss an advisory engagement",
        claudeNote: "We support adopting and embedding Claude (Anthropic) into your operations — as an ongoing advisor.",
      },
      {
        code: "04", title: "AI Training", color: "amber", badge: "Up to 75% subsidy",
        desc: "Raise your team's AI literacy with learning programs where employees take the lead — from onboarding workshops to department-specific sessions and hands-on application.",
        tags: ["Employee training", "Department workshops", "Prompt design", "Workflow application"],
        href: "/training", cta: "View training programs",
        claudeNote: "Hands-on Claude training too — prompts and operating rules tailored to your real use cases.",
      },
      {
        code: "05", title: "Website Production", color: "cyan",
        desc: "Fast production of websites that perform in the AI era, built on Next.js + Vercel + Headless CMS for top-tier speed, SEO, and ease of operation.",
        tags: ["Next.js", "Vercel", "SEO", "Headless CMS"],
        href: "/website", cta: "Learn more",
      },
    ],
    secondaryServices: [
      {
        code: "06", title: "Consulting & DX", color: "blue",
        desc: "Overseen by ex-top-tier consultants, with end-to-end support for AI adoption from strategy through implementation and operation.",
        tags: ["AI strategy", "Workflow automation", "Generative AI"],
        href: "/ai-consulting", cta: "Learn more",
      },
      {
        code: "07", title: "AI Advertising", color: "rose",
        desc: "We optimize and automate ad operations with AI — from creative generation to measurement — and partner on ROAS.",
        tags: ["Ad operations", "Creative generation", "Measurement"],
        href: "/advertising", cta: "Learn more",
      },
    ],
    approachLabel: "Our Approach",
    approachTitle: "Three things we stand for",
    approach: [
      { num: "01", title: "Honesty", desc: "Without hype, we candidly judge what's feasible and move forward where impact is highest, in order of demonstrated results." },
      { num: "02", title: "Partnership", desc: "Delivery isn't the finish line — we stay engaged until adoption takes root, walking alongside your team." },
      { num: "03", title: "Grounded execution", desc: "From technology choice to operational design, we translate everything into a form your team can actually use." },
    ],
    processLabel: "How It Works",
    processTitle: "From first call to adoption",
    processDesc: "The first consultation is free. No hard sell — we move at your pace.",
    process: [
      { num: "01", title: "Free consult & AI assessment", desc: "We listen to your challenges and identify high-impact areas for AI together (30 min, online available)." },
      { num: "02", title: "Proposal & quote", desc: "We propose the best path among software development, advisory, training, and web production — with pricing and subsidy options." },
      { num: "03", title: "Start small", desc: "Begin with a focused PoC or a one-off training, expanding at a comfortable pace as results show." },
      { num: "04", title: "Ongoing partnership", desc: "We stay engaged until it sticks on the ground, reviewing outcomes and structure regularly." },
    ],
    teamLabel: "Our Team",
    teamTitle: (<>From strategy to implementation and operation,<br className="hidden sm:inline" />trusted professionals see it through.</>),
    teamDesc: "Combining management-consulting perspective with field-forged engineering execution, we don't stop at proposals — we own working systems and continuous value all the way through.",
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
    techDesc: "We build primarily on technologies with proven track records, stability, and strong support — and adapt to languages and frameworks beyond this list to fit your existing environment.",
    techGroups: { frontend: "Frontend", backend: "Backend", aiml: "AI / ML", mobile: "Mobile & Desktop", database: "Database", cloud: "Cloud & Infrastructure", biz: "Business Integrations" },
    techMoreTitle: "We also support technologies beyond this list",
    techMoreDesc: "We flexibly support languages, frameworks, clouds, and SaaS integrations beyond this list — tailored to your environment, internal standards, and industry requirements — so please reach out.",
    faqLabel: "FAQ",
    faqTitle: "Frequently asked questions",
    faqDesc: "A few questions we're often asked before getting started.",
    faqCta: "See all questions →",
    faq: [
      { q: "Can we consult even without AI knowledge?", a: "Absolutely — 'We don't know where to start' is the most common starting point we hear, and we explain in plain language, not jargon." },
      { q: "Can we start small?", a: "Yes. With one-off training or a PoC scoped to a single team or workflow, you can verify results before any large commitment." },
      { q: "Can we use subsidies?", a: "For training and AI adoption, programs like the HR Development Subsidy and IT Introduction Subsidy can cut your net cost by up to 75%, and we support the paperwork too." },
    ],
    newsLabel: "News",
    newsTitle: "News",
    newsCta: "View all →",
    clientLogosLabel: "Client Work",
    casesLabel: "Case Studies",
    casesTitle: "Case Studies",
    casesDesc: "A record of projects we actually delivered — the problem, what we built, and the outcome, including the parts we deliberately left to people.",
    casesCta: "View all case studies →",
    casesNote: "Note: client names are withheld; only industry and scale are shown. Photos are illustrative and are not photographs of the actual client sites.",
    casesCardAction: "Read the case",
    cases: [
      {
        category: "System Development",
        industry: "Manufacturing (metal machining)",
        title: "From purchase order to NC output, the moment it arrives",
        desc: "We connected the milling machine to an AI agent: specs are parsed, the 3D model, toolpaths and NC code are generated, and human judgement is concentrated in a single approval step.",
        href: "/case-studies/milling-machine-ai-agent",
        image: {
          src: "/images/generated-trust/dev-field-tablet.webp",
          alt: "Illustrative view of an operator checking equipment data inside a factory",
        },
      },
      {
        category: "AI Agents / Automation",
        industry: "SES (IT staffing)",
        title: "Handing social posts and DMs to an AI agent",
        desc: "Drafting posts, personalising DMs, selecting recipients and keeping one send history — automated. The team's work shifted from writing and searching to reviewing and replying.",
        href: "/case-studies/ses-sns-automation",
        image: {
          src: "/images/generated-trust/dev-dashboard-review.webp",
          alt: "Illustrative view of a team reviewing an operations dashboard",
        },
      },
      {
        category: "Web",
        industry: "Real estate consulting",
        title: "A site that finally explains what the firm does",
        desc: "From articulating the services through to information architecture and build — so prospects read it before the first meeting, and the team can update it in-house.",
        href: "/case-studies/real-estate-consulting-site",
        image: {
          src: "/images/generated-trust/flow-prototype.webp",
          alt: "Illustrative view of a website being reviewed across multiple devices",
        },
      },
    ],
    ctaLabel: "Contact",
    ctaTitle: "Talk to our founder.",
    ctaDesc: (<>No AI expertise needed —<br />we&apos;ll think it through with you, tailored to your situation.</>),
    ctaPrimary: "Book a meeting with our founder",
    ctaSecondary: "Contact us by email",
    ctaNote: "30 minutes online, free of charge. No hard sell.",
  },
};

const TECH_GROUPS: { key: keyof typeof COPY["ja"]["techGroups"]; category: string; items: { name: string; icon: string; color?: string }[] }[] = [
  { key: "frontend", category: "Frontend", items: [
    { name: "Next.js", icon: "logos:nextjs-icon" },
    { name: "React", icon: "logos:react" },
    { name: "TypeScript", icon: "logos:typescript-icon" },
    { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
    { name: "Vite", icon: "logos:vitejs" },
  ]},
  { key: "backend" as const, category: "Backend", items: [
    { name: "Python", icon: "logos:python" },
    { name: "Node.js", icon: "logos:nodejs-icon" },
    { name: "FastAPI", icon: "logos:fastapi-icon" },
    { name: "Go", icon: "simple-icons:go", color: "111827" },
    { name: "Rails", icon: "simple-icons:rubyonrails", color: "111827" },
  ]},
  { key: "aiml" as const, category: "AI / ML", items: [
    { name: "Claude", icon: "simple-icons:anthropic", color: "111827" },
    { name: "OpenAI", icon: "simple-icons:openai", color: "000000" },
    { name: "Gemini", icon: "simple-icons:googlegemini", color: "111827" },
    { name: "PyTorch", icon: "logos:pytorch-icon" },
    { name: "LangChain", icon: "simple-icons:langchain", color: "1C3C3C" },
  ]},
  { key: "mobile" as const, category: "Mobile / Desktop", items: [
    { name: "Swift", icon: "logos:swift" },
    { name: "iOS / macOS", icon: "simple-icons:apple", color: "111827" },
    { name: "Electron", icon: "logos:electron" },
    { name: "Kotlin", icon: "logos:kotlin-icon" },
    { name: "Android", icon: "logos:android-icon" },
  ]},
  { key: "database" as const, category: "Database", items: [
    { name: "PostgreSQL", icon: "logos:postgresql" },
    { name: "MySQL", icon: "logos:mysql-icon" },
    { name: "Redis", icon: "logos:redis" },
    { name: "Supabase", icon: "logos:supabase-icon" },
    { name: "Firebase", icon: "logos:firebase-icon" },
  ]},
  { key: "cloud" as const, category: "Cloud", items: [
    { name: "AWS", icon: "logos:aws" },
    { name: "Google Cloud", icon: "logos:google-cloud" },
    { name: "Vercel", icon: "logos:vercel-icon" },
    { name: "Cloudflare", icon: "logos:cloudflare-icon" },
    { name: "Docker", icon: "logos:docker-icon" },
  ]},
  { key: "biz" as const, category: "Business Integrations", items: [
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
          {logos.map((logo, index) => logo.href ? (
            <a key={`${logo.name}-${index}`} href={logo.href} target="_blank" rel="noopener noreferrer" aria-label={`${logo.name} 公式サイト`} className="shrink-0">
              <Image src={logo.src} alt={`${logo.name} logo`} width={logo.width} height={logo.height} className="h-9 w-auto object-contain opacity-90 transition duration-300 hover:opacity-100 md:h-11" sizes="(max-width: 768px) 160px, 220px" />
            </a>
          ) : (
            <Image key={`${logo.name}-${index}`} src={logo.src} alt={`${logo.name} logo`} width={logo.width} height={logo.height} className="h-9 w-auto shrink-0 object-contain opacity-90 md:h-11" sizes="(max-width: 768px) 160px, 220px" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomeContent({ newsSlot }: { newsSlot: ReactNode }) {
  const { lang } = useLanguage();
  const t = COPY[lang];

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden bg-white pt-20">
        {/* モバイル(2026-08-11指示): 動画は16:9のまま見切れずに全部見せる(PCと同じ絵)。
            タイトルは動画の上に重ね、相談カードはその下に置く。PCは従来通り画面いっぱい */}
        <div className="hero-shell relative overflow-hidden border-b border-gray-200 md:h-[calc(100svh-80px)] md:min-h-[560px]">
          <div
            className="relative aspect-video w-full md:absolute md:inset-y-0 md:right-0 md:aspect-auto md:w-[60%]"
          >
            <video
              src="/videos/hero-robot.mp4"
              poster="/videos/hero-robot-poster.webp"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent md:bg-transparent md:from-white md:via-transparent" />
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-full bg-gradient-to-r from-white via-white/95 to-transparent md:block md:w-[58%]" />

          <div className="relative z-10 mx-auto flex max-w-[1800px] flex-col px-6 pb-6 md:h-full md:min-h-0 md:py-6 lg:px-8">
            {/* 2026-08-10: 上部バッジ／英語小見出し／説明文／✓チップ／数値バッジは
                「見出しだけ残す」方針で削除。COPY 側の定義は残してあるので復活は容易。
                相談パネルはファーストビュー内に収める指示によりヒーロー内へ移動。 */}
            {/* モバイルは負マージンで動画(高さ56.25vw)の上へタイトルを重ねる(h1の重複を作らない) */}
            <div className="-mt-[56.25vw] flex h-[56.25vw] w-full items-center md:mt-0 md:h-auto md:flex-1">
              <div className="w-full max-w-[760px]">
                <h1 className="text-[1.9rem] font-black leading-[1.15] tracking-[-0.045em] text-neutral-900 sm:text-6xl lg:text-[4.2rem] xl:text-[4.45rem] [@media(max-height:800px)_and_(min-width:768px)]:text-[3.25rem] [@media(max-height:800px)_and_(min-width:768px)]:leading-[1.04]">
                  {t.heroTitle}
                </h1>
              </div>
            </div>
            <div className="mx-auto mb-2 mt-5 hidden w-full max-w-[760px] rounded-md border border-[#d4dde5] bg-white px-5 py-6 text-left shadow-[0_16px_40px_-32px_rgba(18,49,75,0.34)] sm:px-7 md:mb-16 md:mt-0 md:block md:py-5 [@media(max-height:800px)_and_(min-width:768px)]:py-3">
            <p className="mb-4 text-base font-black text-neutral-900 md:text-lg [@media(max-height:800px)_and_(min-width:768px)]:mb-2 [@media(max-height:800px)_and_(min-width:768px)]:text-base">
              {lang === "ja" ? "導入のご相談・会社資料" : "Consultation and company information"}
            </p>
            <div className="grid gap-3 md:grid-cols-2">
            <Link href="/download" className="inline-flex min-h-[58px] items-center justify-center gap-3 rounded-md border border-[#315b73] bg-white px-6 py-3 text-sm font-bold text-neutral-900 transition hover:bg-[#eef2f5] md:min-h-[52px] md:text-base [@media(max-height:800px)_and_(min-width:768px)]:min-h-11 [@media(max-height:800px)_and_(min-width:768px)]:py-2">
              <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2h9l3 3v17H6z" />
                <path d="M14 2v4h4M9 11h6M9 15h6" />
              </svg>
              {t.heroSecondary}
            </Link>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[58px] items-center justify-center gap-3 rounded-md bg-cta px-6 py-3 text-sm font-bold text-white transition hover:bg-cta-hover md:min-h-[52px] md:text-base [@media(max-height:800px)_and_(min-width:768px)]:min-h-11 [@media(max-height:800px)_and_(min-width:768px)]:py-2">
              <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="17" rx="2" />
                <path d="M8 2v4M16 2v4M3 9h18M8 13h3M8 17h6" />
              </svg>
              {t.heroPrimary}
            </a>
            </div>
            </div>
          </div>
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

      {/* ═══ CLIENT LOGOS ═══ */}
      <section className="pb-10 pt-2 md:pb-16 md:pt-4 bg-white border-b border-gray-100">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <ClientLogoMarquee label={t.clientLogosLabel} />
        </div>
      </section>

      {/* ═══ CASE STUDIES ═══ */}
      <section className="py-8 md:py-20 lg:py-28 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="flex items-end justify-between mb-6 md:mb-12 gap-6">
              <div>
                <SectionLabel>{t.casesLabel}</SectionLabel>
                <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.casesTitle}</h2>
                <p className="text-base text-gray-500 leading-relaxed max-w-2xl">{t.casesDesc}</p>
              </div>
              <Link
                href="/case-studies"
                className="hidden sm:inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-neutral-900 hover:text-neutral-700 transition-colors"
              >
                {t.casesCta}
              </Link>
            </div>
          </Reveal>
          <CardCarousel>
            {t.cases.map((c, i) => (
              <Reveal key={c.href} delay={i * 80}>
                <Link href={c.href} className="group block h-full">
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden h-full flex flex-col hover:border-neutral-900 hover:shadow-lg transition-all duration-300">
                    <div className="relative aspect-[3/2] w-full overflow-hidden bg-neutral-100">
                      <Image
                        src={c.image.src}
                        alt={c.image.alt}
                        fill
                        sizes="(max-width: 639px) 80vw, (max-width: 767px) 55vw, (max-width: 1023px) calc((100vw - 6rem) / 3), (max-width: 1799px) calc((100vw - 7rem) / 3), 563px"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="p-8 flex flex-1 flex-col">
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="text-[11px] font-semibold tracking-wide text-white bg-neutral-900 px-2.5 py-1 rounded">
                          {c.category}
                        </span>
                        <span className="text-xs text-gray-500">{c.industry}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 leading-snug mb-3">{c.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed flex-1">{c.desc}</p>
                      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900">
                        {t.casesCardAction}
                        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </CardCarousel>
          <p className="mt-8 text-xs text-gray-600 leading-relaxed">{t.casesNote}</p>
          <div className="text-center mt-6 sm:hidden">
            <Link href="/case-studies" className="text-sm font-semibold text-neutral-900">{t.casesCta}</Link>
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

      {/* ═══ TECH STACK ═══ */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <SectionLabel>{t.techLabel}</SectionLabel>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.techTitle}</h2>
            <p className="text-base text-gray-500 w-full leading-relaxed mb-8">{t.techDesc}</p>
          </Reveal>
          <div className="space-y-0">
            {TECH_GROUPS.map((group, gi) => (
              <Reveal key={group.key} delay={gi * 40}>
                <div className="border-t border-gray-200 py-5">
                  <div className="grid lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-2">
                      <p className="text-[10px] font-semibold tracking-widest text-neutral-900 uppercase">{group.category}</p>
                      <h3 className="text-sm font-bold text-gray-900 mt-0.5">{t.techGroups[group.key as keyof typeof t.techGroups]}</h3>
                    </div>
                    <div className="lg:col-span-10">
                      <div className="grid grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
                        {group.items.map((tech) => (
                          <div key={tech.name} className="bg-white border border-gray-200 rounded-lg px-3.5 py-2 flex items-center gap-2.5 hover:border-gray-300 transition-colors">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={`https://api.iconify.design/${tech.icon}.svg${"color" in tech && tech.color ? `?color=%23${tech.color}` : ''}`} alt="" aria-hidden className="w-8 h-8 object-contain" loading="lazy" />
                            <p className="text-xs font-medium text-gray-600 text-center leading-tight">{tech.name}</p>
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
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
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
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-8 md:mb-12">
              <SectionLabel>{t.ctaLabel}</SectionLabel>
              <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-6">{t.ctaTitle}</h2>
              <p className="text-base text-gray-600 leading-relaxed">{t.ctaDesc}</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-md bg-cta text-white text-sm font-semibold px-8 min-h-[52px] py-3.5 hover:bg-cta-hover transition-colors duration-300"
              >
                {t.ctaPrimary}
                <span aria-hidden>→</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex w-full sm:w-auto justify-center items-center rounded-md border border-gray-200 text-gray-600 text-sm font-semibold px-8 min-h-[52px] py-3.5 hover:border-gray-400 hover:text-gray-900 transition-colors duration-300"
              >
                {t.ctaSecondary}
              </Link>
            </div>
            <p className="text-center text-xs text-gray-400 mt-5">{t.ctaNote}</p>
          </Reveal>
        </div>
      </section>

      <div className="h-20 md:hidden" aria-hidden="true" />
      <nav data-mobile-cta aria-label={lang === "ja" ? "お問い合わせ" : "Contact actions"} className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white/95 px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(15,23,42,0.10)] backdrop-blur md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-2 gap-2">
          <Link href="/download" className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#315b73] px-3 text-xs font-bold text-neutral-900">
            {lang === "ja" ? "会社資料" : "Company guide"}
          </Link>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-md bg-cta px-3 text-xs font-bold text-white">
            {lang === "ja" ? "無料相談" : "Free consultation"}
          </a>
        </div>
      </nav>
    </>
  );
}

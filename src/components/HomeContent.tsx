"use client";

/*
 * トップページ構成（ノーコード総合研究所型のセクション順を踏襲）
 *   HERO → REASON(選ばれる理由) → SIMULATION(1分見積り) → SERVICE(事業内容)
 *   → WORKS(実績) → PROCESS(導入の流れ) → TEAM → TECH → Q&A → BLOGS/NEWS → CONTACT
 *
 * 事業内容は3本柱:
 *   01 フィジカルAI受託開発 / 02 ロボットレンタル / 03 AI研修
 * その他の支援（顧問・Web・広告 等）は補助導線として下段に残し、内部リンクを維持する。
 */

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import CardCarousel from "@/components/CardCarousel";
import CountUp from "@/components/CountUp";
import InlineContactForm from "@/components/InlineContactForm";
import QuoteSimulator from "@/components/QuoteSimulator";

/* Scroll-triggered reveal - simplified, up direction only */
function Reveal({ children, className = "", delay = 0, variant = "up" }: { children: ReactNode; className?: string; delay?: number; variant?: "up" | "scale" | "left" }) {
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
  const hiddenTransform =
    variant === "scale" ? "scale(0.96)" : variant === "left" ? "translateX(-24px)" : "translateY(24px)";
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : hiddenTransform,
      transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    }}>{children}</div>
  );
}

/* Dossier section header — §NN chapter marker + mono kicker (dark-capable) */
function SectionHead({
  index,
  kicker,
  title,
  desc,
  dark = false,
  className = "",
}: {
  index: string;
  kicker: ReactNode;
  title: ReactNode;
  desc?: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={`mb-8 md:mb-7 lg:mb-9 ${className}`}>
      <div className={`flex items-center gap-4 border-b pb-4 ${dark ? "border-white/25" : "border-neutral-900"}`}>
        <span className={`font-mono text-xs font-bold tabular-nums ${dark ? "text-white" : "text-neutral-900"}`}>§{index}</span>
        <span className={`font-mono text-[11px] font-medium uppercase tracking-[0.25em] ${dark ? "text-neutral-400" : "text-neutral-500"}`}>{kicker}</span>
      </div>
      <h2 className={`mt-6 md:mt-8 text-[18px] sm:text-xl lg:text-2xl font-bold leading-[1.15] sm:leading-[1.05] tracking-[-0.02em] text-balance ${dark ? "text-white" : "text-neutral-900"}`}>
        {title}
      </h2>
      {desc && <p className={`mt-5 max-w-2xl text-[15px] leading-relaxed text-pretty ${dark ? "text-neutral-400" : "text-neutral-600"}`}>{desc}</p>}
    </Reveal>
  );
}

type CoreSvc = {
  code: string;
  title: string;
  lead: string;
  points: string[];
  tags: string[];
  price: string;
  priceNote: string;
  href: string;
  cta: string;
  badge?: string;
};

type SubSvc = { code: string; title: string; desc: string; href: string };

type WorkItem = { tag: string; title: string; desc: string; metrics: string[]; href: string };

type HomeCopy = {
  heroTitle: ReactNode;
  heroDesc: ReactNode;
  heroChecks: { strong: string; rest: string }[];
  heroPrimary: string;
  heroSecondary: string;
  trustStats: { value: string; label: string }[];
  clientLogosLabel: string;

  reasonLabel: string; reasonTitle: string; reasonDesc: string;
  reasons: { title: string; desc: string }[];

  simLabel: string; simTitle: string; simDesc: string;

  servicesLabel: string; servicesTitle: string; servicesDesc: string;
  coreHeading: string; subHeading: string;
  coreServices: CoreSvc[];
  subServices: SubSvc[];

  worksLabel: string; worksTitle: string; worksDesc: string; worksNote: string;
  works: WorkItem[];

  processLabel: string; processTitle: string; processDesc: string;
  process: { num: string; title: string; desc: string; duration: string }[];

  teamLabel: string; teamTitle: ReactNode; teamDesc: string;
  teamCard1Label: string; teamCard1Title: string; teamCard1Desc: string; teamCard1Tags: string[];
  teamCard2Label: string; teamCard2Title: string; teamCard2Desc: string; teamCard2Tags: string[];

  techLabel: string; techTitle: string; techDesc: string;
  techMoreTitle: string; techMoreDesc: string;

  faqLabel: string; faqTitle: string; faqDesc: string; faqCta: string;
  faq: { q: string; a: string }[];

  newsLabel: string; newsTitle: string; newsCta: string;

  ctaLabel: string; ctaTitle: string; ctaDesc: ReactNode;
  ctaCards: { label: string; service: string }[];
  ctaCardAction: string; ctaOthers: string;
};

const COPY: Record<"ja" | "en", HomeCopy> = {
  ja: {
    heroTitle: (
      <>
        <span className="block">フィジカルAIの受託開発・</span>
        <span className="block">ロボットレンタル・AI研修</span>
      </>
    ),
    heroDesc: (
      <>ロボットとAIを、中小企業の現場で本当に動くところまで。<br className="hidden md:inline" />
      構想・開発・実証・内製化まで、clearAIが一社で伴走します。</>
    ),
    heroChecks: [
      { strong: "1/3の期間とコスト", rest: "で現場実装まで到達" },
      { strong: "助成金で最大75%OFF", rest: "、研修費の実質負担を圧縮" },
    ],
    heroPrimary: "無料で相談する",
    heroSecondary: "1分見積りをする",
    trustStats: [
      { value: "最大75%", label: "研修費を助成金で削減" },
      { value: "無料", label: "30分のAI・ロボット診断" },
      { value: "全国対応", label: "オンライン／現地実施" },
      { value: "2営業日", label: "初回返信" },
    ],
    clientLogosLabel: "取引・支援実績",

    reasonLabel: "Reason",
    reasonTitle: "clearAIが選ばれる理由",
    reasonDesc: "ソフトウェアだけでも、ハードウェアだけでもない。現場で動く一台と、それを使いこなす人まで一気通貫で用意できることが私たちの強みです。",
    reasons: [
      { title: "ロボットとAIを一社で", desc: "機体の調達・レンタルから、AIによる制御・業務連携の受託開発、現場オペレーションの設計まで、切れ目なく一社で担います。ベンダーをまたぐ調整コストが発生しません。" },
      { title: "買う前に、現場で試せる", desc: "数百万〜数千万円の機体をいきなり購入する必要はありません。1日単位のレンタルで自社の現場に持ち込み、本当に使えるかを確かめてから投資判断ができます。" },
      { title: "作って終わりにしない", desc: "納品して撤収ではなく、社員がAIで自分の業務システムを作れるようになるまで研修で伴走します。外注依存を残さず、社内に運用能力を残します。" },
      { title: "補助金・助成金をフル活用", desc: "人材開発支援助成金・IT導入補助金などの活用を前提に設計するため、研修費は最大75%、導入コストも大幅に圧縮した状態でスタートできます。" },
    ],

    simLabel: "Simulation",
    simTitle: "料金シミュレーションで1分見積り",
    simDesc: "受託開発・ロボットレンタル・AI研修のいずれも、選択式で概算の費用と期間をその場で確認できます。",

    servicesLabel: "Service",
    servicesTitle: "事業内容",
    servicesDesc: "フィジカルAI受託開発・ロボットレンタル・AI研修の3本柱。試す・作る・使いこなす、のすべてを支えます。",
    coreHeading: "3つの主力事業",
    subHeading: "その他の支援",
    coreServices: [
      {
        code: "01",
        title: "フィジカルAI受託開発",
        lead: "ロボット・現場設備とAIをつなぎ、実際に動くシステムとして開発・納品します。",
        points: [
          "ロボット制御・業務システム連携の受託開発",
          "PoCから本番実装・運用保守まで一貫対応",
          "ソースコード・IPはすべて顧客に帰属",
        ],
        tags: ["ロボット制御", "AIエージェント", "画像認識", "現場統合"],
        price: "150万円〜",
        priceNote: "PoCパック（約4〜6週間）／本番開発は600万円〜",
        href: "/physical-ai",
        cta: "詳しく見る",
      },
      {
        code: "02",
        title: "ロボットレンタル",
        lead: "ヒューマノイド・四足歩行ロボットを1日から。買う前に、自社の現場で確かめられます。",
        points: [
          "Unitree・AgiBot・Boston Dynamics 等を取り扱い",
          "四足歩行は1日1万円から、ヒューマノイドは10万円から",
          "オペレーター同行・搬入設置代行にも対応",
        ],
        tags: ["Unitree", "AgiBot", "1日〜", "PoC・展示"],
        price: "1万円〜/日",
        priceNote: "Unitree Go2（四足歩行）1日あたり・税込",
        href: "/robot-rental",
        cta: "機体一覧を見る",
      },
      {
        code: "03",
        title: "AI研修",
        lead: "社員が自分の業務システムを作り切れるようになる、実践型のAI研修プログラム。",
        points: [
          "経営層・管理職・現場担当まで階層別に設計",
          "Claude / Vibe Coding での内製化ハンズオン",
          "助成金申請までサポート、実質負担は最大1/4",
        ],
        tags: ["階層別研修", "Vibe Coding", "Claude", "助成金対応"],
        price: "20万円〜",
        priceNote: "スポット研修1回あたり／パッケージは80万円〜（3ヶ月）",
        href: "/training",
        cta: "研修プログラムを見る",
        badge: "助成金 最大75%OFF",
      },
    ],
    subServices: [
      { code: "04", title: "AIエージェント開発", desc: "業務を任せられる自律型AIエージェントを設計・開発・運用します。", href: "/ai-agent" },
      { code: "05", title: "空間3Dスキャン", desc: "現場をカメラで3Dデータ化し、ロボット導入の台数・ルートを事前設計します。", href: "/spatial-scan" },
      { code: "06", title: "AI顧問", desc: "外部AI顧問として、技術選定からPoC評価・内製化まで継続的に伴走します。", href: "/advisor" },
      { code: "07", title: "AIコンサル・DX", desc: "大手コンサル出身者の監修で、戦略策定から実装・運用まで一気通貫で支援します。", href: "/ai-consulting" },
      { code: "08", title: "補助金サポート", desc: "対象制度の見極めから申請書類まで、研修・導入費の圧縮をサポートします。", href: "/subsidy" },
      { code: "09", title: "Claude特化導入", desc: "Anthropic Claudeの業務導入・運用定着に特化した支援を提供します。", href: "/claude" },
      { code: "10", title: "ウェブサイト作成", desc: "Next.js + Vercel で、表示速度・SEO・運用性を最高水準にしたサイトを制作します。", href: "/website" },
      { code: "11", title: "AI広告運用", desc: "クリエイティブ生成から効果検証までAIで最適化し、ROAS改善に伴走します。", href: "/advertising" },
      { code: "12", title: "SNS運用代行", desc: "AI活用でSNSの企画・制作・投稿・分析までを代行します。", href: "/sns" },
    ],

    worksLabel: "Works",
    worksTitle: "現場で動かしてきた領域",
    worksDesc: "点検・巡回から接客・展示、製造ラインの効率化まで。ロボットとAIを組み合わせて成果を出せる領域を、業種横断で扱っています。",
    worksNote: "※ 掲載内容は当社が対応可能なプロジェクト類型です。個別の導入事例は守秘義務の範囲で個別にご説明します。",
    works: [
      {
        tag: "点検・巡回",
        title: "四足歩行ロボットによる設備点検の自動化",
        desc: "工場・プラント・倉庫を四足歩行ロボットが自律巡回し、計器の読み取り・異音検知・異常箇所の撮影までを自動化。夜間・休日の無人点検にも対応します。",
        metrics: ["Unitree Go2 / B2", "自律巡回ルート設計", "画像認識による異常検知"],
        href: "/physical-ai",
      },
      {
        tag: "接客・展示",
        title: "ヒューマノイドによる受付・イベント演出",
        desc: "展示会・商業施設・企業受付でヒューマノイドが案内・対話・撮影対応を行う体験を構築。集客とメディア露出を同時に取りにいく施策として設計します。",
        metrics: ["Unitree G1 / AgiBot A2", "対話シナリオ設計", "レンタル1日から"],
        href: "/robot-rental",
      },
      {
        tag: "業務自動化",
        title: "AIエージェントによる基幹業務の自動化",
        desc: "問い合わせ対応・書類作成・データ集計といった定型業務を、社内システムに接続した自律型AIエージェントへ移管。例外処理はHuman-in-the-loopで担保します。",
        metrics: ["社内システム連携", "評価・監視ダッシュボード", "運用Runbook納品"],
        href: "/ai-agent",
      },
      {
        tag: "内製化",
        title: "非エンジニア社員による業務ツールの内製",
        desc: "Claude・Vibe Coding の実践研修を通じて、現場社員がExcel集計・申請フォーム・日報集約といったツールを自分で作れる状態へ。外注依存を段階的に解消します。",
        metrics: ["階層別カリキュラム", "助成金 最大75%", "研修後のSlackサポート"],
        href: "/training",
      },
    ],

    processLabel: "Flow",
    processTitle: "ご相談から導入までの流れ",
    processDesc: "初回相談は無料。無理な営業はせず、貴社のペースに合わせて進めます。",
    process: [
      { num: "01", title: "無料相談・現場ヒアリング", desc: "現状の課題と現場条件をうかがい、ロボット・AIで効果が出そうな領域を一緒に特定します（30分・オンライン可）。", duration: "30分" },
      { num: "02", title: "ご提案・お見積り", desc: "受託開発・レンタル・研修のうち最適な組み合わせと、費用・スケジュール・使える補助金をご提案します。", duration: "1〜2週間" },
      { num: "03", title: "レンタル実証・PoC", desc: "いきなり買わず・作らず、まずはレンタル機体や小規模PoCで現場適合性を検証します。", duration: "1日〜6週間" },
      { num: "04", title: "本番開発・導入", desc: "検証結果をもとに本番システムを開発し、既存システム連携・監視・運用手順の整備まで行います。", duration: "3〜6ヶ月" },
      { num: "05", title: "研修・内製化・運用", desc: "社員向け研修で運用能力を社内に残し、稼働後も品質モニタリングと改善を継続します。", duration: "継続" },
    ],

    teamLabel: "Team",
    teamTitle: (<>戦略から実装・運用まで、<br className="hidden sm:inline" />信頼できるプロフェッショナルが担います。</>),
    teamDesc: "経営コンサルの視座と現場で鍛え上げたエンジニアリングの実装力を掛け合わせ、提案だけで終わらせず稼働するシステムと継続的な価値創出まで一貫して責任を持ちます。",
    teamCard1Label: "Strategy & DX",
    teamCard1Title: "業務改革・DX領域の監修",
    teamCard1Desc: "大手コンサルティングファーム出身のメンバーが、経営課題の構造化から全社展開のロードマップまで、上流の意思決定に耐える品質で業務改革・DX推進の設計を監修します。",
    teamCard1Tags: ["大手コンサルファーム出身", "業務改革", "DX戦略", "全社展開"],
    teamCard2Label: "Engineering",
    teamCard2Title: "開発・デプロイ・メンテナンス",
    teamCard2Desc: "AIコンサルティング経験が豊富なエンジニア、シリコンバレーでバックエンド開発に従事した技術者、高専から筑波大学に進学し応用情報技術者を持つ情報技術者などが、システムの開発・デプロイ・運用保守からリリース後の信頼性の担保まで一貫して責任を持ちます。",
    teamCard2Tags: ["AIコンサル経験豊富", "シリコンバレー開発経験", "高専→筑波大学", "応用情報技術者"],

    techLabel: "Tech Stack",
    techTitle: "使用技術",
    techDesc: "中小企業でも安心して導入できるよう、実績・安定性・サポート体制が確立された技術のみを採用しています。",
    techMoreTitle: "上記以外の技術にも対応可能",
    techMoreDesc: "お客様の既存環境・社内標準・業界要件に合わせて、記載以外の言語・フレームワーク・クラウド・SaaS連携にも柔軟に対応いたしますので、まずはお気軽にご相談ください。",

    faqLabel: "Q&A",
    faqTitle: "よくある質問",
    faqDesc: "ご相談前によく寄せられる質問をまとめました。",
    faqCta: "すべての質問を見る →",
    faq: [
      { q: "フィジカルAIとは何ですか？", a: "カメラ・センサー・ロボットなど物理的な機器と生成AIを組み合わせ、現実世界で作業や判断を行わせる技術領域を指します。画面の中だけで完結する従来のAIと異なり、点検・搬送・接客といった現場作業そのものを対象にできる点が特徴です。clearAIはこの領域の受託開発を行っています。" },
      { q: "ロボットは買わずにレンタルだけでも使えますか？", a: "はい。四足歩行ロボットは1日1万円から、ヒューマノイドは1日10万円からレンタルいただけます。展示会での1日利用から、現場PoCのための1ヶ月利用まで対応しており、購入前の適合性検証としてご利用いただくケースが最も多いです。" },
      { q: "AIの知識がない社員でも研修についていけますか？", a: "問題ありません。コードを書いた経験がない社員を前提に設計しており、AIへ日本語で指示するだけで業務ツールを作る「Vibe Coding」形式のハンズオンから始めます。階層別（経営層・管理職・現場担当）にカリキュラムを分けているため、役割に必要な内容だけを学べます。" },
      { q: "補助金・助成金は使えますか？", a: "使えます。研修では厚生労働省の人材開発支援助成金により、中小企業は研修経費の最大75%と受講者の賃金が助成対象になります。AI導入・システム開発ではIT導入補助金などが該当する場合があり、対象制度の見極めから申請書類の作成までサポートします。" },
      { q: "開発期間と費用はどのくらいかかりますか？", a: "フィジカルAIの受託開発は、PoCパックが150万円・約4〜6週間、本番実装が600万円〜・3〜6ヶ月が目安です。研修はスポット20万円〜、パッケージ80万円〜（3ヶ月）。上部の料金シミュレーションで、条件を選ぶだけで概算をその場で確認できます。" },
      { q: "地方の中小企業でも対応してもらえますか？", a: "対応可能です。clearAIは茨城県を拠点に全国対応しており、研修・打ち合わせはオンラインで実施できます。ロボットの搬入設置やオペレーター同行が必要な場合も、現地への出張対応を行っています。" },
    ],

    newsLabel: "News",
    newsTitle: "ブログ・お知らせ",
    newsCta: "一覧を見る →",

    ctaLabel: "Contact",
    ctaTitle: "まずは、お話ししませんか。",
    ctaDesc: (<>AIやロボットのことがわからなくても大丈夫、<br />貴社の状況に合わせて一緒に考えます。</>),
    ctaCards: [
      { label: "フィジカルAI受託開発", service: "physical-ai" },
      { label: "ロボットレンタル", service: "robot-rental" },
      { label: "AI研修・教育", service: "education" },
      { label: "AIエージェント開発", service: "ai-agent" },
      { label: "空間3Dスキャン", service: "spatial-scan" },
      { label: "AI顧問", service: "advisor" },
    ],
    ctaCardAction: "お問い合わせ →",
    ctaOthers: "その他のお問い合わせはこちら →",
  },

  en: {
    heroTitle: (
      <>
        <span className="block">Physical AI development,</span>
        <span className="block">robot rental &amp; AI training</span>
      </>
    ),
    heroDesc: (
      <>Robots and AI, taken all the way to working on your floor.<br className="hidden md:inline" />
      From concept and build to on-site proof and in-house capability — one partner throughout.</>
    ),
    heroChecks: [
      { strong: "One third the time and cost", rest: " to reach real deployment" },
      { strong: "Up to 75% off with subsidies", rest: " on training investment" },
    ],
    heroPrimary: "Book a free consultation",
    heroSecondary: "Get a 1-minute estimate",
    trustStats: [
      { value: "Up to 75%", label: "Training cost cut by subsidies" },
      { value: "Free", label: "30-min AI & robotics assessment" },
      { value: "Nationwide", label: "Online or on-site" },
      { value: "2 business days", label: "First reply" },
    ],
    clientLogosLabel: "Client Work",

    reasonLabel: "Reason",
    reasonTitle: "Why companies choose clearAI",
    reasonDesc: "Not software alone, not hardware alone. Our strength is delivering both the machine that works on your floor and the people who can run it.",
    reasons: [
      { title: "Robots and AI from one partner", desc: "Sourcing and rental of the machine, custom development of the AI control and system integration, and the design of on-site operations — all handled in-house, with no cross-vendor coordination overhead." },
      { title: "Try it before you buy it", desc: "You don't have to commit millions of yen up front. Rent by the day, bring the robot onto your own site, and decide on the investment only after you've seen it work." },
      { title: "We don't stop at delivery", desc: "Instead of handing over and leaving, we train your staff until they can build their own systems with AI — leaving operational capability inside your company rather than dependence on us." },
      { title: "Subsidies used to the full", desc: "We design engagements around Japan's HR development and IT-introduction subsidies, so training costs drop by up to 75% and rollout costs shrink substantially from day one." },
    ],

    simLabel: "Simulation",
    simTitle: "Get a ballpark in one minute",
    simDesc: "For development, rental, or training alike — pick a few options and see an estimated cost and timeline immediately.",

    servicesLabel: "Service",
    servicesTitle: "What we do",
    servicesDesc: "Three core businesses — physical AI development, robot rental, and AI training — covering trying it, building it, and mastering it.",
    coreHeading: "Three core businesses",
    subHeading: "Other support",
    coreServices: [
      {
        code: "01",
        title: "Physical AI development",
        lead: "We connect robots and on-site equipment with AI, and deliver it as a system that actually runs.",
        points: [
          "Custom development of robot control and system integration",
          "End-to-end from PoC to production and maintenance",
          "Source code and IP belong entirely to you",
        ],
        tags: ["Robot control", "AI agents", "Computer vision", "Site integration"],
        price: "From JPY 1.5M",
        priceNote: "PoC pack (approx. 4–6 weeks); production builds from JPY 6M",
        href: "/physical-ai",
        cta: "Learn more",
      },
      {
        code: "02",
        title: "Robot rental",
        lead: "Humanoids and quadrupeds from a single day — verify on your own site before you buy.",
        points: [
          "Unitree, AgiBot, Boston Dynamics and more",
          "Quadrupeds from JPY 10,000/day, humanoids from JPY 100,000/day",
          "Operator accompaniment and delivery/setup available",
        ],
        tags: ["Unitree", "AgiBot", "From 1 day", "PoC & events"],
        price: "From JPY 10,000/day",
        priceNote: "Unitree Go2 (quadruped), per day, tax included",
        href: "/robot-rental",
        cta: "See the lineup",
      },
      {
        code: "03",
        title: "AI training",
        lead: "Hands-on programs that take employees all the way to building their own working systems.",
        points: [
          "Designed by level — executives, managers, front-line staff",
          "In-house build workshops with Claude and Vibe Coding",
          "Subsidy paperwork included; net cost as low as a quarter",
        ],
        tags: ["By level", "Vibe Coding", "Claude", "Subsidy-ready"],
        price: "From JPY 200,000",
        priceNote: "Per one-off session; packages from JPY 800,000 (3 months)",
        href: "/training",
        cta: "View programs",
        badge: "Up to 75% subsidy",
      },
    ],
    subServices: [
      { code: "04", title: "AI agent development", desc: "Design, build, and operate autonomous AI agents you can delegate work to.", href: "/ai-agent" },
      { code: "05", title: "3D spatial scan", desc: "Turn your site into 3D data and plan robot fleet size and routes before deployment.", href: "/spatial-scan" },
      { code: "06", title: "AI advisor", desc: "An outside AI advisor for tool selection, PoC review, and in-house enablement.", href: "/advisor" },
      { code: "07", title: "AI consulting & DX", desc: "Overseen by ex-top-tier consultants, from strategy through implementation and operation.", href: "/ai-consulting" },
      { code: "08", title: "Subsidy support", desc: "From identifying the right program to preparing the paperwork that cuts your costs.", href: "/subsidy" },
      { code: "09", title: "Claude specialization", desc: "Dedicated support for adopting and embedding Anthropic Claude into your operations.", href: "/claude" },
      { code: "10", title: "Website production", desc: "Next.js + Vercel builds with top-tier speed, SEO, and ease of operation.", href: "/website" },
      { code: "11", title: "AI advertising", desc: "AI-optimized ad operations from creative generation through measurement and ROAS.", href: "/advertising" },
      { code: "12", title: "SNS management", desc: "AI-powered planning, production, posting, and analytics for your social channels.", href: "/sns" },
    ],

    worksLabel: "Works",
    worksTitle: "Where we put robots and AI to work",
    worksDesc: "From inspection and patrol to reception and events, and on to manufacturing efficiency — we work across industries wherever robots and AI can produce a result.",
    worksNote: "* These are the types of project we can take on. Individual client engagements are discussed privately, within our confidentiality obligations.",
    works: [
      {
        tag: "Inspection",
        title: "Automated equipment inspection with quadruped robots",
        desc: "A quadruped patrols your plant, factory, or warehouse autonomously — reading gauges, detecting abnormal sounds, and photographing anomalies, including unmanned checks at night and on weekends.",
        metrics: ["Unitree Go2 / B2", "Autonomous route design", "Vision-based anomaly detection"],
        href: "/physical-ai",
      },
      {
        tag: "Reception & events",
        title: "Humanoid reception and event experiences",
        desc: "Humanoids that guide, converse, and pose for photos at trade shows, commercial facilities, and corporate receptions — designed to win footfall and media coverage at the same time.",
        metrics: ["Unitree G1 / AgiBot A2", "Dialogue scenario design", "Rental from one day"],
        href: "/robot-rental",
      },
      {
        tag: "Automation",
        title: "Core workflows automated with AI agents",
        desc: "Routine work — inquiry handling, document preparation, data aggregation — moved onto autonomous AI agents wired into your internal systems, with exceptions held by a human in the loop.",
        metrics: ["Internal system integration", "Evaluation dashboards", "Operations runbook delivered"],
        href: "/ai-agent",
      },
      {
        tag: "In-house capability",
        title: "Non-engineers building their own tools",
        desc: "Through hands-on Claude and Vibe Coding training, front-line staff learn to build their own spreadsheets, forms, and reporting tools — steadily reducing dependence on outsourcing.",
        metrics: ["Curriculum by level", "Up to 75% subsidy", "Post-training Slack support"],
        href: "/training",
      },
    ],

    processLabel: "Flow",
    processTitle: "From first call to deployment",
    processDesc: "The first consultation is free. No hard sell — we move at your pace.",
    process: [
      { num: "01", title: "Free consult & site review", desc: "We listen to your challenges and site conditions and identify together where robots and AI would pay off (30 min, online available).", duration: "30 min" },
      { num: "02", title: "Proposal & quote", desc: "We propose the right mix of development, rental, and training — with cost, schedule, and applicable subsidies.", duration: "1–2 weeks" },
      { num: "03", title: "Rental trial / PoC", desc: "Before buying or building anything, we validate fit on your site with a rental unit or a small PoC.", duration: "1 day – 6 weeks" },
      { num: "04", title: "Production build & rollout", desc: "We build the production system from what the trial proved, including integrations, monitoring, and operating procedures.", duration: "3–6 months" },
      { num: "05", title: "Training, enablement & operations", desc: "Training leaves the operating capability inside your team, and we keep monitoring and improving after go-live.", duration: "Ongoing" },
    ],

    teamLabel: "Team",
    teamTitle: (<>From strategy to implementation and operation,<br className="hidden sm:inline" />trusted professionals see it through.</>),
    teamDesc: "Combining management-consulting perspective with field-forged engineering execution, we don't stop at proposals — we own working systems and continuous value all the way through.",
    teamCard1Label: "Strategy & DX",
    teamCard1Title: "Business transformation & DX oversight",
    teamCard1Desc: "Members with backgrounds at top-tier consulting firms oversee business-transformation and DX design — from structuring management issues to company-wide rollout roadmaps, at quality that stands up to upstream decision-making.",
    teamCard1Tags: ["Top-tier consulting background", "Business transformation", "DX strategy", "Company-wide rollout"],
    teamCard2Label: "Engineering",
    teamCard2Title: "Development, deployment & maintenance",
    teamCard2Desc: "Engineers with deep AI-consulting experience, backend developers who worked in Silicon Valley, and Applied Information Technology engineers (Kosen → University of Tsukuba) build, deploy, and maintain our systems — owning reliability after release.",
    teamCard2Tags: ["AI consulting experience", "Silicon Valley development", "Kosen → U. of Tsukuba", "Applied Information Technology"],

    techLabel: "Tech Stack",
    techTitle: "Technologies we use",
    techDesc: "We only adopt technologies with proven track record, stability, and strong support — so SMEs can deploy with confidence.",
    techMoreTitle: "We also support technologies beyond this list",
    techMoreDesc: "We flexibly support languages, frameworks, clouds, and SaaS integrations beyond this list — tailored to your environment, internal standards, and industry requirements — so please reach out.",

    faqLabel: "Q&A",
    faqTitle: "Frequently asked questions",
    faqDesc: "A few questions we're often asked before getting started.",
    faqCta: "See all questions →",
    faq: [
      { q: "What is physical AI?", a: "It refers to combining generative AI with physical devices — cameras, sensors, robots — so that work and judgement happen in the real world. Unlike AI that stays on a screen, it can take on the actual floor work: inspection, transport, reception. clearAI builds custom systems in this space." },
      { q: "Can we rent robots without buying them?", a: "Yes. Quadrupeds start at JPY 10,000 per day and humanoids at JPY 100,000 per day. Engagements range from a single day at a trade show to a month-long on-site PoC — most often as a fit check before purchase." },
      { q: "Can staff with no AI knowledge keep up with the training?", a: "Yes. The programs assume participants have never written code, starting with hands-on 'Vibe Coding' where you build a working tool by instructing AI in plain Japanese. Curricula are split by level — executives, managers, front-line staff — so people learn only what their role needs." },
      { q: "Can we use government subsidies?", a: "Yes. For training, Japan's HR Development Support Subsidy covers up to 75% of course costs plus participant wages for SMEs. For AI adoption and system development, programs such as the IT Introduction Subsidy may apply, and we support everything from eligibility assessment to the application paperwork." },
      { q: "How long does development take and what does it cost?", a: "For physical AI development, the PoC pack is JPY 1.5M over roughly 4–6 weeks, and production implementation starts at JPY 6M over 3–6 months. Training starts at JPY 200,000 for a one-off and JPY 800,000 for a 3-month package. The simulator above gives you an instant estimate." },
      { q: "Do you work with SMEs outside major cities?", a: "Yes. clearAI is based in Ibaraki Prefecture and works nationwide, with training and meetings available online. Where robot delivery, setup, or an operator on site is needed, we travel to you." },
    ],

    newsLabel: "News",
    newsTitle: "Blog & News",
    newsCta: "View all →",

    ctaLabel: "Contact",
    ctaTitle: "Let's start with a conversation.",
    ctaDesc: (<>No AI or robotics expertise needed —<br />we'll think it through with you, tailored to your situation.</>),
    ctaCards: [
      { label: "Physical AI development", service: "physical-ai" },
      { label: "Robot rental", service: "robot-rental" },
      { label: "AI training", service: "education" },
      { label: "AI agent development", service: "ai-agent" },
      { label: "3D spatial scan", service: "spatial-scan" },
      { label: "AI advisor", service: "advisor" },
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
  { name: "ノイアーエーテル", src: "/images/clients/noir-aether.png", width: 656, height: 686 },
  { name: "Wave Leaf", src: "/images/clients/wave-leaf.png", width: 1164, height: 324 },
  { name: "AT", src: "/images/clients/at.png", width: 1030, height: 838 },
  { name: "Crew Robotics", src: "/images/clients/crew-robotics.png", width: 1791, height: 261 },
  { name: "ICONIQ", src: "/images/clients/iconiq.png", width: 1436, height: 304 },
];

// 使用技術ロゴは public/logos/tech/ にself-host（外部CDN依存を排除・確実に色付き表示）。
const techSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const TECH_GROUPS: { items: { name: string }[] }[] = [
  { items: [
    { name: "Next.js" }, { name: "React" }, { name: "TypeScript" }, { name: "Tailwind CSS" }, { name: "Vite" },
  ]},
  { items: [
    { name: "Python" }, { name: "Node.js" }, { name: "FastAPI" }, { name: "Go" }, { name: "Rails" },
  ]},
  { items: [
    { name: "Claude" }, { name: "OpenAI" }, { name: "Gemini" }, { name: "PyTorch" }, { name: "LangChain" },
  ]},
  { items: [
    { name: "PostgreSQL" }, { name: "MySQL" }, { name: "Redis" }, { name: "Supabase" }, { name: "Firebase" },
  ]},
  { items: [
    { name: "AWS" }, { name: "Google Cloud" }, { name: "Vercel" }, { name: "Cloudflare" }, { name: "Docker" },
  ]},
  { items: [
    { name: "Shopify" }, { name: "Stripe" }, { name: "Square" }, { name: "WooCommerce" }, { name: "Amazon Pay" },
  ]},
  { items: [
    { name: "Salesforce" }, { name: "Slack" }, { name: "Microsoft 365" }, { name: "Notion" }, { name: "Jira" },
  ]},
];

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

/* 主力事業カード — 事業名 / リード文 / 3つの提供内容 / 価格 / CTA */
function CoreServiceCard({ svc }: { svc: CoreSvc }) {
  return (
    <Link href={svc.href} className="group block h-full">
      <article className="relative flex h-full flex-col border border-neutral-900 bg-white p-8 transition-colors duration-300 hover:bg-neutral-900 lg:p-10">
        {svc.badge && (
          <span className="absolute right-0 top-0 inline-flex items-center border-b border-l border-neutral-900 bg-neutral-900 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white transition-colors duration-300 group-hover:bg-white group-hover:text-neutral-900">
            {svc.badge}
          </span>
        )}
        <div className="mb-4 flex items-baseline gap-3 border-b border-neutral-200 pb-4 transition-colors duration-300 group-hover:border-neutral-700">
          <span className="font-mono text-xs font-bold tabular-nums text-neutral-900 transition-colors duration-300 group-hover:text-white">{svc.code}</span>
          <h3 className="text-xl font-bold tracking-tight text-balance text-neutral-900 transition-colors duration-300 group-hover:text-white">{svc.title}</h3>
        </div>

        <p className="mb-6 text-sm leading-relaxed text-pretty text-neutral-600 transition-colors duration-300 group-hover:text-neutral-300">{svc.lead}</p>

        <ul className="mb-6 space-y-2.5 border-t border-neutral-200 pt-5 transition-colors duration-300 group-hover:border-neutral-700">
          {svc.points.map((p) => (
            <li key={p} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-neutral-700 transition-colors duration-300 group-hover:text-neutral-300">
              <span aria-hidden className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 bg-neutral-900 transition-colors duration-300 group-hover:bg-white" />
              <span>{p}</span>
            </li>
          ))}
        </ul>

        <div className="mb-6 mt-auto border-t border-neutral-200 pt-5 transition-colors duration-300 group-hover:border-neutral-700">
          <p className="font-mono text-2xl font-bold tabular-nums tracking-tight text-neutral-900 transition-colors duration-300 group-hover:text-white">{svc.price}</p>
          <p className="mt-1.5 text-[11px] leading-relaxed text-neutral-500 transition-colors duration-300 group-hover:text-neutral-400">{svc.priceNote}</p>
        </div>

        <div className="mb-5 flex flex-wrap items-center gap-2 font-mono">
          {svc.tags.map((tag) => (
            <span key={tag} className="border border-neutral-300 px-2.5 py-1 text-xs text-neutral-500 transition-colors duration-300 group-hover:border-neutral-600 group-hover:text-neutral-400">{tag}</span>
          ))}
        </div>

        <span className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.08em] text-neutral-900 transition-colors duration-300 group-hover:text-white">
          {svc.cta}
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </article>
    </Link>
  );
}

export default function HomeContent({ newsSlot }: { newsSlot: ReactNode }) {
  const { lang } = useLanguage();
  const t = COPY[lang];
  const [heroLoaded, setHeroLoaded] = useState(false);
  const allTech = TECH_GROUPS.flatMap((g) => g.items);
  const techMid = Math.ceil(allTech.length / 2);
  const techRowA = allTech.slice(0, techMid);
  const techRowB = allTech.slice(techMid);
  useEffect(() => { setTimeout(() => setHeroLoaded(true), 100); }, []);

  // Adaptive hero text color: sample the video region behind the copy each frame
  // and switch between dark/light text so the catchphrase stays legible whether
  // the dithered background is bright or dark. Hysteresis avoids flicker.
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const [heroTextDark, setHeroTextDark] = useState(true);
  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    const canvas = document.createElement("canvas");
    canvas.width = 48;
    canvas.height = 32;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    let raf = 0;
    let last = 0;
    let dark = true; // current decision: true = dark text
    const sample = (ts: number) => {
      raf = requestAnimationFrame(sample);
      if (ts - last < 180) return;
      last = ts;
      if (video.readyState < 2 || video.videoWidth === 0) return;
      // Sample the left-center band of the frame — where the copy sits (left-aligned).
      const sx = 0;
      const sy = video.videoHeight * 0.12;
      const sw = video.videoWidth * 0.55;
      const sh = video.videoHeight * 0.76;
      try {
        ctx.drawImage(video, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
        const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let sum = 0;
        for (let i = 0; i < data.length; i += 4) {
          sum += 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
        }
        const avg = sum / (data.length / 4) / 255; // 0 (black) .. 1 (white)
        if (dark && avg < 0.45) dark = false;      // background got dark -> light text
        else if (!dark && avg > 0.58) dark = true; // background got bright -> dark text
        setHeroTextDark(dark);
      } catch {
        /* canvas tainted or frame not ready — keep last decision */
      }
    };
    raf = requestAnimationFrame(sample);
    return () => cancelAnimationFrame(raf);
  }, []);

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
      <section className="relative overflow-hidden bg-white md:flex md:min-h-screen md:items-center">
        {/* SP: 映像を16:9で表示。ヘッダー直下にぴったり付ける（上余白なし） */}
        <div className="md:hidden w-full">
          <video
            className="w-full aspect-video object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/videos/hero-dither-poster.jpg"
            aria-hidden
          >
            <source src="/videos/hero-dither-hq.mp4" type="video/mp4" />
          </video>
        </div>
        {/* PC: 背景動画（全面・テキスト重ね） */}
        <video
          ref={heroVideoRef}
          className="hidden md:block pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-[62%_center] sm:object-center"
          width={2160}
          height={1216}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          crossOrigin="anonymous"
          poster="/videos/hero-dither-poster.jpg"
          aria-hidden
        >
          <source src="/videos/hero-dither-hq.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 lg:px-10 pt-4 pb-6 md:py-24 pointer-events-none">
          <div className="max-w-none sm:max-w-md md:max-w-2xl lg:max-w-3xl text-left pointer-events-auto">
            <h1 className={`text-[1.5rem] sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.12] tracking-tight mb-6 transition-[color,opacity,transform] duration-500 text-gray-900 ${heroTextDark ? "md:text-gray-900" : "md:text-white"}`} style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(24px)", transitionDelay: "400ms", textShadow: heroTextDark ? "0 1px 3px rgba(255,255,255,0.75),0 2px 22px rgba(255,255,255,0.55)" : "0 1px 3px rgba(0,0,0,0.6),0 2px 22px rgba(0,0,0,0.65)" }}>
              {t.heroTitle}
            </h1>

            {/* 2つのチェックポイント */}
            <ul className={`mb-6 space-y-2 transition-[color,opacity] duration-500 text-gray-900 ${heroTextDark ? "md:text-gray-900" : "md:text-white"}`} style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "550ms", textShadow: heroTextDark ? "0 1px 2px rgba(255,255,255,0.95),0 1px 12px rgba(255,255,255,0.85)" : "0 1px 2px rgba(0,0,0,0.75),0 1px 12px rgba(0,0,0,0.7)" }}>
              {t.heroChecks.map((c) => (
                <li key={c.strong} className="flex items-start gap-2.5 text-[15px] md:text-lg font-semibold leading-snug">
                  <svg aria-hidden className="mt-1 h-[18px] w-[18px] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9.5" /><path d="m8 12.5 2.8 2.8L16 9.8" />
                  </svg>
                  <span><span className="underline decoration-2 underline-offset-4">{c.strong}</span>{c.rest}</span>
                </li>
              ))}
            </ul>

            <p className={`text-base md:text-lg font-medium leading-relaxed max-w-none sm:max-w-sm md:max-w-xl mb-9 transition-[color,opacity] duration-500 text-gray-900 ${heroTextDark ? "md:text-gray-900" : "md:text-white"}`} style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "700ms", textShadow: heroTextDark ? "0 1px 2px rgba(255,255,255,0.95),0 1px 12px rgba(255,255,255,0.85)" : "0 1px 2px rgba(0,0,0,0.75),0 1px 12px rgba(0,0,0,0.7)" }}>
              {t.heroDesc}
            </p>
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-5 transition-[opacity,transform] duration-700" style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "850ms" }}>
              <Link href="/reserve" className="inline-flex w-full sm:w-auto justify-center items-center gap-2 bg-neutral-900 text-white font-mono text-sm font-bold uppercase tracking-[0.08em] px-8 min-h-[52px] py-3.5 border border-neutral-900 hover:bg-neutral-800 transition-[background-color,scale] duration-300 active:scale-[0.96]">
                {t.heroPrimary}
                <span aria-hidden>→</span>
              </Link>
              <Link href="#simulation" className={`inline-flex w-full sm:w-auto justify-center sm:justify-start items-center gap-1.5 min-h-[44px] py-2 text-sm font-semibold transition-colors duration-300 text-gray-700 hover:text-neutral-900 ${heroTextDark ? "" : "md:text-white/90 md:hover:text-white"}`} style={{ textShadow: heroTextDark ? "none" : "0 1px 6px rgba(0,0,0,0.6)" }}>
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
            <div className="border border-neutral-900 bg-white grid grid-cols-3 divide-x divide-neutral-200 overflow-hidden">
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

      {/* ═══ TRUST METRICS + CLIENTS ═══ */}
      <section className="py-6 md:py-12 bg-white border-b border-gray-100">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal variant="scale">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-2 gap-x-4 md:gap-0 md:divide-x divide-gray-200">
              {t.trustStats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center justify-center py-3 md:py-6 px-4 text-center">
                  <span className="text-lg font-bold text-gray-900"><CountUp value={stat.value} /></span>
                  <span className="text-xs text-gray-500 mt-1">{stat.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <ClientLogoMarquee label={t.clientLogosLabel} />
        </div>
      </section>

      {/* ═══ §01 REASON ═══ */}
      <section id="reason" className="py-8 md:py-12 lg:py-16 bg-white scroll-mt-24">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="01" kicker={t.reasonLabel} title={t.reasonTitle} desc={t.reasonDesc} />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {t.reasons.map((item, i) => (
              <Reveal key={item.title} delay={i * 80} className="h-full">
                <div className="group h-full border border-neutral-900 bg-white p-8 transition-colors duration-300 hover:bg-neutral-900 lg:p-10">
                  <div className="flex items-baseline justify-between border-b border-neutral-200 pb-4 transition-colors duration-300 group-hover:border-neutral-700">
                    <span className="font-mono text-2xl font-bold tabular-nums text-neutral-900 transition-colors duration-300 group-hover:text-white">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">Reason / {String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-bold tracking-tight text-balance text-neutral-900 transition-colors duration-300 group-hover:text-white">{item.title}</h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-pretty text-neutral-600 transition-colors duration-300 group-hover:text-neutral-300">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ §02 SIMULATION ═══ */}
      <section id="simulation" className="py-8 md:py-12 lg:py-16 bg-neutral-50 border-y border-neutral-900 scroll-mt-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <SectionHead index="02" kicker={t.simLabel} title={t.simTitle} desc={t.simDesc} />
          <Reveal delay={100}>
            <QuoteSimulator />
          </Reveal>
        </div>
      </section>

      {/* ═══ §03 SERVICE ═══ */}
      <section id="services" className="py-8 md:py-12 lg:py-16 bg-white scroll-mt-24">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="03" kicker={t.servicesLabel} title={t.servicesTitle} desc={t.servicesDesc} />

          <Reveal>
            <p className="mb-5 flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
              <span className="h-px w-6 bg-neutral-900" />{t.coreHeading}
            </p>
          </Reveal>
          <CardCarousel className="mb-7 md:mb-14">
            {t.coreServices.map((svc, i) => (
              <Reveal key={svc.code} delay={(i % 3) * 80} className="h-full">
                <CoreServiceCard svc={svc} />
              </Reveal>
            ))}
          </CardCarousel>

          <Reveal>
            <p className="mb-5 flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
              <span className="h-px w-6 bg-neutral-900" />{t.subHeading}
            </p>
          </Reveal>
          <div className="grid grid-cols-1 border-t border-neutral-900 sm:grid-cols-2 lg:grid-cols-3">
            {t.subServices.map((s, i) => (
              <Reveal key={s.code} delay={(i % 3) * 50}>
                <Link href={s.href} className="group flex h-full flex-col gap-2 border-b border-r border-neutral-300 bg-white px-6 py-6 transition-colors duration-300 hover:bg-neutral-900">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px] font-bold tabular-nums text-neutral-400 transition-colors duration-300 group-hover:text-neutral-500">{s.code}</span>
                    <h3 className="text-base font-bold tracking-tight text-neutral-900 transition-colors duration-300 group-hover:text-white">{s.title}</h3>
                  </div>
                  <p className="text-[13px] leading-relaxed text-pretty text-neutral-600 transition-colors duration-300 group-hover:text-neutral-400">{s.desc}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ §04 WORKS ═══ */}
      <section id="works" className="py-8 md:py-12 lg:py-16 bg-neutral-50 border-y border-neutral-900 scroll-mt-24">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="04" kicker={t.worksLabel} title={t.worksTitle} desc={t.worksDesc} />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {t.works.map((w, i) => (
              <Reveal key={w.title} delay={i * 80} className="h-full">
                <Link href={w.href} className="group block h-full">
                  <article className="flex h-full flex-col border border-neutral-900 bg-white p-8 transition-colors duration-300 hover:bg-neutral-900 lg:p-10">
                    <div className="mb-4 flex items-center justify-between border-b border-neutral-200 pb-4 transition-colors duration-300 group-hover:border-neutral-700">
                      <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-900 transition-colors duration-300 group-hover:text-white">{w.tag}</span>
                      <span className="font-mono text-[10px] tabular-nums text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="mb-4 text-lg font-bold tracking-tight text-balance text-neutral-900 transition-colors duration-300 group-hover:text-white lg:text-xl">{w.title}</h3>
                    <p className="mb-6 flex-1 text-sm leading-relaxed text-pretty text-neutral-600 transition-colors duration-300 group-hover:text-neutral-300">{w.desc}</p>
                    <ul className="flex flex-wrap items-center gap-2 font-mono">
                      {w.metrics.map((m) => (
                        <li key={m} className="border border-neutral-300 px-2.5 py-1 text-xs text-neutral-500 transition-colors duration-300 group-hover:border-neutral-600 group-hover:text-neutral-400">{m}</li>
                      ))}
                    </ul>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <p className="mt-6 text-xs leading-relaxed text-neutral-500">{t.worksNote}</p>
          </Reveal>
        </div>
      </section>

      {/* ═══ §05 FLOW ═══ */}
      <section id="flow" className="py-8 md:py-12 lg:py-16 bg-white scroll-mt-24">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="05" kicker={t.processLabel} title={t.processTitle} desc={t.processDesc} />
          <div className="hidden lg:grid grid-cols-12 gap-6 border-b border-neutral-900 pb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
            <div className="col-span-1">No.</div>
            <div className="col-span-3">Phase</div>
            <div className="col-span-6">Detail</div>
            <div className="col-span-2">Duration</div>
          </div>
          {t.process.map((step, i) => (
            <Reveal key={step.num} delay={i * 60}>
              <div className="group grid grid-cols-1 gap-2 border-b border-neutral-200 py-6 transition-colors duration-300 hover:bg-neutral-50 lg:grid-cols-12 lg:gap-6 lg:py-7">
                <div className="lg:col-span-1">
                  <span className="font-mono text-lg font-bold tabular-nums text-neutral-900">{step.num}</span>
                </div>
                <div className="lg:col-span-3">
                  <h3 className="text-base font-bold tracking-tight text-balance text-neutral-900">{step.title}</h3>
                </div>
                <div className="lg:col-span-6">
                  <p className="text-[15px] leading-relaxed text-pretty text-neutral-600">{step.desc}</p>
                </div>
                <div className="lg:col-span-2">
                  <span className="font-mono text-xs text-neutral-500">{step.duration}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══ §06 TEAM ═══ */}
      <section className="py-8 md:py-12 lg:py-16 bg-neutral-50 border-y border-neutral-900">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="06" kicker={t.teamLabel} title={t.teamTitle} desc={t.teamDesc} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            <Reveal delay={0} className="h-full">
              <div className="group flex h-full flex-col border border-neutral-900 bg-white p-8 lg:p-10 transition-colors duration-300 hover:bg-neutral-900">
                <div className="mb-4 flex items-center justify-between border-b border-neutral-200 pb-4 transition-colors duration-300 group-hover:border-neutral-700">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-900 transition-colors duration-300 group-hover:text-white">{t.teamCard1Label}</span>
                  <span className="font-mono text-[10px] tabular-nums text-neutral-400">01</span>
                </div>
                <h3 className="mb-4 text-xl font-bold tracking-tight text-balance text-neutral-900 transition-colors duration-300 group-hover:text-white">{t.teamCard1Title}</h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-pretty text-neutral-600 transition-colors duration-300 group-hover:text-neutral-300">{t.teamCard1Desc}</p>
                <div className="flex flex-wrap items-center gap-2 font-mono">
                  {t.teamCard1Tags.map((tag) => (
                    <span key={tag} className="border border-neutral-300 px-2.5 py-1 text-xs text-neutral-600 transition-colors duration-300 group-hover:border-neutral-600 group-hover:text-neutral-400">{tag}</span>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={100} className="h-full">
              <div className="group flex h-full flex-col border border-neutral-900 bg-white p-8 lg:p-10 transition-colors duration-300 hover:bg-neutral-900">
                <div className="mb-4 flex items-center justify-between border-b border-neutral-200 pb-4 transition-colors duration-300 group-hover:border-neutral-700">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-900 transition-colors duration-300 group-hover:text-white">{t.teamCard2Label}</span>
                  <span className="font-mono text-[10px] tabular-nums text-neutral-400">02</span>
                </div>
                <h3 className="mb-4 text-xl font-bold tracking-tight text-balance text-neutral-900 transition-colors duration-300 group-hover:text-white">{t.teamCard2Title}</h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-pretty text-neutral-600 transition-colors duration-300 group-hover:text-neutral-300">{t.teamCard2Desc}</p>
                <div className="flex flex-wrap items-center gap-2 font-mono">
                  {t.teamCard2Tags.map((tag) => (
                    <span key={tag} className="border border-neutral-300 px-2.5 py-1 text-xs text-neutral-600 transition-colors duration-300 group-hover:border-neutral-600 group-hover:text-neutral-400">{tag}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ §07 TECH STACK ═══ */}
      <section className="py-8 md:py-12 lg:py-16 bg-white overflow-x-clip">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="07" kicker={t.techLabel} title={t.techTitle} desc={t.techDesc} />
        </div>
        <div className="mt-8 md:mt-10 space-y-3 md:space-y-4">
          {[techRowA, techRowB].map((row, ri) => (
            <div key={ri} className="relative overflow-hidden">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent md:w-28" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent md:w-28" />
              <div
                className={`flex w-max items-center gap-3 md:gap-4 hover:[animation-play-state:paused] ${
                  ri === 0 ? "animate-[marquee_55s_linear_infinite]" : "animate-[marqueeReverse_55s_linear_infinite]"
                }`}
              >
                {[...row, ...row].map((tech, i) => (
                  <span
                    key={`${tech.name}-${i}`}
                    className="inline-flex shrink-0 items-center gap-2 border border-neutral-300 bg-white px-3.5 py-2 font-mono text-[13px] text-neutral-700"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/logos/tech/${techSlug(tech.name)}.svg`}
                      alt={tech.name}
                      className="w-4 h-4 object-contain"
                      loading="lazy"
                    />
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="mt-10 border border-neutral-900 bg-neutral-50 p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
              <div className="flex-shrink-0 w-11 h-11 border border-neutral-900 flex items-center justify-center">
                <svg className="w-5 h-5 text-neutral-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-neutral-900 mb-1">{t.techMoreTitle}</p>
                <p className="text-sm leading-relaxed text-pretty text-neutral-600">{t.techMoreDesc}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ §08 Q&A ═══ */}
      <section id="faq" className="py-8 md:py-12 lg:py-16 bg-neutral-50 border-y border-neutral-900 scroll-mt-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <SectionHead index="08" kicker={t.faqLabel} title={t.faqTitle} desc={t.faqDesc} />
          <div className="mb-8 border-t border-neutral-900">
            {t.faq.map((item, i) => (
              <Reveal key={item.q} delay={i * 70}>
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
          <Reveal delay={200}>
            <Link href="/faq" className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.08em] text-neutral-900 hover:text-neutral-600 transition-colors">{t.faqCta}</Link>
          </Reveal>
        </div>
      </section>

      {/* ═══ §09 BLOGS / NEWS ═══ */}
      <section className="py-8 md:py-12 lg:py-16 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal className="mb-6 md:mb-12">
            <div className="flex items-end justify-between border-b border-neutral-900 pb-4">
              <div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs font-bold tabular-nums text-neutral-900">§09</span>
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-neutral-500">{t.newsLabel}</span>
                </div>
                <h2 className="mt-5 text-[18px] sm:text-xl lg:text-2xl font-bold leading-[1.15] sm:leading-[1.05] tracking-[-0.02em] text-balance text-neutral-900">{t.newsTitle}</h2>
              </div>
              <Link href="/blog" className="hidden sm:inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.08em] text-neutral-900 hover:text-neutral-600 transition-colors">
                {t.newsCta}
              </Link>
            </div>
          </Reveal>
          {newsSlot}
          <div className="text-center mt-8 sm:hidden">
            <Link href="/blog" className="font-mono text-xs font-bold uppercase tracking-[0.08em] text-neutral-900">{t.newsCta}</Link>
          </div>
        </div>
      </section>

      {/* ═══ §10 CONTACT ═══ */}
      <section id="contact" className="py-8 md:py-12 lg:py-16 bg-neutral-50 border-t border-neutral-900 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="mb-8 md:mb-12 border-b border-neutral-900 pb-6">
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs font-bold tabular-nums text-neutral-900">§10</span>
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-neutral-500">{t.ctaLabel}</span>
              </div>
              <h2 className="mt-6 text-[18px] sm:text-xl lg:text-2xl font-bold leading-[1.15] sm:leading-[1.05] tracking-[-0.02em] text-balance text-neutral-900">{t.ctaTitle}</h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-pretty text-neutral-600">{t.ctaDesc}</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <InlineContactForm lang={lang} />
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-10 mb-5 flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
              <span className="h-px w-6 bg-neutral-900" />
              {lang === "ja" ? "または、相談内容から選ぶ" : "Or choose by topic"}
            </p>
          </Reveal>
          <div className="grid grid-cols-1 border-t border-neutral-900 sm:grid-cols-2 lg:grid-cols-3">
            {t.ctaCards.map((item, i) => (
              <Reveal key={item.service} delay={i * 50}>
                <Link
                  href={`/contact?service=${item.service}`}
                  className="group flex h-full flex-col justify-between gap-3 border-b border-r border-neutral-300 bg-white px-5 py-5 transition-colors duration-300 hover:bg-neutral-900"
                >
                  <span className="block text-sm font-bold text-neutral-900 transition-colors duration-300 group-hover:text-white">
                    {item.label}
                  </span>
                  <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-400 transition-colors duration-300 group-hover:text-neutral-300">
                    {t.ctaCardAction}
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={350}>
            <div className="mt-8">
              <Link href="/contact" className="font-mono text-xs uppercase tracking-[0.08em] text-neutral-500 hover:text-neutral-900 transition-colors">
                {t.ctaOthers}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

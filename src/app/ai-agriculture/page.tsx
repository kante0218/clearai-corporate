"use client";

import Image from "next/image";
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
  return <p className="text-sm font-semibold text-emerald-600 mb-4">{children}</p>;
}

type Copy = {
  headerKicker: string;
  headerTitle: string;
  headerDesc: string;
  headerImgAlt: string;
  trustStats: { value: string; label: string }[];
  aboutLabel: string;
  aboutTitle: string;
  aboutDesc1: string;
  aboutDesc1Bold1: string;
  aboutDesc1Bold2: string;
  roadmapLabel: string;
  roadmapTitle: string;
  roadmapDesc: string;
  phases: { num: string; title: string; desc: string; hoverBg: string }[];
  challengesLabel: string;
  challengesTitle: string;
  issues: { prefix: string | null; number: string; label: string; desc: string }[];
  processLabel: string;
  processTitle: string;
  steps: { num: string; title: string; en: string; desc: string }[];
  statusLabel: string;
  statusTitle: string;
  statusDesc: string;
  devSteps: { status: string; statusColor: string; title: string; desc: string }[];
  hiringBadge: string;
  hiringTitle: string;
  hiringDesc: string;
  hiringCta: string;
  rdLabel: string;
  rdTitle: string;
  rdNote: string;
  rdNoteHighlight: string;
  rdPartners: { region: string; title: string; desc: string }[];
  teamLabel: string;
  teamTitle: string;
  teamDesc: string;
  teamMembers: { badgeColor: string; badge: string; title: string; desc: string }[];
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
    headerKicker: "Engineering × Agriculture",
    headerTitle: "農業インフラから、宇宙・防衛産業へ。",
    headerDesc: "田んぼの水流管理や、ビニールハウスの自動化から。農家の声に根差した技術を、未来の極限環境へ拡張する。",
    headerImgAlt: "ドローン、ロボットアーム、センサー、ダッシュボードが連携するスマート農業のイメージ",
    trustStats: [
      { value: "EC構築", label: "ネット販売支援" },
      { value: "利益率改善", label: "経営サポート" },
      { value: "全国対応", label: "日本全国" },
      { value: "2営業日", label: "初回返信" },
    ],
    aboutLabel: "About",
    aboutTitle: "農家の声から始め、\n極限環境の栽培へ広げる。",
    aboutDesc1: "clearAIの農業事業は、まず現場の農家様の声に徹底的に耳を傾けることから始めます。田んぼの水流管理、ビニールハウスの温湿度・灌水制御といった",
    aboutDesc1Bold1: "農業インフラの自動化",
    aboutDesc1Bold2: "無機質な空間での栽培",
    roadmapLabel: "Roadmap",
    roadmapTitle: "農業インフラから、宇宙・防衛へ。",
    roadmapDesc: "現場の声から始める「地に足のついた自動化」を起点に、段階的に極限環境の栽培技術へと展開していきます。",
    phases: [
      { num: "Phase 01", title: "農業インフラの自動化", desc: "田んぼの水流管理、ビニールハウスの温湿度・灌水・換気の自動化など、農家様の現場課題に密着したインフラ自動化支援から着手します。", hoverBg: "hover:bg-emerald-50" },
      { num: "Phase 02", title: "閉鎖空間・極限環境での栽培", desc: "宇宙空間、潜水艦内、地下シェルター等、光も土もない無機質な空間における栽培技術の研究開発。環境制御型農業のコア技術を構築します。", hoverBg: "hover:bg-teal-50" },
      { num: "Phase 03", title: "防衛・宇宙産業への展開", desc: "閉鎖空間における食料生産技術を、宇宙産業と防衛産業のコア基盤技術として提供。農業というアプローチから、両産業そのものを育てていきます。", hoverBg: "hover:bg-lime-50" },
    ],
    challengesLabel: "Challenges",
    challengesTitle: "日本の農業が抱える構造課題",
    issues: [
      { prefix: null, number: "30%", label: "農家の直販比率（全国平均）", desc: "ほとんどの農産物がJAや卸を経由し、生産者の手取りは小売価格の20〜30%程度です。" },
      { prefix: "↘", number: "15%", label: "農業所得の減少傾向", desc: "コスト上昇に対して販売価格が追いつかず、利益が圧迫されています。" },
      { prefix: null, number: "85%", label: "EC未導入の農家割合", desc: "ネット販売の可能性を感じながらも、始め方がわからない農家が大半です。" },
    ],
    processLabel: "Process",
    processTitle: "導入の流れ",
    steps: [
      { num: "01", title: "経営ヒアリング", en: "Hearing", desc: "現在の販路・原価構造・課題を丁寧にお聞きします。農園の強みと改善ポイントを整理し、最適な支援プランを設計します。" },
      { num: "02", title: "戦略・設計", en: "Planning", desc: "EC構築、ブランディング、利益改善など、優先度の高い施策から着手。無理のないスケジュールでご提案します。" },
      { num: "03", title: "構築・導入", en: "Implementation", desc: "ECサイト構築、システム導入、デザイン制作などを実施。農家様が自ら運用できるよう、丁寧にレクチャーします。" },
      { num: "04", title: "運用・改善", en: "Operation", desc: "売上データを分析しながら、集客施策やリピーター育成を継続的に改善。農家と二人三脚で成果を追求します。" },
    ],
    statusLabel: "Status",
    statusTitle: "まだ、提供中のサービスはありません。",
    statusDesc: "clearAIの農業事業は、今まさに立ち上げの準備段階です。\n農家様の声を起点に、大学の教授・優秀なエンジニア・学生と協力しながら、一歩ずつ形にしていきます。",
    devSteps: [
      { status: "Step 01", statusColor: "bg-emerald-100 text-emerald-700", title: "農家様の声を聞く", desc: "まずは現場に足を運び、農家様が実際に困っていることを丁寧にヒアリング。机上の空論ではなく、本当に必要とされる技術の種を探すところから始めます。" },
      { status: "Step 02", statusColor: "bg-emerald-100 text-emerald-700", title: "できることから自動化", desc: "教授・エンジニア・学生と協力し、水流管理やビニールハウスの自動化など、手の届く範囲から開発・検証。プロトタイプを現場で磨いていきます。" },
      { status: "Step 03", statusColor: "bg-blue-100 text-blue-700", title: "製品化 & 全国導入", desc: "現場で磨いた自動化技術を製品化し、全国の農家様へ展開予定。自らも野菜を育てながら、ロボット栽培や無機質空間での栽培にも着手していきます。" },
    ],
    hiringBadge: "Now Hiring",
    hiringTitle: "一緒に農業を変えるエンジニアを募集しています。",
    hiringDesc: "農家の経営課題をテクノロジーで解決する。\nフロントエンド、バックエンド、デザイナーを募集中です。",
    hiringCta: "話を聞いてみる",
    rdLabel: "R&D Partners",
    rdTitle: "現場と歩む、共同研究フェーズ。",
    rdNote: "clearAIの農業事業は、まだ導入実績を積み上げるフェーズではありません。現在は",
    rdNoteHighlight: "秋田・北海道の農家様",
    rdPartners: [
      { region: "秋田", title: "秋田の農家様との協業", desc: "米作を中心とした生産現場で、業務効率化と販路設計の共同検証を進めています。現地のオペレーションに合わせたプロトタイプを開発し、継続的にフィードバックをいただきながら改善しています。" },
      { region: "北海道", title: "北海道の農家様との協業", desc: "広域・大規模な農業環境における受発注・顧客管理・データ活用の実証を行っています。北の大地ならではのスケール感と気候条件に即した技術検証を共同で進めています。" },
    ],
    teamLabel: "Team & Advisors",
    teamTitle: "参画メンバーとアドバイザー",
    teamDesc: "農業とエンジニアリングの両面から、現場に貢献できる体制を構築しています。研究と実装、アカデミアと現場、その両方を行き来できるチームです。",
    teamMembers: [
      { badgeColor: "bg-emerald-50 text-emerald-700", badge: "参画メンバー", title: "筑波大学 落合陽一研究室 × 起業家", desc: "筑波大学 情報メディア創成学類（落合陽一研究室所属）。10歳よりシステム開発を始め、現在は創株式会社 代表としてAI受託開発・研修・コンサル・アプリ開発を手がけるほか、EQパートナーズ株式会社 CAIO、Queue株式会社 PMなど複数社でエンジニア／CTOを歴任。金融機関・エンタープライズの大規模案件や自治体向けアプリ立ち上げを、営業から開発まで一気通貫で統括。「誰もが『創りたい』を創れる社会を創る」を掲げ、AIの民主化を推進中。" },
      { badgeColor: "bg-blue-50 text-blue-700", badge: "アドバイザー（予定）", title: "東京大学 農学部", desc: "東京大学 農学部にてアカデミックな知見を有する方を、アドバイザーとして迎える予定です。農学分野の専門性に基づき、事業の方向性や技術検証に助言をいただきます。" },
    ],
    faqLabel: "FAQ",
    faqTitle: "よくあるご質問",
    faq: [
      { q: "小規模農家でも相談できますか？", a: "はい。小規模農家様こそ、直販やECの効果が大きいと考えています。規模を問わずご相談ください。" },
      { q: "ECサイトの運用経験がなくても大丈夫ですか？", a: "もちろんです。スマートフォンが使える方であれば運用できるよう、シンプルな仕組みと丁寧なレクチャーをご提供します。" },
      { q: "費用はどのくらいかかりますか？", a: "農園の規模や必要な支援内容によって異なります。まずはヒアリングの上、最適なプランと費用感をご提案しますので、お気軽にご相談ください。" },
      { q: "補助金は使えますか？", a: "IT導入補助金、小規模事業者持続化補助金など、活用可能な補助金について申請支援まで行います。" },
      { q: "どんな作物に対応していますか？", a: "野菜・果物・米・花卉・加工品など幅広く対応可能です。品目やターゲット顧客に合わせた最適な販売戦略をご提案します。" },
      { q: "対応エリアはどこですか？", a: "オンラインでの対応を基本に、全国どこでもサポートが可能です。必要に応じて現地訪問も行います。" },
    ],
    ctaLabel: "Contact",
    ctaTitle: "まずは、お話ししませんか。",
    ctaDesc: "「うちの農園でもECは始められる？」というご相談から大歓迎です。\n現状をお聞きした上で、最適な支援プランをご提案します。",
    ctaButton: "無料で相談する",
  },
  en: {
    headerKicker: "Engineering × Agriculture",
    headerTitle: "From agricultural infrastructure to space and defense.",
    headerDesc: "Starting from paddy water management and greenhouse automation — extending technology rooted in farmers' voices to the extreme environments of the future.",
    headerImgAlt: "Smart agriculture concept: drones, robotic arms, sensors, and dashboards working in concert",
    trustStats: [
      { value: "E-commerce", label: "Online sales support" },
      { value: "Margin improvement", label: "Business consulting" },
      { value: "Nationwide", label: "All of Japan" },
      { value: "2 business days", label: "First response" },
    ],
    aboutLabel: "About",
    aboutTitle: "Starting from farmers' voices,\nexpanding to extreme-environment cultivation.",
    aboutDesc1: "clearAI's agricultural business begins by listening intently to farmers on the ground. Our first step is supporting the ",
    aboutDesc1Bold1: "automation of agricultural infrastructure",
    aboutDesc1Bold2: "cultivation in inorganic spaces",
    roadmapLabel: "Roadmap",
    roadmapTitle: "From agricultural infrastructure to space and defense.",
    roadmapDesc: "Starting from ground-up automation grounded in field voices, we progressively expand into cultivation technology for extreme environments.",
    phases: [
      { num: "Phase 01", title: "Agricultural infrastructure automation", desc: "We begin with infrastructure automation closely tied to farmers' on-site challenges — paddy water management, greenhouse temperature/humidity, irrigation, and ventilation control.", hoverBg: "hover:bg-emerald-50" },
      { num: "Phase 02", title: "Cultivation in closed and extreme environments", desc: "R&D into cultivation technology for inorganic spaces with no light or soil — outer space, submarine interiors, underground shelters. Building the core technology for controlled-environment agriculture.", hoverBg: "hover:bg-teal-50" },
      { num: "Phase 03", title: "Expansion into defense and space industries", desc: "Delivering closed-environment food production technology as core infrastructure for the space and defense sectors. Growing both industries through an agricultural approach.", hoverBg: "hover:bg-lime-50" },
    ],
    challengesLabel: "Challenges",
    challengesTitle: "Structural challenges facing Japanese agriculture",
    issues: [
      { prefix: null, number: "30%", label: "Direct-sales ratio among farmers (national average)", desc: "Most agricultural products pass through JA or wholesalers, leaving producers with roughly 20–30% of the retail price." },
      { prefix: "↘", number: "15%", label: "Declining agricultural income trend", desc: "Rising costs outpace selling prices, squeezing margins across the industry." },
      { prefix: null, number: "85%", label: "Farmers without e-commerce", desc: "Most farmers see potential in online sales but don't know how to get started." },
    ],
    processLabel: "Process",
    processTitle: "How we work with you",
    steps: [
      { num: "01", title: "Business consultation", en: "Hearing", desc: "We listen carefully to your current sales channels, cost structure, and challenges — then design an optimal support plan around your farm's strengths and improvement areas." },
      { num: "02", title: "Strategy & design", en: "Planning", desc: "We tackle the highest-priority initiatives first — e-commerce setup, branding, margin improvement — and propose a realistic schedule." },
      { num: "03", title: "Build & launch", en: "Implementation", desc: "We build your e-commerce site, integrate systems, and create design assets — with hands-on training so you can operate independently." },
      { num: "04", title: "Operation & improvement", en: "Operation", desc: "We analyze sales data and continuously improve traffic and repeat-customer strategies — partnering closely with you to pursue results." },
    ],
    statusLabel: "Status",
    statusTitle: "No services are available yet.",
    statusDesc: "clearAI's agricultural business is currently in the early preparation stage.\nWorking from farmers' voices, we are taking shape step by step in collaboration with university professors, talented engineers, and students.",
    devSteps: [
      { status: "Step 01", statusColor: "bg-emerald-100 text-emerald-700", title: "Listening to farmers", desc: "We start by visiting the field and carefully hearing what farmers are truly struggling with — searching for the seeds of technology that are genuinely needed, not armchair theories." },
      { status: "Step 02", statusColor: "bg-emerald-100 text-emerald-700", title: "Automating what we can", desc: "Working with professors, engineers, and students, we develop and test within reach — water management, greenhouse automation and more — refining prototypes in the field." },
      { status: "Step 03", statusColor: "bg-blue-100 text-blue-700", title: "Productize & expand nationwide", desc: "We plan to commercialize field-tested automation technology and roll it out to farmers across Japan — while also beginning robotic cultivation and growing in inorganic spaces." },
    ],
    hiringBadge: "Now Hiring",
    hiringTitle: "We are looking for engineers to help transform agriculture.",
    hiringDesc: "Solving farmers' business challenges through technology.\nWe are hiring frontend engineers, backend engineers, and designers.",
    hiringCta: "Hear more about it",
    rdLabel: "R&D Partners",
    rdTitle: "A joint research phase, walking with the field.",
    rdNote: "clearAI's agricultural business is not yet in a phase of accumulating deployment results. We are currently collaborating with ",
    rdNoteHighlight: "farmers in Akita and Hokkaido",
    rdPartners: [
      { region: "Akita", title: "Collaboration with Akita farmers", desc: "We are conducting joint verification of operational efficiency and sales channel design at rice-farming production sites. We develop prototypes tailored to local operations and continuously improve them through ongoing feedback." },
      { region: "Hokkaido", title: "Collaboration with Hokkaido farmers", desc: "We are conducting proof-of-concept work on order management, customer management, and data utilization in large-scale agricultural environments. We jointly advance technology verification suited to the scale and climate conditions of Japan's northern frontier." },
    ],
    teamLabel: "Team & Advisors",
    teamTitle: "Our team and advisors",
    teamDesc: "We are building a structure capable of contributing on the ground from both agricultural and engineering perspectives — a team that moves freely between research and implementation, academia and the field.",
    teamMembers: [
      { badgeColor: "bg-emerald-50 text-emerald-700", badge: "Core member", title: "University of Tsukuba — Yoichi Ochiai Lab × Entrepreneur", desc: "Enrolled in the School of Informatics and Engineering at the University of Tsukuba (Yoichi Ochiai Laboratory). Started software development at age 10. Currently serves as CEO of So Inc., handling AI contract development, training, consulting, and app development — alongside roles as CAIO at EQ Partners Inc. and PM at Queue Inc. Has led large-scale projects for financial institutions and enterprises, and municipal app launches, end-to-end from sales through development. Advocates for 'a society where everyone can create what they want to create' and promotes the democratization of AI." },
      { badgeColor: "bg-blue-50 text-blue-700", badge: "Advisor (planned)", title: "University of Tokyo — Faculty of Agriculture", desc: "We plan to welcome a specialist with academic expertise in the Faculty of Agriculture at the University of Tokyo as an advisor. They will provide guidance on business direction and technical validation based on their expertise in agricultural science." },
    ],
    faqLabel: "FAQ",
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "Can small-scale farmers consult you?", a: "Yes. We believe small-scale farmers stand to benefit the most from direct sales and e-commerce. Please feel free to reach out regardless of scale." },
      { q: "Is it okay if we have no e-commerce experience?", a: "Absolutely. We provide a simple setup operable by anyone who can use a smartphone, along with hands-on training." },
      { q: "How much does it cost?", a: "It varies by the scale of your farm and the support you need. We will listen first and then propose an optimal plan with a cost estimate — please feel free to inquire." },
      { q: "Can we use subsidies?", a: "Yes. We provide application support for applicable subsidies such as the IT Introduction Subsidy and the Small Business Sustainability Subsidy." },
      { q: "What crops do you support?", a: "We support a wide range including vegetables, fruit, rice, flowers, and processed goods. We propose an optimal sales strategy matched to your product and target customers." },
      { q: "What areas do you cover?", a: "We primarily operate online and can support farms anywhere in Japan. We also make on-site visits when needed." },
    ],
    ctaLabel: "Contact",
    ctaTitle: "Let's talk first.",
    ctaDesc: "Questions like 'Can our farm start e-commerce?' are very welcome.\nWe will listen to your current situation and propose the best support plan.",
    ctaButton: "Book a free consultation",
  },
};

export default function AiAgriculturePage() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  return (
    <>
      {/* PAGE HEADER */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-sm font-semibold text-emerald-600 mb-3">{t.headerKicker}</p>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">{t.headerTitle}</h1>
              <p className="text-base text-gray-600 leading-relaxed">{t.headerDesc}</p>
            </div>
            <div className="relative w-full aspect-[4/3] lg:aspect-[5/4]">
              <Image
                src="/ai-agriculture-hero.png"
                alt={t.headerImgAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              {t.trustStats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center justify-center py-6 px-4 text-center">
                  <span className="text-xl font-bold text-gray-900">{stat.value}</span>
                  <span className="text-xs text-gray-500 mt-1">{stat.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.aboutLabel}</Label>
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-gray-900 leading-snug mb-6">
                {lang === "ja" ? (
                  <>農家の声から始め、<br />極限環境の栽培へ広げる。</>
                ) : (
                  <>Starting from farmers&apos; voices,<br />expanding to extreme-environment cultivation.</>
                )}
              </h2>
              <p className="text-base text-gray-600 leading-relaxed">
                {t.aboutDesc1}<span className="font-semibold text-gray-900">{t.aboutDesc1Bold1}</span>
                {lang === "ja"
                  ? "を第一歩として支援。その先には、宇宙・潜水艦・シェルターなど、光も土もない"
                  : " — irrigation, temperature, and humidity control for greenhouses — as our foundation. Beyond that, we step into "}
                <span className="font-semibold text-gray-900">{t.aboutDesc1Bold2}</span>
                {lang === "ja"
                  ? "へと踏み込みます。農業というアプローチから、防衛産業と宇宙産業そのものを育てていく。それが私たちの描く未来です。"
                  : " — growing in environments with no light or soil, such as outer space, submarines, and shelters. Growing the defense and space industries themselves through an agricultural approach — that is the future we envision."}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section id="services" className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.roadmapLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.roadmapTitle}</h2>
            <p className="text-base text-gray-600 leading-relaxed max-w-2xl mb-14">
              {t.roadmapDesc}
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.phases.map((item, i) => (
              <Reveal key={item.num} delay={i * 100}>
                <div className={`bg-white rounded-2xl border border-gray-200 p-8 transition-all duration-300 cursor-default group ${item.hoverBg} hover:shadow-lg`}>
                  <span className="text-sm font-bold text-emerald-600">{item.num}</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-3 mb-4">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ISSUES */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.challengesLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-14">{t.challengesTitle}</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {t.issues.map((item, i) => (
              <Reveal key={item.label} delay={i * 100} className="h-full">
                <div className="rounded-2xl border border-gray-200 bg-white p-8 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  <p className="flex items-baseline gap-2 mb-3">
                    {item.prefix && (
                      <span className="text-4xl font-bold text-emerald-600 leading-none">{item.prefix}</span>
                    )}
                    <span className="text-5xl font-bold text-emerald-600 leading-none">{item.number}</span>
                  </p>
                  <p className="text-sm font-bold text-gray-900 mb-2">{item.label}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.processLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-14">{t.processTitle}</h2>
          </Reveal>
          {t.steps.map((step, i) => (
            <Reveal key={step.num} delay={i * 100}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-10 border-b border-gray-100 last:border-0">
                <div className="lg:col-span-1"><span className="text-sm font-bold text-emerald-600">{step.num}</span></div>
                <div className="lg:col-span-3">
                  <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{step.en}</p>
                </div>
                <div className="lg:col-span-8"><p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* DEVELOPMENT STATUS */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-emerald-100/40 blur-[120px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <Reveal>
            <Label>{t.statusLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-6">{t.statusTitle}</h2>
            <p className="text-base text-gray-600 leading-relaxed max-w-2xl mb-14">
              {lang === "ja" ? (
                <>
                  clearAIの農業事業は、今まさに立ち上げの準備段階です。<br />
                  農家様の声を起点に、大学の教授・優秀なエンジニア・学生と協力しながら、一歩ずつ形にしていきます。
                </>
              ) : (
                <>
                  clearAI&apos;s agricultural business is currently in the early preparation stage.<br />
                  Working from farmers&apos; voices, we are taking shape step by step in collaboration with university professors, talented engineers, and students.
                </>
              )}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {t.devSteps.map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="rounded-2xl border border-gray-200 bg-white p-8 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  <span className={`inline-block self-start rounded-full px-3 py-1 text-xs font-bold mb-4 ${item.statusColor}`}>{item.status}</span>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={300}>
            <div className="rounded-2xl bg-gray-950 p-10 lg:p-14 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none" />
              <div className="relative z-10">
                <span className="inline-block rounded-full bg-emerald-500/20 text-emerald-400 px-4 py-1.5 text-xs font-bold tracking-widest uppercase mb-6">{t.hiringBadge}</span>
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight">
                  {t.hiringTitle}
                </h3>
                <p className="text-base text-white/60 leading-relaxed max-w-xl mb-8">
                  {lang === "ja" ? (
                    <>
                      農家の経営課題をテクノロジーで解決する。<br />
                      フロントエンド、バックエンド、デザイナーを募集中です。
                    </>
                  ) : (
                    <>
                      Solving farmers&apos; business challenges through technology.<br />
                      We are hiring frontend engineers, backend engineers, and designers.
                    </>
                  )}
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {["TypeScript / React", "Next.js", "Shopify / EC", "UI/UX Design", "Python", "AWS / GCP"].map((tech) => (
                    <span key={tech} className="text-xs font-medium text-white/50 border border-white/10 rounded-full px-3 py-1.5">{tech}</span>
                  ))}
                </div>
                <a href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 text-white font-semibold px-8 py-3.5 hover:bg-emerald-500 transition-colors duration-300">
                  {t.hiringCta}
                  <span className="text-emerald-200">→</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* R&D PARTNERS */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.rdLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-6">{t.rdTitle}</h2>
            <p className="text-sm text-gray-600 bg-white border border-gray-200 rounded-xl px-5 py-4 mb-12 leading-relaxed max-w-3xl">
              {t.rdNote}<span className="font-semibold text-gray-900">{t.rdNoteHighlight}</span>
              {lang === "ja"
                ? "と連携しながら、現場の課題に根差した技術開発と実地検証を進めています。机上の空論ではなく、土と向き合う方々と共につくる。それが私たちのスタンスです。"
                : " to advance technology development and field validation rooted in on-site challenges. We build together with those who face the soil — not from the armchair. That is our stance."}
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.rdPartners.map((item, i) => (
              <Reveal key={item.region} delay={i * 100}>
                <div className="rounded-2xl border border-gray-200 bg-white p-8 hover:shadow-lg transition-all duration-300 h-full">
                  <span className="inline-block rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-bold mb-4">{item.region}</span>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM & ADVISORS */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.teamLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-6">{t.teamTitle}</h2>
            <p className="text-base text-gray-600 leading-relaxed max-w-2xl mb-14">
              {t.teamDesc}
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.teamMembers.map((member, i) => (
              <Reveal key={member.badge} delay={i * 100}>
                <div className="rounded-2xl border border-gray-200 bg-white p-8 hover:shadow-lg transition-all duration-300 h-full">
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold mb-4 ${member.badgeColor}`}>{member.badge}</span>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{member.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {member.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
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
              <Reveal key={i} delay={i * 80}>
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
            <p className="text-base text-gray-600 leading-relaxed mb-10">
              {lang === "ja" ? (
                <>「うちの農園でもECは始められる？」というご相談から大歓迎です。<br />現状をお聞きした上で、最適な支援プランをご提案します。</>
              ) : (
                <>Questions like &ldquo;Can our farm start e-commerce?&rdquo; are very welcome.<br />We will listen to your current situation and propose the best support plan.</>
              )}
            </p>
            <a href="/contact" className="rounded-lg bg-emerald-600 text-white font-semibold px-10 py-4 hover:bg-emerald-700 transition-colors duration-300 inline-block">{t.ctaButton}</a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

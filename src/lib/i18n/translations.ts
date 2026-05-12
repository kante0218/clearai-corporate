/**
 * i18n translation dictionaries for clearAI corporate site.
 *
 * Each namespace exposes a `ja` and `en` object with the same shape, so
 * components can do `translations.ns[lang]` and get typed string access.
 */

// --- HEADER -----------------------------------------------------------------
export const header = {
  ja: {
    navAi: "AI",
    navAiConsulting: "コンサル・DX",
    navAiConsultingDesc: "大手コンサル出身者が監修する戦略〜実装支援",
    navAdvisor: "顧問",
    navAdvisorDesc: "月5万円〜、継続的にAI活用を伴走",
    navTraining: "研修",
    navTrainingDesc: "チームのAIリテラシーを底上げ",
    navClaude: "Claude特化",
    navClaudeDesc: "Anthropic Claudeに特化した導入支援",
    navAdvertising: "広告",
    navAdvertisingDesc: "AI活用で広告運用を最適化・自動化",
    navWebsite: "ウェブサイト作成",
    navWebsiteDesc: "AI時代に成果が出るサイトを高速制作",
    navSubsidy: "補助金",
    navSubsidyDesc: "研修・AI導入費を助成金で最大75%削減",
    navAgriculture: "農業",
    navAgricultureEngineering: "農業×エンジニアリング",
    navAgricultureEngineeringDesc: "IoT・AIで現場の自動化と省力化を実現",
    navKawasemi: "翡翠プロジェクト",
    navKawasemiDesc: "仕事のたびに植樹。日本の人材と自然をつなぐ",
    navCases: "導入事例",
    navNews: "お知らせ",
    navAbout: "会社概要",
    docsDl: "資料DL",
    contact: "お問い合わせ",
    menuAria: "メニュー",
    subMenuAria: "のサブメニュー",
  },
  en: {
    navAi: "AI",
    navAiConsulting: "Consulting & DX",
    navAiConsultingDesc: "Strategy to implementation, led by ex-Big 4 consultants",
    navAdvisor: "Advisor",
    navAdvisorDesc: "From JPY 50K/month. Ongoing AI advisory.",
    navTraining: "Training",
    navTrainingDesc: "Raise your team's AI literacy.",
    navClaude: "Claude Specialized",
    navClaudeDesc: "Specialized support for Anthropic Claude",
    navAdvertising: "Advertising",
    navAdvertisingDesc: "AI-powered ad operations and automation",
    navWebsite: "Website",
    navWebsiteDesc: "Fast, AI-ready websites that drive results",
    navSubsidy: "Subsidy",
    navSubsidyDesc: "Cut training and AI rollout costs by up to 75% with subsidies",
    navAgriculture: "Agriculture",
    navAgricultureEngineering: "Agriculture x Engineering",
    navAgricultureEngineeringDesc: "Automating the field with IoT and AI",
    navKawasemi: "Kawasemi Project",
    navKawasemiDesc: "Plant trees with every project. Connecting talent and nature.",
    navCases: "Case Studies",
    navNews: "News",
    navAbout: "About",
    docsDl: "Download",
    contact: "Contact",
    menuAria: "Menu",
    subMenuAria: " submenu",
  },
} as const;

// --- FOOTER -----------------------------------------------------------------
export const footer = {
  ja: {
    logoAlt: "clearAI株式会社（クリアエーアイ）ロゴ",
    tagline: "中小企業と農業現場に、使えるAIと実装力を。戦略から実装まで一貫して支援します。",
    companyLine1: "clearAI株式会社（読み方：クリアエーアイ）",
    companyLine2: "代表取締役 髙橋 敢輝",
    companyLine3: "茨城県 / 2026年4月設立",
    servicesHeading: "事業",
    services: {
      aiConsulting: "AIコンサルティング",
      advisor: "AI顧問",
      training: "AI研修",
      subsidy: "補助金サポート",
      claude: "Claude特化",
      advertising: "AI広告運用",
      website: "ウェブサイト作成",
      agriculture: "農業×エンジニアリング",
    },
    companyHeading: "企業情報",
    company: {
      about: "会社概要",
      faq: "よくある質問",
      blog: "お知らせ",
      contact: "お問い合わせ",
    },
    otherHeading: "その他",
    other: {
      privacy: "プライバシーポリシー",
      terms: "利用規約",
      sitemap: "サイトマップ",
    },
    contactLabel: "お問い合わせ",
    copyright: "clearAI Inc.（クリアエーアイ） All rights reserved.",
    privacyShort: "Privacy Policy",
    termsShort: "Terms",
  },
  en: {
    logoAlt: "clearAI Inc. logo",
    tagline:
      "Practical AI and engineering for SMEs and farms — from strategy to implementation.",
    companyLine1: "clearAI Inc. (Japanese name: clearAI Kabushiki Kaisha)",
    companyLine2: "CEO: Kanki Takahashi",
    companyLine3: "Ibaraki, Japan / Founded April 2026",
    servicesHeading: "Services",
    services: {
      aiConsulting: "AI Consulting",
      advisor: "AI Advisor",
      training: "AI Training",
      subsidy: "Subsidy Support",
      claude: "Claude Specialized",
      advertising: "AI Advertising",
      website: "Website Production",
      agriculture: "Agriculture × Engineering",
    },
    companyHeading: "Company",
    company: {
      about: "About",
      faq: "FAQ",
      blog: "News",
      contact: "Contact",
    },
    otherHeading: "Legal",
    other: {
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      sitemap: "Sitemap",
    },
    contactLabel: "Contact",
    copyright: "clearAI Inc. All rights reserved.",
    privacyShort: "Privacy Policy",
    termsShort: "Terms",
  },
} as const;

// --- TOGGLE -----------------------------------------------------------------
export const toggle = {
  ja: { switchTo: "Switch to English", ja: "JA", en: "EN" },
  en: { switchTo: "日本語に切替", ja: "JA", en: "EN" },
} as const;

// --- HOME -------------------------------------------------------------------
export const home = {
  ja: {
    heroBadge: "AI Consulting & Agriculture Engineering",
    heroTitleLine1: "中小企業と農業現場に、",
    heroTitleLine2: "使えるAIと実装力を。",
    heroDescLine1: "AI導入支援と農業自動化を、戦略から実装まで支援します。",
    heroDescLine2:
      "コンサル・顧問・研修・Claude Code導入・広告・Web制作・補助金活用・農業自動化の8領域で、現場で動くものまで責任を持ちます。",
    contact: "お問い合わせ",
    viewServices: "事業を見る →",
    trustStats: [
      { value: "最大75%", label: "研修費助成対応" },
      { value: "8領域", label: "AI × 農業" },
      { value: "全国対応", label: "オンライン実施可" },
      { value: "2営業日", label: "初回返信" },
    ],
    visionLabel: "Our Vision",
    visionTitle: "AIを、日本の現場へ届ける。",
    visionBody1:
      "AIはまだ、多くの企業や生産者にとって遠い存在です。難しい、コストが高い、何から始めればいいかわからない——そんな声を何度も聞いてきました。",
    visionBody2:
      "私たちはそのギャップを埋めるために生まれました。最先端のAI技術をビジネスの言葉に翻訳し、エンジニアの力で農家の経営を支える。一社一社、一農家一農家に寄り添い、確かな価値を届けていきます。",
    visionStatAreas: "領域",
    visionStatAreasLabel: "展開中",
    visionStatMarket: "日本",
    visionStatMarketLabel: "市場特化",
    visionStatFound: "2026",
    visionStatFoundLabel: "創業",
    getStartedLabel: "Get Started",
    getStartedTitle: "まずは、小さく始められます。",
    getStartedDesc:
      "いきなりの大型契約は不要です。30分の無料診断と3分で読める資料から、貴社に合うかを見極めてください。",
    step01Title: "無料AI診断（30分）",
    step01Desc:
      "現状の業務・課題をヒアリングし、AI活用で効果の高そうな領域を1つ特定してお返しします。営業色の強い提案はしません。",
    step01Points: [
      "Zoom / 対面いずれも可",
      "NDA締結のうえ、機密情報も扱えます",
      "その場で簡易レポートを口頭共有",
    ],
    step01Cta: "申し込む →",
    step02Title: "3分でわかる会社資料",
    step02Desc:
      "事業内容・代表的な支援パターン・料金レンジ・補助金活用例をまとめた1枚PDFを送付します。社内稟議用にどうぞ。",
    step02Points: ["PDF 1ページ", "料金レンジと進め方の目安入り", "登録不要・当日返信"],
    step02Cta: "資料をもらう →",
    step03Title: "1部署・1業務からのPoC",
    step03Desc:
      "いきなり全社展開ではなく、最も効果が出そうな1部署・1業務に絞って小さく試行導入。効果が見えてから拡張します。",
    step03Points: [
      "PoC期間 1〜2ヶ月",
      "成功基準を事前合意",
      "人材開発支援助成金の活用も可",
    ],
    step03Cta: "相談する →",
    servicesLabel: "Our Services",
    servicesTitle: "AIと農業で、日本の未来をつくる。",
    servicesDesc:
      "2つの事業軸で、テクノロジーと一次産業の現場をつなぐ。それぞれの領域で確実に成果を届けます。",
    aiSection: "AI事業",
    agriSection: "農業事業",
    ai01Label: "AI 01",
    ai01Title: "AIコンサルティング",
    ai01Desc:
      "戦略策定から実装・運用まで。日本企業のAI活用を、ヒアリングから定着まで一気通貫で伴走します。",
    ai01Tags: ["AI戦略策定", "データ分析", "業務自動化", "生成AI活用"],
    ai01Cta: "詳しく見る →",
    ai02Label: "AI 02",
    ai02Title: "AI顧問 ＋ ウェブサイト監修",
    ai02Desc:
      "外部AI顧問として、月次で経営・業務・Web改善を伴走支援します。戦略の壁打ちから現場の改善提案まで、業務委託契約ベースで継続的に関与します。",
    ai02Tags: ["AI顧問契約", "ウェブサイト監修", "月次壁打ち", "業務委託"],
    ai02ClientLabel: "顧問先:",
    ai02Client: "日本アセット戦略機構",
    ai02Cta: "顧問契約のご相談 →",
    ai03Label: "AI 03",
    ai03Badge: "補助金 最大75%OFF",
    ai03Title: "AI導入・教育",
    ai03Desc:
      "現場で使えるAIリテラシーを組織に根付かせる。導入研修から部門別ワークショップ、実務適用まで、社員が主役になる学習プログラムを設計・提供します。",
    ai03Tags: ["社員研修", "部門別ワークショップ", "プロンプト設計", "業務適用"],
    ai03Cta: "研修プログラムを見る →",
    ai04Label: "AI 04",
    ai04Title: "CEO向けAI活用",
    ai04Desc:
      "経営判断のための情報整理・仮説整理・ドラフト作成を支援します。市場分析から戦略の壁打ち、役員会資料の下書きまで、CEOのインプットと意思決定を加速する専属サポートです。",
    ai04Tags: ["経営者向け", "意思決定支援", "戦略壁打ち", "情報整理・ドラフト"],
    ai04Cta: "お問い合わせ →",
    ai05Label: "AI 05",
    ai05Title: "Claude Code特化導入",
    ai05Desc:
      "開発組織の生産性を最大化するClaude Code導入支援。環境構築・社内ルール整備・MCP/サブエージェント設計・運用定着まで、エンジニアリング現場に特化して伴走します。",
    ai05Tags: ["Claude Code", "環境構築", "MCP / Agents", "運用定着"],
    ai05Cta: "お問い合わせ →",
    agri01Label: "AGRI 01",
    agri01Title: "インフラ設備の自動化",
    agri01Desc:
      "灌漑・換気・温度管理など農業インフラをIoTとソフトウェアで自動制御。人手に頼らず安定した栽培環境を実現し、省力化とコスト削減を両立します。",
    agri01Tags: ["IoT制御", "環境モニタリング", "省力化", "遠隔管理"],
    agri01Cta: "詳しく見る →",
    agri02Label: "AGRI 02",
    agri02Title: "海外製部品の輸入・取り付け・保守",
    agri02Desc:
      "海外の先端農業機器・部品を調達し、現場への取り付けから運用・保守点検までワンストップで対応。国内では手に入りにくい高性能パーツを、安心の日本語サポート付きで提供します。",
    agri02Tags: ["海外部品調達", "設置工事", "運用サポート", "保守点検"],
    agri02Cta: "お問い合わせ →",
    agri03Label: "AGRI 03",
    agri03Title: "極限空間での栽培",
    agri03Desc:
      "砂漠・寒冷地・都市部の地下空間など、従来不可能とされた環境での栽培を技術で実現。環境制御技術と独自ノウハウで、場所を選ばない食料生産の可能性を拓きます。",
    agri03Tags: ["環境制御", "植物工場", "閉鎖空間栽培", "食料安全保障"],
    agri04Label: "AGRI 04",
    agri04Title: "フィジカルAIによる自動化",
    agri04Desc:
      "ロボティクスとAIを融合し、収穫・選別・搬送などの農作業を自動化。フィジカルAIが人手不足の現場を支え、生産性と品質の両面を飛躍的に向上させます。",
    agri04Tags: ["農業ロボット", "自動収穫", "AI画像認識", "作業自動化"],
    approachLabel: "Our Approach",
    approachTitle: "私たちが大切にする3つのこと",
    approach: [
      {
        num: "01",
        title: "正直であること",
        desc: "実現可能性を率直に見極め、効果の高い領域から着実に進めます。過度な期待を煽らず、成果が出る順に一歩ずつ。",
      },
      {
        num: "02",
        title: "伴走すること",
        desc: "導入して終わりではなく、運用が定着するまで。お客様のチームの一員として、ともに歩みます。",
      },
      {
        num: "03",
        title: "現場に落とし込むこと",
        desc: "技術選定から運用設計まで、現場で使える形に落とし込みます。専門知識がなくても扱える、具体的な提案を。",
      },
    ],
    teamLabel: "Our Team",
    teamTitleLine1: "戦略から実装・運用まで、",
    teamTitleLine2: "信頼できるプロフェッショナルが担います。",
    teamDesc:
      "経営コンサルの視座と、現場で鍛え上げたエンジニアリングの実装力。二つを掛け合わせ、提案だけで終わらせず、稼働するシステムと継続的な価値創出まで一貫して責任を持ちます。",
    teamCard1Label: "Strategy & DX",
    teamCard1Title: "業務改革・DX領域の監修",
    teamCard1Desc:
      "大手コンサルティングファーム出身のメンバーが、業務改革・DX推進の設計を監修。経営課題の構造化から全社展開のロードマップまで、上流の意思決定に耐える品質でご支援します。",
    teamCard1Tags: ["大手コンサルファーム出身", "業務改革", "DX戦略", "全社展開"],
    teamCard2Label: "Engineering",
    teamCard2Title: "開発・デプロイ・メンテナンス",
    teamCard2Desc:
      "AIコンサルティング経験が豊富なエンジニア、シリコンバレーでバックエンド開発に従事した技術者、高専から筑波大学に進学し応用情報技術者を持つ情報技術者などが、ウェブアプリケーションの開発・デプロイ・運用保守を担当。リリース後の信頼性の担保まで一貫して責任を持ちます。",
    teamCard2Tags: [
      "AIコンサル経験豊富",
      "シリコンバレー開発経験",
      "高専→筑波大学",
      "応用情報技術者",
    ],
    techStackLabel: "Tech Stack",
    techStackTitle: "使用技術",
    techStackDesc:
      "中小企業でも安心して導入できるよう、実績・安定性・サポート体制が確立された技術のみを採用しています。",
    techGroups: {
      frontend: "フロントエンド",
      backend: "バックエンド",
      aiml: "AI・機械学習",
      cloud: "クラウド・インフラ",
    },
    techMoreTitle: "上記以外の技術にも対応可能",
    techMoreDesc:
      "お客様の既存環境・社内標準・業界要件に合わせて、記載以外の言語・フレームワーク・クラウド・SaaS連携にも柔軟に対応いたします。まずはお気軽にご相談ください。",
    newsLabel: "News",
    newsTitle: "お知らせ",
    newsListCta: "一覧を見る →",
    ctaLabel: "Contact",
    ctaTitle: "まずは、お話ししませんか。",
    ctaDescLine1: "AIのことがわからなくても大丈夫です。",
    ctaDescLine2: "貴社・貴農園の状況に合わせて、一緒に考えます。",
    ctaCards: [
      { label: "AIコンサルティング", service: "consulting" },
      { label: "AI顧問 + ウェブサイト監修", service: "advisor" },
      { label: "農業×エンジニアリング", service: "agriculture" },
      { label: "AI導入・教育", service: "education" },
      { label: "CEO向けAI活用", service: "ceo" },
      { label: "Claude Code特化導入", service: "claude-code" },
    ],
    ctaCardAction: "お問い合わせ →",
    ctaOthers: "その他のお問い合わせはこちら →",
  },
  en: {
    heroBadge: "AI Consulting & Agriculture Engineering",
    heroTitleLine1: "Practical AI and engineering,",
    heroTitleLine2: "built for Japanese SMEs and farms.",
    heroDescLine1:
      "We support AI adoption and farm automation — strategy through implementation.",
    heroDescLine2:
      "Consulting, advisory, training, Claude Code, advertising, websites, subsidy programs, and agricultural automation. Eight focus areas, all the way to working systems.",
    contact: "Contact Us",
    viewServices: "View services →",
    trustStats: [
      { value: "Up to 75%", label: "Training subsidy supported" },
      { value: "8 areas", label: "AI × Agriculture" },
      { value: "Nationwide", label: "Online delivery available" },
      { value: "2 business days", label: "First reply" },
    ],
    visionLabel: "Our Vision",
    visionTitle: "Bringing AI to Japan's front lines.",
    visionBody1:
      "For most companies and producers, AI still feels out of reach — too hard, too expensive, with no obvious place to start. We've heard that story many times.",
    visionBody2:
      "We exist to close that gap. Translating state-of-the-art AI into the language of business, and using engineering to support farmers' operations. One company, one farm at a time — delivering real value.",
    visionStatAreas: "areas",
    visionStatAreasLabel: "in development",
    visionStatMarket: "Japan",
    visionStatMarketLabel: "market focus",
    visionStatFound: "2026",
    visionStatFoundLabel: "founded",
    getStartedLabel: "Get Started",
    getStartedTitle: "Start small. Scale when it works.",
    getStartedDesc:
      "No big contract required. Start with a free 30-minute assessment and a 3-minute company deck, and see whether we're a fit.",
    step01Title: "Free AI assessment (30 min)",
    step01Desc:
      "We listen to your current workflows and challenges, then identify one high-impact area for AI. No hard sell.",
    step01Points: [
      "Zoom or in-person",
      "NDA on request — we can handle confidential data",
      "Verbal summary on the spot",
    ],
    step01Cta: "Book a session →",
    step02Title: "3-minute company deck",
    step02Desc:
      "A one-page PDF summarizing our services, typical engagement patterns, price ranges, and subsidy examples. Perfect for internal review.",
    step02Points: [
      "1-page PDF",
      "Price ranges and engagement model included",
      "No signup, same-day delivery",
    ],
    step02Cta: "Get the deck →",
    step03Title: "PoC from a single team or workflow",
    step03Desc:
      "No company-wide rollout upfront. We focus on the one team or workflow where AI is most likely to pay off, then expand from proven results.",
    step03Points: [
      "1–2 month PoC",
      "Success criteria agreed up front",
      "Government training subsidies available",
    ],
    step03Cta: "Get in touch →",
    servicesLabel: "Our Services",
    servicesTitle: "Building Japan's future with AI and agriculture.",
    servicesDesc:
      "Two business pillars connect technology to the front lines of primary industry — each delivering real outcomes.",
    aiSection: "AI Business",
    agriSection: "Agriculture Business",
    ai01Label: "AI 01",
    ai01Title: "AI Consulting",
    ai01Desc:
      "From strategy to implementation and operation. We support Japanese companies' AI adoption end to end — from discovery to adoption.",
    ai01Tags: ["AI strategy", "Data analysis", "Workflow automation", "Generative AI"],
    ai01Cta: "Learn more →",
    ai02Label: "AI 02",
    ai02Title: "AI Advisor + Website Oversight",
    ai02Desc:
      "As an outside AI advisor, we partner on monthly management, operations, and web improvements. From strategy sparring to on-the-ground suggestions, engaged continuously as a contractor.",
    ai02Tags: [
      "AI advisor contract",
      "Website oversight",
      "Monthly sessions",
      "Contract basis",
    ],
    ai02ClientLabel: "Client:",
    ai02Client: "Japan Asset Strategy Organization",
    ai02Cta: "Discuss an advisory engagement →",
    ai03Label: "AI 03",
    ai03Badge: "Up to 75% subsidy",
    ai03Title: "AI Adoption & Training",
    ai03Desc:
      "Build practical AI literacy into your organization. Onboarding workshops, department-specific sessions, and hands-on application — learning programs where employees take the lead.",
    ai03Tags: [
      "Employee training",
      "Department workshops",
      "Prompt design",
      "Workflow application",
    ],
    ai03Cta: "View training programs →",
    ai04Label: "AI 04",
    ai04Title: "AI for CEOs",
    ai04Desc:
      "Organizing information, framing hypotheses, and drafting materials for executive decisions. From market analysis to strategy sparring and board-deck drafts — a dedicated partner for CEO input and decision-making.",
    ai04Tags: [
      "For executives",
      "Decision support",
      "Strategy sparring",
      "Research & drafting",
    ],
    ai04Cta: "Get in touch →",
    ai05Label: "AI 05",
    ai05Title: "Claude Code Adoption",
    ai05Desc:
      "Maximize engineering-team productivity with Claude Code. Environment setup, in-house guidelines, MCP and sub-agent design, plus rollout and adoption — tailored to engineering organizations.",
    ai05Tags: ["Claude Code", "Setup", "MCP / Agents", "Rollout & adoption"],
    ai05Cta: "Get in touch →",
    agri01Label: "AGRI 01",
    agri01Title: "Infrastructure Automation",
    agri01Desc:
      "Automated control of irrigation, ventilation, and temperature using IoT and software. Stable growing environments without manual labor — saving effort and cost.",
    agri01Tags: ["IoT control", "Environmental monitoring", "Labor saving", "Remote management"],
    agri01Cta: "Learn more →",
    agri02Label: "AGRI 02",
    agri02Title: "Imports, Installation & Maintenance",
    agri02Desc:
      "We source cutting-edge overseas equipment and parts, install them on-site, and handle operation and maintenance end to end. High-performance parts hard to get in Japan, backed by Japanese-language support.",
    agri02Tags: [
      "Overseas sourcing",
      "Installation",
      "Operations support",
      "Maintenance",
    ],
    agri02Cta: "Get in touch →",
    agri03Label: "AGRI 03",
    agri03Title: "Growing in Extreme Environments",
    agri03Desc:
      "Deserts, cold regions, urban underground spaces — growing in environments previously deemed impossible. Environmental-control technology and proprietary know-how for food production untethered from location.",
    agri03Tags: [
      "Environmental control",
      "Plant factories",
      "Closed-space cultivation",
      "Food security",
    ],
    agri04Label: "AGRI 04",
    agri04Title: "Physical AI Automation",
    agri04Desc:
      "Robotics and AI together automate harvesting, sorting, and transport. Physical AI supports fields short on labor and lifts both productivity and quality.",
    agri04Tags: [
      "Agricultural robotics",
      "Automated harvesting",
      "AI vision",
      "Task automation",
    ],
    approachLabel: "Our Approach",
    approachTitle: "Three things we stand for",
    approach: [
      {
        num: "01",
        title: "Honesty",
        desc: "We candidly judge what's feasible and move forward where impact is highest. No hype — progress in order of demonstrated results.",
      },
      {
        num: "02",
        title: "Partnership",
        desc: "Delivery isn't the finish line. We stay engaged until adoption takes root — walking alongside your team.",
      },
      {
        num: "03",
        title: "Grounded execution",
        desc: "From technology choice to operational design, we translate everything into a form your team can actually use — concrete, without requiring expertise.",
      },
    ],
    teamLabel: "Our Team",
    teamTitleLine1: "From strategy to implementation and operation,",
    teamTitleLine2: "trusted professionals see it through.",
    teamDesc:
      "Management-consulting perspective combined with field-forged engineering execution. We don't stop at proposals — we own working systems and continuous value all the way through.",
    teamCard1Label: "Strategy & DX",
    teamCard1Title: "Business transformation & DX oversight",
    teamCard1Desc:
      "Members with backgrounds at top-tier consulting firms oversee business-transformation and DX design. From structuring management issues to company-wide rollout roadmaps — at quality that stands up to upstream decision-making.",
    teamCard1Tags: [
      "Top-tier consulting background",
      "Business transformation",
      "DX strategy",
      "Company-wide rollout",
    ],
    teamCard2Label: "Engineering",
    teamCard2Title: "Development, deployment & maintenance",
    teamCard2Desc:
      "Engineers with deep AI-consulting experience, backend developers who worked in Silicon Valley, and Applied Information Technology engineers (Kosen → University of Tsukuba) build, deploy, and maintain our web applications. We take responsibility for reliability after release.",
    teamCard2Tags: [
      "AI consulting experience",
      "Silicon Valley development",
      "Kosen → U. of Tsukuba",
      "Applied Information Technology",
    ],
    techStackLabel: "Tech Stack",
    techStackTitle: "Technologies we use",
    techStackDesc:
      "We only adopt technologies with proven track record, stability, and strong support — so SMEs can deploy with confidence.",
    techGroups: {
      frontend: "Frontend",
      backend: "Backend",
      aiml: "AI / ML",
      cloud: "Cloud & Infrastructure",
    },
    techMoreTitle: "We also support technologies beyond this list",
    techMoreDesc:
      "We flexibly support languages, frameworks, clouds, and SaaS integrations beyond this list — tailored to your existing environment, internal standards, and industry requirements. Please reach out.",
    newsLabel: "News",
    newsTitle: "News",
    newsListCta: "View all →",
    ctaLabel: "Contact",
    ctaTitle: "Let's start with a conversation.",
    ctaDescLine1: "No AI expertise needed.",
    ctaDescLine2: "We'll think it through with you, tailored to your situation.",
    ctaCards: [
      { label: "AI Consulting", service: "consulting" },
      { label: "AI Advisor + Website Oversight", service: "advisor" },
      { label: "Agriculture × Engineering", service: "agriculture" },
      { label: "AI Adoption & Training", service: "education" },
      { label: "AI for CEOs", service: "ceo" },
      { label: "Claude Code Adoption", service: "claude-code" },
    ],
    ctaCardAction: "Get in touch →",
    ctaOthers: "Other inquiries →",
  },
} as const;

// --- ABOUT ------------------------------------------------------------------
export const about = {
  ja: {
    heroBadge: "About Us",
    heroTitleLine1: "AIで、日本の",
    heroTitleLine2: "産業構造を、書き換える。",
    heroDescLine1: "clearAIは、人工知能の力を真に必要としている現場へ届けるため創業しました。",
    heroDescLine2: "大企業だけのものではない、すべての産業のためのAIを。",
    heroStat1: "1000億円",
    heroStat1Label: "2030年 売上目標",
    heroStat2: "120社",
    heroStat2Label: "支援目標企業数",
    missionLabel: "私たちのミッション",
    missionTitleLine1: "AIの力を、",
    missionTitleLine2: "すべての企業と、",
    missionTitleLine3: "すべての現場に。",
    missionBody1:
      "日本のAI導入率は、先進国の中でも著しく低い水準に留まっています。多くの企業が「AIに興味はある」と答える一方で、実際の業務改革には至っていない。この「関心」と「実践」の間にある大きな溝こそが、私たちが解決すべき課題です。",
    missionBody2:
      "AIブームが叫ばれる一方で、現場では「何から始めればいいかわからない」「導入したが使いこなせない」という声が後を絶ちません。技術だけが先行し、実際のビジネス課題と結びついていない。そのギャップが、日本全体の競争力を蝕んでいます。",
    missionBody3:
      "clearAIは、誇張や流行に乗るのではなく、誠実かつ地に足のついたアプローチでAI活用を推進します。お客様のビジネスを深く理解し、技術を現場の言葉に翻訳し、長期的なパートナーとして伴走する——それが私たちの約束です。",
    visionLabel: "Vision 2030",
    visionTitleLine1: "2030年、関東・東北で",
    visionTitleLine2: "最も信頼されるAIパートナーへ。",
    visionDesc:
      "派手な数字ではなく、一社一社の成功を積み重ねる。この3つの数字は、その結果として私たちが辿り着く約束です。",
    vision: [
      {
        num: "1000億円",
        label: "目標売上高（2030年）",
        desc: "粗利率50%超・継続率95%の「質を伴う1000億円」。派手な数字ではなく、一社一社の成功を積み重ねた結果としての売上です。",
      },
      {
        num: "120社",
        label: "支援目標企業数",
        desc: "うちAI顧問契約40社・継続支援60社。広く浅くではなく、深く長く伴走できる関係性を築きます。",
      },
      {
        num: "関東・東北",
        label: "事業展開エリア",
        desc: "茨城発・関東・東北No.1のAI×地域産業ブティックへ。その先に、2035年の全国展開と食料安全保障インフラとしての中堅テック企業を見据えます。",
      },
    ],
    valuesLabel: "価値観",
    valuesTitleLine1: "私たちが大切にする、",
    valuesTitleLine2: "4つの信条。",
    values: [
      {
        num: "01",
        title: "誠実",
        subtitle: "Integrity",
        quote: "できないことは、できないと言う。",
        desc: "AIは万能ではありません。誇張した提案で信頼を失うより、正直に限界を伝え、できることに全力を尽くす。それが長期的な関係の基盤です。",
      },
      {
        num: "02",
        title: "伴走",
        subtitle: "Partnership",
        quote: "納品して終わり、ではない。",
        desc: "AIシステムを構築して終わりではなく、運用・改善・社内定着まで共に走り続けます。お客様の成功こそが、私たちの成功です。",
      },
      {
        num: "03",
        title: "翻訳",
        subtitle: "Translation",
        quote: "技術を、現場の言葉に変える。",
        desc: "難解なAI用語を使わず、現場の方々が理解し、使いこなせる言葉で説明します。技術の民主化とは、誰もが使える言葉にすることから始まります。",
      },
      {
        num: "04",
        title: "長期視点",
        subtitle: "Long-term View",
        quote: "派手さより、10年続く仕組み。",
        desc: "流行の技術を追いかけるのではなく、10年後も価値を発揮し続ける堅牢な仕組みを構築します。本質的な変革には、時間と根気が必要です。",
      },
    ],
    whyNowLabel: "Why Now",
    whyNowTitleLine1: "2026年、",
    whyNowTitleLine2: "日本のAI元年。",
    whyNow: [
      {
        num: "01",
        title: "生成AIによる生産性革命",
        desc: "ChatGPTの登場から数年、生成AIは実験段階を超え、ビジネスの現場で実際の生産性向上を生み出す段階に入りました。今こそが、本格導入の最良のタイミングです。先手を打つ企業と出遅れる企業の差は、これから急速に拡大します。",
      },
      {
        num: "02",
        title: "労働人口減少という構造課題",
        desc: "日本は世界有数の少子高齢化社会として、慢性的な労働力不足に直面しています。AIによる自動化・効率化は、もはや選択肢ではなく必須の経営戦略です。特に農業・製造業・サービス業での人手不足は深刻です。",
      },
      {
        num: "03",
        title: "海外との技術ギャップの拡大",
        desc: "米国・中国・欧州のAI活用は日本を大きく上回るペースで進んでいます。このまま手をこまねいていれば、日本企業の国際競争力はさらに低下します。今すぐ動き出した企業だけが、次の10年を生き残れます。",
      },
    ],
    businessLabel: "事業領域",
    businessTitleLine1: "2つの事業で、",
    businessTitleLine2: "日本を変える。",
    business1Label: "事業 01",
    business1Title: "AIコンサルティング",
    business1Subtitle: "戦略から実装まで、一気通貫で伴走する。",
    business1Items: [
      "AI戦略策定・ロードマップ設計",
      "業務自動化・プロセス変革の実装支援",
      "社内AI人材育成・研修プログラム",
      "導入後の継続的な改善・運用サポート",
    ],
    business1Cta: "詳しく見る",
    business2Label: "事業 02",
    business2Title: "農業×エンジニアリング",
    business2Subtitle: "エンジニアの力で、農家の経営を支える。",
    business2Items: [
      "農家向けEC・ネット販売サイト構築",
      "利益率改善コンサルティング",
      "受発注・顧客管理の業務効率化",
      "ブランディング・マーケティング支援",
    ],
    business2Cta: "詳しく見る",
    messageLabel: "Message",
    messageTitle: "代表取締役メッセージ",
    messageParas: [
      "「なぜ農業なのか」と、よく聞かれます。",
      "私がAIと農業の掛け合わせに可能性を見出したのは、日本の農業現場が抱える課題の深刻さと、そこにあるテクノロジーへの渇望を目の当たりにしたからです。高齢化する農家の方々、引き継ぎ手のない農地、気候変動による収穫の不安定さ——これらの問題は、決して農業だけの話ではありません。日本の食の安全保障そのものです。",
      "同時に、日本の企業全体を見渡したとき、AI活用における途方もない機会損失が見えました。「AIは大企業のもの」「自分たちには難しすぎる」という思い込みが、多くの中堅・中小企業の可能性を閉ざしています。その壁を壊したい。",
      "clearAIという名前には、「明確な（clear）AI」という意味を込めています。難解な技術を分かりやすく、誠実に、現場に根ざした形で届ける会社でありたい。2030年に売上1000億円という目標は、決して小さくはありません。しかし、粗利率50%超・顧客継続率95%という「質を伴った1000億円」は、無理に積み上げた数字ではなく、一社一社の成功の積み重ねとして達成する。次の1兆円へと続く揺るぎない踏み台になると信じています。",
      "まだ小さな会社です。でも、大きなビジョンがあります。共に歩んでいただける仲間、パートナー、お客様を、心からお待ちしています。",
    ],
    messageSigTitle: "clearAI株式会社 代表取締役",
    messageSigName: "髙橋 敢輝",
    companyLabel: "Company",
    companyTitle: "企業情報",
    companyInfo: [
      { label: "会社名", value: "clearAI株式会社" },
      { label: "読み方", value: "クリアエーアイ" },
      { label: "英文表記", value: "clearAI Inc." },
      { label: "別表記", value: "clear AI / クリアAI / クリア・エーアイ / クリアーエーアイ" },
      { label: "設立", value: "2026年4月" },
      { label: "代表取締役", value: "髙橋 敢輝" },
      { label: "所在地", value: "茨城県" },
      { label: "事業内容", value: "AIコンサルティング事業 / 農業×エンジニアリング事業" },
      { label: "資本金", value: "非公開" },
      { label: "主要取引銀行", value: "非公開" },
      { label: "URL", value: "https://clearai.jp" },
    ],
    nameLabel: "About the Name",
    nameTitle: "社名「clearAI」について",
    nameBody1Html:
      "社名「<strong>clearAI（クリアエーアイ）</strong>」は、英単語の <em>clear</em>（明確な・クリアな）と <em>AI</em>（Artificial Intelligence：人工知能）を組み合わせた造語です。",
    nameBody2Html:
      "正式名称は「clearAI株式会社」、英文表記は「clearAI Inc.」。日本語では「<strong>クリアエーアイ</strong>」と読み、「クリアAI」「クリア・エーアイ」「クリアーエーアイ」「クリアエイアイ」といった表記・読み方でも呼ばれることがあります。",
    nameBody3Html:
      "難解なAI技術を、誇張せず、分かりやすく、誠実に。企業と現場に<strong>クリアな価値</strong>を届けるという私たちの理念がこの社名に込められています。",
    nameCardLabel: "Name & Reading",
    nameCardRows: [
      { label: "正式社名", value: "clearAI株式会社" },
      { label: "読み方（ふりがな）", value: "クリアエーアイ かぶしきがいしゃ" },
      { label: "英文表記", value: "clearAI Inc." },
      {
        label: "別表記・通称",
        value:
          "clear AI / Clear AI / クリアAI / クリア・エーアイ / クリアーエーアイ / クリアエイアイ",
      },
      { label: "ドメイン", value: "clearai.jp" },
    ],
    historyLabel: "History",
    historyTitle: "沿革",
    timeline: [
      {
        year: "2025年",
        title: "構想開始",
        description:
          "創業準備、市場調査、パートナー候補との対話。日本のAI活用の現状と課題を徹底的にリサーチ。",
        future: false,
      },
      {
        year: "2026年4月",
        title: "clearAI株式会社 設立",
        description:
          "定款認証を経て、AIの力を日本の企業と農業現場に届けるというミッションのもと茨城県にて創業。",
        future: false,
      },
      {
        year: "2026年",
        title: "AIコンサルティング事業 開始",
        description: "日本企業向けに、AI戦略策定から実装・運用まで一気通貫の支援を開始。",
        future: false,
      },
      {
        year: "2026年",
        title: "農業×エンジニアリング事業 開始",
        description: "EC構築・利益率改善・業務効率化で、農家の経営をエンジニアの力で支援開始。",
        future: false,
      },
      {
        year: "2027年（予定）",
        title: "AI顧問10社 / 農業事業 単月黒字化",
        description:
          "紹介・金融機関提携・士業ネットワークを通じてAI顧問契約を10社まで拡大。農業事業はEC運用代行で月額MRR化し、単月黒字を達成。",
        future: true,
      },
      {
        year: "2028年（予定）",
        title: "AI顧問20社 / 農業事業 通期黒字",
        description:
          "代表の卒業に合わせ経営フルコミット。顧問契約20社・農業事業の通期黒字化を実現し、仕組みで回る組織へ。",
        future: true,
      },
      {
        year: "2030年（目標）",
        title: "売上1000億円 / 支援企業120社 / 関東・東北No.1ブティック",
        description:
          "粗利率50%超・継続率95%の「質を伴う1000億円」を達成。茨城発、AI×地域産業の専門ブティックとして関東・東北での確固たる地位を築く。",
        future: true,
      },
    ],
    joinLabel: "Join Us",
    joinTitleLine1: "共に、未来をつくる",
    joinTitleLine2: "仲間を探しています。",
    joinDesc:
      "clearAIのミッションに共感してくださる方、パートナー企業様、採用希望の方、まずはお気軽にご連絡ください。",
    joinCta: "お問い合わせ",
    joinRecruit: "採用情報 →",
  },
  en: {
    heroBadge: "About Us",
    heroTitleLine1: "Rewriting Japan's",
    heroTitleLine2: "industrial architecture with AI.",
    heroDescLine1:
      "clearAI was founded to bring AI to the front lines that actually need it.",
    heroDescLine2: "AI for every industry — not just large enterprises.",
    heroStat1: "JPY 100B",
    heroStat1Label: "2030 revenue target",
    heroStat2: "120",
    heroStat2Label: "Target companies served",
    missionLabel: "Our Mission",
    missionTitleLine1: "Bringing the power of AI to",
    missionTitleLine2: "every company",
    missionTitleLine3: "and every frontline.",
    missionBody1:
      "Japan's AI adoption rate lags notably even among developed economies. Most companies say they are interested in AI, but few translate that interest into actual transformation. The gap between interest and practice is the gap we exist to close.",
    missionBody2:
      "Amid all the AI hype, the field keeps telling us the same things: 'We don't know where to start,' and 'We bought it but can't make it stick.' Technology runs ahead of the business problem it should solve — and that gap is eroding Japan's competitiveness.",
    missionBody3:
      "clearAI pursues AI adoption through honesty and grounded execution, not hype. Understand your business deeply, translate technology into the language of your workplace, and walk alongside you as a long-term partner — that's our commitment.",
    visionLabel: "Vision 2030",
    visionTitleLine1: "By 2030, the most trusted AI partner",
    visionTitleLine2: "across Kanto and Tohoku.",
    visionDesc:
      "Not flashy numbers — compounding wins, one company at a time. These three figures are the promise we'll reach by doing exactly that.",
    vision: [
      {
        num: "JPY 100B",
        label: "Revenue target (2030)",
        desc: "A 'JPY 100 billion with quality': 50%+ gross margin, 95% retention. Not a number forced into a spreadsheet — the result of one-by-one customer success.",
      },
      {
        num: "120",
        label: "Target companies served",
        desc: "40 AI-advisor contracts and 60 ongoing engagements. Not broad-and-shallow — deep, long-term partnerships.",
      },
      {
        num: "Kanto & Tohoku",
        label: "Business area",
        desc: "From Ibaraki, toward the #1 AI × regional-industry boutique across Kanto and Tohoku — then nationwide rollout by 2035 and a mid-sized tech company anchoring food-security infrastructure.",
      },
    ],
    valuesLabel: "Values",
    valuesTitleLine1: "Four principles",
    valuesTitleLine2: "we stand for.",
    values: [
      {
        num: "01",
        title: "Integrity",
        subtitle: "Integrity",
        quote: "We say 'no' when we mean it.",
        desc: "AI isn't omnipotent. Rather than win trust with overpromises and lose it later, we tell the truth about limits and go all-in on what's possible. That's the foundation of a lasting relationship.",
      },
      {
        num: "02",
        title: "Partnership",
        subtitle: "Partnership",
        quote: "Delivery is not the end.",
        desc: "Building the AI system isn't the finish line — we run together through operation, improvement, and internal adoption. Your success is our success.",
      },
      {
        num: "03",
        title: "Translation",
        subtitle: "Translation",
        quote: "Turn technology into the language of the floor.",
        desc: "We avoid jargon and explain in words your team can use. Democratizing technology starts by making it speak plainly.",
      },
      {
        num: "04",
        title: "Long-term View",
        subtitle: "Long-term View",
        quote: "Ten-year systems, not flashy demos.",
        desc: "Instead of chasing trends, we build sturdy systems that still create value a decade from now. Real change takes time and patience.",
      },
    ],
    whyNowLabel: "Why Now",
    whyNowTitleLine1: "2026:",
    whyNowTitleLine2: "Japan's AI inflection point.",
    whyNow: [
      {
        num: "01",
        title: "A productivity revolution from generative AI",
        desc: "A few years after ChatGPT, generative AI has moved past experimentation and now delivers real productivity gains in the field. This is the best moment for serious adoption. The gap between early movers and laggards is about to widen fast.",
      },
      {
        num: "02",
        title: "A structural labor shortage",
        desc: "As one of the world's most aged societies, Japan faces a chronic labor shortfall. AI automation and efficiency are no longer optional — they're required strategy. Agriculture, manufacturing, and services feel the shortage most acutely.",
      },
      {
        num: "03",
        title: "A widening technology gap with the world",
        desc: "The US, China, and Europe are using AI at a much faster pace. Standing still only erodes Japanese companies' competitiveness further. Only those that start moving now will survive the next decade.",
      },
    ],
    businessLabel: "Business",
    businessTitleLine1: "Two businesses",
    businessTitleLine2: "remaking Japan.",
    business1Label: "Business 01",
    business1Title: "AI Consulting",
    business1Subtitle:
      "Strategy through implementation — an end-to-end partner.",
    business1Items: [
      "AI strategy & roadmap design",
      "Workflow automation & process transformation",
      "In-house AI talent development & training",
      "Ongoing improvement & operations after launch",
    ],
    business1Cta: "Learn more",
    business2Label: "Business 02",
    business2Title: "Agriculture × Engineering",
    business2Subtitle: "Supporting farmers' operations with engineering.",
    business2Items: [
      "E-commerce and direct-sales sites for farmers",
      "Margin-improvement consulting",
      "Streamlined order and customer management",
      "Branding and marketing support",
    ],
    business2Cta: "Learn more",
    messageLabel: "Message",
    messageTitle: "Message from the CEO",
    messageParas: [
      "I'm often asked, 'Why agriculture?'",
      "I came to see the potential of AI × agriculture by standing on the ground — the depth of the problems Japanese farms face, and their thirst for technology. Aging farmers, fields with no successor, harvests destabilized by climate change — these aren't only about agriculture. They are Japan's food security itself.",
      "At the same time, looking across Japanese companies, I saw enormous opportunity cost in AI adoption. 'AI is for big companies.' 'It's too hard for us.' Those beliefs close the door on possibility for many mid-market and small businesses. I want to break that wall.",
      "The name clearAI carries the meaning of 'clear AI.' We want to deliver difficult technology clearly, honestly, and grounded in the field. A JPY 100 billion revenue target by 2030 is not small. But 'JPY 100B with quality' — 50%+ gross margin, 95% retention — will be achieved by stacking one customer success on another. I believe it becomes an unshakeable springboard to the next JPY 1T.",
      "We're still a small company, but the vision is large. We warmly welcome teammates, partners, and customers who'd like to walk alongside us.",
    ],
    messageSigTitle: "clearAI Inc., CEO",
    messageSigName: "Kanki Takahashi",
    companyLabel: "Company",
    companyTitle: "Company Information",
    companyInfo: [
      { label: "Company name", value: "clearAI Inc." },
      { label: "Japanese reading", value: "kurea-eeai" },
      { label: "English name", value: "clearAI Inc." },
      {
        label: "Other spellings",
        value: "clear AI / Clear AI / クリアAI / クリア・エーアイ / クリアーエーアイ",
      },
      { label: "Founded", value: "April 2026" },
      { label: "CEO", value: "Kanki Takahashi" },
      { label: "Location", value: "Ibaraki, Japan" },
      {
        label: "Business",
        value: "AI consulting / Agriculture × Engineering",
      },
      { label: "Capital", value: "Private" },
      { label: "Main bank", value: "Private" },
      { label: "URL", value: "https://clearai.jp" },
    ],
    nameLabel: "About the Name",
    nameTitle: "About the name “clearAI”",
    nameBody1Html:
      "The company name “<strong>clearAI</strong>” is a coined word combining <em>clear</em> and <em>AI</em> (Artificial Intelligence).",
    nameBody2Html:
      "The legal name is “clearAI Inc.” Japanese speakers typically read it as “kurea-eeai”, and variants such as “クリアAI” and “クリア・エーアイ” are also used.",
    nameBody3Html:
      "Deliver difficult AI technology clearly, without exaggeration, honestly. The name embodies our commitment to deliver <strong>clear value</strong> to companies and the front lines they operate.",
    nameCardLabel: "Name & Reading",
    nameCardRows: [
      { label: "Legal name", value: "clearAI Inc." },
      { label: "Japanese reading", value: "kurea-eeai kabushiki kaisha" },
      { label: "English name", value: "clearAI Inc." },
      {
        label: "Variants",
        value: "clear AI / Clear AI / クリアAI / クリア・エーアイ / クリアーエーアイ",
      },
      { label: "Domain", value: "clearai.jp" },
    ],
    historyLabel: "History",
    historyTitle: "Timeline",
    timeline: [
      {
        year: "2025",
        title: "Conceptualization",
        description:
          "Founding preparation, market research, and conversations with prospective partners. A thorough read of Japan's AI status quo and pain points.",
        future: false,
      },
      {
        year: "April 2026",
        title: "clearAI Inc. founded",
        description:
          "After incorporation, launched in Ibaraki on the mission of bringing AI to Japanese companies and farms.",
        future: false,
      },
      {
        year: "2026",
        title: "AI consulting business launched",
        description:
          "End-to-end support for Japanese companies — from AI strategy through implementation and operation.",
        future: false,
      },
      {
        year: "2026",
        title: "Agriculture × Engineering business launched",
        description:
          "Engineering support for farmers: e-commerce, margin improvement, and operational efficiency.",
        future: false,
      },
      {
        year: "2027 (planned)",
        title: "10 AI advisor clients / Agriculture cash-flow positive",
        description:
          "Expand AI-advisor contracts to 10 companies via referrals, financial-institution partnerships, and professional networks. Make the agriculture business MRR-based through e-commerce operations and achieve monthly break-even.",
        future: true,
      },
      {
        year: "2028 (planned)",
        title: "20 AI advisors / Agriculture profitable full year",
        description:
          "Founder commits full-time to management. 20 advisor contracts and a full-year-profitable agriculture business — an organization that runs on process.",
        future: true,
      },
      {
        year: "2030 (goal)",
        title: "JPY 100B revenue / 120 clients / #1 boutique in Kanto & Tohoku",
        description:
          "'JPY 100B with quality' at 50%+ gross margin and 95% retention. A boutique rooted in Ibaraki, leading at the intersection of AI and regional industry across Kanto and Tohoku.",
        future: true,
      },
    ],
    joinLabel: "Join Us",
    joinTitleLine1: "Building the future",
    joinTitleLine2: "with us.",
    joinDesc:
      "If our mission resonates — as a teammate, partner, or future hire — please reach out.",
    joinCta: "Contact",
    joinRecruit: "Careers →",
  },
} as const;

// --- COMMON hero badges etc. for sub-pages ---------------------------------
export const aiConsulting = {
  ja: {
    heroBadge: "AI Consulting & DX",
    heroTitleLine1: "AI導入を、",
    heroTitleLine2: "共に考え、共に創る。",
    heroDescLine1: "戦略策定から開発・実装・運用まで、一気通貫でサポート。",
    heroDescLine2: "貴社のビジネスに最適なAIソリューションを共に創り上げます。",
    heroNote: "大手コンサルティングファーム出身者が監修",
    primaryCta: "無料相談を申し込む",
    secondaryCta: "サービスを見る →",
    introLabel: "About",
    introTitle: "AIは魔法ではなく、道具です。正しく使えば、確実に成果が出ます。",
    introBody:
      "多くの企業が「AIを導入したい」と考えながら、何から始めればいいかわからずに立ち止まっています。clearAIは、AIの専門知識がない企業でも安心して始められるよう、ヒアリングから運用定着まで伴走します。派手な提案ではなく、貴社の課題に合った地に足のついたAI活用を、一緒に見つけていきます。",
    ctaLabel: "Contact",
    ctaTitle: "まずは、お話ししませんか。",
    ctaDescLine1: "「何から始めればいいかわからない」でも大丈夫です。",
    ctaDescLine2: "貴社の状況をお聞きした上で、最適な進め方をご提案します。",
    ctaButton: "無料で相談する",
  },
  en: {
    heroBadge: "AI Consulting & DX",
    heroTitleLine1: "Adopting AI,",
    heroTitleLine2: "together.",
    heroDescLine1:
      "From strategy to build, implementation, and operation — end-to-end support.",
    heroDescLine2: "We co-create the AI solution that fits your business.",
    heroNote: "Led by ex-Big 4 consulting firm members",
    primaryCta: "Book a free consultation",
    secondaryCta: "View services →",
    introLabel: "About",
    introTitle:
      "AI isn't magic — it's a tool. Used well, it reliably delivers results.",
    introBody:
      "Many companies want to adopt AI but stall because they don't know where to start. clearAI walks alongside you from discovery to post-launch adoption, so teams without AI expertise can start with confidence. No flashy proposals — we find grounded AI use cases that fit your actual problems.",
    ctaLabel: "Contact",
    ctaTitle: "Let's start with a conversation.",
    ctaDescLine1: "'I don't know where to start' is a fine place to start.",
    ctaDescLine2:
      "We'll listen to your situation and propose the best way forward.",
    ctaButton: "Book a free consultation",
  },
} as const;

export const advisor = {
  ja: {
    heroBadge: "AI Advisor",
    heroTitleLine1: "AI活用の判断を、",
    heroTitleLine2: "隣で支える顧問。",
    heroDescLine1: "経営・現場の「これAIでできる？」に、即答できる相手がいる。",
    heroDescLine2: "戦略から技術選定、PoC評価、社内教育まで継続的に伴走します。",
    heroNote: "月5万円〜／最低契約期間なし",
    primaryCta: "無料相談を申し込む",
    secondaryCta: "プランを見る →",
    ctaLabel: "Contact",
    ctaTitle: "月5万円から、AIの相談相手を。",
    ctaDesc:
      "まずは30分の無料相談で、貴社にフィットするかをご確認ください。",
    ctaButton: "無料で相談する",
  },
  en: {
    heroBadge: "AI Advisor",
    heroTitleLine1: "An advisor at your side,",
    heroTitleLine2: "supporting your AI decisions.",
    heroDescLine1:
      "Someone you can ask in real time: 'Can AI do this?'",
    heroDescLine2:
      "Ongoing support — from strategy and tool selection to PoC review and internal training.",
    heroNote: "From JPY 50K/month. No minimum commitment.",
    primaryCta: "Book a free consultation",
    secondaryCta: "See plans →",
    ctaLabel: "Contact",
    ctaTitle: "An AI sounding board — from JPY 50K/month.",
    ctaDesc:
      "Start with a free 30-minute consultation to see if we're a fit.",
    ctaButton: "Book a free consultation",
  },
} as const;

export const subsidy = {
  ja: {
    heroBadge: "Subsidy Support",
    heroTitleLine1: "研修費・AI導入費を、",
    heroTitleLine2Pre: "",
    heroTitleHighlight: "最大75%",
    heroTitleLine2Post: "削減。",
    heroDescLine1: "人材開発支援助成金・IT導入補助金・茨城県独自の支援制度まで。",
    heroDescLine2: "計画策定から実施報告、支給申請までフルサポートします。",
    primaryCta: "実質負担額を試算する",
    secondaryCta: "無料で相談する →",
    ctaLabel: "Contact",
    ctaTitle: "補助金を、損なく使い切る。",
    ctaDesc:
      "「どの制度が合うかわからない」「書類作成に自信がない」——そんな段階からご相談いただけます。30分の無料診断から。",
    ctaButton: "無料相談を予約する",
    ctaLink: "研修プログラムを見る →",
  },
  en: {
    heroBadge: "Subsidy Support",
    heroTitleLine1: "Cut training and AI adoption costs",
    heroTitleLine2Pre: "by up to ",
    heroTitleHighlight: "75%",
    heroTitleLine2Post: ".",
    heroDescLine1:
      "Japan's Human Resources Development Subsidy, IT Introduction Subsidy, and Ibaraki Prefecture programs — all covered.",
    heroDescLine2:
      "Full support from planning through execution reports and disbursement applications.",
    primaryCta: "Estimate your net cost",
    secondaryCta: "Free consultation →",
    ctaLabel: "Contact",
    ctaTitle: "Use subsidies to their full potential.",
    ctaDesc:
      "'I'm not sure which program fits' or 'I'm not confident with the paperwork' — both are fine starting points. Begin with a free 30-minute assessment.",
    ctaButton: "Book a free consultation",
    ctaLink: "View training programs →",
  },
} as const;

export const training = {
  ja: {
    heroBadge: "AI Training",
    heroTitleLine1: "AIを「使える」組織に、",
    heroTitleLine2: "研修で変える。",
    heroDescLine1: "経営層から現場まで、階層別に設計したAI実務研修。",
    heroDescLine2:
      "ツールを「知っている」ではなく「成果が出せる」状態へ引き上げます。",
    subsidyBadgeTextPre: "最大",
    subsidyBadgeHighlight: "75%",
    subsidyBadgeTextPost: "の研修費を助成金で削減",
    primaryCta: "研修の相談をする",
    secondaryCta: "プログラムを見る →",
    ctaLabel: "Contact",
    ctaTitle: "「使える」を、研修から。",
    ctaDesc:
      "貴社の課題に合わせて、カリキュラムからご提案します。助成金活用もあわせてご相談ください。",
    ctaButton: "無料で相談する",
  },
  en: {
    heroBadge: "AI Training",
    heroTitleLine1: "Training that turns your organization",
    heroTitleLine2: "into one that actually uses AI.",
    heroDescLine1:
      "Role-based AI practical training from executives to front-line staff.",
    heroDescLine2:
      "From 'knowing the tool' to 'delivering results with it.'",
    subsidyBadgeTextPre: "Up to ",
    subsidyBadgeHighlight: "75%",
    subsidyBadgeTextPost: " of training costs covered by subsidies",
    primaryCta: "Ask about training",
    secondaryCta: "View programs →",
    ctaLabel: "Contact",
    ctaTitle: "Start with training that sticks.",
    ctaDesc:
      "We tailor the curriculum to your challenges. Ask about subsidies too.",
    ctaButton: "Book a free consultation",
  },
} as const;

export const claude = {
  ja: {
    heroBadge: "Claude Specialized",
    heroTitleLine1a: "Claudeを、",
    heroTitleLine2: "経営の武器にする。",
    heroDescLine1: "AnthropicのClaudeに特化した、国内屈指の専門支援。",
    heroDescLine2:
      "経営者プライベートスクールと、企業向けオンライン導入支援の2本立てで、Claudeを成果に直結させます。",
    heroNote: "使いこなせなかったら、全額返金保証",
    primaryCta: "無料相談を申し込む",
    secondaryCta: "サービスを見る →",
    ctaLabel: "Contact",
    ctaTitle: "Claudeで、経営を一段進める。",
    ctaDesc: "30分の無料面談で、貴社にフィットする支援形態をご提案します。",
    ctaButton: "無料で相談する",
  },
  en: {
    heroBadge: "Claude Specialized",
    heroTitleLine1a: "Make Claude",
    heroTitleLine2: "a management weapon.",
    heroDescLine1:
      "Japan's leading practice dedicated to Anthropic's Claude.",
    heroDescLine2:
      "A two-track program — executive private school plus enterprise rollout — that turns Claude into business results.",
    heroNote: "Full money-back guarantee if you can't use it.",
    primaryCta: "Book a free consultation",
    secondaryCta: "View services →",
    ctaLabel: "Contact",
    ctaTitle: "Move management one level up with Claude.",
    ctaDesc:
      "In a free 30-minute session, we'll recommend the right engagement for you.",
    ctaButton: "Book a free consultation",
  },
} as const;

export const aiAgriculture = {
  ja: {
    heroBadge: "Engineering × Agriculture",
    heroTitleLine1: "農業インフラから、",
    heroTitleLine2: "宇宙・防衛産業へ。",
    heroDescLine1: "田んぼの水流管理や、ビニールハウスの自動化から。",
    heroDescLine2: "農家の声に根差した技術を、未来の極限環境へ拡張する。",
    primaryCta: "無料相談を申し込む",
    secondaryCta: "ソリューションを見る →",
    ctaLabel: "Contact",
    ctaTitle: "まずは、お話ししませんか。",
    ctaDescLine1: "「うちの農園でもECは始められる？」というご相談から大歓迎です。",
    ctaDescLine2: "現状をお聞きした上で、最適な支援プランをご提案します。",
    ctaButton: "無料で相談する",
  },
  en: {
    heroBadge: "Engineering × Agriculture",
    heroTitleLine1: "From farm infrastructure",
    heroTitleLine2: "to space and defense.",
    heroDescLine1:
      "Starting with paddy-field water management and greenhouse automation.",
    heroDescLine2:
      "Technology rooted in farmers' voices — extending into tomorrow's extreme environments.",
    primaryCta: "Book a free consultation",
    secondaryCta: "View solutions →",
    ctaLabel: "Contact",
    ctaTitle: "Let's start with a conversation.",
    ctaDescLine1:
      "'Can our farm start selling online?' — conversations like that are warmly welcome.",
    ctaDescLine2:
      "We'll listen to where you are today and propose the right support plan.",
    ctaButton: "Book a free consultation",
  },
} as const;

export const faq = {
  ja: {
    heroBadge: "FAQ",
    heroTitle: "よくあるご質問",
    heroDescLine1: "お問い合わせ前に多く寄せられる質問を12項目まとめました。",
    heroDescLine2: "ここに無い内容は、お気軽にお問い合わせください。",
    primaryCta: "質問を見る",
    secondaryCta: "直接相談する →",
    listLabel: "Questions",
    listTitle: "12の質問にお答えします",
    ctaLabel: "Contact",
    ctaTitle: "答えが見つからないときは。",
    ctaDescLine1: "個別のご質問は、お問い合わせフォームからご連絡ください。",
    ctaDescLine2: "初回返信は2営業日以内、NDA締結にも対応します。",
    ctaButton: "無料で相談する",
  },
  en: {
    heroBadge: "FAQ",
    heroTitle: "Frequently Asked Questions",
    heroDescLine1: "Twelve questions we're most often asked before inquiries.",
    heroDescLine2:
      "If your question isn't here, please reach out — we're happy to help.",
    primaryCta: "See questions",
    secondaryCta: "Contact us directly →",
    listLabel: "Questions",
    listTitle: "Answers to 12 common questions",
    ctaLabel: "Contact",
    ctaTitle: "When you can't find the answer.",
    ctaDescLine1:
      "For specific questions, please reach out via the contact form.",
    ctaDescLine2: "First reply within 2 business days. NDAs welcome.",
    ctaButton: "Book a free consultation",
  },
} as const;

// Contact page strings (covers common user-facing labels)
export const contact = {
  ja: {
    label: "Contact",
    title: "お問い合わせ",
    descA: "2営業日以内にご返信します。お急ぎの方は",
    descB: "まで直接ご連絡ください。",
    thanksTitle: "送信ありがとうございます",
    thanksDesc:
      "担当者より2営業日以内にご連絡いたします。確認用メールが届かない場合は迷惑メールフォルダもご確認ください。",
    sendAnother: "もう一件送る",
    inquiryStep: "お問い合わせ種別",
    inquiryBusinessLabel: "サービス相談",
    inquiryBusinessDesc: "AI導入・顧問・研修・農業など",
    inquiryEngineerLabel: "エンジニア採用",
    inquiryEngineerDesc: "チームに参加したい方",
    inquiryOtherLabel: "その他",
    inquiryOtherDesc: "取材・提携など",
    serviceStep: "ご興味のあるサービス",
    optional: "（任意）",
    required: "*",
    contactStep: "ご連絡先",
    nameLabelEngineer: "お名前",
    nameLabelBusiness: "ご担当者名",
    namePlaceholder: "山田 太郎",
    emailLabel: "メールアドレス",
    emailPlaceholder: "info@example.com",
    companyLabel: "会社名",
    companyPlaceholder: "株式会社〇〇",
    positionLabel: "希望ポジション",
    positionSelect: "選択してください",
    experienceLabel: "経験年数",
    addOptionalBusiness: "電話番号・従業員規模を追加",
    addOptionalEngineer: "ポートフォリオURLを追加",
    phoneLabel: "電話番号",
    phonePlaceholder: "03-XXXX-XXXX",
    sizeLabel: "従業員規模",
    portfolioLabel: "GitHub / ポートフォリオ URL",
    portfolioPlaceholder: "https://github.com/your-id",
    messageStep: "ご相談内容",
    messageStepEngineer: "自己紹介・志望動機",
    messagePlaceholderEngineer:
      "使用技術・得意分野・志望動機など、自由にご記入ください",
    messagePlaceholderDefault:
      "ご質問やご相談内容をご記入ください（10文字以上）",
    messagePlaceholderServicePrefix: "について、検討背景や聞きたいことをご記入ください",
    commErrorLabel: "通信エラーが発生しました。時間をおいて再度お試しください。",
    submitting: "送信中...",
    submit: "送信する",
    legalA: "送信いただいた情報は、当社",
    legalB: "に従い適切に管理します。",
    privacyLink: "プライバシーポリシー",
    infoReplyLabel: "返信目安",
    infoReplyValue: "2営業日以内",
    infoMethodLabel: "対応方法",
    infoMethodValue: "メール / オンライン",
    infoHoursLabel: "営業時間",
    infoHoursValue: "平日 9:00–18:00",
    infoDirectLabel: "直接連絡",
    infoDirectValue: "t.kante@clearai.jp",
  },
  en: {
    label: "Contact",
    title: "Contact",
    descA: "We'll respond within 2 business days. For urgent matters, email",
    descB: "directly.",
    thanksTitle: "Thank you for your message",
    thanksDesc:
      "A team member will get back to you within 2 business days. If you don't see a confirmation email, please check your spam folder.",
    sendAnother: "Send another",
    inquiryStep: "Inquiry type",
    inquiryBusinessLabel: "Service inquiry",
    inquiryBusinessDesc: "AI adoption, advisor, training, agriculture…",
    inquiryEngineerLabel: "Engineer hiring",
    inquiryEngineerDesc: "For those wanting to join the team",
    inquiryOtherLabel: "Other",
    inquiryOtherDesc: "Press, partnerships, etc.",
    serviceStep: "Service of interest",
    optional: "(optional)",
    required: "*",
    contactStep: "Your contact info",
    nameLabelEngineer: "Your name",
    nameLabelBusiness: "Contact name",
    namePlaceholder: "Taro Yamada",
    emailLabel: "Email address",
    emailPlaceholder: "info@example.com",
    companyLabel: "Company",
    companyPlaceholder: "Example Inc.",
    positionLabel: "Desired position",
    positionSelect: "Please select",
    experienceLabel: "Years of experience",
    addOptionalBusiness: "Add phone number and company size",
    addOptionalEngineer: "Add portfolio URL",
    phoneLabel: "Phone",
    phonePlaceholder: "+81-3-XXXX-XXXX",
    sizeLabel: "Company size",
    portfolioLabel: "GitHub / portfolio URL",
    portfolioPlaceholder: "https://github.com/your-id",
    messageStep: "Your inquiry",
    messageStepEngineer: "Intro & motivation",
    messagePlaceholderEngineer:
      "Feel free to share your tech stack, strengths, and motivation.",
    messagePlaceholderDefault:
      "Please share your question or request (min. 10 characters).",
    messagePlaceholderServicePrefix:
      " — share the background and what you'd like to discuss.",
    commErrorLabel:
      "A communication error occurred. Please try again after a while.",
    submitting: "Sending...",
    submit: "Send",
    legalA: "The information you submit is handled per our",
    legalB: ".",
    privacyLink: "Privacy Policy",
    infoReplyLabel: "Response",
    infoReplyValue: "Within 2 business days",
    infoMethodLabel: "Method",
    infoMethodValue: "Email / online",
    infoHoursLabel: "Hours",
    infoHoursValue: "Weekdays 9:00–18:00",
    infoDirectLabel: "Direct email",
    infoDirectValue: "t.kante@clearai.jp",
  },
} as const;

export const privacy = {
  ja: {
    label: "Privacy Policy",
    title: "プライバシーポリシー",
    sections: [
      {
        title: "1. 個人情報の取り扱いについて",
        body: "clearAI株式会社（以下「当社」）は、お客様の個人情報を適切に保護し、取り扱うことが社会的責務であると考え、以下の方針に基づき個人情報の保護に努めます。",
      },
      {
        title: "2. 個人情報の収集",
        body: "当社は、サービスの提供にあたり、お客様の同意のもと、お名前、メールアドレス、電話番号、会社名等の個人情報を収集することがあります。",
      },
      {
        title: "3. 個人情報の利用目的",
        body: "収集した個人情報は、以下の目的で利用いたします。",
        bullets: [
          "サービスの提供・運営",
          "お問い合わせへの対応",
          "サービスの改善・新サービスの開発",
          "お客様への重要なお知らせの連絡",
        ],
      },
      {
        title: "4. 個人情報の第三者提供",
        body: "当社は、法令に基づく場合を除き、お客様の同意なく第三者に個人情報を提供することはありません。",
      },
      {
        title: "5. 個人情報の管理",
        body: "当社は、個人情報の漏洩、滅失またはき損の防止のために、適切なセキュリティ対策を講じます。",
      },
      {
        title: "6. お問い合わせ",
        body: "個人情報の取り扱いに関するお問い合わせは、以下までご連絡ください。",
        extra: "clearAI株式会社\nメール: t.kante@clearai.jp",
      },
    ],
    date: "制定日: 2025年1月1日",
  },
  en: {
    label: "Privacy Policy",
    title: "Privacy Policy",
    sections: [
      {
        title: "1. Handling of personal information",
        body: "clearAI Inc. (\"the Company\") regards the proper protection and handling of personal information as a social responsibility, and will endeavor to protect personal information based on the policy below.",
      },
      {
        title: "2. Collection of personal information",
        body: "In providing services, the Company may collect personal information such as name, email address, phone number, and company name, with the customer's consent.",
      },
      {
        title: "3. Purposes of use",
        body: "Collected personal information is used for the following purposes:",
        bullets: [
          "Provision and operation of services",
          "Response to inquiries",
          "Improvement of services and development of new services",
          "Important communications to customers",
        ],
      },
      {
        title: "4. Provision to third parties",
        body: "Except as required by law, the Company does not provide personal information to third parties without the customer's consent.",
      },
      {
        title: "5. Management of personal information",
        body: "The Company implements appropriate security measures to prevent leakage, loss, or damage of personal information.",
      },
      {
        title: "6. Contact",
        body: "Please direct inquiries regarding the handling of personal information to the address below.",
        extra: "clearAI Inc.\nEmail: t.kante@clearai.jp",
      },
    ],
    date: "Effective date: January 1, 2025",
  },
} as const;

export const terms = {
  ja: {
    label: "Terms of Service",
    title: "利用規約",
    sections: [
      {
        title: "第1条（適用）",
        body: "本規約は、clearAI株式会社（以下「当社」）が提供するすべてのサービス（以下「本サービス」）の利用に関する条件を定めるものです。",
      },
      {
        title: "第2条（利用登録）",
        body: "登録希望者が当社の定める方法によって利用登録を申請し、当社がこれを承認することによって、利用登録が完了するものとします。",
      },
      {
        title: "第3条（禁止事項）",
        body: "ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。",
        bullets: [
          "法令または公序良俗に違反する行為",
          "犯罪行為に関連する行為",
          "当社のサービスの運営を妨害する行為",
          "他のユーザーに迷惑をかける行為",
          "不正アクセスをする行為",
        ],
      },
      {
        title: "第4条（免責事項）",
        body: "当社は、本サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。",
      },
      {
        title: "第5条（サービス内容の変更等）",
        body: "当社は、ユーザーに通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし、これによってユーザーに生じた損害について一切の責任を負いません。",
      },
      {
        title: "第6条（準拠法・裁判管轄）",
        body: "本規約の解釈にあたっては、日本法を準拠法とします。本サービスに関して紛争が生じた場合には、東京地方裁判所を第一審の専属的合意管轄裁判所とします。",
      },
    ],
    date: "制定日: 2025年1月1日",
  },
  en: {
    label: "Terms of Service",
    title: "Terms of Service",
    sections: [
      {
        title: "Article 1 (Application)",
        body: "These Terms set forth the conditions of use of all services (\"the Services\") provided by clearAI Inc. (\"the Company\").",
      },
      {
        title: "Article 2 (User registration)",
        body: "Registration is completed when a prospective user applies in the manner specified by the Company and the Company approves the application.",
      },
      {
        title: "Article 3 (Prohibited acts)",
        body: "When using the Services, users shall not engage in the following acts:",
        bullets: [
          "Acts that violate laws, regulations, or public order and morals",
          "Acts related to criminal activity",
          "Acts that interfere with the operation of the Services",
          "Acts that cause nuisance to other users",
          "Unauthorized access",
        ],
      },
      {
        title: "Article 4 (Disclaimer)",
        body: "The Company bears no responsibility for any transactions, communications, or disputes arising between users and other users or third parties in connection with the Services.",
      },
      {
        title: "Article 5 (Changes to services)",
        body: "The Company may change the content of, or suspend, the Services without notice to users and bears no responsibility for any damages that may arise as a result.",
      },
      {
        title: "Article 6 (Governing law and jurisdiction)",
        body: "These Terms shall be governed by and construed under the laws of Japan. Any disputes arising out of or relating to the Services shall be subject to the exclusive jurisdiction of the Tokyo District Court as the court of first instance.",
      },
    ],
    date: "Effective date: January 1, 2025",
  },
} as const;

export const sitemap = {
  ja: {
    label: "Sitemap",
    title: "サイトマップ",
    desc: "clearAI株式会社（読み方：クリアエーアイ）の全ページ一覧です。目的のページへ素早くアクセスしてください。",
    blogHeading: "ブログ記事",
    xmlNoteA: "XMLサイトマップは",
    xmlNoteB: "にあります（検索エンジン向け）。",
  },
  en: {
    label: "Sitemap",
    title: "Sitemap",
    desc:
      "A full list of pages on clearAI Inc. Jump to the page you need.",
    blogHeading: "Blog posts",
    xmlNoteA: "XML sitemap is at ",
    xmlNoteB: " (for search engines).",
  },
} as const;

// Combined export for convenience
export const translations = {
  header,
  footer,
  toggle,
  home,
  about,
  aiConsulting,
  advisor,
  subsidy,
  training,
  claude,
  aiAgriculture,
  faq,
  contact,
  privacy,
  terms,
  sitemap,
} as const;

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
    navFde: "FDEコンサルティング",
    navFdeDesc: "現場に入り込むForward Deployed型でAI活用を一気通貫支援",
    navAiConsulting: "AIコンサル・DX",
    navAiConsultingDesc: "大手コンサル出身者が監修する戦略〜実装支援",
    navAdvisor: "AI顧問",
    navAdvisorDesc: "月10万円〜、継続的にAI活用を伴走",
    navTraining: "AI研修",
    navTrainingDesc: "チームのAIリテラシーを底上げ",
    navClaude: "Claude特化",
    navClaudeDesc: "Anthropic Claudeに特化した導入支援",
    navAdvertising: "広告",
    navAdvertisingDesc: "AI活用で広告運用を最適化・自動化",
    navWebsite: "ウェブサイト作成",
    navWebsiteDesc: "AI時代に成果が出るサイトを高速制作",
    navSns: "SNS運用",
    navSnsDesc: "AI活用でSNSの企画・制作・投稿・分析を代行",
    navSubsidy: "補助金",
    navSubsidyDesc: "研修・AI導入費を助成金で最大75%削減",
    navRobotRental: "ロボットレンタル",
    navRobotRentalDesc: "ヒューマノイドの短期レンタル・PoC・実証",
    navSpatialScan: "空間3Dスキャン",
    navSpatialScanDesc: "現場をカメラで3Dデータ化し、点検・巡回ロボット導入を設計",
    navAiAgent: "AIエージェント開発",
    navAiAgentDesc: "業務を任せられる自律型AIエージェントを設計・開発・運用",
    navResearch: "研究開発",
    navResearchDesc: "産業特化ロボットOS・模倣学習・機械学習の研究開発",
    navCases: "導入事例",
    navNews: "お知らせ",
    navAbout: "会社概要",
    docsDl: "資料DL",
    diagnosis: "無料AI診断",
    contact: "役員無料相談する",
    menuAria: "メニュー",
    subMenuAria: "のサブメニュー",
  },
  en: {
    navAi: "AI",
    navFde: "FDE Consulting",
    navFdeDesc: "Forward Deployed support, embedded in your team end to end",
    navAiConsulting: "AI Consulting & DX",
    navAiConsultingDesc: "Strategy to implementation, led by ex-Big 4 consultants",
    navAdvisor: "AI Advisor",
    navAdvisorDesc: "From JPY 100K/month. Ongoing AI advisory.",
    navTraining: "AI Training",
    navTrainingDesc: "Raise your team's AI literacy.",
    navClaude: "Claude Specialized",
    navClaudeDesc: "Specialized support for Anthropic Claude",
    navAdvertising: "Advertising",
    navAdvertisingDesc: "AI-powered ad operations and automation",
    navWebsite: "Website",
    navWebsiteDesc: "Fast, AI-ready websites that drive results",
    navSns: "SNS Management",
    navSnsDesc: "AI-powered planning, production, posting & analytics",
    navSubsidy: "Subsidy",
    navSubsidyDesc: "Cut training and AI rollout costs by up to 75% with subsidies",
    navRobotRental: "Robot Rental",
    navRobotRentalDesc: "Short-term humanoid rental, PoC & demos",
    navSpatialScan: "3D Spatial Scan",
    navSpatialScanDesc: "Turn sites into 3D data with a camera and plan robot rollout",
    navAiAgent: "AI Agent Development",
    navAiAgentDesc: "Design, build, and operate autonomous AI agents you can delegate work to",
    navResearch: "R&D",
    navResearchDesc: "R&D in industry-specific robot OS, imitation learning & ML",
    navCases: "Case Studies",
    navNews: "News",
    navAbout: "About",
    docsDl: "Download",
    diagnosis: "Free AI Check",
    contact: "Contact",
    menuAria: "Menu",
    subMenuAria: " submenu",
  },
} as const;


// --- FOOTER -----------------------------------------------------------------
export const footer = {
  ja: {
    logoAlt: "clearAI株式会社（クリアエーアイ）ロゴ",
    tagline: "中小企業に、戦略から実装まで一貫した、使えるAIと実装力を。",
    companyLine1: "clearAI株式会社（読み方：クリアエーアイ）",
    companyLine2: "代表取締役 髙橋 敢輝",
    companyLine3: "茨城県 / 2026年4月設立",
    servicesHeading: "事業",
    services: {
      aiConsulting: "AIコンサルティング",
      advisor: "AI顧問",
      aiAgent: "AIエージェント開発",
      training: "AI研修",
      subsidy: "補助金サポート",
      claude: "Claude特化",
      advertising: "AI広告運用",
      website: "ウェブサイト作成",
      sns: "SNS運用代行",
      robotRental: "ロボットレンタル",
      research: "研究開発",
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
      "Practical AI and engineering for SMEs — from strategy to implementation.",
    companyLine1: "clearAI Inc. (Japanese name: clearAI Kabushiki Kaisha)",
    companyLine2: "CEO: kante takahashi",
    companyLine3: "Ibaraki, Japan / Founded April 2026",
    servicesHeading: "Services",
    services: {
      aiConsulting: "AI Consulting",
      advisor: "AI Advisor",
      aiAgent: "AI Agent Development",
      training: "AI Training",
      subsidy: "Subsidy Support",
      claude: "Claude Specialized",
      advertising: "AI Advertising",
      website: "Website Production",
      sns: "SNS Management",
      robotRental: "Robot Rental",
      research: "Research & Development",
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
      "AIの専門知識がない企業でも、ヒアリングから運用定着まで伴走し、貴社の課題に合った地に足のついたAI活用を一緒に見つけます。",
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
      "Even without AI expertise, we walk alongside you from discovery to post-launch adoption to find grounded AI use cases that fit your actual problems.",
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
    heroNote: "月10万円〜／最低契約期間なし",
    primaryCta: "無料相談を申し込む",
    secondaryCta: "プランを見る →",
    ctaLabel: "Contact",
    ctaTitle: "月10万円から、AIの相談相手を。",
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
    heroNote: "From JPY 100K/month. No minimum commitment.",
    primaryCta: "Book a free consultation",
    secondaryCta: "See plans →",
    ctaLabel: "Contact",
    ctaTitle: "An AI sounding board — from JPY 100K/month.",
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
      "「どの制度が合うかわからない」段階から、30分の無料診断でご相談いただけます。",
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
      "Start from 'I'm not sure which program fits' with a free 30-minute assessment.",
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
    inquiryBusinessDesc: "AI導入・顧問・研修など",
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
    infoDirectValue: "info@clearai.jp",
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
    inquiryBusinessDesc: "AI adoption, advisor, training…",
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
    infoDirectValue: "info@clearai.jp",
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
        extra: "clearAI株式会社\nメール: info@clearai.jp",
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
        extra: "clearAI Inc.\nEmail: info@clearai.jp",
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

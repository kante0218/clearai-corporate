export type FaqItem = {
  q: { ja: string; en: string };
  a: { ja: string; en: string };
};

export const faqItems: FaqItem[] = [
  {
    q: {
      ja: "初めての相談で、何を用意すればよいですか？",
      en: "What should I prepare for the first consultation?",
    },
    a: {
      ja: "特別な準備は不要で、30分の無料診断で現状業務・課題をヒアリングし、効果の高い領域を1つその場でお伝えします。",
      en: "No preparation needed — in the 30-minute free diagnostic we listen to your operations and challenges, then pinpoint one high-impact area on the spot.",
    },
  },
  {
    q: {
      ja: "AIコンサルティングの費用感は？",
      en: "What does AI consulting cost?",
    },
    a: {
      ja: "スポット相談・AI顧問（月2.5万円〜）・PoC導入（1〜2ヶ月）・全社展開（3ヶ月〜）でレンジが異なり、初回ヒアリングでご予算に合った最適な入口と料金目安をお伝えします。",
      en: "Pricing varies by engagement — spot consultation, AI advisor retainer (from JPY 25,000/month), PoC rollout (1–2 months), or company-wide projects (3 months+) — and we'll match the right entry point to your budget at the first hearing.",
    },
  },
  {
    q: {
      ja: "中小企業や個人事業主でも依頼できますか？",
      en: "Can SMEs or sole proprietors engage you?",
    },
    a: {
      ja: "主要なお客様は中小企業で、数名〜数十名の事業者が現場で実際に使えるAI活用を支援することを得意としています。",
      en: "SMEs are our primary clients, and we specialise in helping businesses of a few to a few dozen employees implement AI that actually works on the ground.",
    },
  },
  {
    q: {
      ja: "補助金・助成金は活用できますか？",
      en: "Can we use government subsidies or grants?",
    },
    a: {
      ja: "人材開発支援助成金（最大75%）・IT導入補助金・茨城県独自制度に対応し、連携社労士とともに計画策定から実施報告まで伴走します。",
      en: "We support the Human Resource Development Support Grant (up to 75%), the IT Introduction Subsidy, and Ibaraki Prefecture's own programs, accompanying you from planning through final reporting alongside our partnered labour attorney.",
    },
  },
  {
    q: {
      ja: "最短でどれくらいで導入できますか？",
      en: "What is the fastest implementation timeline?",
    },
    a: {
      ja: "単発の研修・ワークショップは2〜4週間、PoC導入は1〜2ヶ月、全社戦略・実装は3〜6ヶ月が目安で、ご要望に応じて個別にスケジューリングします。",
      en: "One-off training or workshops take 2–4 weeks, PoC integration 1–2 months, and a company-wide strategy project 3–6 months, with scheduling tailored to your scope.",
    },
  },
  {
    q: {
      ja: "秘密保持はどうなりますか？",
      en: "How is confidentiality handled?",
    },
    a: {
      ja: "初回ヒアリング前からNDA締結に対応（貴社様式・当社雛形どちらでも可）し、業務データ・顧客情報を当社のAI学習等に二次利用することはありません。",
      en: "We sign NDAs before the first hearing (your template or ours), and your data will never be used for secondary purposes such as training our AI.",
    },
  },
  {
    q: {
      ja: "契約形態はどのようなものがありますか？",
      en: "What contract structures are available?",
    },
    a: {
      ja: "月額の業務委託（AI顧問）・プロジェクト請負（PoC・全社導入）・スポット単価（研修・診断）の3形態が中心で、短期契約からのスタートも可能です。",
      en: "The three main structures are monthly retainer (AI advisor), project-based fixed-price (PoC or company-wide rollout), and spot pricing (training or diagnostic), with short-term contracts available for a flexible start.",
    },
  },
  {
    q: {
      ja: "茨城県外の企業でも対応してもらえますか？",
      en: "Do you work with companies outside Ibaraki Prefecture?",
    },
    a: {
      ja: "全国対応しており、AIコンサル・研修はオンライン実施（対面は出張対応可）、国の補助金制度（人材開発支援助成金・IT導入補助金）も全国で活用できます。",
      en: "We serve clients nationwide, delivering AI consulting and training online (or in-person on request), with national subsidy programs accessible anywhere in Japan.",
    },
  },
  {
    q: {
      ja: "AIコンサル・研修からWeb制作まで、なぜ幅広く手がけているのですか？",
      en: "Why do you cover everything from AI consulting and training to web production?",
    },
    a: {
      ja: "事業のコアは「技術を現場が使える形に落とし込む」こと——AI顧問・研修もWeb制作も本質は現場の課題をエンジニアリングで解くことであり、戦略から実装・運用まで一貫して支援します。",
      en: "Our core is translating technology into what the field can actually use — AI advisory, training, and web production all share the same essence: listening to on-site challenges and solving them through engineering, from strategy to implementation and operation.",
    },
  },
  {
    q: {
      ja: "開発だけをお願いすることは可能ですか？",
      en: "Can I engage you for development only?",
    },
    a: {
      ja: "可能です。Claude Code特化導入やエンジニアリング単体に対応し、社内戦略が定まっている場合や他社コンサル併用での実装依頼にも最適です。",
      en: "Yes — we accept Claude Code deployment (AI 05) or standalone engineering engagements, ideal when your in-house strategy is set or you need implementation-only support alongside another consultancy.",
    },
  },
  {
    q: {
      ja: "新設企業とのことですが、任せて大丈夫ですか？",
      en: "You are a newly established company — can we trust you with our project?",
    },
    a: {
      ja: "2026年4月設立の新設企業ですが、代表・中核メンバーは大手コンサル・シリコンバレー開発・応用情報技術者の経験者で構成しており、機動力とPoC・短期契約の柔軟性でリスクを抑えて検証いただけます。",
      en: "Established in April 2026, ClearAI's founder and core team bring substantial experience — major consulting, Silicon Valley development, and Applied IT certification — and our agility combined with PoC-first contracts lets you validate results with controlled risk.",
    },
  },
  {
    q: {
      ja: "問い合わせしたら営業されますか？",
      en: "Will I be subjected to aggressive sales pitches after enquiring?",
    },
    a: {
      ja: "過度な営業はなく、無料診断の目的は高効果領域を1つ特定してお渡しすることで、不要と判断すればその旨率直にお伝えします。",
      en: "We don't use high-pressure sales — the free diagnostic is simply about identifying one high-impact area and handing it to you, and we'll tell you plainly if our services aren't a fit.",
    },
  },
];

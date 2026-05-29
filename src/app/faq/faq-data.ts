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
      ja: "特別な準備は不要です。30分の無料診断では、現状業務・課題・AIに期待することをヒアリングし、その場で効果の高そうな領域を1つ提示します。資料や数値はお手元にあるものだけで結構です。",
      en: "No special preparation is required. In the 30-minute free diagnostic we'll listen to your current operations, challenges, and expectations for AI — then pinpoint one high-impact area on the spot. Any documents or figures you have on hand are sufficient.",
    },
  },
  {
    q: {
      ja: "AIコンサルティングの費用感は？",
      en: "What does AI consulting cost?",
    },
    a: {
      ja: "スポット相談・AI顧問（月5万円〜）・PoC導入（1〜2ヶ月）・全社展開プロジェクト（3ヶ月〜）でレンジが異なります。ご予算感に応じて、どの入口から始めるのが最適かをご提案します。初回ヒアリングで料金レンジの目安までお伝えします。",
      en: "Pricing varies by engagement type: spot consultation, AI advisor retainer (from JPY 50,000/month), PoC rollout (1–2 months), and company-wide deployment projects (3 months+). We'll recommend the best starting point for your budget and share an indicative price range at the first hearing.",
    },
  },
  {
    q: {
      ja: "中小企業や個人事業主でも依頼できますか？",
      en: "Can SMEs or sole proprietors engage you?",
    },
    a: {
      ja: "はい、むしろ主要なお客様は中小企業です。大企業向けに設計された高額サービスしかないのが現状ですが、clearAIは従業員数が数名〜数十名の事業者様が、現場で実際に使えるAI活用を支援することを得意としています。",
      en: "Absolutely — SMEs are our primary clients. While the market is dominated by expensive services designed for large enterprises, clearAI specialises in helping businesses of a few to a few dozen employees implement AI that actually works on the ground.",
    },
  },
  {
    q: {
      ja: "補助金・助成金は活用できますか？",
      en: "Can we use government subsidies or grants?",
    },
    a: {
      ja: "人材開発支援助成金（最大75%）、IT導入補助金、茨城県独自の補助制度などに対応しています。連携社労士とともに計画策定から実施報告まで伴走します。詳細は /subsidy ページのシミュレーターでご確認いただけます。",
      en: "Yes. We support the Human Resource Development Support Grant (up to 75% subsidy), the IT Introduction Subsidy, and Ibaraki Prefecture's own programs. Together with our partnered labour and social security attorney, we accompany you from planning through final reporting. Use the simulator on the /subsidy page for details.",
    },
  },
  {
    q: {
      ja: "最短でどれくらいで導入できますか？",
      en: "What is the fastest implementation timeline?",
    },
    a: {
      ja: "単発の研修やプロンプトワークショップは2〜4週間で実施可能です。業務プロセスに組み込むPoC導入は1〜2ヶ月、全社的な戦略策定・実装は3〜6ヶ月が目安です。ご要望とスコープにより個別にスケジューリングします。",
      en: "One-off training sessions and prompt workshops can be delivered in 2–4 weeks. A PoC integration into your business processes typically takes 1–2 months; a company-wide strategy and implementation project runs 3–6 months. Scheduling is tailored to your requirements and scope.",
    },
  },
  {
    q: {
      ja: "秘密保持はどうなりますか？",
      en: "How is confidentiality handled?",
    },
    a: {
      ja: "初回ヒアリング前でもNDA（秘密保持契約）の締結に対応します。貴社指定のNDA様式でも、当社雛形のいずれでも構いません。お客様の業務データ・顧客情報を当社のAI学習等に二次利用することはありません。",
      en: "We can sign an NDA before the very first hearing — using either your preferred template or ours. Your operational data and customer information will never be used for secondary purposes such as training our AI models.",
    },
  },
  {
    q: {
      ja: "契約形態はどのようなものがありますか？",
      en: "What contract structures are available?",
    },
    a: {
      ja: "月額の業務委託契約（AI顧問）、プロジェクト単位の請負契約（PoC・全社導入）、スポット単価（研修1回・診断）の3形態が中心です。スタート時は柔軟な短期契約からでも構いません。",
      en: "The three main structures are: monthly business consignment (AI advisor retainer), project-based fixed-price contracts (PoC or company-wide rollout), and spot pricing (single training session or diagnostic). Starting with a flexible short-term contract is perfectly fine.",
    },
  },
  {
    q: {
      ja: "茨城県外の企業でも対応してもらえますか？",
      en: "Do you work with companies outside Ibaraki Prefecture?",
    },
    a: {
      ja: "全国対応しています。AIコンサル・研修はオンライン実施が可能で、対面が必要な場合は出張も承ります。補助金についても、国の制度（人材開発支援助成金・IT導入補助金）は全国どこでも活用可能です。",
      en: "We serve clients nationwide. AI consulting and training can be delivered online; in-person visits are also available on request. National-level subsidy programs such as the Human Resource Development Support Grant and IT Introduction Subsidy are accessible anywhere in Japan.",
    },
  },
  {
    q: {
      ja: "農業事業とAI事業はなぜ同じ会社でやっているのですか？",
      en: "Why are agricultural operations and AI services under the same company?",
    },
    a: {
      ja: "私たちは「技術を、現場が使える形に落とし込む」ことを事業のコアにしています。AI導入も、農業インフラ自動化も、本質は同じ——現場の課題を聞き、エンジニアリングで解くこと。むしろAI事業で培った技術翻訳力が、農業現場の自動化でも活きています。",
      en: "Our core mission is translating technology into something the field can actually use. AI adoption and agricultural infrastructure automation share the same essence — listening to on-site challenges and solving them through engineering. In fact, the technology-translation capability we've built in our AI practice directly fuels our agricultural automation work.",
    },
  },
  {
    q: {
      ja: "開発だけをお願いすることは可能ですか？",
      en: "Can I engage you for development only?",
    },
    a: {
      ja: "可能です。Claude Code特化導入（AI 05）やエンジニアリング単体でのご依頼にも対応します。既に社内でAI戦略が定まっている場合や、他社コンサル併用で実装部分だけを任せたい場合などにご活用ください。",
      en: "Yes. We accept engagements focused purely on Claude Code deployment (AI 05) or standalone engineering. This is ideal when your in-house AI strategy is already set, or when you're working with another consultancy and need us to handle implementation only.",
    },
  },
  {
    q: {
      ja: "新設企業とのことですが、任せて大丈夫ですか？",
      en: "You are a newly established company — can we trust you with our project?",
    },
    a: {
      ja: "2026年4月設立の新設企業です。一方で、代表および中核メンバーは大手コンサルティングファーム出身、シリコンバレー開発経験者、応用情報技術者など、十分な実務経験を持ちます。新設ゆえの機動力と、PoC・短期契約からの着手で、リスクを抑えて検証いただけます。",
      en: "clearAI Inc. was established in April 2026. That said, our founder and core team bring substantial hands-on experience — backgrounds include major consulting firms, Silicon Valley development, and Applied Information Technology certification. Our agility as a new company, combined with a PoC-first or short-term contract approach, lets you validate results with controlled risk.",
    },
  },
  {
    q: {
      ja: "問い合わせしたら営業されますか？",
      en: "Will I be subjected to aggressive sales pitches after enquiring?",
    },
    a: {
      ja: "過度な営業はいたしません。無料診断は「AI活用で効果の高そうな領域を1つ特定してお渡しする」ことが目的で、当社サービスが不要な場合はその旨お伝えします。合わないものを売ることは、長期的には双方にとって不利益だと考えています。",
      en: "We do not engage in high-pressure sales. The purpose of the free diagnostic is to identify and hand you one high-impact area for AI adoption — and if our services are not a fit, we will say so plainly. We believe selling something unsuitable is detrimental to both parties in the long run.",
    },
  },
];

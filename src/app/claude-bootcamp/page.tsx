"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import PricingCarousel from "@/components/PricingCarousel";
import CardCarousel from "@/components/CardCarousel";
import ClientLogoMarquee from "@/components/ClientLogoMarquee";

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
    <Reveal className="mb-7 lg:mb-9">
      <div className={`flex items-center gap-4 border-b pb-4 ${dark ? "border-white/25" : "border-neutral-900"}`}>
        <span className={`text-xs font-bold ${dark ? "text-white" : "text-neutral-900"}`}>§{index}</span>
        <span className={`text-xs font-semibold uppercase tracking-widest ${dark ? "text-neutral-400" : "text-neutral-500"}`}>{kicker}</span>
      </div>
      <h2 className={`mt-8 max-w-4xl text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.15] sm:leading-[1.05] tracking-[-0.02em] text-balance ${dark ? "text-white" : "text-neutral-900"}`}>
        {title}
      </h2>
      {desc && <p className={`mt-5 max-w-2xl text-[15px] leading-relaxed text-pretty ${dark ? "text-neutral-400" : "text-neutral-600"}`}>{desc}</p>}
    </Reveal>
  );
}

const TOOLS = [
  { name: "Claude", logo: "/logos/claude.svg" },
  { name: "Codex", logo: "/logos/openai.svg" },
  { name: "GitHub", logo: "/logos/github.svg" },
  { name: "Vercel", logo: "/logos/vercel.svg" },
  { name: "Firebase", logo: "/logos/firebase.svg" },
  { name: "Obsidian", logo: "/logos/obsidian.svg" },
];

type Plan = { name: string; price: string; unit: string; desc: string; features: string[]; featured: boolean; badge?: string };

type Copy = {
  heroBadge: string; heroKicker: string; heroTitlePre: string; heroTitleHi: string; heroTitlePost: string;
  heroDesc: string; heroCtaPrimary: string; heroCtaSecondary: string; heroTrust: string;
  marqueeLabel: string; marqueeNote: string;
  reassure: { t: string; d: string }[]; reassureCta: string; reassureCtaSub: string;
  stackLabel: string;
  statsLabel: string; stats: { value: string; unit: string; desc: string }[];
  painLabel: string; painTitle: string; painDesc: string; pains: string[];
  promiseLabel: string; promiseTitle: string; promiseDesc: string;
  promises: { num: string; title: string; desc: string; icons: string[] }[];
  guaranteeBadge: string; guaranteeTitle: string; guaranteeDesc: string;
  whyLabel: string; whyTitle: string; whyDesc: string;
  whyPoints: { title: string; desc: string; icons: string[] }[];
  dayLabel: string; dayTitle: string; dayDesc: string;
  dayRows: { time: string; title: string; desc: string }[];
  dayNote: string;
  buildLabel: string; buildTitle: string; buildDesc: string; builds: string[];
  forLabel: string; forTitle: string; forItems: { ok: boolean; text: string }[];
  caravanLabel: string; caravanTitle: string; caravanDesc: string;
  caravanSteps: { num: string; title: string; desc: string }[];
  caravanNote: string;
  pricingLabel: string; pricingTitle: string; pricingDesc: string;
  plans: Plan[]; planCta: string; pricingNote: string;
  subsidyLabel: string; subsidyTitlePre: string; subsidyTitleHi: string; subsidyTitlePost: string;
  subsidyDesc: string; subsidyCta: string;
  instructorLabel: string; instructorTitle: string; instructorDesc: string;
  instructorPoints: string[];
  faqLabel: string; faqTitle: string; faqItems: { q: string; a: string }[];
  consultLabel: string; consultTitle: string; consultDesc: string; consultItems: string[]; consultNote: string;
  ctaLabel: string; ctaTitle: string; ctaDesc: string; ctaButton: string; ctaSub: string;
  stickyTitle: string; stickySub: string; stickyBtn: string;
};

const COPY: Record<"ja" | "en", Copy> = {
  ja: {
    heroBadge: "複数講師の全国キャラバン｜Claude・Codex × GitHub・Vercel・Firebase｜各地の枠は数社限定",
    heroKicker: "In-house Web Dev Bootcamp",
    heroTitlePre: "Claude と Codex で、",
    heroTitleHi: "Webアプリ開発の内製化",
    heroTitlePost: "を本気で実現する。",
    heroDesc: "実装経験のあるエンジニアが全国の御社に伺い、Claude・Codex と GitHub・Vercel・Firebase を使って非エンジニア中心のチームでも自分たちでWebアプリ・社内ツールを作り本番公開できる状態をつくる出張ブートキャンプです。",
    heroCtaPrimary: "内製化を相談する（無料）",
    heroCtaSecondary: "自分の地域へのリクエスト",
    heroTrust: "オンライン30分・しつこい営業なし・相談だけでもOK・助成金の可否も確認できます",
    marqueeLabel: "中小企業・地域企業のAI活用・Webアプリ開発を支援しています",
    marqueeNote: "※ 掲載許可をいただいた企業のみ掲載しています",
    reassure: [
      { t: "オンライン30分", d: "来社不要、短時間のご相談からどうぞ。" },
      { t: "相談だけでもOK", d: "情報収集だけでも歓迎です。" },
      { t: "無理な営業は一切なし", d: "内容を確認し、不要な提案や追客はしません。" },
      { t: "成果保証・全額返金", d: "その日に1つも本番公開できなければ研修費は頂きません。" },
    ],
    reassureCta: "無料相談を予約する",
    reassureCtaSub: "オンライン30分・しつこい営業なし",
    stackLabel: "扱う標準スタック",
    statsLabel: "Why now",
    stats: [
      { value: "1", unit: "日", desc: "最初の本番Webアプリを、自社の手で作って公開するところまでを1日で。" },
      { value: "5", unit: "ツール", desc: "Claude・Codex・GitHub・Vercel・Firebase。実務の標準スタックを一気通貫で。" },
      { value: "75", unit: "%", desc: "人材開発支援助成金の活用で、内製化研修の実質負担を大きく圧縮。" },
    ],
    painLabel: "Problem",
    painTitle: "Webの内製化、この壁で止まっていませんか。",
    painDesc: "「自分たちで作れたら」と思いながら、外注とノーコードの間で止まっている——成長したい中小企業ほど、よく聞く声です。",
    pains: [
      "アプリを作るたびに外注で高くつき、スピードも出ない",
      "社内にエンジニアがいない、いても1人に依存している",
      "ノーコードで作ったが、結局かゆいところに手が届かない",
      "AIで作れると聞くが、GitHubやデプロイの壁で本番まで出せない",
      "作っても公開・運用・修正が回らず、結局放置される",
      "外注先に仕様が伝わらず、何度も作り直しになる",
    ],
    promiseLabel: "Promise",
    promiseTitle: "受講後、チームはこの状態に。",
    promiseDesc: "受講したチームが、自分たちの手で作って本番公開できる状態で帰ります。",
    promises: [
      { num: "01", title: "Claude と Codex で“作る”が回る", desc: "自然言語で指示してコードを生成・修正し動くアプリにするAIコーディングの型を、2つのエージェントの使い分けまで習得します。", icons: ["/logos/claude.svg", "/logos/openai.svg"] },
      { num: "02", title: "GitHub → Vercel で本番公開できる", desc: "コードの管理から本番デプロイまで自分たちで完結し、研修中に自社のアプリが本番URLとして世に出ます。", icons: ["/logos/github.svg", "/logos/vercel.svg"] },
      { num: "03", title: "Firebase でデータ・認証・保存まで", desc: "ログイン・データベース・フォーム保存など、実用アプリに必要なバックエンドを、サーバーを持たずに内製できます。", icons: ["/logos/firebase.svg"] },
    ],
    guaranteeBadge: "成果保証",
    guaranteeTitle: "その日のうちに、自社のWebアプリを1つ本番公開できなければ、研修費を全額返金します。",
    guaranteeDesc: "到達基準は Claude／Codex で作ったWebアプリを GitHub → Vercel で本番URLとして公開すること——その日のうちに到達できなければ研修費は申し受けません。",
    whyLabel: "Why now",
    whyTitle: "なぜ今、AIコーディングで“内製化”が現実になるのか。",
    whyDesc: "Claude・Codex の登場でWebアプリが「自然言語で作る」時代となり、GitHub・Vercel・Firebase の無料基盤と組み合わせれば小さなチームでも本番運用まで届きます。",
    whyPoints: [
      { title: "Claude と Codex を“相棒”にする", desc: "2つのエージェントの得意を使い分け、設計・実装・修正・デバッグを高速に回す型を学び、1人の手数が何倍にもなります。", icons: ["/logos/claude.svg", "/logos/openai.svg"] },
      { title: "GitHub で安全に育てる", desc: "変更履歴・バックアップ・チーム共同編集など、壊さずに継続的にアプリを育てる開発の基本を内製化します。", icons: ["/logos/github.svg"] },
      { title: "Vercel で即・本番公開", desc: "push するだけで自動デプロイされ、社内ツールも対外サービスも自分たちのURLで世に出せます。", icons: ["/logos/vercel.svg"] },
      { title: "Firebase で“動く”を支える", desc: "認証・データベース・ホスティング・通知など、サーバーを持たずに実用アプリを支えるバックエンドを扱えるようになります。", icons: ["/logos/firebase.svg"] },
    ],
    dayLabel: "One Day",
    dayTitle: "ある1日の進行（オンサイト・標準）",
    dayDesc: "業種・参加者レベルに合わせてオーダーメイドする、「1日で最初の本番アプリを公開する」典型的な流れです。",
    dayRows: [
      { time: "09:30", title: "オリエンテーション", desc: "今日作る自社アプリのゴールを決めます（社内ツール・予約・問い合わせ・Obsidianで業務を記録する仕組み・管理画面など）。" },
      { time: "10:00", title: "まず全員でClaudeをセットアップ", desc: "全員が同じスタートラインに立てるよう参加者全員のPCでClaude（Claude Code）を起動し、続けて Codex・GitHub・Vercel・Firebase もセットアップします。" },
      { time: "11:00", title: "AIで“作る”を体験", desc: "Claude／Codex に指示して画面とロジックを生成・修正し、AIコーディングの感覚を手を動かして掴みます。" },
      { time: "13:00", title: "自社アプリを実装", desc: "実際の業務で使うアプリ（例：Obsidianへの業務・日報記録、予約・管理ツール）をAIと一緒に形にしていく、1日の山場です。" },
      { time: "15:00", title: "GitHub → Vercel で本番公開", desc: "コードを管理して本番URLとしてデプロイし、自社のアプリが世に出ます。" },
      { time: "16:00", title: "Firebase で仕上げ", desc: "ログイン・データ保存など、実用に必要な機能を追加して“使える”状態に。" },
      { time: "17:30", title: "まとめ・30日サポート開始", desc: "改修・運用の進め方を共有し、研修後30日間のチャットサポートをその場で開通します。" },
    ],
    dayNote: "※ 1日で最小の本番アプリを公開→以降は伴走で本格的な内製化へ。半日版・複数日プログラム・経営層向け90分版にも対応します。",
    buildLabel: "Outcomes",
    buildTitle: "内製で作れるようになるもの。",
    buildDesc: "研修で「作って公開する」を一度通せば、外注していたものを自分たちの手で作れるようになります。",
    builds: [
      "社内業務の管理ダッシュボード",
      "予約・受付システム",
      "問い合わせフォーム＋自動通知",
      "顧客・案件管理ツール",
      "キャンペーンLP・サービスサイト",
      "在庫・受発注の管理アプリ",
      "Obsidianで業務・ナレッジを記録する仕組み",
      "データ集計・可視化ツール",
    ],
    forLabel: "For",
    forTitle: "こんな会社のための内製化プログラムです。",
    forItems: [
      { ok: true, text: "外注費を圧縮し、Web／アプリ開発を社内に取り込みたい中小企業" },
      { ok: true, text: "非エンジニア中心でも、自分たちでツールを作って運用したい" },
      { ok: true, text: "ノーコードの限界を感じ、本物のコードで内製したい" },
      { ok: true, text: "助成金を使って、賢く内製化に投資したい" },
      { ok: false, text: "高信頼性が必須の基幹システムをいきなり内製したい（→段階設計を別途ご相談）" },
      { ok: false, text: "すでに開発チームが確立しており、初歩は不要" },
    ],
    caravanLabel: "Nationwide Caravan",
    caravanTitle: "全国を、回り続けます。次は、あなたの地域へ。",
    caravanDesc: "複数の講師チームが全国を同時並行で巡回するキャラバン編成で御社に伺うため、地方でも希望の時期に日程を合わせやすく、内製化を諦める必要がありません。",
    caravanSteps: [
      { num: "01", title: "開催をリクエスト", desc: "フォームから地域と希望時期をお知らせいただければ、全国を同時並行で回る講師チームの近隣ルートに合わせ最短で日程を調整します。" },
      { num: "02", title: "事前ヒアリング", desc: "オンライン30分で業種・参加者・内製化したいアプリをすり合わせ、当日作る題材を設計します。" },
      { num: "03", title: "御社で1日開催", desc: "担当講師が御社の会議室に伺い、最大10名まで一人ひとり伴走します。" },
      { num: "04", title: "30日間の定着サポート", desc: "研修後もチャットで質問対応し、希望に応じて月次の伴走に移行して作り続けられるチームへ育てます。" },
    ],
    caravanNote: "※ 1社単独開催のほか、商工会議所・自治体・複数社合同での地域開催にも対応します。お気軽にご相談ください。",
    pricingLabel: "Pricing",
    pricingTitle: "料金",
    pricingDesc: "1日買い切り型。助成金を使えば、実質負担はさらに小さくなります。表示は税抜・1社あたりの目安です。",
    plans: [
      { name: "1DAY内製ブートキャンプ", price: "20万円〜", unit: "/ 回", desc: "御社オンサイトで1日集中。最初の本番アプリを公開したい方へ。", features: ["最大10名（オンサイト）", "Claude・Codex・GitHub・Vercel・Firebase 一式", "全員が本番Webアプリを1つ公開", "研修後30日チャットサポート", "成果保証つき"], featured: false },
      { name: "内製化定着パッケージ", price: "80万円〜", unit: "/ 3ヶ月", desc: "1日研修＋月次伴走で、継続的に作れるチームになるまで。最も成果が出る形です。", features: ["1DAY内製ブートキャンプ", "月次フォロー研修 ×3", "社内開発ルール・ガイドライン策定支援", "Slackでの随時質問対応", "助成金申請サポート付き"], featured: true, badge: "人気・成果が出る" },
      { name: "全社内製化キャラバン", price: "ご相談", unit: "", desc: "複数拠点・全社展開や、自治体・商工会との地域開催に。", features: ["複数拠点での連続開催", "部署別カリキュラム設計", "講師チーム編成", "効果測定・レポート", "助成金フルサポート"], featured: false },
    ],
    planCta: "この内容で相談する",
    pricingNote: "交通費・宿泊費は地域により別途。GitHub・Vercel・Firebase は無料枠から始められます。複数社合同・自治体開催は1社あたりを大きく抑えられます。",
    subsidyLabel: "Subsidy",
    subsidyTitlePre: "内製化研修は、",
    subsidyTitleHi: "最大75%",
    subsidyTitlePost: "を助成金でまかなえます。",
    subsidyDesc: "厚生労働省「人材開発支援助成金」活用で中小企業は研修経費の最大75%と受講者の賃金が助成対象となり、clearAIが社労士と連携して申請から実施報告まで伴走します（対象条件あり・無料相談で確認可）。",
    subsidyCta: "助成金活用について相談する →",
    instructorLabel: "Instructor",
    instructorTitle: "教えるのは、評論家ではなく実装者。",
    instructorDesc: "Claude・Codex で実際にWebアプリを内製し GitHub・Vercel・Firebase で本番運用してきたエンジニアが登壇するため、現場のつまずきの一歩先を教えられます。",
    instructorPoints: [
      "Claude／Codex で実際にWebアプリ・事業システムを構築・本番運用",
      "非エンジニアへの指導実績にもとづく“つまずき所”の先回り",
      "業種別ユースケースの引き出しで、その場で題材化",
      "研修後も同じ担当が伴走し、作り続けられるまで責任を持つ",
    ],
    faqLabel: "FAQ",
    faqTitle: "よくあるご質問",
    faqItems: [
      { q: "プログラミング未経験の社員でも本当に内製化できますか？", a: "はい——非エンジニアを主対象に設計しており、PCの基本操作ができれば参加でき、当日は一人ずつ伴走して全員が本番公開まで到達します。" },
      { q: "ClaudeとCodex、GitHub・Vercel・Firebaseのツール費用はかかりますか？", a: "GitHub・Vercel・Firebase は無料枠で研修が完結し、Claude／Codex などAIコーディングの利用料は規模により異なりますが当日に最適な始め方をご案内します。" },
      { q: "地方でも、本当に来てもらえますか？", a: "はい、全国47都道府県が対象で、地方の中小企業にこそ届けたく複数の講師チームでキャラバンを組み、近隣ルートに合わせて日程を調整します。" },
      { q: "成果保証とは具体的に何を指しますか？", a: "自社のWebアプリを GitHub→Vercel で本番URLとして1つ公開することを到達基準とし、その日のうちに到達できなかった場合は研修費を申し受けません。" },
      { q: "助成金は必ず使えますか？", a: "要件（研修10時間以上など）を満たせば経費の最大75%が対象で、1日研修は半日×複数回や月次伴走と組み合わせて要件を満たす設計が可能ですが、支給可否は審査で決まります。" },
      { q: "研修後のサポートはありますか？", a: "全プランに研修後30日間のチャットサポートが付き、定着パッケージでは月次伴走研修で作り続けられるチームになるまで継続的に支援します。" },
      { q: "セキュリティや情報の扱いが心配です。", a: "機密データの扱い・社内ルール・情報の線引き・本番アプリの安全な運用まで当日のカリキュラムに含め、安全に内製化を進める型をお渡しします。" },
    ],
    consultLabel: "Free Consultation",
    consultTitle: "無料相談で行うこと",
    consultDesc: "まずは御社の状況を伺い、進め方を一緒に整理するだけの30分から始められます。",
    consultItems: [
      "御社の業務の中で、アプリ化しやすいテーマを一緒に整理します",
      "1DAYブートキャンプか、3ヶ月の定着パッケージかを判断します",
      "助成金（最大75%）を活用できる可能性を確認します",
      "無理な営業はしません。不要だと感じたら、その場で終了でOKです",
    ],
    consultNote: "ご相談はオンライン30分。確認後、不要な営業や提案は行わず、情報はご相談対応の目的のみに使用します。",
    ctaLabel: "Contact",
    ctaTitle: "Web開発の内製化を、御社の地域から。",
    ctaDesc: "各地数社限定の開催枠に、まずはオンライン30分の無料相談で御社の課題をお聞かせください。",
    ctaButton: "無料で内製化を相談する",
    ctaSub: "しつこい営業はしません。まずは「うちでも作れる？」のご相談から。",
    stickyTitle: "無料相談",
    stickySub: "オンライン30分・営業なし",
    stickyBtn: "予約する",
  },
  en: {
    heroBadge: "Multi-instructor nationwide caravan｜Claude・Codex × GitHub・Vercel・Firebase｜a few slots per region",
    heroKicker: "In-house Web Dev Bootcamp",
    heroTitlePre: "With Claude and Codex, make ",
    heroTitleHi: "in-house web app development",
    heroTitlePost: " real.",
    heroDesc: "An on-site bootcamp where engineers who build in the real world come to you nationwide — helping even non-engineer teams build, ship, and operate web apps using Claude, Codex, GitHub, Vercel, and Firebase.",
    heroCtaPrimary: "Talk about in-house dev (free)",
    heroCtaSecondary: "Request a session in your area",
    heroTrust: "30-min online · no pushy sales · just a chat is fine · we'll also check subsidy eligibility",
    marqueeLabel: "Supporting AI adoption and web app development at SMEs and regional companies",
    marqueeNote: "* Only companies that gave us permission to display their logo are shown",
    reassure: [
      { t: "30 minutes online", d: "No visit required — start with a short online chat." },
      { t: "Just a chat is fine", d: "Gathering information is welcome — no commitment needed." },
      { t: "No pushy sales", d: "We review your needs and won't push unnecessary proposals or follow-ups." },
      { t: "Guaranteed or refunded", d: "If you can't ship even one app live that day, we don't charge." },
    ],
    reassureCta: "Book a free consultation",
    reassureCtaSub: "30-min online · no pushy sales",
    stackLabel: "The standard stack we use",
    statsLabel: "Why now",
    stats: [
      { value: "1", unit: "day", desc: "Build and ship your first production web app, by your own team, in a single day." },
      { value: "5", unit: "tools", desc: "Claude, Codex, GitHub, Vercel, Firebase — the standard working stack, end to end." },
      { value: "75", unit: "%", desc: "With the Human Resources Development Subsidy, net training cost shrinks sharply." },
    ],
    painLabel: "Problem",
    painTitle: "Is in-house web dev stuck at this wall?",
    painDesc: "Wishing \"if only we could build it ourselves,\" yet stuck between outsourcing and no-code — the story we hear most from SMEs that want to grow.",
    pains: [
      "Every app means an expensive vendor, and it's slow",
      "No engineer in-house — or it all depends on one person",
      "Built it with no-code, but it can't reach the details that matter",
      "You hear AI can build it, but GitHub and deployment block you from going live",
      "Even when built, it isn't shipped, run, or fixed — so it gets abandoned",
      "The vendor doesn't get the spec, so it's rebuilt again and again",
    ],
    promiseLabel: "Promise",
    promiseTitle: "After the session, your team is here.",
    promiseDesc: "Your team leaves able to build and ship with their own hands.",
    promises: [
      { num: "01", title: "Building flows with Claude & Codex", desc: "Instruct in plain language to generate and fix code into a working app — you learn the AI-coding pattern, including when to use each of the two agents.", icons: ["/logos/claude.svg", "/logos/openai.svg"] },
      { num: "02", title: "Ship live with GitHub → Vercel", desc: "From code management to production deploy, done by your team — your app goes live at a real URL during the session.", icons: ["/logos/github.svg", "/logos/vercel.svg"] },
      { num: "03", title: "Data, auth & storage with Firebase", desc: "Login, database, form storage — the backend a real app needs, built in-house without running a server.", icons: ["/logos/firebase.svg"] },
    ],
    guaranteeBadge: "Outcome guarantee",
    guaranteeTitle: "If you can't ship one of your own web apps live that day, we refund the fee in full.",
    guaranteeDesc: "Our bar is that your team publishes a web app built with Claude/Codex live on GitHub → Vercel — if we don't reach it by day's end, we don't charge.",
    whyLabel: "Why now",
    whyTitle: "Why AI coding makes \"in-house\" real now.",
    whyDesc: "Claude and Codex have made web apps buildable \"in plain language,\" and combined with GitHub, Vercel, and Firebase, even small teams now reach production.",
    whyPoints: [
      { title: "Make Claude & Codex your partners", desc: "Use the strengths of two AI coding agents to run design, implementation, fixes, and debugging fast — one person's output multiplies.", icons: ["/logos/claude.svg", "/logos/openai.svg"] },
      { title: "Grow it safely with GitHub", desc: "Internalize the basics — change history, backups, team collaboration — to grow an app continuously without breaking it.", icons: ["/logos/github.svg"] },
      { title: "Ship instantly with Vercel", desc: "Auto-deploy just by pushing — internal tools and public services out at your own URL, with no infra management.", icons: ["/logos/vercel.svg"] },
      { title: "Power it with Firebase", desc: "Handle auth, database, hosting, and notifications — the backend that powers a real app — without running a server.", icons: ["/logos/firebase.svg"] },
    ],
    dayLabel: "One Day",
    dayTitle: "How a day runs (on-site, standard)",
    dayDesc: "Each session is tailored to your industry and participants' levels; below is a typical \"ship your first production app in a day\" flow.",
    dayRows: [
      { time: "09:30", title: "Orientation", desc: "Decide the goal of the app you'll build today (internal tool, booking, inquiries, an Obsidian work-logging system, an admin screen, etc.)." },
      { time: "10:00", title: "First, set up Claude together", desc: "Launch Claude (Claude Code) on everyone's PC so the whole team starts from the same line, then add Codex, GitHub, Vercel, and Firebase." },
      { time: "11:00", title: "Experience \"building\" with AI", desc: "Instruct Claude/Codex to generate and fix screens and logic — get the feel of AI coding hands-on." },
      { time: "13:00", title: "Build your own app", desc: "Shape an app for real work (e.g., Obsidian work/daily-log system, booking or admin tools) together with AI — the heart of the day." },
      { time: "15:00", title: "Ship live via GitHub → Vercel", desc: "Manage the code and deploy it as a production URL — your app goes live." },
      { time: "16:00", title: "Finish with Firebase", desc: "Add login, data storage, and the features needed to make it genuinely usable." },
      { time: "17:30", title: "Wrap-up & start 30-day support", desc: "Share how to improve and operate it, and open 30 days of post-training chat support on the spot." },
    ],
    dayNote: "* Ship a minimal production app in one day → then move to real in-house capability with follow-up. Half-day, multi-day, and 90-minute executive versions available.",
    buildLabel: "Outcomes",
    buildTitle: "What you'll be able to build in-house.",
    buildDesc: "Once you run \"build and ship\" in the session, what you used to outsource becomes something you can do yourself.",
    builds: [
      "Internal operations dashboard",
      "Booking / reception system",
      "Inquiry form + auto notifications",
      "Customer / deal management tool",
      "Campaign LP / service site",
      "Inventory / ordering management app",
      "An Obsidian work & knowledge logging system",
      "Data aggregation & visualization tool",
    ],
    forLabel: "For",
    forTitle: "This program is for companies like these.",
    forItems: [
      { ok: true, text: "SMEs that want to cut outsourcing cost and bring web/app dev in-house" },
      { ok: true, text: "Mostly non-engineers, but want to build and run tools themselves" },
      { ok: true, text: "Feeling no-code's limits, wanting to build in-house with real code" },
      { ok: true, text: "Want to invest in in-house dev smartly using subsidies" },
      { ok: false, text: "Want to suddenly build a high-reliability core system in-house (→ let's design it in stages separately)" },
      { ok: false, text: "Already have an established dev team; basics aren't needed" },
    ],
    caravanLabel: "Nationwide Caravan",
    caravanTitle: "We keep touring. Your area is next.",
    caravanDesc: "Multiple instructor teams tour the country in parallel and come to you, so regional companies can easily find a date — no need to give up on in-house dev.",
    caravanSteps: [
      { num: "01", title: "Request a session", desc: "Tell us your area and preferred timing via the form, and we'll align with the nearest route to find a date fast." },
      { num: "02", title: "Pre-interview", desc: "A 30-minute online sync on industry, participants, and the app you want to build in-house — then we design the day's material." },
      { num: "03", title: "One day at your office", desc: "An instructor comes on-site to your meeting room with one-on-one support for up to 10 people." },
      { num: "04", title: "30 days of follow-up", desc: "Chat support continues after; optionally move to monthly coaching to grow a team that keeps building." },
    ],
    caravanNote: "* Beyond single-company sessions, we also run regional sessions with chambers of commerce, municipalities, or several companies together.",
    pricingLabel: "Pricing",
    pricingTitle: "Pricing",
    pricingDesc: "A one-day buy-out. With subsidies, your net cost is even smaller. Prices exclude tax; per-company guideline.",
    plans: [
      { name: "1-Day In-house Bootcamp", price: "From JPY 200K", unit: "/ session", desc: "One intensive day on-site. For shipping your first production app.", features: ["Up to 10 people (on-site)", "Claude, Codex, GitHub, Vercel, Firebase set", "Everyone ships one production web app", "30-day post-training chat support", "Outcome guaranteed"], featured: false },
      { name: "Embed Package", price: "From JPY 800K", unit: "/ 3 mo", desc: "Bootcamp + monthly coaching until you're a team that keeps building. Where results show.", features: ["1-Day In-house Bootcamp", "Monthly follow-up ×3", "Dev rules & guideline support", "On-demand Slack Q&A", "Subsidy application support"], featured: true, badge: "Popular · best results" },
      { name: "Company Caravan", price: "Let's talk", unit: "", desc: "Multi-site / company-wide, or regional sessions with municipalities.", features: ["Back-to-back multi-site sessions", "Department-specific curriculum", "Instructor team assembly", "Impact measurement & reports", "Full subsidy support"], featured: false },
    ],
    planCta: "Ask about this",
    pricingNote: "Travel and lodging billed separately by region. GitHub, Vercel, and Firebase can start on free tiers. Joint or municipal sessions sharply lower per-company cost.",
    subsidyLabel: "Subsidy",
    subsidyTitlePre: "Cover ",
    subsidyTitleHi: "up to 75%",
    subsidyTitlePost: " of in-house training with subsidies.",
    subsidyDesc: "With Japan's Human Resources Development Subsidy, SMEs can have up to 75% of training expenses and wages covered — clearAI partners with a labor consultant from application to completion report (conditions apply; eligibility confirmed in the free consultation).",
    subsidyCta: "Ask about using subsidies →",
    instructorLabel: "Instructor",
    instructorTitle: "Taught by builders, not pundits.",
    instructorDesc: "Engineers who've built and shipped real web apps with Claude, Codex, GitHub, Vercel, and Firebase lead every session — so they teach one step ahead of where you'd get stuck.",
    instructorPoints: [
      "Built and run real web apps & business systems with Claude/Codex",
      "Anticipate sticking points from real non-engineer teaching",
      "A deep bench of industry use cases, turned into material on the spot",
      "The same person follows up after, owning it until you keep building",
    ],
    faqLabel: "FAQ",
    faqTitle: "Frequently asked questions",
    faqItems: [
      { q: "Can staff with no programming experience really build in-house?", a: "Yes — non-engineers are our main audience; with Claude/Codex taking plain-language instructions, anyone with basic PC skills can join and we support each person one-on-one to reach a live deployment." },
      { q: "Are there tool costs for Claude, Codex, GitHub, Vercel, Firebase?", a: "GitHub, Vercel, and Firebase all start on free tiers and the session stays within them; AI-coding usage varies by scale but we'll guide the best starting point on the day." },
      { q: "Will you really come out to the regions?", a: "Yes — all 47 prefectures are in scope, with multiple instructor teams touring nationwide to reach regional SMEs and align dates to the nearest route." },
      { q: "What exactly does the outcome guarantee mean?", a: "Our bar is that your team publishes one web app live via GitHub → Vercel — if we don't reach it by day's end, we don't charge." },
      { q: "Can we always use subsidies?", a: "The Human Resources Development Subsidy covers up to 75% of SME expenses if requirements are met (e.g. 10+ training hours); we support you with a labor consultant, though approval is by review." },
      { q: "Is there post-training support?", a: "Every plan includes 30 days of post-training chat support, and the Embed Package continues with monthly coaching until you're a team that keeps building in-house." },
      { q: "We're worried about security and data handling.", a: "Handling confidential data, internal rules, what may be published, and safe operation of the live app are all part of the day — you leave with a pattern for safe in-house development." },
    ],
    consultLabel: "Free Consultation",
    consultTitle: "What the free consultation covers",
    consultDesc: "It's just 30 minutes to hear your situation and organize the path together — no need to commit to anything.",
    consultItems: [
      "We organize, together, which of your workflows are easiest to turn into apps",
      "We judge whether the 1-day bootcamp or the 3-month embed package fits",
      "We check the possibility of using subsidies (up to 75%)",
      "No pushy sales. If you feel it's not for you, we can end right there",
    ],
    consultNote: "30 minutes online — after reviewing your needs, we won't push unnecessary sales, and information you share is used only to respond to your inquiry.",
    ctaLabel: "Contact",
    ctaTitle: "Bring in-house web dev to your area.",
    ctaDesc: "Slots are limited to a few companies per region — start with a free 30-minute online consultation about your challenges and what you want to build.",
    ctaButton: "Book a free consultation",
    ctaSub: "No pushy sales. Just start with \"could we build it too?\"",
    stickyTitle: "Free consultation",
    stickySub: "30-min online · no sales",
    stickyBtn: "Book",
  },
};

export default function ClaudeBootcampPage() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  return (
    <>
      {/* HERO / MASTHEAD */}
      <section className="bg-white pt-28 pb-14 lg:pt-32 lg:pb-20 border-b border-gray-200">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            {/* technical meta bar */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-gray-200 pb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
              <span className="font-bold text-neutral-900">§00</span>
              <span>{t.heroKicker}</span>
              <span className="text-neutral-300">/</span>
              <span>Claude</span>
              <span className="text-neutral-300">/</span>
              <span>Codex</span>
              <span className="text-neutral-300">/</span>
              <span>Nationwide&nbsp;Caravan</span>
            </div>
          </Reveal>
          <Reveal delay={70}>
            <div className="mt-6 flex items-start gap-2.5 border border-neutral-900 bg-neutral-50 px-4 py-2.5 font-mono text-[11px] leading-relaxed uppercase tracking-[0.12em] text-neutral-600">
              <span className="mt-0.5 inline-block h-1.5 w-1.5 flex-shrink-0 bg-neutral-900 animate-pulse" />
              <span className="normal-case tracking-normal">{t.heroBadge}</span>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <h1 className="mt-10 max-w-[22ch] text-[7vw] sm:text-3xl lg:text-4xl font-bold leading-[0.95] tracking-[-0.04em] text-balance text-neutral-900">
              {t.heroTitlePre}<span className="underline decoration-[3px] underline-offset-[6px]">{t.heroTitleHi}</span>{t.heroTitlePost}
            </h1>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-8 max-w-2xl text-base lg:text-lg leading-relaxed text-pretty text-neutral-600">{t.heroDesc}</p>
          </Reveal>
          <Reveal delay={280}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="/contact?service=training" className="group inline-flex items-center gap-3 border border-neutral-900 bg-neutral-900 px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.08em] text-white transition-[color,background-color,border-color,scale] duration-300 hover:bg-transparent hover:text-neutral-900 active:scale-[0.96]">
                {t.heroCtaPrimary}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a href="/contact?service=training" className="group inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.08em] text-neutral-900 transition-colors duration-300 hover:text-neutral-500">
                {t.heroCtaSecondary} <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </Reveal>
          <Reveal delay={340}>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-neutral-500">{t.heroTrust}</p>
          </Reveal>
        </div>
      </section>

      {/* CLIENT LOGO MARQUEE */}
      <ClientLogoMarquee label={t.marqueeLabel} note={t.marqueeNote} />

      {/* REASSURANCE BAND */}
      <section className="py-14 lg:py-20 bg-sky-50/60 border-b border-sky-100">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 border-l border-t border-gray-200 lg:grid-cols-4">
            {t.reassure.map((item, i) => (
              <Reveal key={item.t} delay={i * 70}>
                <div className="h-full border-b border-r border-neutral-900 bg-white p-5 lg:p-6">
                  <div className="mb-4 flex items-center justify-between border-b border-neutral-200 pb-3">
                    <span className="font-mono text-[10px] tabular-nums text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-mono text-neutral-900">→</span>
                  </div>
                  <h3 className="mb-1.5 text-sm lg:text-base font-bold tracking-tight text-balance text-neutral-900">{item.t}</h3>
                  <p className="text-xs leading-relaxed text-pretty text-neutral-600">{item.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300}>
            <div className="mt-10 flex flex-col items-center">
              <a href="/contact?service=training" className="group inline-flex items-center gap-3 border border-neutral-900 bg-neutral-900 px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.08em] text-white transition-[color,background-color,border-color,scale] duration-300 hover:bg-transparent hover:text-neutral-900 active:scale-[0.96]">
                {t.reassureCta}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-neutral-500">{t.reassureCtaSub}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TECH STACK LOGOS */}
      <section className="py-12 lg:py-16 bg-white border-b border-gray-200">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="mb-8 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
              <span className="text-neutral-300">//</span>
              <span>{t.stackLabel}</span>
              <span className="h-px flex-1 bg-neutral-200" />
            </div>
            <div className="grid grid-cols-2 border-l border-t border-neutral-300 sm:grid-cols-3 lg:grid-cols-6">
              {TOOLS.map((tool) => (
                <div key={tool.name} className="flex items-center gap-2.5 border-b border-r border-neutral-300 bg-white px-5 py-5 transition-colors duration-200 hover:border-neutral-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={tool.logo} alt={tool.name} className="h-6 lg:h-7 w-auto" />
                  <span className="font-mono text-[13px] font-medium text-neutral-800">{tool.name}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 lg:py-24 bg-neutral-900">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="mb-12 flex items-center gap-4 border-b border-white/20 pb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
              <span className="font-bold text-white">§01</span>
              <span>{t.statsLabel}</span>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 border-t border-white/15 md:grid-cols-3 md:border-t-0">
            {t.stats.map((s, i) => (
              <Reveal key={s.unit} delay={i * 100}>
                <div className="h-full border-b border-white/15 py-8 md:border-b-0 md:border-l md:py-0 md:pl-8">
                  <span className="mb-6 block font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">STAT.{String(i + 1).padStart(2, "0")}</span>
                  <p className="mb-3 font-bold tabular-nums leading-none text-white text-5xl lg:text-6xl">
                    {s.value}<span className="ml-1 font-mono text-2xl font-medium text-white/50 lg:text-3xl">{s.unit}</span>
                  </p>
                  <p className="max-w-xs text-sm leading-relaxed text-pretty text-neutral-400">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="02" kicker={t.painLabel} title={t.painTitle} desc={t.painDesc} />
          <CardCarousel gridClass="md:grid-cols-2 lg:grid-cols-3">
            {t.pains.map((p, i) => (
              <Reveal key={p} delay={i * 60}>
                <div className="flex h-full items-start gap-4 rounded-lg border border-gray-200 bg-white shadow-sm p-6 lg:p-7">
                  <span className="mt-0.5 flex-shrink-0 font-mono text-xs tabular-nums text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-sm leading-relaxed text-pretty text-neutral-700">{p}</p>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* PROMISE */}
      <section className="py-12 lg:py-16 bg-sky-50/60 border-y border-sky-100">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="03" kicker={t.promiseLabel} title={t.promiseTitle} desc={t.promiseDesc} />
          <CardCarousel gridClass="md:grid-cols-3">
            {t.promises.map((p, i) => (
              <Reveal key={p.num} delay={i * 100}>
                <div className="group h-full rounded-lg border border-gray-200 bg-white shadow-sm p-8 lg:p-10 transition-colors duration-300 hover:bg-neutral-900">
                  <div className="mb-6 flex h-8 items-center justify-between border-b border-neutral-200 pb-4 transition-colors duration-300 group-hover:border-neutral-700">
                    <span className="font-mono text-2xl font-bold tabular-nums text-neutral-900 transition-colors duration-300 group-hover:text-white">{p.num}</span>
                    <div className="flex items-center gap-2.5 opacity-100 transition-[filter] duration-300 group-hover:[filter:invert(1)_grayscale(1)_brightness(2)]">
                      {p.icons.map((ic) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img key={ic} src={ic} alt="" className="h-6 w-auto" />
                      ))}
                    </div>
                  </div>
                  <h3 className="mt-6 text-lg lg:text-xl font-bold tracking-tight text-balance text-neutral-900 transition-colors duration-300 group-hover:text-white">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-pretty text-neutral-600 transition-colors duration-300 group-hover:text-neutral-300">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="border border-neutral-900 bg-neutral-900 p-8 lg:p-14 text-white">
              <div className="flex items-center gap-4 border-b border-white/20 pb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
                <span className="border border-white/40 px-2 py-0.5 font-bold text-white">{t.guaranteeBadge}</span>
                <span className="text-neutral-500">// Outcome guarantee</span>
              </div>
              <h2 className="mt-8 max-w-3xl text-[20px] sm:text-xl lg:text-2xl font-bold leading-[1.2] tracking-[-0.02em] text-balance">{t.guaranteeTitle}</h2>
              <p className="mt-6 max-w-2xl text-sm lg:text-base leading-relaxed text-pretty text-neutral-400">{t.guaranteeDesc}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHY */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="04" kicker={t.whyLabel} title={t.whyTitle} desc={t.whyDesc} />
          <CardCarousel gridClass="md:grid-cols-2">
            {t.whyPoints.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div className="group h-full rounded-lg border border-gray-200 bg-white shadow-sm p-8 lg:p-10 transition-colors duration-300 hover:bg-neutral-900">
                  <div className="mb-6 flex h-8 items-center justify-between border-b border-neutral-200 pb-4 transition-colors duration-300 group-hover:border-neutral-700">
                    <span className="font-mono text-[10px] tabular-nums uppercase tracking-[0.2em] text-neutral-400">Why / {String(i + 1).padStart(2, "0")}</span>
                    <div className="flex items-center gap-3 transition-[filter] duration-300 group-hover:[filter:invert(1)_grayscale(1)_brightness(2)]">
                      {p.icons.map((ic) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img key={ic} src={ic} alt="" className="h-7 w-auto" />
                      ))}
                    </div>
                  </div>
                  <h3 className="mt-6 text-base lg:text-lg font-bold tracking-tight text-balance text-neutral-900 transition-colors duration-300 group-hover:text-white">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-pretty text-neutral-600 transition-colors duration-300 group-hover:text-neutral-300">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* ONE DAY TIMETABLE */}
      <section className="py-12 lg:py-16 bg-sky-50/60 border-y border-sky-100">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="05" kicker={t.dayLabel} title={t.dayTitle} desc={t.dayDesc} />
          {/* table header */}
          <div className="hidden lg:grid grid-cols-12 gap-6 border-b border-gray-200 pb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
            <div className="col-span-2">Time</div>
            <div className="col-span-3">Phase</div>
            <div className="col-span-7">Detail</div>
          </div>
          <div className="border-t border-gray-200 lg:border-t-0">
            {t.dayRows.map((row, i) => (
              <Reveal key={row.time} delay={i * 50}>
                <div className="group grid grid-cols-1 gap-2 border-b border-neutral-200 py-6 transition-colors duration-300 hover:bg-white lg:grid-cols-12 lg:gap-6">
                  <div className="lg:col-span-2">
                    <span className="font-mono text-lg font-bold tabular-nums text-neutral-900">{row.time}</span>
                  </div>
                  <div className="lg:col-span-3">
                    <h3 className="text-base font-bold tracking-tight text-balance text-neutral-900">{row.title}</h3>
                  </div>
                  <div className="lg:col-span-7">
                    <p className="text-sm leading-relaxed text-pretty text-neutral-600">{row.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={150}>
            <p className="mt-6 font-mono text-[11px] leading-relaxed text-neutral-500">{t.dayNote}</p>
          </Reveal>
        </div>
      </section>

      {/* OUTCOMES / BUILDS */}
      <section className="py-12 lg:py-16 bg-neutral-900">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="06" kicker={t.buildLabel} title={t.buildTitle} desc={t.buildDesc} dark />
          <div className="grid grid-cols-1 border-l border-t border-white/15 sm:grid-cols-2 lg:grid-cols-4">
            {t.builds.map((b, i) => (
              <Reveal key={b} delay={i * 50}>
                <div className="flex h-full items-start gap-3 border-b border-r border-white/15 bg-neutral-900 px-5 py-5 transition-colors duration-300 hover:bg-white/[0.04]">
                  <span className="flex-shrink-0 font-mono text-xs tabular-nums text-neutral-500">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-sm leading-snug text-pretty text-white/90">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FOR */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="07" kicker={t.forLabel} title={t.forTitle} />
          <CardCarousel gridClass="md:grid-cols-2">
            {t.forItems.map((item, i) => (
              <Reveal key={item.text} delay={i * 60}>
                <div className={`flex h-full items-start gap-4 border p-6 lg:p-7 ${item.ok ? "border-neutral-900 bg-white" : "border-neutral-300 bg-neutral-50"}`}>
                  <span className={`mt-0.5 flex-shrink-0 text-xs font-bold ${item.ok ? "text-neutral-900" : "text-neutral-400"}`}>{item.ok ? "YES" : "NO"}</span>
                  <p className={`text-sm leading-relaxed text-pretty ${item.ok ? "font-medium text-neutral-800" : "text-neutral-400"}`}>{item.text}</p>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* CARAVAN */}
      <section className="py-12 lg:py-16 bg-sky-50/60 border-y border-sky-100">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="08" kicker={t.caravanLabel} title={t.caravanTitle} desc={t.caravanDesc} />
          <CardCarousel gridClass="sm:grid-cols-2 lg:grid-cols-4">
            {t.caravanSteps.map((step, i) => (
              <Reveal key={step.num} delay={i * 80}>
                <div className="group flex h-full flex-col rounded-lg border border-gray-200 bg-white shadow-sm p-6 lg:p-7 transition-colors duration-300 hover:bg-neutral-900">
                  <div className="mb-5 flex items-center justify-between border-b border-neutral-200 pb-3 transition-colors duration-300 group-hover:border-neutral-700">
                    <span className="font-mono text-2xl font-bold tabular-nums text-neutral-900 transition-colors duration-300 group-hover:text-white">{step.num}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">Step</span>
                  </div>
                  <h3 className="mb-2 text-sm font-bold tracking-tight text-balance text-neutral-900 transition-colors duration-300 group-hover:text-white">{step.title}</h3>
                  <p className="text-xs leading-relaxed text-pretty text-neutral-600 transition-colors duration-300 group-hover:text-neutral-300">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
          <Reveal delay={150}>
            <p className="mt-6 max-w-3xl font-mono text-[11px] leading-relaxed text-neutral-500">{t.caravanNote}</p>
          </Reveal>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="09" kicker={t.pricingLabel} title={t.pricingTitle} desc={t.pricingDesc} />
          <PricingCarousel>
            {t.plans.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 100} className="flex">
                <div className={`flex w-full flex-col border p-6 lg:p-7 ${plan.featured ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-900 bg-white"}`}>
                  <div className={`mb-5 flex items-center justify-between border-b pb-3 ${plan.featured ? "border-white/20" : "border-neutral-200"}`}>
                    <span className={`font-mono text-[10px] tabular-nums uppercase tracking-[0.2em] ${plan.featured ? "text-neutral-400" : "text-neutral-400"}`}>Plan.{String(i + 1).padStart(2, "0")}</span>
                    {plan.featured && plan.badge && <span className="border border-white/40 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white">{plan.badge}</span>}
                  </div>
                  <h3 className={`mb-2 text-base font-bold tracking-tight text-balance ${plan.featured ? "text-white" : "text-neutral-900"}`}>{plan.name}</h3>
                  <div className="mb-3 flex items-baseline gap-1">
                    <span className={`font-mono text-xl font-bold tabular-nums ${plan.featured ? "text-white" : "text-neutral-900"}`}>{plan.price}</span>
                    {plan.unit && <span className={`font-mono text-sm ${plan.featured ? "text-white/70" : "text-neutral-500"}`}>{plan.unit}</span>}
                  </div>
                  <p className={`mb-4 text-xs leading-relaxed text-pretty ${plan.featured ? "text-white/80" : "text-neutral-600"}`}>{plan.desc}</p>
                  <ul className={`mb-5 flex-1 space-y-2.5 border-t pt-4 font-mono ${plan.featured ? "border-white/20" : "border-neutral-200"}`}>
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <span className={`flex-shrink-0 ${plan.featured ? "text-white" : "text-neutral-900"}`}>→</span>
                        <span className={`text-xs leading-relaxed ${plan.featured ? "text-white/90" : "text-neutral-600"}`}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="/contact?service=training" className={`group mt-auto flex items-center justify-center gap-2 border px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.08em] transition-[color,background-color,border-color,scale] duration-300 active:scale-[0.96] ${plan.featured ? "border-white bg-white text-neutral-900 hover:bg-transparent hover:text-white" : "border-neutral-900 bg-white text-neutral-900 hover:bg-neutral-900 hover:text-white"}`}>
                    {t.planCta}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </Reveal>
            ))}
          </PricingCarousel>
          <Reveal delay={300}>
            <p className="mt-8 text-center font-mono text-[11px] leading-relaxed text-neutral-500">{t.pricingNote}</p>
          </Reveal>
        </div>
      </section>

      {/* SUBSIDY */}
      <section className="py-12 lg:py-16 bg-white border-b border-gray-200">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="flex items-center gap-4 border-b border-gray-200 pb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
              <span className="font-bold text-neutral-900">§10</span>
              <span>{t.subsidyLabel}</span>
            </div>
            <div className="mt-10 grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <h2 className="max-w-3xl text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.15] sm:leading-[1.05] tracking-[-0.02em] text-balance text-neutral-900">
                  {t.subsidyTitlePre}<span className="underline decoration-[3px] underline-offset-[6px]">{t.subsidyTitleHi}</span>{t.subsidyTitlePost}
                </h2>
                <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-pretty text-neutral-600">{t.subsidyDesc}</p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <a href="/contact?service=training" className="group inline-flex items-center gap-3 border border-neutral-900 bg-neutral-900 px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.08em] text-white transition-[color,background-color,border-color,scale] duration-300 hover:bg-transparent hover:text-neutral-900 active:scale-[0.96]">
                  {t.subsidyCta}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* INSTRUCTOR */}
      <section className="py-12 lg:py-16 bg-sky-50/60 border-b border-sky-100">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm p-8 lg:p-14">
            <Reveal>
              <div className="flex items-center gap-4 border-b border-gray-200 pb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
                <span className="font-bold text-neutral-900">§11</span>
                <span>{t.instructorLabel}</span>
              </div>
              <h2 className="mt-8 max-w-3xl text-[20px] sm:text-xl lg:text-2xl font-bold leading-[1.2] tracking-[-0.02em] text-balance text-neutral-900">{t.instructorTitle}</h2>
              <p className="mt-5 max-w-3xl text-sm leading-relaxed text-pretty text-neutral-600">{t.instructorDesc}</p>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 border-l border-t border-gray-200 md:grid-cols-2">
              {t.instructorPoints.map((p, i) => (
                <Reveal key={p} delay={i * 80}>
                  <div className="flex h-full items-start gap-4 border-b border-r border-neutral-900 bg-white p-5 lg:p-6">
                    <span className="mt-0.5 flex-shrink-0 font-mono text-xs tabular-nums text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
                    <p className="text-sm leading-relaxed text-pretty text-neutral-700">{p}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="12" kicker={t.faqLabel} title={t.faqTitle} />
          <div className="max-w-3xl border-t border-gray-200">
            {t.faqItems.map((item, i) => (
              <Reveal key={item.q} delay={i * 50}>
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

      {/* 無料相談で行うこと */}
      <section className="py-12 lg:py-16 bg-sky-50/60 border-b border-sky-100">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="13" kicker={t.consultLabel} title={t.consultTitle} desc={t.consultDesc} />
          <div className="max-w-3xl border-t border-gray-200">
            {t.consultItems.map((item, i) => (
              <Reveal key={item} delay={i * 60}>
                <div className="flex items-start gap-4 border-b border-neutral-300 py-4">
                  <span className="mt-0.5 flex-shrink-0 font-mono text-xs tabular-nums text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-sm leading-relaxed text-pretty text-neutral-700">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <p className="mt-6 max-w-3xl font-mono text-[11px] leading-relaxed text-neutral-500">{t.consultNote}</p>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-neutral-900 py-16 lg:py-20">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="flex items-center gap-4 border-b border-neutral-700 pb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
              <span className="font-bold text-white">§14</span>
              <span>{t.ctaLabel}</span>
            </div>
            <div className="mt-12 grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.15] sm:leading-[1.05] tracking-[-0.02em] text-balance text-white">{t.ctaTitle}</h2>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-pretty text-neutral-400">{t.ctaDesc}</p>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-neutral-500">{t.ctaSub}</p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <a href="/contact?service=training" className="group inline-flex items-center gap-3 border border-white bg-white px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.08em] text-neutral-900 transition-[color,background-color,border-color,scale] duration-300 hover:bg-transparent hover:text-white active:scale-[0.96]">
                  {t.ctaButton}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STICKY MOBILE CTA BAR */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200">
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <div className="leading-tight">
            <p className="text-[13px] font-bold text-neutral-900">{t.stickyTitle}</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-neutral-500">{t.stickySub}</p>
          </div>
          <a href="/contact?service=training" className="group inline-flex items-center gap-2 whitespace-nowrap border border-neutral-900 bg-neutral-900 px-6 py-3 font-mono text-sm font-bold uppercase tracking-[0.06em] text-white transition-[color,background-color,border-color,scale] duration-300 hover:bg-transparent hover:text-neutral-900 active:scale-[0.96]">
            {t.stickyBtn}
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </a>
        </div>
      </div>
      <div className="lg:hidden h-20" />
    </>
  );
}

"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import PricingCarousel from "@/components/PricingCarousel";
import CardCarousel from "@/components/CardCarousel";

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
  return <p className="text-sm font-semibold text-neutral-900 mb-4">{children}</p>;
}

type Plan = { name: string; price: string; unit: string; desc: string; features: string[]; featured: boolean; badge?: string };

type Copy = {
  heroBadge: string; heroKicker: string; heroTitlePre: string; heroTitleHi: string; heroTitlePost: string;
  heroDesc: string; heroCtaPrimary: string; heroCtaSecondary: string; heroTrust: string;
  statsLabel: string; stats: { value: string; unit: string; desc: string }[];
  painLabel: string; painTitle: string; painDesc: string; pains: string[];
  promiseLabel: string; promiseTitle: string; promiseDesc: string;
  promises: { num: string; title: string; desc: string }[];
  guaranteeBadge: string; guaranteeTitle: string; guaranteeDesc: string;
  whyLabel: string; whyTitle: string; whyDesc: string;
  whyPoints: { title: string; desc: string }[];
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
  ctaLabel: string; ctaTitle: string; ctaDesc: string; ctaButton: string; ctaSub: string;
};

const COPY: Record<"ja" | "en", Copy> = {
  ja: {
    heroBadge: "複数講師の全国キャラバン｜47都道府県・31日間連続開催・各地の枠は数社限定",
    heroKicker: "Claude Code Bootcamp",
    heroTitlePre: "1日で、御社の現場が",
    heroTitleHi: "Claude Code",
    heroTitlePost: "を使えるようになる。",
    heroDesc: "「AIを入れたいが、誰も使いこなせない」を1日で終わらせる出張ブートキャンプ。実装の現場に立つエンジニアが御社に伺い、非エンジニアの社員でも、その日のうちに自分の業務をAIで動かせる状態まで引き上げます。北海道から沖縄まで、全国どこへでも。",
    heroCtaPrimary: "開催を相談する（無料）",
    heroCtaSecondary: "自分の地域へのリクエスト",
    heroTrust: "オンサイト／オンライン対応・最大75%の助成金活用可・成果保証つき",
    statsLabel: "Why now",
    stats: [
      { value: "1", unit: "日", desc: "朝から夕方の集中ハンズオンで、現場が「触れる」を「使える」に。" },
      { value: "47", unit: "都道府県", desc: "地方こそ届けたい。複数の講師チームが全国を同時並行で巡回します。" },
      { value: "75", unit: "%", desc: "人材開発支援助成金の活用で、研修費の実質負担を大きく圧縮。" },
    ],
    painLabel: "Problem",
    painTitle: "AI導入、この状態で止まっていませんか。",
    painDesc: "ツールは契約した。社長は本気。それでも現場が動かない——地方の中小企業で、最も多く聞く声です。",
    pains: [
      "ChatGPTやClaudeを契約したが、一部の人しか触っていない",
      "「AIで効率化しろ」と言われても、何から手をつければいいか分からない",
      "外部に開発を頼むと高く、社内には作れる人がいない",
      "都心の研修に社員を送る時間も交通費も惜しい",
      "本やYouTubeで勉強しても、自社の業務に落とし込めない",
      "若手は興味があるのに、ベテランが及び腰で全社に広がらない",
    ],
    promiseLabel: "Promise",
    promiseTitle: "夕方には、全員がこの状態に。",
    promiseDesc: "「分かった気になる」研修では終わりません。受講した一人ひとりが、自分の手で動かせる状態で帰ります。",
    promises: [
      { num: "01", title: "Claude Codeが自分のPCで動く", desc: "環境構築から最初の実行まで全員ハンズオンで完了。「家でも会社でも開ける」状態にして帰します。" },
      { num: "02", title: "自分の業務を1つAIで自動化できる", desc: "当日その場で、各自の実際の業務（集計・文書・問い合わせ対応など）を題材に、動くものを1つ作り上げます。" },
      { num: "03", title: "明日から続けられる型が手に入る", desc: "つまずいた時の質問の仕方、安全な使い方、社内への広げ方まで。研修後30日間のチャットサポートで定着まで伴走します。" },
    ],
    guaranteeBadge: "成果保証",
    guaranteeTitle: "1日終えて「使える」を実感できなければ、研修費を全額返金します。",
    guaranteeDesc: "受講者全員が、自分の業務を動かすものを最低1つ完成させる——これを到達基準にしています。万一その日のうちに到達できなければ、研修費は申し受けません。本気で「使える」を約束できるからこその保証です。",
    whyLabel: "Why Claude Code",
    whyTitle: "チャット止まりではなく、Claude Codeまで踏み込む理由。",
    whyDesc: "ChatGPTの会話だけでは、業務は本質的には変わりません。Claude Codeは、あなたの言葉でファイルを読み、ツールを作り、作業そのものを代行します。だからこそ、現場の生産性が桁で変わります。",
    whyPoints: [
      { title: "自然言語が、そのまま業務ツールになる", desc: "「この一覧から請求書を作って」と話すだけで、繰り返しの手作業が動くツールに変わります。コードは書けなくて構いません。" },
      { title: "自社のファイル・データを直接扱える", desc: "Excelやテキスト、社内資料をその場で読み込み、要約・変換・自動化。汎用チャットでは越えられない壁を越えます。" },
      { title: "“調べる”から“やってもらう”へ", desc: "答えを聞くAIから、作業を任せるAIへ。1人あたりの処理量が変わり、人手不足の現場ほど効きます。" },
      { title: "一度作れば、社内資産として残る", desc: "その日に作ったツールやワークフローは会社に残り、翌日からチーム全員が使えます。研修費が消えず、積み上がります。" },
    ],
    dayLabel: "One Day",
    dayTitle: "ある1日の進行（オンサイト・標準）",
    dayDesc: "御社の業種・参加者のレベルに合わせて毎回オーダーメイドします。下記は典型的な1日の流れです。",
    dayRows: [
      { time: "09:30", title: "オリエンテーション", desc: "AIで「できること・できないこと」の現在地を共有し、今日の到達点を全員で確認します。" },
      { time: "10:00", title: "環境構築ハンズオン", desc: "全員のPCでClaude Codeを起動。つまずきやすい初期設定を、その場で一人ずつ解消します。" },
      { time: "11:00", title: "基本操作で“感覚”をつかむ", desc: "ファイルを読ませる・要約させる・直させる。指示の出し方のコツを手を動かして体得します。" },
      { time: "13:00", title: "自部署の業務を棚卸し", desc: "各自の毎日の手作業を洗い出し、AIに任せられる工程を特定。題材を決めます。" },
      { time: "14:00", title: "“自分の業務”を1つ自動化", desc: "実際の業務データを使い、動くツール／自動化を一人1つ完成させます。本日の山場。" },
      { time: "16:30", title: "成果共有・横展開の設計", desc: "作ったものを共有し、チームに広げる進め方と、安全な運用ルールを設計します。" },
      { time: "17:30", title: "まとめ・30日サポートの開始", desc: "持ち帰りテンプレートを配布。研修後30日間のチャットサポートをその場で開通します。" },
    ],
    dayNote: "※ 半日（4時間）短縮版、経営層向け90分版、複数日プログラムにも対応します。",
    buildLabel: "Outcomes",
    buildTitle: "受講者が、その日のうちに作れるもの。",
    buildDesc: "「すごい人だけ」のものではありません。普通の現場担当者が、研修中に自分の手で作り上げます。",
    builds: [
      "問い合わせメールの自動分類・下書き",
      "Excel集計の自動化スクリプト",
      "見積書・請求書PDFの自動生成",
      "日報・週報の自動まとめ",
      "社内FAQに答えるチャット",
      "アンケート結果の自動集計・可視化",
      "在庫・受注アラートの自動通知",
      "議事録の文字起こし→要約",
    ],
    forLabel: "For",
    forTitle: "こんな会社のための1日です。",
    forItems: [
      { ok: true, text: "地方で、社員のAI内製化を一気に進めたい中小企業" },
      { ok: true, text: "非エンジニア中心でも、現場が自分でツールを作れるようになりたい" },
      { ok: true, text: "都心まで社員を送らず、自社に来てほしい" },
      { ok: true, text: "助成金を使って、賢く研修費を抑えたい" },
      { ok: false, text: "概要だけ聞ければよく、手は動かさなくていい（→入門セミナーが適切です）" },
      { ok: false, text: "すでに全社で開発が定着しており、初歩は不要" },
    ],
    caravanLabel: "Nationwide Caravan",
    caravanTitle: "全国を、回り続けます。次は、あなたの地域へ。",
    caravanDesc: "都心の研修に人を送るのではなく、私たちが御社に伺います。複数の講師チームが全国を同時並行で巡回するキャラバン編成だから、地方でも希望の時期に日程を合わせやすい。地方だからと諦める必要は、もうありません。",
    caravanSteps: [
      { num: "01", title: "開催をリクエスト", desc: "フォームから地域と希望時期をお知らせください。全国を同時並行で回る講師チームの近隣ルートに合わせ、最短で日程を調整します。" },
      { num: "02", title: "事前ヒアリング", desc: "オンライン30分で、業種・参加者・解決したい業務をすり合わせ。当日の題材を設計します。" },
      { num: "03", title: "御社で1日開催", desc: "担当講師が現地に伺い、御社の会議室で実施。最大10名まで、一人ひとり伴走します。" },
      { num: "04", title: "30日間の定着サポート", desc: "研修後もチャットで質問対応。希望に応じて月次の伴走に移行し、社内に根づかせます。" },
    ],
    caravanNote: "※ 1社単独開催のほか、商工会議所・自治体・複数社合同での地域開催にも対応します。お気軽にご相談ください。",
    pricingLabel: "Pricing",
    pricingTitle: "料金",
    pricingDesc: "1日買い切り型。助成金を使えば、実質負担はさらに小さくなります。表示は税抜・1社あたりの目安です。",
    plans: [
      { name: "1DAYブートキャンプ", price: "35万円〜", unit: "/ 1日", desc: "御社オンサイトで1日集中。まず現場を立ち上げたい方へ。", features: ["最大10名（オンサイト）", "オリジナル教材・修了証", "全員が業務ツールを1つ完成", "研修後30日チャットサポート", "成果保証つき"], featured: false },
      { name: "定着パッケージ", price: "88万円〜", unit: "/ 3ヶ月", desc: "1日研修＋月次伴走で、社内に根づくまで。最も成果が出る形です。", features: ["1DAYブートキャンプ", "月次フォロー研修 ×3", "社内展開・ガイドライン策定支援", "Slackでの随時質問対応", "助成金申請サポート付き"], featured: true, badge: "人気・成果が出る" },
      { name: "全社キャラバン", price: "ご相談", unit: "", desc: "複数拠点・全社展開や、自治体・商工会との地域開催に。", features: ["複数拠点での連続開催", "部署別カリキュラム設計", "講師チーム編成", "効果測定・レポート", "助成金フルサポート"], featured: false },
    ],
    planCta: "この内容で相談する",
    pricingNote: "交通費・宿泊費は地域により別途。複数社合同・自治体開催は1社あたりを大きく抑えられます。",
    subsidyLabel: "Subsidy",
    subsidyTitlePre: "研修費は、",
    subsidyTitleHi: "最大75%",
    subsidyTitlePost: "を助成金でまかなえます。",
    subsidyDesc: "厚生労働省「人材開発支援助成金」を活用すれば、中小企業は研修経費の最大75%＋受講者の賃金まで助成対象に。clearAIが社労士と連携し、申請計画から実施報告まで伴走します。",
    subsidyCta: "助成金の実質負担を試算する →",
    instructorLabel: "Instructor",
    instructorTitle: "教えるのは、評論家ではなく実装者。",
    instructorDesc: "登壇するのは、受託開発・ロボティクス・社内自動化を自らClaude Codeで実装してきたエンジニアです。「動かしてきた人」だからこそ、現場のつまずきの一歩先を教えられます。",
    instructorPoints: [
      "実際にClaude Codeで事業システムを構築・運用",
      "非エンジニアへの指導実績にもとづく“つまずき所”の先回り",
      "業種別ユースケースの引き出しで、その場で題材化",
      "研修後も同じ担当が伴走し、定着まで責任を持つ",
    ],
    faqLabel: "FAQ",
    faqTitle: "よくあるご質問",
    faqItems: [
      { q: "プログラミング未経験の社員でも本当に大丈夫ですか？", a: "はい。むしろ非エンジニアの方を主対象に設計しています。Claude Codeは自然言語で指示するため、PCの基本操作ができれば参加できます。当日は一人ずつ伴走し、全員が動くものを完成させて帰ります。" },
      { q: "地方でも、本当に来てもらえますか？", a: "はい。全国47都道府県が対象です。むしろ地方の中小企業にこそ届けたく、キャラバン形式で全国を回っています。日程は近隣の開催と合わせて調整します。離島・遠隔地もご相談ください。" },
      { q: "最少何名から、何名まで開催できますか？", a: "オンサイトは最大10名を目安に、少人数ほど一人ひとりに密着できます。経営層1名のセッションから、複数社合同の地域開催まで対応します。" },
      { q: "成果保証とは具体的に何を指しますか？", a: "受講者全員が、自分の業務を動かすツール／自動化を最低1つ完成させることを到達基準としています。万一その日のうちに到達できなかった場合、研修費は申し受けません。" },
      { q: "助成金は必ず使えますか？", a: "「人材開発支援助成金」は要件（研修10時間以上など）を満たせば中小企業で経費の最大75%が対象です。1日研修は半日×複数回や月次伴走と組み合わせて要件を満たす設計が可能です。要件確認から申請まで社労士と連携し伴走しますが、支給可否は審査で決まります。" },
      { q: "研修後のサポートはありますか？", a: "全プランに研修後30日間のチャットサポートが付きます。定着パッケージでは月次の伴走研修で、社内に根づくまで継続的に支援します。" },
      { q: "セキュリティや情報の扱いが心配です。", a: "機密データの扱い、社内で使う際のルール、外部に出してはいけない情報の線引きまで、当日のカリキュラムに含めます。安全に社内運用するための型をお渡しします。" },
    ],
    ctaLabel: "Contact",
    ctaTitle: "次のキャラバンを、御社の地域へ。",
    ctaDesc: "開催枠は各地で数社限定です。まずは無料相談で、御社の課題と日程をお聞かせください。オンライン30分から始められます。",
    ctaButton: "無料で開催を相談する",
    ctaSub: "しつこい営業はしません。まずは「うちでもできる？」のご相談から。",
  },
  en: {
    heroBadge: "Multi-instructor nationwide caravan · 47 prefectures · 31 days straight · a few slots per region",
    heroKicker: "Claude Code Bootcamp",
    heroTitlePre: "In one day, your team learns to use ",
    heroTitleHi: "Claude Code",
    heroTitlePost: ".",
    heroDesc: "An on-site bootcamp that ends \"we have AI but no one uses it\" in a single day. Engineers who build in the real world come to you, and bring even non-engineer staff to the point where they can run their own work with AI by that evening. From Hokkaido to Okinawa — anywhere in Japan.",
    heroCtaPrimary: "Talk to us (free)",
    heroCtaSecondary: "Request a session in your area",
    heroTrust: "On-site / online · up to 75% subsidy · outcome guaranteed",
    statsLabel: "Why now",
    stats: [
      { value: "1", unit: "day", desc: "A focused, hands-on day that turns \"touched it\" into \"can use it.\"" },
      { value: "47", unit: "prefs", desc: "We especially want to reach regional Japan — instructor teams touring in parallel." },
      { value: "75", unit: "%", desc: "With the Human Resources Development Subsidy, net training cost shrinks sharply." },
    ],
    painLabel: "Problem",
    painTitle: "Is your AI rollout stuck here?",
    painDesc: "You signed up for the tools. Leadership means it. And still the front line doesn't move — the most common story at regional SMEs.",
    pains: [
      "You pay for ChatGPT or Claude, but only a few people touch it",
      "\"Use AI to be efficient\" — but no one knows where to start",
      "Outside development is expensive, and no one in-house can build",
      "Sending staff to big-city training costs too much time and travel",
      "Books and YouTube don't translate to your actual work",
      "Younger staff are curious, but veterans hold back and it never spreads",
    ],
    promiseLabel: "Promise",
    promiseTitle: "By evening, everyone is here.",
    promiseDesc: "This isn't training that just feels productive. Each participant leaves able to run things with their own hands.",
    promises: [
      { num: "01", title: "Claude Code runs on their own PC", desc: "From setup to first run, everyone finishes hands-on — ready to open it at home and at work." },
      { num: "02", title: "They automate one real task", desc: "On the day, using their own real work (aggregation, documents, inquiries), each person builds one working thing." },
      { num: "03", title: "A repeatable pattern to keep going", desc: "How to ask when stuck, how to stay safe, how to spread it internally — with 30 days of post-training chat support." },
    ],
    guaranteeBadge: "Outcome guarantee",
    guaranteeTitle: "If your team doesn't feel \"we can use this\" by day's end, we refund the fee in full.",
    guaranteeDesc: "Our bar: every participant completes at least one thing that runs their own work. If we don't reach it that day, we don't charge. We can guarantee it because we mean \"usable.\"",
    whyLabel: "Why Claude Code",
    whyTitle: "Why we go past chat, all the way to Claude Code.",
    whyDesc: "Chatting with ChatGPT alone doesn't fundamentally change work. Claude Code reads your files, builds tools, and does the work itself in your own words — which is why front-line productivity changes by an order of magnitude.",
    whyPoints: [
      { title: "Plain language becomes a work tool", desc: "Say \"make invoices from this list\" and repetitive manual work becomes a running tool. No coding required." },
      { title: "It works directly on your files and data", desc: "Read Excel, text, and internal docs on the spot — summarize, convert, automate. It crosses walls generic chat can't." },
      { title: "From \"look it up\" to \"get it done\"", desc: "From an AI that answers to an AI that does the work. Throughput per person changes — most of all where hands are short." },
      { title: "Build once, keep it as an asset", desc: "Tools and workflows built that day stay with the company, usable by the whole team the next morning. The fee compounds." },
    ],
    dayLabel: "One Day",
    dayTitle: "How a day runs (on-site, standard)",
    dayDesc: "We tailor each session to your industry and participants' levels. Below is a typical day.",
    dayRows: [
      { time: "09:30", title: "Orientation", desc: "Align on what AI can and can't do, and set the day's goal together." },
      { time: "10:00", title: "Setup hands-on", desc: "Launch Claude Code on every PC, clearing the tricky first-time setup one by one." },
      { time: "11:00", title: "Get the feel with basics", desc: "Have it read files, summarize, and revise — learning how to instruct by doing." },
      { time: "13:00", title: "Inventory your team's work", desc: "Map each person's daily manual tasks and pick what to hand to AI." },
      { time: "14:00", title: "Automate one real task", desc: "Using real work data, each person completes one running tool — the heart of the day." },
      { time: "16:30", title: "Share & plan rollout", desc: "Share what was built, and design how to spread it and operate safely." },
      { time: "17:30", title: "Wrap-up & start 30-day support", desc: "Hand out takeaway templates and open 30 days of chat support on the spot." },
    ],
    dayNote: "* Also available as a half-day (4h), a 90-minute executive version, or a multi-day program.",
    buildLabel: "Outcomes",
    buildTitle: "What participants can build that same day.",
    buildDesc: "Not just for \"the talented few.\" Ordinary front-line staff build these with their own hands during the session.",
    builds: [
      "Auto-classify & draft inquiry emails",
      "Excel aggregation automation",
      "Auto-generated quote / invoice PDFs",
      "Auto-summarized daily / weekly reports",
      "A chat that answers internal FAQs",
      "Auto survey aggregation & charts",
      "Inventory / order alert notifications",
      "Transcript → summary of minutes",
    ],
    forLabel: "For",
    forTitle: "This day is for companies like these.",
    forItems: [
      { ok: true, text: "Regional SMEs that want to accelerate in-house AI adoption" },
      { ok: true, text: "Mostly non-engineers, but want the front line building tools themselves" },
      { ok: true, text: "Want us to come to you, not send staff to the big city" },
      { ok: true, text: "Want to cut training cost smartly with subsidies" },
      { ok: false, text: "Just want an overview, no hands-on (→ an intro seminar fits better)" },
      { ok: false, text: "Development is already embedded company-wide; basics aren't needed" },
    ],
    caravanLabel: "Nationwide Caravan",
    caravanTitle: "We keep touring. Your area is next.",
    caravanDesc: "Instead of sending people to city training, we come to you — multiple instructor teams touring the country in parallel, so even in the regions it's easy to find a date. No need to give up because you're in the regions.",
    caravanSteps: [
      { num: "01", title: "Request a session", desc: "Tell us your area and preferred timing via the form. We align with the nearest route of our parallel instructor teams to find a date fast." },
      { num: "02", title: "Pre-interview", desc: "A 30-minute online sync on industry, participants, and the work to solve — then we design the day's material." },
      { num: "03", title: "One day at your office", desc: "An instructor comes on-site to your meeting room. Up to 10 people, with one-on-one support." },
      { num: "04", title: "30 days of follow-up", desc: "Chat support continues after; optionally move to monthly coaching to embed it internally." },
    ],
    caravanNote: "* Beyond single-company sessions, we also run regional sessions with chambers of commerce, municipalities, or several companies together.",
    pricingLabel: "Pricing",
    pricingTitle: "Pricing",
    pricingDesc: "A one-day buy-out. With subsidies, your net cost is even smaller. Prices exclude tax; per-company guideline.",
    plans: [
      { name: "1-Day Bootcamp", price: "From JPY 350K", unit: "/ day", desc: "One intensive day on-site. For getting the front line started.", features: ["Up to 10 people (on-site)", "Original materials & certificate", "Everyone completes one work tool", "30-day post-training chat support", "Outcome guaranteed"], featured: false },
      { name: "Embed Package", price: "From JPY 880K", unit: "/ 3 mo", desc: "Bootcamp + monthly coaching until it takes hold. Where results show.", features: ["1-Day Bootcamp", "Monthly follow-up ×3", "Rollout & guideline support", "On-demand Slack Q&A", "Subsidy application support"], featured: true, badge: "Popular · best results" },
      { name: "Company Caravan", price: "Let's talk", unit: "", desc: "Multi-site / company-wide, or regional sessions with municipalities.", features: ["Back-to-back multi-site sessions", "Department-specific curriculum", "Instructor team assembly", "Impact measurement & reports", "Full subsidy support"], featured: false },
    ],
    planCta: "Ask about this",
    pricingNote: "Travel and lodging billed separately by region. Joint or municipal sessions sharply lower per-company cost.",
    subsidyLabel: "Subsidy",
    subsidyTitlePre: "Cover ",
    subsidyTitleHi: "up to 75%",
    subsidyTitlePost: " of the fee with subsidies.",
    subsidyDesc: "With Japan's Human Resources Development Subsidy, SMEs can have up to 75% of training expenses — plus participants' wages — covered. clearAI partners with a labor consultant to support you from application to completion report.",
    subsidyCta: "Estimate your net cost →",
    instructorLabel: "Instructor",
    instructorTitle: "Taught by builders, not pundits.",
    instructorDesc: "The instructors are engineers who've shipped contract systems, robotics, and internal automation with Claude Code themselves. Because they've built, they can teach one step ahead of where the front line gets stuck.",
    instructorPoints: [
      "Built and operate real business systems with Claude Code",
      "Anticipate sticking points from real non-engineer teaching",
      "A deep bench of industry use cases, turned into material on the spot",
      "The same person follows up after, owning it until it sticks",
    ],
    faqLabel: "FAQ",
    faqTitle: "Frequently asked questions",
    faqItems: [
      { q: "Is it really OK for staff with no programming experience?", a: "Yes — non-engineers are our main audience. Because Claude Code takes plain-language instructions, anyone who can use a PC can join. We support each person one-on-one so everyone leaves with something that runs." },
      { q: "Will you really come out to the regions?", a: "Yes. All 47 prefectures are in scope. We especially want to reach regional SMEs, touring nationwide as a caravan. We align dates with nearby sessions; ask us about remote islands too." },
      { q: "What's the minimum and maximum headcount?", a: "On-site we aim for up to 10 — the smaller the group, the closer the support. From a single-executive session to multi-company regional sessions." },
      { q: "What exactly does the outcome guarantee mean?", a: "Our bar is that every participant completes at least one tool or automation that runs their own work. If we don't reach it that day, we don't charge for the session." },
      { q: "Can we always use subsidies?", a: "The Human Resources Development Subsidy covers up to 75% of SME expenses if requirements (e.g. 10+ training hours) are met. A one-day session can be combined with half-days or monthly coaching to qualify. We support you with a labor consultant, though approval is decided by review." },
      { q: "Is there post-training support?", a: "Every plan includes 30 days of post-training chat support. The Embed Package continues with monthly coaching until it takes hold internally." },
      { q: "We're worried about security and data handling.", a: "Handling confidential data, internal usage rules, and what must never leave the company are all part of the day. You leave with a pattern for safe internal operation." },
    ],
    ctaLabel: "Contact",
    ctaTitle: "Bring the next caravan to your area.",
    ctaDesc: "Slots are limited to a few companies per region. Start with a free consultation about your challenges and dates — from a 30-minute online chat.",
    ctaButton: "Book a free consultation",
    ctaSub: "No pushy sales. Just start with \"could this work for us?\"",
  },
};

export default function ClaudeBootcampPage() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  return (
    <>
      {/* HERO */}
      <section className="pt-24 pb-12 lg:pt-28 lg:pb-16 bg-white border-b border-gray-100">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-neutral-50 px-4 py-1.5 text-xs font-semibold text-neutral-700 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 animate-pulse" />{t.heroBadge}
            </span>
            <p className="text-sm font-semibold text-neutral-900 mb-3">{t.heroKicker}</p>
            <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-[1.15] mb-6 max-w-[20ch] lg:max-w-[26ch]">
              {t.heroTitlePre}<span className="underline decoration-2 underline-offset-4">{t.heroTitleHi}</span>{t.heroTitlePost}
            </h1>
            <p className="text-base lg:text-lg text-gray-600 leading-relaxed max-w-3xl mb-8">{t.heroDesc}</p>
            <div className="flex flex-wrap items-center gap-4 mb-5">
              <a href="/contact?service=training" className="rounded-md bg-neutral-900 text-white font-semibold px-8 py-3.5 hover:bg-neutral-800 transition-colors duration-300">
                {t.heroCtaPrimary}
              </a>
              <a href="/contact?service=training" className="group inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 hover:text-neutral-700 transition-colors">
                {t.heroCtaSecondary} <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
            <p className="text-xs text-gray-500">{t.heroTrust}</p>
          </Reveal>
        </div>
      </section>

      {/* STATS */}
      <section className="py-12 lg:py-16 bg-neutral-900">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {t.stats.map((s, i) => (
              <Reveal key={s.unit} delay={i * 100}>
                <div className="border-l border-white/20 pl-6">
                  <p className="text-5xl lg:text-6xl font-bold text-white mb-3 leading-none">
                    {s.value}<span className="text-2xl lg:text-3xl text-white/60 ml-1">{s.unit}</span>
                  </p>
                  <p className="text-sm text-white/70 leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.painLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.painTitle}</h2>
            <p className="text-sm text-gray-500 mb-8 max-w-3xl leading-relaxed">{t.painDesc}</p>
          </Reveal>
          <CardCarousel gridClass="md:grid-cols-2 lg:grid-cols-3">
            {t.pains.map((p, i) => (
              <Reveal key={p} delay={i * 60}>
                <div className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-6 h-full">
                  <span className="mt-0.5 text-lg font-bold text-neutral-400 flex-shrink-0">✓</span>
                  <p className="text-sm text-gray-700 leading-relaxed">{p}</p>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* PROMISE */}
      <section className="py-14 lg:py-20 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.promiseLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.promiseTitle}</h2>
            <p className="text-sm text-gray-500 mb-8 max-w-3xl leading-relaxed">{t.promiseDesc}</p>
          </Reveal>
          <CardCarousel gridClass="md:grid-cols-3">
            {t.promises.map((p, i) => (
              <Reveal key={p.num} delay={i * 100}>
                <div className="rounded-lg border border-gray-200 bg-white p-8 hover:shadow-lg transition-all duration-300 h-full">
                  <span className="text-2xl font-bold text-neutral-200">{p.num}</span>
                  <h3 className="text-lg font-bold text-gray-900 mt-3 mb-3">{p.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="rounded-lg border-2 border-neutral-900 bg-neutral-900 text-white p-8 lg:p-12 text-center">
              <span className="inline-block rounded-md bg-white text-neutral-900 px-4 py-1.5 text-xs font-bold tracking-wide mb-6">{t.guaranteeBadge}</span>
              <h2 className="text-2xl lg:text-3xl font-bold leading-snug mb-5 max-w-3xl mx-auto">{t.guaranteeTitle}</h2>
              <p className="text-sm lg:text-base text-white/80 leading-relaxed max-w-2xl mx-auto">{t.guaranteeDesc}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHY CLAUDE CODE */}
      <section className="py-14 lg:py-20 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.whyLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-snug mb-4 max-w-4xl">{t.whyTitle}</h2>
            <p className="text-sm text-gray-500 mb-8 max-w-3xl leading-relaxed">{t.whyDesc}</p>
          </Reveal>
          <CardCarousel gridClass="md:grid-cols-2">
            {t.whyPoints.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div className="rounded-lg border border-gray-200 bg-white p-8 hover:shadow-lg transition-all duration-300 h-full">
                  <h3 className="text-base font-bold text-gray-900 mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* ONE DAY TIMETABLE */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.dayLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.dayTitle}</h2>
            <p className="text-sm text-gray-500 mb-8 max-w-3xl leading-relaxed">{t.dayDesc}</p>
          </Reveal>
          <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
            {t.dayRows.map((row, i) => (
              <Reveal key={row.time} delay={i * 50}>
                <div className={`flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6 px-6 py-5 ${i > 0 ? "border-t border-gray-100" : ""}`}>
                  <span className="text-sm font-bold text-neutral-900 tabular-nums sm:w-16 flex-shrink-0">{row.time}</span>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-gray-900 mb-1">{row.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{row.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={150}>
            <p className="text-xs text-gray-500 mt-6">{t.dayNote}</p>
          </Reveal>
        </div>
      </section>

      {/* OUTCOMES / BUILDS */}
      <section className="py-14 lg:py-20 bg-neutral-900">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="text-sm font-semibold text-white mb-4">{t.buildLabel}</p>
            <h2 className="text-3xl font-bold text-white leading-tight mb-4">{t.buildTitle}</h2>
            <p className="text-sm text-white/60 mb-8 max-w-3xl leading-relaxed">{t.buildDesc}</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {t.builds.map((b, i) => (
              <Reveal key={b} delay={i * 50}>
                <div className="rounded-lg bg-white/5 border border-white/15 px-5 py-4 h-full flex items-center gap-3">
                  <span className="text-white/40 font-bold flex-shrink-0">→</span>
                  <p className="text-sm text-white/90 leading-snug">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FOR */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.forLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-8">{t.forTitle}</h2>
          </Reveal>
          <CardCarousel gridClass="md:grid-cols-2">
            {t.forItems.map((item, i) => (
              <Reveal key={item.text} delay={i * 60}>
                <div className={`flex items-start gap-3 rounded-lg border p-6 h-full ${item.ok ? "border-neutral-300 bg-white" : "border-gray-100 bg-gray-50"}`}>
                  <span className={`mt-0.5 text-lg font-bold flex-shrink-0 ${item.ok ? "text-neutral-900" : "text-gray-300"}`}>{item.ok ? "✓" : "—"}</span>
                  <p className={`text-sm leading-relaxed ${item.ok ? "text-gray-800 font-medium" : "text-gray-400"}`}>{item.text}</p>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* CARAVAN */}
      <section className="py-14 lg:py-20 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.caravanLabel}</Label>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4 max-w-4xl">{t.caravanTitle}</h2>
            <p className="text-sm text-gray-500 mb-8 max-w-3xl leading-relaxed">{t.caravanDesc}</p>
          </Reveal>
          <CardCarousel gridClass="sm:grid-cols-2 lg:grid-cols-4">
            {t.caravanSteps.map((step, i) => (
              <Reveal key={step.num} delay={i * 80}>
                <div className="relative rounded-lg border border-gray-200 bg-white p-6 h-full">
                  <span className="text-2xl font-bold text-neutral-200">{step.num}</span>
                  <h3 className="text-sm font-bold text-gray-900 mt-2 mb-2">{step.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
          <Reveal delay={150}>
            <p className="text-xs text-gray-500 mt-6 max-w-3xl">{t.caravanNote}</p>
          </Reveal>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.pricingLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.pricingTitle}</h2>
            <p className="text-sm text-gray-500 mb-8 max-w-3xl leading-relaxed">{t.pricingDesc}</p>
          </Reveal>
          <PricingCarousel>
            {t.plans.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 100} className="flex">
                <div className={`rounded-lg p-5 lg:p-6 transition-all duration-300 flex flex-col w-full ${plan.featured ? "bg-neutral-900 text-white shadow-xl" : "bg-white border border-gray-200 hover:shadow-lg"}`}>
                  {plan.featured && plan.badge && <span className="inline-block rounded-md bg-white/20 text-white px-3 py-1 text-sm font-semibold mb-3 self-start">{plan.badge}</span>}
                  <h3 className={`text-base font-bold mb-1.5 ${plan.featured ? "text-white" : "text-gray-900"}`}>{plan.name}</h3>
                  <div className="mb-2 flex items-baseline gap-1">
                    <span className={`text-xl font-bold ${plan.featured ? "text-white" : "text-gray-900"}`}>{plan.price}</span>
                    {plan.unit && <span className={`text-sm ${plan.featured ? "text-white/80" : "text-gray-500"}`}>{plan.unit}</span>}
                  </div>
                  <p className={`text-xs leading-relaxed mb-3 ${plan.featured ? "text-white/80" : "text-gray-600"}`}>{plan.desc}</p>
                  <ul className="space-y-2 mb-4 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${plan.featured ? "bg-white/40" : "bg-neutral-900"}`} />
                        <span className={`text-xs ${plan.featured ? "text-white/90" : "text-gray-600"}`}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="/contact?service=training" className={`block text-center text-sm font-semibold py-2 rounded-md transition-all duration-300 mt-auto ${plan.featured ? "bg-white text-neutral-900 hover:bg-neutral-100" : "border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900"}`}>{t.planCta}</a>
                </div>
              </Reveal>
            ))}
          </PricingCarousel>
          <Reveal delay={300}>
            <p className="text-xs text-gray-500 text-center mt-8">{t.pricingNote}</p>
          </Reveal>
        </div>
      </section>

      {/* SUBSIDY */}
      <section className="py-14 lg:py-20 bg-neutral-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <Label>{t.subsidyLabel}</Label>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
                {t.subsidyTitlePre}<span className="underline decoration-2 underline-offset-4">{t.subsidyTitleHi}</span>{t.subsidyTitlePost}
              </h2>
              <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">{t.subsidyDesc}</p>
              <a href="/subsidy" className="rounded-md bg-neutral-900 text-white font-semibold px-8 py-3.5 hover:bg-neutral-800 transition-colors duration-300 inline-block">
                {t.subsidyCta}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* INSTRUCTOR */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-8 lg:p-12">
            <Reveal>
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 mb-4">
                <span className="w-2 h-2 rounded-full bg-neutral-900" />{t.instructorLabel}
              </p>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-snug mb-4 max-w-3xl">{t.instructorTitle}</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-8 max-w-3xl">{t.instructorDesc}</p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {t.instructorPoints.map((p, i) => (
                <Reveal key={p} delay={i * 80}>
                  <div className="flex items-start gap-3 rounded-lg bg-white border border-neutral-200 p-5 h-full">
                    <span className="mt-0.5 text-neutral-900 font-bold flex-shrink-0">✓</span>
                    <p className="text-sm text-gray-700 leading-relaxed">{p}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 lg:py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.faqLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-8">{t.faqTitle}</h2>
          </Reveal>
          <div className="space-y-3">
            {t.faqItems.map((item, i) => (
              <Reveal key={item.q} delay={i * 50}>
                <details className="group rounded-lg border border-gray-200 bg-white open:shadow-sm transition-all duration-300">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5">
                    <span className="text-sm lg:text-base font-bold text-gray-900">{item.q}</span>
                    <span className="text-neutral-400 text-xl font-light flex-shrink-0 transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <p className="px-6 pb-5 text-sm text-gray-600 leading-relaxed">{item.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 lg:py-24 bg-neutral-900">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Reveal>
            <p className="text-sm font-semibold text-white/60 mb-4">{t.ctaLabel}</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">{t.ctaTitle}</h2>
            <p className="text-base text-white/70 leading-relaxed mb-10">{t.ctaDesc}</p>
            <a href="/contact?service=training" className="rounded-md bg-white text-neutral-900 font-semibold px-10 py-4 hover:bg-neutral-100 transition-colors duration-300 inline-block">{t.ctaButton}</a>
            <p className="text-xs text-white/50 mt-5">{t.ctaSub}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

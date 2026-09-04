"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import PricingCarousel from "@/components/PricingCarousel";
import CardCarousel from "@/components/CardCarousel";
import { BOOKING_URL } from "@/lib/booking";

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

const LP_URL = "https://clearai-kensyuu.jp/";

const TRAINING_FEATURE_IMAGES = [
  {
    src: "/images/generated-pages/training-workshop-20260809.webp",
    alt: { ja: "社内の実務課題を題材にAIツールを制作する研修風景", en: "Employees building an internal AI tool around a real workflow" },
  },
  {
    src: "/images/generated-pages/training-onsite-20260809.webp",
    alt: { ja: "製造現場でタブレットを使いながら研修成果を確認する様子", en: "Operations staff reviewing training outcomes on site" },
  },
  {
    src: "/images/generated-pages/training-classroom-20260809.webp",
    alt: { ja: "少人数で進める法人向けAI研修の受講風景", en: "A small-group corporate AI training session" },
  },
  {
    src: "/images/generated-trust/training-individual.webp",
    alt: { ja: "自分の担当業務に合わせてAIツールを使い分ける受講者", en: "A participant applying AI tools to their own day-to-day work" },
  },
  {
    src: "/images/generated-trust/training-followup.webp",
    alt: { ja: "オンラインで全国から受講できる研修の様子", en: "A remote session joined from anywhere in the country" },
  },
  {
    src: "/images/generated-trust/training-small-group.webp",
    alt: { ja: "研修後も社内で改善を回すチームの様子", en: "A team continuing to improve their tool in-house after the program" },
  },
] as const;

type Copy = {
  heroKicker: string;
  heroBadge: string;
  heroTitle: string;
  heroDesc: string;
  heroNote: string;
  heroCta: string;
  heroCta2: string;
  stats: { value: string; label: string }[];
  aboutLabel: string;
  aboutTitle: string;
  aboutDesc: string;
  about: { num: string; tag: string; title: string }[];
  featuresLabel: string;
  featuresTitle: string;
  features: { num: string; title: string; desc: string; note?: string }[];
  curriculumLabel: string;
  curriculumTitle: string;
  curriculumDesc: string;
  coursesTitle: string;
  courses: { name: string; badge?: string; icon: string; iconColor?: string }[];
  curriculumGroups: { category: string; label: string; items: string[] }[];
  curriculumNote: string;
  outcomesLabel: string;
  outcomesTitle: string;
  outcomesDesc: string;
  outcomes: { num: string; who: string; title: string; body: string }[];
  outcomesNote: string;
  reformLabel: string;
  reformTitle: string;
  reformDesc: string;
  reformCards: { heading: string; body: string }[];
  reformNote: string;
  flowLabel: string;
  flowTitle: string;
  flowDesc: string;
  flow: { num: string; title: string; duration: string; desc: string }[];
  flowNote: string;
  pricingLabel: string;
  pricingTitle: string;
  pricingDesc: string;
  plans: { name: string; scale: string; normalLabel: string; normalPrice: string; netLabel: string; netPrice: string; features: string[]; featured: boolean; badge?: string }[];
  planCta: string;
  pricingNotes: string[];
  faqLabel: string;
  faqTitle: string;
  faq: { q: string; a: string }[];
  lpLabel: string;
  lpTitle: string;
  lpDesc: string;
  lpCta: string;
  ctaKicker: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaButton: string;
};

const COPY: Record<"ja" | "en", Copy> = {
  ja: {
    heroKicker: "AI Training",
    heroBadge: "人材開発支援助成金 対象｜実質 最大75%オフ",
    heroTitle: "AI内製化研修",
    heroDesc: "外注に頼りきりの状態から、AIで業務システムを自社で作れる会社へ。非エンジニアでも、研修が終わるころには社内システムを自分たちで作れるようになります。",
    heroNote: "※ 成果には個人差があります。助成金は条件・審査があり、対象可否は無料相談でご案内します。",
    heroCta: "研修について相談する",
    heroCta2: "料金プランを見る",
    stats: [
      { value: "最大75%", label: "助成金で研修費を圧縮" },
      { value: "実質50万円前後", label: "スタンダードプラン" },
      { value: "全10回・20時間〜", label: "標準カリキュラム" },
      { value: "全国対応", label: "オンライン / 対面" },
    ],
    aboutLabel: "What is",
    aboutTitle: "AIを使って「社内システムを自社で作れる人材」を育てる、実践型の研修です。",
    aboutDesc: "外注に頼っていた業務システムやツールを内製化し、コスト削減から人材育成まで、投資効率の高いDXを実現します。座学で終わらせず、自社の実際の業務課題を題材に、研修期間中にそのまま現場で使える社内ツールを1つ完成させます。",
    about: [
      { num: "01", tag: "コスト削減", title: "業務システムの内製化" },
      { num: "02", tag: "生産性向上", title: "生成AIの実務活用" },
      { num: "03", tag: "外注ゼロ化", title: "開発コストの圧縮" },
      { num: "04", tag: "人材育成", title: "作れるDX人材の輩出" },
    ],
    featuresLabel: "Features",
    featuresTitle: "「学んで終わり」にしない。",
    features: [
      {
        num: "01",
        title: "実務課題を題材に、研修中に成果物が完成する",
        desc: "自社の実際の業務課題を題材に、研修期間中にそのまま現場で使える社内ツールを1つ完成させます。「学んだが使えない」を起こさせない、成果物ベースの設計です。",
        note: "※ 完成物は自社の資産として研修後もそのまま利用可能",
      },
      {
        num: "02",
        title: "非エンジニアでも、即戦力の作り手になる",
        desc: "AIに指示して作る前提のカリキュラムなので、これまで数週間かかっていた開発が短時間で回るようになります。試して直す、を社内のスピードでできることが、内製化の最大の価値です。",
      },
      {
        num: "03",
        title: "助成金活用で、実質負担を最大75%圧縮",
        desc: "人材開発支援助成金（事業展開等リスキリング支援コース）などの対象です。2026年8月3日の改正で職務直結性の確認が厳しくなりましたが、当社は職務と担当作業を先に特定して設計するため、そこを説明できる形で計画届を組み立てられます。制度の選定と、申請に必要な当社側の添付資料の準備まで対応します。",
        note: "※「最大75%」は中小企業の経費助成率。条件・審査があり、支給を保証するものではありません",
      },
      {
        num: "04",
        title: "職務に合わせて、使うAIツールを選べる",
        desc: "Claude / Claude Code、ChatGPT、Gemini、Microsoft Copilotから、その職務の作業と社内の利用環境に合うものを選びます。ツールの操作習得が目的ではなく、担当作業をそのツールで回せる状態がゴールです。",
      },
      {
        num: "05",
        title: "オンライン・対面で全国に対応",
        desc: "オンライン研修は全国から受講可能です。対面研修にも対応し、受講人数や業務環境に合わせて進め方を設計します。",
      },
      {
        num: "06",
        title: "研修後も、内製が定着するまで支援",
        desc: "研修で作ったツールを実務へ定着させ、社内で改善を回せる状態になるまで、レビューとアフターフォローを継続します。",
      },
    ],
    curriculumLabel: "Curriculum",
    curriculumTitle: "職務別カリキュラム",
    curriculumDesc: "助成の対象になるのは「その職務で実際にやっている作業」をAIで回せるようにする訓練です。受講者の職務を先に確定し、その職務の実作業をそのまま教材にします。以下は代表例で、実際は貴社の業務に合わせて設計します。",
    coursesTitle: "使用するAIツールは職務に合わせて選べます",
    courses: [
      { name: "Claude / Claude Code", badge: "推奨", icon: "logos:claude-icon" },
      { name: "ChatGPT", icon: "logos:openai-icon" },
      { name: "Gemini", icon: "simple-icons:googlegemini", iconColor: "4285F4" },
      { name: "Microsoft Copilot", icon: "logos:microsoft-icon" },
    ],
    curriculumGroups: [
      {
        category: "Sales",
        label: "営業",
        items: ["自社商材の提案書・見積書のドラフト作成", "商談メモから議事録と次アクションを生成", "既存顧客への案内文面の作成と出し分け", "受注・失注データの集計と要因整理"],
      },
      {
        category: "Back Office",
        label: "経理・総務",
        items: ["請求書・経費データの突合と入力", "契約書の条項チェックと差分の洗い出し", "社内問い合わせへの定型回答の整備", "月次レポート・稟議資料のドラフト作成"],
      },
      {
        category: "Manufacturing",
        label: "製造・品質管理",
        items: ["検査記録・日報の集計と異常値の抽出", "作業手順書の作成と改訂", "不具合報告の分類と再発防止メモの作成", "設備保全記録の整理と検索"],
      },
      {
        category: "Support",
        label: "カスタマーサポート",
        items: ["問い合わせへの一次回答ドラフト作成", "FAQ・対応マニュアルの整備", "対応履歴の要約とタグ付け", "エスカレーション判断基準の言語化"],
      },
      {
        category: "HR",
        label: "人事・採用",
        items: ["求人票・スカウト文面の作成", "面接記録の要約と評価コメント整理", "社内規程に関する問い合わせ対応", "教育計画・研修報告のドラフト作成"],
      },
    ],
    curriculumNote: "職務は上記に限りません。受講者の実際の担当業務を伺ったうえで、その作業を教材に置き換えて設計します。逆に、職務を特定せず「AIの概要を広く学ぶ」形にすると助成の対象外になります。",
    outcomesLabel: "What you get",
    outcomesTitle: "研修を終えたとき、手元に残るもの。",
    outcomesDesc: "「受けて終わり」にしないために、修了時に会社と受講者それぞれへお渡しするものを決めています。01〜06は全プランに含まれます（成果物の本数・フォロー期間はプランにより異なります）。",
    outcomes: [
      { num: "01", who: "会社に残る", title: "実務で動く社内ツール", body: "研修中に自社の実業務を題材に作った成果物を、ソースコード・設定・手順書ごとお渡しします。研修終了時点で貴社の資産となり、翌日から社内で運用・改修いただけます（稼働に必要なAIサービスの利用契約は貴社にてご用意いただきます）。" },
      { num: "02", who: "会社に残る", title: "自社専用のプロンプト集と運用マニュアル", body: "受講者が研修中に実際に使ったプロンプトと手順を、職務ごとに整理した社内文書として納品します。受講する6〜10名分の費用で、同じ職務の未受講者にも同じ手順を展開できます。" },
      { num: "03", who: "会社に残る", title: "経営層向け「業務時間の前後比較」報告書", body: "対象作業ごとに研修前後の所要時間を計測し、削減時間と年間換算を1枚にまとめます。計測対象の作業・測定方法・測定者を明記した実測ベースの報告書で、投資判断と次の展開の根拠になります（削減量は業務内容により異なります）。" },
      { num: "04", who: "会社に残る", title: "助成金の計画届・支給申請に必要な添付資料", body: "カリキュラム・訓練実施記録・出席記録など、訓練実施機関として当社が発行する添付資料と、様式のひな形・記入例をお渡しします。計画届・支給申請書のご提出は貴社にて行っていただき、書類作成の代行が必要な場合は社会保険労務士の利用をご案内します。最終的な支給可否は労働局の審査によります。" },
      { num: "05", who: "受講者に残る", title: "受講者ごとの修了証", body: "受講した職務トラック名・実際に出席した時間数・制作した成果物を記載した修了証をPDFで発行します。全回数の8割以上の出席と成果物の提出を修了要件としています。社内の評価や配置の記録としてお使いいただけます（当社独自の発行で、国家資格・公的資格ではありません）。" },
      { num: "06", who: "受講者に残る", title: "修了後90日間の質問・相談枠", body: "研修で作ったツールの改修や、新しい業務への応用について、修了後90日間は専用チャットでご質問いただけます（平日受付・翌営業日を目安に回答）。90日以降の継続支援は別途ご相談ください。" },
    ],
    outcomesNote: "※ 01・02・05は最終回当日、03は最終回から10営業日以内、04は計画届・支給申請の提出時期に合わせてお渡しします。成果物の内容・削減時間は業務内容により異なります。",
    reformLabel: "Reskilling 2026",
    reformTitle: "2026年8月3日の制度改正に対応した、職務直結型の設計です。",
    reformDesc: "人材開発支援助成金（事業展開等リスキリング支援コース）は、2026年8月3日以降に提出する計画届から、訓練内容の「職務直結性」が明確に確認されるようになりました。研修名に「AI」「DX」と付いているだけでは対象になりません。",
    reformCards: [
      {
        heading: "対象外になりやすい研修",
        body: "職務に間接的にしか必要でない知識・技能や、職種を問わず職業人として共通して必要な内容は対象外です。「AIの概念」「デジタル技術の概要」「データ活用の考え方」といった概念理解にとどまる研修は、具体的な作業として業務に適用されないため該当します。",
      },
      {
        heading: "ClearAIの設計",
        body: "先に受講者の職務と担当作業を特定し、その作業そのものを教材にします。「見積書を作る」「検査記録を集計する」など、訓練後に同じ作業をAIで回せる状態をゴールに置くため、職務直結性を計画届で説明できます。",
      },
      {
        heading: "eラーニングの回数制限",
        body: "同一労働者につき1年度3回までの受講制限のうち、eラーニングは1年度1回までに制限されました。通学制と組み合わせた訓練もeラーニング1回に含まれます。そのため当社は集合・対面での実施を軸に設計します。",
      },
      {
        heading: "申請書類の役割分担",
        body: "当社は訓練実施機関としてカリキュラム・訓練実施記録・出席記録などの添付資料を発行します。計画届・支給申請は受講企業が行い、作成代行が必要な場合は社会保険労務士をご利用ください。",
      },
    ],
    reformNote: "※ 本記載は2026年8月3日改正時点の情報にもとづく一般的な説明です。制度の要件は変更される場合があり、最終的な支給可否は労働局の審査によります。貴社が対象になるかは、最新の支給要領にもとづき無料相談で個別にご確認ください。",
    flowLabel: "Flow",
    flowTitle: "受講の流れ",
    flowDesc: "お問い合わせから内製の定着まで、標準プランで約3〜4ヶ月です。",
    flow: [
      { num: "01", title: "無料相談・内製化診断", duration: "30分〜", desc: "現状の課題と内製化したい業務をヒアリング。助成金の対象可否もこの場で試算します。" },
      { num: "02", title: "プラン確定・助成金の計画届", duration: "2〜4週間", desc: "受講人数・時間数を確定し、訓練開始前に必要な計画届の提出まで伴走します。" },
      { num: "03", title: "研修の実施", duration: "全10回・計20時間〜", desc: "週1回×2時間を目安に約2〜3ヶ月。自社の実務課題を題材に、動く社内システムを作り上げます。" },
      { num: "04", title: "内製の定着・アフターフォロー", duration: "3ヶ月〜", desc: "研修後も社内で開発が回るまで継続フォロー。助成金の支給申請もサポートします。" },
    ],
    flowNote: "※ 回数・時間はスタンダードプランの標準例です。助成金要件（10時間以上のOFF-JT等）を満たす形で設計します。",
    pricingLabel: "Pricing",
    pricingTitle: "料金プラン",
    pricingDesc: "通常価格200万円のスタンダードを、助成金活用で実質50万円前後に。受講人数・目的に応じてプランをご用意しています。",
    plans: [
      {
        name: "ライト",
        scale: "3〜5名・体験",
        normalLabel: "通常価格（税別）",
        normalPrice: "¥800,000〜",
        netLabel: "助成金適用後（実質）",
        netPrice: "¥200,000〜",
        features: ["対象人数 3〜5名", "全5回・計10時間", "オンライン", "成果物づくり 1テーマ", "助成金申請サポート"],
        featured: false,
      },
      {
        name: "スタンダード",
        scale: "5〜10名・部門導入",
        normalLabel: "通常価格（税別）",
        normalPrice: "¥2,000,000",
        netLabel: "助成金適用後（実質）",
        netPrice: "¥500,000 前後",
        features: ["対象人数 5〜10名", "全10回・計20時間〜", "オンライン / 対面", "成果物づくり 実務テーマ", "助成金申請サポート", "アフターフォロー 3ヶ月"],
        featured: true,
        badge: "いちばん人気",
      },
      {
        name: "プレミアム",
        scale: "10〜20名・全社",
        normalLabel: "通常価格（税別）",
        normalPrice: "¥3,000,000〜",
        netLabel: "助成金適用後（実質）",
        netPrice: "¥750,000〜",
        features: ["対象人数 10〜20名", "部門別に設計", "対面中心", "成果物づくり 複数部門テーマ", "助成金申請サポート", "アフターフォロー 6ヶ月〜"],
        featured: false,
      },
    ],
    planCta: "相談する",
    pricingNotes: [
      "※1 「最大75%」は中小企業の経費助成率です。賃金助成・助成限度額により実質負担は変動し、補助を保証するものではありません。",
      "※2 人材開発支援助成金（事業展開等リスキリング支援コース）等の要件を満たす場合が対象です。訓練開始前の計画届提出など、条件・審査があります。",
      "※3 金額・実質負担は受講人数・研修時間・企業規模により変動します。無料相談で試算します。",
      "※4 事業展開等リスキリング支援コースは令和8年度末（2027年3月）までの時限措置です。",
      "※5 制度情報は2026年9月時点です。最新の要件は厚生労働省の公表情報をご確認ください。",
    ],
    faqLabel: "FAQ",
    faqTitle: "よくあるご質問",
    faq: [
      { q: "本当に、自社でシステムを作れるようになりますか？", a: "自社の実務課題を題材に「動く成果物が完成するまで」伴走する設計です。個人差はありますが、研修中に1つ社内ツールを完成させることを標準にしています。" },
      { q: "プログラミング未経験でも受講できますか？", a: "はい。AIに指示してシステムを作る前提のカリキュラムなので、非エンジニアの方でも受講いただけます。" },
      { q: "補助金は必ず使えますか？", a: "企業規模や導入内容により対象制度が異なります。無料相談で使える制度と申請の可否をご案内します。" },
      { q: "2026年8月3日の改正で、生成AI研修は助成対象外になったと聞きました。", a: "対象外になったのは「AIの概念」「デジタル技術の概要」といった、職務の種類を問わず職業人として共通して必要な内容にとどまる研修です。特定の職務の実作業に直接必要な訓練であれば引き続き対象になり得ます。当社は受講者の職務と担当作業を先に特定し、その作業自体を教材にするため、計画届で職務直結性を説明できる形にしています。最終的な支給可否は労働局の審査によります。" },
      { q: "eラーニングだけで受講できますか？", a: "改正により、eラーニングは同一労働者につき1年度1回までに制限されました（通学制と組み合わせた訓練もこの1回に含まれます）。そのため当社は集合・対面での実施を軸に設計しています。" },
      { q: "何名から受講できますか？", a: "少人数から対応可能です。人数に応じて料金・進め方をご提案します。" },
      { q: "オンラインと対面、どちらですか？", a: "いずれも対応可能です。オンライン研修は全国対応、対面研修は関東圏を中心に対応しています（その他エリアは応相談）。" },
      { q: "修了証は発行されますか？", a: "はい。受講者ごとに、受講した職務トラック名・実際に出席した時間数・制作した成果物を記載した修了証をPDFで発行します。全回数の8割以上の出席と成果物の提出が修了要件です。当社独自の証明であり公的資格ではありませんが、社内評価や配置の記録としてお使いいただけます。" },
      { q: "研修後のサポートはありますか？", a: "修了後90日間は専用チャットでご質問いただけます（平日受付・翌営業日を目安に回答）。90日以降の継続支援や、助成金の支給申請に必要な添付資料の準備も別途ご相談ください。" },
      { q: "事業展開等リスキリング支援コースが終了する2027年4月以降はどうなりますか？", a: "同コースは令和8年度末（2027年3月）までの時限措置で、後継の制度は現時点で公表されていません。人材育成支援コースなど他のコースや、都道府県の人材育成補助金（例: 茨城県の2026年度デジタルスキル習得支援事業補助金）の対象になり得る設計でご提案します。最新情報は無料相談でご案内します。" },
      { q: "どのような支払い方法がありますか？", a: "請求書払い（銀行振込）に対応しています。詳細はお問い合わせください。" },
    ],
    lpLabel: "Guide",
    lpTitle: "カリキュラムの全項目・助成金の試算例まで見る",
    lpDesc: "AIモデル別の詳細カリキュラム、助成金かんたん診断、資料ダウンロードは専用サイトでご覧いただけます。",
    lpCta: "AI内製化研修サイトを見る",
    ctaKicker: "Contact",
    ctaTitle: "まずは、無料相談から。",
    ctaDesc: "内製化したい業務のイメージがなくても構いません。現状をお聞きしたうえで、最適な研修設計と使える助成金をご提案します。",
    ctaButton: "無料で相談する",
  },
  en: {
    heroKicker: "AI Training",
    heroBadge: "Eligible for Japan's HR development subsidy — up to 75% off",
    heroTitle: "In-house AI Development Training",
    heroDesc: "Move from depending on outside vendors to building your own business systems with AI. Even non-engineers finish the program able to build internal tools themselves.",
    heroNote: "Results vary by individual. Subsidy eligibility depends on conditions and review — we assess yours in the free consultation.",
    heroCta: "Discuss training",
    heroCta2: "See pricing",
    stats: [
      { value: "Up to 75%", label: "Training cost covered by subsidy" },
      { value: "~JPY 500K net", label: "Standard plan" },
      { value: "10 sessions / 20 hrs+", label: "Core curriculum" },
      { value: "Nationwide", label: "Online / on-site" },
    ],
    aboutLabel: "What is",
    aboutTitle: "A hands-on program that grows people who can build internal systems with AI.",
    aboutDesc: "Bring the business systems and tools you used to outsource in-house — cutting costs and developing talent at the same time. This is not a lecture series: teams work on a real internal problem and finish the program with one working tool they can use on day one.",
    about: [
      { num: "01", tag: "Cost reduction", title: "Build business systems in-house" },
      { num: "02", tag: "Productivity", title: "Generative AI in daily work" },
      { num: "03", tag: "Zero outsourcing", title: "Compress development costs" },
      { num: "04", tag: "Talent", title: "Grow DX people who can build" },
    ],
    featuresLabel: "Features",
    featuresTitle: "Not a course you forget the week after.",
    features: [
      {
        num: "01",
        title: "Built around your real work — you finish with a working tool",
        desc: "Teams take an actual problem from their own operations and finish the program with one internal tool ready for the floor. Deliverable-based by design, so \"we learned it but never used it\" never happens.",
        note: "The finished tool stays yours to use and extend after the program.",
      },
      {
        num: "02",
        title: "Non-engineers become capable builders",
        desc: "The curriculum assumes you build by instructing AI, so work that used to take weeks now cycles in hours. Being able to try and fix at your own pace is the real value of building in-house.",
      },
      {
        num: "03",
        title: "Subsidies cut your net cost by up to 75%",
        desc: "The program qualifies for Japan's HR development subsidy (business-transformation reskilling course) and similar schemes. The 3 August 2026 revision tightened how directly training must relate to the job — because we fix the role and its tasks first, the filing can show exactly that. We help you choose the scheme and prepare the provider-side attachments the filing needs.",
        note: "\"Up to 75%\" is the expense subsidy rate for SMEs. Conditions and review apply; approval is not guaranteed.",
      },
      {
        num: "04",
        title: "Choose the AI tool that fits the role",
        desc: "Select from Claude / Claude Code, ChatGPT, Gemini, and Microsoft Copilot to match the role's actual tasks and your internal environment. The goal is not tool proficiency — it is running that work with the tool.",
      },
      {
        num: "05",
        title: "Online and on-site, nationwide",
        desc: "Join online from anywhere in Japan or arrange an on-site program designed around your team size and working environment.",
      },
      {
        num: "06",
        title: "Support continues after the program",
        desc: "We keep reviewing and supporting the tool your team built until it is embedded in daily work and your people can improve it themselves.",
      },
    ],
    curriculumLabel: "Curriculum",
    curriculumTitle: "Curriculum by job role",
    curriculumDesc: "Subsidy-eligible training has to make the work a person actually does runnable with AI. We fix the participant's role first, then use that role's real tasks as the teaching material. The tracks below are representative — the actual program is built around your operations.",
    coursesTitle: "Pick the AI tool that fits the role",
    courses: [
      { name: "Claude / Claude Code", badge: "Recommended", icon: "logos:claude-icon" },
      { name: "ChatGPT", icon: "logos:openai-icon" },
      { name: "Gemini", icon: "simple-icons:googlegemini", iconColor: "4285F4" },
      { name: "Microsoft Copilot", icon: "logos:microsoft-icon" },
    ],
    curriculumGroups: [
      {
        category: "Sales",
        label: "Sales",
        items: ["Drafting proposals and quotes for your own products", "Turning meeting notes into minutes and next actions", "Writing and tailoring outreach to existing accounts", "Aggregating won/lost data and identifying drivers"],
      },
      {
        category: "Back Office",
        label: "Finance & admin",
        items: ["Reconciling and entering invoice and expense data", "Checking contract clauses and surfacing differences", "Building standard answers for internal enquiries", "Drafting monthly reports and approval documents"],
      },
      {
        category: "Manufacturing",
        label: "Production & quality",
        items: ["Aggregating inspection records and flagging outliers", "Writing and revising work instructions", "Classifying defect reports and drafting prevention notes", "Organising and searching maintenance records"],
      },
      {
        category: "Support",
        label: "Customer support",
        items: ["Drafting first-response replies to enquiries", "Maintaining FAQs and response manuals", "Summarising and tagging case history", "Articulating escalation criteria"],
      },
      {
        category: "HR",
        label: "HR & recruiting",
        items: ["Writing job postings and outreach messages", "Summarising interview notes and evaluation comments", "Answering questions about internal policies", "Drafting training plans and reports"],
      },
    ],
    curriculumNote: "Roles are not limited to the above. We interview the participants about the work they actually own and rebuild the material around those tasks. Conversely, a program that does not fix a role and instead teaches AI broadly falls outside the subsidy.",
    outcomesLabel: "What you get",
    outcomesTitle: "What stays with you when the program ends.",
    outcomesDesc: "Training should not end when the sessions do. Here is what the company and each participant keep. Items 01–06 are included in every plan; the number of deliverables and the length of follow-up vary by plan.",
    outcomes: [
      { num: "01", who: "For the company", title: "A working internal tool", body: "The tool built during the program around your own workflow is handed over with its source code, configuration and setup notes. It is yours to run and modify from the day after the program ends (the AI service subscription needed to run it is contracted on your side)." },
      { num: "02", who: "For the company", title: "Your own prompt library and operating manual", body: "The prompts and procedures participants actually used, organized by role into an internal document. The cost covers 6–10 participants, but the document lets staff in the same roles who did not attend follow the same procedures." },
      { num: "03", who: "For the company", title: "A management report on hours before and after", body: "We measure how long each target task took before and after the program and summarize hours saved and the annualized effect on one page. The report states the tasks measured, the method and who measured, and gives management the basis for the investment decision and the next rollout (savings vary by workflow)." },
      { num: "04", who: "For the company", title: "Attachments for the subsidy filings", body: "The curriculum, training records and attendance records we issue as the training provider, plus form templates and worked examples. Your company files the plan and the payment application; where you want the paperwork prepared for you, we recommend using a licensed labor and social security attorney. Final approval rests with the labor bureau." },
      { num: "05", who: "For each participant", title: "An individual certificate of completion", body: "A PDF certificate stating the role track, hours actually attended and the deliverable built. Completion requires attending at least 80% of sessions and submitting the deliverable. It is intended for internal evaluation and placement records (issued by ClearAI Inc., not a national or public qualification)." },
      { num: "06", who: "For each participant", title: "90 days of chat support", body: "For 90 days after completion, participants can ask us in a dedicated chat about improving the tool they built or applying it to new tasks (weekdays, answered by the next business day). Support beyond 90 days is available on request." },
    ],
    outcomesNote: "Items 01, 02 and 05 are handed over on the final day, 03 within 10 business days of the final session, and 04 in time for the plan and payment filings. Deliverables and time savings vary by workflow.",
    reformLabel: "Reskilling 2026",
    reformTitle: "Built for the 3 August 2026 rule change: training tied directly to the job.",
    reformDesc: "For Japan's HR development subsidy (business-transformation reskilling course), plans filed on or after 3 August 2026 are explicitly checked for how directly the training relates to the participant's job. Simply having \"AI\" or \"DX\" in the course title no longer qualifies.",
    reformCards: [
      { heading: "What now falls outside", body: "Knowledge only indirectly needed for the job, and content every professional needs regardless of role, are excluded. Courses that stop at concepts — what AI is, an overview of digital technology, how to think about data — do not translate into specific work tasks and therefore fall outside." },
      { heading: "How we design it", body: "We identify the participant's role and tasks first, then use those tasks themselves as the material. The goal is that the same work — producing a quote, aggregating inspection records — runs with AI afterwards, which is what makes the job-relevance defensible in the filing." },
      { heading: "E-learning is now capped", body: "Within the limit of three sessions per worker per year, e-learning is capped at one per year, and blended programs count against that single e-learning slot. We therefore design around in-person delivery." },
      { heading: "Clear division of filing roles", body: "As the training provider, we issue the curriculum, training records and attendance records. The participating company files the plan and payment application; if preparation is delegated, a licensed labor and social security attorney must be used." },
    ],
    reformNote: "This is a general explanation based on the rules as revised on 3 August 2026. Requirements can change, and final eligibility is determined by the Labour Bureau. We confirm your specific case against the current guidelines in the free consultation.",
    flowLabel: "Flow",
    flowTitle: "How it runs",
    flowDesc: "From first contact to in-house adoption takes roughly 3–4 months on the standard plan.",
    flow: [
      { num: "01", title: "Free consultation & readiness check", duration: "30 min+", desc: "We review your current challenges and the workflows you want to bring in-house, and estimate subsidy eligibility on the spot." },
      { num: "02", title: "Plan confirmation & subsidy filing", duration: "2–4 weeks", desc: "We finalize headcount and hours, and support the pre-training filing the subsidy requires." },
      { num: "03", title: "The program", duration: "10 sessions / 20 hrs+", desc: "About 2–3 months at roughly two hours a week, building a working internal system around your own operational problem." },
      { num: "04", title: "Adoption & follow-up", duration: "3 months+", desc: "Continued support until development runs on its own internally, including the subsidy payment application." },
    ],
    flowNote: "Session count and hours are the standard-plan example. We design around subsidy requirements such as 10+ hours of off-the-job training.",
    pricingLabel: "Pricing",
    pricingTitle: "Pricing plans",
    pricingDesc: "The JPY 2M standard plan comes to roughly JPY 500K net with subsidies applied. Plans scale with headcount and scope.",
    plans: [
      {
        name: "Light",
        scale: "3–5 people · trial",
        normalLabel: "List price (excl. tax)",
        normalPrice: "JPY 800K~",
        netLabel: "Net after subsidy",
        netPrice: "JPY 200K~",
        features: ["3–5 participants", "5 sessions / 10 hours", "Online", "One deliverable theme", "Subsidy application support"],
        featured: false,
      },
      {
        name: "Standard",
        scale: "5–10 people · team rollout",
        normalLabel: "List price (excl. tax)",
        normalPrice: "JPY 2,000,000",
        netLabel: "Net after subsidy",
        netPrice: "approx. JPY 500K",
        features: ["5–10 participants", "10 sessions / 20 hours+", "Online or on-site", "Real operational deliverable", "Subsidy application support", "3 months of follow-up"],
        featured: true,
        badge: "Most popular",
      },
      {
        name: "Premium",
        scale: "10–20 people · company-wide",
        normalLabel: "List price (excl. tax)",
        normalPrice: "JPY 3,000,000~",
        netLabel: "Net after subsidy",
        netPrice: "JPY 750K~",
        features: ["10–20 participants", "Designed per department", "Primarily on-site", "Deliverables across departments", "Subsidy application support", "6+ months of follow-up"],
        featured: false,
      },
    ],
    planCta: "Get in touch",
    pricingNotes: [
      "1. \"Up to 75%\" is the expense subsidy rate for SMEs. Net cost varies with wage subsidies and per-scheme caps; approval is not guaranteed.",
      "2. Eligibility requires meeting the criteria of Japan's HR development subsidy (business-transformation reskilling course) or similar. Conditions and review apply, including filing before training begins.",
      "3. Pricing and net cost vary with headcount, hours, and company size. We estimate yours in the free consultation.",
      "4. The business-transformation reskilling course is a time-limited scheme running through the end of FY2026 (March 2027).",
      "5. Scheme details are as of September 2026. Please check the latest requirements published by Japan's Ministry of Health, Labour and Welfare.",
    ],
    faqLabel: "FAQ",
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "Will our team really be able to build systems ourselves?", a: "The program is designed to walk with you until a working deliverable is finished, using a real problem from your own operations. Results vary by individual, but completing one internal tool during the program is our standard." },
      { q: "Can people with no programming experience join?", a: "Yes. The curriculum assumes you build by instructing AI, so non-engineers can take part." },
      { q: "Are we guaranteed to qualify for a subsidy?", a: "The applicable scheme depends on company size and scope. We identify which schemes you can use, and whether you qualify, in the free consultation." },
      { q: "We heard the 3 August 2026 revision excluded generative-AI training.", a: "What was excluded is training that stops at content every professional needs regardless of role — AI concepts, an overview of digital technology. Training directly required for a specific job's real tasks can still qualify. We fix the participant's role and tasks first and use those tasks as the material, so the filing can demonstrate that direct relevance. Final eligibility is determined by the Labour Bureau." },
      { q: "Can the program be delivered entirely as e-learning?", a: "The revision caps e-learning at one session per worker per year, and blended programs count against that slot. We therefore design around in-person delivery." },
      { q: "What is the minimum number of participants?", a: "We can run small groups. Pricing and format are proposed to match your headcount." },
      { q: "Is it online or on-site?", a: "Either. Online sessions cover the whole country; on-site is centered on the Kanto region, with other areas by arrangement." },
      { q: "Do participants receive a certificate?", a: "Yes. Each participant receives a PDF certificate stating the role track, hours actually attended and the deliverable built. Completion requires attending at least 80% of sessions and submitting the deliverable. It is issued by ClearAI Inc. rather than a public body, and is intended for internal evaluation and placement records." },
      { q: "Is there support after the program ends?", a: "For 90 days after completion, participants can ask us in a dedicated chat (weekdays, next-business-day response). Support beyond 90 days and help preparing the attachments for the subsidy payment application are available on request." },
      { q: "What happens after the reskilling subsidy course ends in April 2027?", a: "The business-transformation reskilling course is a temporary measure running to the end of March 2027, and no successor has been announced yet. We design the program so it can also fit other courses of the HR development subsidy and prefectural training grants (for example Ibaraki's FY2026 Digital Skills Acquisition Support Subsidy), and we share the latest position in the free consultation." },
      { q: "What payment methods do you accept?", a: "Invoice-based bank transfer. Please contact us for details." },
    ],
    lpLabel: "Guide",
    lpTitle: "See the full module list and subsidy worked example",
    lpDesc: "The dedicated site carries the per-model curriculum in full, a quick subsidy eligibility check, and the downloadable brochure.",
    lpCta: "Visit the training site",
    ctaKicker: "Contact",
    ctaTitle: "Start with a free consultation.",
    ctaDesc: "You don't need a clear picture of what to build first. Tell us where you are today and we'll propose the right program design and the subsidies you can use.",
    ctaButton: "Book a free consultation",
  },
};

export default function TrainingPage() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  return (
    <>
      {/* PAGE HEADER — /robot-rental と同一の標準ヘッダー帯 */}
      <section className="pt-24 pb-4 lg:pt-28 lg:pb-5 bg-white border-b border-gray-100">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <p className="text-sm font-semibold text-neutral-900 mb-3">{t.heroKicker}</p>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">{t.heroTitle}</h1>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="pt-6 pb-10 lg:pt-8 lg:pb-12 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.pricingLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.pricingTitle}</h2>
            <p className="text-base text-gray-500 leading-relaxed w-full mb-8">{t.pricingDesc}</p>
          </Reveal>
          <PricingCarousel>
            {t.plans.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 100} className="flex">
                <div className={`rounded-lg p-5 lg:p-6 transition-all duration-300 flex flex-col w-full ${plan.featured ? "bg-neutral-900 text-white shadow-xl" : "bg-white border border-gray-200 hover:shadow-lg"}`}>
                  {plan.badge && <span className="inline-block rounded-md bg-white/20 text-white px-3 py-1 text-sm font-semibold mb-3 self-start">{plan.badge}</span>}
                  <h3 className={`text-base font-bold mb-0.5 ${plan.featured ? "text-white" : "text-gray-900"}`}>{plan.name}</h3>
                  <p className={`text-xs mb-3 ${plan.featured ? "text-white/70" : "text-gray-500"}`}>{plan.scale}</p>
                  <div className="mb-3">
                    <p className={`text-[11px] ${plan.featured ? "text-white/60" : "text-gray-400"}`}>{plan.normalLabel}</p>
                    <p className={`text-sm line-through ${plan.featured ? "text-white/50" : "text-gray-400"}`}>{plan.normalPrice}</p>
                    <p className={`text-[11px] mt-1.5 ${plan.featured ? "text-white/70" : "text-gray-500"}`}>{plan.netLabel}</p>
                    <p className={`text-xl font-bold ${plan.featured ? "text-white" : "text-gray-900"}`}>{plan.netPrice}</p>
                  </div>
                  <ul className="space-y-2 mb-4 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${plan.featured ? "bg-white/40" : "bg-neutral-900"}`} />
                        <span className={`text-xs ${plan.featured ? "text-white/90" : "text-gray-600"}`}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="block text-center text-sm font-semibold py-2 rounded-lg transition-all duration-300 mt-auto bg-cta text-white hover:bg-cta-hover">{t.planCta}</a>
                </div>
              </Reveal>
            ))}
          </PricingCarousel>
          <Reveal>
            <div className="mt-6 space-y-1">
              {t.pricingNotes.map((note) => (
                <p key={note} className="text-xs text-gray-400 leading-relaxed">{note}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* TRUST */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              {t.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center justify-center py-6 px-4 text-center">
                  <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                  <span className="text-xs text-gray-500 mt-1">{stat.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.aboutLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-snug mb-6">{t.aboutTitle}</h2>
            <p className="text-base text-gray-600 leading-relaxed">{t.aboutDesc}</p>
          </Reveal>
          <div className="mt-10">
            <CardCarousel gridClass="md:grid-cols-4">
              {t.about.map((item, i) => (
                <Reveal key={item.num} delay={i * 80} className="h-full">
                  <div className="h-full rounded-lg border border-gray-200 bg-white p-6 transition-all duration-300 hover:shadow-lg">
                    <span className="text-xs font-bold text-neutral-900">{item.num}</span>
                    <p className="text-xs text-gray-500 mt-3">{item.tag}</p>
                    <h3 className="text-base font-bold text-gray-900 mt-1 leading-snug">{item.title}</h3>
                  </div>
                </Reveal>
              ))}
            </CardCarousel>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-14 lg:py-20 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.featuresLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-8">{t.featuresTitle}</h2>
          </Reveal>
          <CardCarousel gridClass="md:grid-cols-3">
            {t.features.map((item, i) => {
              const image = TRAINING_FEATURE_IMAGES[i];
              return (
                <Reveal key={item.num} delay={i * 100} className="h-full">
                  <div className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-300 hover:shadow-lg">
                    {image && (
                      <Image
                        src={image.src}
                        alt={image.alt[lang]}
                        width={1536}
                        height={1024}
                        sizes="(min-width: 768px) 33vw, 88vw"
                        className="aspect-[3/2] w-full object-cover"
                      />
                    )}
                    <div className="flex flex-1 flex-col p-6 lg:p-8">
                      <span className="text-sm font-bold text-neutral-900">{item.num}</span>
                      <h3 className="mt-2 mb-2 text-lg font-bold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                      {item.note && <p className="mt-auto pt-5 text-xs leading-6 text-gray-500">{item.note}</p>}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </CardCarousel>
        </div>
      </section>

      {/* OUTCOMES — 修了時に会社・受講者へ渡すもの */}
      <section id="outcomes" className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.outcomesLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.outcomesTitle}</h2>
            <p className="text-base text-gray-500 leading-relaxed w-full mb-8">{t.outcomesDesc}</p>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {t.outcomes.map((item, i) => (
              <Reveal key={item.num} delay={i * 80} className="h-full">
                <div className="h-full rounded-lg border border-gray-200 bg-gray-50 p-6 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-gray-400">{item.num}</span>
                    <span className="text-xs font-semibold text-gray-900 border border-gray-900 rounded-full px-2.5 py-0.5">{item.who}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="text-sm text-gray-500 leading-relaxed mt-8">{t.outcomesNote}</p>
          </Reveal>
        </div>
      </section>

      {/* RESKILLING REFORM — 2026-08-03 の制度改正への対応（職務直結性） */}
      <section id="reskilling" className="py-14 lg:py-20 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.reformLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.reformTitle}</h2>
            <p className="text-base text-gray-500 leading-relaxed w-full mb-8">{t.reformDesc}</p>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {t.reformCards.map((card, i) => (
              <Reveal key={card.heading} delay={i * 80} className="h-full">
                <div className="h-full rounded-lg border border-gray-200 bg-white p-6 transition-all duration-300 hover:shadow-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{card.heading}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{card.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="text-xs text-gray-400 leading-relaxed mt-8">{t.reformNote}</p>
          </Reveal>
        </div>
      </section>

      {/* CURRICULUM */}
      <section id="curriculum" className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.curriculumLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.curriculumTitle}</h2>
            <p className="text-base text-gray-500 leading-relaxed w-full mb-8">{t.curriculumDesc}</p>
          </Reveal>

          <Reveal>
            <p className="text-sm font-semibold text-gray-900 mb-4">{t.coursesTitle}</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-12">
              {t.courses.map((course) => (
                <div key={course.name} className={`rounded-lg border p-4 sm:p-5 flex flex-col justify-between gap-3 ${course.badge ? "border-neutral-900 bg-neutral-900 text-white" : "border-gray-200 bg-white"}`}>
                  <div className="flex items-center gap-2.5">
                    {/* 各社の公式ロゴ（Iconify の logos セット＝ブランド公式マーク） */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://api.iconify.design/${course.icon}.svg${course.iconColor ? `?color=%23${course.iconColor}` : ""}`}
                      alt=""
                      aria-hidden
                      className={`w-6 h-6 object-contain shrink-0 ${course.badge ? "rounded bg-white p-0.5" : ""}`}
                      loading="lazy"
                    />
                    <p className={`text-sm font-bold leading-snug ${course.badge ? "text-white" : "text-gray-900"}`}>{course.name}</p>
                  </div>
                  {course.badge && <span className="inline-block self-start rounded-md bg-white/20 text-white px-2 py-0.5 text-[10px] font-semibold">{course.badge}</span>}
                </div>
              ))}
            </div>
          </Reveal>

          <div className="space-y-0">
            {t.curriculumGroups.map((group, gi) => (
              <Reveal key={group.category} delay={gi * 60}>
                <div className="border-t border-gray-200 py-8">
                  <div className="grid lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-2">
                      <p className="text-[10px] font-semibold tracking-widest text-neutral-900 uppercase">{group.category}</p>
                      <h3 className="text-sm font-bold text-gray-900 mt-0.5">{group.label}</h3>
                    </div>
                    <div className="lg:col-span-10">
                      <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
                        {group.items.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neutral-900 flex-shrink-0" />
                            <span className="text-sm text-gray-600 leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="text-xs text-gray-400 leading-relaxed border-t border-gray-200 pt-6">{t.curriculumNote}</p>
          </Reveal>
        </div>
      </section>

      {/* FLOW */}
      <section className="py-14 lg:py-20 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.flowLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.flowTitle}</h2>
            <p className="text-base text-gray-500 leading-relaxed w-full mb-8">{t.flowDesc}</p>
          </Reveal>
          {t.flow.map((step, i) => (
            <Reveal key={step.num} delay={i * 100}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-10 border-b border-gray-200 last:border-0">
                <div className="lg:col-span-1"><span className="text-sm font-bold text-neutral-900">{step.num}</span></div>
                <div className="lg:col-span-3">
                  <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{step.duration}</p>
                </div>
                <div className="lg:col-span-8"><p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p></div>
              </div>
            </Reveal>
          ))}
          <Reveal>
            <p className="text-xs text-gray-400 leading-relaxed mt-6">{t.flowNote}</p>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.faqLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-8">{t.faqTitle}</h2>
          </Reveal>
          <div>
            {t.faq.map((item, i) => (
              <Reveal key={i} delay={i * 80}>
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
        </div>
      </section>

      {/* DETAILED SITE */}
      <section className="py-14 lg:py-20 bg-white border-t border-gray-200">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.lpLabel}</Label>
            <div className="rounded-lg border border-gray-200 p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
              <div className="flex-1">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 leading-snug mb-3">{t.lpTitle}</h2>
                <p className="text-sm text-gray-600 leading-relaxed">{t.lpDesc}</p>
              </div>
              <a
                href={LP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-neutral-900 text-neutral-900 font-semibold px-8 py-3 text-sm hover:bg-neutral-900 hover:text-white transition-colors duration-300 text-center flex-shrink-0"
              >
                {t.lpCta} ↗
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 lg:py-20 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8 text-center">
          <Reveal>
            <Label>{t.ctaKicker}</Label>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.ctaTitle}</h2>
            <p className="text-base text-gray-600 leading-relaxed mb-10">{t.ctaDesc}</p>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-neutral-900 text-white font-semibold px-10 py-4 hover:bg-neutral-800 transition-colors duration-300 inline-block">{t.ctaButton}</a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

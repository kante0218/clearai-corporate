import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { BOOKING_LINK_PROPS } from "@/lib/booking";
import TrainingMobileNav from "@/components/TrainingMobileNav";
import TrainingCurriculumTabs from "@/components/TrainingCurriculumTabs";
import TrainingLeadForm from "@/components/TrainingLeadForm";
import styles from "./AgentTrainingPage.module.css";

type Tool = "claude-code" | "codex";
const courses = {
  "claude-code": {
    name: "Claude Code", other: "Codex", otherPath: "codex", instruction: "CLAUDE.md",
    description: "Claude Codeを、チームの実務で使う力に。業務整理からファイル操作、自動化、結果の確認まで、自社の仕事を題材に学ぶClearAIの法人向け実践研修です。",
    hero: "毎日の仕事を変える力を、\nチームの中に",
    sub: "資料作成も、データ整理も、業務の自動化も。\nClaude Codeで、自分たちの仕事を一歩先へ。",
    lessonTwo: "依頼の組み立てとファイル作業を実践",
    lessonTwoText: "資料の整理やレポート作成を題材に、目的・制約・完成条件を伝える練習。途中の成果を確認しながら進めます。",
    lessonTwoTopics: ["業務の分解と依頼文の組み立て", "資料・CSV・フォルダを使った演習", "出典・数値・変更内容の照合"],
    lessonTwoOutput: "業務に合わせた依頼文と作業手順",
    lessonThree: "CLAUDE.mdでチームのルールをつくる",
    lessonThreeText: "個人の使い方を、チームで再現できる仕事の型へ。共通ルール、繰り返す作業の手順、結果の確認方法をまとめます。",
    devUse: "コードの調査・修正・テストを一連の流れで体験。既存の開発ルールを踏まえた依頼とレビューを学びます。",
  },
  codex: {
    name: "Codex", other: "Claude Code", otherPath: "claude-code", instruction: "AGENTS.md",
    description: "Codexで、アイデアを動く仕組みに。要件整理から実装、テスト、レビュー、チームへの引き継ぎまで、自社の仕事を題材に学ぶClearAIの法人向け実践研修です。",
    hero: "欲しかった仕組みを、\n自分たちでつくる力に",
    sub: "社内ツールも、定型業務の自動化も、開発の改善も。\nCodexで、アイデアを動く形に。",
    lessonTwo: "要件を整理し、小さな業務ツールをつくる",
    lessonTwoText: "利用者・入力・出力・完成条件を言葉にして、必要な機能を絞ります。小さな試作品を、動きを確認しながら組み立てます。",
    lessonTwoTopics: ["利用者と完成条件の整理", "フォーム・集計処理などの小さな試作", "動作確認と想定外の入力への対応"],
    lessonTwoOutput: "要件メモと業務ツールの試作品",
    lessonThree: "AGENTS.mdとテストで変更を確かめる",
    lessonThreeText: "変更の意図を説明し、安心して引き継げる状態へ。共通ルールの整理、コード差分の読み方、テストとエラーの切り分けを学びます。",
    devUse: "不具合調査、機能追加、テストの作成を実践。変更理由と影響範囲を説明できる開発の進め方を学びます。",
  },
} as const;

export function agentTrainingMetadata(tool: Tool): Metadata {
  const { name, description } = courses[tool];
  const heroImage = `/images/training-lp/hero-workflow${tool === "claude-code" ? "-orange" : ""}.webp`;
  const title = `${name}研修｜法人向け実践研修・無料相談 | ClearAI`;
  return {
    title, description,
    alternates: { canonical: `https://clearai.jp/training/${tool}` },
    openGraph: { title, description, url: `https://clearai.jp/training/${tool}`, type: "website", locale: "ja_JP", siteName: "ClearAI株式会社", images: [heroImage] },
    twitter: { card: "summary_large_image", title, description, images: [heroImage] },
  };
}

function Icon({ kind = "document", className = "" }: { kind?: string; className?: string }) {
  const paths: Record<string, React.ReactNode> = {
    document: <><path d="M13 8h16l8 8v24H13z" /><path d="M29 8v9h8M19 24h12M19 30h12M19 36h8" /></>,
    chart: <><path d="M9 39h32M13 34V23h6v11M23 34V16h6v18M33 34V9h6v25" /><path d="m12 17 12-8 9 3 7-7" /></>,
    team: <><circle cx="25" cy="15" r="6" /><circle cx="10" cy="20" r="4" /><circle cx="40" cy="20" r="4" /><path d="M15 39v-8a10 10 0 0 1 20 0v8M4 38v-8a6 6 0 0 1 8-6M46 38v-8a6 6 0 0 0-8-6" /></>,
    code: <><rect x="6" y="9" width="38" height="32" rx="4" /><path d="M6 18h38m-27 7-5 5 5 5m16-10 5 5-5 5m-6-12-4 14" /></>,
    shield: <><path d="m25 5 17 7v12c0 11-17 20-17 20S8 35 8 24V12z" /><path d="m17 24 6 6 11-13" /></>,
    idea: <><path d="M18 34c0-7-7-8-7-17a14 14 0 0 1 28 0c0 9-7 10-7 17zM19 40h12M22 45h6M25 10v13m-6-7 6 7 6-7" /></>,
    sales: <><path d="M8 15h34v27H8zM17 15V8h16v7M8 27h34M21 25h8v6h-8z" /></>,
    people: <><circle cx="18" cy="17" r="7" /><path d="M5 41V33a13 13 0 0 1 26 0v8m3-29a7 7 0 0 1 0 14m1 3a11 11 0 0 1 10 12" /></>,
  };
  return <svg className={className} viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[kind] || paths.document}</svg>;
}

function ApplyButton({ compact = false }: { compact?: boolean }) {
  return <a href="#contact" className={styles.primary}>{compact ? "無料相談・見積もり" : "無料相談・見積もりを申し込む"}<span aria-hidden="true">›</span></a>;
}

function SectionTitle({ lead, children, text }: { lead?: string; children: React.ReactNode; text?: string }) {
  return <div className={styles.sectionTitle}>{lead && <p className={styles.sectionLead}>{lead}</p>}<h2>{children}</h2>{text && <p className={styles.sectionDescription}>{text}</p>}</div>;
}

function ConversionBand({ courseName }: { courseName: string }) {
  return <div className={styles.conversionBand}><div><p>まずは、自社で何ができるかを知るところから。</p><h2>{courseName}研修の内容・費用を<br />無料で相談できます</h2><span>課題・人数・ご希望の時期から、実施プランをご提案。</span></div><div><ApplyButton /><a {...BOOKING_LINK_PROPS} className={styles.bookingLink}>日程を選んで相談する <span aria-hidden="true">↗</span></a></div></div>;
}

export default function AgentTrainingPage({ tool }: { tool: Tool }) {
  const course = courses[tool];
  const imageSuffix = tool === "claude-code" ? "-orange" : "";
  const lessons = [
    { title: "環境と目標をそろえて、安心してスタート", description: "受講者の経験と対象業務を伺い、必要なアカウント・PC・権限を確認。練習用データと、研修で目指す状態を準備します。", topics: ["対象業務・受講者の経験のヒアリング", "利用プラン・PC・導入権限の確認", "演習データと入力ルールの準備"], output: "受講準備チェックリスト" },
    { title: `${course.name}の基本と、安全な使い方`, description: "チャットとの違いから、ファイルの参照、作業の依頼、実行の許可まで。小さな演習で基本操作を身につけます。", topics: ["作業環境と基本操作", "入力・出力・作業範囲の指定", "実行権限と結果の確認"], output: "自分の業務に置き換える活用メモ" },
    { title: course.lessonTwo, description: course.lessonTwoText, topics: course.lessonTwoTopics, output: course.lessonTwoOutput },
    { title: course.lessonThree, description: course.lessonThreeText, topics: ["チーム共通のルールを言語化", `${course.instruction}の作成・見直し`, "確認・修正・共有の手順を整備"], output: `${course.instruction}とチームの確認リスト` },
    { title: "自社の実務課題で試し、次の一歩を決める", description: "選定した課題の試作品を作り、成果と課題を共有。研修後に誰が使い、何を確認し、どう改善するかまで整理します。", topics: ["業務課題に合わせた試作・改善", "成果発表と相互フィードバック", "本番利用・運用に向けた課題整理"], output: "業務の試作品と運用・引き継ぎメモ" },
  ];
  const pains = [
    { before: "何を頼めばいいか、わからない", after: "自分の仕事で使いどころが見つかる", text: "業務を分解して、AIに任せる作業と人が判断する作業を具体的にします。", icon: "idea" },
    { before: "使ってみたけれど、結果が不安", after: "確かめながら、実務を進められる", text: "出典・数値・変更内容を照合。結果をうのみにしない確認の手順を学びます。", icon: "shield" },
    { before: "詳しい人に、使い方が偏っている", after: "チームで使える仕事の型が残る", text: `${course.instruction}や手順書にルールを整理。個人の工夫をチームの資産に変えます。`, icon: "team" },
    { before: "研修を受けても、現場で続かない", after: "明日から試せる、具体的な一歩へ", text: "自社の課題を演習の題材に。持ち帰る成果物と、次に取り組む作業を明確にします。", icon: "chart" },
  ];
  const departments = [
    { role: "営業", title: "提案と顧客対応に、もっと時間を", text: "商談メモや報告を整理し、提案資料・週次レポートのたたき台を作成します。", image: "department-sales", deliverable: "商談サマリー・提案資料" },
    { role: "人事・総務", title: "繰り返す事務作業を、ひと工夫", text: "社内案内の下書き、規程の整理、申請フローの試作など、身近な業務から取り組みます。", image: "department-hr", deliverable: "社内FAQ・申請フォーム" },
    { role: "経理・管理", title: "データ整理から、確認しやすく", text: "練習用CSVの整形や集計を演習。元データとの照合、再実行の手順まで扱います。", image: "department-finance", deliverable: "集計表・確認用レポート" },
    { role: "マーケティング・企画", title: "調べる・まとめる・形にする", text: "情報の整理から企画書の下書き、小さな試作まで。出典を確かめながら進めます。", image: "department-marketing", deliverable: "リサーチメモ・企画の試作品" },
    { role: "情報システム", title: "現場の困りごとを、小さな仕組みに", text: "ファイル処理や社内ツールを試作。権限、入力チェック、運用の引き継ぎを考えます。", image: "department-it", deliverable: "自動化の試作・運用手順" },
    { role: "開発", title: "実装だけでなく、確かめる力も", text: course.devUse, image: "department-development", deliverable: "変更案・テスト・レビュー記録" },
  ];
  const faqs = [
    ["プログラミング未経験でも受講できますか？", "はい。PCの基本操作ができる方を対象に、用語やファイル操作から内容を調整します。非エンジニアは業務整理と小さな試作を、開発者は既存コードやテストを中心に扱うなど、参加者の経験に合わせて設計します。"],
    ["自社の業務やデータを題材にできますか？", "ご相談いただけます。事前に利用可能なデータと社内規程を確認し、機密情報や個人情報を含む場合は匿名化データ・練習用データへの置き換えを検討します。"],
    ["日程・人数・研修時間は変更できますか？", "はい。掲載の事前準備＋全4回はカリキュラムの一例です。目的、受講者の経験、人数、ご希望の日程に合わせて、回数・時間・内容をご提案します。オンライン・対面のいずれもご相談ください。"],
    ["受講に必要なアカウントや環境を教えてください。", `${course.name}を利用できるアカウントと、演習に対応するPC・ネットワークが必要です。利用プランやソフトウェアの導入可否、管理者の許可は事前に確認します。ライセンス・API等の利用料金は研修費と別途です。`],
    ["研修費用はいくらですか？", "人数・実施形式・カリキュラム・準備範囲に応じた個別見積もりです。ご相談時に研修内容と条件を整理し、費用をご提示します。対面時の交通費などの諸費用も見積もり時に明示します。"],
    ["研修でつくったものは、そのまま本番で使えますか？", "研修では学習用の試作品を作成します。本番利用の前には、セキュリティ、個人情報、権限、テスト、保守体制などの確認が必要です。研修内でも公開・運用に向けた確認事項を整理します。"],
    ["研修後の支援もお願いできますか？", "はい。業務への定着、社内ルールの整備、個別ツールの開発などもご相談いただけます。研修と継続支援は範囲・期間・費用を分けてご提案します。"],
  ];
  const schema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) };

  return (
    <div className={`${styles.page} ${tool === "claude-code" ? styles.claudeTheme : ""}`}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo} aria-label="ClearAI ホーム"><Image src="/images/logo-clear-wordmark.png" width={150} height={44} alt="ClearAI" /><span>法人向けAI実践研修</span></Link>
        <nav aria-label="研修ページ内ナビゲーション" className={styles.headerNav}><a href="#features">研修の特徴</a><a href="#curriculum">カリキュラム</a><a href="#pricing">費用</a><a href="#faq">よくある質問</a></nav>
        <TrainingMobileNav />
        <a href="#contact" className={styles.headerCta}>無料相談・お見積もり <span aria-hidden="true">›</span></a>
      </header>

      <aside className={styles.conversionRail} aria-label="研修の相談窓口">
        <span className={styles.railTag}>法人・チーム向け実践研修</span>
        <p className={styles.railTitle}>無料相談・お見積もり</p>
        <p>自社に合う研修内容・費用を<br />まとめてご相談いただけます。</p>
        <TrainingLeadForm compact courseName={course.name} sourcePath={`/training/${tool}`} />
        <a {...BOOKING_LINK_PROPS} className={styles.railBooking}>日程を選んで相談する <span aria-hidden="true">↗</span></a>
      </aside>

      <div className={styles.mainColumn}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.heroTag}>非エンジニアから開発チームまで。法人向け実践プログラム</p>
            <h1><span className={styles.heroStatement}>{course.hero.split("\n").map((line) => <span key={line}>{line}</span>)}</span><span className={styles.productTitle}><span>{course.name}</span><b>研修</b></span></h1>
            <p className={styles.heroSub}>{course.sub.split("\n").map((line) => <span key={line}>{line}</span>)}</p>
            <div className={styles.heroBadges}><span><Icon kind="document" />自社の仕事で<br /><strong>実践する</strong></span><span><Icon kind="shield" />安全な使い方も<br /><strong>身につける</strong></span><span><Icon kind="team" />チームで使える<br /><strong>型が残る</strong></span></div>
            <div className={styles.heroActions}><ApplyButton /><p>カリキュラム・費用・実施時期をまとめてご相談</p></div>
            <div className={styles.heroArtwork}><div className={styles.heroBubble}>「できるかも」を、<br /><strong>仕事で使える力へ。</strong></div><Image src={`/images/training-lp/hero-workflow${imageSuffix}.webp`} alt="AIと協力して資料作成やデータ整理を進めるチームのイラスト" width={1000} height={667} priority sizes="(max-width: 767px) 95vw, 760px" /><span className={styles.heroFloatingNote}>学ぶ → 試す → 確かめる → チームで使う</span></div>
          </div>
        </section>

        <div className={styles.outputsBand}><p>研修のゴールは、知識だけで終わらないこと。</p><div><span><Icon kind="document" />業務の試作品</span><span><Icon kind="code" />{course.instruction}</span><span><Icon kind="shield" />確認リスト</span><span><Icon kind="team" />運用・引き継ぎメモ</span></div><small>研修内容に合わせて、持ち帰る成果物を設計します。</small></div>

        <section id="outcomes" className={styles.section}>
          <SectionTitle lead="こんなお悩みはありませんか？" text="ツールを導入するだけでは、仕事は変わりません。使う人のつまずきから、研修を組み立てます。">AIへの期待を、<br /><em>現場で使える力に変える</em></SectionTitle>
          <div className={styles.painGrid}>{pains.map((pain) => <article className={styles.painCard} key={pain.before}><div className={styles.painBefore}><span>こんな状態から</span><p>{pain.before}</p></div><div className={styles.painAfter}><div className={styles.painIcon}><Icon kind={pain.icon} /></div><div><h3>{pain.after}</h3><p>{pain.text}</p></div></div></article>)}</div>
        </section>

        <section id="features" className={`${styles.section} ${styles.lavender}`}>
          <SectionTitle lead={`${course.name}研修で選んでほしいポイント`}>ClearAIの研修が<br /><em>大切にしている、3つのこと</em></SectionTitle>
          <div className={styles.featureStack}>
            <article className={styles.featurePanel}><div className={styles.featureCopy}><span className={styles.featureIndex}>特徴 1</span><h3>「自社の仕事」に<br />置き換えられる実践</h3><p>一般的な操作説明だけで終わらせず、受講者の役割と日々の作業から演習を設計。資料作成、データ整理、小さなツールづくりなど、使いどころを具体的にします。</p><ul className={styles.checkList}><li>実際の業務課題から題材を選ぶ</li><li>説明と演習を行き来しながら学ぶ</li><li>経験に合わせて難易度を調整する</li></ul></div><div className={styles.featureImage}><Image src={`/images/training-lp/team-workshop${imageSuffix}.webp`} alt="講師と参加者が業務課題について話し合う実践ワークショップ" width={800} height={533} sizes="(max-width: 767px) 90vw, 450px" /><span>自社の業務が、そのまま学びの入り口に。</span></div></article>
            <article className={`${styles.featurePanel} ${styles.featureReverse}`}><div className={styles.featureCopy}><span className={styles.featureIndex}>特徴 2</span><h3>便利さと一緒に、<br />安全に使う判断も</h3><p>どの情報を入力してよいか、どの操作は承認が必要か。データ・作業環境・実行権限・結果確認の4つの観点で、安全に使う手順を演習に組み込みます。</p><p>削除・送信・公開など、取り消しにくい操作は、人が判断する前提で扱います。</p></div><div className={styles.securityDiagram}><div className={styles.securityDiagramHeading}><Icon kind="shield" /><strong>仕事で使うための4つの確認</strong></div>{[["入力する情報", "機密・個人情報／利用規程"], ["作業する環境", "契約プラン／管理者の設定"], ["実行する操作", "権限／承認／バックアップ"], ["出てきた結果", "出典／計算／差分・テスト"]].map(([title, text], index) => <div key={title}><span>{index + 1}</span><strong>{title}</strong><small>{text}</small></div>)}<p>人が確かめるポイントを、最初から決める。</p></div></article>
            <article className={styles.featurePanel}><div className={styles.featureCopy}><span className={styles.featureIndex}>特徴 3</span><h3>一人のスキルを、<br />チームの仕組みへ</h3><p>依頼文や確認リスト、{course.instruction}を使って、うまくいった手順を言葉にします。研修後も再利用できる型を残し、担当者が変わっても続けやすい状態を目指します。</p><ul className={styles.checkList}><li>共有できる作業ルールをつくる</li><li>確認と修正の手順を揃える</li><li>研修後に取り組む課題を決める</li></ul></div><div className={styles.workflowDiagram}><div className={styles.workflowTop}><Icon kind="people" /><span>個人の「うまくできた」を</span></div><div className={styles.workflowFile}><Icon kind="document" /><strong>{course.instruction}</strong><span>依頼のルール／確認すること／作業手順</span></div><div className={styles.workflowArrow}>↓</div><div className={styles.workflowTeam}><Icon kind="team" /><strong>チームで再現できる、仕事の型へ</strong></div></div></article>
          </div>
        </section>

        <section className={`${styles.section} ${styles.caseSection}`}>
          <SectionTitle lead="現場の課題から、活用を考える">AIを「導入する」から、<br /><em>仕事を「変える」へ</em></SectionTitle>
          <div className={styles.casePanel}><div className={styles.caseArtwork}><Image src={`/images/training-lp/consulting-support${imageSuffix}.webp`} alt="資料を確認しながらAIによる業務改善を相談するチームのイラスト" width={720} height={480} sizes="(max-width: 767px) 90vw, 420px" /></div><div><span className={styles.smallLabel}>ClearAIのAI活用・業務改善支援</span><h3>課題の整理から、<br />現場で使う仕組みづくりまで</h3><p>何にAIを使うかを決め、業務に組み込み、使い続ける。ClearAIは、企業のAI活用をこうした流れで支援しています。研修も、現場の課題を起点に設計します。</p><Link href="/case-studies" className={styles.textLink}>AI活用・業務改善の支援事例を見る <span aria-hidden="true">›</span></Link><small>リンク先はClearAIの支援事例です。本研修の受講実績を示すものではありません。</small></div></div>
        </section>

        <ConversionBand courseName={course.name} />

        <section className={`${styles.section} ${styles.storySection}`}>
          <div className={styles.storyGrid}><div className={styles.storyImage}><Image src={`/images/training-lp/security-team${imageSuffix}.webp`} alt="業務の進め方と安全なAI活用を一緒に検討するチーム" width={800} height={600} sizes="(max-width: 767px) 90vw, 480px" /><div className={styles.storyImageLabel}>技術と現場のあいだに、ClearAI。</div></div><div><p className={styles.sectionLead}>なぜ、ClearAIが研修をするのか</p><h2>いい道具を、<br />使いこなせる組織を<br />増やしたい</h2><p>AIでできることが増えても、現場には「どこから始めればいい？」「うちの仕事でも使える？」という迷いがあります。</p><p>だから、私たちはツールの説明をするだけでなく、業務を聞くところから始めます。できることと確認が必要なことを整理し、自分たちで前に進むための力を育てる。その最初の一歩を、研修で支えます。</p><Link href="/about" className={styles.textLink}>ClearAIについて <span aria-hidden="true">›</span></Link></div></div>
        </section>

        <section id="curriculum" className={`${styles.section} ${styles.lavender}`}>
          <SectionTitle lead="カリキュラム例" text="事前準備＋全4回で構成した場合の一例です。回数・時間・内容は、受講者の経験と目的に合わせて調整します。">知る、試す、確かめる。<br /><em>実務に近づくステップ設計</em></SectionTitle>
          <TrainingCurriculumTabs lessons={lessons} toolName={course.name} />
          <p className={styles.centerNote}>各回の内容・成果物は、ヒアリング後にご提案します。</p>
        </section>

        <section id="examples" className={styles.section}>
          <SectionTitle lead="部門ごとの活用・演習例" text="エンジニアだけの道具ではありません。身近な業務から、チームに合う使い方を見つけます。">あなたの部署なら、<br /><em>こんな仕事から始められます</em></SectionTitle>
          <div className={styles.departmentGrid}>{departments.map((department) => <article key={department.role} className={styles.departmentCard}><span className={styles.departmentRole}>{department.role}</span><div className={styles.departmentVisual}><Image src={`/images/training-lp/${department.image}${imageSuffix}.webp`} alt={`${department.role}でAIを活用するチームのイラスト`} width={720} height={480} sizes="(max-width: 767px) 90vw, (max-width: 1199px) 40vw, 28vw" /></div><div className={styles.departmentCopy}><h3>{department.title}</h3><p>{department.text}</p><div><span>成果物の例</span><strong>{department.deliverable}</strong></div></div></article>)}</div>
        </section>

        <section className={`${styles.section} ${styles.targetSection}`}>
          <SectionTitle lead="こんな企業・チームにおすすめです">導入前の検討から、<br /><em>すでに使っているチームの底上げまで</em></SectionTitle>
          <div className={styles.targetGrid}><div><h3><Icon kind="team" />研修が向いているチーム</h3><ul className={styles.checkList}><li>AIを実務に取り入れたいが、始め方に迷っている</li><li>メンバー間の知識や使い方の差を減らしたい</li><li>安全な利用ルールを揃えたい</li><li>自社の業務課題を題材に、実践したい</li></ul></div><div><h3><Icon kind="document" />受講前に、一緒に確認すること</h3><dl><div><dt>受講者</dt><dd>役割・経験・PCの基本操作</dd></div><div><dt>利用環境</dt><dd>対応アカウント・PC・ネットワーク</dd></div><div><dt>社内ルール</dt><dd>導入許可・データの取り扱い</dd></div><div><dt>研修の目標</dt><dd>扱いたい業務・持ち帰りたい成果物</dd></div></dl></div></div>
        </section>

        <ConversionBand courseName={course.name} />

        <section className={styles.section}>
          <SectionTitle lead="研修を、次の一歩につなげるために">学ぶ前も、学んだあとも。<br /><em>必要な支援を、必要な範囲で</em></SectionTitle>
          <div className={styles.supportGrid}>{[["document", "実践研修", "自社に合う、学びの設計", "受講者の経験や業務に合わせ、説明・演習・成果物を設計します。"], ["shield", "利用ルールの整理", "安心して使うための土台", "入力データ、権限、承認、結果の確認など、社内で揃える観点を整理します。"], ["team", "定着・実装の相談", "現場に根づく、その先へ", "研修後の運用改善やツール開発も、課題に応じて別途ご相談いただけます。"]].map(([icon, label, title, text]) => <article key={label}><Icon kind={icon} /><span>{label}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
        </section>

        <section id="pricing" className={`${styles.section} ${styles.lavender}`}>
          <SectionTitle lead="研修費用・実施形式">目的に合う内容を、<br /><em>無理のない計画で</em></SectionTitle>
          <div className={styles.pricingPanel}><div className={styles.priceHead}><span>{course.name} 法人向け実践研修</span><h3>ご要望に合わせた<br /><strong>個別お見積もり</strong></h3><p>人数・内容・形式を伺い、<br />研修プランと費用をセットでご提案します。</p><ApplyButton /></div><dl className={styles.priceDetails}><div><dt>実施形式</dt><dd>オンライン・対面でご相談</dd></div><div><dt>日程・人数</dt><dd>受講者の経験とご希望に合わせて調整</dd></div><div><dt>プログラム</dt><dd>事前準備＋全4回をベースに個別設計</dd></div><div><dt>費用に関する確認</dt><dd>ライセンス・API利用料は別途。対面時の交通費等は見積もり時に明示します。</dd></div></dl></div>
          <div className={styles.pricingNotes}><Link href="/training#pricing">AI内製化研修の料金案内も見る <span aria-hidden="true">›</span></Link><p><strong>助成金の活用を検討されている方へ</strong><br />制度の対象要件や申請可否は企業・研修内容により異なります。適用を前提とした料金表示は行わず、ご相談時に確認事項を整理します。</p></div>
        </section>

        <section id="faq" className={styles.section}>
          <SectionTitle lead="受講前に、気になること">よくあるご質問</SectionTitle>
          <div className={styles.faq}>{faqs.map(([question, answer]) => <details key={question}><summary><span className={styles.questionMark}>Q</span><span>{question}</span><span className={styles.faqToggle} aria-hidden="true">＋</span></summary><div className={styles.faqAnswer}><span>A</span><p>{answer}</p></div></details>)}</div>
        </section>

        <section className={`${styles.section} ${styles.lavender}`}>
          <SectionTitle lead="ご相談から実施までの流れ">最初は、<br /><em>今の仕事の話から</em></SectionTitle>
          <ol className={styles.flow}>{[["無料相談のお申し込み", "フォームから、受講人数やご希望をお知らせください。未定の項目があっても大丈夫です。"], ["課題・目標のヒアリング", "対象業務、経験、利用環境を伺い、研修で目指す状態を整理します。"], ["研修プラン・お見積もり", "内容、実施形式、日程、費用をご提案。条件を確認してからお申し込みいただけます。"], ["環境・データの事前準備", "アカウント・PC・権限を確認し、安全に使える演習データを準備します。"], ["研修実施・振り返り", "実践と確認を重ね、成果物と研修後に取り組む課題を整理します。"]].map(([title, text], index) => <li key={title}><span className={styles.stepNumber}>{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
        </section>

        <section id="contact" className={`${styles.section} ${styles.contactSection}`}>
          <SectionTitle lead={`${course.name}研修の無料相談・お見積もり`}>研修内容と費用を、<br /><em>まずは無料でご相談ください</em></SectionTitle>
          <div className={styles.contactGrid}><div className={styles.contactMessage}><h3>「うちでも使える？」から、<br />気軽にご相談ください</h3><p>やりたいことが具体的でなくても構いません。現在の業務やチームの状況を伺い、取り組みやすい題材と学び方をご提案します。</p><ul className={styles.checkList}><li>自社に合う活用テーマの整理</li><li>人数・経験に合わせた研修内容</li><li>実施日程・形式・費用のご案内</li></ul><div className={styles.contactBooking}><strong>日程を先に決めたい方へ</strong><a {...BOOKING_LINK_PROPS}>日程を選んで相談する <span aria-hidden="true">↗</span></a></div><Image src={`/images/training-lp/team-workshop${imageSuffix}.webp`} alt="相談を通じて研修プランを一緒につくるイメージ" width={600} height={400} sizes="(max-width: 767px) 80vw, 360px" /></div><div className={styles.contactForm}><TrainingLeadForm courseName={course.name} sourcePath={`/training/${tool}`} /></div></div>
        </section>

        <div className={styles.resourceLinks}><h2>導入を検討するための読みもの</h2><div><Link href="/column/seisei-ai-kenshu-joseikin"><Icon kind="document" /><span>研修計画・費用について考える<strong>生成AI研修に使える助成金と申請の流れ</strong></span><b aria-hidden="true">›</b></Link><Link href="/ai-consulting"><Icon kind="team" /><span>研修後の活用を相談したい方へ<strong>AI顧問・伴走支援について</strong></span><b aria-hidden="true">›</b></Link></div></div>

        <div className={styles.related}><Link href={`/training/${course.otherPath}`}><span>もうひとつの実践研修</span><strong>{course.other}研修を見る <b aria-hidden="true">›</b></strong></Link><Link href="/training"><span>基礎から幅広く学びたい方へ</span><strong>AI内製化研修の全体を見る <b aria-hidden="true">›</b></strong></Link></div>
        <footer className={styles.footer}><div><Link href="/" aria-label="ClearAI ホーム"><Image src="/images/logo-clear-wordmark.png" width={140} height={40} alt="ClearAI" /></Link><nav aria-label="フッターナビゲーション"><Link href="/about">会社情報</Link><Link href="/privacy">プライバシーポリシー</Link><Link href="/contact">お問い合わせ</Link></nav></div><p>本研修はClearAI株式会社が提供する独自の研修です。AnthropicまたはOpenAIの公式・認定研修ではありません。製品名は各社に帰属します。</p><small>© ClearAI Inc.</small></footer>
      </div>
      <div className={styles.mobileCta}><a href="#contact">無料相談・見積もりを申し込む <span aria-hidden="true">›</span></a></div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    </div>
  );
}

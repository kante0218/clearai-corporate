import Link from "next/link";
import type { Metadata } from "next";
import { BOOKING_LINK_PROPS } from "@/lib/booking";
import styles from "./AgentTrainingPage.module.css";

type Tool = "claude-code" | "codex";
const courses = {
  "claude-code": {
    name: "Claude Code", other: "Codex", otherPath: "codex", instruction: "CLAUDE.md",
    lead: "仕事の進め方を、\nClaude Codeとつくる",
    description: "調べる、整理する、つくる。その先の、確かめて引き継ぐところまで。自社の業務を題材に、Claude Codeを仕事で使うための考え方と操作を身につける法人向け研修です。",
    task: "複数の営業報告から、週次レポートを作成する",
    files: ["CLAUDE.md", "reports/（練習用データ）", "weekly-summary.md"],
    instructionText: "個人情報は入力しない。数値には出典を付ける。保存前に内容を確認する。",
    curriculum: [
      ["基本を知り、安全に始める", "チャットとの違い、作業環境、ファイルの扱い、操作の許可を学習。練習用フォルダで、小さな依頼から試します。", "環境設定・入力データのルール"],
      ["業務を分解し、依頼を組み立てる", "資料の整理やレポート作成を題材に、目的・制約・完成条件を伝える練習。途中の成果を確認しながら進めます。", "業務に合わせた依頼文・作業手順"],
      ["チームで使える型にする", "CLAUDE.mdに共通ルールを整理。繰り返す作業をスキルとしてまとめる考え方と、結果の検証・修正を学びます。", "CLAUDE.md・再利用できる作業の型"],
      ["実務課題で試し、運用を決める", "選定した課題の試作品を作成。出典・計算・変更内容を確認し、担当者、承認、改善の進め方を整理します。", "試作品・確認リスト・運用メモ"],
    ],
    uses: [
      ["営業・管理部門", "報告資料のたたき台をつくる", "練習用の営業報告を整理し、週次サマリーを作成。元データと照合し、人が判断する箇所を明確にします。"],
      ["企画・業務改善担当", "繰り返すファイル作業を整理する", "フォルダ内の資料分類、一覧作成、CSV整形を題材に、実行前の確認とバックアップの手順を学びます。"],
      ["開発・情報システム部門", "既存コードを読み、改善する", "コードの調査、変更案の作成、テスト、差分レビューまでを演習。チームの開発ルールに合わせて調整します。"],
    ],
  },
  codex: {
    name: "Codex", other: "Claude Code", otherPath: "claude-code", instruction: "AGENTS.md",
    lead: "つくる力を、\nCodexでチームに",
    description: "アイデアを伝えるだけで終わらせない。要件の整理から実装、テスト、変更の確認まで。Codexを使い、自社の業務ツールを育てるための法人向け実践研修です。",
    task: "社内の申請フォームに、入力チェックを追加する",
    files: ["AGENTS.md", "src/request-form.tsx", "tests/request-form.test.ts"],
    instructionText: "既存の作り方に合わせる。変更範囲を絞る。テストと差分を確認する。",
    curriculum: [
      ["基本を知り、安全に始める", "Codexの役割と作業環境を確認。練習用プロジェクトで、ファイルの参照、作業範囲、実行権限を学びます。", "環境設定・権限とデータのルール"],
      ["要件を整理し、小さくつくる", "利用者、入力、出力、完成条件を言葉にする練習。業務ツールの小さな試作品を、確認しながら作成します。", "要件メモ・小さな試作品"],
      ["変更を確かめ、チームで扱う", "AGENTS.mdに作業ルールを整理。コード差分の読み方、テスト、エラーの切り分け、変更を戻す考え方を学びます。", "AGENTS.md・テストとレビューの記録"],
      ["実務課題で試し、引き継ぐ", "選定した課題を改善し、想定外の入力も確認。人が承認する範囲と、公開・保守の担当を決めて発表します。", "試作品・操作手順・引き継ぎメモ"],
    ],
    uses: [
      ["業務改善・企画担当", "社内ツールの試作品をつくる", "申請フォームやデータ確認画面を題材に、必要な機能を整理。利用者目線で動作を確認する方法を学びます。"],
      ["開発チーム", "既存プロジェクトを改善する", "不具合の調査、小さな機能追加、テスト作成を演習。変更理由と影響範囲を説明できる状態を目指します。"],
      ["情報システム・管理部門", "定型処理を自動化する", "練習用CSVの整形や集計スクリプトを題材に、入力の検証、実行結果の照合、再実行時の注意点を扱います。"],
    ],
  },
} as const;

export function agentTrainingMetadata(tool: Tool): Metadata {
  const { name, description } = courses[tool];
  const title = `${name}研修 | 法人向け・実務で学ぶAI活用`;
  return { title, description, alternates: { canonical: `https://clearai.jp/training/${tool}` }, openGraph: { title: `${name}研修 | ClearAI株式会社`, description, url: `https://clearai.jp/training/${tool}`, type: "website", locale: "ja_JP", siteName: "ClearAI株式会社", images: ["/images/logo.png"] }, twitter: { card: "summary_large_image", title: `${name}研修 | ClearAI株式会社`, description, images: ["/images/logo.png"] } };
}

export default function AgentTrainingPage({ tool }: { tool: Tool }) {
  const course = courses[tool];
  const faqs = [
    ["プログラミング未経験でも受講できますか？", "はい。PCの基本操作ができる方を対象に、ファイル操作や用語の説明から組み立てます。非エンジニアは業務整理と小さな試作を中心に、開発者は既存コードやテストを中心に、内容を調整します。"],
    ["自社のデータや業務を題材にできますか？", "ご相談いただけます。持ち込み前に、利用可能なデータと社内規程を確認します。機密情報や個人情報を含む場合は、匿名化データや練習用データへの置き換えを検討します。"],
    ["受講に必要なアカウント・環境は？", `${course.name}を利用できるアカウントと、演習に対応したPC・ネットワークが必要です。利用プランや管理者の許可、ソフトウェアの導入可否は事前に確認します。ライセンス・API等の利用料金は研修費と別途です。`],
    ["日程や人数、実施方法は選べますか？", "はい。オンライン・対面、参加人数、受講者の経験、研修の目的を伺って実施方法と日程をご提案します。掲載の全4回カリキュラムは一例で、回数・時間・扱う範囲は個別に設計します。"],
    ["研修でつくったものは、そのまま本番で使えますか？", "研修では学習用の試作品を扱います。本番利用には、セキュリティ・個人情報・権限・テスト・保守体制などの別途確認が必要です。研修の段階から、公開前に必要な確認事項も整理します。"],
    ["研修費用を教えてください。", "目的、人数、実施形式、カリキュラムの範囲に合わせた個別見積もりです。ご相談時に条件を整理し、研修内容と費用をご提示します。"],
  ];
  const schema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) };
  return <div className={styles.page}>
    <div className={styles.wrap}><nav className={styles.breadcrumb} aria-label="パンくず"><Link href="/">ホーム</Link><span>/</span><Link href="/training">AI内製化研修</Link><span>/</span><span>{course.name}研修</span></nav></div>
    <section className={`${styles.wrap} ${styles.hero}`}>
      <div><p className={styles.kicker}>ClearAIの法人向け実践プログラム</p><h1><span className={styles.courseName}>{course.name}研修</span>{course.lead.split("\n").map((line) => <span key={line}>{line}</span>)}</h1><p className={styles.intro}>{course.description}</p><div className={styles.actions}><a {...BOOKING_LINK_PROPS} className={styles.primary}>研修について相談する<span aria-hidden="true">↗</span></a><a href="#curriculum" className={styles.secondary}>カリキュラムを見る</a></div><p className={styles.note}>非エンジニアから開発チームまで、目的と経験に合わせて設計。</p></div>
      <div className={styles.workspace} aria-label="研修で扱う作業のイメージ"><div className={styles.workspaceHead}><strong>{course.name}と進める仕事</strong><span>演習イメージ</span></div><div className={styles.request}><small>人が、目的を決める</small><p>{course.task}</p></div><div className={styles.workspaceBody}><div className={styles.files}><small>作業フォルダ</small>{course.files.map((file) => <span key={file}>{file}</span>)}</div><div className={styles.rules}><small>{course.instruction} のルール例</small><p>{course.instructionText}</p></div></div><div className={styles.checklist}><strong>完成前に、人が確かめる</strong><span>✓ 内容・変更の確認</span><span>✓ 元データ・テストとの照合</span><span>✓ 利用・共有の判断</span></div><p className={styles.workspaceNote}>実際の製品画面ではありません。研修で学ぶ作業の流れを表しています。</p></div>
    </section>
    <div className={styles.navbar}><div className={styles.wrap}><a href="#outcomes">目指す姿</a><a href="#approach">研修の特徴</a><a href="#curriculum">カリキュラム</a><a href="#examples">活用例</a><a href="#format">実施形式・費用</a><a href="#faq">よくある質問</a></div></div>
    <section id="outcomes" className={`${styles.section} ${styles.wrap}`}><div className={styles.sectionHeading}><p>研修で目指す姿</p><h2>「触ってみた」を、<br />「仕事で使える」に</h2><p>AIに任せる範囲を決め、結果を確かめる。操作だけでなく、自社で続けるための仕事の進め方を学びます。</p></div><div className={styles.outcomes}>{[["何を頼めばよいか分からない", "業務を分解し、依頼できる", "目的・入力・出力・完成条件を整理し、AIに任せる作業を選びます。"], ["結果が正しいか判断できない", "確かめる手順を持てる", "根拠や変更内容を照合し、修正が必要な点を自分たちで見つけます。"], ["詳しい人に使い方が偏っている", "チームで再現できる", `${course.instruction}や作業手順にルールを残し、担当者が変わっても引き継げる形を考えます。`]].map(([before, after, text]) => <article key={before}><p className={styles.before}>{before}</p><span aria-hidden="true">↓</span><h3>{after}</h3><p>{text}</p></article>)}</div></section>
    <section id="approach" className={styles.soft}><div className={`${styles.section} ${styles.wrap}`}><div className={styles.sectionHeading}><p>ClearAIの研修設計</p><h2>ツールの説明から、<br />自社の実務へ踏み込む</h2></div><div className={styles.featureRows}>{[["業務を起点に、題材を選ぶ", "受講者の役割と日々の作業を伺い、取り組む課題を絞ります。サンプルの操作を覚えるだけでなく、実務への置き換え方まで考えます。"], ["小さく試し、その場で確かめる", "説明と演習を組み合わせ、依頼、実行、確認、修正を繰り返します。経験に合わせて難易度を調整し、質問しながら進めます。"], ["安全に使う判断を、練習する", "入力データ、ファイルの変更、外部接続、コマンド実行の権限を確認。削除・送信・公開など、取り消しにくい操作は人の承認を前提に扱います。"]].map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div><aside className={styles.security}><strong>導入前の確認も、研修の一部です。</strong><p>利用プラン・データの取り扱い・社内規程・管理者設定を確認し、演習環境を準備します。製品の契約条件や機能は変更されるため、実施時点の公式情報に基づいて扱います。</p></aside></div></section>
    <section id="curriculum" className={`${styles.section} ${styles.wrap}`}><div className={styles.sectionHeading}><p>カリキュラム例</p><h2>はじめの一歩から、<br />実務につながる試作まで</h2><p>全4回で構成した場合の一例です。内容・回数・時間は、目的と受講者の経験に合わせて調整します。</p></div><div className={styles.curriculum}>{course.curriculum.map(([title, text, result], index) => <article key={title}><div className={styles.session}>第{index + 1}回</div><div><h3>{title}</h3><p>{text}</p><p className={styles.result}><strong>持ち帰るもの</strong>{result}</p></div></article>)}</div></section>
    <section id="examples" className={styles.dark}><div className={`${styles.section} ${styles.wrap}`}><div className={styles.sectionHeading}><p>業務別の演習例</p><h2>あなたの仕事なら、<br />何から始めますか</h2><p>以下は演習テーマの例です。利用できるデータと環境を確認したうえで、題材を決めます。</p></div><div className={styles.useCases}>{course.uses.map(([role, title, text]) => <article key={title}><p className={styles.role}>{role}</p><h3>{title}</h3><p>{text}</p></article>)}</div><div className={styles.takeaway}><h3>研修のあとに、手元に残す</h3><ul><li>取り組んだ課題の試作品と要件メモ</li><li>{course.instruction}などの作業ルール</li><li>確認リストと再実行の手順</li><li>本番利用に向けた課題・引き継ぎメモ</li></ul><p>成果物は研修の設計・進行により異なります。本番利用できる完成品を保証するものではありません。</p></div></div></section>
    <section id="format" className={`${styles.section} ${styles.wrap}`}><div className={styles.sectionHeading}><p>実施形式・費用</p><h2>自社に合う学び方を、<br />一緒に組み立てます</h2></div><dl className={styles.specs}><div><dt>対象</dt><dd>経営者、業務改善・管理部門、情報システム、開発チームなど。受講者の経験別に内容を調整します。</dd></div><div><dt>実施方法</dt><dd>オンライン・対面でご相談。人数、日程、研修時間は個別に調整します。</dd></div><div><dt>事前準備</dt><dd>PC・ネットワーク・対応アカウントをご用意ください。利用プラン、導入権限、教材用データは事前に確認します。</dd></div><div><dt>費用</dt><dd><strong>個別見積もり</strong><br />人数・形式・内容に応じてご提示します。ライセンス・API利用料、対面実施時の諸費用等は見積もり時に確認します。</dd></div></dl><div className={styles.actions}><a {...BOOKING_LINK_PROPS} className={styles.primary}>内容と見積もりを相談する<span aria-hidden="true">↗</span></a><Link href="/contact" className={styles.secondary}>お問い合わせフォーム</Link></div></section>
    <section className={styles.soft}><div className={`${styles.section} ${styles.wrap}`}><div className={styles.sectionHeading}><p>ご相談から実施まで</p><h2>課題を聞くところから、<br />研修は始まります</h2></div><ol className={styles.flow}>{[["目的を伺う", "現在の業務、困りごと、受講者の経験、導入状況を整理します。"], ["内容・費用をご提案", "題材、到達目標、実施形式、日程、見積もりをすり合わせます。"], ["環境とデータを準備", "アカウント・PC・権限を確認し、安全に使える演習データを用意します。"], ["実施・振り返り", "演習と確認を重ね、成果物と今後の運用課題を整理します。"]].map(([title, text], index) => <li key={title}><span>{index + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></div></section>
    <section id="faq" className={`${styles.section} ${styles.wrap}`}><div className={styles.sectionHeading}><p>よくある質問</p><h2>受講前の疑問に<br />お答えします</h2></div><div className={styles.faq}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">＋</span></summary><p>{answer}</p></details>)}</div></section>
    <section className={styles.finalCta}><div className={styles.wrap}><p>{course.name}研修を、ClearAIと。</p><h2>まずは、今の仕事の話を<br />聞かせてください</h2><p>まだ題材が決まっていなくても構いません。<br />取り組む課題と、目指す姿から一緒に整理します。</p><div className={styles.actions}><a {...BOOKING_LINK_PROPS} className={styles.primary}>研修について相談する<span aria-hidden="true">↗</span></a><Link href="/contact" className={styles.secondary}>フォームで問い合わせる</Link></div></div></section>
    <div className={`${styles.wrap} ${styles.related}`}><Link href={`/training/${course.otherPath}`}><span>もうひとつの実践研修</span><strong>{course.other}研修を見る</strong></Link><Link href="/training"><span>幅広いAI活用を学びたい方へ</span><strong>AI内製化研修の全体を見る</strong></Link></div>
    <div className={`${styles.wrap} ${styles.disclaimer}`}>本研修はClearAI株式会社が提供する独自の研修です。AnthropicまたはOpenAIの公式・認定研修ではありません。Claude、Claude CodeはAnthropicの、CodexはOpenAIの製品名です。</div>
    <div className={styles.mobileCta}><a {...BOOKING_LINK_PROPS}>{course.name}研修を相談する<span aria-hidden="true">↗</span></a></div>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  </div>;
}

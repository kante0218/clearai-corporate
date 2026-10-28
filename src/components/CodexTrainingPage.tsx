import Image from "next/image";
import Link from "next/link";
import TrainingLeadForm from "@/components/TrainingLeadForm";
import TrainingMobileNav from "@/components/TrainingMobileNav";
import { BOOKING_LINK_PROPS } from "@/lib/booking";
import styles from "./CodexTrainingPage.module.css";

const lessons = [
  ["第1回", "基本操作と安全な使い方", "依頼の出し方と、結果を確かめる手順。"],
  ["第2回", "小さな業務ツールを試作", "利用者・入力・出力・完成条件を整理。"],
  ["第3回", "チームで使うルールを整備", "AGENTS.md、変更差分、テストを確認。"],
  ["第4回", "実務課題で試し、引き継ぐ", "試作品を振り返り、運用上の課題を整理。"],
];
const faqs = [
  ["プログラミング未経験でも受講できますか？", "PCの基本操作ができる方を対象に、経験と業務に合わせて内容を調整します。"],
  ["自社のデータを使えますか？", "社内規程と利用権限を事前に確認します。機密情報・個人情報は匿名化や練習用データへの置き換えを検討します。"],
  ["作ったものをそのまま本番で使えますか？", "研修でつくるのは学習用の試作品です。業務利用の前に、セキュリティ・権限・テスト・保守体制の確認が必要です。"],
  ["研修後の支援も相談できますか？", "定着支援や開発もご相談いただけます。研修とは範囲・期間・費用を分けてご提案します。"],
];
function Apply({ children = "無料相談・見積もり" }: { children?: React.ReactNode }) {
  return <a data-ui-with-icon data-ui-button="filled" className={styles.apply} href="#contact"><span className="ui-button-label">{children}</span><span className="ui-button-icon" data-ui-side="end" aria-hidden="true"><span aria-hidden="true">↗</span></span></a>;
}
export default function CodexTrainingPage() {
  const schema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) };
  return <div className={styles.page}>
    <header className={styles.header}>
      <Link href="/" aria-label="ClearAI ホーム"><Image src="/images/logo-clear-wordmark.png" width={132} height={40} alt="ClearAI" /></Link>
      <nav className={styles.desktopNav} aria-label="研修ページ内ナビゲーション"><a data-ui-button="nav" href="#curriculum"><span className="ui-button-label">カリキュラム</span></a><a data-ui-button="nav" href="#examples"><span className="ui-button-label">できること</span></a><a data-ui-button="nav" href="#pricing"><span className="ui-button-label">料金・条件</span></a><a data-ui-button="nav" href="#faq"><span className="ui-button-label">FAQ</span></a></nav>
      <TrainingMobileNav /><Apply />
    </header>
    <div data-course-content>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Codex法人研修</p>
          <h1>Codexを、<br />日々の仕事に。</h1>
          <p className={styles.heroLead}>非エンジニアから開発チームまで。</p>
          <ul className={styles.heroFacts}><li>実務で手を動かす</li><li>安全に使う</li><li>チームに残す</li></ul>
          <p className={styles.heroDescription}>要件整理から試作・テスト・引き継ぎまで。<br />自社の課題を題材に学ぶ実践研修です。</p>
          <Apply />
        </div>
        <Image className={styles.heroImage} src="/images/training-lp/hero-workflow.webp" alt="AIと協力して業務を進めるチームの説明用イラスト" width={1000} height={667} priority sizes="(max-width: 767px) 90vw, 540px" />
        <p className={styles.imageNote}>説明用イラストです。</p>
      </section>
      <section id="examples" className={styles.section}>
        <h2>こんな仕事から始められます</h2>
        <div className={styles.usecases}><div><h3>営業・企画</h3><p>商談メモ、提案資料、リサーチの整理。</p></div><div><h3>管理・バックオフィス</h3><p>CSVの集計、社内FAQ、申請フローの試作。</p></div><div><h3>開発・情報システム</h3><p>不具合調査、機能追加、テストとレビュー。</p></div></div>
        <p className={styles.note}>活用・演習の例です。題材と完成条件は、受講者の経験と目的に合わせて相談します。</p>
        <details className={styles.sample}><summary>演習の説明用サンプルを見る</summary><p>会議メモを「決定事項・次の作業・担当・期限・未確認事項」に整理し、原文と照合します。</p><a href="/downloads/training-output-sample.txt" download>説明例と空欄シートを保存</a></details>
      </section>
      <section id="curriculum" className={`${styles.section} ${styles.tinted}`}>
        <h2>カリキュラム</h2><p className={styles.sectionIntro}>事前準備＋全4回の構成例です。回数・時間・内容は個別に設計します。</p>
        <ol className={styles.lessons}>{lessons.map(([label, title, text]) => <li key={label}><span>{label}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
        <p className={styles.note}>成果物の例：要件メモ、業務の試作品、確認リスト、運用・引き継ぎメモ。</p>
      </section>
      <section id="pricing" className={`${styles.section} ${styles.tinted}`}>
        <h2>進め方と受講条件</h2>
        <ol className={styles.process}><li>無料相談</li><li>課題整理・お見積もり</li><li>環境準備・研修</li></ol>
        <dl className={styles.conditions}><div><dt>料金</dt><dd><strong>個別お見積もり</strong><p>人数・内容・実施形式・準備範囲を伺ってご提案します。</p></dd></div><div><dt>対象</dt><dd>PCの基本操作ができる方。非エンジニアから開発チームまで。</dd></div><div><dt>形式・日程</dt><dd>オンライン・対面でご相談。全4回は構成例で、各回の時間も個別設計です。</dd></div><div><dt>事前準備</dt><dd>Codex対応アカウント・PC・ネットワーク、社内の利用許可。</dd></div><div><dt>別途費用</dt><dd>ライセンス・API利用料。対面時の交通費等は見積もりに明示します。</dd></div></dl>
        <p className={styles.note}>助成金の要件・申請可否は企業と研修内容により異なります。適用を前提とした料金ではありません。</p>
        <Apply />
      </section>
      <section id="teacher" className={`${styles.section} ${styles.profile}`}>
        <Image src="/images/kanki-takahashi-20261028.jpeg" alt="ClearAI 代表 髙橋敢輝" width={1206} height={1152} sizes="(max-width: 767px) 144px, 176px" />
        <div><h2>研修のご相談担当</h2><h3>髙橋 敢輝 <span>ClearAI 代表取締役</span></h3><p>2026年にClearAIを創業。中小企業のAI活用と事業開発を支援しています。</p><p className={styles.note}>実施する講師と担当範囲は、ご相談時にご確認ください。</p><Link href="/about#members">プロフィールを見る</Link></div>
      </section>
      <section id="faq" className={styles.section}><h2>よくある質問</h2><div className={styles.faq}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
      <section id="contact" className={`${styles.section} ${styles.contact}`}>
        <div><p className={styles.eyebrow}>まずは、今の仕事の話から。</p><h2>自社に合う研修を、<br />一緒に考えます。</h2><p>目的・人数・時期が未定でもご相談いただけます。</p><a data-ui-with-icon data-ui-button="control" className={styles.booking} {...BOOKING_LINK_PROPS}><span className="ui-button-label">日程を選んで相談する </span><span className="ui-button-icon" data-ui-side="end" aria-hidden="true"><span aria-hidden="true">↗</span></span></a></div>
        <TrainingLeadForm courseName="Codex" sourcePath="/training/codex" />
      </section>
    </div>
    <footer className={styles.footer}><Link href="/about">会社情報</Link><Link href="/privacy">プライバシーポリシー</Link><Link href="/contact">お問い合わせ</Link><p>ClearAI独自の研修です。OpenAIの公式・認定研修ではありません。</p><small>© ClearAI Inc.</small></footer>
    <div className={styles.mobileCta}><Apply /></div>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
  </div>;
}

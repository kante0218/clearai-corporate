"use client";
import LocalizedContent from "@/components/LocalizedContent";

import Link from "next/link";
import Image from "next/image";
import { BOOKING_LINK_PROPS } from "@/lib/booking";
import styles from "./MeoContent.module.css";

const description = "ClearAIのGoogleマップ・MEO支援。Googleビジネスプロフィールの店舗情報整備、写真・投稿の運用、口コミ返信、レポートと改善提案を、必要な範囲からご相談いただけます。月額30,000円（税別）、最低契約期間6か月。順位や売上は保証していません。";

const offerings = [
  ["店舗情報を正確に整える", "店名、住所・サービス提供地域、電話番号、営業時間・特別営業時間などを、実際の営業状況と照らし合わせて確認します。カテゴリやサービス情報も、事業の実態に合う内容へ整理します。"],
  ["写真と投稿で、いまの店舗を伝える", "店舗・商品・サービスの写真や、お知らせの投稿内容と更新予定を相談します。素材の利用許可と内容を確認し、承認を得てから運用する手順を整えます。利用できる機能は業種やプロフィールの状態によって異なります。"],
  ["口コミへの返信を支援する", "実際の体験に基づく口コミに対して、お店の方針に沿う返信文の作成・確認を支援します。個人情報に配慮し、好意的な声も厳しい声も受け止める運用を考えます。"],
  ["レポートを次の改善につなげる", "プロフィールで確認できる閲覧やウェブサイトへのクリックなど、利用可能な指標を振り返ります。期間や季節による変化も踏まえ、情報の見直しや次の投稿について改善案を整理します。"],
];
const steps = [
  ["現状とお困りごとを伺います", "店舗の業種、地域、プロフィールの有無、更新状況を確認します。どこから手をつけるか決まっていない段階でもご相談ください。"],
  ["支援範囲と費用を相談します", "店舗数、整備する情報、写真・投稿の準備、口コミ返信、レポートの頻度などを確認し、お見積りします。確認担当者と承認の手順も事前に決めます。"],
  ["整備・運用し、振り返ります", "合意した範囲で情報を整え、内容の確認と承認を経て運用します。確認できるデータと店舗の状況を踏まえ、継続することと見直すことを相談します。"],
];
const faqs = [
  ["MEO支援とは何ですか？", "GoogleマップやGoogle検索で店舗を調べる方に、正しい情報を届けるための支援です。Googleビジネスプロフィールの整備と継続的な運用を中心に進めます。"],
  ["料金はいくらですか？", "月額30,000円（税別）／33,000円（税込）、最低契約期間は6か月です。対象店舗や支援範囲・開始日など、最終的な契約条件はお申し込み後にご案内し、双方で確認してから契約します。"],
  ["上位表示や売上は保証されますか？", "上位表示、特定の順位、問い合わせ数、来店数、売上は保証していません。Googleのローカル検索結果は関連性、距離、知名度などで決まり、料金を支払って順位を指定することはできません。"],
  ["口コミを増やすための依頼もできますか？", "実際のお客様の体験に基づき、評価や内容を誘導しない案内方法をご相談いただけます。架空口コミ、レビューの購入、特典と引き換えの口コミ依頼、好意的な口コミだけの選別依頼は行いません。"],
  ["Googleの公式サービスですか？", "ClearAIが提供する独立した運用支援サービスです。Googleの公式代理店や提携サービスとして提供するものではありません。"],
];

export default function MeoContent({ url }: { url: string }) {
  return <LocalizedContent><div className={styles.page}>
    <div className={styles.serviceNav}>
      <a href="#meo-top" aria-label="meo ページの先頭へ" className={styles.brand}><Image src="/images/meo/meo-logo.png" alt="meo" width={2008} height={783} priority /></a>
      <nav aria-label="MEO支援のページ内メニュー"><a href="#service">支援内容</a><a href="#price">料金</a><a href="#faq">よくあるご質問</a></nav>
      <a {...BOOKING_LINK_PROPS} className={styles.navCta}>相談を予約する</a>
    </div>
    <section id="meo-top" className={styles.hero} aria-labelledby="meo-title">
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <p className={styles.intro}>Googleマップ・MEO運用支援</p>
          <h1 id="meo-title">あなたのお店と、<br />探している人を<br />つなぐ。</h1>
          <p className={styles.lead}>お店の魅力が、きちんと伝わるように。<br />店舗情報の整備から、写真・投稿、口コミへの返信まで。<br className={styles.desktopBreak} />日々のGoogleマップ運用を、ClearAIが支援します。</p>
          <div className={styles.actions}><a {...BOOKING_LINK_PROPS} className={styles.primary}><span className="ui-button-label">MEOについて相談する</span></a><Link href="/download?document=meo" className={styles.secondary}>資料をダウンロード</Link></div>
          <p className={styles.heroPrice}>月額 <strong>30,000</strong> 円（税別）から<span>税込33,000円／最低契約期間6か月</span></p>
        </div>
        <figure className={styles.visual}>
          <svg viewBox="0 0 600 500" role="img" aria-labelledby="meo-map-title" className={styles.map}>
            <title id="meo-map-title">地域の中でお店を見つけるイメージ</title>
            <rect width="600" height="500" rx="40" fill="#eaf3dc" />
            <path d="M425 -30C360 80 530 120 460 240S375 390 450 540" stroke="#c4e5ea" strokeWidth="58" fill="none" />
            <g fill="#d9e9c3"><rect x="38" y="42" width="128" height="100" rx="18" /><rect x="190" y="25" width="130" height="92" rx="18" /><rect x="38" y="200" width="115" height="98" rx="18" /><rect x="190" y="175" width="130" height="90" rx="18" /><rect x="40" y="365" width="150" height="95" rx="18" /><rect x="270" y="340" width="100" height="125" rx="18" /><rect x="485" y="315" width="84" height="130" rx="18" /></g>
            <g stroke="#fff" strokeWidth="23" fill="none"><path d="M-20 165L610 130M165 -20L190 520M-20 330L620 285M345 -20L340 520" /></g>
            <g stroke="#e4e9db" strokeWidth="2" fill="none"><path d="M-20 165L610 130M165 -20L190 520M-20 330L620 285M345 -20L340 520" /></g>
            <g fill="#92b777"><circle cx="83" cy="91" r="17" /><circle cx="112" cy="100" r="14" /><circle cx="278" cy="403" r="17" /><circle cx="303" cy="414" r="14" /></g>
            <circle cx="295" cy="220" r="70" fill="#cbe94d" fillOpacity=".35" />
            <path d="M295 146c-29 0-51 22-51 50 0 38 51 81 51 81s51-43 51-81c0-28-22-50-51-50Z" fill="#3d652e" /><circle cx="295" cy="194" r="19" fill="#fff" />
            <g fill="#759361"><circle cx="104" cy="270" r="8" /><circle cx="508" cy="216" r="8" /><circle cx="233" cy="398" r="8" /></g>
          </svg>
          <div className={styles.searchIllustration}><span aria-hidden="true">⌕</span><span>近くのお店を探す</span><span className={styles.searchDot} aria-hidden="true" /></div>
          <div className={styles.storeIllustration}>
            <div className={styles.storeIcon} aria-hidden="true"><svg viewBox="0 0 100 86" fill="none"><path d="M18 35h64v42H18z" fill="#fff" stroke="#345528" strokeWidth="3"/><path d="m15 35 9-23h52l9 23" fill="#cbe94d" stroke="#345528" strokeWidth="3"/><path d="M15 35c0 14 18 14 18 0 0 14 17 14 17 0 0 14 17 14 17 0 0 14 18 14 18 0" stroke="#345528" strokeWidth="3"/><path d="M28 52h19v13H28zM60 52h13v25H60z" fill="#eaf3dc" stroke="#345528" strokeWidth="3"/></svg></div>
            <div><p className={styles.storeTitle}>街のお店</p><p>営業時間・写真・お知らせ</p><div className={styles.infoPills}><span>店舗情報</span><span>口コミ返信</span></div></div>
          </div>
          <figcaption>店舗情報の整備イメージ（実際のGoogleの画面ではありません）</figcaption>
        </figure>
      </div>
    </section>
    <div className={styles.promise}><p>情報を整える。魅力を伝える。運用を続ける。</p><span>お店の「いま」が伝わるGoogleマップへ。</span></div>
    <section className={styles.section} aria-labelledby="issues-title">
      <div className={styles.sectionHeading}><h2 id="issues-title">お店のことは、毎日忙しい。<br />マップの運用まで、手が回らない。</h2><p>そんな日々のお困りごとから、<br />一緒に整理していきます。</p></div>
      <ul className={styles.issues}><li><span aria-hidden="true">✓</span>営業時間や店舗情報が<br />古いままになっている</li><li><span aria-hidden="true">✓</span>写真や投稿を更新する<br />時間がとれない</li><li><span aria-hidden="true">✓</span>口コミへの返信や<br />改善の進め方に迷っている</li></ul>
    </section>
    <section id="service" className={`${styles.section} ${styles.serviceSection}`} aria-labelledby="offering">
      <div className={styles.sectionHeading}><h2 id="offering">店舗の情報整備から、<br />継続的な改善まで。</h2><p>必要な範囲を相談しながら、<br />お店に合った運用を支援します。</p></div>
      <dl className={styles.offerings}>{offerings.map(([title, body], i) => <div key={title}><dt><span className={styles.serviceIcon} aria-hidden="true">{["⌖", "▧", "☷", "↗"][i]}</span><span className={styles.serviceTitle}>{title}</span></dt><dd>{body}</dd></div>)}</dl>
    </section>
    <section className={styles.section} aria-labelledby="process"><div className={styles.sectionHeading}><h2 id="process">まずは、お店の今を<br />聞かせてください。</h2><p>ご相談から運用開始までの流れ</p></div><ol className={styles.steps}>{steps.map(([title, body], i) => <li key={title}><span className={styles.stepNumber}>{i + 1}</span><h3>{title}</h3><p>{body}</p></li>)}</ol></section>
    <section id="price" className={styles.priceSection} aria-labelledby="price-title"><div className={styles.priceInner}><div><h2 id="price-title">無理なく続ける、<br />店舗の運用支援。</h2><p>店舗情報・写真・投稿・口コミ返信・レポート。<br />具体的な支援範囲は、ご相談のうえ決定します。</p></div><div className={styles.priceDetail}><p>月額 <strong>30,000</strong> 円<span>（税別）</span></p><p>33,000円（税込）／最低契約期間6か月</p><p className={styles.priceNote}>対象店舗・支援範囲・開始日などの契約条件は、お申し込み後に双方で確認します。</p><Link href="/meo/apply" className={styles.primary}><span className="ui-button-label">MEO支援を申し込む</span></Link></div></div></section>
    <section className={styles.section} aria-labelledby="policy"><div className={styles.policy}><h2 id="policy">お客様にも、お店にも。<br />誠実な運用を大切にします。</h2><div><p>実際の営業情報とお客様の体験を大切にします。口コミの購入や評価の操作は行わず、Googleのガイドラインに沿って支援します。プロフィールの対象可否や利用できる機能を確認し、公開内容と対応範囲は店舗側と相談して決めます。</p><p>検索結果の順位や売上をお約束するサービスではありません。ClearAIはGoogleとは独立した事業者です。</p><a href="https://support.google.com/business/answer/7091?hl=ja" target="_blank" rel="noopener noreferrer">Google公式：ローカル検索結果のランキングについて</a><a href="https://support.google.com/contributionpolicy/answer/7400114?hl=ja" target="_blank" rel="noopener noreferrer">Google公式：マップ投稿コンテンツのポリシー</a></div></div></section>
    <section id="faq" className={`${styles.section} ${styles.faqSection}`} aria-labelledby="faq-title"><h2 id="faq-title">よくあるご質問</h2><div className={styles.faqs}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></section>
    <section className={styles.conversion} aria-labelledby="contact-title"><Image src="/images/meo/meo-logo.png" alt="meo" width={2008} height={783} /><h2 id="contact-title">お店の魅力を、<br />必要としている人へ。</h2><p>店舗の業種・地域と、お困りのことをお聞かせください。<br />プロフィールがまだない場合も、ご相談いただけます。</p><div className={styles.actions}><a {...BOOKING_LINK_PROPS} className={styles.primary}><span className="ui-button-label">MEOについて相談する</span></a><Link href="/download?document=meo" className={styles.secondary}>資料をダウンロード</Link></div><Link href="/meo/apply" className={styles.applyLink}>MEO支援のお申し込みはこちら</Link></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", name: "Googleマップ・MEO支援", description, url, provider: { "@type": "Organization", name: "ClearAI株式会社", url: "https://clearai.jp" } }) }} />
  </div></LocalizedContent>;
}

import Link from "next/link";
import training from "@/components/AgentTrainingPage.module.css";
import styles from "./page.module.css";
import { BOOKING_LINK_PROPS } from "@/lib/booking";

const measures = [
  ["質問と対象ページの整理", "誰のどんな疑問に答えるかを明確にする", "対象質問・ページ・不足情報の一覧", "質問ごとに回答の有無、根拠、更新日を確認"],
  ["一次情報と説明文の改善", "事業・提供条件を誤解なく理解できる状態にする", "見出し・本文・FAQの修正案と公開差分", "出典との一致、未確認の断言、目標と実績の区別をレビュー"],
  ["取得しやすいサイト構造へ改善", "読者と検索エンジンが必要な情報にたどり着けるようにする", "内部リンク・HTML・構造化データの修正と確認記録", "リンク先、HTTP応答、本文と構造化データの整合を確認。取得・インデックス状況も分けて確認"],
  ["AI回答での参照状況を記録", "対象の質問で自社情報がどう扱われるか把握する", "質問・日時・利用サービス・回答・参照URLの記録", "合意した質問群と条件で確認。引用が確認できた回答数／確認回答数を、対象範囲とともに報告"],
  ["検索流入と相談への導線を確認", "露出と事業へのつながりを分けて判断する", "確認可能な検索・アクセス・問い合わせデータの報告", "対象ページと期間をそろえ、クリック・訪問・面談申込等を比較。計測できない項目は未測定と記載"],
];
const practiceLog = [
  { topic: "AIOの説明と相談導線", detail: "AIOページを新設し、事業一覧・ナビ・問い合わせへ接続。支援範囲と保証しない事項を明記。", href: "/aio", label: "AIOページ" },
  { topic: "ホームページ制作の説明", detail: "既存の制作ページを更新し、提供内容と相談への導線を整理。", href: "/website-production", label: "ホームページ制作" },
  { topic: "目標と実績の区別", detail: "目標や試算を、達成済みの実績と誤認させない表現へ修正。", href: "/about", label: "会社概要" },
  { topic: "AI導入支援の期間説明", detail: "1か月という支援期間と、PoC・本番実装の到達点を区別し、対象範囲や時期は事前に合意する説明へ修正。", href: "/ai-consulting", label: "AI導入支援の期間説明" },
];
const effects = [
  ["ブランド言及率", "未測定", "合意した質問群の回答でClearAIへの言及があった回答数／確認回答数。施策前の回答記録がなく、改善率は算出できません。"],
  ["自社URL引用率", "未測定", "自社URLが引用・参照先として表示された回答数／確認回答数。単なる社名の言及と区別し、参照URLと確認条件を記録します。"],
  ["回答の正確性", "未測定", "回答中の事業内容・提供条件を公開情報と照合します。評価した回答数と基準を示し、未確認・誤り・正確を分けます。"],
  ["AI経由の流入", "未測定", "参照元等から識別できる訪問を確認します。AIの表示回数・引用数・クリック数・実際の訪問を同一視せず、識別できない流入も明記します。"],
  ["有効な問い合わせ", "未測定", "事前に合意する条件を満たす問い合わせを対象とします。AI経由との対応を確認できない申込を、AIOの成果として数えません。"],
];
const comparison = [
  { name: "ClearAI", audience: "一般企業・既存サイト", initial: "要見積り", monthly: "要見積り", tax: "見積時に明示", term: "相談して決定", scope: "対象の整理・診断・文章や構造の改善・制作実装を相談。範囲と測定方法を事前に合意。", url: "/aio", label: "サービス内容" },
  { name: "AIMA", audience: "一般企業・1サイト", initial: "0円", monthly: "50,000円", tax: "税別", term: "1か月単位", scope: "分析、記事・FAQ、既存ページ修正、公開・保守。大規模開発は対象外。", url: "https://ai-and-marketing.jp/service/", label: "公式サービス" },
  { name: "日本ビルダーズ AIO START", audience: "一般企業・1サイト", initial: "必要な場合は別見積り", monthly: "50,000円", tax: "税別", term: "契約書で確定", scope: "5テーマ・競合1社、月次対応、構造化データ。CMSなどの制約を確認。", url: "https://n-builders.jp/pricing", label: "公式料金" },
  { name: "LillyHoldings TrendPackage ライト", audience: "店舗向け・1店舗", initial: "50,000円の表示あり。包含の記述もあり、別請求かは要確認", monthly: "1年目50,000円／2年目25,000円", tax: "税別", term: "1年・自動更新", scope: "3ページの構造化、Googleビジネスプロフィール、月次対応。初期費用の扱いが確定できないため、総額は算出しません。", url: "https://trendpackage.lillyholdings.co.jp/ja/aio/price", label: "公式料金" },
  { name: "SOINTO", audience: "店舗向け", initial: "0円", monthly: "55,000円", tax: "税込", term: "契約翌月から12か月", scope: "AIO・MEO、口コミ、簡易ホームページ。LINEが必要。途中解約は残期間分の支払い条件あり。", url: "https://sointo.tech/", label: "公式サービス" },
  { name: "課題解決プラットフォーム スタンダード", audience: "一般企業", initial: "150,000円〜", monthly: "250,000円", tax: "税抜", term: "最低6か月", scope: "初月診断、構造化データ・FAQ、月次の流入確認。記事制作は上位プラン。", url: "https://0120.co.jp/aio/", label: "公式サービス" },
  { name: "メディアグロース", audience: "一般企業", initial: "非公開", monthly: "200,000円〜", tax: "表示から確認できず・要確認", term: "1か月〜", scope: "診断、方針、実行支援、測定。実装対応の可否・範囲は依頼内容に応じて確認。", url: "https://media-growth.co.jp/llmo-service/", label: "公式サービス" },
  { name: "メディアリーチ", audience: "一般企業", initial: "非公開・要見積り", monthly: "非公開・要見積り", tax: "見積時に要確認", term: "長期の縛りなし", scope: "計測、戦略提示、レビュー。制作などの実行はオプション。", url: "https://mediareach.co.jp/seo-consulting/llmo-service", label: "公式サービス" },
  { name: "Faber Company ミエルカGEOコンサルティング", audience: "一般企業", initial: "非公開・要見積り", monthly: "非公開・要見積り", tax: "見積時に要確認", term: "最低期間非公開・スポット相談可", scope: "露出診断、差分分析、提案、実行支援。制作などは別途。", url: "https://mieru-ca.com/solution/ai-seo/", label: "公式サービス" },
];
const steps = [
  ["目的と対象を決める", "現在のサイトと事業内容を伺い、どんな人の、どんな質問に情報を届けたいかを決めます。"],
  ["範囲と確認方法を合意する", "調査対象、改修するページ、成果物、確認条件を整理し、費用と進め方をご案内します。"],
  ["改善・公開・検証を進める", "文章と構造を見直し、公開後の変化を記録します。状況を見ながら、次に見直す内容を相談します。"],
];
const faq = [
  ["AIOとSEO・LLMOは何が違いますか？", "このサービスでは、AI検索で情報が理解・参照される状態を整える支援をAIOと呼びます。LLMOと呼ばれる施策と重なる部分があり、別々の仕組みとして切り分けません。SEOで大切な取得しやすさ、役立つ本文、明確な根拠も土台になります。"],
  ["AI回答への引用や検索順位を保証できますか？", "保証できません。引用や表示は各サービスの判断により、質問、日時、利用環境によっても変わります。確認条件を記録し、実際に観測できた結果と推測を分けて報告します。"],
  ["専用ファイルや特殊な構造化データが必要ですか？", "一律には必要ありません。GoogleはAIによる概要・AIモードへの掲載に特別な最適化や専用の構造化データを求めていません。既存のSEOと公開方針を確認し、必要な改善を選びます。"],
  ["費用と対応範囲はどう決まりますか？", "サイトの規模、調査対象、原稿や開発の対応範囲により変わります。まず現状と目的を伺い、範囲・成果物・費用・確認方法を相談して決めます。"],
];
const approaches = [
  { title: "お客様がAIに聞く質問から考える", body: "「何ができるか」だけでなく、「どの会社が自社に合うか」「他の選択肢とどう違うか」。検討する人の質問を整理し、AI回答での自社と競合の扱われ方を確認します。", items: ["目的・業種・条件ごとの質問を整理", "比較されるサービスと評価軸を確認", "回答の説明・参照元・不足情報を記録"], example: "製造業でAI導入を相談するなら？", detail: "対象業務、予算、現場の体制によって、必要な説明は変わります。" },
  { title: "選ぶ理由が伝わる一次情報をつくる", body: "対象となるお客様、解決できる課題、対応できる範囲、費用の条件。社内にある確かな情報を、比較・検討する人が判断できる文章へ整えます。", items: ["サービスの強みと提供条件を具体化", "事例・FAQ・比較の根拠を整理", "運営者・出典・更新日を明確に"], example: "誰に、何を、どこまで提供できるか", detail: "一般論の記事を増やす前に、自社にしか説明できない情報を揃えます。" },
  { title: "読者にも検索にも届く構造へ", body: "良い説明があっても、必要なページにたどり着けなければ伝わりません。本文、見出し、内部リンク、取得の可否を確認し、既存サイトの仕組みに合わせて改善します。", items: ["HTML・内部リンク・取得制限を確認", "本文と一致する構造化データを整備", "公開後の表示・リンク・応答を検証"], example: "情報を整理 → ページを公開 → 取得を確認", detail: "特別なファイルの追加を前提にせず、SEOの基本を土台に進めます。" },
  { title: "表示の変化を、問い合わせまで確かめる", body: "社名が出たこと、URLが引用されたこと、サイトに訪問したことは別の結果です。同じ質問と確認条件を記録し、何が変わったか、次に何を直すかを判断します。", items: ["質問・日時・AIサービス・参照URLを保存", "言及・引用・説明の正確性を分けて評価", "流入と有効な問い合わせを可能な範囲で確認"], example: "言及・引用 → 訪問 → 問い合わせ", detail: "観測できないデータは未測定と示し、施策の効果と推測を分けて報告します。" },
];
const questions = [
  ...faq,
  ["どのAIサービスを確認しますか？", "ChatGPT、Gemini、GoogleのAI機能、Perplexityなどから、事業やお客様の利用状況に合う対象を相談して決めます。サービスごとに検索・参照の仕方が異なるため、確認条件と対象範囲を記録します。"],
  ["どのような会社に向いていますか？", "法人向けサービス、専門性のある事業、比較して選ばれる商材などで、自社の説明や検討時の情報を整えたい企業に向いています。サイトの現状を確認し、AIO以外の改善を先に進めるべきかも含めて相談します。"],
  ["どのくらいで効果が出ますか？", "サイトの状態、情報の公開状況、競合、確認するAIサービスによって異なります。一定期間での引用や問い合わせ増加は約束せず、先に確認する質問と基準を決め、公開後の変化を継続して確認します。"],
];
export default function AioPage() {
  return <div className={`${training.page} ${styles.page}`}>
    <section className={`${training.hero} ${styles.hero}`}>
      <div className={training.heroInner}>
        <p className={training.heroTag}>企業のためのAIO・AI検索最適化支援</p>
        <h1><span className={training.heroStatement}><span>AIに聞かれたとき、</span><span>選ぶ理由が伝わる会社へ。</span></span><span className={`${training.productTitle} ${styles.productTitle}`}>AIO<b>支援</b></span></h1>
        <p className={training.heroSub}>見つけてもらう。その先の、比較・検討・相談まで。<br />ClearAIが、調査から情報設計、制作・実装、改善まで支援します。</p>
        <div className={styles.heroLinks}><a href="#contact" className={training.primary}>AIOの支援内容・費用を相談する</a><a href="#support">支援内容を見る</a></div>
        <div className={styles.answerPreview}><p>お客様がAIに質問するとき</p><strong>「自社の課題に合うサービスは？」</strong><div><span>どんな課題に強い？</span><span>対応範囲は？</span><span>他社との違いは？</span></div><p>自社の情報に、判断できる答えを揃える。</p></div>
      </div>
    </section>
    <nav className={styles.nav} aria-label="このページの目次">{[["why", "AIOとは"], ["support", "支援内容"], ["measures", "成果物と測定"], ["process", "進め方"], ["pricing", "費用"], ["faq", "よくある質問"]].map(([id,label]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
    <section id="why" className={training.section}>
      <div className={training.sectionTitle}><p className={training.sectionLead}>AI検索で、自社はどう伝わっていますか？</p><h2>引用されるだけでなく、<br />比較するときの候補へ。</h2><p className={training.sectionDescription}>情報収集から会社やサービスの比較まで、生成AIに相談する場面があります。そこで自社の説明が正しく伝わるように、公開情報とサイトの構造を整えるのがClearAIのAIO支援です。</p></div>
      <div className={styles.twoColumns}><article><h3>情報の一部として引用される</h3><p>説明の根拠として使われても、社名やサービスの特徴が伝わるとは限りません。引用だけを成果とせず、回答の文脈を確認します。</p></article><article><h3>比較・検討できる情報が伝わる</h3><p>誰に向くか、何ができるか、選ぶ際の条件が伝われば、読者が自社に合うかを判断できます。サイトでの詳しい説明と相談への導線も整えます。</p></article></div>
      <div className={styles.seo}><h3>SEOを土台に、AI回答での伝わり方も確認</h3><p>SEOでは検索結果での表示やクリック、AIOではAI回答での言及・参照や説明内容にも注目します。役立つ本文、確かな根拠、情報を取得できる構造は共通の土台です。AIO・LLMO・GEOといった呼び方に重なる部分もあるため、名称より実際に必要な改善を選びます。</p><a href="https://developers.google.com/search/docs/appearance/ai-features?hl=ja">Google公式：AI機能とウェブサイト</a></div>
    </section>
    <section id="support" className={`${training.section} ${training.lavender}`}>
      <div className={training.sectionTitle}><p className={training.sectionLead}>ClearAIの支援内容</p><h2>質問を知り、情報を整え、<br />公開したあとも確かめる。</h2></div>
      <div className={training.featureStack}>{approaches.map((item,index) => <article key={item.title} className={`${training.featurePanel} ${index % 2 ? training.featureReverse : ""}`}><div className={training.featureCopy}><h3>{item.title}</h3><p>{item.body}</p><ul className={training.checkList}>{item.items.map(text => <li key={text}>{text}</li>)}</ul></div><div className={styles.explanation}><span>{index === 0 ? "質問の整理" : index === 1 ? "一次情報の設計" : index === 2 ? "制作・技術改善" : "計測・継続改善"}</span><strong>{item.example}</strong><p>{item.detail}</p></div></article>)}</div>
    </section>
    <section id="measures" className={training.section}>
      <div className={training.sectionTitle}><h2>何を行い、何を確認するかを、<br />最初にそろえます。</h2><p className={training.sectionDescription}>記事の本数や社名の表示回数だけで判断せず、改善の目的、成果物、確認する指標を事前に決めます。必要な支援を選び、現在のサイトに合わせて進めます。</p></div>
      <div className={styles.details} aria-label="説明用の改善工程">
        <h3>診断から再確認までの例</h3><p>説明用の工程図です。実測の改善結果やAI回答の再現画像ではありません。</p>
        <ol><li><strong>診断前：</strong>対象の質問に対する説明・根拠・条件がページ内で見つかるか確認</li><li><strong>改善案：</strong>不足している説明、一次情報、FAQ、内部リンクを整理</li><li><strong>改修後：</strong>公開差分・取得状況・同条件でのAI回答を記録し、変化と未確認事項を分ける</li></ol>
      </div>
      <a href="/samples/aio-observation-sheet.txt" download className="inline-block py-3 text-sm font-semibold underline underline-offset-4">診断・基準観測・再確認の空欄シートを保存</a>
      <details className={styles.details}><summary>診断・回答記録の空欄見本を見る</summary><div><p>記録する粒度を示す空欄見本です。実績数値ではありません。実際の対象と測定方法は事前に合意します。</p><div className={styles.tableScroll}><table><caption>診断と回答記録の項目例</caption><thead><tr><th scope="col">対象質問・ページ</th><th scope="col">確認日時・利用サービス</th><th scope="col">根拠・回答・参照URL</th><th scope="col">不足情報・修正案</th><th scope="col">再確認・未測定事項</th></tr></thead><tbody><tr><td>記入欄</td><td>記入欄</td><td>記入欄</td><td>記入欄</td><td>記入欄</td></tr></tbody></table></div></div></details>
      <div className={styles.deliverables}>{measures.map(([name,purpose,output,method]) => <article key={name}><h3>{name}</h3><p>{purpose}</p><dl><dt>お渡しするもの</dt><dd>{output}</dd><dt>確認すること</dt><dd>{method}</dd></dl></article>)}</div>
      <details className={styles.details}><summary>ClearAIの自社実施記録と効果の確認状況</summary><div><p>自社サイトの説明や導線も改善しています。以下は実装の記録であり、引用や売上向上の成功事例ではありません。</p><ul>{practiceLog.map(item => <li key={item.topic}><Link href={item.href}>{item.topic}</Link><p>{item.detail}</p></li>)}</ul><h3>現在の効果指標</h3>{effects.map(([name,value,body]) => <p key={name}><strong>{name}：{value}</strong><br />{body}</p>)}<p>保存されていない過去のAI回答は再現できません。基準データを記録し、対象質問・サービス・期間をそろえて比較します。流入や申込の増減だけで、AIO施策の効果と断定しません。</p></div></details>
    </section>
    <section id="process" className={`${training.section} ${training.lavender}`}>
      <div className={training.sectionTitle}><h2>ご相談から、継続した改善まで。</h2></div>
      <ol className={styles.steps}>{steps.map(([title,body],index) => <li key={title}><span>{index + 1}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}</ol>
      <p className={styles.processNote}>最初に目的と範囲をそろえ、現状調査、優先度の整理、文章・構造の改善、公開・検証へ進みます。継続支援では、確認結果から次に直すページや質問領域を相談します。</p>
    </section>
    <section id="pricing" className={training.section}>
      <div className={training.sectionTitle}><p className={training.sectionLead}>費用と対応範囲</p><h2>必要な調査と改修から、<br />個別にお見積りします。</h2><p className={training.sectionDescription}>対象サイトの規模、調査する質問やサービス、原稿・制作・開発の範囲によって変わります。成果物、測定方法、進め方、契約期間、税の扱いを見積り時に明示します。</p></div>
      <div className={styles.price}><strong>初期費用・継続費用：要見積り</strong><p>既存サイトの調査から、文章改善、制作・実装までご相談いただけます。すべてを一律に行うプランではありません。</p><a href="#contact" className={training.primary}>自社に必要な支援を相談する</a></div>
      <div className={styles.details}>
        <h3>見積の相談で切り分ける3つの範囲</h3>
        <p>依頼範囲を整理するための区分です。固定プラン・最低発注量・料金を新たに定めるものではありません。診断だけを希望する場合も、その旨をお知らせください。</p>
        <ol><li><strong>診断のみ：</strong>対象ページと質問を決め、不足情報と優先する改善候補を整理する範囲</li><li><strong>改修まで：</strong>診断に加え、文章・FAQ・内部リンク・技術面のどこを修正するか合意する範囲</li><li><strong>継続測定：</strong>対象質問・利用サービス・確認条件と頻度を決め、回答と参照URLの変化を記録する範囲</li></ol>
        <p>いずれも対象数、成果物、制作・実装の分担、費用、測定頻度は見積で確認します。未測定の項目に効果数値を補って比較しません。</p>
      </div>
      <details className={styles.details}><summary>各社の公開料金・支援範囲を確認する</summary><div><p>2026年10月18日確認。自社を含む比較情報です。掲載順はランキングではありません。契約前に各社の最新条件をご確認ください。</p><div role="region" tabIndex={0} aria-label="各社の公開料金と支援範囲。横にスクロールできます" className={styles.tableScroll}><table><caption>各社の公開条件（店舗向けと一般企業向けでは対象が異なります）</caption><thead><tr>{["企業・サービス", "対象", "初期費用", "月額", "税", "契約期間", "範囲・条件", "出典"].map(x => <th key={x} scope="col">{x}</th>)}</tr></thead><tbody>{comparison.map(item => <tr key={item.name}><th scope="row">{item.name}</th>{[item.audience,item.initial,item.monthly,item.tax,item.term,item.scope].map((x,i) => <td key={i}>{x}</td>)}<td><a href={item.url}>{item.label}</a></td></tr>)}</tbody></table></div><p>初期費用・契約期間・制作費も含めて比較してください。LillyHoldingsの初期費用は包含・別請求の扱いが確定できないため、総額は算出していません。非公開は無料を意味しません。</p></div></details>
    </section>
    <section id="faq" className={`${training.section} ${training.lavender}`}><div className={training.sectionTitle}><h2>よくあるご質問</h2></div><div className={training.faq}>{questions.map(([q,a]) => <details key={q}><summary>{q}<span className={training.faqToggle} aria-hidden="true">+</span></summary><div className={training.faqAnswer}><p>{a}</p></div></details>)}</div></section>
    <section id="contact" className={`${training.conversionBand} ${styles.contact}`}><div><p>いまのサイトと、事業の課題から。</p><h2>AIOの支援内容・費用を<br />一緒に整理しませんか。</h2><span>サイトURLと、届けたい相手・気になることをお聞かせください。</span></div><div className={styles.contactActions}><a {...BOOKING_LINK_PROPS} className={training.primary}>日程を選んで相談する</a><Link href="/contact?service=aio">文章で問い合わせる</Link><small>日程予約は外部のTimeRexが新しいタブで開きます。</small></div></section>
  </div>;
}

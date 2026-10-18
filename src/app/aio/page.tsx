import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { BOOKING_LINK_PROPS } from "@/lib/booking";

const support = [
  { title: "現状を確かめる", body: "届けたい相手と、検討時に尋ねられる質問を整理します。既存サイトの検索状況、公開情報の整合性、対象とするAI検索での表示・参照状況を確認します。", items: ["対象の質問・サービスを整理", "既存SEOと技術面を確認", "確認日時・条件・出典URLを記録"] },
  { title: "根拠のある情報を整える", body: "サービスの対象、提供範囲、特徴、よくある質問を、読者が理解できる文章へ整理します。裏付けのない実績や数値を足さず、自社で確認できる一次情報を大切にします。", items: ["説明・見出し・FAQを見直し", "出典・更新日・運営者を明確に", "内部リンクと情報の重複を整理"] },
  { title: "実装して、変化を確認する", body: "合意したページの改善を実装し、検索エンジンが情報を取得できる状態か確認します。公開後は同じ確認条件を記録し、検索流入や問い合わせも含めて次の改善を考えます。", items: ["本文と整合する構造化データ", "取得・インデックスの確認", "表示・引用状況と流入を継続確認"] },
];
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
export default function AioPage() {
  return <div className="bg-white">
    <PageHeader kicker="AIO・AI検索最適化" title="AIに尋ねる時代に、事業の価値が伝わる情報へ。" description="AI検索で、自社の情報はどう伝わっているでしょうか。ClearAIは、既存サイトの調査から文章・構造の改善、公開後の確認まで支援します。AI回答で引用されるための土台を、確かな情報から整えます。" crumbs={[{ label: "ホーム", href: "/" }, { label: "事業内容", href: "/service" }, { label: "AIO" }]} actions={<a {...BOOKING_LINK_PROPS} className="motion-cta inline-flex min-h-12 items-center rounded-md bg-cta px-6 py-3 font-semibold text-white hover:bg-cta-hover focus-visible:outline-2 focus-visible:outline-offset-4">代表とAIOについて相談する</a>} />
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 md:py-20 lg:px-8">
      <nav aria-label="このページの目次" className="mb-16 flex flex-wrap gap-x-7 gap-y-3 border-y border-neutral-200 py-5 text-sm font-semibold">{[["support", "支援内容"], ["measures", "具体的な施策"], ["practice", "自社での実施記録"], ["comparison", "他社の公開料金・範囲"], ["approach", "SEO・LLMOとの関係"], ["process", "進め方"], ["faq", "よくある質問"]].map(([id, label]) => <a key={id} href={`#${id}`} className="underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">{label}</a>)}</nav>
      <section id="support" className="scroll-mt-28 pb-20">
        <h2 data-motion="heading" className="mb-5 text-3xl font-bold leading-tight">調べる、整える、確かめる。</h2>
        <p data-reading className="mb-10 text-neutral-600">AIへの露出だけを追うのではなく、見込み顧客が事業を正しく理解し、相談へ進める情報を目指します。必要な支援を組み合わせ、対応範囲を事前に決めます。</p>
        <div className="grid gap-6 md:grid-cols-3">{support.map(item => <article data-motion="card" key={item.title} className="motion-card rounded-lg border border-neutral-200 p-6 sm:p-8"><div aria-hidden="true" className="mb-7 h-1 w-14 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500" /><h3 className="mb-4 text-xl font-bold">{item.title}</h3><p className="mb-6 text-sm leading-[1.95] text-neutral-600">{item.body}</p><ul className="space-y-3 border-t border-neutral-100 pt-5 text-sm">{item.items.map(text => <li key={text}>{text}</li>)}</ul></article>)}</div>
      </section>
      <figure className="mb-16 border-y border-neutral-200 py-10" aria-labelledby="aio-flow-title">
        <figcaption id="aio-flow-title" className="mb-7 text-lg font-bold">改善の流れと、確認する情報</figcaption>
        <ol className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">{[
          { title: "調べる", text: "質問・対象ページ・現在の説明", icon: "search" },
          { title: "整える", text: "本文・根拠・更新日・内部リンク", icon: "document" },
          { title: "公開する", text: "表示・取得・リンクの品質確認", icon: "publish" },
          { title: "測る・見直す", text: "AI引用・検索流入・申込を別々に確認", icon: "cycle" },
        ].map((step, index) => <li key={step.title}>
          <svg aria-hidden="true" viewBox="0 0 100 64" className="mb-4 h-16 w-24 fill-none stroke-neutral-700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {step.icon === "search" ? <><circle cx="36" cy="27" r="16" /><path d="m48 39 19 17M29 23h14M29 30h10" /></> : step.icon === "document" ? <><path d="M22 6h35l13 13v39H22zM57 6v14h13M31 29h30M31 38h30M31 47h20" /><circle cx="77" cy="43" r="9" className="fill-white" /><path d="m73 43 3 3 5-6" /></> : step.icon === "publish" ? <><rect x="13" y="14" width="67" height="42" rx="4" /><path d="M13 25h67M23 20h1M29 20h1M36 20h1M46 46V32m-6 6 6-6 6 6M85 33h8m-4-4 4 4-4 4" /></> : <><path d="M70 22a23 23 0 0 0-39-8l-6 7m0-13v13h13M23 42a23 23 0 0 0 39 8l6-7m0 13V43H55" /><path d="M37 34h8m5 0h8" /></>}
          </svg>
          <h3 className="mb-2 font-bold">{index + 1}. {step.title}</h3><p className="text-sm leading-relaxed text-neutral-600">{step.text}</p>
        </li>)}</ol>
        <p className="mt-7 text-xs leading-relaxed text-neutral-500">支援の進め方を示す概念図です。測定値や成果の実績を表すものではありません。確認結果を次の調査・改善へ戻します。</p>
      </figure>
      <section id="measures" className="scroll-mt-28 border-t border-neutral-200 py-14">
        <h2 data-motion="heading" className="mb-5 text-2xl font-bold sm:text-3xl">何を行い、何を残し、どう確かめるか。</h2>
        <p data-reading className="mb-8 text-neutral-600">以下は支援内容の例です。すべてを一律に行うのではなく、現在のサイトと目的から必要な施策を選びます。実装ができたことと、集客につながったことを分けて確認します。</p>
        <div role="region" aria-label="AIO施策の目的・成果物・測定方法。横にスクロールできます" tabIndex={0} className="overflow-x-auto rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm leading-[1.85]">
            <caption className="mb-4 text-left font-semibold">施策ごとの目的・成果物・確認方法</caption>
            <thead><tr className="border-y border-neutral-200 bg-neutral-50">{["施策", "目的", "成果物", "測定・確認方法"].map(label => <th key={label} scope="col" className="p-4 align-top font-semibold">{label}</th>)}</tr></thead>
            <tbody>{measures.map(([name, purpose, output, method]) => <tr key={name} className="border-b border-neutral-200"><th scope="row" className="w-[20%] p-4 align-top font-semibold">{name}</th><td className="w-[24%] p-4 align-top text-neutral-600">{purpose}</td><td className="w-[24%] p-4 align-top text-neutral-600">{output}</td><td className="p-4 align-top text-neutral-600">{method}</td></tr>)}</tbody>
          </table>
        </div>
        <div className="mt-7 space-y-4 text-sm text-neutral-600">
          <h3 className="text-lg font-bold text-neutral-900">Search Consoleの指標は、分けて確認します。</h3>
          <p data-reading>通常のウェブ検索全体のデータと、AI機能専用の表示回数レポートは区別します。GoogleはAI専用レポートの提供を案内していますが、ClearAIのSearch Console画面で利用できるかは未確認です。</p>
          <p data-reading>AI専用の表示回数も、ブランド言及率、自社URL引用率、AI経由のクリックや流入とは異なる指標です。レポートの定義・対象・期間を確かめてから扱い、引用率へ換算しません。</p>
          <p>公式案内：<a href="https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports" className="underline underline-offset-4">Google Search Centralのレポート案内</a> ／ <a href="https://support.google.com/webmasters/answer/16984139" className="underline underline-offset-4">Search Consoleヘルプ</a></p>
        </div>
      </section>
      <section id="practice" className="scroll-mt-28 border-t border-neutral-200 py-14">
        <h2 data-motion="heading" className="mb-5 text-2xl font-bold sm:text-3xl">ClearAI自身で行ったことと、現在の効果。</h2>
        <p data-reading className="mb-5 text-neutral-600">自社サイトでも、説明の根拠と導線を見直しています。以下は実装の記録です。AI回答での引用や売上の向上を示す成功事例として掲載するものではありません。表示やリンク等のQAは品質検証であり、以下の効果指標とは別に扱います。</p>
        <p className="mb-8 text-sm leading-relaxed text-neutral-600"><time dateTime="2026-10-18">2026年10月18日</time> 公開変更：<a href="https://github.com/kante0218/clearai-corporate/commit/56fc6deae35ecffa167462bdbf96ec54e0c92c7c" className="underline underline-offset-4">実装記録 56fc6de</a></p>
        <ul className="mb-12 divide-y divide-neutral-200 border-y border-neutral-200">{practiceLog.map(item => <li key={item.topic} className="py-6"><h3 className="mb-3 text-lg font-bold">{item.topic}</h3><p data-reading className="mb-3 text-sm text-neutral-600">{item.detail}</p><Link href={item.href} className="text-sm underline underline-offset-4">{item.label}を確認する</Link></li>)}</ul>
        <h3 className="mb-6 text-xl font-bold">効果の確認状況</h3>
        <dl className="divide-y divide-neutral-200 border-y border-neutral-200">{effects.map(([name, status, note]) => <div key={name} className="grid gap-3 py-6 sm:grid-cols-[11rem_1fr]"><dt className="font-semibold">{name}</dt><dd><p className="mb-2 font-semibold">{status}</p><p data-reading className="text-sm text-neutral-600">{note}</p></dd></div>)}</dl>
        <p data-reading className="mt-6 text-sm text-neutral-600">「未測定」はゼロ件という意味ではありません。施策前のAI回答の基準データがないため、ブランド言及率や自社URL引用率の改善率は計算できません。品質検証の件数を効果の代わりには使いません。</p>
        <div className="mt-8 border-l-2 border-neutral-300 pl-5">
          <h3 className="mb-3 text-lg font-bold">今後の比較案</h3>
          <p data-reading className="mb-3 text-sm text-neutral-600">変更前の2026年9月20日〜10月17日と、変更後の10月19日〜11月15日の各28日を、比較期間の候補とします。変更日の10月18日は除外します。これは計測結果ではなく、データの利用可否を確認してから行う比較案です。</p>
          <p data-reading className="text-sm text-neutral-600">比較する場合は、対象ページ・質問群・サービス・地域・端末などの条件と、確認した回答や訪問の母数をそろえ、期間とともに示します。保存されていない過去のAI回答は後から再現できないため、回答指標は基準データを記録してからの比較になります。流入や申込の増減だけで、AIO施策による効果と断定しません。</p>
        </div>
      </section>
      <section id="comparison" className="scroll-mt-28 border-t border-neutral-200 py-14">
        <h2 data-motion="heading" className="mb-5 text-2xl font-bold sm:text-3xl">他社の公開料金と、支援範囲を比べる。</h2>
        <p data-reading className="mb-5 text-neutral-600">AIO・LLMOの支援は、店舗向けの運用、調査や提案、文章制作、実装まで、含まれる作業が異なります。金額だけでなく、自社に必要な作業が契約に含まれるかを確認してください。</p>
        <p data-reading className="mb-7 text-sm text-neutral-600">公式情報の確認日：<time dateTime="2026-10-18">2026年10月18日</time>。ClearAIが運営するページで、自社を含めて掲載しています。掲載順はランキングではありません。店舗向けと一般企業向け、診断・提案と制作・実装を区別し、税込・税別は公式表記のまま記載しています。</p>
        <div role="region" aria-label="AIO・LLMOの公開料金と対応範囲の比較表。横にスクロールできます" tabIndex={0} className="overflow-x-auto rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4">
          <table className="w-full min-w-[1300px] border-collapse text-left text-sm leading-[1.8]">
            <caption className="mb-4 text-left font-semibold">各社公式情報の比較（料金・条件は変わる場合があります）</caption>
            <thead><tr className="border-y border-neutral-200 bg-neutral-50">{["企業・サービス", "主な対象", "初期費用", "月額", "税の扱い", "最低期間・契約単位", "支援範囲・確認したい条件", "公式出典"].map((label, index) => <th key={label} scope="col" className={`p-4 align-top font-semibold ${index === 0 ? "sm:sticky sm:left-0 z-10 min-w-40 bg-neutral-50" : ""}`}>{label}</th>)}</tr></thead>
            <tbody>{comparison.map(item => <tr key={item.name} className="border-b border-neutral-200"><th scope="row" className="sm:sticky sm:left-0 z-10 w-44 bg-white p-4 align-top font-semibold">{item.name}</th>{[item.audience, item.initial, item.monthly, item.tax, item.term, item.scope].map((value, index) => <td key={index} className={`p-4 align-top text-neutral-600 ${index === 5 ? "min-w-[240px] sm:min-w-72" : "min-w-32"}`}>{value}</td>)}<td className="p-4 align-top"><a href={item.url} className="underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4" aria-label={`${item.name}の${item.label}`}>{item.label}</a></td></tr>)}</tbody>
          </table>
        </div>
        <p data-reading className="mt-6 text-sm text-neutral-600">同じ月額でも、初期費用・契約期間・対象ページ数・制作費で負担は変わります。非公開は無料を意味しません。LillyHoldingsの初期費用は包含・別請求の扱いを確認できていないため、総額比較はできません。最新の見積りと契約条件は各社へご確認ください。</p>
      </section>
      <section id="approach" className="scroll-mt-28 border-t border-neutral-200 py-14">
        <h2 data-motion="heading" className="mb-5 text-2xl font-bold sm:text-3xl">SEOを土台に、AI検索での伝わり方まで。</h2>
        <p data-reading className="mb-5 text-neutral-600">AIOやLLMOは、AI回答での参照・引用を意識する取り組みとして重なる部分があります。ClearAIでは用語ごとに作業を増やすのではなく、読者の疑問に答える本文、一次情報、検索エンジンが取得できる構造をまとめて見直します。</p>
        <p data-reading className="mb-5 text-neutral-600">Googleは、AIによる概要やAIモードにも既存のSEOの基本が有効で、追加の特別な最適化は不要と説明しています。表示や引用を約束する手法ではなく、現在のサイトで足りない情報と確認できる課題から取り組みます。</p>
        <a href="https://developers.google.com/search/docs/appearance/ai-features?hl=ja" className="text-sm underline underline-offset-4">参考：Google Search Central「AI機能とウェブサイト」</a>
      </section>
      <section id="process" className="scroll-mt-28 py-14"><h2 data-motion="heading" className="mb-8 text-3xl font-bold">ご相談から改善まで</h2><ol className="divide-y divide-neutral-200 border-y border-neutral-200">{steps.map(([title, body], index) => <li data-motion="reading" key={title} className="flex gap-6 py-7"><span aria-hidden="true" className="font-semibold text-neutral-400">{index + 1}</span><div><h3 className="mb-3 text-lg font-bold">{title}</h3><p data-reading className="text-sm text-neutral-600">{body}</p></div></li>)}</ol></section>
      <section id="faq" className="scroll-mt-28 py-14"><h2 data-motion="heading" className="mb-8 text-3xl font-bold">よくあるご質問</h2><div className="divide-y divide-neutral-200 border-y border-neutral-200">{faq.map(([question, answer]) => <details data-motion-disclosure key={question} className="py-5"><summary className="cursor-pointer rounded-sm font-semibold leading-relaxed focus-visible:outline-2 focus-visible:outline-offset-4">{question}</summary><p data-reading className="pt-4 text-sm text-neutral-600">{answer}</p></details>)}</div></section>
      <section className="border-t border-neutral-200 py-14"><h2 data-motion="heading" className="mb-5 text-3xl font-bold">いまのサイトから、相談できます。</h2><p data-reading className="mb-8 text-neutral-600">サイトURLと、届けたい相手・気になっていることをお聞かせください。調査や改修の範囲を一緒に整理します。</p><div className="flex flex-wrap gap-4"><a {...BOOKING_LINK_PROPS} className="motion-cta inline-flex min-h-12 items-center rounded-md bg-cta px-7 py-3.5 font-semibold text-white hover:bg-cta-hover focus-visible:outline-2 focus-visible:outline-offset-4">代表とAIOについて相談する</a><Link href="/contact?service=aio" className="inline-flex min-h-12 items-center rounded-md border border-neutral-300 px-7 py-3.5 font-semibold focus-visible:outline-2 focus-visible:outline-offset-4">文章で問い合わせる</Link></div><p className="mt-4 text-xs text-neutral-500">面談予約は外部のTimeRexが新しいタブで開きます。</p><p className="mt-8 text-sm text-neutral-600">サイト全体の見直しは<Link href="/website-production" className="underline underline-offset-4">ホームページ制作</Link>でもご相談いただけます。</p></section>
    </div>
  </div>;
}

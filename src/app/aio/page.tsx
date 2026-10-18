import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { BOOKING_LINK_PROPS } from "@/lib/booking";

const support = [
  { title: "現状を確かめる", body: "届けたい相手と、検討時に尋ねられる質問を整理します。既存サイトの検索状況、公開情報の整合性、対象とするAI検索での表示・参照状況を確認します。", items: ["対象の質問・サービスを整理", "既存SEOと技術面を確認", "確認日時・条件・出典URLを記録"] },
  { title: "根拠のある情報を整える", body: "サービスの対象、提供範囲、特徴、よくある質問を、読者が理解できる文章へ整理します。裏付けのない実績や数値を足さず、自社で確認できる一次情報を大切にします。", items: ["説明・見出し・FAQを見直し", "出典・更新日・運営者を明確に", "内部リンクと情報の重複を整理"] },
  { title: "実装して、変化を確認する", body: "合意したページの改善を実装し、検索エンジンが情報を取得できる状態か確認します。公開後は同じ確認条件を記録し、検索流入や問い合わせも含めて次の改善を考えます。", items: ["本文と整合する構造化データ", "取得・インデックスの確認", "表示・引用状況と流入を継続確認"] },
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
      <nav aria-label="このページの目次" className="mb-16 flex flex-wrap gap-x-7 gap-y-3 border-y border-neutral-200 py-5 text-sm font-semibold">{[["support", "支援内容"], ["approach", "SEO・LLMOとの関係"], ["process", "進め方"], ["faq", "よくある質問"]].map(([id, label]) => <a key={id} href={`#${id}`} className="underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">{label}</a>)}</nav>
      <section id="support" className="scroll-mt-28 pb-20">
        <h2 data-motion="heading" className="mb-5 text-3xl font-bold leading-tight">調べる、整える、確かめる。</h2>
        <p data-reading className="mb-10 text-neutral-600">AIへの露出だけを追うのではなく、見込み顧客が事業を正しく理解し、相談へ進める情報を目指します。必要な支援を組み合わせ、対応範囲を事前に決めます。</p>
        <div className="grid gap-6 md:grid-cols-3">{support.map(item => <article data-motion="card" key={item.title} className="motion-card rounded-lg border border-neutral-200 p-6 sm:p-8"><div aria-hidden="true" className="mb-7 h-1 w-14 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500" /><h3 className="mb-4 text-xl font-bold">{item.title}</h3><p className="mb-6 text-sm leading-[1.95] text-neutral-600">{item.body}</p><ul className="space-y-3 border-t border-neutral-100 pt-5 text-sm">{item.items.map(text => <li key={text}>{text}</li>)}</ul></article>)}</div>
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

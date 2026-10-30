"use client";
import LocalizedContent from "@/components/LocalizedContent";

import Link from "next/link";
import Image from "next/image";

const description = "ClearAIのホームページ制作。事業の強みと伝えたい内容を整理し、構成・デザイン・実装・公開まで支援します。新規制作・リニューアルの範囲、費用、スケジュールはご相談のうえ決定します。";

const offerings = [
  ["伝える内容を整理する", "誰に何を伝え、どんな行動につなげたいかを伺います。事業やサービスの説明を整理し、ページ構成と見出し・文章を検討します。"],
  ["読みやすい形にする", "既存のブランドを踏まえてデザイン・実装します。スマートフォンでの読みやすさ、表示速度、検索エンジンが内容を理解しやすい構造にも配慮します。"],
  ["相談につながる導線をつくる", "サービスの理解から問い合わせまでの道筋を設計します。目次やFAQなどは、読む人の疑問を解消するために必要なものを選びます。"],
  ["公開と更新を見据える", "公開前に表示・リンク・フォームの動作を確認します。更新方法や公開後の支援範囲、ドメイン・サーバーの扱いは事前に相談して決めます。"],
];
const steps = [
  ["ご相談・目的の整理", "新規制作かリニューアルか、現在の課題と届けたい相手を伺います。参考サイトや既存サイトがあればお知らせください。"],
  ["範囲・進め方の合意", "必要なページ、機能、原稿・写真の準備方法を確認し、費用とスケジュールを含む進め方を相談します。"],
  ["構成・デザイン・実装", "ページ構成と内容を確認しながら制作します。確認のタイミングや修正の範囲は、事前に決めた進め方に沿って調整します。"],
  ["確認・公開・引き継ぎ", "PC・スマートフォンでの表示と操作を確認し、合意した環境へ公開します。更新方法と公開後の対応範囲を共有します。"],
];
const works = [
  { name: "JASO", href: "https://jaso.co.jp/", src: "/images/clients/jaso.png", width: 1007, height: 424 },
  { name: "お宿 いけがみ", href: "https://ikegamiryokan.jp/", src: "/images/clients/oyado-ikegami.png", width: 460, height: 98 },
];
const faqs = [
  ["何も決まっていなくても相談できますか？", "はい。まずは事業の内容と、ホームページで解決したい課題をお聞かせください。必要なページや機能を一緒に整理します。"],
  ["既存のホームページをリニューアルできますか？", "ご相談いただけます。現在のサイトや運用環境を確認し、残す内容・見直す内容を整理します。既存URLや検索流入への影響も踏まえて進め方を検討します。"],
  ["料金と制作期間はどのくらいですか？", "ページ数、機能、原稿や写真の準備状況、確認の進め方によって変わります。ご要望を伺い、範囲・費用・スケジュールをご案内します。"],
  ["文章や写真の準備、公開後の更新も相談できますか？", "相談できます。支給いただく素材と制作側で支援する内容を確認し、更新方法や公開後の対応範囲とあわせて事前に決めます。"],
];
export default function WebsiteProductionPage() {
  return <LocalizedContent>{(
    <div className="bg-white">
      <header className="border-b border-gray-100 bg-white pt-24 pb-10 lg:pt-28 lg:pb-14">
        <div className="mx-auto max-w-[1800px] px-6 lg:px-8">

          <p className="mb-3 text-sm font-semibold text-neutral-600">ホームページ制作・リニューアル</p>
          <h1 data-motion="heading" className="max-w-4xl text-3xl font-bold leading-tight text-neutral-900 sm:text-4xl lg:text-5xl">事業の価値が、読む人に伝わるホームページへ。</h1>
          <p data-reading className="mt-6 max-w-3xl text-base leading-[1.9] text-neutral-600">何を、どの順番で伝えるか。事業の強みを整理するところから、構成・デザイン・実装・公開まで。新規制作も、既存サイトの見直しも、目的に合わせて一緒に進めます。</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link data-ui-button="filled" href="/contact?service=website" className="motion-cta inline-flex min-h-12 items-center justify-center rounded-lg bg-cta px-7 py-3.5 font-semibold text-white transition-colors hover:bg-cta-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900"><span className="ui-button-label">ホームページ制作を相談する</span></Link>
            <a data-ui-button="control" href="#offering" className="inline-flex min-h-12 items-center rounded-lg border border-neutral-200 px-6 py-3.5 font-semibold text-neutral-700 hover:border-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-4"><span className="ui-button-label">提供内容を読む</span></a>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-[1800px] px-6 lg:px-8 py-10 sm:py-14">
        <nav aria-label="このページの目次" className="border-y border-neutral-200 py-5 mb-12">
          <p className="text-sm font-semibold mb-3">知りたい内容から読む</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-neutral-600">
            {[['offering', '提供内容'], ['works', '制作実績'], ['process', '制作の流れ'], ['faq', 'よくあるご質問'], ['consultation', 'ご相談']].map(([id, label]) => <li key={id}><a href={`#${id}`} className="underline underline-offset-4 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-4">{label}</a></li>)}
          </ul>
        </nav>
        <section id="offering" className="scroll-mt-28 pb-16 lg:pb-24">
          <h2 data-motion="heading" className="text-2xl sm:text-3xl font-bold mb-5">伝える内容から、公開後の使い方まで。</h2>
          <p data-reading className="max-w-3xl text-neutral-600 leading-[1.9] mb-8">会社紹介・サービス紹介など、サイトの目的に合わせて必要な内容を選びます。具体的な対応範囲は、ご相談のうえ決定します。</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:gap-7">{offerings.map(([title, body]) => <div data-motion="card" key={title} className="motion-card relative overflow-hidden rounded-lg border border-neutral-200 bg-white p-6 sm:p-8"><div aria-hidden="true" className="mb-6 h-1 w-12 rounded-full bg-gradient-to-r from-violet-500 to-sky-500" /><h3 className="font-bold text-xl mb-3">{title}</h3><p data-reading className="text-sm text-neutral-600 leading-[1.95]">{body}</p></div>)}</div>
        </section>
        <section id="works" aria-labelledby="works-title" className="scroll-mt-28 pb-16 lg:pb-24">
          <h2 id="works-title" data-motion="heading" className="text-2xl sm:text-3xl font-bold mb-5">制作実績</h2>
          <p data-reading className="text-sm text-neutral-600 leading-[1.9] mb-8">ホームページ制作を担当したサイトをご紹介します。</p>
          <div className="grid gap-8 sm:grid-cols-2 lg:gap-12">
            {works.map((work) => (
              <article key={work.href} className="border-t border-neutral-200 pt-6">
                <div className="mb-5 flex h-24 items-center justify-start">
                  <Image src={work.src} alt="" width={work.width} height={work.height} sizes="220px" className="h-[52px] w-[220px] max-w-full object-contain object-left" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-neutral-900">{work.name}</h3>
              </article>
            ))}
          </div>
        </section>
        <section className="pb-16 lg:pb-24" aria-labelledby="website-scope-title">
          <h2 id="website-scope-title" className="mb-4 text-2xl font-bold sm:text-3xl">担当範囲を公開している制作事例</h2>
          <p className="mb-5 max-w-3xl text-sm leading-7 text-neutral-600">不動産コンサルティング会社の匿名事例では、サービスの言語化、読み手に合わせた構成、Next.jsでの実装、社内で更新する仕組み、構造化データと表示速度への対応を紹介しています。上記のロゴ掲載企業との対応を示すものではありません。</p>
          <ol className="grid gap-4 text-sm sm:grid-cols-3">{[['情報の整理','誰の、どの場面の相談を受けるかを先に明文化'],['構成と実装','進め方・期間・成果物を伝える構成とNext.jsでの実装'],['更新の引き継ぎ','更新頻度に応じたCMSと実装の分担']].map(([title,body]) => <li key={title} className="rounded-lg border border-neutral-300 p-5"><h3 className="font-bold">{title}</h3><p className="mt-2 leading-7 text-neutral-600">{body}</p></li>)}</ol>
          <Link href="/case-studies/real-estate-consulting-site" className="mt-5 inline-block text-sm font-semibold underline underline-offset-4">課題・担当した工程・結果を事例で読む</Link>
          <p className="mt-6 text-sm leading-7 text-neutral-600">見積を比較する際は、ページ数、原稿と写真の準備、必要な機能、確認・修正の範囲、公開後の更新・保守をそろえてください。個別の制作金額・納期は、その条件を伺ってご案内します。</p>
          <a href="/samples/development-scope-sheet.txt" download className="mt-3 inline-block text-sm font-semibold underline underline-offset-4">見積条件を整理する空欄シートを保存</a>
        </section>
        <section id="process" className="scroll-mt-28 pb-16 lg:pb-24">
          <h2 data-motion="heading" className="text-2xl sm:text-3xl font-bold mb-8">制作の流れ</h2>
          <ol className="divide-y divide-neutral-200 border-y border-neutral-200">{steps.map(([title, body], index) => <li data-motion="reading" key={title} className="flex gap-5 sm:gap-8 py-7"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-sm font-semibold text-neutral-600" aria-hidden="true">{index + 1}</span><div><h3 className="font-bold text-lg mb-2">{title}</h3><p data-reading className="max-w-3xl text-sm text-neutral-600 leading-[1.95]">{body}</p></div></li>)}</ol>
        </section>
        <section id="faq" className="scroll-mt-28 pb-16 lg:pb-24">
          <h2 data-motion="heading" className="text-2xl sm:text-3xl font-bold mb-8">よくあるご質問</h2>
          <div className="divide-y divide-neutral-200 border-y border-neutral-200">{faqs.map(([question, answer]) => <details data-motion-disclosure key={question} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-sm font-semibold leading-relaxed hover:text-neutral-600 focus-visible:outline-2 focus-visible:outline-offset-4"><span>{question}</span><span aria-hidden="true" className="text-xl transition-transform group-open:rotate-45">+</span></summary><p data-reading className="max-w-3xl pt-4 text-sm text-neutral-600 leading-[1.95]">{answer}</p></details>)}</div>
        </section>
        <section id="consultation" className="website-consultation relative scroll-mt-28 rounded-xl border border-neutral-200 bg-neutral-50 p-6 sm:p-10 lg:p-12">
          <h2 data-motion="heading" className="text-2xl sm:text-3xl font-bold mb-4 leading-relaxed">まずは、伝えたいことをお聞かせください。</h2>
          <p data-reading className="text-neutral-600 leading-[1.9] mb-7">現在のサイトURL、制作の目的、困っていることなど、わかる範囲でお知らせください。ご要望を伺って、必要な内容と進め方をご案内します。</p>
          <div className="flex flex-col items-stretch gap-3 sm:items-start">
          <Link data-ui-button="filled" href="/contact?service=website" className="motion-cta inline-flex min-h-12 items-center justify-center bg-cta hover:bg-cta-hover text-white px-7 py-4 font-semibold rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900"><span className="ui-button-label">ホームページ制作を相談する</span></Link>
          <Link href="/download?document=website-production" className="inline-flex min-h-12 items-center justify-center px-0 py-3 text-center text-sm font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">事業紹介資料をダウンロード</Link>
          </div>
        </section>
        <aside aria-labelledby="related-title" className="mt-16 border-t border-neutral-200 pt-8">
          <h2 id="related-title" className="mb-5 text-xl font-bold text-neutral-900">あわせて読みたい</h2>
          <ul className="grid gap-5 text-sm sm:grid-cols-2">
            <li><Link href="/case-studies/real-estate-consulting-site" className="font-semibold text-neutral-900 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">不動産コンサルティング会社のホームページ開発事例</Link><p className="mt-2 leading-relaxed text-neutral-600">事業の説明と相談までの道筋を、どのように整理したか。</p></li>
            <li><Link href="/software-development" className="font-semibold text-neutral-900 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">システム・ソフトウェア開発</Link><p className="mt-2 leading-relaxed text-neutral-600">ホームページに加えて、業務に合う仕組みづくりを検討したい方へ。</p></li>
          </ul>
        </aside>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", name: "ホームページ制作", description, url: "https://clearai.jp/website-production", provider: { "@type": "Organization", name: "ClearAI株式会社", url: "https://clearai.jp" } }) }} />
    </div>
  )}</LocalizedContent>;
}

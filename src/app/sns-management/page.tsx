import type { Metadata } from "next";
import Link from "next/link";
import { BOOKING_URL } from "@/lib/booking";

const description = "ClearAIのSNS運用代行。発信の目的と対象を整理し、投稿企画・文章と画像の制作・投稿管理・分析改善を支援します。AIによる下書きと人による確認を組み合わせ、企業の承認を経て運用します。費用は個別にお見積りします。";
const url = "https://clearai.jp/sns-management";
export const metadata: Metadata = {
  title: "SNS運用代行",
  description,
  alternates: { canonical: url },
  openGraph: { title: "SNS運用代行 | ClearAI株式会社", description, url, type: "website", locale: "ja_JP", siteName: "ClearAI株式会社", images: ["/images/logo.png"] },
  twitter: { card: "summary_large_image", title: "SNS運用代行 | ClearAI株式会社", description, images: ["/images/logo.png"] },
};
const offerings = [
  ["投稿の企画", "届けたい相手と発信の目的を整理し、テーマや投稿の予定を考えます。商品・サービスの説明、社内の取り組みなど、継続して伝えられる内容を一緒に見つけます。"],
  ["文章・画像の制作", "企業の言葉遣いやブランドに合わせて、投稿文と画像を制作します。ご提供いただく写真や資料と、制作側で用意する素材の範囲を事前に確認します。"],
  ["投稿管理", "承認済みの内容を、合意した手順で投稿・管理します。対象媒体やアカウントの状態に応じて方法を決めます。すべての媒体での自動投稿を保証するものではありません。"],
  ["分析と改善", "投稿の反応やサイトへの流入など、目的に合う指標を確認します。数字だけで成果を判断せず、伝わった内容や次に試す企画を整理します。"],
  ["必要に応じた多言語対応", "届けたい相手に合わせ、多言語での発信もご相談いただけます。対象言語、翻訳・確認の方法、対応できる範囲を事前に相談して決めます。"],
];
const steps = [
  ["目的と現状を伺います", "発信の目的、対象となるお客様、既存アカウントや運用上のお困りごとを確認します。まだ媒体が決まっていない段階でも構いません。"],
  ["運用範囲と確認方法を決めます", "対象媒体、投稿内容や頻度、素材の準備、企業側の承認担当者、費用を相談します。投稿前の確認期限や修正方法も合意します。"],
  ["制作・確認・承認を経て投稿します", "企画と下書きを作成し、人が内容を確認します。企業側の承認を得た内容を、合意した方法で投稿します。"],
  ["振り返り、次の企画へつなげます", "目的に合う指標と投稿内容を振り返ります。続けることと見直すことを整理し、次の制作・運用へ反映します。"],
];
const faqs = [
  ["どのSNSを運用できますか？", "まずは利用中・検討中の媒体をお知らせください。媒体の機能やアカウントの状態を確認し、対応範囲と投稿方法をご案内します。全媒体への対応や自動投稿を一律にお約束するものではありません。"],
  ["料金と投稿本数は決まっていますか？", "対象媒体、制作内容、投稿本数、確認の進め方などを伺い、個別にお見積りします。契約前に対応範囲と費用を確認します。"],
  ["広告運用や動画、コメント対応も依頼できますか？", "広告費・広告運用、動画制作、DM・コメントへの対応は、通常の投稿制作・管理と分けて範囲を確認します。ご希望の内容と対応体制を伺い、対応可否や費用をご案内します。"],
  ["AIが作った投稿がそのまま公開されますか？", "そのまま公開する運用にはしません。AIは企画や文章・画像の下書きを支援し、人が事実関係や権利・表現を確認したうえで、企業側の承認を経て投稿します。"],
  ["フォロワーや売上の増加は保証されますか？", "フォロワー数、問い合わせ数、売上などの成果は保証していません。目的に合う指標を事前に決め、投稿内容と反応を見ながら改善を進めます。"],
];
const schemas = [
  { "@context": "https://schema.org", "@type": "Service", name: "SNS運用代行", description, url, provider: { "@type": "Organization", name: "ClearAI株式会社", url: "https://clearai.jp" } },
  { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: "https://clearai.jp" },
    { "@type": "ListItem", position: 2, name: "事業内容", item: "https://clearai.jp/service" },
    { "@type": "ListItem", position: 3, name: "SNS運用代行", item: url },
  ] },
];

export default function SnsManagementPage() {
  return (
    <div className="bg-white text-neutral-900">
      <header className="border-b border-gray-100 bg-white pt-24 pb-10 lg:pt-28 lg:pb-14">
        <div className="mx-auto max-w-[1800px] px-6 lg:px-8">
          <nav aria-label="パンくずリスト" className="mb-7 text-sm text-neutral-500"><Link href="/" className="underline underline-offset-4">ホーム</Link><span aria-hidden="true" className="mx-3">/</span><Link href="/service" className="underline underline-offset-4">事業内容</Link><span aria-hidden="true" className="mx-3">/</span><span>SNS運用代行</span></nav>
          <p className="mb-3 text-sm font-semibold text-neutral-600">SNS運用代行</p>
          <h1 data-motion="heading" className="max-w-4xl text-3xl font-bold leading-tight text-neutral-900 sm:text-4xl lg:text-5xl">企業の伝えたいことを、継続できる発信へ。</h1>
          <p data-reading className="mt-6 max-w-3xl text-base leading-[1.9] text-neutral-600">投稿の企画から文章・画像の制作、投稿管理、分析改善まで。目的と運用体制に合わせて、企業のSNS発信を支援します。AIで下書きを整え、人による確認と企業の承認を経て進めます。</p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="motion-cta inline-flex min-h-12 items-center justify-center rounded-lg bg-cta px-7 py-3.5 font-semibold text-white transition-colors hover:bg-cta-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900">SNS運用の面談を予約する</a>
            <Link href="/contact?service=sns" className="inline-flex min-h-12 items-center rounded-lg border border-neutral-200 px-6 py-3.5 text-sm font-semibold text-neutral-700 hover:border-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-4">メールで相談する</Link>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-[1800px] px-6 py-10 sm:py-14 lg:px-8">
        <nav aria-label="このページの目次" className="mb-12 border-y border-neutral-200 py-5">
          <p className="mb-3 text-sm font-semibold">知りたい内容から読む</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-neutral-600">
            {[["audience", "こんな企業へ"], ["offering", "提供内容"], ["process", "進め方"], ["approval", "確認と承認"], ["faq", "よくあるご質問"], ["consultation", "ご相談"]].map(([id, label]) => <li key={id}><a href={`#${id}`} className="inline-block py-2 underline underline-offset-4 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-4">{label}</a></li>)}
          </ul>
        </nav>
        <section id="audience" className="scroll-mt-28 pb-16 lg:pb-24">
          <h2 data-motion="heading" className="mb-5 text-2xl font-bold sm:text-3xl">発信を続けたい企業の、運用体制づくりを支えます。</h2>
          <ul className="max-w-3xl list-disc space-y-3 pl-5 text-neutral-600 leading-[1.9]">
            <li>担当者がほかの業務と兼務しており、企画や制作の時間を取りにくい企業</li>
            <li>商品・サービスの強みを、SNSでどう伝えるか整理したい企業</li>
            <li>投稿を続けているものの、振り返りや改善の進め方に迷っている企業</li>
          </ul>
        </section>
        <section id="offering" className="scroll-mt-28 pb-16 lg:pb-24">
          <h2 data-motion="heading" className="mb-5 text-2xl font-bold sm:text-3xl">必要な範囲を相談して、企画から改善まで。</h2>
          <p className="mb-8 max-w-3xl text-neutral-600 leading-[1.9]">すべてを一括で任せる形だけでなく、社内で担当する作業と制作側で支援する作業を整理します。媒体や投稿頻度、制作内容に応じて個別にお見積りします。</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">{offerings.map(([title, body]) => <div data-motion="card" key={title} className="motion-card relative overflow-hidden rounded-lg border border-neutral-200 bg-white p-6 sm:p-8"><div aria-hidden="true" className="mb-6 h-1 w-12 rounded-full bg-gradient-to-r from-violet-500 to-sky-500" /><h3 className="mb-3 text-xl font-bold">{title}</h3><p className="text-sm text-neutral-600 leading-[1.95]">{body}</p></div>)}</div>
          <p className="mt-7 max-w-3xl border-t border-neutral-200 pt-5 text-sm text-neutral-600 leading-[1.95]">広告費・広告運用、動画制作、DM・コメントへの対応は別途、対応範囲と費用を確認します。</p>
        </section>
        <section id="process" className="scroll-mt-28 pb-16 lg:pb-24">
          <h2 data-motion="heading" className="mb-8 text-2xl font-bold sm:text-3xl">ご相談から運用までの進め方</h2>
          <ol className="divide-y divide-neutral-200 border-y border-neutral-200">{steps.map(([title, body], index) => <li data-motion="reading" key={title} className="flex gap-5 py-7 sm:gap-8"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-sm font-semibold text-neutral-600" aria-hidden="true">{index + 1}</span><div><h3 className="mb-2 text-lg font-bold">{title}</h3><p className="max-w-3xl text-sm text-neutral-600 leading-[1.95]">{body}</p></div></li>)}</ol>
        </section>
        <section id="approval" className="scroll-mt-28 pb-16 lg:pb-24">
          <h2 data-motion="heading" className="mb-5 text-2xl font-bold sm:text-3xl">AIは下書きを支援し、公開前は人が確認します。</h2>
          <p className="mb-4 max-w-3xl text-neutral-600 leading-[1.9]">AIを企画や文章・画像の下書きに活用します。制作側で事実関係、素材の利用条件、権利や表現を確認し、企業側に内容をご確認いただきます。承認を得てから投稿する手順を基本にします。</p>
          <p className="max-w-3xl text-neutral-600 leading-[1.9]">非公開情報や個人情報の扱い、素材の使用許可、利用するツールは事前に確認します。AIの出力を正しいものと決めつけず、企業の発信として適切かを確かめます。</p>
        </section>
        <section id="faq" className="scroll-mt-28 pb-16 lg:pb-24">
          <h2 data-motion="heading" className="mb-8 text-2xl font-bold sm:text-3xl">よくあるご質問</h2>
          <div className="divide-y divide-neutral-200 border-y border-neutral-200">{faqs.map(([question, answer]) => <details data-motion-disclosure key={question} className="py-5"><summary className="cursor-pointer rounded-sm font-semibold leading-relaxed focus-visible:outline-2 focus-visible:outline-offset-4">{question}</summary><p className="max-w-3xl pt-4 text-sm text-neutral-600 leading-[1.95]">{answer}</p></details>)}</div>
        </section>
        <section id="consultation" className="relative scroll-mt-28 rounded-xl border border-neutral-200 bg-neutral-50 p-6 sm:p-10 lg:p-12">
          <h2 data-motion="heading" className="mb-4 text-2xl font-bold sm:text-3xl">いまの発信と、目指したいことをお聞かせください。</h2>
          <p className="mb-7 max-w-3xl text-neutral-600 leading-[1.9]">利用中のアカウント、発信の目的、お困りごとをわかる範囲でお知らせください。対象媒体や運用範囲が決まっていなくても、ご相談いただけます。</p>
          <div className="flex flex-wrap items-center gap-5">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="motion-cta inline-flex min-h-12 items-center justify-center rounded-lg bg-cta px-7 py-4 font-semibold text-white hover:bg-cta-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900">SNS運用の面談を予約する</a>
            <Link href="/contact?service=sns" className="inline-block py-3 text-sm font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">メールで相談する</Link>
            <Link href="/download?document=sns-management" className="inline-flex min-h-12 items-center py-3 text-sm font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">事業紹介資料をダウンロード</Link>
          </div>
        </section>
      </div>
      {schemas.map((schema) => <script key={schema["@type"]} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
    </div>
  );
}

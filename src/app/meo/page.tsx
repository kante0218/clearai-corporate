import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

const description = "ClearAIのGoogleマップ・MEO支援。Googleビジネスプロフィールの店舗情報整備、写真・投稿の運用、口コミ返信、レポートと改善提案を、必要な範囲からご相談いただけます。料金は要相談。順位や売上は保証していません。";
const url = "https://clearai.jp/meo";
export const metadata: Metadata = {
  title: "Googleマップ・MEO支援",
  description,
  alternates: { canonical: url },
  openGraph: { title: "Googleマップ・MEO支援 | ClearAI株式会社", description, url, type: "website", locale: "ja_JP", siteName: "ClearAI株式会社", images: ["/images/logo.png"] },
  twitter: { card: "summary_large_image", title: "Googleマップ・MEO支援 | ClearAI株式会社", description, images: ["/images/logo.png"] },
};
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
  ["料金はいくらですか？", "料金は要相談です。店舗数、現在の情報、更新内容や頻度、社内で担当できる作業を伺い、支援範囲と費用を個別にお見積りします。"],
  ["上位表示や売上は保証されますか？", "上位表示、特定の順位、問い合わせ数、来店数、売上は保証していません。Googleのローカル検索結果は関連性、距離、知名度などで決まり、料金を支払って順位を指定することはできません。"],
  ["口コミを増やすための依頼もできますか？", "実際のお客様の体験に基づき、評価や内容を誘導しない案内方法をご相談いただけます。架空口コミ、レビューの購入、特典と引き換えの口コミ依頼、好意的な口コミだけの選別依頼は行いません。"],
  ["Googleの公式サービスですか？", "ClearAIが提供する独立した運用支援サービスです。Googleの公式代理店や提携サービスとして提供するものではありません。"],
];

export default function MeoPage() {
  return <div className="bg-white text-neutral-900">
    <PageHeader kicker="Google Business Profile" title="Googleマップ・MEO支援" description="探している人に、店舗の正しい情報を。Googleビジネスプロフィールの整備と日々の運用を、必要な範囲から支援します。" crumbs={[{ label: "ホーム", href: "/" }, { label: "事業内容", href: "/service" }, { label: "Googleマップ・MEO支援" }]} />
    <div className="mx-auto max-w-[1800px] px-6 py-10 lg:px-8 lg:py-16">
      <div className="mb-12 max-w-3xl">
        <p className="text-sm leading-[1.9] text-neutral-600 sm:text-base">営業時間が古いまま、写真を更新できていない、口コミへの返信に迷っている。そんな日々の課題を整理し、お客様が来店や問い合わせを検討しやすい情報へ整えます。</p>
        <Link href="/contact?service=meo" className="mt-6 inline-flex min-h-12 items-center justify-center rounded-lg bg-cta px-7 py-3.5 text-sm font-semibold text-white hover:bg-cta-hover focus-visible:outline-2 focus-visible:outline-offset-4">MEO支援について相談する</Link>
        <p className="mt-3 text-xs leading-relaxed text-neutral-500">料金は要相談。支援範囲と費用は事前に確認します。</p>
      </div>
      <section className="mb-12 lg:mb-20" aria-labelledby="offering">
        <h2 id="offering" className="mb-6 text-xl font-bold sm:text-3xl">店舗の情報整備から、継続的な改善まで。</h2>
        <dl className="divide-y divide-neutral-200 border-y border-neutral-200">{offerings.map(([title, body]) => <div key={title} className="grid gap-3 py-6 md:grid-cols-[minmax(200px,1fr)_2fr] md:gap-10 md:py-8"><dt className="text-base font-bold sm:text-lg">{title}</dt><dd className="max-w-3xl text-sm leading-[1.9] text-neutral-600">{body}</dd></div>)}</dl>
      </section>
      <section className="mb-12 lg:mb-20" aria-labelledby="process">
        <h2 id="process" className="mb-6 text-xl font-bold sm:text-3xl">ご相談から運用まで</h2>
        <ol className="max-w-4xl space-y-6">{steps.map(([title, body], i) => <li key={title} className="flex gap-4"><span aria-hidden="true" className="pt-0.5 text-sm font-semibold text-neutral-500">0{i + 1}</span><div><h3 className="mb-2 text-base font-bold">{title}</h3><p className="text-sm leading-[1.9] text-neutral-600">{body}</p></div></li>)}</ol>
      </section>
      <section className="mb-12 lg:mb-20" aria-labelledby="policy">
        <h2 id="policy" className="mb-5 text-xl font-bold sm:text-3xl">規約に沿った、無理のない運用を。</h2>
        <p className="max-w-3xl text-sm leading-[1.9] text-neutral-600">実際の営業情報とお客様の体験を大切にします。口コミの購入や評価の操作は行わず、Googleのガイドラインに沿って支援します。プロフィールの対象可否や利用できる機能を確認し、公開内容と対応範囲は店舗側と相談して決めます。</p>
        <p className="mt-4 max-w-3xl text-sm leading-[1.9] text-neutral-600">検索結果の順位や売上をお約束するサービスではありません。ClearAIはGoogleとは独立した事業者です。</p>
        <ul className="mt-5 space-y-2 text-sm text-neutral-600">
          <li><a className="inline-block py-2 underline underline-offset-4" href="https://support.google.com/business/answer/7091?hl=ja" target="_blank" rel="noopener noreferrer">Google公式：ローカル検索結果のランキングを改善する方法（外部サイト）</a></li>
          <li><a className="inline-block py-2 underline underline-offset-4" href="https://support.google.com/contributionpolicy/answer/7400114?hl=ja" target="_blank" rel="noopener noreferrer">Google公式：マップ投稿コンテンツのポリシー（外部サイト）</a></li>
        </ul>
      </section>
      <section className="mb-12 lg:mb-20" aria-labelledby="faq">
        <h2 id="faq" className="mb-6 text-xl font-bold sm:text-3xl">よくあるご質問</h2>
        <div className="divide-y divide-neutral-200 border-y border-neutral-200">{faqs.map(([question, answer]) => <details key={question} className="py-5"><summary className="cursor-pointer text-sm font-semibold leading-relaxed focus-visible:outline-2 focus-visible:outline-offset-4">{question}</summary><p className="max-w-3xl pt-4 text-sm leading-[1.9] text-neutral-600">{answer}</p></details>)}</div>
      </section>
      <section className="border-t border-neutral-200 pt-8">
        <h2 className="mb-4 text-xl font-bold sm:text-3xl">いまの店舗情報から、一緒に見直しませんか。</h2>
        <p className="mb-6 max-w-3xl text-sm leading-[1.9] text-neutral-600">店舗の業種・地域と、更新や運用でお困りのことをお知らせください。プロフィールがまだない場合も、対応できる範囲からご案内します。</p>
        <Link href="/contact?service=meo" className="inline-flex min-h-12 items-center justify-center rounded-lg bg-cta px-7 py-3.5 text-sm font-semibold text-white hover:bg-cta-hover focus-visible:outline-2 focus-visible:outline-offset-4">MEO支援について相談する</Link>
      </section>
    </div>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", name: "Googleマップ・MEO支援", description, url, provider: { "@type": "Organization", name: "ClearAI株式会社", url: "https://clearai.jp" } }) }} />
  </div>;
}

import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

const description = "ClearAIのホームページ制作。事業の強みと伝えたい内容を整理し、構成・デザイン・実装・公開まで支援します。新規制作・リニューアルの範囲、費用、スケジュールはご相談のうえ決定します。";
export const metadata: Metadata = {
  title: "ホームページ制作 | ClearAI株式会社",
  description,
  alternates: { canonical: "https://clearai.jp/website-production" },
  openGraph: { title: "ホームページ制作 | ClearAI株式会社", description, url: "https://clearai.jp/website-production", type: "website", locale: "ja_JP" },
};
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
const faqs = [
  ["何も決まっていなくても相談できますか？", "はい。まずは事業の内容と、ホームページで解決したい課題をお聞かせください。必要なページや機能を一緒に整理します。"],
  ["既存のホームページをリニューアルできますか？", "ご相談いただけます。現在のサイトや運用環境を確認し、残す内容・見直す内容を整理します。既存URLや検索流入への影響も踏まえて進め方を検討します。"],
  ["料金と制作期間はどのくらいですか？", "ページ数、機能、原稿や写真の準備状況、確認の進め方によって変わります。ご要望を伺い、範囲・費用・スケジュールをご案内します。"],
  ["文章や写真の準備、公開後の更新も相談できますか？", "相談できます。支給いただく素材と制作側で支援する内容を確認し、更新方法や公開後の対応範囲とあわせて事前に決めます。"],
];
export default function WebsiteProductionPage() {
  return (
    <div className="bg-white">
      <PageHeader kicker="ホームページ制作" title="事業の価値が、読む人に伝わるホームページへ。" description="見た目を整えるだけでなく、何をどの順番で伝えるかから考えます。新規制作も、既存サイトの見直しも。構成・デザイン・実装・公開まで、目的に合わせて一緒に進めます。" crumbs={[{ label: "ホーム", href: "/" }, { label: "事業内容", href: "/service" }, { label: "ホームページ制作" }]} />
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 py-10 sm:py-16">
        <nav aria-label="このページの目次" className="border-y border-neutral-200 py-5 mb-12">
          <p className="text-sm font-semibold mb-3">知りたい内容から読む</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-neutral-600">
            {[['offering', '提供内容'], ['process', '制作の流れ'], ['faq', 'よくあるご質問'], ['consultation', 'ご相談']].map(([id, label]) => <li key={id}><a href={`#${id}`} className="underline underline-offset-4 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-4">{label}</a></li>)}
          </ul>
        </nav>
        <section id="offering" className="scroll-mt-28 pb-16">
          <h2 data-motion="heading" className="text-2xl sm:text-3xl font-bold mb-5">伝える内容から、公開後の使い方まで。</h2>
          <p data-reading className="max-w-3xl text-neutral-600 leading-[1.9] mb-8">会社紹介・サービス紹介など、サイトの目的に合わせて必要な内容を選びます。具体的な対応範囲は、ご相談のうえ決定します。</p>
          <div className="grid gap-x-12 sm:grid-cols-2">{offerings.map(([title, body]) => <div data-motion="card" key={title} className="motion-card border-t border-neutral-200 py-7"><h3 className="font-bold text-lg mb-3">{title}</h3><p className="text-sm text-neutral-600 leading-[1.95]">{body}</p></div>)}</div>
        </section>
        <section id="process" className="scroll-mt-28 pb-16">
          <h2 data-motion="heading" className="text-2xl sm:text-3xl font-bold mb-8">制作の流れ</h2>
          <ol className="divide-y divide-neutral-200 border-y border-neutral-200">{steps.map(([title, body], index) => <li data-motion="reading" key={title} className="flex gap-5 sm:gap-8 py-7"><span className="text-neutral-400 font-semibold" aria-hidden="true">{index + 1}</span><div><h3 className="font-bold text-lg mb-2">{title}</h3><p data-reading className="max-w-3xl text-sm text-neutral-600 leading-[1.95]">{body}</p></div></li>)}</ol>
        </section>
        <section id="faq" className="scroll-mt-28 pb-16">
          <h2 data-motion="heading" className="text-2xl sm:text-3xl font-bold mb-8">よくあるご質問</h2>
          <div className="divide-y divide-neutral-200 border-y border-neutral-200">{faqs.map(([question, answer]) => <details data-motion-disclosure key={question} className="py-5"><summary className="cursor-pointer font-semibold leading-relaxed rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4">{question}</summary><p data-reading className="max-w-3xl pt-4 text-sm text-neutral-600 leading-[1.95]">{answer}</p></details>)}</div>
        </section>
        <section id="consultation" className="scroll-mt-28 border-t border-neutral-200 pt-10">
          <h2 data-motion="heading" className="text-2xl sm:text-3xl font-bold mb-4">まずは、伝えたいことをお聞かせください。</h2>
          <p data-reading className="max-w-3xl text-neutral-600 leading-[1.9] mb-7">現在のサイトURL、制作の目的、困っていることなど、わかる範囲でお知らせください。ご要望を伺って、必要な内容と進め方をご案内します。</p>
          <Link href="/contact?service=website" className="inline-flex bg-cta hover:bg-cta-hover text-white px-7 py-4 font-semibold rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900">ホームページ制作を相談する</Link>
        </section>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", name: "ホームページ制作", description, url: "https://clearai.jp/website-production", provider: { "@type": "Organization", name: "ClearAI株式会社", url: "https://clearai.jp" } }) }} />
    </div>
  );
}

"use client";

import Link from "next/link";
import LocalizedContent from "@/components/LocalizedContent";
import PageHeader from "@/components/PageHeader";
import styles from "./page.module.css";
import { BOOKING_URL } from "@/lib/booking";

const supports = [
  {
    id: "search",
    title: "MEO・AIO・SEO",
    description: "Googleマップ、AI検索、検索エンジンで、事業や店舗の情報が正しく伝わるように支援します。店舗情報、サイトの文章・構造、FAQや内部リンクを見直し、確認できる表示・流入・問い合わせの状況をもとに改善します。",
    links: [{ href: "/meo", label: "MEO支援を見る" }, { href: "/aio", label: "AIO支援を見る" }, { href: "/website-production", label: "SEOとサイト改善を相談する" }],
  },
  {
    id: "sales",
    title: "フォーム営業自動化",
    description: "営業先の条件整理、送信文面の準備、送信状況の管理から、返信・商談の管理まで、フォーム営業の業務を整理し、自動化できる範囲をご相談いただけます。送信先の受付方針や利用条件を確認し、承認・確認を含めた運用方法を個別に決めます。",
    links: [{ href: "/contact?service=web-marketing", label: "フォーム営業の支援範囲を相談する" }],
  },
  {
    id: "social",
    title: "SNS運用",
    description: "発信の目的と対象を整理し、投稿の企画、文章・画像の制作、投稿管理、分析改善を支援します。AIによる下書きと人による確認を組み合わせ、企業の承認を経て運用します。対象媒体や投稿頻度は、体制に合わせて相談します。",
    links: [{ href: "/sns-management", label: "SNS運用の詳細を見る" }],
  },
  {
    id: "website",
    title: "ホームページ制作・改善",
    description: "事業の強みと伝えたい内容を整理し、新規制作から既存サイトの改善まで支援します。構成・デザイン・実装・公開に加え、SEOの基礎整備、スマートフォンでの読みやすさ、問い合わせまでの導線を確認します。",
    links: [{ href: "/website-production", label: "ホームページ制作・改善を見る" }],
  },
];

export default function WebMarketingPage() {
  return <LocalizedContent>{(
    <div className="bg-white text-neutral-900">
      <PageHeader
        kicker="ウェブマーケティング事業"
        title="集客と営業の接点を、目的に合わせて整えます。"
        description="MEO・AIO・SEO、フォーム営業自動化、SNS運用、ホームページ制作・改善。4つの支援から、いまの課題に必要な範囲を一緒に整理します。"
        crumbs={[{ label: "ホーム", href: "/" }, { label: "事業内容", href: "/service" }, { label: "ウェブマーケティング事業" }]}
      />
      <div className="mx-auto max-w-[1800px] px-6 py-10 lg:px-8 lg:py-16">
        <section className={styles.supportGroup} aria-labelledby="support-title">
          <h2 id="support-title" className="mb-6 text-xl font-bold md:text-3xl">4つの支援内容</h2>
          <div className="divide-y divide-neutral-200 border-t border-neutral-200">
            {supports.map((support) => <section key={support.id} id={support.id} className={`${styles.supportRow} grid scroll-mt-28 gap-4 md:grid-cols-[1fr_2fr] md:gap-12`}>
              <h3 className="text-lg font-bold md:text-xl">{support.title}</h3>
              <div>
                <p className="max-w-3xl text-sm leading-[1.9] text-neutral-600 md:text-base">{support.description}</p>
                <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                  {support.links.map((link) => <li key={link.href}><Link href={link.href} className="inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4 hover:text-neutral-600 focus-visible:outline-2 focus-visible:outline-offset-4">{link.label}</Link></li>)}
                </ul>
              </div>
            </section>)}
          </div>
        </section>
        <section className={`${styles.closing} border-t border-neutral-200`} aria-labelledby="approach-title">
          <h2 id="approach-title" className="mb-5 text-xl font-bold md:text-3xl">課題と対応範囲を決めてから、実行・改善へ。</h2>
          <p className="max-w-3xl text-sm leading-[1.9] text-neutral-600 md:text-base">まずは現在の集客・営業の状況と、問い合わせや商談につなげたい相手を伺います。必要な施策、制作・運用の範囲、確認する指標、費用とスケジュールを相談し、合意した内容から進めます。4つすべてのご依頼は必要ありません。</p>
          <p className="mt-5 text-sm leading-relaxed text-neutral-600">業務システムやアプリの開発もご相談いただけます。<Link href="/software-development" className="ml-2 inline-flex min-h-11 items-center font-semibold text-neutral-900 underline underline-offset-4">システム・ソフトウェア開発を見る</Link></p>
        </section>
        <section className={`${styles.closing} border-t border-neutral-200`} aria-labelledby="contact-title">
          <h2 id="contact-title" className="mb-4 text-xl font-bold md:text-3xl">必要な支援から、ご相談ください。</h2>
          <p className="max-w-3xl text-sm leading-[1.9] text-neutral-600 md:text-base">施策が決まっていない段階でも構いません。いまの状況と、改善したいことをお聞かせください。費用は対応範囲に応じて個別にお見積りします。</p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Link data-ui-button="filled" href="/contact?service=web-marketing" className="inline-flex min-h-12 items-center justify-center bg-neutral-900 px-6 py-3 text-center text-sm font-semibold text-white hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-4"><span className="ui-button-label">フォームで相談する</span></Link>
            <a data-ui-button="control" href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center border border-neutral-300 px-6 py-3 text-center text-sm font-semibold hover:border-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-4"><span className="ui-button-label">無料相談を予約する</span></a>
          </div>
        </section>
      </div>
    </div>
  )}</LocalizedContent>;
}

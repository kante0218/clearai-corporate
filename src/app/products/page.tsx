import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ProductList from "@/components/ProductList";

const description = "ClearAIのサービス一覧。Aqua、まぜまぜReadingの公式サイトと、準備中の猫シフト、Stella、PR Businessをご紹介します。";
export const metadata: Metadata = {
  title: "サービス・プロダクト一覧",
  description,
  alternates: { canonical: "https://clearai.jp/products" },
  openGraph: { title: "サービス・プロダクト一覧 | ClearAI株式会社", description, url: "https://clearai.jp/products", type: "website", locale: "ja_JP" },
};

export default function ProductsPage() {
  return (
    <div className="bg-white">
      <PageHeader kicker="Products" title="ClearAIのサービス・プロダクト" description="仕事の記録、英語学習、日々の暮らし。ClearAIが取り組むサービスをご紹介します。" crumbs={[{ label: "ホーム", href: "/" }, { label: "サービス・プロダクト" }]} />
      <section className="mx-auto max-w-[1800px] px-5 sm:px-6 lg:px-8 py-10 sm:py-16" aria-labelledby="products-heading">
        <h2 id="products-heading" className="mb-3 text-2xl font-bold text-neutral-900">サービス一覧</h2>
        <p className="mb-8 text-sm leading-relaxed text-neutral-600">公開済みのサービスは公式サイトへ進めます。「準備中」のサービスへのご質問は、ClearAIのお問い合わせからお寄せください。</p>
        <ProductList />
      </section>
    </div>
  );
}

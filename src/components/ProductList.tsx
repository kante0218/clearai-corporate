import Link from "next/link";

const products = [
  { name: "Aqua", category: "文字起こし・議事録", description: "音声の文字起こしと議事録づくりを支援するサービスです。", href: "https://aqua-ai.jp/", destination: "aqua-ai.jp" },
  { name: "まぜまぜReading", category: "英語学習", description: "日本語と英語が混ざった文章を読みながら、英語に親しむ学習サービスです。", href: "https://yomu-mixed-reading.vercel.app/", destination: "yomu-mixed-reading.vercel.app" },
  { name: "猫シフト", category: "シフト・給与計算", description: "シフトの管理と給与の見込み計算に、猫の報酬を組み合わせたアプリを準備しています。" },
  { name: "Stella", category: "日々の記録", description: "日替わりのお題で写真や記録を残し、カードやカレンダーで振り返り、友達と共有するアプリを準備しています。" },
  { name: "PR Business", category: "プレスリリース・企画段階", description: "日本企業のプレスリリースを、AIが内容に合う国へ推薦し、多言語で届ける媒体を構想しています。" },
];

export default function ProductList() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product, index) => (
        <li data-motion="card" data-motion-delay={index % 3 * 70} key={product.name} className="motion-card flex flex-col rounded-lg border border-neutral-200 bg-white p-6 sm:p-7">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs font-medium text-neutral-600">{product.category}</p>
            {!product.href && <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700">準備中</span>}
          </div>
          <h3 className="text-xl font-bold text-neutral-900">{product.name}</h3>
          <p data-reading className="mt-3 mb-6 text-sm leading-relaxed text-neutral-600">{product.description}</p>
          <div className="mt-auto">
            {product.href ? (
              <a href={product.href} className="inline-block font-semibold text-sm text-neutral-900 underline underline-offset-4 hover:text-neutral-600 focus-visible:outline-2 focus-visible:outline-offset-4">
                {product.name}の公式サイトへ <span aria-hidden="true">↗</span>
                <span className="mt-2 block break-all text-xs font-normal text-neutral-500">外部サイト：{product.destination}</span>
              </a>
            ) : (
              <Link href="/contact" className="inline-block text-sm font-semibold text-neutral-900 underline underline-offset-4 hover:text-neutral-600 focus-visible:outline-2 focus-visible:outline-offset-4">{product.name}について問い合わせる</Link>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

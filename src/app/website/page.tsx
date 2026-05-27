"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>{children}</div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <p className="text-sm font-semibold text-sky-600 mb-4">{children}</p>;
}

export default function WebsitePage() {
  return (
    <>
      {/* PAGE HEADER */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <p className="text-sm font-semibold text-sky-600 mb-3">Website Production</p>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">ウェブサイト制作</h1>
          <p className="text-base text-gray-600 leading-relaxed max-w-2xl">Next.js + Vercel + Headless CMS で、表示速度・SEO・運用しやすさを最高水準に。このサイト（clearai.jp）と同じ技術スタックで、貴社のサイトも制作します。</p>
        </div>
      </section>

      {/* WHY */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Why Now</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-snug mb-14 max-w-2xl">なぜ今、AIネイティブなサイトが必要か。</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "AI検索への対応", desc: "Google AI Overviews / SGE、ChatGPT Searchなど、AIに引用されるための構造化データ・E-E-A-T設計が必須に。" },
              { title: "速度＝信頼", desc: "表示が3秒遅れるだけで離脱率が大幅に増加。Core Web Vitalsはコンバージョンと直結します。" },
              { title: "更新運用のコスト", desc: "更新のたびに制作会社に依頼する時代は終わり。社内で安全に更新できるCMSと運用設計が必要です。" },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="rounded-2xl border border-gray-200 bg-white p-8 hover:shadow-lg transition-all duration-300 h-full">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TYPES */}
      <section id="types" className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Types</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">対応する制作タイプ</h2>
            <p className="text-sm text-gray-500 mb-14 max-w-2xl leading-relaxed">
              すべての制作で「速い・直しやすい・AIに見つかる」を標準装備します。
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { num: "01", title: "コーポレートサイト", desc: "ブランド表現と採用・営業のコンバージョンを両立。会社案内のレベルから、SEOで集客できるサイトまで。" },
              { num: "02", title: "サービスサイト / LP", desc: "1サービスに特化したLPから、複数サービスのハブまで。広告連動で成果が出る構成を設計します。" },
              { num: "03", title: "採用サイト", desc: "母集団形成と志望度向上に効くストーリー設計。応募フォーム・ATS連携まで対応。" },
              { num: "04", title: "メディア・オウンドメディア", desc: "Headless CMSとSEO設計で、運用しながら強くなるメディア基盤を構築します。" },
              { num: "05", title: "リニューアル", desc: "既存サイトの全面刷新。アクセス資産を引き継ぎつつ、CV率・表示速度・運用性を全面的に改善。" },
              { num: "06", title: "AI機能付きサイト", desc: "サイト内検索のAI化、LLMチャット、自動FAQ生成など、AI機能を組み込んだサイトを構築します。" },
            ].map((item, i) => (
              <Reveal key={item.num} delay={i * 80}>
                <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:border-sky-200 hover:shadow-lg transition-all duration-300 h-full">
                  <span className="text-sm font-bold text-sky-600 mb-3 inline-block">{item.num}</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STACK */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Tech Stack</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-14">標準技術スタック</h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "Next.js / React", desc: "高速で、長期運用に耐えるモダンフレームワーク。" },
              { title: "Vercel", desc: "世界最速クラスのCDN／自動デプロイ環境。" },
              { title: "microCMS / Sanity", desc: "国内外のHeadless CMSを業務要件に応じて選定。" },
              { title: "GA4 / Search Console", desc: "計測・SEO監視まで初期セットアップ込み。" },
            ].map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <div className="rounded-xl border border-gray-200 bg-white p-5 h-full">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <p className="text-xs text-gray-500 mt-6">※ ご要望に応じてWordPress・Shopify等のCMSにも対応可能です。</p>
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Process</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-14">制作プロセス</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { num: "01", title: "ヒアリング・要件定義", desc: "事業目標・ターゲット・KPIを言語化。サイトの役割を明確に定義します。" },
              { num: "02", title: "情報設計・ワイヤー", desc: "サイトマップ・ワイヤーフレーム・コンテンツ要件を整理。AIで競合・検索意図も分析。" },
              { num: "03", title: "デザイン・実装", desc: "Figmaでデザイン → Next.jsで実装。AI支援で開発スピードを2〜3倍に。" },
              { num: "04", title: "公開・運用支援", desc: "公開後の運用設計、CMS研修、SEO継続改善まで伴走します。" },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="rounded-2xl border border-gray-200 bg-white p-8 hover:shadow-lg transition-all duration-300 h-full">
                  <span className="text-xs font-semibold text-sky-600 tracking-widest">{item.num}</span>
                  <h3 className="text-lg font-bold text-gray-900 mt-2 mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Pricing</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">料金の目安</h2>
            <p className="text-sm text-gray-500 mb-14 max-w-2xl leading-relaxed">
              ページ数・機能要件・運用範囲により変動します。要件整理段階での無料お見積もりが可能です。
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {[
              { name: "ライト", price: "15万円〜", unit: "/ 一式", desc: "LP1枚・小規模ページの最小構成プラン。", features: ["ヒアリング・構成設計", "デザイン・実装（1〜3ページ）", "スマホ対応", "公開後14日サポート"], featured: false },
              { name: "スタンダード", price: "50万円〜", unit: "/ 一式", desc: "コーポレートサイト・LP・採用サイトの標準プラン。", features: ["要件定義・構成設計", "デザイン・実装", "GA4・SEO初期設定", "Headless CMS構築（任意）", "公開後30日サポート"], featured: true },
              { name: "カスタム", price: "ご相談", unit: "", desc: "大規模サイト・独自機能・AI連携をご希望の方へ。", features: ["要件・技術選定コンサル", "独自機能・AI連携開発", "段階リリース計画", "運用体制構築", "保守・継続改善"], featured: false },
            ].map((plan, i) => (
              <Reveal key={plan.name} delay={i * 100} className="flex">
                <div className={`rounded-2xl p-8 lg:p-10 transition-all duration-300 flex flex-col w-full ${plan.featured ? "bg-sky-600 text-white shadow-xl" : "bg-white border border-gray-200 hover:shadow-lg"}`}>
                  {plan.featured ? (
                    <span className="inline-block rounded-full bg-white/20 text-white px-3 py-1 text-sm font-semibold mb-4 self-start">Popular</span>
                  ) : (
                    <span aria-hidden="true" className="invisible inline-block rounded-full px-3 py-1 text-sm font-semibold mb-4 self-start">Popular</span>
                  )}
                  <h3 className={`text-lg font-bold mb-2 ${plan.featured ? "text-white" : "text-gray-900"}`}>{plan.name}</h3>
                  <div className="mb-4 flex items-baseline gap-1">
                    <span className={`text-3xl font-bold ${plan.featured ? "text-white" : "text-gray-900"}`}>{plan.price}</span>
                    {plan.unit && <span className={`text-sm ${plan.featured ? "text-white/80" : "text-gray-500"}`}>{plan.unit}</span>}
                  </div>
                  <p className={`text-sm leading-relaxed mb-6 ${plan.featured ? "text-white/80" : "text-gray-600"}`}>{plan.desc}</p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${plan.featured ? "bg-white/40" : "bg-sky-500"}`} />
                        <span className={`text-sm ${plan.featured ? "text-white/90" : "text-gray-600"}`}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="/contact?service=website" className={`block text-center text-sm font-semibold py-3 rounded-lg transition-all duration-300 mt-auto ${plan.featured ? "bg-white text-sky-600 hover:bg-sky-50" : "border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900"}`}>相談する</a>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300}>
            <p className="text-xs text-gray-500 text-center mt-8">表示価格は税抜。要件・分量により個別見積もりとなります。IT導入補助金の活用も可能です。</p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Reveal>
            <Label>Contact</Label>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">サイトを、事業の武器に。</h2>
            <p className="text-base text-gray-600 leading-relaxed mb-10">「現状のサイトをどう変えるべきか」のご相談から承ります。要件整理段階での無料診断が可能です。</p>
            <a href="/contact?service=website" className="rounded-lg bg-sky-600 text-white font-semibold px-10 py-4 hover:bg-sky-700 transition-colors duration-300 inline-block">無料相談を申し込む</a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const services = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
    title: "AI戦略策定",
    subtitle: "AI Strategy",
    description: "経営課題を起点にAI活用のロードマップを策定。投資対効果を可視化し、段階的な導入計画を設計します。",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
    title: "データ分析・活用",
    subtitle: "Data Analysis",
    description: "社内データの棚卸しから分析基盤の構築、AIモデルの開発まで。データドリブンな意思決定を実現します。",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "業務自動化",
    subtitle: "Business Automation",
    description: "RPAとAIを組み合わせた業務プロセスの自動化。定型作業を削減し、人材をより創造的な業務へシフトさせます。",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    title: "生成AI活用",
    subtitle: "Generative AI",
    description: "ChatGPT・Claude等の大規模言語モデルを活用した社内ツール開発。カスタマーサポートや文書作成を革新します。",
  },
];

const steps = [
  { number: "01", title: "ヒアリング", subtitle: "Hearing", description: "課題・目標の整理と現状分析を実施。AI導入の方向性を明確にします。" },
  { number: "02", title: "戦略提案", subtitle: "Strategy Proposal", description: "ROIを試算した具体的な導入計画をご提案。優先度の高い施策から着手します。" },
  { number: "03", title: "開発・実装", subtitle: "Development", description: "アジャイルで迅速に開発。PoCで効果を検証しながら段階的に実装します。" },
  { number: "04", title: "運用・改善", subtitle: "Operation", description: "導入後の定着支援とKPI計測。継続的な改善で成果を最大化します。" },
];

const caseStudies = [
  {
    industry: "製造業",
    title: "外観検査のAI自動化で品質管理を革新",
    stat: "コスト70%削減",
    description: "画像認識AIにより検査工程を自動化。人的ミスを排除し、検査精度99.5%を達成しました。",
    tags: ["画像認識", "品質管理", "業務自動化"],
  },
  {
    industry: "金融業",
    title: "顧客対応AIチャットボットで問い合わせを効率化",
    stat: "対応時間80%短縮",
    description: "生成AIを活用した高精度チャットボットにより、24時間対応と顧客満足度向上を同時に実現しました。",
    tags: ["生成AI", "カスタマーサポート", "NLP"],
  },
  {
    industry: "小売業",
    title: "需要予測AIで在庫最適化を実現",
    stat: "売上15%向上",
    description: "過去の販売データと外部データを組み合わせた予測モデルで、機会損失と過剰在庫を大幅に削減しました。",
    tags: ["データ分析", "需要予測", "機械学習"],
  },
];

const pricingPlans = [
  {
    name: "スポットコンサル",
    subtitle: "Spot Consulting",
    price: "¥500,000",
    priceSuffix: "〜",
    description: "まずは相談したい方向け。AI活用の方向性を短期間で明確にします。",
    features: [
      "現状分析レポート",
      "AI活用提案書（1領域）",
      "2回のコンサルティング",
      "メールサポート（1ヶ月）",
    ],
    cta: "相談する",
    highlighted: false,
  },
  {
    name: "スタンダード",
    subtitle: "Standard",
    price: "¥1,500,000",
    priceSuffix: "〜/月",
    description: "本格的なAI導入を推進。戦略策定からPoC・実装までを伴走支援します。",
    features: [
      "AI戦略ロードマップ策定",
      "PoC開発・効果検証",
      "月2回の定例ミーティング",
      "専任コンサルタント配置",
      "チャットサポート（無制限）",
    ],
    cta: "詳しく見る",
    highlighted: true,
  },
  {
    name: "エンタープライズ",
    subtitle: "Enterprise",
    price: "要相談",
    priceSuffix: "",
    description: "大規模導入・複数部門横断のAI変革プロジェクトに最適なプランです。",
    features: [
      "全社AI戦略策定",
      "複数領域の並行開発",
      "週次の定例ミーティング",
      "専任チーム編成",
      "24時間サポート",
      "社内AI人材育成プログラム",
    ],
    cta: "お問い合わせ",
    highlighted: false,
  },
];

export default function AIConsultingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-20 min-h-[70vh] flex items-center overflow-hidden bg-navy-950">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950" />
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 lg:py-32 text-center">
          <FadeIn>
            <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs text-gray-400 tracking-wide">AI Implementation Support</span>
            </span>
          </FadeIn>

          <FadeIn delay={100}>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6 tracking-tight">
              AI導入支援
            </h1>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              戦略策定から開発・実装・運用まで、一気通貫でサポート。
              <br className="hidden sm:block" />
              貴社のビジネスに最適なAIソリューションを共に創り上げます。
            </p>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-full text-base font-medium transition-all hover:shadow-lg hover:shadow-accent/25"
              >
                無料相談を申し込む
              </Link>
              <a
                href="#services"
                className="w-full sm:w-auto border border-white/20 text-white px-8 py-4 rounded-full text-base font-medium hover:bg-white/5 transition-all"
              >
                サービスを見る
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Service Areas */}
      <section id="services" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16 lg:mb-20">
              <span className="text-xs font-semibold text-accent tracking-widest uppercase mb-3 block">Service Areas</span>
              <h2 className="text-3xl lg:text-5xl font-bold text-navy-950 tracking-tight mb-4">4つの支援領域</h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-base lg:text-lg leading-relaxed">
                課題の特定からAIの実装・運用まで、あらゆるフェーズに対応する包括的な支援体制を整えています。
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {services.map((service, i) => (
              <FadeIn key={service.title} delay={i * 100}>
                <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 lg:p-10 hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 w-14 h-14 bg-navy-950 rounded-2xl flex items-center justify-center text-white">
                      {service.icon}
                    </div>
                    <div>
                      <div className="flex items-baseline gap-3 mb-2">
                        <h3 className="text-xl lg:text-2xl font-bold text-navy-950">{service.title}</h3>
                        <span className="text-xs text-gray-400 tracking-wide">{service.subtitle}</span>
                      </div>
                      <p className="text-gray-500 text-sm lg:text-base leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-1/2 translate-x-1/2" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Flow */}
      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16 lg:mb-20">
              <span className="text-xs font-semibold text-accent tracking-widest uppercase mb-3 block">Process</span>
              <h2 className="text-3xl lg:text-5xl font-bold text-navy-950 tracking-tight mb-4">導入の流れ</h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-base lg:text-lg leading-relaxed">
                4つのフェーズで確実にAI導入を成功へ導きます。
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <FadeIn key={step.number} delay={i * 150}>
                <div className="relative">
                  {/* Connector line */}
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-accent/30 to-accent/10 z-0" />
                  )}
                  <div className="relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                    <div className="text-4xl lg:text-5xl font-bold text-accent/15 mb-4">{step.number}</div>
                    <div className="flex items-baseline gap-2 mb-3">
                      <h3 className="text-xl font-bold text-navy-950">{step.title}</h3>
                      <span className="text-[10px] text-gray-400 tracking-wide uppercase">{step.subtitle}</span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16 lg:mb-20">
              <span className="text-xs font-semibold text-accent tracking-widest uppercase mb-3 block">Case Studies</span>
              <h2 className="text-3xl lg:text-5xl font-bold text-navy-950 tracking-tight mb-4">導入事例</h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-base lg:text-lg leading-relaxed">
                さまざまな業界でAI導入による成果を実現しています。
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {caseStudies.map((cs, i) => (
              <FadeIn key={cs.title} delay={i * 100}>
                <div className="group rounded-2xl border border-gray-100 bg-white overflow-hidden hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-300 hover:-translate-y-1">
                  {/* Stat header */}
                  <div className="bg-gradient-to-br from-navy-950 to-navy-800 p-6 lg:p-8">
                    <span className="text-xs font-semibold text-accent tracking-wide uppercase">{cs.industry}</span>
                    <div className="text-3xl lg:text-4xl font-bold text-white mt-2">{cs.stat}</div>
                  </div>
                  {/* Content */}
                  <div className="p-6 lg:p-8">
                    <h3 className="text-lg font-bold text-navy-950 mb-3 leading-snug">{cs.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-5">{cs.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {cs.tags.map((tag) => (
                        <span key={tag} className="text-[11px] font-medium text-accent bg-accent/5 rounded-full px-3 py-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16 lg:mb-20">
              <span className="text-xs font-semibold text-accent tracking-widest uppercase mb-3 block">Pricing</span>
              <h2 className="text-3xl lg:text-5xl font-bold text-navy-950 tracking-tight mb-4">料金プラン</h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-base lg:text-lg leading-relaxed">
                貴社の規模・フェーズに応じた最適なプランをご用意しています。
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {pricingPlans.map((plan, i) => (
              <FadeIn key={plan.name} delay={i * 100}>
                <div className={`relative rounded-2xl p-8 lg:p-10 flex flex-col h-full transition-all duration-300 hover:-translate-y-1 ${
                  plan.highlighted
                    ? "bg-navy-950 text-white shadow-2xl shadow-navy-950/20 ring-2 ring-accent/30"
                    : "bg-white border border-gray-100 hover:shadow-xl hover:shadow-gray-100/50"
                }`}>
                  {plan.highlighted && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="bg-accent text-white text-[11px] font-semibold tracking-wide px-4 py-1.5 rounded-full">
                        おすすめ
                      </span>
                    </div>
                  )}

                  <div className="mb-8">
                    <div className="flex items-baseline gap-2 mb-1">
                      <h3 className="text-xl font-bold">{plan.name}</h3>
                      <span className={`text-xs tracking-wide ${plan.highlighted ? "text-gray-400" : "text-gray-400"}`}>{plan.subtitle}</span>
                    </div>
                    <p className={`text-sm leading-relaxed mt-2 ${plan.highlighted ? "text-gray-400" : "text-gray-500"}`}>
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-8">
                    <span className="text-3xl lg:text-4xl font-bold">{plan.price}</span>
                    {plan.priceSuffix && (
                      <span className={`text-base ml-1 ${plan.highlighted ? "text-gray-400" : "text-gray-500"}`}>{plan.priceSuffix}</span>
                    )}
                  </div>

                  <ul className="space-y-3 mb-10 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <svg className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.highlighted ? "text-accent-light" : "text-accent"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        <span className={`text-sm ${plan.highlighted ? "text-gray-300" : "text-gray-600"}`}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className={`block text-center py-4 rounded-full text-sm font-medium transition-all ${
                      plan.highlighted
                        ? "bg-accent hover:bg-accent-dark text-white hover:shadow-lg hover:shadow-accent/25"
                        : "bg-navy-950 hover:bg-navy-800 text-white"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-navy-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight mb-6">
              AI導入の第一歩を、
              <br />
              一緒に踏み出しませんか？
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="text-gray-400 text-base lg:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              まずは無料相談から。貴社の課題をヒアリングし、最適なAI活用の方向性をご提案いたします。
            </p>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto bg-accent hover:bg-accent-dark text-white px-10 py-4 rounded-full text-base font-medium transition-all hover:shadow-lg hover:shadow-accent/25"
              >
                無料相談を申し込む
              </Link>
              <Link
                href="/cases"
                className="w-full sm:w-auto border border-white/20 text-white px-10 py-4 rounded-full text-base font-medium hover:bg-white/5 transition-all"
              >
                導入事例をもっと見る
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

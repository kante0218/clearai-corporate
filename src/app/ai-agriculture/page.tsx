"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import AgricultureScene from "@/components/illustrations/AgricultureScene";

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
  return <p className="text-sm font-semibold text-emerald-600 mb-4">{children}</p>;
}

export default function AiAgriculturePage() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setHeroLoaded(true), 100); }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Illustration — full-width background layer */}
        <div
          className="absolute inset-0 transition-all duration-1000"
          style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "200ms" }}
          aria-hidden="true"
        >
          <AgricultureScene className="w-full h-full" />
        </div>

        {/* Gradient overlay for text legibility */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to right, rgba(255,255,255,0.90) 0%, rgba(255,255,255,0.76) 40%, rgba(255,255,255,0.22) 75%, rgba(255,255,255,0) 100%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.60))" }}
        />

        {/* Copy — overlaid, left-aligned */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-10 py-20">
          <div className="max-w-xl">
            <span
              className="inline-block rounded-full bg-emerald-50/90 text-emerald-600 px-3 py-1 text-sm font-semibold mb-6 transition-all duration-700"
              style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "300ms" }}
            >
              Engineering × Agriculture
            </span>
            <h1
              className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6 transition-all duration-700"
              style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(24px)", transitionDelay: "500ms" }}
            >
              農業インフラから、<br />宇宙・防衛産業へ。
            </h1>
            <p
              className="text-base text-gray-700 leading-relaxed mb-10 transition-all duration-700"
              style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "700ms" }}
            >
              田んぼの水流管理や、ビニールハウスの自動化から。<br />農家の声に根差した技術を、未来の極限環境へ拡張する。
            </p>
            <div
              className="flex items-center gap-4 transition-all duration-700"
              style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "900ms" }}
            >
              <a href="/contact" className="rounded-lg bg-emerald-600 text-white font-semibold px-8 py-3.5 hover:bg-emerald-700 transition-colors duration-300">無料相談を申し込む</a>
              <a href="#services" className="text-sm text-gray-600 font-semibold hover:text-gray-900 transition-colors duration-300">ソリューションを見る →</a>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              {[
                { value: "EC構築", label: "ネット販売支援" },
                { value: "利益率改善", label: "経営サポート" },
                { value: "全国対応", label: "日本全国" },
                { value: "2営業日", label: "初回返信" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center justify-center py-6 px-4 text-center">
                  <span className="text-xl font-bold text-gray-900">{stat.value}</span>
                  <span className="text-xs text-gray-500 mt-1">{stat.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>About</Label>
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-gray-900 leading-snug mb-6">農家の声から始め、<br />極限環境の栽培へ広げる。</h2>
              <p className="text-base text-gray-600 leading-relaxed">
                clear AIの農業事業は、まず現場の農家様の声に徹底的に耳を傾けることから始めます。田んぼの水流管理、ビニールハウスの温湿度・灌水制御といった<span className="font-semibold text-gray-900">農業インフラの自動化</span>を第一歩として支援。その先には、宇宙・潜水艦・シェルターなど、光も土もない<span className="font-semibold text-gray-900">無機質な空間での栽培</span>へと踏み込みます。農業というアプローチから、防衛産業と宇宙産業そのものを育てていく。それが私たちの描く未来です。
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section id="services" className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Roadmap</Label>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">農業インフラから、宇宙・防衛へ。</h2>
            <p className="text-base text-gray-600 leading-relaxed max-w-2xl mb-14">
              現場の声から始める「地に足のついた自動化」を起点に、段階的に極限環境の栽培技術へと展開していきます。
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: "Phase 01", title: "農業インフラの自動化", desc: "田んぼの水流管理、ビニールハウスの温湿度・灌水・換気の自動化など、農家様の現場課題に密着したインフラ自動化支援から着手します。", hoverBg: "hover:bg-emerald-50" },
              { num: "Phase 02", title: "閉鎖空間・極限環境での栽培", desc: "宇宙空間、潜水艦内、地下シェルター等、光も土もない無機質な空間における栽培技術の研究開発。環境制御型農業のコア技術を構築します。", hoverBg: "hover:bg-teal-50" },
              { num: "Phase 03", title: "防衛・宇宙産業への展開", desc: "閉鎖空間における食料生産技術を、宇宙産業と防衛産業のコア基盤技術として提供。農業というアプローチから、両産業そのものを育てていきます。", hoverBg: "hover:bg-lime-50" },
            ].map((item, i) => (
              <Reveal key={item.num} delay={i * 100}>
                <div className={`bg-white rounded-2xl border border-gray-200 p-8 transition-all duration-300 cursor-default group ${item.hoverBg} hover:shadow-lg`}>
                  <span className="text-sm font-bold text-emerald-600">{item.num}</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-3 mb-4">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ISSUES */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Challenges</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-14">日本の農業が抱える構造課題</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                prefix: null,
                number: "30%",
                label: "農家の直販比率（全国平均）",
                desc: "ほとんどの農産物がJAや卸を経由し、生産者の手取りは小売価格の20〜30%程度です。",
              },
              {
                prefix: "▼",
                number: "15%",
                label: "農業所得の減少傾向",
                desc: "コスト上昇に対して販売価格が追いつかず、利益が圧迫されています。",
              },
              {
                prefix: null,
                number: "85%",
                label: "EC未導入の農家割合",
                desc: "ネット販売の可能性を感じながらも、始め方がわからない農家が大半です。",
              },
            ].map((item, i) => (
              <Reveal key={item.label} delay={i * 100}>
                <div className="rounded-2xl border border-gray-200 bg-white p-8 hover:shadow-lg transition-all duration-300">
                  <p className="flex items-baseline gap-2 mb-3">
                    {item.prefix && (
                      <span className="text-2xl font-bold text-emerald-600 leading-none">{item.prefix}</span>
                    )}
                    <span className="text-5xl font-bold text-emerald-600 leading-none">{item.number}</span>
                  </p>
                  <p className="text-sm font-bold text-gray-900 mb-2">{item.label}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Process</Label>
            <h2 className="text-2xl font-bold text-gray-900 mb-14">導入の流れ</h2>
          </Reveal>
          {[
            { num: "01", title: "経営ヒアリング", en: "Hearing", desc: "現在の販路・原価構造・課題を丁寧にお聞きします。農園の強みと改善ポイントを整理し、最適な支援プランを設計します。" },
            { num: "02", title: "戦略・設計", en: "Planning", desc: "EC構築、ブランディング、利益改善など、優先度の高い施策から着手。無理のないスケジュールでご提案します。" },
            { num: "03", title: "構築・導入", en: "Implementation", desc: "ECサイト構築、システム導入、デザイン制作などを実施。農家様が自ら運用できるよう、丁寧にレクチャーします。" },
            { num: "04", title: "運用・改善", en: "Operation", desc: "売上データを分析しながら、集客施策やリピーター育成を継続的に改善。農家と二人三脚で成果を追求します。" },
          ].map((step, i) => (
            <Reveal key={step.num} delay={i * 100}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-10 border-b border-gray-100 last:border-0">
                <div className="lg:col-span-1"><span className="text-sm font-bold text-emerald-600">{step.num}</span></div>
                <div className="lg:col-span-3">
                  <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{step.en}</p>
                </div>
                <div className="lg:col-span-8"><p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* DEVELOPMENT STATUS */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-emerald-100/40 blur-[120px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <Reveal>
            <Label>Status</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-6">現在、提供中のサービスです。</h2>
            <p className="text-base text-gray-600 leading-relaxed max-w-2xl mb-14">
              clear AIは、農家の経営課題をエンジニアリングで解決するサービスを提供しています。<br />
              ECサイト構築から利益率改善まで、農家の「稼ぐ力」を総合的にサポートします。
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {[
              {
                status: "提供中",
                statusColor: "bg-emerald-100 text-emerald-700",
                title: "EC・ネット販売構築",
                desc: "Shopify・BASEなどを活用した農家向けECサイトの企画・構築・運用支援を提供中です。",
              },
              {
                status: "提供中",
                statusColor: "bg-emerald-100 text-emerald-700",
                title: "経営改善コンサルティング",
                desc: "原価分析・販路最適化・利益率改善のコンサルティングサービスを提供しています。",
              },
              {
                status: "準備中",
                statusColor: "bg-blue-100 text-blue-700",
                title: "農業特化SaaS",
                desc: "受発注・顧客管理・在庫管理を一元化する農業特化型のクラウドサービスを開発中です。",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="rounded-2xl border border-gray-200 bg-white p-8 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  <span className={`inline-block self-start rounded-full px-3 py-1 text-xs font-bold mb-4 ${item.statusColor}`}>{item.status}</span>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={300}>
            <div className="rounded-2xl bg-gray-950 p-10 lg:p-14 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none" />
              <div className="relative z-10">
                <span className="inline-block rounded-full bg-emerald-500/20 text-emerald-400 px-4 py-1.5 text-xs font-bold tracking-widest uppercase mb-6">Now Hiring</span>
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight">
                  一緒に農業を変えるエンジニアを募集しています。
                </h3>
                <p className="text-base text-white/60 leading-relaxed max-w-xl mb-8">
                  農家の経営課題をテクノロジーで解決する。<br />
                  フロントエンド、バックエンド、デザイナーを募集中です。
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {["TypeScript / React", "Next.js", "Shopify / EC", "UI/UX Design", "Python", "AWS / GCP"].map((tech) => (
                    <span key={tech} className="text-xs font-medium text-white/50 border border-white/10 rounded-full px-3 py-1.5">{tech}</span>
                  ))}
                </div>
                <a href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 text-white font-semibold px-8 py-3.5 hover:bg-emerald-500 transition-colors duration-300">
                  話を聞いてみる
                  <span className="text-emerald-200">→</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* R&D PARTNERS */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>R&D Partners</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-6">現場と歩む、共同研究フェーズ。</h2>
            <p className="text-sm text-gray-600 bg-white border border-gray-200 rounded-xl px-5 py-4 mb-12 leading-relaxed max-w-3xl">
              clear AIの農業事業は、まだ導入実績を積み上げるフェーズではありません。現在は<span className="font-semibold text-gray-900">秋田・北海道の農家様</span>と連携しながら、現場の課題に根差した技術開発と実地検証を進めています。机上の空論ではなく、土と向き合う方々と共につくる。それが私たちのスタンスです。
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                region: "秋田",
                title: "秋田の農家様との協業",
                desc: "米作を中心とした生産現場で、業務効率化と販路設計の共同検証を進めています。現地のオペレーションに合わせたプロトタイプを開発し、継続的にフィードバックをいただきながら改善しています。",
              },
              {
                region: "北海道",
                title: "北海道の農家様との協業",
                desc: "広域・大規模な農業環境における受発注・顧客管理・データ活用の実証を行っています。北の大地ならではのスケール感と気候条件に即した技術検証を共同で進めています。",
              },
            ].map((item, i) => (
              <Reveal key={item.region} delay={i * 100}>
                <div className="rounded-2xl border border-gray-200 bg-white p-8 hover:shadow-lg transition-all duration-300 h-full">
                  <span className="inline-block rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-bold mb-4">{item.region}</span>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM & ADVISORS */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Team & Advisors</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-6">参画メンバーとアドバイザー</h2>
            <p className="text-base text-gray-600 leading-relaxed max-w-2xl mb-14">
              農業とエンジニアリングの両面から、現場に貢献できる体制を構築しています。研究と実装、アカデミアと現場、その両方を行き来できるチームです。
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Reveal>
              <div className="rounded-2xl border border-gray-200 bg-white p-8 hover:shadow-lg transition-all duration-300 h-full">
                <span className="inline-block rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-bold mb-4">参画メンバー</span>
                <h3 className="text-lg font-bold text-gray-900 mb-3">筑波大学 落合研究室 × 起業家</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  筑波大学 落合研究室にて研究に従事しながら、自ら会社を起業したメンバーが参画予定です。最先端の研究知見と、事業をゼロから立ち上げた実行力を、農業領域の技術開発に還元します。
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="rounded-2xl border border-gray-200 bg-white p-8 hover:shadow-lg transition-all duration-300 h-full">
                <span className="inline-block rounded-full bg-blue-50 text-blue-700 px-3 py-1 text-xs font-bold mb-4">アドバイザー（予定）</span>
                <h3 className="text-lg font-bold text-gray-900 mb-3">東京大学 農学部</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  東京大学 農学部にてアカデミックな知見を有する方を、アドバイザーとして迎える予定です。農学分野の専門性に基づき、事業の方向性や技術検証に助言をいただきます。
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>FAQ</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-14">よくあるご質問</h2>
          </Reveal>
          <div className="max-w-3xl">
            {[
              {
                q: "小規模農家でも相談できますか？",
                a: "はい。小規模農家様こそ、直販やECの効果が大きいと考えています。規模を問わずご相談ください。",
              },
              {
                q: "ECサイトの運用経験がなくても大丈夫ですか？",
                a: "もちろんです。スマートフォンが使える方であれば運用できるよう、シンプルな仕組みと丁寧なレクチャーをご提供します。",
              },
              {
                q: "費用はどのくらいかかりますか？",
                a: "農園の規模や必要な支援内容によって異なります。まずはヒアリングの上、最適なプランと費用感をご提案しますので、お気軽にご相談ください。",
              },
              {
                q: "補助金は使えますか？",
                a: "IT導入補助金、小規模事業者持続化補助金など、活用可能な補助金について申請支援まで行います。",
              },
              {
                q: "どんな作物に対応していますか？",
                a: "野菜・果物・米・花卉・加工品など幅広く対応可能です。品目やターゲット顧客に合わせた最適な販売戦略をご提案します。",
              },
              {
                q: "対応エリアはどこですか？",
                a: "オンラインでの対応を基本に、全国どこでもサポートが可能です。必要に応じて現地訪問も行います。",
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <details className="border-b border-gray-100 py-5 group">
                  <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between gap-4">
                    <span>{item.q}</span>
                    <span className="text-gray-400 text-lg leading-none flex-shrink-0 transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <p className="text-gray-600 text-sm leading-relaxed mt-3">{item.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Reveal>
            <Label>Contact</Label>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">まずは、お話しませんか。</h2>
            <p className="text-base text-gray-600 leading-relaxed mb-10">「うちの農園でもECは始められる？」というご相談から大歓迎です。<br />現状をお聞きした上で、最適な支援プランをご提案します。</p>
            <a href="/contact" className="rounded-lg bg-emerald-600 text-white font-semibold px-10 py-4 hover:bg-emerald-700 transition-colors duration-300 inline-block">無料で相談する</a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* Scroll-triggered reveal - simplified, up direction only */
function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(24px)",
      transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    }}>{children}</div>
  );
}

/* Section label */
function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-4">{children}</p>
  );
}

export default function HomeContent({ newsSlot }: { newsSlot: ReactNode }) {
  const [heroLoaded, setHeroLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setHeroLoaded(true), 100); }, []);

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          background: "var(--clay-cream)",
          minHeight: "88vh",
          paddingTop: "clamp(5rem, 12vh, 9rem)",
          paddingBottom: "clamp(4rem, 8vh, 7rem)",
        }}
      >
        {/* Content — centered column */}
        <div
          className="relative z-10 w-full max-w-3xl mx-auto px-6 lg:px-10 text-center"
          style={{
            opacity: heroLoaded ? 1 : 0,
            transform: heroLoaded ? "none" : "translateY(28px)",
            transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 80ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) 80ms",
          }}
        >
          {/* Uppercase label */}
          <span
            className="clay-label"
            style={{ marginBottom: "1.5rem", display: "block" }}
          >
            AI Consulting &amp; Agriculture Engineering
          </span>

          {/* H1 — Clay display scale */}
          <h1
            className="clay-display"
            style={{
              color: "var(--clay-black)",
              marginBottom: "1.5rem",
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "none" : "translateY(24px)",
              transition: "opacity 0.75s cubic-bezier(0.16,1,0.3,1) 220ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) 220ms",
            }}
          >
            AIで、すべてを<br />クリアにする。
          </h1>

          {/* Sub-copy */}
          <p
            style={{
              fontSize: "1.125rem",
              fontWeight: 400,
              lineHeight: 1.65,
              color: "var(--clay-warm-silver)",
              letterSpacing: "-0.02em",
              maxWidth: "38rem",
              margin: "0 auto 2.5rem",
              opacity: heroLoaded ? 1 : 0,
              transition: "opacity 0.75s cubic-bezier(0.16,1,0.3,1) 380ms",
            }}
          >
            AIコンサルティング・AI顧問・エンジニアによる農業支援。<br />3つの事業で、日本の産業に確かな価値を届けます。
          </p>

          {/* CTA row */}
          <div
            className="flex items-center justify-center gap-4 flex-wrap"
            style={{
              opacity: heroLoaded ? 1 : 0,
              transition: "opacity 0.75s cubic-bezier(0.16,1,0.3,1) 520ms",
            }}
          >
            <Link href="/contact" className="btn-clay">
              お問い合わせ
            </Link>
            <Link href="#services" className="btn-clay-ghost">
              事業を見る →
            </Link>
          </div>
        </div>

        {/* Bottom oat dashed divider */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ padding: "0 1.5rem" }}
        >
          <hr className="clay-divider" />
        </div>
      </section>

      {/* ═══ TRUST METRICS ═══ */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              {[
                { value: "3事業", label: "展開中" },
                { value: "4領域", label: "ワンストップ支援" },
                { value: "全国対応", label: "日本全国" },
                { value: "2営業日", label: "初回返信" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center justify-center py-6 px-4 text-center">
                  <span className="text-lg font-bold text-gray-900">{stat.value}</span>
                  <span className="text-xs text-gray-500 mt-1">{stat.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ VISION ═══ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <Reveal>
              <SectionLabel>Our Vision</SectionLabel>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
                AIを、日本の現場へ届ける。
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <div className="space-y-5">
                <p className="text-base text-gray-600 leading-relaxed">
                  AIはまだ、多くの企業や生産者にとって遠い存在です。難しい、コストが高い、何から始めればいいかわからない——そんな声を何度も聞いてきました。
                </p>
                <p className="text-base text-gray-600 leading-relaxed">
                  私たちはそのギャップを埋めるために生まれました。最先端のAI技術をビジネスの言葉に翻訳し、エンジニアの力で農家の経営を支える。一社一社、一農家一農家に寄り添い、確かな価値を届けていきます。
                </p>
                <div className="h-px bg-gray-200 mt-6" />
                <div className="flex items-center gap-8 pt-4">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">3<span className="text-sm text-gray-400 ml-1 font-normal">事業</span></p>
                    <p className="text-xs text-gray-400 mt-1">展開中</p>
                  </div>
                  <div className="w-px h-10 bg-gray-200" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">日本</p>
                    <p className="text-xs text-gray-400 mt-1">市場特化</p>
                  </div>
                  <div className="w-px h-10 bg-gray-200" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">2026</p>
                    <p className="text-xs text-gray-400 mt-1">創業</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section id="services" className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <Reveal>
            <SectionLabel>Our Services</SectionLabel>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
              3つの事業で、日本の未来をつくる。
            </h2>
            <p className="text-base text-gray-500 mb-14 max-w-lg leading-relaxed">
              企業のAI活用・AI顧問・エンジニアによる農業支援。それぞれの現場に寄り添い、確実に成果を届けます。
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            <Reveal delay={0} className="h-full">
              <Link href="/ai-consulting" className="group block h-full">
                <div className="bg-white border border-gray-200 rounded-2xl p-8 lg:p-10 hover:border-blue-300 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-600 mb-4">Service 01</span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">AIコンサルティング</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-1">
                    戦略策定から実装・運用まで。日本企業のAI活用を、ヒアリングから定着まで一気通貫で伴走します。
                  </p>
                  <div className="flex items-center gap-3 flex-wrap mb-6">
                    {["AI戦略策定", "データ分析", "業務自動化", "生成AI活用"].map((tag) => (
                      <span key={tag} className="text-xs text-gray-500 border border-gray-200 rounded px-2.5 py-1">{tag}</span>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-700 transition-colors">
                    詳しく見る →
                  </span>
                </div>
              </Link>
            </Reveal>

            <Reveal delay={80} className="h-full">
              <Link href="/contact?inquiry=advisor" className="group block h-full">
                <div className="bg-white border border-gray-200 rounded-2xl p-8 lg:p-10 hover:border-indigo-300 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  <span className="inline-block text-xs font-semibold tracking-widest uppercase text-indigo-600 mb-4">Service 02</span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">AI顧問 ＋ ウェブサイト監修</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-1">
                    経営に寄り添う外部AI顧問として月次で伴走。あわせて自社ウェブサイトのAI監修・改善提案も担います。業務委託契約ベースで、複数社の顧問先を募集中です。
                  </p>
                  <div className="flex items-center gap-3 flex-wrap mb-6">
                    {["AI顧問契約", "ウェブサイト監修", "月次壁打ち", "業務委託"].map((tag) => (
                      <span key={tag} className="text-xs text-gray-500 border border-gray-200 rounded px-2.5 py-1">{tag}</span>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500 mb-4 border-t border-gray-100 pt-4">
                    <span className="font-semibold text-gray-700">顧問先:</span> 日本アセット戦略機構
                  </div>
                  <span className="text-sm font-semibold text-indigo-600 group-hover:text-indigo-700 transition-colors">
                    顧問契約のご相談 →
                  </span>
                </div>
              </Link>
            </Reveal>

            <Reveal delay={160} className="h-full">
              <Link href="/ai-agriculture" className="group block h-full">
                <div className="bg-white border border-gray-200 rounded-2xl p-8 lg:p-10 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  <span className="inline-block text-xs font-semibold tracking-widest uppercase text-emerald-600 mb-4">Service 03</span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">農業×エンジニアリング</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-1">
                    エンジニアが農家の経営を支える。EC構築・利益率改善・業務効率化で、農業の「稼ぐ力」を引き上げます。
                  </p>
                  <div className="flex items-center gap-3 flex-wrap mb-6">
                    {["EC構築", "利益率改善", "業務効率化", "ブランディング"].map((tag) => (
                      <span key={tag} className="text-xs text-gray-500 border border-gray-200 rounded px-2.5 py-1">{tag}</span>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-emerald-600 group-hover:text-emerald-700 transition-colors">
                    詳しく見る →
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ CLIENTS / 顧問先 ═══ */}
      <section className="py-20 lg:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <Reveal>
            <SectionLabel>Advisory Clients</SectionLabel>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
              AI顧問としての、信頼の実績。
            </h2>
            <p className="text-base text-gray-500 mb-12 max-w-2xl leading-relaxed">
              業務委託契約に基づき、AI顧問 兼 ウェブサイト監修として継続的に支援している顧問先企業です。同様のスキームで、新たな顧問先を募集しています。
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="bg-white border border-gray-200 rounded-2xl p-8 lg:p-10 hover:border-indigo-300 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-6 flex-col sm:flex-row">
                <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white font-bold text-2xl">
                  日
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xs font-semibold text-indigo-600 tracking-widest uppercase">Client 01</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-medium">業務委託 継続中</span>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">日本アセット戦略機構</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    AI顧問 兼 ウェブサイト監修として、業務委託契約に基づき継続的に伴走支援。事業のAI活用方針づくりから、ウェブサイトの品質監修・改善提案まで一体で担当しています。
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {["AI顧問契約", "ウェブサイト監修", "月次伴走"].map((tag) => (
                      <span key={tag} className="text-xs text-gray-600 bg-gray-100 rounded px-2.5 py-1">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-10 text-center">
              <p className="text-sm text-gray-600 mb-5">
                同様の業務委託スキームで、新たな顧問先企業を募集しています。
              </p>
              <Link href="/contact?inquiry=advisor" className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
                AI顧問契約のご相談
                <span>→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ APPROACH ═══ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <Reveal>
            <SectionLabel>Our Approach</SectionLabel>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-14">
              私たちが大切にする3つのこと
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: "01", title: "正直であること", desc: "できないことはできないと言う。過度な期待を煽らず、確実に成果が出る領域から、一歩ずつ。" },
              { num: "02", title: "伴走すること", desc: "導入して終わりではなく、運用が定着するまで。お客様のチームの一員として、ともに歩みます。" },
              { num: "03", title: "技術を翻訳すること", desc: "最先端のAI技術を、ビジネスと現場の言葉に。専門知識がなくても理解できる、クリアな提案を。" },
            ].map((item, i) => (
              <Reveal key={item.num} delay={i * 80}>
                <div className="border-t-2 border-blue-600 pt-6">
                  <span className="text-xs font-semibold text-blue-600 tracking-widest">{item.num}</span>
                  <h3 className="text-lg font-bold text-gray-900 mt-2 mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TEAM / 体制 ═══ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <Reveal>
            <SectionLabel>Our Team</SectionLabel>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
              戦略から実装・運用まで、<br className="hidden sm:inline" />信頼できるプロフェッショナルが担います。
            </h2>
            <p className="text-base text-gray-500 mb-14 max-w-2xl leading-relaxed">
              経営コンサルの視座と、現場で鍛え上げたエンジニアリングの実装力。二つを掛け合わせ、提案だけで終わらせず、稼働するシステムと継続的な価値創出まで一貫して責任を持ちます。
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            <Reveal delay={0} className="h-full">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 lg:p-10 h-full flex flex-col">
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-600 mb-4">Strategy &amp; DX</span>
                <h3 className="text-xl font-bold text-gray-900 mb-4">業務改革・DX領域の監修</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-1">
                  大手コンサルティングファーム出身のメンバーが、業務改革・DX推進の設計を監修。経営課題の構造化から全社展開のロードマップまで、上流の意思決定に耐える品質でご支援します。
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  {["大手コンサルファーム出身", "業務改革", "DX戦略", "全社展開"].map((tag) => (
                    <span key={tag} className="text-xs text-gray-600 bg-white border border-gray-200 rounded px-2.5 py-1">{tag}</span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={100} className="h-full">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 lg:p-10 h-full flex flex-col">
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-emerald-600 mb-4">Engineering</span>
                <h3 className="text-xl font-bold text-gray-900 mb-4">開発・デプロイ・メンテナンス</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-1">
                  AIコンサルティング経験が豊富なエンジニア、シリコンバレーでバックエンド開発に従事した技術者、高専から筑波大学に進学し応用情報技術者を持つ情報技術者などが、ウェブアプリケーションの開発・デプロイ・運用保守を担当。リリース後の信頼性の担保まで一貫して責任を持ちます。
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  {["AIコンサル経験豊富", "シリコンバレー開発経験", "高専→筑波大学", "応用情報技術者"].map((tag) => (
                    <span key={tag} className="text-xs text-gray-600 bg-white border border-gray-200 rounded px-2.5 py-1">{tag}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ TECH STACK ═══ */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <Reveal>
            <SectionLabel>Tech Stack</SectionLabel>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">使用技術</h2>
            <p className="text-base text-gray-500 max-w-xl leading-relaxed mb-14">
              中小企業でも安心して導入できるよう、実績・安定性・サポート体制が確立された技術のみを採用しています。
            </p>
          </Reveal>
          <div className="space-y-0">
            {[
              { category: "Frontend", label: "フロントエンド", items: [
                { name: "Next.js", icon: "logos:nextjs-icon" },
                { name: "React", icon: "logos:react" },
                { name: "TypeScript", icon: "logos:typescript-icon" },
                { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
                { name: "Vite", icon: "logos:vitejs" },
              ]},
              { category: "Backend", label: "バックエンド", items: [
                { name: "Python", icon: "logos:python" },
                { name: "Node.js", icon: "logos:nodejs-icon" },
                { name: "FastAPI", icon: "logos:fastapi-icon" },
                { name: "Go", icon: "simple-icons:go", color: "00ADD8" },
                { name: "Rails", icon: "simple-icons:rubyonrails", color: "D30001" },
              ]},
              { category: "AI / ML", label: "AI・機械学習", items: [
                { name: "Claude", icon: "simple-icons:anthropic", color: "D97757" },
                { name: "OpenAI", icon: "simple-icons:openai", color: "000000" },
                { name: "Gemini", icon: "simple-icons:googlegemini", color: "8E75B2" },
                { name: "PyTorch", icon: "logos:pytorch-icon" },
                { name: "LangChain", icon: "simple-icons:langchain", color: "1C3C3C" },
              ]},
              { category: "Database", label: "データベース", items: [
                { name: "PostgreSQL", icon: "logos:postgresql" },
                { name: "MySQL", icon: "logos:mysql-icon" },
                { name: "Redis", icon: "logos:redis" },
                { name: "Supabase", icon: "logos:supabase-icon" },
                { name: "Firebase", icon: "logos:firebase-icon" },
              ]},
              { category: "Cloud", label: "クラウド・インフラ", items: [
                { name: "AWS", icon: "logos:aws" },
                { name: "Google Cloud", icon: "logos:google-cloud" },
                { name: "Vercel", icon: "logos:vercel-icon" },
                { name: "Cloudflare", icon: "logos:cloudflare-icon" },
                { name: "Docker", icon: "logos:docker-icon" },
              ]},
              { category: "EC / Commerce", label: "EC・決済", items: [
                { name: "Shopify", icon: "logos:shopify" },
                { name: "Stripe", icon: "simple-icons:stripe", color: "635BFF" },
                { name: "Square", icon: "simple-icons:square", color: "000000" },
                { name: "WooCommerce", icon: "logos:woocommerce-icon" },
                { name: "Amazon Pay", icon: "simple-icons:amazonpay", color: "FF9900" },
              ]},
              { category: "DevOps", label: "DevOps・運用", items: [
                { name: "GitHub", icon: "logos:github-icon" },
                { name: "Actions", icon: "logos:github-actions" },
                { name: "Terraform", icon: "logos:terraform-icon" },
                { name: "Datadog", icon: "logos:datadog-icon" },
                { name: "Sentry", icon: "logos:sentry-icon" },
              ]},
              { category: "Data / Analytics", label: "データ基盤・分析", items: [
                { name: "Snowflake", icon: "logos:snowflake-icon" },
                { name: "BigQuery", icon: "simple-icons:googlebigquery", color: "669DF6" },
                { name: "Databricks", icon: "simple-icons:databricks", color: "FF3621" },
                { name: "Kafka", icon: "logos:kafka-icon" },
                { name: "Elasticsearch", icon: "logos:elasticsearch" },
              ]},
              { category: "Enterprise / Security", label: "エンタープライズ・セキュリティ", items: [
                { name: "Azure", icon: "logos:microsoft-azure" },
                { name: "Kubernetes", icon: "logos:kubernetes" },
                { name: "Auth0", icon: "logos:auth0-icon" },
                { name: "Okta", icon: "simple-icons:okta", color: "007DC1" },
                { name: "Vault", icon: "logos:vault-icon" },
              ]},
              { category: "Business Integrations", label: "業務連携・コラボレーション", items: [
                { name: "Salesforce", icon: "logos:salesforce" },
                { name: "Slack", icon: "logos:slack-icon" },
                { name: "Microsoft 365", icon: "logos:microsoft-icon" },
                { name: "Notion", icon: "logos:notion-icon" },
                { name: "Jira", icon: "logos:jira" },
              ]},
            ].map((group, gi) => (
              <Reveal key={group.category} delay={gi * 40}>
                <div className="border-t border-gray-200 py-8">
                  <div className="grid lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-2">
                      <p className="text-[10px] font-semibold tracking-widest text-blue-600 uppercase">{group.category}</p>
                      <h3 className="text-sm font-bold text-gray-900 mt-0.5">{group.label}</h3>
                    </div>
                    <div className="lg:col-span-10">
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                        {group.items.map((tech) => (
                          <div key={tech.name} className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col items-center justify-center gap-3 hover:border-gray-300 hover:shadow-sm transition-all aspect-square">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={`https://api.iconify.design/${tech.icon}.svg${tech.color ? `?color=%23${tech.color}` : ''}`} alt={tech.name} className="w-8 h-8 object-contain" loading="lazy" />
                            <p className="text-xs font-medium text-gray-600 text-center leading-tight">{tech.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ NEWS / BLOG ═══ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-12">
            <div>
              <SectionLabel>News</SectionLabel>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">お知らせ</h2>
            </div>
            <Link href="/blog" className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
              一覧を見る →
            </Link>
          </div>
          {newsSlot}
          <div className="text-center mt-8 sm:hidden">
            <Link href="/blog" className="text-sm font-semibold text-blue-600">一覧を見る →</Link>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <SectionLabel>Contact</SectionLabel>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
              まずは、お話しませんか。
            </h2>
            <p className="text-base text-gray-600 leading-relaxed mb-10 max-w-lg mx-auto">
              AIのことがわからなくても、ECが初めてでも大丈夫です。<br />貴社・貴農園の状況に合わせて、一緒に考えます。
            </p>
            <Link href="/contact" className="inline-block text-sm font-semibold text-white bg-blue-600 px-10 py-4 rounded-lg hover:bg-blue-700 transition-colors duration-300">
              お問い合わせ
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { blogPosts } from "@/lib/blog-data";

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

export default function HomePage() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setHeroLoaded(true), 100); }, []);

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <video src="/videos/hero.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0" />
        <div className="absolute inset-0 bg-white/60 z-[1]" />
        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-8 transition-all duration-700" style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "200ms" }}>
            AI Consulting &amp; Agriculture Engineering
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 transition-all duration-700" style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(24px)", transitionDelay: "400ms" }}>
            AIで、すべてを<br />クリアにする。
          </h1>
          <p className="text-base lg:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto mb-10 transition-all duration-700" style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "600ms" }}>
            AIコンサルティングと、エンジニアによる農業支援。<br />2つの事業で、日本の産業に確かな価値を届けます。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700" style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "800ms" }}>
            <Link href="/contact" className="text-sm font-semibold text-white bg-blue-600 px-8 py-3.5 rounded-lg hover:bg-blue-700 transition-colors duration-300">
              お問い合わせ
            </Link>
            <Link href="#services" className="text-sm font-semibold text-gray-600 border border-gray-300 px-8 py-3.5 rounded-lg hover:border-gray-400 hover:text-gray-900 transition-colors duration-300">
              事業を見る
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ TRUST METRICS ═══ */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              {[
                { value: "2事業", label: "展開中" },
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
                    <p className="text-2xl font-bold text-gray-900">2<span className="text-sm text-gray-400 ml-1 font-normal">事業</span></p>
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
              2つの事業で、日本の未来をつくる。
            </h2>
            <p className="text-base text-gray-500 mb-14 max-w-lg leading-relaxed">
              企業のAI活用と、エンジニアによる農業支援。それぞれの現場に寄り添い、確実に成果を届けます。
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Reveal delay={0}>
              <Link href="/ai-consulting" className="group block">
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

            <Reveal delay={100}>
              <Link href="/ai-agriculture" className="group block">
                <div className="bg-white border border-gray-200 rounded-2xl p-8 lg:p-10 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  <span className="inline-block text-xs font-semibold tracking-widest uppercase text-emerald-600 mb-4">Service 02</span>
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
                { name: "Next.js", slug: "nextdotjs" },
                { name: "React", slug: "react" },
                { name: "TypeScript", slug: "typescript" },
                { name: "Tailwind CSS", slug: "tailwindcss" },
                { name: "Vite", slug: "vite" },
              ]},
              { category: "Backend", label: "バックエンド", items: [
                { name: "Python", slug: "python" },
                { name: "Node.js", slug: "nodedotjs" },
                { name: "FastAPI", slug: "fastapi" },
                { name: "Go", slug: "go" },
                { name: "Rails", slug: "rubyonrails" },
              ]},
              { category: "AI / ML", label: "AI・機械学習", items: [
                { name: "Claude", slug: "anthropic" },
                { name: "OpenAI", slug: "openai" },
                { name: "Gemini", slug: "googlegemini" },
                { name: "PyTorch", slug: "pytorch" },
                { name: "LangChain", slug: "langchain" },
              ]},
              { category: "Database", label: "データベース", items: [
                { name: "PostgreSQL", slug: "postgresql" },
                { name: "MySQL", slug: "mysql" },
                { name: "Redis", slug: "redis" },
                { name: "Supabase", slug: "supabase" },
                { name: "Firebase", slug: "firebase" },
              ]},
              { category: "Cloud", label: "クラウド・インフラ", items: [
                { name: "AWS", slug: "amazonwebservices" },
                { name: "Google Cloud", slug: "googlecloud" },
                { name: "Vercel", slug: "vercel" },
                { name: "Cloudflare", slug: "cloudflare" },
                { name: "Docker", slug: "docker" },
              ]},
              { category: "EC / Commerce", label: "EC・決済", items: [
                { name: "Shopify", slug: "shopify" },
                { name: "Stripe", slug: "stripe" },
                { name: "Square", slug: "square" },
                { name: "WooCommerce", slug: "woocommerce" },
                { name: "Amazon Pay", slug: "amazonpay" },
              ]},
              { category: "DevOps", label: "DevOps・運用", items: [
                { name: "GitHub", slug: "github" },
                { name: "Actions", slug: "githubactions" },
                { name: "Terraform", slug: "terraform" },
                { name: "Datadog", slug: "datadog" },
                { name: "Sentry", slug: "sentry" },
              ]},
            ].map((group, gi) => (
              <Reveal key={group.category} delay={gi * 40}>
                <div className="border-t border-gray-200 py-7">
                  <div className="grid lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-2">
                      <p className="text-[10px] font-semibold tracking-widest text-blue-600 uppercase">{group.category}</p>
                      <h3 className="text-sm font-bold text-gray-900 mt-0.5">{group.label}</h3>
                    </div>
                    <div className="lg:col-span-10">
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                        {group.items.map((tech) => (
                          <div key={tech.name} className="bg-white border border-gray-200 rounded-lg py-3.5 px-4 flex items-center gap-3 hover:border-gray-300 transition-colors">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={`https://cdn.simpleicons.org/${tech.slug}`} alt={tech.name} className="w-5 h-5 object-contain flex-shrink-0" loading="lazy" />
                            <p className="text-sm font-medium text-gray-700">{tech.name}</p>
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
          <Reveal>
            <div className="flex items-end justify-between mb-12">
              <div>
                <SectionLabel>News</SectionLabel>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">お知らせ</h2>
              </div>
              <Link href="/blog" className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                一覧を見る →
              </Link>
            </div>
          </Reveal>
          <div className="divide-y divide-gray-100">
            {blogPosts.slice(0, 5).map((post, i) => (
              <Reveal key={post.slug} delay={i * 60}>
                <Link href={`/blog/${post.slug}`} className="group flex items-start gap-4 py-5 hover:bg-gray-50 -mx-4 px-4 rounded-lg transition-colors">
                  <span className="text-xs text-gray-400 font-medium whitespace-nowrap pt-0.5">{post.date}</span>
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded whitespace-nowrap">{post.category}</span>
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors leading-relaxed">
                    {post.title}
                  </h3>
                </Link>
              </Reveal>
            ))}
          </div>
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

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { blogPosts } from "@/lib/blog-data";

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-5xl lg:text-6xl font-bold text-white">
      {count.toLocaleString()}
      <span className="text-2xl lg:text-3xl text-accent-light">{suffix}</span>
    </div>
  );
}

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

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy-950">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs text-gray-400 tracking-wide">AIで、ビジネスの可能性を拡張する</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6 tracking-tight">
            テクノロジーの力で、
            <br />
            <span className="bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent">
              未来を切り拓く。
            </span>
          </h1>

          <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            clear AIは、AI導入支援とAI面接プラットフォーム「導」で、
            企業の変革と成長を加速させます。
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-full text-base font-medium transition-all hover:shadow-lg hover:shadow-accent/25"
            >
              AI導入を相談する
            </Link>
            <Link
              href="#services"
              className="w-full sm:w-auto border border-white/20 text-white px-8 py-4 rounded-full text-base font-medium hover:bg-white/5 transition-all"
            >
              事業を見る
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] text-gray-500 tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-gray-500 to-transparent" />
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16 lg:mb-20">
              <span className="text-xs font-semibold text-accent tracking-widest uppercase mb-3 block">Our Services</span>
              <h2 className="text-3xl lg:text-5xl font-bold text-navy-950 tracking-tight">2つの事業で、<br className="sm:hidden" />AIの力を届ける</h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* AI導入支援 */}
            <FadeIn delay={100}>
              <Link href="/ai-consulting" className="group block">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-950 to-navy-800 p-8 lg:p-12 min-h-[400px] flex flex-col justify-between transition-transform hover:scale-[1.02]">
                  <div>
                    <span className="inline-block text-xs font-semibold text-accent tracking-widest uppercase mb-4">Service 01</span>
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">AI導入支援</h3>
                    <p className="text-gray-400 text-sm lg:text-base leading-relaxed max-w-md">
                      戦略策定から実装・運用まで。貴社のビジネスに最適なAIソリューションを提案し、確実な成果創出を支援します。
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-accent text-sm font-medium mt-8">
                    詳しく見る
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                  {/* Decorative */}
                  <div className="absolute top-8 right-8 w-24 h-24 border border-white/5 rounded-2xl rotate-12" />
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/5 rounded-full blur-2xl" />
                </div>
              </Link>
            </FadeIn>

            {/* 導（みちびき） */}
            <FadeIn delay={200}>
              <Link href="/michibiki" className="group block">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent to-accent-dark p-8 lg:p-12 min-h-[400px] flex flex-col justify-between transition-transform hover:scale-[1.02]">
                  <div>
                    <span className="inline-block text-xs font-semibold text-white/60 tracking-widest uppercase mb-4">Service 02</span>
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                      導<span className="text-lg font-normal ml-2 text-white/70">（みちびき）</span>
                    </h3>
                    <p className="text-white/70 text-sm lg:text-base leading-relaxed max-w-md">
                      AI面接プラットフォーム。構造化されたAI面接で候補者のスキルを客観的に評価し、最適な人材マッチングを実現します。
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-white text-sm font-medium mt-8">
                    詳しく見る
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                  {/* Decorative */}
                  <div className="absolute top-8 right-8 w-24 h-24 border border-white/10 rounded-2xl -rotate-12" />
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
                </div>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 lg:py-32 bg-navy-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-xs font-semibold text-accent tracking-widest uppercase mb-3 block">Performance</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">数字で見る、clear AIの実績</h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: 200, suffix: "社+", label: "導入企業数" },
              { value: 70, suffix: "%", label: "平均コスト削減率" },
              { value: 50000, suffix: "+", label: "AI面接実施数" },
              { value: 98, suffix: "%", label: "顧客満足度" },
            ].map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 100}>
                <div className="text-center">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                  <p className="text-sm text-gray-400 mt-2">{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why clear AI */}
      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16 lg:mb-20">
              <span className="text-xs font-semibold text-accent tracking-widest uppercase mb-3 block">Why clear AI</span>
              <h2 className="text-3xl lg:text-5xl font-bold text-navy-950 tracking-tight">選ばれる理由</h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                title: "最先端のAI技術",
                desc: "GPT-4をはじめとする最新のAIモデルを活用し、貴社のビジネスに最適なソリューションを提供します。",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                title: "伴走型のサポート",
                desc: "導入して終わりではなく、運用定着まで寄り添うコンサルティングで確実な成果を創出します。",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                title: "実証済みの成果",
                desc: "200社以上の導入実績と98%の顧客満足度。データに基づく確かな効果を実証しています。",
              },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 100}>
                <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-accent/20 hover:shadow-lg transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-accent/5 text-accent flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-all">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-navy-950 mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-end justify-between mb-12 lg:mb-16">
              <div>
                <span className="text-xs font-semibold text-accent tracking-widest uppercase mb-3 block">Blog</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-navy-950 tracking-tight">最新の記事</h2>
              </div>
              <Link href="/blog" className="hidden sm:flex items-center gap-2 text-sm text-accent font-medium hover:underline">
                すべての記事
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post, i) => (
              <FadeIn key={post.slug} delay={i * 100}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="aspect-[16/9] rounded-2xl mb-4 overflow-hidden" style={{ backgroundColor: post.thumbnail }}>
                    <div className="w-full h-full flex items-center justify-center text-white/30 group-hover:scale-105 transition-transform duration-500">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-semibold text-accent bg-accent/5 px-2 py-0.5 rounded-full">{post.category}</span>
                    <span className="text-[10px] text-gray-400">{post.date}</span>
                  </div>
                  <h3 className="text-base font-semibold text-navy-950 group-hover:text-accent transition-colors leading-relaxed mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
                </Link>
              </FadeIn>
            ))}
          </div>

          <div className="text-center mt-10 sm:hidden">
            <Link href="/blog" className="text-sm text-accent font-medium">
              すべての記事を見る →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-navy-950 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
              AIの導入、まずは
              <br />
              <span className="text-accent-light">無料相談</span>から。
            </h2>
            <p className="text-gray-400 text-base lg:text-lg mb-10 leading-relaxed">
              「AIで何ができるか分からない」「導入に不安がある」<br className="hidden sm:block" />
              そんな方も、まずはお気軽にご相談ください。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto bg-accent hover:bg-accent-dark text-white px-10 py-4 rounded-full text-base font-medium transition-all hover:shadow-lg hover:shadow-accent/25"
              >
                無料で相談する
              </Link>
              <Link
                href="https://www.michibiki.tech"
                target="_blank"
                className="w-full sm:w-auto border border-white/20 text-white px-10 py-4 rounded-full text-base font-medium hover:bg-white/5 transition-all"
              >
                導のサイトを見る
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

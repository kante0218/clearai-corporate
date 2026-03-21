"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { blogPosts } from "@/lib/blog-data";

/* ─── Scroll-triggered reveal ─── */
function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); } },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Section label ─── */
function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-sm font-semibold text-indigo-600 mb-4">
      {children}
    </p>
  );
}

export default function HomePage() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setHeroLoaded(true), 100); return () => clearTimeout(t); }, []);

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
        {/* Subtle gradient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-indigo-500 opacity-[0.05] blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-400 opacity-[0.04] blur-[100px]" />
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-3xl mx-auto px-6 text-center">
          <p
            className="text-sm font-semibold text-indigo-600 mb-8 transition-all duration-700"
            style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(20px)", transitionDelay: "200ms" }}
          >
            Artificial Intelligence × Business
          </p>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 transition-all duration-700"
            style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(30px)", transitionDelay: "400ms" }}
          >
            AIで、すべてを
            <br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">クリアにする。</span>
          </h1>

          <p
            className="text-base text-gray-600 leading-relaxed max-w-lg mx-auto mb-10 transition-all duration-700"
            style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(30px)", transitionDelay: "600ms" }}
          >
            AI導入支援とAI面接プラットフォーム「導」。
            <br />
            2つの事業で、企業の未来を明瞭にします。
          </p>

          <div
            className="flex items-center justify-center gap-4 transition-all duration-700"
            style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(20px)", transitionDelay: "800ms" }}
          >
            <Link
              href="/contact"
              className="text-sm font-semibold text-white bg-indigo-600 px-8 py-3.5 rounded-xl hover:bg-indigo-700 transition-colors duration-300"
            >
              AI導入を相談する
            </Link>
            <Link
              href="#services"
              className="text-sm font-semibold text-gray-700 border border-gray-200 px-8 py-3.5 rounded-xl hover:border-gray-400 hover:text-gray-900 transition-colors duration-300"
            >
              事業を見る
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section id="services" className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <SectionLabel>Our Services</SectionLabel>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-12">
              2つの事業で、
              <br />
              AIの力を届ける。
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 導（みちびき） */}
            <Reveal delay={100}>
              <Link href="/michibiki" className="group block">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 p-8 lg:p-10 min-h-[320px] flex flex-col justify-end group-hover:shadow-xl transition-shadow duration-300">
                  <p className="text-sm font-semibold text-white/60 mb-3">Service 01</p>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                    導<span className="text-base font-normal ml-2 text-white/60">みちびき</span>
                  </h3>
                  <p className="text-base text-white/80 leading-relaxed max-w-sm">
                    AI面接プラットフォーム。構造化された面接で、最適な採用を実現する。
                  </p>
                  <div className="flex items-center gap-2 mt-6 text-white/60 text-sm font-semibold group-hover:text-white transition-colors duration-300">
                    <span>詳しく見る</span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </div>
                </div>
              </Link>
            </Reveal>

            {/* AI導入支援 */}
            <Reveal delay={200}>
              <Link href="/ai-consulting" className="group block">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 p-8 lg:p-10 min-h-[320px] flex flex-col justify-end group-hover:shadow-xl transition-shadow duration-300">
                  <p className="text-sm font-semibold text-white/60 mb-3">Service 02</p>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">AI導入支援</h3>
                  <p className="text-base text-white/80 leading-relaxed max-w-sm">
                    戦略策定から実装・運用まで。貴社に最適なAIソリューションを、ともに。
                  </p>
                  <div className="flex items-center gap-2 mt-6 text-white/60 text-sm font-semibold group-hover:text-white transition-colors duration-300">
                    <span>詳しく見る</span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ PHILOSOPHY ═══ */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <SectionLabel>Philosophy</SectionLabel>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
                AIはまだ、多くの企業にとって
                <br />
                遠い存在です。
              </h2>
              <p className="text-base text-gray-600 leading-relaxed">
                私たちは、そのギャップを埋めるために生まれました。
                <br />
                難しいAI技術を、わかりやすく、使いやすく。
                <br />
                まだ始まったばかりですが、一社一社に寄り添い、
                <br />
                丁寧にAIの価値を届けていきます。
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ APPROACH ═══ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <SectionLabel>Our Approach</SectionLabel>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-12">
              私たちが大切にすること
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                title: "正直であること",
                desc: "できないことはできないと言う。過度な期待を煽らず、確実に成果が出る領域から、一歩ずつ。",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                ),
              },
              {
                num: "02",
                title: "伴走すること",
                desc: "導入して終わりではなく、運用が定着するまで。お客様のチームの一員として、ともに歩みます。",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                  </svg>
                ),
              },
              {
                num: "03",
                title: "技術を翻訳すること",
                desc: "最先端のAI技術を、ビジネスの言葉に。専門知識がなくても理解できる、クリアな提案を。",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <Reveal key={item.num} delay={i * 150}>
                <div className="border border-gray-200 rounded-2xl p-8 lg:p-10 hover:shadow-lg transition-shadow duration-300">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5">
                    {item.icon}
                  </div>
                  <span className="text-sm font-semibold text-indigo-600">{item.num}</span>
                  <h3 className="text-lg font-bold text-gray-900 mt-2 mb-4">{item.title}</h3>
                  <p className="text-base text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STATUS ═══ */}
      <section className="py-20 lg:py-28 bg-indigo-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <SectionLabel>Current Status</SectionLabel>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                まだ始まったばかりです。
                <br />
                <span className="text-gray-500">だからこそ、全力で。</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: "導入企業", value: "1", suffix: "社" },
              { label: "AI面接実施数", value: "—", suffix: "" },
              { label: "創業", value: "2025", suffix: "年" },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 100}>
                <div className="text-center bg-white rounded-2xl py-10 lg:py-14">
                  <p className="text-4xl lg:text-5xl font-bold text-gray-900">
                    {stat.value}<span className="text-lg font-semibold text-gray-400 ml-1">{stat.suffix}</span>
                  </p>
                  <p className="text-sm text-gray-600 mt-3 font-medium">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BLOG ═══ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="flex items-end justify-between mb-12">
              <div>
                <SectionLabel>Blog</SectionLabel>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">最新の記事</h2>
              </div>
              <Link href="/blog" className="hidden sm:block text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors duration-300">
                すべての記事 →
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {blogPosts.slice(0, 3).map((post, i) => (
              <Reveal key={post.slug} delay={i * 100}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div
                    className="aspect-[16/10] mb-4 overflow-hidden rounded-2xl"
                    style={{ backgroundColor: post.thumbnail }}
                  >
                    <div className="w-full h-full group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-medium text-indigo-600">{post.category}</span>
                    <span className="text-xs text-gray-300">|</span>
                    <span className="text-xs text-gray-500">{post.date}</span>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 leading-relaxed group-hover:text-indigo-600 transition-colors duration-300">
                    {post.title}
                  </h3>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="text-center mt-10 sm:hidden">
            <Link href="/blog" className="text-sm font-semibold text-indigo-600">
              すべての記事 →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-indigo-600 to-purple-700">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Reveal>
            <p className="text-sm font-semibold text-indigo-200 mb-4">Contact</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-6">
              まずは、お話しませんか。
            </h2>
            <p className="text-base text-indigo-100 leading-relaxed mb-10">
              AIのことがわからなくても大丈夫です。
              <br />
              貴社の状況に合わせて、一緒に考えます。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="text-sm font-semibold text-indigo-600 bg-white px-10 py-4 rounded-xl hover:bg-indigo-50 transition-colors duration-300"
              >
                無料で相談する
              </Link>
              <a
                href="https://www.michibiki.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-white/80 hover:text-white transition-colors duration-300"
              >
                導のサイトを見る →
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

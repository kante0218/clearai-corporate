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
        transform: visible ? "translateY(0)" : "translateY(50px)",
        transition: `opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Section label ─── */
function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] tracking-[0.25em] uppercase text-gray-400 mb-6 font-medium">
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
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
        {/* Subtle purple gradient orb */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 transition-transform duration-[2s] ease-out"
            style={{
              transform: heroLoaded ? "scale(1)" : "scale(1.1)",
            }}
          />
          <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-[#7c3aed] opacity-[0.04] blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#a78bfa] opacity-[0.03] blur-[100px]" />
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-[900px] mx-auto px-8 text-center">
          <p
            className="text-[12px] tracking-[0.3em] uppercase text-gray-400 mb-10 transition-all duration-1000"
            style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(20px)", transitionDelay: "300ms" }}
          >
            Artificial Intelligence × Business
          </p>

          <h1
            className="text-[clamp(2rem,5vw,4rem)] font-extralight text-gray-900 leading-[1.4] tracking-[0.04em] mb-8 transition-all duration-1000"
            style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(30px)", transitionDelay: "500ms" }}
          >
            AIで、すべてを
            <br />
            <span className="font-light">クリアにする。</span>
          </h1>

          <p
            className="text-[14px] text-gray-500 leading-[2.2] max-w-lg mx-auto mb-14 font-light tracking-wide transition-all duration-1000"
            style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(30px)", transitionDelay: "700ms" }}
          >
            AI導入支援とAI面接プラットフォーム「導」。
            <br />
            2つの事業で、企業の未来を明瞭にします。
          </p>

          <div
            className="flex items-center justify-center gap-6 transition-all duration-1000"
            style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(20px)", transitionDelay: "900ms" }}
          >
            <Link
              href="/contact"
              className="text-[12px] tracking-[0.1em] text-white bg-[#7c3aed] px-8 py-3.5 hover:bg-[#6d28d9] transition-all duration-500"
            >
              AI導入を相談する
            </Link>
            <Link
              href="#services"
              className="text-[12px] tracking-[0.1em] text-gray-500 border border-gray-300 px-8 py-3.5 hover:text-gray-900 hover:border-gray-900 transition-all duration-300"
            >
              事業を見る →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section id="services" className="py-32 lg:py-44 bg-white">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <Reveal>
            <SectionLabel>Our Services</SectionLabel>
            <h2 className="text-[clamp(1.5rem,3.5vw,2.8rem)] font-extralight text-gray-900 leading-[1.5] tracking-[0.02em] mb-20 max-w-xl">
              2つの事業で、
              <br />
              AIの力を届ける。
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* 導（みちびき） - メイン事業 */}
            <Reveal delay={100}>
              <Link href="/michibiki" className="group block">
                <div className="relative aspect-[4/3] lg:aspect-[3/2] overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed] to-[#6d28d9] group-hover:scale-[1.03] transition-transform duration-700" />
                  <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12 z-10">
                    <p className="text-[11px] tracking-[0.2em] uppercase text-white/50 mb-3">Service 01</p>
                    <h3 className="text-2xl lg:text-3xl font-extralight text-white tracking-[0.02em] mb-3">
                      導<span className="text-base ml-2 text-white/60">みちびき</span>
                    </h3>
                    <p className="text-[13px] text-white/70 leading-[2] max-w-sm font-light">
                      AI面接プラットフォーム。<br />構造化された面接で、最適な採用を実現する。
                    </p>
                    <div className="flex items-center gap-2 mt-6 text-white/60 text-[12px] tracking-wide group-hover:text-white transition-colors duration-500">
                      <span>詳しく見る</span>
                      <span className="group-hover:translate-x-2 transition-transform duration-500">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>

            {/* AI導入支援 */}
            <Reveal delay={200}>
              <Link href="/ai-consulting" className="group block">
                <div className="relative aspect-[4/3] lg:aspect-[3/2] overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] group-hover:scale-[1.03] transition-transform duration-700" />
                  <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12 z-10">
                    <p className="text-[11px] tracking-[0.2em] uppercase text-white/50 mb-3">Service 02</p>
                    <h3 className="text-2xl lg:text-3xl font-extralight text-white tracking-[0.02em] mb-3">AI導入支援</h3>
                    <p className="text-[13px] text-white/70 leading-[2] max-w-sm font-light">
                      戦略策定から実装・運用まで。<br />貴社に最適なAIソリューションを、ともに。
                    </p>
                    <div className="flex items-center gap-2 mt-6 text-white/60 text-[12px] tracking-wide group-hover:text-white transition-colors duration-500">
                      <span>詳しく見る</span>
                      <span className="group-hover:translate-x-2 transition-transform duration-500">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ PHILOSOPHY ═══ */}
      <section className="py-32 lg:py-44 bg-[#f9fafb]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <SectionLabel>Philosophy</SectionLabel>
              <h2 className="text-[clamp(1.3rem,2.5vw,2rem)] font-extralight text-gray-900 leading-[2] tracking-[0.04em] mb-8">
                AIはまだ、多くの企業にとって
                <br />
                遠い存在です。
              </h2>
              <p className="text-[14px] text-gray-500 leading-[2.4] font-light">
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
      <section className="py-32 lg:py-44 bg-white">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <Reveal>
            <SectionLabel>Our Approach</SectionLabel>
            <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-extralight text-gray-900 leading-[1.5] tracking-[0.02em] mb-20 max-w-lg">
              私たちが大切にすること
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200">
            {[
              {
                num: "01",
                title: "正直であること",
                desc: "できないことはできないと言う。過度な期待を煽らず、確実に成果が出る領域から、一歩ずつ。",
              },
              {
                num: "02",
                title: "伴走すること",
                desc: "導入して終わりではなく、運用が定着するまで。お客様のチームの一員として、ともに歩みます。",
              },
              {
                num: "03",
                title: "技術を翻訳すること",
                desc: "最先端のAI技術を、ビジネスの言葉に。専門知識がなくても理解できる、クリアな提案を。",
              },
            ].map((item, i) => (
              <Reveal key={item.num} delay={i * 150}>
                <div className="bg-white p-10 lg:p-14">
                  <span className="text-[11px] tracking-[0.2em] text-gray-400 font-medium">{item.num}</span>
                  <h3 className="text-lg font-light text-gray-900 mt-4 mb-5 tracking-[0.02em]">{item.title}</h3>
                  <p className="text-[13px] text-gray-500 leading-[2.2] font-light">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STATUS ═══ */}
      <section className="py-32 lg:py-44 bg-[#f3f4f6]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <Reveal>
            <div className="text-center mb-20">
              <SectionLabel>Current Status</SectionLabel>
              <h2 className="text-[clamp(1.3rem,2.5vw,2rem)] font-extralight text-gray-900 leading-[1.6] tracking-[0.04em]">
                まだ始まったばかりです。
                <br />
                <span className="text-gray-400">だからこそ、全力で。</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px">
            {[
              { label: "導入企業", value: "1", suffix: "社" },
              { label: "AI面接実施数", value: "—", suffix: "" },
              { label: "創業", value: "2025", suffix: "年" },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 100}>
                <div className="text-center py-12 lg:py-16">
                  <p className="text-[clamp(2rem,5vw,3.5rem)] font-extralight text-gray-900 tracking-[0.02em]">
                    {stat.value}<span className="text-lg text-gray-400 ml-1">{stat.suffix}</span>
                  </p>
                  <p className="text-[12px] text-gray-500 tracking-[0.1em] mt-3">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BLOG ═══ */}
      <section className="py-32 lg:py-44 bg-white">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <Reveal>
            <div className="flex items-end justify-between mb-16">
              <div>
                <SectionLabel>Blog</SectionLabel>
                <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-extralight text-gray-900 tracking-[0.02em]">最新の記事</h2>
              </div>
              <Link href="/blog" className="hidden sm:block text-[12px] text-gray-400 tracking-[0.1em] hover:text-gray-900 transition-colors duration-300">
                すべての記事 →
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {blogPosts.slice(0, 3).map((post, i) => (
              <Reveal key={post.slug} delay={i * 100}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div
                    className="aspect-[16/10] mb-5 overflow-hidden rounded-lg"
                    style={{ backgroundColor: post.thumbnail }}
                  >
                    <div className="w-full h-full group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] tracking-[0.1em] text-gray-400">{post.category}</span>
                    <span className="text-[10px] text-gray-300">|</span>
                    <span className="text-[10px] text-gray-400">{post.date}</span>
                  </div>
                  <h3 className="text-[15px] font-light text-gray-900 leading-[1.8] tracking-[0.02em] group-hover:opacity-50 transition-opacity duration-300">
                    {post.title}
                  </h3>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="text-center mt-12 sm:hidden">
            <Link href="/blog" className="text-[12px] text-gray-400 tracking-[0.1em]">
              すべての記事 →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-32 lg:py-44 bg-[#f5f3ff]">
        <div className="max-w-[700px] mx-auto px-8 text-center">
          <Reveal>
            <SectionLabel>Contact</SectionLabel>
            <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-extralight text-gray-900 leading-[1.6] tracking-[0.04em] mb-6">
              まずは、お話しませんか。
            </h2>
            <p className="text-[14px] text-gray-500 leading-[2.2] font-light mb-14">
              AIのことがわからなくても大丈夫です。
              <br />
              貴社の状況に合わせて、一緒に考えます。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="text-[12px] tracking-[0.1em] text-white bg-[#7c3aed] px-10 py-4 hover:bg-[#6d28d9] transition-all duration-500"
              >
                無料で相談する
              </Link>
              <a
                href="https://www.michibiki.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] tracking-[0.1em] text-gray-500 hover:text-gray-900 transition-colors duration-300"
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

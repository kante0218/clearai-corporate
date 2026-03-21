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
    <p className="text-[11px] tracking-[0.25em] uppercase text-black/30 mb-6 font-medium">
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
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
        {/* Background layers */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-10" />
          <div
            className="absolute inset-0 transition-transform duration-[2s] ease-out"
            style={{
              transform: heroLoaded ? "scale(1)" : "scale(1.1)",
              background: "radial-gradient(ellipse at 30% 50%, #111 0%, #0a0a0a 50%), radial-gradient(ellipse at 70% 30%, #1a1a2e 0%, transparent 50%)",
            }}
          />
          {/* Subtle floating particles */}
          <div className="absolute top-1/3 left-1/4 w-[1px] h-[1px] bg-white/20 rounded-full shadow-[0_0_80px_40px_rgba(0,102,255,0.03)]" />
          <div className="absolute bottom-1/3 right-1/3 w-[1px] h-[1px] bg-white/20 rounded-full shadow-[0_0_120px_60px_rgba(0,102,255,0.04)]" />
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-[900px] mx-auto px-8 text-center">
          <p
            className="text-[12px] tracking-[0.3em] uppercase text-white/30 mb-10 transition-all duration-1000"
            style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(20px)", transitionDelay: "300ms" }}
          >
            Artificial Intelligence × Business
          </p>

          <h1
            className="text-[clamp(2rem,5vw,4rem)] font-extralight text-white leading-[1.4] tracking-[0.04em] mb-8 transition-all duration-1000"
            style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(30px)", transitionDelay: "500ms" }}
          >
            AIで、すべてを
            <br />
            <span className="font-light">クリアにする。</span>
          </h1>

          <p
            className="text-[14px] text-white/40 leading-[2.2] max-w-lg mx-auto mb-14 font-light tracking-wide transition-all duration-1000"
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
              className="text-[12px] tracking-[0.1em] text-white bg-white/10 backdrop-blur-sm border border-white/15 px-8 py-3.5 hover:bg-white hover:text-black transition-all duration-500"
            >
              AI導入を相談する
            </Link>
            <Link
              href="#services"
              className="text-[12px] tracking-[0.1em] text-white/50 hover:text-white transition-colors duration-300"
            >
              事業を見る →
            </Link>
          </div>
        </div>

        {/* Scroll line */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-[9px] tracking-[0.3em] text-white/20 uppercase">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent origin-top animate-[lineGrow_1.5s_ease-out_1.2s_both]" />
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section id="services" className="py-32 lg:py-44 bg-white">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <Reveal>
            <SectionLabel>Our Services</SectionLabel>
            <h2 className="text-[clamp(1.5rem,3.5vw,2.8rem)] font-extralight text-black leading-[1.5] tracking-[0.02em] mb-20 max-w-xl">
              2つの事業で、
              <br />
              AIの力を届ける。
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* 導（みちびき） - メイン事業 */}
            <Reveal delay={100}>
              <Link href="/michibiki" className="group block">
                <div className="relative aspect-[4/3] lg:aspect-[3/2] bg-[#0a0a0a] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#1a1a2e] group-hover:scale-[1.03] transition-transform duration-700" />
                  <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12 z-10">
                    <p className="text-[11px] tracking-[0.2em] uppercase text-white/30 mb-3">Service 01</p>
                    <h3 className="text-2xl lg:text-3xl font-extralight text-white tracking-[0.02em] mb-3">
                      導<span className="text-base ml-2 text-white/40">みちびき</span>
                    </h3>
                    <p className="text-[13px] text-white/40 leading-[2] max-w-sm font-light">
                      AI面接プラットフォーム。<br />構造化された面接で、最適な採用を実現する。
                    </p>
                    <div className="flex items-center gap-2 mt-6 text-white/50 text-[12px] tracking-wide group-hover:text-white transition-colors duration-500">
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
                <div className="relative aspect-[4/3] lg:aspect-[3/2] bg-[#f5f5f0] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#f5f5f0] via-[#eeeee8] to-[#e8e8e0] group-hover:scale-[1.03] transition-transform duration-700" />
                  <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12 z-10">
                    <p className="text-[11px] tracking-[0.2em] uppercase text-black/25 mb-3">Service 02</p>
                    <h3 className="text-2xl lg:text-3xl font-extralight text-black tracking-[0.02em] mb-3">AI導入支援</h3>
                    <p className="text-[13px] text-black/40 leading-[2] max-w-sm font-light">
                      戦略策定から実装・運用まで。<br />貴社に最適なAIソリューションを、ともに。
                    </p>
                    <div className="flex items-center gap-2 mt-6 text-black/30 text-[12px] tracking-wide group-hover:text-black transition-colors duration-500">
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
      <section className="py-32 lg:py-44 bg-[#fafaf8]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <SectionLabel>Philosophy</SectionLabel>
              <h2 className="text-[clamp(1.3rem,2.5vw,2rem)] font-extralight text-black leading-[2] tracking-[0.04em] mb-8">
                AIはまだ、多くの企業にとって
                <br />
                遠い存在です。
              </h2>
              <p className="text-[14px] text-black/35 leading-[2.4] font-light">
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
            <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-extralight text-black leading-[1.5] tracking-[0.02em] mb-20 max-w-lg">
              私たちが大切にすること
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/5">
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
                  <span className="text-[11px] tracking-[0.2em] text-black/15 font-medium">{item.num}</span>
                  <h3 className="text-lg font-light text-black mt-4 mb-5 tracking-[0.02em]">{item.title}</h3>
                  <p className="text-[13px] text-black/35 leading-[2.2] font-light">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STATUS ═══ */}
      <section className="py-32 lg:py-44 bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <Reveal>
            <div className="text-center mb-20">
              <SectionLabel><span className="text-white/20">Current Status</span></SectionLabel>
              <h2 className="text-[clamp(1.3rem,2.5vw,2rem)] font-extralight text-white leading-[1.6] tracking-[0.04em]">
                まだ始まったばかりです。
                <br />
                <span className="text-white/30">だからこそ、全力で。</span>
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
                  <p className="text-[clamp(2rem,5vw,3.5rem)] font-extralight text-white tracking-[0.02em]">
                    {stat.value}<span className="text-lg text-white/30 ml-1">{stat.suffix}</span>
                  </p>
                  <p className="text-[12px] text-white/25 tracking-[0.1em] mt-3">{stat.label}</p>
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
                <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-extralight text-black tracking-[0.02em]">最新の記事</h2>
              </div>
              <Link href="/blog" className="hidden sm:block text-[12px] text-black/30 tracking-[0.1em] hover:text-black transition-colors duration-300">
                すべての記事 →
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {blogPosts.slice(0, 3).map((post, i) => (
              <Reveal key={post.slug} delay={i * 100}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div
                    className="aspect-[16/10] mb-5 overflow-hidden"
                    style={{ backgroundColor: post.thumbnail }}
                  >
                    <div className="w-full h-full group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] tracking-[0.1em] text-black/25">{post.category}</span>
                    <span className="text-[10px] text-black/15">|</span>
                    <span className="text-[10px] text-black/20">{post.date}</span>
                  </div>
                  <h3 className="text-[15px] font-light text-black leading-[1.8] tracking-[0.02em] group-hover:opacity-50 transition-opacity duration-300">
                    {post.title}
                  </h3>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="text-center mt-12 sm:hidden">
            <Link href="/blog" className="text-[12px] text-black/30 tracking-[0.1em]">
              すべての記事 →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-32 lg:py-44 bg-[#fafaf8]">
        <div className="max-w-[700px] mx-auto px-8 text-center">
          <Reveal>
            <SectionLabel>Contact</SectionLabel>
            <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-extralight text-black leading-[1.6] tracking-[0.04em] mb-6">
              まずは、お話しませんか。
            </h2>
            <p className="text-[14px] text-black/30 leading-[2.2] font-light mb-14">
              AIのことがわからなくても大丈夫です。
              <br />
              貴社の状況に合わせて、一緒に考えます。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="text-[12px] tracking-[0.1em] text-white bg-black px-10 py-4 hover:bg-black/80 transition-all duration-500"
              >
                無料で相談する
              </Link>
              <a
                href="https://www.michibiki.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] tracking-[0.1em] text-black/40 hover:text-black transition-colors duration-300"
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

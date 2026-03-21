"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useCallback, type ReactNode } from "react";
import { blogPosts } from "@/lib/blog-data";

/* ─── Scroll-triggered reveal with direction ─── */
function Reveal({ children, className = "", delay = 0, direction = "up" }: { children: ReactNode; className?: string; delay?: number; direction?: "up" | "left" | "right" | "scale" }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { threshold: 0.1, rootMargin: "0px 0px -60px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const transforms = { up: "translateY(40px)", left: "translateX(-40px)", right: "translateX(40px)", scale: "scale(0.95)" };
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : transforms[direction],
      transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    }}>{children}</div>
  );
}

/* ─── CountUp animation ─── */
function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const dur = 1500, steps = 40, inc = target / steps;
        let cur = 0;
        const timer = setInterval(() => { cur += inc; if (cur >= target) { setCount(target); clearInterval(timer); } else setCount(Math.floor(cur)); }, dur / steps);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ─── Floating particles ─── */
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="absolute rounded-full bg-indigo-400/10 animate-pulse"
          style={{
            width: `${20 + i * 15}px`, height: `${20 + i * 15}px`,
            left: `${10 + i * 15}%`, top: `${15 + (i % 3) * 25}%`,
            animationDuration: `${3 + i * 0.7}s`, animationDelay: `${i * 0.5}s`,
          }} />
      ))}
    </div>
  );
}

/* ─── Marquee text ─── */
function Marquee() {
  return (
    <div className="overflow-hidden py-6 bg-gray-50 border-y border-gray-100">
      <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap">
        {[...Array(2)].map((_, j) => (
          <div key={j} className="flex items-center gap-12 mx-6">
            {["AI面接", "構造化評価", "自動録画", "スキル分析", "AI導入支援", "戦略策定", "業務自動化", "生成AI", "データ分析", "DX推進"].map((t, i) => (
              <span key={i} className="text-sm font-medium text-gray-300">{t}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Mouse follower gradient ─── */
function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      ref.current.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      ref.current.style.setProperty("--my", `${e.clientY - rect.top}px`);
    }
  }, []);
  return (
    <div ref={ref} onMouseMove={handleMouseMove} className="absolute inset-0 pointer-events-none"
      style={{ background: "radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(99,102,241,0.04), transparent 60%)" }} />
  );
}

/* ─── Section label ─── */
function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
      <p className="text-sm font-semibold text-indigo-600">{children}</p>
    </div>
  );
}

export default function HomePage() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => { setTimeout(() => setHeroLoaded(true), 100); }, []);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
        <FloatingParticles />
        <MouseGlow />
        {/* Parallax gradient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-indigo-500 opacity-[0.06] blur-[120px]"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }} />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-400 opacity-[0.04] blur-[100px]"
            style={{ transform: `translateY(${scrollY * -0.08}px)` }} />
          <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full bg-blue-400 opacity-[0.03] blur-[80px]"
            style={{ transform: `translateY(${scrollY * 0.05}px)` }} />
        </div>

        <div className="relative z-20 max-w-3xl mx-auto px-6 text-center">
          {/* Animated badge */}
          <div className="transition-all duration-700" style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(20px)", transitionDelay: "200ms" }}>
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 mb-8">
              <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
              <span className="text-xs font-semibold text-indigo-600">AI × Business</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 transition-all duration-700"
            style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0) scale(1)" : "translateY(30px) scale(0.98)", transitionDelay: "400ms" }}>
            AIで、すべてを
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite]">
              クリアにする。
            </span>
          </h1>

          <p className="text-base lg:text-lg text-gray-500 leading-relaxed max-w-lg mx-auto mb-10 transition-all duration-700"
            style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(30px)", transitionDelay: "600ms" }}>
            AI導入支援とAI面接プラットフォーム「導」。
            <br />2つの事業で、企業の未来を明瞭にします。
          </p>

          <div className="flex items-center justify-center gap-4 transition-all duration-700"
            style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(20px)", transitionDelay: "800ms" }}>
            <Link href="/contact"
              className="group text-sm font-semibold text-white bg-indigo-600 pl-8 pr-6 py-3.5 rounded-xl hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-200 inline-flex items-center gap-2">
              AI導入を相談する
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link href="#services"
              className="text-sm font-semibold text-gray-600 border border-gray-200 px-8 py-3.5 rounded-xl hover:border-indigo-200 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all duration-300">
              事業を見る
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700"
          style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "1200ms" }}>
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 bg-gray-400 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <Marquee />

      {/* ═══ SERVICES ═══ */}
      <section id="services" className="py-20 lg:py-28 bg-white relative">
        <MouseGlow />
        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <Reveal>
            <SectionLabel>Our Services</SectionLabel>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-12">
              2つの事業で、<br />AIの力を届ける。
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Reveal delay={100} direction="left">
              <Link href="/michibiki" className="group block">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 p-8 lg:p-10 min-h-[340px] flex flex-col justify-end hover:shadow-2xl hover:shadow-indigo-200 transition-all duration-500 hover:-translate-y-1">
                  {/* Animated background pattern */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                  <p className="text-sm font-semibold text-indigo-200 mb-3 relative z-10">Service 01</p>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3 relative z-10">
                    導<span className="text-base font-normal ml-2 text-indigo-200">みちびき</span>
                  </h3>
                  <p className="text-base text-indigo-100 leading-relaxed max-w-sm relative z-10">
                    AI面接プラットフォーム。構造化された面接で、最適な採用を実現する。
                  </p>
                  <div className="flex items-center gap-2 mt-6 text-indigo-200 text-sm font-semibold group-hover:text-white transition-colors duration-300 relative z-10">
                    <span>詳しく見る</span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </div>
                </div>
              </Link>
            </Reveal>

            <Reveal delay={200} direction="right">
              <Link href="/ai-consulting" className="group block">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 p-8 lg:p-10 min-h-[340px] flex flex-col justify-end hover:shadow-2xl hover:shadow-blue-200 transition-all duration-500 hover:-translate-y-1">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                  <p className="text-sm font-semibold text-blue-200 mb-3 relative z-10">Service 02</p>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3 relative z-10">AI導入支援</h3>
                  <p className="text-base text-blue-100 leading-relaxed max-w-sm relative z-10">
                    戦略策定から実装・運用まで。貴社に最適なAIソリューションを、ともに。
                  </p>
                  <div className="flex items-center gap-2 mt-6 text-blue-200 text-sm font-semibold group-hover:text-white transition-colors duration-300 relative z-10">
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
      <section className="py-20 lg:py-28 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: "radial-gradient(circle, #6366f1 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }} />
        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal direction="scale">
              <SectionLabel>Philosophy</SectionLabel>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
                AIはまだ、多くの企業にとって<br />遠い存在です。
              </h2>
              <p className="text-base lg:text-lg text-gray-500 leading-relaxed">
                私たちは、そのギャップを埋めるために生まれました。
                <br />難しいAI技術を、わかりやすく、使いやすく。
                <br />まだ始まったばかりですが、一社一社に寄り添い、
                <br />丁寧にAIの価値を届けていきます。
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
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-12">私たちが大切にすること</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: "01", title: "正直であること", desc: "できないことはできないと言う。過度な期待を煽らず、確実に成果が出る領域から、一歩ずつ。",
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
                color: "indigo" },
              { num: "02", title: "伴走すること", desc: "導入して終わりではなく、運用が定着するまで。お客様のチームの一員として、ともに歩みます。",
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />,
                color: "purple" },
              { num: "03", title: "技術を翻訳すること", desc: "最先端のAI技術を、ビジネスの言葉に。専門知識がなくても理解できる、クリアな提案を。",
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />,
                color: "blue" },
            ].map((item, i) => (
              <Reveal key={item.num} delay={i * 150}>
                <div className="group border border-gray-200 rounded-2xl p-8 lg:p-10 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 hover:border-indigo-100 relative overflow-hidden">
                  {/* Hover gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-${item.color}-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-xl bg-${item.color}-50 text-${item.color}-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">{item.icon}</svg>
                    </div>
                    <span className={`text-sm font-bold text-${item.color}-600`}>{item.num}</span>
                    <h3 className="text-lg font-bold text-gray-900 mt-2 mb-4">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STATUS ═══ */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-indigo-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(99,102,241,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,.2) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />
        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center mb-14">
              <SectionLabel>Current Status</SectionLabel>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                まだ始まったばかりです。
                <br /><span className="text-gray-400">だからこそ、全力で。</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: "導入企業", value: 1, suffix: "社", icon: "🏢" },
              { label: "AI面接", value: 0, suffix: "準備中", icon: "🎤" },
              { label: "創業", value: 2025, suffix: "年", icon: "🚀" },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 120}>
                <div className="text-center bg-white rounded-2xl py-10 lg:py-12 shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1 border border-white hover:border-indigo-100">
                  <div className="text-3xl mb-3">{stat.icon}</div>
                  <p className="text-4xl lg:text-5xl font-bold text-gray-900">
                    {stat.value === 0 ? "—" : <CountUp target={stat.value} />}
                    <span className="text-base font-semibold text-gray-400 ml-1">{stat.suffix}</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-3 font-medium">{stat.label}</p>
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
              <Link href="/blog" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors group">
                すべての記事
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {blogPosts.slice(0, 3).map((post, i) => (
              <Reveal key={post.slug} delay={i * 100}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="aspect-[16/10] mb-4 overflow-hidden rounded-2xl relative" style={{ backgroundColor: post.thumbnail }}>
                    <div className="w-full h-full group-hover:scale-110 transition-transform duration-700" />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                        <svg className="w-4 h-4 text-gray-900" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{post.category}</span>
                    <span className="text-xs text-gray-400">{post.date}</span>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 leading-relaxed group-hover:text-indigo-600 transition-colors duration-300">
                    {post.title}
                  </h3>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="text-center mt-10 sm:hidden">
            <Link href="/blog" className="text-sm font-semibold text-indigo-600">すべての記事 →</Link>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
          <Reveal>
            <p className="text-sm font-semibold text-indigo-200 mb-4">Contact</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-6">
              まずは、お話しませんか。
            </h2>
            <p className="text-base lg:text-lg text-indigo-100/80 leading-relaxed mb-10">
              AIのことがわからなくても大丈夫です。<br />貴社の状況に合わせて、一緒に考えます。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact"
                className="group text-sm font-semibold text-indigo-700 bg-white px-10 py-4 rounded-xl hover:bg-indigo-50 transition-all duration-300 hover:shadow-xl inline-flex items-center gap-2">
                無料で相談する
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <a href="https://www.michibiki.tech" target="_blank" rel="noopener noreferrer"
                className="text-sm font-semibold text-white/70 hover:text-white transition-colors duration-300">
                導のサイトを見る →
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

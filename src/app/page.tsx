"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useCallback, type ReactNode } from "react";
import { blogPosts } from "@/lib/blog-data";

/* ═══════════════════════════════════════════
   UTILITY COMPONENTS
═══════════════════════════════════════════ */

/* ── Scroll-triggered reveal ── */
function Reveal({
  children, className = "", delay = 0, direction = "up"
}: {
  children: ReactNode; className?: string; delay?: number;
  direction?: "up" | "left" | "right" | "scale" | "fade"
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const transforms = {
    up: "translateY(50px)", left: "translateX(-50px)",
    right: "translateX(50px)", scale: "scale(0.93)", fade: "none"
  };
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : transforms[direction],
      transition: `opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    }}>{children}</div>
  );
}

/* ── CountUp animation ── */
function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const dur = 2000, steps = 60, inc = target / steps;
        let cur = 0;
        const timer = setInterval(() => {
          cur += inc;
          if (cur >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(cur));
        }, dur / steps);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ── Section label ── */
function SectionLabel({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-2 mb-5">
      <div className={`w-1.5 h-1.5 rounded-full ${light ? "bg-blue-300" : "bg-blue-600"}`} />
      <p className={`text-xs font-bold tracking-widest uppercase ${light ? "text-blue-300" : "text-blue-600"}`}>
        {children}
      </p>
    </div>
  );
}

/* ── Cinematic dark background ── */
function CinematicBg({ children }: { children?: ReactNode }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-[#0d0b2b] to-gray-950" />
      <div className="absolute w-[700px] h-[700px] rounded-full bg-blue-600/20 blur-[120px] animate-float1 -top-20 -left-20" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-600/15 blur-[100px] animate-float2 bottom-0 right-0" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[80px] animate-float3 top-1/2 right-1/4" />
      <div className="absolute w-[300px] h-[300px] rounded-full bg-sky-500/10 blur-[80px] animate-float4 bottom-1/4 left-1/3" />
      <div className="absolute inset-0 opacity-[0.035]" style={{
        backgroundImage: "linear-gradient(rgba(37,99,235,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.6) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />
      {children}
    </div>
  );
}

/* ── Dark section noise texture ── */
function DarkSection({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`relative overflow-hidden bg-gray-950 ${className}`}>
      <div className="grain absolute inset-0" />
      {children}
    </section>
  );
}

/* ── Floating particles ── */
function FloatingParticles({ count = 8, light = false }: { count?: number; light?: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <div key={i}
          className={`absolute rounded-full ${light ? "bg-white/10" : "bg-blue-400/8"}`}
          style={{
            width: `${4 + i * 6}px`, height: `${4 + i * 6}px`,
            left: `${5 + i * 12}%`, top: `${10 + (i % 4) * 22}%`,
            animation: `float${(i % 4) + 1} ${6 + i * 1.2}s ease-in-out infinite`,
            animationDelay: `${i * 0.6}s`,
          }} />
      ))}
    </div>
  );
}

/* ── Mouse follower gradient ── */
function MouseGlow({ dark = false }: { dark?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      ref.current.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      ref.current.style.setProperty("--my", `${e.clientY - rect.top}px`);
    }
  }, []);
  const gradient = dark
    ? "radial-gradient(700px circle at var(--mx, 50%) var(--my, 50%), rgba(37,99,235,0.06), transparent 60%)"
    : "radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(37,99,235,0.04), transparent 60%)";
  return (
    <div ref={ref} onMouseMove={handleMouseMove} className="absolute inset-0 pointer-events-none"
      style={{ background: gradient }} />
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════ */
export default function HomePage() {
  const [heroLoaded, setHeroLoaded] = useState(false);
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <CinematicBg />
        <FloatingParticles count={10} />

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[140px]"
            style={{ transform: `translateY(${scrollY * 0.12}px)` }} />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-emerald-500/8 blur-[120px]"
            style={{ transform: `translateY(${scrollY * -0.08}px)` }} />
        </div>

        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
          <div className="transition-all duration-1000" style={{
            opacity: heroLoaded ? 1 : 0,
            transform: heroLoaded ? "translateY(0)" : "translateY(24px)",
            transitionDelay: "200ms"
          }}>
            <div className="inline-flex items-center gap-2.5 bg-white/5 border border-white/10 backdrop-blur-sm rounded-full px-5 py-2 mb-10">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-xs font-bold tracking-widest text-white/70 uppercase">AI × Business × Agriculture</span>
            </div>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-[0.95] tracking-tight mb-8 transition-all duration-1000"
            style={{
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "translateY(0) scale(1)" : "translateY(40px) scale(0.97)",
              transitionDelay: "400ms"
            }}>
            AIで、<br />
            <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-emerald-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_4s_linear_infinite]">
              すべてをクリア
            </span>
            <br />
            <span className="text-white/50 text-4xl sm:text-5xl lg:text-6xl font-bold">にする。</span>
          </h1>

          <p className="text-base lg:text-xl text-white/50 leading-relaxed max-w-xl mx-auto mb-12 transition-all duration-1000"
            style={{
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "translateY(0)" : "translateY(30px)",
              transitionDelay: "700ms"
            }}>
            AIコンサルティングと、AI×農業。<br />
            2つの事業で、日本の未来を明瞭にします。
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000"
            style={{
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "900ms"
            }}>
            <Link href="/contact"
              className="group text-sm font-bold text-white bg-blue-600 pl-8 pr-6 py-4 rounded-full hover:bg-blue-500 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/30 inline-flex items-center gap-3">
              無料で相談する
              <span className="w-7 h-7 bg-white/15 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </Link>
            <Link href="#services"
              className="text-sm font-semibold text-white/60 border border-white/15 px-8 py-4 rounded-full hover:border-white/30 hover:text-white hover:bg-white/5 transition-all duration-300">
              事業を見る
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-950 to-transparent pointer-events-none" />
      </section>

      {/* ═══ VISION ═══ */}
      <DarkSection className="py-32 lg:py-48">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal direction="left">
              <SectionLabel light>Our Vision</SectionLabel>
              <h2 className="text-5xl lg:text-7xl font-black text-white leading-[0.95] tracking-tight">
                AIを、<br />
                <span className="text-cyan-400">日本の現場</span>
                <br />へ届ける。
              </h2>
            </Reveal>
            <Reveal direction="right" delay={200}>
              <div className="space-y-6">
                <p className="text-lg text-white/60 leading-loose">
                  AIはまだ、多くの企業や生産者にとって遠い存在です。難しい、コストが高い、何から始めればいいかわからない——そんな声を何度も聞いてきました。
                </p>
                <p className="text-lg text-white/60 leading-loose">
                  私たちはそのギャップを埋めるために生まれました。最先端のAI技術を、ビジネスと農業の言葉に翻訳する。一社一社、一農家一農家に寄り添い、AIの価値を丁寧に届けていきます。
                </p>
                <div className="divider-dark mt-8" />
                <div className="flex items-center gap-6 pt-4">
                  <div>
                    <p className="text-4xl font-black text-white">2<span className="text-base text-white/40 ml-1 font-normal">事業</span></p>
                    <p className="text-xs text-white/40 tracking-wider mt-1">展開中</p>
                  </div>
                  <div className="w-px h-10 bg-white/10" />
                  <div>
                    <p className="text-4xl font-black text-white">日本</p>
                    <p className="text-xs text-white/40 tracking-wider mt-1">市場特化</p>
                  </div>
                  <div className="w-px h-10 bg-white/10" />
                  <div>
                    <p className="text-4xl font-black text-white">2026</p>
                    <p className="text-xs text-white/40 tracking-wider mt-1">創業</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
        <MouseGlow dark />
      </DarkSection>

      {/* ═══ SERVICES ═══ */}
      <section id="services" className="py-24 lg:py-36 bg-white relative overflow-hidden">
        <MouseGlow />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <Reveal>
            <SectionLabel>Our Services</SectionLabel>
            <h2 className="text-4xl lg:text-6xl font-black text-gray-900 leading-[1.0] tracking-tight mb-4">
              2つの事業で、<br />
              <span className="text-gray-400">日本の未来をつくる。</span>
            </h2>
            <p className="text-base text-gray-500 mb-16 max-w-lg leading-relaxed">
              企業のAI活用と、農業のAI実装。それぞれの現場に寄り添い、確実に成果を届けます。
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Service 01 — AIコンサルティング */}
            <Reveal delay={100} direction="left">
              <Link href="/ai-consulting" className="group block">
                <div className="relative overflow-hidden rounded-3xl bg-gray-950 min-h-[480px] flex flex-col justify-end p-12 hover:shadow-2xl hover:shadow-blue-900/30 transition-all duration-700 hover:-translate-y-2 glow-card">
                  <div className="absolute inset-0">
                    <video
                      src="/videos/technology.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-blue-900/50 to-cyan-900/70" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  </div>
                  <div className="relative z-10">
                    <span className="inline-block text-[10px] font-black tracking-widest text-blue-300/80 border border-blue-400/20 px-3 py-1 rounded-full mb-6 uppercase">Service 01</span>
                    <h3 className="text-3xl lg:text-5xl font-black text-white mb-4 leading-tight">AIコンサルティング</h3>
                    <p className="text-sm lg:text-base text-blue-100/70 leading-relaxed max-w-md mb-8">
                      戦略策定から実装・運用まで。日本企業のAI活用を、ヒアリングから定着まで一気通貫で伴走します。
                    </p>
                    <div className="flex items-center gap-2 text-blue-300 text-sm font-bold group-hover:text-white transition-colors duration-300">
                      <span>詳しく見る</span>
                      <span className="w-6 h-6 bg-blue-500/30 rounded-full flex items-center justify-center group-hover:translate-x-2 transition-transform duration-300">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>

            {/* Service 02 — AI×農業 */}
            <Reveal delay={200} direction="right">
              <Link href="/ai-agriculture" className="group block">
                <div className="relative overflow-hidden rounded-3xl bg-gray-950 min-h-[480px] flex flex-col justify-end p-12 hover:shadow-2xl hover:shadow-emerald-900/30 transition-all duration-700 hover:-translate-y-2 glow-card">
                  <div className="absolute inset-0">
                    <video
                      src="/videos/agriculture.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/70 via-green-900/50 to-teal-900/70" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  </div>
                  <div className="relative z-10">
                    <span className="inline-block text-[10px] font-black tracking-widest text-emerald-300/80 border border-emerald-400/20 px-3 py-1 rounded-full mb-6 uppercase">Service 02</span>
                    <h3 className="text-3xl lg:text-5xl font-black text-white mb-4 leading-tight">AI×農業</h3>
                    <p className="text-sm lg:text-base text-emerald-100/70 leading-relaxed max-w-md mb-8">
                      日本の農業をAIでアップデート。栽培管理・収穫予測・スマート農業ソリューションで、生産者の現場を支えます。
                    </p>
                    <div className="flex items-center gap-2 text-emerald-300 text-sm font-bold group-hover:text-white transition-colors duration-300">
                      <span>詳しく見る</span>
                      <span className="w-6 h-6 bg-emerald-500/30 rounded-full flex items-center justify-center group-hover:translate-x-2 transition-transform duration-300">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ APPROACH ═══ */}
      <DarkSection className="py-24 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal direction="left">
              <SectionLabel light>Our Approach</SectionLabel>
              <h2 className="text-4xl lg:text-6xl font-black text-white leading-[0.95] tracking-tight mb-8">
                私たちが<br />大切にする<br />
                <span className="text-cyan-400">3つのこと</span>
              </h2>
              <div className="space-y-8">
                {[
                  { num: "01", title: "正直であること", desc: "できないことはできないと言う。過度な期待を煽らず、確実に成果が出る領域から、一歩ずつ。" },
                  { num: "02", title: "伴走すること", desc: "導入して終わりではなく、運用が定着するまで。お客様のチームの一員として、ともに歩みます。" },
                  { num: "03", title: "技術を翻訳すること", desc: "最先端のAI技術を、ビジネスと現場の言葉に。専門知識がなくても理解できる、クリアな提案を。" },
                ].map((item, i) => (
                  <Reveal key={item.num} delay={i * 100}>
                    <div className="flex gap-5 group">
                      <div className="flex-shrink-0">
                        <span className="text-xs font-black text-cyan-400/60 tracking-widest">{item.num}</span>
                      </div>
                      <div>
                        <h3 className="text-base font-black text-white mb-1.5 group-hover:text-blue-300 transition-colors">{item.title}</h3>
                        <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                    {i < 2 && <div className="divider-dark mt-6 ml-8" />}
                  </Reveal>
                ))}
              </div>
            </Reveal>

            <Reveal direction="right" delay={300}>
              <div className="relative">
                <div className="relative overflow-hidden rounded-3xl aspect-[4/5] bg-gradient-to-br from-blue-900/40 to-emerald-900/40 border border-white/10">
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-emerald-950 to-gray-950" />
                    <div className="absolute w-full h-full opacity-60">
                      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-blue-500/30 rounded-full blur-3xl animate-float1" />
                      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-emerald-500/25 rounded-full blur-3xl animate-float2" />
                      <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl animate-float3" />
                    </div>
                    <div className="absolute inset-0 opacity-[0.06]" style={{
                      backgroundImage: "linear-gradient(rgba(37,99,235,1) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,1) 1px, transparent 1px)",
                      backgroundSize: "40px 40px"
                    }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl font-black text-white/10 leading-none tracking-tighter">clear<br />AI</div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-8 left-8 right-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-2xl font-black text-white">2</p>
                        <p className="text-xs text-white/40 tracking-wider">事業</p>
                      </div>
                      <div>
                        <p className="text-2xl font-black text-white">∞</p>
                        <p className="text-xs text-white/40 tracking-wider">可能性</p>
                      </div>
                      <div>
                        <p className="text-2xl font-black text-emerald-400">日本</p>
                        <p className="text-xs text-white/40 tracking-wider">特化</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-emerald-500/20 rounded-full blur-xl" />
              </div>
            </Reveal>
          </div>
        </div>
      </DarkSection>

      {/* ═══ METRICS ═══ */}
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: "linear-gradient(rgba(37,99,235,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,.2) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <Reveal>
            <SectionLabel>Current Status</SectionLabel>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight tracking-tight mb-16">
              まだ始まったばかりです。<br />
              <span className="text-gray-400">だからこそ、全力で。</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100 rounded-3xl overflow-hidden">
            {[
              { label: "展開事業数", value: 2, suffix: "事業", icon: "🚀", note: "2026年〜" },
              { label: "対象市場", value: 1, suffix: "（日本）", icon: "🇯🇵", note: "国内特化" },
              { label: "創業年", value: 2026, suffix: "", icon: "✦", note: "スタートアップ" },
              { label: "支援領域", value: 4, suffix: "領域", icon: "🌱", note: "戦略〜運用" },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 100}>
                <div className="bg-white p-8 lg:p-12 group hover:bg-blue-50/50 transition-colors duration-500">
                  <div className="text-2xl mb-3">{stat.icon}</div>
                  <p className="text-4xl lg:text-6xl font-black text-gray-900 tracking-tight">
                    <CountUp target={stat.value} />{stat.suffix}
                  </p>
                  <p className="text-sm font-bold text-gray-900 mt-3 mb-1">{stat.label}</p>
                  <p className="text-xs text-gray-400">{stat.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TECH STACK ═══ */}
      <DarkSection className="py-24 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <Reveal>
            <div className="mb-16">
              <SectionLabel light>Tech Stack</SectionLabel>
              <h2 className="text-3xl lg:text-5xl font-black text-white mb-4">使用技術</h2>
              <p className="text-base text-white/50 max-w-xl leading-relaxed">
                信頼性・実績・コミュニティの厚さを基準に、プロダクションレディな技術のみを採用しています。
              </p>
            </div>
          </Reveal>

          <div className="space-y-14">
            {[
              {
                category: "Frontend",
                label: "フロントエンド",
                items: [
                  { name: "Next.js", slug: "nextdotjs" },
                  { name: "React", slug: "react" },
                  { name: "TypeScript", slug: "typescript" },
                  { name: "Tailwind CSS", slug: "tailwindcss" },
                  { name: "Vite", slug: "vite" },
                ],
              },
              {
                category: "Backend / Language",
                label: "バックエンド・言語",
                items: [
                  { name: "Python", slug: "python" },
                  { name: "Node.js", slug: "nodedotjs" },
                  { name: "FastAPI", slug: "fastapi" },
                  { name: "Go", slug: "go" },
                  { name: "Rust", slug: "rust" },
                ],
              },
              {
                category: "AI / LLM",
                label: "AI・機械学習",
                items: [
                  { name: "Anthropic Claude", slug: "anthropic" },
                  { name: "OpenAI", slug: "openai" },
                  { name: "Hugging Face", slug: "huggingface" },
                  { name: "TensorFlow", slug: "tensorflow" },
                  { name: "PyTorch", slug: "pytorch" },
                  { name: "LangChain", slug: "langchain" },
                ],
              },
              {
                category: "Database / Storage",
                label: "データベース",
                items: [
                  { name: "PostgreSQL", slug: "postgresql" },
                  { name: "Supabase", slug: "supabase" },
                  { name: "Redis", slug: "redis" },
                  { name: "MongoDB", slug: "mongodb" },
                  { name: "Firebase", slug: "firebase" },
                ],
              },
              {
                category: "Cloud / Infrastructure",
                label: "クラウド・インフラ",
                items: [
                  { name: "AWS", slug: "amazonwebservices" },
                  { name: "Google Cloud", slug: "googlecloud" },
                  { name: "Vercel", slug: "vercel" },
                  { name: "Cloudflare", slug: "cloudflare" },
                  { name: "Docker", slug: "docker" },
                  { name: "Kubernetes", slug: "kubernetes" },
                ],
              },
              {
                category: "DevOps / Tools",
                label: "DevOps・ツール",
                items: [
                  { name: "GitHub", slug: "github" },
                  { name: "GitHub Actions", slug: "githubactions" },
                  { name: "Terraform", slug: "terraform" },
                  { name: "Datadog", slug: "datadog" },
                  { name: "Sentry", slug: "sentry" },
                  { name: "Stripe", slug: "stripe" },
                ],
              },
            ].map((group, gi) => (
              <Reveal key={group.category} delay={gi * 80}>
                <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-start border-t border-white/5 pt-10">
                  <div className="lg:col-span-3">
                    <p className="text-[10px] font-black tracking-widest text-cyan-400/70 uppercase mb-2">{group.category}</p>
                    <h3 className="text-lg font-black text-white">{group.label}</h3>
                  </div>
                  <div className="lg:col-span-9">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                      {group.items.map((tech) => (
                        <div key={tech.name}
                          className="group relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 hover:-translate-y-0.5 p-4 flex flex-col items-center justify-center gap-2.5 aspect-square">
                          <div className="w-9 h-9 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={`https://api.iconify.design/simple-icons/${tech.slug}.svg?color=%23ffffff`}
                              alt={tech.name}
                              className="w-full h-full object-contain"
                              loading="lazy"
                            />
                          </div>
                          <p className="text-[11px] font-bold text-white/70 group-hover:text-white transition-colors text-center leading-tight">
                            {tech.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <MouseGlow dark />
      </DarkSection>

      {/* ═══ BLOG ═══ */}
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="flex items-end justify-between mb-14">
              <div>
                <SectionLabel>Blog</SectionLabel>
                <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">最新の記事</h2>
              </div>
              <Link href="/blog" className="hidden sm:flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors group border border-blue-100 px-5 py-2.5 rounded-full hover:bg-blue-50">
                すべての記事
                <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {blogPosts.slice(0, 3).map((post, i) => (
              <Reveal key={post.slug} delay={i * 100}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="aspect-[16/10] mb-5 overflow-hidden rounded-2xl relative" style={{ backgroundColor: post.thumbnail }}>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 shadow-lg">
                        <svg className="w-4 h-4 text-gray-900" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">{post.category}</span>
                    <span className="text-xs text-gray-400">{post.date}</span>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors duration-300">
                    {post.title}
                  </h3>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="text-center mt-10 sm:hidden">
            <Link href="/blog" className="text-sm font-bold text-blue-600">すべての記事 →</Link>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative overflow-hidden min-h-[60vh] flex items-center">
        <CinematicBg />
        <FloatingParticles count={6} />
        <div className="relative z-10 w-full py-28 lg:py-40">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <Reveal>
              <p className="text-xs font-black tracking-widest text-blue-300/60 uppercase mb-6">Contact</p>
              <h2 className="text-5xl lg:text-7xl font-black text-white leading-[0.95] tracking-tight mb-8">
                まずは、<br />
                <span className="text-cyan-400">お話しませんか。</span>
              </h2>
              <p className="text-base lg:text-lg text-white/50 leading-loose mb-12 max-w-lg mx-auto">
                AIのことがわからなくても大丈夫です。<br />貴社・貴農園の状況に合わせて、一緒に考えます。
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact"
                  className="group text-sm font-black text-gray-900 bg-white px-12 py-5 rounded-full hover:bg-blue-50 transition-all duration-300 hover:shadow-2xl hover:shadow-white/10 inline-flex items-center gap-3">
                  無料で相談する
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none" />
      </section>

      {/* ═══ FLOATING CONTACT BUTTON ═══ */}
      <div className="fixed bottom-8 right-8 z-40">
        <Link href="/contact"
          className="flex items-center gap-2 bg-blue-600 text-white text-xs font-black px-5 py-3.5 rounded-full shadow-lg shadow-blue-500/30 hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5 group animate-pulse-glow">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span>相談する</span>
          <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </>
  );
}

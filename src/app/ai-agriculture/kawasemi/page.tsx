"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <p className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-700 mb-5">{children}</p>;
}

export default function KawasemiPage() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => setHeroLoaded(true), 100);
  }, []);

  return (
    <>
      {/* SECTION 1 — HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a1410]">
        {/* background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/videos/kawasemi-hero.mp4" type="video/mp4" />
        </video>
        {/* dim overlay for text readability */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,20,16,0.35) 0%, rgba(10,20,16,0.55) 55%, rgba(10,20,16,0.85) 100%)",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <span
            className="inline-block rounded-full bg-emerald-500/15 ring-1 ring-emerald-400/40 backdrop-blur-sm text-emerald-300 px-3 py-1 text-sm font-semibold mb-6 transition-all duration-700"
            style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "300ms" }}
          >
            Kawasemi Project
          </span>
          <h1
            className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 transition-all duration-700 [text-shadow:0_2px_24px_rgba(0,0,0,0.6)]"
            style={{
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "translateY(0)" : "translateY(24px)",
              transitionDelay: "500ms",
            }}
          >
            優秀な若者が、<br />一次産業の未来を継ぐ。
          </h1>
          <p
            className="text-base text-gray-300 leading-relaxed max-w-lg mx-auto mb-10 transition-all duration-700 [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]"
            style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "700ms" }}
          >
            農業、林業、漁業。<br />
            この国の自然と地域を支えてきた仕事を、次の世代へ手渡すための実践型プロジェクト。
          </p>
          <div
            className="flex items-center justify-center gap-4 transition-all duration-700"
            style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "900ms" }}
          >
            <a
              href="#about"
              className="rounded-lg bg-emerald-500 text-white font-semibold px-8 py-3.5 hover:bg-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.4)] transition-all duration-300"
            >
              プロジェクトについて知る
            </a>
            <a
              href="#join"
              className="text-sm text-gray-300 font-semibold hover:text-white transition-colors duration-300"
            >
              参加を検討する →
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 2 — 問いかけ */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>The Question</Label>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-[1.4] mb-10">
              この国の風景は、<br />誰が次の世代へ渡すのか。
            </h2>
            <div className="space-y-6 text-base md:text-[17px] text-gray-700 leading-[2]">
              <p>
                美しい田畑、手入れされた山、地域に根づいた漁港や集落。
                それらは自然に残るものではありません。そこには必ず、守り、育て、受け継ぐ人がいます。
              </p>
              <p>
                いま日本では、地方の人口減少、高齢化、後継者不足によって、一次産業の現場そのものが静かに失われつつあります。耕作放棄地が増え、山林の管理は追いつかず、漁村の活気も薄れていく。その変化は単なる産業の衰退ではなく、<span className="font-semibold text-gray-900">日本の風景そのものが失われていく</span>ことを意味します。
              </p>
              <p className="pt-2">
                けれど本質的な問題は、「価値がない」ことではありません。<br />
                本当に足りていないのは、<span className="font-semibold text-emerald-700">優秀な人材が本気で向かいたくなる構造</span>です。
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 3 — 翡翠プロジェクトとは */}
      <section id="about" className="py-24 lg:py-32 bg-[#f7f9f7]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>About the Project</Label>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-[1.5] mb-10 max-w-3xl">
              翡翠プロジェクトは、一次産業に<br className="hidden md:block" />
              <span className="text-emerald-700">&ldquo;人材・思想・事業&rdquo;</span>を流し込む挑戦です。
            </h2>
            <div className="space-y-6 text-base text-gray-700 leading-[2] max-w-3xl mb-16">
              <p>
                翡翠プロジェクトは、優秀な若者を一次産業の現場へ向かわせるためのプロジェクトです。
                ただ人を送り込むだけではありません。地域の現場に新しい視点と事業感覚を持ち込み、自然を守ることと、持続可能に稼げることを両立させる仕組みまでつくります。
              </p>
              <p>
                私たちが目指すのは、一次産業を「人手が足りない厳しい仕事」としてではなく、<span className="font-semibold text-gray-900">「次の時代をつくる重要な仕事」</span>として再定義することです。
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                pillar: "人材",
                en: "People",
                desc: "意志ある若者を集め、育て、現場へ送り出す。",
              },
              {
                pillar: "産業",
                en: "Industry",
                desc: "一次産業を、持続可能で魅力ある仕事へ再設計する。",
              },
              {
                pillar: "地域",
                en: "Region",
                desc: "自然、文化、共同体を守る担い手を地域に増やす。",
              },
            ].map((item, i) => (
              <Reveal key={item.pillar} delay={i * 120}>
                <div className="bg-white rounded-2xl border border-gray-200 p-10 h-full hover:shadow-lg hover:border-emerald-200 transition-all duration-500">
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-700 mb-4">{item.en}</p>
                  <h3 className="text-3xl font-bold text-gray-900 mb-5">{item.pillar}</h3>
                  <p className="text-sm text-gray-600 leading-[2]">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — なぜ今 */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Why Now</Label>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-[1.4] mb-10">
              危機は深い。<br />
              だが、もう一度つくり直せる<br />
              最後のタイミングでもある。
            </h2>
            <div className="space-y-6 text-base md:text-[17px] text-gray-700 leading-[2]">
              <p>
                一次産業の現場では、高齢化が進み、長年培われてきた知恵や技術の継承が難しくなっています。土地、山、海を守るコストは増え続け、従来のやり方だけでは持続できない地域も少なくありません。
              </p>
              <p>
                一方で、食の安全、環境、地方回帰、地域の持続可能性への関心は、これまでになく高まっています。社会の価値観が変わりつつある今だからこそ、一次産業は単なる伝統産業ではなく、<span className="font-semibold text-gray-900">未来志向の仕事として再編集できる余地</span>があります。
              </p>
              <p>
                テクノロジー、経営感覚、発信力を持つ若者が現場に入れば、守るだけではなく、育て直すことができる。
                <br />
                私たちは、<span className="font-semibold text-emerald-700">今がそのための最後の好機</span>だと考えています。
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 5 — 解決したい本質課題 */}
      <section className="py-24 lg:py-32 bg-[#f7f9f7]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Core Challenges</Label>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-[1.5] mb-8 max-w-3xl">
              問題は、現場の努力不足ではない。<br />
              挑戦者が集まり、育ち、残れる構造がないことだ。
            </h2>
            <p className="text-base text-gray-700 leading-[2] max-w-3xl mb-16">
              一次産業の課題は、単純な労働力不足ではありません。
              人が入らない、入っても続かない、続いても広がらない。その背景には、複数の構造課題があります。
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                title: "担い手不足",
                desc: "若者が挑戦先として一次産業を選びにくく、継承者も不足している。現場に入る前の情報や導線が乏しいため、そもそも候補に上がりにくい。",
              },
              {
                num: "02",
                title: "収益構造の弱さ",
                desc: "労働負荷の大きさに比べて収入が安定しづらく、価格決定権も弱い。良い仕事をしていても、産業構造として報われにくい場面が多い。",
              },
              {
                num: "03",
                title: "社会的魅力の不足",
                desc: "本来は高度な判断と知恵が求められる仕事であるにもかかわらず、その魅力が社会に十分伝わっていない。発信、ブランド設計、教育導線が弱く、挑戦先としての存在感が薄い。",
              },
            ].map((item, i) => (
              <Reveal key={item.num} delay={i * 120}>
                <div className="bg-white rounded-2xl border border-gray-200 p-9 h-full hover:shadow-lg transition-all duration-500">
                  <span className="text-sm font-bold text-emerald-700">{item.num}</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-3 mb-5">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-[2]">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — アプローチ */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Our Approach</Label>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-[1.5] mb-8 max-w-3xl">
              志だけでは続かない。<br />
              だから、挑戦できる仕組みからつくる。
            </h2>
            <p className="text-base text-gray-700 leading-[2] max-w-3xl mb-16">
              翡翠プロジェクトは、気合いや善意に頼りません。
              若者が一次産業に向かい、現場で価値を出し、地域に根づいていくまでの流れを、一つの仕組みとして設計します。
            </p>
          </Reveal>

          {[
            {
              num: "01",
              title: "発掘する",
              en: "Discover",
              desc: "学生、若手社会人、起業志向層など、意味のある挑戦を求める人材に向けて、一次産業を新しいキャリアの選択肢として提示する。興味関心層を可視化し、現場と出会う入口をつくる。",
            },
            {
              num: "02",
              title: "育てる",
              en: "Cultivate",
              desc: "現場理解だけでなく、経営、地域理解、事業づくりの視点を育てる。一次産業を「手伝う仕事」ではなく、「未来を担う産業」として捉えられる人材を育成する。",
            },
            {
              num: "03",
              title: "実装する",
              en: "Implement",
              desc: "農業、林業、漁業の現場に入り、生産だけでなく、販売、ブランド、観光連携、業務改善、DXなどの観点から事業を前進させる。地域ごとの条件に合わせて、実践的に価値をつくる。",
            },
            {
              num: "04",
              title: "定着させる",
              en: "Take Root",
              desc: "単発の体験で終わらせず、地域で住み、働き、続けられる状態まで支援する。地域側とも対話しながら、次世代の担い手が根づく環境を整える。",
            },
          ].map((step, i) => (
            <Reveal key={step.num} delay={i * 80}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-12 border-b border-gray-200 last:border-0">
                <div className="lg:col-span-2">
                  <span className="text-sm font-bold text-emerald-700">Step {step.num}</span>
                </div>
                <div className="lg:col-span-3">
                  <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                  <p className="text-sm text-gray-400 mt-1.5 tracking-wide">{step.en}</p>
                </div>
                <div className="lg:col-span-7">
                  <p className="text-base text-gray-700 leading-[2]">{step.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SECTION 7 — 目指す未来 */}
      <section className="py-24 lg:py-36 bg-[#0a1410] relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(20,83,45,0.45) 0%, rgba(0,0,0,0) 70%), radial-gradient(circle at 80% 30%, rgba(45,212,191,0.15) 0%, transparent 50%)",
          }}
        />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-300 mb-5">The Future</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-[1.4] mb-12">
              守るだけではない。<br />
              日本の田舎を、<br />
              次の成長地帯へ変えていく。
            </h2>
            <div className="space-y-6 text-base md:text-[17px] text-gray-300 leading-[2]">
              <p>
                私たちが目指しているのは、失われゆくものをただ延命することではありません。
                一次産業を、次の世代が誇りを持って飛び込める仕事へ変えていくことです。
              </p>
              <p>
                若者が地域に入り、自然に向き合い、事業をつくり、地域とともに生きていく。
                そうした動きが全国に広がれば、田舎は<span className="font-semibold text-emerald-200">「守るべき過去」ではなく、「未来を生み出す場所」</span>へ変わっていきます。
              </p>
              <p>
                日本の風景を残すことは、過去への執着ではありません。
                <br />
                次の時代の土台を、自分たちの手でつくり直すことです。
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 8 — 具体的に何をするのか */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>What We Do</Label>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-[1.5] mb-8 max-w-3xl">
              思想を語るだけでなく、<br className="hidden md:block" />現場で動く。
            </h2>
            <p className="text-base text-gray-700 leading-[2] max-w-3xl mb-16">
              翡翠プロジェクトでは、地域や現場の条件に応じて、以下のような取り組みを進めていきます。
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                title: "地域連携",
                desc: "農家、林業従事者、漁業者、自治体、地域事業者と連携し、課題と可能性を共同で整理する。",
              },
              {
                title: "実地プログラム",
                desc: "若手人材が現場に入り、仕事を体験しながら、地域のリアルな課題と向き合う機会をつくる。",
              },
              {
                title: "事業改善",
                desc: "収益構造、販路、ブランド、運営体制などを見直し、産業として続く形を設計する。",
              },
              {
                title: "発信とブランド化",
                desc: "地域の魅力や産品の価値を、外に伝わる言葉と形に変え、挑戦先としての魅力を高める。",
              },
              {
                title: "技術導入と業務改善",
                desc: "テクノロジーや新しいオペレーションを取り入れ、現場の負担を減らしながら、生産性と持続性を高める。",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 90}>
                <div className="rounded-2xl border border-gray-200 bg-white p-8 h-full hover:shadow-lg hover:border-emerald-200 transition-all duration-500">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-[2]">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9 — こんな人と進めたい */}
      <section className="py-24 lg:py-32 bg-[#f7f9f7]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Who We Work With</Label>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-[1.5] mb-8 max-w-3xl">
              この挑戦は、一部の専門家だけのものではない。
            </h2>
            <p className="text-base text-gray-700 leading-[2] max-w-3xl mb-16">
              翡翠プロジェクトは、志ある若者だけでなく、地域の現場、支援したい企業や個人とともにつくるプロジェクトです。
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                target: "若者へ",
                en: "For Youth",
                desc: "大きな意味のある仕事がしたい。都会の競争だけではない生き方を探している。自然、地域、食、環境、経営に関心がある。そんな人にとって、一次産業は想像以上に大きな挑戦の場になり得ます。",
              },
              {
                target: "地域・事業者へ",
                en: "For Regions",
                desc: "後継者がいない、新しい担い手がほしい、外の視点や若い力を受け入れたい。そんな地域や現場と、私たちは長く続く関係をつくりたいと考えています。",
              },
              {
                target: "支援者・企業へ",
                en: "For Partners",
                desc: "地域や自然を守る実践に関わりたい、人材育成や地域共創に取り組みたい、社会的インパクトのある挑戦を支えたい。そんな企業や個人にとっても、翡翠プロジェクトは具体的に関われる場になります。",
              },
            ].map((item, i) => (
              <Reveal key={item.target} delay={i * 120}>
                <div className="bg-white rounded-2xl border border-gray-200 p-9 h-full hover:shadow-lg hover:border-emerald-200 transition-all duration-500 flex flex-col">
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-700 mb-3">{item.en}</p>
                  <h3 className="text-xl font-bold text-gray-900 mb-5">{item.target}</h3>
                  <p className="text-sm text-gray-600 leading-[2] flex-1">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10 — 参加方法 */}
      <section id="join" className="py-24 lg:py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>How to Join</Label>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-[1.4] mb-10">
              関わり方は、<br />一つではありません。
            </h2>
            <div className="space-y-6 text-base md:text-[17px] text-gray-700 leading-[2] mb-12">
              <p>
                翡翠プロジェクトは、志ある個人、地域、企業との出会いから始まります。
                少しでも関心があれば、まずは気軽に声をかけてください。
              </p>
              <p>
                参加、連携、支援、相談。
                <br />
                立場が違っても、この挑戦に加わる方法はあります。
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "参加したい", sub: "Join the project" },
                { label: "地域として連携したい", sub: "Regional partnership" },
                { label: "企業として支援したい", sub: "Corporate support" },
                { label: "まずは話を聞いてみたい", sub: "Just listen first" },
              ].map((cta) => (
                <a
                  key={cta.label}
                  href="/contact"
                  className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white px-6 py-5 hover:border-emerald-300 hover:shadow-md transition-all duration-300"
                >
                  <div>
                    <p className="text-base font-semibold text-gray-900">{cta.label}</p>
                    <p className="text-xs text-gray-500 mt-1 tracking-wide">{cta.sub}</p>
                  </div>
                  <span className="text-emerald-600 group-hover:translate-x-1 transition-transform">→</span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 11 — 発起人メッセージ */}
      <section className="py-24 lg:py-32 bg-[#f7f9f7]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Founder&apos;s Message</Label>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-[1.4] mb-12">
              なぜ、いまこの挑戦を始めるのか。
            </h2>
            <div className="space-y-6 text-base md:text-[17px] text-gray-700 leading-[2]">
              <p>
                日本の自然や田舎は、放っておけば残るものではありません。
                守り、育て、次の世代に手渡す人がいて、はじめて残っていくものです。
              </p>
              <p>
                けれど今、その役割を担う人が足りていません。
                本来なら、能力も志もある若者たちが向かうべき場所の一つが、一次産業の現場であるはずです。そこには、<span className="font-semibold text-gray-900">国土を守る仕事があり、地域を支える仕事があり、未来をつくる仕事があります。</span>
              </p>
              <p>
                私は、優秀な若者がもっと自然に、もっと本気で、一次産業を目指せる社会をつくりたいと考えています。
                <br />
                翡翠プロジェクトは、そのための最初の一歩です。
              </p>
              <p className="pt-4 text-sm text-gray-500">
                clearAI株式会社 代表取締役　髙橋 敢輝
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 12 — クロージング */}
      <section className="py-28 lg:py-40 bg-[#0a1410] relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(20,83,45,0.5) 0%, rgba(0,0,0,0) 70%)",
          }}
        />
        <div className="max-w-3xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-[1.5] mb-12 [text-shadow:0_2px_24px_rgba(0,0,0,0.6)]">
              日本の自然は、<br />
              自然のままでは残りません。<br />
              <span className="text-emerald-300">守る人が必要です。</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-gray-300 leading-[2] mb-14">
              <p>
                次の時代のエリートが向かうべき場所は、<br />
                まだ都会だけではありません。
              </p>
              <p>
                田舎を守ることは、過去を守ることではない。<br />
                <span className="font-semibold text-white">未来をつくることです。</span>
              </p>
            </div>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 text-white font-semibold px-9 py-4 hover:bg-emerald-400 shadow-[0_0_50px_rgba(16,185,129,0.4)] transition-all duration-300"
            >
              翡翠プロジェクトに加わる
              <span>→</span>
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

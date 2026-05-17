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
type AiServiceColor = "blue" | "indigo" | "amber" | "orange" | "rose" | "sky";

const aiServiceColorMap: Record<AiServiceColor, { hoverBorder: string; code: string; cta: string; ctaHover: string }> = {
  blue:   { hoverBorder: "hover:border-green-300",   code: "text-green-600",   cta: "text-green-600",   ctaHover: "group-hover:text-green-700" },
  indigo: { hoverBorder: "hover:border-indigo-300", code: "text-indigo-600", cta: "text-indigo-600", ctaHover: "group-hover:text-indigo-700" },
  amber:  { hoverBorder: "hover:border-amber-300",  code: "text-amber-600",  cta: "text-amber-600",  ctaHover: "group-hover:text-amber-700" },
  orange: { hoverBorder: "hover:border-orange-300", code: "text-orange-600", cta: "text-orange-600", ctaHover: "group-hover:text-orange-700" },
  rose:   { hoverBorder: "hover:border-rose-300",   code: "text-rose-600",   cta: "text-rose-600",   ctaHover: "group-hover:text-rose-700" },
  sky:    { hoverBorder: "hover:border-sky-300",    code: "text-sky-600",    cta: "text-sky-600",    ctaHover: "group-hover:text-sky-700" },
};

// ヘッダーのAIメニューと並びを揃える(/ai-consulting, /advisor, /training, /claude, /advertising, /website)
const aiServices: {
  code: string;
  title: string;
  desc: string;
  tags: string[];
  href: string;
  cta: string;
  color: AiServiceColor;
  badge?: string;
}[] = [
  {
    code: "AI 01",
    title: "コンサル・DX",
    desc: "大手コンサル出身者が監修。戦略策定から実装・運用まで、日本企業のAI活用をヒアリングから定着まで一気通貫で伴走します。",
    tags: ["AI戦略策定", "データ分析", "業務自動化", "生成AI活用"],
    href: "/ai-consulting",
    cta: "詳しく見る",
    color: "blue",
  },
  {
    code: "AI 02",
    title: "顧問",
    desc: "月5万円〜、外部AI顧問として月次で経営・業務・Web改善を業務委託契約ベースで継続的に伴走支援します。",
    tags: ["月額契約", "月次壁打ち", "経営伴走", "業務委託"],
    href: "/advisor",
    cta: "顧問契約のご相談",
    color: "indigo",
  },
  {
    code: "AI 03",
    title: "研修",
    desc: "チームのAIリテラシーを底上げ。導入研修から部門別ワークショップ、実務適用まで、社員が主役になる学習プログラムを設計・提供します。",
    tags: ["社員研修", "部門別ワークショップ", "プロンプト設計", "業務適用"],
    href: "/training",
    cta: "研修プログラムを見る",
    color: "amber",
    badge: "補助金 最大75%OFF",
  },
  {
    code: "AI 04",
    title: "Claude特化",
    desc: "Anthropic Claudeに特化した導入支援。環境構築・社内ルール整備・MCP/サブエージェント設計・運用定着まで、現場に特化して伴走します。",
    tags: ["Claude Code", "環境構築", "MCP / Agents", "運用定着"],
    href: "/claude",
    cta: "詳しく見る",
    color: "orange",
  },
  {
    code: "AI 05",
    title: "広告",
    desc: "AI活用で広告運用を最適化・自動化。クリエイティブ生成からターゲティング、入札・効果検証までAIで効率化し、ROAS改善を伴走します。",
    tags: ["広告運用", "クリエイティブ生成", "効果検証", "自動化"],
    href: "/advertising",
    cta: "詳しく見る",
    color: "rose",
  },
  {
    code: "AI 06",
    title: "ウェブサイト作成",
    desc: "AI時代に成果が出るサイトを高速制作。Next.js + Vercel + Headless CMSで、表示速度・SEO・運用しやすさを最高水準に。",
    tags: ["Next.js", "Vercel", "SEO", "Headless CMS"],
    href: "/website",
    cta: "詳しく見る",
    color: "sky",
  },
];

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold tracking-widest uppercase text-green-600 mb-4">{children}</p>
  );
}

export default function HomeContent({ newsSlot }: { newsSlot: ReactNode }) {
  const [heroLoaded, setHeroLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setHeroLoaded(true), 100); }, []);

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-8 py-24 text-center">
          <div className="flex flex-wrap justify-center gap-2 mb-6 transition-all duration-700" style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "200ms" }}>
            {["7領域で伴走", "戦略から実装まで", "中小企業特化"].map((tag) => (
              <span key={tag} className="inline-flex items-center rounded-full bg-green-50 text-green-700 border border-green-100 px-3 py-1 text-xs font-semibold">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.15] tracking-tight mb-8 transition-all duration-700" style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(24px)", transitionDelay: "400ms" }}>
            日本の中小企業に、<br />
            <span className="text-green-600">使えるAI</span>と<span className="text-green-600">実装力</span>を。
          </h1>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto mb-10 transition-all duration-700" style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "650ms" }}>
            AI導入支援を、戦略から実装まで一気通貫で。<br className="hidden md:inline" />
            コンサル・顧問・研修・Claude Code導入・広告・Web制作・補助金活用の7領域で、現場で動くものまで責任を持ちます。
          </p>
          <div className="flex flex-wrap justify-center items-center gap-5 transition-all duration-700" style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "850ms" }}>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-green-600 text-white font-semibold px-7 py-3.5 hover:bg-green-700 transition-colors duration-300 shadow-[0_8px_24px_-8px_rgba(22,163,74,0.5)]">
              まずは相談する
              <span aria-hidden>→</span>
            </Link>
            <Link href="#services" className="inline-flex items-center gap-1.5 text-sm text-gray-700 font-semibold hover:text-green-600 transition-colors duration-300">
              事業を見る
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ TRUST METRICS ═══ */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              {[
                { value: "最大75%", label: "研修費助成対応" },
                { value: "7領域", label: "AI活用ワンストップ" },
                { value: "全国対応", label: "オンライン実施可" },
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
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <Reveal>
              <SectionLabel>Our Vision</SectionLabel>
              <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-6">
                AIを、日本の現場へ届ける。
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <div className="space-y-5">
                <p className="text-base text-gray-600 leading-relaxed">
                  AIはまだ、多くの企業にとって遠い存在です。難しい、コストが高い、何から始めればいいかわからない——そんな声を何度も聞いてきました。
                </p>
                <p className="text-base text-gray-600 leading-relaxed">
                  私たちはそのギャップを埋めるために生まれました。最先端のAI技術をビジネスの言葉に翻訳し、エンジニアの力で現場の経営を支える。一社一社に寄り添い、確かな価値を届けていきます。
                </p>
                <div className="h-px bg-gray-200 mt-6" />
                <div className="flex items-center gap-8 pt-4">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">7<span className="text-sm text-gray-400 ml-1 font-normal">領域</span></p>
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

      {/* ═══ ENTRY PRODUCTS ═══ */}
      <section className="py-20 lg:py-28 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <SectionLabel>Get Started</SectionLabel>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">
              まずは、小さく始められます。
            </h2>
            <p className="text-base text-gray-500 mb-14 max-w-2xl leading-relaxed">
              いきなりの大型契約は不要です。30分の無料診断と3分で読める資料から、貴社に合うかを見極めてください。
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Reveal delay={0}>
              <Link href="/contact?service=consulting" className="group block h-full">
                <div className="bg-white border border-gray-200 rounded-2xl p-8 lg:p-10 hover:border-green-300 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  <span className="inline-block text-xs font-semibold tracking-widest uppercase text-green-600 mb-4">STEP 01</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">無料AI診断（30分）</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-1">
                    現状の業務・課題をヒアリングし、AI活用で効果の高そうな領域を1つ特定してお返しします。営業色の強い提案はしません。
                  </p>
                  <ul className="space-y-2 text-xs text-gray-500 mb-6">
                    <li>・Zoom / 対面いずれも可</li>
                    <li>・NDA締結のうえ、機密情報も扱えます</li>
                    <li>・その場で簡易レポートを口頭共有</li>
                  </ul>
                  <span className="text-sm font-semibold text-green-600 group-hover:text-green-700 transition-colors">申し込む →</span>
                </div>
              </Link>
            </Reveal>
            <Reveal delay={80}>
              <Link href="/contact?service=consulting&doc=company-deck" className="group block h-full">
                <div className="bg-white border border-gray-200 rounded-2xl p-8 lg:p-10 hover:border-indigo-300 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  <span className="inline-block text-xs font-semibold tracking-widest uppercase text-indigo-600 mb-4">STEP 02</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">3分でわかる会社資料</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-1">
                    事業内容・代表的な支援パターン・料金レンジ・補助金活用例をまとめた1枚PDFを送付します。社内稟議用にどうぞ。
                  </p>
                  <ul className="space-y-2 text-xs text-gray-500 mb-6">
                    <li>・PDF 1ページ</li>
                    <li>・料金レンジと進め方の目安入り</li>
                    <li>・登録不要・当日返信</li>
                  </ul>
                  <span className="text-sm font-semibold text-indigo-600 group-hover:text-indigo-700 transition-colors">資料をもらう →</span>
                </div>
              </Link>
            </Reveal>
            <Reveal delay={160}>
              <Link href="/contact?service=consulting&doc=poc" className="group block h-full">
                <div className="bg-white border border-gray-200 rounded-2xl p-8 lg:p-10 hover:border-amber-300 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  <span className="inline-block text-xs font-semibold tracking-widest uppercase text-amber-600 mb-4">STEP 03</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">1部署・1業務からのPoC</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-1">
                    いきなり全社展開ではなく、最も効果が出そうな1部署・1業務に絞って小さく試行導入。効果が見えてから拡張します。
                  </p>
                  <ul className="space-y-2 text-xs text-gray-500 mb-6">
                    <li>・PoC期間 1〜2ヶ月</li>
                    <li>・成功基準を事前合意</li>
                    <li>・人材開発支援助成金の活用も可</li>
                  </ul>
                  <span className="text-sm font-semibold text-amber-600 group-hover:text-amber-700 transition-colors">相談する →</span>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section id="services" className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <SectionLabel>Our Services</SectionLabel>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">
              AIで、日本の未来をつくる。
            </h2>
            <p className="text-base text-gray-500 mb-14 max-w-2xl leading-relaxed">
              戦略から実装・運用まで、AI活用の各領域で確実に成果を届けます。
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {aiServices.map((svc, i) => {
              const c = aiServiceColorMap[svc.color];
              return (
                <Reveal key={svc.code} delay={(i % 3) * 80} className="h-full">
                  <Link href={svc.href} className="group block h-full">
                    <div className={`relative bg-white border border-gray-200 rounded-2xl p-8 lg:p-10 ${c.hoverBorder} hover:shadow-lg transition-all duration-300 h-full flex flex-col`}>
                      {svc.badge && (
                        <span className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1 tracking-wide">
                          {svc.badge}
                        </span>
                      )}
                      <span className={`inline-block text-xs font-semibold tracking-widest uppercase ${c.code} mb-4`}>{svc.code}</span>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">{svc.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-1">
                        {svc.desc}
                      </p>
                      <div className="flex items-center gap-3 flex-wrap mb-6">
                        {svc.tags.map((tag) => (
                          <span key={tag} className="text-xs text-gray-500 border border-gray-200 rounded px-2.5 py-1">{tag}</span>
                        ))}
                      </div>
                      <span className={`text-sm font-semibold ${c.cta} ${c.ctaHover} transition-colors`}>
                        {svc.cta} →
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ APPROACH ═══ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <SectionLabel>Our Approach</SectionLabel>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-14">
              私たちが大切にする3つのこと
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: "01", title: "正直であること", desc: "実現可能性を率直に見極め、効果の高い領域から着実に進めます。過度な期待を煽らず、成果が出る順に一歩ずつ。" },
              { num: "02", title: "伴走すること", desc: "導入して終わりではなく、運用が定着するまで。お客様のチームの一員として、ともに歩みます。" },
              { num: "03", title: "現場に落とし込むこと", desc: "技術選定から運用設計まで、現場で使える形に落とし込みます。専門知識がなくても扱える、具体的な提案を。" },
            ].map((item, i) => (
              <Reveal key={item.num} delay={i * 80}>
                <div className="border-t-2 border-green-600 pt-6">
                  <span className="text-xs font-semibold text-green-600 tracking-widest">{item.num}</span>
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
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <SectionLabel>Our Team</SectionLabel>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">
              戦略から実装・運用まで、<br className="hidden sm:inline" />信頼できるプロフェッショナルが担います。
            </h2>
            <p className="text-base text-gray-500 mb-14 max-w-2xl leading-relaxed">
              経営コンサルの視座と、現場で鍛え上げたエンジニアリングの実装力。二つを掛け合わせ、提案だけで終わらせず、稼働するシステムと継続的な価値創出まで一貫して責任を持ちます。
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            <Reveal delay={0} className="h-full">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 lg:p-10 h-full flex flex-col">
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-green-600 mb-4">Strategy &amp; DX</span>
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
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <SectionLabel>Tech Stack</SectionLabel>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">使用技術</h2>
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
                      <p className="text-[10px] font-semibold tracking-widest text-green-600 uppercase">{group.category}</p>
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
          <Reveal>
            <div className="mt-10 border-t border-gray-200 pt-8">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900 mb-1">上記以外の技術にも対応可能</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    お客様の既存環境・社内標準・業界要件に合わせて、記載以外の言語・フレームワーク・クラウド・SaaS連携にも柔軟に対応いたします。まずはお気軽にご相談ください。
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ NEWS / BLOG ═══ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <SectionLabel>News</SectionLabel>
              <h2 className="text-3xl font-bold text-gray-900 leading-tight">お知らせ</h2>
            </div>
            <Link href="/blog" className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-700 transition-colors">
              一覧を見る →
            </Link>
          </div>
          {newsSlot}
          <div className="text-center mt-8 sm:hidden">
            <Link href="/blog" className="text-sm font-semibold text-green-600">一覧を見る →</Link>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <SectionLabel>Contact</SectionLabel>
              <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-6">
                まずは、お話ししませんか。
              </h2>
              <p className="text-base text-gray-600 leading-relaxed max-w-lg mx-auto">
                AIのことがわからなくても大丈夫です。<br />貴社の状況に合わせて、一緒に考えます。
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { label: "AIコンサルティング", service: "consulting", color: "blue" },
              { label: "AI顧問 + ウェブサイト監修", service: "advisor", color: "indigo" },
              { label: "AI導入・教育", service: "education", color: "amber" },
              { label: "CEO向けAI活用", service: "ceo", color: "violet" },
              { label: "Claude Code特化導入", service: "claude-code", color: "orange" },
              { label: "AI広告運用", service: "advertising", color: "rose" },
            ].map((item, i) => (
              <Reveal key={item.service} delay={i * 50}>
                <Link
                  href={`/contact?service=${item.service}`}
                  className="group block rounded-xl border border-gray-200 bg-white px-5 py-4 hover:border-green-300 hover:shadow-md transition-all duration-300"
                >
                  <span className="block text-sm font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                    {item.label}
                  </span>
                  <span className="block text-xs text-gray-400 mt-1">お問い合わせ →</span>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={350}>
            <div className="text-center mt-8">
              <Link href="/contact" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                その他のお問い合わせはこちら →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

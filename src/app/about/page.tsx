"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";

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
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const companyInfo = [
  { label: "会社名", value: "clearAI株式会社" },
  { label: "読み方", value: "クリアエーアイ" },
  { label: "英文表記", value: "clearAI Inc." },
  { label: "別表記", value: "clear AI / クリアAI / クリア・エーアイ / クリアーエーアイ" },
  { label: "設立", value: "2026年4月" },
  { label: "代表取締役", value: "髙橋 敢輝" },
  { label: "所在地", value: "茨城県" },
  { label: "事業内容", value: "AIコンサルティング事業 / 農業×エンジニアリング事業" },
  { label: "資本金", value: "非公開" },
  { label: "主要取引銀行", value: "非公開" },
  { label: "URL", value: "https://clearai.jp" },
];

const timeline = [
  {
    year: "2025年",
    title: "構想開始",
    description: "創業準備、市場調査、パートナー候補との対話。日本のAI活用の現状と課題を徹底的にリサーチ。",
    future: false,
  },
  {
    year: "2026年4月",
    title: "clearAI株式会社 設立",
    description: "定款認証を経て、AIの力を日本の企業と農業現場に届けるというミッションのもと茨城県にて創業。",
    future: false,
  },
  {
    year: "2026年",
    title: "AIコンサルティング事業 開始",
    description: "日本企業向けに、AI戦略策定から実装・運用まで一気通貫の支援を開始。",
    future: false,
  },
  {
    year: "2026年",
    title: "農業×エンジニアリング事業 開始",
    description: "EC構築・利益率改善・業務効率化で、農家の経営をエンジニアの力で支援開始。",
    future: false,
  },
  {
    year: "2027年（予定）",
    title: "AI顧問10社 / 農業事業 単月黒字化",
    description: "紹介・金融機関提携・士業ネットワークを通じてAI顧問契約を10社まで拡大。農業事業はEC運用代行で月額MRR化し、単月黒字を達成。",
    future: true,
  },
  {
    year: "2028年（予定）",
    title: "AI顧問20社 / 農業事業 通期黒字",
    description: "代表の卒業に合わせ経営フルコミット。顧問契約20社・農業事業の通期黒字化を実現し、仕組みで回る組織へ。",
    future: true,
  },
  {
    year: "2030年（目標）",
    title: "売上500億円 / 支援企業120社 / 関東圏No.1ブティック",
    description: "粗利率50%超・継続率95%の「質を伴う500億円」を達成。茨城発、AI×地域産業の専門ブティックとして関東圏での確固たる地位を築く。",
    future: true,
  },
];

export default function AboutPage() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setHeroLoaded(true), 100); }, []);

  return (
    <main className="min-h-screen bg-white">

      {/* ─── 1. HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute bottom-1/3 right-1/4 w-[1px] h-[1px] shadow-[0_0_300px_150px_rgba(37,99,235,0.07)]" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <span className="inline-block rounded-full bg-blue-50 text-blue-600 px-3 py-1 text-sm font-semibold mb-6 transition-all duration-700" style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "300ms" }}>
            About Us
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6 transition-all duration-700" style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(24px)", transitionDelay: "500ms" }}>
            AIで、日本の<br />産業構造を、書き換える。
          </h1>
          <p className="text-base text-gray-600 leading-relaxed max-w-lg mx-auto mb-10 transition-all duration-700" style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "700ms" }}>
            clearAIは、人工知能の力を真に必要としている現場へ届けるため創業しました。<br />大企業だけのものではない、すべての産業のためのAIを。
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 transition-all duration-700" style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "900ms" }}>
            <div className="inline-flex items-center gap-3 border border-gray-200 rounded-full px-6 py-3 bg-white">
              <span className="text-2xl font-bold text-blue-600">500億円</span>
              <span className="text-sm text-gray-500">2030年 売上目標</span>
            </div>
            <div className="inline-flex items-center gap-3 border border-gray-200 rounded-full px-6 py-3 bg-white">
              <span className="text-2xl font-bold text-emerald-600">120社</span>
              <span className="text-sm text-gray-500">支援目標企業数</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. MISSION NARRATIVE ────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
            <Reveal>
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-6">私たちのミッション</p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight">
                  AIの力を、<br />すべての企業と、<br />すべての現場に。
                </h2>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="space-y-6 text-base text-gray-600 leading-relaxed">
                <p>
                  日本のAI導入率は、先進国の中でも著しく低い水準に留まっています。多くの企業が「AIに興味はある」と答える一方で、実際の業務改革には至っていない。この「関心」と「実践」の間にある大きな溝こそが、私たちが解決すべき課題です。
                </p>
                <p>
                  AIブームが叫ばれる一方で、現場では「何から始めればいいかわからない」「導入したが使いこなせない」という声が後を絶ちません。技術だけが先行し、実際のビジネス課題と結びついていない。そのギャップが、日本全体の競争力を蝕んでいます。
                </p>
                <p>
                  clearAIは、誇張や流行に乗るのではなく、誠実かつ地に足のついたアプローチでAI活用を推進します。お客様のビジネスを深く理解し、技術を現場の言葉に翻訳し、長期的なパートナーとして伴走する——それが私たちの約束です。
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── 3. VISION 2030 ──────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-gray-950 relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-400 mb-6">Vision 2030</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-6 max-w-2xl">
              2030年、関東圏で<br />最も信頼されるAIパートナーへ。
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed max-w-xl mb-16">
              派手な数字ではなく、一社一社の成功を積み重ねる。この3つの数字は、その結果として私たちが辿り着く約束です。
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            <Reveal delay={0}>
              <div className="border border-white/10 rounded-2xl p-8 bg-white/5">
                <p className="text-4xl lg:text-5xl font-bold text-white mb-2">500億円</p>
                <p className="text-sm font-semibold text-blue-400 mb-3">目標売上高（2030年）</p>
                <p className="text-sm text-gray-400 leading-relaxed">粗利率50%超・継続率95%の「質を伴う500億円」。派手な数字ではなく、一社一社の成功を積み重ねた結果としての売上です。</p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="border border-white/10 rounded-2xl p-8 bg-white/5">
                <p className="text-4xl lg:text-5xl font-bold text-white mb-2">120社</p>
                <p className="text-sm font-semibold text-blue-400 mb-3">支援目標企業数</p>
                <p className="text-sm text-gray-400 leading-relaxed">うちAI顧問契約40社・継続支援60社。広く浅くではなく、深く長く伴走できる関係性を築きます。</p>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="border border-white/10 rounded-2xl p-8 bg-white/5">
                <p className="text-4xl lg:text-5xl font-bold text-white mb-2">関東圏</p>
                <p className="text-sm font-semibold text-blue-400 mb-3">事業展開エリア</p>
                <p className="text-sm text-gray-400 leading-relaxed">茨城発・関東圏No.1のAI×地域産業ブティックへ。その先に、2035年の全国展開と食料安全保障インフラとしての中堅テック企業を見据えます。</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── 4. CORE VALUES ──────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-6">価値観</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-16 max-w-xl">
              私たちが大切にする、<br />4つの信条。
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 auto-rows-fr">
            {[
              {
                num: "01",
                title: "誠実",
                subtitle: "Integrity",
                quote: "できないことは、できないと言う。",
                desc: "AIは万能ではありません。誇張した提案で信頼を失うより、正直に限界を伝え、できることに全力を尽くす。それが長期的な関係の基盤です。",
              },
              {
                num: "02",
                title: "伴走",
                subtitle: "Partnership",
                quote: "納品して終わり、ではない。",
                desc: "AIシステムを構築して終わりではなく、運用・改善・社内定着まで共に走り続けます。お客様の成功こそが、私たちの成功です。",
              },
              {
                num: "03",
                title: "翻訳",
                subtitle: "Translation",
                quote: "技術を、現場の言葉に変える。",
                desc: "難解なAI用語を使わず、現場の方々が理解し、使いこなせる言葉で説明します。技術の民主化とは、誰もが使える言葉にすることから始まります。",
              },
              {
                num: "04",
                title: "長期視点",
                subtitle: "Long-term View",
                quote: "派手さより、10年続く仕組み。",
                desc: "流行の技術を追いかけるのではなく、10年後も価値を発揮し続ける堅牢な仕組みを構築します。本質的な変革には、時間と根気が必要です。",
              },
            ].map((v, i) => (
              <Reveal key={v.num} delay={i * 80} className="h-full">
                <article className="group h-full border border-gray-200 rounded-2xl p-8 bg-white hover:border-blue-300 hover:shadow-lg transition-all duration-300 cursor-default">
                  <div className="flex items-start gap-4 mb-5">
                    <span className="text-4xl font-bold text-gray-100 leading-none select-none inline-block transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:text-blue-500 group-hover:drop-shadow-[0_6px_12px_rgba(59,130,246,0.35)]">{v.num}</span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{v.title}</h3>
                      <p className="text-xs text-gray-400 font-medium tracking-wide">{v.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-base font-bold text-blue-600 mb-3">{v.quote}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{v.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. WHY NOW ──────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-6">Why Now</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-16 max-w-xl">
              2026年、<br />日本のAI元年。
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 auto-rows-fr">
            {[
              {
                num: "01",
                title: "生成AIによる生産性革命",
                desc: "ChatGPTの登場から数年、生成AIは実験段階を超え、ビジネスの現場で実際の生産性向上を生み出す段階に入りました。今こそが、本格導入の最良のタイミングです。先手を打つ企業と出遅れる企業の差は、これから急速に拡大します。",
              },
              {
                num: "02",
                title: "労働人口減少という構造課題",
                desc: "日本は世界有数の少子高齢化社会として、慢性的な労働力不足に直面しています。AIによる自動化・効率化は、もはや選択肢ではなく必須の経営戦略です。特に農業・製造業・サービス業での人手不足は深刻です。",
              },
              {
                num: "03",
                title: "海外との技術ギャップの拡大",
                desc: "米国・中国・欧州のAI活用は日本を大きく上回るペースで進んでいます。このまま手をこまねいていれば、日本企業の国際競争力はさらに低下します。今すぐ動き出した企業だけが、次の10年を生き残れます。",
              },
            ].map((r, i) => (
              <Reveal key={r.num} delay={i * 80} className="h-full">
                <div className="group h-full bg-white border border-gray-200 rounded-2xl p-8 hover:border-blue-300 hover:shadow-lg transition-all duration-300 cursor-default">
                  <span className="block text-5xl font-bold text-gray-100 mb-4 leading-none select-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:text-blue-500 group-hover:drop-shadow-[0_8px_16px_rgba(59,130,246,0.35)]">{r.num}</span>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{r.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{r.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. BUSINESS AREAS ───────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-6">事業領域</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-16 max-w-xl">
              2つの事業で、<br />日本を変える。
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            <Reveal delay={0}>
              <article className="border-2 border-blue-600 rounded-2xl p-8 md:p-10 flex flex-col h-full">
                <div className="mb-6">
                  <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-600 border border-blue-200 bg-blue-50 rounded-full px-4 py-1.5 mb-4">事業 01</span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">AIコンサルティング</h3>
                  <p className="text-base font-semibold text-blue-600">戦略から実装まで、一気通貫で伴走する。</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    "AI戦略策定・ロードマップ設計",
                    "業務自動化・プロセス変革の実装支援",
                    "社内AI人材育成・研修プログラム",
                    "導入後の継続的な改善・運用サポート",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                      <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/ai-consulting"
                  className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:gap-3 transition-all duration-200"
                >
                  詳しく見る <span aria-hidden>→</span>
                </Link>
              </article>
            </Reveal>

            <Reveal delay={80}>
              <article className="border-2 border-emerald-600 rounded-2xl p-8 md:p-10 flex flex-col h-full">
                <div className="mb-6">
                  <span className="inline-block text-xs font-semibold tracking-widest uppercase text-emerald-600 border border-emerald-200 bg-emerald-50 rounded-full px-4 py-1.5 mb-4">事業 02</span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">農業×エンジニアリング</h3>
                  <p className="text-base font-semibold text-emerald-600">エンジニアの力で、農家の経営を支える。</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    "農家向けEC・ネット販売サイト構築",
                    "利益率改善コンサルティング",
                    "受発注・顧客管理の業務効率化",
                    "ブランディング・マーケティング支援",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                      <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/ai-agriculture"
                  className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:gap-3 transition-all duration-200"
                >
                  詳しく見る <span aria-hidden>→</span>
                </Link>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── 7. LEADERSHIP MESSAGE ───────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-6">Message</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-12">
              代表取締役メッセージ
            </h2>
          </Reveal>

          <div className="max-w-3xl">
            <Reveal delay={80}>
              <blockquote className="border-l-4 border-blue-600 pl-8">
                <div className="space-y-6 text-base md:text-lg text-gray-700 leading-relaxed">
                  <p>
                    「なぜ農業なのか」と、よく聞かれます。
                  </p>
                  <p>
                    私がAIと農業の掛け合わせに可能性を見出したのは、日本の農業現場が抱える課題の深刻さと、そこにあるテクノロジーへの渇望を目の当たりにしたからです。高齢化する農家の方々、引き継ぎ手のない農地、気候変動による収穫の不安定さ——これらの問題は、決して農業だけの話ではありません。日本の食の安全保障そのものです。
                  </p>
                  <p>
                    同時に、日本の企業全体を見渡したとき、AI活用における途方もない機会損失が見えました。「AIは大企業のもの」「自分たちには難しすぎる」という思い込みが、多くの中堅・中小企業の可能性を閉ざしています。その壁を壊したい。
                  </p>
                  <p>
                    clearAIという名前には、「明確な（clear）AI」という意味を込めています。難解な技術を分かりやすく、誠実に、現場に根ざした形で届ける会社でありたい。2030年に売上500億円という目標は、決して小さくはありません。しかし、粗利率50%超・顧客継続率95%という「質を伴った500億円」は、無理に積み上げた数字ではなく、一社一社の成功の積み重ねとして達成する。次の1000億円、1兆円へと続く揺るぎない踏み台になると信じています。
                  </p>
                  <p>
                    まだ小さな会社です。でも、大きなビジョンがあります。共に歩んでいただける仲間、パートナー、お客様を、心からお待ちしています。
                  </p>
                </div>
                <footer className="mt-10 pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-500">clearAI株式会社 代表取締役</p>
                  <p className="text-base font-bold text-gray-900 mt-1">髙橋 敢輝</p>
                </footer>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── 8. COMPANY INFORMATION ──────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-6">Company</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-12">
              企業情報
            </h2>
          </Reveal>

          <div className="max-w-2xl">
            {companyInfo.map((item, i) => (
              <Reveal key={item.label} delay={i * 60}>
                <div className="flex flex-col sm:flex-row sm:items-baseline py-5 border-b border-gray-100 last:border-0">
                  <span className="sm:w-48 shrink-0 text-sm font-semibold text-gray-500 mb-1 sm:mb-0">
                    {item.label}
                  </span>
                  <span className="text-base text-gray-900 font-medium">
                    {item.value}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8.5 ABOUT THE NAME ──────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-6">About the Name</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-8 max-w-xl">
              社名「clearAI」について
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            <Reveal delay={80}>
              <div className="space-y-5 text-base text-gray-600 leading-relaxed">
                <p>
                  社名「<strong className="text-gray-900">clearAI（クリアエーアイ）</strong>」は、英単語の <em>clear</em>（明確な・クリアな）と <em>AI</em>（Artificial Intelligence：人工知能）を組み合わせた造語です。
                </p>
                <p>
                  正式名称は「clearAI株式会社」、英文表記は「clearAI Inc.」。日本語では「<strong>クリアエーアイ</strong>」と読み、「クリアAI」「クリア・エーアイ」「クリアーエーアイ」「クリアエイアイ」といった表記・読み方でも呼ばれることがあります。
                </p>
                <p>
                  難解なAI技術を、誇張せず、分かりやすく、誠実に。企業と現場に<strong>クリアな価値</strong>を届けるという私たちの理念がこの社名に込められています。
                </p>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
                <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-4">Name &amp; Reading</p>
                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="text-gray-500 mb-1">正式社名</dt>
                    <dd className="text-gray-900 font-semibold">clearAI株式会社</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 mb-1">読み方（ふりがな）</dt>
                    <dd className="text-gray-900 font-semibold">クリアエーアイ かぶしきがいしゃ</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 mb-1">英文表記</dt>
                    <dd className="text-gray-900 font-semibold">clearAI Inc.</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 mb-1">別表記・通称</dt>
                    <dd className="text-gray-700">clear AI / Clear AI / クリアAI / クリア・エーアイ / クリアーエーアイ / クリアエイアイ</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 mb-1">ドメイン</dt>
                    <dd className="text-gray-900 font-semibold">clearai.jp</dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── 9. HISTORY / TIMELINE ───────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-6">History</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-16">
              沿革
            </h2>
          </Reveal>

          <div className="relative max-w-2xl">
            {/* Vertical line */}
            <div className="absolute left-[5px] top-2 bottom-2 w-px bg-gray-200" />

            <div className="space-y-12">
              {timeline.map((item, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className="relative pl-12">
                    {/* Dot — filled for past, outlined for future */}
                    {item.future ? (
                      <div className="absolute left-0 top-1.5 w-[11px] h-[11px] rounded-full border-2 border-blue-300 bg-white" />
                    ) : (
                      <div className="absolute left-0 top-1.5 w-[11px] h-[11px] rounded-full bg-blue-600" />
                    )}

                    <span className={`block text-xs font-bold tracking-wide mb-1.5 ${item.future ? "text-blue-300" : "text-blue-600"}`}>
                      {item.year}
                    </span>
                    <h3 className={`text-base font-bold mb-2 ${item.future ? "text-gray-400" : "text-gray-900"}`}>
                      {item.title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${item.future ? "text-gray-400" : "text-gray-600"}`}>
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 10. CTA ─────────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 to-gray-950 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <Reveal>
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-400 mb-6">Join Us</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-6 max-w-2xl mx-auto">
              共に、未来をつくる<br />仲間を探しています。
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed max-w-lg mx-auto mb-12">
              clearAIのミッションに共感してくださる方、パートナー企業様、採用希望の方、まずはお気軽にご連絡ください。
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-base rounded-lg px-8 py-4 transition-colors duration-200"
              >
                お問い合わせ
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-white/20 text-white/60 font-semibold text-base rounded-lg px-8 py-4 hover:border-white/40 hover:text-white transition-colors duration-200">
                採用情報 →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </main>
  );
}

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
  { label: "英文表記", value: "clearAI Inc." },
  { label: "設立", value: "2026年4月" },
  { label: "代表取締役", value: "髙橋 敢輝" },
  { label: "所在地", value: "茨城県" },
  { label: "事業内容", value: "AIコンサルティング事業 / 農業×エンジニアリング事業" },
  { label: "資本金", value: "非公開" },
  { label: "主要取引銀行", value: "非公開" },
  { label: "URL", value: "https://clearai.jp" },
];

const members = [
  {
    name: "髙橋 敢輝",
    nameEn: "kante takahashi",
    role: "代表取締役 CEO / 事業開発（茨城高専）",
    bio: "茨城県出身。AIと農業の交差点に日本の未来を見出し、2026年にclearAIを創業。誠実・伴走・翻訳・長期視点をコアバリューに、関東・東北No.1のAI×地域産業ブティックを目指す。",
  },
  {
    name: "西村 吉正",
    nameEn: "yoshimasa nishimura",
    role: "Co-Founder & COO / オペレーション（東京大学）",
    bio: "東京大学在学中。clearAIの共同創業者兼COOとして事業オペレーション全般を統括。現場と経営を繋ぐ実行力を強みに、組織のスケールを支える。",
  },
  {
    name: "伊藤 愛基",
    nameEn: "manaki ito",
    role: "アドバイザー / 技術・事業助言（筑波大学）",
    bio: "茨城県出身。茨城高専卒業後、筑波大学へ編入。Web開発歴6年以上。MIXIグループ「ラブグラフ」やシリコンバレー発スタートアップで立ち上げから運用までを一貫して担当。起業経験に基づくビジネス視点と長期的な拡張性を見据えた設計を強みとする。",
  },
  {
    name: "千葉 亘将",
    nameEn: "kousuke chiba",
    role: "CAIO / AI戦略（明治大学）",
    bio: "岩手県出身。明治大学に入学後、起業を志し中退。現在はドラッグストアの開発とマーケティング業務に従事。若い世代で地方創生をすることを目標に活動中。",
  },
  {
    name: "赤池 心太朗",
    nameEn: "Shintaro Akaike",
    role: "CMO / マーケティング（名古屋大学）",
    bio: "愛知県出身。名古屋大学経済学部在学中。マーケティング会社でのインターンを経験しながら、PMや新規事業立ち上げに従事。名古屋と東京の二拠点生活をしながら、新しい経験を求め奔走中。",
  },
  {
    name: "菊池 秀弥",
    nameEn: "shuya kikuchi",
    role: "CHRO / 組織づくり（青山学院大学）",
    bio: "茨城県出身。青山学院大学国際政治経済学部在学中。ボランティアを行う学生コミュニティを運営。大手CVCでのインターン後に会社を設立し、AIを使える学生を増やすことをモットーにClaude CodeやCodexを中心に教育を展開。",
  },
  {
    name: "アニ",
    nameEn: "Ani",
    role: "共同研究者",
    bio: "モザンビーク出身。茨城高専機械系在学中。モザンビークで電気電子工学を学んだ後、来日し日本語学校で日本語を習得。インターナショナルスクールで学んだ英語も生かしながら、エンジニアとしてグローバルに活動することを目指す。",
  },
  {
    name: "鈴木 隆生",
    nameEn: "ryusei suzuki",
    role: "共同研究者",
    bio: "茨城県出身。茨城高専情報系在学中。高専でPythonやC言語を学びながら、地元日立を創生することを目指し、日本中の田舎のリサーチ業務に従事。地元の自然を守ることを目指し、今後共同で研究を進める。",
  },
  {
    name: "郷 由稀斗",
    nameEn: "Yukito Go",
    role: "AI導入コンサルタント / 農業分野共同参画者・アドバイザー",
    bio: "福岡県出身。筑波大学情報メディア創生学類在学中。EQパートナーズ株式会社CAIO、Queue株式会社PMや複数社でのエンジニア/CTO経験を経て、金融機関・エンプラ等の大規模案件や地方自治体向けイベントアプリの立ち上げを統括。「誰もが『創りたい』を創れる社会を創る」を掲げ、AIの民主化を推進中。",
  },
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
    description: "EC運営と輸入事業を軸に、農家・エンジニアと共同で農業の研究開発を進める。",
    future: false,
  },
  {
    year: "2026年度中",
    title: "AI顧問10社 / 農業事業 単月黒字化",
    description: "紹介・金融機関提携・士業ネットワークを通じてAI顧問契約を10社まで拡大。農業事業はEC運用代行で月額MRR化し、単月黒字を達成。",
    future: true,
  },
  {
    year: "2027年（予定）",
    title: "AI顧問20社 / 農業事業 通期黒字",
    description: "代表の卒業に合わせ経営フルコミット。顧問契約20社・農業事業の通期黒字化を実現し、仕組みで回る組織へ。",
    future: true,
  },
  {
    year: "2030年（目標）",
    title: "売上1000億円 / 支援企業120社 / 関東・東北No.1ブティック",
    description: "粗利率50%超・継続率95%の「質を伴う1000億円」を達成。茨城発、AI×地域産業の専門ブティックとして関東・東北での確固たる地位を築く。",
    future: true,
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* ─── 3. VISION 2030 ──────────────────────────────────────────────── */}
      <section className="py-40 lg:py-56 bg-gray-950 relative overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/videos/vision-2030.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(3,7,18,0.55) 0%, rgba(3,7,18,0.7) 55%, rgba(3,7,18,0.85) 100%)",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-400 mb-6">Vision 2030</p>
            <h2 className="text-3xl font-bold text-white leading-tight mb-6 max-w-2xl">
              2030年、関東・東北で<br />最も信頼されるAIパートナーへ。
            </h2>
            <p className="text-base text-gray-300 leading-relaxed max-w-xl mb-16">
              派手な数字ではなく、一社一社の成功を積み重ねる。この3つの数字は、その結果として私たちが辿り着く約束です。
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8 auto-rows-fr">
            <Reveal delay={0} className="h-full">
              <div className="h-full border border-white/10 rounded-2xl p-10 lg:p-12 bg-white/10 backdrop-blur-md flex flex-col">
                <p className="text-4xl lg:text-5xl font-bold text-white mb-2">1500億円</p>
                <p className="text-sm font-semibold text-blue-400 mb-3">時価総額（2035年）</p>
                <p className="text-sm text-gray-300 leading-relaxed">粗利率50%超・継続率95%の「質を伴う事業」を積み上げ、2035年に時価総額1500億円を目指します。派手な数字ではなく、一社一社の成功を積み重ねた結果としての企業価値です。</p>
              </div>
            </Reveal>
            <Reveal delay={80} className="h-full">
              <div className="h-full border border-white/10 rounded-2xl p-10 lg:p-12 bg-white/10 backdrop-blur-md flex flex-col">
                <p className="text-4xl lg:text-5xl font-bold text-white mb-2">120社</p>
                <p className="text-sm font-semibold text-blue-400 mb-3">支援目標企業数</p>
                <p className="text-sm text-gray-300 leading-relaxed">うちAI顧問契約40社・継続支援60社。広く浅くではなく、深く長く伴走できる関係性を築きます。</p>
              </div>
            </Reveal>
            <Reveal delay={160} className="h-full">
              <div className="h-full border border-white/10 rounded-2xl p-10 lg:p-12 bg-white/10 backdrop-blur-md flex flex-col">
                <p className="text-4xl lg:text-5xl font-bold text-white mb-2 whitespace-nowrap">関東・東北</p>
                <p className="text-sm font-semibold text-blue-400 mb-3">事業展開エリア</p>
                <p className="text-sm text-gray-300 leading-relaxed">茨城発・関東・東北No.1のAI×地域産業ブティックへ。その先に、2035年の全国展開と食料安全保障インフラとしての中堅テック企業を見据えます。</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── 7. LEADERSHIP MESSAGE ───────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-6">Message</p>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-12">
              代表取締役メッセージ
            </h2>
          </Reveal>

          <div className="max-w-3xl">
            <Reveal delay={80}>
              <blockquote className="border-l-4 border-blue-600 pl-8">
                <div className="space-y-6 text-base text-gray-700 leading-relaxed">
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

      {/* ─── 7.5 MEMBERS ─────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-6">Members</p>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-6 max-w-xl">
              メンバー
            </h2>
            <p className="text-base text-gray-600 leading-relaxed max-w-2xl mb-16">
              clearAIを支えるメンバーをご紹介します。少数精鋭で、お客様一社一社に深く伴走します。
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {members.map((m, i) => (
              <Reveal key={m.name} delay={i * 80} className="h-full">
                <article className="group h-full border border-gray-200 rounded-2xl p-8 bg-white hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">{m.name}</h3>
                    <p className="text-xs text-gray-400 font-medium tracking-wide mt-0.5">{m.nameEn}</p>
                  </div>
                  <p className="text-sm font-semibold text-blue-600 mb-3">{m.role}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{m.bio}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 9. HISTORY / TIMELINE ───────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-6">History</p>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-16">
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
      <section className="py-20 lg:py-28 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 to-gray-950 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <Reveal>
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-400 mb-6">Join Us</p>
            <h2 className="text-3xl font-bold text-white leading-tight mb-6 max-w-2xl mx-auto">
              共に、未来をつくる<br />仲間を探しています。
            </h2>
            <p className="text-base text-gray-400 leading-relaxed max-w-lg mx-auto mb-12">
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

      {/* ─── 11. COMPANY INFORMATION (moved below Join Us) ───────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-6">Company</p>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-12">
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

    </main>
  );
}

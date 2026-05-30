"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

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

type TimelineItem = { year: string; title: string; description: string; future: boolean };
type MemberItem = { name: string; nameEn: string; role: string; bio: string };
type CompanyRow = { label: string; value: string };

type Copy = {
  visionLabel: string;
  visionTitle: string;
  visionDesc: string;
  vision: { num: string; label: string; desc: string }[];
  membersLabel: string;
  membersTitle: string;
  membersDesc: string;
  members: MemberItem[];
  historyLabel: string;
  historyTitle: string;
  timeline: TimelineItem[];
  joinLabel: string;
  joinTitle: string;
  joinDesc: string;
  joinCta: string;
  joinRecruit: string;
  companyLabel: string;
  companyTitle: string;
  companyInfo: CompanyRow[];
};

const COPY: Record<"ja" | "en", Copy> = {
  ja: {
    visionLabel: "Vision 2030",
    visionTitle: "2030年、日本で\n最も信頼されるAIパートナーへ。",
    visionDesc: "派手な数字ではなく、一社一社の成功を積み重ねる。この3つの数字は、その結果として私たちが辿り着く約束です。",
    vision: [
      {
        num: "1000億円",
        label: "時価総額（2030年）",
        desc: "粗利率50%超・継続率95%の「質を伴う事業」を積み上げ、2030年に時価総額1000億円を目指します。派手な数字ではなく、一社一社の成功を積み重ねた結果としての企業価値です。",
      },
      {
        num: "120社",
        label: "支援目標企業数",
        desc: "うちAI顧問契約40社・継続支援60社。広く浅くではなく、深く長く伴走できる関係性を築きます。",
      },
      {
        num: "日本全国",
        label: "事業展開エリア",
        desc: "茨城発・日本No.1のAI活用支援ブティックへ。エリアを絞らず全国の中小企業に伴走し、その先にフィジカルAI・ロボットを組み合わせた中堅テック企業を見据えます。",
      },
    ],
    membersLabel: "Members",
    membersTitle: "メンバー",
    membersDesc: "clearAIを支えるメンバーをご紹介します。少数精鋭で、お客様一社一社に深く伴走します。",
    members: [
      {
        name: "髙橋 敢輝",
        nameEn: "kante takahashi",
        role: "代表取締役 CEO / 事業開発（茨城高専）",
        bio: "茨城県出身。日本の中小企業にAIを届けることを使命に、2026年にclearAIを創業。誠実・伴走・翻訳・長期視点をコアバリューに、AI活用支援とフィジカルAI・ロボットで日本一信頼されるAIパートナーを目指す。",
      },
      {
        name: "西村 吉正",
        nameEn: "yoshimasa nishimura",
        role: "Co-Founder & COO / オペレーション（東京大学）",
        bio: "東京大学在学中。clearAIの共同創業者兼COOとして事業オペレーション全般を統括。現場と経営を繋ぐ実行力を強みに、組織のスケールを支える。",
      },
      {
        name: "國井 真帆",
        nameEn: "maho kunii",
        role: "CTO / 開発（茨城高専）",
        bio: "茨城高専在学中のエンジニア。CTOとしてclearAIのプロダクト開発と技術基盤の構築を主導する。",
      },
      {
        name: "伊藤 愛基",
        nameEn: "manaki ito",
        role: "アドバイザー / 技術・事業助言（筑波大学）",
        bio: "茨城県出身。茨城高専卒業後、筑波大学へ編入。Web開発歴6年以上。MIXIグループ「ラブグラフ」やシリコンバレー発スタートアップで立ち上げから運用までを一貫して担当。起業経験に基づくビジネス視点と長期的な拡張性を見据えた設計を強みとする。",
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
        role: "AI導入コンサルタント / アドバイザー",
        bio: "福岡県出身。筑波大学情報メディア創生学類在学中。EQパートナーズ株式会社CAIO、Queue株式会社PMや複数社でのエンジニア/CTO経験を経て、金融機関・エンプラ等の大規模案件や地方自治体向けイベントアプリの立ち上げを統括。「誰もが『創りたい』を創れる社会を創る」を掲げ、AIの民主化を推進中。",
      },
    ],
    historyLabel: "History",
    historyTitle: "沿革",
    timeline: [
      {
        year: "2025年",
        title: "構想開始",
        description: "創業準備、市場調査、パートナー候補との対話。日本のAI活用の現状と課題を徹底的にリサーチ。",
        future: false,
      },
      {
        year: "2026年4月",
        title: "clearAI株式会社 設立",
        description: "定款認証を経て、AIの力を日本の中小企業に届けるというミッションのもと茨城県にて創業。",
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
        title: "ロボットレンタル事業 開始（Coming Soon）",
        description: "UnitreeやAGIBOTのヒューマノイド・ロボットを輸入・レンタル提供。フィジカルAIで中小企業の現場課題を解決する新事業を立ち上げ。",
        future: false,
      },
      {
        year: "2026年度中",
        title: "AI顧問10社 / ロボットレンタル 正式ローンチ",
        description: "紹介・金融機関提携・士業ネットワークを通じてAI顧問契約を10社まで拡大。ロボットレンタル事業を正式ローンチし、初期レンタル案件を獲得。",
        future: true,
      },
      {
        year: "2027年（予定）",
        title: "AI顧問20社 / ロボットレンタル 通期黒字",
        description: "代表の卒業に合わせ経営フルコミット。顧問契約20社・ロボットレンタル事業の通期黒字化を実現し、AI＋フィジカルAIの両輪で仕組みで回る組織へ。",
        future: true,
      },
      {
        year: "2030年（目標）",
        title: "時価総額1000億円 / 支援企業120社 / 日本No.1ブティック",
        description: "粗利率50%超・継続率95%の「質を伴う時価総額1000億円」を達成。茨城発、AI×地域産業の専門ブティックとして日本全国で確固たる地位を築く。",
        future: true,
      },
    ],
    joinLabel: "Join Us",
    joinTitle: "共に、未来をつくる\n仲間を探しています。",
    joinDesc: "clearAIのミッションに共感してくださる方、パートナー企業様、採用希望の方、まずはお気軽にご連絡ください。",
    joinCta: "お問い合わせ",
    joinRecruit: "採用情報 →",
    companyLabel: "Company",
    companyTitle: "企業情報",
    companyInfo: [
      { label: "会社名", value: "clearAI株式会社" },
      { label: "英文表記", value: "clearAI Inc." },
      { label: "設立", value: "2026年4月" },
      { label: "代表取締役", value: "髙橋 敢輝" },
      { label: "所在地", value: "茨城県" },
      { label: "事業内容", value: "AI顧問・研修・コンサル / Web制作・SNS運用 / ロボットレンタル" },
      { label: "資本金", value: "非公開" },
      { label: "主要取引銀行", value: "非公開" },
      { label: "URL", value: "https://clearai.jp" },
    ],
  },
  en: {
    visionLabel: "Vision 2030",
    visionTitle: "By 2030, the most trusted AI partner\nacross Japan.",
    visionDesc: "Not flashy numbers — compounding wins, one company at a time. These three figures are the promise we'll reach by doing exactly that.",
    vision: [
      {
        num: "JPY 100B",
        label: "Market cap (2030)",
        desc: "Building quality operations with 50%+ gross margin and 95% retention, targeting a JPY 100B market cap by 2030. Not a forced number — enterprise value earned one customer success at a time.",
      },
      {
        num: "120",
        label: "Target companies served",
        desc: "40 AI-advisor contracts and 60 ongoing engagements. Not broad-and-shallow — deep, long-term partnerships.",
      },
      {
        num: "Nationwide",
        label: "Business area",
        desc: "From Ibaraki, toward the #1 AI adoption boutique across Japan — serving SMEs nationwide without regional limits, and on toward a mid-tier tech company combining software AI with physical AI and robotics.",
      },
    ],
    membersLabel: "Members",
    membersTitle: "Our Team",
    membersDesc: "Meet the team behind clearAI. A lean, focused group committed to walking alongside each client.",
    members: [
      {
        name: "髙橋 敢輝",
        nameEn: "kante takahashi",
        role: "CEO / Business Development (Ibaraki KOSEN)",
        bio: "From Ibaraki. Founded clearAI in 2026 with a mission to bring AI to Japanese SMEs. Guides the company with core values of integrity, partnership, translation, and long-term thinking — aiming to be the most trusted AI partner across Japan, combining AI advisory with physical AI and robotics.",
      },
      {
        name: "西村 吉正",
        nameEn: "yoshimasa nishimura",
        role: "Co-Founder & COO / Operations (University of Tokyo)",
        bio: "Currently enrolled at the University of Tokyo. As Co-Founder and COO, oversees all business operations. Strengths lie in bridging the field and management, supporting organizational scale.",
      },
      {
        name: "國井 真帆",
        nameEn: "maho kunii",
        role: "CTO / Engineering (Ibaraki KOSEN)",
        bio: "Engineer currently enrolled at Ibaraki KOSEN. As CTO, leads clearAI's product development and technical foundation.",
      },
      {
        name: "伊藤 愛基",
        nameEn: "manaki ito",
        role: "Advisor / Technology & Business (University of Tsukuba)",
        bio: "From Ibaraki. Transferred to University of Tsukuba after Ibaraki KOSEN. 6+ years in web development. Worked end-to-end on MIXI Group's Lovegraph and a Silicon Valley startup. Strong in business perspective grounded in entrepreneurial experience and scalable system design.",
      },
      {
        name: "赤池 心太朗",
        nameEn: "Shintaro Akaike",
        role: "CMO / Marketing (Nagoya University)",
        bio: "From Aichi. Currently studying economics at Nagoya University. Gained marketing internship experience while leading PM and new-business initiatives. Lives across Nagoya and Tokyo, pursuing fresh challenges.",
      },
      {
        name: "菊池 秀弥",
        nameEn: "shuya kikuchi",
        role: "CHRO / People & Culture (Aoyama Gakuin University)",
        bio: "From Ibaraki. Currently studying international political economy at Aoyama Gakuin University. Runs a student volunteer community. After a major CVC internship, founded a company focused on growing AI-literate students, primarily through Claude Code and Codex education.",
      },
      {
        name: "アニ",
        nameEn: "Ani",
        role: "Research Collaborator",
        bio: "From Mozambique. Currently in the mechanical engineering program at Ibaraki KOSEN. Studied electrical and electronic engineering in Mozambique before coming to Japan and learning Japanese. Aims to work globally as an engineer, leveraging both Japanese and the English learned at an international school.",
      },
      {
        name: "鈴木 隆生",
        nameEn: "ryusei suzuki",
        role: "Research Collaborator",
        bio: "From Ibaraki. Currently in the information systems program at Ibaraki KOSEN. Studies Python and C at KOSEN while conducting research on rural communities across Japan with the goal of revitalizing his hometown Hitachi. Aims to protect the local natural environment through ongoing collaborative research.",
      },
      {
        name: "郷 由稀斗",
        nameEn: "Yukito Go",
        role: "AI Adoption Consultant / Advisor",
        bio: "From Fukuoka. Currently in the information media creation program at University of Tsukuba. After CAIO at EQ Partners and PM at Queue, plus engineer/CTO roles at multiple companies, has led large-scale financial and enterprise projects and local-government event app launches. Champions AI democratization under the motto 'Create a society where anyone can build what they want to build.'",
      },
    ],
    historyLabel: "History",
    historyTitle: "Timeline",
    timeline: [
      {
        year: "2025",
        title: "Conceptualization",
        description: "Founding preparation, market research, and conversations with prospective partners. A thorough read of Japan's AI status quo and pain points.",
        future: false,
      },
      {
        year: "April 2026",
        title: "clearAI Inc. founded",
        description: "After incorporation, launched in Ibaraki on the mission of bringing AI to Japanese SMEs.",
        future: false,
      },
      {
        year: "2026",
        title: "AI consulting business launched",
        description: "End-to-end support for Japanese companies — from AI strategy through implementation and operation.",
        future: false,
      },
      {
        year: "2026",
        title: "Robot rental business launched (Coming Soon)",
        description: "Importing and renting humanoid robots and autonomous machines (Unitree, AGIBOT) to solve on-site challenges for SMEs. Physical AI as clearAI's second pillar.",
        future: false,
      },
      {
        year: "FY2026",
        title: "10 AI advisor clients / Robot rental officially launched",
        description: "Expand AI-advisor contracts to 10 companies via referrals, financial-institution partnerships, and professional networks. Officially launch the robot rental service and close initial rental deals.",
        future: true,
      },
      {
        year: "2027 (planned)",
        title: "20 AI advisors / Robot rental profitable full year",
        description: "Founder commits full-time to management. 20 advisor contracts and a full-year-profitable robot rental business — AI advisory and physical AI running as two complementary pillars.",
        future: true,
      },
      {
        year: "2030 (goal)",
        title: "JPY 100B market cap / 120 clients / #1 boutique in Japan",
        description: "'JPY 100B market cap with quality' at 50%+ gross margin and 95% retention. A boutique rooted in Ibaraki, leading at the intersection of AI and industry across Japan.",
        future: true,
      },
    ],
    joinLabel: "Join Us",
    joinTitle: "Building the future\nwith us.",
    joinDesc: "If our mission resonates — as a teammate, partner, or future hire — please reach out.",
    joinCta: "Contact",
    joinRecruit: "Careers →",
    companyLabel: "Company",
    companyTitle: "Company Information",
    companyInfo: [
      { label: "Company name", value: "clearAI Inc." },
      { label: "English name", value: "clearAI Inc." },
      { label: "Founded", value: "April 2026" },
      { label: "CEO", value: "kante takahashi" },
      { label: "Location", value: "Ibaraki, Japan" },
      { label: "Business", value: "AI Advisory & Training & Consulting / Web & SNS / Robot Rental" },
      { label: "Capital", value: "Private" },
      { label: "Main bank", value: "Private" },
      { label: "URL", value: "https://clearai.jp" },
    ],
  },
};

export default function AboutPage() {
  const { lang } = useLanguage();
  const t = COPY[lang];

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
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-400 mb-6">{t.visionLabel}</p>
            <h2 className="text-3xl font-bold text-white leading-tight mb-6 max-w-2xl whitespace-pre-line">
              {t.visionTitle}
            </h2>
            <p className="text-base text-gray-300 leading-relaxed max-w-xl mb-16">
              {t.visionDesc}
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8 auto-rows-fr">
            {t.vision.map((item, i) => (
              <Reveal key={item.label} delay={i * 80} className="h-full">
                <div className="h-full border border-white/10 rounded-2xl p-10 lg:p-12 bg-white/10 backdrop-blur-md flex flex-col">
                  <p className="text-4xl lg:text-5xl font-bold text-white mb-2">{item.num}</p>
                  <p className="text-sm font-semibold text-blue-400 mb-3">{item.label}</p>
                  <p className="text-sm text-gray-300 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7.5 MEMBERS ─────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-6">{t.membersLabel}</p>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-6 max-w-xl">
              {t.membersTitle}
            </h2>
            <p className="text-base text-gray-600 leading-relaxed max-w-2xl mb-16">
              {t.membersDesc}
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {t.members.map((m, i) => (
              <Reveal key={m.nameEn} delay={i * 80} className="h-full">
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
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-6">{t.historyLabel}</p>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-16">
              {t.historyTitle}
            </h2>
          </Reveal>

          <div className="relative max-w-2xl">
            {/* Vertical line */}
            <div className="absolute left-[5px] top-2 bottom-2 w-px bg-gray-200" />

            <div className="space-y-12">
              {t.timeline.map((item, i) => (
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
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-400 mb-6">{t.joinLabel}</p>
            <h2 className="text-3xl font-bold text-white leading-tight mb-6 max-w-2xl mx-auto whitespace-pre-line">
              {t.joinTitle}
            </h2>
            <p className="text-base text-gray-400 leading-relaxed max-w-lg mx-auto mb-12">
              {t.joinDesc}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-base rounded-lg px-8 py-4 transition-colors duration-200"
              >
                {t.joinCta}
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-white/20 text-white/60 font-semibold text-base rounded-lg px-8 py-4 hover:border-white/40 hover:text-white transition-colors duration-200">
                {t.joinRecruit}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── 11. COMPANY INFORMATION (moved below Join Us) ───────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-6">{t.companyLabel}</p>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-12">
              {t.companyTitle}
            </h2>
          </Reveal>

          <div className="max-w-2xl">
            {t.companyInfo.map((item, i) => (
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

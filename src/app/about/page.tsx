"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

// 出身校の紋章（名前の横に表示）— キーはメンバーの日本語名
const CREST_BY_NAME: Record<string, string> = {
  "髙橋 敢輝": "/images/crests/kosen.png",
  "鈴木 隆生": "/images/crests/kosen.png",
  "飯島 聡太": "/images/crests/kosen.png",
  "アニ": "/images/crests/kosen.png",
  "石嶋 悠一": "/images/crests/keio.svg",
  "西村 吉正": "/images/crests/tokyo.svg",
  "吉次 優太": "/images/crests/tokyo.svg",
  "菊池 秀弥": "/images/crests/aoyama-fit.svg",
  "伊藤 愛基": "/images/crests/tsukuba-fit.svg",
};

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
    visionDesc: "この数字は、一社一社の成功を積み重ねた先に辿り着く約束です。",
    vision: [
      {
        num: "120社",
        label: "支援目標企業数",
        desc: "AI顧問契約40社・継続支援60社を、広く浅くではなく深く長い伴走で実現します。",
      },
      {
        num: "日本全国",
        label: "事業展開エリア",
        desc: "茨城発・全国の中小企業にエリア問わず伴走しながら、フィジカルAI・ロボットを加えた日本No.1のAI活用支援ブティックを目指します。",
      },
    ],
    membersLabel: "Members",
    membersTitle: "メンバー",
    membersDesc: "少数精鋭で一社一社に深く伴走するClearAIのメンバーです。",
    members: [
      {
        name: "髙橋 敢輝",
        nameEn: "kante takahashi",
        role: "代表取締役 CEO / 事業開発（茨城高専）",
        bio: "日本の中小企業にAIを届けることを使命に2026年にClearAIを創業し、誠実・伴走・翻訳・長期視点をコアバリューにAI活用支援とロボットで日本一信頼されるAIパートナーを目指す。",
      },
      {
        name: "石嶋 悠一",
        nameEn: "yuichi ishijima",
        role: "Co-Founder & COO / 事業開発・営業（慶應義塾大学）",
        bio: "慶應義塾大学経済学部在学中、経済学の定量的視点を武器に市場分析から営業まで担い、経営課題を成長につなげる提案でClearAIのビジネス基盤を推進する。",
      },
      {
        name: "西村 吉正",
        nameEn: "yoshimasa nishimura",
        role: "Co-Founder & CSO / オペレーション（東京大学）",
        bio: "東京大学在学中、共同創業者兼CSOとして事業オペレーション全般を統括し、現場と経営を繋ぐ実行力で組織のスケールを支える。",
      },
      {
        name: "菊池 秀弥",
        nameEn: "shuya kikuchi",
        role: "CHRO / 組織づくり（青山学院大学）",
        bio: "青山学院大学国際政治経済学部在学中、大手CVCインターン後に会社を設立し、AI教育の普及を使命にClaude Code・Codexを中心とした教育を展開する。",
      },
      {
        name: "アニ",
        nameEn: "Ani",
        role: "共同研究者",
        bio: "モザンビーク出身で電気電子工学を学んだ後に来日、茨城高専機械系在学中に日英両語を活かしながらグローバルなエンジニアを目指す。",
      },
      {
        name: "鈴木 隆生",
        nameEn: "ryusei suzuki",
        role: "CTO / 開発（茨城高専）",
        bio: "茨城高専情報系在学中、PythonやC言語を学びながら地元日立の創生と地方リサーチに取り組み、自然保護を目指す共同研究を進める。",
      },
      {
        name: "飯島 聡太",
        nameEn: "sota iijima",
        role: "ロボティクスエンジニア（茨城高専）",
        bio: "茨城高専在学中のエンジニアで、Unityゲーム開発で培った実装力をヒューマノイド・ロボティクスに注ぎ、シミュレーション構築から実機制御までを担う。",
      },
      {
        name: "伊藤 愛基",
        nameEn: "manaki ito",
        role: "アドバイザー / 技術・事業助言（筑波大学）",
        bio: "茨城高専から筑波大学に編入、Web開発歴6年以上でMIXIグループやシリコンバレーのスタートアップ立ち上げを担い、起業経験に基づくビジネス視点とスケーラブルな設計を強みとする。",
      },
      {
        name: "吉次 優太",
        nameEn: "Yoshitsugu Yuta",
        role: "パートナー / 事業開発",
        bio: "ZSHK Japanの立ち上げとM&A仲介でのセールスAI活用を経てDiaL Shiftを創業・売却し、現在はClearAIパートナーとして事業開発を支援する。",
      },
    ],
    historyLabel: "History",
    historyTitle: "沿革",
    timeline: [
      {
        year: "2025年",
        title: "構想開始",
        description: "創業準備と市場調査、パートナー候補との対話を通じ、日本のAI活用の現状と課題を徹底リサーチ。",
        future: false,
      },
      {
        year: "2026年4月",
        title: "ClearAI株式会社 設立",
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
        year: "2026年度中",
        title: "AI顧問10社 体制へ",
        description: "紹介・提携・士業ネットワークでAI顧問を10社に拡大し、初期案件を安定的に獲得。",
        future: true,
      },
      {
        year: "2027年（予定）",
        title: "AI顧問20社 / 通期黒字",
        description: "代表が経営にフルコミットし、顧問20社・通期黒字化で持続的に成長する組織へ。",
        future: true,
      },
      {
        year: "2030年（目標）",
        title: "時価総額1000億円 / 支援企業120社 / 日本No.1ブティック",
        description: "粗利率50%超・継続率95%の質を伴う時価総額1000億円を達成し、茨城発AI×地域産業のブティックとして日本全国に確固たる地位を築く。",
        future: true,
      },
    ],
    joinLabel: "Join Us",
    joinTitle: "共に、未来をつくる\n仲間を探しています。",
    joinDesc: "ClearAIのミッションに共感してくださる方、パートナー企業様、採用希望の方、まずはお気軽にご連絡ください。",
    joinCta: "お問い合わせ",
    joinRecruit: "採用情報 →",
    companyLabel: "Company",
    companyTitle: "企業情報",
    companyInfo: [
      { label: "会社名", value: "ClearAI株式会社" },
      { label: "英文表記", value: "ClearAI Inc." },
      { label: "設立", value: "2026年4月" },
      { label: "代表取締役", value: "髙橋 敢輝" },
      { label: "所在地", value: "茨城県" },
      { label: "事業内容", value: "AI顧問・研修・コンサル / Web制作・SNS運用" },
      { label: "資本金", value: "非公開" },
      { label: "主要取引銀行", value: "非公開" },
      { label: "URL", value: "https://clearai.jp" },
    ],
  },
  en: {
    visionLabel: "Vision 2030",
    visionTitle: "By 2030, the most trusted AI partner\nacross Japan.",
    visionDesc: "These figures are a promise built on compounding wins, one company at a time.",
    vision: [
      {
        num: "120",
        label: "Target companies served",
        desc: "40 AI-advisor contracts and 60 ongoing engagements built on depth, not breadth.",
      },
      {
        num: "Nationwide",
        label: "Business area",
        desc: "From Ibaraki, toward the #1 AI adoption boutique across Japan — serving SMEs nationwide without regional limits, and on toward a mid-tier tech company combining software AI with physical AI and robotics.",
      },
    ],
    membersLabel: "Members",
    membersTitle: "Our Team",
    membersDesc: "A lean, focused team committed to walking alongside each client.",
    members: [
      {
        name: "髙橋 敢輝",
        nameEn: "kante takahashi",
        role: "CEO / Business Development (Ibaraki KOSEN)",
        bio: "Founded ClearAI in 2026 with a mission to bring AI to Japanese SMEs, guiding the company toward being Japan's most trusted AI partner through values of integrity, partnership, and long-term thinking.",
      },
      {
        name: "石嶋 悠一",
        nameEn: "yuichi ishijima",
        role: "Co-Founder & COO / Business Development & Sales (Keio University)",
        bio: "An economics student at Keio University, leveraging quantitative analysis to cover everything from market research to sales, turning clients' management challenges into growth for ClearAI.",
      },
      {
        name: "西村 吉正",
        nameEn: "yoshimasa nishimura",
        role: "Co-Founder & CSO / Operations (University of Tokyo)",
        bio: "University of Tokyo student and Co-Founder & CSO overseeing all business operations, bridging the field and management to support organizational scale.",
      },
      {
        name: "菊池 秀弥",
        nameEn: "shuya kikuchi",
        role: "CHRO / People & Culture (Aoyama Gakuin University)",
        bio: "International political economy student at Aoyama Gakuin University who, after a major CVC internship, founded a company to grow AI-literate students through Claude Code and Codex education.",
      },
      {
        name: "アニ",
        nameEn: "Ani",
        role: "Research Collaborator",
        bio: "Mechanical engineering student at Ibaraki KOSEN from Mozambique, bringing electrical engineering expertise and fluency in both Japanese and English toward a global engineering career.",
      },
      {
        name: "鈴木 隆生",
        nameEn: "ryusei suzuki",
        role: "CTO / Engineering (Ibaraki KOSEN)",
        bio: "Information systems student at Ibaraki KOSEN studying Python and C while researching rural communities to revitalize his hometown Hitachi and protect the local natural environment.",
      },
      {
        name: "飯島 聡太",
        nameEn: "sota iijima",
        role: "Robotics Engineer (Ibaraki KOSEN)",
        bio: "An engineer at Ibaraki KOSEN channeling rich Unity game development experience into humanoid robotics — from simulation environments to real-hardware control.",
      },
      {
        name: "伊藤 愛基",
        nameEn: "manaki ito",
        role: "Advisor / Technology & Business (University of Tsukuba)",
        bio: "Transferred from Ibaraki KOSEN to University of Tsukuba, bringing 6+ years of web development across MIXI Group's Lovegraph and a Silicon Valley startup, with strengths in entrepreneurial business judgment and scalable design.",
      },
      {
        name: "吉次 優太",
        nameEn: "Yoshitsugu Yuta",
        role: "Partner / Business Development",
        bio: "After the launch of ZSHK Japan and M&A inside sales work that led him to found and sell DiaL Shift, he joined ClearAI as a partner to support business development.",
      },
    ],
    historyLabel: "History",
    historyTitle: "Timeline",
    timeline: [
      {
        year: "2025",
        title: "Conceptualization",
        description: "Founding preparation, market research, and partner conversations to develop a thorough understanding of Japan's AI landscape and pain points.",
        future: false,
      },
      {
        year: "April 2026",
        title: "ClearAI Inc. founded",
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
        year: "FY2026",
        title: "Scaling to 10 AI advisor clients",
        description: "Expand AI-advisor contracts to 10 companies via referrals and partnerships, steadily closing initial deals.",
        future: true,
      },
      {
        year: "2027 (planned)",
        title: "20 AI advisors / profitable full year",
        description: "Founder commits full-time, reaching 20 advisor contracts and full-year profitability as a sustainably growing organization.",
        future: true,
      },
      {
        year: "2030 (goal)",
        title: "JPY 100B market cap / 120 clients / #1 boutique in Japan",
        description: "JPY 100B market cap with 50%+ gross margin and 95% retention, establishing ClearAI as the leading AI-and-industry boutique across Japan, rooted in Ibaraki.",
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
      { label: "Company name", value: "ClearAI Inc." },
      { label: "English name", value: "ClearAI Inc." },
      { label: "Founded", value: "April 2026" },
      { label: "CEO", value: "kante takahashi" },
      { label: "Location", value: "Ibaraki, Japan" },
      { label: "Business", value: "AI Advisory & Training & Consulting / Web & SNS" },
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
      <section className="py-40 lg:py-56 bg-neutral-950 relative overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/videos/vision-bg-poster.jpg"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/videos/vision-bg.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(3,7,18,0.55) 0%, rgba(3,7,18,0.7) 55%, rgba(3,7,18,0.85) 100%)",
          }}
        />
        <div className="relative z-10 max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold tracking-widest uppercase text-neutral-300 mb-6">{t.visionLabel}</p>
            <h2 className="text-3xl font-bold text-white leading-tight mb-6 w-full whitespace-pre-line">
              {t.visionTitle}
            </h2>
            <p className="text-base text-gray-300 leading-relaxed w-full mb-16">
              {t.visionDesc}
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8 auto-rows-fr">
            {t.vision.map((item, i) => (
              <Reveal key={item.label} delay={i * 80} className="h-full">
                <div className="h-full border border-white/10 rounded-lg p-10 lg:p-12 bg-white/10 backdrop-blur-md flex flex-col">
                  <p className="text-4xl lg:text-5xl font-bold text-white mb-2">{item.num}</p>
                  <p className="text-sm font-semibold text-neutral-300 mb-3">{item.label}</p>
                  <p className="text-sm text-gray-300 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7.5 MEMBERS ─────────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold tracking-widest uppercase text-neutral-900 mb-6">{t.membersLabel}</p>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-6 w-full">
              {t.membersTitle}
            </h2>
            <p className="text-base text-gray-600 leading-relaxed w-full mb-16">
              {t.membersDesc}
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {t.members.map((m, i) => (
              <Reveal key={m.nameEn} delay={i * 80} className="h-full">
                <article className="group h-full border border-gray-200 rounded-lg p-8 bg-white hover:border-neutral-300 hover:shadow-lg transition-all duration-300">
                  <div className="mb-6 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 leading-tight">{m.name}</h3>
                      <p className="text-xs text-gray-400 font-medium tracking-wide mt-0.5">{m.nameEn}</p>
                    </div>
                    {CREST_BY_NAME[m.name] && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={CREST_BY_NAME[m.name]}
                        alt=""
                        aria-hidden="true"
                        className="w-10 h-10 lg:w-11 lg:h-11 object-contain shrink-0 mt-0.5"
                      />
                    )}
                  </div>
                  <p className="text-sm font-semibold text-neutral-900 mb-3">{m.role}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{m.bio}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 9. HISTORY / TIMELINE ───────────────────────────────────────── */}
      <section className="py-14 lg:py-20 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold tracking-widest uppercase text-neutral-900 mb-6">{t.historyLabel}</p>
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
                      <div className="absolute left-0 top-1.5 w-[11px] h-[11px] rounded-full border-2 border-neutral-300 bg-white" />
                    ) : (
                      <div className="absolute left-0 top-1.5 w-[11px] h-[11px] rounded-full bg-neutral-900" />
                    )}

                    <span className={`block text-xs font-bold tracking-wide mb-1.5 ${item.future ? "text-neutral-300" : "text-neutral-900"}`}>
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
      <section className="py-14 lg:py-20 bg-neutral-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/40 to-gray-950 pointer-events-none" />
        <div className="relative max-w-[1800px] mx-auto px-6 lg:px-8 text-center">
          <Reveal>
            <p className="text-xs font-semibold tracking-widest uppercase text-neutral-300 mb-6">{t.joinLabel}</p>
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
                className="inline-flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-base rounded-lg px-8 py-4 transition-colors duration-200"
              >
                {t.joinCta}
              </Link>
              <Link href="/careers" className="inline-flex items-center justify-center gap-2 border border-white/20 text-white/60 font-semibold text-base rounded-lg px-8 py-4 hover:border-white/40 hover:text-white transition-colors duration-200">
                {t.joinRecruit}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── 11. COMPANY INFORMATION (moved below Join Us) ───────────────── */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold tracking-widest uppercase text-neutral-900 mb-6">{t.companyLabel}</p>
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

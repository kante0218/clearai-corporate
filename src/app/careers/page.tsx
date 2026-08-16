"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

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

function Label({ children }: { children: ReactNode }) {
  return <p className="text-xs font-semibold tracking-[0.2em] text-neutral-500 uppercase mb-3">{children}</p>;
}

type Position = {
  id: string;
  title: string;
  en: string;
  mission: string;
  duties: string[];
  welcome: string[];
  employment: string;
};

type CareersCopy = {
  heroLabel: string;
  heroTitle: string;
  heroDesc: string;
  openLabel: string;
  openTitle: string;
  dutiesLabel: string;
  welcomeLabel: string;
  employmentLabel: string;
  apply: string;
  commonLabel: string;
  commonTitle: string;
  common: { label: string; value: string }[];
  flowLabel: string;
  flowTitle: string;
  flow: { num: string; title: string; desc: string }[];
  ctaTitle: string;
  ctaDesc: string;
  ctaButton: string;
  ctaMail: string;
  positions: Position[];
};

const COPY: Record<"ja" | "en", CareersCopy> = {
  ja: {
    heroLabel: "Careers",
    heroTitle: "AIとロボットで、日本の現場を変える仲間を探しています。",
    heroDesc: "ClearAIは、AI・システム開発、ロボットレンタル、AI研修を通じて中小企業の現場に成果を届けるスタートアップです。肩書きよりも手を動かすこと、提案よりも実装まで届けることを大切にしています。経験の多寡より、立ち上げ期を面白がれるかどうかを重視します。",
    openLabel: "Open Positions",
    openTitle: "募集職種",
    dutiesLabel: "主な業務",
    welcomeLabel: "歓迎するスキル・経験",
    employmentLabel: "雇用形態",
    apply: "この職種に応募する",
    commonLabel: "Conditions",
    commonTitle: "共通の勤務条件",
    common: [
      { label: "勤務地", value: "茨城（本社）／東京。フルリモート・ハイブリッド応相談（ハードウェアエンジニアは現場作業あり）" },
      { label: "勤務時間", value: "フレックス（コアタイムなし）。成果ベースで柔軟に設計します" },
      { label: "給与", value: "経験・稼働形態に応じて面談で決定。共同創業者は株式・ストックオプションを含めて設計" },
      { label: "働き方", value: "Claude Code等のAIツールを全職種で全面活用。少人数で大きな成果を出す働き方です" },
    ],
    flowLabel: "Process",
    flowTitle: "選考の流れ",
    flow: [
      { num: "01", title: "応募", desc: "お問い合わせフォームまたはメールで、経歴がわかるもの（職務経歴書・GitHub・ポートフォリオ等）をお送りください。" },
      { num: "02", title: "カジュアル面談", desc: "オンラインで30〜60分。事業の現状と役割を率直にお話しします。志望動機は不要、まず知り合うところから。" },
      { num: "03", title: "トライアル", desc: "実際の業務を小さく一緒にやってみます（有償・内容は職種により応相談）。お互いのミスマッチを防ぎます。" },
      { num: "04", title: "オファー", desc: "条件をすり合わせて合流。副業からのスタートも歓迎です。" },
    ],
    ctaTitle: "まずは、カジュアルにお話ししませんか。",
    ctaDesc: "「応募までは決めていないけれど話を聞いてみたい」も歓迎です。お気軽にご連絡ください。",
    ctaButton: "応募・面談を申し込む",
    ctaMail: "メールで応募する（info@clearai.jp）",
    positions: [
      {
        id: "hardware",
        title: "ハードウェアエンジニア",
        en: "Hardware Engineer",
        mission: "ヒューマノイド・四足歩行ロボットの外装設計や現場運用を担い、「動くだけのロボット」を「現場で使えるロボット」に仕上げる仕事です。",
        duties: [
          "ロボット外装・治具・現場機材の3D CAD設計と試作（3Dプリンタ等）",
          "Unitree G1 / Go2 などレンタル機体の整備・キッティング・現場オペレーション",
          "展示会・実証実験（点検PoC等）でのデモ構築と帯同",
          "センサー・電装部品の選定、組付け、検証",
        ],
        welcome: [
          "3D CAD（Fusion 360 / SolidWorks / FreeCAD 等）での設計経験",
          "3Dプリンタ・CNC・板金などでの試作／ものづくり経験",
          "ROS2やメーカーSDKを使ったロボット制御の経験",
          "電子工作・組込み開発、高専・工学系のバックグラウンド",
        ],
        employment: "正社員／業務委託／インターン（学生歓迎）",
      },
      {
        id: "cofounder",
        title: "共同創業者",
        en: "Co-Founder",
        mission: "代表と並走して事業そのものを立ち上げ、伸ばす役割です。担当領域（事業開発・技術・コーポレート）は強みに合わせて設計し、株式・ストックオプションを含めた条件を個別に相談します。",
        duties: [
          "新規事業ライン（ロボティクス・SaaS・研修等）の立ち上げと推進",
          "経営の意思決定への参画（事業計画・資金調達・採用）",
          "自分の強み領域での圧倒的な実行（開発・営業・オペレーションいずれでも）",
        ],
        welcome: [
          "0→1の立ち上げ経験（起業・新規事業・部門立ち上げ等）、または強い当事者意識",
          "AI・ロボティクス領域への本気の興味",
          "不確実な状況を面白がり、自分で手を動かして前に進められること",
        ],
        employment: "共同創業者（株式・SO応相談）／まずは副業・業務委託からの合流も可",
      },
      {
        id: "sales",
        title: "営業",
        en: "Sales",
        mission: "AI導入・システム開発・ロボットレンタル・AI研修を、中小企業の経営者に届ける仕事です。売り込みではなく、現場の課題を翻訳して最適な打ち手を提案するスタイルです。",
        duties: [
          "インバウンド商談の対応（Web経由の相談・資料請求への提案）",
          "展示会・紹介・パートナー経由の商談開拓とクロージング",
          "補助金（人材開発支援助成金・IT導入補助金等）を活用した提案設計",
          "受注後のプロジェクト立ち上げ連携・顧客リレーション",
        ],
        welcome: [
          "法人営業・カスタマーサクセスの経験（業界不問）",
          "IT・SaaS・人材・コンサル領域での提案経験",
          "経営者と対等に話せるビジネス理解、AIツールを使いこなす意欲",
        ],
        employment: "正社員／業務委託（フルコミット歓迎・成果報酬併用も応相談）",
      },
      {
        id: "backoffice",
        title: "バックオフィス",
        en: "Back Office",
        mission: "経理・労務・総務・契約管理など、会社の土台を少人数×AIで回す仕事です。定型作業はAIと自動化に任せ、人は判断と改善に集中する体制づくりから一緒に進めます。",
        duties: [
          "経理（freee）・請求・入出金管理、月次の締めと士業との連携",
          "労務・総務（入退社手続き、備品・契約・許認可の管理）",
          "補助金・助成金の申請事務サポート",
          "業務フローのAI活用・自動化の推進",
        ],
        welcome: [
          "経理・労務・総務いずれかの実務経験",
          "freee等クラウド会計・バックオフィスSaaSの利用経験",
          "スタートアップの何でも屋を楽しめる柔軟性、AIツールへの好奇心",
        ],
        employment: "正社員／パート・時短／業務委託（リモート中心も応相談）",
      },
    ],
  },
  en: {
    heroLabel: "Careers",
    heroTitle: "Join us in transforming Japanese workplaces with AI and robotics.",
    heroDesc: "ClearAI is a startup delivering real outcomes to SMEs through AI & software development, robot rental, and AI training. We value hands-on execution over titles, and shipping over proposing. What matters most is whether you can enjoy the early-stage ride.",
    openLabel: "Open Positions",
    openTitle: "Open positions",
    dutiesLabel: "What you'll do",
    welcomeLabel: "Nice to have",
    employmentLabel: "Employment",
    apply: "Apply for this role",
    commonLabel: "Conditions",
    commonTitle: "Working conditions (all roles)",
    common: [
      { label: "Location", value: "Ibaraki (HQ) / Tokyo. Remote & hybrid negotiable (hardware role includes on-site work)" },
      { label: "Hours", value: "Flexible, no core time. Designed around outcomes" },
      { label: "Compensation", value: "Determined individually based on experience and commitment. Equity / stock options for the co-founder role" },
      { label: "How we work", value: "Every role uses AI tools (Claude Code etc.) to the fullest — a small team producing outsized results" },
    ],
    flowLabel: "Process",
    flowTitle: "Hiring process",
    flow: [
      { num: "01", title: "Apply", desc: "Send your background (resume, GitHub, portfolio) via the contact form or email." },
      { num: "02", title: "Casual interview", desc: "30-60 min online. We talk openly about where the business is and what the role looks like." },
      { num: "03", title: "Trial", desc: "We work together on a small paid project (scope depends on the role) to check mutual fit." },
      { num: "04", title: "Offer", desc: "We align on terms and you join. Starting as a side gig is welcome." },
    ],
    ctaTitle: "Let's start with a casual conversation.",
    ctaDesc: "Not ready to formally apply? That's fine — reach out and let's talk.",
    ctaButton: "Apply / book a chat",
    ctaMail: "Apply by email (info@clearai.jp)",
    positions: [
      {
        id: "hardware",
        title: "Hardware Engineer",
        en: "Hardware Engineer",
        mission: "Design exteriors and field equipment for humanoid and quadruped robots, and run them in the field — turning robots that merely move into robots that actually work on site.",
        duties: [
          "3D CAD design and prototyping of robot exteriors, jigs, and field equipment",
          "Maintenance, kitting, and field operation of rental units such as Unitree G1 / Go2",
          "Building and running demos at exhibitions and PoCs (e.g. inspection)",
          "Selecting, assembling, and validating sensors and electronics",
        ],
        welcome: [
          "3D CAD experience (Fusion 360 / SolidWorks / FreeCAD etc.)",
          "Prototyping experience with 3D printers, CNC, sheet metal",
          "Robot control experience with ROS2 or vendor SDKs",
          "Electronics / embedded background, KOSEN or engineering degree",
        ],
        employment: "Full-time / contract / internship (students welcome)",
      },
      {
        id: "cofounder",
        title: "Co-Founder",
        en: "Co-Founder",
        mission: "Build and grow the business alongside the CEO. Your domain (business development, technology, corporate) is designed around your strengths, with equity and stock options discussed individually.",
        duties: [
          "Launching and driving new business lines (robotics, SaaS, training)",
          "Participating in management decisions (planning, fundraising, hiring)",
          "Relentless execution in your strongest domain",
        ],
        welcome: [
          "Zero-to-one experience (founding, new business, new team) or strong ownership",
          "Genuine passion for AI and robotics",
          "Comfort with uncertainty and a bias for hands-on progress",
        ],
        employment: "Co-founder (equity / SO negotiable) — starting part-time is possible",
      },
      {
        id: "sales",
        title: "Sales",
        en: "Sales",
        mission: "Bring AI adoption, software development, robot rental, and AI training to SME executives. Not hard selling — translating real problems on the ground into the right solution.",
        duties: [
          "Handling inbound leads (web consultations and document requests)",
          "Developing and closing deals via exhibitions, referrals, and partners",
          "Designing proposals that leverage government subsidies",
          "Handover to delivery and ongoing customer relationships",
        ],
        welcome: [
          "B2B sales or customer success experience (any industry)",
          "Experience in IT / SaaS / HR / consulting proposals",
          "Business fluency with executives and eagerness to use AI tools",
        ],
        employment: "Full-time / contract (performance-based compensation negotiable)",
      },
      {
        id: "backoffice",
        title: "Back Office",
        en: "Back Office",
        mission: "Run accounting, labor, general affairs, and contract management with a small team empowered by AI. Routine work goes to automation; people focus on judgment and improvement.",
        duties: [
          "Accounting (freee), billing, cash management, monthly closing with external accountants",
          "Labor & general affairs (onboarding/offboarding, equipment, contracts, licenses)",
          "Administrative support for subsidy applications",
          "Driving AI adoption and automation of internal workflows",
        ],
        welcome: [
          "Hands-on experience in accounting, labor, or general affairs",
          "Experience with cloud accounting / back-office SaaS such as freee",
          "Flexibility to enjoy startup generalist work and curiosity about AI tools",
        ],
        employment: "Full-time / part-time / contract (mostly remote negotiable)",
      },
    ],
  },
};

export default function CareersPage() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  return (
    <main className="bg-white pt-20">
      {/* HERO */}
      <section className="border-b border-gray-100 py-14 lg:py-20">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.heroLabel}</Label>
            <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">{t.heroTitle}</h1>
            <p className="mt-6 text-base leading-relaxed text-gray-600">{t.heroDesc}</p>
          </Reveal>
        </div>
      </section>

      {/* POSITIONS */}
      <section className="py-14 lg:py-20">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.openLabel}</Label>
            <h2 className="mb-8 text-3xl font-bold leading-tight text-gray-900">{t.openTitle}</h2>
          </Reveal>
          <div>
            {t.positions.map((p, i) => (
              <Reveal key={p.id} delay={i * 60}>
                <article id={p.id} className="border-t border-gray-200 py-10 lg:py-12">
                  <div className="grid gap-8 lg:grid-cols-12">
                    <div className="lg:col-span-4">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">{p.en}</p>
                      <h3 className="mt-1 text-2xl font-bold text-gray-900">{p.title}</h3>
                      <p className="mt-4 text-sm leading-relaxed text-gray-600">{p.mission}</p>
                      <p className="mt-5 text-xs font-semibold text-neutral-500">{t.employmentLabel}</p>
                      <p className="mt-1 text-sm text-gray-700">{p.employment}</p>
                      <Link
                        href={`/contact?service=careers&role=${p.id}`}
                        className="mt-6 inline-flex items-center justify-center rounded-md bg-cta px-6 py-3 text-sm font-bold text-white transition hover:bg-cta-hover"
                      >
                        {t.apply}
                      </Link>
                    </div>
                    <div className="lg:col-span-4">
                      <p className="text-sm font-bold text-gray-900">{t.dutiesLabel}</p>
                      <ul className="mt-3 space-y-2.5">
                        {p.duties.map((d) => (
                          <li key={d} className="flex items-start gap-3 text-sm leading-relaxed text-gray-600">
                            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-900" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="lg:col-span-4">
                      <p className="text-sm font-bold text-gray-900">{t.welcomeLabel}</p>
                      <ul className="mt-3 space-y-2.5">
                        {p.welcome.map((w) => (
                          <li key={w} className="flex items-start gap-3 text-sm leading-relaxed text-gray-600">
                            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-300" />
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONDITIONS */}
      <section className="bg-gray-50 py-14 lg:py-20">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.commonLabel}</Label>
            <h2 className="mb-8 text-3xl font-bold leading-tight text-gray-900">{t.commonTitle}</h2>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {t.common.map((c, i) => (
              <Reveal key={c.label} delay={i * 60}>
                <div className="h-full rounded-lg border border-gray-200 bg-white p-6">
                  <p className="text-xs font-semibold tracking-wider text-neutral-500">{c.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-700">{c.value}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-14 lg:py-20">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.flowLabel}</Label>
            <h2 className="mb-8 text-3xl font-bold leading-tight text-gray-900">{t.flowTitle}</h2>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {t.flow.map((f, i) => (
              <Reveal key={f.num} delay={i * 60}>
                <div className="h-full rounded-lg border border-gray-200 bg-white p-6">
                  <p className="text-xs font-bold tracking-widest text-neutral-400">{f.num}</p>
                  <h3 className="mt-2 text-base font-bold text-gray-900">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-100 bg-white py-14 lg:py-20">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-3xl font-bold leading-tight text-gray-900">{t.ctaTitle}</h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600">{t.ctaDesc}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact?service=careers"
                className="inline-flex min-h-[52px] items-center justify-center rounded-md bg-cta px-8 py-3.5 text-sm font-bold text-white transition hover:bg-cta-hover"
              >
                {t.ctaButton}
              </Link>
              <a
                href="mailto:info@clearai.jp?subject=%E6%8E%A1%E7%94%A8%E5%BF%9C%E5%8B%9F"
                className="inline-flex min-h-[52px] items-center justify-center rounded-md border border-neutral-300 px-8 py-3.5 text-sm font-semibold text-neutral-900 transition hover:border-neutral-900 hover:bg-neutral-50"
              >
                {t.ctaMail}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
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

function SectionHead({
  index,
  kicker,
  title,
  desc,
  dark = false,
}: {
  index: string;
  kicker: ReactNode;
  title: ReactNode;
  desc?: ReactNode;
  dark?: boolean;
}) {
  return (
    <Reveal className="mb-12 lg:mb-16 max-w-3xl">
      <div className={`flex items-center gap-4 border-b pb-4 ${dark ? "border-white/25" : "border-neutral-900"}`}>
        <span className={`font-mono text-xs font-bold tabular-nums ${dark ? "text-white" : "text-neutral-900"}`}>§{index}</span>
        <span className={`font-mono text-[11px] font-medium uppercase tracking-[0.25em] ${dark ? "text-neutral-400" : "text-neutral-500"}`}>{kicker}</span>
      </div>
      <h2 className={`mt-8 text-[20px] sm:text-2xl lg:text-3xl font-bold leading-[1.15] sm:leading-[1.05] tracking-[-0.02em] text-balance whitespace-pre-line ${dark ? "text-white" : "text-neutral-900"}`}>
        {title}
      </h2>
      {desc && <p className={`mt-6 text-[15px] leading-relaxed text-pretty ${dark ? "text-neutral-400" : "text-neutral-600"}`}>{desc}</p>}
    </Reveal>
  );
}

type Section = {
  title: string;
  body: string;
  bullets?: string[];
};

type Copy = {
  label: string;
  title: string;
  sections: Section[];
  date: string;
};

const COPY: Record<"ja" | "en", Copy> = {
  ja: {
    label: "Terms of Service",
    title: "利用規約",
    sections: [
      {
        title: "第1条（適用）",
        body: "本規約は、clearAI株式会社（以下「当社」）が提供するすべてのサービス（以下「本サービス」）の利用に関する条件を定めるものです。",
      },
      {
        title: "第2条（利用登録）",
        body: "登録希望者が当社の定める方法によって利用登録を申請し、当社がこれを承認することによって、利用登録が完了するものとします。",
      },
      {
        title: "第3条（禁止事項）",
        body: "ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。",
        bullets: [
          "法令または公序良俗に違反する行為",
          "犯罪行為に関連する行為",
          "当社のサービスの運営を妨害する行為",
          "他のユーザーに迷惑をかける行為",
          "不正アクセスをする行為",
        ],
      },
      {
        title: "第4条（免責事項）",
        body: "当社は、本サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。",
      },
      {
        title: "第5条（サービス内容の変更等）",
        body: "当社は、ユーザーに通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし、これによってユーザーに生じた損害について一切の責任を負いません。",
      },
      {
        title: "第6条（準拠法・裁判管轄）",
        body: "本規約の解釈にあたっては、日本法を準拠法とします。本サービスに関して紛争が生じた場合には、東京地方裁判所を第一審の専属的合意管轄裁判所とします。",
      },
    ],
    date: "制定日: 2025年1月1日",
  },
  en: {
    label: "Terms of Service",
    title: "Terms of Service",
    sections: [
      {
        title: "Article 1 (Application)",
        body: 'These Terms set forth the conditions of use of all services ("the Services") provided by clearAI Inc. ("the Company").',
      },
      {
        title: "Article 2 (User registration)",
        body: "Registration is completed when a prospective user applies in the manner specified by the Company and the Company approves the application.",
      },
      {
        title: "Article 3 (Prohibited acts)",
        body: "When using the Services, users shall not engage in the following acts:",
        bullets: [
          "Acts that violate laws, regulations, or public order and morals",
          "Acts related to criminal activity",
          "Acts that interfere with the operation of the Services",
          "Acts that cause nuisance to other users",
          "Unauthorized access",
        ],
      },
      {
        title: "Article 4 (Disclaimer)",
        body: "The Company bears no responsibility for any transactions, communications, or disputes arising between users and other users or third parties in connection with the Services.",
      },
      {
        title: "Article 5 (Changes to services)",
        body: "The Company may change the content of, or suspend, the Services without notice to users and bears no responsibility for any damages that may arise as a result.",
      },
      {
        title: "Article 6 (Governing law and jurisdiction)",
        body: "These Terms shall be governed by and construed under the laws of Japan. Any disputes arising out of or relating to the Services shall be subject to the exclusive jurisdiction of the Tokyo District Court as the court of first instance.",
      },
    ],
    date: "Effective date: January 1, 2025",
  },
};

export default function TermsPage() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  return (
    <main className="min-h-screen bg-white">

      {/* ─── MASTHEAD ────────────────────────────────────────────────────── */}
      <section className="pt-40 pb-16 lg:pb-20 bg-white border-b border-neutral-900">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <div className="flex items-center gap-4 border-b border-neutral-900 pb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
              <span className="font-bold text-neutral-900">§00</span>
              <span>{t.label}</span>
              <span className="ml-auto tabular-nums text-neutral-400">
                {String(t.sections.length).padStart(2, "0")} ARTICLES
              </span>
            </div>
            <h1 className="mt-8 text-[8vw] sm:text-4xl lg:text-5xl font-bold leading-[0.95] tracking-[-0.04em] text-balance text-neutral-900">
              {t.title}
            </h1>
          </Reveal>
        </div>
      </section>

      {/* ─── ARTICLES ────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          {t.sections.map((section, i) => (
            <Reveal key={section.title} delay={i * 50}>
              <article className="grid grid-cols-[auto_1fr] gap-x-5 sm:gap-x-8 border-t border-neutral-200 py-8 first:border-t-0 first:pt-0">
                <span className="pt-1 font-mono text-sm font-bold tabular-nums text-neutral-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h2 className="text-lg lg:text-xl font-bold tracking-tight text-balance text-neutral-900 mb-3">
                    {section.title}
                  </h2>
                  <p className="text-[15px] leading-relaxed text-pretty text-neutral-600">{section.body}</p>
                  {section.bullets && (
                    <ul className="mt-4 border-t border-neutral-200">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="grid grid-cols-[auto_1fr] gap-3 border-b border-neutral-200 py-2.5 text-[15px] leading-relaxed text-pretty text-neutral-600"
                        >
                          <span aria-hidden="true" className="font-mono text-neutral-400">→</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            </Reveal>
          ))}

          <Reveal>
            <p className="mt-12 border-t border-neutral-900 pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-400 tabular-nums">
              {t.date}
            </p>
          </Reveal>
        </div>
      </section>

    </main>
  );
}

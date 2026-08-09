"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

type Section = {
  title: string;
  body: string;
  bullets?: string[];
  extra?: string;
};

type Copy = {
  label: string;
  title: string;
  sections: Section[];
  date: string;
};

const COPY: Record<"ja" | "en", Copy> = {
  ja: {
    label: "Privacy Policy",
    title: "プライバシーポリシー",
    sections: [
      {
        title: "1. 個人情報の取り扱いについて",
        body: "clearAI株式会社（以下「当社」）は、お客様の個人情報を適切に保護し、取り扱うことが社会的責務であると考え、以下の方針に基づき個人情報の保護に努めます。",
      },
      {
        title: "2. 個人情報の収集",
        body: "当社は、サービスの提供にあたり、お客様の同意のもと、お名前、メールアドレス、電話番号、会社名等の個人情報を収集することがあります。",
      },
      {
        title: "3. 個人情報の利用目的",
        body: "収集した個人情報は、以下の目的で利用いたします。",
        bullets: [
          "サービスの提供・運営",
          "お問い合わせへの対応",
          "サービスの改善・新サービスの開発",
          "お客様への重要なお知らせの連絡",
        ],
      },
      {
        title: "4. 個人情報の第三者提供",
        body: "当社は、法令に基づく場合を除き、お客様の同意なく第三者に個人情報を提供することはありません。",
      },
      {
        title: "5. 個人情報の管理",
        body: "当社は、個人情報の漏洩、滅失またはき損の防止のために、適切なセキュリティ対策を講じます。",
      },
      {
        title: "6. お問い合わせ",
        body: "個人情報の取り扱いに関するお問い合わせは、以下までご連絡ください。",
        extra: "clearAI株式会社\nメール: info@clearai.jp",
      },
    ],
    date: "制定日: 2025年1月1日",
  },
  en: {
    label: "Privacy Policy",
    title: "Privacy Policy",
    sections: [
      {
        title: "1. Handling of personal information",
        body: 'clearAI Inc. ("the Company") regards the proper protection and handling of personal information as a social responsibility, and will endeavor to protect personal information based on the policy below.',
      },
      {
        title: "2. Collection of personal information",
        body: "In providing services, the Company may collect personal information such as name, email address, phone number, and company name, with the customer's consent.",
      },
      {
        title: "3. Purposes of use",
        body: "Collected personal information is used for the following purposes:",
        bullets: [
          "Provision and operation of services",
          "Response to inquiries",
          "Improvement of services and development of new services",
          "Important communications to customers",
        ],
      },
      {
        title: "4. Provision to third parties",
        body: "Except as required by law, the Company does not provide personal information to third parties without the customer's consent.",
      },
      {
        title: "5. Management of personal information",
        body: "The Company implements appropriate security measures to prevent leakage, loss, or damage of personal information.",
      },
      {
        title: "6. Contact",
        body: "Please direct inquiries regarding the handling of personal information to the address below.",
        extra: "clearAI Inc.\nEmail: info@clearai.jp",
      },
    ],
    date: "Effective date: January 1, 2025",
  },
};

export default function PrivacyPage() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-3xl mx-auto px-6 lg:px-8 pt-40 pb-24">

        {/* ─── MASTHEAD ─────────────────────────────────────────────────── */}
        <div className="flex items-center gap-4 border-b border-neutral-900 pb-4">
          <span className="font-mono text-xs font-bold tabular-nums text-neutral-900">§00</span>
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-neutral-500">
            {t.label}
          </span>
        </div>
        <h1 className="mt-8 text-[7vw] sm:text-3xl lg:text-4xl font-bold leading-[0.95] tracking-[-0.04em] text-balance text-neutral-900">
          {t.title}
        </h1>

        {/* ─── LEGAL BODY ───────────────────────────────────────────────── */}
        <div className="mt-16 border-t border-neutral-900">
          {t.sections.map((section, i) => (
            <article key={section.title} className="border-t border-neutral-200 py-9 first:border-t-0">
              <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-12">
                <div className="sm:col-span-3">
                  <span className="font-mono text-xs font-bold tabular-nums text-neutral-400">
                    §{String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-3 text-base font-bold leading-snug tracking-tight text-balance text-neutral-900">
                    {section.title}
                  </h2>
                </div>
                <div className="sm:col-span-9">
                  <p className="text-[15px] leading-relaxed text-pretty text-neutral-700">{section.body}</p>
                  {section.bullets && (
                    <ul className="mt-4 space-y-2 border-l border-neutral-200 pl-5">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3 text-[15px] leading-relaxed text-neutral-700">
                          <span className="mt-px font-mono text-neutral-400" aria-hidden="true">→</span>
                          <span className="text-pretty">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.extra && (
                    <p className="mt-4 font-mono text-sm leading-relaxed text-neutral-600">
                      {section.extra.split("\n").map((line, idx) => (
                        <span key={idx}>
                          {line}
                          {idx < section.extra!.split("\n").length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ─── META FOOTER ──────────────────────────────────────────────── */}
        <div className="mt-12 border-t border-neutral-900 pt-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-400">{t.date}</p>
        </div>
      </section>
    </main>
  );
}

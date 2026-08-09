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
      <section className="max-w-3xl mx-auto px-6 pt-40 pb-20">
        <p className="text-sm font-semibold text-neutral-900 mb-4">{t.label}</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-12">{t.title}</h1>

        <div className="prose text-gray-600 leading-relaxed space-y-8">
          {t.sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-bold text-gray-900 mb-3">{section.title}</h2>
              <p>{section.body}</p>
              {section.bullets && (
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
              {section.extra && (
                <p className="mt-2">
                  {section.extra.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < section.extra!.split("\n").length - 1 && <br />}
                    </span>
                  ))}
                </p>
              )}
            </div>
          ))}

          <p className="text-sm text-gray-400 mt-8">{t.date}</p>
        </div>
      </section>
    </main>
  );
}

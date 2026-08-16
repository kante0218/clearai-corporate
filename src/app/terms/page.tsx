"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

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
        body: "本規約は、ClearAI株式会社（以下「当社」）が提供するすべてのサービス（以下「本サービス」）の利用に関する条件を定めるものです。",
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
        body: 'These Terms set forth the conditions of use of all services ("the Services") provided by ClearAI Inc. ("the Company").',
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
            </div>
          ))}

          <p className="text-sm text-gray-400 mt-8">{t.date}</p>
        </div>
      </section>
    </main>
  );
}

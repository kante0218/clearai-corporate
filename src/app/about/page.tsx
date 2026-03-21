"use client";

const companyInfo = [
  { label: "会社名", value: "clear AI株式会社" },
  { label: "設立", value: "2025年" },
  { label: "代表", value: "代表取締役 CEO" },
  { label: "所在地", value: "東京都" },
  {
    label: "事業内容",
    value: "AI導入支援 / AI面接プラットフォーム「導（みちびき）」",
  },
];

const timeline = [
  {
    year: "2025年",
    title: "clear AI株式会社 設立",
    description:
      "AIの力をすべての企業に届けるというミッションのもと創業。",
  },
  {
    year: "2025年",
    title: "AI面接プラットフォーム「導」リリース",
    description:
      "日本市場に特化したAI面接サービスの提供を開始。",
  },
  {
    year: "2026年",
    title: "AI導入支援事業 開始",
    description:
      "企業のAI活用を包括的にサポートするコンサルティング事業を本格展開。",
  },
];

export default function AboutPage() {
  return (
    <main className="pt-20 min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-navy-950 tracking-tight">
            会社概要
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            clear AIについて
          </p>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">
            Mission
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-navy-950 leading-tight">
            AIの力を、すべての企業に。
          </h2>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            私たちclear AIは、最先端のAI技術を活用し、企業の成長と変革を支援します。
            AI面接プラットフォーム「導（みちびき）」と企業向けAI導入支援を通じて、
            すべての企業がAIの恩恵を受けられる社会を目指します。
          </p>
        </div>
      </section>

      {/* Company Info Table */}
      <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <h2 className="text-2xl font-bold text-navy-950 text-center mb-12">
            企業情報
          </h2>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            {companyInfo.map((item, i) => (
              <div
                key={item.label}
                className={`flex flex-col sm:flex-row ${
                  i !== companyInfo.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                <div className="sm:w-48 px-6 py-4 bg-gray-50 font-semibold text-sm text-navy-950 shrink-0">
                  {item.label}
                </div>
                <div className="px-6 py-4 text-gray-700 text-sm">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-bold text-navy-950 text-center mb-12">
          沿革
        </h2>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2" />

          <div className="space-y-12">
            {timeline.map((item, i) => (
              <div
                key={i}
                className="relative flex items-start gap-8 sm:gap-12"
              >
                {/* Dot */}
                <div className="absolute left-4 sm:left-1/2 w-3 h-3 bg-accent rounded-full -translate-x-1/2 mt-1.5 ring-4 ring-white" />

                {/* Year (left side on desktop) */}
                <div className="hidden sm:block sm:w-1/2 text-right pr-12">
                  <span className="text-sm font-bold text-accent">
                    {item.year}
                  </span>
                </div>

                {/* Content (right side on desktop) */}
                <div className="pl-10 sm:pl-0 sm:w-1/2 sm:pl-12">
                  <span className="sm:hidden text-sm font-bold text-accent block mb-1">
                    {item.year}
                  </span>
                  <h3 className="text-lg font-bold text-navy-950">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

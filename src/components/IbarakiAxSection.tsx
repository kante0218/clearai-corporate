"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const copy = {
  ja: {
    title: "茨城の企業に、実務から始めるAX。",
    description: "AXは、AIを使って仕事の進め方を変えること。日々の業務を起点に、必要な支援を一緒に整理します。",
    items: [["業務改善", "情報整理や繰り返し作業など、AIを活かせる業務を見つけます。", "/ai-consulting"], ["受託開発", "業務に合うシステムを設計・開発し、運用まで支援します。", "/software-development"], ["Codex研修", "実務に沿った研修で、社員がAIを仕事に使う力を育てます。", "/training/codex"]],
    cta: "茨城のAX・AI活用を相談する",
  },
  en: {
    title: "Practical AI transformation for businesses in Ibaraki.",
    description: "AX means changing how work gets done with AI. We start with your everyday workflows and identify the support you need together.",
    items: [["Workflow improvement", "Find opportunities to use AI for organizing information and repetitive tasks.", "/ai-consulting"], ["Custom development", "Design and build systems for your workflows, with support through operation.", "/software-development"], ["Codex training", "Build your team's ability to apply AI through practical training.", "/training/codex"]],
    cta: "Discuss AI adoption in Ibaraki",
  },
  "zh-CN": {
    title: "面向茨城企业，从实际业务开始AI转型。",
    description: "AX是利用AI改变工作方式。我们从日常业务出发，与您一起梳理所需的支持。",
    items: [["业务改善", "从信息整理和重复性工作中，寻找适合应用AI的业务。", "/ai-consulting"], ["定制开发", "根据业务需求设计和开发系统，并提供运营支持。", "/software-development"], ["Codex培训", "通过贴近实际业务的培训，培养员工在工作中应用AI的能力。", "/training/codex"]],
    cta: "咨询茨城企业的AI转型",
  },
  ko: {
    title: "이바라키 기업을 위한, 실무에서 시작하는 AI 전환.",
    description: "AX는 AI로 일하는 방식을 바꾸는 것입니다. 일상 업무를 출발점으로 필요한 지원을 함께 정리합니다.",
    items: [["업무 개선", "정보 정리와 반복 업무에서 AI를 활용할 수 있는 일을 찾습니다.", "/ai-consulting"], ["맞춤 개발", "업무에 맞는 시스템을 설계·개발하고 운영까지 지원합니다.", "/software-development"], ["Codex 교육", "실무 중심 교육으로 직원의 AI 업무 활용 역량을 기릅니다.", "/training/codex"]],
    cta: "이바라키 기업의 AI 활용 상담",
  },
};

export default function IbarakiAxSection() {
  const { locale } = useLanguage();
  const t = copy[locale];
  return (
    <section id="ibaraki-ax" aria-labelledby="ibaraki-ax-title" className="scroll-mt-28 border-b border-neutral-200 bg-neutral-50 py-10 md:py-16">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-8">
        <h2 id="ibaraki-ax-title" className="text-2xl font-bold leading-snug text-neutral-900 md:text-3xl">{t.title}</h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-neutral-700">{t.description}</p>
        <ul className="mt-7 grid gap-6 md:grid-cols-3">
          {t.items.map(([title, description, href]) => <li key={href} className="border-t border-neutral-300 pt-4"><h3 className="text-lg font-semibold"><Link href={href} className="underline underline-offset-4">{title}</Link></h3><p className="mt-2 max-w-xl text-sm leading-7 text-neutral-700">{description}</p></li>)}
        </ul>
        <Link data-ui-button="filled" href="/contact" className="mt-7 inline-flex min-h-12 max-w-full items-center justify-center rounded-full bg-cta px-6 py-3 text-center text-sm font-semibold text-white"><span className="ui-button-label">{t.cta}</span></Link>
      </div>
    </section>
  );
}

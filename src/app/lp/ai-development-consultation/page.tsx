"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import Logo from "@/components/Logo";

const SUPPORT_AREAS = [
  {
    title: "AI・業務システム",
    items: ["AIエージェント", "業務自動化", "OCR・文書処理", "社内検索", "問い合わせ対応", "データ集計", "承認ワークフロー", "需要予測", "レポート生成", "ナレッジ活用", "既存SaaS連携", "PoC開発"],
  },
  {
    title: "システム・ソフトウェア開発",
    items: ["Webアプリ", "モバイルアプリ", "API開発", "管理画面", "顧客ポータル", "基幹連携", "データ移行", "クラウド構築", "監視・運用", "セキュリティ", "速度改善", "保守・改善"],
  },
  {
    title: "導入・定着支援",
    items: ["現場ヒアリング", "業務可視化", "AI戦略", "KPI設計", "ロードマップ", "要件定義", "ガバナンス", "運用設計", "社内研修", "内製化支援", "経営報告", "全国対応"],
  },
] as const;

const CHOICE_STEPS = [
  { key: "challenge", label: "現在、最も解決したい課題を教えてください", options: ["業務を自動化したい", "AIを事業に組み込みたい", "新しいシステムを開発したい", "AI人材を育成したい", "まだ整理できていない"] },
  { key: "status", label: "AI・システム導入の検討状況を教えてください", options: ["情報収集中", "社内で検討中", "要件を整理中", "委託先を比較中", "すぐに相談したい"] },
  { key: "service", label: "関心のある支援内容を教えてください", options: ["AI受託開発", "システム・ソフトウェア開発", "FDEコンサルティング", "AI内製化研修", "相談して決めたい"] },
  { key: "size", label: "従業員規模を教えてください", options: ["~50名", "51-200名", "201-500名", "501-1000名", "1001名~"] },
  { key: "timing", label: "開始時期のイメージを教えてください", options: ["できるだけ早く", "1〜3ヶ月以内", "3〜6ヶ月以内", "半年以降", "未定"] },
] as const;

type Answers = Record<string, string>;

export default function AiDevelopmentConsultationPage() {
  const formRef = useRef<HTMLElement>(null);
  const advancingRef = useRef(false);
  const advanceTimerRef = useRef<number | null>(null);
  const [step, setStep] = useState(0);
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [answers, setAnswers] = useState<Answers>({});
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const totalSteps = 8;
  const progress = ((step + 1) / totalSteps) * 100;
  const currentChoice = CHOICE_STEPS[step];

  useEffect(() => () => {
    if (advanceTimerRef.current !== null) window.clearTimeout(advanceTimerRef.current);
  }, []);

  const summary = useMemo(() => {
    const rows = [
      ["解決したい課題", answers.challenge],
      ["検討状況", answers.status],
      ["関心のある支援", answers.service],
      ["従業員規模", answers.size],
      ["開始時期", answers.timing],
    ].filter((row) => row[1]);
    return `${rows.map(([label, value]) => `${label}: ${value}`).join("\n")}\n\n補足・相談内容:\n${details || "詳細は初回相談で共有希望"}`;
  }, [answers, details]);

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const selectChoice = (key: string, value: string) => {
    if (advancingRef.current) return;
    advancingRef.current = true;
    setIsAdvancing(true);
    setAnswers((previous) => ({ ...previous, [key]: value }));
    setStep((current) => Math.min(current + 1, totalSteps - 1));
    advanceTimerRef.current = window.setTimeout(() => {
      advancingRef.current = false;
      setIsAdvancing(false);
      advanceTimerRef.current = null;
    }, 250);
  };

  const nextInputStep = () => {
    setError("");
    if (step === 5 && !company.trim()) return setError("会社名を入力してください。");
    if (step === 6) {
      if (!name.trim()) return setError("お名前を入力してください。");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setError("正しいメールアドレスを入力してください。");
    }
    setStep((current) => Math.min(current + 1, totalSteps - 1));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (step !== totalSteps - 1) {
      if (step >= CHOICE_STEPS.length) nextInputStep();
      return;
    }
    setError("");
    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inquiryType: "business",
          service: "consulting",
          company,
          name,
          email,
          phone,
          size: answers.size,
          message: summary,
          website,
        }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.errors?._form || Object.values(data?.errors || {})[0] || "送信できませんでした。");
      }
      setStatus("success");
    } catch (submissionError) {
      setStatus("error");
      setError(submissionError instanceof Error ? submissionError.message : "送信できませんでした。時間をおいて再度お試しください。");
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#1e2f42]">
      <header className="h-[58px] bg-white sm:h-[68px]">
        <div className="mx-auto flex h-full max-w-[1340px] items-center gap-4 px-5 sm:px-8">
          <Link href="/" aria-label="ClearAI株式会社" className="flex items-center gap-2">
            <Logo size={34} className="h-8 w-auto" />
          </Link>
          <span className="h-5 w-px bg-[#cbd5df]" aria-hidden="true" />
          <p className="text-[11px] font-bold text-[#27384a] sm:text-sm">AI導入・システム開発の専門会社</p>
        </div>
      </header>

      <section className="relative bg-[#12314b]">
        <div className="absolute inset-y-0 left-0 hidden w-[58%] overflow-hidden lg:block" aria-hidden="true">
          <div className="absolute -left-16 top-0 h-full w-[240px] -skew-x-[18deg] bg-[#174764]" />
          <div className="absolute left-[28%] top-0 h-full w-[240px] -skew-x-[18deg] bg-[#0d2b42]" />
          <div className="absolute left-[62%] top-0 h-full w-[210px] -skew-x-[18deg] bg-[#1c526d]" />
        </div>
        <div className="relative mx-auto grid max-w-[1440px] lg:grid-cols-2">
          <div className="relative z-10 flex min-h-[315px] flex-col justify-center px-5 py-8 text-white sm:min-h-[360px] sm:px-12 sm:py-10 lg:min-h-[490px] lg:px-16 lg:py-12 xl:px-24">
            <p className="mb-3 text-[11px] font-bold tracking-[0.12em] text-[#a9d0e2] sm:text-sm">AI STRATEGY × ENGINEERING</p>
            <h1 className="text-[29px] font-bold leading-[1.45] tracking-[0.03em] sm:text-[36px] lg:text-[44px]">
              戦略から実装まで<br />専任チームが一気通貫
            </h1>
            <div className="mt-5 grid grid-cols-3 gap-2 text-center text-[#d5b56c] sm:mt-7 sm:max-w-[560px] sm:gap-5 lg:mt-8">
              {[
                ["支援領域", "3領域", "戦略・開発・研修"],
                ["プロトタイプ", "最短2週間", "動く画面で検証"],
                ["対応エリア", "全国", "オンライン対応"],
              ].map(([label, value, note]) => (
                <div key={label} className="border-y border-[#d5b56c]/70 py-2 sm:py-3">
                  <p className="text-[10px] font-bold sm:text-xs">{label}</p>
                  <p className="mt-0.5 whitespace-nowrap text-lg font-bold sm:text-[28px]">{value}</p>
                  <p className="mt-1 text-[9px] text-white/70 sm:text-[10px]">{note}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-[260px] sm:min-h-[320px] lg:min-h-[490px]">
            <Image
              src="/images/generated-trust/consulting-executive-workshop.webp"
              alt="経営課題とAI導入方針を話し合うコンサルティングの様子"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#081723]/80 to-transparent px-5 pt-16 pb-4 text-white sm:px-7 sm:pt-20 sm:pb-6 lg:px-10">
              <p className="text-xs font-bold tracking-[0.08em]">AI・DX CONSULTING</p>
              <p className="mt-1 text-sm font-semibold">課題整理から実装・定着まで伴走</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 pt-8 pb-10 sm:pt-12 sm:pb-20">
        <button
          type="button"
          onClick={scrollToForm}
          className="group mx-auto flex h-[64px] w-full max-w-[400px] items-center justify-center gap-3 rounded-md bg-[#0e5b94] px-5 text-base font-bold text-white shadow-[0_8px_20px_rgba(14,91,148,0.28)] transition-colors hover:bg-[#0a4b7c] sm:h-[72px] sm:text-lg"
        >
          <span className="rounded border border-white px-1.5 py-0.5 text-xs">無料</span>
          AI導入相談に申込む
          <span className="text-2xl transition-transform group-hover:translate-x-1" aria-hidden="true">≫</span>
        </button>

        <div className="mx-auto mt-14 max-w-[960px] text-center sm:mt-24">
          <h2 className="text-[28px] font-bold tracking-[0.04em] text-[#1f2933] sm:text-[34px]">ご支援領域例</h2>
          <div className="mx-auto mt-5 h-[3px] w-6 bg-[#0e5b94]" />
          <p className="mt-7 text-base font-bold leading-8 text-[#27384a] sm:text-lg">
            経営課題の整理から現場で動くシステムまで<br />
            <span className="text-[#0e5b94]">3つの専門領域</span>を組み合わせてご支援
          </p>
        </div>

        <div className="mx-auto mt-9 grid max-w-[960px] gap-6 sm:mt-12 sm:gap-8 lg:grid-cols-3 lg:gap-7">
          {SUPPORT_AREAS.map((area) => (
            <section key={area.title}>
              <h3 className="flex items-center gap-3 bg-[#eef1f3] px-4 py-2.5 text-sm font-bold text-[#263747] sm:py-3">
                <span className="h-4 w-4 bg-[#0e5b94]" aria-hidden="true" />
                {area.title}
              </h3>
              <div className="mt-2 grid grid-cols-3 gap-1.5 sm:gap-2">
                {area.items.map((item) => (
                  <div key={item} className="flex min-h-[42px] items-center justify-center border border-[#dde3e8] bg-white px-1.5 text-center text-[9px] font-bold leading-3.5 text-[#415263] shadow-[0_2px_5px_rgba(30,47,66,0.1)] sm:min-h-[54px] sm:px-2 sm:text-[11px] sm:leading-4">
                    {item}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section ref={formRef} className="scroll-mt-0" aria-labelledby="consultation-form-title">
        <div className="relative overflow-hidden bg-[#322f31] px-5 py-8 text-center text-white sm:py-10">
          <div className="absolute left-1/2 top-1/2 h-48 w-24 -translate-x-1/2 -translate-y-1/2 -skew-x-[20deg] bg-white/[0.035]" aria-hidden="true" />
          <p className="relative mx-auto inline-flex rounded bg-white px-5 py-1.5 text-sm font-bold text-[#24384c]"><span className="mr-2 text-[#0e5b94]">無料</span>簡単60秒</p>
          <h2 id="consultation-form-title" className="relative mt-4 text-[30px] font-bold tracking-[0.08em] sm:text-[36px]">AI導入相談</h2>
        </div>

        <div className="min-h-[650px] bg-[#f2f1ee] px-5 py-9 sm:py-12">
          <form onSubmit={handleSubmit} className="mx-auto max-w-[460px]">
            {status === "success" ? (
              <div className="border border-[#ced8df] bg-white px-7 py-12 text-center shadow-sm">
                <p className="text-2xl font-bold text-neutral-900">送信が完了しました</p>
                <p className="mt-5 text-sm leading-7 text-[#5a6976]">内容を確認のうえ、2営業日以内を目安に担当者からご連絡します。</p>
                <Link href="/" className="mt-8 inline-block font-bold text-[#0e5b94] underline underline-offset-4">ClearAIトップへ戻る</Link>
              </div>
            ) : (
              <>
                <div className="flex items-end justify-between">
                  <p className="text-[30px] font-bold leading-none text-[#0e5b94]">Q{step + 1}</p>
                  <p className="text-xs font-semibold text-[#8997a3]">{step + 1}/{totalSteps}</p>
                </div>
                <div
                  className="mt-3 h-2 overflow-hidden rounded-full bg-white"
                  role="progressbar"
                  aria-label="相談フォームの進捗"
                  aria-valuemin={1}
                  aria-valuemax={totalSteps}
                  aria-valuenow={step + 1}
                >
                  <div className="h-full rounded-full bg-[#0e5b94] transition-[width] duration-300" style={{ width: `${progress}%` }} />
                </div>

                <div className="mt-6">
                  {step < CHOICE_STEPS.length && currentChoice ? (
                    <>
                      <h3 className="mb-5 text-base font-bold leading-7 text-[#24384c]">{currentChoice.label}</h3>
                      <div className="space-y-3">
                        {currentChoice.options.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => selectChoice(currentChoice.key, option)}
                            disabled={isAdvancing}
                            className="w-full border border-[#d4dce2] bg-white px-4 py-3 text-sm font-semibold text-[#33485a] transition-colors hover:border-[#0e5b94] hover:bg-[#f7fbfe]"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </>
                  ) : step === 5 ? (
                    <InputStep id="lp-company" label="会社名を教えてください" value={company} onChange={setCompany} placeholder="ClearAI株式会社" onNext={nextInputStep} />
                  ) : step === 6 ? (
                    <div>
                      <h3 className="mb-5 text-base font-bold text-[#24384c]">ご担当者様の情報を教えてください</h3>
                      <label htmlFor="lp-name" className="mb-2 block text-sm font-bold text-[#526575]">お名前</label>
                      <input id="lp-name" required value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); nextInputStep(); } }} className="mb-4 w-full border border-[#d4dce2] bg-white px-4 py-3.5 outline-none focus:border-[#0e5b94]" placeholder="山田 太郎" />
                      <label htmlFor="lp-email" className="mb-2 block text-sm font-bold text-[#526575]">メールアドレス</label>
                      <input id="lp-email" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); nextInputStep(); } }} className="w-full border border-[#d4dce2] bg-white px-4 py-3.5 outline-none focus:border-[#0e5b94]" placeholder="name@example.com" />
                      <button type="button" onClick={nextInputStep} className="mt-5 w-full bg-[#0e5b94] py-4 font-bold text-white hover:bg-[#0a4b7c]">次へ</button>
                    </div>
                  ) : (
                    <div>
                      <h3 className="mb-5 text-base font-bold leading-7 text-[#24384c]">補足の相談内容があれば教えてください</h3>
                      <label htmlFor="lp-phone" className="mb-2 block text-sm font-bold text-[#526575]">電話番号（任意）</label>
                      <input id="lp-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="mb-4 w-full border border-[#d4dce2] bg-white px-4 py-3.5 outline-none focus:border-[#0e5b94]" placeholder="090-0000-0000" />
                      <label htmlFor="lp-details" className="mb-2 block text-sm font-bold text-[#526575]">相談内容（任意）</label>
                      <textarea id="lp-details" value={details} onChange={(e) => setDetails(e.target.value)} className="min-h-28 w-full resize-y border border-[#d4dce2] bg-white px-4 py-3.5 outline-none focus:border-[#0e5b94]" placeholder="現状や実現したいことをご記入ください" />
                      <input value={website} onChange={(e) => setWebsite(e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                      <button type="submit" disabled={status === "submitting"} className="mt-5 w-full bg-[#0e5b94] py-4 font-bold text-white transition-colors hover:bg-[#0a4b7c] disabled:opacity-60">
                        {status === "submitting" ? "送信中…" : "無料相談を送信する"}
                      </button>
                    </div>
                  )}
                </div>

                {error && <p role="alert" className="mt-4 text-sm font-semibold text-[#b42318]">{error}</p>}
                {step > 0 && (
                  <button type="button" onClick={() => { setError(""); setStep((current) => Math.max(0, current - 1)); }} className="mt-6 text-sm font-semibold text-[#657785] underline underline-offset-4">前の質問へ戻る</button>
                )}
              </>
            )}
          </form>
        </div>
      </section>

      <footer className="bg-white px-5 py-10 text-center">
        <Link href="/" className="inline-flex items-center gap-2" aria-label="ClearAIトップページ">
          <Logo size={30} className="h-7 w-auto" />
        </Link>
        <p className="mt-4 text-[10px] font-semibold text-[#697986]">© ClearAI Inc. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

function InputStep({ id, label, value, onChange, placeholder, onNext }: { id: string; label: string; value: string; onChange: (value: string) => void; placeholder: string; onNext: () => void }) {
  return (
    <div>
      <label htmlFor={id} className="mb-5 block text-base font-bold text-[#24384c]">{label}</label>
      <input id={id} required value={value} onChange={(event) => onChange(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); onNext(); } }} className="w-full border border-[#d4dce2] bg-white px-4 py-3.5 outline-none focus:border-[#0e5b94]" placeholder={placeholder} />
      <button type="button" onClick={onNext} className="mt-5 w-full bg-[#0e5b94] py-4 font-bold text-white hover:bg-[#0a4b7c]">次へ</button>
    </div>
  );
}

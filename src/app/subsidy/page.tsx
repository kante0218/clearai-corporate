"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>{children}</div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <p className="text-sm font-semibold text-amber-600 mb-4">{children}</p>;
}

type CompanySize = "small" | "large";

function formatYen(n: number) {
  return "¥" + Math.round(n).toLocaleString("ja-JP");
}

function Simulator() {
  const [people, setPeople] = useState(10);
  const [hours, setHours] = useState(40);
  const [hourlyFee, setHourlyFee] = useState(5000);
  const [wage, setWage] = useState(2500);
  const [size, setSize] = useState<CompanySize>("small");

  const result = useMemo(() => {
    const totalTrainingCost = hourlyFee * hours * people;
    const totalWageCost = wage * hours * people;

    const expenseRate = size === "small" ? 0.75 : 0.6;
    const wagePerHour = size === "small" ? 960 : 480;

    const capPerPerson = hours < 10 ? 0 : hours < 100 ? 300_000 : hours < 200 ? 400_000 : 500_000;
    const expenseSubsidyRaw = totalTrainingCost * expenseRate;
    const expenseCap = capPerPerson * people;
    const expenseSubsidy = Math.min(expenseSubsidyRaw, expenseCap);

    const wageSubsidy = wagePerHour * hours * people;

    const totalSubsidy = expenseSubsidy + wageSubsidy;
    const netCost = totalTrainingCost - expenseSubsidy;
    const effectiveRate = totalTrainingCost > 0 ? (expenseSubsidy / totalTrainingCost) * 100 : 0;

    return {
      totalTrainingCost,
      totalWageCost,
      expenseSubsidy,
      wageSubsidy,
      totalSubsidy,
      netCost,
      effectiveRate,
      hoursEligible: hours >= 10,
    };
  }, [people, hours, hourlyFee, wage, size]);

  return (
    <div className="bg-white rounded-3xl border border-amber-200 shadow-xl p-6 lg:p-10">
      <div className="grid lg:grid-cols-2 gap-10">
        {/* 入力 */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-6">シミュレーション条件</h3>
          <div className="space-y-6">
            <div>
              <label className="flex items-center justify-between text-sm font-semibold text-gray-700 mb-2">
                <span>企業規模</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(["small", "large"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`py-3 rounded-lg text-sm font-semibold transition-all ${
                      size === s
                        ? "bg-amber-500 text-white border border-amber-500"
                        : "bg-white text-gray-600 border border-gray-200 hover:border-amber-300"
                    }`}
                  >
                    {s === "small" ? "中小企業（75%）" : "大企業（60%）"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center justify-between text-sm font-semibold text-gray-700 mb-2">
                <span>受講者数</span>
                <span className="text-amber-600">{people}人</span>
              </label>
              <input type="range" min={1} max={100} value={people} onChange={(e) => setPeople(Number(e.target.value))} className="w-full accent-amber-500" />
            </div>

            <div>
              <label className="flex items-center justify-between text-sm font-semibold text-gray-700 mb-2">
                <span>研修時間（1人あたり）</span>
                <span className="text-amber-600">{hours}時間</span>
              </label>
              <input type="range" min={1} max={300} value={hours} onChange={(e) => setHours(Number(e.target.value))} className="w-full accent-amber-500" />
              {!result.hoursEligible && (
                <p className="text-xs text-red-600 mt-2">※ 助成金は研修時間10時間以上が要件です。</p>
              )}
            </div>

            <div>
              <label className="flex items-center justify-between text-sm font-semibold text-gray-700 mb-2">
                <span>研修単価（1人・1時間）</span>
                <span className="text-amber-600">{formatYen(hourlyFee)}</span>
              </label>
              <input type="range" min={1000} max={20000} step={500} value={hourlyFee} onChange={(e) => setHourlyFee(Number(e.target.value))} className="w-full accent-amber-500" />
            </div>

            <div>
              <label className="flex items-center justify-between text-sm font-semibold text-gray-700 mb-2">
                <span>受講者の平均時給</span>
                <span className="text-amber-600">{formatYen(wage)}</span>
              </label>
              <input type="range" min={1000} max={6000} step={100} value={wage} onChange={(e) => setWage(Number(e.target.value))} className="w-full accent-amber-500" />
            </div>
          </div>
        </div>

        {/* 結果 */}
        <div className="bg-gradient-to-br from-amber-50 to-sky-50 rounded-2xl p-6 lg:p-8 border border-amber-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">試算結果</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-baseline border-b border-amber-200/60 pb-3">
              <span className="text-sm text-gray-600">研修費用（通常）</span>
              <span className="text-lg font-bold text-gray-900">{formatYen(result.totalTrainingCost)}</span>
            </div>
            <div className="flex justify-between items-baseline border-b border-amber-200/60 pb-3">
              <span className="text-sm text-gray-600">経費助成（{size === "small" ? "75" : "60"}%）</span>
              <span className="text-lg font-bold text-amber-700">− {formatYen(result.expenseSubsidy)}</span>
            </div>
            <div className="flex justify-between items-baseline border-b border-amber-200/60 pb-3">
              <span className="text-sm text-gray-600">賃金助成（{size === "small" ? "960" : "480"}円/人・時間）</span>
              <span className="text-lg font-bold text-amber-700">+ {formatYen(result.wageSubsidy)}</span>
            </div>
            <div className="bg-white rounded-xl p-5 mt-6 border border-amber-300">
              <p className="text-xs font-semibold text-gray-500 mb-1">実質負担額</p>
              <p className="text-3xl lg:text-4xl font-bold text-gray-900">{formatYen(result.netCost)}</p>
              <p className="text-xs text-gray-500 mt-2">
                助成金総額 <span className="font-semibold text-amber-700">{formatYen(result.totalSubsidy)}</span>（経費＋賃金合算）
              </p>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed mt-4">
              ※ 本試算は「人材開発支援助成金・事業展開等リスキリング支援コース」を前提にした概算です。実際の支給額は労働局の審査により変動します。正確な見積もりは無料相談をご利用ください。
            </p>
            <a href="/contact?service=subsidy" className="mt-4 block w-full text-center rounded-lg bg-amber-500 text-white font-semibold px-6 py-3.5 hover:bg-amber-600 transition-colors">
              この条件で相談する →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SubsidyPage() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setHeroLoaded(true), 100); }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute bottom-1/3 right-1/4 w-[1px] h-[1px] shadow-[0_0_300px_150px_rgba(251,191,36,0.10)]" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <span className="inline-block rounded-full bg-amber-50 text-amber-600 px-3 py-1 text-sm font-semibold mb-6 transition-all duration-700" style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "300ms" }}>Subsidy Support</span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6 transition-all duration-700" style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(24px)", transitionDelay: "500ms" }}>
            研修費・AI導入費を、<br /><span className="text-amber-600">最大75%</span>削減。
          </h1>
          <p className="text-base text-gray-600 leading-relaxed max-w-lg mx-auto mb-10 transition-all duration-700" style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "700ms" }}>
            人材開発支援助成金・IT導入補助金・茨城県独自の支援制度まで。<br />計画策定から実施報告、支給申請までフルサポートします。
          </p>
          <div className="flex items-center justify-center gap-4 transition-all duration-700" style={{ opacity: heroLoaded ? 1 : 0, transitionDelay: "900ms" }}>
            <a href="#simulator" className="rounded-lg bg-amber-500 text-white font-semibold px-8 py-3.5 hover:bg-amber-600 transition-colors duration-300">
              実質負担額を試算する
            </a>
            <a href="/contact?service=subsidy" className="text-sm text-gray-500 font-semibold hover:text-gray-900 transition-colors duration-300">
              無料で相談する →
            </a>
          </div>
        </div>
      </section>

      {/* 3つの補助金 */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Programs</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">対応する3つの支援制度</h2>
            <p className="text-sm text-gray-500 mb-14 max-w-2xl leading-relaxed">
              AI研修・AI導入プロジェクトに最も適した制度を、貴社の事業ステージと目的に合わせてご提案します。
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                tag: "国",
                title: "人材開発支援助成金",
                subtitle: "事業展開等リスキリング支援コース",
                desc: "新規事業・DX推進のための研修に使える厚労省の制度。AI・生成AI研修と極めて相性が良く、経費の最大75%と受講者の賃金を助成。",
                metrics: [
                  { label: "経費助成（中小）", value: "75%" },
                  { label: "賃金助成", value: "960円/人・時間" },
                  { label: "1人あたり上限", value: "最大50万円" },
                ],
                ideal: "AI研修・プロンプト研修・DX人材育成",
              },
              {
                tag: "国",
                title: "IT導入補助金",
                subtitle: "通常枠 / インボイス対応枠 等",
                desc: "AIツール・SaaS・業務自動化システムの導入費用を補助。clearAIのコンサル＋導入パッケージと組み合わせて活用可能。",
                metrics: [
                  { label: "補助率", value: "最大 1/2〜3/4" },
                  { label: "補助額", value: "〜450万円" },
                  { label: "対象", value: "ソフトウェア・導入費" },
                ],
                ideal: "AIツール導入・業務自動化・RAG構築",
              },
              {
                tag: "県・市",
                title: "茨城県・地方自治体支援",
                subtitle: "DX推進／中小企業人材開発等",
                desc: "茨城県および県内市町村が独自に実施するDX・生成AI活用・人材育成の助成制度。全国対応ですが、当社拠点の茨城県は特に精通しています。",
                metrics: [
                  { label: "対象", value: "県内中小企業等" },
                  { label: "補助率", value: "制度により50〜75%" },
                  { label: "特徴", value: "国制度と併用可の場合あり" },
                ],
                ideal: "地元企業のDX支援・小規模導入",
              },
            ].map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
                <div className="rounded-2xl border border-gray-200 bg-white p-8 h-full flex flex-col hover:border-amber-300 hover:shadow-lg transition-all duration-300">
                  <span className="inline-block text-xs font-bold tracking-widest text-amber-600 uppercase mb-3">{p.tag}</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{p.title}</h3>
                  <p className="text-xs text-gray-500 mb-4">{p.subtitle}</p>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-1">{p.desc}</p>
                  <div className="space-y-2 border-t border-gray-100 pt-4 mb-4">
                    {p.metrics.map((m) => (
                      <div key={m.label} className="flex items-baseline justify-between gap-3">
                        <span className="text-xs text-gray-500">{m.label}</span>
                        <span className="text-sm font-bold text-gray-900">{m.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
                    <span className="font-semibold text-gray-700">活用シーン：</span>{p.ideal}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Simulator */}
      <section id="simulator" className="py-20 lg:py-28 bg-gradient-to-br from-amber-50 via-white to-sky-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Simulator</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">実質負担額を、その場で計算。</h2>
            <p className="text-sm text-gray-500 mb-10 max-w-2xl leading-relaxed">
              受講人数・研修時間・企業規模を入れるだけ。人材開発支援助成金（事業展開等リスキリング支援コース）を前提にした概算が即座に表示されます。
            </p>
          </Reveal>
          <Reveal delay={150}>
            <Simulator />
          </Reveal>
        </div>
      </section>

      {/* サポート範囲 */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Our Support</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-14">
              clearAIのサポート範囲
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "01", title: "制度診断", desc: "事業規模・目的・実施予定からベストな助成金の組み合わせをご提案。" },
              { num: "02", title: "訓練計画策定", desc: "カリキュラム・時間数・対象者を助成金要件に合致する形で設計。" },
              { num: "03", title: "書類作成伴走", desc: "提携社労士と連携し、訓練計画届・実施報告・支給申請まで書類作成を支援。" },
              { num: "04", title: "実施・記録", desc: "研修の実施から出席簿・賃金台帳までのエビデンス管理をサポート。" },
            ].map((item, i) => (
              <Reveal key={item.num} delay={i * 80}>
                <div className="border-t-2 border-amber-500 pt-6">
                  <span className="text-xs font-semibold text-amber-600 tracking-widest">{item.num}</span>
                  <h3 className="text-lg font-bold text-gray-900 mt-2 mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={400}>
            <div className="mt-12 bg-amber-50 border border-amber-200 rounded-2xl p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-900 mb-1">書類の最終提出は事業主または提携社労士が行います</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  clearAIは計画策定・研修実施・エビデンス管理までを責任を持って伴走。労働局への正式な申請手続きは有資格者である提携社労士がおこないます（紹介可）。
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FLOW */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Flow</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-14">申請から受給までの流れ</h2>
          </Reveal>
          <div className="space-y-6">
            {[
              { step: "STEP 1", title: "無料相談・制度診断", desc: "貴社の事業内容・目的・規模をヒアリングし、活用可能な助成金を特定します。", duration: "約30分" },
              { step: "STEP 2", title: "訓練計画策定", desc: "助成金要件に適合したカリキュラム・時間数・対象者を設計します。", duration: "2〜3週間" },
              { step: "STEP 3", title: "訓練計画届の提出", desc: "研修開始日の原則1ヶ月前までに、管轄の都道府県労働局へ提出します。", duration: "事前提出必須" },
              { step: "STEP 4", title: "研修の実施", desc: "計画通りに研修を実施し、出席簿・賃金台帳等のエビデンスを整備します。", duration: "カリキュラムに応じる" },
              { step: "STEP 5", title: "支給申請", desc: "研修終了日の翌日から2ヶ月以内に、支給申請書類を労働局へ提出します。", duration: "終了後2ヶ月以内" },
              { step: "STEP 6", title: "助成金の受給", desc: "労働局の審査後、助成金が事業主の口座に振り込まれます。", duration: "申請後 数ヶ月" },
            ].map((f, i) => (
              <Reveal key={f.step} delay={i * 60}>
                <div className="bg-white rounded-2xl border border-gray-200 p-6 lg:p-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                  <div className="flex-shrink-0 sm:w-40">
                    <span className="inline-block text-xs font-bold text-amber-600 tracking-widest mb-1">{f.step}</span>
                    <p className="text-xs text-gray-400">{f.duration}</p>
                  </div>
                  <div className="flex-1 sm:border-l sm:border-gray-200 sm:pl-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{f.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>FAQ</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-14">よくあるご質問</h2>
          </Reveal>
          <div className="space-y-4">
            {[
              {
                q: "人材開発支援助成金は誰でも使えますか？",
                a: "雇用保険適用事業所であり、一定の要件を満たす訓練計画を事前に労働局に届け出た上で、計画通り実施できれば受給可能です。中小企業は経費助成率が75%になります。",
              },
              {
                q: "申請手続きはclearAIが代行してくれますか？",
                a: "連携する社労士と共に、訓練計画届・実施報告・支給申請までの書類作成を伴走支援します。書類の最終提出は事業主または提携社労士が行います。",
              },
              {
                q: "費用の立替は必要ですか？",
                a: "助成金は後払い方式のため、研修費用は一旦お支払いいただき、実施後に助成金が支給される流れになります。資金繰りのご相談にも応じます。",
              },
              {
                q: "どれくらいの期間で受給できますか？",
                a: "訓練開始の1ヶ月前に計画届を提出し、研修終了後2ヶ月以内に支給申請。その後労働局の審査を経て支給となります。全体で4〜8ヶ月程度を見込んでください。",
              },
              {
                q: "IT導入補助金と人材開発支援助成金は併用できますか？",
                a: "基本的に同一費用の二重受給はできませんが、AIツール導入費はIT導入補助金、研修費は人材開発支援助成金、と分けて活用することは可能です。個別にご提案します。",
              },
              {
                q: "茨城県内の企業向けの補助金はありますか？",
                a: "茨城県独自のDX推進・人材育成関連助成金や、市町村単位での支援制度があります。clearAIは茨城県に拠点を置く企業として地域特有の制度にも精通しています。",
              },
            ].map((f, i) => (
              <Reveal key={f.q} delay={i * 40}>
                <details className="group bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <summary className="cursor-pointer list-none p-5 flex items-start justify-between gap-4 hover:bg-gray-50 transition-colors">
                    <span className="text-sm lg:text-base font-semibold text-gray-900">{f.q}</span>
                    <span className="flex-shrink-0 text-amber-500 text-xl transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">{f.a}</div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Reveal>
            <Label>Contact</Label>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              補助金を、損なく使い切る。
            </h2>
            <p className="text-base text-gray-600 leading-relaxed mb-10">
              「どの制度が合うかわからない」「書類作成に自信がない」——そんな段階からご相談いただけます。30分の無料診断から。
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a href="/contact?service=subsidy" className="rounded-lg bg-amber-500 text-white font-semibold px-10 py-4 hover:bg-amber-600 transition-colors duration-300 inline-block">
                無料相談を予約する
              </a>
              <a href="/training" className="text-sm text-gray-500 font-semibold hover:text-gray-900 transition-colors duration-300">
                研修プログラムを見る →
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

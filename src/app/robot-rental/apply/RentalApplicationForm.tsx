"use client";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import LocalizedContent from "@/components/LocalizedContent";


import Link from "next/link";
import RentalDatePicker from "./RentalDatePicker";
import { addDays, formatRentalDate, todayInJapan } from "./rental-date";
import { FormEvent, useMemo, useRef, useState } from "react";
import { parseRentalSelection, ENGINEER_DAY_RATE, ENGINEER_HOURLY_RATE, RENTAL_MODELS, RENTAL_USE_CASES, type RentalModelId } from "@/lib/robot-rental-order";

const yen = (value: number) => `¥${value.toLocaleString("ja-JP")}`;

export default function RentalApplicationForm({ initialSelection }: { initialSelection: ReturnType<typeof parseRentalSelection> }) {
  const { locale } = useLanguage();
  const [model, setModel] = useState<RentalModelId>(initialSelection.model);
  const [grade, setGrade] = useState<string>(initialSelection.grade);
  const [nights, setNights] = useState(initialSelection.nights);
  const [engineerPlan, setEngineerPlan] = useState<"hourly" | "day">(initialSelection.engineerPlan);
  const [engineerHours, setEngineerHours] = useState(initialSelection.engineerHours);
  const [startDate, setStartDate] = useState("");
  const dateSectionRef = useRef<HTMLDivElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const submissionRef = useRef<{ payloadKey: string; id: string } | null>(null);

  const gradeNames = Object.keys(RENTAL_MODELS[model].grades);
  const amount = useMemo(() => {
    const prices = RENTAL_MODELS[model].grades[grade as keyof typeof RENTAL_MODELS[typeof model]["grades"]] as readonly number[] | undefined;
    return prices?.[nights - 1] ?? 0;
  }, [grade, model, nights]);
  const engineerAmount = engineerPlan === "day" ? ENGINEER_DAY_RATE : engineerHours * ENGINEER_HOURLY_RATE;
  const subtotal = amount + engineerAmount;

  function changeModel(next: RentalModelId) {
    setModel(next);
    setGrade(Object.keys(RENTAL_MODELS[next].grades)[0]);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!startDate || startDate < todayInJapan()) {
      setError("利用開始日をカレンダーから選択してください。");
      dateSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      dateSectionRef.current?.querySelector<HTMLButtonElement>('[data-date]:not(:disabled)')?.focus({ preventScroll: true });
      return;
    }
    if (!event.currentTarget.reportValidity()) return;
    setSubmitting(true);
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    payload.model = model;
    payload.grade = grade;
    payload.nights = String(nights);
    payload.engineerPlan = engineerPlan;
    payload.engineerHours = String(engineerHours);
    payload.accepted = form.get("accepted") === "on" ? "true" : "false";
    const payloadKey = JSON.stringify(payload);
    if (!submissionRef.current || submissionRef.current.payloadKey !== payloadKey) {
      submissionRef.current = { payloadKey, id: crypto.randomUUID() };
    }
    payload.submissionId = submissionRef.current.id;

    try {
      const response = await fetch("/api/robot-rental/identity-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, accepted: payload.accepted === "true" }),
      });
      const result = await response.json();
      if (!response.ok || !result.url) throw new Error(result.error || "本人確認を開始できませんでした。");
      window.location.assign(result.url);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "本人確認を開始できませんでした。");
      setSubmitting(false);
    }
  }

  const inputClass = "mt-2 w-full rounded-md border border-slate-300 bg-white px-3.5 py-3 text-base text-slate-900 outline-none transition focus:border-[#315b73] focus:ring-2 focus:ring-[#315b73]/15";

  return <LocalizedContent>{(
    <main className="bg-[#f4f7f9] px-3 pb-20 sm:px-5 pt-28 lg:px-8 lg:pt-32">
      <div className="mx-auto max-w-6xl">
        <Link href="/robot-rental#lineup" className="text-sm font-semibold text-neutral-900 hover:text-neutral-900">← 機種一覧へ戻る</Link>

        <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
          <section className="rounded-lg border border-slate-200 bg-white p-4 sm:p-6 lg:p-10">
            <p className="mt-4 text-sm leading-7 text-neutral-700">運転免許証をお持ちでない場合や法人としての本人確認方法を確認したい場合は、本人確認へ進む前に<Link href="/contact?service=robot-rental" className="font-semibold underline underline-offset-4">申込窓口へご相談ください</Link>。</p>
            <h1 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">レンタル申込・免許証確認</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">入力後、Stripeの安全な画面で運転免許証を提出します。ClearAIのサーバーには免許証画像を保存しません。</p>

            <ol className="mt-7 grid border-y border-slate-200 py-4 text-sm sm:grid-cols-3">
              <li className="py-2 sm:border-r sm:px-4 sm:first:pl-0"><span className="mr-2 font-bold text-neutral-900">1</span>申込内容を入力</li>
              <li className="py-2 sm:border-r sm:px-4"><span className="mr-2 font-bold text-neutral-900">2</span>免許証で本人確認</li>
              <li className="py-2 sm:px-4"><span className="mr-2 font-bold text-neutral-900">3</span>確認後にStripe決済</li>
            </ol>

            <form noValidate onSubmit={submit} className="mt-8 space-y-10">
              {error && <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
              <fieldset>
                <legend className="text-base font-bold text-neutral-900">機種・利用期間</legend>
                <div className="mt-4 grid gap-5 sm:grid-cols-2">
                  <label className="text-sm font-semibold text-slate-700">機種
                    <select value={model} onChange={(event) => changeModel(event.target.value as RentalModelId)} className={inputClass}>
                      {Object.entries(RENTAL_MODELS).map(([id, item]) => <option key={id} value={id}>{item.name}</option>)}
                    </select>
                  </label>
                  <label className="text-sm font-semibold text-slate-700">グレード
                    <select value={grade} onChange={(event) => setGrade(event.target.value)} className={inputClass}>
                      {gradeNames.map((item) => <option key={item}>{item}</option>)}
                    </select>
                  </label>
                </div>
                <div className="mt-6 grid items-start gap-6 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
                  <div ref={dateSectionRef}>
                    <RentalDatePicker value={startDate} nights={nights} onChange={setStartDate} />
                  </div>
                  <div className="pt-2">
                    <label className="block text-sm font-semibold text-slate-700">利用期間
                      <select value={nights} onChange={(event) => setNights(Number(event.target.value))} className={inputClass}>
                        {[1, 2, 3, 4, 5, 6, 7].map((value) => <option key={value} value={value}>{value}泊{value + 1}日</option>)}
                      </select>
                    </label>
                    <div className="mt-5 border-l-2 border-[#315b73] pl-4" aria-live="polite" aria-atomic="true">
                      <p className="text-xs font-semibold text-slate-500">選択した利用日程</p>
                      {startDate ? <><p className="mt-2 text-base font-bold text-neutral-900">{formatRentalDate(startDate, locale)} 〜<br />{formatRentalDate(addDays(startDate, nights), locale)}</p><p className="mt-2 text-sm text-slate-600">{nights}泊{nights + 1}日</p></> : <p className="mt-2 text-sm leading-6 text-slate-600">カレンダーから開始日を選んでください。</p>}
                    </div>
                  </div>
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-base font-bold text-neutral-900">初日のハードウェアエンジニア帯同<span className="ml-2 text-xs text-red-700">必須</span></legend>
                <p className="mt-2 text-sm leading-6 text-slate-600">安全な立ち上げ・操作説明のため、利用初日は必ずclearAIのハードウェアエンジニアが帯同します。</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label className={`cursor-pointer rounded-md border p-4 text-center ${engineerPlan === "day" ? "border-[#315b73] bg-[#315b73]/5" : "border-slate-200"}`}>
                    <span className="flex min-h-6 items-center justify-center">
                    <input type="radio" name="engineerPlan" value="day" checked={engineerPlan === "day"} onChange={() => setEngineerPlan("day")} className="mr-2 accent-[#12314b]" />
                    <span className="font-semibold text-slate-900">1日帯同</span></span>
                    <span className="mt-1 block text-sm text-slate-600">{yen(ENGINEER_DAY_RATE)}（税別）</span>
                  </label>
                  <label className={`cursor-pointer rounded-md border p-4 text-center ${engineerPlan === "hourly" ? "border-[#315b73] bg-[#315b73]/5" : "border-slate-200"}`}>
                    <span className="flex min-h-6 items-center justify-center">
                    <input type="radio" name="engineerPlan" value="hourly" checked={engineerPlan === "hourly"} onChange={() => setEngineerPlan("hourly")} className="mr-2 accent-[#12314b]" />
                    <span className="font-semibold text-slate-900">時間帯同</span></span>
                    <span className="mt-1 block text-sm text-slate-600">1時間 {yen(ENGINEER_HOURLY_RATE)}（税別）</span>
                  </label>
                </div>
                {engineerPlan === "hourly" && (
                  <label className="mt-4 block text-sm font-semibold text-slate-700">帯同時間（1〜9時間）
                    <select value={engineerHours} onChange={(event) => setEngineerHours(Number(event.target.value))} className={inputClass}>
                      {[1,2,3,4,5,6,7,8,9].map((hours) => <option key={hours} value={hours}>{hours}時間（{yen(hours * ENGINEER_HOURLY_RATE)}）</option>)}
                    </select>
                  </label>
                )}
              </fieldset>

              <fieldset>
                <legend className="text-base font-bold text-neutral-900">申込者情報</legend>
                <div className="mt-4 grid gap-5 sm:grid-cols-2">
                  <label className="text-sm font-semibold text-slate-700">会社名<span className="ml-1 text-red-700">*</span><input required name="company" autoComplete="organization" maxLength={120} className={inputClass} /></label>
                  <label className="text-sm font-semibold text-slate-700">お名前<span className="ml-1 text-red-700">*</span><input required name="name" autoComplete="name" maxLength={80} className={inputClass} /></label>
                  <label className="text-sm font-semibold text-slate-700">メールアドレス<span className="ml-1 text-red-700">*</span><input required type="email" name="email" autoComplete="email" maxLength={254} className={inputClass} /></label>
                  <label className="text-sm font-semibold text-slate-700">電話番号<span className="ml-1 text-red-700">*</span><input required type="tel" name="phone" autoComplete="tel" maxLength={30} className={inputClass} /></label>
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-base font-bold text-neutral-900">配送先・利用目的</legend>
                <div className="mt-4 grid gap-5 sm:grid-cols-2">
                  <label className="text-sm font-semibold text-slate-700">郵便番号<span className="ml-1 text-red-700">*</span><input required name="postalCode" autoComplete="postal-code" maxLength={12} placeholder="000-0000" className={inputClass} /></label>
                  <label className="text-sm font-semibold text-slate-700">都道府県<span className="ml-1 text-red-700">*</span><input required name="prefecture" autoComplete="address-level1" maxLength={20} className={inputClass} /></label>
                  <label className="text-sm font-semibold text-slate-700 sm:col-span-2">市区町村・番地<span className="ml-1 text-red-700">*</span><input required name="address1" autoComplete="address-line1" maxLength={160} className={inputClass} /></label>
                  <label className="text-sm font-semibold text-slate-700 sm:col-span-2">建物名・部屋番号<input name="address2" autoComplete="address-line2" maxLength={160} className={inputClass} /></label>
                  <label className="text-sm font-semibold text-slate-700 sm:col-span-2">利用目的<span className="ml-1 text-red-700">*</span>
                    <select required name="useCase" defaultValue="" className={inputClass}>
                      <option value="" disabled>選択してください</option>
                      {Object.entries(RENTAL_USE_CASES).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                    </select>
                  </label>
                </div>
              </fieldset>

              <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

              <label className="flex items-start gap-3 text-sm leading-6 text-slate-600">
                <input required type="checkbox" name="accepted" className="mt-1 size-4 accent-[#12314b]" />
                <span><Link href="/robot-rental#terms" target="_blank" className="font-semibold text-neutral-900 underline">レンタル条件</Link>と<Link href="/privacy" target="_blank" className="font-semibold text-neutral-900 underline">プライバシーポリシー</Link>、Stripeによる免許証のライブ撮影と顔写真照合に同意します。</span>
              </label>

              <button data-ui-button="filled" type="submit" disabled={submitting} className="inline-flex min-h-14 w-full items-center justify-center rounded-md bg-cta px-6 py-4 text-base font-bold text-white transition hover:bg-cta-hover disabled:cursor-wait disabled:opacity-60"><span className="ui-button-label">{submitting ? "Stripeへ接続しています…" : "免許証の本人確認へ進む"}</span></button>
            </form>
          </section>

          <aside className="rounded-lg border border-slate-200 bg-white p-6 lg:sticky lg:top-28">
            <p className="text-xs font-bold tracking-wider text-neutral-900">申込内容</p>
            <h2 className="mt-2 text-xl font-bold text-neutral-900">{RENTAL_MODELS[model].name}</h2>
            <dl className="mt-5 divide-y divide-slate-200 text-sm">
              <div className="flex justify-between py-3"><dt className="text-slate-500">グレード</dt><dd className="font-semibold text-slate-900">{grade}</dd></div>
              {startDate && <div className="py-3"><dt className="text-slate-500">利用日程</dt><dd className="mt-1 font-semibold leading-6 text-slate-900">{formatRentalDate(startDate, locale)} 〜 {formatRentalDate(addDays(startDate, nights), locale)}</dd></div>}
              <div className="flex justify-between py-3"><dt className="text-slate-500">期間</dt><dd className="font-semibold text-slate-900">{nights}泊{nights + 1}日</dd></div>
              <div className="py-3"><dt className="text-slate-500">基本料金</dt><dd className="mt-1 text-2xl font-bold text-neutral-900">{yen(amount)}<span className="ml-1 text-xs font-normal text-slate-500">税別</span></dd></div>
              <div className="flex justify-between py-3"><dt className="text-slate-500">初日エンジニア帯同（必須）</dt><dd className="font-semibold text-slate-900">{yen(engineerAmount)}</dd></div>
              <div className="py-3"><dt className="text-slate-500">合計</dt><dd className="mt-1 text-2xl font-bold text-neutral-900">{yen(subtotal)}<span className="ml-1 text-xs font-normal text-slate-500">税別</span><span className="mt-1 block text-xs font-normal text-slate-500">税込 {yen(Math.round(subtotal * 1.1))}</span></dd></div>
            </dl>
            <p className="mt-4 text-xs leading-6 text-slate-500">表示合計にはレンタル料と必須の初日エンジニア帯同費を含みます。送料は配送先と機体により別途ご案内します。本人確認後、そのままStripeで表示合計を決済できます。</p>
            <div className="mt-5 border-t border-slate-200 pt-5 text-xs leading-6 text-slate-500">
              <p className="font-semibold text-slate-700">Stripe Identityを利用</p>
              <p>Stripeが免許証をライブ撮影し、顔写真との一致を確認します。画像はClearAIのサーバーには保存しません。</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )}</LocalizedContent>;
}

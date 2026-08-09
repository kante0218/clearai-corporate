"use client";

/*
 * 1分見積りシミュレーター（SIMULATION セクション）
 *
 * 3事業（フィジカルAI受託開発 / ロボットレンタル / AI研修）それぞれに質問フローを持ち、
 * 選択に応じて概算費用・所要期間をその場で算出する。
 *
 * 金額の根拠はサイト内の公開価格に合わせている:
 *   - 受託開発: PoCパック 150万円 / 本番開発 600万円〜（/ai-agent）
 *   - レンタル: Go2 ¥10,000/日、G1・AgiBot A2 ¥100,000/日（/robot-rental）
 *   - 研修:     スポット 20万円〜 / パッケージ 80万円〜（/training）、助成金で最大75%
 * 表示はあくまで目安で、確定見積りは問い合わせ後に提示する。
 */

import Link from "next/link";
import { useMemo, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

type Lang = "ja" | "en";

type Option = {
  id: string;
  label: string;
  /** 費用への倍率 */
  mul?: number;
  /** 費用への加算（万円） */
  add?: number;
  /** 期間への加算（月） */
  months?: number;
  /** 期間への倍率 */
  monthsMul?: number;
};

type Question = {
  id: string;
  q: string;
  multi?: boolean;
  options: Option[];
};

type Track = {
  id: "build" | "rental" | "training";
  label: string;
  note: string;
  /** ベース費用（万円） */
  base: number;
  /** ベース期間（月）— レンタルは日数換算で別表示 */
  baseMonths: number;
  unit: "project" | "rental" | "training";
  href: string;
  questions: Question[];
};

const COPY: Record<Lang, {
  headline: string;
  lead: string;
  disclaimer: string;
  pickTrack: string;
  total: string;
  duration: string;
  monthsUnit: string;
  daysUnit: string;
  resultLead: string;
  subsidyLabel: string;
  subsidyNote: string;
  reset: string;
  cta: string;
  detail: string;
  progress: (a: number, b: number) => string;
  answered: string;
  tracks: Track[];
}> = {
  ja: {
    headline: "料金シミュレーションで1分見積り",
    lead: "さっそく料金を調べてみましょう。",
    disclaimer: "※ シミュレーションで表示される金額・期間は目安です。",
    pickTrack: "Q. ご検討中の領域を選択してください",
    total: "概算総額",
    duration: "想定期間",
    monthsUnit: "ヶ月",
    daysUnit: "日間",
    resultLead: "で対応できます！",
    subsidyLabel: "助成金適用後の実質負担（最大75%）",
    subsidyNote: "人材開発支援助成金（厚生労働省）の要件を満たす場合の目安です。要件・支給上限により実質負担額は変動します。",
    reset: "選び直す",
    cta: "このまま問い合わせする",
    detail: "サービス詳細を見る →",
    progress: (a, b) => `${a} / ${b} 問に回答`,
    answered: "回答済み",
    tracks: [
      {
        id: "build",
        label: "フィジカルAI受託開発",
        note: "ロボット・現場設備とAIをつなぐシステムの受託開発",
        base: 150,
        baseMonths: 1.5,
        unit: "project",
        href: "/physical-ai",
        questions: [
          {
            id: "stage",
            q: "Q. 現在の進捗状況を選択してください",
            options: [
              { id: "idea", label: "アイデア段階", mul: 1.0, months: 0.5 },
              { id: "req", label: "要件が固まっている", mul: 0.95 },
              { id: "poc", label: "PoC実施済み", mul: 1.6, months: 1 },
              { id: "renew", label: "既存システムの改修", mul: 1.2 },
            ],
          },
          {
            id: "scope",
            q: "Q. 対象となる業務範囲を選択してください",
            options: [
              { id: "single", label: "単一業務の自動化", mul: 1.0 },
              { id: "multi", label: "複数業務・部門横断", mul: 1.9, months: 1 },
              { id: "company", label: "全社／基幹システム連携", mul: 3.2, months: 2 },
            ],
          },
          {
            id: "hardware",
            q: "Q. ロボット・ハードウェア連携の有無を選択してください",
            options: [
              { id: "none", label: "ソフトウェアのみ", mul: 1.0 },
              { id: "one", label: "1機種と連携", mul: 1.5, months: 0.5 },
              { id: "many", label: "複数機種・現場統合", mul: 2.4, months: 1.5 },
              { id: "line", label: "生産設備・ライン制御", mul: 3.0, months: 2 },
            ],
          },
          {
            id: "integration",
            q: "Q. 連携が必要な既存システム数を選択してください",
            options: [
              { id: "zero", label: "なし", mul: 1.0 },
              { id: "few", label: "1〜2システム", mul: 1.2, months: 0.5 },
              { id: "many", label: "3システム以上", mul: 1.5, months: 1 },
            ],
          },
          {
            id: "extra",
            q: "Q. 追加で必要なものを選択してください（複数選択可）",
            multi: true,
            options: [
              { id: "vision", label: "画像・映像認識", add: 120, months: 0.5 },
              { id: "scan", label: "現場3Dスキャン", add: 60, months: 0.5 },
              { id: "sim", label: "シミュレーション／模倣学習", add: 200, months: 1 },
              { id: "edge", label: "エッジ推論・オンプレ実行", add: 150, months: 0.5 },
              { id: "app", label: "現場向け操作アプリ", add: 100, months: 0.5 },
              { id: "sla", label: "24/365 運用保守・SLA", add: 180 },
              { id: "train", label: "社内向け引き継ぎ研修", add: 60 },
            ],
          },
        ],
      },
      {
        id: "rental",
        label: "ロボットレンタル",
        note: "ヒューマノイド・四足歩行ロボットの短期レンタル",
        base: 10,
        baseMonths: 0,
        unit: "rental",
        href: "/robot-rental",
        questions: [
          {
            id: "model",
            q: "Q. ご希望の機種カテゴリを選択してください",
            options: [
              { id: "quad", label: "四足歩行（Unitree Go2 等）", mul: 1.0 },
              { id: "humanoid-s", label: "小型ヒューマノイド（Unitree G1 等）", mul: 10 },
              { id: "humanoid-l", label: "大型ヒューマノイド（AgiBot A2 等）", mul: 10 },
              { id: "arm", label: "協働ロボットアーム", mul: 4 },
            ],
          },
          {
            id: "days",
            q: "Q. レンタル日数を選択してください",
            options: [
              { id: "1", label: "1日（スポット）", mul: 1 },
              { id: "3", label: "3日間", mul: 2.7 },
              { id: "7", label: "1週間", mul: 5.6 },
              { id: "30", label: "1ヶ月", mul: 18 },
            ],
          },
          {
            id: "units",
            q: "Q. 台数を選択してください",
            options: [
              { id: "1", label: "1台", mul: 1 },
              { id: "2", label: "2〜3台", mul: 2.6 },
              { id: "4", label: "4台以上", mul: 4.5 },
            ],
          },
          {
            id: "operator",
            q: "Q. オペレーター派遣を選択してください",
            options: [
              { id: "none", label: "不要（自社で操作）", add: 0 },
              { id: "half", label: "半日同行", add: 8 },
              { id: "full", label: "終日同行", add: 15 },
              { id: "multi", label: "複数日同行", add: 40 },
            ],
          },
          {
            id: "purpose",
            q: "Q. 用途を選択してください（複数選択可）",
            multi: true,
            options: [
              { id: "event", label: "展示会・イベント演出", add: 5 },
              { id: "poc", label: "現場でのPoC・実証", add: 12 },
              { id: "rnd", label: "研究開発・検証", add: 10 },
              { id: "media", label: "撮影・メディア露出", add: 8 },
              { id: "custom", label: "動作カスタマイズ・自動巡回設定", add: 35 },
              { id: "transport", label: "搬入出・設置代行", add: 10 },
            ],
          },
        ],
      },
      {
        id: "training",
        label: "AI研修",
        note: "社員がAIで自分の業務システムを作れるようになる実践研修",
        base: 20,
        baseMonths: 0.5,
        unit: "training",
        href: "/training",
        questions: [
          {
            id: "size",
            q: "Q. 受講予定人数を選択してください",
            options: [
              { id: "10", label: "〜10名", mul: 1.0 },
              { id: "30", label: "11〜30名", mul: 1.6 },
              { id: "100", label: "31〜100名", mul: 2.6 },
              { id: "over", label: "101名以上", mul: 4.0 },
            ],
          },
          {
            id: "target",
            q: "Q. 対象となる階層を選択してください",
            options: [
              { id: "exec", label: "経営層", mul: 1.1 },
              { id: "manager", label: "管理職", mul: 1.2 },
              { id: "staff", label: "現場担当", mul: 1.0 },
              { id: "all", label: "全社（階層別に実施）", mul: 2.2, months: 1 },
            ],
          },
          {
            id: "format",
            q: "Q. 実施ボリュームを選択してください",
            options: [
              { id: "spot", label: "単発（2時間〜半日）", mul: 1.0 },
              { id: "package", label: "パッケージ（3ヶ月・複数回）", mul: 4.0, months: 2.5 },
              { id: "annual", label: "年間ロードマップ", mul: 9.0, months: 11.5 },
            ],
          },
          {
            id: "depth",
            q: "Q. 到達させたいレベルを選択してください",
            options: [
              { id: "literacy", label: "AIリテラシー（触れて理解する）", mul: 1.0 },
              { id: "practice", label: "実務適用（自分の業務で使える）", mul: 1.3 },
              { id: "build", label: "内製化（自分で業務ツールを作れる）", mul: 1.8, months: 0.5 },
            ],
          },
          {
            id: "option",
            q: "Q. 追加オプションを選択してください（複数選択可）",
            multi: true,
            options: [
              { id: "subsidy", label: "助成金の申請サポート", add: 15 },
              { id: "guideline", label: "社内AIガイドライン策定", add: 40 },
              { id: "record", label: "録画アーカイブ・eラーニング化", add: 25 },
              { id: "slack", label: "研修後のSlackサポート（3ヶ月）", add: 30 },
              { id: "onsite", label: "全国オンサイト実施", add: 20 },
              { id: "claude", label: "Claude / Claude Code 実践セッション", add: 35 },
            ],
          },
        ],
      },
    ],
  },
  en: {
    headline: "Get a ballpark in one minute",
    lead: "Let's find out what it would cost.",
    disclaimer: "* Figures and timelines shown here are estimates only.",
    pickTrack: "Q. Which area are you considering?",
    total: "Estimated total",
    duration: "Estimated timeline",
    monthsUnit: "months",
    daysUnit: "days",
    resultLead: "is what it would take.",
    subsidyLabel: "Net cost after subsidy (up to 75%)",
    subsidyNote: "An estimate assuming you qualify for Japan's HR Development Support Subsidy. Actual net cost varies with eligibility and caps.",
    reset: "Start over",
    cta: "Send this as an inquiry",
    detail: "See service details →",
    progress: (a, b) => `${a} / ${b} answered`,
    answered: "answered",
    tracks: [
      {
        id: "build",
        label: "Physical AI development",
        note: "Custom systems connecting robots and equipment with AI",
        base: 150,
        baseMonths: 1.5,
        unit: "project",
        href: "/physical-ai",
        questions: [
          {
            id: "stage",
            q: "Q. Where are you in the process?",
            options: [
              { id: "idea", label: "Idea stage", mul: 1.0, months: 0.5 },
              { id: "req", label: "Requirements defined", mul: 0.95 },
              { id: "poc", label: "PoC completed", mul: 1.6, months: 1 },
              { id: "renew", label: "Rebuilding an existing system", mul: 1.2 },
            ],
          },
          {
            id: "scope",
            q: "Q. What scope of work does it cover?",
            options: [
              { id: "single", label: "One workflow", mul: 1.0 },
              { id: "multi", label: "Multiple teams / workflows", mul: 1.9, months: 1 },
              { id: "company", label: "Company-wide / core system integration", mul: 3.2, months: 2 },
            ],
          },
          {
            id: "hardware",
            q: "Q. Does it involve robots or hardware?",
            options: [
              { id: "none", label: "Software only", mul: 1.0 },
              { id: "one", label: "One robot model", mul: 1.5, months: 0.5 },
              { id: "many", label: "Multiple models, site integration", mul: 2.4, months: 1.5 },
              { id: "line", label: "Production equipment / line control", mul: 3.0, months: 2 },
            ],
          },
          {
            id: "integration",
            q: "Q. How many existing systems need integrating?",
            options: [
              { id: "zero", label: "None", mul: 1.0 },
              { id: "few", label: "1–2 systems", mul: 1.2, months: 0.5 },
              { id: "many", label: "3 or more", mul: 1.5, months: 1 },
            ],
          },
          {
            id: "extra",
            q: "Q. Anything else you need? (multiple choice)",
            multi: true,
            options: [
              { id: "vision", label: "Image / video recognition", add: 120, months: 0.5 },
              { id: "scan", label: "On-site 3D scanning", add: 60, months: 0.5 },
              { id: "sim", label: "Simulation / imitation learning", add: 200, months: 1 },
              { id: "edge", label: "Edge inference / on-premise", add: 150, months: 0.5 },
              { id: "app", label: "Operator-facing app", add: 100, months: 0.5 },
              { id: "sla", label: "24/365 operations & SLA", add: 180 },
              { id: "train", label: "Handover training for your team", add: 60 },
            ],
          },
        ],
      },
      {
        id: "rental",
        label: "Robot rental",
        note: "Short-term rental of humanoid and quadruped robots",
        base: 10,
        baseMonths: 0,
        unit: "rental",
        href: "/robot-rental",
        questions: [
          {
            id: "model",
            q: "Q. Which category of robot?",
            options: [
              { id: "quad", label: "Quadruped (Unitree Go2, etc.)", mul: 1.0 },
              { id: "humanoid-s", label: "Compact humanoid (Unitree G1, etc.)", mul: 10 },
              { id: "humanoid-l", label: "Full-size humanoid (AgiBot A2, etc.)", mul: 10 },
              { id: "arm", label: "Collaborative robot arm", mul: 4 },
            ],
          },
          {
            id: "days",
            q: "Q. How long do you need it?",
            options: [
              { id: "1", label: "1 day", mul: 1 },
              { id: "3", label: "3 days", mul: 2.7 },
              { id: "7", label: "1 week", mul: 5.6 },
              { id: "30", label: "1 month", mul: 18 },
            ],
          },
          {
            id: "units",
            q: "Q. How many units?",
            options: [
              { id: "1", label: "1 unit", mul: 1 },
              { id: "2", label: "2–3 units", mul: 2.6 },
              { id: "4", label: "4 or more", mul: 4.5 },
            ],
          },
          {
            id: "operator",
            q: "Q. Do you need an operator on site?",
            options: [
              { id: "none", label: "No — we'll operate it", add: 0 },
              { id: "half", label: "Half day", add: 8 },
              { id: "full", label: "Full day", add: 15 },
              { id: "multi", label: "Multiple days", add: 40 },
            ],
          },
          {
            id: "purpose",
            q: "Q. What will you use it for? (multiple choice)",
            multi: true,
            options: [
              { id: "event", label: "Trade show / event", add: 5 },
              { id: "poc", label: "On-site PoC", add: 12 },
              { id: "rnd", label: "R&D / evaluation", add: 10 },
              { id: "media", label: "Filming / media", add: 8 },
              { id: "custom", label: "Custom motion / autonomous patrol setup", add: 35 },
              { id: "transport", label: "Delivery & setup service", add: 10 },
            ],
          },
        ],
      },
      {
        id: "training",
        label: "AI training",
        note: "Hands-on training until your staff can build their own tools",
        base: 20,
        baseMonths: 0.5,
        unit: "training",
        href: "/training",
        questions: [
          {
            id: "size",
            q: "Q. How many participants?",
            options: [
              { id: "10", label: "Up to 10", mul: 1.0 },
              { id: "30", label: "11–30", mul: 1.6 },
              { id: "100", label: "31–100", mul: 2.6 },
              { id: "over", label: "101 or more", mul: 4.0 },
            ],
          },
          {
            id: "target",
            q: "Q. Who is it for?",
            options: [
              { id: "exec", label: "Executives", mul: 1.1 },
              { id: "manager", label: "Managers", mul: 1.2 },
              { id: "staff", label: "Front-line staff", mul: 1.0 },
              { id: "all", label: "Company-wide, by level", mul: 2.2, months: 1 },
            ],
          },
          {
            id: "format",
            q: "Q. How much volume?",
            options: [
              { id: "spot", label: "One-off (2 hours – half day)", mul: 1.0 },
              { id: "package", label: "Package (3 months, multiple sessions)", mul: 4.0, months: 2.5 },
              { id: "annual", label: "Annual roadmap", mul: 9.0, months: 11.5 },
            ],
          },
          {
            id: "depth",
            q: "Q. What level should participants reach?",
            options: [
              { id: "literacy", label: "Literacy — understand what AI can do", mul: 1.0 },
              { id: "practice", label: "Application — use it in daily work", mul: 1.3 },
              { id: "build", label: "In-house build — create their own tools", mul: 1.8, months: 0.5 },
            ],
          },
          {
            id: "option",
            q: "Q. Any add-ons? (multiple choice)",
            multi: true,
            options: [
              { id: "subsidy", label: "Subsidy application support", add: 15 },
              { id: "guideline", label: "Internal AI guideline development", add: 40 },
              { id: "record", label: "Recorded archive / e-learning", add: 25 },
              { id: "slack", label: "Post-training Slack support (3 months)", add: 30 },
              { id: "onsite", label: "On-site delivery nationwide", add: 20 },
              { id: "claude", label: "Claude / Claude Code hands-on session", add: 35 },
            ],
          },
        ],
      },
    ],
  },
};

/** 万円 → 表示用の円文字列 */
function formatYen(man: number) {
  const yen = Math.round(man) * 10000;
  return `¥${yen.toLocaleString("ja-JP")}`;
}

export default function QuoteSimulator() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  const [trackId, setTrackId] = useState<Track["id"] | null>(null);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});

  const track = useMemo(() => t.tracks.find((x) => x.id === trackId) ?? null, [t.tracks, trackId]);

  const pick = (qid: string, oid: string, multi?: boolean) => {
    setAnswers((prev) => {
      const cur = prev[qid] ?? [];
      if (!multi) return { ...prev, [qid]: [oid] };
      return { ...prev, [qid]: cur.includes(oid) ? cur.filter((x) => x !== oid) : [...cur, oid] };
    });
  };

  const selectTrack = (id: Track["id"]) => {
    setTrackId(id);
    setAnswers({});
  };

  const { price, months, days, answeredCount } = useMemo(() => {
    if (!track) return { price: 0, months: 0, days: 0, answeredCount: 0 };
    let p = track.base;
    let m = track.baseMonths;
    let d = 1;
    let answered = 0;

    track.questions.forEach((q) => {
      const picked = answers[q.id] ?? [];
      if (picked.length > 0) answered += 1;
      picked.forEach((oid) => {
        const opt = q.options.find((o) => o.id === oid);
        if (!opt) return;
        if (opt.mul !== undefined) p *= opt.mul;
        if (opt.add !== undefined) p += opt.add;
        if (opt.months !== undefined) m += opt.months;
        if (opt.monthsMul !== undefined) m *= opt.monthsMul;
      });
    });

    // レンタルは「日数」で見せる（days 質問の選択をそのまま日数に）
    if (track.id === "rental") {
      const dayPick = (answers["days"] ?? [])[0];
      d = dayPick ? Number(dayPick) : 1;
    }

    return { price: p, months: m, days: d, answeredCount: answered };
  }, [track, answers]);

  const complete = track ? answeredCount >= track.questions.length : false;
  const subsidized = track?.id === "training" ? price * 0.25 : null;

  const contactHref = track
    ? `/contact?service=${track.id === "build" ? "physical-ai" : track.id === "rental" ? "robot-rental" : "education"}&est=${Math.round(price)}`
    : "/contact";

  return (
    <div className="border border-neutral-900 bg-white">
      {/* head */}
      <div className="border-b border-neutral-900 px-6 py-6 lg:px-10 lg:py-8">
        <p className="text-sm font-bold text-neutral-900">{t.lead}</p>
        <p className="mt-1 text-xs text-neutral-500">{t.disclaimer}</p>
      </div>

      {/* Q0: 領域選択 */}
      <fieldset className="border-b border-neutral-200 px-6 py-6 lg:px-10 lg:py-7">
        <legend className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-900">
          {t.pickTrack}
        </legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {t.tracks.map((tr) => {
            const on = trackId === tr.id;
            return (
              <button
                key={tr.id}
                type="button"
                onClick={() => selectTrack(tr.id)}
                aria-pressed={on}
                className={`min-h-[44px] border px-4 py-4 text-left transition-colors duration-200 ${
                  on
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-300 bg-white text-neutral-900 hover:border-neutral-900"
                }`}
              >
                <span className="block text-sm font-bold">{tr.label}</span>
                <span className={`mt-1 block text-[11px] leading-snug ${on ? "text-neutral-300" : "text-neutral-500"}`}>
                  {tr.note}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* 各設問 */}
      {track && (
        <>
          {track.questions.map((q) => {
            const picked = answers[q.id] ?? [];
            return (
              <fieldset key={q.id} className="border-b border-neutral-200 px-6 py-6 lg:px-10 lg:py-7">
                <legend className="mb-4 flex items-center gap-3">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-900">
                    {q.q}
                  </span>
                  {picked.length > 0 && (
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-400">
                      {t.answered}
                    </span>
                  )}
                </legend>
                <div className="flex flex-wrap gap-2.5">
                  {q.options.map((o) => {
                    const on = picked.includes(o.id);
                    return (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() => pick(q.id, o.id, q.multi)}
                        aria-pressed={on}
                        className={`min-h-[44px] border px-4 py-2.5 text-[13px] font-medium transition-colors duration-200 ${
                          on
                            ? "border-neutral-900 bg-neutral-900 text-white"
                            : "border-neutral-300 bg-white text-neutral-700 hover:border-neutral-900 hover:text-neutral-900"
                        }`}
                      >
                        {o.label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            );
          })}

          {/* 結果 */}
          <div className="bg-neutral-900 px-6 py-8 text-white lg:px-10 lg:py-10">
            <div className="flex items-center justify-between border-b border-white/20 pb-4">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                Simulation Result
              </span>
              <span className="font-mono text-[10px] tabular-nums text-neutral-400">
                {t.progress(answeredCount, track.questions.length)}
              </span>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">{t.total}</p>
                <p className="mt-2 text-3xl font-bold tabular-nums tracking-tight lg:text-4xl">
                  {formatYen(price)}
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">{t.duration}</p>
                <p className="mt-2 text-3xl font-bold tabular-nums tracking-tight lg:text-4xl">
                  {track.id === "rental"
                    ? `${days}${t.daysUnit}`
                    : `${Math.max(0.5, Math.round(months * 2) / 2)}${t.monthsUnit}`}
                </p>
              </div>
            </div>

            {subsidized !== null && (
              <div className="mt-7 border border-white/25 px-5 py-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-400">{t.subsidyLabel}</p>
                <p className="mt-1.5 text-2xl font-bold tabular-nums tracking-tight">{formatYen(subsidized)}</p>
                <p className="mt-2 text-[11px] leading-relaxed text-neutral-400">{t.subsidyNote}</p>
              </div>
            )}

            <p className="mt-6 text-[13px] leading-relaxed text-neutral-300">
              {complete
                ? lang === "ja"
                  ? "お問い合わせ後に、詳しいサービス内容・確定料金・スケジュールをご案内します。ぜひ、このままお問い合わせください。"
                  : "Once you get in touch, we'll walk you through the scope, firm pricing, and schedule. Feel free to send this straight over."
                : lang === "ja"
                  ? "すべての設問に回答すると、より精度の高い概算が表示されます。"
                  : "Answer every question for a sharper estimate."}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={contactHref}
                className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 border border-white bg-white px-8 py-3.5 font-mono text-sm font-bold uppercase tracking-[0.08em] text-neutral-900 transition-colors duration-300 hover:bg-neutral-200 sm:w-auto"
              >
                {t.cta}
                <span aria-hidden>→</span>
              </Link>
              <Link
                href={track.href}
                className="inline-flex min-h-[44px] items-center justify-center gap-1.5 py-2 font-mono text-xs font-bold uppercase tracking-[0.08em] text-neutral-300 transition-colors hover:text-white sm:justify-start"
              >
                {t.detail}
              </Link>
              <button
                type="button"
                onClick={() => setAnswers({})}
                className="inline-flex min-h-[44px] items-center justify-center py-2 font-mono text-xs uppercase tracking-[0.08em] text-neutral-500 transition-colors hover:text-white sm:ml-auto"
              >
                {t.reset}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

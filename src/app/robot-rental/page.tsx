"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import CardCarousel from "@/components/CardCarousel";
import { BOOKING_URL } from "@/lib/booking";

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>{children}</div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <p className="text-sm font-semibold text-neutral-900 mb-4">{children}</p>;
}

/**
 * 料金は数値そのものを言語間で共有する。
 * 表示はすべて税別（消費税は別途）。ヘッダーの「1泊2日」のみ税込を併記する。
 */
type Model = {
  id: "r1" | "g1" | "go2";
  name: string;
  image: string;
  /** 料金表の列見出し（グレード） */
  grades: string[];
  /** 日単位プラン: [期間キー, ...グレードごとの税別価格] */
  daily: { nights: number; prices: (number | null)[] }[];
  /** 月単位プラン: [月数, ...グレードごとの税別価格]（null = 設定なし） */
  monthly: { months: number; prices: (number | null)[] }[];
  /** 延長料金（1日あたり・税別） */
  extension: number;
  /** ヘッダー表示用の最安（税別 / 税込） */
  from: { excl: number; incl: number };
};

const MODELS: Model[] = [
  {
    id: "r1",
    name: "Unitree R1",
    image: "/images/robot-rental/r1.png",
    grades: ["Basic", "R&D"],
    daily: [
      { nights: 1, prices: [50000, 100000] },
      { nights: 2, prices: [90000, 180000] },
      { nights: 3, prices: [125000, 250000] },
      { nights: 4, prices: [160000, 320000] },
      { nights: 5, prices: [190000, 380000] },
      { nights: 6, prices: [215000, 430000] },
      { nights: 7, prices: [250000, 500000] },
    ],
    monthly: [
      { months: 1, prices: [600000, 1200000] },
      { months: 2, prices: [1100000, 2200000] },
      { months: 3, prices: [1551000, 3102000] },
      { months: 4, prices: [1950500, 3901000] },
      { months: 5, prices: [2300000, 4600000] },
      { months: 6, prices: [2598000, 5196000] },
      { months: 7, prices: [2849000, 5698000] },
    ],
    extension: 40000,
    from: { excl: 50000, incl: 55000 },
  },
  {
    id: "g1",
    name: "Unitree G1",
    image: "/images/robot-rental/g1.png",
    grades: ["Basic", "R&D"],
    daily: [
      { nights: 1, prices: [50000, 100000] },
      { nights: 2, prices: [90000, 180000] },
      { nights: 3, prices: [125000, 250000] },
      { nights: 4, prices: [160000, 320000] },
      { nights: 5, prices: [190000, 380000] },
      { nights: 6, prices: [215000, 430000] },
      { nights: 7, prices: [250000, 500000] },
    ],
    monthly: [
      { months: 1, prices: [600000, 1200000] },
      { months: 2, prices: [1100000, 2200000] },
      { months: 3, prices: [1551000, 3102000] },
      { months: 4, prices: [1950500, 3901000] },
      { months: 5, prices: [2300000, 4600000] },
      { months: 6, prices: [2598000, 5196000] },
      { months: 7, prices: [2849000, 5698000] },
    ],
    extension: 40000,
    from: { excl: 50000, incl: 55000 },
  },
  {
    id: "go2",
    name: "Unitree Go2",
    image: "/images/robot-rental/go2.png",
    grades: ["Air", "R&D"],
    daily: [
      { nights: 1, prices: [5000, 25000] },
      { nights: 2, prices: [25000, 40000] },
      { nights: 3, prices: [30000, 60000] },
      { nights: 4, prices: [40000, 80000] },
      { nights: 5, prices: [45000, 90000] },
      { nights: 6, prices: [50000, 100000] },
      { nights: 7, prices: [60000, 120000] },
    ],
    monthly: [
      { months: 1, prices: [null, 400000] },
      { months: 2, prices: [null, 650000] },
      { months: 3, prices: [null, 900000] },
      { months: 4, prices: [null, 1100000] },
      { months: 5, prices: [null, 1300000] },
      { months: 6, prices: [null, 1500000] },
      { months: 7, prices: [null, 1700000] },
    ],
    extension: 5000,
    from: { excl: 5000, incl: 5500 },
  },
];

const yen = (n: number) => `¥${n.toLocaleString("ja-JP")}`;

type ModelCopy = { type: string; desc: string; specs: { label: string; value: string }[]; note?: string; option?: string };

type Copy = {
  heroKicker: string;
  heroTitle: string;
  heroDesc: string;
  heroCta: string;
  heroCta2: string;
  applyCta: string;
  applyNote: string;
  lineupLabel: string;
  lineupTitle: string;
  lineupDesc: string;
  fromLabel: string;
  taxIncl: (v: string) => string;
  models: Record<Model["id"], ModelCopy>;
  pricingLabel: string;
  pricingTitle: string;
  pricingDesc: string;
  dailyHeading: string;
  monthlyHeading: string;
  periodCol: string;
  nightsLabel: (n: number) => string;
  monthsLabel: (n: number) => string;
  overLabel: string;
  askUs: string;
  notAvailable: string;
  extensionLabel: string;
  perDay: string;
  monthNote: string;
  taxNote: string;
  termsLabel: string;
  termsTitle: string;
  terms: { title: string; desc: string }[];
  useLabel: string;
  useTitle: string;
  useCases: { name: string; desc: string; image?: string }[];
  processLabel: string;
  processTitle: string;
  process: { num: string; title: string; en: string; desc: string }[];
  faqLabel: string;
  faqTitle: string;
  faq: { q: string; a: string }[];
  columnCta: string;
  ctaKicker: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaButton: string;
};

const COPY: Record<"ja" | "en", Copy> = {
  ja: {
    heroKicker: "Robot Rental",
    heroTitle: "ロボットレンタル",
    heroDesc: "Unitree の R1・G1・Go2 を 1泊2日から全国にお貸し出しし、購入前の検証・展示・実証をそのまま現場で試していただけます。",
    heroCta: "見積・空き状況を問い合わせる",
    heroCta2: "料金表を見る",
    applyCta: "本人確認・レンタル申込",
    applyNote: "免許証確認後、在庫・送料を確定してStripe決済",
    lineupLabel: "Lineup",
    lineupTitle: "取扱機体",
    lineupDesc: "現在お貸し出しできるのは Unitree の3機種です。用途に迷われる場合は、想定シーンを伺ったうえで機種選定からご相談いただけます。",
    fromLabel: "1泊2日",
    taxIncl: (v) => `税込 ${v}`,
    models: {
      r1: {
        type: "ヒューマノイド（2足歩行）",
        desc: "軽量な中型ヒューマノイド。展示・撮影・接客デモなど、人の目を引く必要がある現場で扱いやすい機体です。",
        specs: [
          { label: "サイズ", value: "1230 × 357 × 190 mm" },
          { label: "重量", value: "約29kg（バッテリー含む）" },
          { label: "全自由度", value: "26〜40" },
          { label: "アーム最大荷重", value: "約2kg" },
          { label: "駆動時間", value: "約1時間" },
          { label: "バッテリー", value: "9000mAh" },
        ],
        option: "オプション: 5本指ハンド BrainCo Revo2（価格はお問い合わせください）",
      },
      g1: {
        type: "ヒューマノイド（2足歩行）",
        desc: "深度カメラと3D LiDARを搭載した研究開発向けヒューマノイド。実証実験・アルゴリズム検証・展示まで幅広く使えます。",
        specs: [
          { label: "高さ", value: "1270 mm" },
          { label: "重量", value: "約35kg" },
          { label: "全自由度", value: "23" },
          { label: "膝関節最大トルク", value: "90 N·m" },
          { label: "駆動時間", value: "約2時間" },
          { label: "センサー", value: "深度カメラ + 3D LiDAR" },
        ],
        option: "オプション: 3本指ハンド Unitree Dex3-1（標準モデル／価格はお問い合わせください）",
      },
      go2: {
        type: "四足歩行ロボット",
        desc: "4D LiDAR L1を搭載した四足歩行型。巡回・点検・イベント演出に加え、R&Dグレードでは2次開発（自社ソフトの実装）も可能です。",
        specs: [
          { label: "サイズ", value: "700 × 310 × 400 mm" },
          { label: "重量", value: "約15kg" },
          { label: "センサー", value: "4D LiDAR L1" },
          { label: "可搬重量", value: "約7〜8kg" },
          { label: "走行速度", value: "0〜3.7 m/s（R&D）" },
          { label: "駆動時間", value: "約1〜2時間（R&Dは約2〜4時間）" },
        ],
        note: "AIR / PRO はソフトウェア開発不可。2次開発が可能なのは R&D のみです。",
      },
    },
    pricingLabel: "Pricing",
    pricingTitle: "レンタル料金",
    pricingDesc: "表示価格はすべて税別です。1泊2日から、月単位の長期プランまでご用意しています。",
    dailyHeading: "通常プラン（1泊2日〜）",
    monthlyHeading: "長期プラン（月単位）",
    periodCol: "期間",
    nightsLabel: (n) => `${n}泊${n + 1}日`,
    monthsLabel: (n) => `${n}ヶ月`,
    overLabel: "8泊9日以上",
    askUs: "お問い合わせ",
    notAvailable: "—",
    extensionLabel: "延長料金",
    perDay: "1日あたり",
    monthNote: "長期プランの1ヶ月＝30泊31日",
    taxNote: "表示価格は税別です（別途消費税）。送料は製品・お届け先ごとに異なるため別途お見積りいたします。",
    termsLabel: "Terms",
    termsTitle: "レンタル条件",
    terms: [
      { title: "最短1泊2日から", desc: "1泊2日からお貸し出しでき、そのまま月単位の長期プランへ延長いただくこともできます。" },
      { title: "全国配送対応", desc: "全国の現場までお届けします。送料は製品ごとに異なるため、お届け先とあわせて事前にお見積りいたします。" },
      { title: "安心補償付き・免責費用なし", desc: "全商品に補償が付いており、通常のご利用範囲で万一破損があった場合も免責費用はいただきません。" },
      { title: "キャンセルは無料", desc: "発送日の1営業日前までにご連絡いただければ、キャンセル料はかかりません。" },
      { title: "7ヶ月以上のご利用", desc: "整備点検の観点から、7ヶ月を超える長期レンタルは一度ご相談いただいたうえで条件を調整します。" },
      { title: "延長も当日対応", desc: "レンタル中の延長は1日単位で承ります（R1・G1は1日 ¥40,000、Go2は1日 ¥5,000／いずれも税別）。" },
    ],
    useLabel: "Use Cases",
    useTitle: "こんな場面で使われています",
    useCases: [
      { name: "購入前の実機検証", desc: "自社の通路幅・床面・段差で本当に動くかを、購入前に実測で確かめられます。", image: "/images/generated-trust/robot-stairs.webp" },
      { name: "展示会・イベント", desc: "ブースでの実機デモや撮影に。人の目を引く導線設計まで含めてご相談いただけます。", image: "/images/generated-trust/robot-event-display.webp" },
      { name: "巡回・点検のPoC", desc: "Go2で施設内の巡回ルートを試走し、実運用に耐えるかを短期間で検証します。", image: "/images/generated-trust/robot-plant-inspection.webp" },
      { name: "研究開発・アルゴリズム検証", desc: "R&Dグレードなら2次開発が可能。月単位の長期プランで開発期間に合わせて借りられます。", image: "/images/generated-trust/robot-research-lab.webp" },
      { name: "社内向けデモ・稟議資料", desc: "経営層や現場に実機を見せることで、導入判断の合意形成を一気に進められます。", image: "/images/generated-trust/robot-humanoid-demo.webp" },
      { name: "撮影・PR・採用広報", desc: "動画・写真撮影の被写体として。技術力の訴求に実機の説得力を使えます。", image: "/images/generated-trust/robot-humanoid-assist.webp" },
    ],
    processLabel: "Process",
    processTitle: "ご利用の流れ",
    process: [
      { num: "01", title: "お問い合わせ", en: "Inquiry", desc: "ご希望の機種・期間・利用シーンをお知らせください。機種が決まっていない段階でもご相談いただけます。" },
      { num: "02", title: "空き状況の確認・お見積り", en: "Quote", desc: "在庫と日程を確認し、レンタル料金と送料を含めたお見積りをご提示します。" },
      { num: "03", title: "ご契約・お支払い", en: "Contract", desc: "ご利用条件をご確認のうえご契約いただきます。キャンセルは発送日の1営業日前まで無料です。" },
      { num: "04", title: "配送・ご利用", en: "Delivery", desc: "指定の日時に現場までお届けします。操作方法は事前にご案内し、必要に応じて帯同運用も承ります。" },
      { num: "05", title: "ご返却・ご報告", en: "Return", desc: "期間終了後にご返却いただきます。検証結果を踏まえた導入設計のご相談もそのまま承ります。" },
    ],
    faqLabel: "FAQ",
    faqTitle: "よくあるご質問",
    faq: [
      { q: "最短どのくらいから借りられますか？", a: "1泊2日からお貸し出ししています。そのまま延長や月単位の長期プランへの切り替えも可能です。" },
      { q: "送料はいくらかかりますか？", a: "製品ごとに送料が異なるため、お届け先とあわせて事前にお見積りいたします。お問い合わせ時に設置場所をお知らせください。" },
      { q: "破損した場合の負担はありますか？", a: "全商品に安心補償が付いており、通常のご利用範囲であれば免責費用はいただきません。" },
      { q: "Go2で自社のソフトウェアを動かせますか？", a: "2次開発が可能なのは R&D グレードのみです。AIR・PRO はソフトウェア開発には対応していないため、開発用途では R&D をお選びください。" },
      { q: "操作できる人がいなくても大丈夫ですか？", a: "事前に操作方法をご案内します。展示会など確実性が求められる場面では、オペレーターの帯同もご相談いただけます。" },
      { q: "キャンセルはできますか？", a: "発送日の1営業日前までにご連絡いただければ、キャンセル料はかかりません。" },
      { q: "8泊以上・7ヶ月以上も借りられますか？", a: "いずれも対応可能です。8泊9日以上および7ヶ月を超えるご利用は、整備点検の都合もあり個別にお見積りいたします。" },
    ],
    columnCta: "ヒューマノイドの実証の進め方を読む →",
    ctaKicker: "Contact",
    ctaTitle: "どの機体を、いつ使いますか。",
    ctaDesc: "利用日と現場の状況をお知らせいただければ、空き状況と送料込みのお見積りをお返しします。機種選定からのご相談も歓迎です。",
    ctaButton: "レンタルの相談をする",
  },
  en: {
    heroKicker: "Robot Rental",
    heroTitle: "Robot Rental",
    heroDesc: "Rent the Unitree R1, G1, and Go2 from two days up, delivered anywhere in Japan — so you can test a robot on your own site before you buy one.",
    heroCta: "Request a quote",
    heroCta2: "See pricing",
    applyCta: "Verify identity and apply",
    applyNote: "Identity check first, then final pricing and Stripe payment",
    lineupLabel: "Lineup",
    lineupTitle: "Available models",
    lineupDesc: "We currently rent three Unitree models. If you aren't sure which fits, tell us the scenario and we'll help you choose.",
    fromLabel: "2 days / 1 night",
    taxIncl: (v) => `${v} incl. tax`,
    models: {
      r1: {
        type: "Humanoid (biped)",
        desc: "A lightweight mid-size humanoid — easy to handle for exhibitions, filming, and customer-facing demos where visibility matters.",
        specs: [
          { label: "Dimensions", value: "1230 × 357 × 190 mm" },
          { label: "Weight", value: "approx. 29 kg (with battery)" },
          { label: "Degrees of freedom", value: "26–40" },
          { label: "Arm payload", value: "approx. 2 kg" },
          { label: "Runtime", value: "approx. 1 hour" },
          { label: "Battery", value: "9000 mAh" },
        ],
        option: "Option: BrainCo Revo2 five-finger hand (price on request)",
      },
      g1: {
        type: "Humanoid (biped)",
        desc: "An R&D-oriented humanoid with a depth camera and 3D LiDAR, suited to field trials, algorithm work, and exhibitions alike.",
        specs: [
          { label: "Height", value: "1270 mm" },
          { label: "Weight", value: "approx. 35 kg" },
          { label: "Degrees of freedom", value: "23" },
          { label: "Knee peak torque", value: "90 N·m" },
          { label: "Runtime", value: "approx. 2 hours" },
          { label: "Sensors", value: "Depth camera + 3D LiDAR" },
        ],
        option: "Option: Unitree Dex3-1 three-finger hand (standard model, price on request)",
      },
      go2: {
        type: "Quadruped",
        desc: "A quadruped with 4D LiDAR L1 for patrol, inspection, and event work — and on the R&D grade, your own software on top.",
        specs: [
          { label: "Dimensions", value: "700 × 310 × 400 mm" },
          { label: "Weight", value: "approx. 15 kg" },
          { label: "Sensors", value: "4D LiDAR L1" },
          { label: "Payload", value: "approx. 7–8 kg" },
          { label: "Speed", value: "0–3.7 m/s (R&D)" },
          { label: "Runtime", value: "approx. 1–2 hours (2–4 hours on R&D)" },
        ],
        note: "AIR and PRO do not support software development. Only the R&D grade allows custom development.",
      },
    },
    pricingLabel: "Pricing",
    pricingTitle: "Rental rates",
    pricingDesc: "All prices exclude consumption tax. Rentals start at two days and extend to monthly long-term plans.",
    dailyHeading: "Standard plan (from 2 days)",
    monthlyHeading: "Long-term plan (monthly)",
    periodCol: "Period",
    nightsLabel: (n) => `${n + 1} days / ${n} night${n > 1 ? "s" : ""}`,
    monthsLabel: (n) => `${n} month${n > 1 ? "s" : ""}`,
    overLabel: "9 days or more",
    askUs: "On request",
    notAvailable: "—",
    extensionLabel: "Extension",
    perDay: "per extra day",
    monthNote: "One month on the long-term plan = 31 days / 30 nights.",
    taxNote: "Prices exclude consumption tax. Shipping varies by model and destination and is quoted separately.",
    termsLabel: "Terms",
    termsTitle: "Rental terms",
    terms: [
      { title: "From two days", desc: "Rentals start at two days and can roll straight into a monthly long-term plan." },
      { title: "Nationwide delivery", desc: "We deliver to sites across Japan. Shipping varies by model, so we quote it together with your destination." },
      { title: "Insured, no deductible", desc: "Every machine is insured, and normal use that results in damage carries no deductible for you." },
      { title: "Free cancellation", desc: "Cancel up to one business day before the shipping date at no charge." },
      { title: "Seven months and beyond", desc: "For rentals longer than seven months we agree terms individually, since the machine needs scheduled maintenance." },
      { title: "Extend day by day", desc: "Extensions are handled a day at a time — ¥40,000/day for the R1 and G1, ¥5,000/day for the Go2 (excl. tax)." },
    ],
    useLabel: "Use Cases",
    useTitle: "How customers use them",
    useCases: [
      { name: "Pre-purchase validation", desc: "Confirm the robot actually clears your corridors, floors, and steps before committing budget.", image: "/images/generated-trust/robot-stairs.webp" },
      { name: "Trade shows and events", desc: "Live demos and filming at your booth, including how to design the visitor flow around the robot.", image: "/images/generated-trust/robot-event-display.webp" },
      { name: "Patrol and inspection PoC", desc: "Run the Go2 along a real patrol route and see within days whether it holds up in production.", image: "/images/generated-trust/robot-plant-inspection.webp" },
      { name: "R&D and algorithm work", desc: "The R&D grade supports custom development, and monthly plans match your development schedule.", image: "/images/generated-trust/robot-research-lab.webp" },
      { name: "Internal demos and approvals", desc: "Putting a real machine in front of executives and staff moves an investment decision faster than any deck.", image: "/images/generated-trust/robot-humanoid-demo.webp" },
      { name: "Filming, PR, and recruiting", desc: "Use the machine as a subject for video and photography when you need to show technical credibility.", image: "/images/generated-trust/robot-humanoid-assist.webp" },
    ],
    processLabel: "Process",
    processTitle: "How it works",
    process: [
      { num: "01", title: "Inquiry", en: "Inquiry", desc: "Tell us the model, dates, and what you plan to do. It's fine if you haven't picked a model yet." },
      { num: "02", title: "Availability and quote", en: "Quote", desc: "We check stock and dates and send a quote covering rental and shipping." },
      { num: "03", title: "Contract and payment", en: "Contract", desc: "We confirm terms and finalize the booking. Cancellation is free until one business day before shipping." },
      { num: "04", title: "Delivery and use", en: "Delivery", desc: "We deliver to your site on the agreed date, brief you on operation beforehand, and can send an operator if needed." },
      { num: "05", title: "Return and debrief", en: "Return", desc: "Return the machine at the end of the term — and we're happy to take the results straight into a rollout plan." },
    ],
    faqLabel: "FAQ",
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "What's the shortest rental?", a: "Two days. You can extend from there or switch to a monthly long-term plan." },
      { q: "How much is shipping?", a: "It varies by model, so we quote it together with your delivery address — just tell us the site when you get in touch." },
      { q: "What happens if the robot is damaged?", a: "Every machine is insured, and there is no deductible for damage arising from normal use." },
      { q: "Can we run our own software on the Go2?", a: "Only the R&D grade supports custom development. AIR and PRO do not, so choose R&D for development work." },
      { q: "What if nobody here can operate it?", a: "We brief you on operation in advance, and for high-stakes settings like trade shows we can send an operator with the machine." },
      { q: "Can we cancel?", a: "Yes — free of charge up to one business day before the shipping date." },
      { q: "Can we rent for more than 8 days or 7 months?", a: "Both are possible. Rentals of 9 days or more and terms beyond seven months are quoted individually, partly for maintenance scheduling." },
    ],
    columnCta: "Read: how to run a humanoid field trial →",
    ctaKicker: "Contact",
    ctaTitle: "Which machine, and when?",
    ctaDesc: "Send us your dates and a little about the site, and we'll come back with availability and a quote including shipping. Happy to help you choose a model too.",
    ctaButton: "Discuss a rental",
  },
};

const RENTAL_APPLICATION_ENABLED = process.env.NEXT_PUBLIC_ROBOT_RENTAL_APPLICATION_ENABLED === "true";

function PriceTable({ model, t }: { model: Model; t: Copy }) {
  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      <div>
        <p className="text-sm font-bold text-gray-900 mb-3">{t.dailyHeading}</p>
        <div className="overflow-x-auto -mx-6 px-6 lg:mx-0 lg:px-0">
          <table className="w-full min-w-[420px] text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left font-semibold text-gray-900 py-2.5 pr-4">{t.periodCol}</th>
                {model.grades.map((g) => (
                  <th key={g} className="text-right font-semibold text-gray-900 py-2.5 pl-4 whitespace-nowrap">{g}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {model.daily.map((row) => (
                <tr key={row.nights} className="border-b border-gray-100">
                  <td className="py-2.5 pr-4 text-gray-600 whitespace-nowrap">{t.nightsLabel(row.nights)}</td>
                  {row.prices.map((p, i) => (
                    <td key={model.grades[i]} className="py-2.5 pl-4 text-right text-gray-900 font-medium tabular-nums whitespace-nowrap">
                      {p === null ? t.notAvailable : yen(p)}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-b border-gray-100">
                <td className="py-2.5 pr-4 text-gray-600 whitespace-nowrap">{t.overLabel}</td>
                {model.grades.map((g) => (
                  <td key={g} className="py-2.5 pl-4 text-right text-gray-500 whitespace-nowrap">{t.askUs}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <p className="text-sm font-bold text-gray-900 mb-3">{t.monthlyHeading}</p>
        <div className="overflow-x-auto -mx-6 px-6 lg:mx-0 lg:px-0">
          <table className="w-full min-w-[420px] text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left font-semibold text-gray-900 py-2.5 pr-4">{t.periodCol}</th>
                {model.grades.map((g) => (
                  <th key={g} className="text-right font-semibold text-gray-900 py-2.5 pl-4 whitespace-nowrap">{g}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {model.monthly.map((row) => (
                <tr key={row.months} className="border-b border-gray-100">
                  <td className="py-2.5 pr-4 text-gray-600 whitespace-nowrap">{t.monthsLabel(row.months)}</td>
                  {row.prices.map((p, i) => (
                    <td key={model.grades[i]} className="py-2.5 pl-4 text-right text-gray-900 font-medium tabular-nums whitespace-nowrap">
                      {p === null ? t.notAvailable : yen(p)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-3">{t.monthNote}</p>
      </div>

      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-lg bg-white border border-gray-200 px-4 py-3 lg:col-span-2 lg:max-w-md">
        <span className="text-xs font-semibold text-neutral-900">{t.extensionLabel}</span>
        <span className="text-sm text-gray-900 font-medium tabular-nums">{yen(model.extension)}</span>
        <span className="text-xs text-gray-500">{t.perDay}</span>
      </div>
    </div>
  );
}

export default function RobotRentalPage() {
  const { lang } = useLanguage();
  const t = COPY[lang];
  const [simModelId, setSimModelId] = useState<Model["id"]>("r1");
  const [simGradeIndex, setSimGradeIndex] = useState(0);
  const [simNights, setSimNights] = useState(1);
  const [simEngineerPlan, setSimEngineerPlan] = useState<"hourly" | "day">("day");
  const [simEngineerHours, setSimEngineerHours] = useState(1);
  const simModel = MODELS.find((model) => model.id === simModelId) ?? MODELS[0];
  const simRental = simModel.daily.find((row) => row.nights === simNights)?.prices[simGradeIndex] ?? 0;
  const simEngineer = simEngineerPlan === "day" ? 100000 : simEngineerHours * 10000;
  const simSubtotal = (simRental ?? 0) + simEngineer;

  return (
    <>
      {/* PAGE HEADER */}
      <section className="pt-24 pb-4 lg:pt-28 lg:pb-5 bg-white border-b border-gray-100">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <p className="text-sm font-semibold text-neutral-900 mb-3">{t.heroKicker}</p>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">{t.heroTitle}</h1>
        </div>
      </section>

      {/* LINEUP */}
      <section id="lineup" className="pt-6 pb-14 lg:pt-8 lg:pb-20 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.lineupLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-3">{t.lineupTitle}</h2>
            <p className="text-base text-gray-500 leading-relaxed mb-8">{t.lineupDesc}</p>
          </Reveal>
          <CardCarousel gridClass="md:grid-cols-2 lg:grid-cols-3">
            {MODELS.map((m, i) => {
              const c = t.models[m.id];
              return (
                <Reveal key={m.id} delay={i * 100} className="h-full">
                  <div className="bg-white rounded-lg border border-gray-200 h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
                    <div className="relative aspect-[4/3] bg-gray-50">
                      <Image src={m.image} alt={m.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-contain p-6" />
                    </div>
                    <div className="p-6 lg:p-8 flex flex-col flex-1">
                      <p className="text-xs font-semibold tracking-widest text-neutral-900 uppercase mb-1">{c.type}</p>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{m.name}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed mb-5">{c.desc}</p>

                      <div className="rounded-lg bg-gray-50 border border-gray-100 px-4 py-3 mb-5">
                        <p className="text-xs text-gray-500 mb-0.5">{t.fromLabel}</p>
                        <p className="text-2xl font-bold text-gray-900 tabular-nums">
                          {yen(m.from.excl)}
                          <span className="text-xs font-normal text-gray-500 ml-2">{t.taxIncl(yen(m.from.incl))}</span>
                        </p>
                      </div>

                      <dl className="space-y-1.5 mb-5">
                        {c.specs.map((s) => (
                          <div key={s.label} className="flex items-baseline justify-between gap-4 text-xs border-b border-gray-100 pb-1.5 last:border-0">
                            <dt className="text-gray-500 flex-shrink-0">{s.label}</dt>
                            <dd className="text-gray-900 text-right">{s.value}</dd>
                          </div>
                        ))}
                      </dl>

                      {c.note && <p className="text-xs text-gray-500 leading-relaxed mb-3">{c.note}</p>}
                      {c.option && <p className="text-xs text-gray-500 leading-relaxed mb-3">{c.option}</p>}

                      <div className="mt-auto border-t border-gray-100 pt-5">
                        {RENTAL_APPLICATION_ENABLED ? (
                          <>
                            <Link href={`/robot-rental/apply?model=${m.id}`} className="block rounded-md bg-cta px-4 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-cta-hover">
                              {t.applyCta}
                            </Link>
                            <p className="mt-2 text-center text-[11px] leading-5 text-gray-500">{t.applyNote}</p>
                            <a href={`#pricing-${m.id}`} className="mt-2 block text-center text-xs font-semibold text-neutral-900 underline-offset-4 hover:underline">
                              {t.heroCta2}
                            </a>
                          </>
                        ) : (
                          <a href={`#pricing-${m.id}`} className="block rounded-md border border-gray-200 px-4 py-3 text-center text-sm font-semibold text-gray-600 transition-colors hover:border-gray-400 hover:text-gray-900">
                            {t.heroCta2}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </CardCarousel>
        </div>
      </section>

      {/* PRICE SIMULATOR */}
      <section id="simulation" className="border-y border-gray-100 bg-white py-14 lg:py-20 scroll-mt-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <Reveal>
            <Label>{lang === "ja" ? "Price simulation" : "Price simulation"}</Label>
            <h2 className="text-3xl font-bold text-gray-900">{lang === "ja" ? "料金シミュレーション" : "Rental price simulator"}</h2>
            <p className="mt-3 text-sm leading-7 text-gray-500">{lang === "ja" ? "機体・期間・初日のエンジニア帯同時間を選ぶと、その場で概算を確認できます。初日のハードウェアエンジニア帯同は安全のため必須です。" : "Choose a robot, duration, and first-day engineer support. Hardware engineer attendance on day one is mandatory for safety."}</p>
          </Reveal>
          <div className="mt-8 grid gap-8 rounded-xl border border-gray-200 bg-gray-50 p-6 lg:grid-cols-[1fr_320px] lg:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-semibold text-gray-700">{lang === "ja" ? "機種" : "Robot"}
                <select value={simModelId} onChange={(event) => { setSimModelId(event.target.value as Model["id"]); setSimGradeIndex(0); }} className="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-3">
                  {MODELS.map((model) => <option key={model.id} value={model.id}>{model.name}</option>)}
                </select>
              </label>
              <label className="text-sm font-semibold text-gray-700">{lang === "ja" ? "グレード" : "Grade"}
                <select value={simGradeIndex} onChange={(event) => setSimGradeIndex(Number(event.target.value))} className="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-3">
                  {simModel.grades.map((grade, index) => <option key={grade} value={index}>{grade}</option>)}
                </select>
              </label>
              <label className="text-sm font-semibold text-gray-700">{lang === "ja" ? "利用期間" : "Duration"}
                <select value={simNights} onChange={(event) => setSimNights(Number(event.target.value))} className="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-3">
                  {[1,2,3,4,5,6,7].map((value) => <option key={value} value={value}>{value}{lang === "ja" ? `泊${value + 1}日` : ` night${value > 1 ? "s" : ""}`}</option>)}
                </select>
              </label>
              <label className="text-sm font-semibold text-gray-700">{lang === "ja" ? "初日エンジニア帯同（必須）" : "Day-one engineer (required)"}
                <select value={simEngineerPlan} onChange={(event) => setSimEngineerPlan(event.target.value as "hourly" | "day")} className="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-3">
                  <option value="day">{lang === "ja" ? "1日 100,000円" : "Full day ¥100,000"}</option>
                  <option value="hourly">{lang === "ja" ? "時間制 10,000円/時" : "Hourly ¥10,000/hour"}</option>
                </select>
              </label>
              {simEngineerPlan === "hourly" && <label className="text-sm font-semibold text-gray-700">{lang === "ja" ? "帯同時間" : "Support hours"}
                <select value={simEngineerHours} onChange={(event) => setSimEngineerHours(Number(event.target.value))} className="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-3">
                  {[1,2,3,4,5,6,7,8,9].map((hours) => <option key={hours} value={hours}>{hours}{lang === "ja" ? "時間" : ` hour${hours > 1 ? "s" : ""}`}</option>)}
                </select>
              </label>}
            </div>
            <aside className="rounded-lg bg-white p-6 shadow-sm">
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between"><dt className="text-gray-500">{lang === "ja" ? "レンタル料" : "Rental"}</dt><dd className="font-semibold">{yen(simRental ?? 0)}</dd></div>
                <div className="flex justify-between"><dt className="text-gray-500">{lang === "ja" ? "初日エンジニア" : "Day-one engineer"}</dt><dd className="font-semibold">{yen(simEngineer)}</dd></div>
                <div className="border-t border-gray-200 pt-4"><dt className="text-gray-500">{lang === "ja" ? "概算合計（税別）" : "Estimated total (excl. tax)"}</dt><dd className="mt-1 text-3xl font-bold text-gray-900">{yen(simSubtotal)}</dd><dd className="mt-1 text-xs text-gray-500">{lang === "ja" ? `税込 ${yen(Math.round(simSubtotal * 1.1))}・送料別` : `${yen(Math.round(simSubtotal * 1.1))} incl. tax, shipping excluded`}</dd></div>
              </dl>
              {RENTAL_APPLICATION_ENABLED && <Link href={`/robot-rental/apply?model=${simModel.id}`} className="mt-6 block rounded-md bg-cta px-4 py-3 text-center text-sm font-bold text-white hover:bg-cta-hover">{lang === "ja" ? "この内容で申込・決済へ" : "Apply and continue to payment"}</Link>}
            </aside>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-14 lg:py-20 bg-white scroll-mt-24">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.pricingLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-3">{t.pricingTitle}</h2>
            <p className="text-base text-gray-500 leading-relaxed mb-10">{t.pricingDesc}</p>
          </Reveal>

          <div className="space-y-12">
            {MODELS.map((m, i) => (
              <Reveal key={m.id} delay={i * 60}>
                <div id={`pricing-${m.id}`} className="rounded-lg border border-gray-200 bg-gray-50 p-6 lg:p-8 scroll-mt-24">
                  <div className="flex items-baseline gap-3 mb-6">
                    <h3 className="text-xl font-bold text-gray-900">{m.name}</h3>
                    <span className="text-xs text-gray-500">{t.models[m.id].type}</span>
                  </div>
                  <PriceTable model={m} t={t} />
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="text-xs text-gray-500 leading-relaxed mt-6">{t.taxNote}</p>
          </Reveal>
        </div>
      </section>

      {/* TERMS */}
      <section id="terms" className="py-14 lg:py-20 bg-gray-50 scroll-mt-24">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.termsLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-8">{t.termsTitle}</h2>
          </Reveal>
          <CardCarousel gridClass="md:grid-cols-2 lg:grid-cols-3">
            {t.terms.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 100} className="h-full">
                <div className="bg-white rounded-lg border border-gray-200 p-8 h-full transition-all duration-300 hover:shadow-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.useLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-8">{t.useTitle}</h2>
          </Reveal>
          <CardCarousel gridClass="md:grid-cols-2 lg:grid-cols-3">
            {t.useCases.map((item, i) => (
              <Reveal key={item.name} delay={(i % 3) * 100} className="h-full">
                <div className="rounded-lg border border-gray-200 bg-white overflow-hidden h-full hover:bg-neutral-50 hover:shadow-lg transition-all duration-300">
                  {item.image && (
                    <div className="relative aspect-[16/8] bg-neutral-100">
                      <Image src={item.image} alt={item.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                    </div>
                  )}
                  <div className="p-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.name}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
          <Reveal>
            <div className="mt-8">
              <Link href="/column/humanoid-robot-rental-poc" className="text-sm font-semibold text-neutral-900 hover:text-neutral-700 transition-colors">
                {t.columnCta}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-14 lg:py-20 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.processLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-8">{t.processTitle}</h2>
          </Reveal>
          {t.process.map((step, i) => (
            <Reveal key={step.num} delay={i * 100}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-10 border-b border-gray-200 last:border-0">
                <div className="lg:col-span-1"><span className="text-sm font-bold text-neutral-900">{step.num}</span></div>
                <div className="lg:col-span-3">
                  <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{step.en}</p>
                </div>
                <div className="lg:col-span-8"><p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.faqLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-8">{t.faqTitle}</h2>
          </Reveal>
          <div>
            {t.faq.map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <details className="border-b border-gray-100 py-2.5 md:py-5 group">
                  <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between gap-4">
                    <span>{item.q}</span>
                    <span className="text-gray-400 text-lg leading-none flex-shrink-0 transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <p className="text-gray-600 text-sm leading-relaxed mt-3">{item.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 lg:py-20 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8 text-center">
          <Reveal>
            <Label>{t.ctaKicker}</Label>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.ctaTitle}</h2>
            <p className="text-base text-gray-600 leading-relaxed mb-10">{t.ctaDesc}</p>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-neutral-900 text-white font-semibold px-10 py-4 hover:bg-neutral-800 transition-colors duration-300 inline-block">
              {t.ctaButton}
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

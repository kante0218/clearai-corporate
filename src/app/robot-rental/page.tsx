"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";

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

// 本番ライブ Stripe Payment Link（日額レンタル・数量＝日数）。
// 空文字の機体は「Coming Soon」表示のまま（予約ボタンを出さない）。
const PAY = {
  go2: "https://buy.stripe.com/9B66oA3xqfiE56y89md7q09",    // Unitree Go2  ¥10,000 / 日（税込）
  g1: "https://buy.stripe.com/fZu7sE2tmfiE7eGgFSd7q0a",     // Unitree G1   ¥100,000 / 日（税込）
  agibot: "https://buy.stripe.com/4gM3co3xq0nK8iK3T6d7q0b", // AGIBOT       ¥100,000 / 日（税込）
} as const;

type RobotItem = {
  name: string;
  type: string;
  desc: string;
  image?: string;
  price?: string;
  priceUnit?: string;
  buyUrl?: string;
  status?: "booking" | "candidate";
};

type RobotCompany = {
  company: string;
  summary: string;
  robots: RobotItem[];
};

type Copy = {
  heroKicker: string; comingSoon: string; inquiryBadge: string; heroTitle: string; heroDesc: string;
  heroCta: string; heroNote: string;
  lineupLabel: string; lineupTitle: string; lineupDesc: string;
  lineupAll: string;
  lineupGroups: RobotCompany[];
  lineupFootnote: string;
  reserveCta: string; availableBadge: string;
  planLabel: string; planTitle: string; planDesc: string;
  plans: { title: string; desc: string }[];
  useLabel: string; useTitle: string; useDesc: string;
  useCases: { name: string; desc: string }[];
  ctaLabel: string; ctaTitle: string; ctaDesc: string; ctaButton: string;
};

const COPY: Record<"ja" | "en", Copy> = {
  ja: {
    heroKicker: "Robot Rental",
    comingSoon: "Coming Soon",
    inquiryBadge: "導入相談受付中",
    heroTitle: "ロボットレンタル",
    heroDesc: "Unitree・Boston Dynamics・AGIBOT・JAKA・PUDU・Booster Robotics・EngineAI・UBTECH・Fourier・PAL Robotics・Engineered Arts など、海外の最先端ヒューマノイド／四足歩行ロボット／協働ロボット／サービスロボットを輸入し、レンタルで提供するサービスを準備中です。高額な機体を購入する前に、自社の現場で試せる選択肢を増やしていきます。",
    heroCta: "先行してご相談する",
    heroNote: "一部機体は予約受付を開始しました",
    lineupLabel: "Lineup",
    lineupTitle: "導入予定・導入候補のロボット",
    lineupDesc: "予約受付中の機体に加えて、産業・接客・展示・研究用途に合わせた候補機を順次追加していきます。",
    lineupAll: "すべて",
    lineupGroups: [
      {
        company: "Unitree",
        summary: "ヒューマノイドから四足歩行型まで、展示・研究・巡回・点検用途で扱いやすい候補群。",
        robots: [
          { name: "Unitree G1", type: "ヒューマノイド", desc: "コンパクトな人型ロボット。研究・実証・展示など幅広い用途を想定。", image: "/images/robot-rental/g1.png", price: "¥100,000", priceUnit: "/ 日（税込）", buyUrl: PAY.g1, status: "booking" },
          { name: "Unitree Go2", type: "四足歩行ロボット", desc: "機動性の高い四足歩行型。点検・巡回・イベント演出などに。", image: "/images/robot-rental/go2.png", price: "¥10,000", priceUnit: "/ 日（税込）", buyUrl: PAY.go2, status: "booking" },
          { name: "Unitree R1", type: "ヒューマノイド", desc: "鮮やかなカラーリングが特徴の中型ヒューマノイド。接客・展示・撮影など視認性が求められる現場に。", image: "/images/robot-rental/r1.png" },
          { name: "Unitree H1", type: "ヒューマノイド", desc: "高い運動性能を持つ大型人型ロボット。先進的なデモ・実証向け。", image: "/images/robot-rental/h1.png" },
          { name: "Unitree H2", type: "ヒューマノイド", desc: "より大型の次世代ヒューマノイド。研究開発・先進デモ・メディア露出を伴う実証向け。", image: "/images/robot-rental/h2.png" },
          { name: "Unitree B2", type: "産業用四足歩行ロボット", desc: "高い積載・走破性を重視した産業向け四足歩行型。巡回・点検・屋外実証に。", image: "/images/robot-rental/b2.png" },
          { name: "Unitree A2", type: "産業用四足歩行ロボット", desc: "長時間稼働と拡張性を重視した四足歩行型。物流・工場・災害対応PoCに。", image: "/images/robot-rental/a2.png" },
          { name: "Unitree As2", type: "小型産業用四足歩行ロボット", desc: "Go2より産業用途に寄せた小型機。持ち運びや短期デモをしやすい候補機。", image: "/images/robot-rental/as2.png" },
        ],
      },
      {
        company: "Boston Dynamics",
        summary: "商用導入実績のある四足歩行・物流ロボットと、次世代産業ヒューマノイドを候補化。",
        robots: [
          { name: "Spot", type: "四足歩行ロボット", desc: "施設巡回・点検・遠隔監視に強い商用四足歩行型。産業現場の自動巡回PoC向け。", image: "/images/robot-rental/spot.png" },
          { name: "Spot Arm", type: "モバイルマニピュレーション", desc: "Spot にアームを組み合わせた構成。扉・バルブ・軽作業など操作系デモの候補。", image: "/images/robot-rental/spot-arm.png" },
          { name: "Stretch", type: "物流ロボット", desc: "倉庫でのケース荷役・トラック荷下ろし向け。物流自動化の実証候補。", image: "/images/robot-rental/stretch.png" },
          { name: "Atlas", type: "産業用ヒューマノイド", desc: "製造・マテリアルハンドリング領域を見据えた次世代ヒューマノイド候補。", image: "/images/robot-rental/atlas.png" },
        ],
      },
      {
        company: "AgiBot",
        summary: "フルサイズヒューマノイド、車輪型作業ロボット、四足歩行型、清掃ロボットまで幅広く候補化。",
        robots: [
          { name: "AgiBot A2", type: "フルサイズヒューマノイド", desc: "商用実証・接客・展示・作業デモ向けのフルサイズ人型ロボット候補。", image: "/images/robot-rental/agibot-a2.png", price: "¥100,000", priceUnit: "/ 日（税込）", buyUrl: PAY.agibot, status: "booking" },
          { name: "AgiBot A2-W", type: "車輪型ヒューマノイド", desc: "移動安定性と上半身作業を組み合わせた車輪型。施設案内・軽作業実証の候補。", image: "/images/robot-rental/agibot-a2w.png" },
          { name: "AgiBot A2 Lite", type: "ヒューマノイド", desc: "パフォーマンス・展示・商業施設での演出用途を想定した候補機。", image: "/images/robot-rental/agibot-a2-lite.png" },
          { name: "AgiBot X1", type: "オープンソースロボット", desc: "研究開発・教育・ソフトウェア検証に使いやすいフルスタック開発向け候補。", image: "/images/robot-rental/agibot-x1.png" },
          { name: "AgiBot X2", type: "ヒューマノイド", desc: "俊敏性と知能化を重視したヒューマノイド。先進デモ・研究用途の候補。", image: "/images/robot-rental/agibot-x2.png" },
          { name: "AgiBot G1", type: "汎用 embodied AI ロボット", desc: "Genie 系の汎用ロボット。施設内作業・接客・研究実証の候補。", image: "/images/robot-rental/agibot-g1.png" },
          { name: "AgiBot G2", type: "汎用 embodied AI ロボット", desc: "産業グレードの embodied AI ロボット。作業自動化PoCの候補。", image: "/images/robot-rental/agibot-g2.png" },
          { name: "AgiBot D1", type: "四足歩行ロボット", desc: "D1 Pro / Edu / Ultra / Max 系を含む四足歩行型。巡回・教育・産業点検の候補。", image: "/images/robot-rental/agibot-d1.png" },
          { name: "AgiBot C5", type: "清掃ロボット", desc: "商業施設・オフィス・店舗での清掃自動化実証に向いた候補機。", image: "/images/robot-rental/agibot-c5.png" },
        ],
      },
      {
        company: "JAKA",
        summary: "中小製造業の実証に使いやすい協働ロボット。組立・検査・梱包・研磨・ねじ締めなどに対応。",
        robots: [
          { name: "JAKA Zu Series", type: "協働ロボットアーム", desc: "3kgから30kg級まで展開する汎用協働ロボット。搬送・組立・検査・梱包PoCに。", image: "/images/robot-rental/jaka-zu.png" },
          { name: "JAKA S Series", type: "力制御協働ロボット", desc: "高精度な力覚制御を重視したシリーズ。研磨・嵌合・繊細な組立の候補。", image: "/images/robot-rental/jaka-s.png" },
          { name: "JAKA Pro Series", type: "高耐環境協働ロボット", desc: "油・粉じん・水に強いIP68系。金属加工・食品・屋外に近い現場の実証向け。", image: "/images/robot-rental/jaka-pro.png" },
          { name: "JAKA Mini Series", type: "小型協働ロボット", desc: "小型・低コストの導入候補。教育・省スペース工程・店舗デモに。", image: "/images/robot-rental/jaka-mini.png" },
          { name: "JAKA Lens 2D", type: "ビジョンシステム", desc: "JAKA ロボットと組み合わせる2Dビジョン。検査・位置決め・ピッキング実証向け。", image: "/images/robot-rental/jaka-lens2d.png" },
        ],
      },
      {
        company: "PUDU",
        summary: "サービスロボットと半ヒューマノイド領域の候補。施設・店舗・工場内の移動作業を想定。",
        robots: [
          { name: "PUDU D7", type: "半ヒューマノイド", desc: "産業・サービス現場向けの半ヒューマノイド。搬送・案内・施設内作業の候補。", image: "/images/robot-rental/pudu-d7.png" },
        ],
      },
      {
        company: "Booster Robotics",
        summary: "研究開発・教育・RoboCup・デベロッパー向けに扱いやすい小型ヒューマノイド候補。",
        robots: [
          { name: "Booster T1", type: "ヒューマノイド", desc: "開発者向けの高耐久ヒューマノイド。研究・教育・ロボット競技・デモ用途の候補。", image: "/images/robot-rental/booster-t1.png" },
          { name: "Booster K1", type: "小型ヒューマノイド", desc: "導入しやすい価格帯の embodied AI 開発プラットフォーム。学校・研究室・企業研修向け。", image: "/images/robot-rental/booster-k1.png" },
        ],
      },
      {
        company: "EngineAI",
        summary: "PM01からフルサイズ機まで展開する中国発ヒューマノイドメーカー。展示・研究・先進デモ向け。",
        robots: [
          { name: "EngineAI PM01", type: "小型ヒューマノイド", desc: "軽量・高動作性能・オープン性を重視した開発向けヒューマノイド候補。", image: "/images/robot-rental/engineai-pm01.png" },
          { name: "EngineAI SA01", type: "二足歩行ロボット", desc: "拡張性を重視した二足歩行プラットフォーム。研究・教育・歩行制御デモ向け。", image: "/images/robot-rental/engineai-sa01.png" },
          { name: "EngineAI SE01", type: "フルサイズヒューマノイド", desc: "自然な歩行表現を訴求するフルサイズ機。メディア向けデモ・先進PoC候補。", image: "/images/robot-rental/engineai-se01.png" },
          { name: "EngineAI T800", type: "フルサイズヒューマノイド", desc: "高出力・大型の汎用ヒューマノイド候補。産業実証・展示会での訴求向け。", image: "/images/robot-rental/engineai-t800.png" },
          { name: "EngineAI S2", type: "サービスロボット", desc: "接客・案内・施設内サービスを想定したIPサービスロボット候補。", image: "/images/robot-rental/engineai-s2.png" },
          { name: "EngineAI JS01", type: "重載四足ロボット", desc: "産業点検・屋外実証・高負荷移動に向いた四足歩行型候補。", image: "/images/robot-rental/engineai-js01.png" },
        ],
      },
      {
        company: "UBTECH",
        summary: "産業用ヒューマノイド、商用サービスロボット、教育ロボットを展開する大手候補。",
        robots: [
          { name: "Walker S2", type: "産業用ヒューマノイド", desc: "製造・物流領域を想定した次世代ヒューマノイド。工場PoC・先進展示向け。" },
          { name: "Walker S1", type: "産業用ヒューマノイド", desc: "スマート製造・物流用途のヒューマノイド候補。法人向け実証の相談対象。" },
          { name: "Walker C", type: "商用ヒューマノイド", desc: "展示ホール・受付・案内など商用接客シーンを想定した候補機。" },
          { name: "Walker X", type: "商用ヒューマノイド", desc: "対話・案内・デモンストレーション向けの商用ヒューマノイド候補。" },
          { name: "Cruzr S2", type: "車輪型サービスロボット", desc: "受付・案内・施設内コミュニケーション用途に使いやすい車輪型ロボット。" },
          { name: "Panda Robot", type: "教育・展示ロボット", desc: "教育・観光・展示で親しみやすさを出しやすいキャラクター型候補。" },
        ],
      },
      {
        company: "Fourier",
        summary: "リハビリロボットの実績を背景に、GRシリーズのヒューマノイドを展開する研究・法人向け候補。",
        robots: [
          { name: "Fourier GR-1", type: "フルサイズヒューマノイド", desc: "研究機関・AI企業向けに展開される汎用ヒューマノイド候補。" },
          { name: "Fourier GR-2", type: "フルサイズヒューマノイド", desc: "GR-1の後継世代。高自由度・交換式バッテリーなどを想定した先進PoC向け。" },
          { name: "Fourier GR-3", type: "ヒューマノイド", desc: "施設展示・研究・接客演出での活用を想定する次世代シリーズ候補。" },
        ],
      },
      {
        company: "PAL Robotics",
        summary: "研究・物流・接客・小売向けに豊富なロボットを持つ欧州ロボティクスメーカー候補。",
        robots: [
          { name: "TALOS", type: "研究用ヒューマノイド", desc: "高度な二足歩行・全身制御研究向けのヒューマノイド候補。" },
          { name: "KANGAROO", type: "動的二足歩行ロボット", desc: "俊敏な二足歩行研究・デモ向けのレッグドロボット候補。" },
          { name: "ARI", type: "接客・対話ロボット", desc: "サービスロボティクスとAI対話を組み合わせた受付・案内候補。" },
          { name: "TIAGo", type: "モバイルマニピュレーター", desc: "移動台車とアームを組み合わせた研究・軽作業PoC向けロボット。" },
          { name: "TIAGo Pro", type: "次世代モバイルマニピュレーター", desc: "研究・物流・小売向けの高機能モバイルマニピュレーター候補。" },
          { name: "StockBot", type: "RFID棚卸ロボット", desc: "小売・倉庫の棚卸し、在庫管理、データ収集PoC向け。" },
        ],
      },
      {
        company: "Engineered Arts",
        summary: "表情・対話・存在感に強いソーシャルヒューマノイド。展示会・受付・PR演出向け。",
        robots: [
          { name: "Ameca", type: "対話型ヒューマノイド", desc: "表情表現と対話体験に強い上半身型ヒューマノイド。展示・受付・PR向け。" },
          { name: "Ami", type: "ソーシャルロボット", desc: "人との自然な対話・案内・エンタメ演出を想定した候補機。" },
          { name: "RoboThespian", type: "エンタメロボット", desc: "イベント・劇場・展示施設でのプレゼンテーション演出向け候補。" },
        ],
      },
      {
        company: "Keenon Robotics",
        summary: "配膳・ホテル・清掃・重量搬送・半ヒューマノイドまで展開する実用サービスロボット候補。",
        robots: [
          { name: "XMAN-R1", type: "ヒューマノイドサービスロボット", desc: "サービス業向けの二足歩行ヒューマノイド候補。案内・施設内業務の先進デモに。" },
          { name: "XMAN-F1", type: "ヒューマノイドサービスロボット", desc: "施設・店舗・イベントでのサービス業務を想定した候補機。" },
          { name: "DINERBOT T10", type: "配膳・広告ロボット", desc: "飲食店・商業施設での配膳、下げ膳、広告表示に使いやすい候補。" },
          { name: "BUTLERBOT W3", type: "ホテル配送ロボット", desc: "ホテル・病院・複合施設での個室配送やフロア間サービス向け。" },
          { name: "KLEENBOT C40", type: "清掃ロボット", desc: "中小規模施設向けの床清掃ロボット。清掃自動化PoCに。" },
          { name: "S300", type: "重量搬送ロボット", desc: "工場・倉庫内の重荷重搬送を想定したAMR候補。" },
        ],
      },
      {
        company: "Bear Robotics",
        summary: "飲食・ホテル・病院・倉庫向けの自律移動ロボット。実需に直結しやすいレンタル候補。",
        robots: [
          { name: "Servi", type: "配膳ロボット", desc: "飲食店・ホテル・イベント会場での配膳補助に使いやすい定番候補。" },
          { name: "Servi Plus", type: "大容量配膳ロボット", desc: "多皿・大容量の配膳に向いたモデル。飲食店の省人化PoC向け。" },
          { name: "Servi Q", type: "小型AMR", desc: "狭い通路や小規模店舗で使いやすいコンパクトなサービスロボット候補。" },
          { name: "Carti 100", type: "倉庫搬送ロボット", desc: "100kg級搬送を想定した倉庫・工場向けAMR候補。" },
          { name: "Servi Clean", type: "清掃ロボット", desc: "施設・店舗・病院向けの清掃自動化候補。" },
        ],
      },
      {
        company: "ROBOTIS",
        summary: "教育・研究・開発者向けの小型ヒューマノイド／ROS系ロボットを展開する候補。",
        robots: [
          { name: "ROBOTIS OP3", type: "小型ヒューマノイド", desc: "研究・教育・RoboCup向けのオープンプラットフォーム型ヒューマノイド候補。" },
          { name: "BIOLOID", type: "教育ロボットキット", desc: "組み立て・制御・プログラミング教育に使いやすいロボットキット候補。" },
          { name: "TurtleBot3", type: "ROS教育ロボット", desc: "ROS 2・SLAM・自律移動の教育・研修に使いやすい小型移動ロボット。" },
        ],
      },
      {
        company: "Furhat Robotics",
        summary: "対話・受付・教育・研究用途に使いやすいソーシャルロボット候補。",
        robots: [
          { name: "Furhat", type: "対話型ソーシャルロボット", desc: "顔表情・視線・音声対話を組み合わせた受付・研究・教育向け候補。" },
          { name: "Misty II", type: "プログラマブルロボット", desc: "教育・研究・受付アシスタント用途に使いやすい小型ソーシャルロボット。" },
          { name: "Tengai", type: "面接・対話ロボット", desc: "採用面接・接客ヒアリング・対話実験などのユースケース候補。" },
        ],
      },
      {
        company: "AiMoga",
        summary: "自動車メーカー系のヒューマノイド／ロボット犬。高インパクトな展示・PR候補。",
        robots: [
          { name: "Morine M1", type: "フルサイズヒューマノイド", desc: "店舗・展示・案内・PR向けの高存在感ヒューマノイド候補。輸入・保守条件の確認前提。" },
          { name: "AiMoga Robot Dog", type: "四足歩行ロボット", desc: "イベント・展示・巡回デモ向けの四足歩行型候補。" },
        ],
      },
    ],
    lineupFootnote: "※ 機種名は導入予定・導入候補の一例です。最終的なラインナップ・仕様・提供可否は変更となる場合があります。料金は税込・1日あたり。決済画面で日数（数量）を選択できます。",
    reserveCta: "予約する",
    availableBadge: "予約受付中",
    planLabel: "Plan",
    planTitle: "提供予定の内容",
    planDesc: "「買う前に試す」を軸に、現場で価値を確かめられる形で提供予定です。",
    plans: [
      { title: "短期レンタル", desc: "日・週・月単位での貸し出しを予定。目的と期間に合わせて柔軟に。" },
      { title: "導入前トライアル", desc: "購入を検討中の機体を、実際の現場で試せるトライアル提供を予定。" },
      { title: "イベント・展示活用", desc: "展示会・店頭・撮影など、集客・PR用途での活用を予定。" },
      { title: "運用サポート", desc: "搬入・セットアップ・操作レクチャー・AI連携まで伴走予定。" },
    ],
    useLabel: "Use Cases",
    useTitle: "想定する活用シーン",
    useDesc: "公開に向けて、以下のような現場での活用を想定しています。",
    useCases: [
      { name: "展示会・イベント", desc: "ブースの集客装置・撮影スポットとして話題性を生む。" },
      { name: "店舗・施設", desc: "受付・案内・呼び込みなど接客シーンでの実証。" },
      { name: "工場・物流", desc: "搬送・点検補助などの省人化ユースケースの検証。" },
      { name: "研究・教育", desc: "ロボティクス研究・AI連携実験・教育デモ用途。" },
    ],
    ctaLabel: "Contact",
    ctaTitle: "先行のご相談を承っています。",
    ctaDesc: "「こういう用途で使いたい」「提供開始時期を知りたい」など、ローンチ前の段階からお気軽にご相談ください。準備が整い次第、優先的にご案内します。",
    ctaButton: "先行して相談する",
  },
  en: {
    heroKicker: "Robot Rental",
    comingSoon: "Coming Soon",
    inquiryBadge: "Inquiry open",
    heroTitle: "Robot Rental",
    heroDesc: "We're preparing a service to import and rent cutting-edge humanoids, quadrupeds, collaborative robots, and service robots from overseas, including Unitree, Boston Dynamics, AGIBOT, JAKA, PUDU, Booster Robotics, EngineAI, UBTECH, Fourier, PAL Robotics, and Engineered Arts. The lineup will keep expanding so teams can try advanced robots on-site before committing to an expensive purchase.",
    heroCta: "Get an early consultation",
    heroNote: "Booking is now open for select units",
    lineupLabel: "Lineup",
    lineupTitle: "Planned and candidate robots",
    lineupDesc: "In addition to units already open for booking, we will keep adding candidates for industrial, hospitality, exhibition, and research use cases.",
    lineupAll: "All",
    lineupGroups: [
      {
        company: "Unitree",
        summary: "A practical candidate range across humanoids and quadrupeds for exhibitions, R&D, patrol, and inspection.",
        robots: [
          { name: "Unitree G1", type: "Humanoid", desc: "A compact humanoid robot, intended for research, PoC, and exhibitions.", image: "/images/robot-rental/g1.png", price: "JPY 100,000", priceUnit: "/ day (tax incl.)", buyUrl: PAY.g1, status: "booking" },
          { name: "Unitree Go2", type: "Quadruped", desc: "A highly agile quadruped for inspection, patrol, and event production.", image: "/images/robot-rental/go2.png", price: "JPY 10,000", priceUnit: "/ day (tax incl.)", buyUrl: PAY.go2, status: "booking" },
          { name: "Unitree R1", type: "Humanoid", desc: "A mid-size humanoid with a striking color scheme, ideal where visual presence matters.", image: "/images/robot-rental/r1.png" },
          { name: "Unitree H1", type: "Humanoid", desc: "A larger humanoid with high mobility for advanced demos and proof-of-concept work.", image: "/images/robot-rental/h1.png" },
          { name: "Unitree H2", type: "Humanoid", desc: "A next-generation larger humanoid candidate for R&D, advanced demos, and media-facing PoC work.", image: "/images/robot-rental/h2.png" },
          { name: "Unitree B2", type: "Industrial quadruped", desc: "An industrial quadruped candidate focused on payload, terrain handling, patrol, and inspection use cases.", image: "/images/robot-rental/b2.png" },
          { name: "Unitree A2", type: "Industrial quadruped", desc: "A long-runtime, extensible quadruped candidate for logistics, factory, and emergency-response PoCs.", image: "/images/robot-rental/a2.png" },
          { name: "Unitree As2", type: "Compact industrial quadruped", desc: "A compact industrial candidate positioned above Go2 for portable demonstrations and field trials.", image: "/images/robot-rental/as2.png" },
        ],
      },
      {
        company: "Boston Dynamics",
        summary: "Commercially proven mobile robots plus the next generation of industrial humanoid candidates.",
        robots: [
          { name: "Spot", type: "Quadruped", desc: "A commercial quadruped for facility patrol, inspection, and remote monitoring PoCs.", image: "/images/robot-rental/spot.png" },
          { name: "Spot Arm", type: "Mobile manipulation", desc: "A Spot configuration with an integrated arm for doors, valves, and light manipulation demos.", image: "/images/robot-rental/spot-arm.png" },
          { name: "Stretch", type: "Warehouse robot", desc: "A logistics robot for case handling and trailer unloading in warehouse automation trials.", image: "/images/robot-rental/stretch.png" },
          { name: "Atlas", type: "Industrial humanoid", desc: "A next-generation humanoid candidate for manufacturing and material handling workflows.", image: "/images/robot-rental/atlas.png" },
        ],
      },
      {
        company: "AgiBot",
        summary: "A broad embodied AI portfolio spanning full-size humanoids, wheeled work robots, quadrupeds, and cleaning robots.",
        robots: [
          { name: "AgiBot A2", type: "Full-size humanoid", desc: "A full-size humanoid candidate for commercial PoCs, hospitality, exhibitions, and task demos.", image: "/images/robot-rental/agibot-a2.png", price: "JPY 100,000", priceUnit: "/ day (tax incl.)", buyUrl: PAY.agibot, status: "booking" },
          { name: "AgiBot A2-W", type: "Wheeled humanoid", desc: "A wheeled humanoid candidate combining stable mobility with upper-body task execution.", image: "/images/robot-rental/agibot-a2w.png" },
          { name: "AgiBot A2 Lite", type: "Humanoid", desc: "A candidate for performances, exhibitions, and commercial presentation settings.", image: "/images/robot-rental/agibot-a2-lite.png" },
          { name: "AgiBot X1", type: "Open-source robot", desc: "A full-stack development candidate for R&D, education, and software validation.", image: "/images/robot-rental/agibot-x1.png" },
          { name: "AgiBot X2", type: "Humanoid", desc: "An agile humanoid candidate for advanced demonstrations and research use.", image: "/images/robot-rental/agibot-x2.png" },
          { name: "AgiBot G1", type: "General embodied AI robot", desc: "A Genie-series general robot candidate for indoor tasks, hospitality, and research PoCs.", image: "/images/robot-rental/agibot-g1.png" },
          { name: "AgiBot G2", type: "General embodied AI robot", desc: "An industrial-grade embodied AI robot candidate for task automation PoCs.", image: "/images/robot-rental/agibot-g2.png" },
          { name: "AgiBot D1", type: "Quadruped", desc: "A quadruped family candidate for patrol, education, and industrial inspection trials.", image: "/images/robot-rental/agibot-d1.png" },
          { name: "AgiBot C5", type: "Cleaning robot", desc: "A candidate for cleaning automation in commercial facilities, offices, and stores.", image: "/images/robot-rental/agibot-c5.png" },
        ],
      },
      {
        company: "JAKA",
        summary: "Collaborative robots suited to SME manufacturing trials, including assembly, inspection, packing, polishing, and screwdriving.",
        robots: [
          { name: "JAKA Zu Series", type: "Collaborative robot arm", desc: "A general cobot range from 3kg to 30kg classes for handling, assembly, inspection, and packing PoCs.", image: "/images/robot-rental/jaka-zu.png" },
          { name: "JAKA S Series", type: "Force-control cobot", desc: "A force-control series candidate for polishing, fitting, and delicate assembly tasks.", image: "/images/robot-rental/jaka-s.png" },
          { name: "JAKA Pro Series", type: "Rugged cobot", desc: "An IP68-oriented rugged series for demanding sites such as metalworking, food, and harsher environments.", image: "/images/robot-rental/jaka-pro.png" },
          { name: "JAKA Mini Series", type: "Compact cobot", desc: "A compact and affordable candidate for education, space-constrained production, and store demos.", image: "/images/robot-rental/jaka-mini.png" },
          { name: "JAKA Lens 2D", type: "Vision system", desc: "A 2D vision option for inspection, positioning, and picking PoCs with JAKA robots.", image: "/images/robot-rental/jaka-lens2d.png" },
        ],
      },
      {
        company: "PUDU",
        summary: "Service robots and semi-humanoid candidates for facilities, stores, and indoor industrial workflows.",
        robots: [
          { name: "PUDU D7", type: "Semi-humanoid", desc: "A semi-humanoid candidate for industrial and service environments, including indoor operations and guidance.", image: "/images/robot-rental/pudu-d7.png" },
        ],
      },
      {
        company: "Booster Robotics",
        summary: "Compact humanoid candidates suited to R&D, education, RoboCup, and developer demonstrations.",
        robots: [
          { name: "Booster T1", type: "Humanoid", desc: "A durable developer-oriented humanoid candidate for research, education, robot competitions, and demos.", image: "/images/robot-rental/booster-t1.png" },
          { name: "Booster K1", type: "Compact humanoid", desc: "An accessible embodied AI development platform for schools, labs, and corporate training.", image: "/images/robot-rental/booster-k1.png" },
        ],
      },
      {
        company: "EngineAI",
        summary: "A China-based humanoid maker spanning PM01 and full-size platforms for exhibitions, R&D, and advanced demonstrations.",
        robots: [
          { name: "EngineAI PM01", type: "Compact humanoid", desc: "A lightweight, dynamic, and open humanoid candidate for developer and research use.", image: "/images/robot-rental/engineai-pm01.png" },
          { name: "EngineAI SA01", type: "Biped robot", desc: "An extensible biped platform candidate for research, education, and locomotion demonstrations.", image: "/images/robot-rental/engineai-sa01.png" },
          { name: "EngineAI SE01", type: "Full-size humanoid", desc: "A full-size candidate emphasizing human-like gait for media-facing demos and advanced PoCs.", image: "/images/robot-rental/engineai-se01.png" },
          { name: "EngineAI T800", type: "Full-size humanoid", desc: "A larger high-output humanoid candidate for industrial trials and high-impact exhibitions.", image: "/images/robot-rental/engineai-t800.png" },
          { name: "EngineAI S2", type: "Service robot", desc: "An IP service robot candidate for hospitality, guidance, and indoor facility workflows.", image: "/images/robot-rental/engineai-s2.png" },
          { name: "EngineAI JS01", type: "Heavy-load quadruped", desc: "A quadruped candidate for industrial inspection, outdoor trials, and heavier mobility needs.", image: "/images/robot-rental/engineai-js01.png" },
        ],
      },
      {
        company: "UBTECH",
        summary: "A major robotics company with industrial humanoids, commercial service robots, and AI education platforms.",
        robots: [
          { name: "Walker S2", type: "Industrial humanoid", desc: "A next-generation humanoid candidate for manufacturing, logistics, factory PoCs, and advanced showcases." },
          { name: "Walker S1", type: "Industrial humanoid", desc: "A humanoid candidate for smart manufacturing and logistics trials." },
          { name: "Walker C", type: "Commercial humanoid", desc: "A candidate for exhibition halls, reception, guidance, and commercial hospitality." },
          { name: "Walker X", type: "Commercial humanoid", desc: "A commercial humanoid candidate for conversation, guidance, and demonstrations." },
          { name: "Cruzr S2", type: "Wheeled service robot", desc: "A wheeled robot suited to reception, guidance, and facility communication." },
          { name: "Panda Robot", type: "Education and exhibition robot", desc: "A character robot candidate for education, tourism, and friendly exhibition experiences." },
        ],
      },
      {
        company: "Fourier",
        summary: "A research and enterprise humanoid candidate maker building on rehabilitation robotics expertise.",
        robots: [
          { name: "Fourier GR-1", type: "Full-size humanoid", desc: "A general humanoid candidate deployed toward research institutions and AI companies." },
          { name: "Fourier GR-2", type: "Full-size humanoid", desc: "A newer generation candidate with higher degrees of freedom and enterprise PoC potential." },
          { name: "Fourier GR-3", type: "Humanoid", desc: "A next-generation series candidate for facility exhibitions, R&D, and hospitality presentation." },
        ],
      },
      {
        company: "PAL Robotics",
        summary: "A European robotics maker with platforms for research, logistics, retail, interaction, and mobile manipulation.",
        robots: [
          { name: "TALOS", type: "Research humanoid", desc: "An advanced humanoid platform candidate for bipedal locomotion and whole-body control research." },
          { name: "KANGAROO", type: "Dynamic biped", desc: "A legged robot candidate for agile biped research and demonstrations." },
          { name: "ARI", type: "Assistive interaction robot", desc: "A service robotics and AI interaction platform for reception and guidance." },
          { name: "TIAGo", type: "Mobile manipulator", desc: "A mobile base plus arm platform for research and light manipulation PoCs." },
          { name: "TIAGo Pro", type: "Next-generation mobile manipulator", desc: "A higher-capability mobile manipulator candidate for research, logistics, and retail trials." },
          { name: "StockBot", type: "RFID inventory robot", desc: "An autonomous RFID stock-taking robot candidate for retail, warehouse, and data collection trials." },
        ],
      },
      {
        company: "Engineered Arts",
        summary: "Social humanoids with strong facial expression, presence, and conversation value for exhibitions, reception, and PR.",
        robots: [
          { name: "Ameca", type: "Conversational humanoid", desc: "A highly expressive upper-body humanoid candidate for exhibitions, reception, and PR experiences." },
          { name: "Ami", type: "Social robot", desc: "A candidate for natural interaction, guidance, and entertainment experiences." },
          { name: "RoboThespian", type: "Entertainment robot", desc: "A presentation and performance robot candidate for events, museums, and venues." },
        ],
      },
      {
        company: "Keenon Robotics",
        summary: "Practical service robots across catering, hotel delivery, cleaning, heavy-load transport, and humanoid service concepts.",
        robots: [
          { name: "XMAN-R1", type: "Humanoid service robot", desc: "A service-industry humanoid candidate for guidance, indoor operations, and advanced demonstrations." },
          { name: "XMAN-F1", type: "Humanoid service robot", desc: "A candidate for service workflows in facilities, stores, and events." },
          { name: "DINERBOT T10", type: "Delivery and marketing robot", desc: "A candidate for catering, clearing, and advertising in restaurants and commercial facilities." },
          { name: "BUTLERBOT W3", type: "Hotel delivery robot", desc: "A robot candidate for room delivery and cross-floor service in hotels, hospitals, and facilities." },
          { name: "KLEENBOT C40", type: "Cleaning robot", desc: "A floor-cleaning candidate for small and medium facilities." },
          { name: "S300", type: "Heavy-load AMR", desc: "A heavy-load transport AMR candidate for factories and warehouses." },
        ],
      },
      {
        company: "Bear Robotics",
        summary: "Autonomous mobile robots for restaurants, hotels, hospitals, and warehouses where rental demand is easier to validate.",
        robots: [
          { name: "Servi", type: "Serving robot", desc: "A practical serving assistant candidate for restaurants, hotels, and event venues." },
          { name: "Servi Plus", type: "High-capacity serving robot", desc: "A higher-capacity candidate for multi-table service and restaurant labor-saving PoCs." },
          { name: "Servi Q", type: "Compact AMR", desc: "A compact service robot candidate for narrow aisles and smaller stores." },
          { name: "Carti 100", type: "Warehouse AMR", desc: "A 100kg-class transport robot candidate for warehouses and factories." },
          { name: "Servi Clean", type: "Cleaning robot", desc: "A cleaning automation candidate for facilities, stores, and hospitals." },
        ],
      },
      {
        company: "ROBOTIS",
        summary: "Education, research, and developer platforms including compact humanoids and ROS robots.",
        robots: [
          { name: "ROBOTIS OP3", type: "Compact humanoid", desc: "An open-platform humanoid candidate for research, education, and RoboCup." },
          { name: "BIOLOID", type: "Educational robot kit", desc: "A modular robot kit candidate for robotics, control, and programming education." },
          { name: "TurtleBot3", type: "ROS education robot", desc: "A compact mobile robot candidate for ROS 2, SLAM, and autonomous navigation training." },
        ],
      },
      {
        company: "Furhat Robotics",
        summary: "Social robots suited to conversation, reception, education, research, and interview workflows.",
        robots: [
          { name: "Furhat", type: "Conversational social robot", desc: "A face, gaze, and voice interaction platform candidate for reception, research, and education." },
          { name: "Misty II", type: "Programmable robot", desc: "A compact social robot candidate for education, research, and assistant prototypes." },
          { name: "Tengai", type: "Interview and dialogue robot", desc: "A candidate for hiring interviews, customer interviews, and dialogue experiments." },
        ],
      },
      {
        company: "AiMoga",
        summary: "Automotive-backed humanoid and robot-dog candidates with strong PR and exhibition impact.",
        robots: [
          { name: "Morine M1", type: "Full-size humanoid", desc: "A high-presence humanoid candidate for stores, exhibitions, guidance, and PR, subject to import and support checks." },
          { name: "AiMoga Robot Dog", type: "Quadruped", desc: "A quadruped candidate for events, exhibitions, and patrol demonstrations." },
        ],
      },
    ],
    lineupFootnote: "* Model names are examples planned or under consideration for import. The final lineup, specs, and availability may change. Prices are per day, tax included. Choose the number of days (quantity) at checkout.",
    reserveCta: "Reserve",
    availableBadge: "Booking open",
    planLabel: "Plan",
    planTitle: "What we plan to offer",
    planDesc: "Centered on 'try before you buy,' offered so you can verify value on-site.",
    plans: [
      { title: "Short-term rental", desc: "Rental by the day, week, or month — flexible to your goal and timeline." },
      { title: "Pre-purchase trial", desc: "Try a unit you're considering buying in your actual environment." },
      { title: "Events & exhibitions", desc: "For trade shows, storefronts, and shoots — drawing crowds and PR." },
      { title: "Operation support", desc: "From delivery and setup to operating lectures and AI integration." },
    ],
    useLabel: "Use Cases",
    useTitle: "Anticipated use cases",
    useDesc: "Toward launch, we envision use in settings like the following.",
    useCases: [
      { name: "Trade shows & events", desc: "A crowd-drawing device and photo spot that creates buzz." },
      { name: "Stores & facilities", desc: "PoC for hospitality: reception, guidance, and greeting." },
      { name: "Factories & logistics", desc: "Verify labor-saving use cases like transport and inspection." },
      { name: "Research & education", desc: "Robotics research, AI-integration experiments, and teaching demos." },
    ],
    ctaLabel: "Contact",
    ctaTitle: "We welcome early inquiries.",
    ctaDesc: "'We'd like to use it for this,' or 'When does it launch?' — reach out even before launch. We'll prioritize your inquiry as soon as we're ready.",
    ctaButton: "Get an early consultation",
  },
};

export default function RobotRentalPage() {
  const { lang } = useLanguage();
  const t = COPY[lang];
  const [maker, setMaker] = useState<string>("all");
  const visibleGroups = t.lineupGroups.filter((g) => maker === "all" || g.company === maker);

  return (
    <>
      {/* PAGE HEADER */}
      <section className="pt-24 pb-4 lg:pt-28 lg:pb-5 bg-white border-b border-gray-100">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <p className="text-sm font-semibold text-neutral-900">{t.heroKicker}</p>
              <span className="inline-flex items-center rounded-md bg-neutral-50 text-neutral-900 border border-neutral-200 px-3 py-1 text-xs font-bold tracking-wide">
                {t.comingSoon}
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">{t.heroTitle}</h1>
            <p className="text-base text-gray-600 leading-relaxed w-full">{t.heroDesc}</p>
          </div>
        </div>
      </section>

      {/* LINEUP */}
      <section className="pt-8 pb-14 lg:pt-10 lg:pb-20 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.lineupLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.lineupTitle}</h2>
            <p className="text-sm text-gray-500 mb-8 w-full leading-relaxed">{t.lineupDesc}</p>
          </Reveal>
          {/* MAKER TABS */}
          <Reveal>
            <div className="mb-10 flex gap-2 overflow-x-auto -mx-6 px-6 pb-1 snap-x [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {[{ key: "all", label: t.lineupAll }, ...t.lineupGroups.map((g) => ({ key: g.company, label: g.company }))].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setMaker(tab.key)}
                  aria-pressed={maker === tab.key}
                  className={`shrink-0 whitespace-nowrap snap-start rounded-md px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                    maker === tab.key
                      ? "bg-neutral-900 text-white shadow-sm"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </Reveal>
          <div className="space-y-12">
            {visibleGroups.map((group, groupIndex) => (
              <Reveal key={`${maker}-${group.company}`} delay={groupIndex * 80}>
                <div className="border-t border-gray-200 pt-8">
                  <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                    <div>
                      <p className="text-xs font-bold tracking-widest text-neutral-900 uppercase mb-2">Maker</p>
                      <h3 className="text-2xl font-bold text-gray-900">{group.company}</h3>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed w-full">{group.summary}</p>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-5">
                    {group.robots.map((item, i) => {
                      const available = item.status === "booking" || Boolean(item.buyUrl);
                      return (
                        <Reveal key={item.name} delay={i * 60}>
                          <div className={`relative h-full rounded-lg border bg-white overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col ${available ? "border-neutral-300" : "border-gray-200"}`}>
                            <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                              {item.image ? (
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                  className="object-contain p-4 sm:p-6"
                                />
                              ) : (
                                <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">Image Coming Soon</span>
                              )}
                              {available ? (
                                <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-md bg-neutral-900 text-white px-2.5 py-0.5 text-[10px] font-bold tracking-wide shadow-sm">
                                  <span className="w-1.5 h-1.5 rounded-full bg-white" />{t.availableBadge}
                                </span>
                              ) : (
                                <span className="absolute top-3 right-3 inline-flex items-center rounded-full bg-white/90 backdrop-blur text-gray-500 px-2.5 py-0.5 text-[10px] font-bold tracking-wide border border-gray-200">
                                  {t.inquiryBadge}
                                </span>
                              )}
                            </div>
                            <div className="p-4 sm:p-6 flex-1 flex flex-col">
                              <span className="inline-block text-xs font-bold tracking-widest text-neutral-900 uppercase mb-2 sm:mb-3">{item.type}</span>
                              <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2">{item.name}</h4>
                              <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                              {available ? (
                                <div className="mt-auto pt-5">
                                  <div className="flex items-baseline flex-wrap gap-x-1.5 mb-3">
                                    <span className="text-xl sm:text-2xl font-bold text-gray-900">{item.price}</span>
                                    <span className="text-xs text-gray-500">{item.priceUnit}</span>
                                  </div>
                                  <a
                                    href={`/robot-rental/reserve?maker=${encodeURIComponent(group.company)}&robot=${encodeURIComponent(item.name)}&price=${encodeURIComponent(item.price ?? "")}&unit=${encodeURIComponent(item.priceUnit ?? "")}`}
                                    className="block w-full text-center rounded-lg bg-neutral-900 text-white font-semibold px-3 sm:px-6 py-3 hover:bg-neutral-800 transition-colors duration-300"
                                  >
                                    {t.reserveCta}
                                  </a>
                                </div>
                              ) : (
                                <div className="mt-auto pt-5">
                                  <a
                                    href={`/contact?service=robot-rental&maker=${encodeURIComponent(group.company)}&robot=${encodeURIComponent(item.name)}`}
                                    className="block w-full text-center rounded-lg border border-neutral-200 text-neutral-900 font-semibold px-3 sm:px-6 py-3 hover:bg-neutral-50 transition-colors duration-300"
                                  >
                                    {t.heroCta}
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                        </Reveal>
                      );
                    })}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <p className="text-xs text-gray-400 mt-8">{t.lineupFootnote}</p>
          </Reveal>
        </div>
      </section>

      {/* PLAN */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.planLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.planTitle}</h2>
            <p className="text-sm text-gray-500 mb-6 w-full leading-relaxed">{t.planDesc}</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.plans.map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="bg-white rounded-lg border border-gray-200 p-5 hover:border-neutral-300 hover:shadow-lg transition-all duration-300">
                  <span className="text-sm font-bold text-neutral-900">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-3 mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-14 lg:py-20 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.useLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.useTitle}</h2>
            <p className="text-sm text-gray-500 mb-8 w-full leading-relaxed">{t.useDesc}</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.useCases.map((item, i) => (
              <Reveal key={item.name} delay={i * 80}>
                <div className="h-full rounded-lg border border-gray-200 bg-white p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Reveal>
            <Label>{t.ctaLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.ctaTitle}</h2>
            <p className="text-base text-gray-600 leading-relaxed mb-10">{t.ctaDesc}</p>
            <a href="/reserve" className="rounded-lg bg-neutral-900 text-white font-semibold px-10 py-4 hover:bg-neutral-800 transition-colors duration-300 inline-block">{t.ctaButton}</a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

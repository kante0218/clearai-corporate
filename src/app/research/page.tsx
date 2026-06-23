"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import CardCarousel from "@/components/CardCarousel";

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

type Copy = {
  heroKicker: string;
  heroTitle: string;
  heroDesc: string;
  whyLabel: string;
  whyTitle: string;
  whyDesc: string;
  why: { num: string; title: string; desc: string }[];
  areasLabel: string;
  areasTitle: string;
  areasDesc: string;
  areas: { tag: string; title: string; desc: string; examples: string[] }[];
  processLabel: string;
  processTitle: string;
  processDesc: string;
  process: { num: string; title: string; en: string; desc: string; duration: string }[];
  outputsLabel: string;
  outputsTitle: string;
  outputsDesc: string;
  outputs: { title: string; desc: string }[];
  techLabel: string;
  techTitle: string;
  techDesc: string;
  tech: { category: string; items: string[] }[];
  engageLabel: string;
  engageTitle: string;
  engageDesc: string;
  engage: { tag: string; title: string; desc: string; features: string[] }[];
  faqLabel: string;
  faqTitle: string;
  faq: { q: string; a: string }[];
  ctaLabel: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaButton: string;
};

const COPY: Record<"ja" | "en", Copy> = {
  ja: {
    heroKicker: "Research & Development",
    heroTitle: "研究開発",
    heroDesc: "ヒューマノイドや産業用ロボットを「現場で使えるもの」にするための、ソフトウェアとハードウェアの研究開発を行います。特定産業に特化したロボット内部OS、模倣学習（Imitation Learning）、強化学習をはじめとする機械学習を軸に、シミュレーションから実機（Sim2Real）までを一気通貫で扱います。さらに、ヒューマノイドの外装・筐体といったハードウェアも自社で開発し、ロボットを賢く・安全に・現場業務に適応させる「頭脳と神経系」から「身体」までを一貫してつくります。",
    whyLabel: "Why R&D",
    whyTitle: "なぜ、clearAIが研究開発をやるのか。",
    whyDesc: "汎用ロボットの時代が来ても、「自分の現場の業務」をそのまま任せられる賢さは、既製品には入っていません。産業ごとの暗黙知を学習させ、実機で安全に動かすソフトウェアと、現場に最適化したハードウェアの両方こそが、これからの最大の参入障壁になると考えています。",
    why: [
      { num: "01", title: "ソフトとハードの両輪で挑む", desc: "ベースとなる駆動機構は世界の優れたプラットフォームを活用しつつ、ヒューマノイドの外装・筐体といったハードウェアと、機体に依存しない制御・学習・運用のソフトウェアの両方を自社で開発します。現場適応の知能とハードの作り込みの両輪で差別化します。" },
      { num: "02", title: "産業特化が堀になる", desc: "汎用モデルは「だいたいできる」止まり。エネルギー点検・製造・物流など、特定産業の業務手順と安全要件を学習し切ったロボットOSは、後発が簡単に追いつけない資産になります。" },
      { num: "03", title: "教示コストを下げる", desc: "1動作ずつプログラムする時代を終わらせます。人の動きを見せる・少数のデモを与えるだけで業務を覚える模倣学習で、ロボット導入の最大のボトルネックである「教える手間」を圧縮します。" },
      { num: "04", title: "シミュレーションで先に失敗する", desc: "実機を壊さず、危険な状況も含めて仮想環境で大量に学習・検証してから現場へ。Sim2Real の橋渡しを内製し、安全とスピードを両立させます。" },
    ],
    areasLabel: "Research Areas",
    areasTitle: "研究開発のテーマ",
    areasDesc: "ロボットを現場業務に適応させるために必要な、ソフトウェアの主要領域に取り組んでいます。",
    areas: [
      { tag: "Robot OS", title: "産業特化ロボット内部OS", desc: "特定産業の業務手順・安全基準・現場制約を組み込んだ、ロボットの内部ソフトウェア基盤を設計します。機体に依存しない抽象化レイヤー（HAL）の上に、業種別のワークフローを載せます。", examples: ["機体非依存の制御抽象化レイヤー", "業種別タスク／安全ルールの組み込み", "遠隔監視・運用ダッシュボード"] },
      { tag: "Imitation Learning", title: "模倣学習・教示", desc: "人のデモンストレーションや少数の試行から作業を学習させ、プログラミングなしでロボットに業務を覚えさせます。現場での教示コストを最小化することが狙いです。", examples: ["デモからの行動方策学習", "Behavior Cloning / 拡散方策", "少数データでの作業再現"] },
      { tag: "Reinforcement Learning", title: "強化学習・ロコモーション", desc: "四足・二足歩行や全身制御を、シミュレーション上の試行錯誤で獲得します。MuJoCo / Isaac などの物理シミュレータ上で方策を学習し、頑健な動作を作ります。", examples: ["歩行・バランス制御の方策学習", "報酬設計とカリキュラム学習", "ドメインランダム化"] },
      { tag: "Sim2Real", title: "シミュレーションから実機へ", desc: "仮想環境で学習した方策を、現実のロボットで安定して動かすための橋渡し技術。ドメインギャップを埋め、安全に実機展開します。", examples: ["物理パラメータの同定・補正", "ドメインランダム化による頑健化", "実機での段階的バリデーション"] },
      { tag: "Perception", title: "知覚・環境認識", desc: "カメラ・LiDAR・各種センサーから現場環境を理解し、物体・人・異常を検知します。点検や作業の判断に必要な「見て分かる」能力を実装します。", examples: ["3D点群・画像認識", "異常検知・点検判定", "人検知と安全停止"] },
      { tag: "Foundation Models", title: "ロボット基盤モデル活用", desc: "Vision-Language-Action（VLA）など、ロボット向け基盤モデルを業務に合わせてファインチューニングし、自然言語の指示で動くロボットを目指します。", examples: ["VLAモデルの業務適応", "日本語指示でのタスク実行", "マルチモーダルな状況理解"] },
    ],
    processLabel: "Process",
    processTitle: "研究開発の進め方",
    processDesc: "課題設定からシミュレーション学習、実機検証、現場実装までを段階的に進めます。安全とROIを常に検証しながら前に進みます。",
    process: [
      { num: "01", title: "課題設定・リサーチ", en: "Scoping", desc: "対象とする産業・業務を定め、自動化の対象範囲・安全要件・成功指標（KPI）を定義。既存研究と実現可能性を調査します。", duration: "2〜4週間" },
      { num: "02", title: "シミュレーション環境構築", en: "Simulation", desc: "対象タスクを物理シミュレータ上に再現し、学習・評価できる環境を構築。報酬設計・データ収集パイプラインを整備します。", duration: "3〜6週間" },
      { num: "03", title: "学習・実験", en: "Training", desc: "模倣学習・強化学習で方策を学習。多数の試行で成功率・頑健性を測定し、ドメインランダム化で実機ギャップに備えます。", duration: "1〜3ヶ月" },
      { num: "04", title: "実機検証（Sim2Real）", en: "Sim2Real", desc: "学習済み方策を実機に移し、安全管理下で段階的にバリデーション。ギャップを補正し、現場条件での動作を確認します。", duration: "1〜2ヶ月" },
      { num: "05", title: "現場実装・継続改善", en: "Deployment", desc: "現場へ展開し、運用データを回収して再学習・改善を継続。新タスク追加やモデル更新のループを回します。", duration: "継続" },
    ],
    outputsLabel: "Outputs",
    outputsTitle: "研究開発のアウトプット",
    outputsDesc: "論文止まりにしません。現場で動くソフトウェアと、再現・運用に必要な資産を成果として残します。",
    outputs: [
      { title: "ロボットOS / 制御ソフトウェア", desc: "産業特化の制御・学習ソフトウェア。機体非依存の抽象化レイヤーの上に、業種別ワークフローを実装します。" },
      { title: "学習済みモデル・方策", desc: "模倣学習・強化学習で得た方策と重み。再学習・追加学習が可能な形で管理します。" },
      { title: "シミュレーション環境", desc: "対象タスクを再現した物理シミュレーション環境一式。継続的な学習・評価に再利用できます。" },
      { title: "データセット・収集基盤", desc: "デモ・センサーデータの収集／前処理パイプライン。データ飛輪を回す仕組みを構築します。" },
      { title: "評価・安全レポート", desc: "成功率・頑健性・安全性の評価結果と、実機展開時のリスク評価をドキュメント化します。" },
      { title: "技術ドキュメント・デモ", desc: "再現手順・運用手順、投資家／顧客向けのデモ映像と技術解説を提供します。" },
    ],
    techLabel: "Tech Stack",
    techTitle: "使用技術",
    techDesc: "研究テーマ・安全要件・計算資源に応じて最適な構成を選定します。シミュレーションから実機まで一貫して扱います。",
    tech: [
      { category: "Simulation", items: ["MuJoCo / MuJoCo Playground", "NVIDIA Isaac Sim / Isaac Lab", "Genesis", "Gazebo"] },
      { category: "Learning", items: ["強化学習（PPO / SAC）", "模倣学習（Behavior Cloning / 拡散方策）", "JAX / PyTorch", "カリキュラム・ドメインランダム化"] },
      { category: "Foundation Models", items: ["Vision-Language-Action（VLA）", "マルチモーダルLLM", "基盤モデルのファインチューニング"] },
      { category: "Robotics Platform", items: ["Unitree（四足 / ヒューマノイド）", "ROS 2", "機体非依存の制御抽象化（HAL）", "各種センサー統合"] },
      { category: "Perception", items: ["3D点群 / SLAM", "物体・異常検知", "カメラ / LiDAR / 力覚センサー"] },
      { category: "Infra / Compute", items: ["GPU学習環境（RTX / クラウドGPU）", "分散学習", "実験管理・モデル管理", "遠隔運用ダッシュボード"] },
    ],
    engageLabel: "Engagement",
    engageTitle: "連携のかたち",
    engageDesc: "自社研究に加えて、企業・研究機関との共同研究や受託研究にも取り組みます。テーマ・体制に応じて柔軟に設計します。",
    engage: [
      { tag: "Joint Research", title: "共同研究", desc: "企業・大学・研究機関と共同でテーマを設定し、研究開発を推進。成果・知財の取り扱いは個別に合意します。", features: ["テーマ共創・役割分担", "成果・知財の共同保有", "中長期での継続連携"] },
      { tag: "Contract R&D", title: "受託研究・PoC", desc: "特定タスクの実現可能性検証や、シミュレーション学習〜実機PoCを受託で実施。意思決定に必要な技術検証を行います。", features: ["実現可能性の技術検証", "シミュレーション〜実機PoC", "評価レポート納品"] },
      { tag: "Advisory", title: "技術顧問・アドバイザリー", desc: "ロボット・機械学習の導入を検討する企業に対し、技術選定・ロードマップ策定を伴走支援します。", features: ["技術選定・実現性評価", "ロードマップ策定", "継続的なアドバイザリー"] },
    ],
    faqLabel: "FAQ",
    faqTitle: "よくあるご質問",
    faq: [
      { q: "ロボット本体（ハードウェア）も開発するのですか？", a: "はい。私たちはソフトウェアに加えて、ヒューマノイドの外装・筐体などのハードウェアも研究開発します。駆動機構などベースとなる部分は世界の優れたプラットフォーム（Unitree など）を活用しつつ、その上で動く制御・学習・運用のソフトウェアと、現場・用途に最適化したハードウェアの両方を自社で手がけます。あわせて機体に依存しない抽象化レイヤーも設計するため、特定の機体に縛られることもありません。" },
      { q: "「産業特化ロボットOS」とは具体的に何ですか？", a: "特定の産業（例：エネルギー設備の点検、製造、物流）の業務手順・安全基準・現場制約を組み込んだ、ロボットの内部ソフトウェア基盤です。機体を抽象化したレイヤーの上に業種別のワークフローを載せることで、その産業の現場でそのまま使えるロボットを実現します。" },
      { q: "模倣学習とは何ですか？通常のプログラミングと何が違いますか？", a: "模倣学習は、人のデモンストレーションや少数の試行例からロボットに作業を学習させる手法です。1動作ずつプログラムを書く代わりに「やって見せる／少数のデモを与える」だけで業務を覚えさせられるため、ロボット導入の最大のボトルネックである教示コストを大幅に下げられます。" },
      { q: "シミュレーションで学習したものが、実機でちゃんと動くのですか？", a: "そこが Sim2Real の核心です。ドメインランダム化（仮想環境のパラメータを意図的にばらつかせて頑健性を上げる）や物理パラメータの同定・補正で、シミュレーションと現実のギャップを埋めます。実機では安全管理下で段階的にバリデーションを行い、確認しながら展開します。" },
      { q: "どの産業から取り組んでいますか？", a: "現場の安全要件が高く、人手不足が深刻な領域を優先的に検討しています。エネルギー設備の点検など、ロボット導入の社会的インパクトが大きい産業から着手します。具体的なテーマはご相談の中で定めていきます。" },
      { q: "共同研究や受託研究の相談はできますか？", a: "はい。企業・大学・研究機関との共同研究、特定タスクの受託研究・PoC、技術顧問など、テーマと体制に応じて柔軟に連携します。まずは課題やアイデアを共有いただければ、実現可能性と進め方をご提案します。" },
    ],
    ctaLabel: "Contact",
    ctaTitle: "ロボットと機械学習の研究開発を、一緒にやりませんか。",
    ctaDesc: "「この業務をロボットに任せられないか」「産業特化のロボットOSを一緒に開発したい」「Sim2Realの相談がしたい」など、テーマやアイデアを30分でお伺いします。共同研究・受託研究のご相談も歓迎です。",
    ctaButton: "研究開発について相談する",
  },
  en: {
    heroKicker: "Research & Development",
    heroTitle: "Research & Development",
    heroDesc: "We do the software and hardware R&D that makes humanoids and industrial robots usable on real sites. Centered on industry-specific robot operating systems, imitation learning, and reinforcement learning, we cover everything from simulation to real hardware (Sim2Real). We also develop hardware in-house — humanoid exteriors and enclosures — building the full stack from the \"brain and nervous system\" to the \"body\" that makes robots smart, safe, and adapted to real work.",
    whyLabel: "Why R&D",
    whyTitle: "Why clearAI does R&D.",
    whyDesc: "Even as general-purpose robots arrive, off-the-shelf products don't come with the intelligence to take over your specific site's work. Both the software that learns each industry's tacit knowledge and runs safely on real hardware, and the hardware optimized for the site, will be the biggest barrier to entry going forward.",
    why: [
      { num: "01", title: "Software and hardware, together", desc: "We use the world's best platforms for the base drivetrain, while developing both the hardware — humanoid exteriors and enclosures — and the body-agnostic software for control, learning, and operations in-house. We differentiate on the combination of site-adaptation intelligence and hardware craftsmanship." },
      { num: "02", title: "Verticalization is the moat", desc: "General models only get you to \"roughly works.\" A robot OS that fully learns a specific industry's procedures and safety requirements — energy inspection, manufacturing, logistics — becomes an asset latecomers can't easily catch." },
      { num: "03", title: "Lower the cost of teaching", desc: "We end the era of programming motion-by-motion. With imitation learning that absorbs work from demonstrations, we compress the biggest bottleneck in robot adoption: the effort of teaching." },
      { num: "04", title: "Fail first in simulation", desc: "Train and validate massively in virtual environments — including dangerous scenarios — before touching real hardware. We build the Sim2Real bridge in-house to balance safety and speed." },
    ],
    areasLabel: "Research Areas",
    areasTitle: "Research themes",
    areasDesc: "We work on the core software domains needed to adapt robots to real-world operations.",
    areas: [
      { tag: "Robot OS", title: "Industry-specific robot OS", desc: "We design the internal software foundation of a robot, embedding a specific industry's procedures, safety standards, and site constraints — vertical workflows layered on a body-agnostic abstraction (HAL).", examples: ["Body-agnostic control abstraction layer", "Vertical task & safety-rule integration", "Remote monitoring & ops dashboard"] },
      { tag: "Imitation Learning", title: "Imitation learning & teaching", desc: "Teach robots tasks from human demonstrations or a few trials, with no programming. The goal is to minimize the cost of teaching on real sites.", examples: ["Policy learning from demonstrations", "Behavior cloning / diffusion policies", "Task replication from few examples"] },
      { tag: "Reinforcement Learning", title: "Reinforcement learning & locomotion", desc: "Acquire quadruped/biped walking and whole-body control through trial-and-error in simulation. We learn policies on physics simulators like MuJoCo / Isaac for robust motion.", examples: ["Walking & balance policy learning", "Reward design & curriculum learning", "Domain randomization"] },
      { tag: "Sim2Real", title: "Simulation to real hardware", desc: "Bridging tech to run policies learned in simulation stably on real robots. We close the domain gap and deploy to hardware safely.", examples: ["Physics parameter identification", "Robustification via domain randomization", "Staged on-hardware validation"] },
      { tag: "Perception", title: "Perception & scene understanding", desc: "Understand the site from cameras, LiDAR, and sensors, detecting objects, people, and anomalies — the \"see and understand\" capability inspection and work require.", examples: ["3D point cloud / image recognition", "Anomaly & inspection detection", "Human detection & safe stop"] },
      { tag: "Foundation Models", title: "Robot foundation models", desc: "Fine-tune robot foundation models such as Vision-Language-Action (VLA) to the task, aiming for robots that act on natural-language instructions.", examples: ["Task adaptation of VLA models", "Task execution from instructions", "Multimodal situation understanding"] },
    ],
    processLabel: "Process",
    processTitle: "How we run R&D",
    processDesc: "From problem scoping to simulation training, on-hardware validation, and field deployment — advancing in stages while continuously checking safety and ROI.",
    process: [
      { num: "01", title: "Scoping & Research", en: "Scoping", desc: "Define the target industry/task, the automation scope, safety requirements, and success metrics (KPIs). Survey prior work and feasibility.", duration: "2-4 weeks" },
      { num: "02", title: "Simulation Setup", en: "Simulation", desc: "Reproduce the task in a physics simulator, building an environment for training and evaluation. Set up reward design and data pipelines.", duration: "3-6 weeks" },
      { num: "03", title: "Training & Experiments", en: "Training", desc: "Learn policies via imitation/reinforcement learning. Measure success rate and robustness across many trials; prep for the real gap with domain randomization.", duration: "1-3 months" },
      { num: "04", title: "On-hardware (Sim2Real)", en: "Sim2Real", desc: "Transfer learned policies to real hardware and validate in stages under safety controls. Correct the gap and confirm operation under site conditions.", duration: "1-2 months" },
      { num: "05", title: "Deployment & Improvement", en: "Deployment", desc: "Deploy to the field, collect operational data, and continuously retrain and improve. Loop in new tasks and model updates.", duration: "Ongoing" },
    ],
    outputsLabel: "Outputs",
    outputsTitle: "R&D outputs",
    outputsDesc: "We don't stop at papers. We leave behind software that runs on site, plus the assets needed to reproduce and operate it.",
    outputs: [
      { title: "Robot OS / control software", desc: "Industry-specific control and learning software, with vertical workflows on a body-agnostic abstraction layer." },
      { title: "Trained models & policies", desc: "Policies and weights from imitation/reinforcement learning, managed so they can be retrained and extended." },
      { title: "Simulation environments", desc: "A full physics-simulation environment reproducing the target task, reusable for ongoing training and evaluation." },
      { title: "Datasets & collection pipeline", desc: "Demonstration/sensor data collection and preprocessing pipelines — the machinery that spins the data flywheel." },
      { title: "Evaluation & safety reports", desc: "Documented results for success rate, robustness, and safety, plus risk assessment for on-hardware deployment." },
      { title: "Technical docs & demos", desc: "Reproduction and operation procedures, plus demo videos and technical write-ups for investors and customers." },
    ],
    techLabel: "Tech Stack",
    techTitle: "Tech stack",
    techDesc: "We select the optimal stack per research theme, safety requirements, and compute — handling everything from simulation to real hardware.",
    tech: [
      { category: "Simulation", items: ["MuJoCo / MuJoCo Playground", "NVIDIA Isaac Sim / Isaac Lab", "Genesis", "Gazebo"] },
      { category: "Learning", items: ["Reinforcement learning (PPO / SAC)", "Imitation learning (BC / diffusion policy)", "JAX / PyTorch", "Curriculum & domain randomization"] },
      { category: "Foundation Models", items: ["Vision-Language-Action (VLA)", "Multimodal LLMs", "Fine-tuning of foundation models"] },
      { category: "Robotics Platform", items: ["Unitree (quadruped / humanoid)", "ROS 2", "Body-agnostic control abstraction (HAL)", "Sensor integration"] },
      { category: "Perception", items: ["3D point cloud / SLAM", "Object & anomaly detection", "Camera / LiDAR / force sensors"] },
      { category: "Infra / Compute", items: ["GPU training (RTX / cloud GPU)", "Distributed training", "Experiment & model management", "Remote operations dashboard"] },
    ],
    engageLabel: "Engagement",
    engageTitle: "Ways to work together",
    engageDesc: "Beyond our own research, we take on joint research and contract R&D with companies and research institutions, designed flexibly to the theme and team.",
    engage: [
      { tag: "Joint Research", title: "Joint research", desc: "Set themes and drive R&D jointly with companies, universities, and research institutions. IP and outcome terms agreed case by case.", features: ["Co-created themes & roles", "Joint ownership of results/IP", "Mid-to-long-term collaboration"] },
      { tag: "Contract R&D", title: "Contract R&D / PoC", desc: "Feasibility studies for specific tasks, or simulation training through on-hardware PoC, delivered on contract for the technical validation decisions need.", features: ["Technical feasibility validation", "Simulation-to-hardware PoC", "Evaluation report delivery"] },
      { tag: "Advisory", title: "Technical advisory", desc: "For companies considering robotics/ML adoption, we support technology selection and roadmap design hands-on.", features: ["Tech selection & feasibility", "Roadmap design", "Ongoing advisory"] },
    ],
    faqLabel: "FAQ",
    faqTitle: "FAQ",
    faq: [
      { q: "Do you develop the robot hardware too?", a: "Yes. Beyond software, we also research and develop hardware — humanoid exteriors and enclosures. We use the world's best platforms (such as Unitree) for the base drivetrain, and develop in-house both the control/learning/operations software that runs on top and the hardware optimized for each site and use case. We also design a body-agnostic abstraction layer, so we're not locked to a specific machine." },
      { q: "What exactly is an \"industry-specific robot OS\"?", a: "It's the internal software foundation of a robot, embedding a specific industry's procedures, safety standards, and site constraints (e.g., energy-facility inspection, manufacturing, logistics). By layering vertical workflows on a body-agnostic abstraction, we deliver robots usable as-is on that industry's sites." },
      { q: "What is imitation learning and how is it different from programming?", a: "Imitation learning teaches robots tasks from human demonstrations or a few example trials. Instead of writing code motion-by-motion, you \"show it\" or give a few demos, dramatically lowering the teaching cost that is the biggest bottleneck in robot adoption." },
      { q: "Will something trained in simulation actually work on real hardware?", a: "That's the heart of Sim2Real. We close the gap with domain randomization (deliberately varying simulation parameters to build robustness) and physics parameter identification/correction. On real hardware we validate in stages under safety controls, confirming as we deploy." },
      { q: "Which industries are you starting with?", a: "We prioritize areas with high site-safety requirements and severe labor shortages. We begin with industries where robot adoption has large social impact, such as energy-facility inspection. Specific themes are defined together in discussion." },
      { q: "Can we discuss joint or contract research?", a: "Yes. We collaborate flexibly per theme and team — joint research with companies/universities/institutions, contract R&D and PoC for specific tasks, and technical advisory. Share your challenge or idea and we'll propose feasibility and an approach." },
    ],
    ctaLabel: "Contact",
    ctaTitle: "Let's do robotics and ML research together.",
    ctaDesc: "Tell us your theme or idea — \"could a robot take over this task,\" \"build an industry-specific robot OS with us,\" or \"we want to talk Sim2Real.\" 30 minutes. Joint and contract research inquiries are welcome.",
    ctaButton: "Talk to us about R&D",
  },
};

export default function ResearchPage() {
  const { lang } = useLanguage();
  const t = COPY[lang];
  const diagram = lang === "ja" ? "/images/research-overview.png" : "/images/research-overview-en.png";

  return (
    <>
      {/* PAGE HEADER */}
      <section className="pt-24 pb-10 lg:pt-28 lg:pb-12 bg-white border-b border-gray-100">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <p className="text-sm font-semibold text-neutral-900 mb-3">{t.heroKicker}</p>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">{t.heroTitle}</h1>
          <p className="text-base text-gray-600 leading-relaxed w-full">{t.heroDesc}</p>
          <figure className="mt-8">
            <a
              href={diagram}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
              aria-label={lang === "ja" ? "ヒューマノイド開発の全体像（タップで拡大）" : "Humanoid development overview (tap to enlarge)"}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={diagram}
                alt={lang === "ja" ? "ヒューマノイド開発の全体像：Sim2Realパイプライン、AI/ロボットOS開発、ハードウェア開発、ソフトとハードの両輪" : "Overview of humanoid development: Sim2Real pipeline, AI/Robot OS, hardware development, software-and-hardware dual approach"}
                loading="lazy"
                className="w-full h-auto rounded-lg border border-gray-200 bg-white transition-shadow duration-300 group-hover:shadow-lg"
              />
            </a>
            <figcaption className="mt-2 text-xs text-gray-400 text-center md:hidden">
              {lang === "ja" ? "タップで拡大" : "Tap to enlarge"}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* WHY */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.whyLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-snug mb-6 w-full">{t.whyTitle}</h2>
            <p className="text-sm text-gray-500 mb-8 w-full leading-relaxed">{t.whyDesc}</p>
          </Reveal>
          <CardCarousel gridClass="md:grid-cols-2">
            {t.why.map((item, i) => (
              <Reveal key={item.num} delay={i * 100}>
                <div className="rounded-lg border border-gray-200 bg-white p-8 hover:shadow-lg transition-all duration-300 h-full">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-bold text-neutral-900 flex-shrink-0">{item.num}</span>
                    <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* AREAS */}
      <section className="py-14 lg:py-20 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.areasLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.areasTitle}</h2>
            <p className="text-sm text-gray-500 mb-8 w-full leading-relaxed">{t.areasDesc}</p>
          </Reveal>
          <CardCarousel gridClass="md:grid-cols-2 lg:grid-cols-3">
            {t.areas.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="h-full rounded-lg border border-gray-200 bg-white p-6 lg:p-7 hover:shadow-lg transition-all duration-300 flex flex-col">
                  <span className="inline-block text-[10px] font-bold tracking-widest text-neutral-900 uppercase mb-3 self-start rounded-md bg-neutral-100 px-2.5 py-1">{item.tag}</span>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{item.desc}</p>
                  <ul className="space-y-2 mt-auto">
                    {item.examples.map((ex) => (
                      <li key={ex} className="flex items-start gap-2 text-xs text-gray-500">
                        <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0 bg-neutral-900" />
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.processLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.processTitle}</h2>
            <p className="text-sm text-gray-500 mb-8 w-full leading-relaxed">{t.processDesc}</p>
          </Reveal>
          {t.process.map((step, i) => (
            <Reveal key={step.num} delay={i * 100}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-8 border-b border-gray-100 last:border-0">
                <div className="lg:col-span-1"><span className="text-sm font-bold text-neutral-900">{step.num}</span></div>
                <div className="lg:col-span-3">
                  <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{step.en}</p>
                  <p className="inline-block text-xs font-semibold text-neutral-900 bg-neutral-100 rounded-md px-2.5 py-1 mt-2">{step.duration}</p>
                </div>
                <div className="lg:col-span-8"><p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* OUTPUTS */}
      <section className="py-14 lg:py-20 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.outputsLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.outputsTitle}</h2>
            <p className="text-sm text-gray-500 mb-8 w-full leading-relaxed">{t.outputsDesc}</p>
          </Reveal>
          <CardCarousel gridClass="md:grid-cols-2 lg:grid-cols-3">
            {t.outputs.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="h-full rounded-lg border border-gray-200 bg-white p-6 lg:p-7">
                  <h3 className="text-base font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* TECH */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.techLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.techTitle}</h2>
            <p className="text-sm text-gray-500 mb-8 w-full leading-relaxed">{t.techDesc}</p>
          </Reveal>
          <CardCarousel gridClass="md:grid-cols-2 lg:grid-cols-3">
            {t.tech.map((item, i) => (
              <Reveal key={item.category} delay={i * 80}>
                <div className="h-full rounded-lg border border-gray-200 bg-gray-50 p-6">
                  <h3 className="text-xs font-bold tracking-widest text-neutral-900 uppercase mb-4">{item.category}</h3>
                  <ul className="space-y-2">
                    {item.items.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-neutral-900" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* ENGAGEMENT */}
      <section className="py-14 lg:py-20 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.engageLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{t.engageTitle}</h2>
            <p className="text-sm text-gray-500 mb-8 w-full leading-relaxed">{t.engageDesc}</p>
          </Reveal>
          <CardCarousel gridClass="md:grid-cols-3">
            {t.engage.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="h-full rounded-lg border border-gray-200 bg-white p-6 lg:p-7 hover:shadow-lg transition-all duration-300 flex flex-col">
                  <span className="inline-block text-[10px] font-bold tracking-widest text-neutral-900 uppercase mb-3 self-start rounded-md bg-neutral-100 px-2.5 py-1">{item.tag}</span>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{item.desc}</p>
                  <ul className="space-y-2 mt-auto">
                    {item.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-gray-500">
                        <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0 bg-neutral-900" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.faqLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-8">{t.faqTitle}</h2>
          </Reveal>
          <div className="max-w-3xl">
            {t.faq.map((item, i) => (
              <Reveal key={i} delay={i * 60}>
                <details className="border-b border-gray-100 py-5 group">
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
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Reveal>
            <Label>{t.ctaLabel}</Label>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.ctaTitle}</h2>
            <p className="text-base text-gray-600 leading-relaxed mb-10">{t.ctaDesc}</p>
            <a href="/contact?service=research" className="rounded-md bg-neutral-900 text-white font-semibold px-10 py-4 hover:bg-neutral-800 transition-colors duration-300 inline-block">{t.ctaButton}</a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

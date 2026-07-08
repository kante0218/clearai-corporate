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

function SectionHead({
  index,
  kicker,
  title,
  desc,
}: {
  index: string;
  kicker: ReactNode;
  title: ReactNode;
  desc?: ReactNode;
}) {
  return (
    <Reveal className="mb-12 lg:mb-16">
      <div className="flex items-center gap-4 border-b border-neutral-900 pb-4">
        <span className="font-mono text-xs font-bold tabular-nums text-neutral-900">§{index}</span>
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-neutral-500">{kicker}</span>
      </div>
      <h2 className="mt-8 max-w-4xl text-[18px] sm:text-xl lg:text-2xl font-bold leading-[1.15] sm:leading-[1.05] tracking-[-0.02em] text-balance text-neutral-900">
        {title}
      </h2>
      {desc && <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-pretty text-neutral-600">{desc}</p>}
    </Reveal>
  );
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
    heroDesc: "産業特化ロボット内部OS・模倣学習・強化学習を軸に、シミュレーションから実機（Sim2Real）、ヒューマノイドの外装・筐体まで一気通貫で研究開発します。",
    whyLabel: "Why R&D",
    whyTitle: "なぜ、clearAIが研究開発をやるのか。",
    whyDesc: "産業ごとの暗黙知を学習させ実機で安全に動かすソフトウェアと、現場に最適化したハードウェアの両輪が、これからの最大の参入障壁になると考えています。",
    why: [
      { num: "01", title: "ソフトとハードの両輪で挑む", desc: "世界の優れた駆動プラットフォームを活用しながら、外装・筐体等のハードウェアと機体非依存のソフトウェアを両方自社開発し、知能とハードの両輪で差別化します。" },
      { num: "02", title: "産業特化が堀になる", desc: "特定産業の業務手順と安全要件を学習し切ったロボットOSは、汎用モデルでは代替できない後発不可能な資産になります。" },
      { num: "03", title: "教示コストを下げる", desc: "模倣学習により人の動きを見せるだけで業務を覚えさせ、ロボット導入の最大のボトルネックである「教える手間」を圧縮します。" },
      { num: "04", title: "シミュレーションで先に失敗する", desc: "Sim2Real の橋渡しを内製し、危険な状況も含めた仮想環境での大量学習・検証から安全に実機展開します。" },
    ],
    areasLabel: "Research Areas",
    areasTitle: "研究開発のテーマ",
    areasDesc: "ロボットを現場業務に適応させるために必要な、ソフトウェアの主要領域に取り組んでいます。",
    areas: [
      { tag: "Robot OS", title: "産業特化ロボット内部OS", desc: "機体非依存の抽象化レイヤー（HAL）の上に業種別ワークフローを載せた、産業の業務手順・安全基準・現場制約を組み込んだロボット内部ソフトウェア基盤を設計します。", examples: ["機体非依存の制御抽象化レイヤー", "業種別タスク／安全ルールの組み込み", "遠隔監視・運用ダッシュボード"] },
      { tag: "Imitation Learning", title: "模倣学習・教示", desc: "人のデモンストレーションや少数の試行から作業を学習させ、プログラミングなしで教示コストを最小化します。", examples: ["デモからの行動方策学習", "Behavior Cloning / 拡散方策", "少数データでの作業再現"] },
      { tag: "Reinforcement Learning", title: "強化学習・ロコモーション", desc: "MuJoCo / Isaac などの物理シミュレータ上で試行錯誤を繰り返し、四足・二足歩行や全身制御の頑健な方策を学習します。", examples: ["歩行・バランス制御の方策学習", "報酬設計とカリキュラム学習", "ドメインランダム化"] },
      { tag: "Sim2Real", title: "シミュレーションから実機へ", desc: "仮想環境で学習した方策を現実のロボットで安定して動かすための橋渡し技術で、ドメインギャップを埋め安全に実機展開します。", examples: ["物理パラメータの同定・補正", "ドメインランダム化による頑健化", "実機での段階的バリデーション"] },
      { tag: "Perception", title: "知覚・環境認識", desc: "カメラ・LiDAR・各種センサーから物体・人・異常を検知し、点検や作業判断に必要な「見て分かる」能力を実装します。", examples: ["3D点群・画像認識", "異常検知・点検判定", "人検知と安全停止"] },
      { tag: "Foundation Models", title: "ロボット基盤モデル活用", desc: "Vision-Language-Action（VLA）など、ロボット向け基盤モデルを業務に合わせてファインチューニングし、自然言語の指示で動くロボットを目指します。", examples: ["VLAモデルの業務適応", "日本語指示でのタスク実行", "マルチモーダルな状況理解"] },
    ],
    processLabel: "Process",
    processTitle: "研究開発の進め方",
    processDesc: "課題設定からシミュレーション学習・実機検証・現場実装までを、安全とROIを常に検証しながら段階的に進めます。",
    process: [
      { num: "01", title: "課題設定・リサーチ", en: "Scoping", desc: "対象産業・業務を定め、自動化範囲・安全要件・KPIを定義し、既存研究と実現可能性を調査します。", duration: "2〜4週間" },
      { num: "02", title: "シミュレーション環境構築", en: "Simulation", desc: "対象タスクを物理シミュレータ上に再現し、学習・評価環境と報酬設計・データ収集パイプラインを整備します。", duration: "3〜6週間" },
      { num: "03", title: "学習・実験", en: "Training", desc: "模倣学習・強化学習で方策を学習し、多数の試行で成功率・頑健性を測定しながらドメインランダム化で実機ギャップに備えます。", duration: "1〜3ヶ月" },
      { num: "04", title: "実機検証（Sim2Real）", en: "Sim2Real", desc: "学習済み方策を実機に移し、安全管理下で段階的にバリデーションしながらギャップを補正し現場条件での動作を確認します。", duration: "1〜2ヶ月" },
      { num: "05", title: "現場実装・継続改善", en: "Deployment", desc: "現場へ展開し、運用データを回収して再学習・改善と新タスク追加のループを継続します。", duration: "継続" },
    ],
    outputsLabel: "Outputs",
    outputsTitle: "研究開発のアウトプット",
    outputsDesc: "論文止まりにせず、現場で動くソフトウェアと再現・運用に必要な資産を成果として残します。",
    outputs: [
      { title: "ロボットOS / 制御ソフトウェア", desc: "機体非依存の抽象化レイヤーの上に業種別ワークフローを実装した産業特化の制御・学習ソフトウェアです。" },
      { title: "学習済みモデル・方策", desc: "模倣学習・強化学習で得た方策と重みを、再学習・追加学習が可能な形で管理します。" },
      { title: "シミュレーション環境", desc: "対象タスクを再現した物理シミュレーション環境一式で、継続的な学習・評価に再利用できます。" },
      { title: "データセット・収集基盤", desc: "デモ・センサーデータの収集と前処理パイプラインで、データ飛輪を回す仕組みを構築します。" },
      { title: "評価・安全レポート", desc: "成功率・頑健性・安全性の評価結果と、実機展開時のリスク評価をドキュメント化します。" },
      { title: "技術ドキュメント・デモ", desc: "再現手順・運用手順、投資家／顧客向けのデモ映像と技術解説を提供します。" },
    ],
    techLabel: "Tech Stack",
    techTitle: "使用技術",
    techDesc: "研究テーマ・安全要件・計算資源に応じて最適な構成を選定し、シミュレーションから実機まで一貫して扱います。",
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
    engageDesc: "自社研究に加え、企業・研究機関との共同研究や受託研究にもテーマ・体制に応じて柔軟に取り組みます。",
    engage: [
      { tag: "Joint Research", title: "共同研究", desc: "企業・大学・研究機関と共同でテーマを設定して研究開発を推進し、成果・知財の取り扱いは個別に合意します。", features: ["テーマ共創・役割分担", "成果・知財の共同保有", "中長期での継続連携"] },
      { tag: "Contract R&D", title: "受託研究・PoC", desc: "特定タスクの実現可能性検証やシミュレーション学習〜実機PoCを受託で実施し、意思決定に必要な技術検証を行います。", features: ["実現可能性の技術検証", "シミュレーション〜実機PoC", "評価レポート納品"] },
      { tag: "Advisory", title: "技術顧問・アドバイザリー", desc: "ロボット・機械学習の導入を検討する企業に対し、技術選定・ロードマップ策定を伴走支援します。", features: ["技術選定・実現性評価", "ロードマップ策定", "継続的なアドバイザリー"] },
    ],
    faqLabel: "FAQ",
    faqTitle: "よくあるご質問",
    faq: [
      { q: "ロボット本体（ハードウェア）も開発するのですか？", a: "はい。世界の優れたプラットフォーム（Unitree など）をベースに、外装・筐体等のハードウェアと制御・学習・運用ソフトウェアを両方自社で手がけ、機体非依存の抽象化レイヤーも設計するため特定の機体に縛られません。" },
      { q: "「産業特化ロボットOS」とは具体的に何ですか？", a: "機体を抽象化したレイヤーの上に業種別のワークフローを載せることで、特定産業（エネルギー点検・製造・物流等）の業務手順・安全基準・現場制約を組み込んだロボット内部ソフトウェア基盤です。" },
      { q: "模倣学習とは何ですか？通常のプログラミングと何が違いますか？", a: "人のデモンストレーションや少数の試行例から作業を学習させる手法で、プログラムを書く代わりに「やって見せる」だけで業務を覚えさせられるため、教示コストを大幅に下げられます。" },
      { q: "シミュレーションで学習したものが、実機でちゃんと動くのですか？", a: "ドメインランダム化・物理パラメータの同定・補正でシミュレーションと現実のギャップを埋め、実機では安全管理下で段階的にバリデーションしながら展開します。" },
      { q: "どの産業から取り組んでいますか？", a: "安全要件が高く人手不足が深刻な産業（エネルギー設備点検等）を優先し、具体的なテーマはご相談の中で定めていきます。" },
      { q: "共同研究や受託研究の相談はできますか？", a: "はい。共同研究・受託PoC・技術顧問など体制に応じて柔軟に連携し、課題やアイデアを共有いただければ実現可能性と進め方をご提案します。" },
    ],
    ctaLabel: "Contact",
    ctaTitle: "ロボットと機械学習の研究開発を、一緒にやりませんか。",
    ctaDesc: "「この業務をロボットに任せられないか」「産業特化のロボットOSを開発したい」「Sim2Real相談」など、テーマ・共同研究・受託研究の相談を30分でお伺いします。",
    ctaButton: "研究開発について相談する",
  },
  en: {
    heroKicker: "Research & Development",
    heroTitle: "Research & Development",
    heroDesc: "Centered on industry-specific robot OS, imitation learning, and reinforcement learning, we cover everything from simulation to real hardware (Sim2Real), developing humanoid exteriors and enclosures in-house to build the full stack from intelligence to body.",
    whyLabel: "Why R&D",
    whyTitle: "Why clearAI does R&D.",
    whyDesc: "Off-the-shelf robots don't come with the intelligence for your specific site's work — both the software that learns each industry's tacit knowledge and the hardware optimized for the site will be the biggest barrier to entry going forward.",
    why: [
      { num: "01", title: "Software and hardware, together", desc: "We use the world's best platforms for the base drivetrain while developing both humanoid hardware and body-agnostic control/learning software in-house, differentiating on site-adaptation intelligence and hardware craftsmanship." },
      { num: "02", title: "Verticalization is the moat", desc: "A robot OS that fully learns a specific industry's procedures and safety requirements becomes an asset latecomers can't catch — unlike general models that only get to \"roughly works.\"" },
      { num: "03", title: "Lower the cost of teaching", desc: "With imitation learning that absorbs work from demonstrations, we compress the biggest bottleneck in robot adoption — the effort of teaching — ending the era of programming motion-by-motion." },
      { num: "04", title: "Fail first in simulation", desc: "We build the Sim2Real bridge in-house, training and validating massively in virtual environments — including dangerous scenarios — before touching real hardware." },
    ],
    areasLabel: "Research Areas",
    areasTitle: "Research themes",
    areasDesc: "We work on the core software domains needed to adapt robots to real-world operations.",
    areas: [
      { tag: "Robot OS", title: "Industry-specific robot OS", desc: "We design the internal software foundation of a robot, embedding a specific industry's procedures, safety standards, and site constraints — vertical workflows layered on a body-agnostic abstraction (HAL).", examples: ["Body-agnostic control abstraction layer", "Vertical task & safety-rule integration", "Remote monitoring & ops dashboard"] },
      { tag: "Imitation Learning", title: "Imitation learning & teaching", desc: "Teach robots tasks from human demonstrations or a few trials with no programming, minimizing the cost of teaching on real sites.", examples: ["Policy learning from demonstrations", "Behavior cloning / diffusion policies", "Task replication from few examples"] },
      { tag: "Reinforcement Learning", title: "Reinforcement learning & locomotion", desc: "We learn quadruped/biped walking and whole-body control policies through trial-and-error on physics simulators like MuJoCo / Isaac for robust motion.", examples: ["Walking & balance policy learning", "Reward design & curriculum learning", "Domain randomization"] },
      { tag: "Sim2Real", title: "Simulation to real hardware", desc: "Bridging tech that closes the domain gap between simulation and real robots, enabling safe on-hardware deployment of learned policies.", examples: ["Physics parameter identification", "Robustification via domain randomization", "Staged on-hardware validation"] },
      { tag: "Perception", title: "Perception & scene understanding", desc: "Understand the site from cameras, LiDAR, and sensors, detecting objects, people, and anomalies — the \"see and understand\" capability inspection and work require.", examples: ["3D point cloud / image recognition", "Anomaly & inspection detection", "Human detection & safe stop"] },
      { tag: "Foundation Models", title: "Robot foundation models", desc: "Fine-tune robot foundation models such as Vision-Language-Action (VLA) to the task, aiming for robots that act on natural-language instructions.", examples: ["Task adaptation of VLA models", "Task execution from instructions", "Multimodal situation understanding"] },
    ],
    processLabel: "Process",
    processTitle: "How we run R&D",
    processDesc: "From problem scoping to simulation training, on-hardware validation, and field deployment — advancing in stages while continuously checking safety and ROI.",
    process: [
      { num: "01", title: "Scoping & Research", en: "Scoping", desc: "Define the target industry/task, automation scope, safety requirements, and KPIs, then survey prior work and feasibility.", duration: "2-4 weeks" },
      { num: "02", title: "Simulation Setup", en: "Simulation", desc: "Reproduce the task in a physics simulator, building a training/evaluation environment with reward design and data pipelines.", duration: "3-6 weeks" },
      { num: "03", title: "Training & Experiments", en: "Training", desc: "Learn policies via imitation/reinforcement learning, measure success rate and robustness across many trials, and prepare for the real gap with domain randomization.", duration: "1-3 months" },
      { num: "04", title: "On-hardware (Sim2Real)", en: "Sim2Real", desc: "Transfer learned policies to real hardware and validate in stages under safety controls, correcting the gap and confirming operation under site conditions.", duration: "1-2 months" },
      { num: "05", title: "Deployment & Improvement", en: "Deployment", desc: "Deploy to the field, collect operational data, and continuously retrain and improve with new tasks and model updates.", duration: "Ongoing" },
    ],
    outputsLabel: "Outputs",
    outputsTitle: "R&D outputs",
    outputsDesc: "We don't stop at papers — we leave behind software that runs on site, plus the assets needed to reproduce and operate it.",
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
      { tag: "Joint Research", title: "Joint research", desc: "Set themes and drive R&D jointly with companies, universities, and research institutions, with IP and outcome terms agreed case by case.", features: ["Co-created themes & roles", "Joint ownership of results/IP", "Mid-to-long-term collaboration"] },
      { tag: "Contract R&D", title: "Contract R&D / PoC", desc: "Feasibility studies for specific tasks, or simulation training through on-hardware PoC, delivered on contract for the technical validation decisions need.", features: ["Technical feasibility validation", "Simulation-to-hardware PoC", "Evaluation report delivery"] },
      { tag: "Advisory", title: "Technical advisory", desc: "For companies considering robotics/ML adoption, we support technology selection and roadmap design hands-on.", features: ["Tech selection & feasibility", "Roadmap design", "Ongoing advisory"] },
    ],
    faqLabel: "FAQ",
    faqTitle: "FAQ",
    faq: [
      { q: "Do you develop the robot hardware too?", a: "Yes — we develop both software and hardware (humanoid exteriors and enclosures), using the world's best platforms (e.g., Unitree) for the base drivetrain while building in-house the control/learning software and site-optimized hardware, with a body-agnostic abstraction layer so we're not locked to a specific machine." },
      { q: "What exactly is an \"industry-specific robot OS\"?", a: "The internal software foundation of a robot, embedding a specific industry's procedures, safety standards, and site constraints by layering vertical workflows on a body-agnostic abstraction." },
      { q: "What is imitation learning and how is it different from programming?", a: "Instead of writing code motion-by-motion, imitation learning teaches robots tasks from demonstrations or a few trials, dramatically lowering the teaching cost that is the biggest bottleneck in adoption." },
      { q: "Will something trained in simulation actually work on real hardware?", a: "We close the Sim2Real gap with domain randomization and physics parameter correction, then validate on real hardware in stages under safety controls, confirming as we deploy." },
      { q: "Which industries are you starting with?", a: "We prioritize areas with high safety requirements and severe labor shortages — starting with industries like energy-facility inspection — with specific themes defined together in discussion." },
      { q: "Can we discuss joint or contract research?", a: "Yes — we collaborate flexibly per theme and team (joint research, contract R&D/PoC, technical advisory); share your challenge and we'll propose feasibility and an approach." },
    ],
    ctaLabel: "Contact",
    ctaTitle: "Let's do robotics and ML research together.",
    ctaDesc: "Tell us your theme or idea — \"could a robot take over this task,\" joint OS development, or Sim2Real — in 30 minutes; joint and contract research inquiries are welcome.",
    ctaButton: "Talk to us about R&D",
  },
};

export default function ResearchPage() {
  const { lang } = useLanguage();
  const t = COPY[lang];
  const diagram = lang === "ja" ? "/images/research-overview.png" : "/images/research-overview-en.png";

  return (
    <>
      {/* MASTHEAD */}
      <section className="bg-white pt-32 lg:pt-40">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            {/* technical meta bar */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-neutral-900 pb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
              <span className="font-bold text-neutral-900">§00</span>
              <span>{t.heroKicker}</span>
              <span className="text-neutral-300">/</span>
              <span>Robotics</span>
              <span className="text-neutral-300">/</span>
              <span>Machine&nbsp;Learning</span>
              <span className="text-neutral-300">/</span>
              <span>Sim2Real</span>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="mt-10 text-[7vw] sm:text-3xl lg:text-4xl font-bold leading-[0.95] tracking-[-0.04em] text-balance text-neutral-900">
              {t.heroTitle}
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-8 mb-14 max-w-2xl text-base lg:text-lg leading-relaxed text-pretty text-neutral-600">{t.heroDesc}</p>
          </Reveal>
          <Reveal delay={260}>
            <figure>
              <a
                href={diagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
                aria-label={lang === "ja" ? "ヒューマノイド開発の全体像（タップで拡大）" : "Humanoid development overview (tap to enlarge)"}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={diagram}
                  alt={lang === "ja" ? "ヒューマノイド開発の全体像：Sim2Realパイプライン、AI/ロボットOS開発、ハードウェア開発、ソフトとハードの両輪" : "Overview of humanoid development: Sim2Real pipeline, AI/Robot OS, hardware development, software-and-hardware dual approach"}
                  loading="lazy"
                  className="w-full h-auto border border-neutral-900 bg-white"
                />
                <figcaption className="flex items-center justify-between border-x border-b border-neutral-900 bg-neutral-50 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-neutral-500">
                  <span>FIG.01 — Humanoid development overview</span>
                  <span className="text-neutral-900 transition-transform duration-300 group-hover:translate-x-0.5">
                    {lang === "ja" ? "拡大 ↗" : "Enlarge ↗"}
                  </span>
                </figcaption>
              </a>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* WHY */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="01" kicker={t.whyLabel} title={t.whyTitle} desc={t.whyDesc} />
          <CardCarousel gridClass="md:grid-cols-2">
            {t.why.map((item, i) => (
              <Reveal key={item.num} delay={i * 80}>
                <div className="group h-full border border-neutral-900 bg-white p-8 lg:p-10 transition-colors duration-300 hover:bg-neutral-900">
                  <div className="flex items-baseline justify-between border-b border-neutral-200 pb-4 transition-colors duration-300 group-hover:border-neutral-700">
                    <span className="font-mono text-2xl font-bold tabular-nums text-neutral-900 transition-colors duration-300 group-hover:text-white">
                      {item.num}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">Why / {item.num}</span>
                  </div>
                  <h3 className="mt-6 text-xl lg:text-2xl font-bold tracking-tight text-balance text-neutral-900 transition-colors duration-300 group-hover:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-pretty text-neutral-600 transition-colors duration-300 group-hover:text-neutral-300">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* AREAS */}
      <section className="py-20 lg:py-28 bg-neutral-50 border-y border-neutral-900">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="02" kicker={t.areasLabel} title={t.areasTitle} desc={t.areasDesc} />
          <CardCarousel gridClass="md:grid-cols-2 lg:grid-cols-3">
            {t.areas.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <div className="flex h-full flex-col border border-neutral-900 bg-white p-7 lg:p-8">
                  <div className="mb-6 flex items-center justify-between border-b border-neutral-200 pb-3">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-900">{item.tag}</span>
                    <span className="font-mono text-[10px] tabular-nums text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mb-3 text-lg lg:text-xl font-bold tracking-tight text-balance text-neutral-900">{item.title}</h3>
                  <p className="mb-6 text-sm leading-relaxed text-pretty text-neutral-600">{item.desc}</p>
                  <ul className="mt-auto space-y-2 font-mono">
                    {item.examples.map((ex) => (
                      <li key={ex} className="flex items-start gap-2 text-xs text-neutral-500">
                        <span className="flex-shrink-0 text-neutral-900">→</span>
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
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="03" kicker={t.processLabel} title={t.processTitle} desc={t.processDesc} />
          {/* table header */}
          <div className="hidden lg:grid grid-cols-12 gap-6 border-b border-neutral-900 pb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
            <div className="col-span-1">No.</div>
            <div className="col-span-3">Phase</div>
            <div className="col-span-6">Detail</div>
            <div className="col-span-2 text-right">Duration</div>
          </div>
          {t.process.map((step, i) => (
            <Reveal key={step.num} delay={i * 60}>
              <div className="group grid grid-cols-1 gap-2 border-b border-neutral-200 py-7 transition-colors duration-300 hover:bg-neutral-50 lg:grid-cols-12 lg:gap-6">
                <div className="lg:col-span-1">
                  <span className="font-mono text-lg font-bold tabular-nums text-neutral-900">{step.num}</span>
                </div>
                <div className="lg:col-span-3">
                  <h3 className="text-lg font-bold tracking-tight text-balance text-neutral-900">{step.title}</h3>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">{step.en}</p>
                </div>
                <div className="lg:col-span-6">
                  <p className="text-[15px] leading-relaxed text-pretty text-neutral-600">{step.desc}</p>
                </div>
                <div className="lg:col-span-2 lg:text-right">
                  <span className="font-mono text-xs tabular-nums text-neutral-700">{step.duration}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* OUTPUTS */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="04" kicker={t.outputsLabel} title={t.outputsTitle} desc={t.outputsDesc} />
          <CardCarousel gridClass="md:grid-cols-2 lg:grid-cols-3">
            {t.outputs.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <div className="group h-full border border-neutral-900 bg-white p-7 lg:p-8 transition-colors duration-300 hover:bg-neutral-900">
                  <span className="mb-4 block font-mono text-xs font-bold tabular-nums text-neutral-400 transition-colors duration-300 group-hover:text-white">
                    OUT.{String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mb-3 text-base lg:text-lg font-bold tracking-tight text-balance text-neutral-900 transition-colors duration-300 group-hover:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-pretty text-neutral-600 transition-colors duration-300 group-hover:text-neutral-300">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* TECH */}
      <section className="py-20 lg:py-28 bg-neutral-50 border-y border-neutral-900">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="05" kicker={t.techLabel} title={t.techTitle} desc={t.techDesc} />
          <div className="border-t border-neutral-900">
            {t.tech.map((item, i) => (
              <Reveal key={item.category} delay={i * 60}>
                <div className="grid grid-cols-1 gap-3 border-b border-neutral-300 py-6 lg:grid-cols-12 lg:gap-8">
                  <div className="lg:col-span-3">
                    <h3 className="flex items-baseline gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-neutral-900">
                      <span className="text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
                      {item.category}
                    </h3>
                  </div>
                  <div className="lg:col-span-9">
                    <ul className="flex flex-wrap gap-2 font-mono text-[13px] text-neutral-700">
                      {item.items.map((s) => (
                        <li key={s} className="border border-neutral-300 bg-white px-2.5 py-1 transition-colors duration-200 hover:border-neutral-900">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ENGAGEMENT */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="06" kicker={t.engageLabel} title={t.engageTitle} desc={t.engageDesc} />
          <CardCarousel gridClass="md:grid-cols-3">
            {t.engage.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="group flex h-full flex-col border border-neutral-900 bg-white p-7 lg:p-8 transition-colors duration-300 hover:bg-neutral-900">
                  <div className="mb-6 flex items-center justify-between border-b border-neutral-200 pb-3 transition-colors duration-300 group-hover:border-neutral-700">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-900 transition-colors duration-300 group-hover:text-white">
                      {item.tag}
                    </span>
                    <span className="font-mono text-[10px] tabular-nums text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mb-3 text-lg lg:text-xl font-bold tracking-tight text-balance text-neutral-900 transition-colors duration-300 group-hover:text-white">
                    {item.title}
                  </h3>
                  <p className="mb-6 text-sm leading-relaxed text-pretty text-neutral-600 transition-colors duration-300 group-hover:text-neutral-300">
                    {item.desc}
                  </p>
                  <ul className="mt-auto space-y-2 border-t border-neutral-200 pt-4 font-mono transition-colors duration-300 group-hover:border-neutral-700">
                    {item.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-neutral-500 transition-colors duration-300 group-hover:text-neutral-400">
                        <span className="flex-shrink-0 text-neutral-900 transition-colors duration-300 group-hover:text-white">→</span>
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
      <section className="py-20 lg:py-28 bg-neutral-50 border-t border-neutral-900">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <SectionHead index="07" kicker={t.faqLabel} title={t.faqTitle} />
          <div className="max-w-3xl border-t border-neutral-900">
            {t.faq.map((item, i) => (
              <Reveal key={i} delay={i * 50}>
                <details className="group border-b border-neutral-300 py-5">
                  <summary className="flex cursor-pointer list-none items-start gap-4 text-base font-semibold text-neutral-900">
                    <span className="mt-0.5 font-mono text-xs tabular-nums text-neutral-400">Q{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex-1">{item.q}</span>
                    <span className="font-mono text-lg leading-none text-neutral-400 transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 pl-9 text-sm leading-relaxed text-pretty text-neutral-600">{item.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-neutral-900 py-24 lg:py-32">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="flex items-center gap-4 border-b border-neutral-700 pb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
              <span className="font-bold text-white">§08</span>
              <span>{t.ctaLabel}</span>
            </div>
            <div className="mt-12 grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <h2 className="text-[18px] sm:text-xl lg:text-2xl font-bold leading-[1.15] sm:leading-[1.05] tracking-[-0.02em] text-balance text-white">{t.ctaTitle}</h2>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-pretty text-neutral-400">{t.ctaDesc}</p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <a
                  href="/reserve"
                  className="group inline-flex items-center gap-3 border border-white bg-white px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.08em] text-neutral-900 transition-[color,background-color,border-color,scale] duration-300 hover:bg-transparent hover:text-white active:scale-[0.96]"
                >
                  {t.ctaButton}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

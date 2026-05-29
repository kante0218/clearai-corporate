"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <p className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-700 mb-5">{children}</p>;
}

type Copy = {
  headerKicker: string;
  headerTitle: string;
  headerDesc: string;
  questionLabel: string;
  questionTitle: string;
  questionP1: string;
  questionP2: string;
  questionP2Bold: string;
  questionP3: string;
  questionP3Bold: string;
  aboutLabel: string;
  aboutTitle: string;
  aboutTitleHighlight: string;
  aboutP1: string;
  aboutP2: string;
  aboutP2Bold: string;
  pillars: { pillar: string; en: string; desc: string }[];
  whyNowLabel: string;
  whyNowTitle: string;
  whyNowP1: string;
  whyNowP2: string;
  whyNowP2Bold: string;
  whyNowP3: string;
  whyNowP3Bold: string;
  coreLabel: string;
  coreTitle: string;
  coreDesc: string;
  challenges: { num: string; title: string; desc: string }[];
  approachLabel: string;
  approachTitle: string;
  approachDesc: string;
  approachSteps: { num: string; title: string; en: string; desc: string }[];
  futureLabel: string;
  futureTitle: string;
  futureP1: string;
  futureP2: string;
  futureP2Bold: string;
  futureP3: string;
  whatWeDoLabel: string;
  whatWeDoTitle: string;
  whatWeDoDesc: string;
  activities: { title: string; desc: string }[];
  whoLabel: string;
  whoTitle: string;
  whoDesc: string;
  audiences: { target: string; en: string; desc: string }[];
  howToJoinLabel: string;
  howToJoinTitle: string;
  howToJoinP1: string;
  howToJoinP2: string;
  joinCtas: { label: string; sub: string }[];
  founderLabel: string;
  founderTitle: string;
  founderP1: string;
  founderP2: string;
  founderP2Bold: string;
  founderP3: string;
  founderAttribution: string;
  closingTitle: string;
  closingTitleHighlight: string;
  closingP1: string;
  closingP2: string;
  closingP2Bold: string;
  closingCta: string;
};

const COPY: Record<"ja" | "en", Copy> = {
  ja: {
    headerKicker: "Kawasemi Project",
    headerTitle: "優秀な若者が、一次産業の未来を継ぐ。",
    headerDesc: "農業、林業、漁業。この国の自然と地域を支えてきた仕事を、次の世代へ手渡すための実践型プロジェクト。",
    questionLabel: "The Question",
    questionTitle: "この国の風景は、\n誰が次の世代へ渡すのか。",
    questionP1: "美しい田畑、手入れされた山、地域に根づいた漁港や集落。それらは自然に残るものではありません。そこには必ず、守り、育て、受け継ぐ人がいます。",
    questionP2: "いま日本では、地方の人口減少、高齢化、後継者不足によって、一次産業の現場そのものが静かに失われつつあります。耕作放棄地が増え、山林の管理は追いつかず、漁村の活気も薄れていく。その変化は単なる産業の衰退ではなく、",
    questionP2Bold: "日本の風景そのものが失われていく",
    questionP3: "けれど本質的な問題は、「価値がない」ことではありません。\n本当に足りていないのは、",
    questionP3Bold: "優秀な人材が本気で向かいたくなる構造",
    aboutLabel: "About the Project",
    aboutTitle: "翡翠プロジェクトは、一次産業に",
    aboutTitleHighlight: "“人材・思想・事業”",
    aboutP1: "翡翠プロジェクトは、優秀な若者を一次産業の現場へ向かわせるためのプロジェクトです。ただ人を送り込むだけではありません。地域の現場に新しい視点と事業感覚を持ち込み、自然を守ることと、持続可能に稼げることを両立させる仕組みまでつくります。",
    aboutP2: "私たちが目指すのは、一次産業を「人手が足りない厳しい仕事」としてではなく、",
    aboutP2Bold: "「次の時代をつくる重要な仕事」",
    pillars: [
      { pillar: "人材", en: "People", desc: "意志ある若者を集め、育て、現場へ送り出す。" },
      { pillar: "産業", en: "Industry", desc: "一次産業を、持続可能で魅力ある仕事へ再設計する。" },
      { pillar: "地域", en: "Region", desc: "自然、文化、共同体を守る担い手を地域に増やす。" },
    ],
    whyNowLabel: "Why Now",
    whyNowTitle: "危機は深い。\nだが、もう一度つくり直せる\n最後のタイミングでもある。",
    whyNowP1: "一次産業の現場では、高齢化が進み、長年培われてきた知恵や技術の継承が難しくなっています。土地、山、海を守るコストは増え続け、従来のやり方だけでは持続できない地域も少なくありません。",
    whyNowP2: "一方で、食の安全、環境、地方回帰、地域の持続可能性への関心は、これまでになく高まっています。社会の価値観が変わりつつある今だからこそ、一次産業は単なる伝統産業ではなく、",
    whyNowP2Bold: "未来志向の仕事として再編集できる余地",
    whyNowP3: "テクノロジー、経営感覚、発信力を持つ若者が現場に入れば、守るだけではなく、育て直すことができる。\n私たちは、",
    whyNowP3Bold: "今がそのための最後の好機",
    coreLabel: "Core Challenges",
    coreTitle: "問題は、現場の努力不足ではない。\n挑戦者が集まり、育ち、残れる構造がないことだ。",
    coreDesc: "一次産業の課題は、単純な労働力不足ではありません。人が入らない、入っても続かない、続いても広がらない。その背景には、複数の構造課題があります。",
    challenges: [
      { num: "01", title: "担い手不足", desc: "若者が挑戦先として一次産業を選びにくく、継承者も不足している。現場に入る前の情報や導線が乏しいため、そもそも候補に上がりにくい。" },
      { num: "02", title: "収益構造の弱さ", desc: "労働負荷の大きさに比べて収入が安定しづらく、価格決定権も弱い。良い仕事をしていても、産業構造として報われにくい場面が多い。" },
      { num: "03", title: "社会的魅力の不足", desc: "本来は高度な判断と知恵が求められる仕事であるにもかかわらず、その魅力が社会に十分伝わっていない。発信、ブランド設計、教育導線が弱く、挑戦先としての存在感が薄い。" },
    ],
    approachLabel: "Our Approach",
    approachTitle: "志だけでは続かない。\nだから、挑戦できる仕組みからつくる。",
    approachDesc: "翡翠プロジェクトは、気合いや善意に頼りません。若者が一次産業に向かい、現場で価値を出し、地域に根づいていくまでの流れを、一つの仕組みとして設計します。",
    approachSteps: [
      { num: "01", title: "発掘する", en: "Discover", desc: "学生、若手社会人、起業志向層など、意味のある挑戦を求める人材に向けて、一次産業を新しいキャリアの選択肢として提示する。興味関心層を可視化し、現場と出会う入口をつくる。" },
      { num: "02", title: "育てる", en: "Cultivate", desc: "現場理解だけでなく、経営、地域理解、事業づくりの視点を育てる。一次産業を「手伝う仕事」ではなく、「未来を担う産業」として捉えられる人材を育成する。" },
      { num: "03", title: "実装する", en: "Implement", desc: "農業、林業、漁業の現場に入り、生産だけでなく、販売、ブランド、観光連携、業務改善、DXなどの観点から事業を前進させる。地域ごとの条件に合わせて、実践的に価値をつくる。" },
      { num: "04", title: "定着させる", en: "Take Root", desc: "単発の体験で終わらせず、地域で住み、働き、続けられる状態まで支援する。地域側とも対話しながら、次世代の担い手が根づく環境を整える。" },
    ],
    futureLabel: "The Future",
    futureTitle: "守るだけではない。\n日本の田舎を、\n次の成長地帯へ変えていく。",
    futureP1: "私たちが目指しているのは、失われゆくものをただ延命することではありません。一次産業を、次の世代が誇りを持って飛び込める仕事へ変えていくことです。",
    futureP2: "若者が地域に入り、自然に向き合い、事業をつくり、地域とともに生きていく。そうした動きが全国に広がれば、田舎は",
    futureP2Bold: "「守るべき過去」ではなく、「未来を生み出す場所」",
    futureP3: "日本の風景を残すことは、過去への執着ではありません。\n次の時代の土台を、自分たちの手でつくり直すことです。",
    whatWeDoLabel: "What We Do",
    whatWeDoTitle: "思想を語るだけでなく、\n現場で動く。",
    whatWeDoDesc: "翡翠プロジェクトでは、地域や現場の条件に応じて、以下のような取り組みを進めていきます。",
    activities: [
      { title: "地域連携", desc: "農家、林業従事者、漁業者、自治体、地域事業者と連携し、課題と可能性を共同で整理する。" },
      { title: "実地プログラム", desc: "若手人材が現場に入り、仕事を体験しながら、地域のリアルな課題と向き合う機会をつくる。" },
      { title: "事業改善", desc: "収益構造、販路、ブランド、運営体制などを見直し、産業として続く形を設計する。" },
      { title: "発信とブランド化", desc: "地域の魅力や産品の価値を、外に伝わる言葉と形に変え、挑戦先としての魅力を高める。" },
      { title: "技術導入と業務改善", desc: "テクノロジーや新しいオペレーションを取り入れ、現場の負担を減らしながら、生産性と持続性を高める。" },
    ],
    whoLabel: "Who We Work With",
    whoTitle: "この挑戦は、一部の専門家だけのものではない。",
    whoDesc: "翡翠プロジェクトは、志ある若者だけでなく、地域の現場、支援したい企業や個人とともにつくるプロジェクトです。",
    audiences: [
      { target: "若者へ", en: "For Youth", desc: "大きな意味のある仕事がしたい。都会の競争だけではない生き方を探している。自然、地域、食、環境、経営に関心がある。そんな人にとって、一次産業は想像以上に大きな挑戦の場になり得ます。" },
      { target: "地域・事業者へ", en: "For Regions", desc: "後継者がいない、新しい担い手がほしい、外の視点や若い力を受け入れたい。そんな地域や現場と、私たちは長く続く関係をつくりたいと考えています。" },
      { target: "支援者・企業へ", en: "For Partners", desc: "地域や自然を守る実践に関わりたい、人材育成や地域共創に取り組みたい、社会的インパクトのある挑戦を支えたい。そんな企業や個人にとっても、翡翠プロジェクトは具体的に関われる場になります。" },
    ],
    howToJoinLabel: "How to Join",
    howToJoinTitle: "関わり方は、\n一つではありません。",
    howToJoinP1: "翡翠プロジェクトは、志ある個人、地域、企業との出会いから始まります。少しでも関心があれば、まずは気軽に声をかけてください。",
    howToJoinP2: "参加、連携、支援、相談。\n立場が違っても、この挑戦に加わる方法はあります。",
    joinCtas: [
      { label: "参加したい", sub: "Join the project" },
      { label: "地域として連携したい", sub: "Regional partnership" },
      { label: "企業として支援したい", sub: "Corporate support" },
      { label: "まずは話を聞いてみたい", sub: "Just listen first" },
    ],
    founderLabel: "Founder's Message",
    founderTitle: "なぜ、いまこの挑戦を始めるのか。",
    founderP1: "日本の自然や田舎は、放っておけば残るものではありません。守り、育て、次の世代に手渡す人がいて、はじめて残っていくものです。",
    founderP2: "けれど今、その役割を担う人が足りていません。本来なら、能力も志もある若者たちが向かうべき場所の一つが、一次産業の現場であるはずです。そこには、",
    founderP2Bold: "国土を守る仕事があり、地域を支える仕事があり、未来をつくる仕事があります。",
    founderP3: "私は、優秀な若者がもっと自然に、もっと本気で、一次産業を目指せる社会をつくりたいと考えています。\n翡翠プロジェクトは、そのための最初の一歩です。",
    founderAttribution: "clearAI株式会社 代表取締役　髙橋 敢輝",
    closingTitle: "日本の自然は、\n自然のままでは残りません。",
    closingTitleHighlight: "守る人が必要です。",
    closingP1: "次の時代のエリートが向かうべき場所は、\nまだ都会だけではありません。",
    closingP2: "田舎を守ることは、過去を守ることではない。",
    closingP2Bold: "未来をつくることです。",
    closingCta: "翡翠プロジェクトに加わる",
  },
  en: {
    headerKicker: "Kawasemi (Kingfisher) Project",
    headerTitle: "Talented young people inherit the future of primary industries.",
    headerDesc: "Agriculture, forestry, fisheries. A hands-on project to pass the work that has sustained Japan's nature and communities to the next generation.",
    questionLabel: "The Question",
    questionTitle: "Who will hand Japan's landscapes\nto the next generation?",
    questionP1: "Beautiful farmland, well-tended mountains, fishing ports and villages rooted in local life. These do not remain on their own. There must always be people who protect, nurture, and pass them on.",
    questionP2: "Today in Japan, rural depopulation, an aging population, and a shortage of successors are quietly eroding the very fabric of primary industries. Abandoned farmland is growing, forest management cannot keep up, and the vitality of fishing villages is fading. This change is more than the decline of an industry — it means ",
    questionP2Bold: "Japan's landscapes themselves are being lost",
    questionP3: "Yet the fundamental problem is not that there is no value.\nWhat is truly lacking is ",
    questionP3Bold: "a structure that makes talented people genuinely want to commit",
    aboutLabel: "About the Project",
    aboutTitle: "The Kawasemi (Kingfisher) Project brings",
    aboutTitleHighlight: "“people, vision, and business”",
    aboutP1: "The Kawasemi (Kingfisher) Project exists to direct talented young people toward the field of primary industries — not merely sending people in, but bringing new perspectives and business sensibility to local sites, and building a system that reconciles protecting nature with earning a sustainable livelihood.",
    aboutP2: "Our goal is to redefine primary industries not as 'hard work with too few hands,' but as ",
    aboutP2Bold: "\"important work that shapes the next era\"",
    pillars: [
      { pillar: "People", en: "People", desc: "Gather, develop, and send purposeful young people into the field." },
      { pillar: "Industry", en: "Industry", desc: "Redesign primary industries into sustainable, appealing careers." },
      { pillar: "Region", en: "Region", desc: "Increase stewards of nature, culture, and community in regions across Japan." },
    ],
    whyNowLabel: "Why Now",
    whyNowTitle: "The crisis is deep.\nYet it is also the last moment\nwhen we can rebuild.",
    whyNowP1: "In primary industries, aging is advancing and the transfer of accumulated wisdom and skills is becoming harder. The cost of stewarding land, mountains, and sea keeps rising — and many communities can no longer sustain themselves with traditional approaches alone.",
    whyNowP2: "At the same time, interest in food safety, the environment, regional return, and local sustainability has never been higher. Precisely because social values are shifting, primary industries hold ",
    whyNowP2Bold: "room to be reimagined as forward-looking work",
    whyNowP3: "When young people with technology, business acumen, and communication skills enter the field, they can do more than preserve — they can rebuild.\nWe believe ",
    whyNowP3Bold: "now is the last best opportunity to do so",
    coreLabel: "Core Challenges",
    coreTitle: "The problem is not a lack of effort on the ground.\nIt is the absence of a structure where challengers can gather, grow, and stay.",
    coreDesc: "The challenges of primary industries are not simply a labor shortage. People don't enter; those who enter don't stay; those who stay don't expand. Behind that lie multiple structural problems.",
    challenges: [
      { num: "01", title: "Shortage of successors", desc: "Young people find it hard to choose primary industries as a place to challenge themselves, and successors are in short supply. Limited information and pathways before entering the field mean it rarely comes up as an option." },
      { num: "02", title: "Weak revenue structure", desc: "Income is unstable relative to the workload, and pricing power is limited. There are many situations where good work is done but the industrial structure does not reward it." },
      { num: "03", title: "Insufficient social appeal", desc: "Despite being work that demands sophisticated judgment and deep knowledge, its appeal is not adequately conveyed to society. Communication, brand design, and educational pathways are weak, making it a low-profile destination for challengers." },
    ],
    approachLabel: "Our Approach",
    approachTitle: "Aspiration alone doesn't sustain.\nSo we build the structure for challenge first.",
    approachDesc: "The Kawasemi (Kingfisher) Project does not rely on determination or goodwill. We design the entire arc — from young people moving toward primary industries, creating value on the ground, and taking root in communities — as a single system.",
    approachSteps: [
      { num: "01", title: "Discover", en: "Discover", desc: "Present primary industries as a new career option to people seeking meaningful challenge — students, young professionals, aspiring entrepreneurs. Make interested people visible and create entry points to meet the field." },
      { num: "02", title: "Cultivate", en: "Cultivate", desc: "Develop not only field understanding but also perspectives on management, regional insight, and venture building. Nurture people who can see primary industries not as 'helping work' but as 'industries that carry the future.'" },
      { num: "03", title: "Implement", en: "Implement", desc: "Enter the fields of agriculture, forestry, and fisheries — and advance the business not only through production, but through sales, branding, tourism linkage, operational improvement, and DX. Create value practically, adapted to each region's conditions." },
      { num: "04", title: "Take Root", en: "Take Root", desc: "Support people not just through one-off experiences, but until they can live, work, and continue in the community. Engage in dialogue with the local side to create an environment where next-generation stewards can put down roots." },
    ],
    futureLabel: "The Future",
    futureTitle: "Not only to preserve.\nTo transform Japan's rural areas\ninto the next growth zones.",
    futureP1: "What we are aiming for is not merely prolonging what is being lost. It is transforming primary industries into work that the next generation can enter with pride.",
    futureP2: "When young people enter regions, engage with nature, build businesses, and live alongside communities — and when that movement spreads across Japan — rural areas will shift from ",
    futureP2Bold: "\"a past to be preserved\" to \"a place that generates the future\"",
    futureP3: "Preserving Japan's landscapes is not attachment to the past.\nIt is rebuilding the foundation of the next era with our own hands.",
    whatWeDoLabel: "What We Do",
    whatWeDoTitle: "Not just talking about vision —\nmoving on the ground.",
    whatWeDoDesc: "In the Kawasemi (Kingfisher) Project, we pursue initiatives like the following, tailored to the conditions of each region and site.",
    activities: [
      { title: "Regional collaboration", desc: "Partner with farmers, forestry workers, fishers, local governments, and regional businesses to jointly map challenges and possibilities." },
      { title: "Field programs", desc: "Create opportunities for young talent to enter the field, experience the work firsthand, and face the real challenges of each region." },
      { title: "Business improvement", desc: "Review revenue structure, sales channels, branding, and operational setup — designing forms that allow the industry to continue." },
      { title: "Communication and branding", desc: "Transform the appeal of regional assets and products into words and forms that resonate externally — raising visibility as a destination for challengers." },
      { title: "Technology and operational improvement", desc: "Introduce technology and new operations to reduce field burden while raising productivity and sustainability." },
    ],
    whoLabel: "Who We Work With",
    whoTitle: "This challenge is not just for specialists.",
    whoDesc: "The Kawasemi (Kingfisher) Project is built not only with purposeful young people, but together with local communities, companies, and individuals who want to support.",
    audiences: [
      { target: "For young people", en: "For Youth", desc: "You want to do meaningful work. You are looking for a way of life beyond urban competition. You are interested in nature, community, food, the environment, and business. For such people, primary industries can become a far larger arena for challenge than imagined." },
      { target: "For regions and operators", en: "For Regions", desc: "No successor, wanting new stewards, ready to accept outside perspectives and young energy. With communities and sites like this, we want to build lasting relationships." },
      { target: "For supporters and companies", en: "For Partners", desc: "You want to be involved in protecting local nature, to pursue talent development and regional co-creation, to support challenges with social impact. For companies and individuals like this, the Kawasemi (Kingfisher) Project offers a concrete place to engage." },
    ],
    howToJoinLabel: "How to Join",
    howToJoinTitle: "There is more than one\nway to get involved.",
    howToJoinP1: "The Kawasemi (Kingfisher) Project begins with encounters — with purposeful individuals, communities, and companies. If you have even a little interest, please feel free to reach out first.",
    howToJoinP2: "Participation, partnership, support, consultation.\nWhatever your position, there is a way to join this challenge.",
    joinCtas: [
      { label: "I want to participate", sub: "Join the project" },
      { label: "Partner with us as a region", sub: "Regional partnership" },
      { label: "Support us as a company", sub: "Corporate support" },
      { label: "Just hear more first", sub: "Just listen first" },
    ],
    founderLabel: "Founder's Message",
    founderTitle: "Why we are starting this challenge now.",
    founderP1: "Japan's nature and rural areas do not remain if left alone. They persist only when there are people who protect, nurture, and pass them to the next generation.",
    founderP2: "Yet today, there are not enough people to play that role. Primary industries should naturally be one of the destinations for talented, driven young people. There, ",
    founderP2Bold: "there is work to protect the nation's land, work to support communities, and work to build the future.",
    founderP3: "I want to create a society where talented young people can pursue primary industries more naturally, and with greater seriousness.\nThe Kawasemi (Kingfisher) Project is the first step toward that.",
    founderAttribution: "clearAI Inc., CEO  Kanki Takahashi",
    closingTitle: "Japan's nature does not remain\non its own.",
    closingTitleHighlight: "It needs people to protect it.",
    closingP1: "The place where the next era's leaders should go\nis not only the city.",
    closingP2: "Protecting rural Japan is not protecting the past.",
    closingP2Bold: "It is building the future.",
    closingCta: "Join the Kawasemi (Kingfisher) Project",
  },
};

export default function KawasemiPage() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  return (
    <>
      {/* PAGE HEADER */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <p className="text-sm font-semibold text-emerald-600 mb-3">{t.headerKicker}</p>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">{t.headerTitle}</h1>
          <p className="text-base text-gray-600 leading-relaxed max-w-2xl">{t.headerDesc}</p>
        </div>
      </section>

      {/* SECTION 2 — The Question */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.questionLabel}</Label>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-[1.4] mb-10">
              {lang === "ja" ? (
                <>この国の風景は、<br />誰が次の世代へ渡すのか。</>
              ) : (
                <>Who will hand Japan&apos;s landscapes<br />to the next generation?</>
              )}
            </h2>
            <div className="space-y-6 text-base md:text-[17px] text-gray-700 leading-[2]">
              <p>{t.questionP1}</p>
              <p>
                {t.questionP2}<span className="font-semibold text-gray-900">{t.questionP2Bold}</span>
                {lang === "ja" ? "ことを意味します。" : "."}
              </p>
              <p className="pt-2">
                {lang === "ja" ? (
                  <>
                    けれど本質的な問題は、「価値がない」ことではありません。<br />
                    本当に足りていないのは、<span className="font-semibold text-emerald-700">{t.questionP3Bold}</span>です。
                  </>
                ) : (
                  <>
                    Yet the fundamental problem is not that there is no value.<br />
                    What is truly lacking is <span className="font-semibold text-emerald-700">{t.questionP3Bold}</span>.
                  </>
                )}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 3 — About the Project */}
      <section id="about" className="py-24 lg:py-32 bg-[#f7f9f7]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.aboutLabel}</Label>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-[1.5] mb-10 max-w-3xl">
              {lang === "ja" ? (
                <>
                  翡翠プロジェクトは、一次産業に<br className="hidden md:block" />
                  <span className="text-emerald-700">&ldquo;人材・思想・事業&rdquo;</span>を流し込む挑戦です。
                </>
              ) : (
                <>
                  The Kawasemi (Kingfisher) Project brings<br className="hidden md:block" />
                  <span className="text-emerald-700">&ldquo;people, vision, and business&rdquo;</span> to primary industries.
                </>
              )}
            </h2>
            <div className="space-y-6 text-base text-gray-700 leading-[2] max-w-3xl mb-16">
              <p>{t.aboutP1}</p>
              <p>
                {t.aboutP2}<span className="font-semibold text-gray-900">{t.aboutP2Bold}</span>
                {lang === "ja" ? "として再定義することです。" : " — and to redefine it as such."}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.pillars.map((item, i) => (
              <Reveal key={item.en} delay={i * 120}>
                <div className="bg-white rounded-2xl border border-gray-200 p-10 h-full hover:shadow-lg hover:border-emerald-200 transition-all duration-500">
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-700 mb-4">{item.en}</p>
                  <h3 className="text-3xl font-bold text-gray-900 mb-5">{item.pillar}</h3>
                  <p className="text-sm text-gray-600 leading-[2]">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — Why Now */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.whyNowLabel}</Label>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-[1.4] mb-10">
              {lang === "ja" ? (
                <>危機は深い。<br />だが、もう一度つくり直せる<br />最後のタイミングでもある。</>
              ) : (
                <>The crisis is deep.<br />Yet it is also the last moment<br />when we can rebuild.</>
              )}
            </h2>
            <div className="space-y-6 text-base md:text-[17px] text-gray-700 leading-[2]">
              <p>{t.whyNowP1}</p>
              <p>
                {t.whyNowP2}<span className="font-semibold text-gray-900">{t.whyNowP2Bold}</span>
                {lang === "ja" ? "があります。" : "."}
              </p>
              <p>
                {lang === "ja" ? (
                  <>
                    テクノロジー、経営感覚、発信力を持つ若者が現場に入れば、守るだけではなく、育て直すことができる。
                    <br />
                    私たちは、<span className="font-semibold text-emerald-700">{t.whyNowP3Bold}</span>だと考えています。
                  </>
                ) : (
                  <>
                    When young people with technology, business acumen, and communication skills enter the field, they can do more than preserve — they can rebuild.
                    <br />
                    We believe <span className="font-semibold text-emerald-700">{t.whyNowP3Bold}</span>.
                  </>
                )}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 5 — Core Challenges */}
      <section className="py-24 lg:py-32 bg-[#f7f9f7]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.coreLabel}</Label>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-[1.5] mb-8 max-w-3xl">
              {lang === "ja" ? (
                <>問題は、現場の努力不足ではない。<br />挑戦者が集まり、育ち、残れる構造がないことだ。</>
              ) : (
                <>The problem is not a lack of effort on the ground.<br />It is the absence of a structure where challengers can gather, grow, and stay.</>
              )}
            </h2>
            <p className="text-base text-gray-700 leading-[2] max-w-3xl mb-16">{t.coreDesc}</p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.challenges.map((item, i) => (
              <Reveal key={item.num} delay={i * 120}>
                <div className="bg-white rounded-2xl border border-gray-200 p-9 h-full hover:shadow-lg transition-all duration-500">
                  <span className="text-sm font-bold text-emerald-700">{item.num}</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-3 mb-5">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-[2]">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — Our Approach */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.approachLabel}</Label>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-[1.5] mb-8 max-w-3xl">
              {lang === "ja" ? (
                <>志だけでは続かない。<br />だから、挑戦できる仕組みからつくる。</>
              ) : (
                <>Aspiration alone doesn&apos;t sustain.<br />So we build the structure for challenge first.</>
              )}
            </h2>
            <p className="text-base text-gray-700 leading-[2] max-w-3xl mb-16">{t.approachDesc}</p>
          </Reveal>

          {t.approachSteps.map((step, i) => (
            <Reveal key={step.num} delay={i * 80}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-12 border-b border-gray-200 last:border-0">
                <div className="lg:col-span-2">
                  <span className="text-sm font-bold text-emerald-700">Step {step.num}</span>
                </div>
                <div className="lg:col-span-3">
                  <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                  <p className="text-sm text-gray-400 mt-1.5 tracking-wide">{step.en}</p>
                </div>
                <div className="lg:col-span-7">
                  <p className="text-base text-gray-700 leading-[2]">{step.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SECTION 7 — The Future */}
      <section className="py-24 lg:py-36 bg-[#0a1410] relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(20,83,45,0.45) 0%, rgba(0,0,0,0) 70%), radial-gradient(circle at 80% 30%, rgba(45,212,191,0.15) 0%, transparent 50%)",
          }}
        />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-300 mb-5">{t.futureLabel}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-[1.4] mb-12">
              {lang === "ja" ? (
                <>守るだけではない。<br />日本の田舎を、<br />次の成長地帯へ変えていく。</>
              ) : (
                <>Not only to preserve.<br />To transform Japan&apos;s rural areas<br />into the next growth zones.</>
              )}
            </h2>
            <div className="space-y-6 text-base md:text-[17px] text-gray-300 leading-[2]">
              <p>{t.futureP1}</p>
              <p>
                {t.futureP2}<span className="font-semibold text-emerald-200">{t.futureP2Bold}</span>
                {lang === "ja" ? "へ変わっていきます。" : "."}
              </p>
              <p>
                {lang === "ja" ? (
                  <>
                    日本の風景を残すことは、過去への執着ではありません。
                    <br />
                    次の時代の土台を、自分たちの手でつくり直すことです。
                  </>
                ) : (
                  <>
                    Preserving Japan&apos;s landscapes is not attachment to the past.
                    <br />
                    It is rebuilding the foundation of the next era with our own hands.
                  </>
                )}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 8 — What We Do */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.whatWeDoLabel}</Label>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-[1.5] mb-8 max-w-3xl">
              {lang === "ja" ? (
                <>思想を語るだけでなく、<br className="hidden md:block" />現場で動く。</>
              ) : (
                <>Not just talking about vision —<br className="hidden md:block" />moving on the ground.</>
              )}
            </h2>
            <p className="text-base text-gray-700 leading-[2] max-w-3xl mb-16">{t.whatWeDoDesc}</p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {t.activities.map((item, i) => (
              <Reveal key={item.title} delay={i * 90}>
                <div className="rounded-2xl border border-gray-200 bg-white p-8 h-full hover:shadow-lg hover:border-emerald-200 transition-all duration-500">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-[2]">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9 — Who We Work With */}
      <section className="py-24 lg:py-32 bg-[#f7f9f7]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.whoLabel}</Label>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-[1.5] mb-8 max-w-3xl">
              {t.whoTitle}
            </h2>
            <p className="text-base text-gray-700 leading-[2] max-w-3xl mb-16">{t.whoDesc}</p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.audiences.map((item, i) => (
              <Reveal key={item.en} delay={i * 120}>
                <div className="bg-white rounded-2xl border border-gray-200 p-9 h-full hover:shadow-lg hover:border-emerald-200 transition-all duration-500 flex flex-col">
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-700 mb-3">{item.en}</p>
                  <h3 className="text-xl font-bold text-gray-900 mb-5">{item.target}</h3>
                  <p className="text-sm text-gray-600 leading-[2] flex-1">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10 — How to Join */}
      <section id="join" className="py-24 lg:py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.howToJoinLabel}</Label>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-[1.4] mb-10">
              {lang === "ja" ? (
                <>関わり方は、<br />一つではありません。</>
              ) : (
                <>There is more than one<br />way to get involved.</>
              )}
            </h2>
            <div className="space-y-6 text-base md:text-[17px] text-gray-700 leading-[2] mb-12">
              <p>{t.howToJoinP1}</p>
              <p>
                {lang === "ja" ? (
                  <>
                    参加、連携、支援、相談。
                    <br />
                    立場が違っても、この挑戦に加わる方法はあります。
                  </>
                ) : (
                  <>
                    Participation, partnership, support, consultation.
                    <br />
                    Whatever your position, there is a way to join this challenge.
                  </>
                )}
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {t.joinCtas.map((cta) => (
                <a
                  key={cta.label}
                  href="/contact"
                  className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white px-6 py-5 hover:border-emerald-300 hover:shadow-md transition-all duration-300"
                >
                  <div>
                    <p className="text-base font-semibold text-gray-900">{cta.label}</p>
                    <p className="text-xs text-gray-500 mt-1 tracking-wide">{cta.sub}</p>
                  </div>
                  <span className="text-emerald-600 group-hover:translate-x-1 transition-transform">→</span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 11 — Founder's Message */}
      <section className="py-24 lg:py-32 bg-[#f7f9f7]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>{t.founderLabel}</Label>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-[1.4] mb-12">
              {t.founderTitle}
            </h2>
            <div className="space-y-6 text-base md:text-[17px] text-gray-700 leading-[2]">
              <p>{t.founderP1}</p>
              <p>
                {t.founderP2}<span className="font-semibold text-gray-900">{t.founderP2Bold}</span>
              </p>
              <p>
                {lang === "ja" ? (
                  <>
                    私は、優秀な若者がもっと自然に、もっと本気で、一次産業を目指せる社会をつくりたいと考えています。
                    <br />
                    翡翠プロジェクトは、そのための最初の一歩です。
                  </>
                ) : (
                  <>
                    I want to create a society where talented young people can pursue primary industries more naturally, and with greater seriousness.
                    <br />
                    The Kawasemi (Kingfisher) Project is the first step toward that.
                  </>
                )}
              </p>
              <p className="pt-4 text-sm text-gray-500">
                {t.founderAttribution}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 12 — Closing */}
      <section className="py-28 lg:py-40 bg-[#0a1410] relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(20,83,45,0.5) 0%, rgba(0,0,0,0) 70%)",
          }}
        />
        <div className="max-w-3xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-[1.5] mb-12 [text-shadow:0_2px_24px_rgba(0,0,0,0.6)]">
              {lang === "ja" ? (
                <>
                  日本の自然は、<br />
                  自然のままでは残りません。<br />
                  <span className="text-emerald-300">守る人が必要です。</span>
                </>
              ) : (
                <>
                  Japan&apos;s nature does not remain<br />
                  on its own.<br />
                  <span className="text-emerald-300">It needs people to protect it.</span>
                </>
              )}
            </h2>
            <div className="space-y-5 text-base md:text-lg text-gray-300 leading-[2] mb-14">
              <p>
                {lang === "ja" ? (
                  <>
                    次の時代のエリートが向かうべき場所は、<br />
                    まだ都会だけではありません。
                  </>
                ) : (
                  <>
                    The place where the next era&apos;s leaders should go<br />
                    is not only the city.
                  </>
                )}
              </p>
              <p>
                {lang === "ja" ? (
                  <>
                    田舎を守ることは、過去を守ることではない。<br />
                    <span className="font-semibold text-white">未来をつくることです。</span>
                  </>
                ) : (
                  <>
                    Protecting rural Japan is not protecting the past.<br />
                    <span className="font-semibold text-white">It is building the future.</span>
                  </>
                )}
              </p>
            </div>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 text-white font-semibold px-9 py-4 hover:bg-emerald-400 shadow-[0_0_50px_rgba(16,185,129,0.4)] transition-all duration-300"
            >
              {t.closingCta}
              <span>→</span>
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

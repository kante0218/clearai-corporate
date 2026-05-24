"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

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
  return <p className="text-sm font-semibold text-sky-600 mb-4">{children}</p>;
}

export default function HumanoidPage() {
  return (
    <>
      {/* PAGE HEADER */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <p className="text-sm font-semibold text-sky-600 mb-3">Humanoid Exterior</p>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">ヒューマノイド外装</h1>
          <p className="text-base text-gray-600 leading-relaxed max-w-2xl">家庭・店舗・オフィスに溶け込む、ヒューマノイドの「顔」をつくります。デザインから試作・小ロット製造・量産支援まで一気通貫で。中身（制御・ハード）は問わず、外装だけを受託します。</p>
        </div>
      </section>

      {/* WHY */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Why Exterior</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-snug mb-6 max-w-2xl">中身は良いのに、外装で売れない。</h2>
            <p className="text-base text-gray-600 leading-relaxed max-w-2xl mb-12">ヒューマノイドは「人と同じ空間で動く」道具です。性能や知能と同じだけ、見た目・触感・素材感が体験を決めます。clearAIは、製品として現場に置ける外装を、デザインから量産まで責任を持って仕上げます。</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "試作の樹脂むき出しから卒業したい", desc: "PoCを越えて販売・PR・展示会に出すには、研究開発レベルでない外装が必要。" },
              { title: "デザインと製造の橋渡しができない", desc: "デザイナーは描けても量産設計に落とせない。社内で完結できず外装だけが進まない。" },
              { title: "小ロットから量産まで通して頼みたい", desc: "1台の試作と100台量産で別ベンダーに分けるとコスト・品質・納期が崩れる。" },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="rounded-2xl border border-gray-200 bg-white p-8 hover:shadow-lg transition-all duration-300 h-full">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>What We Do</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-14">提供する内容</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { num: "01", title: "外装デザイン", desc: "コンセプトスケッチ、3Dモデリング、カラー&マテリアル提案まで。ブランド・設置環境・対象ユーザーから逆算した造形を設計します。" },
              { num: "02", title: "量産設計・DFM", desc: "デザインを「実際に作れる」形に落とし込みます。分割線・嵌合・締結方式・組立順序まで含めて図面化。" },
              { num: "03", title: "試作・小ロット製造", desc: "3Dプリント、真空注型、切削、ペイント仕上げ。展示会・PR・営業デモに耐える完成度で短期に立ち上げ。" },
              { num: "04", title: "量産・サプライチェーン構築", desc: "射出成形・板金・塗装の量産ラインを国内外で構築。台数規模に応じた最適な製法選定と原価設計まで支援。" },
            ].map((item, i) => (
              <Reveal key={item.num} delay={i * 100}>
                <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:border-sky-200 hover:shadow-lg transition-all duration-300">
                  <span className="text-sm font-bold text-sky-600">{item.num}</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-3 mb-4">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>Process</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-14">プロジェクトの流れ</h2>
          </Reveal>
          {[
            { num: "01", title: "ヒアリング・要件整理", en: "Discovery", desc: "ロボットの用途・置かれる空間・既存メカ仕様・販売台数のイメージを整理します（無料・60〜90分）。" },
            { num: "02", title: "コンセプト提案", en: "Concept", desc: "2〜3案のスケッチ＋ムードボードを提示。世界観・触感・素材方向性をすり合わせます。" },
            { num: "03", title: "デザイン詳細化・3Dモデリング", en: "Design", desc: "確定コンセプトを3Dで詰めます。既存メカへの干渉、組立、メンテナンス性まで踏まえた造形に落とし込み。" },
            { num: "04", title: "試作・評価", en: "Prototype", desc: "実物を起こし、嵌合・剛性・印象を評価。撮影・展示・営業デモにも使える品質で仕上げます。" },
            { num: "05", title: "量産立ち上げ", en: "Production", desc: "金型・治具・サプライヤー選定、初期ロット品質管理まで伴走。継続生産フェーズへ橋渡しします。" },
          ].map((step, i) => (
            <Reveal key={step.num} delay={i * 100}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-10 border-b border-gray-100 last:border-0">
                <div className="lg:col-span-1"><span className="text-sm font-bold text-sky-600">{step.num}</span></div>
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
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <Label>FAQ</Label>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-14">よくあるご質問</h2>
          </Reveal>
          <div className="max-w-3xl">
            {[
              { q: "中身（モーター・制御）は持っていません。外装だけ頼めますか？", a: "問題ありません。逆に「中身は他社製・外装だけclearAI」というケースが多いです。既存メカの3Dデータ／寸法図をご提供いただければ、それに合わせて外装を設計します。" },
              { q: "1台だけの試作も対応できますか？", a: "対応可能です。展示会・営業デモ・撮影用など、目的に応じた仕上げで1台から制作します。量産前提のないアート/PR用途も受託しています。" },
              { q: "想定サイズや形状は？", a: "卓上サイズの小型ロボットから、人型サイズ（〜160cm程度）まで対応します。等身大を超える大型は別途ご相談ください。" },
              { q: "デザインだけ、製造だけ、の切り出しは可能ですか？", a: "可能です。「他社デザインを量産に落とす」「自社製造前提でデザインだけ欲しい」など、フェーズを切り出した受託にも対応します。" },
              { q: "費用感を教えてください。", a: "デザインフェーズで数十万円〜、試作1台で百万円前後、量産は台数・製法で大きく変動します。初回ヒアリング後に概算をご提示します。" },
              { q: "NDAには対応していますか？", a: "もちろんです。初回ヒアリングの前段で相互NDAを締結できます。未公開プロジェクトの相談も歓迎します。" },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 80}>
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
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Reveal>
            <Label>Contact</Label>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">ヒューマノイドの「外側」を、製品レベルへ。</h2>
            <p className="text-base text-gray-600 leading-relaxed mb-10">既存メカの3Dデータがあれば、初回ヒアリングだけで概算レンジまでお伝えできます。まずはお気軽にご相談ください。</p>
            <a href="/contact" className="rounded-lg bg-sky-600 text-white font-semibold px-10 py-4 hover:bg-sky-700 transition-colors duration-300 inline-block">無料で相談する</a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

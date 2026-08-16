import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hero Mecha Preview — ClearAI",
  description: "Hero video preview (3D mecha turntable, 8s loop)",
  robots: { index: false, follow: false },
};

export default function HeroMechaPreviewPage() {
  return (
    <main className="relative min-h-screen bg-[#02030a] text-white overflow-hidden">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/videos/hero-mecha-poster.jpg"
        >
          <source src="/videos/hero-mecha.webm" type="video/webm" />
          <source src="/videos/hero-mecha.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <span className="inline-block rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white px-3 py-1 text-sm font-semibold mb-6">
            AI Consulting &amp; Robotics
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6 drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)]">
            日本の中小企業に、
            <br />
            使えるAIと実装力を。
          </h1>
          <p className="text-base md:text-lg text-white/85 leading-relaxed max-w-lg mx-auto mb-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            AI顧問・研修・コンサルからWeb制作まで、戦略から実装まで支援します。
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-lg bg-neutral-900 text-white font-semibold px-8 py-3.5 hover:bg-neutral-800 transition-colors duration-300"
            >
              お問い合わせ
            </Link>
            <Link
              href="/"
              className="text-sm text-white/70 font-semibold hover:text-white transition-colors duration-300"
            >
              トップへ戻る →
            </Link>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 z-10 rounded-md bg-black/50 backdrop-blur text-[11px] text-white/70 px-3 py-1.5">
          PREVIEW — 本番ヒーロー差し替え判断用ページ（noindex）
        </div>
      </section>
    </main>
  );
}

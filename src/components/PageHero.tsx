"use client";

import { useEffect, useState, type ReactNode } from "react";

type Accent = "blue" | "sky" | "orange" | "amber";

const ACCENTS: Record<Accent, {
  chip: string;
  cta: string;
  ctaShadow: string;
  link: string;
  glow1: string;
  glow2: string;
}> = {
  blue: {
    chip: "bg-blue-50 text-blue-700 border-blue-100",
    cta: "bg-blue-600 hover:bg-blue-700",
    ctaShadow: "shadow-[0_8px_24px_-8px_rgba(37,99,235,0.5)]",
    link: "hover:text-blue-600",
    glow1: "bg-blue-500",
    glow2: "bg-indigo-400",
  },
  sky: {
    chip: "bg-sky-50 text-sky-700 border-sky-100",
    cta: "bg-sky-600 hover:bg-sky-700",
    ctaShadow: "shadow-[0_8px_24px_-8px_rgba(2,132,199,0.5)]",
    link: "hover:text-sky-600",
    glow1: "bg-sky-500",
    glow2: "bg-cyan-400",
  },
  orange: {
    chip: "bg-orange-50 text-orange-700 border-orange-100",
    cta: "bg-orange-500 hover:bg-orange-600",
    ctaShadow: "shadow-[0_8px_24px_-8px_rgba(249,115,22,0.5)]",
    link: "hover:text-orange-600",
    glow1: "bg-orange-400",
    glow2: "bg-amber-400",
  },
  amber: {
    chip: "bg-amber-50 text-amber-700 border-amber-100",
    cta: "bg-amber-500 hover:bg-amber-600",
    ctaShadow: "shadow-[0_8px_24px_-8px_rgba(245,158,11,0.5)]",
    link: "hover:text-amber-600",
    glow1: "bg-amber-400",
    glow2: "bg-orange-300",
  },
};

export type PageHeroProps = {
  /** Small eyebrow text, rendered as a pill chip (e.g. "AI Consulting & DX"). */
  kicker: string;
  /** Optional secondary badge chip (e.g. "Coming soon"). */
  badge?: string;
  title: ReactNode;
  desc: ReactNode;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  accent?: Accent;
  /** Localized "Scroll" hint shown at the bottom of the full-height hero. */
  scrollLabel?: string;
};

/**
 * Full-viewport, centered hero shared across all sub-pages.
 * Mirrors the homepage hero so every page "uses the full screen" consistently.
 */
export default function PageHero({
  kicker,
  badge,
  title,
  desc,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  accent = "blue",
  scrollLabel = "Scroll",
}: PageHeroProps) {
  const a = ACCENTS[accent];
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(id);
  }, []);

  return (
    <section className="relative min-h-[88vh] md:min-h-screen flex items-start md:items-center overflow-hidden bg-white border-b border-gray-100">
      {/* soft, minimal accent glow — keeps the large canvas from feeling barren */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className={`absolute -top-24 right-[-10%] h-[42rem] w-[42rem] rounded-full blur-3xl opacity-[0.07] ${a.glow1}`} />
        <div className={`absolute bottom-[-20%] left-[-10%] h-[34rem] w-[34rem] rounded-full blur-3xl opacity-[0.05] ${a.glow2}`} />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-8 pt-32 pb-20 md:py-28 text-center">
        <div
          className="flex flex-wrap justify-center gap-2 mb-7 transition-all duration-700"
          style={{ opacity: loaded ? 1 : 0, transitionDelay: "200ms" }}
        >
          <span className={`inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs font-semibold tracking-wide ${a.chip}`}>
            {kicker}
          </span>
          {badge && (
            <span className="inline-flex items-center rounded-full bg-gray-900 text-white px-3.5 py-1.5 text-xs font-semibold tracking-wide">
              {badge}
            </span>
          )}
        </div>

        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-8 transition-all duration-700"
          style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(24px)", transitionDelay: "400ms" }}
        >
          {title}
        </h1>

        <p
          className="text-base md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-10 transition-all duration-700"
          style={{ opacity: loaded ? 1 : 0, transitionDelay: "650ms" }}
        >
          {desc}
        </p>

        <div
          className="flex flex-wrap justify-center items-center gap-5 transition-all duration-700"
          style={{ opacity: loaded ? 1 : 0, transitionDelay: "850ms" }}
        >
          <a
            href={primaryHref}
            className={`inline-flex items-center gap-2 rounded-full text-white font-semibold px-8 py-4 transition-colors duration-300 ${a.cta} ${a.ctaShadow}`}
          >
            {primaryLabel}
            <span aria-hidden>→</span>
          </a>
          {secondaryLabel && secondaryHref && (
            <a
              href={secondaryHref}
              className={`inline-flex items-center gap-1.5 text-sm text-gray-700 font-semibold transition-colors duration-300 ${a.link}`}
            >
              {secondaryLabel}
              <span aria-hidden>→</span>
            </a>
          )}
        </div>
      </div>

      {/* scroll hint — anchors the full-height hero like the reference sites */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-gray-400 transition-all duration-700"
        style={{ opacity: loaded ? 1 : 0, transitionDelay: "1100ms" }}
      >
        <span className="text-[11px] font-medium tracking-widest uppercase">{scrollLabel}</span>
        <span className="block h-8 w-px bg-gray-300 animate-pulse" />
      </div>
    </section>
  );
}

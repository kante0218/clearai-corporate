"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Hand-traced centerline paths of /public/images/logo-clear-wordmark.png
// (1435x445, 41px monoline stroke, round caps). Coordinates were measured from
// the PNG's alpha channel so the drawn strokes reproduce the real letterforms.
// Durations are proportional to path length so the "pen" keeps an even pace,
// with a soft ease per stroke for a calligraphic feel.
const STROKES = [
  { d: "M260.3 182.7A140.5 140.5 0 1 0 260.3 381.3", dur: 0.272, delay: 0.104 }, // c
  { d: "M375.5 21V421.5", dur: 0.168, delay: 0.416 }, // l
  { d: "M590.5 278.5H770.5A140.5 140.5 0 1 0 731.9 377.7", dur: 0.392, delay: 0.624 }, // e
  {
    d: "M1033.4 419.4A140.5 140.5 0 1 1 1136.3 221.6Q1148 247 1148 280V421.5",
    dur: 0.336,
    delay: 1.056,
  }, // a: one continuous stroke — open end of the bowl → around → blends into the stem
  { d: "M1278.5 421.5V278.3A138.3 138.3 0 0 1 1414 140", dur: 0.16, delay: 1.432 }, // r
];

function Strokes() {
  return (
    <g>
      {STROKES.map((s, i) => (
        <path
          key={i}
          d={s.d}
          pathLength={100}
          fill="none"
          stroke="url(#introClearGrad)"
          strokeWidth={41}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="intro-stroke"
          style={{ animationDuration: `${s.dur}s`, animationDelay: `${s.delay}s` }}
        />
      ))}
    </g>
  );
}

export default function IntroLoader() {
  const pathname = usePathname();
  const [removed, setRemoved] = useState(false);
  const isStandaloneLp = pathname?.startsWith("/lp/ai-development-consultation");

  useEffect(() => {
    if (isStandaloneLp) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // CSS dismisses the SSR overlay even before hydration; JS only removes its DOM.
    const timeout = setTimeout(() => setRemoved(true), reduce ? 350 : 2050);
    return () => clearTimeout(timeout);
  }, [isStandaloneLp]);

  if (isStandaloneLp || removed) return null;

  return (
    <div
      aria-hidden="true"
      className="intro-loader fixed inset-0 z-[9999] flex items-center justify-center bg-white"
    >
      <svg viewBox="0 0 1435 445" className="h-14 w-auto md:h-20">
        <defs>
          {/* Horizontal gradient sampled from the wordmark PNG, pre-blended over white */}
          <linearGradient
            id="introClearGrad"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="1435"
            y2="0"
          >
            <stop offset="0" stopColor="#FB8348" />
            <stop offset="0.11" stopColor="#F57364" />
            <stop offset="0.26" stopColor="#ED5A94" />
            <stop offset="0.44" stopColor="#E13AC2" />
            <stop offset="0.7" stopColor="#BC36EC" />
            <stop offset="0.89" stopColor="#8E31FC" />
            <stop offset="1" stopColor="#852FFC" />
          </linearGradient>
        </defs>
        <Strokes />
      </svg>
      <style>{`
        .intro-loader {
          animation: introDismiss 400ms ease-out 1600ms forwards;
        }
        @keyframes introDismiss {
          from { opacity: 1; pointer-events: none; }
          to { opacity: 0; visibility: hidden; pointer-events: none; }
        }
        .intro-stroke {
          stroke-dasharray: 100.7;
          stroke-dashoffset: 100.7;
          animation-name: introDraw;
          animation-timing-function: cubic-bezier(0.45, 0.05, 0.55, 0.95);
          animation-fill-mode: forwards;
        }
        @keyframes introDraw {
          to { stroke-dashoffset: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .intro-loader { animation-delay: 200ms; animation-duration: 0.01ms; }
          .intro-stroke {
            animation: none;
            stroke-dasharray: none;
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}

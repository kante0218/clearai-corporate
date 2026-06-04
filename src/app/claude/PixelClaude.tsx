"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Activity = "walk" | "idle" | "type" | "scan" | "jump" | "sleep" | "dance" | "wave";
type Hat = "none" | "helmet" | "visor" | "antenna" | "crown" | "chef" | "cap";

type Char = {
  id: number;
  x: number;
  dir: 1 | -1;
  activity: Activity;
  hat: Hat;
  ticks: number;
  frame: number;
};

const COUNT = 6;
const SPRITE_W = 76;
const SPRITE_H = 76;
const WALK_STEP = 4;

const CC_PATH =
  "M20.998 10.949H24v3.102h-3v3.028h-1.487V20H18v-2.921h-1.487V20H15v-2.921H9V20H7.488v-2.921H6V20H4.487v-2.921H3V14.05H0V10.95h3V5h17.998v5.949zM6 10.949h1.488V8.102H6v2.847zm10.51 0H18V8.102h-1.49v2.847z";
const CC_COLOR = "#D97757";
const CC_SHADOW = "#b3593e";

// tech floor tile: dark metal panel with cyan neon top edge
const TECH_TILE =
  "url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='12' viewBox='0 0 16 12' shape-rendering='crispEdges'%3E%3Crect x='0' y='0' width='16' height='12' fill='%231e293b'/%3E%3Crect x='0' y='0' width='16' height='1' fill='%2322d3ee'/%3E%3Crect x='0' y='1' width='16' height='1' fill='%230891b2'/%3E%3Crect x='0' y='0' width='1' height='12' fill='%230f172a'/%3E%3Crect x='15' y='0' width='1' height='12' fill='%230f172a'/%3E%3Crect x='6' y='4' width='4' height='2' fill='%23334155'/%3E%3Crect x='7' y='5' width='1' height='1' fill='%2322d3ee'/%3E%3Crect x='2' y='8' width='1' height='1' fill='%2322d3ee'/%3E%3Crect x='13' y='9' width='1' height='1' fill='%23ef4444'/%3E%3C/svg%3E\")";

// circuit sub-layer
const CIRCUIT_TILE =
  "url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='14' viewBox='0 0 24 14' shape-rendering='crispEdges'%3E%3Crect x='0' y='0' width='24' height='14' fill='%230f172a'/%3E%3Crect x='0' y='0' width='24' height='1' fill='%230e7490' opacity='0.6'/%3E%3Crect x='4' y='3' width='8' height='1' fill='%230891b2' opacity='0.45'/%3E%3Crect x='4' y='3' width='1' height='5' fill='%230891b2' opacity='0.45'/%3E%3Crect x='11' y='3' width='1' height='7' fill='%230891b2' opacity='0.45'/%3E%3Crect x='4' y='8' width='1' height='1' fill='%2322d3ee'/%3E%3Crect x='11' y='10' width='1' height='1' fill='%2322d3ee'/%3E%3Crect x='17' y='5' width='5' height='1' fill='%230891b2' opacity='0.45'/%3E%3Crect x='17' y='5' width='1' height='6' fill='%230891b2' opacity='0.45'/%3E%3Crect x='17' y='11' width='1' height='1' fill='%23ef4444'/%3E%3C/svg%3E\")";

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function mkChar(id: number, stageW: number): Char {
  return {
    id,
    x: Math.floor(Math.random() * Math.max(1, stageW - SPRITE_W)),
    dir: Math.random() < 0.5 ? 1 : -1,
    activity: "walk",
    hat: pick<Hat>(["none", "none", "helmet", "visor", "antenna", "cap"]),
    ticks: 20 + Math.floor(Math.random() * 40),
    frame: Math.floor(Math.random() * 100),
  };
}

function seeded(seed: number) {
  let s = seed || 1;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export default function PixelClaude() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [chars, setChars] = useState<Char[]>([]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const update = () => setWidth(el.offsetWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (width < 10) return;
    setChars((prev) => {
      if (prev.length > 0) return prev;
      return Array.from({ length: COUNT }, (_, i) => mkChar(i, width));
    });
  }, [width]);

  useEffect(() => {
    if (chars.length === 0) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const id = window.setInterval(() => {
      setChars((prev) =>
        prev.map((c) => {
          const next: Char = { ...c, frame: c.frame + 1, ticks: c.ticks - 1 };
          if (next.ticks <= 0) {
            const pool: readonly Activity[] = [
              "walk", "walk", "walk", "idle", "type", "scan", "jump", "sleep", "dance", "wave",
            ];
            next.activity = pick(pool);
            next.ticks = 16 + Math.floor(Math.random() * 46);
            if (Math.random() < 0.35) {
              next.hat = pick<Hat>(["none", "none", "helmet", "visor", "antenna", "cap", "crown"]);
            }
            if (Math.random() < 0.35) next.dir = (next.dir === 1 ? -1 : 1) as 1 | -1;
          }
          if (next.activity === "walk") {
            next.x += next.dir * WALK_STEP;
            if (next.x < 0) { next.x = 0; next.dir = 1; }
            if (next.x > width - SPRITE_W) { next.x = width - SPRITE_W; next.dir = -1; }
          }
          return next;
        })
      );
    }, 110);
    return () => window.clearInterval(id);
  }, [chars.length, width]);

  return (
    <div
      ref={stageRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden select-none"
      style={{ imageRendering: "pixelated" }}
    >
      <style>{`
        @keyframes pc-twinkle { 0%,100%{opacity:1} 50%{opacity:0.25} }
        @keyframes pc-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes pc-float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
        @keyframes pc-destroyer { 0%{transform:translateX(-260px)} 100%{transform:translateX(calc(100vw + 80px))} }
        @keyframes pc-xwing { 0%{transform:translateX(calc(100vw + 120px)) translateY(0)} 50%{transform:translateX(50vw) translateY(-12px)} 100%{transform:translateX(-140px) translateY(0)} }
        @keyframes pc-tie { 0%{transform:translateX(-120px) translateY(0)} 50%{transform:translateX(50vw) translateY(10px)} 100%{transform:translateX(calc(100vw + 120px)) translateY(0)} }
        @keyframes pc-drone-a { 0%,100%{transform:translate(0,0)} 25%{transform:translate(20px,-6px)} 50%{transform:translate(40px,2px)} 75%{transform:translate(20px,-10px)} }
        @keyframes pc-drone-b { 0%,100%{transform:translate(0,0)} 25%{transform:translate(-18px,-10px)} 50%{transform:translate(-36px,4px)} 75%{transform:translate(-18px,-6px)} }
        @keyframes pc-drone-c { 0%,100%{transform:translate(0,0)} 25%{transform:translate(14px,-14px)} 50%{transform:translate(0,-2px)} 75%{transform:translate(-14px,-14px)} }
        @keyframes pc-prop { 0%,100%{transform:scaleX(1)} 50%{transform:scaleX(0.2)} }
        @keyframes pc-shoot { 0%{transform:translate(0,0);opacity:0} 4%{opacity:1} 22%{transform:translate(420px,220px);opacity:0} 100%{opacity:0} }
        @keyframes pc-glow { 0%,100%{opacity:0.55} 50%{opacity:1} }
        @keyframes pc-blink { 0%,45%{opacity:1} 50%,95%{opacity:0.2} 100%{opacity:1} }
        @keyframes pc-laser-flick { 0%,8%,16%,100%{opacity:0.95} 10%,14%{opacity:0.55} }
      `}</style>

      {/* STARRY NIGHT GRADIENT */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #0b1638 0%, #131a4a 18%, #1f1f5c 36%, #2a2068 52%, #1f184f 70%, #0e0a2c 86%, #030110 100%)",
        }}
      />

      {/* Nebula glows */}
      <div
        className="absolute"
        style={{
          left: "18%",
          top: "42%",
          width: 1,
          height: 1,
          boxShadow: "0 0 340px 220px rgba(139, 92, 246, 0.28)",
        }}
      />
      <div
        className="absolute"
        style={{
          right: "20%",
          top: "60%",
          width: 1,
          height: 1,
          boxShadow: "0 0 300px 200px rgba(236, 72, 153, 0.22)",
        }}
      />
      <div
        className="absolute"
        style={{
          left: "60%",
          top: "25%",
          width: 1,
          height: 1,
          boxShadow: "0 0 280px 180px rgba(59, 130, 246, 0.22)",
        }}
      />

      {/* STAR FIELDS — dense across whole sky */}
      <StarField density={70} yMin={2} yMax={55} seed={11} bright />
      <StarField density={110} yMin={55} yMax={97} seed={777} bright />

      {/* MOON */}
      <div className="absolute" style={{ left: "5%", top: "7%" }}>
        <Moon />
      </div>

      {/* DEATH STAR */}
      <div className="absolute" style={{ right: "6%", top: "9%" }}>
        <DeathStar />
      </div>

      {/* small planet */}
      <div className="absolute" style={{ left: "10%", top: "54%", animation: "pc-float 9s ease-in-out infinite" }}>
        <TechPlanet />
      </div>

      {/* STAR DESTROYER slowly drifting */}
      <div className="absolute" style={{ top: "14%", animation: "pc-destroyer 90s linear infinite" }}>
        <StarDestroyer />
      </div>

      {/* X-WING */}
      <div className="absolute" style={{ top: "27%", animation: "pc-xwing 22s linear infinite" }}>
        <XWing />
      </div>

      {/* TIE FIGHTER opposite */}
      <div className="absolute" style={{ top: "38%", animation: "pc-tie 26s linear infinite" }}>
        <TIEFighter />
      </div>

      {/* shooting star */}
      <div className="absolute" style={{ left: "18%", top: "14%" }}>
        <div style={{ animation: "pc-shoot 14s ease-in infinite" }}>
          <ShootingStar />
        </div>
      </div>

      {/* Floating astronaut Claudes (2 only) */}
      <div className="absolute" style={{ left: "16%", top: "32%", animation: "pc-float 4.8s ease-in-out infinite" }}>
        <FloatClaude color="#D97757" waving />
      </div>
      <div className="absolute" style={{ right: "18%", top: "48%", animation: "pc-float2 6s ease-in-out infinite" }}>
        <FloatClaude color="#8b5cf6" />
      </div>

      {/* CIRCUIT/WIRING strip (under the tech floor) */}
      <div
        className="absolute left-0 right-0"
        style={{
          bottom: 16,
          height: 28,
          backgroundImage: CIRCUIT_TILE,
          backgroundRepeat: "repeat-x",
          backgroundSize: "48px 28px",
          imageRendering: "pixelated",
        }}
      />
      {/* TECH tile floor */}
      <div
        className="absolute left-0 right-0"
        style={{
          bottom: 44,
          height: 24,
          backgroundImage: TECH_TILE,
          backgroundRepeat: "repeat-x",
          backgroundSize: "32px 24px",
          imageRendering: "pixelated",
          filter: "drop-shadow(0 0 6px rgba(34,211,238,0.35))",
        }}
      />
      {/* deep base fade */}
      <div
        className="absolute left-0 right-0"
        style={{
          bottom: 0,
          height: 16,
          background: "linear-gradient(to bottom, #0b0720 0%, #05020e 100%)",
        }}
      />

      <Ground width={width} />

      {/* Drones flying (replace butterflies) */}
      <div className="absolute" style={{ left: "26%", top: "50%", animation: "pc-drone-a 5s ease-in-out infinite" }}>
        <Drone primary="#06b6d4" />
      </div>
      <div className="absolute" style={{ left: "62%", top: "58%", animation: "pc-drone-b 6.4s ease-in-out infinite" }}>
        <Drone primary="#D97757" />
      </div>
      <div className="absolute" style={{ left: "78%", top: "42%", animation: "pc-drone-c 7s ease-in-out infinite" }}>
        <Drone primary="#a855f7" />
      </div>

      {chars.map((c) => (
        <Sprite key={c.id} char={c} />
      ))}
    </div>
  );
}

/* ------------ STAR FIELD ------------ */

function StarField({
  density,
  yMin,
  yMax,
  seed = 42,
  bright = false,
}: {
  density: number;
  yMin: number;
  yMax: number;
  seed?: number;
  bright?: boolean;
}) {
  const stars = useMemo(() => {
    const rnd = seeded(seed);
    return Array.from({ length: density }, (_, i) => {
      const r = rnd();
      const size = r < 0.1 ? 3 : r < 0.35 ? 2 : 1;
      const colorR = rnd();
      const color = colorR < 0.15 ? "#fde68a" : colorR < 0.35 ? "#a5f3fc" : "#ffffff";
      return {
        i,
        x: rnd() * 100,
        y: yMin + rnd() * (yMax - yMin),
        size,
        color,
        delay: -rnd() * 4,
        dur: 1.8 + rnd() * 2.2,
      };
    });
  }, [density, yMin, yMax, seed]);

  return (
    <>
      {stars.map((s) => (
        <div key={s.i} className="absolute" style={{ left: `${s.x}%`, top: `${s.y}%` }}>
          {s.size === 3 ? (
            <svg width="5" height="5" viewBox="0 0 5 5" shapeRendering="crispEdges"
                 style={{ animation: `pc-twinkle ${s.dur}s ease-in-out infinite`, animationDelay: `${s.delay}s` }}>
              <rect x="2" y="0" width="1" height="5" fill={s.color} />
              <rect x="0" y="2" width="5" height="1" fill={s.color} />
            </svg>
          ) : (
            <div
              style={{
                width: s.size,
                height: s.size,
                background: s.color,
                boxShadow: bright ? `0 0 ${s.size * 2}px ${s.color}` : undefined,
                opacity: bright ? 0.95 : 0.75,
                animation: `pc-twinkle ${s.dur}s ease-in-out infinite`,
                animationDelay: `${s.delay}s`,
              }}
            />
          )}
        </div>
      ))}
    </>
  );
}

/* ------------ SKY ELEMENTS ------------ */

function Moon() {
  return (
    <svg width="72" height="72" viewBox="0 0 16 16" shapeRendering="crispEdges">
      {/* soft halo */}
      <circle cx="8" cy="8" r="7.8" fill="#e0e7ff" opacity="0.1" />
      <circle cx="8" cy="8" r="6.8" fill="#f1f5f9" opacity="0.14" />
      {/* body */}
      <circle cx="8" cy="8" r="5.5" fill="#f1f5f9" />
      <circle cx="8" cy="8" r="5" fill="#e2e8f0" />
      {/* craters */}
      <circle cx="5.5" cy="5.5" r="1.2" fill="#94a3b8" opacity="0.55" />
      <circle cx="9.8" cy="7.2" r="0.8" fill="#94a3b8" opacity="0.5" />
      <circle cx="6.2" cy="10" r="0.7" fill="#94a3b8" opacity="0.4" />
      <circle cx="9" cy="10.5" r="0.4" fill="#94a3b8" opacity="0.35" />
      {/* highlight */}
      <rect x="5" y="4" width="1" height="1" fill="#ffffff" opacity="0.9" />
    </svg>
  );
}

function DeathStar() {
  return (
    <svg width="96" height="96" viewBox="0 0 20 20" shapeRendering="crispEdges" style={{ opacity: 0.92 }}>
      <circle cx="10" cy="10" r="9" fill="#4b5563" />
      <circle cx="10" cy="10" r="8.4" fill="#374151" />
      <rect x="1" y="10" width="18" height="1" fill="#1f2937" />
      <rect x="1" y="11" width="18" height="0.5" fill="#111827" />
      {/* superlaser dish */}
      <circle cx="7" cy="6" r="2.2" fill="#1f2937" />
      <circle cx="7" cy="6" r="1.5" fill="#374151" />
      <rect x="6.5" y="5.5" width="1" height="1" fill="#22d3ee" style={{ animation: "pc-glow 3s ease-in-out infinite" }} />
      {/* panel details */}
      <rect x="4" y="13" width="1" height="1" fill="#1f2937" />
      <rect x="13" y="7" width="1" height="1" fill="#1f2937" />
      <rect x="14" y="13" width="2" height="1" fill="#1f2937" />
      <rect x="11" y="5" width="1" height="1" fill="#1f2937" />
      <rect x="5" y="10" width="1" height="1" fill="#6b7280" />
      <rect x="9" y="14" width="2" height="1" fill="#6b7280" />
      {/* rim highlight */}
      <rect x="3" y="3" width="1" height="1" fill="#6b7280" opacity="0.6" />
    </svg>
  );
}

function TechPlanet() {
  return (
    <svg width="36" height="36" viewBox="0 0 12 12" shapeRendering="crispEdges" style={{ opacity: 0.9 }}>
      <circle cx="6" cy="6" r="5" fill="#3b82f6" />
      <circle cx="6" cy="6" r="4" fill="#2563eb" />
      <rect x="2" y="5" width="3" height="1" fill="#1e40af" />
      <rect x="6" y="7" width="4" height="1" fill="#1e40af" />
      <rect x="4" y="4" width="1" height="1" fill="#93c5fd" opacity="0.9" />
      <ellipse cx="6" cy="6" rx="5.5" ry="1" fill="none" stroke="#22d3ee" strokeWidth="0.4" opacity="0.6" />
    </svg>
  );
}

function StarDestroyer() {
  return (
    <svg width="180" height="56" viewBox="0 0 45 14" shapeRendering="crispEdges" style={{ opacity: 0.9 }}>
      {/* triangular hull */}
      <path d="M0,10 L42,13 L0,13 Z" fill="#334155" />
      <path d="M0,10 L42,13 L42,12 L0,9 Z" fill="#475569" />
      <path d="M0,10 L42,13 L0,11 Z" fill="#1e293b" opacity="0.6" />
      {/* command tower */}
      <rect x="1" y="4" width="7" height="5" fill="#475569" />
      <rect x="1" y="4" width="7" height="1" fill="#64748b" />
      <rect x="2" y="2" width="5" height="2" fill="#64748b" />
      {/* comm spheres */}
      <rect x="2" y="1" width="2" height="2" fill="#64748b" />
      <rect x="5" y="1" width="2" height="2" fill="#64748b" />
      <rect x="2.5" y="0" width="1" height="1" fill="#6b7280" />
      <rect x="5.5" y="0" width="1" height="1" fill="#6b7280" />
      {/* window lights */}
      <rect x="3" y="6" width="3" height="1" fill="#fbbf24" opacity="0.9" />
      <rect x="12" y="11" width="1" height="1" fill="#fbbf24" />
      <rect x="20" y="12" width="1" height="1" fill="#fbbf24" />
      <rect x="28" y="12" width="1" height="1" fill="#fbbf24" />
      <rect x="36" y="13" width="1" height="0.5" fill="#fbbf24" />
      {/* engine exhausts */}
      <rect x="0" y="10" width="1" height="1" fill="#60a5fa" />
      <rect x="0" y="11" width="1" height="1" fill="#3b82f6" />
      <rect x="0" y="12" width="1" height="1" fill="#60a5fa" />
    </svg>
  );
}

function XWing() {
  return (
    <svg width="96" height="40" viewBox="0 0 24 10" shapeRendering="crispEdges">
      {/* wings (X) */}
      <rect x="12" y="0" width="4" height="1" fill="#e5e7eb" />
      <rect x="14" y="1" width="5" height="1" fill="#9ca3af" />
      <rect x="12" y="9" width="4" height="1" fill="#e5e7eb" />
      <rect x="14" y="8" width="5" height="1" fill="#9ca3af" />
      {/* wing tips red */}
      <rect x="18" y="0" width="1" height="2" fill="#ef4444" />
      <rect x="18" y="8" width="1" height="2" fill="#ef4444" />
      {/* laser cannons */}
      <rect x="10" y="0" width="1" height="1" fill="#4b5563" />
      <rect x="10" y="9" width="1" height="1" fill="#4b5563" />
      {/* body */}
      <rect x="1" y="4" width="17" height="2" fill="#e5e7eb" />
      <rect x="1" y="5" width="17" height="1" fill="#9ca3af" />
      <rect x="18" y="4" width="3" height="2" fill="#64748b" />
      {/* nose */}
      <rect x="0" y="4" width="1" height="2" fill="#cbd5e1" />
      {/* cockpit */}
      <rect x="8" y="4" width="3" height="1" fill="#60a5fa" />
      <rect x="9" y="3" width="2" height="1" fill="#3b82f6" />
      <rect x="8" y="4" width="1" height="1" fill="#93c5fd" />
      {/* engines */}
      <rect x="21" y="4" width="1" height="2" fill="#fbbf24" />
      <rect x="22" y="4" width="2" height="2" fill="#f97316" opacity="0.85" style={{ animation: "pc-glow 0.6s ease-in-out infinite" }} />
    </svg>
  );
}

function TIEFighter() {
  return (
    <svg width="80" height="40" viewBox="0 0 20 12" shapeRendering="crispEdges">
      {/* left wing panel */}
      <rect x="0" y="2" width="2" height="8" fill="#1e293b" />
      <rect x="1" y="1" width="2" height="10" fill="#334155" />
      <rect x="2" y="2" width="1" height="8" fill="#475569" />
      {/* right wing panel */}
      <rect x="18" y="2" width="2" height="8" fill="#1e293b" />
      <rect x="17" y="1" width="2" height="10" fill="#334155" />
      <rect x="17" y="2" width="1" height="8" fill="#475569" />
      {/* struts */}
      <rect x="3" y="5" width="5" height="2" fill="#64748b" />
      <rect x="12" y="5" width="5" height="2" fill="#64748b" />
      {/* cockpit */}
      <rect x="8" y="4" width="4" height="4" fill="#0f172a" />
      <rect x="8" y="3" width="4" height="1" fill="#1e293b" />
      <rect x="8" y="8" width="4" height="1" fill="#1e293b" />
      {/* eye window */}
      <rect x="9" y="5" width="2" height="2" fill="#ef4444" opacity="0.85" style={{ animation: "pc-glow 1.8s ease-in-out infinite" }} />
      <rect x="9" y="5" width="1" height="1" fill="#fecaca" />
    </svg>
  );
}

function ShootingStar() {
  return (
    <svg width="48" height="28" viewBox="0 0 16 8" shapeRendering="crispEdges">
      <rect x="13" y="3" width="2" height="2" fill="#ffffff" />
      <rect x="11" y="3" width="2" height="2" fill="#fef3c7" opacity="0.85" />
      <rect x="8" y="3" width="3" height="2" fill="#fbbf24" opacity="0.65" />
      <rect x="4" y="3" width="4" height="2" fill="#f97316" opacity="0.45" />
      <rect x="0" y="3" width="4" height="2" fill="#f97316" opacity="0.2" />
    </svg>
  );
}

function FloatClaude({ color = "#D97757", waving = false }: { color?: string; waving?: boolean }) {
  return (
    <svg width="64" height="64" viewBox="-6 -6 36 36" shapeRendering="crispEdges">
      <circle cx="12" cy="12" r="15" fill="#bae6fd" opacity="0.18" />
      <circle cx="12" cy="12" r="15" fill="none" stroke="#67e8f9" strokeWidth="0.5" opacity="0.85" />
      <path d="M3 6 Q7 2 12 2" fill="none" stroke="#ffffff" strokeWidth="0.9" opacity="0.55" />
      <g transform="translate(0.5, 0.5)" opacity="0.3">
        <path d={CC_PATH} fill={CC_SHADOW} fillRule="evenodd" clipRule="evenodd" />
      </g>
      <path d={CC_PATH} fill={color} fillRule="evenodd" clipRule="evenodd" />
      <rect x="11" y="-2" width="2" height="3" fill="#64748b" />
      <rect x="10.5" y="-3" width="3" height="1.2" fill="#ef4444" style={{ animation: "pc-glow 1.2s ease-in-out infinite" }} />
      {waving && (
        <g fill={color}>
          <rect x="24" y="6" width="3" height="2" />
          <rect x="26" y="4" width="2" height="2" />
        </g>
      )}
    </svg>
  );
}

function Drone({ primary = "#06b6d4" }: { primary?: string }) {
  return (
    <svg width="34" height="20" viewBox="0 0 12 7" shapeRendering="crispEdges">
      {/* props */}
      <rect x="0" y="0" width="3" height="1" fill="#9ca3af" opacity="0.75" style={{ animation: "pc-prop 0.12s linear infinite", transformOrigin: "1.5px 0.5px" }} />
      <rect x="9" y="0" width="3" height="1" fill="#9ca3af" opacity="0.75" style={{ animation: "pc-prop 0.12s linear infinite", transformOrigin: "10.5px 0.5px" }} />
      <rect x="0" y="6" width="3" height="1" fill="#9ca3af" opacity="0.75" style={{ animation: "pc-prop 0.12s linear infinite", transformOrigin: "1.5px 6.5px" }} />
      <rect x="9" y="6" width="3" height="1" fill="#9ca3af" opacity="0.75" style={{ animation: "pc-prop 0.12s linear infinite", transformOrigin: "10.5px 6.5px" }} />
      {/* arms */}
      <rect x="1" y="1" width="2" height="1" fill="#64748b" />
      <rect x="9" y="1" width="2" height="1" fill="#64748b" />
      <rect x="1" y="5" width="2" height="1" fill="#64748b" />
      <rect x="9" y="5" width="2" height="1" fill="#64748b" />
      {/* body */}
      <rect x="3" y="2" width="6" height="3" fill="#1f2937" />
      <rect x="3" y="2" width="6" height="1" fill="#374151" />
      <rect x="4" y="3" width="4" height="1" fill={primary} style={{ animation: "pc-glow 1.2s ease-in-out infinite" }} />
      <rect x="5" y="4" width="2" height="1" fill="#22d3ee" />
    </svg>
  );
}

/* ------------ GROUND DECO ------------ */

type DecoType =
  | "antenna"
  | "dish"
  | "server"
  | "holo"
  | "crate"
  | "barrier"
  | "terminal"
  | "pad";

function Ground({ width }: { width: number }) {
  const items = useMemo(() => {
    if (width < 10) return [];
    const layout: Array<{ p: number; type: DecoType }> = [
      { p: 0.03, type: "terminal" },
      { p: 0.10, type: "antenna" },
      { p: 0.18, type: "barrier" },
      { p: 0.27, type: "holo" },
      { p: 0.35, type: "server" },
      { p: 0.46, type: "pad" },
      { p: 0.57, type: "crate" },
      { p: 0.66, type: "dish" },
      { p: 0.75, type: "holo" },
      { p: 0.84, type: "server" },
      { p: 0.92, type: "antenna" },
    ];
    return layout.map((l) => ({ x: Math.floor(l.p * width), type: l.type }));
  }, [width]);

  return (
    <>
      {items.map((t, i) => (
        <div key={i} className="absolute" style={{ left: t.x, bottom: 64 }}>
          <Deco type={t.type} />
        </div>
      ))}
    </>
  );
}

function Deco({ type }: { type: DecoType }) {
  if (type === "antenna") {
    return (
      <svg width="32" height="84" viewBox="0 0 10 26" shapeRendering="crispEdges">
        <rect x="4" y="1" width="2" height="22" fill="#9ca3af" />
        <rect x="4" y="1" width="1" height="22" fill="#cbd5e1" />
        <rect x="3" y="18" width="4" height="1" fill="#6b7280" />
        <rect x="2" y="11" width="6" height="1" fill="#6b7280" />
        <rect x="1" y="6" width="8" height="1" fill="#6b7280" />
        <rect x="3" y="22" width="4" height="3" fill="#4b5563" />
        <rect x="2" y="25" width="6" height="1" fill="#374151" />
        <rect x="4" y="0" width="2" height="1" fill="#ef4444" style={{ animation: "pc-blink 1.3s ease-in-out infinite" }} />
      </svg>
    );
  }
  if (type === "dish") {
    return (
      <svg width="48" height="54" viewBox="0 0 16 18" shapeRendering="crispEdges">
        <rect x="7" y="10" width="2" height="7" fill="#9ca3af" />
        <rect x="5" y="17" width="6" height="1" fill="#6b7280" />
        <rect x="1" y="5" width="14" height="1" fill="#e5e7eb" />
        <rect x="2" y="4" width="12" height="1" fill="#e5e7eb" />
        <rect x="3" y="3" width="10" height="1" fill="#cbd5e1" />
        <rect x="2" y="6" width="12" height="2" fill="#cbd5e1" />
        <rect x="3" y="8" width="10" height="1" fill="#94a3b8" />
        <rect x="7" y="0" width="2" height="3" fill="#64748b" />
        <rect x="6" y="3" width="4" height="1" fill="#475569" />
      </svg>
    );
  }
  if (type === "server") {
    return (
      <svg width="30" height="66" viewBox="0 0 10 22" shapeRendering="crispEdges">
        <rect x="0" y="0" width="10" height="22" fill="#1f2937" />
        <rect x="0" y="0" width="10" height="1" fill="#4b5563" />
        <rect x="0" y="21" width="10" height="1" fill="#4b5563" />
        {/* slots */}
        <rect x="1" y="2" width="8" height="2" fill="#374151" />
        <rect x="2" y="3" width="1" height="1" fill="#22c55e" />
        <rect x="4" y="3" width="1" height="1" fill="#22c55e" />
        <rect x="6" y="3" width="1" height="1" fill="#fbbf24" />
        <rect x="1" y="5" width="8" height="2" fill="#374151" />
        <rect x="2" y="6" width="1" height="1" fill="#22c55e" />
        <rect x="4" y="6" width="1" height="1" fill="#ef4444" />
        <rect x="6" y="6" width="1" height="1" fill="#22d3ee" />
        <rect x="1" y="8" width="8" height="2" fill="#374151" />
        <rect x="2" y="9" width="1" height="1" fill="#22c55e" />
        <rect x="4" y="9" width="1" height="1" fill="#22c55e" />
        <rect x="6" y="9" width="1" height="1" fill="#fbbf24" />
        <rect x="1" y="11" width="8" height="2" fill="#374151" />
        <rect x="2" y="12" width="1" height="1" fill="#22d3ee" />
        <rect x="4" y="12" width="1" height="1" fill="#22c55e" />
        <rect x="6" y="12" width="1" height="1" fill="#ef4444" />
        <rect x="1" y="14" width="8" height="2" fill="#374151" />
        <rect x="2" y="15" width="1" height="1" fill="#22c55e" />
        <rect x="4" y="15" width="1" height="1" fill="#fbbf24" />
        <rect x="6" y="15" width="1" height="1" fill="#22c55e" />
        <rect x="1" y="17" width="8" height="2" fill="#374151" />
        <rect x="2" y="18" width="1" height="1" fill="#22c55e" />
        <rect x="4" y="18" width="1" height="1" fill="#22d3ee" />
        <rect x="6" y="18" width="1" height="1" fill="#22c55e" />
        {/* highlight stripe */}
        <rect x="0" y="0" width="1" height="22" fill="#334155" />
      </svg>
    );
  }
  if (type === "holo") {
    return (
      <svg width="24" height="60" viewBox="0 0 8 20" shapeRendering="crispEdges">
        <rect x="1" y="18" width="6" height="2" fill="#475569" />
        <rect x="0" y="19" width="8" height="1" fill="#334155" />
        <rect x="3" y="2" width="2" height="16" fill="#22d3ee" opacity="0.65" style={{ animation: "pc-glow 1.6s ease-in-out infinite" }} />
        <rect x="2" y="2" width="1" height="16" fill="#0891b2" opacity="0.4" />
        <rect x="5" y="2" width="1" height="16" fill="#0891b2" opacity="0.4" />
        <rect x="2" y="1" width="4" height="1" fill="#22d3ee" />
        <rect x="2" y="17" width="4" height="1" fill="#22d3ee" />
        <rect x="3" y="5" width="2" height="1" fill="#fef9c3" opacity="0.8" />
        <rect x="3" y="10" width="2" height="1" fill="#fef9c3" opacity="0.8" />
      </svg>
    );
  }
  if (type === "crate") {
    return (
      <svg width="30" height="24" viewBox="0 0 10 8" shapeRendering="crispEdges">
        <rect x="0" y="1" width="10" height="7" fill="#64748b" />
        <rect x="0" y="0" width="10" height="1" fill="#94a3b8" />
        <rect x="0" y="1" width="10" height="1" fill="#475569" />
        <rect x="0" y="7" width="10" height="1" fill="#1f2937" />
        <rect x="4" y="3" width="2" height="3" fill="#1e293b" />
        <rect x="4" y="3" width="2" height="1" fill="#22d3ee" style={{ animation: "pc-glow 2s ease-in-out infinite" }} />
        <rect x="5" y="4" width="1" height="1" fill="#22c55e" />
        <rect x="1" y="2" width="2" height="1" fill="#334155" />
        <rect x="7" y="2" width="2" height="1" fill="#334155" />
        <rect x="1" y="5" width="2" height="1" fill="#334155" />
        <rect x="7" y="5" width="2" height="1" fill="#334155" />
      </svg>
    );
  }
  if (type === "barrier") {
    return (
      <svg width="72" height="36" viewBox="0 0 24 12" shapeRendering="crispEdges">
        {/* posts */}
        <rect x="0" y="1" width="3" height="11" fill="#475569" />
        <rect x="0" y="1" width="3" height="2" fill="#ef4444" />
        <rect x="21" y="1" width="3" height="11" fill="#475569" />
        <rect x="21" y="1" width="3" height="2" fill="#ef4444" />
        {/* laser beam */}
        <rect x="3" y="1" width="18" height="2" fill="#fecaca" opacity="0.9" style={{ animation: "pc-laser-flick 1.4s linear infinite" }} />
        <rect x="3" y="2" width="18" height="1" fill="#ef4444" style={{ animation: "pc-laser-flick 1.4s linear infinite" }} />
        <rect x="0" y="10" width="24" height="2" fill="#1e293b" />
      </svg>
    );
  }
  if (type === "terminal") {
    return (
      <svg width="33" height="48" viewBox="0 0 11 16" shapeRendering="crispEdges">
        <rect x="2" y="11" width="7" height="5" fill="#4b5563" />
        <rect x="1" y="15" width="9" height="1" fill="#1f2937" />
        <rect x="2" y="2" width="7" height="9" fill="#111827" />
        <rect x="2" y="2" width="7" height="1" fill="#22d3ee" />
        <rect x="3" y="4" width="5" height="1" fill="#22d3ee" opacity="0.8" />
        <rect x="3" y="6" width="3" height="1" fill="#22d3ee" opacity="0.6" />
        <rect x="3" y="8" width="4" height="1" fill="#22d3ee" opacity="0.8" />
        <rect x="5" y="0" width="2" height="2" fill="#64748b" />
        <rect x="5" y="0" width="2" height="1" fill="#ef4444" style={{ animation: "pc-blink 1.6s ease-in-out infinite" }} />
      </svg>
    );
  }
  // landing pad
  return (
    <svg width="60" height="18" viewBox="0 0 20 6" shapeRendering="crispEdges">
      <rect x="1" y="1" width="18" height="4" fill="#334155" />
      <rect x="1" y="1" width="18" height="1" fill="#475569" />
      <rect x="1" y="5" width="18" height="1" fill="#0f172a" />
      {/* landing lights */}
      <rect x="2" y="2" width="1" height="1" fill="#fbbf24" style={{ animation: "pc-blink 1.2s ease-in-out infinite" }} />
      <rect x="6" y="2" width="1" height="1" fill="#fbbf24" style={{ animation: "pc-blink 1.2s ease-in-out 0.3s infinite" }} />
      <rect x="10" y="2" width="1" height="1" fill="#fbbf24" style={{ animation: "pc-blink 1.2s ease-in-out 0.6s infinite" }} />
      <rect x="14" y="2" width="1" height="1" fill="#fbbf24" style={{ animation: "pc-blink 1.2s ease-in-out 0.9s infinite" }} />
      <rect x="17" y="2" width="1" height="1" fill="#fbbf24" style={{ animation: "pc-blink 1.2s ease-in-out 1.2s infinite" }} />
      {/* H marker */}
      <rect x="9" y="3" width="1" height="2" fill="#22d3ee" />
      <rect x="10" y="3" width="1" height="2" fill="#22d3ee" />
      <rect x="9" y="3" width="2" height="1" fill="#67e8f9" />
    </svg>
  );
}

/* ------------ WALKING CHARACTER ------------ */

function Sprite({ char }: { char: Char }) {
  const { x, dir, activity, hat, frame } = char;
  const tick = frame;

  let dy = 0;
  let tilt = 0;
  const flip = dir === -1;

  if (activity === "walk") {
    const p = tick % 2;
    dy = p === 0 ? 0 : -1;
    tilt = p === 0 ? -2 : 2;
  } else if (activity === "idle") {
    dy = tick % 12 < 6 ? 0 : -1;
  } else if (activity === "jump") {
    const ph = tick % 8;
    dy = ph < 2 ? -6 : ph < 4 ? -14 : ph < 6 ? -6 : 0;
  } else if (activity === "dance") {
    tilt = tick % 2 === 0 ? -10 : 10;
    dy = tick % 4 < 2 ? 0 : -3;
  } else if (activity === "sleep") {
    dy = tick % 16 < 8 ? 0 : -1;
    tilt = 8;
  } else if (activity === "type") {
    dy = tick % 4 < 2 ? 0 : -1;
  } else if (activity === "scan") {
    dy = tick % 8 < 4 ? 0 : -1;
  } else if (activity === "wave") {
    dy = tick % 4 < 2 ? 0 : -1;
  }

  const showSparkle = activity === "dance" || activity === "wave";
  const scanPhase = tick % 6;
  const typeUp = tick % 4 < 2;
  const waveUp = tick % 4 < 2;

  return (
    <div
      className="absolute"
      style={{
        left: x,
        bottom: 62,
        transition: activity === "walk" ? "left 110ms linear" : "none",
      }}
    >
      <div style={{ transform: `translateY(${dy}px)` }}>
        <svg
          width={SPRITE_W}
          height={SPRITE_H + 34}
          viewBox="-6 -16 36 40"
          shapeRendering="crispEdges"
          style={{
            transform: `${flip ? "scaleX(-1) " : ""}rotate(${tilt}deg)`,
            transformOrigin: "50% 90%",
            overflow: "visible",
            display: "block",
          }}
        >
          {activity === "sleep" && (
            <g fill="#60a5fa">
              <rect x={22 + (tick % 8 > 4 ? 0 : 2)} y={-4 - (tick % 8 > 4 ? 2 : 0)} width="3" height="1.5" />
              <rect x={25 + (tick % 8 > 4 ? 0 : 2)} y={-7 - (tick % 8 > 4 ? 2 : 0)} width="3" height="1.5" />
            </g>
          )}

          {showSparkle && tick % 4 < 2 && (
            <g fill="#22d3ee">
              <rect x="-5" y="4" width="2" height="2" />
              <rect x="-3" y="2" width="1" height="1" />
              <rect x="26" y="8" width="2" height="2" />
              <rect x="28" y="5" width="1" height="1" />
              <rect x="11" y="-10" width="2" height="2" />
            </g>
          )}

          {/* HATS */}
          {hat === "helmet" && (
            <g>
              <circle cx="12" cy="10" r="13" fill="#bae6fd" opacity="0.22" />
              <circle cx="12" cy="10" r="13" fill="none" stroke="#67e8f9" strokeWidth="0.5" opacity="0.85" />
              <rect x="11" y="-2" width="2" height="3" fill="#64748b" />
              <rect x="10.5" y="-3" width="3" height="1.2" fill="#ef4444" />
            </g>
          )}
          {hat === "visor" && (
            <g>
              <rect x="1" y="2" width="22" height="2" fill="#1f2937" />
              <rect x="2" y="3" width="20" height="1" fill="#22d3ee" style={{ animation: "pc-glow 2s ease-in-out infinite" }} />
              <rect x="1" y="1" width="22" height="1" fill="#0f172a" />
              <rect x="3" y="3" width="1" height="1" fill="#ffffff" />
            </g>
          )}
          {hat === "antenna" && (
            <g>
              <rect x="3" y="3" width="16" height="2" fill="#334155" />
              <rect x="3" y="2" width="16" height="1" fill="#64748b" />
              <rect x="10" y="-3" width="1" height="6" fill="#64748b" />
              <rect x="13" y="-2" width="1" height="5" fill="#64748b" />
              <rect x="10" y="-4" width="1" height="1" fill="#ef4444" style={{ animation: "pc-glow 0.8s ease-in-out infinite" }} />
              <rect x="13" y="-3" width="1" height="1" fill="#22d3ee" style={{ animation: "pc-glow 1.1s ease-in-out infinite" }} />
            </g>
          )}
          {hat === "cap" && (
            <g>
              <rect x="2" y="3" width="20" height="2" fill="#D97757" />
              <rect x="3" y="1" width="18" height="2" fill="#c2410c" />
              <rect x="4" y="0" width="16" height="1" fill="#9a3412" />
              <rect x="0" y="3" width="3" height="1" fill="#D97757" />
              <rect x="21" y="3" width="4" height="1" fill="#D97757" />
            </g>
          )}
          {hat === "chef" && (
            <g fill="#ffffff">
              <rect x="2" y="3" width="20" height="2" />
              <rect x="3" y="1" width="18" height="2" />
              <rect x="1" y="-1" width="8" height="2" />
              <rect x="10" y="-3" width="4" height="2" />
              <rect x="15" y="-1" width="8" height="2" />
              <rect x="6" y="-3" width="4" height="2" />
              <rect x="14" y="-3" width="4" height="2" />
            </g>
          )}
          {hat === "crown" && (
            <g>
              <rect x="0" y="3" width="24" height="2" fill="#fbbf24" />
              <rect x="0" y="-1" width="3" height="4" fill="#fbbf24" />
              <rect x="10.5" y="-3" width="3" height="6" fill="#fbbf24" />
              <rect x="21" y="-1" width="3" height="4" fill="#fbbf24" />
              <rect x="11" y="-3" width="2" height="2" fill="#ef4444" />
              <rect x="0.5" y="-1" width="2" height="2" fill="#22c55e" />
              <rect x="21.5" y="-1" width="2" height="2" fill="#3b82f6" />
            </g>
          )}

          {/* BODY */}
          <g transform="translate(0.5, 0.5)" opacity="0.25">
            <path d={CC_PATH} fill={CC_SHADOW} fillRule="evenodd" clipRule="evenodd" />
          </g>
          <path d={CC_PATH} fill={CC_COLOR} fillRule="evenodd" clipRule="evenodd" />

          {(activity === "dance" || activity === "wave" || activity === "jump") && (
            <g fill="#ff7a85" opacity="0.55">
              <rect x="3.5" y="11.5" width="1.5" height="1" />
              <rect x="19" y="11.5" width="1.5" height="1" />
            </g>
          )}

          {activity === "sleep" && (
            <g>
              <rect x="6" y="8.1" width="1.49" height="2.85" fill={CC_COLOR} />
              <rect x="16.51" y="8.1" width="1.49" height="2.85" fill={CC_COLOR} />
              <rect x="5.7" y="9.2" width="2" height="0.6" fill="#1a1410" />
              <rect x="16.3" y="9.2" width="2" height="0.6" fill="#1a1410" />
            </g>
          )}

          {/* TYPING on a holo keyboard */}
          {activity === "type" && (
            <g>
              <rect x="22" y="13" width="7" height="1.5" fill="#22d3ee" opacity="0.7" />
              <rect x="23" y="14.5" width="5" height="0.5" fill="#0891b2" opacity="0.6" />
              {/* holo text lines */}
              <rect x="22" y="10" width={typeUp ? 4 : 3} height="0.5" fill="#22d3ee" opacity="0.85" />
              <rect x="22" y="11.5" width={typeUp ? 3 : 5} height="0.5" fill="#67e8f9" opacity="0.7" />
              <rect x="22" y="8.5" width={typeUp ? 5 : 2} height="0.5" fill="#22d3ee" opacity="0.6" />
              {/* hand */}
              <rect x="21" y={typeUp ? 11.5 : 12} width="2" height="1" fill={CC_COLOR} />
            </g>
          )}

          {/* SCANNING — cyan laser beam sweep */}
          {activity === "scan" && (
            <g>
              <rect
                x={22 + scanPhase * 0.6}
                y="5"
                width="1"
                height="10"
                fill="#22d3ee"
                opacity="0.85"
                style={{ animation: "pc-glow 0.5s ease-in-out infinite" }}
              />
              <rect x="21" y="2" width="3" height="3" fill="#1f2937" />
              <rect x="22" y="3" width="1" height="1" fill="#22d3ee" />
            </g>
          )}

          {activity === "wave" && (
            <g fill={CC_COLOR}>
              <rect x="23" y={waveUp ? 1 : 6} width="3" height="2" />
              <rect x="25" y={waveUp ? -1 : 4} width="2" height="2" />
              <rect x="22" y={waveUp ? 3 : 8} width="2" height="2" />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}

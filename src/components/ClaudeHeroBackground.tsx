"use client";

import { useEffect, useState, type CSSProperties } from "react";

/**
 * Claude Hero — Full JRPG Mockup Reproduction
 *
 * Layout (target):
 *   - Left:   MenuBox (top) + StatsBox (mid)
 *   - Bottom: DialogueBox (left) + BattleMenu (right)
 *   - Center: h1 copy (in page.tsx, untouched)
 *   - Background: parallax pixel-art PNGs (hero-back + hero-foreground + props)
 *   - Right:  King Claude mascot (big crown, blue gem, staff, purple cape)
 *   - Props:  bridge, river, chest, sword, windmill, wooden sign
 */

const OL = "#3E2A1E";
const NAVY_BOX = "#1E2B5C";
const NAVY_DEEP = "#16204A";
const YELLOW = "#F4C54A";
const YELLOW_BRIGHT = "#FFD966";
const WHITE = "#FFFFFF";
const Y1 = "#FFE9A6", Y2 = "#F4C54A", Y3 = "#C48C1D", Y4 = "#7A5100";
const R = "#E23B3B", RH = "#FF7E7E";
const B = "#3B82C4", BH = "#87B8E8", BD = "#1E4A7D", BL = "#6FB6F5";
const G = "#3F8A4B", GH = "#87D397";
const W1 = "#A97143", W2 = "#7F4E33", W3 = "#4B2A0F";
const CAPE_MAIN = "#6B46C1", CAPE_HI = "#8B5CF6", CAPE_SH = "#4C1D95", CAPE_DEEP = "#2E1065";

const FONT_STACK = '"DotGothic16", "Press Start 2P", "Noto Sans JP", "MS Gothic", monospace';
const baseText: CSSProperties = {
  fontFamily: FONT_STACK, fontWeight: 700, color: WHITE,
  letterSpacing: "0.05em", lineHeight: 1.6,
  WebkitFontSmoothing: "none", MozOsxFontSmoothing: "grayscale",
};

const SPARKLES = [
  { top: "10%", left: "12%", delay: 0.0 },
  { top: "18%", left: "38%", delay: 0.3 },
  { top: "14%", left: "66%", delay: 0.6 },
  { top: "22%", left: "88%", delay: 0.9 },
  { top: "34%", left: "72%", delay: 1.2 },
  { top: "42%", left: "92%", delay: 1.5 },
];

/* ════════════════════════════════════════════════════════════════════════════
 * ⚙ POSITIONS — ここを編集するだけで全アセット位置/サイズを調整できます
 *
 * 使い方:
 *   - left/right/top/bottom: "数値%" または "数値px" (CSS値そのまま)
 *   - width: "clamp(最小px, vw値, 最大px)" でレスポンシブ
 *   - 指定しないプロパティは undefined にする
 *   - 保存すると即座にブラウザで反映 (HMR)
 *
 * 画像中心を中央揃えにしたい場合は left: "50%" + transform: "translateX(-50%)"
 * ════════════════════════════════════════════════════════════════════════════ */
const POSITIONS = {
  // ═══ 背景2層 (通常 inset:0 でOK、微調整は scale や filter で) ═══
  back:      { inset: 0 as const },
  foreground:{ inset: 0 as const },

  // ═══ 個別アセット (左/右/上/下/幅 を自由に) ═══
  river:     { left: "48%", bottom: "13%", width: "clamp(220px, 26vw, 440px)", aspectRatio: "3 / 1", centerX: true, blend: true, opacity: 0.85 },
  bridge:    { left: "48%", bottom: "17%", width: "clamp(160px, 18vw, 300px)", aspectRatio: "3 / 2", centerX: true },
  chest:     { left: "56%", bottom: "7%",  width: "clamp(58px, 6.5vw, 100px)", aspectRatio: "1 / 1", centerX: true },
  sword:     { right: "4%", bottom: "6%",  width: "clamp(60px, 7vw, 105px)",   aspectRatio: "1 / 1" },
  windmill:  { right: "2%", bottom: "48%", width: "clamp(52px, 6vw, 95px)",    aspectRatio: "1 / 1" },
  sign:      { right: "15%", bottom: "20%", width: "clamp(86px, 10vw, 150px)", aspectRatio: "3 / 2" },

  // ═══ Claude主役 ═══
  claude:    { right: "14%", top: "32%",   width: "clamp(160px, 17vw, 260px)", aspectRatio: "1 / 1" },

  // ═══ RPGテキストボックス ═══
  menuBox:   { top: "7%",    left: "2%"   },
  statsBox:  { top: "28%",   left: "2%"   },
  dialogueBox: { bottom: "2%", left: "2%"  },
  battleMenu:{ bottom: "2%", right: "2%"  },
};

/* ──────────── RPG Text Boxes ──────────── */
function MenuBoxTop() {
  const wrap: CSSProperties = { ...baseText, width: 220, padding: "16px 18px", fontSize: 14, display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 16, rowGap: 6, alignItems: "center" };
  const item: CSSProperties = { position: "relative", paddingLeft: 16 };
  const cursor: CSSProperties = { position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", color: YELLOW_BRIGHT, fontSize: 13, lineHeight: 1 };
  return (
    <div className="rpg-frame" style={wrap}>
      <div style={item}><span className="rpg-cursor" style={cursor}>▶</span>はなす</div>
      <div style={item}>どうぐ</div>
      <div style={item}>じゅもん</div>
      <div style={item}>そうび</div>
      <div style={item}>しらべる</div>
      <div style={item}>さくせん</div>
    </div>
  );
}

function StatsBox() {
  const wrap: CSSProperties = { ...baseText, width: 200, padding: "14px 16px 16px", fontSize: 13, display: "flex", flexDirection: "column" };
  const title: CSSProperties = { fontSize: 18, textAlign: "center", color: YELLOW_BRIGHT, letterSpacing: "0.08em", paddingBottom: 8, marginBottom: 10, borderBottom: `2px solid ${YELLOW}`, textShadow: `2px 2px 0 ${NAVY_DEEP}` };
  const row: CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "2px 0" };
  const value: CSSProperties = { color: YELLOW_BRIGHT, fontVariantNumeric: "tabular-nums", minWidth: 40, textAlign: "right" };
  const stats: Array<[string, string]> = [["Lv", "99"], ["HP", "999"], ["MP", "999"], ["こうげき力", "999"], ["しゅび力", "999"], ["ちりょく", "999"], ["すばやさ", "999"]];
  return (
    <div className="rpg-frame" style={wrap}>
      <div style={title}>Claude</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {stats.map(([k, v]) => <div key={k} style={row}><span>{k}</span><span style={value}>{v}</span></div>)}
      </div>
    </div>
  );
}

function DialogueBox() {
  const wrap: CSSProperties = { ...baseText, width: 460, padding: "18px 24px 22px", fontSize: 14, position: "relative" };
  const line: CSSProperties = { display: "block", padding: "2px 0" };
  const next: CSSProperties = { position: "absolute", right: 16, bottom: 10, color: YELLOW_BRIGHT, fontSize: 13, lineHeight: 1 };
  return (
    <div className="rpg-frame" style={wrap}>
      <span style={line}>*&nbsp;&nbsp;Claude が あらわれた！</span>
      <span style={line}>*&nbsp;&nbsp;こちらを みている…！</span>
      <span className="rpg-next" style={next}>▼</span>
    </div>
  );
}

function BattleMenu() {
  const wrap: CSSProperties = { ...baseText, width: 290, padding: "18px 24px", fontSize: 15, display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 22, rowGap: 8, alignItems: "center" };
  const item: CSSProperties = { position: "relative", paddingLeft: 20 };
  const muted: CSSProperties = { ...item, color: "rgba(255,255,255,0.45)" };
  const cursor: CSSProperties = { position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", color: YELLOW_BRIGHT, fontSize: 14, lineHeight: 1 };
  return (
    <div className="rpg-frame" style={wrap}>
      <div style={item}><span className="rpg-cursor" style={cursor}>▶</span>たたかう</div>
      <div style={muted}>なし</div>
      <div style={item}>にげる</div>
      <div style={muted}>なし</div>
    </div>
  );
}

/* ──────────── King Claude Mascot (crown + staff + cape) ──────────── */
function KingClaudeMascot() {
  return (
    <>
      {/* Aura */}
      <div className="kc-aura" style={{
        position: "absolute", inset: "-18%", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(244,197,74,0.38) 0%, rgba(217,119,87,0.25) 35%, rgba(139,92,246,0.14) 55%, transparent 72%)",
        zIndex: 0, pointerEvents: "none",
      }} />

      {/* Purple cape */}
      <svg viewBox="0 0 48 48" shapeRendering="crispEdges" className="cape-flap" style={{ position: "absolute", left: "-10%", top: "28%", width: "84%", height: "82%", zIndex: 0, overflow: "visible" }}>
        <path d="M8 6 L26 6 L26 10 L24 10 L24 12 L20 12 L20 16 L18 16 L18 22 L16 22 L16 30 L14 30 L14 38 L12 38 L12 42 L10 42 L10 44 L6 44 L6 40 L4 40 L4 30 L6 30 L6 20 L8 20 Z" fill={OL} />
        {Array.from({ length: 37 }).map((_, i) => {
          const y = 7 + i;
          let xL, wd;
          if (y <= 10) { xL = 9; wd = 15; }
          else if (y <= 15) { xL = 9; wd = 11; }
          else if (y <= 21) { xL = 9; wd = 9; }
          else if (y <= 24) { xL = 7; wd = 11; }
          else if (y <= 29) { xL = 7; wd = 9; }
          else if (y <= 37) { xL = 5; wd = 9; }
          else if (y <= 39) { xL = 7; wd = 5; }
          else if (y <= 42) { xL = 7; wd = 3; }
          else { xL = 8; wd = 2; }
          return <rect key={i} x={xL} y={y} width={wd} height={1} fill={CAPE_MAIN} />;
        })}
        <rect x={9} y={7} width={1} height={14} fill={CAPE_HI} />
        <rect x={7} y={22} width={1} height={7} fill={CAPE_HI} />
        <rect x={5} y={30} width={1} height={8} fill={CAPE_HI} />
        <rect x={13} y={30} width={1} height={7} fill={CAPE_SH} />
        <rect x={5} y={37} width={9} height={1} fill={CAPE_DEEP} />
        <rect x={10} y={6} width={14} height={1} fill={Y2} />
        <rect x={22} y={7} width={3} height={1} fill={Y3} />
        <rect x={22} y={8} width={3} height={1} fill={Y2} />
        <rect x={22} y={9} width={3} height={1} fill={Y3} />
        <rect x={23} y={8} width={1} height={1} fill={R} />
      </svg>

      {/* Staff pole behind body */}
      <svg viewBox="0 0 64 80" shapeRendering="crispEdges" style={{ position: "absolute", right: "-18%", top: "-10%", width: "72%", height: "118%", zIndex: 0, overflow: "visible", pointerEvents: "none" }}>
        <rect x={40} y={8}  width={1} height={58} fill={OL} />
        <rect x={44} y={8}  width={1} height={58} fill={OL} />
        <rect x={41} y={8}  width={3} height={58} fill={W2} />
        <rect x={41} y={8}  width={1} height={58} fill={W1} />
        <rect x={43} y={8}  width={1} height={58} fill={W3} />
        <rect x={39} y={20} width={7} height={1} fill={OL} />
        <rect x={39} y={21} width={7} height={2} fill={Y3} />
        <rect x={39} y={21} width={7} height={1} fill={Y2} />
        <rect x={39} y={24} width={7} height={1} fill={OL} />
        <rect x={39} y={46} width={7} height={1} fill={OL} />
        <rect x={39} y={47} width={7} height={2} fill={Y3} />
        <rect x={39} y={47} width={7} height={1} fill={Y2} />
        <rect x={39} y={50} width={7} height={1} fill={OL} />
      </svg>

      {/* Claude body */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/claudecode-color.svg" alt="" className="pixelated" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1 }} />

      {/* Black eyes */}
      <div className="kc-eye" style={{ position: "absolute", left: "25%", top: "33.75%", width: "6.25%", height: "11.67%", background: "#000", zIndex: 2 }} />
      <div className="kc-eye" style={{ position: "absolute", left: "68.75%", top: "33.75%", width: "6.25%", height: "11.67%", background: "#000", zIndex: 2 }} />

      {/* Smile */}
      <div style={{ position: "absolute", left: "42%", top: "50%", width: "14%", height: "5%", background: OL, borderRadius: "0 0 50% 50%", zIndex: 2 }} />

      {/* Big crown */}
      <svg viewBox="0 0 56 26" shapeRendering="crispEdges" style={{ position: "absolute", left: "8%", top: "-30%", width: "84%", zIndex: 3, overflow: "visible" }}>
        {/* Center spike */}
        <rect x={24} y={13} width={1} height={2} fill={OL} />
        <rect x={25} y={10} width={1} height={3} fill={OL} />
        <rect x={26} y={6}  width={1} height={4} fill={OL} />
        <rect x={27} y={3}  width={1} height={3} fill={OL} />
        <rect x={28} y={3}  width={1} height={3} fill={OL} />
        <rect x={29} y={6}  width={1} height={4} fill={OL} />
        <rect x={30} y={10} width={1} height={3} fill={OL} />
        <rect x={31} y={13} width={1} height={2} fill={OL} />
        <rect x={27} y={2}  width={2} height={1} fill={OL} />
        {Array.from({ length: 11 }).map((_, i) => {
          const y = 3 + i;
          const left = y < 6 ? 27 : y < 10 ? 26 : 25;
          const wd = y < 6 ? 2 : y < 10 ? 4 : 6;
          return <rect key={i} x={left} y={y} width={wd} height={1} fill={i < 3 ? Y1 : i < 6 ? Y2 : i < 9 ? Y3 : Y4} />;
        })}
        {/* Big blue gem on center spike */}
        <rect x={26} y={1} width={4} height={1} fill={OL} />
        <rect x={25} y={2} width={1} height={1} fill={OL} />
        <rect x={30} y={2} width={1} height={1} fill={OL} />
        <rect x={24} y={3} width={1} height={1} fill={OL} />
        <rect x={31} y={3} width={1} height={1} fill={OL} />
        <rect x={25} y={4} width={1} height={1} fill={OL} />
        <rect x={30} y={4} width={1} height={1} fill={OL} />
        <rect x={26} y={5} width={4} height={1} fill={OL} />
        <rect x={26} y={2} width={4} height={1} fill={B} />
        <rect x={25} y={3} width={6} height={1} fill={B} />
        <rect x={26} y={4} width={4} height={1} fill={B} />
        <rect x={26} y={2} width={2} height={1} fill={BH} />
        <rect x={25} y={3} width={2} height={1} fill={BH} />
        <rect x={26} y={3} width={1} height={1} fill={WHITE} />
        <rect x={28} y={4} width={2} height={1} fill={BD} />

        {/* Left spike */}
        <rect x={16} y={13} width={1} height={3} fill={OL} />
        <rect x={17} y={10} width={1} height={3} fill={OL} />
        <rect x={18} y={8}  width={1} height={2} fill={OL} />
        <rect x={19} y={7}  width={2} height={1} fill={OL} />
        <rect x={21} y={8}  width={1} height={2} fill={OL} />
        <rect x={22} y={10} width={1} height={3} fill={OL} />
        <rect x={23} y={13} width={1} height={2} fill={OL} />
        {Array.from({ length: 7 }).map((_, i) => {
          const y = 7 + i;
          const left = y < 10 ? 19 : 17;
          const wd = y < 10 ? 2 : 6;
          return <rect key={i} x={left} y={y} width={wd} height={1} fill={i < 2 ? Y1 : i < 4 ? Y2 : i < 6 ? Y3 : Y4} />;
        })}
        <rect x={19} y={4} width={2} height={1} fill={OL} />
        <rect x={19} y={5} width={1} height={1} fill={RH} />
        <rect x={20} y={5} width={1} height={1} fill={R} />

        {/* Right spike */}
        <rect x={32} y={13} width={1} height={2} fill={OL} />
        <rect x={33} y={10} width={1} height={3} fill={OL} />
        <rect x={34} y={8}  width={1} height={2} fill={OL} />
        <rect x={35} y={7}  width={2} height={1} fill={OL} />
        <rect x={37} y={8}  width={1} height={2} fill={OL} />
        <rect x={38} y={10} width={1} height={3} fill={OL} />
        <rect x={39} y={13} width={1} height={2} fill={OL} />
        {Array.from({ length: 7 }).map((_, i) => {
          const y = 7 + i;
          const left = y < 10 ? 35 : 33;
          const wd = y < 10 ? 2 : 6;
          return <rect key={i} x={left} y={y} width={wd} height={1} fill={i < 2 ? Y1 : i < 4 ? Y2 : i < 6 ? Y3 : Y4} />;
        })}
        <rect x={35} y={4} width={2} height={1} fill={OL} />
        <rect x={35} y={5} width={1} height={1} fill={GH} />
        <rect x={36} y={5} width={1} height={1} fill={G} />

        {/* Band */}
        <rect x={7}  y={14} width={9}  height={1} fill={OL} />
        <rect x={23} y={14} width={1}  height={1} fill={OL} />
        <rect x={31} y={14} width={1}  height={1} fill={OL} />
        <rect x={40} y={14} width={9}  height={1} fill={OL} />
        <rect x={6}  y={15} width={1}  height={6} fill={OL} />
        <rect x={49} y={15} width={1}  height={6} fill={OL} />
        <rect x={7}  y={21} width={42} height={1} fill={OL} />
        <rect x={7}  y={15} width={42} height={1} fill={Y1} />
        <rect x={7}  y={16} width={42} height={1} fill={Y2} />
        <rect x={7}  y={17} width={42} height={1} fill={Y2} />
        <rect x={7}  y={18} width={42} height={1} fill={Y3} />
        <rect x={7}  y={19} width={42} height={1} fill={Y4} />
        <rect x={7}  y={20} width={42} height={1} fill={Y4} />
        {/* Band gems */}
        <rect x={9}  y={15} width={3} height={1} fill={OL} />
        <rect x={9}  y={18} width={3} height={1} fill={OL} />
        <rect x={8}  y={16} width={1} height={2} fill={OL} />
        <rect x={12} y={16} width={1} height={2} fill={OL} />
        <rect x={9}  y={16} width={1} height={1} fill={WHITE} />
        <rect x={10} y={16} width={2} height={1} fill={R} />
        <rect x={9}  y={17} width={3} height={1} fill="#8E1A1A" />

        <rect x={25} y={15} width={3} height={1} fill={OL} />
        <rect x={25} y={18} width={3} height={1} fill={OL} />
        <rect x={24} y={16} width={1} height={2} fill={OL} />
        <rect x={28} y={16} width={1} height={2} fill={OL} />
        <rect x={25} y={16} width={1} height={1} fill={WHITE} />
        <rect x={26} y={16} width={2} height={1} fill={B} />
        <rect x={25} y={17} width={3} height={1} fill={BD} />

        <rect x={42} y={15} width={3} height={1} fill={OL} />
        <rect x={42} y={18} width={3} height={1} fill={OL} />
        <rect x={41} y={16} width={1} height={2} fill={OL} />
        <rect x={45} y={16} width={1} height={2} fill={OL} />
        <rect x={42} y={16} width={1} height={1} fill={WHITE} />
        <rect x={43} y={16} width={2} height={1} fill={G} />
        <rect x={42} y={17} width={3} height={1} fill="#1F5229" />
      </svg>

      {/* Staff blue orb on top */}
      <svg viewBox="0 0 64 80" shapeRendering="crispEdges" style={{ position: "absolute", right: "-18%", top: "-10%", width: "72%", height: "118%", zIndex: 3, overflow: "visible", pointerEvents: "none" }}>
        <rect x={38} y={7}  width={1} height={3} fill={OL} />
        <rect x={45} y={7}  width={1} height={3} fill={OL} />
        <rect x={39} y={7}  width={1} height={2} fill={Y2} />
        <rect x={44} y={7}  width={1} height={2} fill={Y3} />
        <rect x={37} y={2}  width={10} height={1} fill={OL} />
        <rect x={36} y={3}  width={1}  height={2} fill={OL} />
        <rect x={47} y={3}  width={1}  height={2} fill={OL} />
        <rect x={35} y={5}  width={1}  height={4} fill={OL} />
        <rect x={48} y={5}  width={1}  height={4} fill={OL} />
        <rect x={36} y={9}  width={1}  height={2} fill={OL} />
        <rect x={47} y={9}  width={1}  height={2} fill={OL} />
        <rect x={37} y={11} width={10} height={1} fill={OL} />
        <rect x={36} y={5}  width={12} height={4} fill={B} />
        <rect x={37} y={3}  width={10} height={2} fill={B} />
        <rect x={37} y={9}  width={10} height={2} fill={B} />
        <rect x={37} y={3}  width={4}  height={1} fill={BH} />
        <rect x={36} y={5}  width={3}  height={1} fill={BH} />
        <rect x={37} y={4}  width={2}  height={1} fill={BL} />
        <rect x={38} y={6}  width={2}  height={1} fill={BL} />
        <rect x={37} y={5}  width={1}  height={1} fill={WHITE} />
        <rect x={39} y={4}  width={1}  height={1} fill={WHITE} />
        <rect x={45} y={8}  width={3}  height={1} fill={BD} />
        <rect x={44} y={9}  width={4}  height={1} fill={BD} />
        <g className="staff-glow">
          <rect x={36} y={2}  width={12} height={1}  fill={BL} opacity={0.6} />
          <rect x={35} y={4}  width={1}  height={6}  fill={BL} opacity={0.6} />
          <rect x={48} y={4}  width={1}  height={6}  fill={BL} opacity={0.6} />
        </g>
      </svg>
    </>
  );
}

export default function ClaudeHeroBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const fadeIn = (delayMs: number): CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transition: `opacity 1000ms ease-out ${delayMs}ms`,
  });

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* ── Sky fallback ── */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #7EB8E8 0%, #B8D8F0 40%, #D4E8F5 70%, #A8D4B8 100%)" }} />

      {/* ── Layer 1: Background ── */}
      <div className="pixelated hero-back-pan" style={{ position: "absolute", inset: 0, backgroundImage: "url('/images/hero-back.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", ...fadeIn(100) }} />

      {/* ── Layer 2: Foreground (castle + village) ── */}
      <div className="pixelated hero-fg-pan" style={{ position: "absolute", inset: 0, backgroundImage: "url('/images/hero-foreground.png')", backgroundSize: "cover", backgroundPosition: "center bottom", backgroundRepeat: "no-repeat", ...fadeIn(200) }} />

      {/* ── Bridge ── */}
      <div className="pixelated hero-bridge-bob" style={{
        position: "absolute",
        left: POSITIONS.bridge.left,
        bottom: POSITIONS.bridge.bottom,
        transform: POSITIONS.bridge.centerX ? "translate(-50%, 0)" : undefined,
        width: POSITIONS.bridge.width,
        aspectRatio: POSITIONS.bridge.aspectRatio,
        backgroundImage: "url('/images/bridge.png')",
        backgroundSize: "contain",
        backgroundPosition: "center bottom",
        backgroundRepeat: "no-repeat",
        ...fadeIn(300)
      }} />

      {/* ── River ── */}
      <div className="pixelated hero-river-shimmer" style={{
        position: "absolute",
        left: POSITIONS.river.left,
        bottom: POSITIONS.river.bottom,
        transform: POSITIONS.river.centerX ? "translate(-50%, 0)" : undefined,
        width: POSITIONS.river.width,
        aspectRatio: POSITIONS.river.aspectRatio,
        backgroundImage: "url('/images/river.png')",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        mixBlendMode: POSITIONS.river.blend ? "screen" : "normal",
        opacity: mounted ? POSITIONS.river.opacity : 0,
        transition: "opacity 1000ms ease-out 250ms",
      }} />

      {/* ── Windmill ── */}
      <div className="pixelated hero-windmill-bob" style={{
        position: "absolute",
        right: POSITIONS.windmill.right,
        bottom: POSITIONS.windmill.bottom,
        width: POSITIONS.windmill.width,
        aspectRatio: POSITIONS.windmill.aspectRatio,
        backgroundImage: "url('/images/windmill.png')",
        backgroundSize: "contain",
        backgroundPosition: "center bottom",
        backgroundRepeat: "no-repeat",
        filter: "drop-shadow(0 4px 4px rgba(0,0,0,0.28))",
        ...fadeIn(400)
      }} />

      {/* ── Chest ── */}
      <div className="pixelated hero-chest-bob" style={{
        position: "absolute",
        left: POSITIONS.chest.left,
        bottom: POSITIONS.chest.bottom,
        transform: POSITIONS.chest.centerX ? "translateX(-50%)" : undefined,
        width: POSITIONS.chest.width,
        aspectRatio: POSITIONS.chest.aspectRatio,
        backgroundImage: "url('/images/chest.png')",
        backgroundSize: "contain",
        backgroundPosition: "center bottom",
        backgroundRepeat: "no-repeat",
        filter: "drop-shadow(0 8px 4px rgba(0,0,0,0.35))",
        ...fadeIn(500)
      }} />

      {/* ── Wooden sign ── */}
      <div className="pixelated hero-sign-bob" style={{
        position: "absolute",
        right: POSITIONS.sign.right,
        bottom: POSITIONS.sign.bottom,
        width: POSITIONS.sign.width,
        aspectRatio: POSITIONS.sign.aspectRatio,
        display: "flex", alignItems: "center", justifyContent: "center",
        ...fadeIn(550)
      }}>
        <div style={{
          position: "relative",
          width: "100%",
          height: "68%",
          background: W1,
          border: `3px solid ${OL}`,
          borderRadius: "4px",
          boxShadow: `inset 0 -4px 0 ${W2}, 0 4px 0 ${OL}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: FONT_STACK,
          fontSize: "clamp(11px, 1.2vw, 17px)",
          fontWeight: 700,
          color: OL,
          letterSpacing: "0.05em",
          padding: "0 8px",
          whiteSpace: "nowrap",
        }}>
          冒険のはじまり
        </div>
        <div style={{ position: "absolute", left: "48%", bottom: "-20%", width: "4px", height: "22%", background: W2, borderLeft: `1px solid ${OL}`, borderRight: `1px solid ${OL}` }} />
      </div>

      {/* ── Sword ── */}
      <div className="pixelated hero-sword-shine" style={{
        position: "absolute",
        right: POSITIONS.sword.right,
        bottom: POSITIONS.sword.bottom,
        width: POSITIONS.sword.width,
        aspectRatio: POSITIONS.sword.aspectRatio,
        backgroundImage: "url('/images/sword.png')",
        backgroundSize: "contain",
        backgroundPosition: "center bottom",
        backgroundRepeat: "no-repeat",
        filter: "drop-shadow(0 6px 4px rgba(0,0,0,0.3))",
        ...fadeIn(600)
      }} />

      {/* ── h1 halo ── */}
      <div style={{ position: "absolute", top: "2%", left: "50%", transform: "translateX(-50%)", width: "min(820px, 64vw)", height: "min(520px, 58vh)", borderRadius: "50%", background: "radial-gradient(ellipse at 50% 42%, rgba(255,253,244,0.78) 0%, rgba(255,253,244,0.52) 32%, rgba(255,247,215,0.28) 55%, transparent 78%)" }} />

      {/* ── King Claude (BIG + prominent) ── */}
      <div
        className="hero-claude-float"
        style={{
          position: "absolute",
          right: POSITIONS.claude.right,
          top: POSITIONS.claude.top,
          width: POSITIONS.claude.width,
          aspectRatio: POSITIONS.claude.aspectRatio,
          ...fadeIn(700),
        }}
      >
        <KingClaudeMascot />
      </div>

      {/* ── RPG text boxes ── */}
      <div style={{ position: "absolute", top: POSITIONS.menuBox.top, left: POSITIONS.menuBox.left, ...fadeIn(800) }}><MenuBoxTop /></div>
      <div style={{ position: "absolute", top: POSITIONS.statsBox.top, left: POSITIONS.statsBox.left, ...fadeIn(900) }}><StatsBox /></div>
      <div style={{ position: "absolute", bottom: POSITIONS.dialogueBox.bottom, left: POSITIONS.dialogueBox.left, ...fadeIn(1000) }}><DialogueBox /></div>
      <div style={{ position: "absolute", bottom: POSITIONS.battleMenu.bottom, right: POSITIONS.battleMenu.right, ...fadeIn(1100) }}><BattleMenu /></div>

      {/* ── Sparkles ── */}
      <div className="absolute inset-0 pointer-events-none">
        {SPARKLES.map((s, i) => (
          <div key={i} className="hero-twinkle pixelated" style={{ position: "absolute", top: s.top, left: s.left, width: "4px", height: "4px", background: WHITE, boxShadow: "0 0 6px rgba(255,248,200,0.9)", animationDelay: `${s.delay}s` }} />
        ))}
      </div>

      <style>{`
        .pixelated { image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: crisp-edges; }

        @keyframes heroBackPan { 0%,100%{transform:scale(1.05) translateX(0);} 50%{transform:scale(1.05) translateX(-14px);} }
        .hero-back-pan { animation: heroBackPan 50s ease-in-out infinite; transform: scale(1.05); }
        @keyframes heroFgPan { 0%,100%{transform:scale(1.02) translateX(0);} 50%{transform:scale(1.02) translateX(-8px);} }
        .hero-fg-pan { animation: heroFgPan 25s ease-in-out infinite; transform: scale(1.02); transform-origin: center bottom; }

        @keyframes heroRiverShimmer {
          0%,100% { transform: translate(-50%, 0); filter: brightness(1) saturate(1); }
          50% { transform: translate(-50%, -1px); filter: brightness(1.12) saturate(1.15); }
        }
        .hero-river-shimmer { animation: heroRiverShimmer 7s ease-in-out infinite; }

        @keyframes heroBridgeBob { 0%,100%{transform:translate(-50%,0) rotate(0deg);} 50%{transform:translate(-50%,-3px) rotate(0.3deg);} }
        .hero-bridge-bob { animation: heroBridgeBob 5s ease-in-out infinite; }

        @keyframes heroChestBob {
          0%,100% { transform: translateX(-50%) translateY(0) rotate(0deg); }
          25%     { transform: translateX(-50%) translateY(-4px) rotate(-1.2deg); }
          50%     { transform: translateX(-50%) translateY(-6px) rotate(0deg); }
          75%     { transform: translateX(-50%) translateY(-4px) rotate(1.2deg); }
        }
        .hero-chest-bob { animation: heroChestBob 2.6s ease-in-out infinite; }

        @keyframes heroSwordShine {
          0%,100% { transform: translateY(0); filter: drop-shadow(0 6px 4px rgba(0,0,0,0.3)) drop-shadow(0 0 3px rgba(135,184,232,0.3)) brightness(1); }
          50%     { transform: translateY(-5px); filter: drop-shadow(0 6px 4px rgba(0,0,0,0.3)) drop-shadow(0 0 14px rgba(135,184,232,0.9)) brightness(1.18); }
        }
        .hero-sword-shine { animation: heroSwordShine 2.8s ease-in-out infinite; }

        @keyframes heroWindmillBob { 0%,100%{transform:translateY(0) rotate(0deg);} 50%{transform:translateY(-3px) rotate(-0.4deg);} }
        .hero-windmill-bob { animation: heroWindmillBob 3.4s ease-in-out infinite; }

        @keyframes heroSignBob { 0%,100%{transform:translateY(0) rotate(-1deg);} 50%{transform:translateY(-3px) rotate(1deg);} }
        .hero-sign-bob { animation: heroSignBob 4s ease-in-out infinite; }

        @keyframes heroClaudeFloat { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);} }
        .hero-claude-float { animation: heroClaudeFloat 2.8s ease-in-out infinite; }

        @keyframes kcAura { 0%,100%{opacity:0.78;transform:scale(1);} 50%{opacity:1;transform:scale(1.05);} }
        .kc-aura { animation: kcAura 2.4s ease-in-out infinite; }

        @keyframes kcEyeBlink { 0%,92%{transform:scaleY(1);} 94%,97%{transform:scaleY(0.15);} 98%,100%{transform:scaleY(1);} }
        .kc-eye { animation: kcEyeBlink 4.4s steps(1, end) infinite; transform-origin: center; }

        @keyframes capeFlap { 0%,49%{transform:translateX(0) skewY(0deg);} 50%,100%{transform:translateX(-0.5px) skewY(-0.6deg);} }
        .cape-flap { animation: capeFlap 1.6s steps(2) infinite; transform-box: fill-box; transform-origin: 50% 0%; }

        @keyframes staffGlow { 0%,49%{opacity:0.35;} 50%,100%{opacity:0.9;} }
        .staff-glow { animation: staffGlow 1.4s steps(2) infinite; }

        @keyframes heroTwinkle { 0%,100%{opacity:0;transform:scale(0.5);} 50%{opacity:1;transform:scale(1);} }
        .hero-twinkle { animation: heroTwinkle 2.2s ease-in-out infinite; }

        /* RPG frames */
        .rpg-frame {
          position: relative;
          background: ${NAVY_BOX};
          color: ${WHITE};
          border: 3px solid ${YELLOW};
          border-radius: 8px;
          box-shadow: 0 0 0 2px ${NAVY_DEEP} inset, 0 6px 0 0 rgba(0,0,0,0.35), 0 10px 24px -4px rgba(0,0,0,0.55);
          pointer-events: auto;
        }
        .rpg-frame::before {
          content: "";
          position: absolute;
          inset: 5px;
          border: 1px solid ${YELLOW};
          border-radius: 3px;
          opacity: 0.85;
          pointer-events: none;
          z-index: 0;
        }
        .rpg-frame > * { position: relative; z-index: 1; }
        .rpg-cursor { display: inline-block; animation: rpg-cursor-blink 0.5s steps(2, end) infinite; text-shadow: 1px 1px 0 ${NAVY_DEEP}; }
        @keyframes rpg-cursor-blink { 0%{opacity:1;} 50%{opacity:0;} 100%{opacity:1;} }
        .rpg-next { display: inline-block; animation: rpg-next-bounce 0.8s steps(2, end) infinite; text-shadow: 1px 1px 0 ${NAVY_DEEP}; }
        @keyframes rpg-next-bounce { 0%{transform:translateY(0);opacity:1;} 50%{transform:translateY(3px);opacity:0.45;} 100%{transform:translateY(0);opacity:1;} }

        @media (prefers-reduced-motion: reduce) {
          .hero-back-pan, .hero-fg-pan, .hero-river-shimmer, .hero-bridge-bob,
          .hero-chest-bob, .hero-sword-shine, .hero-windmill-bob, .hero-sign-bob,
          .hero-claude-float, .kc-aura, .kc-eye, .cape-flap, .staff-glow,
          .hero-twinkle, .rpg-cursor, .rpg-next {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 数値だけを 0 からカウントアップする表示用コンポーネント。
 * - 文字列の中の「数字」部分だけをアニメーションし、前後の語（"最大""%""営業日"等）は保持。
 *   例: "最大75%" → 最大0% → 最大75% / "2営業日" → 0営業日 → 2営業日
 * - 数字を含まない値（"無料""全国対応""日本"）や西暦（"2026"）はそのまま静的表示。
 * - 画面に入った時に1回だけ実行。prefers-reduced-motion では即・最終値。
 */
function parse(value: string) {
  const m = /^(\D*?)(\d[\d,]*)(\D*)$/.exec(value);
  if (!m) return null;
  const target = parseInt(m[2].replace(/,/g, ""), 10);
  if (isNaN(target) || (target >= 1900 && target <= 2100)) return null; // 西暦などはアニメ対象外
  return { prefix: m[1], target, suffix: m[3] };
}

export default function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(() => {
    const p = parse(value);
    return p ? `${p.prefix}0${p.suffix}` : value;
  });

  useEffect(() => {
    const p = parse(value);
    if (!p) { setDisplay(value); return; }
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(`${p.prefix}${p.target}${p.suffix}`);
      return;
    }
    let raf = 0, t0 = 0, started = false;
    const dur = 900;
    const tick = (ts: number) => {
      if (!t0) t0 = ts;
      const k = Math.min((ts - t0) / dur, 1);
      const v = Math.round(p.target * (1 - Math.pow(1 - k, 3))); // ease-out
      setDisplay(`${p.prefix}${v}${p.suffix}`);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started) {
          started = true;
          raf = requestAnimationFrame(tick);
          obs.unobserve(el);
        }
      },
      { threshold: 0.6 }
    );
    obs.observe(el);
    return () => { cancelAnimationFrame(raf); obs.disconnect(); };
  }, [value]);

  return <span ref={ref} className={`tabular-nums ${className}`}>{display}</span>;
}

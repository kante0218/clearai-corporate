"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";

/*
 * カード横スクロール（SP専用、PCは従来グリッド）。
 * - カードが4枚以上: SPでは「2×2の正方形（左上1/右上2/左下3/右下4）」を1ページとして横スワイプ。
 * - 3枚以下: SPでは1枚ずつ横スワイプ。
 * - PC(md+): gridClass の従来グリッドのまま（変更なし）。
 * 縦には動かず横のみ。childrenは1枚=1カード。
 */
export default function CardCarousel({ children, className = "", gridClass = "md:grid-cols-3" }: { children: ReactNode; className?: string; gridClass?: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const items = Children.toArray(children);
  const grid2x2 = items.length >= 4;
  const slides: ReactNode[][] = grid2x2
    ? Array.from({ length: Math.ceil(items.length / 4) }, (_, i) => items.slice(i * 4, i * 4 + 4))
    : items.map((it) => [it]);
  const single = slides.length <= 1;

  const indexFromScroll = (el: HTMLDivElement) => {
    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-cc-slide]"));
    const center = el.scrollLeft + el.clientWidth / 2;
    let best = 0, bestDist = Infinity;
    cards.forEach((c, i) => {
      const cc = c.offsetLeft + c.offsetWidth / 2;
      const d = Math.abs(cc - center);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    return best;
  };

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const s = el.querySelectorAll<HTMLElement>("[data-cc-slide]")[i];
    if (!s) return;
    el.scrollTo({ left: s.offsetLeft - (el.clientWidth - s.clientWidth) / 2, behavior: "smooth" });
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setActive(indexFromScroll(el)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => { el.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className={className}>
      {/* SP: 横スワイプ（4枚以上は2×2、3枚以下は1枚ずつ） */}
      <div className="md:hidden">
        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto snap-x snap-proximity -mx-6 px-6 pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((slide, si) => (
            <div
              key={si}
              data-cc-slide
              className={`snap-center shrink-0 ${single ? "w-full" : grid2x2 ? "w-[92%]" : "w-[80%]"} ${grid2x2 ? "grid grid-cols-2 gap-3 items-stretch" : "flex"}`}
            >
              {slide.map((card, ci) => (
                <div key={ci} data-cc-card className="flex [&>*]:w-full">{card}</div>
              ))}
            </div>
          ))}
        </div>
        {slides.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`${i + 1}番目を表示`}
                aria-current={active === i}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${active === i ? "w-6 bg-neutral-900" : "w-2 bg-gray-300"}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* PC(md+): 従来グリッド（変更なし） */}
      <div className={`hidden md:grid ${gridClass} gap-6 items-stretch`}>
        {items}
      </div>
    </div>
  );
}

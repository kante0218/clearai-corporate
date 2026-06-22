"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";

/*
 * 汎用カード横スクロール。
 * - SP: 横スワイプ(snap)＋ドット。縦スクロール量を減らす。
 * - PC(md+): 従来どおり3カラムのグリッド。
 * 自動送りなし(手動スワイプ)。childrenは1枚=1カード。
 */
export default function CardCarousel({ children, className = "", gridClass = "md:grid-cols-3" }: { children: ReactNode; className?: string; gridClass?: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const items = Children.toArray(children);

  const indexFromScroll = (el: HTMLDivElement) => {
    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-cc-card]"));
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
    const card = el.querySelectorAll<HTMLElement>("[data-cc-card]")[i];
    if (!card) return;
    el.scrollTo({ left: card.offsetLeft - (el.clientWidth - card.clientWidth) / 2, behavior: "smooth" });
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
      <div
        ref={trackRef}
        className={`flex md:grid ${gridClass} gap-4 md:gap-6 items-stretch overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none touch-pan-x overscroll-x-contain -mx-6 px-6 md:mx-0 md:px-0 pb-4 md:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden`}
      >
        {items.map((child, i) => (
          <div key={i} data-cc-card className="snap-center shrink-0 w-[80%] sm:w-[55%] md:w-full flex [&>*]:w-full">{child}</div>
        ))}
      </div>
      {items.length > 1 && (
        <div className="flex md:hidden justify-center gap-2 mt-4">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`${i + 1}枚目を表示`}
              aria-current={active === i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${active === i ? "w-6 bg-neutral-900" : "w-2 bg-gray-300"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";

/*
 * Pricing layout wrapper.
 * - Desktop (md+): unchanged 3-column grid.
 * - Mobile (SP): horizontal swipeable carousel with snap, auto-advance, and dots.
 * Card markup is passed in as children (one per plan), so each page keeps its own card design.
 */
export default function PricingCarousel({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const pausedRef = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const items = Children.toArray(children);

  const indexFromScroll = (el: HTMLDivElement) => {
    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-plan-card]"));
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
    const card = el.querySelectorAll<HTMLElement>("[data-plan-card]")[i];
    if (!card) return;
    el.scrollTo({ left: card.offsetLeft - (el.clientWidth - card.clientWidth) / 2, behavior: "smooth" });
  };

  // Keep the active dot in sync with manual scrolling.
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

  // Auto-advance on mobile; paused on interaction / off-screen / reduced motion.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.3 });
    io.observe(el);
    const isMobile = () => window.matchMedia("(max-width: 767px)").matches;
    const id = setInterval(() => {
      if (pausedRef.current || !visible || !isMobile()) return;
      const cards = el.querySelectorAll<HTMLElement>("[data-plan-card]");
      if (cards.length < 2) return;
      goTo((indexFromScroll(el) + 1) % cards.length);
    }, 3500);
    return () => { clearInterval(id); io.disconnect(); };
  }, []);

  const pause = () => { pausedRef.current = true; if (resumeTimer.current) clearTimeout(resumeTimer.current); };
  const resumeLater = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => { pausedRef.current = false; }, 5000);
  };

  return (
    <>
      <div
        ref={trackRef}
        onPointerDown={pause}
        onPointerUp={resumeLater}
        onMouseEnter={pause}
        onMouseLeave={resumeLater}
        className="flex md:grid md:grid-cols-3 gap-5 md:gap-6 items-stretch overflow-x-auto md:overflow-visible snap-x snap-proximity md:snap-none -mx-6 px-6 md:mx-0 md:px-0 pb-4 md:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((child, i) => (
          <div key={i} data-plan-card className="snap-center shrink-0 w-[82%] sm:w-[60%] md:w-full flex [&>*]:w-full">{child}</div>
        ))}
      </div>
      {items.length > 1 && (
        <div className="flex md:hidden justify-center gap-1.5 mt-3">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`${i + 1}枚目のプランを表示`}
              aria-current={active === i}
              onClick={() => { pause(); goTo(i); resumeLater(); }}
              className={`h-1 rounded-full transition-all duration-300 ${active === i ? "w-5 bg-neutral-900" : "w-2 bg-gray-300"}`}
            />
          ))}
        </div>
      )}
    </>
  );
}

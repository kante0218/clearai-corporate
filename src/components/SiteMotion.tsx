"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";

/** Progressive enhancement: all reading content is visible before JavaScript runs. */
export default function SiteMotion() {
  const pathname = usePathname();
  const { lang } = useLanguage();
  const progress = useRef<HTMLDivElement>(null);
  const isTrainingLp = pathname === "/training/claude-code" || pathname === "/training/codex";

  useEffect(() => {
    if (isTrainingLp || /^\/(contact|reserve|lp)(\/|$)/.test(pathname)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let dispose = () => {};
    const setup = () => {
      dispose();
      if (preference.matches) return;
      const animations = new Set<Animation>();
      const play = (element: HTMLElement, frames: Keyframe[], duration: number, delay = 0) => {
        if (element.contains(document.activeElement) || element.querySelector("[data-motion]")) return;
        const animation = element.animate(frames, { duration, delay, easing: "cubic-bezier(.2,.75,.25,1)" });
        animations.add(animation);
        animation.finished.then(() => animations.delete(animation)).catch(() => {});
      };
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return;
          observer.unobserve(target);
          const element = target as HTMLElement;
          const isHeading = element.dataset.motion === "heading";
          const isRule = element.dataset.motion === "rule";
          play(element, isRule
            ? [{ transform: "scaleX(.85)", opacity: .6 }, { transform: "scaleX(1)", opacity: 1 }]
            : [{ transform: `translate${isHeading ? "X" : "Y"}(${isHeading ? "-10" : "14"}px)`, opacity: .65 }, { transform: "none", opacity: 1 }], isHeading ? 620 : 520, Number(element.dataset.motionDelay || 0));
        });
      }, { threshold: .12 });
      document.querySelectorAll<HTMLElement>("[data-motion]").forEach((element) => observer.observe(element));
      const disclosures = [...document.querySelectorAll<HTMLDetailsElement>("details[data-motion-disclosure]")];
      const onToggle = (event: Event) => {
        const element = event.currentTarget as HTMLDetailsElement;
        if (element.open) [...element.children].filter((child) => child.tagName !== "SUMMARY").forEach((child) => play(child as HTMLElement, [{ opacity: .7, transform: "translateY(-6px)" }, { opacity: 1, transform: "none" }], 280));
      };
      disclosures.forEach((element) => element.addEventListener("toggle", onToggle));
      let frame = 0;
      const update = () => {
        frame = 0;
        const distance = document.documentElement.scrollHeight - window.innerHeight;
        if (progress.current) progress.current.style.transform = `scaleX(${distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0})`;
      };
      const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      update();
      dispose = () => {
        observer.disconnect();
        animations.forEach((animation) => animation.cancel());
        disclosures.forEach((element) => element.removeEventListener("toggle", onToggle));
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        cancelAnimationFrame(frame);
        if (progress.current) progress.current.style.transform = "scaleX(0)";
      };
    };
    setup();
    preference.addEventListener("change", setup);
    return () => { dispose(); preference.removeEventListener("change", setup); };
  }, [pathname, lang, isTrainingLp]);

  if (isTrainingLp) return null;

  return <div data-reading-progress ref={progress} aria-hidden="true" className="site-reading-progress" />;
}

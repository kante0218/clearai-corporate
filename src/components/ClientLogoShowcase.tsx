"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CLIENT_LOGOS } from "@/components/ClientLogoGrid";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const homeLogos = [
  ...CLIENT_LOGOS,
  { name: "かんでんエンジニアリング", href: "https://www.kanden-eng.co.jp/", src: "/images/clients/kanden-engineering.png", width: 696, height: 391 },
  { name: "デジタル情報戦略室", href: "https://disr-inc.com/", src: "/images/clients/digital-strategy-room.png", width: 659, height: 465 },
];

function LogoImage({ logo }: { logo: (typeof homeLogos)[number] }) {
  if (logo.src === "/images/clients/kanden-engineering.png") {
    return <span className="block aspect-[696/201] w-full max-w-[calc(36px*696/201)] overflow-hidden md:max-w-[calc(44px*696/201)]"><Image src={logo.src} alt={`${logo.name} ロゴ`} width={logo.width} height={logo.height} className="h-full w-full object-cover object-center opacity-90" sizes="(max-width: 767px) 125px, 153px" /></span>;
  }
  if (logo.src === "/images/clients/digital-strategy-room.png") {
    return <span className="relative block aspect-[530/120] w-full max-w-[176px] overflow-hidden"><Image src={logo.src} alt={`${logo.name} ロゴ`} width={logo.width} height={logo.height} className="absolute left-1/2 top-1/2 h-auto w-[124.34%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-90" sizes="219px" /></span>;
  }
  if (logo.src === "/images/clients/local-dive.png") {
    return <Image src={logo.src} alt={`${logo.name} ロゴ`} width={logo.width} height={logo.height} className="h-auto w-full max-w-[176px] object-contain opacity-90" sizes="176px" />;
  }
  return <Image src={logo.src} alt={`${logo.name} ロゴ`} width={logo.width} height={logo.height} className="h-9 w-auto max-w-full object-contain opacity-90 md:h-11" sizes="(max-width: 640px) 176px, 220px" />;
}

export default function ClientLogoShowcase({ label }: { label: string }) {
  const { lang } = useLanguage();
  const [flowing, setFlowing] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setFlowing(!preference.matches);
      if (preference.matches && viewportRef.current) viewportRef.current.scrollLeft = 0;
    };
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    const group = groupRef.current;
    if (!flowing || !viewport || !group) return;
    let distance = group.getBoundingClientRect().width;
    let position = viewport.scrollLeft;
    const measure = () => {
      distance = group.getBoundingClientRect().width;
      if (distance && !focused) {
        position = viewport.scrollLeft % distance;
        viewport.scrollLeft = position;
      }
    };
    const observer = new ResizeObserver(measure);
    observer.observe(group);
    observer.observe(viewport);
    let frame = 0;
    let previousTime: number | undefined;
    let visible = true;
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      previousTime = undefined;
    });
    visibility.observe(viewport);
    const tick = (time: number) => {
      if (visible && !document.hidden && !viewport.matches(":focus-within")) {
        if (previousTime !== undefined && distance) {
          position = (position + Math.min(time - previousTime, 100) * 0.064) % distance;
          viewport.scrollLeft = position;
        }
        previousTime = time;
      } else previousTime = undefined;
      frame = requestAnimationFrame(tick);
    };
    if (!paused && !hovered && !focused) frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
    };
  }, [flowing, paused, hovered, focused]);

  return (
    <div className="logo-flow mt-16 border-t border-gray-200 pt-14 pb-6 md:pb-8" data-flowing={flowing}>
      <div className="mb-9 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gray-400">{label}</p>
        {flowing && <button data-ui-button="control" type="button" aria-pressed={paused} onClick={() => setPaused(!paused)} className="logo-flow-controls min-h-11 px-3 text-sm text-neutral-600 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">{lang === "ja" ? paused ? "ロゴの流れを再生" : "ロゴの流れを一時停止" : paused ? "Resume logo movement" : "Pause logo movement"}</button>}
      </div>
      <div ref={viewportRef} className="logo-flow-viewport py-2" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={(event) => {
        setFocused(true);
        const target = event.target;
        if (target instanceof HTMLElement && !target.closest(".logo-flow-copy")) {
          target.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "instant" });
          const bounds = target.getBoundingClientRect();
          const view = event.currentTarget.getBoundingClientRect();
          if (bounds.left < view.left + 4) event.currentTarget.scrollLeft += bounds.left - view.left - 4;
          else if (bounds.right > view.right - 4) event.currentTarget.scrollLeft += bounds.right - view.right + 4;
        }
      }} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
        <div className="logo-flow-track">
          {[false, true].map((copy) => (
            <ul key={String(copy)} ref={copy ? undefined : groupRef} aria-hidden={copy ? true : undefined} className={`logo-flow-group grid grid-cols-2 items-center gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6${copy ? " logo-flow-copy" : ""}`}>
              {homeLogos.map((logo) => (
                <li key={logo.name} className="flex min-h-11 min-w-0 flex-col items-center justify-center gap-2">
                  {logo.href ? <a href={logo.href} target="_blank" rel="noopener noreferrer" tabIndex={copy ? -1 : undefined} onPointerDown={copy ? (event) => event.preventDefault() : undefined} aria-label={`${logo.name} 公式サイト`} className="flex min-h-11 w-full min-w-0 max-w-full items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-4"><LogoImage logo={logo} /></a> : <LogoImage logo={logo} />}
                  {(logo.name === "JASO" || logo.name === "お宿 いけがみ") && <Link href="/website-production#works" tabIndex={copy ? -1 : undefined} className="text-xs font-semibold text-neutral-700 underline underline-offset-4">{lang === "ja" ? "Web制作の実績" : "Web production work"}</Link>}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm text-neutral-600">
        <p>{lang === "ja" ? "ロゴは各社公式サイトへ進みます。支援内容の記録は導入実績をご覧ください。" : "Logos link to company websites. Read our case studies for engagement details."}</p>
        <Link href="/case-studies" className="font-semibold text-neutral-900 underline underline-offset-4">{lang === "ja" ? "支援事例を見る" : "View case studies"}</Link>
      </div>
      <style>{`
        .logo-flow-copy { display: none; }
        .logo-flow[data-flowing="true"] .logo-flow-viewport { overflow: hidden; scroll-behavior: auto; }
        .logo-flow[data-flowing="true"] .logo-flow-track { display: flex; width: max-content; }
        .logo-flow[data-flowing="true"] .logo-flow-group { display: flex; flex-shrink: 0; width: max-content; gap: 56px; padding-right: 56px; }
        .logo-flow[data-flowing="true"] .logo-flow-group > li { width: 176px; flex-shrink: 0; }
        @media (min-width: 768px) {
          .logo-flow[data-flowing="true"] .logo-flow-group { gap: 88px; padding-right: 88px; }
          .logo-flow[data-flowing="true"] .logo-flow-group > li { width: 220px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .logo-flow[data-flowing="true"] .logo-flow-viewport { overflow: visible; }
          .logo-flow[data-flowing="true"] .logo-flow-track { display: block; width: auto; }
          .logo-flow[data-flowing="true"] .logo-flow-group { display: grid; width: auto; gap: 2rem 1.5rem; padding-right: 0; }
          .logo-flow[data-flowing="true"] .logo-flow-group > li { width: auto; }
          .logo-flow[data-flowing="true"] .logo-flow-copy, .logo-flow-controls { display: none; }
        }
      `}</style>
    </div>
  );
}

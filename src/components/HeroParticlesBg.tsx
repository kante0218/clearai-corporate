"use client";

import dynamic from "next/dynamic";

const HeroParticles = dynamic(() => import("./HeroParticles"), {
  ssr: false,
  loading: () => null,
});

export default function HeroParticlesBg() {
  return (
    <div className="absolute inset-y-0 right-0 z-0 hidden md:block w-full md:w-[58%] lg:w-[55%] select-none">
      <HeroParticles />
      <span className="pointer-events-none absolute bottom-6 right-6 lg:bottom-8 lg:right-10 inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-neutral-400">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-neutral-400 animate-pulse" />
        クリックで変化
      </span>
    </div>
  );
}

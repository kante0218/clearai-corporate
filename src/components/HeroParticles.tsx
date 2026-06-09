"use client";

import { useEffect, useRef } from "react";

// Mounts the tuned vanilla-three ParticleHero engine (earth → jellyfish →
// butterfly, drawn entirely as black dots on white; drag to rotate, click to
// advance). The engine manages its own renderer, controls, pointer events and
// animation loop, so this wrapper only owns the container element + lifecycle.
export default function HeroParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let hero: { dispose?: () => void } | null = null;
    let disposed = false;

    import("@/components/hero/ParticleHero").then(({ ParticleHero }) => {
      if (disposed || !containerRef.current) return;
      hero = new ParticleHero(containerRef.current);
    });

    return () => {
      disposed = true;
      hero?.dispose?.();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 h-full w-full" />;
}

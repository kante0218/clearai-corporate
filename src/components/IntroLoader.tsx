"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function IntroLoader() {
  const [fading, setFading] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const showMs = reduce ? 200 : 2200; // spin duration before fade
    const gone = reduce ? 600 : 2950; // fully removed after fade

    document.body.style.overflow = "hidden"; // lock scroll while intro shows
    const t1 = setTimeout(() => {
      setFading(true);
      document.body.style.overflow = "";
    }, showMs);
    const t2 = setTimeout(() => setRemoved(true), gone);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  if (removed) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-700 ease-out ${
        fading ? "opacity-0" : "opacity-100"
      }`}
      style={{ pointerEvents: fading ? "none" : "auto" }}
    >
      <div className="flex flex-col items-center gap-5">
        <Image
          src="/images/logo-symbol.png"
          alt=""
          width={72}
          height={72}
          priority
          className="h-[72px] w-[72px] animate-[spin_3.6s_linear_infinite] object-contain [will-change:transform]"
        />
        <span className="text-sm font-semibold tracking-[0.3em] text-neutral-900">
          clearAI
        </span>
      </div>
    </div>
  );
}

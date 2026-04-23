"use client";

import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => null,
});

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <HeroScene />
    </div>
  );
}

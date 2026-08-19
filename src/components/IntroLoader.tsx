"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Intro shows the hummingbird mark (public/images/logo-clear-bird.png, 665x547)
// rising softly into place with a luminous halo, then the overlay fades out.
export default function IntroLoader() {
  const pathname = usePathname();
  const [fading, setFading] = useState(false);
  const [removed, setRemoved] = useState(false);
  const isStandaloneLp = pathname?.startsWith("/lp/ai-development-consultation");

  useEffect(() => {
    if (isStandaloneLp) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const showMs = reduce ? 200 : 1800; // mark settles at ~1.2s + a quiet hold
    const gone = reduce ? 1250 : 2850; // fully removed after the 1s fade

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
  }, [isStandaloneLp]);

  if (isStandaloneLp || removed) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-1000 ease-out ${
        fading ? "opacity-0" : "opacity-100"
      }`}
      style={{ pointerEvents: fading ? "none" : "auto" }}
    >
      <div className="relative">
        <Image
          src="/images/logo-clear-bird.png"
          alt=""
          width={665}
          height={547}
          priority
          className="intro-bird intro-bird-glow absolute inset-0 h-24 w-auto md:h-32"
        />
        <Image
          src="/images/logo-clear-bird.png"
          alt=""
          width={665}
          height={547}
          priority
          className="intro-bird h-24 w-auto md:h-32"
        />
      </div>
      <style>{`
        .intro-bird {
          opacity: 0;
          transform: translateY(14px) scale(0.94);
          animation: introBird 1.2s cubic-bezier(0.22, 0.9, 0.35, 1) forwards;
        }
        .intro-bird-glow {
          filter: blur(14px);
          animation-name: introBirdGlow;
        }
        @keyframes introBird {
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes introBirdGlow {
          to { opacity: 0.45; transform: translateY(0) scale(1.04); }
        }
        @media (prefers-reduced-motion: reduce) {
          .intro-bird {
            animation: none;
            opacity: 1;
            transform: none;
          }
          .intro-bird-glow {
            opacity: 0.45;
          }
        }
      `}</style>
    </div>
  );
}

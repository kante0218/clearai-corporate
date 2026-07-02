"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * ページ遷移プログレスバー（白黒基調）。
 * 内部リンクのクリックで開始し、URL(パス)が変わった時点で完了させる。
 * App Router 向けの軽量な自前実装（外部ライブラリ不要）。
 * ブラウザの戻る/進むなどクリックを伴わない遷移では表示しない。
 */
export default function RouteProgress() {
  const pathname = usePathname();
  const [width, setWidth] = useState(0);
  const [active, setActive] = useState(false);
  const timers = useRef<number[]>([]);
  const firstRender = useRef(true);

  const clearTimers = () => {
    timers.current.forEach((id) => clearTimeout(id));
    timers.current = [];
  };

  // 内部リンクのクリックで開始
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as HTMLElement)?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      const target = anchor.getAttribute("target");
      if (!href || target === "_blank") return;
      if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      // 外部リンクは除外
      if (/^https?:\/\//i.test(href) && !href.includes(window.location.host)) return;
      // 同じパスへの遷移は無視
      try {
        if (new URL(href, window.location.href).pathname === window.location.pathname) return;
      } catch {
        return;
      }
      clearTimers();
      setActive(true);
      setWidth(12);
      timers.current.push(window.setTimeout(() => setWidth(55), 120));
      timers.current.push(window.setTimeout(() => setWidth(82), 420));
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // パスが変わったら完了
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    clearTimers();
    setWidth(100);
    timers.current.push(window.setTimeout(() => setActive(false), 250));
    timers.current.push(window.setTimeout(() => setWidth(0), 520));
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 z-[9998] h-[3px] pointer-events-none bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-400"
      style={{
        width: `${width}%`,
        opacity: active ? 1 : 0,
        transition: "width 0.3s ease, opacity 0.35s ease",
        boxShadow: "0 0 8px rgba(0,0,0,0.25)",
      }}
    />
  );
}

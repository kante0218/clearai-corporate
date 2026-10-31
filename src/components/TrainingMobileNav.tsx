"use client";
import LocalizedContent from "@/components/LocalizedContent";


import { useEffect, useRef, useState } from "react";
import styles from "./AgentTrainingPage.module.css";

const links = [
  ["#examples", "できること"],
  ["#curriculum", "カリキュラム"],
  ["#pricing", "進め方・受講条件"],
  ["#teacher", "ご相談担当"],
  ["#faq", "よくある質問"],
  ["#contact", "無料相談・見積もり"],
] as const;

export default function TrainingMobileNav() {
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const header = menu.current?.closest("header");
    const background = Array.from(header?.parentElement?.children ?? []).filter(
      (element): element is HTMLElement => element instanceof HTMLElement && element !== header,
    );
    const previousInert = background.map((element) => element.inert);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    background.forEach((element) => { element.inert = true; });
    const frame = requestAnimationFrame(() => {
      menu.current?.querySelector<HTMLElement>("nav a[href]")?.focus();
    });
    const handleResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
      if (event.key !== "Tab") return;
      const items = Array.from(header?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []).filter((item) => item.offsetParent !== null);
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (!menu.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = previousOverflow;
      background.forEach((element, index) => { element.inert = previousInert[index]; });
      toggle.current?.focus({ preventScroll: true });
    };
  }, [open]);

  return <LocalizedContent>{(
    <div className={styles.mobileMenu} ref={menu}>
      <button data-ui-button="icon" type="button" className={styles.menuToggle} ref={toggle} aria-expanded={open} aria-controls="training-mobile-menu" aria-label={open ? "研修メニューを閉じる" : "研修メニューを開く"} onClick={() => setOpen(!open)}>
        <span aria-hidden="true"><i /><i /><i /></span>
        <small>メニュー</small>
      </button>
      <nav id="training-mobile-menu" hidden={!open} className={styles.mobileMenuPanel} aria-label="モバイル研修メニュー">
        {links.map(([href, label]) => <a key={href} href={href} onClick={() => setOpen(false)}><span>{label}</span><span aria-hidden="true">›</span></a>)}
      </nav>
    </div>
  )}</LocalizedContent>;
}

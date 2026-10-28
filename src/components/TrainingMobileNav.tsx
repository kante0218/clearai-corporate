"use client";

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
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (!menu.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  return (
    <div className={styles.mobileMenu} ref={menu}>
      <button data-ui-button="icon" type="button" className={styles.menuToggle} ref={toggle} aria-expanded={open} aria-controls="training-mobile-menu" aria-label={open ? "研修メニューを閉じる" : "研修メニューを開く"} onClick={() => setOpen(!open)}>
        <span aria-hidden="true"><i /><i /><i /></span>
        <small>メニュー</small>
      </button>
      <nav id="training-mobile-menu" hidden={!open} className={styles.mobileMenuPanel} aria-label="モバイル研修メニュー">
        {links.map(([href, label]) => <a data-ui-button="menu" data-ui-with-icon key={href} href={href} onClick={() => setOpen(false)}><span className="ui-button-label">{label}</span><span className="ui-button-icon" data-ui-side="end" aria-hidden="true"><span aria-hidden="true">›</span></span></a>)}
      </nav>
    </div>
  );
}

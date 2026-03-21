"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navItems = [
  { label: "事業紹介", href: "/#services" },
  { label: "導", href: "/michibiki" },
  { label: "AI導入", href: "/ai-consulting" },
  { label: "ブログ", href: "/blog" },
  { label: "会社概要", href: "/about" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="relative z-10">
            <span className="text-[15px] font-semibold tracking-[0.2em] uppercase text-gray-900">
              clear AI
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[13px] tracking-[0.08em] text-gray-500 hover:text-gray-900 transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block relative z-10">
            <Link
              href="/contact"
              className="text-[12px] tracking-[0.1em] px-6 py-2.5 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
            >
              お問い合わせ
            </Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden relative z-10 p-2" aria-label="メニュー">
            <div className="w-6 h-4 flex flex-col justify-between">
              <span className={`w-full h-px bg-gray-900 transition-all duration-300 ${isOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`w-full h-px bg-gray-900 transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
              <span className={`w-full h-px bg-gray-900 transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      <div className={`lg:hidden fixed inset-0 bg-white transition-all duration-500 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item, i) => (
            <Link key={item.label} href={item.href} onClick={() => setIsOpen(false)}
              className="text-2xl font-light text-gray-900 tracking-[0.1em] hover:opacity-50 transition-opacity"
              style={{ animationDelay: `${i * 80}ms` }}>{item.label}</Link>
          ))}
          <Link href="/contact" onClick={() => setIsOpen(false)}
            className="text-[13px] tracking-[0.1em] px-8 py-3 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all mt-4">
            お問い合わせ
          </Link>
        </nav>
      </div>
    </header>
  );
}

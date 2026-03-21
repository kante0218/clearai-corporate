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
          ? "bg-white/90 backdrop-blur-xl border-b border-black/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <span className={`text-[15px] font-semibold tracking-[0.2em] uppercase transition-colors duration-500 ${
              scrolled || isOpen ? "text-black" : "text-white"
            }`}>
              clear AI
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-[13px] tracking-[0.08em] transition-colors duration-500 hover:opacity-60 ${
                  scrolled ? "text-black" : "text-white/80"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:block relative z-10">
            <Link
              href="/contact"
              className={`text-[12px] tracking-[0.1em] px-6 py-2.5 border transition-all duration-500 ${
                scrolled
                  ? "border-black text-black hover:bg-black hover:text-white"
                  : "border-white/40 text-white hover:bg-white hover:text-black"
              }`}
            >
              お問い合わせ
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative z-10 p-2"
            aria-label="メニュー"
          >
            <div className="w-6 h-4 flex flex-col justify-between">
              <span className={`w-full h-px transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-[7px] bg-black" : scrolled ? "bg-black" : "bg-white"
              }`} />
              <span className={`w-full h-px transition-all duration-300 ${
                isOpen ? "opacity-0" : scrolled ? "bg-black" : "bg-white"
              }`} />
              <span className={`w-full h-px transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-[7px] bg-black" : scrolled ? "bg-black" : "bg-white"
              }`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu - Full screen overlay */}
      <div className={`lg:hidden fixed inset-0 bg-white transition-all duration-500 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}>
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-2xl font-light text-black tracking-[0.1em] hover:opacity-50 transition-opacity"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="text-[13px] tracking-[0.1em] px-8 py-3 border border-black text-black hover:bg-black hover:text-white transition-all mt-4"
          >
            お問い合わせ
          </Link>
        </nav>
      </div>
    </header>
  );
}

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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm" : "bg-white border-b border-gray-100"
    }`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">clear AI</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link href="/contact"
              className="text-sm text-gray-600 border border-gray-200 px-5 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              お問い合わせ
            </Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2" aria-label="メニュー">
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-gray-900 transition-all duration-300 ${isOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`w-full h-0.5 bg-gray-900 transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
              <span className={`w-full h-0.5 bg-gray-900 transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <nav className="max-w-6xl mx-auto px-6 py-6 space-y-4">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setIsOpen(false)}
                className="block text-base text-gray-700 hover:text-gray-900 py-2">{item.label}</Link>
            ))}
            <Link href="/contact" onClick={() => setIsOpen(false)}
              className="block text-center bg-indigo-600 text-white px-6 py-3 rounded-xl text-sm font-semibold mt-4">
              お問い合わせ
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

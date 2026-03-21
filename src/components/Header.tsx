"use client";

import { useState } from "react";
import Link from "next/link";

const navItems = [
  { label: "事業紹介", href: "/#services" },
  { label: "AI導入支援", href: "/ai-consulting" },
  { label: "導（みちびき）", href: "/michibiki" },
  { label: "ブログ", href: "/blog" },
  { label: "会社概要", href: "/about" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-navy-950 flex items-center justify-center">
              <span className="text-white text-sm font-bold">C</span>
            </div>
            <span className="text-lg font-bold text-navy-950 tracking-tight">
              clear AI
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm text-navy-700 hover:text-navy-950 transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-accent after:transition-all hover:after:w-full"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className="bg-navy-950 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-navy-800 transition-colors"
            >
              お問い合わせ
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2"
            aria-label="メニュー"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-navy-950 transition-transform ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`w-full h-0.5 bg-navy-950 transition-opacity ${isOpen ? "opacity-0" : ""}`} />
              <span className={`w-full h-0.5 bg-navy-950 transition-transform ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <nav className="max-w-7xl mx-auto px-6 py-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block text-base text-navy-700 hover:text-navy-950 py-2"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block bg-navy-950 text-white px-6 py-3 rounded-full text-sm font-medium text-center mt-4"
            >
              お問い合わせ
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

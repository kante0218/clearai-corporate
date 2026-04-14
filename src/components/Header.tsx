"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "事業紹介", href: "/#services" },
  { label: "AIコンサルティング", href: "/ai-consulting" },
  { label: "農業×エンジニアリング", href: "/ai-agriculture" },
  { label: "会社概要", href: "/about" },
  { label: "お知らせ", href: "/blog" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isAgriculture = pathname?.startsWith("/ai-agriculture");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navColor = "text-gray-600 hover:text-gray-900";
  const headerBg = scrolled
    ? "bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm"
    : "bg-white border-b border-gray-100";

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-18">
            <Link href="/" className="flex items-center group">
              <Image
                src="/images/logo.png"
                alt="clear AI"
                width={140}
                height={40}
                className="h-8 w-auto transition-all duration-500"
                style={{
                  filter: isAgriculture
                    ? "hue-rotate(-95deg) saturate(1.1)"
                    : "none",
                }}
                priority
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-7">
              {navItems.map((item) => (
                <Link key={item.label} href={item.href}
                  className={`text-sm font-medium transition-all duration-300 relative group ${navColor}`}>
                  {item.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-current group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <Link href="/contact"
                className="text-sm font-semibold px-5 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
                お問い合わせ
              </Link>
            </div>

            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 z-10 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="メニュー" aria-expanded={isOpen}>
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-gray-900 transition-all duration-300 ${
                  isOpen ? "rotate-45 translate-y-[9px]" : ""
                }`} />
                <span className={`w-full h-0.5 bg-gray-900 transition-all duration-300 ${
                  isOpen ? "opacity-0 w-0" : ""
                }`} />
                <span className={`w-full h-0.5 bg-gray-900 transition-all duration-300 ${
                  isOpen ? "-rotate-45 -translate-y-[9px]" : ""
                }`} />
              </div>
            </button>
          </div>
        </div>

        <div className={`lg:hidden overflow-hidden transition-all duration-500 ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="bg-white/98 backdrop-blur-xl border-t border-gray-100">
            <nav className="max-w-7xl mx-auto px-6 py-8 space-y-1">
              {navItems.map((item, i) => (
                <Link key={item.label} href={item.href} onClick={() => setIsOpen(false)}
                  className="block text-base text-gray-700 hover:text-gray-900 py-3.5 border-b border-gray-100 transition-colors font-medium"
                  style={{ transitionDelay: `${i * 30}ms` }}>
                  {item.label}
                </Link>
              ))}
              <Link href="/contact" onClick={() => setIsOpen(false)}
                className="block text-center bg-blue-600 text-white px-6 py-3.5 rounded-lg text-sm font-semibold mt-6 hover:bg-blue-500 transition-colors min-h-[44px]">
                お問い合わせ
              </Link>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}

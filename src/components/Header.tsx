"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "事業紹介", href: "/#services" },
  { label: "導", href: "/michibiki" },
  { label: "AI導入", href: "/ai-consulting" },
  { label: "アプリ", href: "/#apps" },
  { label: "ブログ", href: "/blog" },
  { label: "会社概要", href: "/about" },
];

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDark, setIsDark] = useState(isHomePage);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? (y / docH) * 100 : 0);
      if (isHomePage) {
        const heroH = window.innerHeight;
        setIsDark(y < heroH * 0.85);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHomePage]);

  const showWhiteLogo = isDark && !scrolled;
  const navColor = showWhiteLogo ? "text-white/80 hover:text-white" : "text-gray-600 hover:text-gray-900";
  const headerBg = scrolled
    ? "bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm"
    : isDark
      ? "bg-transparent"
      : "bg-white border-b border-gray-100";

  return (
    <>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-18">
            <Link href="/" className="flex items-center group">
              <Image
                src={showWhiteLogo ? "/images/logo-white.png" : "/images/logo.png"}
                alt="clear AI"
                width={140}
                height={40}
                className="h-8 w-auto transition-opacity duration-500"
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
                className={`text-sm font-semibold px-5 py-2 rounded-full border transition-all duration-300 ${
                  showWhiteLogo
                    ? "border-white/30 text-white hover:bg-white hover:text-gray-900"
                    : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                }`}>
                お問い合わせ
              </Link>
            </div>

            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 z-10" aria-label="メニュー">
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`w-full h-0.5 transition-all duration-300 ${
                  isOpen ? "rotate-45 translate-y-[9px]" : ""
                } ${showWhiteLogo ? "bg-white" : "bg-gray-900"}`} />
                <span className={`w-full h-0.5 transition-all duration-300 ${
                  isOpen ? "opacity-0 w-0" : ""
                } ${showWhiteLogo ? "bg-white" : "bg-gray-900"}`} />
                <span className={`w-full h-0.5 transition-all duration-300 ${
                  isOpen ? "-rotate-45 -translate-y-[9px]" : ""
                } ${showWhiteLogo ? "bg-white" : "bg-gray-900"}`} />
              </div>
            </button>
          </div>
        </div>

        <div className={`lg:hidden overflow-hidden transition-all duration-500 ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="bg-gray-950 border-t border-white/10">
            <nav className="max-w-7xl mx-auto px-6 py-8 space-y-1">
              {navItems.map((item, i) => (
                <Link key={item.label} href={item.href} onClick={() => setIsOpen(false)}
                  className="block text-base text-white/70 hover:text-white py-3 border-b border-white/5 transition-colors"
                  style={{ transitionDelay: `${i * 30}ms` }}>
                  {item.label}
                </Link>
              ))}
              <Link href="/contact" onClick={() => setIsOpen(false)}
                className="block text-center bg-blue-600 text-white px-6 py-3.5 rounded-full text-sm font-semibold mt-6 hover:bg-blue-500 transition-colors">
                お問い合わせ
              </Link>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { header as headerDict } from "@/lib/i18n/translations";

type NavChild = { label: string; href: string; description?: string };
type NavItem = { label: string; href: string; children?: NavChild[] };

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();
  const { lang } = useLanguage();
  const h = headerDict[lang];

  const navItems: NavItem[] = [
    {
      label: h.navAi,
      href: "/ai-consulting",
      children: [
        { label: h.navAiConsulting, href: "/ai-consulting", description: h.navAiConsultingDesc },
        { label: h.navAdvisor, href: "/advisor", description: h.navAdvisorDesc },
        { label: h.navTraining, href: "/training", description: h.navTrainingDesc },
        { label: h.navClaude, href: "/claude", description: h.navClaudeDesc },
        { label: h.navAdvertising, href: "/advertising", description: h.navAdvertisingDesc },
        { label: h.navWebsite, href: "/website", description: h.navWebsiteDesc },
      ],
    },
    {
      label: h.navAgriculture,
      href: "/ai-agriculture",
      children: [
        { label: h.navAgricultureEngineering, href: "/ai-agriculture", description: h.navAgricultureEngineeringDesc },
        { label: h.navKawasemi, href: "/#kawasemi-project", description: h.navKawasemiDesc },
      ],
    },
    { label: h.navSubsidy, href: "/subsidy" },
    { label: h.navNews, href: "/blog" },
    { label: h.navAbout, href: "/about" },
  ];
  const isAgriculture = pathname?.startsWith("/ai-agriculture");
  const isClaude = pathname?.startsWith("/claude");
  const isAiConsulting =
    pathname?.startsWith("/ai-consulting") ||
    pathname?.startsWith("/advisor") ||
    pathname?.startsWith("/training") ||
    pathname?.startsWith("/subsidy") ||
    pathname?.startsWith("/advertising") ||
    pathname?.startsWith("/website");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (isAgriculture) root.dataset.theme = "agriculture";
    else if (isClaude) root.dataset.theme = "claude";
    else if (isAiConsulting) root.dataset.theme = "ai";
    else delete root.dataset.theme;
  }, [isAgriculture, isClaude, isAiConsulting]);


  const navColor = "text-gray-600 hover:text-gray-900";
  const headerBg = scrolled
    ? "bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm"
    : "bg-white border-b border-gray-100";

  const contactOutlineClass = isAgriculture
    ? "border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
    : isClaude
    ? "border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
    : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white";
  const contactFilledClass = isAgriculture
    ? "bg-green-600 hover:bg-green-500 text-white"
    : isClaude
    ? "bg-orange-500 hover:bg-orange-400 text-white"
    : "bg-blue-600 hover:bg-blue-500 text-white";

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="relative flex items-center justify-between h-16 lg:h-18">
            <Link href="/" className="flex items-center group">
              <Image
                src="/images/logo.png"
                alt="clearAI株式会社（クリアエーアイ）"
                width={140}
                height={40}
                className={`h-8 w-auto transition-all duration-500 ${
                  isAgriculture ? "logo-green-filter" : isClaude ? "logo-orange-filter" : ""
                }`}
                priority
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
              {navItems.map((item) => {
                const hasChildren = item.children && item.children.length > 0;
                const isMenuOpen = openMenu === item.label;
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => hasChildren && setOpenMenu(item.label)}
                    onMouseLeave={() => hasChildren && setOpenMenu(null)}
                  >
                    <Link
                      href={item.href}
                      className={`text-sm font-medium transition-all duration-300 relative group inline-flex items-center gap-1 ${navColor}`}
                    >
                      {item.label}
                      {hasChildren && (
                        <svg
                          className={`w-3 h-3 transition-transform duration-300 ${isMenuOpen ? "rotate-180" : ""}`}
                          viewBox="0 0 12 12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path d="M3 4.5L6 7.5L9 4.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-current group-hover:w-full transition-all duration-300" />
                    </Link>
                    {hasChildren && (
                      <div
                        className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-300 ${
                          isMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1"
                        }`}
                      >
                        <div className="bg-white border border-gray-200 rounded-xl shadow-xl py-2 min-w-[260px]">
                          {item.children!.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="block px-5 py-3 hover:bg-gray-50 transition-colors"
                            >
                              <div className="text-sm font-semibold text-gray-900">{child.label}</div>
                              {child.description && (
                                <div className="text-xs text-gray-500 mt-0.5">{child.description}</div>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <span className="w-px h-5 bg-gray-200" aria-hidden="true" />
              <LanguageToggle variant="desktop" />
              <Link href="/downloads"
                className={`inline-flex items-center justify-center text-sm font-semibold px-4 py-2 rounded-lg border transition-all duration-300 ${contactOutlineClass}`}>
                {h.docsDl}
              </Link>
              <Link href="/contact"
                className={`inline-flex items-center justify-center text-sm font-semibold px-4 py-2 rounded-lg border transition-all duration-300 ${contactOutlineClass}`}>
                {h.contact}
              </Link>
            </div>

            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 z-10 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label={h.menuAria} aria-expanded={isOpen}>
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
              {navItems.map((item, i) => {
                const hasChildren = item.children && item.children.length > 0;
                const expanded = mobileExpanded === item.label;
                return (
                  <div key={item.label} className="border-b border-gray-100" style={{ transitionDelay: `${i * 30}ms` }}>
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex-1 block text-base text-gray-700 hover:text-gray-900 py-3.5 transition-colors font-medium"
                      >
                        {item.label}
                      </Link>
                      {hasChildren && (
                        <button
                          type="button"
                          onClick={() => setMobileExpanded(expanded ? null : item.label)}
                          aria-label={`${item.label}${h.subMenuAria}`}
                          aria-expanded={expanded}
                          className="p-3 text-gray-500"
                        >
                          <svg
                            className={`w-4 h-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <path d="M4 6L8 10L12 6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      )}
                    </div>
                    {hasChildren && (
                      <div className={`overflow-hidden transition-all duration-300 ${expanded ? "max-h-96 pb-3" : "max-h-0"}`}>
                        <div className="pl-4 space-y-1">
                          {item.children!.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              onClick={() => setIsOpen(false)}
                              className="block py-2.5 text-sm text-gray-600 hover:text-gray-900"
                            >
                              {child.label}
                              {child.description && (
                                <span className="block text-xs text-gray-400 mt-0.5">{child.description}</span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <Link href="/downloads" onClick={() => setIsOpen(false)}
                  className={`block text-center px-4 py-3.5 rounded-lg text-sm font-semibold border transition-colors min-h-[44px] flex items-center justify-center ${contactOutlineClass}`}>
                  {h.docsDl}
                </Link>
                <Link href="/contact" onClick={() => setIsOpen(false)}
                  className={`block text-center px-4 py-3.5 rounded-lg text-sm font-semibold transition-colors min-h-[44px] flex items-center justify-center ${contactFilledClass}`}>
                  {h.contact}
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}

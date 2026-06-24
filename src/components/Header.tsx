"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { usePathname } from "next/navigation";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { header as headerDict } from "@/lib/i18n/translations";

type NavChild = { label: string; href: string; description?: string };
type NavItem = { label: string; href: string; children?: NavChild[]; external?: boolean };

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();
  const { lang } = useLanguage();
  const h = headerDict[lang];

  const navItems: NavItem[] = [
    { label: h.navRobotRental, href: "/robot-rental" },
    {
      label: h.navFde,
      href: "/ai-consulting",
      children: [
        { label: h.navAiAgent, href: "/ai-agent", description: h.navAiAgentDesc },
        { label: h.navAdvisor, href: "/advisor", description: h.navAdvisorDesc },
        { label: h.navTraining, href: "/training", description: h.navTrainingDesc },
        { label: h.navSubsidy, href: "/subsidy", description: h.navSubsidyDesc },
        { label: h.navClaude, href: "/claude", description: h.navClaudeDesc },
        { label: h.navAiConsulting, href: "/ai-consulting", description: h.navAiConsultingDesc },
        { label: h.navWebsite, href: "/website", description: h.navWebsiteDesc },
        { label: h.navAdvertising, href: "/advertising", description: h.navAdvertisingDesc },
        { label: h.navSns, href: "/sns", description: h.navSnsDesc },
      ],
    },
    { label: h.navResearch, href: "/research" },
  ];

  const utilityItems: { label: string; href: string }[] = [
    { label: h.navNews, href: "/blog" },
    { label: h.navAbout, href: "/about" },
  ];
  const isClaude = pathname?.startsWith("/claude");
  const isAiConsulting =
    pathname?.startsWith("/ai-consulting") ||
    pathname?.startsWith("/advisor") ||
    pathname?.startsWith("/ai-agent") ||
    pathname?.startsWith("/training") ||
    pathname?.startsWith("/subsidy") ||
    pathname?.startsWith("/advertising") ||
    pathname?.startsWith("/website") ||
    pathname?.startsWith("/sns");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (isClaude) root.dataset.theme = "claude";
    else if (isAiConsulting) root.dataset.theme = "ai";
    else delete root.dataset.theme;
  }, [isClaude, isAiConsulting]);


  const navColor = "text-gray-600 hover:text-gray-900";
  const headerBg = scrolled
    ? "bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm"
    : "bg-white border-b border-gray-100";

  const contactFilledClass = "bg-neutral-900 hover:bg-neutral-800 text-white";
  // Filled CTA for the desktop header (solid + soft neutral shadow + hover lift)
  const contactBtnClass =
    "bg-neutral-900 hover:bg-black shadow-[0_6px_20px_-6px_rgba(0,0,0,0.45)] hover:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.6)]";

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}>
        <div className="max-w-[1800px] mx-auto px-6 lg:px-10">
          <div className="relative flex items-center justify-between h-18 lg:h-20">
            <Link href="/" className="flex items-center gap-2.5 group" aria-label="clearAI株式会社（クリアエーアイ）">
              <Logo size={36} className="h-8 lg:h-9 w-auto transition-transform duration-500 group-hover:rotate-12" />
              <span className="text-xl lg:text-2xl font-semibold tracking-tight text-neutral-900">clearAI</span>
            </Link>

            <nav className="hidden xl:flex items-center gap-1 ml-auto mr-8">
              {navItems.map((item) => {
                const hasChildren = item.children && item.children.length > 0;
                const isMenuOpen = openMenu === item.label;
                return (
                  <div key={item.label} className="flex items-center">
                    <div
                      className="relative"
                      onMouseEnter={() => hasChildren && setOpenMenu(item.label)}
                      onMouseLeave={() => hasChildren && setOpenMenu(null)}
                    >
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-sm font-semibold tracking-wide px-3 py-2 transition-colors duration-200 inline-flex items-center gap-1 ${navColor}`}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className={`text-sm font-semibold tracking-wide px-3 py-2 transition-colors duration-200 inline-flex items-center gap-1 ${navColor}`}
                      >
                        {item.label}
                        {hasChildren && (
                          <svg
                            className={`w-4 h-4 transition-transform duration-300 ${isMenuOpen ? "rotate-180" : ""}`}
                            viewBox="0 0 12 12"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <path d="M3 4.5L6 7.5L9 4.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </Link>
                    )}
                    {hasChildren && (
                      <div
                        className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-300 ${
                          isMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1"
                        }`}
                      >
                        <div className="bg-white border border-gray-200 rounded-lg shadow-xl py-2 min-w-[260px]">
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
                  </div>
                );
              })}
            </nav>

            <div className="hidden xl:flex items-center gap-5">
              <div className="flex items-center gap-5">
                {utilityItems.map((u) => (
                  <Link
                    key={u.label}
                    href={u.href}
                    className="text-sm font-semibold tracking-wide text-gray-600 hover:text-gray-900 transition-colors duration-300"
                  >
                    {u.label}
                  </Link>
                ))}
              </div>
              <LanguageToggle variant="desktop" />
              <Link href="/contact"
                className={`group inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-white px-5 py-2.5 rounded-md transition-all duration-300 hover:-translate-y-0.5 ${contactBtnClass}`}>
                {h.contact}
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </Link>
            </div>

            <button onClick={() => setIsOpen(!isOpen)} className="xl:hidden p-2 z-10 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label={h.menuAria} aria-expanded={isOpen}>
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

        <div className={`xl:hidden transition-all duration-500 ${isOpen ? "max-h-[calc(100svh-4.5rem)] overflow-y-auto overscroll-contain opacity-100" : "max-h-0 overflow-hidden opacity-0"}`}>
          <div className="bg-white/98 backdrop-blur-xl border-t border-gray-100">
            <nav className="max-w-[1800px] mx-auto px-6 py-8 pb-16 space-y-1">
              {navItems.map((item, i) => {
                const hasChildren = item.children && item.children.length > 0;
                const expanded = mobileExpanded === item.label;
                return (
                  <div key={item.label} className="border-b border-gray-100" style={{ transitionDelay: `${i * 30}ms` }}>
                    <div className="flex items-center justify-between">
                      {item.external ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setIsOpen(false)}
                          className="flex-1 block text-base text-gray-700 hover:text-gray-900 py-3.5 transition-colors font-medium"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="flex-1 block text-base text-gray-700 hover:text-gray-900 py-3.5 transition-colors font-medium"
                        >
                          {item.label}
                        </Link>
                      )}
                      {hasChildren && (
                        <button
                          type="button"
                          onClick={() => setMobileExpanded(expanded ? null : item.label)}
                          aria-label={`${item.label}${h.subMenuAria}`}
                          aria-expanded={expanded}
                          className="p-3 -mr-1 text-gray-700"
                        >
                          <svg
                            className={`w-7 h-7 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M4 6L8 10L12 6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      )}
                    </div>
                    {hasChildren && (
                      <div className={`overflow-hidden transition-all duration-300 ${expanded ? "max-h-[720px] pb-3" : "max-h-0"}`}>
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
              <div className="mt-6 flex items-center justify-center gap-5">
                {utilityItems.map((u) => (
                  <Link
                    key={u.label}
                    href={u.href}
                    onClick={() => setIsOpen(false)}
                    className="text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors duration-300"
                  >
                    {u.label}
                  </Link>
                ))}
              </div>
              <div className="mt-4">
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

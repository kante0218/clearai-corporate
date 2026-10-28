"use client";
import LocalizedContent from "@/components/LocalizedContent";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { BOOKING_URL } from "@/lib/booking";
import { usePathname } from "next/navigation";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { header as headerDict } from "@/lib/i18n/translations";

type NavChild = { label: string; href: string; description?: string };
type NavItem = { label: string; href: string; children?: NavChild[]; external?: boolean };

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const menuToggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const { lang } = useLanguage();
  const h = headerDict[lang];

  const navItems: NavItem[] = [
    { label: h.navSoftwareDev, href: "/software-development" },
    { label: h.navRobotRental, href: "/robot-rental" },
    { label: h.navFde, href: "/aio" },
    { label: h.navTraining, href: "/training/codex" },
    { label: h.navWebsiteProduction, href: "/website-production" },
    { label: h.navSns, href: "/sns-management" },
    { label: h.navMeo, href: "/meo" },
  ];

  // Column stays reachable from the footer — the header slot goes to 導入実績,
  // which is what a prospect looks for before enquiring.
  const utilityItems: { label: string; href: string }[] = [
    { label: h.navCases, href: "/case-studies" },
    { label: h.navNews, href: "/blog" },
    { label: h.navAbout, href: "/about" },
  ];
  const isClaude = pathname?.startsWith("/claude");
  const isAiConsulting = pathname?.startsWith("/ai-consulting");
  const isStandaloneLp = pathname?.startsWith("/lp/ai-development-consultation")
    || pathname === "/training/claude-code"
    || pathname === "/training/codex";

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

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    const background = Array.from(document.body.children).filter(
      (element): element is HTMLElement => element instanceof HTMLElement
        && element !== header.current && element.tagName !== "SCRIPT",
    );
    const previousInert = background.map((element) => element.inert);
    document.body.style.overflow = "hidden";
    background.forEach((element) => { element.inert = true; });
    const frame = requestAnimationFrame(() => {
      header.current?.querySelector<HTMLElement>("#site-mobile-menu a[href]")?.focus();
    });
    const onResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = previousOverflow;
      background.forEach((element, index) => { element.inert = previousInert[index]; });
      menuToggle.current?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      if (event.key === "Escape") {
        setIsOpen(false);
        menuToggle.current?.focus();
      }
      if (event.key !== "Tab") return;
      const items = Array.from(header.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []).filter((item) => item.offsetParent !== null);
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);


  const navColor = "text-gray-600 hover:text-gray-900";
  const headerBg = scrolled
    ? "bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm"
    : "bg-white border-b border-gray-100";

  const contactFilledClass = "bg-cta hover:bg-cta-hover text-white";

  if (isStandaloneLp) return null;

  return <LocalizedContent>{(
    <>
      <header ref={header} role={isOpen ? "dialog" : undefined} aria-modal={isOpen ? true : undefined} aria-label={isOpen ? (lang === "ja" ? "サイトメニュー" : "Site menu") : undefined} style={isOpen ? { zIndex: 60 } : undefined} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}>
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <div className="site-header-row relative flex h-16 items-center justify-between lg:h-20">
            <Link href="/" className="flex shrink-0 items-center gap-2.5 group" aria-label="ClearAI株式会社（クリアエーアイ）">
              <Logo size={36} className="h-7 lg:h-8 w-auto transition-opacity duration-300 group-hover:opacity-80" />
            </Link>

            <div className="hidden lg:flex items-center gap-4 xl:gap-7">
              <nav aria-label={lang === "ja" ? "メインナビゲーション" : "Main navigation"} className="flex items-center gap-4 xl:gap-6">
                {[
                  { label: h.navAbout, href: "/about" },
                  { label: h.navService, href: "/#support" },
                  { label: h.navCases, href: "/case-studies" },
                  { label: h.navNews, href: "/blog" },
                  { label: h.contact, href: "/contact" },
                ].map((item) => (
                  <Link key={item.href} href={item.href}
                    className={`inline-flex min-h-11 items-center justify-center whitespace-nowrap px-1.5 text-center text-[13px] xl:text-sm font-semibold transition-colors ${navColor}`}><span className="ui-button-label">{item.label}</span></Link>
                ))}
              </nav>
              <LanguageToggle variant="desktop" />
              <div className="flex items-center gap-2">
                <Link data-ui-button="control" href="/download"
                  className="inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-md border border-neutral-300 px-3 xl:px-4 text-[13px] xl:text-sm font-semibold text-neutral-900 hover:border-neutral-900 hover:bg-neutral-50 transition-colors"><span className="ui-button-label">{lang === "ja" ? "資料ダウンロード" : "Download"}</span></Link>
                <a data-ui-button="filled" href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-md bg-cta px-3 xl:px-4 text-[13px] xl:text-sm font-semibold text-white hover:bg-cta-hover transition-colors"><span className="ui-button-label">{lang === "ja" ? "役員へ無料相談する" : "Free consultation"}</span></a>
              </div>
            </div>

            <button data-ui-button="icon" ref={menuToggle} onClick={() => setIsOpen(!isOpen)} aria-controls="site-mobile-menu" className="site-menu-toggle lg:hidden p-2 z-10 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label={h.menuAria} aria-expanded={isOpen}>
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

        <div id="site-mobile-menu" inert={!isOpen} data-open={isOpen} className={`site-mobile-panel lg:hidden overflow-hidden bg-white transition-all duration-500 ${isOpen ? "h-[calc(100dvh-4rem)] opacity-100" : "h-0 opacity-0"}`}>
          <div className="h-full bg-white/98 backdrop-blur-xl border-t border-gray-100">
            <nav aria-label={lang === "ja" ? "サイトメニュー" : "Site menu"} className="site-mobile-nav max-h-[calc(100dvh-4rem)] max-w-[1800px] mx-auto overflow-y-auto overscroll-contain px-5 py-4 space-y-1 pb-[calc(1rem+env(safe-area-inset-bottom))]">
              {navItems.map((item, i) => {
                const hasChildren = item.children && item.children.length > 0;
                const expanded = mobileExpanded === item.label;
                return (
                  <div key={item.label} className="border-b border-gray-100" style={{ transitionDelay: `${i * 30}ms` }}>
                    <div className="flex items-center justify-between">
                      {item.external ? (
                        <a data-ui-button="menu"
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setIsOpen(false)}
                          className="site-menu-row flex-1 block text-base text-gray-700 hover:text-gray-900 py-3.5 transition-colors font-medium"
                        >
                          <span className="ui-button-label">{item.label}</span>
                        </a>
                      ) : (
                        <Link data-ui-button="menu"
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="site-menu-row flex-1 block text-base text-gray-700 hover:text-gray-900 py-3.5 transition-colors font-medium"
                        >
                          <span className="ui-button-label">{item.label}</span>
                        </Link>
                      )}
                      {hasChildren && (
                        <button data-ui-button="icon"
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
                      <div className={`overflow-hidden transition-all duration-300 ${expanded ? "max-h-96 pb-3" : "max-h-0"}`}>
                        <div className="pl-4 space-y-1">
                          {item.children!.map((child) => (
                            <Link data-ui-button="menu"
                              key={child.label}
                              href={child.href}
                              onClick={() => setIsOpen(false)}
                              className="block py-2.5 text-sm text-gray-600 hover:text-gray-900"
                            >
                              <span className="ui-button-label">{child.label}
                              {child.description && (
                                <span className="block text-xs text-gray-400 mt-0.5">{child.description}</span>
                              )}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              <div className="site-menu-utilities mt-6 flex flex-wrap items-center justify-center gap-5">
                {utilityItems.map((u) => (
                  <Link data-ui-button="menu"
                    key={u.label}
                    href={u.href}
                    onClick={() => setIsOpen(false)}
                    className="text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors duration-300"
                  >
                    <span className="ui-button-label">{u.label}</span>
                  </Link>
                ))}
              </div>
              {/* The desktop toggle is hidden below xl, so this is the only
                  place a phone can switch language. Leaves the menu open. */}
              <div className="site-menu-language mt-5 flex justify-center">
                <LanguageToggle variant="mobile" />
              </div>
              <div className="site-menu-actions mt-4 space-y-3">
                <Link data-ui-button="menu" href="/contact" onClick={() => setIsOpen(false)} className="flex min-h-11 items-center justify-center rounded-lg border border-neutral-300 px-4 py-3.5 text-sm font-semibold text-neutral-900"><span className="ui-button-label">{lang === "ja" ? "文章で相談する" : "Ask in writing"}</span></Link>
                <a data-ui-button="menu" href={BOOKING_URL} target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}
                  className={`block text-center px-4 py-3.5 rounded-lg text-sm font-semibold transition-colors min-h-[44px] flex items-center justify-center ${contactFilledClass}`}><span className="ui-button-label">{lang === "ja" ? "代表と面談" : "Meet founder"}</span></a>
                <Link data-ui-button="menu" href="/download" onClick={() => setIsOpen(false)}
                  className="block text-center px-4 py-3.5 rounded-lg text-sm font-semibold border border-neutral-300 text-neutral-900 hover:border-neutral-900 hover:bg-neutral-50 transition-colors min-h-[44px] flex items-center justify-center"><span className="ui-button-label">{h.navDownload}</span></Link>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  )}</LocalizedContent>;
}

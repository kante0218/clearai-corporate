"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { footer as footerDict } from "@/lib/i18n/translations";

export default function Footer() {
  const { lang } = useLanguage();
  const f = footerDict[lang];

  const services = [
    // 主力3事業を先頭に
    { label: f.services.physicalAi, href: "/physical-ai" },
    { label: f.services.robotRental, href: "/robot-rental" },
    { label: f.services.training, href: "/training" },
    { label: f.services.aiAgent, href: "/ai-agent" },
    { label: f.services.spatialScan, href: "/spatial-scan" },
    { label: f.services.advisor, href: "/advisor" },
    { label: f.services.aiConsulting, href: "/ai-consulting" },
    { label: f.services.subsidy, href: "/subsidy" },
    { label: f.services.claude, href: "/claude" },
    { label: f.services.website, href: "/website" },
    { label: f.services.advertising, href: "/advertising" },
    { label: f.services.sns, href: "/sns" },
  ];

  const company = [
    { label: f.company.about, href: "/about" },
    { label: f.company.faq, href: "/faq" },
    { label: f.company.blog, href: "/blog" },
    { label: f.company.contact, href: "/contact" },
  ];

  const other = [
    { label: f.other.privacy, href: "/privacy" },
    { label: f.other.terms, href: "/terms" },
    { label: f.other.sitemap, href: "/sitemap-page" },
  ];

  const socials = [
    {
      label: "clearAI on X",
      href: "https://x.com/clearai0123",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: "clearAI on note",
      href: "https://note.com/kante0123",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
          <path d="M5 3.5h10.2c.9 0 1.7.34 2.4 1l2.9 2.86c.66.66 1 1.5 1 2.4V20.5H5A1.5 1.5 0 0 1 3.5 19V5A1.5 1.5 0 0 1 5 3.5Zm1 2.4v12.2h12V10.1c0-.3-.12-.55-.33-.76l-2.9-2.86a1.07 1.07 0 0 0-.77-.32H6Zm2.4 3.1h7.2v1.7H8.4V9Zm0 3.4h7.2v1.7H8.4v-1.7Zm0 3.4h4.8v1.7H8.4v-1.7Z" />
        </svg>
      ),
    },
    {
      label: "clearAI on LinkedIn",
      href: "https://www.linkedin.com/company/131713938/",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-neutral-950">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-10 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-4" aria-label={f.logoAlt}>
              <Logo size={28} white className="h-7 w-auto" />
              <span className="text-lg font-semibold tracking-tight text-white">clearAI</span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed mb-2">{f.tagline}</p>
            <p className="text-xs text-white/25 leading-relaxed">
              {f.companyLine1}<br />{f.companyLine2}<br />{f.companyLine3}
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/50 transition-colors hover:border-white/40 hover:text-white"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-widest text-white/40 mb-4 uppercase">{f.servicesHeading}</p>
            <ul className="space-y-2.5">
              {services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/40 hover:text-white/80 transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-widest text-white/40 mb-4 uppercase">{f.companyHeading}</p>
            <ul className="space-y-2.5">
              {company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/40 hover:text-white/80 transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-widest text-white/40 mb-4 uppercase">{f.otherHeading}</p>
            <ul className="space-y-2.5">
              {other.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/40 hover:text-white/80 transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-xs text-white/30 mb-1">{f.contactLabel}</p>
              <a href="mailto:info@clearai.jp" className="text-sm text-white/50 hover:text-white/80 transition-colors">
                info@clearai.jp
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 lg:px-10">
        <div className="h-px bg-white/10" />
      </div>

      <div className="max-w-[1800px] mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-white/25">
          &copy; {new Date().getFullYear()} {f.copyright}
        </p>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="text-xs text-white/25 hover:text-white/50 transition-colors">{f.privacyShort}</Link>
          <Link href="/terms" className="text-xs text-white/25 hover:text-white/50 transition-colors">{f.termsShort}</Link>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { footer as footerDict } from "@/lib/i18n/translations";

export default function Footer() {
  const { lang } = useLanguage();
  const f = footerDict[lang];

  const services = [
    { label: f.services.advisor, href: "/advisor" },
    { label: f.services.aiAgent, href: "/ai-agent" },
    { label: f.services.training, href: "/training" },
    { label: f.services.aiConsulting, href: "/ai-consulting" },
    { label: f.services.website, href: "/website" },
    { label: f.services.advertising, href: "/advertising" },
    { label: f.services.sns, href: "/sns" },
    { label: f.services.robotRental, href: "/robot-rental" },
    { label: f.services.subsidy, href: "/subsidy" },
    { label: f.services.claude, href: "/claude" },
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

  return (
    <footer className="bg-gray-950">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-10 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div>
            <Image src="/images/logo-white.png" alt={f.logoAlt} width={140} height={40} className="h-8 w-auto mb-4" />
            <p className="text-sm text-white/40 leading-relaxed mb-2">{f.tagline}</p>
            <p className="text-xs text-white/25 leading-relaxed">
              {f.companyLine1}<br />{f.companyLine2}<br />{f.companyLine3}
            </p>
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

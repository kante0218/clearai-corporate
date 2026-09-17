import Link from "next/link";
import type { ReactNode } from "react";

export type Crumb = { label: string; href?: string };

/** Site-standard full-width container. Every band on the site uses this width. */
export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`max-w-[1800px] mx-auto px-5 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

/**
 * Standard page header band.
 *
 * Matches /robot-rental exactly — full-bleed 1800px container, left-aligned,
 * thin bottom rule — so every page shares the same opening rhythm.
 */
export default function PageHeader({
  kicker,
  title,
  description,
  crumbs,
  actions,
}: {
  kicker: string;
  title: ReactNode;
  description?: ReactNode;
  crumbs?: Crumb[];
  actions?: ReactNode;
}) {
  return (
    <section className="pt-20 pb-5 sm:pt-24 lg:pt-28 lg:pb-5 bg-white border-b border-gray-100">
      <Container>
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="パンくず" className="mb-4 overflow-x-auto whitespace-nowrap text-xs text-neutral-500 sm:mb-6">
            {crumbs.map((c, i) => (
              <span key={`${c.label}-${i}`}>
                {i > 0 && <span className="mx-2 text-neutral-300">/</span>}
                {c.href ? (
                  <Link href={c.href} className="hover:text-neutral-900 transition-colors">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-neutral-900">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <p className="text-sm font-semibold text-neutral-900 mb-2 sm:mb-3">{kicker}</p>
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3 sm:mb-4">{title}</h1>
        {description && (
          <p className="text-base text-gray-600 leading-relaxed w-full mb-5 sm:mb-6">{description}</p>
        )}
        {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
      </Container>
    </section>
  );
}

/** Stats band used directly under the header on /robot-rental. */
export function StatBand({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <section className="py-8 sm:py-12 bg-white border-b border-gray-100">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center justify-center py-4 px-2 text-center sm:py-6 sm:px-4">
              <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              <span className="text-xs text-gray-500 mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export type RelatedLink = { href: string; label: string; note: string };

/**
 * Server-rendered "related reading" band: descriptive internal links between
 * the service pillars, /column articles and /case-studies.
 */
export function RelatedReading({
  heading,
  intro,
  links,
  more,
  tone = "gray",
}: {
  heading: string;
  intro?: string;
  links: RelatedLink[];
  more?: { href: string; label: string }[];
  tone?: "white" | "gray";
}) {
  return (
    <section className={`py-14 lg:py-20 border-t border-gray-200 ${tone === "gray" ? "bg-gray-50" : "bg-white"}`}>
      <Container>
        <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{heading}</h2>
        {intro && <p className="text-base text-gray-600 leading-relaxed mb-8">{intro}</p>}
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="block h-full rounded-lg border border-gray-200 bg-white p-6 hover:border-gray-900 transition-colors"
              >
                <span className="block text-base font-bold text-gray-900 leading-snug mb-2">{l.label}</span>
                <span className="block text-sm text-gray-600 leading-relaxed">{l.note}</span>
              </Link>
            </li>
          ))}
        </ul>
        {more && more.length > 0 && (
          <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
            {more.map((m) => (
              <Link key={m.href} href={m.href} className="font-semibold text-gray-900 underline hover:text-gray-600">
                {m.label}
              </Link>
            ))}
          </p>
        )}
      </Container>
    </section>
  );
}

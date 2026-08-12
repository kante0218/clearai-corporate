import Link from "next/link";
import type { ReactNode } from "react";

export type Crumb = { label: string; href?: string };

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
      <div className="max-w-[1800px] mx-auto px-5 sm:px-6 lg:px-8">
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
          <p className="max-w-4xl text-base text-gray-600 leading-relaxed w-full mb-5 sm:mb-6">{description}</p>
        )}
        {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
      </div>
    </section>
  );
}

/** Stats band used directly under the header on /robot-rental. */
export function StatBand({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <section className="py-8 sm:py-12 bg-white border-b border-gray-100">
      <div className="max-w-[1800px] mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center justify-center py-4 px-2 text-center sm:py-6 sm:px-4">
              <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              <span className="text-xs text-gray-500 mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

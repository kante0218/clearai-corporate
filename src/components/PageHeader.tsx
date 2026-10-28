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
        <p data-motion="reading" className="text-sm font-semibold text-neutral-900 mb-2 sm:mb-3">{kicker}</p>
        <h1 data-motion="heading" className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3 sm:mb-4">{title}</h1>
        {description && (
          <p data-motion="reading" data-reading className="max-w-4xl text-base text-gray-600 leading-relaxed w-full mb-5 sm:mb-6">{description}</p>
        )}
        <div data-motion="rule" aria-hidden="true" className="mb-5 h-px w-16 bg-neutral-200" />
        {actions && <div data-motion="reading" className="flex flex-wrap gap-3">{actions}</div>}
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

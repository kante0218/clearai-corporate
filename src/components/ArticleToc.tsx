import type { TocHeading } from "@/lib/article-toc";

export default function ArticleToc({ headings, collapsible = false }: { headings: TocHeading[]; collapsible?: boolean }) {
  const visibleHeadings = headings.filter(heading => heading.text.trim() && heading.id.trim());
  if (!visibleHeadings.length) return null;
  const items = (
      <ul className="space-y-1">
        {visibleHeadings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? "pl-5" : ""}>
            <a href={`#${encodeURIComponent(heading.id)}`} className="inline-block py-2 text-sm leading-relaxed text-neutral-700 underline underline-offset-4 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-4 break-words">{heading.text}</a>
          </li>
        ))}
      </ul>
  );
  return (
    <nav aria-label="この記事の目次" className="mb-12 border-y border-neutral-200 py-6">
      {collapsible ? <details><summary className="cursor-pointer text-sm font-bold text-neutral-900">この記事の目次（{visibleHeadings.length}項目）</summary>{items}</details> : <><p className="mb-4 text-sm font-bold text-neutral-900">この記事の目次</p>{items}</>}

    </nav>
  );
}

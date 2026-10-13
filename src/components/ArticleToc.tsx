import type { TocHeading } from "@/lib/article-toc";

export default function ArticleToc({ headings }: { headings: TocHeading[] }) {
  if (!headings.length) return null;
  return (
    <nav aria-label="この記事の目次" className="mb-12 border-y border-neutral-200 py-6">
      <p className="mb-4 text-sm font-bold text-neutral-900">この記事の目次</p>
      <ul className="space-y-1">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? "pl-5" : ""}>
            <a href={`#${encodeURIComponent(heading.id)}`} className="inline-block py-2 text-sm leading-relaxed text-neutral-700 underline underline-offset-4 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-4 break-words">{heading.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

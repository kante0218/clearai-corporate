import Link from "next/link";
import type { ReactNode } from "react";
import type { Block } from "@/lib/column/types";
import { headingId } from "@/lib/column/types";

/** Renders `[text](href)` and `**bold**` inside a plain string. */
function inline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const key = `${keyPrefix}-${i++}`;

    if (match[1] && match[2]) {
      const href = match[2];
      const isInternal = href.startsWith("/");
      nodes.push(
        isInternal ? (
          <Link key={key} href={href} className="text-neutral-900 underline underline-offset-4 decoration-neutral-400 hover:decoration-neutral-900 transition-colors">
            {match[1]}
          </Link>
        ) : (
          <a key={key} href={href} target="_blank" rel="noopener noreferrer" className="text-neutral-900 underline underline-offset-4 decoration-neutral-400 hover:decoration-neutral-900 transition-colors">
            {match[1]}
          </a>
        )
      );
    } else if (match[3]) {
      nodes.push(
        <strong key={key} className="font-semibold text-neutral-900">
          {match[3]}
        </strong>
      );
    }
    last = pattern.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export default function Prose({ blocks }: { blocks: Block[] }) {
  return (
    <div className="max-w-none">
      {blocks.map((block, idx) => {
        const k = `b${idx}`;
        switch (block.t) {
          case "h2":
            return (
              <h2
                key={k}
                id={headingId(block.text)}
                className="scroll-mt-28 text-2xl lg:text-3xl font-bold text-gray-900 leading-snug mt-16 mb-5 pt-8 border-t border-neutral-200 first:mt-0 first:pt-0 first:border-0"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={k} className="text-lg lg:text-xl font-bold text-gray-900 leading-snug mt-10 mb-3">
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p key={k} className="text-[15px] md:text-base leading-[1.95] text-neutral-700 mb-5">
                {inline(block.text, k)}
              </p>
            );
          case "ul":
            return (
              <ul key={k} className="mb-6 space-y-2.5">
                {block.items.map((item, i) => (
                  <li key={i} className="relative pl-5 text-[15px] md:text-base leading-[1.9] text-neutral-700">
                    <span aria-hidden className="absolute left-0 top-[0.72em] h-1.5 w-1.5 rounded-full bg-neutral-400" />
                    {inline(item, `${k}-${i}`)}
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={k} className="mb-6 space-y-3 counter-reset">
                {block.items.map((item, i) => (
                  <li key={i} className="relative pl-9 text-[15px] md:text-base leading-[1.9] text-neutral-700">
                    <span aria-hidden className="absolute left-0 top-[0.28em] flex h-6 w-6 items-center justify-center rounded-full bg-neutral-900 text-[11px] font-bold text-white">
                      {i + 1}
                    </span>
                    {inline(item, `${k}-${i}`)}
                  </li>
                ))}
              </ol>
            );
          case "table":
            return (
              <figure key={k} className="mb-7">
                <div className="overflow-x-auto border border-neutral-200">
                  <table className="w-full min-w-[520px] border-collapse text-left">
                    <thead>
                      <tr className="bg-neutral-900 text-white">
                        {block.head.map((h, i) => (
                          <th key={i} className="px-4 py-3 text-[13px] font-semibold whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, ri) => (
                        <tr key={ri} className="border-t border-neutral-200 align-top">
                          {row.map((cell, ci) => (
                            <td
                              key={ci}
                              className={`px-4 py-3 text-[14px] leading-relaxed ${ci === 0 ? "font-medium text-neutral-900" : "text-neutral-600"}`}
                            >
                              {inline(cell, `${k}-${ri}-${ci}`)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {block.note && (
                  <figcaption className="mt-2 text-xs leading-relaxed text-neutral-500">{inline(block.note, `${k}-note`)}</figcaption>
                )}
              </figure>
            );
          case "callout":
            return (
              <aside key={k} className="mb-7 border-l-2 border-neutral-900 bg-neutral-50 px-5 py-4">
                <p className="mb-1.5 text-sm font-bold text-neutral-900">{block.title}</p>
                <p className="text-[14px] leading-[1.9] text-neutral-600">{inline(block.text, k)}</p>
              </aside>
            );
          case "quote":
            return (
              <blockquote key={k} className="mb-7 border-l-2 border-neutral-300 pl-5">
                <p className="text-[15px] leading-[1.9] text-neutral-600 italic">{inline(block.text, k)}</p>
                {block.cite && <cite className="mt-2 block text-xs not-italic text-neutral-500">— {block.cite}</cite>}
              </blockquote>
            );
        }
      })}
    </div>
  );
}

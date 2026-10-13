import { parse } from "node-html-parser";

export type TocHeading = { id: string; text: string; level: 2 | 3 };

/** Preserve existing column anchors; repeated headings receive stable suffixes. */
export function headingId(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  return `s-${hash.toString(36)}`;
}

export function headingIds(reserved: Iterable<string> = []) {
  const used = new Set(reserved);
  return (text: string) => {
    const base = headingId(text);
    let id = base;
    let suffix = 2;
    while (used.has(id)) id = `${base}-${suffix++}`;
    used.add(id);
    return id;
  };
}

/** Only heading opening tags change; CMS markup, images and inline content stay intact. */
export function articleHtmlToc(html: string): { html: string; headings: TocHeading[] } {
  const root = parse(html);
  const elements = root.querySelectorAll("h2, h3");
  const identified = root.querySelectorAll("[id]");
  const allIds = identified.map((element) => element.getAttribute("id")!);
  const allocate = headingIds(allIds);
  const seen = new Set(identified.filter((element) => !elements.includes(element) || !element.text.trim()).map((element) => element.getAttribute("id")!));
  const headings: TocHeading[] = [];
  const edits: { start: number; end: number; replacement: string }[] = [];
  for (const element of elements) {
    const text = element.text.replace(/\s+/g, " ").trim();
    if (!text) continue;
    const original = element.getAttribute("id");
    const id = original && !seen.has(original) ? original : allocate(text);
    seen.add(id);
    headings.push({ id, text, level: element.tagName === "H2" ? 2 : 3 });
    if (id === original) continue;
    const start = element.range[0];
    const opening = /^<h[23]\b(?:[^>"']|"[^"]*"|'[^']*')*>/i.exec(html.slice(start))?.[0];
    if (!opening) continue;
    const withoutId = opening.replace(/\s+id(?=\s|=|>)(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?/i, "");
    edits.push({ start, end: start + opening.length, replacement: withoutId.slice(0, -1) + ` id="${id}">` });
  }
  for (const edit of edits.reverse()) html = html.slice(0, edit.start) + edit.replacement + html.slice(edit.end);
  return { html, headings };
}

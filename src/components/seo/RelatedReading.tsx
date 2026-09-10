import Link from "next/link";
import { Container } from "@/components/PageHeader";

export type ReadingLink = {
  href: string;
  label: string;
  /** One line on what the reader gets — keeps the anchor descriptive for both people and crawlers. */
  note: string;
};

/**
 * Server-rendered "related reading" band.
 *
 * Placed at the end of the pillar pages so each service connects to the
 * columns and case studies that answer the follow-up questions. Rendered on the
 * server (no client gate) so the links are in the initial HTML.
 */
export default function RelatedReading({
  heading = "関連する実務情報",
  description,
  links,
}: {
  heading?: string;
  description?: string;
  links: ReadingLink[];
}) {
  if (links.length === 0) return null;

  return (
    <section className="py-14 lg:py-20 bg-gray-50 border-t border-gray-100">
      <Container>
        <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{heading}</h2>
        {description && <p className="text-base text-gray-600 leading-relaxed mb-10 w-full">{description}</p>}

        <ul className="grid gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden md:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <li key={link.href} className="bg-white">
              <Link href={link.href} className="block h-full p-6 lg:p-8 transition-colors duration-300 hover:bg-gray-50">
                <span className="block text-base font-semibold text-gray-900 leading-snug mb-2">{link.label}</span>
                <span className="block text-sm text-gray-500 leading-relaxed">{link.note}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

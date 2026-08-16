import HomeContent from "@/components/HomeContent";
import NewsList from "@/components/NewsList";
import { brandFaqSchema } from "@/lib/brand-faq-schema";

export const revalidate = 60;

export default function HomePage() {
  return (
    <>
      {/* Brand FAQ lives here, not in the root layout: a FAQPage repeated on every
          URL competes with the per-article FAQPage that /column/[slug] declares. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(brandFaqSchema) }}
      />
      <HomeContent newsSlot={<NewsList />} />
    </>
  );
}

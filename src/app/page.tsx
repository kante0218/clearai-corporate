import HomeContent from "@/components/HomeContent";
import NewsList from "@/components/NewsList";
import { brandFaqSchema } from "@/lib/brand-faq-schema";
import type { Metadata } from "next";

const title = "茨城のAX・AI活用支援｜ClearAI株式会社";
const description = "茨城から、企業のAI活用を実行へ。ClearAIは茨城を中心に、業務改善・受託開発・Codex研修で企業のAXを支援するスタートアップです。日々の業務の課題からご相談ください。";
export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "https://clearai.jp" },
  openGraph: { title, description, url: "https://clearai.jp", type: "website", images: [{ url: "/images/logo.png", alt: "ClearAI株式会社" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/images/logo.png"] },
};

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

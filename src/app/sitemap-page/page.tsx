"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { getBlogs } from "@/lib/microcms";

type Copy = {
  label: string;
  title: string;
  desc: string;
  sections: { title: string; links: { label: string; href: string }[] }[];
  blogHeading: string;
  xmlNoteA: string;
  xmlNoteB: string;
};

const COPY: Record<"ja" | "en", Copy> = {
  ja: {
    label: "Sitemap",
    title: "サイトマップ",
    desc: "ClearAI株式会社（クリアエーアイ）の全ページ一覧から、目的のページへ素早くアクセスできます。",
    sections: [
      {
        title: "会社情報",
        links: [
          { label: "ホーム", href: "/" },
          { label: "会社概要（ClearAI / クリアエーアイ）", href: "/about" },
          { label: "よくあるご質問", href: "/faq" },
          { label: "お問い合わせ", href: "/contact" },
          { label: "導入実績", href: "/case-studies" },
          { label: "事業内容", href: "/service" },
          { label: "ご依頼の流れ", href: "/flow" },
          { label: "資料請求", href: "/download" },
          { label: "コラム", href: "/column" },
          { label: "お知らせ・ブログ", href: "/blog" },
        ],
      },
      {
        title: "事業",
        links: [
          { label: "システム・ソフトウェア開発", href: "/software-development" },
          { label: "ロボットレンタル", href: "/robot-rental" },
          { label: "FDEコンサルティング", href: "/ai-consulting" },
          { label: "AI内製化研修", href: "/training" },
        ],
      },
      {
        title: "その他",
        links: [
          { label: "プライバシーポリシー", href: "/privacy" },
          { label: "利用規約", href: "/terms" },
        ],
      },
    ],
    blogHeading: "ブログ記事",
    xmlNoteA: "XMLサイトマップは",
    xmlNoteB: "にあります（検索エンジン向け）。",
  },
  en: {
    label: "Sitemap",
    title: "Sitemap",
    desc: "A full list of ClearAI Inc. pages — jump directly to what you need.",
    sections: [
      {
        title: "Company",
        links: [
          { label: "Home", href: "/" },
          { label: "About ClearAI Inc.", href: "/about" },
          { label: "FAQ", href: "/faq" },
          { label: "Contact", href: "/contact" },
          { label: "Case Studies", href: "/case-studies" },
          { label: "Services", href: "/service" },
          { label: "Process", href: "/flow" },
          { label: "Documents", href: "/download" },
          { label: "Column", href: "/column" },
          { label: "News & Blog", href: "/blog" },
        ],
      },
      {
        title: "Business",
        links: [
          { label: "System & Software Development", href: "/software-development" },
          { label: "Robot Rental", href: "/robot-rental" },
          { label: "FDE Consulting", href: "/ai-consulting" },
          { label: "In-house AI Development Training", href: "/training" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Terms of Service", href: "/terms" },
        ],
      },
    ],
    blogHeading: "Blog posts",
    xmlNoteA: "XML sitemap is at ",
    xmlNoteB: " (for search engines).",
  },
};

type BlogItem = { id: string; title: string };

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: "https://clearai.jp" },
    { "@type": "ListItem", position: 2, name: "サイトマップ", item: "https://clearai.jp/sitemap-page" },
  ],
};

export default function HtmlSitemapPage() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  const [posts, setPosts] = useState<BlogItem[]>([]);

  useEffect(() => {
    getBlogs()
      .then(({ contents }) => {
        setPosts(contents.map((p) => ({ id: p.id, title: p.title })));
      })
      .catch(() => {
        setPosts([]);
      });
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <Script
        id="schema-breadcrumb-sitemap"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="max-w-[1800px] mx-auto px-6 lg:px-8 pt-24 lg:pt-28 pb-24">
        <p className="text-xs font-semibold tracking-widest uppercase text-neutral-900 mb-4">
          {t.label}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
          {t.title}
        </h1>
        <p className="text-base text-gray-600 leading-relaxed mb-16 max-w-2xl">
          {t.desc}
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {t.sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                {section.title}
              </h2>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-700 hover:text-neutral-900 transition-colors"
                    >
                      → {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {posts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
              {t.blogHeading}
            </h2>
            <ul className="space-y-3">
              {posts.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/blog/${p.id}`}
                    className="text-sm text-gray-700 hover:text-neutral-900 transition-colors"
                  >
                    → {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-20 pt-10 border-t border-gray-200 text-sm text-gray-500">
          <p>
            {t.xmlNoteA}{" "}
            <a
              href="/sitemap.xml"
              className="text-neutral-900 hover:text-neutral-700 underline"
            >
              /sitemap.xml
            </a>{" "}
            {t.xmlNoteB}
          </p>
        </div>
      </section>
    </main>
  );
}

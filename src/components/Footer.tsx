import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-950">
      <div className="max-w-5xl mx-auto px-6 lg:px-10 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Company */}
          <div>
            <Image src="/images/logo-white.png" alt="clear AI" width={140} height={40} className="h-8 w-auto mb-4" />
            <p className="text-sm text-white/40 leading-relaxed mb-2">
              AIコンサルティングと農業×エンジニアリングで、日本の産業に確かな価値を届けます。
            </p>
            <p className="text-xs text-white/25 leading-relaxed">
              clear AI株式会社<br />茨城県 / 2026年4月設立
            </p>
          </div>

          {/* Column 2: Services */}
          <div>
            <p className="text-xs font-semibold tracking-widest text-white/40 mb-4 uppercase">事業</p>
            <ul className="space-y-2.5">
              {[
                { label: "AIコンサルティング", href: "/ai-consulting" },
                { label: "農業×エンジニアリング", href: "/ai-agriculture" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/40 hover:text-white/80 transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company Info */}
          <div>
            <p className="text-xs font-semibold tracking-widest text-white/40 mb-4 uppercase">企業情報</p>
            <ul className="space-y-2.5">
              {[
                { label: "会社概要", href: "/about" },
                { label: "お知らせ", href: "/blog" },
                { label: "お問い合わせ", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/40 hover:text-white/80 transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal & Contact */}
          <div>
            <p className="text-xs font-semibold tracking-widest text-white/40 mb-4 uppercase">その他</p>
            <ul className="space-y-2.5">
              {[
                { label: "プライバシーポリシー", href: "/privacy" },
                { label: "利用規約", href: "/terms" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/40 hover:text-white/80 transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-xs text-white/30 mb-1">お問い合わせ</p>
              <a href="mailto:info@and-clearai.com" className="text-sm text-white/50 hover:text-white/80 transition-colors">
                info@and-clearai.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <div className="h-px bg-white/10" />
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-white/25">
          &copy; {new Date().getFullYear()} clear AI Inc. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="text-xs text-white/25 hover:text-white/50 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="text-xs text-white/25 hover:text-white/50 transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  );
}

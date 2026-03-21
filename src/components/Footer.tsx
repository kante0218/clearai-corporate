import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white">
      {/* Top section */}
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <p className="text-[15px] font-semibold tracking-[0.2em] uppercase mb-6">
              clear AI
            </p>
            <p className="text-[13px] text-white/40 leading-[2] max-w-sm">
              AIの力で、すべての企業に変革を。
              <br />
              AI導入支援と導で、新しい未来をつくる。
            </p>
          </div>

          {/* Links */}
          <div className="lg:col-span-2">
            <p className="text-[11px] text-white/30 tracking-[0.15em] uppercase mb-6">事業</p>
            <ul className="space-y-4">
              {[
                { label: "AI導入支援", href: "/ai-consulting" },
                { label: "導（みちびき）", href: "/michibiki" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[13px] text-white/60 hover:text-white transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="text-[11px] text-white/30 tracking-[0.15em] uppercase mb-6">会社情報</p>
            <ul className="space-y-4">
              {[
                { label: "会社概要", href: "/about" },
                { label: "ブログ", href: "/blog" },
                { label: "お問い合わせ", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[13px] text-white/60 hover:text-white transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="text-[11px] text-white/30 tracking-[0.15em] uppercase mb-6">サービス</p>
            <ul className="space-y-4">
              <li>
                <a href="https://www.michibiki.tech" target="_blank" rel="noopener noreferrer" className="text-[13px] text-white/60 hover:text-white transition-colors duration-300">
                  導 プラットフォーム ↗
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-[13px] text-white/60 hover:text-white transition-colors duration-300">
                  AI導入相談
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/25 tracking-[0.05em]">
            &copy; {new Date().getFullYear()} clear AI Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <Link href="/about" className="text-[11px] text-white/25 hover:text-white/50 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="text-[11px] text-white/25 hover:text-white/50 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

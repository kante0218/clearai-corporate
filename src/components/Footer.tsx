import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900">
      {/* Top section */}
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <p className="text-lg font-bold text-white mb-4">
              clear AI
            </p>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              導とAI導入支援で、新しい未来をつくる。
            </p>
          </div>

          {/* Links */}
          <div className="lg:col-span-2">
            <p className="text-sm font-semibold text-gray-400 mb-4">事業</p>
            <ul className="space-y-3">
              {[
                { label: "導（みちびき）", href: "/michibiki" },
                { label: "AI導入支援", href: "/ai-consulting" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="text-sm font-semibold text-gray-400 mb-4">会社情報</p>
            <ul className="space-y-3">
              {[
                { label: "会社概要", href: "/about" },
                { label: "ブログ", href: "/blog" },
                { label: "お問い合わせ", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="text-sm font-semibold text-gray-400 mb-4">サービス</p>
            <ul className="space-y-3">
              <li>
                <a href="https://www.michibiki.tech" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                  導 プラットフォーム ↗
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                  AI導入相談
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} clear AI Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <Link href="/about" className="text-xs text-gray-500 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="text-xs text-gray-500 hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

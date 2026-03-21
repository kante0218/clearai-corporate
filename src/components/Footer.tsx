import Link from "next/link";

const footerLinks = {
  事業: [
    { label: "AI導入支援", href: "/ai-consulting" },
    { label: "導（みちびき）", href: "/michibiki" },
    { label: "導入事例", href: "/blog" },
  ],
  会社情報: [
    { label: "会社概要", href: "/about" },
    { label: "ブログ", href: "/blog" },
    { label: "お問い合わせ", href: "/contact" },
  ],
  サービス: [
    { label: "導 プラットフォーム", href: "https://www.michibiki.tech" },
    { label: "AI導入相談", href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 lg:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                <span className="text-navy-950 text-sm font-bold">C</span>
              </div>
              <span className="text-lg font-bold tracking-tight">clear AI</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              AIの力で、企業の未来を切り拓く。
              <br />
              AI導入支援とAI面接プラットフォーム「導」で、ビジネスの変革を加速します。
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} clear AI株式会社 All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              プライバシーポリシー
            </Link>
            <Link href="/about" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              利用規約
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="mb-4">
              <Image
                src="/images/logo-white.png"
                alt="clear AI"
                width={160}
                height={45}
                className="h-9 w-auto"
              />
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs mb-8">
              AI導入支援・AI面接・個人開発で、新しい未来をつくる。
            </p>
            <Link href="/contact"
              className="inline-flex items-center gap-2 bg-blue-600 text-white text-xs font-black px-6 py-3 rounded-full hover:bg-blue-500 transition-all duration-300 tracking-wider">
              <span>お問い合わせ</span>
              <span>→</span>
            </Link>
          </div>

          <div className="lg:col-span-2">
            <p className="text-[10px] font-black tracking-widest text-white/30 mb-5 uppercase">事業</p>
            <ul className="space-y-3">
              {[
                { label: "導（みちびき）", href: "/michibiki" },
                { label: "AI導入支援", href: "/ai-consulting" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/40 hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="text-[10px] font-black tracking-widest text-white/30 mb-5 uppercase">個人開発</p>
            <ul className="space-y-3">
              {[
                { label: "STELLA", href: "/#apps" },
                { label: "NutriAI", href: "/#apps" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/40 hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="text-[10px] font-black tracking-widest text-white/30 mb-5 uppercase">会社情報</p>
            <ul className="space-y-3">
              {[
                { label: "会社概要", href: "/about" },
                { label: "ブログ", href: "/blog" },
                { label: "お問い合わせ", href: "/contact" },
                { label: "導 プラットフォーム ↗", href: "https://www.michibiki.tech", external: true },
              ].map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-white/40 hover:text-white transition-colors duration-200">
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className="text-sm text-white/40 hover:text-white transition-colors duration-200">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-7 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-white/20 tracking-wider">
          &copy; {new Date().getFullYear()} clear AI Inc. All rights reserved.
        </p>
        <div className="flex items-center gap-8">
          <Link href="/privacy" className="text-xs text-white/20 hover:text-white/50 transition-colors tracking-wider">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-xs text-white/20 hover:text-white/50 transition-colors tracking-wider">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}

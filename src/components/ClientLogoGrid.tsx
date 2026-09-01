import Image from "next/image";

/**
 * Real client logos only — see the marquee on the homepage for the same list.
 * Logos keep their brand colours on purpose (they are not ours to restyle),
 * which is the one sanctioned exception to the monochrome rule.
 */
export const CLIENT_LOGOS = [
  { name: "JASO", href: "https://jaso.co.jp/", src: "/images/clients/jaso.png", width: 1007, height: 424 },
  { name: "MIG", href: "https://www.marunouchi.co/", src: "/images/clients/mig.png", width: 337, height: 175 },
  { name: "TicketMe", href: "https://ticketme.co.jp/", src: "/images/clients/ticketme.png", width: 1200, height: 426 },
  { name: "エンジニアのミカタ", href: "https://engineer-mikata.com/", src: "/images/clients/engineer-no-mikata.png", width: 991, height: 143 },
  { name: "Gugen", href: "https://www.gugen-hd.com/", src: "/images/clients/gugen.png", width: 1111, height: 346 },
  { name: "DiaL Shift", href: "https://www.dial-shift.co.jp/", src: "/images/clients/dial-shift.png", width: 1950, height: 342 },
  { name: "Wave Leaf", href: undefined, src: "/images/clients/wave-leaf.png", width: 1164, height: 324 },
  { name: "あぐてく", href: "https://aguteku.com/", src: "/images/clients/at.png", width: 1030, height: 838 },
  { name: "Crew Robotics", href: "https://crewrobotics.ai/", src: "/images/clients/crew-robotics.png", width: 1791, height: 261 },
  { name: "ICONIQ", href: "https://www.iconiq.com/", src: "/images/clients/iconiq.png", width: 1436, height: 304 },
  { name: "明成", href: "https://meiseicorp.co.jp/", src: "/images/clients/meisei.png", width: 968, height: 452 },
  { name: "お宿 いけがみ", href: "https://ikegamiryokan.jp/", src: "/images/clients/oyado-ikegami.png", width: 460, height: 98 },
];

export default function ClientLogoGrid({
  heading = "過去の取引実績",
  note = "掲載についてご了承いただいた企業様のみ掲載しています。",
}: {
  heading?: string;
  note?: string;
}) {
  return (
    <section className="py-14 lg:py-20 bg-white border-b border-gray-100">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">{heading}</h2>

        {/* Per-cell borders rather than a gap-px grid: the logo count rarely fills the
            last row, and a gap-px grid paints those empty cells as grey blocks.
            The outer border closes the rectangle so the short last row still reads as
            deliberate white space instead of a broken edge. */}
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 border border-gray-200">
          {CLIENT_LOGOS.map((logo) => (
            <li key={logo.name} className="flex items-center justify-center border-r border-b border-gray-200 bg-white px-6 py-8">
              {logo.href ? (
                <a href={logo.href} target="_blank" rel="noopener noreferrer" aria-label={`${logo.name} 公式サイト`}>
                  <Image src={logo.src} alt={`${logo.name} ロゴ`} width={logo.width} height={logo.height} className="h-8 w-auto max-w-full object-contain md:h-10" sizes="(max-width: 640px) 40vw, (max-width: 1024px) 25vw, 180px" />
                </a>
              ) : (
                <Image src={logo.src} alt={`${logo.name} ロゴ`} width={logo.width} height={logo.height} className="h-8 w-auto max-w-full object-contain md:h-10" sizes="(max-width: 640px) 40vw, (max-width: 1024px) 25vw, 180px" />
              )}
            </li>
          ))}
        </ul>

        <p className="text-xs text-gray-400 mt-6">{note}</p>
      </div>
    </section>
  );
}

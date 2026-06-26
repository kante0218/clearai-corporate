import Image from "next/image";

const CLIENT_LOGOS = [
  { name: "JASO", src: "/images/clients/jaso.png", width: 1007, height: 424 },
  { name: "MIG", src: "/images/clients/mig.png", width: 337, height: 175 },
  { name: "TicketMe", src: "/images/clients/ticketme.png", width: 1200, height: 426 },
  { name: "エンジニアのミカタ", src: "/images/clients/engineer-no-mikata.png", width: 991, height: 143 },
  { name: "Gugen", src: "/images/clients/gugen.png", width: 1111, height: 346 },
  { name: "DiaL Shift", src: "/images/clients/dial-shift.png", width: 1950, height: 342 },
  { name: "ノイアーエーテル", src: "/images/clients/noir-aether.png", width: 656, height: 686 },
  { name: "Wave Leaf", src: "/images/clients/wave-leaf.png", width: 1164, height: 324 },
  { name: "AT", src: "/images/clients/at.png", width: 1030, height: 838 },
  { name: "Crew Robotics", src: "/images/clients/crew-robotics.png", width: 1791, height: 261 },
  { name: "ICONIQ", src: "/images/clients/iconiq.png", width: 1436, height: 304 },
];

export default function ClientLogoMarquee({ label, note }: { label: string; note: string }) {
  const logos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section className="py-12 lg:py-16 bg-white border-b border-gray-100">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-8 overflow-hidden">
        <p className="text-center text-[11px] font-semibold tracking-[0.22em] uppercase text-gray-400 mb-8">{label}</p>
        <div className="relative -mx-6 lg:-mx-8">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent md:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent md:w-28" />
          <div className="flex w-max items-center gap-14 animate-[marquee_38s_linear_infinite] hover:[animation-play-state:paused] md:gap-20">
            {logos.map((logo, index) => (
              <Image
                key={`${logo.name}-${index}`}
                src={logo.src}
                alt={`${logo.name} logo`}
                width={logo.width}
                height={logo.height}
                className="h-8 w-auto shrink-0 object-contain opacity-90 transition duration-300 hover:opacity-100 md:h-10"
                sizes="(max-width: 768px) 150px, 200px"
              />
            ))}
          </div>
        </div>
        <p className="text-center text-[11px] text-gray-400 mt-7">{note}</p>
      </div>
    </section>
  );
}

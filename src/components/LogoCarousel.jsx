const PLACEHOLDER_COUNT = 8;
const LOGOS = Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => ({
  id: i,
  src: '/Ciudad-Del-Laser-Logo-2.png',
  alt: 'Logo de cliente (placeholder)',
}));

export default function LogoCarousel({ speed = 28 }) {
  const track = [...LOGOS, ...LOGOS];

  return (
    <div className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className="flex gap-5 w-max animate-marquee group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${speed}s` }}
      >
        {track.map((logo, i) => (
          <div
            key={`${logo.id}-${i}`}
            className="shrink-0 w-56 h-32 flex items-center justify-center px-6"
          >
            <img src={logo.src} alt={logo.alt} className="max-h-16 w-auto opacity-90" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}

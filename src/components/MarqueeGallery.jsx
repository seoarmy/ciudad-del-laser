export default function MarqueeGallery({ items, speed = 35 }) {
  const track = [...items, ...items];

  return (
    <div className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <div
        className="flex gap-4 w-max animate-marquee group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${speed}s` }}
      >
        {track.map((item, i) => (
          <img
            key={i}
            src={item.img}
            alt={item.alt}
            className="h-56 md:h-72 w-auto rounded-xl object-cover border border-gray-lighter shrink-0"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}

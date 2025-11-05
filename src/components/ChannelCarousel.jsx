import { Play } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function ChannelCarousel({ channels, onSelect }) {
  // Simple auto-scroll marquee effect
  const trackRef = useRef(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let animationId;
    let pos = 0;

    const step = () => {
      pos -= 0.5; // speed
      if (Math.abs(pos) >= el.scrollWidth / 2) pos = 0; // loop
      el.style.transform = `translateX(${pos}px)`;
      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationId);
  }, [channels]);

  const duplicated = [...channels, ...channels];

  return (
    <div className="relative z-10 mx-6 mt-6 overflow-hidden rounded-3xl bg-white/5 p-3 shadow-2xl backdrop-blur-lg ring-1 ring-white/10">
      <div className="relative h-44">
        <div
          ref={trackRef}
          className="absolute inset-0 flex items-stretch gap-4 will-change-transform"
          style={{ transform: 'translateX(0px)' }}
        >
          {duplicated.map((ch, idx) => (
            <ChannelCard key={`${ch.id}-${idx}`} channel={ch} onClick={() => onSelect(ch)} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ChannelCard({ channel, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group relative h-40 w-72 flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/15 to-white/5 p-0 text-left shadow-xl transition-transform [transform-style:preserve-3d] hover:-translate-y-1 hover:shadow-2xl"
      style={{ perspective: '1000px' }}
    >
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-indigo-500/40 blur-2xl" />
        <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-fuchsia-500/40 blur-2xl" />
      </div>
      <div className="relative z-10 flex h-full flex-col justify-between p-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-black/30 px-2 py-1 text-[10px] font-medium text-white/90 ring-1 ring-white/20">
            <span className="uppercase tracking-wide">{channel.category}</span>
            <span className="h-1 w-1 rounded-full bg-white/50" />
            <span>{channel.country}</span>
          </div>
          <h3 className="mt-2 text-lg font-semibold text-white drop-shadow">{channel.name}</h3>
          <p className="text-xs text-white/70">{channel.tagline}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {channel.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/20 px-2 py-0.5 text-[10px] text-white/90 backdrop-blur"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-900 shadow-md">
            <Play className="h-4 w-4" />
            Watch
          </div>
        </div>
      </div>
    </button>
  );
}

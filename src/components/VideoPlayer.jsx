export default function VideoPlayer({ channel }) {
  if (!channel) {
    return (
      <div className="relative z-10 mx-6 mt-6 grid place-items-center rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-white/80 backdrop-blur-lg">
        <div>
          <p className="text-lg">Choose a channel to start watching</p>
          <p className="text-sm text-white/60">Sports, Entertainment, or News — all in one place.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 mx-6 mt-6 overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl">
      <div className="absolute left-0 top-0 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/40 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-40 w-40 translate-x-1/2 translate-y-1/2 rounded-full bg-fuchsia-500/40 blur-3xl" />

      <div className="relative z-10 aspect-video w-full">
        <video
          key={channel.id}
          src={channel.src}
          poster={channel.poster}
          className="h-full w-full object-cover"
          controls
          autoPlay
        />
      </div>

      <div className="relative z-10 flex items-center justify-between gap-4 p-4 text-white">
        <div>
          <h2 className="text-lg font-semibold">{channel.name}</h2>
          <p className="text-xs text-white/70">{channel.category} · {channel.country}</p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          {channel.tags.map((t) => (
            <span key={t} className="rounded-full border border-white/10 bg-white/10 px-2 py-0.5">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

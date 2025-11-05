const tabs = [
  { key: 'Sports', emoji: '🏟️' },
  { key: 'Entertainment', emoji: '🎬' },
  { key: 'News', emoji: '📰' },
];

export default function CategoryTabs({ active, onChange }) {
  return (
    <div className="relative z-10 mx-6 mt-2 flex items-center gap-2 rounded-2xl bg-white/10 p-1 backdrop-blur-md ring-1 ring-white/20">
      {tabs.map((t) => {
        const isActive = active === t.key;
        return (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            className={`flex-1 rounded-xl px-4 py-2 text-sm transition-all duration-200 ${
              isActive
                ? 'bg-white text-slate-900 shadow-lg'
                : 'text-white/80 hover:text-white'
            }`}
          >
            <span className="mr-2">{t.emoji}</span>
            {t.key}
          </button>
        );
      })}
    </div>
  );
}

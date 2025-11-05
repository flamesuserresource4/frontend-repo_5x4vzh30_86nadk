import { Globe, Tv } from 'lucide-react';

export default function Header({ country, onCountryChange }) {
  const countries = [
    'Pakistan',
    'United States',
    'United Kingdom',
    'India',
    'Canada',
  ];

  return (
    <header className="relative z-10 flex items-center justify-between gap-4 px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30">
          <Tv className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-white">Vibe TV</h1>
          <p className="text-xs text-white/70">Live channels · Sports · Entertainment · News</p>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 backdrop-blur-md ring-1 ring-white/20">
        <Globe className="h-5 w-5 text-white/80" />
        <select
          value={country}
          onChange={(e) => onCountryChange(e.target.value)}
          className="bg-transparent text-sm text-white outline-none"
        >
          {countries.map((c) => (
            <option className="text-slate-900" key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}

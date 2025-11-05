import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import CategoryTabs from './components/CategoryTabs.jsx';
import ChannelCarousel from './components/ChannelCarousel.jsx';
import VideoPlayer from './components/VideoPlayer.jsx';
import BackgroundAurora from './components/BackgroundAurora.jsx';

export default function App() {
  // Persisted country and category
  const [country, setCountry] = useState(() => {
    try {
      return localStorage.getItem('vtv.country') || 'Pakistan';
    } catch {
      return 'Pakistan';
    }
  });
  const [category, setCategory] = useState(() => {
    try {
      return localStorage.getItem('vtv.category') || 'Sports';
    } catch {
      return 'Sports';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('vtv.country', country);
    } catch {}
  }, [country]);

  useEffect(() => {
    try {
      localStorage.setItem('vtv.category', category);
    } catch {}
  }, [category]);

  const channels = useMemo(() => baseChannels, []);

  const filtered = useMemo(() => {
    return channels.filter((c) =>
      c.category === category && (
        (Array.isArray(c.countries) && c.countries.includes(country)) || c.country === country
      )
    );
  }, [channels, category, country]);

  const displayed = filtered.length ? filtered : channels.filter((c) => c.category === category);

  const [active, setActive] = useState(null);

  // Pick the first visible channel automatically when filters change or none selected
  useEffect(() => {
    if (!active || !displayed.some((c) => c.id === active.id)) {
      setActive(displayed[0] || null);
    }
  }, [displayed]);

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white">
      <BackgroundAurora />

      <Header country={country} onCountryChange={setCountry} />
      <CategoryTabs active={category} onChange={setCategory} />
      <ChannelCarousel channels={displayed} onSelect={setActive} />
      <VideoPlayer channel={active} />

      <footer className="relative z-10 mx-6 my-10 rounded-2xl border border-white/10 bg-white/5 p-4 text-center text-xs text-white/70 backdrop-blur-md">
        Designed for a stylish, 3D-inspired live TV experience. Pick your country, choose a category, and start watching.
      </footer>
    </div>
  );
}

// Demo channels with open sample streams
const baseChannels = [
  {
    id: 'sports-1',
    name: 'Stadium Live',
    category: 'Sports',
    country: 'Pakistan',
    countries: ['Pakistan', 'United States', 'United Kingdom', 'India', 'Canada'],
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    poster:
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop',
    tags: ['HD', '60fps', 'Football'],
    tagline: 'Your front-row seat to the action',
  },
  {
    id: 'sports-2',
    name: 'Match Day+',
    category: 'Sports',
    country: 'United States',
    countries: ['Pakistan', 'United States', 'United Kingdom', 'India', 'Canada'],
    src: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
    poster:
      'https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=1200&auto=format&fit=crop',
    tags: ['HD', 'Live', 'Multi-sport'],
    tagline: 'Every game, every goal',
  },
  {
    id: 'ent-1',
    name: 'Cinema One',
    category: 'Entertainment',
    country: 'United States',
    countries: ['Pakistan', 'United States', 'United Kingdom', 'India', 'Canada'],
    src: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
    poster:
      'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=1200&auto=format&fit=crop',
    tags: ['HD', 'Drama', 'Premiere'],
    tagline: 'Blockbusters and binge-worthy series',
  },
  {
    id: 'ent-2',
    name: 'Vibe Music TV',
    category: 'Entertainment',
    country: 'United Kingdom',
    countries: ['Pakistan', 'United States', 'United Kingdom', 'India', 'Canada'],
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    poster:
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop',
    tags: ['Music', '24/7', 'Hits'],
    tagline: 'Non-stop hits and vibes',
  },
  {
    id: 'news-1',
    name: 'Global News 24',
    category: 'News',
    country: 'United Kingdom',
    countries: ['Pakistan', 'United States', 'United Kingdom', 'India', 'Canada'],
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    poster:
      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&auto=format&fit=crop',
    tags: ['24/7', 'Breaking', 'World'],
    tagline: 'Headlines from every corner of the world',
  },
  {
    id: 'news-2',
    name: 'Focus Pakistan',
    category: 'News',
    country: 'Pakistan',
    countries: ['Pakistan', 'United States', 'United Kingdom', 'India', 'Canada'],
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    poster:
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop',
    tags: ['Local', 'Live', 'Urdu'],
    tagline: 'Pakistan’s perspective, 24/7',
  },
];

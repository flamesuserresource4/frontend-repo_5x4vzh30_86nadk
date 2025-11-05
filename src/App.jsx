import { useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import CategoryTabs from './components/CategoryTabs.jsx';
import ChannelCarousel from './components/ChannelCarousel.jsx';
import VideoPlayer from './components/VideoPlayer.jsx';
import BackgroundAurora from './components/BackgroundAurora.jsx';

export default function App() {
  const [country, setCountry] = useState('Pakistan');
  const [category, setCategory] = useState('Sports');
  const channels = useMemo(() => baseChannels, []);

  const filtered = useMemo(() => {
    return channels.filter(
      (c) => c.category === category && (c.countries.includes(country) || c.country === country)
    );
  }, [channels, category, country]);

  const [active, setActive] = useState(null);

  // Ensure a selected channel when filters change
  const displayed = filtered.length ? filtered : channels.filter((c) => c.category === category);

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
    poster: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop',
    tags: ['HD', '60fps', 'Football'],
    tagline: 'Your front-row seat to the action',
  },
  {
    id: 'ent-1',
    name: 'Cinema One',
    category: 'Entertainment',
    country: 'United States',
    countries: ['Pakistan', 'United States', 'United Kingdom', 'India', 'Canada'],
    src: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
    poster: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=1200&auto=format&fit=crop',
    tags: ['HD', 'Drama', 'Premiere'],
    tagline: 'Blockbusters and binge-worthy series',
  },
  {
    id: 'news-1',
    name: 'Global News 24',
    category: 'News',
    country: 'United Kingdom',
    countries: ['Pakistan', 'United States', 'United Kingdom', 'India', 'Canada'],
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    poster: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&auto=format&fit=crop',
    tags: ['24/7', 'Breaking', 'World'],
    tagline: 'Headlines from every corner of the world',
  },
];

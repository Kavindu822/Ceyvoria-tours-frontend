'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { tours } from '@/lib/data';
import { TourCard, EmptyState } from './UI';

type DurationTab = 'all' | '6-8' | '9-12' | '13-15';

const styleOptions = [
  'All Themes',
  'Culture & Coast',
  'Hills & Beach',
  'Culture & Safari',
  'Family',
  'Classic Highlights',
  'Adventure & Nature',
  'Safari & Nature',
  'History & Heritage',
  'Beach & Summer',
  'Grand Tour',
  'Wellness & Slow Travel',
  'Romantic & Honeymoon',
  'Photography',
  'Eco & Village',
];

export default function TourFilter() {
  const [duration, setDuration] = useState<DurationTab>('all');
  const [selectedStyle, setSelectedStyle] = useState('All Themes');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('brochure');

  const filteredTours = useMemo(() => {
    let list = tours.filter(tour => {
      // Duration filter
      if (duration === '6-8' && (tour.days < 6 || tour.days > 8)) return false;
      if (duration === '9-12' && (tour.days < 9 || tour.days > 12)) return false;
      if (duration === '13-15' && (tour.days < 13 || tour.days > 15)) return false;

      // Style filter
      if (selectedStyle !== 'All Themes') {
        const tStyle = (tour.style || '').toLowerCase();
        const sFilter = selectedStyle.toLowerCase();
        const matchStyle =
          tStyle.includes(sFilter) ||
          sFilter.includes(tStyle) ||
          (selectedStyle === 'Culture & Safari' && (tStyle.includes('safari') || tStyle.includes('culture'))) ||
          (selectedStyle === 'Hills & Beach' && (tStyle.includes('hills') || tStyle.includes('beach'))) ||
          (selectedStyle === 'Romantic & Honeymoon' && (tStyle.includes('romantic') || tStyle.includes('honeymoon'))) ||
          (selectedStyle === 'Adventure & Nature' && (tStyle.includes('adventure') || tStyle.includes('nature') || tStyle.includes('active'))) ||
          (selectedStyle === 'Grand Tour' && tStyle.includes('grand'));
        if (!matchStyle) return false;
      }

      // Query filter
      if (query.trim()) {
        const q = query.toLowerCase();
        const searchable = [
          tour.title,
          tour.description,
          tour.style,
          tour.region,
          tour.pace,
          tour.seasonFocus,
          ...(tour.highlights || []),
          ...(tour.route || []),
        ]
          .join(' ')
          .toLowerCase();

        if (!searchable.includes(q)) return false;
      }

      return true;
    });

    if (sort === 'duration-asc') {
      list = [...list].sort((a, b) => a.days - b.days);
    } else if (sort === 'duration-desc') {
      list = [...list].sort((a, b) => b.days - a.days);
    }

    return list;
  }, [duration, selectedStyle, query, sort]);

  return (
    <div>
      {/* Duration Overview Cards matching Page 2 of Brochure */}
      <div className="duration-nav-grid">
        <button
          type="button"
          className={`duration-nav-card ${duration === '6-8' ? 'active' : ''}`}
          onClick={() => setDuration(prev => (prev === '6-8' ? 'all' : '6-8'))}
        >
          <span className="duration-nav-badge">6–8 DAYS · SHORT ESCAPES</span>
          <div className="duration-nav-title">A rewarding short escape</div>
          <p className="duration-nav-desc">
            Choose compact classics, rail-and-beach combinations or activity-packed adventures across 6 curated itineraries.
          </p>
        </button>

        <button
          type="button"
          className={`duration-nav-card ${duration === '9-12' ? 'active' : ''}`}
          onClick={() => setDuration(prev => (prev === '9-12' ? 'all' : '9-12'))}
        >
          <span className="duration-nav-badge">9–12 DAYS · ISLAND DISCOVERY</span>
          <div className="duration-nav-title">A richer island discovery</div>
          <p className="duration-nav-desc">
            Add cultural cities, national parks, tea country and slower seaside time across 8 curated itineraries.
          </p>
        </button>

        <button
          type="button"
          className={`duration-nav-card ${duration === '13-15' ? 'active' : ''}`}
          onClick={() => setDuration(prev => (prev === '13-15' ? 'all' : '13-15'))}
        >
          <span className="duration-nav-badge">13–15 DAYS · THE COMPLETE PICTURE</span>
          <div className="duration-nav-title">The complete picture</div>
          <p className="duration-nav-desc">
            Explore multiple regions without losing the joy of relaxed days in each setting across 6 comprehensive grand journeys.
          </p>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="region-tabs" style={{ marginBottom: 16 }}>
        <button
          type="button"
          className={`filter-chip ${duration === 'all' ? 'active' : ''}`}
          onClick={() => setDuration('all')}
        >
          All 20 Journeys
        </button>
        <button
          type="button"
          className={`filter-chip ${duration === '6-8' ? 'active' : ''}`}
          onClick={() => setDuration('6-8')}
        >
          6–8 Days (6)
        </button>
        <button
          type="button"
          className={`filter-chip ${duration === '9-12' ? 'active' : ''}`}
          onClick={() => setDuration('9-12')}
        >
          9–12 Days (8)
        </button>
        <button
          type="button"
          className={`filter-chip ${duration === '13-15' ? 'active' : ''}`}
          onClick={() => setDuration('13-15')}
        >
          13–15 Days (6)
        </button>
      </div>

      <div className="toolbar" style={{ flexWrap: 'wrap', gap: 14 }}>
        <div style={{ position: 'relative', flex: '1', minWidth: 260 }}>
          <Search size={17} style={{ position: 'absolute', top: 16, left: 14, color: '#799085' }} />
          <input
            style={{ paddingLeft: 42, width: '100%' }}
            aria-label="Search journeys"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by destination (Sigiriya, Ella, Yala) or keyword..."
          />
        </div>

        <select
          aria-label="Filter by theme"
          value={selectedStyle}
          onChange={e => setSelectedStyle(e.target.value)}
          style={{ maxWidth: 220 }}
        >
          {styleOptions.map(s => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          aria-label="Sort journeys"
          value={sort}
          onChange={e => setSort(e.target.value)}
          style={{ maxWidth: 210 }}
        >
          <option value="brochure">Brochure Order (01–20)</option>
          <option value="duration-asc">Duration: Shortest first</option>
          <option value="duration-desc">Duration: Longest first</option>
        </select>

        <span className="muted" style={{ fontSize: '.78rem', whiteSpace: 'nowrap' }}>
          Showing {filteredTours.length} of {tours.length} journeys
        </span>
      </div>

      {filteredTours.length > 0 ? (
        <div className="cards-grid">
          {filteredTours.map((t, idx) => (
            <TourCard tour={t} key={t.slug} first={idx === 0 && duration === 'all'} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No journeys found"
          description="Try clearing your search term or choosing a different duration tab or travel theme."
        />
      )}
    </div>
  );
}

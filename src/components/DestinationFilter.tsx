'use client';

import { useState, useMemo } from 'react';
import { Search, MapPin, Compass, ArrowRight, Sun, Waves, Mountain, Landmark } from 'lucide-react';
import { destinations } from '@/lib/data';
import { DestinationSimple, EmptyState } from './UI';

const REGIONS = [
  'All Places',
  'South & West Coast',
  'Cultural Triangle',
  'Hill Country',
  'Wildlife & Nature',
  'East & North Coast',
  'City & Culture',
];

const REGION_HIGHLIGHTS = [
  {
    region: 'South & West Coast',
    badge: 'COASTAL PARADISE · BEACHES & WHALES',
    title: 'Golden Sands & Ocean Living',
    desc: 'Mirissa, Unawatuna, Hiriketiya, Bentota, Weligama, and UNESCO Galle Fort.',
    icon: Waves,
  },
  {
    region: 'Cultural Triangle',
    badge: 'ANCIENT HERITAGE · SACRED CITADELS',
    title: 'Citadels of Ancient Kings',
    desc: 'Sigiriya Rock Fortress, Pidurangala, Dambulla Cave Temple, and Polonnaruwa.',
    icon: Landmark,
  },
  {
    region: 'Hill Country',
    badge: 'TEA VALLEYS · MISTY MOUNTAINS',
    title: 'Emerald Slopes & Cloud Trails',
    desc: 'Kandy Temple of the Tooth, Ella Nine Arch Bridge, Nuwara Eliya, and Horton Plains.',
    icon: Mountain,
  },
];

export default function DestinationFilter() {
  const [selectedRegion, setSelectedRegion] = useState('All Places');
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(12);
  const [sort, setSort] = useState('popular');

  const filtered = useMemo(() => {
    let list = destinations.filter(d => {
      if (selectedRegion !== 'All Places' && d.region !== selectedRegion) {
        return false;
      }
      if (query.trim()) {
        const q = query.toLowerCase();
        const searchable = [
          d.name,
          d.displayName || '',
          d.region,
          d.location,
          d.description,
          ...(d.activities || []),
        ]
          .join(' ')
          .toLowerCase();
        if (!searchable.includes(q)) return false;
      }
      return true;
    });

    if (sort === 'name-asc') {
      list = [...list].sort((a, b) =>
        (a.displayName || a.name).localeCompare(b.displayName || b.name)
      );
    }

    return list;
  }, [selectedRegion, query, sort]);

  return (
    <div>
      {/* Region Overview Cards matching Our Tours Tab Layout */}
      <div className="duration-nav-grid" style={{ marginBottom: 36 }}>
        {REGION_HIGHLIGHTS.map(item => {
          const isActive = selectedRegion === item.region;
          const Icon = item.icon;
          return (
            <button
              key={item.region}
              type="button"
              className={`duration-nav-card ${isActive ? 'active' : ''}`}
              onClick={() =>
                setSelectedRegion(prev => (prev === item.region ? 'All Places' : item.region))
              }
              style={{ textAlign: 'left' }}
            >
              <span className="duration-nav-badge">
                <Icon size={12} style={{ display: 'inline', marginRight: 5 }} />
                {item.badge}
              </span>
              <div className="duration-nav-title">{item.title}</div>
              <p className="duration-nav-desc">{item.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Region Filter Chips */}
      <div className="region-tabs" style={{ marginBottom: 16 }}>
        {REGIONS.map(r => {
          const isSelected = selectedRegion === r;
          const count =
            r === 'All Places'
              ? destinations.length
              : destinations.filter(d => d.region === r).length;
          return (
            <button
              key={r}
              type="button"
              onClick={() => {
                setSelectedRegion(r);
                setLimit(12);
              }}
              className={`filter-chip ${isSelected ? 'active' : ''}`}
            >
              {r} ({count})
            </button>
          );
        })}
      </div>

      {/* Search Toolbar matching Our Tours Tab Toolbar */}
      <div className="toolbar" style={{ flexWrap: 'wrap', gap: 14, marginBottom: 35 }}>
        <div style={{ position: 'relative', flex: '1', minWidth: 260 }}>
          <Search
            size={17}
            style={{ position: 'absolute', top: 16, left: 14, color: '#799085' }}
          />
          <input
            style={{ paddingLeft: 42, width: '100%' }}
            aria-label="Search destinations"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setLimit(12);
            }}
            placeholder="Search by destination name (Mirissa, Unawatuna, Hiriketiya, Sigiriya) or activity..."
          />
        </div>

        <select
          aria-label="Sort destinations"
          value={sort}
          onChange={e => setSort(e.target.value)}
          style={{ minWidth: 190 }}
        >
          <option value="popular">Curated Order</option>
          <option value="name-asc">Alphabetical (A–Z)</option>
        </select>

        <span className="muted" style={{ fontSize: '.75rem', fontWeight: 600 }}>
          Showing {Math.min(limit, filtered.length)} of {filtered.length} destinations
        </span>
      </div>

      {/* Destination Cards Grid */}
      {filtered.length > 0 ? (
        <>
          <div className="journey-grid">
            {filtered.slice(0, limit).map(d => (
              <DestinationSimple key={d.slug} destination={d} />
            ))}
          </div>

          {limit < filtered.length && (
            <div style={{ textAlign: 'center', marginTop: 55 }}>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setLimit(v => v + 12)}
                style={{ minWidth: 240 }}
              >
                Discover More Destinations ({filtered.length - limit} remaining)
              </button>
            </div>
          )}
        </>
      ) : (
        <EmptyState
          title="No destinations match your search"
          description="Try selecting 'All Places' or searching for another keyword like beach, safari, temple, or tea."
        />
      )}
    </div>
  );
}

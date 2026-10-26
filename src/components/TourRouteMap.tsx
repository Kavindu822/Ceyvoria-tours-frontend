'use client';

import { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, Car, ExternalLink, Flag, Compass, CheckCircle2 } from 'lucide-react';
import type { Tour } from '@/lib/types';
import 'leaflet/dist/leaflet.css';

interface Props {
  tour: Tour;
}

interface CoordinatePoint {
  dayLabel: string;
  name: string;
  desc?: string;
  lat: number;
  lng: number;
  isStart?: boolean;
  isEnd?: boolean;
}

// Precise Sri Lanka Coordinates Dictionary
const DESTINATION_COORDS: Record<string, { lat: number; lng: number; displayName: string }> = {
  'bia': { lat: 7.1808, lng: 79.8841, displayName: 'Colombo Bandaranaike Airport (BIA)' },
  'airport': { lat: 7.1808, lng: 79.8841, displayName: 'Colombo Bandaranaike Airport (BIA)' },
  'negombo': { lat: 7.2008, lng: 79.8736, displayName: 'Negombo' },
  'sigiriya-rock-fortress': { lat: 7.9570, lng: 80.7603, displayName: 'Sigiriya Rock Fortress' },
  'sigiriya': { lat: 7.9570, lng: 80.7603, displayName: 'Sigiriya' },
  'pidurangala-rock': { lat: 7.9658, lng: 80.7634, displayName: 'Pidurangala' },
  'dambulla-cave-temple': { lat: 7.8742, lng: 80.6511, displayName: 'Dambulla Cave Temple' },
  'dambulla': { lat: 7.8742, lng: 80.6511, displayName: 'Dambulla' },
  'kandy-temple-of-the-tooth': { lat: 7.2906, lng: 80.6337, displayName: 'Kandy' },
  'kandy': { lat: 7.2906, lng: 80.6337, displayName: 'Kandy' },
  'peradeniya-royal-botanical-gardens': { lat: 7.2717, lng: 80.5956, displayName: 'Peradeniya Gardens' },
  'nuwara-eliya': { lat: 6.9497, lng: 80.7891, displayName: 'Nuwara Eliya' },
  'horton-plains-worlds-end': { lat: 6.8028, lng: 80.8035, displayName: 'Horton Plains & World’s End' },
  'ella-nine-arch-bridge': { lat: 6.8667, lng: 81.0466, displayName: 'Ella (Nine Arches Bridge)' },
  'ella': { lat: 6.8667, lng: 81.0466, displayName: 'Ella' },
  'haputale-liptons-seat': { lat: 6.7681, lng: 80.9504, displayName: 'Haputale & Lipton’s Seat' },
  'haputale': { lat: 6.7681, lng: 80.9504, displayName: 'Haputale' },
  'kitulgala': { lat: 6.9961, lng: 80.4124, displayName: 'Kitulgala' },
  'udawalawe-national-park': { lat: 6.4746, lng: 80.8987, displayName: 'Udawalawe National Park' },
  'udawalawe': { lat: 6.4746, lng: 80.8987, displayName: 'Udawalawe' },
  'yala-national-park': { lat: 6.2750, lng: 81.2858, displayName: 'Yala National Park' },
  'yala': { lat: 6.2750, lng: 81.2858, displayName: 'Yala' },
  'tissamaharama': { lat: 6.2750, lng: 81.2858, displayName: 'Tissamaharama' },
  'bundala-national-park': { lat: 6.1867, lng: 81.2294, displayName: 'Bundala' },
  'mirissa': { lat: 5.9482, lng: 80.4578, displayName: 'Mirissa' },
  'weligama': { lat: 5.9726, lng: 80.4289, displayName: 'Weligama' },
  'unawatuna-jungle-beach': { lat: 6.0108, lng: 80.2492, displayName: 'Unawatuna' },
  'galle-fort': { lat: 6.0328, lng: 80.2168, displayName: 'Galle Fort' },
  'galle': { lat: 6.0328, lng: 80.2168, displayName: 'Galle Fort' },
  'hikkaduwa': { lat: 6.1395, lng: 80.1063, displayName: 'Hikkaduwa' },
  'bentota': { lat: 6.4256, lng: 79.9965, displayName: 'Bentota' },
  'colombo': { lat: 6.9271, lng: 79.8612, displayName: 'Colombo' },
  'anuradhapura-sacred-city': { lat: 8.3114, lng: 80.4037, displayName: 'Anuradhapura' },
  'anuradhapura': { lat: 8.3114, lng: 80.4037, displayName: 'Anuradhapura' },
  'polonnaruwa-ancient-city': { lat: 7.9403, lng: 81.0188, displayName: 'Polonnaruwa' },
  'polonnaruwa': { lat: 7.9403, lng: 81.0188, displayName: 'Polonnaruwa' },
  'trincomalee-nilaveli': { lat: 8.5874, lng: 81.2152, displayName: 'Trincomalee & Nilaveli' },
  'trincomalee': { lat: 8.5874, lng: 81.2152, displayName: 'Trincomalee' },
  'pigeon-island-national-park': { lat: 8.7214, lng: 81.2025, displayName: 'Pigeon Island' },
  'pasikudah': { lat: 7.9255, lng: 81.5644, displayName: 'Pasikudah Bay' },
  'arugam-bay': { lat: 6.8419, lng: 81.8357, displayName: 'Arugam Bay' },
  'sinharaja-rainforest': { lat: 6.4172, lng: 80.4633, displayName: 'Sinharaja Rainforest' },
  'sinharaja': { lat: 6.4172, lng: 80.4633, displayName: 'Sinharaja' },
  'jaffna-nallur-kandaswamy-temple': { lat: 9.6615, lng: 80.0255, displayName: 'Jaffna' },
  'jaffna': { lat: 9.6615, lng: 80.0255, displayName: 'Jaffna' },
  'delft-island': { lat: 9.5100, lng: 79.6900, displayName: 'Delft Island' },
  'mannar-talaimannar': { lat: 8.9810, lng: 79.9044, displayName: 'Mannar' },
  'wilpattu-national-park': { lat: 8.4500, lng: 80.0167, displayName: 'Wilpattu' },
  'kalpitiya': { lat: 8.2325, lng: 79.7618, displayName: 'Kalpitiya' },
};

function resolveCoord(slug: string): { lat: number; lng: number; displayName: string } {
  const clean = slug.toLowerCase().trim();
  if (DESTINATION_COORDS[clean]) return DESTINATION_COORDS[clean];
  for (const key of Object.keys(DESTINATION_COORDS)) {
    if (clean.includes(key) || key.includes(clean)) {
      return DESTINATION_COORDS[key];
    }
  }
  return { lat: 7.8731, lng: 80.7718, displayName: slug };
}

export default function TourRouteMap({ tour }: Props) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [activeStop, setActiveStop] = useState<number>(0);

  // Build the complete sequential route points: Start (BIA) -> Tour Route Stops -> Finish (BIA)
  const routePoints: CoordinatePoint[] = [
    {
      dayLabel: 'Arrival',
      name: 'Colombo Bandaranaike Airport (BIA)',
      desc: 'VIP Ayubowan pickup by private chauffeur',
      lat: DESTINATION_COORDS.bia.lat,
      lng: DESTINATION_COORDS.bia.lng,
      isStart: true,
    },
    ...tour.route.map((slug, idx) => {
      const coord = resolveCoord(slug);
      const itineraryMatch = tour.itinerary.find(
        d =>
          (d.places && d.places.some(p => p.toLowerCase().includes(coord.displayName.toLowerCase()))) ||
          d.title.toLowerCase().includes(coord.displayName.toLowerCase())
      );
      return {
        dayLabel: itineraryMatch ? `Day ${itineraryMatch.day}` : `Stop ${idx + 1}`,
        name: coord.displayName,
        desc: itineraryMatch?.title || `Explore ${coord.displayName}`,
        lat: coord.lat,
        lng: coord.lng,
      };
    }),
    {
      dayLabel: 'Departure',
      name: 'Colombo Bandaranaike Airport (BIA)',
      desc: 'Expressway airport drop-off & farewell',
      lat: DESTINATION_COORDS.bia.lat,
      lng: DESTINATION_COORDS.bia.lng,
      isEnd: true,
    },
  ];

  // Construct Google Maps multi-stop directions URL
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/${encodeURIComponent(
    'Bandaranaike International Airport, Katunayake, Sri Lanka'
  )}/${tour.route
    .map(r => encodeURIComponent(resolveCoord(r).displayName + ', Sri Lanka'))
    .join('/')}/${encodeURIComponent('Bandaranaike International Airport, Katunayake, Sri Lanka')}`;

  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (!mapContainerRef.current) return;
      if (typeof window === 'undefined') return;

      const L = (await import('leaflet')).default;
      if (!isMounted || !mapContainerRef.current) return;

      // Clean up previous instance if exists
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Initialize map centered on Sri Lanka
      const map = L.map(mapContainerRef.current, {
        scrollWheelZoom: false,
      }).setView([7.8731, 80.7718], 8);

      mapInstanceRef.current = map;

      // Vibrant, high-detail OpenStreetMap tiles (100% free, no API key required, crystal-clear roads & places)
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      // Collect lat/lng points for the polyline
      const latLngs = routePoints.map(p => [p.lat, p.lng] as [number, number]);

      // 1. Draw outer contrast glow
      L.polyline(latLngs, {
        color: '#03261f',
        weight: 6,
        opacity: 0.65,
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(map);

      // 2. Draw vibrant Ceyvoria gold/emerald route line
      const mainPolyline = L.polyline(latLngs, {
        color: '#C49A45',
        weight: 3.5,
        dashArray: '8, 8',
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(map);

      // 3. Add custom numbered markers for each waypoint
      const markers: any[] = [];
      routePoints.forEach((point, idx) => {
        const isStart = idx === 0;
        const isEnd = idx === routePoints.length - 1;

        let badgeBg = '#073D32';
        let badgeBorder = '#C49A45';
        let badgeText = `${idx}`;

        if (isStart) {
          badgeBg = '#1e7e34';
          badgeBorder = '#ffffff';
          badgeText = '🟢';
        } else if (isEnd) {
          badgeBg = '#b33927';
          badgeBorder = '#ffffff';
          badgeText = '🏁';
        }

        const customIcon = L.divIcon({
          className: 'custom-route-marker',
          html: `<div style="
            display:flex;
            align-items:center;
            justify-content:center;
            width:32px;
            height:32px;
            background:${badgeBg};
            color:#ffffff;
            border:2.5px solid ${badgeBorder};
            border-radius:50%;
            font-size:12px;
            font-weight:800;
            box-shadow:0 4px 14px rgba(0,0,0,0.35);
            transform:translate(-50%, -50%);
            transition:transform .2s;
          ">${badgeText}</div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

        const marker = L.marker([point.lat, point.lng], { icon: customIcon }).addTo(map);

        marker.bindPopup(
          `<div style="font-family:var(--body);padding:4px 2px;">
            <div style="font-size:11px;font-weight:800;text-transform:uppercase;color:#C49A45;letter-spacing:.08em;">${point.dayLabel}</div>
            <div style="font-size:14px;font-weight:700;color:#073D32;margin:2px 0 4px;">${point.name}</div>
            ${point.desc ? `<div style="font-size:12px;color:#555;">${point.desc}</div>` : ''}
          </div>`
        );

        marker.on('click', () => {
          setActiveStop(idx);
        });

        markers.push(marker);
      });

      markersRef.current = markers;

      // Fit map to route bounds with comfortable padding and handle async container layout
      const routeBounds = mainPolyline.getBounds();
      map.fitBounds(routeBounds, {
        padding: [45, 45],
        maxZoom: 10,
      });

      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
          mapInstanceRef.current.fitBounds(routeBounds, {
            padding: [45, 45],
            maxZoom: 10,
          });
        }
      }, 200);
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [tour.slug]);

  // Handler to pan to clicked stop
  const handleSelectStop = (idx: number) => {
    setActiveStop(idx);
    const target = routePoints[idx];
    if (mapInstanceRef.current && target) {
      mapInstanceRef.current.flyTo([target.lat, target.lng], 10, {
        duration: 0.8,
      });
      if (markersRef.current[idx]) {
        markersRef.current[idx].openPopup();
      }
    }
  };

  return (
    <section className="tour-map-section" style={{ margin: '50px 0 60px' }}>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <h2
          style={{
            fontSize: 'clamp(2.4rem, 4vw, 3.4rem)',
            fontFamily: 'var(--display)',
            color: 'var(--forest)',
            margin: '0 0 6px',
            fontWeight: 600,
          }}
        >
          Tour Route Map
        </h2>
        <p style={{ fontSize: '1.12rem', fontWeight: 700, color: 'var(--forest)', letterSpacing: '-.01em', margin: 0 }}>
          {tour.title} – {tour.days} Days & {tour.nights} Nights Circuit
        </p>
        <span style={{ display: 'inline-block', fontSize: '.76rem', color: '#66756b', marginTop: 4 }}>
          🟢 Colombo BIA Airport Pickup → Complete Island Itinerary → 🏁 Airport Drop-off
        </span>
      </div>

      {/* Interactive Waypoints Track */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fit, minmax(175px, 1fr))`,
          gap: 10,
          marginBottom: 18,
        }}
      >
        {routePoints.map((wp, idx) => {
          const isActive = idx === activeStop;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectStop(idx)}
              style={{
                background: isActive ? '#f0f5f1' : '#fff',
                border: isActive ? '2px solid var(--forest)' : '1px solid #dbe3dc',
                padding: '10px 14px',
                borderRadius: 4,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all .18s ease',
                boxShadow: isActive ? '0 4px 14px rgba(5,46,39,0.08)' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                {wp.isStart ? (
                  <span style={{ fontSize: '11px' }}>🟢</span>
                ) : wp.isEnd ? (
                  <Flag size={13} style={{ color: '#c0392b' }} />
                ) : (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      background: isActive ? 'var(--forest)' : '#e6ede8',
                      color: isActive ? '#fff' : 'var(--forest)',
                      fontSize: '10px',
                      fontWeight: 800,
                    }}
                  >
                    {idx}
                  </span>
                )}
                <span
                  style={{
                    fontSize: '.68rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '.06em',
                    color: isActive ? 'var(--forest)' : '#697a70',
                  }}
                >
                  {wp.dayLabel}
                </span>
              </div>
              <div
                style={{
                  fontSize: '.82rem',
                  fontWeight: 700,
                  color: 'var(--forest)',
                  lineHeight: 1.3,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {wp.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Leaflet Route Map */}
      <div
        style={{
          position: 'relative',
          background: '#fff',
          border: '1px solid #dce4dd',
          borderRadius: 6,
          overflow: 'hidden',
          boxShadow: '0 8px 30px rgba(5,46,39,0.08)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 18px',
            background: '#073D32',
            color: '#fff',
            flexWrap: 'wrap',
            gap: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Car size={16} style={{ color: 'var(--gold)' }} />
            <span style={{ fontSize: '.76rem', fontWeight: 700, letterSpacing: '.03em' }}>
              Full Private Chauffeur Route with Intermediate Stops
            </span>
          </div>

          <a
            href={googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(255,255,255,0.15)',
              padding: '6px 14px',
              borderRadius: 3,
              color: '#fff',
              fontSize: '.72rem',
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'background .2s',
            }}
          >
            <span>Open in Google Maps Directions</span>
            <ExternalLink size={12} />
          </a>
        </div>

        {/* Map Canvas */}
        <div
          ref={mapContainerRef}
          style={{
            width: '100%',
            height: 520,
            background: '#f4f3f0',
            zIndex: 1,
          }}
        />

        {/* Route Steps Ribbon */}
        <div
          style={{
            padding: '14px 18px',
            background: '#fafbf9',
            borderTop: '1px solid #e1e8e2',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            overflowX: 'auto',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ fontSize: '.68rem', fontWeight: 800, color: 'var(--gold)', letterSpacing: '.08em', textTransform: 'uppercase' }}>
            CIRCUIT:
          </span>
          {routePoints.map((p, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '.74rem', color: '#44534a' }}>
              <strong>{p.name}</strong>
              {i < routePoints.length - 1 && <span style={{ color: '#C49A45' }}>➔</span>}
            </span>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '11px 18px',
            background: '#ffffff',
            borderTop: '1px solid #edf1ee',
            fontSize: '.73rem',
            color: '#5e6f64',
            flexWrap: 'wrap',
            gap: 10,
          }}
        >
          <div>
            <strong>Included Transport:</strong> Luxury air-conditioned vehicle with dedicated English-speaking chauffeur-guide, fuel, expressway tolls & airport parking.
          </div>
          <div>All routes and intermediate stops can be customized to your schedule.</div>
        </div>
      </div>
    </section>
  );
}

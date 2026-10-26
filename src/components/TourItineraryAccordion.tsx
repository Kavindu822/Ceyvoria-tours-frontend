'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronUp, MapPin, Check, Sun, Sunset, Moon, Bed, Compass } from 'lucide-react';
import type { ItineraryDay } from '@/lib/types';

interface Props {
  itinerary: ItineraryDay[];
  tourTitle: string;
}

export default function TourItineraryAccordion({ itinerary, tourTitle }: Props) {
  // By default, expand all or at least first 3 days
  const [openDays, setOpenDays] = useState<number[]>([1, 2, 3]);

  const toggleDay = (dayNum: number) => {
    setOpenDays(prev =>
      prev.includes(dayNum) ? prev.filter(d => d !== dayNum) : [...prev, dayNum]
    );
  };

  const expandAll = () => setOpenDays(itinerary.map(d => d.day));
  const collapseAll = () => setOpenDays([]);

  const allOpen = openDays.length === itinerary.length;

  return (
    <div className="itinerary-accordion-wrap" style={{ marginTop: 24, marginBottom: 50 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <span style={{ fontSize: '.72rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 800 }}>
            DAY-BY-DAY SCHEDULE
          </span>
          <h3 className="forest" style={{ margin: '4px 0 0', fontSize: '1.85rem' }}>
            Detailed Journey Itinerary
          </h3>
        </div>
        <button
          type="button"
          onClick={allOpen ? collapseAll : expandAll}
          className="btn btn-outline"
          style={{ minHeight: 38, padding: '8px 16px', fontSize: '.72rem' }}
        >
          {allOpen ? 'Collapse All Days' : 'Expand All Days'}
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {itinerary.map(day => {
          const isOpen = openDays.includes(day.day);
          return (
            <div
              key={day.day}
              className={`itinerary-day-card ${isOpen ? 'open' : ''}`}
              style={{
                background: '#fff',
                border: '1px solid #dce4dd',
                borderLeft: isOpen ? '4px solid var(--forest)' : '4px solid #c8d4cb',
                borderRadius: 4,
                overflow: 'hidden',
                transition: 'all .24s ease',
                boxShadow: isOpen ? '0 6px 20px rgba(5,46,39,0.06)' : 'none',
              }}
            >
              {/* Header Toggle */}
              <button
                type="button"
                onClick={() => toggleDay(day.day)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '20px 24px',
                  background: isOpen ? '#f8faf7' : '#fff',
                  border: 0,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background .2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                  <span
                    style={{
                      background: isOpen ? 'var(--forest)' : '#e8eee9',
                      color: isOpen ? '#fff' : 'var(--forest)',
                      fontSize: '.75rem',
                      fontWeight: 800,
                      letterSpacing: '.06em',
                      padding: '5px 12px',
                      borderRadius: 3,
                    }}
                  >
                    Day {day.day}
                  </span>
                  <span
                    style={{
                      fontSize: '1.18rem',
                      fontWeight: 700,
                      fontFamily: 'var(--display)',
                      color: 'var(--forest)',
                      letterSpacing: '-.01em',
                    }}
                  >
                    {day.title}
                  </span>
                </div>
                <div style={{ color: 'var(--forest)', display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 10 }}>
                  <span style={{ fontSize: '.7rem', color: '#68786e', fontWeight: 600 }}>
                    {isOpen ? 'Hide Details' : 'View Schedule'}
                  </span>
                  {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </button>

              {/* Collapsible Content */}
              {isOpen && (
                <div style={{ padding: '24px 28px', borderTop: '1px solid #eef2ee', background: '#fff' }}>
                  <p style={{ fontSize: '.88rem', color: '#4f5d54', lineHeight: 1.7, marginBottom: 22 }}>
                    {day.description}
                  </p>

                  {/* Morning, Afternoon, Evening structured schedule */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 24 }}>
                    {day.morning && day.morning.length > 0 && (
                      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                        <div style={{ minWidth: 92, display: 'flex', alignItems: 'center', gap: 6, color: '#b8860b', fontWeight: 800, fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: '.08em', marginTop: 2 }}>
                          <Sun size={15} />
                          Morning:
                        </div>
                        <ul style={{ margin: 0, paddingLeft: 16, color: '#334038', fontSize: '.82rem', lineHeight: 1.65, flex: 1 }}>
                          {day.morning.map((m, i) => (
                            <li key={i} style={{ marginBottom: 4 }}>
                              {m}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {day.afternoon && day.afternoon.length > 0 && (
                      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                        <div style={{ minWidth: 92, display: 'flex', alignItems: 'center', gap: 6, color: 'var(--forest)', fontWeight: 800, fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: '.08em', marginTop: 2 }}>
                          <Sunset size={15} />
                          Afternoon:
                        </div>
                        <ul style={{ margin: 0, paddingLeft: 16, color: '#334038', fontSize: '.82rem', lineHeight: 1.65, flex: 1 }}>
                          {day.afternoon.map((a, i) => (
                            <li key={i} style={{ marginBottom: 4 }}>
                              {a}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {day.evening && day.evening.length > 0 && (
                      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                        <div style={{ minWidth: 92, display: 'flex', alignItems: 'center', gap: 6, color: '#415a77', fontWeight: 800, fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: '.08em', marginTop: 2 }}>
                          <Moon size={15} />
                          Evening:
                        </div>
                        <ul style={{ margin: 0, paddingLeft: 16, color: '#334038', fontSize: '.82rem', lineHeight: 1.65, flex: 1 }}>
                          {day.evening.map((e, i) => (
                            <li key={i} style={{ marginBottom: 4 }}>
                              {e}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {day.overnight && (
                      <div style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '10px 14px', background: '#f5f7f4', borderRadius: 4, marginTop: 4 }}>
                        <div style={{ minWidth: 92, display: 'flex', alignItems: 'center', gap: 6, color: 'var(--forest)', fontWeight: 800, fontSize: '.73rem', textTransform: 'uppercase', letterSpacing: '.08em' }}>
                          <Bed size={15} />
                          Overnight:
                        </div>
                        <span style={{ fontSize: '.82rem', fontWeight: 700, color: 'var(--forest)' }}>
                          {day.overnight.replace(/^night:\s*/i, '').replace(/^overnight:\s*/i, '')}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Places & Included Activities */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, paddingTop: 16, borderTop: '1px solid #eef2ee', alignItems: 'center' }}>
                    {day.places && day.places.length > 0 && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.1em', color: '#68786e' }}>
                          Places Visited:
                        </span>
                        {day.places.map((place, i) => (
                          <span
                            key={i}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 4,
                              background: '#edf3ee',
                              color: 'var(--forest)',
                              fontSize: '.72rem',
                              fontWeight: 700,
                              padding: '4px 10px',
                              borderRadius: 3,
                            }}
                          >
                            <MapPin size={11} /> {place}
                          </span>
                        ))}
                      </div>
                    )}

                    {day.activities && day.activities.length > 0 && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.1em', color: '#68786e' }}>
                          Activities Included:
                        </span>
                        {day.activities.map((act, i) => (
                          <span
                            key={i}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 4,
                              background: '#f6f5ef',
                              color: '#695a32',
                              fontSize: '.72rem',
                              fontWeight: 700,
                              padding: '4px 10px',
                              borderRadius: 3,
                              border: '1px solid #e5dfcf',
                            }}
                          >
                            <Check size={11} /> {act}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, MessageCircle, ArrowRight, Check, Compass, Heart, ShieldCheck, Send } from 'lucide-react';
import { site } from '@/lib/site';

const CURIOSITY_TOPICS = [
  { id: 'tea-trains', label: 'Misty Tea Hills & Scenic Trains', icon: '🚂' },
  { id: 'safari-wildlife', label: 'Wild Elephants & Leopard Safaris', icon: '🐘' },
  { id: 'ancient-kingdoms', label: 'Sigiriya Rock & Ancient Citadels', icon: '🏛️' },
  { id: 'beaches-whales', label: 'Golden Beaches & Whale Watching', icon: '🐋' },
  { id: 'wellness-villas', label: 'Ayurvedic Spas & Peaceful Retreats', icon: '🌿' },
  { id: 'river-mangroves', label: 'Madu River & Mangrove Boat Safaris', icon: '🛶' },
  { id: 'culinary-spices', label: 'Ceylon Spices & Authentic Cooking', icon: '🍲' },
  { id: 'surf-snorkeling', label: 'Reef Snorkeling, Diving & Surfing', icon: '🤿' },
];

const DURATIONS = [
  '6–8 Days (Compact)',
  '9–12 Days (Classic)',
  '13–15+ Days (Grand Circuit)',
  'Flexible / Still Deciding',
];

const TRAVEL_TYPES = [
  'Couple / Honeymoon',
  'Family with Children',
  'Solo Adventurer',
  'Friends / Small Group',
];

export default function CuriosityPlanner() {
  const [selectedCuriosities, setSelectedCuriosities] = useState<string[]>([
    'Misty Tea Hills & Scenic Trains',
    'Sigiriya Rock & Ancient Citadels',
  ]);
  const [duration, setDuration] = useState('9–12 Days (Classic)');
  const [partyType, setPartyType] = useState('Couple / Honeymoon');
  const [guestNotes, setGuestNotes] = useState('');
  const [travelMonth, setTravelMonth] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleCuriosity = (label: string) => {
    setSelectedCuriosities(prev =>
      prev.includes(label) ? prev.filter(c => c !== label) : [...prev, label]
    );
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const ref = `CEY-CURIO-${Date.now().toString().slice(-6)}`;
    const curiositiesText =
      selectedCuriosities.length > 0
        ? selectedCuriosities.map(c => ` • ${c}`).join('\n')
        : ' • Open to recommendations';

    // Dispatch automated email alerts to ceyvoriatours@gmail.com and customer
    try {
      await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'CustomTrip',
          reference: ref,
          guestName: guestName.trim() || 'Curious Traveller',
          guestEmail: guestEmail.trim() || 'inquiry@ceyvoriatours.com',
          guestPhone: guestPhone.trim() || '',
          tourTitle: `Homepage Curiosity Inquiry (${duration} · ${partyType})`,
          travelDate: travelMonth || 'Flexible',
          partySize: partyType,
          activities: selectedCuriosities,
          specialRequests: `Guest Notes: ${guestNotes || 'None'} | Sparked by: ${selectedCuriosities.join(', ')}`,
        }),
      });
    } catch (err) {
      console.warn('[Curiosity notification error]:', err);
    }

    const message = `🌿 *MY DREAM SRI LANKA JOURNEY & CURIOSITY* 🌿
----------------------------------
📌 *Inquiry Ref:* ${ref}
👤 *Name:* ${guestName.trim() || 'Valued Guest'}
📧 *Email:* ${guestEmail.trim() || 'Not specified'}
📱 *Phone:* ${guestPhone.trim() || 'Not specified'}

✨ *What Sparks My Curiosity:*
${curiositiesText}

⏳ *Ideal Duration:* ${duration}
👥 *Travel Companions:* ${partyType}
🗓️ *Approximate Dates / Month:* ${travelMonth || 'Flexible'}
📝 *My Dream Vision / Notes:*
${guestNotes || 'Looking for your expert recommendations to curate our private trip!'}
----------------------------------
_Hello Ceyvoria Tours! I shared my journey curiosity — please arrange our trip nicely with an itemized quote._`;

    const rawPhone = site.whatsappRaw.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${rawPhone}?text=${encodeURIComponent(message)}`;

    if (typeof window !== 'undefined') {
      window.open(waUrl, '_blank');
    }
    setSent(true);
    setIsSubmitting(false);
  };

  return (
    <section
      className="section"
      style={{
        background: 'linear-gradient(180deg, #faf8f3 0%, #f1eee4 100%)',
        borderTop: '1px solid #e7e2d4',
        borderBottom: '1px solid #e7e2d4',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative delicate watermark background */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: -40,
          right: -40,
          width: 380,
          height: 380,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(196,154,69,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container">
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center', marginBottom: 36 }}>
          <span
            className="kicker"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              background: 'rgba(196,154,69,0.12)',
              padding: '6px 14px',
              borderRadius: 20,
              color: '#8b6b23',
              fontSize: '0.7rem',
              fontWeight: 800,
              letterSpacing: '0.14em',
              marginBottom: 14,
            }}
          >
            <Sparkles size={14} /> YOUR BESPOKE CONCIERGE
          </span>
          <h2
            className="forest"
            style={{
              fontSize: 'clamp(2.1rem, 3.8vw, 3.4rem)',
              margin: '0 0 14px',
              lineHeight: 1.15,
            }}
          >
            Tell your journey and curiosity,<br />
            <em style={{ fontWeight: 400, color: 'var(--gold)', fontStyle: 'italic' }}>
              then we arrange your trip nicely.
            </em>
          </h2>
          <p
            style={{
              fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)',
              color: '#556459',
              lineHeight: 1.75,
              maxWidth: 680,
              margin: '0 auto',
            }}
          >
            Every extraordinary journey begins with a spark of curiosity. Select what calls to you,
            share a few simple thoughts, and our private travel designers will weave them into an elegant,
            unhurried tailor-made itinerary.
          </p>
        </div>

        {/* Interactive Box */}
        <div
          style={{
            maxWidth: 960,
            margin: '0 auto',
            background: '#ffffff',
            borderRadius: 8,
            boxShadow: '0 18px 45px rgba(7, 61, 50, 0.08)',
            border: '1px solid #e3e8e4',
            borderTop: '4px solid var(--gold)',
            padding: 'clamp(24px, 4vw, 44px)',
          }}
        >
          <form onSubmit={handleSend}>
            {/* Step 1: Curiosity Chips */}
            <div style={{ marginBottom: 28 }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--forest)',
                  marginBottom: 12,
                }}
              >
                <span>1. What sparks your curiosity? (Select all that call to you)</span>
                <small style={{ fontSize: '0.68rem', color: '#7e8d82', textTransform: 'none', fontWeight: 600 }}>
                  {selectedCuriosities.length} selected
                </small>
              </label>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
                  gap: 10,
                }}
              >
                {CURIOSITY_TOPICS.map(item => {
                  const isChecked = selectedCuriosities.includes(item.label);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleCuriosity(item.label)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '12px 14px',
                        borderRadius: 5,
                        background: isChecked ? '#e9f1ec' : '#f9faf8',
                        border: isChecked ? '1.5px solid var(--forest)' : '1px solid #dde3de',
                        color: isChecked ? 'var(--forest)' : '#4a574f',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontSize: '0.78rem',
                        fontWeight: isChecked ? 700 : 500,
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>{item.icon}</span>
                      <span style={{ flex: 1, lineHeight: 1.35 }}>{item.label}</span>
                      {isChecked && (
                        <Check size={15} style={{ color: 'var(--forest)', flexShrink: 0 }} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Trip Details Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 18,
                marginBottom: 24,
                paddingTop: 18,
                borderTop: '1px solid #eef2ed',
              }}
            >
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--forest)',
                    marginBottom: 8,
                  }}
                >
                  2. Preferred Duration
                </label>
                <select
                  value={duration}
                  onChange={e => setDuration(e.target.value)}
                  style={{
                    width: '100%',
                    minHeight: 46,
                    padding: '10px 14px',
                    borderRadius: 4,
                    border: '1px solid #cbd5cc',
                    background: '#fdfdfd',
                    fontSize: '0.82rem',
                    color: 'var(--forest)',
                    fontWeight: 600,
                  }}
                >
                  {DURATIONS.map(d => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--forest)',
                    marginBottom: 8,
                  }}
                >
                  3. Who is Travelling?
                </label>
                <select
                  value={partyType}
                  onChange={e => setPartyType(e.target.value)}
                  style={{
                    width: '100%',
                    minHeight: 46,
                    padding: '10px 14px',
                    borderRadius: 4,
                    border: '1px solid #cbd5cc',
                    background: '#fdfdfd',
                    fontSize: '0.82rem',
                    color: 'var(--forest)',
                    fontWeight: 600,
                  }}
                >
                  {TRAVEL_TYPES.map(t => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--forest)',
                    marginBottom: 8,
                  }}
                >
                  4. Approximate Timing
                </label>
                <input
                  type="text"
                  placeholder="e.g. November 2026, or flexible"
                  value={travelMonth}
                  onChange={e => setTravelMonth(e.target.value)}
                  style={{
                    width: '100%',
                    minHeight: 46,
                    padding: '10px 14px',
                    borderRadius: 4,
                    border: '1px solid #cbd5cc',
                    background: '#fdfdfd',
                    fontSize: '0.82rem',
                    color: 'var(--forest)',
                  }}
                />
              </div>
            </div>

            {/* Step 3: Tell Your Journey Note */}
            <div style={{ marginBottom: 26 }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--forest)',
                  marginBottom: 8,
                }}
              >
                5. Tell Us What You Imagine (Your Personal Wishlist)
              </label>
              <textarea
                rows={3}
                placeholder="Share any special moments you want to include — e.g. private driver with luxury car, beachfront sunset dinner, climb Sigiriya at sunrise, slow tea factory tour..."
                value={guestNotes}
                onChange={e => setGuestNotes(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 4,
                  border: '1px solid #cbd5cc',
                  background: '#fdfdfd',
                  fontSize: '0.82rem',
                  color: 'var(--charcoal)',
                  resize: 'vertical',
                }}
              />
            </div>

            {/* Step 4: Your Contact Details (For Quotation & Alerts) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 16,
                marginBottom: 26,
                paddingTop: 18,
                borderTop: '1px solid #eef2ed',
              }}
            >
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--forest)',
                    marginBottom: 8,
                  }}
                >
                  6. Your Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Eleanor Vance"
                  value={guestName}
                  onChange={e => setGuestName(e.target.value)}
                  style={{
                    width: '100%',
                    minHeight: 44,
                    padding: '10px 14px',
                    borderRadius: 4,
                    border: '1px solid #cbd5cc',
                    background: '#fdfdfd',
                    fontSize: '0.82rem',
                    color: 'var(--forest)',
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--forest)',
                    marginBottom: 8,
                  }}
                >
                  7. Email Address (For Itinerary Quote)
                </label>
                <input
                  type="email"
                  placeholder="eleanor@example.com"
                  value={guestEmail}
                  onChange={e => setGuestEmail(e.target.value)}
                  style={{
                    width: '100%',
                    minHeight: 44,
                    padding: '10px 14px',
                    borderRadius: 4,
                    border: '1px solid #cbd5cc',
                    background: '#fdfdfd',
                    fontSize: '0.82rem',
                    color: 'var(--forest)',
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--forest)',
                    marginBottom: 8,
                  }}
                >
                  8. WhatsApp / Phone
                </label>
                <input
                  type="tel"
                  placeholder="+44 7123 456789"
                  value={guestPhone}
                  onChange={e => setGuestPhone(e.target.value)}
                  style={{
                    width: '100%',
                    minHeight: 44,
                    padding: '10px 14px',
                    borderRadius: 4,
                    border: '1px solid #cbd5cc',
                    background: '#fdfdfd',
                    fontSize: '0.82rem',
                    color: 'var(--forest)',
                  }}
                />
              </div>
            </div>

            {/* Step 5: Submission Actions */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
                flexWrap: 'wrap',
                paddingTop: 16,
                borderTop: '1px solid #eef2ed',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: '0.74rem',
                    color: '#65756a',
                    fontWeight: 600,
                  }}
                >
                  <ShieldCheck size={16} style={{ color: 'var(--gold)' }} />
                  Zero booking fees · 100% Tailor-made
                </span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: '0.74rem',
                    color: '#65756a',
                    fontWeight: 600,
                  }}
                >
                  <Compass size={16} style={{ color: 'var(--gold)' }} />
                  Private chauffeur & licensed guide
                </span>
              </div>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', width: '100%', maxWidth: 'fit-content' }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-gold"
                  style={{
                    fontSize: '0.84rem',
                    fontWeight: 800,
                    boxShadow: '0 4px 18px rgba(196, 154, 69, 0.35)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 9,
                  }}
                >
                  <MessageCircle size={17} style={{ color: '#152d27' }} />
                  {isSubmitting ? 'Sending Request...' : 'Arrange My Trip Nicely →'}
                </button>

                <Link
                  href="/plan-your-trip"
                  className="btn btn-outline"
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                  }}
                >
                  Use Interactive Wizard <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {sent && (
              <div
                style={{
                  marginTop: 18,
                  padding: '14px 20px',
                  background: '#ecf5ec',
                  border: '1px solid #a3cca8',
                  borderRadius: 4,
                  fontSize: '0.82rem',
                  color: '#1a5229',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <Check size={18} style={{ flexShrink: 0 }} />
                <span>
                  <strong>Enquiry received!</strong> We have dispatched an alert to our travel team at <em>ceyvoriatours@gmail.com</em> and prepared your WhatsApp chat. We will reply promptly with your custom proposal!
                </span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

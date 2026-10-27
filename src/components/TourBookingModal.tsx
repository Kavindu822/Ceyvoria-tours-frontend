'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle2, MessageCircle, Send, ShieldCheck, Calendar, Users, Hotel, Utensils, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { Tour } from '@/lib/types';
import { site } from '@/lib/site';
import { createBooking } from '@/lib/api';

interface Props {
  tour: Tour;
  isOpen: boolean;
  onClose: () => void;
}

export default function TourBookingModal({ tour, isOpen, onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [adults, setAdults] = useState('2');
  const [childrenCount, setChildrenCount] = useState('0');
  const [needHotels, setNeedHotels] = useState('yes');
  const [mealPlan, setMealPlan] = useState('Bed & Breakfast');
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [specialRequests, setSpecialRequests] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [quoteRef, setQuoteRef] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const activitiesList = [
    'Madu River boat safari & cinnamon island',
    'Whale watching catamaran charter (Mirissa)',
    'Snorkeling, diving & reef exploration',
    'Kayaking & coastal water sports',
    'Safari jeep permits & naturalist trackers (Yala / Udawalawe)',
    'Scenic train tickets (subject to availability)',
    'Spa rituals & Ayurvedic wellness',
  ];

  const toggleActivity = (act: string) => {
    setSelectedActivities(prev =>
      prev.includes(act) ? prev.filter(a => a !== act) : [...prev, act]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const ref = `CEY-Q-${Math.floor(10000 + Math.random() * 90000)}`;
    setQuoteRef(ref);

    // Build formatted message for WhatsApp
    const message = `🌟 *NEW TOUR BOOKING INQUIRY* 🌟
----------------------------------
📌 *Tour:* ${tour.title} (${tour.days} Days / ${tour.nights} Nights)
🔖 *Reference:* ${ref}
👤 *Lead Guest:* ${fullName}
🌍 *Country:* ${country || 'International'}
✉️ *Email:* ${email}
📱 *Phone / WhatsApp:* ${phone}
🗓️ *Preferred Date:* ${travelDate || 'Flexible'}
👥 *Party Size:* ${adults} Adults${Number(childrenCount) > 0 ? `, ${childrenCount} Children` : ''}
🏨 *Need Hotels Arranged:* ${needHotels === 'yes' ? 'Yes, please arrange hotels' : 'No, transport & activities only'}
🍽️ *Meal Plan:* ${mealPlan}
🏄 *Selected Activities:*
${selectedActivities.length > 0 ? selectedActivities.map(a => ` • ${a}`).join('\n') : ' • As per itinerary'}
📝 *Special Notes:* ${specialRequests || 'None'}
----------------------------------
_Awaiting your custom itemized quotation & advance payment details._`;

    const waUrl = `https://wa.me/${site.whatsappRaw.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;

    // Store in database backend (Neon PostgreSQL)
    try {
      await createBooking({
        tourSlug: tour.slug,
        startDate: travelDate || new Date().toISOString().slice(0, 10),
        travellers: Number(adults) + Number(childrenCount),
        firstName: fullName.split(' ')[0] || fullName,
        lastName: fullName.split(' ').slice(1).join(' ') || 'Guest',
        email,
        phone,
        specialRequests: `Quote Ref: ${ref} | Country: ${country || 'International'} | Need Hotels: ${needHotels} | Meal Plan: ${mealPlan} | Activities: ${selectedActivities.join(', ')} | Notes: ${specialRequests}`,
      });
    } catch (err) {
      // Ignore API errors to ensure customer WhatsApp flow is uninterrupted
    }

    setIsSubmitting(false);
    setSubmitted(true);

    // Automatically trigger WhatsApp in new tab
    if (typeof window !== 'undefined') {
      window.open(waUrl, '_blank');
    }
  };

  const buildWhatsAppUrl = () => {
    const message = `Hello Ceyvoria Tours! I would like to request an itemized quotation for:
📌 Tour: ${tour.title} (${tour.days} Days / ${tour.nights} Nights)
🔖 Ref: ${quoteRef}
👤 Guest: ${fullName}
✉️ Email: ${email}
📱 Phone: ${phone}
🗓️ Date: ${travelDate || 'Flexible'}
👥 Guests: ${adults} Adults
🏨 Hotels: ${needHotels === 'yes' ? 'Yes' : 'No'}
🍽️ Meal Plan: ${mealPlan}`;
    return `https://wa.me/${site.whatsappRaw.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
  };

  return createPortal(
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'rgba(3, 27, 22, 0.84)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 14px',
        overflowY: 'auto',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: 6,
          maxWidth: 680,
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
          borderTop: '4px solid var(--gold)',
          position: 'relative',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px 28px 18px',
            borderBottom: '1px solid #e5ede7',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            background: '#fafbf9',
          }}
        >
          <div>
            <span style={{ fontSize: '.68rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 800 }}>
              CEYVORIA TOURS · BESPOKE QUOTATION
            </span>
            <h2 style={{ fontFamily: 'var(--display)', fontSize: '2rem', color: 'var(--forest)', margin: '4px 0 2px', fontWeight: 600 }}>
              Book {tour.title}
            </h2>
            <p style={{ margin: 0, fontSize: '.82rem', color: '#5b6b61' }}>
              {tour.days} Days / {tour.nights} Nights · Send your booking details & receive your itemized quote.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: '#edf2ee',
              border: 0,
              width: 36,
              height: 36,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--forest)',
              transition: 'background .2s',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px 28px' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '16px 8px' }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: '#e8f5e9',
                  color: '#2e7d32',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                }}
              >
                <CheckCircle2 size={36} />
              </div>

              <h3 style={{ fontFamily: 'var(--display)', fontSize: '2.2rem', color: 'var(--forest)', margin: '0 0 8px' }}>
                Booking Request Sent!
              </h3>

              <div
                style={{
                  display: 'inline-block',
                  background: '#f2f6f2',
                  border: '1px dashed var(--palm)',
                  padding: '8px 18px',
                  borderRadius: 4,
                  margin: '10px 0 16px',
                }}
              >
                <span style={{ fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.1em', color: '#68786e', fontWeight: 800 }}>
                  Quotation Reference
                </span>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--forest)', letterSpacing: '.04em' }}>
                  {quoteRef}
                </div>
              </div>

              <p style={{ fontSize: '.86rem', color: '#4a5b51', maxWidth: 480, margin: '0 auto 20px', lineHeight: 1.65 }}>
                We have received your booking request for <strong>{tour.title}</strong>. Our senior travel designer is preparing
                your personalized itemized quotation.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 400, margin: '0 auto' }}>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-action-btn"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    padding: '14px 20px',
                    fontSize: '.84rem',
                    textDecoration: 'none',
                  }}
                >
                  <MessageCircle size={18} /> Send Message via WhatsApp Now
                </a>

                <Link
                  href={`/pay-advance?ref=${quoteRef}&tour=${tour.slug}&title=${encodeURIComponent(tour.title)}`}
                  className="btn"
                  style={{ width: '100%', fontSize: '.82rem' }}
                  onClick={onClose}
                >
                  Go to Dialog Genie Advance Payment <ArrowRight size={15} />
                </Link>

                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    background: 'transparent',
                    border: '1px solid #d4ded6',
                    padding: '10px',
                    fontSize: '.76rem',
                    color: '#65746b',
                    cursor: 'pointer',
                    marginTop: 6,
                  }}
                >
                  Close & Continue Browsing
                </button>
              </div>

              <div
                style={{
                  marginTop: 24,
                  padding: '14px 18px',
                  background: '#f8faf7',
                  border: '1px solid #e1e7e2',
                  borderRadius: 4,
                  fontSize: '.74rem',
                  color: '#63756a',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  textAlign: 'left',
                }}
              >
                <ShieldCheck size={20} color="var(--gold)" style={{ minWidth: 20 }} />
                <span>
                  <strong>Advance Payment Policy:</strong> Once you review and approve your quotation, you can securely pay the
                  advance payment online via the <strong>Dialog Genie Payment Gateway</strong> (Visa, Mastercard, AMEX, or eZ Cash).
                </span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Tour Starting Price & Quote Notice */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '12px 16px',
                  background: '#f6f8f6',
                  border: '1px solid #dbe5de',
                  borderLeft: '4px solid var(--gold)',
                  borderRadius: 4,
                  marginBottom: 16,
                }}
              >
                <div style={{ color: '#55635b', flexShrink: 0 }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2a1 1 0 0 1 1 1v.3a3.5 3.5 0 0 1 2.3 1.4 1 1 0 0 1-1.6 1.2A1.5 1.5 0 0 0 12.5 5h-.6a1.4 1.4 0 0 0-1.4 1.4c0 .7.4 1.1 1.3 1.4l.7.2c1.7.5 3 1.2 3 3 0 1.5-1 2.7-2.5 3v.5a1 1 0 1 1-2 0v-.3a3.6 3.6 0 0 1-2.5-1.7 1 1 0 0 1 1.7-1.1c.3.5.9.8 1.6.8h.4c.8 0 1.5-.6 1.5-1.4 0-.8-.5-1.2-1.4-1.5l-.7-.2c-1.8-.5-2.9-1.3-2.9-2.9 0-1.6 1.1-2.8 2.8-3.1V3a1 1 0 0 1 1-1z" />
                    <path d="M2 15a1 1 0 0 1 1-1h4.8a3 3 0 0 1 2.1.9l2.1 2.1h6a2 2 0 1 1 0 4h-7.6a3 3 0 0 1-2.1-.9L6.5 17H3a1 1 0 0 1-1-1v-1z" />
                  </svg>
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--display)',
                      fontSize: '1.45rem',
                      fontWeight: 700,
                      lineHeight: 1.1,
                      color: '#0e231d',
                    }}
                  >
                    {tour.startingPrice ? `${tour.startingPrice} USD Onwards` : '380 USD Onwards'}
                  </div>
                  <div style={{ fontSize: '.74rem', color: '#68776f', marginTop: 2, fontWeight: 500 }}>
                    Fill Request Quote Form Below For Details
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: '#f4f7f4',
                  padding: '12px 16px',
                  borderRadius: 4,
                  marginBottom: 20,
                  fontSize: '.78rem',
                  color: 'var(--forest)',
                  borderLeft: '3px solid var(--forest)',
                }}
              >
                <strong>How it works:</strong> Submit this form ➔ We send your custom quotation with itemized pricing ➔ You confirm & pay
                the advance deposit securely via <strong>Dialog Genie</strong>.
              </div>

              {/* Step 1: Dates & Guests */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: '#56665c', marginBottom: 6 }}>
                    Preferred Departure Date <span style={{ color: '#b33927' }}>*</span>
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().slice(0, 10)}
                    value={travelDate}
                    onChange={e => setTravelDate(e.target.value)}
                    className="form-control"
                    style={{ minHeight: 44 }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: '#56665c', marginBottom: 6 }}>
                      Adults (12+)
                    </label>
                    <select
                      value={adults}
                      onChange={e => setAdults(e.target.value)}
                      className="form-control"
                      style={{ minHeight: 44 }}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, '9+'].map(n => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: '#56665c', marginBottom: 6 }}>
                      Children (0–11)
                    </label>
                    <select
                      value={childrenCount}
                      onChange={e => setChildrenCount(e.target.value)}
                      className="form-control"
                      style={{ minHeight: 44 }}
                    >
                      {[0, 1, 2, 3, 4, 5].map(n => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 2: Contact Info */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: '#56665c', marginBottom: 6 }}>
                    Full Name <span style={{ color: '#b33927' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eleanor Vance"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="form-control"
                    style={{ minHeight: 44 }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: '#56665c', marginBottom: 6 }}>
                    Country of Residence <span style={{ color: '#b33927' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. United Kingdom / Germany"
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    className="form-control"
                    style={{ minHeight: 44 }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: '#56665c', marginBottom: 6 }}>
                    Email Address <span style={{ color: '#b33927' }}>*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="form-control"
                    style={{ minHeight: 44 }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: '#56665c', marginBottom: 6 }}>
                    WhatsApp / Phone (with country code) <span style={{ color: '#b33927' }}>*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +44 7911 123456"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="form-control"
                    style={{ minHeight: 44 }}
                  />
                </div>
              </div>

              {/* Step 3: Preferences (Hotels & Meals) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: '#56665c', marginBottom: 6 }}>
                    Accommodation Requirement
                  </label>
                  <select
                    value={needHotels}
                    onChange={e => setNeedHotels(e.target.value)}
                    className="form-control"
                    style={{ minHeight: 44 }}
                  >
                    <option value="yes">Yes, please arrange hotels for our tour</option>
                    <option value="no">No, private transport & guide only (we book hotels)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: '#56665c', marginBottom: 6 }}>
                    Preferred Meal Plan
                  </label>
                  <select
                    value={mealPlan}
                    onChange={e => setMealPlan(e.target.value)}
                    className="form-control"
                    style={{ minHeight: 44 }}
                  >
                    <option value="Bed & Breakfast">Bed & Breakfast</option>
                    <option value="Half Board (Breakfast & Dinner)">Half Board (Breakfast & Dinner)</option>
                    <option value="All-Inclusive">All-Inclusive</option>
                    <option value="Flexible / Decide Later">Flexible / Decide Later</option>
                  </select>
                </div>
              </div>

              {/* Step 4: Special Activities */}
              <div style={{ marginBottom: 18 }}>
                <label style={{ display: 'block', fontSize: '.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: '#56665c', marginBottom: 8 }}>
                  Include Activities & Excursions (Optional):
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {activitiesList.map(act => (
                    <label
                      key={act}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        fontSize: '.74rem',
                        color: 'var(--forest)',
                        background: selectedActivities.includes(act) ? '#eaf2ec' : '#f7f9f7',
                        border: selectedActivities.includes(act) ? '1px solid var(--forest)' : '1px solid #dce4dd',
                        padding: '8px 12px',
                        borderRadius: 3,
                        cursor: 'pointer',
                        transition: 'all .15s',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedActivities.includes(act)}
                        onChange={() => toggleActivity(act)}
                        style={{ accentColor: 'var(--forest)', width: 15, height: 15 }}
                      />
                      <span>{act}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Step 5: Special Notes */}
              <div style={{ marginBottom: 22 }}>
                <label style={{ display: 'block', fontSize: '.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: '#56665c', marginBottom: 6 }}>
                  Additional Notes or Custom Requests
                </label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={e => setSpecialRequests(e.target.value)}
                  placeholder="Any accessibility requirements, specific room types, special occasions (honeymoon, birthday), or extra stops..."
                  className="form-control"
                  style={{ minHeight: 70 }}
                />
              </div>

              {/* Submit Buttons */}
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <div style={{ fontSize: '.73rem', color: '#68776d', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <ShieldCheck size={16} color="var(--gold)" />
                  <span>No payment required now. Quote sent first.</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-gold"
                  style={{ minWidth: 200, fontSize: '.84rem' }}
                >
                  {isSubmitting ? 'Sending Request...' : 'Submit & Send on WhatsApp →'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

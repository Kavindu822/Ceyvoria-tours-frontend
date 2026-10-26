'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CalendarCheck, MessageCircle, CreditCard, ArrowRight, Sparkles } from 'lucide-react';
import type { Tour } from '@/lib/types';
import { site } from '@/lib/site';
import TourBookingModal from './TourBookingModal';

interface Props {
  tour: Tour;
}

export default function TourActionButtons({ tour }: Props) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#book-now') {
      setIsBookingOpen(true);
    }
    const handleHash = () => {
      if (window.location.hash === '#book-now') {
        setIsBookingOpen(true);
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const waRaw = site.whatsappRaw.replace(/[^0-9]/g, '');
  const waDirectUrl = `https://wa.me/${waRaw}?text=${encodeURIComponent(
    `Hello Ceyvoria Tours! I would like to inquire about booking the "${tour.title}" (${tour.days} Days / ${tour.nights} Nights) tour. Could you please provide quotation details?`
  )}`;

  return (
    <>
      <div id="book-now" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Primary Book Now Button */}
        <button
          type="button"
          onClick={() => setIsBookingOpen(true)}
          className="btn btn-gold"
          style={{
            width: '100%',
            cursor: 'pointer',
            fontSize: '0.86rem',
            fontWeight: 800,
            boxShadow: '0 4px 18px rgba(196, 154, 69, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}
        >
          <CalendarCheck size={18} /> Book Now · Request Quotation
        </button>

        {/* Direct WhatsApp Quick Chat */}
        <a
          href={waDirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline"
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 9,
            fontSize: '0.78rem',
          }}
        >
          <MessageCircle size={16} style={{ color: '#25D366' }} /> Ask a Question / WhatsApp
        </a>

        {/* Dialog Genie Advance Payment Gateway Link */}
        <div
          style={{
            marginTop: 12,
            padding: '12px 14px',
            background: '#f8faf7',
            border: '1px solid #d8e2d9',
            borderRadius: 4,
          }}
        >
          <div
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              color: 'var(--forest)',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              marginBottom: 4,
            }}
          >
            <CreditCard size={14} style={{ color: 'var(--gold)' }} />
            Already Received a Quotation?
          </div>
          <p style={{ fontSize: '0.74rem', color: '#68776d', margin: '0 0 8px', lineHeight: 1.45 }}>
            Pay your advance deposit online securely via Sri Lanka&apos;s <strong>Dialog Genie Payment Gateway</strong>.
          </p>
          <Link
            href={`/pay-advance?tour=${encodeURIComponent(tour.title)}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: '0.74rem',
              fontWeight: 800,
              color: 'var(--forest)',
              textDecoration: 'underline',
              textUnderlineOffset: 3,
            }}
          >
            Pay Advance Deposit via Dialog Genie <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* Booking Form Modal */}
      <TourBookingModal
        tour={tour}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </>
  );
}

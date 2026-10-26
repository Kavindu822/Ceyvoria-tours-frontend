'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Printer, MessageCircle, ArrowRight, ShieldCheck, Calendar, FileText } from 'lucide-react';
import { site } from '@/lib/site';

function ReceiptContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get('ref') || 'CEY-Q-PENDING';
  const orderId = searchParams.get('orderId') || `GENIE-${Date.now().toString().slice(-6)}`;
  const amount = searchParams.get('amount') || '250';
  const currency = searchParams.get('currency') || 'EUR';
  const tour = searchParams.get('tour') || 'Sri Lanka Private Tour';

  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const whatsappMessage = `🌟 *ADVANCE PAYMENT COMPLETED* 🌟
----------------------------------
📌 *Quotation Ref:* ${ref}
💳 *Genie Order ID:* ${orderId}
🌴 *Tour:* ${tour}
💰 *Amount Paid:* ${currency} ${amount}
📅 *Date:* ${formattedDate}
✅ *Status:* Successfully Paid via Dialog Genie PG
----------------------------------
_Please confirm receipt and proceed with our tour booking arrangements._`;

  const waUrl = `https://wa.me/${site.whatsappRaw.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div style={{ maxWidth: 650, margin: '0 auto' }}>
      {/* Official Receipt Card */}
      <div
        style={{
          background: '#ffffff',
          border: '1px solid #dce4de',
          borderRadius: 6,
          boxShadow: '0 15px 40px rgba(5,46,39,0.08)',
          overflow: 'hidden',
          borderTop: '5px solid var(--forest)',
        }}
      >
        {/* Receipt Header */}
        <div
          style={{
            background: '#fafbf9',
            padding: '30px 32px 24px',
            borderBottom: '1px solid #e5ede7',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: '50%',
              background: '#e8f5e9',
              color: '#2e7d32',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 14,
            }}
          >
            <CheckCircle2 size={32} />
          </div>

          <span
            style={{
              display: 'block',
              fontSize: '.68rem',
              fontWeight: 800,
              letterSpacing: '.16em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: 4,
            }}
          >
            OFFICIAL ADVANCE PAYMENT RECEIPT
          </span>

          <h2
            style={{
              fontFamily: 'var(--display)',
              fontSize: '2.2rem',
              color: 'var(--forest)',
              margin: '0 0 6px',
              fontWeight: 600,
            }}
          >
            Advance Payment Confirmed
          </h2>

          <p style={{ margin: 0, fontSize: '.84rem', color: '#5f7166' }}>
            Processed securely via <strong>Dialog Genie Payment Gateway</strong>.
          </p>
        </div>

        {/* Receipt Details */}
        <div style={{ padding: '28px 32px' }}>
          <div
            style={{
              background: '#f2f6f2',
              padding: '16px 20px',
              borderRadius: 4,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 24,
            }}
          >
            <div>
              <span style={{ fontSize: '.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: '#66776d' }}>
                AMOUNT PAID
              </span>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--forest)', fontFamily: 'var(--display)' }}>
                {currency} {amount}
              </div>
            </div>

            <div
              style={{
                background: '#e8f5e9',
                border: '1px solid #c8e6c9',
                color: '#2e7d32',
                fontSize: '.72rem',
                fontWeight: 800,
                padding: '6px 14px',
                borderRadius: 20,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <CheckCircle2 size={13} /> PAID & VERIFIED
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 24px', fontSize: '.82rem', marginBottom: 24 }}>
            <div>
              <span style={{ color: '#7a8a80', fontSize: '.72rem', display: 'block', textTransform: 'uppercase', letterSpacing: '.06em', fontWeight: 700 }}>
                Quotation Reference
              </span>
              <strong style={{ color: 'var(--forest)', fontSize: '.92rem' }}>{ref}</strong>
            </div>

            <div>
              <span style={{ color: '#7a8a80', fontSize: '.72rem', display: 'block', textTransform: 'uppercase', letterSpacing: '.06em', fontWeight: 700 }}>
                Genie Transaction ID
              </span>
              <span style={{ color: 'var(--forest)', fontFamily: 'monospace', fontSize: '.84rem', fontWeight: 700 }}>
                {orderId}
              </span>
            </div>

            <div>
              <span style={{ color: '#7a8a80', fontSize: '.72rem', display: 'block', textTransform: 'uppercase', letterSpacing: '.06em', fontWeight: 700 }}>
                Tour Name
              </span>
              <strong style={{ color: 'var(--forest)' }}>{tour}</strong>
            </div>

            <div>
              <span style={{ color: '#7a8a80', fontSize: '.72rem', display: 'block', textTransform: 'uppercase', letterSpacing: '.06em', fontWeight: 700 }}>
                Payment Date
              </span>
              <span style={{ color: 'var(--forest)' }}>{formattedDate}</span>
            </div>

            <div>
              <span style={{ color: '#7a8a80', fontSize: '.72rem', display: 'block', textTransform: 'uppercase', letterSpacing: '.06em', fontWeight: 700 }}>
                Payment Channel
              </span>
              <span style={{ color: 'var(--forest)' }}>Dialog Genie (Visa / Mastercard / eZ Cash)</span>
            </div>

            <div>
              <span style={{ color: '#7a8a80', fontSize: '.72rem', display: 'block', textTransform: 'uppercase', letterSpacing: '.06em', fontWeight: 700 }}>
                Merchant
              </span>
              <span style={{ color: 'var(--forest)' }}>CEYVORIA TOURS (PVT) LTD</span>
            </div>
          </div>

          <div
            style={{
              padding: '14px 18px',
              background: '#f8faf7',
              border: '1px solid #e1e7e2',
              borderRadius: 4,
              fontSize: '.74rem',
              color: '#5e6f64',
              lineHeight: 1.6,
              marginBottom: 24,
            }}
          >
            <strong>Next Steps:</strong> Your private tour has been secured! A copy of this payment voucher has been logged
            with your reservation manager. Our concierge team will reach out with your driver details and pre-arrival brief.
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-action-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                padding: '13px 20px',
                fontSize: '.84rem',
                textDecoration: 'none',
              }}
            >
              <MessageCircle size={18} /> Send Payment Confirmation on WhatsApp
            </a>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <button
                type="button"
                onClick={() => typeof window !== 'undefined' && window.print()}
                className="btn btn-outline"
                style={{ fontSize: '.78rem', padding: '10px 14px', width: '100%' }}
              >
                <Printer size={15} /> Print / Save PDF
              </button>

              <Link
                href="/tours"
                className="btn"
                style={{ fontSize: '.78rem', padding: '10px 14px', width: '100%' }}
              >
                Explore More Tours <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <section className="section" style={{ paddingTop: 60, paddingBottom: 90 }}>
      <div className="container">
        <Suspense fallback={<div className="empty"><h3>Loading receipt...</h3></div>}>
          <ReceiptContent />
        </Suspense>
      </div>
    </section>
  );
}

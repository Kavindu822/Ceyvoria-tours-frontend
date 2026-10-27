'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Lock, CreditCard, CheckCircle2, ArrowRight, MessageCircle, AlertCircle, Building2 } from 'lucide-react';
import { tours } from '@/lib/data';
import { site } from '@/lib/site';

export default function AdvancePaymentClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [quoteRef, setQuoteRef] = useState('');
  const [tourSlug, setTourSlug] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [amount, setAmount] = useState('250');
  const [currency, setCurrency] = useState('EUR');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'qr' | 'ezcash'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const ref = searchParams.get('ref');
    const tour = searchParams.get('tour');
    const title = searchParams.get('title');
    const amt = searchParams.get('amount');
    const curr = searchParams.get('currency');

    if (ref) setQuoteRef(ref);
    if (tour && tours.some(t => t.slug === tour)) setTourSlug(tour);
    else if (tours.length > 0) setTourSlug(tours[0].slug);

    if (amt) setAmount(amt);
    if (curr) setCurrency(curr);
  }, [searchParams]);

  const selectedTour = tours.find(t => t.slug === tourSlug);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsProcessing(true);

    const finalRef = quoteRef.trim().toUpperCase() || `CEY-ADV-${Date.now().toString().slice(-5)}`;
    if (!quoteRef.trim()) {
      setQuoteRef(finalRef);
    }

    if (!guestEmail.trim() || !guestEmail.includes('@')) {
      setErrorMsg('Please enter your email address so we can deliver your advance payment receipt.');
      setIsProcessing(false);
      return;
    }

    if (Number(amount) <= 0) {
      setErrorMsg('Please enter a valid advance payment amount.');
      setIsProcessing(false);
      return;
    }

    try {
      const res = await fetch('/api/payment/genie/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quotationRef: finalRef,
          tourTitle: selectedTour?.title || 'Sri Lanka Private Tour',
          customerName: guestName.trim() || 'Valued Guest',
          customerEmail: guestEmail.trim(),
          customerPhone: guestPhone.trim(),
          advanceAmount: Number(amount),
          currency,
        }),
      });

      const data = await res.json();

      if (data.success && data.redirectUrl) {
        // Redirect to Genie / confirmation page
        router.push(data.redirectUrl);
      } else {
        throw new Error(data.message || 'Payment processing could not be completed.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Payment initiation failed. Please try again or WhatsApp our team.');
      setIsProcessing(false);
    }
  };

  return (
    <div style={{ maxWidth: 960, margin: '0 auto' }}>
      <div className="two-col" style={{ alignItems: 'start' }}>
        {/* Left Column: Payment Form */}
        <div className="paper" style={{ borderTop: '3px solid var(--gold)', borderRadius: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span
              style={{
                background: '#073D32',
                color: '#ffffff',
                padding: '4px 10px',
                borderRadius: 3,
                fontSize: '.68rem',
                fontWeight: 800,
                letterSpacing: '.06em',
                textTransform: 'uppercase',
              }}
            >
              DIALOG GENIE PAYMENT GATEWAY
            </span>
            <span style={{ fontSize: '.72rem', color: '#6e7f74' }}>Verified & Encrypted</span>
          </div>

          <h2 style={{ fontFamily: 'var(--display)', fontSize: '2.1rem', color: 'var(--forest)', margin: '0 0 6px', fontWeight: 600 }}>
            Pay Advance Deposit
          </h2>
          <p style={{ fontSize: '.84rem', color: '#5b6b61', marginBottom: 24, lineHeight: 1.6 }}>
            Confirm your private Sri Lanka journey by paying the advance deposit via Dialog Genie. Your reservation will be immediately secured.
          </p>

          {errorMsg && (
            <div className="notice error" style={{ marginBottom: 20 }}>
              <AlertCircle size={16} style={{ display: 'inline', marginRight: 6 }} />
              {errorMsg}
            </div>
          )}

          <form onSubmit={handlePay}>
            {/* Step 1: Quotation Details */}
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: '.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: '#56665c', marginBottom: 6 }}>
                Quotation Reference Number <span style={{ color: '#b33927' }}>*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. CEY-Q-48291"
                value={quoteRef}
                onChange={e => setQuoteRef(e.target.value)}
                className="form-control"
                style={{ fontWeight: 700, letterSpacing: '.04em' }}
              />
              <span style={{ fontSize: '.68rem', color: '#748479', marginTop: 4, display: 'block' }}>
                Provided in your quotation message on WhatsApp or email.
              </span>
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: '.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: '#56665c', marginBottom: 6 }}>
                Tour Package
              </label>
              <select
                value={tourSlug}
                onChange={e => setTourSlug(e.target.value)}
                className="form-control"
              >
                {tours.map(t => (
                  <option key={t.slug} value={t.slug}>
                    {t.title} ({t.days} Days / {t.nights} Nights)
                  </option>
                ))}
              </select>
            </div>

            {/* Guest Details */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
              <div>
                <label style={{ display: 'block', fontSize: '.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: '#56665c', marginBottom: 6 }}>
                  Lead Guest Name <span style={{ color: '#b33927' }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={guestName}
                  onChange={e => setGuestName(e.target.value)}
                  className="form-control"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: '#56665c', marginBottom: 6 }}>
                  Email Address <span style={{ color: '#b33927' }}>*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={guestEmail}
                  onChange={e => setGuestEmail(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: '.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: '#56665c', marginBottom: 6 }}>
                Phone / WhatsApp Number
              </label>
              <input
                type="tel"
                placeholder="+44 7911 123456"
                value={guestPhone}
                onChange={e => setGuestPhone(e.target.value)}
                className="form-control"
              />
            </div>

            {/* Advance Amount */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr .8fr', gap: 14, marginBottom: 24 }}>
              <div>
                <label style={{ display: 'block', fontSize: '.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: '#56665c', marginBottom: 6 }}>
                  Advance Payment Amount <span style={{ color: '#b33927' }}>*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  step="any"
                  required
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className="form-control"
                  style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--forest)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: '#56665c', marginBottom: 6 }}>
                  Currency
                </label>
                <select
                  value={currency}
                  onChange={e => setCurrency(e.target.value)}
                  className="form-control"
                  style={{ fontWeight: 700 }}
                >
                  <option value="EUR">EUR (€)</option>
                  <option value="USD">USD ($)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="LKR">LKR (Rs)</option>
                </select>
              </div>
            </div>

            {/* Payment Gateway Box */}
            <div
              style={{
                border: '1px solid #d4ded6',
                borderRadius: 4,
                padding: '16px 20px',
                background: '#f8faf7',
                marginBottom: 24,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <CreditCard size={20} color="var(--forest)" />
                  <div>
                    <strong style={{ fontSize: '.84rem', color: 'var(--forest)' }}>
                      Dialog Genie Payment Gateway
                    </strong>
                    <div style={{ fontSize: '.68rem', color: '#68786e' }}>
                      Sri Lanka’s Premier Certified Payment Gateway by Dialog Axiata PLC
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 6 }}>
                  <span style={{ fontSize: '.68rem', fontWeight: 800, color: '#1a5632', background: '#e1ede4', padding: '3px 8px', borderRadius: 2 }}>
                    VISA
                  </span>
                  <span style={{ fontSize: '.68rem', fontWeight: 800, color: '#9c3422', background: '#fae8e5', padding: '3px 8px', borderRadius: 2 }}>
                    Mastercard
                  </span>
                  <span style={{ fontSize: '.68rem', fontWeight: 800, color: '#1e3d59', background: '#e2ebf3', padding: '3px 8px', borderRadius: 2 }}>
                    eZ Cash
                  </span>
                </div>
              </div>

              <div style={{ fontSize: '.74rem', color: '#5d6e63', lineHeight: 1.5 }}>
                Your payment is processed securely via Dialog Genie 3D-Secure 2.0. We never store your card numbers or sensitive banking data.
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="btn btn-gold"
              style={{
                width: '100%',
                padding: '16px 24px',
                fontSize: '.9rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
              }}
            >
              <Lock size={16} />
              {isProcessing
                ? 'Connecting to Dialog Genie...'
                : `Pay ${currency} ${amount} Advance via Dialog Genie`}
            </button>
          </form>
        </div>

        {/* Right Column: Order Summary & Guarantee */}
        <aside className="sticky-card" style={{ marginTop: 0 }}>
          <span className="kicker">SECURE ADVANCE PAYMENT</span>
          <h3 className="forest" style={{ margin: '4px 0 10px', fontSize: '1.65rem' }}>
            Reservation Summary
          </h3>

          {selectedTour && (
            <div style={{ marginBottom: 18 }}>
              <div style={{ position: 'relative', height: 160, borderRadius: 4, overflow: 'hidden', marginBottom: 12 }}>
                <Image
                  src={selectedTour.image}
                  alt={selectedTour.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <h4 style={{ margin: '0 0 4px', fontSize: '1.15rem', color: 'var(--forest)' }}>
                {selectedTour.title}
              </h4>
              <p style={{ fontSize: '.78rem', color: '#68776d', margin: 0 }}>
                {selectedTour.days} Days / {selectedTour.nights} Nights · Private Tour
              </p>
            </div>
          )}

          <div style={{ borderTop: '1px solid #e1e7e2', paddingTop: 14, marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.78rem', marginBottom: 6 }}>
              <span style={{ color: '#6d7d73' }}>Quotation Ref:</span>
              <strong style={{ color: 'var(--forest)' }}>{quoteRef || 'Pending Ref'}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.78rem', marginBottom: 6 }}>
              <span style={{ color: '#6d7d73' }}>Payment Type:</span>
              <span style={{ color: 'var(--forest)', fontWeight: 700 }}>Advance Deposit</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.78rem', marginBottom: 6 }}>
              <span style={{ color: '#6d7d73' }}>Payment Gateway:</span>
              <span style={{ color: 'var(--forest)', fontWeight: 700 }}>Dialog Genie PG</span>
            </div>
          </div>

          <div
            style={{
              background: '#f2f6f2',
              padding: '16px',
              borderRadius: 4,
              marginBottom: 20,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <span style={{ fontSize: '.68rem', letterSpacing: '.08em', textTransform: 'uppercase', color: '#68786e', fontWeight: 800 }}>
                TOTAL PAYABLE NOW
              </span>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--forest)', fontFamily: 'var(--display)' }}>
                {currency} {amount}
              </div>
            </div>
            <ShieldCheck size={28} color="var(--gold)" />
          </div>

          <div style={{ fontSize: '.74rem', color: '#64756b', lineHeight: 1.6 }}>
            <p style={{ margin: '0 0 10px' }}>
              ✓ Instant official receipt generated upon successful payment.
            </p>
            <p style={{ margin: '0 0 10px' }}>
              ✓ Balance payment can be settled on arrival or as detailed in your quotation.
            </p>
            <p style={{ margin: 0 }}>
              Need help? WhatsApp us at{' '}
              <a
                href={site.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--forest)', fontWeight: 800 }}
              >
                {site.whatsapp}
              </a>
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

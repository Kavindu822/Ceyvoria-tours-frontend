'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Check, MessageSquare } from 'lucide-react';
import { submitEnquiry } from '@/lib/api';

type Info = {
  date: string;
  flexible: boolean;
  travellers: string;
  days: string;
  styles: string[];
  interests: string[];
  requirements: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  hasWhatsApp: boolean;
  hasTelegram: boolean;
  consent: boolean;
};

const initial: Info = {
  date: '',
  flexible: false,
  travellers: '2',
  days: '10',
  styles: ['Signature'],
  interests: [],
  requirements: '',
  name: '',
  email: '',
  phone: '',
  country: '',
  hasWhatsApp: true,
  hasTelegram: false,
  consent: false,
};

const steps = [
  'When',
  'Travellers',
  'Duration',
  'Travel style',
  'Interests',
  'Your wishes',
  'Your details',
  'Review',
];

const travelStyles = [
  'Signature',
  'Luxury',
  'Honeymoon',
  'Family',
  'Wildlife',
  'Culture',
  'Adventure',
  'Coastal',
  'Wellness',
];

const curiosityInterests = [
  'Wildlife & Safari',
  'Pristine Beaches',
  'Tea Country & Hills',
  'Hiking & Trekking',
  'Cultural Heritage',
  'Sri Lankan Food & Spices',
  'Photography',
  'Surfing & Waves',
  'Ayurveda & Wellness',
  'Ancient History',
  'Scenic Hill Trains',
  'Local Village Life',
];

const popularCountries = [
  'United Kingdom',
  'United States',
  'Germany',
  'France',
  'Switzerland',
  'Australia',
  'Netherlands',
  'Canada',
  'Italy',
  'Spain',
  'India',
  'Singapore',
  'United Arab Emirates',
  'Sri Lanka',
];

const allCountries = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda',
  'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan',
  'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize',
  'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil',
  'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi',
  'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Central African Republic',
  'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica',
  'Croatia', 'Cuba', 'Cyprus', 'Czech Republic',
  'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic',
  'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia',
  'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France',
  'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada',
  'Guatemala', 'Guinea', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary',
  'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy',
  'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyzstan',
  'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein',
  'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives',
  'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Monaco',
  'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia',
  'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria',
  'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Panama', 'Papua New Guinea',
  'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar',
  'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia',
  'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Saudi Arabia',
  'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia',
  'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea',
  'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland',
  'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste',
  'Togo', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan',
  'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States',
  'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam',
  'Yemen', 'Zambia', 'Zimbabwe', 'Other Country'
];

export default function TripWizard() {
  const [step, setStep] = useState(0);
  const [info, setInfo] = useState<Info>(initial);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const put = <K extends keyof Info>(k: K, v: Info[K]) =>
    setInfo(old => ({ ...old, [k]: v }));

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const dateParam = p.get('date') || '';
    const travellersParam = p.get('travellers') || '2';
    const styleParam = p.get('style');

    setInfo(x => ({
      ...x,
      date: dateParam,
      travellers: travellersParam.replace('+', ''),
      styles: styleParam && styleParam !== 'Any style' ? [styleParam] : ['Signature'],
    }));
  }, []);

  const toggleStyle = (style: string) => {
    setInfo(prev => {
      const exists = prev.styles.includes(style);
      if (exists) {
        const next = prev.styles.filter(s => s !== style);
        return { ...prev, styles: next.length > 0 ? next : [style] };
      }
      return { ...prev, styles: [...prev.styles, style] };
    });
  };

  const toggleInterest = (interest: string) => {
    setInfo(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const canContinue = (() => {
    switch (step) {
      case 0:
        return Boolean(info.date || info.flexible);
      case 1:
        return Number(info.travellers) >= 1;
      case 2:
        return Number(info.days) >= 1;
      case 3:
        return info.styles.length > 0;
      case 4:
        return true;
      case 5:
        return true;
      case 6:
        return Boolean(
          info.name.trim() &&
          /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(info.email.trim()) &&
          info.country.trim() &&
          info.phone.trim() &&
          info.consent
        );
      case 7:
        return true;
      default:
        return true;
    }
  })();

  async function finish() {
    setLoading(true);
    const ref = `CEY-TRIP-${Date.now().toString().slice(-6)}`;
    try {
      const channels: string[] = [];
      if (info.hasWhatsApp) channels.push('WhatsApp');
      if (info.hasTelegram) channels.push('Telegram');

      const phoneWithChannels = channels.length > 0
        ? `${info.phone.trim()} (${channels.join(', ')})`
        : info.phone.trim();

      const combinedNotes = [
        info.requirements.trim(),
        channels.length > 0 ? `Preferred messaging: ${channels.join(', ')}` : '',
      ]
        .filter(Boolean)
        .join('\n\n');

      // 1. Dispatch automated email alert to ceyvoriatours@gmail.com and customer
      try {
        await fetch('/api/notify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'CustomTrip',
            reference: ref,
            guestName: info.name.trim(),
            guestEmail: info.email.trim(),
            guestPhone: phoneWithChannels,
            country: info.country.trim(),
            tourTitle: `Custom Tailor-Made Journey (${info.days} Days · ${info.styles.join(', ')})`,
            travelDate: info.date || (info.flexible ? 'Flexible Dates' : 'Not specified'),
            partySize: Number(info.travellers) || 2,
            hotels: 'Tailored luxury boutique hotels / villas',
            activities: info.interests,
            specialRequests: combinedNotes,
          }),
        });
      } catch (notifyErr) {
        console.warn('[Trip wizard email error]:', notifyErr);
      }

      // 2. Safe backend database persistence (optional sync)
      try {
        await submitEnquiry({
          travelDate: info.date || null,
          flexibleDates: info.flexible,
          travellers: Math.max(1, Number(info.travellers) || 2),
          durationDays: Math.max(1, Number(info.days) || 10),
          travelStyle: info.styles.join(', ') || 'Signature',
          interests: info.interests,
          accommodation: 'Tailored',
          budget: null,
          currency: 'EUR',
          specialRequirements: combinedNotes || null,
          fullName: info.name.trim(),
          email: info.email.trim(),
          phone: phoneWithChannels,
          country: info.country.trim(),
          privacyConsent: info.consent,
        });
      } catch (dbErr) {
        console.warn('[Trip wizard DB sync]:', dbErr);
      }

      setStatus(
        `Received! Your enquiry reference is ${ref}. Our travel designers have received your request at ceyvoriatours@gmail.com and will reach out shortly.`
      );
      setStep(8);
    } catch (e) {
      setStatus(
        `Received! Your enquiry reference is ${ref}. Our team has received your request and will contact you shortly.`
      );
      setStep(8);
    } finally {
      setLoading(false);
    }
  }

  const durationNights = Math.max(1, (Number(info.days) || 1) - 1);
  const partySize = Number(info.travellers) || 1;

  return (
    <div className="wizard-shell">
      <div className="wizard-left">
        <span className="kicker">A MORE PERSONAL WAY TO TRAVEL</span>
        <div className="mini-metric">
          {step === 8
            ? 'Enquiry complete'
            : `Step ${step + 1} of ${steps.length} · ${steps[Math.min(step, steps.length - 1)]}`}
        </div>
        <div className="wizard-progress">
          {steps.map((s, i) => (
            <span key={s} className={i <= step ? 'filled' : ''} />
          ))}
        </div>

        {/* STEP 0: Departure Date */}
        {step === 0 && (
          <>
            <h2 className="forest">When shall we begin?</h2>
            <p>Share a preferred departure date, or let us know if you have flexibility.</p>
            <div className="field" style={{ maxWidth: 380 }}>
              <label htmlFor="trip-date">Preferred departure</label>
              <input
                id="trip-date"
                className="form-control"
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={info.date}
                onChange={e => put('date', e.target.value)}
              />
            </div>
            <label className="icon-row" style={{ marginTop: 12 }}>
              <input
                type="checkbox"
                checked={info.flexible}
                onChange={e => put('flexible', e.target.checked)}
              />
              <span>My dates are flexible</span>
            </label>
          </>
        )}

        {/* STEP 1: Travellers (1 to 9 boxes + custom party size for > 9) */}
        {step === 1 && (
          <>
            <h2 className="forest">Who is coming along?</h2>
            <p>
              Tell us how many people you&apos;ll be travelling with. We craft journeys for couples,
              families, and private groups of any size.
            </p>
            <div className="choice-grid">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(v => (
                <button
                  key={v}
                  type="button"
                  className={'choice ' + (info.travellers === v ? 'selected' : '')}
                  onClick={() => put('travellers', v)}
                >
                  {info.travellers === v && <Check size={14} />}
                  <span>{v} {v === '1' ? 'traveller' : 'travellers'}</span>
                </button>
              ))}
            </div>

            {/* More than 9 travellers or custom party size */}
            <div className="stepper-card">
              <div>
                <div className="stepper-card-title">More than 9 travellers or custom party size?</div>
                <div className="stepper-card-sub">
                  We organize bespoke private transport and villa stays for larger groups (10, 12, 15, 20+).
                </div>
              </div>
              <div className="stepper-unit">
                <button
                  type="button"
                  className="stepper-btn"
                  aria-label="Decrease travellers"
                  onClick={() => put('travellers', String(Math.max(1, partySize - 1)))}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  className="stepper-input"
                  value={info.travellers}
                  onChange={e => {
                    const val = e.target.value;
                    if (val === '' || Number(val) >= 1) put('travellers', val);
                  }}
                  aria-label="Number of travellers"
                />
                <span className="stepper-label">
                  {partySize === 1 ? 'traveller' : 'travellers'}
                </span>
                <button
                  type="button"
                  className="stepper-btn"
                  aria-label="Increase travellers"
                  onClick={() => put('travellers', String(partySize + 1))}
                >
                  +
                </button>
              </div>
            </div>
          </>
        )}

        {/* STEP 2: Duration (Boxes start from 7 days: 7, 8, 9, 10, 11, 12 days + custom for others) */}
        {step === 2 && (
          <>
            <h2 className="forest">How much time?</h2>
            <p>
              From week-long discoveries to extended multi-week expeditions, we design around your exact schedule.
              Choose any length of stay with no limitations.
            </p>
            <div className="choice-grid">
              {[
                { d: '7', n: '6' },
                { d: '8', n: '7' },
                { d: '9', n: '8' },
                { d: '10', n: '9' },
                { d: '11', n: '10' },
                { d: '12', n: '11' },
              ].map(({ d, n }) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => put('days', d)}
                  className={'choice ' + (info.days === d ? 'selected' : '')}
                >
                  {info.days === d && <Check size={14} />}
                  <div>
                    <div>{d} days</div>
                    <span className="choice-sub">{n} nights</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Custom / other durations */}
            <div className="stepper-card">
              <div>
                <div className="stepper-card-title">
                  Other or custom durations (13, 14, 15, 16, 18, 21+ or any number of days)
                </div>
                <div className="stepper-card-sub">
                  Selected duration: <strong>{info.days || 1} days</strong> ({durationNights} nights in Sri Lanka)
                </div>
              </div>
              <div className="stepper-unit">
                <button
                  type="button"
                  className="stepper-btn"
                  aria-label="Decrease days"
                  onClick={() => put('days', String(Math.max(1, (Number(info.days) || 1) - 1)))}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max="365"
                  className="stepper-input"
                  value={info.days}
                  onChange={e => {
                    const val = e.target.value;
                    if (val === '' || Number(val) >= 1) put('days', val);
                  }}
                  aria-label="Duration in days"
                />
                <span className="stepper-label">days</span>
                <button
                  type="button"
                  className="stepper-btn"
                  aria-label="Increase days"
                  onClick={() => put('days', String((Number(info.days) || 0) + 1))}
                >
                  +
                </button>
              </div>
            </div>
          </>
        )}

        {/* STEP 3: Travel style (Multi-select) */}
        {step === 3 && (
          <>
            <h2 className="forest">Your kind of journey.</h2>
            <p>
              Choose what feels closest to the experience you have in mind.
              <strong> You can select multiple styles</strong> to blend into your tailor-made journey.
            </p>
            <div className="choice-grid">
              {travelStyles.map(v => {
                const isSelected = info.styles.includes(v);
                return (
                  <button
                    key={v}
                    type="button"
                    className={'choice ' + (isSelected ? 'selected' : '')}
                    onClick={() => toggleStyle(v)}
                  >
                    {isSelected && <Check size={14} />}
                    <span>{v}</span>
                  </button>
                );
              })}
            </div>
            <div style={{ marginTop: 14, fontSize: '.75rem', color: '#66756b' }}>
              ✓ Selected styles: <strong>{info.styles.join(', ') || 'None selected'}</strong>
            </div>
          </>
        )}

        {/* STEP 4: Curiosity & Interests (Multi-select) */}
        {step === 4 && (
          <>
            <h2 className="forest">What sparks your curiosity?</h2>
            <p>
              Pick as many as you like. We will weave these highlights into your private daily itinerary.
            </p>
            <div className="choice-grid">
              {curiosityInterests.map(v => {
                const isSelected = info.interests.includes(v);
                return (
                  <button
                    key={v}
                    type="button"
                    className={'choice ' + (isSelected ? 'selected' : '')}
                    onClick={() => toggleInterest(v)}
                  >
                    {isSelected && <Check size={14} />}
                    <span>{v}</span>
                  </button>
                );
              })}
            </div>
            <div style={{ marginTop: 14, fontSize: '.75rem', color: '#66756b' }}>
              {info.interests.length > 0 ? (
                <>✓ {info.interests.length} curiosities selected: <strong>{info.interests.join(', ')}</strong></>
              ) : (
                'Select any elements that excite you, or leave blank for a balanced general route.'
              )}
            </div>
          </>
        )}

        {/* STEP 5: Your Wishes (Special Requirements) */}
        {step === 5 && (
          <>
            <h2 className="forest">Anything else?</h2>
            <p>
              Special celebrations, dietary preferences, accessibility needs, or must-see places — we&apos;re listening.
            </p>
            <div className="field">
              <label htmlFor="special">Your wishes & special notes (optional)</label>
              <textarea
                id="special"
                className="form-control"
                maxLength={2000}
                value={info.requirements}
                onChange={e => put('requirements', e.target.value)}
                placeholder="Tell us about special milestones, preferred pace, villas or specific experiences..."
              />
            </div>
          </>
        )}

        {/* STEP 6: Your details (Name, Email, Country Dropdown [Required], Phone [Required] + WhatsApp & Telegram checkboxes) */}
        {step === 6 && (
          <>
            <h2 className="forest">How can we reach you?</h2>
            <p>
              Your contact details are used strictly to send your tailored proposal and itinerary.
              Please provide your country of residence and phone number so we can reach you accurately.
            </p>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="trip-name">
                  Full name <span className="required-star">*</span>
                </label>
                <input
                  className="form-control"
                  id="trip-name"
                  type="text"
                  required
                  placeholder="e.g. Eleanor Vance"
                  value={info.name}
                  onChange={e => put('name', e.target.value)}
                />
              </div>

              <div className="field">
                <label htmlFor="trip-email">
                  Email address <span className="required-star">*</span>
                </label>
                <input
                  className="form-control"
                  id="trip-email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={info.email}
                  onChange={e => put('email', e.target.value)}
                />
              </div>

              <div className="field">
                <label htmlFor="trip-country">
                  Country of residence <span className="required-star">*</span>
                </label>
                <select
                  className="form-control"
                  id="trip-country"
                  required
                  value={info.country}
                  onChange={e => put('country', e.target.value)}
                >
                  <option value="">Select your country of residence...</option>
                  <optgroup label="Popular Countries">
                    {popularCountries.map(c => (
                      <option key={'pop-' + c} value={c}>
                        {c}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="All Countries (A–Z)">
                    {allCountries.map(c => (
                      <option key={'all-' + c} value={c}>
                        {c}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              <div className="field">
                <label htmlFor="trip-phone">
                  Phone number <span className="required-star">*</span>
                </label>
                <input
                  className="form-control"
                  id="trip-phone"
                  type="tel"
                  required
                  placeholder="e.g. +44 7123 456789"
                  value={info.phone}
                  onChange={e => put('phone', e.target.value)}
                />
              </div>
            </div>

            {/* Messaging app checkboxes */}
            <div style={{ marginTop: -4, marginBottom: 24 }}>
              <span style={{ display: 'block', fontSize: '.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--forest)', marginBottom: 8 }}>
                Quick Messaging Channels
              </span>
              <div className="channel-box">
                <label className="channel-option">
                  <input
                    type="checkbox"
                    checked={info.hasWhatsApp}
                    onChange={e => put('hasWhatsApp', e.target.checked)}
                  />
                  <span>
                    <MessageSquare size={14} style={{ display: 'inline', marginRight: 6, verticalAlign: -2 }} />
                    This phone has WhatsApp
                  </span>
                </label>

                <label className="channel-option">
                  <input
                    type="checkbox"
                    checked={info.hasTelegram}
                    onChange={e => put('hasTelegram', e.target.checked)}
                  />
                  <span>
                    <MessageSquare size={14} style={{ display: 'inline', marginRight: 6, verticalAlign: -2 }} />
                    This phone has Telegram
                  </span>
                </label>
              </div>
              <div style={{ fontSize: '.72rem', color: '#68786e', marginTop: 8 }}>
                Check if you would like quick itinerary updates, advice, or PDF proposals sent via WhatsApp or Telegram.
              </div>
            </div>

            <label className="icon-row" style={{ marginTop: 10 }}>
              <input
                type="checkbox"
                checked={info.consent}
                onChange={e => put('consent', e.target.checked)}
              />
              <span>
                I consent to my details being processed to receive this bespoke trip proposal.{' '}
                <span className="required-star">*</span>
              </span>
            </label>
          </>
        )}

        {/* STEP 7: Review */}
        {step === 7 && (
          <>
            <h2 className="forest">A journey in the making.</h2>
            <p>Review your preferences before sending your enquiry to our private travel designers.</p>
            <div className="paper" style={{ background: '#f4f6f0', borderLeft: '3px solid var(--gold)', padding: '24px 28px' }}>
              <p style={{ margin: '0 0 10px' }}>
                <strong>Preferred Departure:</strong> {info.date || 'Flexible dates'}
              </p>
              <p style={{ margin: '0 0 10px' }}>
                <strong>Travellers:</strong> {info.travellers} {partySize === 1 ? 'traveller' : 'travellers'} ·{' '}
                <strong>Duration:</strong> {info.days} days ({durationNights} nights)
              </p>
              <p style={{ margin: '0 0 10px' }}>
                <strong>Journey Styles:</strong> {info.styles.join(', ') || 'Custom blend'}
              </p>
              <p style={{ margin: '0 0 10px' }}>
                <strong>Curiosities:</strong> {info.interests.join(', ') || 'Open to recommendations'}
              </p>
              {info.requirements && (
                <p style={{ margin: '0 0 10px' }}>
                  <strong>Special Wishes:</strong> {info.requirements}
                </p>
              )}
              <hr style={{ border: 0, borderTop: '1px solid #d8dfd9', margin: '14px 0' }} />
              <p style={{ margin: '0 0 6px' }}>
                <strong>Lead Traveller:</strong> {info.name} ({info.email})
              </p>
              <p style={{ margin: '0 0 6px' }}>
                <strong>Country of Residence:</strong> {info.country}
              </p>
              <p style={{ margin: 0 }}>
                <strong>Phone:</strong> {info.phone}{' '}
                {[info.hasWhatsApp ? 'WhatsApp ✓' : '', info.hasTelegram ? 'Telegram ✓' : '']
                  .filter(Boolean)
                  .join(' · ')}
              </p>
            </div>
            <div className="notice" style={{ marginTop: 20 }}>
              This is a personalized itinerary inquiry with no initial obligation or deposit.
              A Ceyvoria travel designer will curate a customized proposal for your review.
            </div>
          </>
        )}

        {/* STEP 8: Success screen */}
        {step === 8 && (
          <>
            <h2 className="forest">Ayubowan! We have received your journey enquiry.</h2>
            <p style={{ fontSize: '1rem', lineHeight: 1.8, marginTop: 14 }}>{status}</p>
            <div className="notice success" style={{ marginTop: 24 }}>
              Our destination specialists in Sri Lanka are now crafting your personal route.
              Expect to hear from us within 24 hours.
            </div>
          </>
        )}

        {/* Navigation buttons */}
        {step < 8 && (
          <>
            <div className="wizard-controls">
              {step > 0 ? (
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    setStep(s => s - 1);
                    setStatus('');
                  }}
                >
                  <ArrowLeft size={16} /> Back
                </button>
              ) : (
                <span />
              )}
              {step < 7 ? (
                <button
                  type="button"
                  className="btn"
                  disabled={!canContinue}
                  onClick={() => setStep(s => s + 1)}
                >
                  Continue <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  className="btn"
                  onClick={finish}
                  disabled={loading || !canContinue}
                >
                  {loading ? 'Sending...' : 'Send My Enquiry'} <ArrowRight size={16} />
                </button>
              )}
            </div>
            {status && (
              <div className="notice error" role="alert" style={{ marginTop: 16 }}>
                {status}
              </div>
            )}
          </>
        )}
      </div>

      <aside className="wizard-right">
        <Image
          src="/images/hendrik-cornelissen-jptt-sau034-unsplash.webp"
          alt="Train travelling through the Sri Lankan hill country"
          width={630}
          height={520}
        />
        <div style={{ padding: '30px 20px' }}>
          <span className="kicker">YOUR JOURNEY, OUR INSPIRATION</span>
          <h3 className="forest">Your island story starts here.</h3>
          <p>A thoughtful journey is never one-size-fits-all. We begin by listening.</p>
          <div className="divider-gold" />
          <p style={{ fontSize: '.75rem' }}>
            No obligation · Personally tailored · Quote before booking
          </p>
        </div>
      </aside>
    </div>
  );
}

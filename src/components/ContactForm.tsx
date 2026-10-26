'use client';

import { useState } from 'react';
import { submitContact } from '@/lib/api';
import { ArrowRight, MessageSquare } from 'lucide-react';

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

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    hasWhatsApp: true,
    hasTelegram: false,
    subject: 'Private itinerary',
    message: '',
    consent: false,
  });

  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (field: keyof typeof form, value: string | boolean) =>
    setForm(x => ({ ...x, [field]: value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      const messagingNotes: string[] = [];
      if (form.hasWhatsApp) messagingNotes.push('WhatsApp');
      if (form.hasTelegram) messagingNotes.push('Telegram');

      const phoneWithMessaging = messagingNotes.length > 0
        ? `${form.phone.trim()} (${messagingNotes.join(', ')})`
        : form.phone.trim();

      const r = await submitContact({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: phoneWithMessaging,
        country: form.country.trim(),
        subject: form.subject,
        message: form.message.trim(),
        consent: form.consent,
      });

      setStatus(`Thank you! Your message reference is ${r.reference}. Our Sri Lanka travel team will be in touch shortly.`);
      setForm({
        name: '',
        email: '',
        phone: '',
        country: '',
        hasWhatsApp: true,
        hasTelegram: false,
        subject: 'Private itinerary',
        message: '',
        consent: false,
      });
    } catch (e) {
      setStatus(e instanceof Error ? e.message : 'Unable to submit your message. Please try again or message us directly on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit}>
      <div className="form-grid">
        {/* Full Name */}
        <div className="field">
          <label htmlFor="contact-name">
            Full name <span className="required-star">*</span>
          </label>
          <input
            id="contact-name"
            className="form-control"
            type="text"
            required
            placeholder="e.g. Dr. Eleanor Vance"
            value={form.name}
            onChange={e => update('name', e.target.value)}
          />
        </div>

        {/* Email Address */}
        <div className="field">
          <label htmlFor="contact-email">
            Email address <span className="required-star">*</span>
          </label>
          <input
            id="contact-email"
            className="form-control"
            type="email"
            required
            placeholder="name@example.com"
            value={form.email}
            onChange={e => update('email', e.target.value)}
          />
        </div>

        {/* Country of Residence (Dropdown, Required) */}
        <div className="field">
          <label htmlFor="contact-country">
            Country of residence <span className="required-star">*</span>
          </label>
          <select
            id="contact-country"
            className="form-control"
            required
            value={form.country}
            onChange={e => update('country', e.target.value)}
          >
            <option value="">Select your country of residence...</option>
            <optgroup label="Popular Countries">
              {popularCountries.map(c => (
                <option key={'contact-pop-' + c} value={c}>
                  {c}
                </option>
              ))}
            </optgroup>
            <optgroup label="All Countries (A–Z)">
              {allCountries.map(c => (
                <option key={'contact-all-' + c} value={c}>
                  {c}
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        {/* Phone Number (Required) */}
        <div className="field">
          <label htmlFor="contact-phone">
            Phone number <span className="required-star">*</span>
          </label>
          <input
            id="contact-phone"
            className="form-control"
            type="tel"
            required
            placeholder="e.g. +44 7123 456789"
            value={form.phone}
            onChange={e => update('phone', e.target.value)}
          />
        </div>
      </div>

      {/* WhatsApp / Telegram check boxes */}
      <div style={{ marginTop: -4, marginBottom: 22 }}>
        <span style={{ display: 'block', fontSize: '.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--forest)', marginBottom: 8 }}>
          Preferred Messaging Channels for this Number
        </span>
        <div className="channel-box">
          <label className="channel-option">
            <input
              type="checkbox"
              checked={form.hasWhatsApp}
              onChange={e => update('hasWhatsApp', e.target.checked)}
            />
            <span>
              <MessageSquare size={14} style={{ display: 'inline', marginRight: 6, verticalAlign: -2 }} />
              This phone has WhatsApp
            </span>
          </label>
          <label className="channel-option">
            <input
              type="checkbox"
              checked={form.hasTelegram}
              onChange={e => update('hasTelegram', e.target.checked)}
            />
            <span>
              <MessageSquare size={14} style={{ display: 'inline', marginRight: 6, verticalAlign: -2 }} />
              This phone has Telegram
            </span>
          </label>
        </div>
      </div>

      {/* Subject */}
      <div className="field">
        <label htmlFor="contact-subject">How can we help?</label>
        <select
          className="form-control"
          value={form.subject}
          onChange={e => update('subject', e.target.value)}
          id="contact-subject"
        >
          <option>Private itinerary</option>
          <option>Tour enquiry</option>
          <option>Luxury villa & chauffeur enquiry</option>
          <option>Honeymoon or celebration enquiry</option>
          <option>General question</option>
        </select>
      </div>

      {/* Message */}
      <div className="field">
        <label htmlFor="contact-message">
          Your message <span className="required-star">*</span>
        </label>
        <textarea
          id="contact-message"
          className="form-control"
          required
          minLength={10}
          maxLength={3000}
          value={form.message}
          onChange={e => update('message', e.target.value)}
          placeholder="Tell us about your proposed dates, group size, preferred travel style, or any specific questions..."
        />
      </div>

      {/* Consent */}
      <label style={{ display: 'flex', gap: 10, alignItems: 'start', fontSize: '.78rem', margin: '15px 0 28px', color: 'var(--forest)' }}>
        <input
          type="checkbox"
          required
          checked={form.consent}
          onChange={e => update('consent', e.target.checked)}
        />
        <span>
          I agree to the processing of my contact information to respond to this travel enquiry as described in the privacy policy.{' '}
          <span className="required-star">*</span>
        </span>
      </label>

      <button className="btn" type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Send Your Enquiry'} <ArrowRight size={16} />
      </button>

      {status && (
        <div
          role="status"
          className={'notice ' + (status.startsWith('Thank') ? 'success' : 'error')}
          style={{ marginTop: 20 }}
        >
          {status}
        </div>
      )}
    </form>
  );
}

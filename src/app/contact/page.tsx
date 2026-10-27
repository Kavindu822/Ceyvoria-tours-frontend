import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import { PageHero, Eyebrow } from '@/components/UI';
import { site } from '@/lib/site';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  Zap,
  Compass,
  HeartHandshake,
  ArrowUpRight,
  MessageCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Our Travel Team | CEYVORIA TOURS',
  description:
    'Contact Ceyvoria Tours via WhatsApp (+94 76 781 0420), email (ceyvoriatours@gmail.com), or our tailor-made journey enquiry form. Based in Mirissa, Sri Lanka.',
};

export default function Contact() {
  const whatsappUrl = `https://wa.me/${site.whatsappRaw}?text=${encodeURIComponent(
    'Hello Ceyvoria Tours, I would like to inquire about a tailor-made journey to Sri Lanka.'
  )}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TravelAgency',
            name: site.name,
            description: site.subtitle,
            url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ceyvoriatours.com',
            telephone: site.phoneRaw,
            email: site.email,
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Indasara Mawatha',
              addressLocality: 'Mirissa',
              addressRegion: 'Southern Province',
              addressCountry: 'LK',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: site.coordinates.lat,
              longitude: site.coordinates.lng,
            },
            hasMap: site.googleMapsUrl,
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                  'Sunday',
                ],
                opens: '00:00',
                closes: '23:59',
              },
            ],
          }),
        }}
      />

      <PageHero
        title="Let's talk Sri Lanka."
        description="Direct access to our senior journey planners. We listen to your wishes and design a private itinerary crafted exclusively around you."
        image="/images/andrei-alekseev-vvltlbkjmwq-unsplash.webp"
        kicker="A CONVERSATION BEGINS"
      />

      <section className="section">
        <div className="container contact-grid">
          {/* Left Column: Direct channels, location, and concierge info */}
          <div>
            <Eyebrow>GET IN TOUCH</Eyebrow>
            <h2 className="forest">Every great journey starts with a conversation.</h2>
            <p className="lead">
              Tell us what matters most to you. We are ready to help via instant WhatsApp, email, or a direct call.
            </p>
            <div className="divider-gold" />

            <div className="contact-cards-container">
              {/* WhatsApp Card with QR Code */}
              <div className="contact-channel-card" style={{ flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', gap: 14 }}>
                  <div style={{ flex: 1 }}>
                    <div className="contact-channel-title">Direct WhatsApp Concierge</div>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-channel-val"
                    >
                      {site.whatsapp}
                    </a>
                    <div className="contact-channel-desc">
                      Fastest channel for immediate route suggestions, villa photos, and quick questions.
                    </div>
                  </div>
                  <div className="contact-channel-icon" style={{ background: '#e7f7ed', color: '#1ebe57' }}>
                    <MessageCircle size={22} />
                  </div>
                </div>

                {/* QR Code & Tap to Chat Box */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: '#f8faf8', border: '1px solid #dce4dd', padding: '14px 16px', borderRadius: 4, width: '100%', flexWrap: 'wrap' }}>
                  <div style={{ background: '#fff', padding: 6, borderRadius: 4, border: '1px solid #c9d5cb', boxShadow: '0 3px 10px rgba(5,46,39,0.06)', width: 104, height: 104, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Image
                      src="/images/whatsapp-qr.png"
                      alt="WhatsApp QR Code to chat with Ceyvoria Tours"
                      width={92}
                      height={92}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 160 }}>
                    <div style={{ fontSize: '.79rem', fontWeight: 800, color: 'var(--forest)', marginBottom: 2 }}>
                      Scan QR Code to Chat
                    </div>
                    <div style={{ fontSize: '.72rem', color: '#66756b', lineHeight: 1.45, marginBottom: 8 }}>
                      Scan with your smartphone camera for an instant connection with our Sri Lanka team.
                    </div>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="whatsapp-action-btn"
                      style={{ margin: 0 }}
                    >
                      <MessageCircle size={14} />
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="contact-channel-card">
                <div style={{ flex: 1 }}>
                  <div className="contact-channel-title">Official Inquiries Email</div>
                  <a href={`mailto:${site.email}`} className="contact-channel-val">
                    {site.email}
                  </a>
                  <div className="contact-channel-desc">
                    Ideal for sending detailed travel briefs, international flight timings, and family notes.
                  </div>
                </div>
                <div className="contact-channel-icon">
                  <Mail size={20} />
                </div>
              </div>

              {/* Phone Card */}
              <div className="contact-channel-card">
                <div style={{ flex: 1 }}>
                  <div className="contact-channel-title">Direct Telephone Line</div>
                  <a href={`tel:${site.phoneRaw}`} className="contact-channel-val">
                    {site.phone}
                  </a>
                  <div className="contact-channel-desc">
                    Speak directly with a private journey planner based in Sri Lanka.
                  </div>
                </div>
                <div className="contact-channel-icon">
                  <Phone size={20} />
                </div>
              </div>

              {/* Location Card */}
              <div className="contact-channel-card" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', gap: 14 }}>
                  <div style={{ flex: 1 }}>
                    <div className="contact-channel-title">Our Island Headquarters & Location</div>
                    <div className="contact-channel-val" style={{ cursor: 'default' }}>
                      {site.location}
                    </div>
                    <div className="contact-channel-desc" style={{ marginTop: 2 }}>
                      {site.address}
                    </div>
                    <div style={{ fontSize: '.72rem', color: 'var(--palm)', fontWeight: 700, marginTop: 6 }}>
                      ✓ {site.islandwide}
                    </div>
                  </div>
                  <div className="contact-channel-icon">
                    <MapPin size={20} />
                  </div>
                </div>

                {site.googleMapsUrl && (
                  <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid #e1e8e2' }}>
                    <a
                      href={site.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="whatsapp-action-btn"
                      style={{
                        margin: 0,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        width: 'fit-content',
                        fontSize: '.78rem',
                        padding: '7px 14px',
                      }}
                    >
                      <MapPin size={14} />
                      <span>Open on Google Maps</span>
                      <ArrowUpRight size={13} />
                    </a>
                  </div>
                )}
              </div>

              {/* Concierge Hours Card */}
              <div className="contact-channel-card">
                <div style={{ flex: 1 }}>
                  <div className="contact-channel-title">Concierge & Availability</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--forest)' }}>
                    {site.hours}
                  </div>
                  <div className="contact-channel-desc" style={{ marginTop: 3 }}>
                    Round-the-clock traveller care, consultation & on-ground concierge support 365 days a year.
                  </div>
                </div>
                <div className="contact-channel-icon">
                  <Clock size={20} />
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div
              style={{
                marginTop: 24,
                borderRadius: 8,
                overflow: 'hidden',
                border: '1px solid #dce4dd',
                background: '#ffffff',
                boxShadow: '0 4px 20px rgba(5,46,39,0.06)',
              }}
            >
              <div
                style={{
                  padding: '12px 16px',
                  background: '#f8faf8',
                  borderBottom: '1px solid #e1e8e2',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 8,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <MapPin size={16} color="var(--forest)" />
                  <div>
                    <div style={{ fontSize: '.84rem', fontWeight: 800, color: 'var(--forest)' }}>
                      Mirissa Headquarters · Disna Family House
                    </div>
                    <div style={{ fontSize: '.72rem', color: '#68776d' }}>
                      {site.address}
                    </div>
                  </div>
                </div>
                <a
                  href={site.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '.76rem',
                    fontWeight: 700,
                    color: 'var(--palm)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    textDecoration: 'none',
                  }}
                >
                  <span>View Larger Map</span>
                  <ArrowUpRight size={12} />
                </a>
              </div>
              <iframe
                title="Ceyvoria Tours Location - Mirissa"
                src={site.googleMapsEmbedUrl}
                width="100%"
                height="280"
                style={{ border: 0, display: 'block' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Column: High-touch message form */}
          <div className="paper" style={{ boxShadow: '0 12px 40px rgba(5,46,39,0.06)' }}>
            <span className="kicker">BESPOKE INQUIRY</span>
            <h3 className="forest" style={{ marginBottom: 6 }}>
              Send us a message.
            </h3>
            <p style={{ fontSize: '.84rem', color: '#68776d', marginBottom: 20 }}>
              Prefer an interactive step-by-step route designer? You can also use our{' '}
              <Link className="text-link" href="/plan-your-trip">
                Trip Planner wizard <ArrowUpRight size={13} />
              </Link>
              .
            </p>

            <ContactForm />
          </div>
        </div>

        {/* Professional Trust & Reliability Strip */}
        <div className="container">
          <div className="trust-strip">
            <div className="trust-item">
              <div className="trust-item-icon">
                <Zap size={22} />
              </div>
              <div>
                <h4>Rapid Response</h4>
                <p>Personal proposal and route advice delivered within 2 to 4 hours.</p>
              </div>
            </div>

            <div className="trust-item">
              <div className="trust-item-icon">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h4>Verified Island Specialists</h4>
                <p>Registered private tour operator with certified luxury chauffeur-guides.</p>
              </div>
            </div>

            <div className="trust-item">
              <div className="trust-item-icon">
                <Compass size={22} />
              </div>
              <div>
                <h4>100% Tailored Routes</h4>
                <p>Every pace, villa stay, and wildlife safari tailored to your exact party.</p>
              </div>
            </div>

            <div className="trust-item">
              <div className="trust-item-icon">
                <HeartHandshake size={22} />
              </div>
              <div>
                <h4>No Obligation Quotes</h4>
                <p>Complete custom proposal, timing, and transparent pricing before booking.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

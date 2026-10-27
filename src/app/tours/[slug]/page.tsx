import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Check,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Clock3,
  Users,
  Compass,
  Plane,
  Car,
  ShieldCheck,
  CalendarCheck,
} from 'lucide-react';
import { tourBySlug, destinationBySlug, tours } from '@/lib/data';
import { Crumbs, Eyebrow, ContactCTA, TourCard } from '@/components/UI';
import TourItineraryAccordion from '@/components/TourItineraryAccordion';
import TourRouteMap from '@/components/TourRouteMap';
import TourActionButtons from '@/components/TourActionButtons';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return tours.map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = tourBySlug(slug);
  if (!t) return { title: 'Tour Not Found | CEYVORIA TOURS' };

  const title = `${t.title} – ${t.days} Days & ${t.nights} Nights Private Sri Lanka Tour | CEYVORIA TOURS`;
  const description = `${t.description} Private chauffeur-guided itinerary covering ${t.route.map(r => r.replace(/-/g, ' ')).join(', ')}. Tailored by CEYVORIA TOURS.`;

  return {
    title,
    description,
    keywords: [
      t.title,
      `${t.days} day Sri Lanka tour`,
      `${t.style} tour Sri Lanka`,
      'private tour Sri Lanka',
      'chauffeur guide Sri Lanka',
      ...t.route.map(r => `${r.replace(/-/g, ' ')} Sri Lanka`),
    ],
    alternates: {
      canonical: `/tours/${t.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/tours/${t.slug}`,
      type: 'website',
      images: [
        {
          url: t.image,
          width: 1200,
          height: 630,
          alt: `${t.title} - CEYVORIA TOURS`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [t.image],
    },
  };
}

export default async function TourDetail({ params }: Props) {
  const { slug } = await params;
  const t = tourBySlug(slug);
  if (!t) notFound();

  const related = tours.filter(x => x.slug !== t.slug).slice(0, 3);

  const tripSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: t.title,
    description: t.description,
    image: t.image,
    touristType: ['Luxury', 'Cultural', 'Wildlife', 'Adventure'],
    offers: {
      '@type': 'Offer',
      price: t.startingPrice || 1200,
      priceCurrency: t.currency || 'USD',
      availability: 'https://schema.org/InStock',
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://ceyvoriatours.com'}/tours/${t.slug}`,
    },
    provider: {
      '@type': 'TravelAgency',
      name: 'CEYVORIA TOURS',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ceyvoriatours.com',
    },
    itinerary: {
      '@type': 'ItemList',
      numberOfItems: t.itinerary.length,
      itemListElement: t.itinerary.map((day, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        item: {
          '@type': 'TouristAttraction',
          name: `Day ${day.day}: ${day.title}`,
          description: day.description,
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(tripSchema),
        }}
      />
      {/* Hero */}
      <div className="detail-hero">
        <Image
          src={t.image}
          alt={`Sri Lanka ${t.style.toLowerCase()} scenery`}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
        <div className="detail-hero-copy">
          <Eyebrow>THE CEYVORIA JOURNEY COLLECTION</Eyebrow>
          <h1>{t.title}</h1>
          <p>
            {t.days} days · {t.nights} nights · {t.style} {t.pace ? `· ${t.pace}` : ''}
          </p>
        </div>
      </div>

      <div className="container">
        <Crumbs
          items={[
            { label: 'Our tours', href: '/tours' },
            { label: t.title, href: '/tours/' + t.slug },
          ]}
        />
      </div>

      <section className="section" style={{ paddingTop: 35 }}>
        <div className="container detail-layout">
          <div>
            <Eyebrow>THE JOURNEY</Eyebrow>
            <h2 className="forest">An island, at your pace.</h2>
            <p className="lead">{t.description}</p>
            <p>
              Every journey includes <strong>VIP airport pickup and drop-off</strong> at Bandaranaike
              International Airport (BIA), an experienced English-speaking private chauffeur-guide, luxury
              air-conditioned vehicle, fuel, and expressway tolls.
            </p>

            {/* Route Breadcrumb Bar */}
            {t.route && t.route.length > 0 && (
              <div className="tour-route-badge">
                <strong style={{ color: '#C49A45', marginRight: 6 }}>ROUTE:</strong>{' '}
                {t.route.map(r => destinationBySlug(r)?.displayName || r).join(' • ')}
              </div>
            )}

            {/* Brochure Highlights Pills */}
            {t.highlights && t.highlights.length > 0 && (
              <div className="tour-highlights-box">
                <span className="highlights-label">BROCHURE HIGHLIGHTS</span>
                <div className="highlights-tags">
                  {t.highlights.map(h => (
                    <span key={h} className="highlight-tag">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="divider-gold" />

            {/* Quick Metrics */}
            <div className="two-col" style={{ marginBottom: 40 }}>
              <div className="icon-row">
                <Clock3 color="#49764C" size={20} />
                <strong>{t.days} days / {t.nights} nights</strong>
              </div>
              <div className="icon-row">
                <Users color="#49764C" size={20} />
                <strong>Private, bespoke group</strong>
              </div>
              <div className="icon-row">
                <Plane color="#49764C" size={20} />
                <strong>BIA Airport Pickup & Drop-off</strong>
              </div>
              <div className="icon-row">
                <Car color="#49764C" size={20} />
                <strong>Dedicated Chauffeur & Vehicle</strong>
              </div>
            </div>

            {/* Comprehensive Interactive Route Map with Marked Waypoints */}
            <TourRouteMap tour={t} />

            {/* Professional Collapsible Day-by-Day Itinerary */}
            <TourItineraryAccordion itinerary={t.itinerary} tourTitle={t.title} />

            {/* Destinations Along the Route */}
            <div style={{ marginTop: 28, marginBottom: 44 }}>
              <Eyebrow>HIGHLIGHTS EN ROUTE</Eyebrow>
              <h2 className="forest" style={{ margin: '4px 0 10px' }}>Along the way.</h2>
              <p style={{ color: '#5b695e', fontSize: '.86rem', maxWidth: 620, marginBottom: 20 }}>
                Iconic destinations and scenic landscapes featured along this private tailor-made circuit:
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
                  gap: 16,
                }}
              >
                {t.route.slice(0, 8).map(r => {
                  const d = destinationBySlug(r);
                  if (!d) return null;
                  return (
                    <Link
                      key={r}
                      href={'/destinations/' + d.slug}
                      className="destination-route-tile"
                      style={{
                        position: 'relative',
                        display: 'block',
                        borderRadius: 4,
                        overflow: 'hidden',
                        height: 200,
                        border: '1px solid #dce4dd',
                        boxShadow: '0 4px 14px rgba(7, 61, 50, 0.08)',
                        background: '#072e26',
                      }}
                    >
                      <Image
                        src={d.image}
                        alt={`Photo of ${d.displayName || d.name} in Sri Lanka`}
                        fill
                        sizes="(max-width: 600px) 100vw, 33vw"
                        style={{ objectFit: 'cover' }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background:
                            'linear-gradient(0deg, rgba(3, 27, 22, 0.90) 0%, rgba(3, 27, 22, 0.35) 50%, transparent 80%)',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'flex-end',
                          padding: '14px 16px',
                          color: '#ffffff',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '0.62rem',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: 'var(--gold)',
                            fontWeight: 800,
                            marginBottom: 3,
                          }}
                        >
                          {d.region}
                        </span>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 8,
                          }}
                        >
                          <h4
                            style={{
                              fontFamily: 'var(--display)',
                              fontSize: '1.25rem',
                              color: '#ffffff',
                              margin: 0,
                              lineHeight: 1.15,
                              fontWeight: 600,
                            }}
                          >
                            {d.displayName || d.name}
                          </h4>
                          <ArrowUpRight size={15} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Inclusions & Guarantees */}
            <h2 className="forest">What is included.</h2>
            <div className="two-col">
              <div>
                <h3 style={{ fontSize: '1.45rem', marginBottom: 12 }}>
                  Standard with every private journey
                </h3>
                <ul className="bullet-check">
                  {[
                    'VIP Meet & Greet with flower garland / Ayubowan welcome',
                    'Airport pickup & return drop-off at Bandaranaike International Airport (BIA)',
                    'Dedicated private luxury air-conditioned vehicle throughout your tour',
                    'Licensed English-speaking professional chauffeur-guide',
                    'All fuel costs, expressway tolls, driver accommodation & parking fees',
                    '24/7 Island Concierge & emergency guest support',
                  ].map(a => (
                    <li key={a} style={{ fontSize: '.84rem' }}>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 style={{ fontSize: '1.45rem', marginBottom: 12 }}>
                  Tailored on your proposal
                </h3>
                <ul className="bullet-check">
                  {[
                    'We can arrange if you need hotels to stay',
                    'Madu River boat safaris & whale watching catamaran charters',
                    'Snorkeling, diving, kayaking, and coastal water sports',
                    'All activities & excursions mentioned in this itinerary',
                    'National park safari jeep permits & licensed naturalist trackers',
                    'Flexible meal plans (Bed & Breakfast, Half Board or All-Inclusive)',
                    'Optional room upgrades, private pool villas & spa packages',
                  ].map(a => (
                    <li key={a} style={{ fontSize: '.84rem' }}>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="notice" style={{ marginTop: 24 }}>
              This route can be customized freely. Prefer extra beach days in Mirissa or a tea country
              pause in Ella? Our private travel designers will adapt every stop to your wishes.
            </div>
          </div>

          {/* Sticky Sidebar Booking / Inquiry Card */}
          <aside className="sticky-card">
            <Eyebrow>YOUR OWN SRI LANKA STORY</Eyebrow>
            <h3 className="forest">Shall we make it yours?</h3>
            <p>
              Tell us your preferred dates and group size. A dedicated Ceyvoria travel designer will curate
              your bespoke itinerary and itemized quote.
            </p>
            <div className="divider-gold" />

            <div className="icon-row" style={{ marginBottom: 6 }}>
              <Clock3 size={16} />
              <span>{t.days} days / {t.nights} nights</span>
            </div>
            <div className="icon-row" style={{ marginBottom: 6 }}>
              <Plane size={16} />
              <span>Airport Pickup & Drop-off included</span>
            </div>
            <div className="icon-row" style={{ marginBottom: 16 }}>
              <ShieldCheck size={16} />
              <span>Private Chauffeur & Vehicle</span>
            </div>

            {/* Price Quote Banner matching specification */}
            <div
              className="price-quote-banner"
              style={{
                margin: '22px 0 18px',
                padding: '16px 18px',
                background: '#f7faf7',
                border: '1px solid #dce6de',
                borderLeft: '4px solid var(--gold)',
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <div style={{ color: '#55635b', flexShrink: 0 }}>
                <svg width="42" height="42" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a1 1 0 0 1 1 1v.3a3.5 3.5 0 0 1 2.3 1.4 1 1 0 0 1-1.6 1.2A1.5 1.5 0 0 0 12.5 5h-.6a1.4 1.4 0 0 0-1.4 1.4c0 .7.4 1.1 1.3 1.4l.7.2c1.7.5 3 1.2 3 3 0 1.5-1 2.7-2.5 3v.5a1 1 0 1 1-2 0v-.3a3.6 3.6 0 0 1-2.5-1.7 1 1 0 0 1 1.7-1.1c.3.5.9.8 1.6.8h.4c.8 0 1.5-.6 1.5-1.4 0-.8-.5-1.2-1.4-1.5l-.7-.2c-1.8-.5-2.9-1.3-2.9-2.9 0-1.6 1.1-2.8 2.8-3.1V3a1 1 0 0 1 1-1z" />
                  <path d="M2 15a1 1 0 0 1 1-1h4.8a3 3 0 0 1 2.1.9l2.1 2.1h6a2 2 0 1 1 0 4h-7.6a3 3 0 0 1-2.1-.9L6.5 17H3a1 1 0 0 1-1-1v-1z" />
                </svg>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--display)',
                    fontSize: '1.9rem',
                    fontWeight: 700,
                    lineHeight: 1.1,
                    color: '#0e231d',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {t.startingPrice ? `${t.startingPrice} USD Onwards` : '380 USD Onwards'}
                </div>
                <div style={{ fontSize: '.8rem', color: '#68776f', marginTop: 4, fontWeight: 500 }}>
                  Fill Request Quote Form Below For Details
                </div>
              </div>
            </div>

            <TourActionButtons tour={t} />
          </aside>
        </div>
      </section>

      {/* Related Tours */}
      <section className="section" style={{ background: '#eff0e9' }}>
        <div className="container">
          <Eyebrow>KEEP EXPLORING</Eyebrow>
          <h2 className="forest">More journeys to consider.</h2>
          <div className="journey-grid">
            {related.map(x => (
              <TourCard key={x.slug} tour={x} />
            ))}
          </div>
          <div style={{ marginTop: 42, textAlign: 'center' }}>
            <Link className="text-link" href="/tours" style={{ fontSize: '.88rem' }}>
              View all journeys <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <ContactCTA />

      <div className="mobile-sticky">
        <Link className="btn" href={'/plan-your-trip?style=' + encodeURIComponent(t.style)}>
          Plan this journey <ArrowRight size={16} />
        </Link>
      </div>
    </>
  );
}

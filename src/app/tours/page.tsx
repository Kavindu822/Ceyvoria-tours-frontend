import type { Metadata } from 'next';
import Link from 'next/link';
import { Compass, Calendar, Sun, CloudRain, Mountain, ShieldCheck, HeartHandshake, MapPin } from 'lucide-react';
import { PageHero, ContactCTA, Eyebrow } from '@/components/UI';
import TourFilter from '@/components/TourFilter';

export const metadata: Metadata = {
  title: '20 Curated Private Sri Lanka Tour Itineraries (6–15 Days) | CEYVORIA TOURS',
  description:
    'Browse our curated collection of 20 private, tailor-made Sri Lanka tour itineraries ranging from 6 to 15 days. Dedicated chauffeur-guides, boutique luxury stays, wildlife safaris, and custom route planning.',
  keywords: [
    'Sri Lanka tour packages',
    'private Sri Lanka itineraries',
    '7 day Sri Lanka tour',
    '10 day Sri Lanka itinerary',
    '12 day Sri Lanka trip',
    '14 day Sri Lanka tour package',
    'Sri Lanka vacation packages',
    'luxury Sri Lanka holidays',
    'bespoke Sri Lanka journeys',
  ],
  alternates: {
    canonical: '/tours',
  },
  openGraph: {
    title: '20 Curated Private Sri Lanka Tour Itineraries | CEYVORIA TOURS',
    description:
      'Curated collection of 20 private, tailor-made Sri Lanka tour itineraries ranging from 6 to 15 days with dedicated chauffeur-guides.',
    url: '/tours',
    images: [
      {
        url: '/images/sander-traa-bfdshihd5y4-unsplash.webp',
        width: 1200,
        height: 630,
        alt: 'CEYVORIA TOURS - 20 Distinctive Sri Lanka Journeys',
      },
    ],
  },
};

export default function Tours() {
  return (
    <>
      <PageHero
        title="20 Distinctive Island Journeys."
        description="From 6 days to 15 days • Heritage, hills, wildlife & sea. Beautifully varied. Uniquely Sri Lankan. A ready-to-customise collection of 20 private itineraries for international travellers."
        image="/images/sander-traa-bfdshihd5y4-unsplash.webp"
        kicker="THE SRI LANKA COLLECTION · CEYVORIA TOURS"
      />

      {/* Main Tours Section */}
      <section className="section" style={{ paddingTop: 70 }}>
        <div className="container">
          <div style={{ maxWidth: 740, marginBottom: 40 }}>
            <span className="kicker">CHOOSE YOUR SRI LANKA JOURNEY</span>
            <h2 className="forest">Twenty tailored experiences.</h2>
            <p className="lead">
              Two bespoke options at every duration from six to fifteen days. Each private itinerary can be adjusted
              to your travel dates, preferred pace, accommodation style, and flight arrival times.
            </p>
          </div>

          <TourFilter />
        </div>
      </section>

      {/* Travel Smart: Seasons & Experiences (Brochure Page 43) */}
      <section className="section" style={{ background: '#f5f7f3', borderTop: '1px solid #e2e8e2' }}>
        <div className="container">
          <div style={{ maxWidth: 680, marginBottom: 35 }}>
            <span className="kicker">SEASONAL TRAVEL GUIDE</span>
            <h2 className="forest">Travel smart: seasons & experiences.</h2>
            <p>
              Sri Lanka experiences distinct coastal weather seasons across its regions. These planning guidelines help
              you pick the ideal route for your travel month:
            </p>
          </div>

          <div className="seasons-grid">
            <div className="season-card">
              <Sun size={22} color="#C49A45" style={{ marginBottom: 12 }} />
              <h4>South & West Coast</h4>
              <span className="season-period">Broadly December–April</span>
              <p>
                Mirissa, Weligama, Unawatuna, Galle, and Bentota offer calm seas, clear skies, and prime conditions for
                beach relaxation and seasonal whale watching.
              </p>
            </div>

            <div className="season-card">
              <Compass size={22} color="#C49A45" style={{ marginBottom: 12 }} />
              <h4>East Coast</h4>
              <span className="season-period">Broadly May–September</span>
              <p>
                Trincomalee, Nilaveli, Pasikudah, and Arugam Bay are warm-season highlights. Enjoy shallow bays, Pigeon
                Island snorkelling, and premier world-class surfing.
              </p>
            </div>

            <div className="season-card">
              <MapPin size={22} color="#C49A45" style={{ marginBottom: 12 }} />
              <h4>Cultural Triangle</h4>
              <span className="season-period">Accessible Year-Round</span>
              <p>
                Sigiriya, Dambulla, Anuradhapura, and Polonnaruwa can be warm. We recommend early-morning climbs,
                shaded afternoon breaks, and private chauffeur pacing.
              </p>
            </div>

            <div className="season-card">
              <Mountain size={22} color="#C49A45" style={{ marginBottom: 12 }} />
              <h4>Hill Country & Wildlife</h4>
              <span className="season-period">Misty Valleys & Safari</span>
              <p>
                Kandy, Nuwara Eliya, Horton Plains, and Ella offer cool mountain air. Elephant and wildlife sightings in
                Yala and Udawalawe are best enjoyed with registered naturalist guides.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Planning & Booking Information (Brochure Page 44) */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 680, marginBottom: 35 }}>
            <span className="kicker">TRANSPARENT & PRIVATE</span>
            <h2 className="forest">Planning & booking information.</h2>
            <p>
              Every itinerary in our 20-journey brochure is a flexible blueprint. We tailor accommodation tiers,
              activities, and travel pace to your specific wishes.
            </p>
          </div>

          <div className="planning-grid">
            <div className="planning-card">
              <h4>Personalise Your Tour</h4>
              <p>
                Choose your travel dates, party size, room preference, hotel boutique tier, meal plans, and preferred
                activity intensity. Your chauffeur meets you at BIA airport regardless of arrival hour.
              </p>
            </div>

            <div className="planning-card">
              <h4>Transparent Inclusions</h4>
              <p>
                Every proposal provides an itemised breakdown: dedicated air-conditioned vehicle, licensed chauffeur,
                fuel, tolls, hotel reservations, safari permits, and scenic rail tickets.
              </p>
            </div>

            <div className="planning-card">
              <h4>Scenic Rail Segments</h4>
              <p>
                Hill country rail rides (such as Nanu Oya to Ella) are reserved in observation or 1st class carriages. If
                rail timings fluctuate, your chauffeur transfers luggage smoothly.
              </p>
            </div>

            <div className="planning-card">
              <h4>Responsible Wildlife</h4>
              <p>
                We advocate respectful distance limits in national parks, reef-safe snorkelling, and zero support for
                elephant riding or unethical animal contact.
              </p>
            </div>

            <div className="planning-card">
              <h4>Airport Logistics (CMB)</h4>
              <p>
                All tours begin and end with VIP door-to-door transfers at Bandaranaike International Airport (CMB) in
                comfortable modern hybrid or executive vans.
              </p>
            </div>

            <div className="planning-card">
              <h4>24/7 Island Concierge</h4>
              <p>
                From complimentary King Coconut welcomes to real-time adjustments on the road, our local support team
                ensures your island holiday is completely carefree.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}

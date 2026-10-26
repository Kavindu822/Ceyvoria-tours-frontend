import type { Metadata } from 'next';
import { PageHero, ContactCTA, Eyebrow } from '@/components/UI';
import DestinationFilter from '@/components/DestinationFilter';
import { Sun, Waves, Mountain, Compass, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: '45 Extraordinary Destinations in Sri Lanka | CEYVORIA TOURS',
  description:
    'Explore the heritage, hill country, golden coastlines, and wildlife of Sri Lanka with our comprehensive destination guide. Featuring Mirissa, Unawatuna, Hiriketiya, Sigiriya, Kandy, and Yala.',
};

export default function Destinations() {
  return (
    <>
      <PageHero
        title="A World Within an Island."
        description="From the golden surf bays of Hiriketiya & Mirissa to ancient cloud citadels and wild elephant sanctuaries. An authentic guide to Sri Lanka’s 45 most captivating places."
        image="/images/sander-traa-bfdshihd5y4-unsplash.webp"
        kicker="PLACES TO EXPLORE · CEYVORIA TOURS"
      />

      {/* Main Destinations Section matching Our Tours layout */}
      <section className="section" style={{ paddingTop: 70 }}>
        <div className="container">
          <div style={{ maxWidth: 740, marginBottom: 40 }}>
            <span className="kicker">THE CEYVORIA DESTINATION DIRECTORY</span>
            <h2 className="forest">Forty-five extraordinary places.</h2>
            <p className="lead">
              Every corner of Sri Lanka has its own rhythm and character. Explore by coast, cultural kingdom,
              tea valleys, or wildlife reserves, and tell us which places you would love to include in your private tailor-made journey.
            </p>
          </div>

          <DestinationFilter />
        </div>
      </section>

      {/* Coastal & Regional Travel Tips */}
      <section className="section" style={{ background: '#f5f7f3', borderTop: '1px solid #e2e8e2' }}>
        <div className="container">
          <div style={{ maxWidth: 680, marginBottom: 35 }}>
            <span className="kicker">COASTAL & SEASONAL INSIGHTS</span>
            <h2 className="forest">Best time for every coastline.</h2>
            <p>
              Sri Lanka enjoys year-round warm weather, with calm seas moving between coasts across the seasons:
            </p>
          </div>

          <div className="seasons-grid">
            <div className="season-card">
              <Waves size={22} color="#C49A45" style={{ marginBottom: 12 }} />
              <h4>South & West Coast</h4>
              <span className="season-period">December to April (Prime)</span>
              <p>
                <strong>Mirissa</strong>, <strong>Unawatuna</strong>, <strong>Hiriketiya</strong>, Bentota, and Galle Fort offer calm turquoise waters,
                gentle ocean swimming, and optimal whale-watching catamaran conditions.
              </p>
            </div>

            <div className="season-card">
              <Sun size={22} color="#C49A45" style={{ marginBottom: 12 }} />
              <h4>East & North Coast</h4>
              <span className="season-period">May to September (Prime)</span>
              <p>
                Trincomalee, Nilaveli, Pasikudah, and Pigeon Island offer pristine crystal-clear waters for reef snorkeling,
                diving, and tranquil sunny beach time.
              </p>
            </div>

            <div className="season-card">
              <Mountain size={22} color="#C49A45" style={{ marginBottom: 12 }} />
              <h4>Central Hill Country</h4>
              <span className="season-period">Year-Round Refreshment</span>
              <p>
                Kandy, Nuwara Eliya, and Ella provide cool mountain breezes, tea estate tastings, and world-renowned scenic train journeys.
              </p>
            </div>

            <div className="season-card">
              <Compass size={22} color="#C49A45" style={{ marginBottom: 12 }} />
              <h4>Wildlife & Safaris</h4>
              <span className="season-period">Year-Round Safaris</span>
              <p>
                Yala, Udawalawe, Minneriya, and Wilpattu provide remarkable opportunities to photograph wild elephants, leopards, sloth bears, and endemic birds.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}

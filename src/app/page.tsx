import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { destinations, tours, experiences, travelStyles, articles } from '@/lib/data';
import { site } from '@/lib/site';
import PlannerBar from '@/components/PlannerBar';
import CuriosityPlanner from '@/components/CuriosityPlanner';
import WhyChooseUs from '@/components/WhyChooseUs';
import { Eyebrow, ButtonLink, SectionHeader, TourCard, DestinationCard, StyleCard, BlogCard, ContactCTA } from '@/components/UI';

export const metadata: Metadata = {
  title: 'CEYVORIA TOURS | Luxury Private Sri Lanka Tours & Tailor-Made Holidays',
  description:
    'Discover Sri Lanka with bespoke luxury itineraries, dedicated private chauffeur-guides, and hand-picked boutique villas. Explore Sigiriya, Ella tea hills, Yala wildlife safaris, and tropical beaches.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'CEYVORIA TOURS | Luxury Private Sri Lanka Tours & Tailor-Made Holidays',
    description:
      'Private, tailor-made journeys through Sri Lanka’s most extraordinary places. Dedicated chauffeur-guides, boutique villas, and 24/7 concierge.',
    url: '/',
    images: [
      {
        url: '/images/sander-traa-bfdshihd5y4-unsplash.webp',
        width: 1200,
        height: 630,
        alt: 'CEYVORIA TOURS - Discover Sri Lanka, Beautifully',
      },
    ],
  },
};

const featuredSlugs = ['sigiriya-rock-fortress', 'ella-nine-arch-bridge', 'galle-fort', 'yala-national-park', 'mirissa'];

export default function Home() {
  const featuredDest = featuredSlugs.map(s => destinations.find(d => d.slug === s)).filter((d): d is typeof destinations[number] => !!d);

  return (
    <>
      <section className="hero">
        <div className="hero-bg">
          <Image src="/images/sander-traa-bfdshihd5y4-unsplash.webp" alt="Sigiriya rock rising over forest in Sri Lanka at golden hour" fill priority quality={88} sizes="100vw" style={{ objectFit: 'cover' }} />
        </div>
        <div className="container hero-inner">
          <Eyebrow>CEYVORIA TOURS · SRI LANKA</Eyebrow>
          <h1>Discover Sri Lanka,<br /><em style={{ fontWeight: 400 }}>Beautifully.</em></h1>
          <p>{site.subtitle}</p>
          <div className="hero-actions">
            <ButtonLink href="/tours" variant="gold">Explore Our Tours</ButtonLink>
            <ButtonLink href="/plan-your-trip" variant="outline-light">Plan My Journey</ButtonLink>
          </div>
        </div>
        <span className="hero-scroll">SCROLL TO EXPLORE ↓</span>
        <span className="hero-side-label">PRIVATE & TAILOR-MADE JOURNEYS</span>
      </section>

      <PlannerBar />

      <section className="section">
        <div className="container editorial-grid">
          <div>
            <Eyebrow>THE CEYVORIA WAY</Eyebrow>
            <h2 className="forest">A more personal way<br />to see Sri Lanka.</h2>
            <div className="divider-gold" />
            <p className="lead">Not simply a destination. A collection of landscapes, cultures, flavours and moments — waiting to become your story.</p>
            <p>From the ancient wonders of the Cultural Triangle to the gentle rhythm of the coast, we imagine private journeys thoughtfully crafted around you.</p>
            <div style={{ marginTop: 28 }}>
              <Link href="/about" className="text-link">Discover our approach <ArrowRight size={16} /></Link>
            </div>
          </div>
          <div>
            <div className="editorial-photo">
              <Image src="/images/kevin-olson-scbhbyokiqe-unsplash.webp" alt="Surfer carrying a surfboard along the Sri Lankan coast" width={940} height={700} />
            </div>
            <div className="photo-caption">A MOMENT ON THE COAST</div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#f1f1e9' }}>
        <div className="container">
          <SectionHeader eyebrow="THE ART OF EXPLORATION" title="Journeys worth taking slowly." description="A few thoughtful starting points. Every itinerary is yours to shape." href="/tours" linkText="View all journeys" />
          <div className="journey-grid featured">
            {tours.slice(0, 3).map((tour, i) => <TourCard key={tour.slug} tour={tour} first={i === 0} />)}
          </div>
          <div style={{ marginTop: 42, textAlign: 'center' }}>
            <Link className="text-link" href="/tours" style={{ fontSize: '.88rem' }}>
              View all journeys <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <CuriosityPlanner />

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="AN ISLAND OF CONTRASTS" title="Find your kind of extraordinary." description="From age-old monuments to wave-washed shores — so much is waiting to be discovered." href="/destinations" linkText="Explore destinations" />
          <div className="mosaic">
            {featuredDest.map(d => <DestinationCard key={d.slug} destination={d} />)}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <SectionHeader eyebrow="MOMENTS TO REMEMBER" title="Feel the island, not just see it." description="The places matter. The experiences stay with you." href="/experiences" linkText="All experiences" />
        </div>
        {experiences.slice(0, 2).map((e, i) => (
          <div className="experience-feature" key={e.slug}>
            <div className="exp-image">
              <Image src={e.image} alt={e.name} width={1060} height={720} />
            </div>
            <div className="exp-copy">
              <Eyebrow>EXPERIENCE {String(i + 1).padStart(2, '0')}</Eyebrow>
              <h2 className="forest">{e.name}</h2>
              <p className="lead">{e.description}</p>
              <div style={{ marginTop: 22 }}>
                <Link className="text-link" href={`/experiences/${e.slug}`}>Discover this experience <ArrowRight size={15} /></Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="MADE FOR YOUR MOOD" title="Travel your way." description="However you love to explore, we'll help you find the right rhythm." href="/travel-styles" linkText="All travel styles" />
          <div className="style-grid">
            {travelStyles.slice(1, 7).map(s => <StyleCard style={s} key={s.slug} />)}
          </div>
        </div>
      </section>

      <WhyChooseUs />

      <section className="section">
        <div className="container editorial-grid reverse">
          <div className="editorial-photo editorial-photo-tall">
            <Image src="/images/tom-paisley-v2zeizifb44-unsplash.webp" alt="Elephant in its natural Sri Lankan habitat" width={960} height={850} />
          </div>
          <div>
            <Eyebrow>TRAVEL WITH PURPOSE</Eyebrow>
            <h2 className="forest">A deeper way to discover.</h2>
            <div className="divider-gold" />
            <p className="lead">The most meaningful journeys leave room for respect and curiosity.</p>
            <p>We believe in slowing down, learning from local communities, and viewing wildlife with the space and care it deserves. Our approach is an intention reflected in the journeys we plan — not a claim of certification.</p>
            <Link href="/about#responsible" className="text-link">Our travel philosophy <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#f0f1eb' }}>
        <div className="container">
          <SectionHeader eyebrow="NOTES FROM THE ISLAND" title="From our travel journal." description="Inspiration, ideas and practical notes for your next adventure." href="/blog" linkText="All travel stories" />
          <div className="blog-grid">
            {articles.slice(0, 3).map(a => <BlogCard article={a} key={a.slug} />)}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}


import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { destinations, destinationBySlug, tours } from '@/lib/data';
import { PageHero, Crumbs, Eyebrow, TourCard, ContactCTA } from '@/components/UI';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return destinations.map(d => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const d = destinationBySlug(slug);
  if (!d) return { title: 'Destination Not Found | CEYVORIA TOURS' };

  const title = `${d.displayName} Travel Guide & Highlights | CEYVORIA TOURS`;
  const description = `${d.description} Plan your private visit to ${d.name}, ${d.location}. Top activities, best travel tips, and tailor-made tours by CEYVORIA TOURS.`;

  return {
    title,
    description,
    keywords: [
      `${d.name} Sri Lanka`,
      `${d.displayName} travel guide`,
      `${d.name} tours`,
      `things to do in ${d.name}`,
      `${d.location} attractions`,
      ...d.activities,
    ],
    alternates: {
      canonical: `/destinations/${d.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/destinations/${d.slug}`,
      type: 'website',
      images: [
        {
          url: d.image,
          width: 1200,
          height: 630,
          alt: `${d.displayName} - CEYVORIA TOURS Sri Lanka`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [d.image],
    },
  };
}

export default async function DestinationDetail({ params }: Props) {
  const { slug } = await params;
  const d = destinationBySlug(slug);
  if (!d) notFound();

  const related = tours.filter(t => t.route.includes(slug)).slice(0, 3);
  const suggestions = destinations.filter(x => x.region === d.region && x.slug !== slug).slice(0, 3);

  const destinationSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: d.displayName,
    description: d.description,
    image: d.image,
    address: {
      '@type': 'PostalAddress',
      addressLocality: d.location,
      addressCountry: 'LK',
    },
    touristType: ['Cultural', 'Sightseeing', 'Nature', 'Photography'],
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://ceyvoriatours.com'}/destinations/${d.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(destinationSchema),
        }}
      />
      <PageHero title={d.displayName} description={d.description} image={d.image} kicker={d.region.toUpperCase()} />
      <div className="container">
        <Crumbs
          items={[
            { label: 'Destinations', href: '/destinations' },
            { label: d.name, href: '/destinations/' + d.slug },
          ]}
        />
      </div>
      <section className="section" style={{ paddingTop: 35 }}>
        <div className="container editorial-grid">
          <div>
            <Eyebrow>DISCOVER {d.location.toUpperCase()}</Eyebrow>
            <h2 className="forest">{d.name}</h2>
            <p className="lead">{d.description}</p>
            <div className="divider-gold" />
            <h3 className="forest">Experiences to savour.</h3>
            <ul className="bullet-check">
              {d.activities.map(a => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <div className="info-panel" style={{ marginTop: 25 }}>
              <strong>Planning note</strong>
              <p style={{ margin: '7px 0 0' }}>{d.notes}</p>
              <p style={{ fontSize: '.7rem', margin: '10px 0 0' }}>
                Opening hours, weather, fees and access can change. Confirm locally before travelling.
              </p>
            </div>
          </div>
          <div className="editorial-photo editorial-photo-tall">
            <Image src={d.image} alt={d.name} width={920} height={880} />
          </div>
        </div>
      </section>
      {related.length > 0 && (
        <section className="section" style={{ background: '#f0f2ec' }}>
          <div className="container">
            <Eyebrow>EXPLORE THE REGION</Eyebrow>
            <h2 className="forest">Journeys that pass this way.</h2>
            <div className="journey-grid">
              {related.map(t => (
                <TourCard key={t.slug} tour={t} />
              ))}
            </div>
          </div>
        </section>
      )}
      <section className="section">
        <div className="container">
          <Eyebrow>KEEP DISCOVERING</Eyebrow>
          <h2 className="forest">Nearby in spirit.</h2>
          <div className="cards-grid">
            {suggestions.map(x => (
              <Link className="journey-card" key={x.slug} href={'/destinations/' + x.slug}>
                <Image
                  src={x.image}
                  alt={x.name}
                  width={650}
                  height={430}
                  style={{ width: '100%', height: 240, objectFit: 'cover' }}
                />
                <h3 className="forest" style={{ marginTop: 18 }}>
                  {x.displayName} →
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}

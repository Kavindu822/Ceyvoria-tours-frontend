import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { travelStyles, styleBySlug, tours } from '@/lib/data';
import { PageHero, Crumbs, Eyebrow, TourCard, ContactCTA } from '@/components/UI';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return travelStyles.map(x => ({ slug: x.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const x = styleBySlug(slug);
  if (!x) return { title: 'Travel Style Not Found | CEYVORIA TOURS' };

  const title = `${x.name} Tours in Sri Lanka | Private Journeys | CEYVORIA TOURS`;

  return {
    title,
    description: `${x.description} Explore custom ${x.name.toLowerCase()} itineraries crafted exclusively around you by CEYVORIA TOURS.`,
    keywords: [
      `${x.name} tours Sri Lanka`,
      `${x.name.toLowerCase()} holiday Sri Lanka`,
      'tailor made travel Sri Lanka',
      'private chauffeur tours',
    ],
    alternates: {
      canonical: `/travel-styles/${x.slug}`,
    },
    openGraph: {
      title,
      description: x.description,
      url: `/travel-styles/${x.slug}`,
      type: 'website',
      images: [
        {
          url: x.image,
          width: 1200,
          height: 630,
          alt: `${x.name} Sri Lanka Journeys`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: x.description,
      images: [x.image],
    },
  };
}

export default async function StyleDetail({ params }: Props) {
  const { slug } = await params;
  const x = styleBySlug(slug);
  if (!x) notFound();

  const matches = tours.filter(t => t.style === x.name);
  const shown = matches.length ? matches : tours.slice(0, 3);

  return (
    <>
      <PageHero title={`${x.name} journeys.`} description={x.description} image={x.image} kicker="CHOOSE YOUR PACE" />
      <div className="container">
        <Crumbs
          items={[
            { label: 'Travel styles', href: '/travel-styles' },
            { label: x.name, href: '/travel-styles/' + slug },
          ]}
        />
      </div>
      <section className="section">
        <div className="container">
          <Eyebrow>CRAFTED AROUND YOU</Eyebrow>
          <h2 className="forest">Room for your kind of adventure.</h2>
          <p className="lead" style={{ maxWidth: 660 }}>
            {x.description} Use this collection as a starting point, and we can customise the pace and places together.
          </p>
          <h3 className="forest" style={{ marginTop: 55 }}>
            Journeys to inspire
          </h3>
          <div className="journey-grid">
            {shown.map(t => (
              <TourCard key={t.slug} tour={t} />
            ))}
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}

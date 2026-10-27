import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles, articleBySlug } from '@/lib/data';
import { PageHero, Crumbs, Eyebrow, BlogCard, ContactCTA } from '@/components/UI';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map(x => ({ slug: x.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = articleBySlug(slug);
  if (!a) return { title: 'Article Not Found | CEYVORIA TOURS' };

  const title = `${a.title} | Sri Lanka Travel Guide | CEYVORIA TOURS`;

  return {
    title,
    description: a.excerpt,
    keywords: [
      a.title,
      'Sri Lanka travel guide',
      'Sri Lanka travel tips',
      a.category,
      'Ceylon tourism',
    ],
    alternates: {
      canonical: `/blog/${a.slug}`,
    },
    openGraph: {
      title,
      description: a.excerpt,
      url: `/blog/${a.slug}`,
      type: 'article',
      images: [
        {
          url: a.image,
          width: 1200,
          height: 630,
          alt: a.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: a.excerpt,
      images: [a.image],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const a = articleBySlug(slug);
  if (!a) notFound();

  const others = articles.filter(x => x.slug !== slug).slice(0, 3);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: a.title,
    description: a.excerpt,
    image: a.image,
    author: {
      '@type': 'Organization',
      name: 'CEYVORIA TOURS',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ceyvoria.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'CEYVORIA TOURS',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://ceyvoria.com'}/icon-512.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://ceyvoria.com'}/blog/${a.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      <PageHero title={a.title} description={a.excerpt} image={a.image} kicker={a.category.toUpperCase()} />
      <div className="container">
        <Crumbs
          items={[
            { label: 'Travel guide', href: '/blog' },
            { label: a.title, href: '/blog/' + slug },
          ]}
        />
      </div>
      <section className="section">
        <div className="copy-body">
          <Eyebrow>FROM OUR TRAVEL JOURNAL</Eyebrow>
          <h2 className="forest">{a.title}</h2>
          <p className="lead">{a.excerpt}</p>
          <div className="divider-gold" />
          <p>{a.content}</p>
          <p>
            This journal entry is a short introduction rather than a complete travel advisory. Please confirm current
            travel requirements and conditions through official sources when planning your journey.
          </p>
          <div className="info-panel">
            <strong>Thinking about a journey?</strong>
            <p>We can help bring your favourite places and experiences together.</p>
            <Link className="text-link" href="/plan-your-trip">
              Plan My Journey →
            </Link>
          </div>
        </div>
      </section>
      <section className="section" style={{ background: '#f0f1ea' }}>
        <div className="container">
          <Eyebrow>READ NEXT</Eyebrow>
          <h2 className="forest">More from our journal.</h2>
          <div className="blog-grid">
            {others.map(v => (
              <BlogCard article={v} key={v.slug} />
            ))}
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}

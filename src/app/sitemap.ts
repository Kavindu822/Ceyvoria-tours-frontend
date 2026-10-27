import type { MetadataRoute } from 'next';
import { destinations, tours, experiences, travelStyles, articles } from '@/lib/data';
import { urlFor } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const coreRoutes = [
    { path: '', changeFrequency: 'daily' as const, priority: 1.0 },
    { path: '/tours', changeFrequency: 'daily' as const, priority: 0.95 },
    { path: '/destinations', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/plan-your-trip', changeFrequency: 'weekly' as const, priority: 0.85 },
    { path: '/contact', changeFrequency: 'weekly' as const, priority: 0.85 },
    { path: '/experiences', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/travel-styles', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/about', changeFrequency: 'monthly' as const, priority: 0.75 },
    { path: '/blog', changeFrequency: 'weekly' as const, priority: 0.75 },
    { path: '/reviews', changeFrequency: 'weekly' as const, priority: 0.7 },
    { path: '/faq', changeFrequency: 'monthly' as const, priority: 0.65 },
    { path: '/privacy-policy', changeFrequency: 'yearly' as const, priority: 0.3 },
    { path: '/terms', changeFrequency: 'yearly' as const, priority: 0.3 },
    { path: '/cookie-policy', changeFrequency: 'yearly' as const, priority: 0.3 },
    { path: '/refund-policy', changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  return [
    ...coreRoutes.map(r => ({
      url: urlFor(r.path || '/'),
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...tours.map(v => ({
      url: urlFor(`/tours/${v.slug}`),
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    ...destinations.map(v => ({
      url: urlFor(`/destinations/${v.slug}`),
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
    ...experiences.map(v => ({
      url: urlFor(`/experiences/${v.slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
    ...travelStyles.map(v => ({
      url: urlFor(`/travel-styles/${v.slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
    ...articles.map(v => ({
      url: urlFor(`/blog/${v.slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}

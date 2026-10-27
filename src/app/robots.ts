import type { MetadataRoute } from 'next';
import { urlFor } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/account/', '/booking/', '/api/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/account/', '/booking/', '/api/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin/', '/account/', '/booking/', '/api/'],
      },
    ],
    sitemap: urlFor('/sitemap.xml'),
    host: process.env.NEXT_PUBLIC_SITE_URL || 'https://ceyvoriatours.com',
  };
}

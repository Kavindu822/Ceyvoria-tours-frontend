import type {MetadataRoute} from 'next';
import {destinations,tours,experiences,travelStyles,articles} from '@/lib/data';
import {urlFor} from '@/lib/site';
export default function sitemap():MetadataRoute.Sitemap{
 const routes=['','/tours','/destinations','/experiences','/travel-styles','/about','/plan-your-trip','/contact','/blog','/faq','/privacy-policy','/terms','/cookie-policy','/refund-policy'];
 return [...routes.map(r=>({url:urlFor(r||'/'),changeFrequency:'weekly' as const})),
 ...tours.map(v=>({url:urlFor(`/tours/${v.slug}`),changeFrequency:'monthly' as const})),
 ...destinations.map(v=>({url:urlFor(`/destinations/${v.slug}`),changeFrequency:'monthly' as const})),
 ...experiences.map(v=>({url:urlFor(`/experiences/${v.slug}`),changeFrequency:'monthly' as const})),
 ...travelStyles.map(v=>({url:urlFor(`/travel-styles/${v.slug}`),changeFrequency:'monthly' as const})),
 ...articles.map(v=>({url:urlFor(`/blog/${v.slug}`),changeFrequency:'monthly' as const}))];
}

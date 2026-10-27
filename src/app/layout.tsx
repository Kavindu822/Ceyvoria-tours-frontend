import type { Metadata, Viewport } from 'next';
import '@/app/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import { LanguageProvider } from '@/context/LanguageContext';
import { ActiveLanguageFloatingPill } from '@/components/LanguageSelector';
import { site } from '@/lib/site';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ceyvoriatours.com';

export const viewport: Viewport = {
  themeColor: '#052E27',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'CEYVORIA TOURS | Luxury Private Sri Lanka Tours & Tailor-Made Journeys',
    template: '%s | CEYVORIA TOURS',
  },
  description:
    'Experience Sri Lanka with CEYVORIA TOURS. Private, tailor-made luxury holidays featuring dedicated chauffeur-guides, Sigiriya rock citadel, scenic tea country trains, Yala leopard safaris, and tropical beach retreats.',
  applicationName: 'CEYVORIA TOURS',
  authors: [{ name: 'CEYVORIA TOURS', url: siteUrl }],
  generator: 'Next.js',
  keywords: [
    'Sri Lanka tours',
    'private tours Sri Lanka',
    'luxury Sri Lanka holidays',
    'tailor made journeys Sri Lanka',
    'Sri Lanka travel packages',
    'Sri Lanka tour operator',
    'Sri Lanka chauffeur guide',
    'private driver Sri Lanka',
    'Sigiriya rock fortress tour',
    'Mirissa whale watching',
    'Yala safari private tour',
    'Ella scenic train journey',
    'Galle Fort private walking tour',
    'custom Sri Lanka vacation',
    'Sri Lanka honeymoon tour packages',
    'family tours Sri Lanka',
    'luxury boutique villas Sri Lanka',
    'Ceylon bespoke travel',
    'Disna Family House Mirissa',
  ],
  creator: 'CEYVORIA TOURS',
  publisher: 'CEYVORIA TOURS',
  category: 'Travel & Tourism',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
      'en-GB': '/',
      'de-DE': '/',
      'fr-FR': '/',
      'it-IT': '/',
      'ru-RU': '/',
      'zh-CN': '/',
      'es-ES': '/',
      'ja-JP': '/',
      'ar-AE': '/',
      'x-default': '/',
    },
  },
  openGraph: {
    title: 'CEYVORIA TOURS | Luxury Private Sri Lanka Tours & Tailor-Made Journeys',
    description:
      'Private, tailor-made journeys through Sri Lanka’s most extraordinary places. Dedicated chauffeur-guides, bespoke luxury villas, wildlife safaris & 24/7 concierge.',
    url: siteUrl,
    siteName: 'CEYVORIA TOURS',
    locale: 'en_US',
    alternateLocale: ['en_GB', 'de_DE', 'fr_FR', 'it_IT', 'ru_RU', 'zh_CN', 'es_ES', 'ja_JP'],
    type: 'website',
    images: [
      {
        url: '/images/sander-traa-bfdshihd5y4-unsplash.webp',
        width: 1200,
        height: 630,
        alt: 'CEYVORIA TOURS - Luxury Tailor-Made Journeys in Sri Lanka',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CEYVORIA TOURS | Luxury Private Sri Lanka Tours',
    description:
      'Private, tailor-made journeys through Sri Lanka’s most extraordinary places. Dedicated chauffeur-guides, boutique villas & 24/7 concierge.',
    images: ['/images/sander-traa-bfdshihd5y4-unsplash.webp'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || undefined,
    yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION || undefined,
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || '',
    },
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'CEYVORIA TOURS',
      description: 'Discover Sri Lanka, Beautifully. Private, tailor-made luxury journeys.',
      publisher: {
        '@id': `${siteUrl}/#organization`,
      },
      inLanguage: ['en-US', 'de-DE', 'fr-FR', 'it-IT', 'ru-RU', 'zh-CN'],
    },
    {
      '@type': 'TravelAgency',
      '@id': `${siteUrl}/#organization`,
      name: site.name,
      legalName: 'Ceyvoria Tours (Pvt) Ltd',
      url: siteUrl,
      logo: `${siteUrl}/icon-512.png`,
      image: `${siteUrl}/images/sander-traa-bfdshihd5y4-unsplash.webp`,
      description: site.subtitle,
      telephone: site.phoneRaw,
      email: site.email,
      priceRange: '$$$',
      currenciesAccepted: 'USD, EUR, GBP, AUD, LKR',
      paymentAccepted: 'Credit Card, Debit Card, Visa, Mastercard, Bank Transfer',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Indasara Mawatha',
        addressLocality: 'Mirissa',
        addressRegion: 'Southern Province',
        addressCountry: 'LK',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: site.coordinates.lat,
        longitude: site.coordinates.lng,
      },
      hasMap: site.googleMapsUrl,
      areaServed: [
        { '@type': 'Country', name: 'Sri Lanka' },
        { '@type': 'Country', name: 'United States' },
        { '@type': 'Country', name: 'United Kingdom' },
        { '@type': 'Country', name: 'Germany' },
        { '@type': 'Country', name: 'France' },
        { '@type': 'Country', name: 'Australia' },
        { '@type': 'Country', name: 'Canada' },
      ],
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          opens: '00:00',
          closes: '23:59',
        },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '128',
        bestRating: '5',
        worstRating: '1',
      },
      sameAs: [
        site.whatsappUrl,
        site.tripadvisor || 'https://www.tripadvisor.com',
      ].filter(Boolean),
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body>
        <LanguageProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CookieConsent />
          <ActiveLanguageFloatingPill />
        </LanguageProvider>
      </body>
    </html>
  );
}

import type{Metadata}from'next';import TripWizard from '@/components/TripWizard';import {PageHero} from '@/components/UI';
export const metadata: Metadata = {
  title: 'Plan Your Custom Sri Lanka Trip | Private Journey Designer | CEYVORIA TOURS',
  description:
    'Design your dream Sri Lanka vacation in minutes. Select your travel dates, preferred destinations, travel style, and party size for a 100% custom itinerary with private chauffeur-guide.',
  keywords: [
    'plan Sri Lanka trip',
    'custom Sri Lanka itinerary',
    'Sri Lanka trip planner',
    'tailor made Sri Lanka holiday',
    'private Sri Lanka journey',
  ],
  alternates: {
    canonical: '/plan-your-trip',
  },
  openGraph: {
    title: 'Plan Your Custom Sri Lanka Trip | CEYVORIA TOURS',
    description:
      'Design your tailor-made Sri Lanka vacation with dedicated chauffeur-guides, boutique hotels, and personalized routing.',
    url: '/plan-your-trip',
    images: [
      {
        url: '/images/hendrik-cornelissen-jptt-sau034-unsplash.webp',
        width: 1200,
        height: 630,
        alt: 'Plan Your Journey with CEYVORIA TOURS',
      },
    ],
  },
};
export default function Plan(){return <><PageHero title="Tell us your story." description="Tell us a little about your plans. We'll shape the next conversation around you." image="/images/hendrik-cornelissen-jptt-sau034-unsplash.webp" kicker="PERSONAL TRAVEL PLANNING"/><section className="section"><div className="container"><TripWizard/></div></section></>}

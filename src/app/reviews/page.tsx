import type{Metadata}from'next';import Link from'next/link';import{PageHero,EmptyState}from'@/components/UI';
export const metadata: Metadata = {
  title: 'Guest Reviews & Travel Testimonials | CEYVORIA TOURS',
  description:
    'Read genuine feedback and stories from international guests who explored Sri Lanka with CEYVORIA TOURS private journeys.',
  alternates: {
    canonical: '/reviews',
  },
  openGraph: {
    title: 'Guest Reviews & Travel Testimonials | CEYVORIA TOURS',
    description:
      'Authentic stories and experiences from guests who travelled Sri Lanka with our private chauffeur-guides.',
    url: '/reviews',
  },
};
export default function Reviews(){return <><PageHero title="Stories from our guests." description="Real experiences, in their own words." image="/images/andrei-alekseev-vvltlbkjmwq-unsplash.webp" kicker="GUEST PERSPECTIVES"/><section className="section"><div className="container narrow"><EmptyState title="Guest stories are coming." description="We only publish authentic, approved reviews with permission. No reviews have been added yet."/><div style={{marginTop:35,textAlign:'center'}}><Link href="/plan-your-trip" className="btn">Plan My Journey</Link></div></div></section></>}

import type{Metadata}from'next';import Image from'next/image';import{PageHero,Eyebrow,ButtonLink,ContactCTA}from'@/components/UI';
export const metadata: Metadata = {
  title: 'About CEYVORIA TOURS | Bespoke Private Sri Lanka Travel Designers',
  description:
    'Learn about CEYVORIA TOURS — a dedicated Sri Lankan private journey specialist based in Mirissa. Dedicated chauffeur-guides, thoughtful itineraries, and authentic island discovery.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About CEYVORIA TOURS | Bespoke Private Sri Lanka Travel Designers',
    description:
      'Learn about CEYVORIA TOURS — a dedicated Sri Lankan private journey specialist based in Mirissa. Dedicated chauffeur-guides, thoughtful itineraries, and authentic island discovery.',
    url: '/about',
    images: [
      {
        url: '/images/andrei-alekseev-vvltlbkjmwq-unsplash.webp',
        width: 1200,
        height: 630,
        alt: 'About CEYVORIA TOURS',
      },
    ],
  },
};
export default function About(){return <><PageHero title="Travel, more personally." description="A thoughtful approach to discovering the island we call home." image="/images/andrei-alekseev-vvltlbkjmwq-unsplash.webp" kicker="THE CEYVORIA STORY"/><section className="section"><div className="container editorial-grid"><div><Eyebrow>OUR PHILOSOPHY</Eyebrow><h2 className="forest">Not just a holiday. Your island story.</h2><div className="divider-gold"/><p className="lead">CEYVORIA TOURS creates tailor-made journeys across Sri Lanka, bringing together breathtaking landscapes, rich culture, wildlife and meaningful local experiences.</p><p>We believe a beautiful journey is one that makes space for discovery — and for the interests, needs and preferences of each traveller. Our planning approach begins with a conversation.</p><ButtonLink href="/plan-your-trip">Plan My Journey</ButtonLink></div><div><div className="editorial-photo"><Image src="/images/mirissa-beach-sri-lanka.webp" alt="Coastal palm headland and turquoise waters of southern Sri Lanka" width={940} height={700}/></div><div className="photo-caption">COASTAL PALMS AT GOLDEN HOUR</div></div></div></section><section className="section" style={{background:'#edefe8'}} id="responsible"><div className="container editorial-grid reverse"><div className="editorial-photo"><Image src="/images/tissamaharama.webp" alt="Wild elephants near a Sri Lankan landscape" width={900} height={660}/></div><div><Eyebrow>RESPECT THE PLACE</Eyebrow><h2 className="forest">Travel with curiosity and care.</h2><p className="lead">A meaningful visit asks us to listen, observe and leave space for the world around us.</p><p>Our aim is to encourage respectful cultural visits, responsible wildlife viewing and thoughtful choices that support local communities. We do not claim certification or impact figures.</p><ButtonLink href="/experiences" variant="outline">Explore experiences</ButtonLink></div></div></section><ContactCTA/></>}

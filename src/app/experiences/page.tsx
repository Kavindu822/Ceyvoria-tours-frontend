import type{Metadata}from'next';import Image from 'next/image';import Link from 'next/link';import{ArrowRight}from'lucide-react';import {experiences}from'@/lib/data';import{PageHero,Eyebrow,ContactCTA}from'@/components/UI';
export const metadata: Metadata = {
  title: 'Authentic Sri Lanka Travel Experiences & Encounters | CEYVORIA TOURS',
  description:
    'Immerse yourself in authentic Sri Lankan travel experiences: Ceylon tea tastings, blue whale watching in Mirissa, Sigiriya village walks, spice gardens, and wild elephant safaris.',
  keywords: [
    'Sri Lanka experiences',
    'things to do in Sri Lanka',
    'whale watching Mirissa',
    'tea plantation tour',
    'Yala leopard safari',
    'Sri Lanka culinary tour',
  ],
  alternates: {
    canonical: '/experiences',
  },
  openGraph: {
    title: 'Authentic Sri Lanka Travel Experiences | CEYVORIA TOURS',
    description:
      'Immerse yourself in authentic Sri Lankan travel experiences with private chauffeur-guides and curated encounters.',
    url: '/experiences',
    images: [
      {
        url: '/images/adam-vandermeer-dw9dwtzzsue-unsplash.webp',
        width: 1200,
        height: 630,
        alt: 'Sri Lanka Travel Experiences - CEYVORIA TOURS',
      },
    ],
  },
};
export default function Experiences(){return <><PageHero title="The moments in between." description="Thoughtful encounters with the landscapes, traditions and flavours of Sri Lanka." image="/images/adam-vandermeer-dw9dwtzzsue-unsplash.webp" kicker="UNIQUELY SRI LANKAN"/><section className="section"><div className="container"><div className="section-intro" style={{marginBottom:50}}><Eyebrow>YOUR ISLAND, YOUR EXPERIENCE</Eyebrow><h2 className="forest">Feel the island, not just see it.</h2><p>Real moments become the stories we carry home. Discover experiences to weave into your tailor-made journey.</p></div>{experiences.map((e,i)=><article key={e.slug} className="editorial-grid" style={{marginBottom:70}}><div style={{order:i%2===0?0:2}} className="editorial-photo"><Image src={e.image} alt={e.name} width={860} height={600}/></div><div style={{padding:'0 5%'}}><Eyebrow>{e.category} · {String(i+1).padStart(2,'0')}</Eyebrow><h2 className="forest">{e.name}</h2><p className="lead">{e.description}</p><Link className="text-link" href={`/experiences/${e.slug}`}>Explore experience <ArrowRight size={15}/></Link></div></article>)}</div></section><ContactCTA/></>}

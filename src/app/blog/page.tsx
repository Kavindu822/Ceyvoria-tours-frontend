import type{Metadata}from'next';import{articles}from'@/lib/data';import{PageHero,BlogCard,ContactCTA,Eyebrow}from'@/components/UI';
export const metadata: Metadata = {
  title: 'Sri Lanka Travel Journal & Insider Guide | CEYVORIA TOURS',
  description:
    'Expert travel advice, seasonal insights, cultural etiquette, and hidden gems across Sri Lanka from our on-ground journey specialists.',
  keywords: [
    'Sri Lanka travel blog',
    'Sri Lanka travel tips',
    'best time to visit Sri Lanka',
    'Sri Lanka travel guide',
    'Ceylon travel journal',
  ],
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Sri Lanka Travel Journal & Insider Guide | CEYVORIA TOURS',
    description:
      'Expert travel notes, local perspectives, and inspiration for your private Sri Lanka holiday.',
    url: '/blog',
    images: [
      {
        url: '/images/anton-lecock-vwgvoihtfpu-unsplash.webp',
        width: 1200,
        height: 630,
        alt: 'CEYVORIA TOURS Travel Journal',
      },
    ],
  },
};
export default function Blog(){return <><PageHero title="From our journal." description="Useful travel notes, local perspectives and ideas for the road ahead." image="/images/anton-lecock-vwgvoihtfpu-unsplash.webp" kicker="CEYVORIA TRAVEL GUIDE"/><section className="section"><div className="container"><Eyebrow>THE STORIES WE LOVE</Eyebrow><h2 className="forest" style={{marginBottom:30}}>A little inspiration.</h2><div className="blog-grid">{articles.map(a=><BlogCard article={a} key={a.slug}/>)}</div></div></section><ContactCTA/></>}

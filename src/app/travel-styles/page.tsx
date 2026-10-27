import type{Metadata}from'next';import{travelStyles}from'@/lib/data';import{PageHero,StyleCard,ContactCTA,Eyebrow}from'@/components/UI';
export const metadata: Metadata = {
  title: 'Sri Lanka Travel Styles & Holiday Themes | CEYVORIA TOURS',
  description:
    'Choose your travel rhythm: Heritage & Culture, Wildlife Safaris, Romantic Honeymoons, Family Adventures, Coastal Relaxation, and Active Exploration across Sri Lanka.',
  keywords: [
    'Sri Lanka travel styles',
    'Sri Lanka honeymoon',
    'Sri Lanka wildlife safari',
    'Sri Lanka family holiday',
    'cultural tours Sri Lanka',
    'Sri Lanka beach holiday',
  ],
  alternates: {
    canonical: '/travel-styles',
  },
  openGraph: {
    title: 'Sri Lanka Travel Styles & Holiday Themes | CEYVORIA TOURS',
    description:
      'Explore tailor-made holiday styles from romance and wildlife to culture and coastal retreats.',
    url: '/travel-styles',
    images: [
      {
        url: '/images/andrei-alekseev-vvltlbkjmwq-unsplash.webp',
        width: 1200,
        height: 630,
        alt: 'Sri Lanka Travel Styles - CEYVORIA TOURS',
      },
    ],
  },
};
export default function Styles(){return <><PageHero title="Travel your way." description="Every journey should be as distinctive as the people taking it." image="/images/andrei-alekseev-vvltlbkjmwq-unsplash.webp" kicker="YOUR JOURNEY, YOUR RHYTHM"/><section className="section"><div className="container"><Eyebrow>FIND YOUR KIND OF ADVENTURE</Eyebrow><h2 className="forest">How will you remember Sri Lanka?</h2><p className="lead" style={{maxWidth:610,marginBottom:36}}>Culture, wildlife, romance, adventure or quiet space to unwind — begin with what inspires you.</p><div className="style-grid">{travelStyles.map(s=><StyleCard style={s} key={s.slug}/>)}</div></div></section><ContactCTA/></>}

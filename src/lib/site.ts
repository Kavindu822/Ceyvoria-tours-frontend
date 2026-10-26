export const site = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'CEYVORIA TOURS',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Discover the Soul of Sri Lanka',
  headline: process.env.NEXT_PUBLIC_SITE_HEADLINE || 'Discover Sri Lanka, Beautifully.',
  subtitle: process.env.NEXT_PUBLIC_SITE_SUBTITLE || 'Private, tailor-made journeys through Sri Lanka’s most extraordinary places.',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'ceyvoriatours@gmail.com',
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+94 76 781 0420',
  phoneRaw: process.env.NEXT_PUBLIC_CONTACT_PHONE_RAW || '+94767810420',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '+94 76 781 0420',
  whatsappRaw: process.env.NEXT_PUBLIC_WHATSAPP_RAW || '94767810420',
  whatsappUrl: process.env.NEXT_PUBLIC_WHATSAPP_URL || 'https://wa.me/94767810420',
  location: process.env.NEXT_PUBLIC_LOCATION || 'Colombo, Sri Lanka',
  address: process.env.NEXT_PUBLIC_ADDRESS || 'No. 28/4, Alfred Place, Colombo 03, Sri Lanka',
  islandwide: 'Concierge specialists stationed across Colombo, Kandy, Ella, Galle & Yala',
  hours: 'Available 24/7 · 365 Days a Year',
  tripadvisor: process.env.NEXT_PUBLIC_TRIPADVISOR_URL || '',
};

export const urlFor = (path: string) =>
  `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}${path}`;

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
  location: process.env.NEXT_PUBLIC_LOCATION || 'Mirissa, Sri Lanka',
  address: process.env.NEXT_PUBLIC_ADDRESS || 'Indasara Mawatha, Mirissa, Sri Lanka',
  googleMapsUrl:
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ||
    'https://www.google.com/maps/place/Disna+Family+House/@5.9409864,80.4713934,17z/data=!3m1!4b1!4m9!3m8!1s0x3ae13f5bfff19dcf:0x5178d2fbc6cf630b!5m2!4m1!1i2!8m2!3d5.9409864!4d80.4713934!16s%2Fg%2F11h2g46b_c',
  googleMapsEmbedUrl:
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL ||
    'https://maps.google.com/maps?q=5.9409864,80.4713934&hl=en&z=17&output=embed',
  coordinates: {
    lat: 5.9409864,
    lng: 80.4713934,
  },
  islandwide: 'Concierge specialists stationed across Mirissa, Colombo, Galle, Kandy, Ella & Yala',
  hours: 'Available 24/7 · 365 Days a Year',
  tripadvisor: process.env.NEXT_PUBLIC_TRIPADVISOR_URL || '',
};

export const urlFor = (path: string) =>
  `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}${path}`;

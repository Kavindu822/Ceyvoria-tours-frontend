import Link from 'next/link';
import { ArrowUpRight, Mail, Phone, MessageCircle, MapPin } from 'lucide-react';
import Brand from './Brand';
import LanguageSelector from './LanguageSelector';
import { site } from '@/lib/site';

const groups = [
  [
    'Explore',
    [
      ['Our Tours', '/tours'],
      ['Destinations', '/destinations'],
      ['Experiences', '/experiences'],
      ['Travel Styles', '/travel-styles'],
    ],
  ],
  [
    'Plan',
    [
      ['Plan My Journey', '/plan-your-trip'],
      ['Pay Advance Deposit', '/pay-advance'],
      ['Our Approach', '/about'],
      ['FAQs', '/faq'],
      ['Contact', '/contact'],
    ],
  ],
  [
    'Discover',
    [
      ['About Us', '/about'],
      ['Travel Guide', '/blog'],
      ['Reviews', '/reviews'],
      ['Responsible Travel', '/about#responsible'],
    ],
  ],
  [
    'Legal',
    [
      ['Privacy Policy', '/privacy-policy'],
      ['Terms & Conditions', '/terms'],
      ['Cookie Policy', '/cookie-policy'],
      ['Cancellation Policy', '/refund-policy'],
    ],
  ],
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Brand />
            <p>Private, tailor-made journeys through Sri Lanka’s most extraordinary places.</p>
            <p
              style={{
                fontFamily: 'var(--display)',
                fontStyle: 'italic',
                fontSize: '1.32rem',
                color: '#d9c391',
              }}
            >
              Discover the Soul of Sri Lanka
            </p>
            <div className="notranslate" translate="no" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {site.email && (
                <a href={`mailto:${site.email}`}>
                  <Mail size={13} /> {site.email}
                </a>
              )}
              {site.phone && (
                <a href={`tel:${site.phoneRaw}`}>
                  <Phone size={13} /> {site.phone}
                </a>
              )}
              {site.whatsapp && (
                <a
                  href={site.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#6ee7b7' }}
                >
                  <MessageCircle size={13} /> WhatsApp: {site.whatsapp}
                </a>
              )}
              {site.address && (
                <a
                  href={site.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View on Google Maps"
                >
                  <MapPin size={13} /> {site.address}
                </a>
              )}
              {site.tripadvisor && (
                <a href={site.tripadvisor} target="_blank" rel="noopener noreferrer">
                  Our TripAdvisor profile <ArrowUpRight size={12} />
                </a>
              )}
            </div>
            <div style={{ marginTop: '20px' }}>
              <LanguageSelector mode="footer" />
            </div>
          </div>
          {groups.map(([heading, links]) => (
            <div key={heading as string}>
              <h4>{heading as string}</h4>
              {(links as string[][]).map(([name, url]) => (
                <Link key={url} href={url}>
                  {name}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} CEYVORIA TOURS. All rights reserved.</span>
          <span>Colombo & Islandwide Concierge · Sri Lanka</span>
        </div>
      </div>
    </footer>
  );
}


'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import Brand from './Brand';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '@/context/LanguageContext';

export default function Header() {
  const [scroll, setScroll] = useState(false);
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const { t } = useLanguage();

  const nav = [
    [t('home'), '/'],
    [t('tours'), '/tours'],
    [t('destinations'), '/destinations'],
    [t('experiences'), '/experiences'],
    [t('about'), '/about'],
    [t('blog'), '/blog'],
    [t('contact'), '/contact'],
  ];

  useEffect(() => {
    const fn = () => setScroll(window.scrollY > 48);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => setOpen(false), [path]);

  const transparent = path === '/' && !scroll && !open;

  return (
    <header className={`site-header ${transparent ? 'transparent' : 'solid'} ${open ? 'open' : ''}`}>
      <div className="container header-inner">
        <Brand />
        <nav className="nav" aria-label="Main navigation">
          {nav.map(([name, url]) => (
            <Link key={url} href={url} className={path === url ? 'active' : ''}>
              {name}
            </Link>
          ))}
          <LanguageSelector mode="header" />
          <Link className="btn btn-gold" href="/plan-your-trip">
            {t('planTrip')} <ArrowUpRight size={15} />
          </Link>
        </nav>
        <div className="mobile-header-actions">
          <div className="mobile-lang-btn-wrap">
            <LanguageSelector mode="header" />
          </div>
          <button
            className="mobile-menu-button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="mobile-menu" aria-label="Mobile navigation">
          {nav.map(([name, url]) => (
            <Link key={url} href={url}>
              {name}
            </Link>
          ))}
          <Link href="/travel-styles">{t('travelStyles')}</Link>
          <Link href="/faq">{t('faqs')}</Link>
          <Link className="btn btn-gold" href="/plan-your-trip">
            {t('planTrip')} <ArrowUpRight size={14} />
          </Link>
          <LanguageSelector mode="mobile" />
        </nav>
      )}
    </header>
  );
}


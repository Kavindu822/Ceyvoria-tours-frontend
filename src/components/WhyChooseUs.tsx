'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Plane,
  Car,
  Clock3,
  HeartHandshake,
  CheckCircle2,
  XCircle,
  Sparkles,
  MessageCircle,
  ArrowRight,
  ArrowUpRight,
  Award,
  Compass,
  Coffee,
  MapPin,
  Check,
} from 'lucide-react';
import { site } from '@/lib/site';

export default function WhyChooseUs() {
  const [activeTab, setActiveTab] = useState<'pillars' | 'comparison'>('pillars');

  const stats = [
    { value: '100%', label: 'Private & Tailor-Made', sub: 'Never shared with strangers' },
    { value: '4.9 ★', label: 'Guest Rating', sub: 'Verified luxury satisfaction' },
    { value: '24/7', label: 'Dedicated Concierge', sub: 'Always on call for your journey' },
    { value: '0 USD', label: 'Hidden Booking Fees', sub: 'Transparent itemized pricing' },
  ];

  const pillars = [
    {
      icon: Plane,
      badge: 'VIP ARRIVAL',
      title: 'VIP Airport Door-to-Door Reception',
      desc: 'Meet your personal chauffeur-guide the moment you step out of Bandaranaike International Airport (CMB) with fresh flower garlands (Ayubowan), chilled refreshments, luggage assistance, and express highway transit.',
    },
    {
      icon: Car,
      badge: 'PRIVATE FLEET',
      title: 'Dedicated Chauffeur & Luxury Vehicle',
      desc: 'Travel exclusively in modern, fully air-conditioned executive sedans, luxury SUVs, or high-roof passenger vans. Enjoy unlimited mileage, fuel, expressway tolls, driver accommodation, and vehicle sanitization included.',
    },
    {
      icon: Compass,
      badge: '100% FLEXIBILITY',
      title: 'Bespoke Pacing · The Schedule Bends to You',
      desc: 'Pause for photos when you spot roadside wild elephants, stop at scenic roadside king coconut stalls, linger longer over morning Ceylon tea, or add extra beach days whenever you wish.',
    },
    {
      icon: Award,
      badge: 'GOVERNMENT LICENSED',
      title: 'Expert English-Speaking Chauffeur-Guides',
      desc: 'Handpicked, SLTDA-certified driver-guides who act as your personal storytelling companion, cultural interpreter, and trusted island navigator from arrival to departure.',
    },
    {
      icon: ShieldCheck,
      badge: 'FINANCIAL INTEGRITY',
      title: 'Zero Booking Fees & Dialog Genie Gateway',
      desc: 'Receive transparent quotations in USD before you commit. Secure advance deposits are processed seamlessly online via Sri Lanka’s premier Dialog Genie gateway with major cards (Visa, Mastercard, AMEX).',
    },
    {
      icon: Sparkles,
      badge: 'HANDPICKED QUALITY',
      title: 'Curated Boutique Stays & Ethical Encounters',
      desc: 'From colonial tea planter bungalows and private beachfront villas to ethical open-top national park safaris with expert trackers who respect animal welfare and wildlife habitats.',
    },
  ];

  const comparison = [
    {
      feature: 'Travel Party & Vehicle',
      standard: 'Crowded 40-passenger bus packed with strangers on a rigid itinerary',
      ceyvoria: '100% private, luxury air-conditioned vehicle exclusively for you and your travel companions',
    },
    {
      feature: 'Daily Schedule & Pacing',
      standard: 'Strict 6:00 AM wake-up whistles, hurried gift shop stops, and rushed 15-minute photo breaks',
      ceyvoria: 'Relaxed, tailor-made pacing. Stop whenever you wish, sleep in, or linger longer at viewpoints',
    },
    {
      feature: 'Airport Meet & Greet',
      standard: 'Wait hours for group shuttle buses to fill up in the airport heat',
      ceyvoria: 'Dedicated chauffeur waiting at arrivals terminal with personal sign, Ayubowan garland, and direct departure',
    },
    {
      feature: 'Accommodation Selection',
      standard: 'Impersonal, generic mass-market tourist hotels far away from city centers',
      ceyvoria: 'Carefully vetted boutique villas, heritage colonial bungalows, and premium beachfront retreats',
    },
    {
      feature: 'Support & Assistance',
      standard: 'Automated email helpdesk with 48-hour response times',
      ceyvoria: 'Direct 24/7 dedicated WhatsApp & phone concierge supporting you throughout your entire journey',
    },
  ];

  const perks = [
    { icon: Coffee, text: 'Ayubowan floral welcome & King Coconut refresh' },
    { icon: MapPin, text: 'All expressway tolls, fuel & driver lodgings included' },
    { icon: MessageCircle, text: 'Direct 24/7 WhatsApp Concierge channel for your party' },
  ];

  return (
    <section className="why-choose-section" id="why-choose-us">
      <div className="container">
        {/* Section Header */}
        <div className="why-choose-header">
          <span className="why-kicker">
            <Sparkles size={14} className="gold" /> THE CEYVORIA DISTINCTION · WHY CHOOSE US
          </span>
          <h2 className="why-title">
            Crafted for you. Guided with grace. <br />
            <em className="why-title-italic">Never shared with strangers.</em>
          </h2>
          <p className="why-subtitle">
            We don’t believe in one-size-fits-all bus tours or rushed group schedules. CEYVORIA TOURS specializes
            exclusively in bespoke, private travel designed around your curiosity, paced to your rhythm, and
            supported around the clock by Sri Lankan hospitality specialists.
          </p>
        </div>

        {/* Stats Strip */}
        <div className="why-stats-grid">
          {stats.map((s, idx) => (
            <div className="why-stat-card" key={idx}>
              <strong className="why-stat-value">{s.value}</strong>
              <span className="why-stat-label">{s.label}</span>
              <small className="why-stat-sub">{s.sub}</small>
            </div>
          ))}
        </div>

        {/* Tab Toggle */}
        <div className="why-tabs-bar">
          <button
            type="button"
            className={`why-tab-btn ${activeTab === 'pillars' ? 'active' : ''}`}
            onClick={() => setActiveTab('pillars')}
          >
            <Award size={16} /> 6 Core Ceyvoria Guarantees
          </button>
          <button
            type="button"
            className={`why-tab-btn ${activeTab === 'comparison' ? 'active' : ''}`}
            onClick={() => setActiveTab('comparison')}
          >
            <Sparkles size={16} /> The Ceyvoria Difference vs Standard Tour
          </button>
        </div>

        {/* Tab 1: 6 Core Pillars */}
        {activeTab === 'pillars' && (
          <div className="why-pillars-grid">
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div className="why-pillar-card" key={idx}>
                  <div className="why-pillar-top">
                    <div className="why-pillar-icon-wrap">
                      <Icon size={24} className="why-pillar-icon" />
                    </div>
                    <span className="why-pillar-badge">{p.badge}</span>
                  </div>
                  <h3 className="why-pillar-title">{p.title}</h3>
                  <p className="why-pillar-desc">{p.desc}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Comparison Table */}
        {activeTab === 'comparison' && (
          <div className="why-comparison-shell">
            <div className="why-comparison-header-row">
              <div className="why-comp-col-feature">Journey Element</div>
              <div className="why-comp-col-standard">Standard Group Bus Tour</div>
              <div className="why-comp-col-ceyvoria">
                <span className="why-comp-gold-badge">✦ CEYVORIA TOURS (PRIVATE)</span>
              </div>
            </div>

            <div className="why-comparison-body">
              {comparison.map((c, idx) => (
                <div className="why-comparison-row" key={idx}>
                  <div className="why-comp-col-feature">
                    <strong>{c.feature}</strong>
                  </div>
                  <div className="why-comp-col-standard">
                    <div className="why-comp-icon-neg">
                      <XCircle size={16} color="#c25744" />
                      <span>{c.standard}</span>
                    </div>
                  </div>
                  <div className="why-comp-col-ceyvoria">
                    <div className="why-comp-icon-pos">
                      <CheckCircle2 size={16} color="#2e7d32" />
                      <span>{c.ceyvoria}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Complimentary Perks Banner */}
        <div className="why-perks-banner">
          <div className="why-perks-title">
            <span className="why-perks-badge">ALWAYS COMPLIMENTARY</span>
            <h4>Included as standard on every private journey:</h4>
          </div>
          <div className="why-perks-list">
            {perks.map((perk, i) => {
              const Icon = perk.icon;
              return (
                <div className="why-perk-item" key={i}>
                  <Icon size={16} className="why-perk-icon" />
                  <span>{perk.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Callout */}
        <div className="why-cta-box">
          <div>
            <h3 className="why-cta-heading">Ready to imagine your private Sri Lanka journey?</h3>
            <p className="why-cta-sub">
              Tell us your desired travel dates, party size, and curiosity. We’ll deliver a personalized,
              itemized quotation with zero obligation.
            </p>
          </div>
          <div className="why-cta-actions">
            <Link href="/plan-your-trip" className="btn btn-gold">
              Plan My Custom Trip <ArrowUpRight size={16} />
            </Link>
            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="why-wa-btn"
            >
              <MessageCircle size={16} color="#25D366" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

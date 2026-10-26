import { Suspense } from 'react';
import type { Metadata } from 'next';
import { PageHero, ContactCTA } from '@/components/UI';
import AdvancePaymentClient from '@/components/AdvancePaymentClient';

export const metadata: Metadata = {
  title: 'Pay Advance Deposit | Dialog Genie Payment Gateway | CEYVORIA TOURS',
  description:
    'Securely settle your tour quotation advance payment online using Dialog Genie Payment Gateway with Visa, Mastercard, AMEX, or eZ Cash.',
};

export default function PayAdvancePage() {
  return (
    <>
      <PageHero
        title="Secure Advance Payment."
        description="Pay your tour advance deposit securely through the Dialog Genie Payment Gateway with instant official confirmation."
        image="/images/sander-traa-bfdshihd5y4-unsplash.webp"
        kicker="DIALOG GENIE PAYMENT GATEWAY · CEYVORIA TOURS"
      />

      <section className="section" style={{ paddingTop: 50, paddingBottom: 80 }}>
        <div className="container">
          <Suspense fallback={<div className="empty"><h3>Loading payment portal...</h3></div>}>
            <AdvancePaymentClient />
          </Suspense>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}

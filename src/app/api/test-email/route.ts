import { NextResponse } from 'next/server';
import { sendInquiryNotification } from '@/lib/email';

export async function GET() {
  try {
    const testRef = `TEST-${Date.now().toString().slice(-4)}`;
    const result = await sendInquiryNotification({
      type: 'TourBooking',
      reference: testRef,
      guestName: 'Verified Domain Live Test',
      guestEmail: 'ceyvoriatours@gmail.com',
      guestPhone: '+94 76 781 0420',
      country: 'Sri Lanka (Test)',
      tourTitle: '10-Day Grand Ceylon Signature Journey (Live Test Verification)',
      travelDate: new Date().toISOString().slice(0, 10),
      partySize: 2,
      hotels: 'Yes, 5-Star Boutique Villas',
      mealPlan: 'Half Board',
      activities: ['Sigiriya Sunrise Climb', 'Scenic Tea Train', 'Yala Wildlife Safari'],
      specialRequests: 'This is an automatic diagnostic verification to confirm Resend delivery from bookings@ceyvoriatours.com to ceyvoriatours@gmail.com.',
    });

    return NextResponse.json({
      success: true,
      message: `Test email successfully dispatched to ceyvoriatours@gmail.com with Reference ${testRef}!`,
      provider: result.provider,
      sentTo: 'ceyvoriatours@gmail.com',
      senderConfigured: process.env.EMAIL_FROM || 'CEYVORIA TOURS <bookings@ceyvoriatours.com>',
      hasResendKey: Boolean(process.env.RESEND_API_KEY),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error sending test email';
    console.error('[/api/test-email Error]:', error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

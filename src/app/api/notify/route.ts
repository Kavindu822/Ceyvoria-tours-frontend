import { NextRequest, NextResponse } from 'next/server';
import { sendInquiryNotification, InquiryEmailPayload } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const rawBody: Partial<InquiryEmailPayload> = await req.json();

    const body: InquiryEmailPayload = {
      type: rawBody.type || 'ContactMessage',
      reference: rawBody.reference || `CEY-INQ-${Date.now().toString().slice(-6)}`,
      guestName: (rawBody.guestName || '').trim() || 'Valued Traveller',
      guestEmail: (rawBody.guestEmail || '').trim() || 'no-email-provided@ceyvoriatours.com',
      guestPhone: (rawBody.guestPhone || '').trim(),
      country: rawBody.country || 'International',
      tourTitle: rawBody.tourTitle,
      travelDate: rawBody.travelDate,
      partySize: rawBody.partySize,
      hotels: rawBody.hotels,
      mealPlan: rawBody.mealPlan,
      activities: rawBody.activities,
      specialRequests: rawBody.specialRequests,
      subject: rawBody.subject,
      message: rawBody.message,
      amount: rawBody.amount,
      currency: rawBody.currency,
    };

    const result = await sendInquiryNotification(body);

    return NextResponse.json({
      success: true,
      reference: body.reference,
      provider: result.provider,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to send notification';
    console.error('[/api/notify Error]:', error);
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

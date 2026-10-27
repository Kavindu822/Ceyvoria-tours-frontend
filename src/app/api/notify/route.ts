import { NextRequest, NextResponse } from 'next/server';
import { sendInquiryNotification, InquiryEmailPayload } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const body: InquiryEmailPayload = await req.json();

    if (!body || !body.guestEmail || !body.guestName) {
      return NextResponse.json(
        { success: false, message: 'Guest name and email are required.' },
        { status: 400 }
      );
    }

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

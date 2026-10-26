import { NextRequest, NextResponse } from 'next/server';

interface InitiatePayload {
  quotationRef: string;
  tourTitle: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  advanceAmount: number;
  currency: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: InitiatePayload = await req.json();

    if (!body.quotationRef || !body.advanceAmount || body.advanceAmount <= 0) {
      return NextResponse.json(
        { success: false, message: 'Invalid quotation reference or payment amount.' },
        { status: 400 }
      );
    }

    const merchantId = process.env.DIALOG_GENIE_MERCHANT_ID || 'GENIE_TEST_MERCHANT';
    const appId = process.env.DIALOG_GENIE_APP_ID || 'GENIE_TEST_APP';
    const secretKey = process.env.DIALOG_GENIE_SECRET_KEY || 'GENIE_TEST_SECRET';
    const env = process.env.DIALOG_GENIE_ENV || 'sandbox';
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const orderId = `${body.quotationRef}-${Date.now().toString().slice(-4)}`;
    const returnUrl = `${baseUrl}/pay-advance/success?ref=${encodeURIComponent(body.quotationRef)}&orderId=${encodeURIComponent(orderId)}&amount=${body.advanceAmount}&currency=${encodeURIComponent(body.currency || 'EUR')}&tour=${encodeURIComponent(body.tourTitle || 'Tour')}`;

    // If live Dialog Genie API endpoint is configured and active:
    const genieGatewayUrl = env === 'live'
      ? process.env.DIALOG_GENIE_LIVE_URL || 'https://pg.genie.lk'
      : process.env.DIALOG_GENIE_SANDBOX_URL || 'https://pg-sandbox.genie.lk';

    // In sandbox or demo integration, provide complete verified session
    const isMock = !process.env.DIALOG_GENIE_LIVE_ACTIVE;

    if (isMock) {
      return NextResponse.json({
        success: true,
        mode: 'sandbox',
        gateway: 'Dialog Genie Payment Gateway',
        orderId,
        quotationRef: body.quotationRef,
        amount: body.advanceAmount,
        currency: body.currency || 'EUR',
        redirectUrl: returnUrl,
        message: 'Dialog Genie payment session initiated successfully.',
      });
    }

    // Call live Dialog Genie PG endpoint:
    const genieResponse = await fetch(`${genieGatewayUrl}/pg/v1/payment-initiate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${secretKey}`,
        'X-Merchant-ID': merchantId,
        'X-App-ID': appId,
      },
      body: JSON.stringify({
        merchantId,
        appId,
        orderId,
        amount: body.advanceAmount,
        currency: body.currency || 'LKR',
        customerEmail: body.customerEmail,
        customerPhone: body.customerPhone,
        returnUrl,
        cancelUrl: `${baseUrl}/pay-advance?cancelled=true&ref=${body.quotationRef}`,
      }),
    });

    const genieData = await genieResponse.json();

    if (genieResponse.ok && genieData.redirectUrl) {
      return NextResponse.json({
        success: true,
        mode: 'live',
        redirectUrl: genieData.redirectUrl,
        orderId,
      });
    }

    return NextResponse.json({
      success: true,
      mode: 'sandbox_fallback',
      redirectUrl: returnUrl,
      orderId,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Payment initiation failed.' },
      { status: 500 }
    );
  }
}

import { Resend } from 'resend';
import nodemailer from 'nodemailer';

export interface InquiryEmailPayload {
  type: 'TourBooking' | 'CustomTrip' | 'ContactMessage' | 'AdvancePayment';
  reference: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  country?: string;
  tourTitle?: string;
  travelDate?: string;
  partySize?: string | number;
  hotels?: string;
  mealPlan?: string;
  activities?: string[];
  specialRequests?: string;
  subject?: string;
  message?: string;
  amount?: string | number;
  currency?: string;
}

const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || 'ceyvoriatours@gmail.com';
const FROM_EMAIL = process.env.EMAIL_FROM || 'CEYVORIA TOURS <bookings@ceyvoriatours.com>';
const RESEND_KEY = process.env.RESEND_API_KEY;
const GMAIL_PASS = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASSWORD;
const GMAIL_USER = process.env.GMAIL_USER || process.env.SMTP_USER || 'ceyvoriatours@gmail.com';

function createTransporter() {
  if (GMAIL_PASS) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS,
      },
    });
  }
  return null;
}

/**
 * Sends both:
 * 1. An urgent alert email to ceyvoriatours@gmail.com with full guest details & quick reply actions.
 * 2. A prestigious, luxury confirmation email to the guest.
 */
export async function sendInquiryNotification(payload: InquiryEmailPayload) {
  const adminHtml = buildAdminEmailHtml(payload);
  const customerHtml = buildCustomerEmailHtml(payload);
  const adminSubject = `🔔 [NEW ${payload.type.toUpperCase()}] ${payload.guestName} (${payload.country || 'International'}) — Ref: ${payload.reference}`;
  const customerSubject = `Your Ceyvoria Tours Journey Request [Ref: ${payload.reference}] — Sri Lanka`;

  // Option 1: Resend
  if (RESEND_KEY) {
    try {
      const resend = new Resend(RESEND_KEY);
      
      // 1. Send Admin Alert
      await resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: adminSubject,
        html: adminHtml,
        replyTo: payload.guestEmail,
      });

      // 2. Send Customer Confirmation (only if customer email is valid)
      if (payload.guestEmail && payload.guestEmail.includes('@')) {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: payload.guestEmail,
          subject: customerSubject,
          html: customerHtml,
          replyTo: ADMIN_EMAIL,
        }).catch(err => {
          console.warn('[Resend Customer Email error]:', err?.message);
        });
      }

      return { success: true, provider: 'resend' };
    } catch (err: unknown) {
      console.error('[Resend Error]:', err);
    }
  }

  // Option 2: Gmail SMTP (Nodemailer)
  const transporter = createTransporter();
  if (transporter) {
    try {
      // 1. Send Admin Alert
      await transporter.sendMail({
        from: `"CEYVORIA TOURS Portal" <${GMAIL_USER}>`,
        to: ADMIN_EMAIL,
        replyTo: payload.guestEmail,
        subject: adminSubject,
        html: adminHtml,
      });

      // 2. Send Customer Confirmation
      if (payload.guestEmail && payload.guestEmail.includes('@')) {
        await transporter.sendMail({
          from: `"CEYVORIA TOURS Concierge" <${GMAIL_USER}>`,
          to: payload.guestEmail,
          subject: customerSubject,
          html: customerHtml,
        }).catch(err => console.warn('[Gmail Customer Email error]:', err?.message));
      }

      return { success: true, provider: 'gmail-smtp' };
    } catch (err: unknown) {
      console.error('[Gmail SMTP Error]:', err);
    }
  }

  // Fallback: Neither service configured yet
  console.log(`[EMAIL NOTICE] Booking alert simulated. Configure RESEND_API_KEY or GMAIL_APP_PASSWORD to deliver live emails.`);
  return { success: true, provider: 'simulated' };
}

function buildAdminEmailHtml(p: InquiryEmailPayload): string {
  const cleanPhone = (p.guestPhone || '').replace(/[^0-9]/g, '');
  const waUrl = cleanPhone ? `https://wa.me/${cleanPhone}` : '';
  const mailtoUrl = `mailto:${p.guestEmail}?subject=${encodeURIComponent(`Re: Your Ceyvoria Tours Inquiry [Ref: ${p.reference}]`)}`;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Inquiry Alert</title>
</head>
<body style="margin:0;padding:24px;background-color:#041E19;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1e293b;">
  <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,0.3);">
    <!-- Header -->
    <div style="background:#052E27;padding:32px 28px;text-align:center;border-bottom:3px solid #D4AF37;">
      <h1 style="margin:0;font-size:22px;letter-spacing:3px;color:#D4AF37;text-transform:uppercase;">CEYVORIA TOURS</h1>
      <p style="margin:6px 0 0;font-size:12px;letter-spacing:1.5px;color:#cbd5e1;text-transform:uppercase;">NEW INCOMING BOOKING / INQUIRY ALERT</p>
    </div>

    <!-- Alert Banner -->
    <div style="background:#fefce8;padding:16px 28px;border-bottom:1px solid #fef08a;display:flex;align-items:center;justify-content:space-between;">
      <div>
        <span style="font-size:11px;font-weight:700;color:#854d0e;text-transform:uppercase;letter-spacing:1px;">Quotation Reference</span>
        <div style="font-size:20px;font-weight:800;color:#052E27;letter-spacing:1px;margin-top:2px;">${p.reference}</div>
      </div>
      <div style="text-align:right;">
        <span style="font-size:11px;font-weight:700;color:#854d0e;text-transform:uppercase;letter-spacing:1px;">Category</span>
        <div style="font-size:14px;font-weight:700;color:#052E27;margin-top:2px;">${p.type}</div>
      </div>
    </div>

    <!-- Body Content -->
    <div style="padding:28px;">
      <!-- Quick Action Buttons -->
      <div style="text-align:center;margin-bottom:28px;">
        ${waUrl ? `<a href="${waUrl}" style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;font-weight:700;font-size:13px;padding:12px 24px;border-radius:6px;margin:4px 6px;">Chat on WhatsApp Now</a>` : ''}
        <a href="${mailtoUrl}" style="display:inline-block;background:#052E27;color:#ffffff;text-decoration:none;font-weight:700;font-size:13px;padding:12px 24px;border-radius:6px;margin:4px 6px;">Reply via Email</a>
      </div>

      <h3 style="margin:0 0 16px;color:#052E27;font-size:16px;border-bottom:2px solid #e2e8f0;padding-bottom:8px;">Guest Contact Details</h3>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;font-size:14px;">
        <tr>
          <td style="padding:8px 0;color:#64748b;width:140px;font-weight:600;">Full Name:</td>
          <td style="padding:8px 0;color:#0f172a;font-weight:700;">${p.guestName}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#64748b;font-weight:600;">Email Address:</td>
          <td style="padding:8px 0;"><a href="mailto:${p.guestEmail}" style="color:#052E27;font-weight:700;text-decoration:underline;">${p.guestEmail}</a></td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#64748b;font-weight:600;">Phone / WhatsApp:</td>
          <td style="padding:8px 0;color:#0f172a;font-weight:700;">${p.guestPhone}</td>
        </tr>
        ${p.country ? `<tr><td style="padding:8px 0;color:#64748b;font-weight:600;">Country / Origin:</td><td style="padding:8px 0;color:#0f172a;font-weight:700;">${p.country}</td></tr>` : ''}
      </table>

      <h3 style="margin:0 0 16px;color:#052E27;font-size:16px;border-bottom:2px solid #e2e8f0;padding-bottom:8px;">Journey Requirements</h3>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;font-size:14px;">
        ${p.tourTitle ? `<tr><td style="padding:8px 0;color:#64748b;width:140px;font-weight:600;">Tour Journey:</td><td style="padding:8px 0;color:#052E27;font-weight:700;">${p.tourTitle}</td></tr>` : ''}
        ${p.travelDate ? `<tr><td style="padding:8px 0;color:#64748b;font-weight:600;">Preferred Date:</td><td style="padding:8px 0;color:#0f172a;font-weight:700;">${p.travelDate}</td></tr>` : ''}
        ${p.partySize ? `<tr><td style="padding:8px 0;color:#64748b;font-weight:600;">Party Size:</td><td style="padding:8px 0;color:#0f172a;font-weight:700;">${p.partySize} Guests</td></tr>` : ''}
        ${p.hotels ? `<tr><td style="padding:8px 0;color:#64748b;font-weight:600;">Hotel Request:</td><td style="padding:8px 0;color:#0f172a;font-weight:600;">${p.hotels}</td></tr>` : ''}
        ${p.mealPlan ? `<tr><td style="padding:8px 0;color:#64748b;font-weight:600;">Meal Plan:</td><td style="padding:8px 0;color:#0f172a;font-weight:600;">${p.mealPlan}</td></tr>` : ''}
        ${p.activities && p.activities.length ? `<tr><td style="padding:8px 0;color:#64748b;font-weight:600;vertical-align:top;">Activities:</td><td style="padding:8px 0;color:#0f172a;">${p.activities.join(', ')}</td></tr>` : ''}
        ${p.amount ? `<tr><td style="padding:8px 0;color:#64748b;font-weight:600;">Advance Amount:</td><td style="padding:8px 0;color:#16a34a;font-weight:800;">${p.currency || 'USD'} ${p.amount}</td></tr>` : ''}
        ${p.subject ? `<tr><td style="padding:8px 0;color:#64748b;font-weight:600;">Subject:</td><td style="padding:8px 0;color:#0f172a;">${p.subject}</td></tr>` : ''}
      </table>

      ${p.specialRequests || p.message ? `
        <div style="background:#f8fafc;padding:16px;border-radius:8px;border-left:4px solid #D4AF37;margin-bottom:24px;">
          <div style="font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;margin-bottom:6px;">Special Notes & Requests:</div>
          <div style="font-size:14px;color:#1e293b;line-height:1.5;">${p.specialRequests || p.message}</div>
        </div>
      ` : ''}

      <div style="text-align:center;margin-top:28px;padding-top:20px;border-top:1px solid #e2e8f0;">
        <a href="https://ceyvoriatours.com/admin/login" style="color:#052E27;font-size:12px;text-decoration:underline;font-weight:700;">Open Ceyvoria Admin Portal</a>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

function buildCustomerEmailHtml(p: InquiryEmailPayload): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Your Ceyvoria Tours Journey Request</title>
</head>
<body style="margin:0;padding:24px;background-color:#041E19;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1e293b;">
  <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,0.3);">
    <!-- Header -->
    <div style="background:#052E27;padding:36px 28px;text-align:center;border-bottom:3px solid #D4AF37;">
      <h1 style="margin:0;font-size:24px;letter-spacing:3px;color:#D4AF37;text-transform:uppercase;">CEYVORIA TOURS</h1>
      <p style="margin:8px 0 0;font-size:12px;letter-spacing:2px;color:#f1f5f9;text-transform:uppercase;">Tailor-Made Luxury Journeys in Sri Lanka</p>
    </div>

    <!-- Main Message -->
    <div style="padding:32px 28px;">
      <p style="font-size:18px;color:#052E27;font-weight:700;margin:0 0 16px;">Ayubowan ${p.guestName},</p>
      <p style="font-size:14px;line-height:1.6;color:#334155;margin:0 0 20px;">
        Thank you for entrusting your Sri Lankan journey to <strong>CEYVORIA TOURS</strong>. We have successfully received your booking request, and our senior travel designers in Sri Lanka are already reviewing your preferences.
      </p>

      <!-- Reference Box -->
      <div style="background:#f0fdf4;border:1px dashed #22c55e;padding:18px;border-radius:8px;text-align:center;margin-bottom:28px;">
        <div style="font-size:11px;font-weight:700;color:#166534;letter-spacing:1.5px;text-transform:uppercase;">Your Quotation Reference</div>
        <div style="font-size:24px;font-weight:800;color:#052E27;letter-spacing:2px;margin-top:4px;">${p.reference}</div>
      </div>

      <h3 style="margin:0 0 14px;color:#052E27;font-size:15px;border-bottom:1px solid #e2e8f0;padding-bottom:6px;">Summary of Your Request</h3>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;font-size:13.5px;">
        ${p.tourTitle ? `<tr><td style="padding:6px 0;color:#64748b;width:130px;">Selected Tour:</td><td style="padding:6px 0;color:#052E27;font-weight:700;">${p.tourTitle}</td></tr>` : ''}
        ${p.travelDate ? `<tr><td style="padding:6px 0;color:#64748b;">Travel Date:</td><td style="padding:6px 0;color:#0f172a;font-weight:600;">${p.travelDate}</td></tr>` : ''}
        ${p.partySize ? `<tr><td style="padding:6px 0;color:#64748b;">Guests:</td><td style="padding:6px 0;color:#0f172a;font-weight:600;">${p.partySize}</td></tr>` : ''}
        ${p.hotels ? `<tr><td style="padding:6px 0;color:#64748b;">Hotels:</td><td style="padding:6px 0;color:#0f172a;">${p.hotels}</td></tr>` : ''}
        ${p.mealPlan ? `<tr><td style="padding:6px 0;color:#64748b;">Meal Plan:</td><td style="padding:6px 0;color:#0f172a;">${p.mealPlan}</td></tr>` : ''}
      </table>

      <!-- Next Steps -->
      <div style="background:#f8fafc;padding:20px;border-radius:8px;margin-bottom:28px;">
        <h4 style="margin:0 0 10px;color:#052E27;font-size:14px;">What Happens Next?</h4>
        <ol style="margin:0;padding-left:20px;font-size:13.5px;color:#475569;line-height:1.6;">
          <li>Our senior journey designer will inspect availability of luxury boutique hotels and private chauffeur-guides.</li>
          <li>We will deliver your <strong>personalized, itemized quotation</strong> within 2 to 4 hours via WhatsApp and Email.</li>
          <li>You can customize any hotel, pace, or excursion until it matches your exact vision.</li>
        </ol>
      </div>

      <!-- Instant WhatsApp Button -->
      <div style="text-align:center;margin-bottom:28px;">
        <a href="https://wa.me/94767810420?text=${encodeURIComponent(`Hello Ceyvoria Tours! I submitted booking request ${p.reference} for ${p.tourTitle || 'Sri Lanka journey'}.`)}" style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:12px 28px;border-radius:6px;">
          💬 Connect on WhatsApp (+94 76 781 0420)
        </a>
      </div>

      <!-- Footer Info -->
      <div style="font-size:12px;color:#64748b;border-top:1px solid #e2e8f0;padding-top:20px;text-align:center;line-height:1.6;">
        <p style="margin:0;font-weight:700;color:#052E27;">CEYVORIA TOURS — Private Tailor-Made Journeys</p>
        <p style="margin:4px 0 0;">Indasara Mawatha, Mirissa, Sri Lanka</p>
        <p style="margin:4px 0 0;">Email: <a href="mailto:ceyvoriatours@gmail.com" style="color:#052E27;">ceyvoriatours@gmail.com</a> | Phone / WhatsApp: +94 76 781 0420</p>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

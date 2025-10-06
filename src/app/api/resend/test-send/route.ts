import { NextRequest, NextResponse } from 'next/server';
import sendResendEmail from '@/lib/resend';
import PricingRequestEmail from '@/emails/PricingRequestEmail';

export async function GET(_request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || 'no-reply@secure-sense.com';
  const to = process.env.ADMIN_EMAIL || 'hello@secure-sense.com';

  if (!apiKey) {
    console.warn('RESEND_API_KEY not set — cannot send test email.');
    return NextResponse.json({ ok: false, message: 'RESEND_API_KEY not configured' }, { status: 400 });
  }

  try {
    await sendResendEmail({
      from,
      to,
      subject: 'Secure-Sense — Test Email',
      html: `<p>This is a test email from your Secure-Sense app. If you received this, Resend is configured correctly.</p>`,
      component: PricingRequestEmail,
      props: {
        companyName: 'Secure-Sense (Test)',
        contactEmail: to,
        employees: 'n/a',
        services: 'test',
        message: 'This is a test email from your Secure-Sense app.',
      },
    });

    console.log('Test email sent via Resend to', to);
    return NextResponse.json({ ok: true, message: `Test email sent to ${to}` });
  } catch (err) {
    console.error('Error sending test email via Resend:', err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

// Resend webhook handler with HMAC-SHA256 verification using RESEND_WEBHOOK_SECRET.
// Resend signs requests — check your Resend dashboard for the exact header name and signing method.
// This implementation expects a header called `resend-signature` containing a hex HMAC-SHA256 of the raw body.

function constantTimeCompare(a: string, b: string) {
  if (a.length !== b.length) return false;
  // Use crypto.timingSafeEqual for constant time comparison
  try {
    const aa = Buffer.from(a, 'utf8');
    const bb = Buffer.from(b, 'utf8');
    return crypto.timingSafeEqual(aa, bb);
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signatureHeader = request.headers.get('resend-signature') || request.headers.get('x-resend-signature') || '';
  const secret = process.env.RESEND_WEBHOOK_SECRET;

  if (secret) {
    try {
      const expected = crypto.createHmac('sha256', secret).update(body).digest('hex');
      if (!constantTimeCompare(expected, signatureHeader)) {
        console.warn('Resend webhook signature mismatch', { expected, got: signatureHeader });
        return NextResponse.json({ ok: false, message: 'invalid signature' }, { status: 401 });
      }
    } catch (err) {
      console.error('Error verifying webhook signature', err);
      return NextResponse.json({ ok: false }, { status: 401 });
    }
  } else {
    // If no secret is configured, warn in logs but continue for development convenience
    console.warn('RESEND_WEBHOOK_SECRET not configured — skipping signature verification');
  }

  let event: any = null;
  try {
    event = JSON.parse(body);
  } catch (err) {
    console.error('Invalid webhook payload JSON', err);
    return NextResponse.json({ ok: false, message: 'invalid payload' }, { status: 400 });
  }

  // Handle common event types — adapt as needed for your application
  try {
    const { type, data } = event;
    console.log('Resend webhook event:', type);
    // Persist the event to a JSONL file for simple local persistence.
    try {
      const outDir = path.resolve(process.cwd(), 'data');
      if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
      const outFile = path.join(outDir, 'resend-webhooks.jsonl');
      const record = { receivedAt: new Date().toISOString(), type, data, raw: event };
      fs.appendFileSync(outFile, JSON.stringify(record) + '\n');
    } catch (persistErr) {
      console.error('Failed to persist webhook event:', persistErr);
    }

    switch (type) {
      case 'delivered':
        console.log('Email delivered:', data);
        break;
      case 'bounced':
      case 'complaint':
      case 'permanent_failure':
        console.warn('Delivery problem:', type, data);
        break;
      default:
        console.log('Unhandled resend event type:', type, data);
    }
  } catch (err) {
    console.error('Error handling webhook event', err);
  }

  return NextResponse.json({ ok: true });
}

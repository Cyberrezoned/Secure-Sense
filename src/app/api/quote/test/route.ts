import { NextRequest, NextResponse } from 'next/server';
import { requestPricing } from '@/lib/actions';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Build a FormData to match the form shape used by the UI
    const formData = new FormData();
    formData.append('companyName', body.companyName || 'Test Company');
    formData.append('email', body.email || 'test@example.com');
    formData.append('employees', body.employees || '1-50');

    const services = Array.isArray(body.services) ? body.services : [body.services || 'pentesting'];
    for (const s of services) {
      formData.append('services', s);
    }

    formData.append('message', body.message || 'This is a test quote submission');

    const result = await requestPricing(null as any, formData as any);
    return NextResponse.json(result);
  } catch (err) {
    console.error('Error in quote test route:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

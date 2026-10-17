'use server';

import {
  analyzeArticle,
  type AnalyzeArticleOutput,
} from '@/ai/flows/analyze-article-flow';
import { z } from 'zod';
import PricingRequestEmail from '@/emails/PricingRequestEmail';
import sendResendEmail from '@/lib/resend';

export type AnalysisResult = AnalyzeArticleOutput;

/**
 * Contact of record for enquiries that cannot be delivered automatically.
 * Kept as a constant so no code path falls back to a domain we do not own.
 */
const CONTACT_EMAIL = process.env.ADMIN_EMAIL || 'zenethecyber@icloud.com';
const SENDER_DOMAIN = process.env.RESEND_SENDER_DOMAIN || 'zeenthecyber.online';

export async function analyzeContent(
  _prevState: unknown,
  formData: FormData
): Promise<{ result?: AnalysisResult; error?: string }> {
  const content = formData.get('content') as string;

  if (!content || content.length < 50) {
    return { error: 'Please provide at least 50 characters of content to analyze.' };
  }

  try {
    const result = await analyzeArticle({
      content: content,
      contentType: 'blog',
    });

    return {
      result,
    };
  } catch (error) {
    console.error('Error during content analysis:', error);
    return { error: 'An unexpected error occurred during analysis. Please try again.' };
  }
}

const pricingRequestSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  contactName: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  industry: z.string().optional(),
  employees: z.string().min(1, "Number of employees is required"),
  timeline: z.string().optional(),
  services: z.array(z.string()).min(1, "Please select at least one service"),
  message: z.string().optional(),
});

export async function requestPricing(_prevState: unknown, formData: FormData) {
  // Use .getAll to handle multiple checkboxes with the same name
  const services = formData.getAll('services');
  const data = {
    companyName: formData.get('companyName'),
    contactName: formData.get('contactName'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    industry: formData.get('industry'),
    employees: formData.get('employees'),
    timeline: formData.get('timeline'),
    services,
    message: formData.get('message'),
  };

  const validatedFields = pricingRequestSchema.safeParse(data);

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    const missing = Object.keys(fieldErrors);
    return {
      error:
        missing.length > 0
          ? `Please check these fields: ${missing.join(', ')}.`
          : 'Please fill out all required fields.',
      fieldErrors,
    };
  }

  // In a real app, you would send this data to your CRM or email service
  const requestData = validatedFields.data;
  console.log('New pricing request:', requestData);

  // Prepare email content
  const servicesList = Array.isArray(requestData.services)
    ? requestData.services.join(', ')
    : String(requestData.services || '');

  const html = `
    <h2>New Pricing Request</h2>
    <p><strong>Company:</strong> ${String(requestData.companyName)}</p>
    <p><strong>Contact Name:</strong> ${String(requestData.contactName || '')}</p>
    <p><strong>Contact Email:</strong> ${String(requestData.email)}</p>
    <p><strong>Phone:</strong> ${String(requestData.phone || '')}</p>
    <p><strong>Industry:</strong> ${String(requestData.industry || '')}</p>
    <p><strong>Employees:</strong> ${String(requestData.employees)}</p>
    <p><strong>Timeline:</strong> ${String(requestData.timeline || '')}</p>
    <p><strong>Services:</strong> ${servicesList}</p>
    <p><strong>Message:</strong></p>
    <p>${String(requestData.message || '')}</p>
  `;

  // Send email using Resend if API key is available
  const resendApiKey = process.env.RESEND_API_KEY;
  // Prefer RESEND_FROM and ADMIN_EMAIL env names; fall back to older names for compatibility
  const emailFrom = process.env.RESEND_FROM || process.env.EMAIL_FROM || `no-reply@${SENDER_DOMAIN}`;
  const notifyTo =
    process.env.ADMIN_EMAIL || process.env.NOTIFY_TO || process.env.RESEND_FROM || process.env.EMAIL_FROM || CONTACT_EMAIL;

  if (resendApiKey) {
    try {
      await sendResendEmail({
        from: emailFrom,
        to: notifyTo,
        subject: `New pricing request — ${String(requestData.companyName)}`,
        html,
        component: PricingRequestEmail,
        props: {
          companyName: String(requestData.companyName),
          contactName: String(requestData.contactName || ''),
          contactEmail: String(requestData.email),
          phone: String(requestData.phone || ''),
          industry: String(requestData.industry || ''),
          employees: String(requestData.employees),
          timeline: String(requestData.timeline || ''),
          services: servicesList,
          message: String(requestData.message || ''),
        },
        headers: { 'Reply-To': String(requestData.email) },
      });

      return { success: 'Thank you for your request! Our team will be in touch with you shortly.' };
    } catch (err) {
      console.error('Failed to send pricing request email via Resend:', err);
      return { error: 'There was an error sending your request. Please try again later.' };
    }
  }

  // No delivery provider configured. Previously this returned success, which
  // told the sender "we'll be in touch" while the enquiry existed only as a
  // console line — the lead was silently lost. Fail visibly and give them a
  // route that actually reaches us.
  console.error('RESEND_API_KEY not set — pricing request could NOT be delivered.');
  return {
    error: `We could not submit your request automatically. Please email ${CONTACT_EMAIL} and we will respond directly.`,
  };
}

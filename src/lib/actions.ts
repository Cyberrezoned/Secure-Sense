'use server';

import {
  analyzeArticle,
  type AnalyzeArticleOutput,
} from '@/ai/flows/analyze-article-flow';
import { z } from 'zod';
import { Resend } from 'resend';
import React from 'react';
import PricingRequestEmail from '@/emails/PricingRequestEmail';
import sendResendEmail from '@/lib/resend';

export type AnalysisResult = AnalyzeArticleOutput;

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
  email: z.string().email(),
  employees: z.string().min(1, "Number of employees is required"),
  services: z.array(z.string()).min(1, "Please select at least one service"),
  message: z.string().optional(),
});

export async function requestPricing(_prevState: unknown, formData: FormData) {
  // Use .getAll to handle multiple checkboxes with the same name
  const services = formData.getAll('services');
  const data = {
    companyName: formData.get('companyName'),
    email: formData.get('email'),
    employees: formData.get('employees'),
    services,
    message: formData.get('message'),
  };

  const validatedFields = pricingRequestSchema.safeParse(data);

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      error: 'Please fill out all required fields.',
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
    <p><strong>Contact Email:</strong> ${String(requestData.email)}</p>
    <p><strong>Employees:</strong> ${String(requestData.employees)}</p>
    <p><strong>Services:</strong> ${servicesList}</p>
    <p><strong>Message:</strong></p>
    <p>${String(requestData.message || '')}</p>
  `;

  // Send email using Resend if API key is available
  const resendApiKey = process.env.RESEND_API_KEY;
  // Prefer RESEND_FROM and ADMIN_EMAIL env names; fall back to older names for compatibility
  const emailFrom = process.env.RESEND_FROM || process.env.EMAIL_FROM || 'no-reply@secure-sense.com';
  const notifyTo = process.env.ADMIN_EMAIL || process.env.NOTIFY_TO || process.env.RESEND_FROM || process.env.EMAIL_FROM || 'hello@secure-sense.com';

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
          contactEmail: String(requestData.email),
          employees: String(requestData.employees),
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

  // Fallback when no Resend API key is configured
  console.warn('RESEND_API_KEY not set — pricing request logged but not emailed.');
  return { success: 'Thank you for your request! Our team will be in touch with you shortly.' };
}

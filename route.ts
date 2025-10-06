import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import React from 'react';
import PricingRequestEmail from './src/emails/PricingRequestEmail';
import sendResendEmail from './src/lib/resend';

export async function POST(request: NextRequest) {
  // 1. Get the form data from the request
  const quoteData = await request.json();

  // --- You can add your existing logic here ---
  // For example, saving the quote to your Firebase database.
  //
  // try {
  //   await db.collection('quotes').add(quoteData);
  // } catch (dbError) {
  //   console.error('Error saving to database', dbError);
  //   return NextResponse.json({ message: 'Error saving quote.' }, { status: 500 });
  // }
  // -----------------------------------------

  // 2. Configure the email transporter
  // Make sure you have set up your environment variables in .env.local
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Helper to create a more readable email body
  const createEmailBody = (data: Record<string, any>) => {
    let html = '<h1>New Quote Request</h1><p>A new quote request has been submitted with the following details:</p><table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 600px;"><tbody>';
    let text = 'A new quote request has been submitted with the following details:\n\n';

    for (const [key, value] of Object.entries(data)) {
      const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
      html += `<tr><td style="background-color: #f2f2f2; font-weight: bold; text-transform: capitalize;">${capitalizedKey}</td><td>${value}</td></tr>`;
      text += `${capitalizedKey}: ${value}\n`;
    }

    html += '</tbody></table>';
    return { html, text };
  };

  const { html, text } = createEmailBody(quoteData);

  // 3. Define the email options
  const mailOptions = {
    from: process.env.RESEND_FROM || `"Your Website" <${process.env.SMTP_USER}>`, // sender address (prefer RESEND_FROM)
    to: process.env.ADMIN_EMAIL || 'rythecyber@proton.me', // recipient (ADMIN_EMAIL recommended)
    subject: 'Quote Request Received', // Subject line
    text: text,
    html: html,
  };

  // 4. Send the email — prefer Resend if API key is available, otherwise fall back to SMTP
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const from = process.env.RESEND_FROM || `"Your Website" <${process.env.SMTP_USER}>`;
      await sendResendEmail({
        from,
        to: mailOptions.to,
        subject: mailOptions.subject,
        html: mailOptions.html,
        component: PricingRequestEmail,
        props: {
          companyName: String(quoteData.companyName || ''),
          contactEmail: String(quoteData.email || ''),
          employees: String(quoteData.employees || ''),
          services: String(quoteData.services || ''),
          message: String(quoteData.message || ''),
        },
      });
      console.log('Quote request email sent successfully via Resend.');
    } catch (error) {
      console.error('Error sending email via Resend:', error);
      // If Resend fails, attempt SMTP as a fallback
      try {
        await transporter.sendMail(mailOptions);
        console.log('Quote request email sent successfully via SMTP fallback.');
      } catch (smtpError) {
        console.error('SMTP fallback also failed:', smtpError);
      }
    }
  } else {
    // No Resend key configured — use existing SMTP
    try {
      await transporter.sendMail(mailOptions);
      console.log('Quote request email sent successfully.');
    } catch (error) {
      console.error('Error sending email:', error);
      // Decide if you want to return an error to the user if the email fails
      // For now, we'll just log it and continue.
    }
  }

  // 5. Return a success response to the client
  return NextResponse.json(
    { message: 'Quote request submitted successfully!' },
    { status: 200 }
  );
}

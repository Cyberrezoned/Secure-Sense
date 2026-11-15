'use client';

import { useActionState, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';

import { requestPricing } from '@/lib/actions';
import { CONTACT_EMAIL, emailHref } from '@/lib/contact';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const serviceOptions = [
  { id: 'studio', label: 'Creative Studio: Content, Social Media and Training' },
  { id: 'supply-chain', label: 'Commodity Supply-Chain Infrastructure' },
  { id: 'zeenthecyber', label: 'ZeenTheCyber Community Inquiry' },
  { id: 'pentesting', label: 'Penetration Testing and Red Teaming' },
  { id: 'soc', label: 'Managed Detection and Response' },
  { id: 'vulnerability', label: 'Vulnerability Management' },
  { id: 'consulting', label: 'Security Consulting and Architecture' },
  { id: 'training', label: 'Training and Awareness' },
  { id: 'compliance', label: 'Compliance and Audit Readiness' },
];

const employeeRanges = ['1-50', '51-200', '201-1000', '1001+'];
const timelines = ['Immediate', 'This quarter', 'Next quarter', 'Planning stage'];
const industries = ['Media / Creator Economy', 'Agriculture / Commodities', 'Warehousing / Logistics', 'Trade Finance', 'Fintech', 'Healthcare', 'SaaS', 'Public Sector', 'Energy / OT', 'Education / NGO', 'Other'];

function SubmitButton({ securityReview = false }: { securityReview?: boolean }) {
  const { pending } = useFormStatus();

  // Both labels share one grid cell, so the button keeps its size while sending.
  return (
    <Button type="submit" disabled={pending} className="grid h-12">
      <span className={pending ? 'invisible col-start-1 row-start-1' : 'col-start-1 row-start-1'}>
        {securityReview ? 'Email my call request' : 'Send enquiry by email'}
      </span>
      <span
        aria-hidden={!pending}
        className={`col-start-1 row-start-1 flex items-center justify-center gap-2 ${pending ? '' : 'invisible'}`}
      >
        <Loader2 className="h-4 w-4 animate-spin" />
        Sending Request...
      </span>
    </Button>
  );
}

export function RequestQuoteForm({ studioInterest, securityReview = false }: { studioInterest?: string; securityReview?: boolean } = {}) {
  const [state, formAction] = useActionState(requestPricing, {} as any);
  const isSecurityReview = securityReview && !studioInterest;
  const subject = isSecurityReview ? 'Security review call request' : studioInterest ? `Studio enquiry: ${studioInterest}` : 'SuleZeen enquiry';
  const defaultMessage = studioInterest ? `I would like help with: ${studioInterest}.\n\nWhere I am starting:\nWhat I want to create or earn from:\nThe support I need:\nMy time and budget for learning:\n\nPlease share current formats, fees, and availability.` : isSecurityReview ? 'I would like a free 15-minute introductory call about a buyer security review.\n\nWhat the buyer is asking for (questionnaire, penetration test or audit readiness):\nDecision deadline:\nKnown security or evidence gaps:\n\nPlease follow up to arrange a time and discuss the next step.' : '';
  const [emailDraftHref, setEmailDraftHref] = useState(() => emailHref(subject, defaultMessage));

  function updateEmailDraft(form: HTMLFormElement) {
    const data = new FormData(form);
    const fields = [
      ['Name', 'contactName'], ['Company / creator', 'companyName'],
      ['Email', 'email'], ['Phone', 'phone'], ['Team size', 'employees'],
      ['Industry', 'industry'], ['Timeline', 'timeline'], ['Enquiry', 'message'],
    ];
    const lines = fields.flatMap(([label, name]) => {
      const value = String(data.get(name) || '').trim();
      return value ? [`${label}: ${value}`] : [];
    });
    const services = data.getAll('services').map(id => serviceOptions.find(option => option.id === id)?.label || String(id));
    if (services.length) lines.push(`Interests: ${services.join(', ')}`);
    setEmailDraftHref(emailHref(subject, lines.join('\n\n')));
  }

  if (state.success) {
    return (
      <Alert role="status" className="border-signal-ok/40 bg-signal-ok/10 text-foreground duration-300 animate-in fade-in-0 slide-in-from-bottom-1">
        <CheckCircle2 className="h-4 w-4 !text-signal-ok" />
        <AlertTitle>Request received</AlertTitle>
        <AlertDescription>{state.success}</AlertDescription>
      </Alert>
    );
  }

  return (
    <form action={formAction} onChange={event => updateEmailDraft(event.currentTarget)} className="space-y-8">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contactName">Contact Name</Label>
          <Input id="contactName" name="contactName" placeholder="Your full name" className="h-12 rounded-md border-input bg-surface" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="companyName">{studioInterest ? 'Your name, channel or business' : 'Company Name'}</Label>
          <Input id="companyName" name="companyName" placeholder={studioInterest ? 'Your name or creator identity' : 'Company or organization'} required className="h-12 rounded-md border-input bg-surface" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{studioInterest ? 'Email address' : 'Work Email'}</Label>
          <Input id="email" name="email" type="email" placeholder={studioInterest ? 'you@example.com' : 'you@company.com'} required className="h-12 rounded-md border-input bg-surface" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" name="phone" type="tel" placeholder="+234..." className="h-12 rounded-md border-input bg-surface" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="employees">{studioInterest ? 'Your team size' : 'Organization Size'}</Label>
          <select
            id="employees"
            name="employees"
            required
            defaultValue={studioInterest ? '1-50' : ''}
            className="h-12 w-full rounded-md border border-input bg-surface px-4 text-sm text-foreground outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="" disabled>
              Select employee range
            </option>
            {employeeRanges.map((range) => (
              <option key={range} value={range}>
                {studioInterest && range === '1-50' ? 'Individual creator or small team (1–50)' : range}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <select
            id="industry"
            name="industry"
            defaultValue={studioInterest ? 'Media / Creator Economy' : ''}
            className="h-12 w-full rounded-md border border-input bg-surface px-4 text-sm text-foreground outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">Select industry</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="timeline">Project Timeline</Label>
          <select
            id="timeline"
            name="timeline"
            defaultValue=""
            className="h-12 w-full rounded-md border border-input bg-surface px-4 text-sm text-foreground outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">Select timeline</option>
            {timelines.map((timeline) => (
              <option key={timeline} value={timeline}>
                {timeline}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">{isSecurityReview ? 'What is holding up the review?' : 'Program Notes'}</Label>
          <Textarea
            id="message"
            name="message"
            rows={4}
            defaultValue={defaultMessage}
            placeholder={isSecurityReview ? 'Share the buyer request, deadline and known gaps.' : 'Tell us about your content or learning idea, commodity workflow, security priorities, or partnership interests.'}
            className="min-h-[130px] rounded-md border-input bg-surface"
          />
        </div>
      </div>

      <fieldset className="space-y-4">
        <legend className="text-base font-medium text-foreground">Services of Interest</legend>
        <p className="mt-1 text-sm text-muted-foreground">
          Select one or more functions so we can scope the right workflow.
        </p>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {serviceOptions.map((service) => (
            <label
              key={service.id}
              htmlFor={service.id}
              className="group block cursor-pointer rounded-lg border border-input bg-surface p-4 transition-colors has-[:checked]:border-primary/40 has-[:checked]:bg-primary/10 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ring"
            >
              <input id={service.id} name="services" type="checkbox" value={service.id} defaultChecked={!!studioInterest ? service.id === 'studio' : isSecurityReview && service.id === 'consulting'} className="sr-only" />
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-foreground">{service.label}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Add this scope to the engagement request.
                  </p>
                </div>
                <div className="mt-1 h-4 w-4 rounded-full border border-input bg-background transition-colors duration-150 group-has-[:checked]:border-primary group-has-[:checked]:bg-primary" />
              </div>
            </label>
          ))}
        </div>
      </fieldset>

      {state.error ? (
        <Alert variant="destructive" className="duration-300 animate-in fade-in-0 slide-in-from-bottom-1">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Submission error</AlertTitle>
          <AlertDescription>
            {state.error}{' '}
            <a href={emailDraftHref} className="font-medium underline underline-offset-4">Open your enquiry in your email app.</a>
          </AlertDescription>
        </Alert>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-input bg-surface p-5">
        <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
          Your enquiry goes to <span className="font-medium text-foreground">{CONTACT_EMAIL}</span>.
          {isSecurityReview ? ' We will reply to agree a time for your free 15-minute introductory call. Further work is scoped separately.' : ' We will reply to the email address you provide.'}
        </p>
        <SubmitButton securityReview={isSecurityReview} />
        <p className="w-full text-sm text-muted-foreground">
          Prefer your own email app?{' '}
          <a href={emailDraftHref} className="font-medium text-primary underline underline-offset-4">Open an email with your enquiry</a>.
          {' '}Review the draft and press Send in your app.
        </p>
      </div>
    </form>
  );
}

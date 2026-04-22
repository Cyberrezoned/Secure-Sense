'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';

import { requestPricing } from '@/lib/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const serviceOptions = [
  { id: 'pentesting', label: 'Penetration Testing and Red Teaming' },
  { id: 'soc', label: 'Managed Detection and Response' },
  { id: 'vulnerability', label: 'Vulnerability Management' },
  { id: 'consulting', label: 'Security Consulting and Architecture' },
  { id: 'training', label: 'Training and Awareness' },
  { id: 'compliance', label: 'Compliance and Audit Readiness' },
];

const employeeRanges = ['1-50', '51-200', '201-1000', '1001+'];
const timelines = ['Immediate', 'This quarter', 'Next quarter', 'Planning stage'];
const industries = ['Fintech', 'Healthcare', 'SaaS', 'Public Sector', 'Energy / OT', 'Education / NGO', 'Other'];

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="h-12 rounded-full px-6">
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Sending Request...
        </>
      ) : (
        'Submit Engagement Request'
      )}
    </Button>
  );
}

export function RequestQuoteForm() {
  const [state, formAction] = useActionState(requestPricing, {} as any);

  if (state.success) {
    return (
      <Alert className="border-emerald-400/40 bg-emerald-500/10 text-emerald-100">
        <CheckCircle2 className="h-4 w-4 !text-emerald-300" />
        <AlertTitle>Request received</AlertTitle>
        <AlertDescription>{state.success}</AlertDescription>
      </Alert>
    );
  }

  return (
    <form action={formAction} className="space-y-8">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contactName">Contact Name</Label>
          <Input id="contactName" name="contactName" placeholder="Your full name" className="h-12 rounded-2xl border-border/70 bg-background/70" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input id="companyName" name="companyName" placeholder="Company or organization" required className="h-12 rounded-2xl border-border/70 bg-background/70" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Work Email</Label>
          <Input id="email" name="email" type="email" placeholder="you@company.com" required className="h-12 rounded-2xl border-border/70 bg-background/70" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" name="phone" type="tel" placeholder="+234..." className="h-12 rounded-2xl border-border/70 bg-background/70" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="employees">Organization Size</Label>
          <select
            id="employees"
            name="employees"
            required
            defaultValue=""
            className="h-12 w-full rounded-2xl border border-border/70 bg-background/70 px-4 text-sm text-foreground outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="" disabled>
              Select employee range
            </option>
            {employeeRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <select
            id="industry"
            name="industry"
            defaultValue=""
            className="h-12 w-full rounded-2xl border border-border/70 bg-background/70 px-4 text-sm text-foreground outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-ring"
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
            className="h-12 w-full rounded-2xl border border-border/70 bg-background/70 px-4 text-sm text-foreground outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-ring"
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
          <Label htmlFor="message">Program Notes</Label>
          <Textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Tell us about your current priorities, attack surface, compliance targets, or internal blockers."
            className="min-h-[130px] rounded-2xl border-border/70 bg-background/70"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-base">Services of Interest</Label>
          <p className="mt-1 text-sm text-muted-foreground">
            Select one or more functions so we can scope the right workflow.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {serviceOptions.map((service) => (
            <label
              key={service.id}
              htmlFor={service.id}
              className="group block cursor-pointer rounded-3xl border border-border/70 bg-background/60 p-4 transition-colors has-[:checked]:border-primary/40 has-[:checked]:bg-primary/10"
            >
              <input id={service.id} name="services" type="checkbox" value={service.id} className="sr-only" />
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-foreground">{service.label}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Add this scope to the engagement request.
                  </p>
                </div>
                <div className="mt-1 h-4 w-4 rounded-full border border-border/70 bg-background group-has-[:checked]:border-primary group-has-[:checked]:bg-primary" />
              </div>
            </label>
          ))}
        </div>
      </div>

      {state.error ? (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Submission error</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-border/70 bg-background/60 p-5">
        <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
          Requests route to your Secure Sense intake workflow. You can follow up by email, scope call,
          or technical discovery depending on the service mix selected.
        </p>
        <SubmitButton />
      </div>
    </form>
  );
}

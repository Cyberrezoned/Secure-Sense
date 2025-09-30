'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { requestPricing } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const services = [
  { id: 'pentesting', label: 'Penetration Testing (Red Team)' },
  { id: 'soc', label: 'Managed SOC & MDR (Blue Team)' },
  { id: 'vulnerability', label: 'Vulnerability Management' },
  { id: 'consulting', label: 'Security Consulting' },
  { id: 'training', label: 'Team Training & Awareness' },
  { id: 'compliance', label: 'Compliance & Auditing' },
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full glow-sm">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Submitting Request...
        </>
      ) : (
        'Request a Quote'
      )}
    </Button>
  );
}


export default function RequestQuotePage() {
  const [state, formAction] = useActionState(requestPricing, {});

  return (
    <div className="container py-12 px-4 md:px-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">
          Request Cybersecurity Services
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Partner with us to strengthen your security posture. Fill out the form below to get a personalized quote for our expert-led services.
        </p>
      </div>

      <div className="mt-12 max-w-2xl mx-auto">
        <Card className="bg-secondary border-border/50">
          <CardHeader>
            <CardTitle>Get Your Custom Quote</CardTitle>
            <CardDescription>Tell us about your organization and security needs.</CardDescription>
          </CardHeader>
          <CardContent>
            {state.success ? (
              <Alert variant="default" className="border-green-500/50 text-green-500">
                <CheckCircle className="h-4 w-4 !text-green-500" />
                <AlertTitle>Request Sent!</AlertTitle>
                <AlertDescription>{state.success}</AlertDescription>
              </Alert>
            ) : (
              <form action={formAction} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" name="companyName" placeholder="Acme Inc." required className="bg-background"/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Work Email</Label>
                    <Input id="email" name="email" type="email" placeholder="you@acme.com" required className="bg-background"/>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employees">Number of Employees</Label>
                   <Select name="employees">
                    <SelectTrigger id="employees" className="bg-background">
                      <SelectValue placeholder="Select a range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-50">1-50</SelectItem>
                      <SelectItem value="51-200">51-200</SelectItem>
                      <SelectItem value="201-1000">201-1000</SelectItem>
                      <SelectItem value="1001+">1001+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Services of Interest</Label>
                  <div className="grid sm:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <div key={service.id} className="flex items-center gap-2">
                      <Checkbox id={service.id} name="services" value={service.id} />
                      <Label htmlFor={service.id} className="font-normal">{service.label}</Label>
                    </div>
                  ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Additional Information</Label>
                  <Textarea id="message" name="message" placeholder="Tell us about any specific challenges, compliance needs, or your current security stack..." rows={4} className="bg-background"/>
                </div>
                
                {state.error && (
                  <Alert variant="destructive">
                    <XCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{state.error}</AlertDescription>
                  </Alert>
                )}

                <SubmitButton />
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

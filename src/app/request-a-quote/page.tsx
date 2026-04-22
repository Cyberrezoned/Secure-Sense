import { ArrowRight, ClipboardCheck, Shield } from 'lucide-react';
import Link from 'next/link';

import { CtaBanner } from '@/components/company/cta-banner';
import { PageHero } from '@/components/company/page-hero';
import { SectionHeading } from '@/components/company/section-heading';
import { RequestQuoteForm } from '@/components/request-a-quote/request-quote-form';
import { Button } from '@/components/ui/button';

export default function RequestQuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Request a Quote"
        title="Scope the right cybersecurity engagement from the start."
        description="Use this route when you already know you need an assessment, compliance program, managed service, or architecture support. The form is structured so Secure Sense can respond with the right delivery path."
        actions={
          <>
            <Button asChild size="lg" className="rounded-full px-6">
              <Link href="/contact">
                Go to Contact Hub
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </>
        }
        stats={[
          { value: 'Native form flow', label: 'Submission now posts real values' },
          { value: 'Multi-service', label: 'Scope multiple functions at once' },
          { value: 'Lead ready', label: 'Structured for enterprise intake' },
        ]}
        aside={
          <div className="space-y-4">
            {[
              {
                title: 'Assessment requests',
                description: 'Penetration tests, red teaming, architecture reviews, and security validation projects.',
                icon: Shield,
              },
              {
                title: 'Program engagements',
                description: 'Compliance transformation, managed defense, and security operations maturity programs.',
                icon: ClipboardCheck,
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="rounded-[1.5rem] border border-border/70 bg-background/60 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="font-medium text-foreground">{item.title}</p>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
                </div>
              );
            })}
          </div>
        }
      />

      <section className="container py-20 md:py-24">
        <SectionHeading
          eyebrow="Engagement Intake"
          title="Send the details once, then move into technical discovery."
          description="The form below captures organization context, service mix, and timing so the response can be aligned to the real security problem."
        />
        <div className="mt-10 panel p-6 md:p-8">
          <RequestQuoteForm />
        </div>
      </section>

      <div className="container pb-20 md:pb-24">
        <CtaBanner
          title="Need a broader conversation before you request a quote?"
          description="Use the contact hub if you want to discuss strategy, partnerships, or multi-phase programs first."
          primaryHref="/contact"
          primaryLabel="Open Contact Hub"
          secondaryHref="/services"
          secondaryLabel="Review Services"
        />
      </div>
    </>
  );
}

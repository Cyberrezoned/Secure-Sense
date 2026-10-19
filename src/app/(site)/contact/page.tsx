import Link from 'next/link';
import { ArrowRight, Mail, MapPin, MessageSquareShare, PhoneCall } from 'lucide-react';

import { CtaBanner } from '@/components/company/cta-banner';
import { PageHero } from '@/components/company/page-hero';
import { SectionHeading } from '@/components/company/section-heading';
import { RequestQuoteForm } from '@/components/request-a-quote/request-quote-form';
import { Button } from '@/components/ui/button';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata(
  'Contact',
  'Speak with Sule Zeen about commodity supply-chain infrastructure, cybersecurity engagements, or ZeenTheCyber products.',
  '/contact'
);

const contactCards = [
  {
    title: 'Practices and partnerships',
    description: 'Discuss the Creative Studio, content and learning partnerships, commodity infrastructure, cybersecurity services, or ZeenTheCyber products.',
    icon: MessageSquareShare,
  },
  {
    title: 'Direct email',
    description: 'For quick coordination, partnership inquiries, or follow-up on ongoing work.',
    icon: Mail,
    action: 'mailto:zenethecyber@icloud.com',
    actionLabel: 'zenethecyber@icloud.com',
  },
  {
    title: 'Location context',
    description: 'Lagos-based delivery with support for distributed and global engagements.',
    icon: MapPin,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Build trust. Create opportunity. Start a conversation."
        description="Talk to Sule Zeen about the Creative Studio, supply-chain infrastructure, cybersecurity, or ZeenTheCyber. Share your interests and timeline so we can scope the next step."
        actions={
          <>
            <Button asChild size="lg">
              <Link href="#engagement-form">
                Start an Engagement Request
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/cybersecurity">Review Services</Link>
            </Button>
          </>
        }
        stats={[
          { value: 'Structured intake', label: 'Scope before the first call' },
          { value: 'Multi-service', label: 'One form for multiple needs' },
          { value: 'Lead ready', label: 'Built for enterprise inquiries' },
        ]}
      />

      <section className="shell py-20 md:py-24">
        <SectionHeading
          eyebrow="Contact Paths"
          title="Different routes for different conversations."
          description="Pick the route that matches where you are. Each one reaches the same team."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {contactCards.map((card) => {
            const Icon = card.icon;

            return (
              <div key={card.title} className="surface p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-md border border-primary/20 bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 font-headline text-2xl font-semibold text-foreground">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{card.description}</p>
                {'action' in card && card.action ? (
                  <a href={card.action} className="mt-6 inline-flex text-sm font-medium text-primary hover:text-primary/80">
                    {card.actionLabel}
                  </a>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>

      <section id="engagement-form" className="shell pb-20 md:pb-24">
        <SectionHeading
          eyebrow="Engagement Form"
          title="Capture the right details once."
          description="Tell us about your organisation, the practice or product you are interested in, and what you want to achieve."
        />
        <div className="mt-10 surface p-6 md:p-8">
          <RequestQuoteForm />
        </div>
      </section>

      <div className="shell pb-20 md:pb-24">
        <CtaBanner
          title="Want to see the product and company story before you submit?"
          description="Review the platform, services, or company routes, then return here when you are ready to scope work."
          primaryHref="/platform"
          primaryLabel="View Platform"
          secondaryHref="/company"
          secondaryLabel="View Company"
        />
      </div>
    </>
  );
}

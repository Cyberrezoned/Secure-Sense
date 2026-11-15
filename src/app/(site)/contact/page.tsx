import { ArrowRight, Mail, MessageSquareShare, Video } from 'lucide-react';

import { CtaBanner } from '@/components/company/cta-banner';
import { PageHero } from '@/components/company/page-hero';
import { SectionHeading } from '@/components/company/section-heading';
import { RequestQuoteForm } from '@/components/request-a-quote/request-quote-form';
import { Button } from '@/components/ui/button';
import { pageMetadata } from '@/lib/page-metadata';
import { studioInterest } from '@/lib/studio-growth';
import { CALL_HREF, CONTACT_EMAIL, CONTACT_EMAIL_HREF, GOOGLE_MEET_HREF, WHATSAPP_DISPLAY, WHATSAPP_HREF } from '@/lib/contact';

export const metadata = pageMetadata(
  'Contact',
  'Speak with SuleZeen about commodity supply-chain infrastructure, security services, or the ZeenTheCyber cybersecurity community.',
  '/contact'
);

const contactCards = [
  {
    title: 'WhatsApp',
    description: 'Start a conversation about your enquiry or arrange a time to speak.',
    icon: MessageSquareShare,
    action: WHATSAPP_HREF,
    actionLabel: WHATSAPP_DISPLAY,
  },
  {
    title: 'Direct email',
    description: 'For quick coordination, partnership inquiries, or follow-up on ongoing work.',
    icon: Mail,
    action: CONTACT_EMAIL_HREF,
    actionLabel: CONTACT_EMAIL,
  },
  {
    title: GOOGLE_MEET_HREF ? 'Call on Google Meet' : 'Arrange a call',
    description: GOOGLE_MEET_HREF ? 'Join our Google Meet room on your device at the agreed time.' : 'Message us on WhatsApp to agree a time and request a Google Meet invitation.',
    icon: Video,
    action: CALL_HREF,
    actionLabel: GOOGLE_MEET_HREF ? 'Open Google Meet' : 'Discuss a time on WhatsApp',
  },
];

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ studioPath?: string | string[]; securityReview?: string | string[] }> }) {
  const params = await searchParams;
  const interest = studioInterest(params.studioPath);
  const securityReview = !interest && params.securityReview === '1';
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Speak directly with SuleZeen."
        description={`A community question, a security review, a commodity workflow or a Studio idea. Email ${CONTACT_EMAIL} or message us on WhatsApp and tell us what you need.`}
        actions={
          <>
            <Button asChild size="lg">
              <a href={CALL_HREF}>
                {GOOGLE_MEET_HREF ? 'Call on Google Meet' : 'Book a call on WhatsApp'}
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={CONTACT_EMAIL_HREF}>Email your enquiry</a>
            </Button>
          </>
        }
        stats={[
          { value: 'Email', label: 'Your enquiry, straight to our inbox' },
          { value: 'WhatsApp', label: 'A direct conversation on your device' },
          { value: 'Lagos', label: 'Based in Nigeria. Open to conversations everywhere.' },
        ]}
      />

      <section className="shell py-20 md:py-24">
        <SectionHeading
          eyebrow="Contact Paths"
          title="Choose how you want to reach us."
          description="Use your email app, start a WhatsApp conversation or send the details below."
        />
        <div data-stagger className="mt-10 grid gap-5 md:grid-cols-3">
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
                  <a href={card.action} className="mt-6 inline-flex break-all text-sm font-medium text-primary hover:text-primary/80">
                    {card.actionLabel}
                  </a>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>

      <section id="engagement-form" className="shell scroll-mt-24 pb-20 md:pb-24">
        <SectionHeading
          eyebrow={securityReview ? 'Security review introduction' : 'Engagement Form'}
          title={interest ? 'Let’s plan your next step as a creator.' : securityReview ? 'Email us about your security review.' : 'Put your enquiry in our inbox.'}
          description={interest ? `Your interest: ${interest}. Tell us where you are starting and what you want help with. Your enquiry goes to ${CONTACT_EMAIL}.` : securityReview ? `Tell us what your buyer is asking for, your deadline and any known gaps. Your request goes to ${CONTACT_EMAIL} so we can arrange a free 15-minute introductory conversation.` : `Tell us about your organisation, the community resource, service or partnership you are interested in. This form sends your details to ${CONTACT_EMAIL}.`}
        />
        <div className="mt-10 surface p-6 md:p-8">
          <RequestQuoteForm key={interest || (securityReview ? 'security-review' : 'general')} studioInterest={interest} securityReview={securityReview} />
        </div>
      </section>

      <div className="shell pb-20 md:pb-24">
        <CtaBanner
          title="Want to explore SuleZeen before you submit?"
          description="Review community resources, security tools or the company story, then return here when you are ready to discuss the next step."
          primaryHref="/platform"
          primaryLabel="View Platform"
          secondaryHref="/company"
          secondaryLabel="View Company"
        />
      </div>
    </>
  );
}

import Link from 'next/link';
import { ArrowRight, BadgeCheck, Building2, Globe2, ShieldCheck, Users } from 'lucide-react';

import { CtaBanner } from '@/components/company/cta-banner';
import { PageHero } from '@/components/company/page-hero';
import { SectionHeading } from '@/components/company/section-heading';
import { Button } from '@/components/ui/button';

const companyPoints = [
  {
    title: 'Operator-led delivery',
    description: 'The company positioning is rooted in hands-on offensive security, compliance work, and software delivery.',
    icon: ShieldCheck,
  },
  {
    title: 'Business-aware security',
    description: 'Secure Sense is presented as a partner that understands risk, regulation, engineering, and executive communication together.',
    icon: Building2,
  },
  {
    title: 'Regional depth, global relevance',
    description: 'Lagos-based experience paired with frameworks and delivery patterns useful to distributed and international teams.',
    icon: Globe2,
  },
];

const credentialGroups = ['ISC2 CC', 'CNSP', 'CCEP', 'CISA', 'CEH', 'CompTIA+'];

export default function CompanyPage() {
  return (
    <>
      <PageHero
        eyebrow="Company"
        title="A cybersecurity company story built around delivery, not a personal portfolio."
        description="This route turns Secure Sense into a clearer company narrative with operating principles, capability context, and credentials that support enterprise trust."
        actions={
          <>
            <Button asChild size="lg" className="rounded-full px-6">
              <Link href="/contact">
                Talk to Secure Sense
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-6">
              <Link href="/services">Review Services</Link>
            </Button>
          </>
        }
        stats={[
          { value: 'Lagos, NG', label: 'Base of operations' },
          { value: 'Cyber + engineering', label: 'Delivery blend' },
          { value: 'Multi-framework', label: 'Assurance experience' },
        ]}
      />

      <section className="container py-20 md:py-24">
        <SectionHeading
          eyebrow="How We Operate"
          title="Designed to read like a company buyers can trust."
          description="The company page now explains why Secure Sense exists, how it delivers work, and what kind of expertise supports the engagement model."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {companyPoints.map((point) => {
            const Icon = point.icon;

            return (
              <div key={point.title} className="panel p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 font-headline text-2xl font-semibold text-foreground">{point.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{point.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container pb-20 md:pb-24">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="panel p-6 md:p-8">
            <p className="eyebrow">Leadership Snapshot</p>
            <h2 className="mt-5 font-headline text-3xl font-semibold text-foreground">Built from hands-on cybersecurity and full-stack delivery.</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              The company narrative pulls forward real operating experience across penetration testing, red team leadership,
              training, and software engineering. That makes the site feel grounded in delivery rather than generic cyber copy.
            </p>
            <div className="mt-6 space-y-3">
              {[
                'Penetration testing and red team leadership across web, API, cloud, and internal environments.',
                'Compliance mapping and audit-oriented reporting tied to business and regulatory context.',
                'Security-aware software engineering with Next.js, Python, and modern cloud tooling.',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                  <p className="text-sm leading-7 text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-6 md:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="font-headline text-2xl font-semibold text-foreground">Credentials and trust markers</p>
                <p className="text-sm text-muted-foreground">Use these as proof points, not as the entire story.</p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {credentialGroups.map((item) => (
                <div key={item} className="rounded-2xl border border-border/70 bg-background/60 px-4 py-4">
                  <p className="flex items-center gap-3 text-sm font-medium text-foreground">
                    <BadgeCheck className="h-4 w-4 text-primary" />
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-border/70 bg-background/60 p-5">
              <p className="text-sm font-semibold text-foreground">Strategic partner context</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                The company story references active work with ITSkillsCenter Cyber Division and hands-on delivery
                experience, giving the site stronger commercial positioning than a standalone portfolio.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container pb-20 md:pb-24">
        <CtaBanner
          title="Need a cybersecurity partner that can explain the work clearly to technical and executive stakeholders?"
          description="Use the contact route to start a conversation around services, platform fit, partnerships, or broader security transformation."
          primaryHref="/contact"
          primaryLabel="Start the Conversation"
          secondaryHref="/community"
          secondaryLabel="View Resources"
        />
      </div>
    </>
  );
}

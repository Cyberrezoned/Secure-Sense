import Link from 'next/link';
import { ArrowRight, Check, GitBranch, Layers3 } from 'lucide-react';

import { Button } from '@/components/ui/button';

/**
 * Delivery-model comparison for build engagements.
 *
 * Server-rendered: the previous version animated itself in with a client-side
 * anime.js timeline, which cost a hydration boundary for a static table. The
 * shared `data-reveal` scroll behaviour covers the entry now.
 */

const comparisonRows: Array<[string, string, string]> = [
  ['Budget', 'From ₦1,000,000', 'Premium, custom scoped'],
  ['Flexibility', 'Fixed requirements and scope', 'Adapts as priorities evolve'],
  ['Timeline certainty', 'Defined milestones and release date', 'Incremental releases by sprint'],
  ['Client involvement', 'Approvals at key project phases', 'Ongoing reviews and collaboration'],
  ['Delivery approach', 'One planned end-to-end release', 'Working features delivered in cycles'],
  ['Ideal for', 'Clear, stable requirements', 'Startups and complex, evolving products'],
];

const models = [
  {
    key: 'waterfall',
    icon: Layers3,
    tag: 'Structured',
    price: 'From ₦1,000,000',
    title: 'Waterfall delivery',
    copy: 'For projects with settled requirements, fixed deliverables, and a planned launch date.',
    steps: ['Discovery', 'Design', 'Build', 'Test', 'Launch'],
    points: [
      'Predictable scope, budget, and milestones',
      'Phase-by-phase approvals and documentation',
      'Best where requirements are already stable',
    ],
    href: '/request-a-quote',
    cta: 'Request a fixed-scope quote',
    variant: 'outline' as const,
  },
  {
    key: 'agile',
    icon: GitBranch,
    tag: 'Partnership',
    price: 'Custom pricing',
    title: 'Agile delivery',
    copy: 'For products where feedback and shifting priorities shape the outcome, including early-stage platforms.',
    steps: ['Plan', 'Build', 'Review', 'Improve', 'Release'],
    points: [
      'Continuous planning, feedback, and adaptation',
      'Working software released in focused cycles',
      'Flexible scope with regular collaboration',
    ],
    href: '/contact',
    cta: 'Discuss an agile engagement',
    variant: 'default' as const,
  },
];

export function DevelopmentApproach() {
  return (
    <section
      className="border-t border-hairline bg-surface"
      aria-labelledby="development-approach-title"
    >
      <div className="shell py-20 lg:py-24">
        <div data-reveal className="max-w-2xl">
          <p className="eyebrow">Software delivery</p>
          <h2 id="development-approach-title" className="display-2 mt-3">
            Choose the delivery model that fits the product
          </h2>
          <p className="lede mt-4">
            Build to a predictable plan when requirements are settled, or work iteratively when the product still
            needs room to learn.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-2" data-stagger>
          {models.map((model) => {
            const Icon = model.icon;

            return (
              <article key={model.key} className="surface flex flex-col p-6 lg:p-8">
                <div className="flex items-start justify-between gap-4">
                  <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  <span className="chip">{model.tag}</span>
                </div>

                <p className="mt-6 font-code text-xs uppercase tracking-[0.08em] text-primary">{model.price}</p>
                <h3 className="mt-2 text-xl font-semibold text-foreground">{model.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{model.copy}</p>

                <ol className="mt-7 grid grid-cols-5 gap-2" aria-label={`${model.title} process`}>
                  {model.steps.map((step, index) => (
                    <li key={step} className="text-center">
                      <span className="mx-auto flex h-7 w-7 items-center justify-center rounded-full border border-hairline bg-card text-xs font-medium tabular text-foreground">
                        {index + 1}
                      </span>
                      <span className="mt-2 block text-[0.625rem] font-medium uppercase tracking-wide text-muted-foreground">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>

                <ul className="mt-7 flex-1 space-y-2.5 text-sm text-muted-foreground">
                  {model.points.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal-ok" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Button asChild variant={model.variant} className="mt-8 self-start">
                  <Link href={model.href}>
                    {model.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </article>
            );
          })}
        </div>

        <p data-reveal className="mt-4 text-xs leading-relaxed text-muted-foreground">
          Agile carries a premium because it includes continuous planning, iteration, and adaptation for the full
          duration of the engagement.
        </p>

        <div data-reveal className="surface mt-12 overflow-hidden">
          <div className="border-b border-hairline px-6 py-5">
            <p className="eyebrow">At a glance</p>
            <h3 className="mt-2 text-lg font-semibold text-foreground">Comparing the two models</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[42rem] text-left text-sm">
              <caption className="sr-only">Waterfall and agile delivery compared across six decision points</caption>
              <thead>
                <tr className="border-b border-hairline bg-secondary/40">
                  <th scope="col" className="px-6 py-3 text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">
                    Decision point
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">
                    Waterfall
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">
                    Agile
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map(([label, waterfall, agile]) => (
                  <tr key={label} className="border-b border-hairline last:border-0">
                    <th scope="row" className="px-6 py-3.5 font-medium text-foreground">
                      {label}
                    </th>
                    <td className="px-6 py-3.5 text-muted-foreground">{waterfall}</td>
                    <td className="px-6 py-3.5 text-muted-foreground">{agile}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div
          data-reveal
          className="surface mt-4 flex flex-wrap items-center justify-between gap-5 p-6 lg:p-8"
        >
          <div>
            <p className="text-lg font-semibold text-foreground">Not sure which path fits?</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Bring your goals, budget, and timeline, and we will recommend a delivery approach.
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/contact">
              Book a consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

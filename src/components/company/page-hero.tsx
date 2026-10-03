import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type PageHeroStat = {
  label: string;
  value: string;
};

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
  aside?: ReactNode;
  stats?: PageHeroStat[];
  className?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  aside,
  stats = [],
  className,
}: PageHeroProps) {
  return (
    <section className={cn('relative overflow-hidden border-b border-hairline', className)}>
      <div className="grid-backdrop" aria-hidden="true" />
      <div className="shell relative py-20 lg:py-28">
        <div className={cn('grid gap-12', aside ? 'lg:grid-cols-[1.15fr_0.85fr] lg:items-start' : 'max-w-3xl')}>
          <div>
            <p className="eyebrow" data-reveal>
              {eyebrow}
            </p>
            <h1 data-reveal data-reveal-delay="1" className="display-1 mt-5 max-w-3xl">
              {title}
            </h1>
            <p data-reveal data-reveal-delay="2" className="lede mt-6 max-w-2xl">
              {description}
            </p>
            {actions ? (
              <div data-reveal data-reveal-delay="3" className="mt-9 flex flex-wrap items-center gap-3">
                {actions}
              </div>
            ) : null}
          </div>

          {aside ? (
            <div data-reveal data-reveal-delay="2" className="surface p-6">
              {aside}
            </div>
          ) : null}
        </div>

        {stats.length ? (
          <dl
            data-stagger
            className="mt-14 grid divide-y divide-hairline border-t border-hairline sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4"
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={cn(
                  'py-6 sm:px-6 sm:first:pl-0 lg:border-l lg:border-hairline lg:first:border-l-0',
                  index % 2 === 1 && 'sm:border-l sm:border-hairline'
                )}
              >
                <dd className="font-headline text-2xl font-semibold tabular text-foreground sm:text-3xl">
                  {stat.value}
                </dd>
                <dt className="mt-2 text-sm leading-snug text-muted-foreground">{stat.label}</dt>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  );
}

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
    <section className={cn('relative overflow-hidden border-b border-border/40', className)}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(31,227,179,0.16),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(70,138,255,0.15),transparent_26%),linear-gradient(180deg,rgba(8,13,26,0.1),rgba(8,13,26,0.85))]" />
      <div className="container relative py-20 md:py-28">
        <div className={cn('grid gap-10', aside ? 'lg:grid-cols-[1.1fr_0.9fr] lg:items-center' : 'max-w-4xl')}>
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="mt-6 max-w-4xl font-headline text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{description}</p>
            {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
            {stats.length ? (
              <dl className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-3xl border border-border/70 bg-card/70 p-5 backdrop-blur-xl">
                    <dt className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</dt>
                    <dd className="mt-3 font-headline text-2xl font-semibold text-foreground">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>

          {aside ? <div className="panel p-6 md:p-8">{aside}</div> : null}
        </div>
      </div>
    </section>
  );
}

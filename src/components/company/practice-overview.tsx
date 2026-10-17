import Link from 'next/link';
import { ArrowRight, ShieldCheck, Warehouse } from 'lucide-react';
import { practices } from '@/lib/company';

export function PracticeOverview() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {practices.map((practice, index) => {
        const Icon = index === 0 ? Warehouse : ShieldCheck;
        return (
          <article key={practice.name} className="surface flex flex-col p-7 sm:p-9">
            <div className="flex items-center justify-between border-b border-hairline pb-6">
              <p className="eyebrow">Practice / 0{index + 1}</p>
              <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
            </div>
            <h3 className="mt-7 font-headline text-3xl font-semibold">{practice.name}</h3>
            <p className="mt-3 text-lg font-medium">{practice.summary}</p>
            <p className="mt-5 flex-1 text-sm leading-7 text-muted-foreground">{practice.description}</p>
            <Link href={practice.href} className="mt-8 inline-flex items-center gap-2 self-start text-sm font-semibold text-primary">
              Explore {practice.name}<ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </article>
        );
      })}
    </div>
  );
}

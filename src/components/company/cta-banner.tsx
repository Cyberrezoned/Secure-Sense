import { CyberText } from '@/components/cybersecurity/cyber-logo';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

type CtaBannerProps = {
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  eyebrow?: string;
};

export function CtaBanner({
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  eyebrow = 'Start a conversation',
}: CtaBannerProps) {
  return (
    <section data-reveal="fade" className="border-t-2 border-primary py-10 lg:py-14">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="eyebrow"><CyberText>{eyebrow}</CyberText></p>
          <h2 className="display-2 mt-3"><CyberText>{title}</CyberText></h2>
          <p className="lede mt-4"><CyberText>{description}</CyberText></p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href={primaryHref}>
              {primaryLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          {secondaryHref && secondaryLabel ? (
            <Button asChild variant="outline" size="lg">
              <Link href={secondaryHref}>{secondaryLabel}</Link>
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}

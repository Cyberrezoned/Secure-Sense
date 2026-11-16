import { CyberText } from '@/components/cybersecurity/cyber-logo';
import { cn } from '@/lib/utils';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: 'left' | 'center';
};

export function SectionHeading({ eyebrow, title, description, align = 'left' }: SectionHeadingProps) {
  return (
    <div data-reveal className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
      <p className="eyebrow"><CyberText>{eyebrow}</CyberText></p>
      <h2 className="display-2 mt-3"><CyberText>{title}</CyberText></h2>
      <p className="lede mt-4"><CyberText>{description}</CyberText></p>
    </div>
  );
}

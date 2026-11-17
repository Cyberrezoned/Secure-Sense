import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { achievements } from '@/lib/achievements';

export function DeliveryAchievements({ securityOnly = false }: { securityOnly?: boolean }) {
  const items = securityOnly ? achievements.filter(item => item.id !== 'software') : achievements;
  return (
    <section id="delivery" className="shell editorial-section scroll-mt-24" aria-labelledby="delivery-title">
      <div className="grid gap-6 md:grid-cols-[0.45fr_1fr] md:gap-16">
        <p className="section-index">Our delivery record</p>
        <div>
          <h2 id="delivery-title" className="display-2 max-w-3xl">
            {securityOnly ? 'Security work. Delivered.' : 'Built to work. Delivered by our team.'}
          </h2>
          <p className="lede mt-5 max-w-2xl">
            {securityOnly
              ? 'Completed assessments and hands-on ISMS implementation, backed by our engineers’ practical experience.'
              : 'From functional business software to security assessments and information security management systems.'}
          </p>
        </div>
      </div>
      <dl className={`mt-12 grid gap-10 ${securityOnly ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
        {items.map(item => (
          <div key={item.id} className="border-t-2 border-primary pt-7">
            <dt className="text-sm font-semibold">{item.label}</dt>
            <dd className="mt-4 font-headline text-6xl font-semibold tracking-tight text-primary sm:text-7xl">{item.value}</dd>
            <dd className="mt-6 max-w-md text-sm leading-7 text-muted-foreground">{item.description}</dd>
            <dd><Link href={securityOnly ? '/contact?securityReview=1' : item.href} className="text-link mt-6">
              {securityOnly ? 'Discuss a similar engagement' : item.link}<ArrowUpRight size={16} aria-hidden="true" />
            </Link></dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

import { CyberLogo } from '@/components/cybersecurity/cyber-logo';
import { DeliveryAchievements } from '@/components/company/delivery-achievements';
import { StandardsSlider } from '@/components/company/standards-slider';
import Link from 'next/link';
import { ArrowDown, ArrowRight, ArrowUpRight, Clapperboard, Layers3, ShieldCheck } from 'lucide-react';
import { WorkflowExplorer } from '@/components/company/workflow-explorer';
import { CtaBanner } from '@/components/company/cta-banner';
import { COMPANY_DESCRIPTION, practices, SULEZEEN_MVP_URL } from '@/lib/company';
import { CALL_HREF } from '@/lib/contact';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata('Dispatch, Tracking and Verified Handover', COMPANY_DESCRIPTION, '/');

const destinations = [
  { ...practices[0], icon: Layers3 },
  { ...practices[1], icon: ShieldCheck },
  { name: 'Creative Studio', href: '/studio', summary: 'Creator learning paths, channel planning, and content production.', icon: Clapperboard },
];

export default function HomePage() {
  return (
    <div data-motion-area="home">
      <section className="shell pb-14 pt-12 sm:pt-16 lg:pb-20 lg:pt-20">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-foreground/20 pt-4">
          <p className="section-index">SuleZeen / Agricultural marketplaces</p>
          <p className="font-code text-[0.625rem] uppercase tracking-widest text-muted-foreground">Web3 at the core.</p>
        </div>
        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[1.6fr_1fr] lg:items-end lg:gap-16">
          <h1 className="home-title"><span className="headline-line"><span>See where it is.</span></span><span className="headline-line text-primary"><span>Know it arrived.</span></span></h1>
          <div className="hero-follow max-w-md lg:pb-1">
            <p className="text-xl leading-relaxed tracking-tight sm:text-2xl">SuleZeen helps Nigerian agricultural marketplaces dispatch vehicles, track produce in transit and confirm handover with the buyer.</p>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">We tested our Web3 approach to agricultural logistics with a truckload of dried maize from Nasarawa to Lagos. Our food technologist graded the maize as part of the pilot.</p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
              <a href={SULEZEEN_MVP_URL} className="text-link">Explore the SuleZeen MVP<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
              <Link href="/supply-chain#maize-pilot" className="text-link">Read about the pilot<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
        <div className="home-hero-footer mt-12 flex items-center justify-between border-t border-hairline pt-5 lg:mt-16">
          <span aria-hidden="true" className="home-hero-route" />
          <p className="font-code text-xs text-muted-foreground">Built in Nigeria.</p>
          <a href="#explore" className="flex items-center gap-3 text-xs font-medium">Explore SuleZeen<ArrowDown className="hero-arrow-cue h-4 w-4" aria-hidden="true" /></a>
        </div>
      </section>

      <nav id="explore" aria-label="Explore SuleZeen" className="shell scroll-mt-24 pb-12">
        <div className="practice-directory" data-stagger>
          {destinations.map(({ name, href, summary, icon: Icon }) => (
            <div key={href}>
              <Link href={href} className="practice-entry">
                <Icon className="practice-mark" aria-hidden="true" />
                <span className="text-xl font-bold">{name}</span>
                <span className="text-sm leading-6 text-muted-foreground">{summary}</span>
                <ArrowUpRight className="practice-arrow" aria-hidden="true" />
              </Link>
            </div>
          ))}
        </div>
      </nav>

      <section id="practices" className="scroll-mt-24 border-y border-hairline bg-surface">
        <div className="shell editorial-section">
          <div data-reveal className="grid gap-6 lg:grid-cols-[1fr_2fr]">
            <p className="section-index">01 / Putting Web3 to work</p>
            <h2 className="max-w-3xl text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">A record that can be checked.<br /><span className="text-muted-foreground">A system that can be defended.</span></h2>
          </div>
          <div className="home-practices mt-12 grid gap-12 border-t border-foreground/20 pt-9 md:grid-cols-2 lg:mt-16 lg:gap-20">
            <article data-reveal>
              <p className="section-index">Practice 01</p>
              <h3 className="mt-4 text-3xl font-medium sm:text-4xl">Supply Chain</h3>
              <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">A commodity platform connecting farmers, warehouses, merchants, and financiers. Graded deliveries become verified electronic warehouse receipts, linking offtake orders, invoices, and escrow advances.</p>
              <ul className="mt-6 divide-y divide-hairline border-y border-hairline text-sm"><li className="py-3">Operator-signed delivery records</li><li className="py-3">Electronic warehouse receipts and financing workflows</li><li className="py-3">Mobile PWA for low-connectivity environments</li></ul>
              <Link href="/supply-chain" className="text-link mt-7">The commodity platform<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
            </article>
            <article data-reveal>
              <p className="section-index">Cybersecurity community</p>
              <h3 className="mt-4 text-3xl font-medium sm:text-4xl"><CyberLogo variant="hero" /></h3>
              <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">SuleZeen&apos;s cybersecurity community for people learning, building and working in security. Explore research, practical tools and awareness resources, alongside security expertise from SuleZeen.</p>
              <ul className="mt-6 divide-y divide-hairline border-y border-hairline text-sm"><li className="py-3">Research and practical security explainers</li><li className="py-3">Live vulnerability intelligence and article analysis</li><li className="py-3">Learning and cybersecurity awareness</li></ul>
              <Link href="/cybersecurity" className="text-link mt-7">Explore <CyberLogo variant="inline" /><ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
              <div className="mt-5 flex flex-wrap gap-x-7 gap-y-3 text-sm text-muted-foreground"><Link href="/platform" className="hover:text-foreground">Platform capabilities</Link><Link href="/integrations" className="hover:text-foreground">Integrations</Link><Link href="/community" className="hover:text-foreground">Research</Link></div>
            </article>
          </div>
        </div>
      </section>

      <DeliveryAchievements />
      <div className="shell editorial-section"><WorkflowExplorer mode="supply" /></div>

      <section className="shell editorial-section">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-24">
          <div data-reveal><p className="section-index">02 / SuleZeen Creative Studio</p><h2 className="mt-6 text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl">Learn to create.<br />Build a channel.<br />Learn to earn.</h2><p className="mt-6 max-w-lg text-base leading-8 text-muted-foreground">A creative studio helping young people and emerging creators learn practical skills, build channels, and explore earning online. Discover content services, social media management, digital products, brand partnerships, and channel revenue, alongside AI and online awareness.</p><Link href="/studio" className="text-link mt-8">Explore the Creative Studio<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div>
          <div data-reveal data-reveal-delay="2" className="studio-sheet">
            <div className="flex justify-between gap-4 border-b border-primary/30 pb-5"><p className="section-index">Inside the Studio / The remix desk</p><span className="font-code text-xs text-primary">001</span></div>
            <p className="mt-10 text-xs uppercase tracking-widest text-muted-foreground">An idea becomes a content plan</p>
            <h3 className="mt-4 max-w-sm text-4xl font-medium leading-tight sm:text-5xl">One idea.<br />More ways to tell it.</h3>
            <p className="mt-6 max-w-sm text-sm leading-7 text-muted-foreground">See how a cybersecurity awareness topic becomes a YouTube video, a short clip, a carousel, and a website article.</p>
            <div className="mt-10 border-t border-primary/30 pt-5"><p className="font-code text-[0.625rem] uppercase tracking-wider text-muted-foreground">Create / Manage / Monetize / Stay aware</p><Link href="/studio#learn" className="text-link mt-4">Find your starting point<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div>
          </div>
        </div>
      </section>

      <div className="shell pb-12"><CtaBanner eyebrow="Work with SuleZeen" title="Bring a specific problem." description="Tell us about your commodity workflow, security requirements, or a Studio content or learning project." primaryHref={CALL_HREF} primaryLabel="Book a consultation" /></div>
      <StandardsSlider />
    </div>
  );
}

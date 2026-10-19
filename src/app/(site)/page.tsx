import Link from 'next/link';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { WorkflowExplorer } from '@/components/company/workflow-explorer';
import { CtaBanner } from '@/components/company/cta-banner';
import { COMPANY_DESCRIPTION } from '@/lib/company';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata('Trade Infrastructure and Cybersecurity', COMPANY_DESCRIPTION, '/');

export default function HomePage() {
  return (
    <>
      <section className="shell pb-14 pt-12 sm:pt-16 lg:pb-20 lg:pt-20">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-foreground/20 pt-4">
          <p className="section-index">Sule Zeen / Nigerian technology company</p>
          <p className="font-code text-[0.625rem] uppercase tracking-widest text-muted-foreground">Two practices. One company.</p>
        </div>
        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[1.6fr_1fr] lg:items-end lg:gap-16">
          <h1 className="home-title"><span className="block">Trade</span><span className="block">infrastructure.</span><span className="block text-primary">Cybersecurity.</span></h1>
          <div className="max-w-md lg:pb-1">
            <p className="text-xl leading-relaxed tracking-tight sm:text-2xl">We build commodity systems and deliver security engineering for the organisations that depend on them.</p>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">Based in Nigeria. Working across warehouse receipts, trade finance workflows, offensive security, detection, and compliance.</p>
            <Link href="/contact" className="text-link mt-8">Book a consultation<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </div>
        <div className="mt-12 flex items-center justify-between border-t border-hairline pt-5 lg:mt-16">
          <p className="font-code text-xs text-muted-foreground">Built in Nigeria.</p>
          <a href="#practices" className="flex items-center gap-3 text-xs font-medium">Explore the practices<ArrowDown className="h-4 w-4" aria-hidden="true" /></a>
        </div>
      </section>

      <section id="practices" className="scroll-mt-24 border-y border-hairline bg-surface">
        <div className="shell editorial-section">
          <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
            <p className="section-index">01 / The practices</p>
            <h2 className="max-w-3xl text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">A record that can be checked.<br /><span className="text-muted-foreground">A system that can be defended.</span></h2>
          </div>
          <div className="mt-12 grid gap-12 border-t border-foreground/20 pt-9 md:grid-cols-2 lg:mt-16 lg:gap-20">
            <article>
              <p className="section-index">Practice 01</p>
              <h3 className="mt-4 text-3xl font-medium sm:text-4xl">Supply Chain</h3>
              <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">A commodity platform connecting farmers, warehouses, merchants, and financiers. Graded deliveries become verified electronic warehouse receipts, linking offtake orders, invoices, and escrow advances.</p>
              <ul className="mt-6 divide-y divide-hairline border-y border-hairline text-sm"><li className="py-3">Operator-signed delivery records</li><li className="py-3">Electronic warehouse receipts and financing workflows</li><li className="py-3">Mobile PWA for low-connectivity environments</li></ul>
              <Link href="/supply-chain" className="text-link mt-7">The commodity platform<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
            </article>
            <article>
              <p className="section-index">Practice 02</p>
              <h3 className="mt-4 text-3xl font-medium sm:text-4xl">Cybersecurity</h3>
              <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">Technical assessments, managed detection and response, and compliance engineering. Work spans web, API, cloud, and identity, with findings and corrections tied to evidence.</p>
              <ul className="mt-6 divide-y divide-hairline border-y border-hairline text-sm"><li className="py-3">Penetration testing and red teaming</li><li className="py-3">Wazuh, Suricata, and Sigma detection engineering</li><li className="py-3">Control implementation and audit evidence</li></ul>
              <Link href="/cybersecurity" className="text-link mt-7">The security practice<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
            </article>
          </div>
        </div>
      </section>

      <div className="shell editorial-section"><WorkflowExplorer mode="supply" /></div>

      <section className="border-y border-hairline">
        <div className="shell grid gap-8 py-14 lg:grid-cols-[1fr_2fr] lg:gap-16 lg:py-20">
          <div><p className="section-index">02 / Our product brand</p><h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">ZeenTheCyber</h2><p className="mt-3 text-xs text-muted-foreground">A Sule Zeen product brand</p></div>
          <div><p className="max-w-2xl text-xl leading-relaxed sm:text-2xl">The cybersecurity platform, tools, and research retain their own identity under ZeenTheCyber.</p><div className="mt-8 flex flex-wrap gap-x-10 gap-y-5"><Link href="/products" className="text-link">Product overview<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link><Link href="/platform" className="text-link">Platform capabilities<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link></div></div>
        </div>
      </section>

      <section className="shell editorial-section">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-24">
          <div><p className="section-index">03 / Sule Zeen Creative Studio</p><h2 className="mt-6 text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl">Learn to create.<br />Build a channel.<br />Learn to earn.</h2><p className="mt-6 max-w-lg text-base leading-8 text-muted-foreground">A creative studio helping young people and emerging creators learn practical skills, build channels, and explore earning online. Discover content services, social media management, digital products, brand partnerships, and channel revenue, alongside AI and online awareness.</p><Link href="/studio" className="text-link mt-8">Explore the Creative Studio<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div>
          <div className="studio-sheet">
            <div className="flex justify-between gap-4 border-b border-primary/30 pb-5"><p className="section-index">Inside the Studio / The remix desk</p><span className="font-code text-xs text-primary">001</span></div>
            <p className="mt-10 text-xs uppercase tracking-widest text-muted-foreground">An idea becomes a content plan</p>
            <h3 className="mt-4 max-w-sm text-4xl font-medium leading-tight sm:text-5xl">One idea.<br />More ways to tell it.</h3>
            <p className="mt-6 max-w-sm text-sm leading-7 text-muted-foreground">See how a cybersecurity awareness topic becomes a YouTube video, a short clip, a carousel, and a website article.</p>
            <div className="mt-10 border-t border-primary/30 pt-5"><p className="font-code text-[0.625rem] uppercase tracking-wider text-muted-foreground">Create / Manage / Monetize / Stay aware</p><Link href="/studio#learn" className="text-link mt-4">Find your starting point<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div>
          </div>
        </div>
      </section>

      <div className="shell pb-12"><CtaBanner eyebrow="Work with Sule Zeen" title="Bring a specific problem." description="Tell us about your commodity workflow, security requirements, or a Studio content or learning project." primaryHref="/contact" primaryLabel="Book a consultation" /></div>
    </>
  );
}

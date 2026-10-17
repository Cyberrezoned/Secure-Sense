import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { studio } from '@/lib/company';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata('Studio — Digital Safety for Creators', studio.description, '/studio');

const formats = [
  { number: '01', title: 'Watch the decision.', copy: 'Short demonstrations follow one situation, show what to inspect, and explain the reasoning behind the next step.' },
  { number: '02', title: 'Keep the reference.', copy: 'Downloadable field guides give participants a checklist they can use again without replaying a video.' },
  { number: '03', title: 'Practise the response.', copy: 'Facilitated exercises use fictional scenarios so learners can rehearse a decision without exposing their own accounts or customer information.' },
];

export default function StudioPage() {
  return (
    <>
      <section className="shell editorial-section">
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-primary/40 pt-5"><p className="section-index">Sule Zeen Studio</p><p className="font-code text-[0.6875rem] uppercase tracking-wider text-muted-foreground">In development / Programme brief</p></div>
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-end lg:gap-20">
          <h1 className="editorial-title max-w-4xl">Digital safety<br />for people<br /><span className="text-primary">building online.</span></h1>
          <div className="max-w-md"><p className="text-xl leading-8">A creator's account is part of their livelihood. So are the messages they trust and the information they keep.</p><p className="mt-5 text-sm leading-7 text-muted-foreground">Sule Zeen Studio is a proposed media and learning venture drawing on our cybersecurity practice. The first programme is being designed for Nigerian creators, freelancers, and small online businesses.</p><Link href="/contact" className="text-link mt-7">Discuss the pilot<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link></div>
        </div>
      </section>

      <section className="border-y border-hairline bg-surface">
        <div className="shell editorial-section">
          <div className="grid gap-6 lg:grid-cols-[1fr_2fr]"><p className="section-index">01 / The first programme</p><div><h2 className="display-2 max-w-2xl">Three everyday decisions.<br />A practical lesson for each.</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">These are the proposed subjects for the pilot. The titles below are programme concepts; lessons and workshop dates have not yet been published.</p></div></div>
          <div className="mt-12 border-t border-foreground/25">
            {studio.series.map((series, index) => (
              <article key={series.title} className="grid gap-5 border-b border-foreground/20 py-8 md:grid-cols-[70px_1fr_1fr] lg:gap-10 lg:py-10">
                <p className="font-code text-sm text-primary">0{index + 1}</p>
                <div><p className="section-index">{series.title}</p><h3 className="mt-3 max-w-md text-2xl font-medium leading-snug sm:text-3xl">{series.example}</h3></div>
                <p className="max-w-md text-sm leading-7 text-muted-foreground md:pt-7">{series.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="shell editorial-section">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
          <div className="studio-sheet self-start">
            <div className="flex items-start justify-between gap-6 border-b border-primary/30 pb-5"><p className="section-index">Sule Zeen Studio<br />Field guide / Concept</p><p className="font-code text-sm text-primary">001</p></div>
            <h2 className="mt-10 text-4xl font-medium leading-tight sm:text-5xl">The account<br />recovery plan.</h2>
            <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">A proposed companion to the account ownership lesson.</p>
            <ol className="mt-10 divide-y divide-primary/20 border-y border-primary/20 text-sm">
              <li className="flex gap-5 py-4"><span className="font-code text-xs text-primary">01</span>Identify who controls recovery access.</li>
              <li className="flex gap-5 py-4"><span className="font-code text-xs text-primary">02</span>Review the loss-of-device scenario.</li>
              <li className="flex gap-5 py-4"><span className="font-code text-xs text-primary">03</span>Record the actions to take before an incident.</li>
            </ol>
            <p className="mt-7 font-code text-[0.625rem] uppercase tracking-wider text-muted-foreground">Programme preview / Not yet available</p>
          </div>
          <div><p className="section-index">02 / The learning format</p><h2 className="display-2 mt-5">An explanation.<br />A reference.<br />A rehearsal.</h2><div className="mt-8 divide-y divide-hairline">{formats.map((format) => <div className="py-6 first:pt-0" key={format.number}><h3 className="text-lg font-medium">{format.title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{format.copy}</p></div>)}</div></div>
        </div>
      </section>

      <section className="border-y border-hairline"><div className="shell editorial-section grid gap-8 lg:grid-cols-[1fr_2fr]"><p className="section-index">03 / Editorial standards</p><div><h2 className="display-2">The evidence belongs in the lesson.</h2><p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">Technical material will be reviewed before publication, with sources and revision dates made visible. Sponsor relationships will be disclosed. Payment will not purchase a favourable technical conclusion.</p><p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">The pilot will measure whether participants can apply a lesson to a new scenario, alongside completion, feedback, production cost, and paid demand. Audience reach alone will not establish learning.</p><p className="mt-6 text-sm text-muted-foreground">Studio is a media extension of Sule Zeen. The company's two practices remain Supply Chain and Cybersecurity.</p></div></div></section>

      <section className="shell editorial-section"><div className="grid gap-8 lg:grid-cols-[1fr_2fr]"><p className="section-index">Develop the pilot with us</p><div><h2 className="display-2 max-w-2xl">For creator communities, educators, and production partners.</h2><p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">We are developing the programme and its delivery model. Contact us to discuss audience research, a pilot workshop, or a production collaboration.</p><Link href="/contact" className="text-link mt-7">Book a consultation<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link></div></div></section>
    </>
  );
}

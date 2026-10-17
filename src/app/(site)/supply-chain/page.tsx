import Link from 'next/link';
import { WorkflowExplorer } from '@/components/company/workflow-explorer';
import { Button } from '@/components/ui/button';
import { practices } from '@/lib/company';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata(
  'Supply Chain',
  'Commodity infrastructure connecting Nigerian farmers, warehouses, merchants, and financiers through verified electronic warehouse receipts.',
  '/supply-chain',
);

const participants = [
  {
    name: 'Farmers',
    action: 'Deposit produce. Access finance.',
    detail: 'Graded produce becomes a signed warehouse record that can support trade and advances through escrow.',
  },
  {
    name: 'Warehouse operators',
    action: 'Grade the delivery. Sign the record.',
    detail: 'NCX-framework warehouses connect the physical commodity to its verified Electronic Warehouse Receipt.',
  },
  {
    name: 'Merchants',
    action: 'Place orders against receipts.',
    detail: 'Offtake orders reference the recorded commodity, connecting demand to produce held in the warehouse.',
  },
  {
    name: 'Financiers',
    action: 'Underwrite the invoice.',
    detail: 'Receipt and order records support the financing workflow before advances are disbursed to farmers.',
  },
];

export default function SupplyChainPage() {
  return (
    <>
      <section className="border-b border-hairline">
        <div className="shell editorial-section">
          <p className="section-index">Practice 01 / Supply Chain</p>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.5fr_0.7fr] lg:items-end lg:gap-16">
            <h1 className="editorial-title max-w-4xl">
              From the farm.<br />Into trade.
            </h1>
            <div className="border-l-2 border-primary pl-6">
              <p className="lede">
                Commodity infrastructure connecting Nigerian smallholder farmers,
                SEC-accredited warehouses, merchants, and financiers.
              </p>
              <p className="mt-5 text-sm leading-7 text-muted-foreground">
                A signed receipt carries the record from a graded delivery through
                an offtake order and into financing.
              </p>
            </div>
          </div>
          <a href="#commodity-workflow" className="text-link mt-10">
            Follow the commodity workflow <span aria-hidden="true">↘</span>
          </a>
        </div>
      </section>

      <section id="commodity-workflow" className="shell editorial-section scroll-mt-24">
        <div className="grid gap-6 md:grid-cols-[0.45fr_1fr] md:gap-16">
          <p className="section-index">01 / The workflow</p>
          <div>
            <h2 className="display-2 max-w-2xl">Each handover keeps its record.</h2>
            <p className="lede mt-5 max-w-2xl">
              Trace a delivery from grading to a verified e-WR, then through an order,
              invoice financing, and escrow. A hash-chained ledger connects the records.
            </p>
          </div>
        </div>
        <div className="mt-10 md:mt-14"><WorkflowExplorer mode="supply" /></div>
      </section>

      <section className="border-y border-hairline">
        <div className="shell editorial-section grid gap-10 lg:grid-cols-[0.7fr_1.5fr] lg:gap-20">
          <div>
            <p className="section-index">02 / The participants</p>
            <h2 className="display-2 mt-6 max-w-sm">A shared record.<br />Different responsibilities.</h2>
            <p className="mt-6 max-w-sm text-sm leading-7 text-muted-foreground">
              The platform brings the people holding the produce, placing the order,
              and providing the finance into one connected workflow.
            </p>
          </div>
          <dl>
            {participants.map((participant, index) => (
              <div key={participant.name} className="grid gap-3 border-t border-hairline py-7 first:border-t-0 first:pt-0 sm:grid-cols-[9rem_1fr] sm:gap-8">
                <dt>
                  <span className="section-index block">0{index + 1}</span>
                  <span className="mt-2 block text-sm font-semibold">{participant.name}</span>
                </dt>
                <dd>
                  <p className="text-xl font-medium leading-snug">{participant.action}</p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{participant.detail}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="shell editorial-section">
        <div className="blueprint-panel grid gap-10 p-7 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:p-14">
          <div>
            <p className="font-code text-xs uppercase tracking-[0.12em] text-white/70">03 / Built for the operating environment</p>
            <h2 className="mt-7 max-w-xl font-headline text-3xl font-semibold leading-tight !text-white sm:text-4xl">
              Designed for the places where trade happens.
            </h2>
          </div>
          <div className="space-y-6 text-sm leading-7 text-white/80">
            <p>
              Six roles work across a mobile PWA and web console, designed for
              low-connectivity Nigerian environments. Browser access removes the
              need for an app-store installation.
            </p>
            <p>
              Operator signatures and cryptographic verification bind the receipt to
              its record. The ledger makes changes evident through linked hashes,
              with no blockchain dependency.
            </p>
          </div>
        </div>

        <details className="mt-10 border-y border-hairline py-6">
          <summary className="cursor-pointer text-sm font-semibold marker:text-primary">Full practice profile</summary>
          <p className="mt-5 max-w-4xl text-sm leading-8 text-muted-foreground">{practices[0].description}</p>
        </details>
      </section>

      <section className="border-t border-hairline">
        <div className="shell flex flex-col gap-8 py-14 md:flex-row md:items-end md:justify-between md:py-20">
          <div className="max-w-2xl">
            <p className="section-index">Work with Sule Zeen</p>
            <h2 className="display-2 mt-4">Connect your part of the chain.</h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              Discuss a warehouse partnership, a commodity workflow, or a trade-finance integration.
            </p>
          </div>
          <Button asChild size="lg" className="self-start md:shrink-0">
            <Link href="/contact">Book a consultation <span aria-hidden="true">↗</span></Link>
          </Button>
        </div>
      </section>
    </>
  );
}

import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SecurityShowcase } from '@/components/cybersecurity/security-showcase';
import { ComplianceFrameworks } from '@/components/cybersecurity/compliance-frameworks';
import styles from './reference.module.css';
import securityStyles from './cybersecurity.module.css';
import { WorkflowExplorer } from '@/components/company/workflow-explorer';
import { cybersecurityCommunity, practices } from '@/lib/company';
import { pageMetadata } from '@/lib/page-metadata';
import { emailHref, GOOGLE_MEET_HREF, SECURITY_REVIEW_EMAIL_HREF, SECURITY_REVIEW_WHATSAPP_HREF } from '@/lib/contact';

export const metadata = pageMetadata(
  cybersecurityCommunity.name,
  cybersecurityCommunity.description,
  cybersecurityCommunity.href,
);

const communityAreas = [
  {
    name: 'Research & learning',
    description: 'Explore technical explainers on phishing, cloud security and identity, with resources to build your security knowledge.',
    href: '/community',
    action: 'Explore the research',
  },
  {
    name: 'Practical tools',
    description: 'Explore live vulnerability intelligence and article analysis to bring more context to your security decisions.',
    href: '/platform',
    action: 'Explore the tools',
  },
  {
    name: 'Integrations',
    description: 'Plan how alerts, engineering tasks and reporting should fit your team\'s tools, and scope the implementation with Sule Zeen.',
    href: '/integrations',
    action: 'Explore integrations',
  },
];

const services = [
  {
    title: 'Offensive security',
    scope: 'Penetration testing and red teaming across web, API, cloud, and identity.',
    outputs: 'Reproducible findings, supporting evidence, prioritised remediation, and retest results for the agreed scope.',
    boundary: 'Targets, permitted techniques, access, and testing windows are agreed before assessment.',
  },
  {
    title: 'Detection & response',
    scope: 'Detection engineering, alert tuning, and incident workflows across your SIEM, endpoint, and network security tools.',
    outputs: 'Detection rules, coverage reviews, triage procedures, and escalation paths for the monitored environment.',
    boundary: 'Monitoring hours, response commitments, and any 24/7 coverage are defined in the service agreement.',
  },
  {
    title: 'Compliance engineering',
    scope: 'Readiness programmes for ISO/IEC 27001, SOC 2, PCI DSS, Nigeria Data Protection Act obligations, and applicable CBN and SEC requirements.',
    outputs: 'Control mappings, an evidence register, gap assessments, and a remediation plan with named responsibilities.',
    boundary: 'The engagement supports audit readiness. Formal certification or assurance is determined by the relevant independent assessor.',
  },
  {
    title: 'Security engineering',
    scope: 'Application hardening, cloud and identity reviews, and secure development practices.',
    outputs: 'Architecture recommendations, configuration changes, and implementation checks agreed with your engineering team.',
    boundary: 'System ownership, change approvals, and verification criteria are established before implementation.',
  },
];

const industryPractices = [
  {
    name: 'NIST CSF 2.0',
    practice: 'Security strategy & governance',
    description: 'Map current risks, agree target outcomes, and prioritise improvements against a shared cybersecurity framework.',
    href: 'https://www.nist.gov/cyberframework',
  },
  {
    name: 'ISO/IEC 27001',
    practice: 'Information security management',
    description: 'Prepare the risk assessments, control ownership, and evidence needed to build and improve an information security management system.',
    href: 'https://www.iso.org/standard/27001',
  },
  {
    name: 'CIS Controls',
    practice: 'Hardening & operational security',
    description: 'Prioritise safeguards for asset inventory, access, secure configuration, logging, and vulnerability management.',
    href: 'https://www.cisecurity.org/controls/v8-1',
  },
  {
    name: 'OWASP ASVS',
    practice: 'Application security verification',
    description: 'Turn web application and service security requirements into a repeatable assessment, remediation, and verification plan.',
    href: 'https://asvs.owasp.org/',
  },
];

export default function CybersecurityPage() {
  return (
    <div className={`${styles.page} ${securityStyles.security}`} data-motion-area="cyber">
      <section className={`${styles.container} ${styles.hero} ${securityStyles.heroWithMosaic}`} aria-labelledby="security-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Sule Zeen&apos;s cybersecurity community</p>
          <div className={styles.status}><span /> Research. Tools. Practical learning.</div>
          <h1 id="security-title">ZeenTheCyber.<br />Cybersecurity,<br />put to work.</h1>
          <p className={styles.intro}>For the people who build and defend digital systems. Read threat research, work with live vulnerability intelligence, and sharpen your security practice.</p>
          <div className={styles.actions}>
            <Link href="/community" className={styles.primary}>Explore the research <ArrowRight size={17} aria-hidden="true" /></Link>
            <Link href="/platform" className={styles.secondary}>Open security tools</Link>
          </div>
          <div className={styles.heroNote}><p>Built in Nigeria. A community by Sule Zeen.</p><span>Threat research <b>&middot;</b> Live intelligence <b>&middot;</b> Practical learning</span><a href="#security-scope" className={`${styles.inlineLink} mt-4`}>Security services from Sule Zeen <ArrowRight size={16} aria-hidden="true" /></a></div>
        </div>
        <SecurityShowcase />
      </section>
      <div className={`${styles.container} ${styles.capabilities}`} aria-label="Community focus areas">
        <span>Security research</span><span>Practical learning</span><span>Cyber awareness</span><span>Security tools</span>
      </div>

      <section className={styles.explore} aria-labelledby="community-resources-title">
        <div className={styles.container}>
          <p className={styles.eyebrow}>01 / Inside ZeenTheCyber</p>
          <h2 id="community-resources-title">Explore. Learn.<br /><span>Put it into practice.</span></h2>
          <div className={styles.areaGrid} data-stagger>
            {communityAreas.map(area => <article key={area.name} className={styles.area}>
              <h3>{area.name}</h3>
              <p>{area.description}</p>
              <Link href={area.href}>{area.action}<ArrowRight size={18} aria-hidden="true" /></Link>
            </article>)}
          </div>
        </div>
      </section>

      <section id="security-scope" className="shell editorial-section scroll-mt-24">
        <div className="grid gap-6 md:grid-cols-[0.45fr_1fr] md:gap-16">
          <p className="section-index">02 / Security services from Sule Zeen</p>
          <div>
            <h2 className="display-2 max-w-2xl">A defined scope.<br />A usable handover.</h2>
            <p className="lede mt-5 max-w-2xl">
              For organisations that need hands-on support, Sule Zeen provides assessment,
              implementation and ongoing security services across commercial, open-source,
              and mixed environments. Scope and responsibilities are agreed at the start.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-foreground/30 md:mt-16" data-stagger="fade">
          {services.map((service, index) => (
            <article key={service.title} className="grid gap-7 border-b border-hairline py-9 lg:grid-cols-[0.75fr_1fr_0.85fr] lg:gap-12 lg:py-12">
              <div>
                <p className="section-index">0{index + 1}</p>
                <h3 className="mt-3 text-2xl font-semibold leading-tight">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{service.scope}</p>
              </div>
              <div>
                <p className="eyebrow">The handover</p>
                <p className="mt-4 text-base leading-7">{service.outputs}</p>
              </div>
              <div className="border-l border-hairline pl-5">
                <p className="eyebrow">Agreed before work begins</p>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{service.boundary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-hairline">
        <div className="shell editorial-section">
          <div className="grid gap-6 md:grid-cols-[0.45fr_1fr] md:gap-16">
            <p className="section-index">03 / How the work moves</p>
            <div>
              <h2 className="display-2 max-w-2xl">A finding is the beginning.</h2>
              <p className="lede mt-5 max-w-2xl">
                Follow an engagement from scope to assessment, evidence, remediation,
                and retesting. Each stage gives the next person something concrete to act on.
              </p>
            </div>
          </div>
          <div className="mt-10 md:mt-14"><WorkflowExplorer mode="security" /></div>
        </div>
      </section>

      <section className="shell editorial-section" aria-labelledby="enterprise-security-title">
        <div className="blueprint-panel grid gap-10 p-7 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:p-14">
          <div>
            <p className="font-code text-xs uppercase tracking-[0.12em] text-white/70">04 / Enterprise security, your way</p>
            <h2 id="enterprise-security-title" className="mt-7 font-headline text-3xl font-semibold leading-tight sm:text-4xl">
              Your platforms.<br />Our engineering.
            </h2>
            <p className="mt-7 max-w-md text-xl font-semibold leading-snug text-white">
              Over 20 professional engineers.<br />Expertise across different practices.
            </p>
            <p className="mt-6 max-w-md text-sm leading-7 text-white/80">
              Prefer commercial security platforms? Bring the tools your organisation
              already trusts. Sule Zeen brings together engineers across practices,
              with the engagement shaped around your environment, priorities, and internal team.
            </p>
          </div>
          <div><ComplianceFrameworks /><dl className="mt-8 divide-y divide-white/20">
            {[
              ['Commercial platforms', 'Work within your licensed SIEM, endpoint protection, cloud, and identity platforms. Agree the integrations, access, and vendor support your environment needs.'],
              ['Open-source stacks', 'Build on inspectable tooling such as Wazuh, Suricata, and Sigma for monitoring, network detection, and adaptable detection rules.'],
              ['Mixed environments', 'Connect commercial and open-source systems through consistent alerts, incident workflows, control evidence, and a clear handover to your team.'],
            ].map(([name, description]) => (
              <div key={name} className="grid gap-2 py-5 first:pt-0 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <dt className="text-lg font-semibold text-white">{name}</dt>
                <dd className="text-sm leading-7 text-white/80">{description}</dd>
              </div>
            ))}
          </dl></div>
        </div>

        <div className="mt-14 md:mt-20" aria-labelledby="industry-practices-title">
          <div className="grid gap-6 md:grid-cols-[0.45fr_1fr] md:gap-16" data-reveal>
            <p className="section-index">Recognised frameworks &amp; standards</p>
            <div>
              <h2 id="industry-practices-title" className="display-2 max-w-2xl">Enterprise rigour.<br />Evidence at every step.</h2>
              <p className="lede mt-5 max-w-2xl">The tools can differ. The work still needs clear requirements,
                tested controls, and evidence your team can use. We agree the relevant frameworks
                and verification criteria for each engagement.</p>
            </div>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {[
              ['Scope & gap assessment', 'Define the environment, identify applicable requirements and record control gaps.'],
              ['Remediation & controls', 'Assign owners, implement safeguards and verify corrective actions.'],
              ['PCI DSS VAPT', 'Assess vulnerabilities and penetration-test agreed in-scope payment systems.'],
              ['Documentation & evidence', 'Organise policies, procedures, test results and evidence for independent validation.'],
              ['Ongoing support', 'Agree optional monitoring, advisory and recurring control reviews.'],
            ].map(([title, copy], index) => <article key={title} className="border-t-2 border-foreground py-6"><p className="section-index">0{index + 1}</p><h3 className="mt-4 text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{copy}</p></article>)}
          </div>
          <div className="mt-10 grid gap-x-12 md:grid-cols-2" data-stagger="fade">
            {industryPractices.map(item => <article key={item.name} className="border-t border-hairline py-8">
              <p className="section-index">{item.practice}</p>
              <h3 className="mt-3 text-2xl font-semibold leading-tight">{item.name}</h3>
              <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">{item.description}</p>
              <a href={item.href} className={`${styles.inlineLink} mt-5`} aria-label={`Read the official ${item.name} reference`}>Official reference <ArrowUpRight size={16} aria-hidden="true" /></a>
            </article>)}
          </div>
          <a href={emailHref('Enterprise security enquiry', 'Hello Sule Zeen,\n\nI would like to discuss security support for our organisation.\nOur current platforms:\nThe security practices we need help with:\nOur standards or audit requirements:\nOur timeline:')} className={`${styles.inlineLink} mt-6`}>Discuss your security requirements <ArrowRight size={17} aria-hidden="true" /></a>
        </div>

        <details className="mt-10 border-y border-hairline py-6">
          <summary className="cursor-pointer text-sm font-semibold marker:text-primary">About ZeenTheCyber</summary>
          <p className="mt-5 max-w-4xl text-sm leading-8 text-muted-foreground">{practices[1].description}</p>
          <p className="mt-4 max-w-4xl border-l-2 border-primary pl-4 text-sm leading-7">
            Service hours, including any 24/7 coverage, response commitments, and the
            systems covered are agreed in the engagement contract.
          </p>
        </details>
      </section>

      <section className={securityStyles.reviewCta} aria-labelledby="security-review-title">
        <div className={securityStyles.reviewInner}>
          <p className={securityStyles.reviewEyebrow}>Sule Zeen / For founders</p>
          <h2 id="security-review-title">Security review slowing<br />your next deal?</h2>
          <p className={securityStyles.reviewCopy}>A buyer questionnaire. A pen test. An audit deadline. Bring what&apos;s blocking the deal&mdash;we&apos;ll help you scope the next step in a free 15-minute call. No obligation.</p>
          <div className={securityStyles.reviewActions}>
            <a href={GOOGLE_MEET_HREF ?? SECURITY_REVIEW_WHATSAPP_HREF} className={securityStyles.reviewButton}>{GOOGLE_MEET_HREF ? 'Call on Google Meet' : 'Book a call on WhatsApp'} <ArrowUpRight size={20} aria-hidden="true" /></a>
            <a href={SECURITY_REVIEW_EMAIL_HREF} className={securityStyles.reviewEmail}>Email your enquiry <ArrowRight size={16} aria-hidden="true" /></a>
          </div>
          <ul className={securityStyles.reviewTopics} aria-label="What we can discuss">
            <li>Security questionnaires</li><li>Penetration testing</li><li>Audit readiness</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

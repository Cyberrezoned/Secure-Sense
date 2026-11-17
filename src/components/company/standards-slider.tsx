'use client';

import { useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import styles from './standards-slider.module.css';

type Standard = { name: string; detail: string; href: string; crop?: [number, number, number, number]; logo?: string };
const standards: Standard[] = [
  { name: 'ISO/IEC 27001', detail: 'Information security management', href: 'https://www.iso.org/standard/27001' },
  { name: 'OWASP ASVS', detail: 'Application security verification', href: 'https://asvs.owasp.org/', logo: '/images/standards/owasp.svg' },
  { name: 'NIST CSF', detail: 'Cybersecurity Framework 2.0', href: 'https://www.nist.gov/cyberframework' },
  { name: 'CIS Controls', detail: 'Prioritised security safeguards', href: 'https://www.cisecurity.org/controls/v8-1' },
  { name: 'PCI DSS', detail: 'Payment-data security', href: 'https://www.pcisecuritystandards.org/document_library/' },
  { name: 'CBN', detail: 'Financial-sector cybersecurity', href: 'https://www.cbn.gov.ng/', crop: [279, 99, 69, 84] },
  { name: 'NDPA', detail: 'Nigeria Data Protection Act', href: 'https://ndpc.gov.ng/', crop: [529, 104, 65, 74] },
  { name: 'SEC', detail: 'Capital-market requirements', href: 'https://sec.gov.ng/', crop: [763, 101, 70, 78] },
];

function StandardMark({ item }: { item: Standard }) {
  return <>
    <span className={styles.mark}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {item.logo && <img className={styles.originalLogo} src={item.logo} width={42} height={42} alt="" loading="lazy" />}
      {item.crop && <span className={styles.suppliedLogo} style={{ aspectRatio: `${item.crop[2]} / ${item.crop[3]}` }}>
        {/* Original artwork supplied by the company, displayed without alteration. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/cybersecurity/compliance-reference.jpeg" alt="" loading="lazy" style={{ width: `${1208 / item.crop[2] * 100}%`, left: `${-item.crop[0] / item.crop[2] * 100}%`, top: `${-item.crop[1] / item.crop[3] * 100}%` }} />
      </span>}
      <span>{item.name}</span>
    </span>
    <span className={styles.detail}>{item.detail}</span>
  </>;
}

export function StandardsSlider() {
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();
  return (
    <section className={styles.section} aria-label="Standards and regulatory frameworks" data-still={reduced} data-paused={paused}>
      <div className={`shell ${styles.heading}`}>
        <div><p className="section-index">Standards &amp; regulatory frameworks</p><h2>Recognised standards. Practical application.</h2><p className={styles.intro}>Frameworks that guide our security engineering, assessments and compliance work.</p></div>
        <button type="button" onClick={() => setPaused(value => !value)} disabled={reduced} aria-pressed={paused} aria-label={reduced ? 'Standards animation disabled by reduced-motion preference' : paused ? 'Resume standards animation' : 'Pause standards animation'}>
          {paused || reduced ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
          {reduced ? 'Motion reduced' : paused ? 'Resume' : 'Pause'}
        </button>
      </div>
      <div className={styles.viewport}>
        <div className={styles.track}>
          <ul className={styles.group}>
            {standards.map(item => <li key={item.name}><a href={item.href} aria-label={`${item.name}: ${item.detail}. Official reference.`}><StandardMark item={item} /></a></li>)}
          </ul>
          <ul className={`${styles.group} ${styles.duplicate}`} aria-hidden="true">
            {standards.map(item => <li key={item.name}><a href={item.href} tabIndex={-1}><StandardMark item={item} /></a></li>)}
          </ul>
        </div>
      </div>
      <p className={`shell ${styles.note}`}>Applied to each engagement&apos;s agreed scope. Framework references and identifying marks do not imply certification or endorsement.</p>
    </section>
  );
}

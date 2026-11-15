'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import styles from './compliance-frameworks.module.css';

const frameworks = [
  { name: 'CBN', title: 'Financial-sector cybersecurity', copy: 'Scope applicable CBN cybersecurity requirements, map controls and organise evidence for regulated financial institutions.', color: '#176a3c', crop: [279, 99, 69, 84], href: 'https://www.cbn.gov.ng/Out/2024/BSD/CBN%20Risk-Based%20Cybersecurity%20Framework%20for%20DMBs%20and%20PSBs_2024.pdf' },
  { name: 'NDPA', title: 'Data protection & privacy', copy: 'Assess personal-data handling, privacy governance and safeguards against the Nigeria Data Protection Act 2023.', color: '#13843c', crop: [529, 104, 65, 74], href: 'https://ndpc.gov.ng/wp-content/uploads/2024/03/Nigeria_Data_Protection_Act_2023.pdf' },
  { name: 'SEC', title: 'Capital-market risk & governance', copy: 'Identify applicable SEC requirements and prepare risk policies, control ownership and supporting evidence for capital-market operators.', color: '#ae7915', crop: [763, 101, 70, 78], href: 'https://sec.gov.ng/for-investors/keep-track-of-circulars/implementation-of-enterprise-risk-management/' },
  { name: 'PCI DSS', title: 'Payment-data security', copy: 'Review the cardholder data environment against PCI DSS v4.0.1, address control gaps and test in-scope systems.', color: '#008b9a', crop: [974, 102, 89, 76], href: 'https://www.pcisecuritystandards.org/document_library/' },
  { name: 'ISO/IEC 27001', title: 'Information security management', copy: 'Build an ISMS readiness programme around risk assessment, control implementation, internal review and audit evidence.', color: '#3564c4', crop: [653, 0, 70, 77], href: 'https://www.iso.org/standard/27001' },
];

export function ComplianceFrameworks() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(true);
  const reduced = usePrefersReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    if (root.current) observer.observe(root.current);
    const update = () => setVisible(!document.hidden);
    update();
    document.addEventListener('visibilitychange', update);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update); };
  }, []);
  useEffect(() => {
    if (paused || reduced || !inView || !visible) return;
    const timer = window.setInterval(() => setActive(index => (index + 1) % frameworks.length), 4500);
    return () => window.clearInterval(timer);
  }, [paused, reduced, inView, visible]);
  const item = frameworks[active];
  return <div ref={root} className={styles.panel} aria-label="Regulatory and compliance practices">
    <div className={styles.top}><span>Regulatory &amp; compliance practices</span><button type="button" onClick={() => setPaused(value => !value)} disabled={reduced}>{reduced ? 'Motion reduced' : paused ? 'Play rotation' : 'Pause rotation'}</button></div>
    <div className={styles.tabs} aria-label="Select a framework">
      {frameworks.map((framework, index) => <button type="button" key={framework.name} aria-pressed={active === index} onClick={() => { setActive(index); setPaused(true); }} style={{ borderColor: active === index ? framework.color : undefined }}>
        <span className={styles.logo} style={{ aspectRatio: `${framework.crop[2]} / ${framework.crop[3]}` }}>
          {/* Display only the supplied mark, without redrawing or recolouring it. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/cybersecurity/compliance-reference.jpeg" alt="" style={{ width: `${1208 / framework.crop[2] * 100}%`, left: `${-framework.crop[0] / framework.crop[2] * 100}%`, top: `${-framework.crop[1] / framework.crop[3] * 100}%` }} />
        </span><span>{framework.name}</span>
      </button>)}
    </div>
    <div className={styles.stage} aria-live={paused ? 'polite' : 'off'}>
      <AnimatePresence mode="wait" initial={false}><motion.div key={item.name} initial={{ opacity: 0, y: reduced ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -8 }} transition={{ duration: reduced ? 0 : 0.25 }}>
        <p className={styles.label} style={{ color: item.color }}>{item.name} / Readiness &amp; control alignment</p>
        <h3>{item.title}</h3><p>{item.copy}</p><a href={item.href}>Explore the official framework ↗</a>
      </motion.div></AnimatePresence>
    </div>
    <p className={styles.note}>Framework references describe engagement scope. Logos identify their respective organisations; they do not imply endorsement or certification.</p>
  </div>;
}

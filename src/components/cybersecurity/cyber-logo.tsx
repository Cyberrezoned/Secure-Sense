import Image from 'next/image';
import { Fragment } from 'react';
import { cn } from '@/lib/utils';
import styles from './cyber-brand.module.css';

export function CyberLogo({ variant = 'compact', tagline = false }: { variant?: 'compact' | 'inline' | 'hero'; tagline?: boolean }) {
  return <span role="img" aria-label="ZeenTheCyber" className={cn(styles.lockup, styles[variant])}>
    <Image src="/images/zeenthecyber/shield.svg" alt="" width={72} height={80} className={styles.shield} unoptimized />
    <span aria-hidden="true"><span className={styles.name}>ZeenThe<span className={styles.blue}>Cyber</span></span>{tagline && <span className={styles.tagline}>SECURE TODAY. STRONGER TOMORROW.</span>}</span>
  </span>;
}

/** Preserve accessible prose while displaying the brand as its logo. */
export function CyberText({ children }: { children: string }) {
  return <>{children.split('ZeenTheCyber').map((part, index) => <Fragment key={index}>{index > 0 && <CyberLogo variant="inline" />}{part}</Fragment>)}</>;
}

'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Scroll reveals for server-rendered content.
 *
 * Ownership rule: this component drives opacity and transform, through CSS
 * classes, on `[data-reveal]` elements and on the direct children of
 * `[data-stagger]` elements. Nothing animated by motion/react may be one of
 * those elements, or the two systems would fight over the same transform.
 *
 * Content is visible by default. An element is hidden only after this effect
 * has measured it below the fold and started observing it, so a script error,
 * a missing IntersectionObserver or reduced motion all leave the page readable.
 */

const SELECTOR = '[data-reveal], [data-stagger]';
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
const PENDING = 'reveal-pending';
const ENTERING = 'reveal-in';
// Longest reveal: slowest area duration plus the last stagger delay.
const SETTLE_MS = 1500;

export function MotionOrchestrator() {
  const pathname = usePathname();

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;

    const preference = window.matchMedia(REDUCED_MOTION);
    const armed = new Set<Element>();
    const timers = new Set<number>();
    let observer: IntersectionObserver | null = null;

    const stop = () => {
      observer?.disconnect();
      observer = null;
      timers.forEach((timer) => window.clearTimeout(timer));
      timers.clear();
      armed.forEach((item) => item.classList.remove(PENDING, ENTERING));
      armed.clear();
    };

    const reveal = (item: Element) => {
      item.classList.remove(PENDING);
      item.classList.add(ENTERING);
      // Drop the transition once it has run so it cannot override a
      // component's own hover or focus transitions afterwards.
      const timer = window.setTimeout(() => {
        timers.delete(timer);
        armed.delete(item);
        item.classList.remove(ENTERING);
      }, SETTLE_MS);
      timers.add(timer);
    };

    const start = () => {
      stop();
      if (preference.matches) return;

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            observer?.unobserve(entry.target);
            reveal(entry.target);
          });
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
      );

      const fold = window.innerHeight * 0.92;
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((item) => {
        const rect = item.getBoundingClientRect();
        // Never hide what the visitor can already see, or anything unmeasurable.
        if (rect.top < fold || (rect.width === 0 && rect.height === 0)) return;
        item.classList.add(PENDING);
        armed.add(item);
        observer?.observe(item);
      });
    };

    // Reveal every pending ancestor of a keyboard target, including nested groups.
    const showFocused = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      let item = event.target.closest(`.${PENDING}`);
      while (item) {
        observer?.unobserve(item);
        armed.delete(item);
        item.classList.remove(PENDING);
        item = item.parentElement?.closest(`.${PENDING}`) ?? null;
      }
    };

    start();
    document.addEventListener('focusin', showFocused);
    preference.addEventListener('change', start);
    return () => {
      document.removeEventListener('focusin', showFocused);
      preference.removeEventListener('change', start);
      stop();
    };
  }, [pathname]);

  return null;
}

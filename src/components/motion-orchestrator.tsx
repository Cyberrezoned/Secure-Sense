'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const motionSelector = '[data-reveal], [data-stagger]';

export function MotionOrchestrator() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const items = Array.from(document.querySelectorAll<HTMLElement>(motionSelector));
    const viewportHeight = window.innerHeight;
    const visibleItems = new Set(
      items.filter((item) => {
        const rect = item.getBoundingClientRect();
        return rect.top < viewportHeight * 0.92 && rect.bottom > 0;
      })
    );

    visibleItems.forEach((item) => item.classList.add('is-visible'));
    document.documentElement.dataset.motion = 'ready';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );

    items.filter((item) => !visibleItems.has(item)).forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

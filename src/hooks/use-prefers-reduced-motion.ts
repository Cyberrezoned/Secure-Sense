'use client';

import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(onChange: () => void) {
  const query = window.matchMedia(QUERY);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

const readPreference = () => window.matchMedia(QUERY).matches;
// The server cannot know the preference, so it renders the still version.
const serverPreference = () => true;

/**
 * The visitor's reduced-motion preference, kept current for the whole session.
 *
 * Motion's own `useReducedMotion` reads the setting once at mount, so a visitor
 * who switches it mid-session keeps the old behaviour. This hook re-renders on
 * change. It also reports `true` during server rendering and hydration, which
 * means nothing animates until the real preference is known.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, readPreference, serverPreference);
}

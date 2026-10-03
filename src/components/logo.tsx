import type { SVGProps } from 'react';

/**
 * Monoline shield mark. Single-colour and token-driven, so it inherits the
 * surrounding text colour and reads correctly in both themes and at favicon size.
 */
export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M16 2.75 27 8v9.4c0 5.3-4.4 9.9-11 12.1-6.6-2.2-11-6.8-11-12.1V8l11-5.25Z" />
      <path d="M11.4 16.2 14.8 19.6 21 13.2" />
    </svg>
  );
}

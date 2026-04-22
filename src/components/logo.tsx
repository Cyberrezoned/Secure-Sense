import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>Secure Sense Logo</title>
      <path
        d="M12 2 5 5.5v6.1c0 4.4 2.7 8.2 7 10.4 4.3-2.2 7-6 7-10.4V5.5L12 2Z"
        fill="hsl(var(--primary) / 0.14)"
      />
      <path d="M12 2 5 5.5v6.1c0 4.4 2.7 8.2 7 10.4 4.3-2.2 7-6 7-10.4V5.5L12 2Z" />
      <path d="M9 10.5h6" />
      <path d="M9.5 14.5h5" />
      <path d="M12 6.5v8" />
    </svg>
  );
}

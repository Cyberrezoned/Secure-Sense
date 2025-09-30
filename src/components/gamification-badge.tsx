import { cn } from '@/lib/utils';
import type { SVGProps } from 'react';
import type { LucideProps } from 'lucide-react';

interface BadgeProps extends SVGProps<SVGSVGElement> {
  icon: React.ComponentType<LucideProps>;
}

export function GamificationBadge({ icon: Icon, className, ...props }: BadgeProps) {
  return (
    <div className={cn("relative h-24 w-24", className)}>
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 h-full w-full"
        {...props}
      >
        <defs>
          <linearGradient id="badge-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: 'hsl(var(--chart-2))', stopOpacity: 0.6 }} />
          </linearGradient>
          <filter id="glow">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="hsl(var(--primary))" />
          </filter>
        </defs>
        <path
          d="M50 2 L98 25 L98 75 L50 98 L2 75 L2 25 Z"
          fill="hsl(var(--card) / 0.8)"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          filter="url(#glow)"
        />
        <path
          d="M50 2 L98 25 L98 75 L50 98 L2 75 L2 25 Z"
          fill="transparent"
          stroke="url(#badge-gradient)"
          strokeWidth="1.5"
        />
      </svg>
      <Icon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 text-primary glow-sm" />
    </div>
  );
}

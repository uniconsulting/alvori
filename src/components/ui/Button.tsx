import Link from 'next/link';
import { ReactNode } from 'react';
import { cn } from '@/lib/cn';

const variants = {
  primary: 'bg-[var(--accent-1)] text-[var(--accent-1-text)] hover:opacity-90',
  secondary: 'bg-[var(--surface-soft)] text-[var(--text)] hover:opacity-90',
  inverted: 'bg-[var(--accent-2)] text-[var(--accent-2-text)] hover:opacity-90',
};

export function Button({
  children,
  href,
  variant = 'primary',
  className,
}: {
  children: ReactNode;
  href: string;
  variant?: keyof typeof variants;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex min-h-12 items-center justify-center rounded-[24px] px-5 py-3 text-[15px] font-medium lowercase transition',
        variants[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}

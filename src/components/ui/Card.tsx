import { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('rounded-[32px] bg-[var(--surface)] p-5 shadow-[var(--shadow-soft)] md:p-6', className)}>{children}</div>;
}

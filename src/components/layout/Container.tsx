import { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mx-auto w-full max-w-[1440px] px-4 md:px-6 xl:px-10', className)}>{children}</div>;
}

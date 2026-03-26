'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';
import { sitePath } from '@/lib/site-path';

export function ThemeLogo({
  placement,
  className,
}: {
  placement: 'header' | 'footer';
  className?: string;
}) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      setTheme(root.dataset.theme === 'dark' ? 'dark' : 'light');
    });

    setTheme(root.dataset.theme === 'dark' ? 'dark' : 'light');
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });

    return () => observer.disconnect();
  }, []);

  const logoMap = {
    header: {
      light: `${sitePath}/brand/header/light/logo.svg`,
      dark: `${sitePath}/brand/header/dark/logo.svg`,
    },
    footer: {
      light: `${sitePath}/brand/footer/light/logo.svg`,
      dark: `${sitePath}/brand/footer/dark/logo.svg`,
    },
  } as const;

  return (
    <img
      src={logoMap[placement][theme]}
      alt="Алвори"
      className={cn(
        placement === 'header' ? 'h-6 w-auto' : 'h-7 w-auto',
        className,
      )}
    />
  );
}

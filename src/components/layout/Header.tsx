'use client';

import Link from 'next/link';
import { Calculator, FileText, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Container } from '@/components/layout/Container';
import { ThemeLogo } from '@/components/ui/ThemeLogo';
import { contacts } from '@/content/contacts';
import { navigation } from '@/content/navigation';
import { cn } from '@/lib/cn';

type ThemeMode = 'light' | 'dark';

export function Header() {
  const [theme, setTheme] = useState<ThemeMode>('light');

  useEffect(() => {
    const root = document.documentElement;
    const current = root.dataset.theme === 'dark' ? 'dark' : 'light';
    setTheme(current);

    const observer = new MutationObserver(() => {
      setTheme(root.dataset.theme === 'dark' ? 'dark' : 'light');
    });

    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });

    return () => observer.disconnect();
  }, []);

  const handleThemeToggle = () => {
    const root = document.documentElement;
    const current: ThemeMode = root.dataset.theme === 'dark' ? 'dark' : 'light';
    const next: ThemeMode = current === 'dark' ? 'light' : 'dark';

    root.dataset.theme = next;
    window.localStorage.setItem('theme', next);
    setTheme(next);
  };

  return (
    <header className="relative z-30 pt-8 md:pt-10 xl:pt-12">
      <Container>
        <div className="hidden items-center xl:flex">
          <LogoBlock />
          <OuterDivider className="ml-[41px]" />
          <AnchorNav className="ml-[41px]" />
          <OuterDivider className="ml-[41px]" />
          <PhoneBlock className="ml-[41px]" />
          <UtilityCluster className="ml-[41px]" theme={theme} onToggleTheme={handleThemeToggle} />
        </div>

        <div className="flex items-center justify-between xl:hidden">
          <div className="h-[48px] w-[184px]">
            <ThemeLogo placement="header" className="h-full w-full object-contain object-left" />
          </div>

          <div className="flex h-[56px] items-center gap-2 rounded-[24px] bg-[var(--accent-2)] px-[7px]">
            <CompactAction href="#pricing" variant="accent" ariaLabel="калькулятор">
              <Calculator size={20} strokeWidth={1.8} />
            </CompactAction>
            <CompactAction href="/request/" variant="neutral" ariaLabel="запрос кп" theme={theme}>
              <FileText size={20} strokeWidth={1.8} />
            </CompactAction>
            <button
              type="button"
              onClick={handleThemeToggle}
              aria-label="смена темы"
              className={cn(
                'inline-flex h-[42px] w-[42px] items-center justify-center rounded-[16px] transition hover:opacity-85',
                theme === 'light'
                  ? 'bg-[var(--surface)] text-[var(--text)]'
                  : 'bg-[var(--accent-3)] text-[var(--accent-3-text)]',
              )}
            >
              <Moon size={20} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}

function LogoBlock() {
  return (
    <div className="h-[60px] w-[230px] shrink-0">
      <ThemeLogo placement="header" className="h-full w-full object-contain object-left" />
    </div>
  );
}

function OuterDivider({ className }: { className?: string }) {
  return <span className={cn('block h-[60px] w-[2px] shrink-0 rounded-full bg-[var(--accent-2)]', className)} />;
}

function AnchorNav({ className }: { className?: string }) {
  return (
    <nav className={cn('flex h-[60px] w-[570px] shrink-0 items-center justify-center rounded-[24px] bg-[var(--surface)] shadow-[var(--shadow-soft)]', className)}>
      {navigation.map((item, index) => (
        <div key={item.href} className="flex shrink-0 items-center">
          <Link href={item.href} className="text-[17px] font-medium lowercase leading-none tracking-[-0.01em] text-[var(--text)] transition hover:opacity-75">
            {item.label}
          </Link>
          {index < navigation.length - 1 ? <span className="mx-[21px] block h-[30px] w-[2px] shrink-0 rounded-full bg-[var(--bg)]" /> : null}
        </div>
      ))}
    </nav>
  );
}

function PhoneBlock({ className }: { className?: string }) {
  return (
    <a href={contacts.phoneHref} className={cn('shrink-0 text-[18px] font-semibold leading-none tracking-[-0.02em] text-[var(--text)] transition hover:opacity-80', className)}>
      {contacts.phoneDisplay}
    </a>
  );
}

function UtilityCluster({ className, theme, onToggleTheme }: { className?: string; theme: ThemeMode; onToggleTheme: () => void }) {
  return (
    <div className={cn('flex h-[60px] w-[158px] shrink-0 items-center gap-[8px] rounded-[24px] bg-[var(--accent-2)] px-[8px]', className)}>
      <UtilityLinkButton href="#pricing" variant="accent" ariaLabel="калькулятор">
        <Calculator size={22} strokeWidth={1.8} />
      </UtilityLinkButton>
      <UtilityLinkButton href="/request/" variant="neutral" ariaLabel="запрос кп" theme={theme}>
        <FileText size={22} strokeWidth={1.8} />
      </UtilityLinkButton>
      <button
        type="button"
        onClick={onToggleTheme}
        aria-label="смена темы"
        className={cn(
          'inline-flex h-[42px] w-[42px] items-center justify-center rounded-[16px] transition hover:opacity-85',
          theme === 'light' ? 'bg-[var(--surface)] text-[var(--text)]' : 'bg-[var(--accent-3)] text-[var(--accent-3-text)]',
        )}
      >
        <Moon size={22} strokeWidth={1.8} />
      </button>
    </div>
  );
}

function UtilityLinkButton({ children, href, ariaLabel, variant, theme = 'light' }: { children: React.ReactNode; href: string; ariaLabel: string; variant: 'accent' | 'neutral'; theme?: ThemeMode }) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={cn(
        'inline-flex h-[42px] w-[42px] items-center justify-center rounded-[16px] transition hover:opacity-85',
        variant === 'accent'
          ? 'bg-[var(--accent-1)] text-[var(--accent-1-text)]'
          : theme === 'light'
            ? 'bg-[var(--surface)] text-[var(--text)]'
            : 'bg-[var(--accent-3)] text-[var(--accent-3-text)]',
      )}
    >
      {children}
    </Link>
  );
}

function CompactAction({ children, href, ariaLabel, variant, theme = 'light' }: { children: React.ReactNode; href: string; ariaLabel: string; variant: 'accent' | 'neutral'; theme?: ThemeMode }) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={cn(
        'inline-flex h-[42px] w-[42px] items-center justify-center rounded-[16px] transition hover:opacity-85',
        variant === 'accent'
          ? 'bg-[var(--accent-1)] text-[var(--accent-1-text)]'
          : theme === 'light'
            ? 'bg-[var(--surface)] text-[var(--text)]'
            : 'bg-[var(--accent-3)] text-[var(--accent-3-text)]',
      )}
    >
      {children}
    </Link>
  );
}

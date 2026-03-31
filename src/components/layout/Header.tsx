'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { homeNavigation } from '@/content/navigation';
import { ThemeLogo } from '@/components/ui/ThemeLogo';

function scrollToHeroScene(scene: 'services' | 'about') {
  if (typeof window === 'undefined') return;

  const root = document.getElementById('hero-services-stage');
  if (!root) return;

  const rect = root.getBoundingClientRect();
  const pageTop = window.scrollY + rect.top;
  const maxScrollable = Math.max(root.offsetHeight - window.innerHeight, 0);

  const progress = scene === 'services' ? 0.24 : 0.88;
  const targetY = pageTop + maxScrollable * progress;

  window.scrollTo({
    top: targetY,
    behavior: 'smooth',
  });
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  return (
    <>
      <header className="fixed left-0 top-0 z-[100] w-full">
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-4 pb-0 pt-4 md:px-5 xl:px-6">
          <Link
            href="/"
            className="header-glass-panel inline-flex h-[56px] items-center rounded-[22px] px-5"
            aria-label="АЛВОРИ"
          >
            <ThemeLogo className="h-[22px] w-auto" />
          </Link>

          <nav className="header-glass-panel hidden h-[56px] items-center gap-7 rounded-[22px] px-6 lg:inline-flex">
            {homeNavigation.map((item) => {
              const isServices = item.href === '#services';
              const isAbout = item.href === '#about';

              if (isServices || isAbout) {
                return (
                  <button
                    key={item.href}
                    type="button"
                    onClick={() => scrollToHeroScene(isServices ? 'services' : 'about')}
                    className="text-[15px] font-semibold lowercase tracking-[-0.02em] text-[var(--text)] transition-opacity duration-200 hover:opacity-60"
                    style={{ fontFamily: 'var(--font-body-text)' }}
                  >
                    {item.label}
                  </button>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[15px] font-semibold lowercase tracking-[-0.02em] text-[var(--text)] transition-opacity duration-200 hover:opacity-60"
                  style={{ fontFamily: 'var(--font-body-text)' }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/calculator"
              className="header-utility-button inline-flex h-[56px] items-center rounded-[22px] px-5 text-[15px] font-semibold lowercase tracking-[-0.02em] text-[var(--text)]"
              style={{ fontFamily: 'var(--font-body-text)' }}
            >
              рассчитать стоимость
            </Link>

            <Link
              href="/request"
              className="header-utility-button inline-flex h-[56px] items-center rounded-[22px] bg-[var(--accent-1)] px-5 text-[15px] font-semibold lowercase tracking-[-0.02em] text-white"
              style={{ fontFamily: 'var(--font-body-text)' }}
            >
              запросить или отправить кп
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="header-glass-panel inline-flex h-[56px] w-[56px] items-center justify-center rounded-[22px] lg:hidden"
            aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X size={22} strokeWidth={2.1} className="text-[var(--text)]" />
            ) : (
              <Menu size={22} strokeWidth={2.1} className="text-[var(--text)]" />
            )}
          </button>
        </div>
      </header>

      {isMenuOpen ? (
        <div className="fixed inset-0 z-[95] bg-[rgba(246,246,246,0.82)] backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex h-full w-full max-w-[1440px] flex-col px-4 pt-[92px] md:px-5 xl:px-6">
            <div className="rounded-[28px] bg-[var(--surface)] p-6 shadow-[0_20px_48px_rgba(38,41,46,0.08)]">
              <div className="flex flex-col gap-5">
                {homeNavigation.map((item) => {
                  const isServices = item.href === '#services';
                  const isAbout = item.href === '#about';

                  if (isServices || isAbout) {
                    return (
                      <button
                        key={item.href}
                        type="button"
                        onClick={() => {
                          setIsMenuOpen(false);
                          scrollToHeroScene(isServices ? 'services' : 'about');
                        }}
                        className="text-left text-[18px] font-semibold lowercase tracking-[-0.02em] text-[var(--text)]"
                        style={{ fontFamily: 'var(--font-body-text)' }}
                      >
                        {item.label}
                      </button>
                    );
                  }

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-left text-[18px] font-semibold lowercase tracking-[-0.02em] text-[var(--text)]"
                      style={{ fontFamily: 'var(--font-body-text)' }}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href="/calculator"
                  onClick={() => setIsMenuOpen(false)}
                  className="header-utility-button inline-flex h-[54px] items-center justify-center rounded-[18px] text-[16px] font-semibold lowercase tracking-[-0.02em] text-[var(--text)]"
                  style={{ fontFamily: 'var(--font-body-text)' }}
                >
                  рассчитать стоимость
                </Link>

                <Link
                  href="/request"
                  onClick={() => setIsMenuOpen(false)}
                  className="header-utility-button inline-flex h-[54px] items-center justify-center rounded-[18px] bg-[var(--accent-1)] text-[16px] font-semibold lowercase tracking-[-0.02em] text-white"
                  style={{ fontFamily: 'var(--font-body-text)' }}
                >
                  запросить или отправить кп
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

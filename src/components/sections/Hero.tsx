'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { sitePath } from '@/lib/site-path';
import { cn } from '@/lib/cn';

type ThemeMode = 'light' | 'dark';

export function Hero() {
  const [theme, setTheme] = useState<ThemeMode>('light');

  useEffect(() => {
    const root = document.documentElement;

    const syncTheme = () => {
      setTheme(root.dataset.theme === 'dark' ? 'dark' : 'light');
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });

    return () => observer.disconnect();
  }, []);

  const assets = useMemo(
    () => ({
      trailer:
        theme === 'light'
          ? `${sitePath}/hero/trailer/light.svg`
          : `${sitePath}/hero/trailer/dark.svg`,
      request: `${sitePath}/hero/cards/request.png`,
      calc: `${sitePath}/hero/cards/calc.png`,
      principles: `${sitePath}/hero/cards/principles.png`,
    }),
    [theme],
  );

  const cardOverlay =
    theme === 'light'
      ? 'bg-[linear-gradient(180deg,rgba(38,41,46,0.00)_0%,rgba(38,41,46,0.16)_100%)]'
      : 'bg-[linear-gradient(180deg,rgba(246,246,246,0.00)_0%,rgba(246,246,246,0.10)_100%)]';

  return (
    <section className="pt-8 md:pt-10 xl:pt-12">
      <div className="grid gap-6 xl:grid-cols-[840px_minmax(0,1fr)] xl:items-start">
        <div className="relative h-auto w-full xl:h-[550px] xl:w-[840px]">
          <img
            src={assets.trailer}
            alt="Полуприцеп"
            className="h-full w-full object-contain object-left-top"
          />

          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[28%] top-[14%] flex max-w-[430px] flex-col gap-6">
              <MetricBlock
                title="успешных перевозок"
                value=">10.000"
                cta={{
                  label: 'оформить заявку',
                  href: '/request/',
                }}
                primary
              />

              <MetricInline
                title="мы на ati.su"
                value="728 149"
                cta={{
                  label: 'открыть профиль',
                  href: 'https://ati.su/',
                  external: true,
                }}
              />

              <MetricInline
                title="знаем своё дело"
                value="на 100%"
                cta={{
                  label: 'познакомиться',
                  href: '#services',
                }}
              />
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_1fr] xl:grid-cols-[340px_320px]">
          <BentoCard
            title="единая форма запроса и отправки кп"
            href="/request/"
            imageSrc={assets.request}
            overlayClass={cardOverlay}
            accent
          />

          <BentoCard
            title="ознакомиться с нашими принципами"
            href="#about"
            imageSrc={assets.principles}
            overlayClass={cardOverlay}
            tall
          />

          <BentoCard
            title="сделать расчёт вашей грузоперевозки"
            href="#pricing"
            imageSrc={assets.calc}
            overlayClass={cardOverlay}
            lightCard
          />
        </div>
      </div>
    </section>
  );
}

function MetricBlock({
  title,
  value,
  cta,
  primary = false,
}: {
  title: string;
  value: string;
  cta: {
    label: string;
    href: string;
    external?: boolean;
  };
  primary?: boolean;
}) {
  return (
    <div className="pointer-events-auto">
      <div className="space-y-4">
        <div className="font-heading text-[28px] leading-[1] tracking-[-0.03em] text-[var(--text)] md:text-[34px]">
          {title}
        </div>

        <div className="font-heading text-[84px] leading-[0.9] tracking-[-0.06em] text-[var(--text)] md:text-[104px]">
          {value}
        </div>

        <HeroActionButton
          label={cta.label}
          href={cta.href}
          external={cta.external}
          primary={primary}
        />
      </div>
    </div>
  );
}

function MetricInline({
  title,
  value,
  cta,
}: {
  title: string;
  value: string;
  cta: {
    label: string;
    href: string;
    external?: boolean;
  };
}) {
  return (
    <div className="pointer-events-auto flex items-end justify-between gap-6">
      <div className="space-y-2">
        <div className="font-heading text-[22px] leading-[1] tracking-[-0.03em] text-[var(--text)] md:text-[26px]">
          {title}
        </div>

        <div className="font-heading text-[46px] leading-[0.95] tracking-[-0.05em] text-[var(--text)] md:text-[56px]">
          {value}
        </div>
      </div>

      <HeroActionButton
        label={cta.label}
        href={cta.href}
        external={cta.external}
        compact
      />
    </div>
  );
}

function HeroActionButton({
  label,
  href,
  external = false,
  primary = false,
  compact = false,
}: {
  label: string;
  href: string;
  external?: boolean;
  primary?: boolean;
  compact?: boolean;
}) {
  const className = cn(
    'inline-flex items-center justify-center rounded-[20px] font-medium lowercase transition hover:opacity-90',
    primary
      ? 'h-[48px] bg-[var(--accent-1)] px-8 text-[17px] text-[var(--accent-1-text)]'
      : 'h-[40px] bg-[var(--surface)] px-5 text-[15px] text-[var(--text)] shadow-[0_4px_12px_rgba(38,41,46,0.05)]',
    compact && 'h-[40px] px-5 text-[15px]',
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

function BentoCard({
  title,
  href,
  imageSrc,
  overlayClass,
  accent = false,
  tall = false,
  lightCard = false,
}: {
  title: string;
  href: string;
  imageSrc: string;
  overlayClass: string;
  accent?: boolean;
  tall?: boolean;
  lightCard?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group relative overflow-hidden rounded-[32px]',
        accent
          ? 'bg-[var(--accent-1)] text-[var(--accent-1-text)]'
          : lightCard
            ? 'bg-[var(--surface)] text-[var(--text)]'
            : 'bg-[var(--accent-2)] text-[var(--accent-2-text)]',
        tall ? 'md:row-span-2 min-h-[550px]' : 'min-h-[262px]',
      )}
    >
      <img
        src={imageSrc}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className={cn('absolute inset-0', overlayClass)} />

      <div className="relative flex h-full flex-col justify-end p-6">
        <div className="flex items-end justify-between gap-4">
          <div className="max-w-[220px] text-[20px] font-semibold leading-[1.1] tracking-[-0.02em]">
            {title}
          </div>

          <div
            className={cn(
              'inline-flex h-[56px] w-[56px] items-center justify-center rounded-[20px] transition group-hover:translate-x-[2px]',
              accent
                ? 'bg-[var(--surface)] text-[var(--text)]'
                : 'bg-[var(--surface)] text-[var(--text)]',
            )}
          >
            <ArrowRight size={26} strokeWidth={2} />
          </div>
        </div>
      </div>
    </Link>
  );
}

'use client';

import { Dot } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { GeographyGlobe } from '@/components/sections/GeographyGlobe';

const DISTRICTS = [
  'Центральный федеральный округ',
  'Северо-Западный федеральный округ',
  'Южный федеральный округ',
  'Приволжский федеральный округ',
  'Уральский федеральный округ',
];

export function GeographySection() {
  return (
    <div className="h-full">
      <Container>
        <div className="px-[14px] md:px-[18px] xl:px-[22px]">
          <div className="grid grid-cols-[0.92fr_1.08fr] items-stretch gap-10 xl:gap-14">
            <div className="flex h-full flex-col justify-between gap-8">
              <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between gap-6">
                  <h2 className="font-heading text-[52px] leading-[0.94] tracking-[-0.045em] text-[var(--text)]">
                    <span className="mr-[0.035em] inline-block">Г</span>еография
                  </h2>

                  <div>
                    <GeographyBreadcrumb />
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <p
                    className="max-w-[640px] text-[22px] font-semibold leading-[1.24] tracking-[-0.022em] text-[var(--text)]"
                    style={{ fontFamily: 'var(--font-body-text)' }}
                  >
                    работаем по ключевым направлениям внутри РФ,
                    <br />
                    выстраивая устойчивую логистику,
                    <br />
                    под задачу клиента.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  {DISTRICTS.map((district) => (
                    <DistrictPill key={district} label={district} />
                  ))}
                </div>

                <p
                  className="pt-2 text-[16px] font-medium leading-[1.34] tracking-[-0.014em] text-[var(--text-muted)]"
                  style={{ fontFamily: 'var(--font-body-text)' }}
                >
                  базовый контур нашей работы
                </p>
              </div>
            </div>

            <GeographyGlobe />
          </div>
        </div>
      </Container>
    </div>
  );
}

function GeographyBreadcrumb() {
  return (
    <div className="inline-flex h-[42px] items-center rounded-[16px] bg-[var(--surface)] px-[16px] shadow-[0_8px_20px_rgba(38,41,46,0.04)]">
      <span
        className="text-[14px] font-semibold lowercase tracking-[-0.02em] text-[var(--text)]"
        style={{ fontFamily: 'var(--font-body-text)' }}
      >
        главная
      </span>

      <Dot size={18} className="mx-[2px] text-[var(--accent-1)]" />

      <span
        className="text-[14px] font-semibold lowercase tracking-[-0.02em] text-[var(--text-muted)]"
        style={{ fontFamily: 'var(--font-body-text)' }}
      >
        география
      </span>
    </div>
  );
}

function DistrictPill({ label }: { label: string }) {
  return (
    <div className="inline-flex w-fit rounded-[16px] bg-[var(--surface)] px-4 py-3 shadow-[0_8px_20px_rgba(38,41,46,0.04)]">
      <span
        className="text-[16px] font-medium leading-[1.28] tracking-[-0.014em] text-[var(--text)]"
        style={{ fontFamily: 'var(--font-body-text)' }}
      >
        {label}
      </span>
    </div>
  );
}

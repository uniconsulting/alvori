'use client';

import { Dot } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { sitePath } from '@/lib/site-path';

const TRUCK_BRANDS = ['DAF', 'SCANIA', 'MERCEDES', 'MAN'];
const TRAILER_BRANDS = ['KRONE', 'SCHMITZ', 'TONAR'];

const TRUCK_POINTS = [
  'Возраст сцепок ≤ 5 лет',
  'Регулярное ТО и проверки',
  'ADR лицензии и комплектность',
  'Компетентные водители',
];

const TRAILER_POINTS = [
  'Тенты 90–110 м³',
  'Тенты — 16 м',
  'Рефрижераторы',
  'Страхование груза',
];

const GALLERY_ITEMS = [
  {
    src: `${sitePath}/autopark/gallery-1.webp`,
    alt: 'Тягач в парке',
    className:
      'z-30 left-[72px] top-[92px] h-[278px] w-[412px] rotate-[-4deg]',
  },
  {
    src: `${sitePath}/autopark/gallery-2.webp`,
    alt: 'Полуприцеп',
    className:
      'z-10 left-[18px] top-[170px] h-[188px] w-[282px] rotate-[-11deg]',
  },
  {
    src: `${sitePath}/autopark/gallery-3.webp`,
    alt: 'Грузовой состав',
    className:
      'z-20 left-[228px] top-[18px] h-[202px] w-[302px] rotate-[8deg]',
  },
  {
    src: `${sitePath}/autopark/gallery-4.webp`,
    alt: 'Логистика и парк',
    className:
      'z-0 left-[310px] top-[222px] h-[170px] w-[246px] rotate-[11deg]',
  },
];

export function AutoParkSection() {
  return (
    <div className="h-full">
      <Container>
        <div className="px-[14px] md:px-[18px] xl:px-[22px]">
          <div className="flex flex-col gap-8 xl:gap-10">
            <div className="flex items-center justify-between gap-6">
              <h2 className="font-heading text-[52px] leading-[0.94] tracking-[-0.045em] text-[var(--text)]">
                Наш автопарк
              </h2>

              <AutoParkBreadcrumb />
            </div>

            <div className="grid grid-cols-[1.8fr_1fr] items-start gap-8 xl:gap-10">
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-[116px_1fr_1fr] gap-5">
                  <CountCard value="15" />
                  <TitleCard label="тягачей" />
                  <TitleCard label="и полуприцепов" dark />
                </div>

                <div className="grid grid-cols-[calc(116px+1fr)_1fr] gap-5">
                  <InfoCard
                    brands={TRUCK_BRANDS}
                    points={TRUCK_POINTS}
                  />

                  <InfoCard
                    brands={TRAILER_BRANDS}
                    points={TRAILER_POINTS}
                  />
                </div>
              </div>

              <GalleryStack />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

function AutoParkBreadcrumb() {
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
        автопарк
      </span>
    </div>
  );
}

function CountCard({ value }: { value: string }) {
  return (
    <div className="flex h-[116px] items-center justify-center rounded-[30px] bg-[var(--accent-1)]">
      <span className="font-heading text-[62px] leading-none tracking-[-0.05em] text-white">
        {value}
      </span>
    </div>
  );
}

function TitleCard({
  label,
  dark = false,
}: {
  label: string;
  dark?: boolean;
}) {
  return (
    <div
      className={
        dark
          ? 'flex h-[116px] items-center justify-center rounded-[30px] bg-[#26292e]'
          : 'flex h-[116px] items-center justify-center rounded-[30px] border-[3px] border-[rgba(38,41,46,0.92)] bg-transparent'
      }
    >
      <span
        className={dark
          ? 'font-heading text-[34px] leading-none tracking-[-0.032em] text-white'
          : 'font-heading text-[34px] leading-none tracking-[-0.032em] text-[var(--text)]'}
      >
        {label}
      </span>
    </div>
  );
}

function InfoCard({
  brands,
  points,
}: {
  brands: string[];
  points: string[];
}) {
  return (
    <div className="rounded-[30px] bg-[var(--surface)] px-9 py-10">
      <div className="flex flex-wrap gap-4">
        {brands.map((brand) => (
          <BrandPill key={brand} label={brand} />
        ))}
      </div>

      <div
        className="mt-12 flex flex-col gap-8 text-[18px] font-normal leading-[1.3] tracking-[-0.018em] text-[var(--text)]"
        style={{ fontFamily: 'var(--font-body-text)' }}
      >
        {points.map((point) => (
          <div key={point} className="flex items-start gap-4">
            <span className="mt-[2px] text-[30px] leading-none text-[var(--text)]">•</span>
            <span>{point}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BrandPill({ label }: { label: string }) {
  return (
    <div className="inline-flex h-[52px] items-center rounded-[14px] bg-[var(--bg)] px-6">
      <span
        className="text-[18px] font-semibold leading-none tracking-[-0.02em] text-[var(--text)]"
        style={{ fontFamily: 'var(--font-body-text)' }}
      >
        {label}
      </span>
    </div>
  );
}

function GalleryStack() {
  return (
    <div className="relative h-[504px] overflow-visible">
      {GALLERY_ITEMS.map((item, index) => (
        <GalleryCard
          key={item.src}
          src={item.src}
          alt={item.alt}
          className={item.className}
          priority={index === 0}
        />
      ))}
    </div>
  );
}

function GalleryCard({
  src,
  alt,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  className: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`group absolute overflow-hidden rounded-[26px] border border-white/18 bg-[#26292e] shadow-[0_18px_44px_rgba(38,41,46,0.14)] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:z-40 hover:-translate-y-2 hover:rotate-0 hover:shadow-[0_26px_56px_rgba(38,41,46,0.22)] ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover object-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
        loading={priority ? 'eager' : 'lazy'}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(38,41,46,0.08)_0%,rgba(38,41,46,0.18)_50%,rgba(38,41,46,0.38)_100%)]" />
      <div className="pointer-events-none absolute inset-0 rounded-[26px] border border-white/10" />
    </div>
  );
}

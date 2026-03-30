'use client';

import { sitePath } from '@/lib/site-path';

const GALLERY_ITEMS = [
  {
    src: `${sitePath}/autopark/gallery-1.webp`,
    alt: 'Тягач в парке',
    className: 'z-30 left-[72px] top-[92px] h-[278px] w-[412px] rotate-[-4deg]',
  },
  {
    src: `${sitePath}/autopark/gallery-2.webp`,
    alt: 'Полуприцеп',
    className: 'z-10 left-[18px] top-[170px] h-[188px] w-[282px] rotate-[-11deg]',
  },
  {
    src: `${sitePath}/autopark/gallery-3.webp`,
    alt: 'Грузовой состав',
    className: 'z-20 left-[228px] top-[18px] h-[202px] w-[302px] rotate-[8deg]',
  },
  {
    src: `${sitePath}/autopark/gallery-4.webp`,
    alt: 'Логистика и парк',
    className: 'z-0 left-[310px] top-[222px] h-[170px] w-[246px] rotate-[11deg]',
  },
];

export function AutoParkGallery() {
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

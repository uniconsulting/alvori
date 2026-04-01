'use client';

import { cn } from '@/lib/cn';

type SceneIndicatorProps = {
  progress: number;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function SceneIndicator({ progress }: SceneIndicatorProps) {
  const p = clamp(progress, 0, 1);

  const segment1 = clamp(p / 0.5, 0, 1);
  const segment2 = clamp((p - 0.5) / 0.5, 0, 1);

  const shortWidthMobile = 22;
  const longWidthMobile = 56;

  const shortWidthDesktop = 32;
  const longWidthDesktop = 88;

  let line1Mobile = longWidthMobile;
  let line2Mobile = shortWidthMobile;
  let line3Mobile = shortWidthMobile;

  let line1Desktop = longWidthDesktop;
  let line2Desktop = shortWidthDesktop;
  let line3Desktop = shortWidthDesktop;

  if (p <= 0.5) {
    line1Mobile = lerp(longWidthMobile, shortWidthMobile, segment1);
    line2Mobile = lerp(shortWidthMobile, longWidthMobile, segment1);

    line1Desktop = lerp(longWidthDesktop, shortWidthDesktop, segment1);
    line2Desktop = lerp(shortWidthDesktop, longWidthDesktop, segment1);
  } else {
    line1Mobile = shortWidthMobile;
    line2Mobile = lerp(longWidthMobile, shortWidthMobile, segment2);
    line3Mobile = lerp(shortWidthMobile, longWidthMobile, segment2);

    line1Desktop = shortWidthDesktop;
    line2Desktop = lerp(longWidthDesktop, shortWidthDesktop, segment2);
    line3Desktop = lerp(shortWidthDesktop, longWidthDesktop, segment2);
  }

  const activeIndex = p < 0.25 ? 0 : p < 0.75 ? 1 : 2;

  return (
    <div className="pointer-events-none">
      <div className="mx-auto flex w-full max-w-[1320px] items-center gap-2 px-4 sm:px-5 md:gap-3 md:px-6 xl:px-0">
        <span className="h-[3px] min-w-0 flex-1 rounded-full bg-white/95 md:h-[4px] md:min-w-[140px]" />

        <div className="flex items-center gap-2 md:gap-3">
          <IndicatorLine
            mobileWidth={line1Mobile}
            desktopWidth={line1Desktop}
            active={activeIndex === 0}
          />
          <IndicatorLine
            mobileWidth={line2Mobile}
            desktopWidth={line2Desktop}
            active={activeIndex === 1}
          />
          <IndicatorLine
            mobileWidth={line3Mobile}
            desktopWidth={line3Desktop}
            active={activeIndex === 2}
          />
        </div>

        <span className="h-[3px] min-w-0 flex-1 rounded-full bg-white/95 md:h-[4px] md:min-w-[140px]" />
      </div>
    </div>
  );
}

function IndicatorLine({
  mobileWidth,
  desktopWidth,
  active,
}: {
  mobileWidth: number;
  desktopWidth: number;
  active: boolean;
}) {
  return (
    <span
      className={cn(
        'block h-[3px] rounded-full transition-[width,background-color,box-shadow,opacity] duration-300 ease-out md:h-[4px]',
        active
          ? 'bg-[var(--accent-1)] opacity-100 shadow-[0_0_18px_rgba(250,176,33,0.28)]'
          : 'bg-[var(--accent-2)] opacity-88',
      )}
      style={{
        width:
          typeof window !== 'undefined' && window.innerWidth >= 768
            ? `${desktopWidth}px`
            : `${mobileWidth}px`,
      }}
    />
  );
}

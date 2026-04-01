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

  const mobile = getWidths(segment1, segment2, p, 22, 56);
  const desktop = getWidths(segment1, segment2, p, 32, 88);

  const activeIndex = p < 0.25 ? 0 : p < 0.75 ? 1 : 2;

  return (
    <div className="pointer-events-none">
      <div className="mx-auto flex w-full items-center gap-2 px-4 md:hidden">
        <span className="h-[3px] min-w-0 flex-1 rounded-full bg-white/95" />

        <div className="flex items-center gap-2">
          <IndicatorLine width={mobile.line1} active={activeIndex === 0} mobile />
          <IndicatorLine width={mobile.line2} active={activeIndex === 1} mobile />
          <IndicatorLine width={mobile.line3} active={activeIndex === 2} mobile />
        </div>

        <span className="h-[3px] min-w-0 flex-1 rounded-full bg-white/95" />
      </div>

      <div className="mx-auto hidden w-full max-w-[1320px] items-center gap-3 px-6 md:flex xl:px-0">
        <span className="h-[4px] min-w-[140px] flex-1 rounded-full bg-white/95" />

        <div className="flex items-center gap-3">
          <IndicatorLine width={desktop.line1} active={activeIndex === 0} />
          <IndicatorLine width={desktop.line2} active={activeIndex === 1} />
          <IndicatorLine width={desktop.line3} active={activeIndex === 2} />
        </div>

        <span className="h-[4px] min-w-[140px] flex-1 rounded-full bg-white/95" />
      </div>
    </div>
  );
}

function getWidths(
  segment1: number,
  segment2: number,
  p: number,
  shortWidth: number,
  longWidth: number,
) {
  let line1 = longWidth;
  let line2 = shortWidth;
  let line3 = shortWidth;

  if (p <= 0.5) {
    line1 = lerp(longWidth, shortWidth, segment1);
    line2 = lerp(shortWidth, longWidth, segment1);
  } else {
    line1 = shortWidth;
    line2 = lerp(longWidth, shortWidth, segment2);
    line3 = lerp(shortWidth, longWidth, segment2);
  }

  return { line1, line2, line3 };
}

function IndicatorLine({
  width,
  active,
  mobile = false,
}: {
  width: number;
  active: boolean;
  mobile?: boolean;
}) {
  return (
    <span
      className={cn(
        'block rounded-full transition-[width,background-color,box-shadow,opacity] duration-300 ease-out',
        mobile ? 'h-[3px]' : 'h-[4px]',
        active
          ? 'bg-[var(--accent-1)] opacity-100 shadow-[0_0_18px_rgba(250,176,33,0.28)]'
          : 'bg-[var(--accent-2)] opacity-88',
      )}
      style={{ width: `${width}px` }}
    />
  );
}

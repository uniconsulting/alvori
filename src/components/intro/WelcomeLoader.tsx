'use client';

import { Cookie } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { LoaderLogo } from '@/components/intro/LoaderLogo';

type WelcomeLoaderProps = {
  progress: number;
  canAccept: boolean;
  onAccept: () => void;
  isExiting?: boolean;
  logoSrc: string;
  showLogo?: boolean;
  showProgress?: boolean;
  showCookie?: boolean;
};

const MAJOR_SEGMENTS = 4;
const MINOR_PER_GAP = 3;
const TOTAL_SEGMENTS = MAJOR_SEGMENTS + (MAJOR_SEGMENTS - 1) * MINOR_PER_GAP;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function getSegmentFill(index: number, progress: number) {
  const start = (index / TOTAL_SEGMENTS) * 100;
  const end = ((index + 1) / TOTAL_SEGMENTS) * 100;

  if (progress <= start) return 0;
  if (progress >= end) return 1;

  return clamp((progress - start) / (end - start));
}

function isMajorSegment(index: number) {
  return index % (MINOR_PER_GAP + 1) === 0;
}

function ProgressCounter({ progress }: { progress: number }) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    let raf = 0;

    const tick = () => {
      setDisplayed((prev) => {
        const diff = progress - prev;
        if (Math.abs(diff) < 0.12) return progress;
        return prev + diff * 0.1;
      });

      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [progress]);

  return (
    <span className="tabular-nums text-[13px] font-medium tracking-[-0.02em] text-[rgba(38,41,46,0.54)]">
      {Math.round(displayed)}%
    </span>
  );
}

function ProgressRail({ progress }: { progress: number }) {
  const segments = useMemo(
    () => Array.from({ length: TOTAL_SEGMENTS }, (_, index) => index),
    [],
  );

  return (
    <div className="w-full max-w-[392px]">
      <div className="flex items-center gap-[7px]">
        {segments.map((index) => {
          const fill = getSegmentFill(index, progress);
          const major = isMajorSegment(index);
          const width = major ? 48 : 16;

          return (
            <div
              key={index}
              className="intro-progress-segment"
              style={{
                width: `${width}px`,
                height: major ? '4px' : '3px',
              }}
            >
              <div
                className="intro-progress-segment-fill"
                style={{
                  width: `${fill * 100}%`,
                }}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-[13px] font-medium tracking-[-0.02em] text-[rgba(38,41,46,0.54)]">
          загрузка
        </span>

        <ProgressCounter progress={progress} />
      </div>
    </div>
  );
}

function CookieConsentCard({
  visible,
  canAccept,
  onAccept,
}: {
  visible: boolean;
  canAccept: boolean;
  onAccept: () => void;
}) {
  const outerRadius = 24;
  const outerPadding = 1;
  const innerRadius = outerRadius - outerPadding;

  const contentPaddingX = 18;
  const buttonRadius = innerRadius - contentPaddingX;

  return (
    <div
      className="relative mt-8 w-full max-w-[392px]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(14px) scale(0.985)',
        filter: visible ? 'blur(0px)' : 'blur(12px)',
        transition:
          'opacity 850ms cubic-bezier(0.22,1,0.36,1), transform 950ms cubic-bezier(0.22,1,0.36,1), filter 950ms cubic-bezier(0.22,1,0.36,1)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div
        className="intro-cookie-border-mask absolute inset-0"
        style={{ borderRadius: `${outerRadius}px` }}
      />

      <div
        className="relative bg-[var(--accent-2)] text-[var(--accent-2-text)] shadow-[0_18px_42px_rgba(38,41,46,0.14)]"
        style={{
          borderRadius: `${innerRadius}px`,
          padding: '18px',
        }}
      >
        <div className="flex items-start gap-4">
          <Cookie
            size={24}
            strokeWidth={2}
            className="mt-[2px] shrink-0 text-[var(--accent-2-text)]"
          />

          <div className="min-w-0 flex-1">
            <p className="text-[14px] leading-[1.36] tracking-[-0.016em] text-[var(--accent-2-text)]">
              Продолжая, вы подтверждаете
              <br />
              использование файлов cookie.
            </p>

            <button
              type="button"
              onClick={onAccept}
              disabled={!canAccept}
              className="mt-5 inline-flex h-[52px] w-full items-center justify-center bg-[var(--accent-1)] px-6 text-[15px] font-semibold tracking-[-0.02em] text-[#26292e] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:cursor-not-allowed disabled:opacity-45"
              style={{
                borderRadius: `${buttonRadius}px`,
              }}
            >
              Понятно
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WelcomeLoader({
  progress,
  canAccept,
  onAccept,
  isExiting = false,
  logoSrc,
  showLogo = true,
  showProgress = true,
  showCookie = true,
}: WelcomeLoaderProps) {
  return (
    <div
      className="fixed inset-0 z-[200] flex min-h-screen items-center justify-center overflow-hidden"
      style={{
        background: '#f6f6f6',
        opacity: isExiting ? 0 : 1,
        transition: 'opacity 620ms cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      <div className="relative z-10 flex w-full max-w-[520px] flex-col items-center px-6">
        <LoaderLogo
          src={logoSrc}
          isExiting={isExiting}
          isVisible={showLogo}
        />

        <div
          className="mt-10 w-full"
          style={{
            opacity: showProgress ? (isExiting ? 0 : 1) : 0,
            transform: showProgress
              ? isExiting
                ? 'translateY(8px)'
                : 'translateY(0)'
              : 'translateY(14px)',
            filter: showProgress ? (isExiting ? 'blur(6px)' : 'blur(0px)') : 'blur(12px)',
            transition:
              'opacity 850ms cubic-bezier(0.22,1,0.36,1), transform 950ms cubic-bezier(0.22,1,0.36,1), filter 950ms cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <div className="flex justify-center">
            <ProgressRail progress={progress} />
          </div>
        </div>

        <CookieConsentCard
          visible={showCookie}
          canAccept={canAccept}
          onAccept={onAccept}
        />
      </div>
    </div>
  );
}

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
        if (Math.abs(diff) < 0.2) return progress;
        return prev + diff * 0.12;
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
  const activeIndex = Math.min(
    TOTAL_SEGMENTS - 1,
    Math.floor((progress / 100) * TOTAL_SEGMENTS),
  );

  const segments = useMemo(
    () => Array.from({ length: TOTAL_SEGMENTS }, (_, index) => index),
    [],
  );

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-5">
        <span className="text-[13px] font-medium tracking-[-0.02em] text-[rgba(38,41,46,0.54)]">
          загрузка
        </span>

        <ProgressCounter progress={progress} />
      </div>

      <div className="mt-4 flex items-center gap-[7px]">
        {segments.map((index) => {
          const fill = getSegmentFill(index, progress);
          const major = isMajorSegment(index);
          const width = major ? 58 : 20;

          return (
            <div
              key={index}
              className="relative overflow-hidden rounded-full bg-[rgba(38,41,46,0.10)]"
              style={{
                width,
                height: major ? 4 : 3,
              }}
            >
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-[var(--accent-1)]"
                style={{
                  width: `${fill * 100}%`,
                  transition:
                    'width 320ms cubic-bezier(0.22,1,0.36,1), box-shadow 320ms cubic-bezier(0.22,1,0.36,1)',
                  boxShadow:
                    fill > 0
                      ? '0 0 14px rgba(250,176,33,0.28), 0 0 26px rgba(250,176,33,0.12)'
                      : 'none',
                }}
              />
              {index === activeIndex && progress < 100 ? (
                <div
                  className="pointer-events-none absolute inset-y-0 w-[38%] rounded-full"
                  style={{
                    left: `${Math.max(fill * 100 - 24, 0)}%`,
                    background:
                      'linear-gradient(90deg, rgba(250,176,33,0) 0%, rgba(255,241,204,0.92) 50%, rgba(250,176,33,0) 100%)',
                    filter: 'blur(1px)',
                    opacity: 0.92,
                    transition: 'left 320ms cubic-bezier(0.22,1,0.36,1)',
                  }}
                />
              ) : null}
            </div>
          );
        })}
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
  return (
    <div
      className="relative mt-8 w-full"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(14px) scale(0.985)',
        filter: visible ? 'blur(0px)' : 'blur(12px)',
        transition:
          'opacity 850ms cubic-bezier(0.22,1,0.36,1), transform 950ms cubic-bezier(0.22,1,0.36,1), filter 950ms cubic-bezier(0.22,1,0.36,1)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div className="intro-cookie-border pointer-events-none absolute inset-0 rounded-[24px]" />

      <div className="relative overflow-hidden rounded-[24px] bg-[var(--accent-2)] px-5 py-5 shadow-[0_18px_42px_rgba(38,41,46,0.14)]">
        <div className="flex items-start gap-4">
          <Cookie
            size={22}
            strokeWidth={2}
            className="mt-[1px] shrink-0 text-[var(--accent-2-text)]"
          />

          <div className="min-w-0 flex-1">
            <p className="text-[14px] leading-[1.36] tracking-[-0.016em] text-[var(--accent-2-text)]">
              Продолжая, вы подтверждаете использование файлов cookie.
            </p>

            <button
              type="button"
              onClick={onAccept}
              disabled={!canAccept}
              className="mt-5 inline-flex h-[52px] w-full items-center justify-center rounded-[18px] bg-[var(--accent-1)] px-6 text-[15px] font-semibold tracking-[-0.02em] text-[#26292e] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:cursor-not-allowed disabled:opacity-45"
            >
              Понятно
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .intro-cookie-border {
          padding: 1px;
          background:
            conic-gradient(
              from 0deg,
              rgba(250, 176, 33, 0.16) 0deg,
              rgba(250, 176, 33, 0.92) 72deg,
              rgba(255, 226, 149, 0.98) 118deg,
              rgba(250, 176, 33, 0.18) 180deg,
              rgba(250, 176, 33, 0.12) 240deg,
              rgba(250, 176, 33, 0.88) 312deg,
              rgba(255, 226, 149, 0.98) 342deg,
              rgba(250, 176, 33, 0.16) 360deg
            );
          mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          mask-composite: exclude;
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          animation: introCookieBorderSpin 5.4s linear infinite;
          filter: drop-shadow(0 0 14px rgba(250, 176, 33, 0.16));
        }

        @keyframes introCookieBorderSpin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
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
          <ProgressRail progress={progress} />
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

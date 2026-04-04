'use client';

import { LoaderLogo } from '@/components/intro/LoaderLogo';

type WelcomeLoaderProps = {
  progress: number;
  canAccept: boolean;
  onAccept: () => void;
  isExiting?: boolean;
  logoSrc: string;
};

export function WelcomeLoader({
  progress,
  canAccept,
  onAccept,
  isExiting = false,
  logoSrc,
}: WelcomeLoaderProps) {
  return (
    <div
      className="fixed inset-0 z-[200] flex min-h-screen items-center justify-center overflow-hidden"
      style={{
        background: '#f6f6f6',
        opacity: isExiting ? 0 : 1,
        transition: 'opacity 560ms cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(1200px_520px_at_50%_-8%,rgba(250,176,33,0.10),transparent_60%)]" />

      <div className="relative z-10 flex w-full max-w-[420px] flex-col items-center px-6">
        <LoaderLogo src={logoSrc} isExiting={isExiting} />

        <div
          className="mt-10 w-full"
          style={{
            opacity: isExiting ? 0 : 1,
            transform: isExiting ? 'translateY(8px)' : 'translateY(0)',
            transition:
              'opacity 520ms cubic-bezier(0.22,1,0.36,1), transform 520ms cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <div className="rounded-full bg-[rgba(38,41,46,0.08)] p-[3px]">
            <div className="relative h-[8px] overflow-hidden rounded-full bg-white/80">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-[#fab021] shadow-[0_0_18px_rgba(250,176,33,0.34)]"
                style={{
                  width: `${progress}%`,
                  transition: 'width 240ms cubic-bezier(0.22,1,0.36,1)',
                }}
              />
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-[13px] font-medium tracking-[-0.02em] text-[rgba(38,41,46,0.54)]">
              {progress}%
            </span>

            <span className="text-[13px] font-medium tracking-[-0.02em] text-[rgba(38,41,46,0.54)]">
              cookie
            </span>
          </div>

          <p className="mt-8 text-center text-[13px] leading-[1.35] tracking-[-0.016em] text-[rgba(38,41,46,0.58)]">
            Продолжая, вы подтверждаете использование файлов cookie.
          </p>

          <button
            type="button"
            onClick={onAccept}
            disabled={!canAccept}
            className="mt-5 inline-flex h-[54px] w-full items-center justify-center rounded-[18px] px-6 text-[15px] font-semibold tracking-[-0.02em] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:cursor-not-allowed"
            style={{
              background: canAccept ? '#26292e' : 'rgba(38,41,46,0.16)',
              color: canAccept ? '#f6f6f6' : 'rgba(38,41,46,0.42)',
              boxShadow: canAccept ? '0 12px 28px rgba(38,41,46,0.10)' : 'none',
            }}
          >
            Понятно
          </button>
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[var(--bg)] px-6 text-center text-[var(--text)]">
      <div className="font-heading text-[72px] leading-none tracking-[-0.06em]">404</div>
      <div className="max-w-[480px] text-[16px] leading-7 text-[var(--muted)]">Страница не найдена. Вернитесь на главную страницу проекта «Алвори».</div>
      <Link href="/" className="inline-flex min-h-12 items-center justify-center rounded-[24px] bg-[var(--accent-1)] px-5 py-3 text-[15px] font-medium lowercase text-[var(--accent-1-text)]">
        на главную
      </Link>
    </div>
  );
}

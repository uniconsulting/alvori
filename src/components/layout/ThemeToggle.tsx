'use client';

export function ThemeToggle() {
  const handleToggle = () => {
    const root = document.documentElement;
    const current = root.dataset.theme === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    window.localStorage.setItem('theme', next);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label="сменить тему"
      className="inline-flex h-11 w-11 items-center justify-center rounded-[20px] bg-[var(--surface-soft)] text-[var(--text)] transition hover:opacity-85"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M21 12.79A9 9 0 0 1 11.21 3 7 7 0 1 0 21 12.79Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

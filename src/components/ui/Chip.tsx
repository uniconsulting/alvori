export function Chip({ label }: { label: string }) {
  return <span className="inline-flex items-center rounded-[18px] bg-[var(--surface-soft)] px-3 py-2 text-[13px] font-medium lowercase text-[var(--text)]">{label}</span>;
}

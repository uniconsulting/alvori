export function Divider({ vertical = false, className = '' }: { vertical?: boolean; className?: string }) {
  return vertical ? <span className={`inline-block w-px shrink-0 bg-[var(--divider)] ${className}`} /> : <span className={`block h-px w-full bg-[var(--divider)] ${className}`} />;
}

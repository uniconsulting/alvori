export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-[760px] space-y-3">
      {eyebrow ? <div className="text-[13px] font-medium lowercase tracking-[0.02em] text-[var(--muted)]">{eyebrow}</div> : null}
      <h2 className="font-heading text-[32px] leading-[1] tracking-[-0.03em] text-[var(--text)] md:text-[48px]">{title}</h2>
      {description ? <p className="max-w-[720px] text-[15px] leading-6 text-[var(--muted)] md:text-[17px]">{description}</p> : null}
    </div>
  );
}

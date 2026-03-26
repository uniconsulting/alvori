import { Card } from '@/components/ui/Card';

export function SectionPlaceholder({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="py-4 md:py-6">
      <Card className="space-y-3 rounded-[28px]">
        <div className="text-[12px] font-medium lowercase tracking-[0.02em] text-[var(--muted)]">
          placeholder
        </div>
        <h2 className="font-heading text-[32px] leading-[1] tracking-[-0.04em] text-[var(--text)] md:text-[44px]">
          {title}
        </h2>
        <p className="max-w-[760px] text-[15px] leading-6 text-[var(--muted)]">
          {description}
        </p>
      </Card>
    </section>
  );
}

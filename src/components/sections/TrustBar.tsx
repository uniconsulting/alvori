import { Card } from '@/components/ui/Card';

const items = [
  ['собственный автопарк', '15 тягачей и 15 полуприцепов'],
  ['до 20 тонн', 'под разные задачи перевозки'],
  ['тенты и рефрижераторы', 'под формат груза'],
  ['b2b-сегмент', 'юрлица и ип'],
  ['перевозки по рф', 'ключевые федеральные округа'],
  ['экспедиционные решения', 'под нестандартные сценарии'],
] as const;

export function TrustBar() {
  return (
    <section className="py-4 md:py-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map(([title, description]) => (
          <Card key={title} className="space-y-2">
            <div className="font-heading text-[22px] leading-[1] tracking-[-0.03em] text-[var(--text)]">{title}</div>
            <p className="text-[14px] leading-6 text-[var(--muted)]">{description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

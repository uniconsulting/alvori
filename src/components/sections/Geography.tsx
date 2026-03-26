import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { geography } from '@/content/geography';

export function Geography() {
  return (
    <section className="py-8 md:py-12">
      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <SectionHeading
            eyebrow="география"
            title="география перевозок"
            description="Работаем по ключевым федеральным округам РФ, выстраивая маршруты под задачи бизнеса и формат конкретной перевозки."
          />
        </Card>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {geography.map((item) => (
            <Card key={item}>
              <h3 className="font-heading text-[24px] leading-[1] tracking-[-0.03em] text-[var(--text)]">{item}</h3>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

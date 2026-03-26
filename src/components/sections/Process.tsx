import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { processSteps } from '@/content/process';

export function Process() {
  return (
    <section className="py-8 md:py-12">
      <SectionHeading
        eyebrow="процесс"
        title="как мы работаем"
        description="Выстраиваем взаимодействие по понятному рабочему циклу — от первичного запроса до закрывающих документов после выполнения перевозки."
      />
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {processSteps.map((item) => (
          <Card key={item.step} className="space-y-4">
            <div className="text-[13px] font-medium lowercase text-[var(--muted)]">{item.step}</div>
            <h3 className="font-heading text-[24px] leading-[1] tracking-[-0.03em] text-[var(--text)]">{item.title}</h3>
            <p className="text-[14px] leading-6 text-[var(--muted)]">{item.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

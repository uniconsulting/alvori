import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { advantages } from '@/content/advantages';

export function Advantages() {
  return (
    <section className="py-8 md:py-12">
      <SectionHeading
        eyebrow="преимущества"
        title="почему с нами удобно работать"
        description="Выстраиваем перевозку как управляемый и прозрачный процесс — с сопровождением, контролем и понятным документооборотом на каждом этапе."
      />
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {advantages.map((item, index) => (
          <Card key={item.title} className={index === 0 || index === 3 ? 'xl:col-span-2' : ''}>
            <div className="space-y-3">
              <div className="text-[13px] font-medium lowercase text-[var(--muted)]">{String(index + 1).padStart(2, '0')}</div>
              <h3 className="font-heading text-[26px] leading-[0.98] tracking-[-0.03em] text-[var(--text)]">{item.title}</h3>
              <p className="text-[15px] leading-6 text-[var(--muted)]">{item.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

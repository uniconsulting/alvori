import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';

const facts = ['15 европейских сцепок', 'до 20 тонн', 'тенты и рефы', 'b2b', 'перевозки по рф'];

export function Hero() {
  return (
    <section className="pb-6 pt-3 md:pb-8 md:pt-5">
      <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        <Card className="flex flex-col justify-between p-6 md:p-8 xl:p-10">
          <div className="space-y-5">
            <div className="inline-flex items-center rounded-[18px] bg-[var(--surface-soft)] px-3 py-2 text-[13px] font-medium lowercase text-[var(--muted)]">
              грузоперевозки по рф
            </div>
            <h1 className="max-w-[780px] font-heading text-[42px] leading-[0.95] tracking-[-0.05em] text-[var(--text)] md:text-[64px] xl:text-[84px]">
              грузоперевозки по рф для бизнеса
            </h1>
            <p className="max-w-[720px] text-[16px] leading-7 text-[var(--muted)] md:text-[18px]">
              Собственный автопарк и экспедиционное направление для надёжной, управляемой и прозрачной перевозки грузов по ключевым регионам России.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="#pricing">рассчитать перевозку</Button>
              <Button href="/request/" variant="secondary">
                запросить кп
              </Button>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {facts.map((fact) => (
              <Chip key={fact} label={fact} />
            ))}
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="min-h-[220px] bg-[var(--accent-1)] text-[var(--accent-1-text)] shadow-none">
            <div className="space-y-3">
              <div className="text-[13px] font-medium lowercase opacity-80">собственный автопарк</div>
              <div className="font-heading text-[30px] leading-[0.98] tracking-[-0.03em]">15 тягачей и 15 полуприцепов</div>
              <p className="text-[15px] leading-6 opacity-80">Под регулярные B2B-перевозки, задачи с температурным режимом и форматы с ADR.</p>
            </div>
          </Card>
          <Card className="min-h-[220px]">
            <div className="space-y-3">
              <div className="text-[13px] font-medium lowercase text-[var(--muted)]">экспедиционное направление</div>
              <div className="font-heading text-[28px] leading-[1] tracking-[-0.03em] text-[var(--text)]">гибкий подбор решения под задачу клиента</div>
            </div>
          </Card>
          <Card className="min-h-[180px]">
            <div className="space-y-3">
              <div className="text-[13px] font-medium lowercase text-[var(--muted)]">контроль движения 24/7</div>
              <p className="text-[15px] leading-6 text-[var(--muted)]">Статусы, сопровождение и прозрачная коммуникация по маршруту.</p>
            </div>
          </Card>
          <Card className="min-h-[180px] bg-[var(--surface-soft)] shadow-none">
            <div className="space-y-3">
              <div className="text-[13px] font-medium lowercase text-[var(--muted)]">расчёт под задачу</div>
              <p className="text-[15px] leading-6 text-[var(--muted)]">Стоимость и формат перевозки подбираются под маршрут, груз, тоннаж и условия.</p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

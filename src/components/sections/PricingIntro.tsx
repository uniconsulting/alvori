import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';

const factors = [
  ['маршрут', 'география, расстояние и логика движения'],
  ['тип груза', 'характер груза и требования к перевозке'],
  ['объём и тоннаж', 'параметры загрузки и транспорта'],
  ['температурный режим', 'форматы рефрижераторной перевозки'],
  ['срочность', 'скорость подачи и временные ограничения'],
  ['adr / спецусловия', 'регламенты и дополнительная комплектность'],
] as const;

export function PricingIntro() {
  return (
    <section id="pricing" className="py-8 md:py-12">
      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <Card className="flex flex-col justify-between gap-6">
          <SectionHeading
            eyebrow="стоимость"
            title="расчёт стоимости"
            description="Стоимость рассчитывается индивидуально с учётом маршрута, типа груза, тоннажа, требований к перевозке и дополнительных условий."
          />
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="#pricing">открыть калькулятор</Button>
            <Button href="/request/" variant="secondary">
              запросить кп
            </Button>
          </div>
        </Card>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {factors.map(([title, desc]) => (
            <Card key={title} className="min-h-[150px] space-y-3">
              <h3 className="font-heading text-[24px] leading-[1] tracking-[-0.03em] text-[var(--text)]">{title}</h3>
              <p className="text-[14px] leading-6 text-[var(--muted)]">{desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

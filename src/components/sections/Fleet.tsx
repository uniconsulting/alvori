import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { fleet } from '@/content/fleet';

export function Fleet() {
  return (
    <section className="py-8 md:py-12">
      <SectionHeading
        eyebrow="автопарк"
        title="собственный автопарк"
        description="Собственный автопарк позволяет держать перевозку под контролем, поддерживать техническую готовность транспорта и подбирать формат под конкретную задачу бизнеса."
      />
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {fleet.summary.map((item) => (
          <Card key={item} className="min-h-[120px] flex items-center">
            <div className="font-heading text-[24px] leading-[1] tracking-[-0.03em] text-[var(--text)]">{item}</div>
          </Card>
        ))}
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card>
          <h3 className="font-heading text-[34px] leading-[0.95] tracking-[-0.04em] text-[var(--text)]">{fleet.tractors.title}</h3>
          <p className="mt-4 text-[15px] leading-6 text-[var(--muted)]">Парк укомплектован современными сцепками под регулярные B2B-перевозки по РФ.</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {fleet.tractors.brands.map((brand) => (
              <span key={brand} className="rounded-[18px] bg-[var(--surface-soft)] px-3 py-2 text-[13px] font-medium uppercase tracking-[0.02em] text-[var(--text)]">
                {brand}
              </span>
            ))}
          </div>
          <ul className="mt-5 space-y-2 text-[15px] leading-6 text-[var(--muted)]">
            {fleet.tractors.bullets.map((bullet) => (
              <li key={bullet}>• {bullet}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <h3 className="font-heading text-[34px] leading-[0.95] tracking-[-0.04em] text-[var(--text)]">{fleet.trailers.title}</h3>
          <p className="mt-4 text-[15px] leading-6 text-[var(--muted)]">Под разные типы задач: тентованные перевозки и перевозки с температурным режимом.</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {fleet.trailers.brands.map((brand) => (
              <span key={brand} className="rounded-[18px] bg-[var(--surface-soft)] px-3 py-2 text-[13px] font-medium uppercase tracking-[0.02em] text-[var(--text)]">
                {brand}
              </span>
            ))}
          </div>
          <ul className="mt-5 space-y-2 text-[15px] leading-6 text-[var(--muted)]">
            {fleet.trailers.bullets.map((bullet) => (
              <li key={bullet}>• {bullet}</li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
}

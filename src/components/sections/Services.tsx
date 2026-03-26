import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { services } from '@/content/services';

export function Services() {
  return (
    <section id="services" className="py-8 md:py-12">
      <SectionHeading
        eyebrow="услуги"
        title="форматы перевозок и логистических задач"
        description="Работаем с B2B-задачами в нескольких форматах: от регулярных междугородних перевозок до проектной логистики и перевозок опасных грузов."
      />
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {services.map((service) => (
          <Card key={service.title} className="flex h-full flex-col justify-between gap-5">
            <div className="space-y-4">
              <h3 className="font-heading text-[30px] leading-[0.98] tracking-[-0.03em] text-[var(--text)]">{service.title}</h3>
              <p className="text-[15px] leading-6 text-[var(--muted)]">{service.description}</p>
              <ul className="space-y-2 text-[14px] leading-6 text-[var(--muted)]">
                {service.bullets.map((bullet) => (
                  <li key={bullet}>• {bullet}</li>
                ))}
              </ul>
            </div>
            <div className="text-[14px] font-medium lowercase text-[var(--text)]">обсудить задачу</div>
          </Card>
        ))}
      </div>
    </section>
  );
}

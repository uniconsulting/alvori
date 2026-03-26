import { Accordion } from '@/components/ui/Accordion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { faqItems } from '@/content/faq';

export function FaqPreview() {
  return (
    <section className="py-8 md:py-12">
      <SectionHeading
        eyebrow="faq"
        title="faq"
        description="Собрали ответы на базовые вопросы по форматам работы, расчёту стоимости и организации перевозки."
      />
      <div className="mt-6">
        <Accordion items={faqItems} />
      </div>
    </section>
  );
}

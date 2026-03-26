import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { companyIntro } from '@/content/company';

const cards = [
  ['собственный автопарк', 'Собственные тягачи и полуприцепы под регулярные B2B-перевозки.'],
  ['экспедиционное направление', 'Гибкий подбор логистического решения под сценарий клиента.'],
  ['b2b-фокус', 'Работа с юрлицами и ИП, понятный цикл взаимодействия и документооборот.'],
] as const;

export function About() {
  return (
    <section id="about" className="py-8 md:py-12">
      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <SectionHeading title={companyIntro.title} description={companyIntro.description} eyebrow="о компании" />
        </Card>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="md:row-span-2">
            <h3 className="font-heading text-[30px] leading-[0.98] tracking-[-0.03em] text-[var(--text)]">{cards[0][0]}</h3>
            <p className="mt-4 text-[15px] leading-6 text-[var(--muted)]">{cards[0][1]}</p>
          </Card>
          <Card>
            <h3 className="font-heading text-[24px] leading-[1] tracking-[-0.03em] text-[var(--text)]">{cards[1][0]}</h3>
            <p className="mt-3 text-[15px] leading-6 text-[var(--muted)]">{cards[1][1]}</p>
          </Card>
          <Card>
            <h3 className="font-heading text-[24px] leading-[1] tracking-[-0.03em] text-[var(--text)]">{cards[2][0]}</h3>
            <p className="mt-3 text-[15px] leading-6 text-[var(--muted)]">{cards[2][1]}</p>
          </Card>
        </div>
      </div>
    </section>
  );
}

'use client';

import {
  Clock3,
  Dot,
  FileText,
  Route,
  ShieldCheck,
  SlidersHorizontal,
  Truck,
} from 'lucide-react';
import { Container } from '@/components/layout/Container';

export function WhyChooseUsSection() {
  return (
    <div className="h-full">
      <Container>
        <div className="px-[14px] md:px-[18px] xl:px-[22px]">
          <div className="flex flex-col gap-8 xl:gap-10">
            <div className="flex items-center justify-between gap-6">
              <h2 className="font-heading text-[52px] leading-[0.94] tracking-[-0.045em] text-[var(--text)]">
                Почему выбирают нас
              </h2>

              <WhyChooseUsBreadcrumb />
            </div>

            <div>
              <p
                className="max-w-[760px] text-[20px] font-normal leading-[1.28] tracking-[-0.018em] text-[var(--text)]"
                style={{ fontFamily: 'var(--font-body-text)' }}
              >
                Нас выбирают за понятные условия,
                <br />
                контроль исполнения и устойчивую
                <br />
                логистику под задачу бизнеса.
              </p>
            </div>

            <div className="grid grid-cols-[1.05fr_1fr_1fr] gap-5">
              <WhyCardTall
                icon={Truck}
                title="Собственный автопарк"
                description={
                  <>
                    Собственные единицы транспорта позволяют
                    <br />
                    держать качество исполнения под контролем
                    <br />
                    и обеспечивать предсказуемость работы.
                  </>
                }
              />

              <WhyCard
                icon={Route}
                title="Экспедиционное направление"
                description={
                  <>
                    Подбираем оптимальный формат перевозки
                    <br />
                    под маршрут, сроки и специфику задачи.
                  </>
                }
              />

              <WhyCard
                icon={ShieldCheck}
                title="Прозрачные условия"
                description={
                  <>
                    Понятная логика взаимодействия,
                    <br />
                    согласованные условия
                    <br />
                    и без лишней сложности.
                  </>
                }
              />

              <WhyCardSmall
                icon={Clock3}
                title="Контроль сроков"
                description={
                  <>
                    Следим за движением
                    <br />
                    и соблюдением сроков.
                  </>
                }
              />

              <WhyCardSmall
                icon={FileText}
                title="Документы"
                description={
                  <>
                    Закрывающий контур
                    <br />
                    и комплект документов.
                  </>
                }
              />

              <WhyCardSmall
                icon={SlidersHorizontal}
                title="Под задачу клиента"
                description={
                  <>
                    Собираем маршрут
                    <br />
                    и формат работы под задачу.
                  </>
                }
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

function WhyChooseUsBreadcrumb() {
  return (
    <div className="inline-flex h-[42px] items-center rounded-[16px] bg-[var(--surface)] px-[16px] shadow-[0_8px_20px_rgba(38,41,46,0.04)]">
      <span
        className="text-[14px] font-semibold lowercase tracking-[-0.02em] text-[var(--text)]"
        style={{ fontFamily: 'var(--font-body-text)' }}
      >
        главная
      </span>

      <Dot size={18} className="mx-[2px] text-[var(--accent-1)]" />

      <span
        className="text-[14px] font-semibold lowercase tracking-[-0.02em] text-[var(--text-muted)]"
        style={{ fontFamily: 'var(--font-body-text)' }}
      >
        почему выбирают нас
      </span>
    </div>
  );
}

function WhyCardTall({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  title: string;
  description: React.ReactNode;
}) {
  return (
    <div className="row-span-2 flex min-h-[472px] flex-col rounded-[30px] bg-[#26292e] px-8 py-8 shadow-[0_18px_44px_rgba(38,41,46,0.12)]">
      <div className="flex items-start gap-[10px]">
        <Icon size={20} strokeWidth={2.05} className="mt-[1px] shrink-0 text-white" />
        <h3 className="font-heading text-[24px] leading-[1.06] tracking-[-0.028em] text-white">
          {title}
        </h3>
      </div>

      <div
        className="mt-8 text-[17px] font-normal leading-[1.34] tracking-[-0.014em] text-white/82"
        style={{ fontFamily: 'var(--font-body-text)' }}
      >
        {description}
      </div>

      <div className="mt-auto pt-8">
        <div className="h-[1px] w-full bg-white/10" />
      </div>
    </div>
  );
}

function WhyCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  title: string;
  description: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[224px] flex-col rounded-[28px] bg-[var(--surface)] px-7 py-7 shadow-[0_12px_30px_rgba(38,41,46,0.05)]">
      <div className="flex items-start gap-[10px]">
        <Icon size={18} strokeWidth={2.05} className="mt-[1px] shrink-0 text-[var(--text)]" />
        <h3 className="font-heading text-[21px] leading-[1.08] tracking-[-0.024em] text-[var(--text)]">
          {title}
        </h3>
      </div>

      <div
        className="mt-7 text-[16px] font-normal leading-[1.34] tracking-[-0.014em] text-[var(--text-muted)]"
        style={{ fontFamily: 'var(--font-body-text)' }}
      >
        {description}
      </div>
    </div>
  );
}

function WhyCardSmall({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  title: string;
  description: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[164px] flex-col rounded-[24px] bg-[var(--surface)] px-6 py-6 shadow-[0_10px_24px_rgba(38,41,46,0.04)]">
      <div className="flex items-start gap-[10px]">
        <Icon size={17} strokeWidth={2.05} className="mt-[1px] shrink-0 text-[var(--text)]" />
        <h3 className="font-heading text-[18px] leading-[1.08] tracking-[-0.02em] text-[var(--text)]">
          {title}
        </h3>
      </div>

      <div
        className="mt-5 text-[15px] font-normal leading-[1.34] tracking-[-0.012em] text-[var(--text-muted)]"
        style={{ fontFamily: 'var(--font-body-text)' }}
      >
        {description}
      </div>
    </div>
  );
}

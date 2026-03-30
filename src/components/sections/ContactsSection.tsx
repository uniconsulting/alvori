'use client';

import Link from 'next/link';
import { Dot } from 'lucide-react';
import { Container } from '@/components/layout/Container';

export function ContactsSection() {
  return (
    <div className="h-full">
      <Container>
        <div className="px-[14px] md:px-[18px] xl:px-[22px]">
          <div className="flex flex-col gap-8 xl:gap-10">
            <div className="flex items-center justify-between gap-6">
              <h2 className="font-heading text-[52px] leading-[0.94] tracking-[-0.045em] text-[var(--text)]">
                Контакты
              </h2>

              <ContactsBreadcrumb />
            </div>

            <div className="grid grid-cols-[0.94fr_1.06fr] items-stretch gap-6 xl:gap-8">
              <ContactFormCard />
              <MapCard />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

function ContactsBreadcrumb() {
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
        контакты
      </span>
    </div>
  );
}

function ContactFormCard() {
  return (
    <div className="flex h-full flex-col rounded-[30px] bg-[var(--surface)] px-8 py-8">
      <div>
        <h3 className="font-heading text-[30px] leading-[0.98] tracking-[-0.03em] text-[var(--text)]">
          Короткий запрос
        </h3>

        <p
          className="mt-3 max-w-[520px] text-[16px] font-normal leading-[1.3] tracking-[-0.014em] text-[var(--text-muted)]"
          style={{ fontFamily: 'var(--font-body-text)' }}
        >
          Оставьте краткую информацию по задаче, и мы свяжемся с вами для
          обсуждения маршрута, условий и сроков.
        </p>
      </div>

      <form className="mt-7 flex flex-1 flex-col gap-4">
        <Field label="Ваше имя">
          <input
            type="text"
            placeholder="Введите имя"
            className="h-[56px] w-full rounded-[16px] bg-[var(--bg)] px-5 text-[16px] font-medium tracking-[-0.015em] text-[var(--text)] outline-none placeholder:text-[var(--text-muted)]"
            style={{ fontFamily: 'var(--font-body-text)' }}
          />
        </Field>

        <Field label="Телефон или Telegram">
          <input
            type="text"
            placeholder="+7 (...) ... или @telegram"
            className="h-[56px] w-full rounded-[16px] bg-[var(--bg)] px-5 text-[16px] font-medium tracking-[-0.015em] text-[var(--text)] outline-none placeholder:text-[var(--text-muted)]"
            style={{ fontFamily: 'var(--font-body-text)' }}
          />
        </Field>

        <Field label="Краткое описание задачи">
          <textarea
            rows={6}
            placeholder="Опишите маршрут, задачу или пожелания"
            className="w-full flex-1 resize-none rounded-[16px] bg-[var(--bg)] px-5 py-4 text-[16px] font-medium tracking-[-0.015em] text-[var(--text)] outline-none placeholder:text-[var(--text-muted)]"
            style={{ fontFamily: 'var(--font-body-text)' }}
          />
        </Field>

        <div className="mt-2 flex flex-col gap-3">
          <button
            type="submit"
            className="header-utility-button inline-flex h-[58px] items-center justify-center rounded-[18px] bg-[var(--accent-1)] px-7 text-[17px] font-semibold tracking-[-0.02em] text-white"
            style={{ fontFamily: 'var(--font-body-text)' }}
          >
            Отправить запрос
          </button>

          <Link
            href="/request"
            className="inline-flex h-[52px] items-center justify-center rounded-[16px] bg-[var(--bg)] px-6 text-[15px] font-semibold tracking-[-0.016em] text-[var(--text)]"
            style={{ fontFamily: 'var(--font-body-text)' }}
          >
            Перейти к расширенной форме
          </Link>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span
        className="text-[13px] font-semibold uppercase tracking-[0.07em] text-[var(--text-muted)]"
        style={{ fontFamily: 'var(--font-body-text)' }}
      >
        {label}
      </span>
      {children}
    </label>
  );
}

function MapCard() {
  return (
    <div className="flex h-full flex-col rounded-[30px] bg-[var(--surface)] p-5">
      <div className="relative min-h-[100%] flex-1 overflow-hidden rounded-[24px] bg-[#e9edf2]">
        <iframe
          src="https://yandex.ru/map-widget/v1/?um=constructor%3A27a66f075dac296d1f0870f4a2a9f711d36545eef60e5931464e72c1f6040eb4&amp;source=constructor"
          width="760"
          height="620"
          frameBorder="0"
          className="absolute inset-0 h-full w-full border-0"
          title="Карта офиса АЛВОРИ"
        />
      </div>
    </div>
  );
}

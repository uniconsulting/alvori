import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { contacts } from '@/content/contacts';

export function ContactsSection() {
  return (
    <section id="contacts" className="py-8 md:py-12">
      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <Card className="space-y-6">
          <SectionHeading
            eyebrow="контакты"
            title="связаться по задаче"
            description="Если нужно обсудить перевозку, рассчитать маршрут или запросить коммерческое предложение — свяжитесь с нами удобным способом."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <input className="input-shell" placeholder="имя / компания" />
            <input className="input-shell" placeholder="телефон / telegram" />
            <textarea className="input-shell sm:col-span-2 min-h-[144px] resize-none" placeholder="краткий комментарий по задаче" />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/request/">запросить кп</Button>
            <Button href={contacts.telegramHref} variant="secondary">
              написать в tg
            </Button>
          </div>
        </Card>
        <Card className="space-y-6">
          <div className="space-y-3 text-[15px] leading-6 text-[var(--muted)]">
            <p className="text-[13px] font-medium lowercase">{contacts.company}</p>
            <a href={contacts.phoneHref} className="block font-heading text-[28px] leading-[1] tracking-[-0.03em] text-[var(--text)]">
              {contacts.phoneDisplay}
            </a>
            <a href={contacts.emailHref} className="block text-[var(--text)]">{contacts.email}</a>
            <p>{contacts.address}</p>
            <p>инн: {contacts.inn}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href={contacts.maxHref} variant="secondary" className="flex-1">
              {contacts.maxLabel}
            </Button>
            <Button href={contacts.telegramHref} className="flex-1">
              {contacts.telegramLabel}
            </Button>
          </div>
          <div className="rounded-[28px] bg-[var(--surface-soft)] p-5 text-[14px] leading-6 text-[var(--muted)]">
            модуль карты будет подключён после добавления финального embed / ссылки.
          </div>
        </Card>
      </div>
    </section>
  );
}

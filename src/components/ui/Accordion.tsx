'use client';

import { useState } from 'react';

export function Accordion({ items }: { items: readonly { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = index === openIndex;
        return (
          <div key={item.question} className="rounded-[28px] bg-[var(--surface)] px-5 py-4 shadow-[var(--shadow-soft)] md:px-6 md:py-5">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 text-left"
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span className="font-heading text-[20px] leading-[1.05] tracking-[-0.02em] text-[var(--text)]">{item.question}</span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[18px] bg-[var(--surface-soft)] text-[var(--text)]">
                {isOpen ? '−' : '+'}
              </span>
            </button>
            {isOpen ? <p className="mt-4 max-w-[900px] text-[15px] leading-6 text-[var(--muted)]">{item.answer}</p> : null}
          </div>
        );
      })}
    </div>
  );
}

import { Container } from '@/components/layout/Container';

export function Footer() {
  return (
    <footer className="pb-8 pt-10 md:pb-12 md:pt-12">
      <Container>
        <div className="rounded-[28px] bg-[var(--surface)] px-6 py-6 text-[14px] lowercase text-[var(--muted)] shadow-[var(--shadow-soft)]">
          footer placeholder — секция будет реализована отдельно
        </div>
      </Container>
    </footer>
  );
}

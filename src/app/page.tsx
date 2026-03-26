import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Container } from '@/components/layout/Container';
import { SectionPlaceholder } from '@/components/sections/SectionPlaceholder';

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Header />
      <main className="pt-8 md:pt-12">
        <Container>
          <SectionPlaceholder title="hero" description="Примитивная заглушка. Секция будет реализована после точной сборки header." />
          <SectionPlaceholder title="услуги" description="Примитивная заглушка. Здесь позже появятся карточки услуг и логика подачи." />
          <SectionPlaceholder title="расчёт стоимости" description="Примитивная заглушка. Блок будет реализован после этапа hero / trust / services." />
          <SectionPlaceholder title="о компании" description="Примитивная заглушка. Контент и композиция будут собираться поэтапно." />
          <SectionPlaceholder title="преимущества" description="Примитивная заглушка. Финальная Bento-сетка пока не собирается." />
          <SectionPlaceholder title="как мы работаем" description="Примитивная заглушка. Процесс будет добавлен отдельной итерацией." />
          <SectionPlaceholder title="география" description="Примитивная заглушка. География будет реализована отдельно." />
          <SectionPlaceholder title="автопарк" description="Примитивная заглушка. Техническая подача автопарка будет добавлена позже." />
          <SectionPlaceholder title="faq" description="Примитивная заглушка. Аккордеоны будут собраны отдельным этапом." />
          <SectionPlaceholder title="контакты" description="Примитивная заглушка. Контактный блок и карта будут реализованы отдельно." />
        </Container>
      </main>
      <Footer />
    </div>
  );
}

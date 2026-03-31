import { Suspense } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import RequestPageClient, { type RequestInitialData } from './RequestPageClient';

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function getSingle(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? '' : value ?? '';
}

export default async function RequestPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;

  const initialData: RequestInitialData = {
    from: getSingle(params.from),
    to: getSingle(params.to),
    distance: getSingle(params.distance),
    body: getSingle(params.body),
    weight: getSingle(params.weight),
    volume: getSingle(params.volume),
    pallets: getSingle(params.pallets),
    points: getSingle(params.points),
    urgency: getSingle(params.urgency),
    temp: getSingle(params.temp),
    loading: getSingle(params.loading),
    insurance: getSingle(params.insurance),
    date: getSingle(params.date),
    result: getSingle(params.result),
    comment: getSingle(params.comment),
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Header />

      <main>
        <Suspense fallback={null}>
          <RequestPageClient initialData={initialData} />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

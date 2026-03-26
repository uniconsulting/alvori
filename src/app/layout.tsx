import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { fontVariables } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Алвори — грузоперевозки по РФ',
  description: 'Презентационный сайт логистической компании «Алвори».',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" data-theme="light">
      <body className={fontVariables}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

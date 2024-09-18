import EmbeddedDevOrchestrator from '@/components/EmbeddedDevOrchestrator';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Custom App',
  description: 'Copilot Custom App Example',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log({ COPILOT_ENV: process.env.COPILOT_ENV });
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}

        {process.env.COPILOT_ENV === 'local' && <EmbeddedDevOrchestrator />}
      </body>
    </html>
  );
}

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

import 'copilot-design-system/dist/styles/main.css';

export const metadata: Metadata = {
  title: 'Custom App',
  description: 'Copilot Custom App Example',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={[inter.className].join(' ')}>{children}</body>
    </html>
  );
}

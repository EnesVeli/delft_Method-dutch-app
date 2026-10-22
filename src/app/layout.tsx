import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Delft Dutch',
  description:
    'A free, gamified web app that takes complete beginners from A0 to A2 Dutch through short, story-driven lessons built around everyday life in the Netherlands.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}

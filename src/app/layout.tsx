import './_styles/globals.css';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Providers from './_components/providers/Providers';
import { Main } from './_components/layout/Main';
import { cn } from './_components/components.utils';
import { APP_MAX_WIDTH } from '@/config/themes.config';
import { MainLayout } from './_components/layout/MainLayout';
import { APP_DESCRIPTION, APP_NAME } from '@/config/main.config';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body suppressHydrationWarning className='flex justify-center'>
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}

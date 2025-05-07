import { APP_DESCRIPTION, APP_NAME } from '@/config/main.config';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { AppToaster } from './_components/layout/AppToaster';
import { MainLayout } from './_components/layout/MainLayout';
import Providers from './_components/providers/Providers';
import './_styles/globals.css';

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
    <html lang="en" suppressHydrationWarning className='overflow-y-hidden'>
      <head />
      <body suppressHydrationWarning className='flex flex-col justify-center'>
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
        <AppToaster />
      </body>
    </html>
  );
}

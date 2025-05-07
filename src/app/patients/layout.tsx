
import { Suspense } from 'react';
import { PatientsContextProvider } from './context';

export default function PatientsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PatientsContextProvider>
      <Suspense>{children}</Suspense>
    </PatientsContextProvider>
  );
}

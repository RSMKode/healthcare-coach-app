'use client';
import { useTheme } from 'next-themes';
import { Toaster } from 'sonner';

export function AppToaster() {
  const { theme } = useTheme();
  return (
    <>
      <Toaster
        richColors
        closeButton
        duration={4000}
        position="bottom-left"
        toastOptions={{
          classNames: {
            // toast: 'bg-muted text-foreground border-foreground/70',
          },
        }}
        // theme={theme === 'dark' ? 'dark' : 'light'}
      />
    </>
  );
}

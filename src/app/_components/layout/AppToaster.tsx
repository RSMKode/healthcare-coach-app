'use client';
import { Toaster } from 'sonner';

export function AppToaster() {
  // const { theme } = useTheme();
  return (
    <>
      <Toaster
        richColors
        closeButton
        duration={4000}
        position="bottom-center"
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

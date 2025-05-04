import { Toaster } from 'sonner';

export async function FlashToaster() {
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
        // theme="light"
      />
    </>
  );
}

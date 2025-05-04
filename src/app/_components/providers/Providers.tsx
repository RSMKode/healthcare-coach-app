import { TooltipProvider } from '@radix-ui/react-tooltip';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { ThemeProvider } from '../theme/ThemeProvider';
import { TOOLTIP_DELAY_DURATION } from '@/config/main.config';
import { QueryProvider } from './QueryProvider';

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <TooltipProvider delayDuration={TOOLTIP_DELAY_DURATION}>
        <NuqsAdapter>
          <QueryProvider>{children}</QueryProvider>
        </NuqsAdapter>
      </TooltipProvider>
    </ThemeProvider>
  );
}

'use client';

import * as React from 'react';
import { cn } from '../components.utils';
import { Main } from './Main';
import { APP_MAX_WIDTH } from '@/config/themes.config';
import Header from './Header';
import { SidebarProvider } from '../ui/sidebar';
import { AppSidebar } from '../sidebar/AppSidebar';
import { getCookie } from 'cookies-next/client';
import { SIDEBAR_STATE_KEY } from '@/config/main.config';
import { useHydrated } from '@/hooks/useHydrated';

type SectionProps = React.ComponentProps<'main'> & {
  asChild?: boolean;
};

export const MainLayout = ({
  children,
  className,
  asChild = false,
  ...props
}: SectionProps) => {
  const hydrated = useHydrated();
  const defaultOpen = hydrated
    ? getCookie(SIDEBAR_STATE_KEY) === 'true'
    : false;

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <div className="flex h-screen w-full flex-col items-center">
        <Header />
        <div className="h-full w-full flex overflow-y-auto overflow-x-hidden justify-center">
          <Main
            className={cn('px-2 py-2', APP_MAX_WIDTH, className)}
            {...props}>
            {children}
          </Main>
        </div>
      </div>
    </SidebarProvider>
  );
};

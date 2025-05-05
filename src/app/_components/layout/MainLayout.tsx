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

type SectionProps = React.ComponentProps<'main'> & {
  asChild?: boolean;
};

export const MainLayout = ({
  children,
  className,
  asChild = false,
  ...props
}: SectionProps) => {
  const defaultOpen = getCookie(SIDEBAR_STATE_KEY) === 'true';

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <div className="flex h-screen w-full flex-col items-center overflow-x-auto">
        <Header />
        <Main className={cn(APP_MAX_WIDTH, className)} {...props}>
          {children}
        </Main>
      </div>
    </SidebarProvider>
  );
};

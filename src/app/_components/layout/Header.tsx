'use client';

import { cn } from '../components.utils';
import { AppSidebarTrigger } from '../sidebar/AppSidebarTrigger';
import ThemePicker from '../theme/ThemePicker';
import { useState, useEffect } from 'react';
import { ClearCacheButton } from './ClearCacheButton';

type HeaderProps = {
  children?: React.ReactNode;
  className?: string;
};

export default function Header({ children, className }: HeaderProps) {
  return (
    <header
      className={cn(
        'ease bg-secondary/50 backdrop-blur-md dark:shadow-background/70 @container sticky top-0 z-20 flex w-full flex-wrap items-center justify-between gap-y-1 border-b-2 p-1.5 shadow-md transition duration-300 sm:p-2',
        className
      )}>
      <div className="flex items-center gap-1 @md:gap-2">
        <AppSidebarTrigger size="icon" className="backdrop-blur-none" />
        {/* <Separator
            orientation="vertical"
            className="h-full min-h-4 bg-primary-foreground"
          />
          <BackButton
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-primary-foreground hover:text-primary backdrop-blur-none"
          /> */}
        {/* <AppBreadcrumb homeLink="/dashboard" /> */}
        {children}
      </div>
      <div className="flex items-center gap-1 @md:gap-2">
        <ClearCacheButton refreshGlobal={true} />
        <ThemePicker />
      </div>
    </header>
  );
}

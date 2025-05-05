'use client';

import { LuPanelLeftClose, LuPanelLeftOpen } from 'react-icons/lu';
import { useSidebar } from '../ui/sidebar';
import * as React from 'react';
import { Button } from '../ui/button';
import { cn } from '../components.utils';
type AppSidebarTriggerProps = React.ComponentProps<typeof Button> & {};

const AppSidebarTrigger = ({
  className,
  onClick,
  ...props
}: AppSidebarTriggerProps) => {
  const { state, toggleSidebar } = useSidebar();

  return (
    // <SidebarTrigger className="text-primary-foreground hover:bg-foreground hover:text-primary"/>
    <Button
      // variant={'ghost'}
      size={'icon'}
      tooltip={
        props.tooltip ||
        (state === 'expanded' ? 'Close' : 'Open') + ' sidebar'
      }
      data-sidebar="trigger"
      onClick={event => {
        onClick?.(event);
        toggleSidebar();
      }}
      className={cn('border-transparent bg-transparent text-foreground hover:bg-primary hover:text-primary-foreground', className)}
      {...props}>
      {state === 'expanded' ? (
        <LuPanelLeftClose className="size-4 sm:size-5" />
      ) : (
        <LuPanelLeftOpen className="size-4 sm:size-5" />
      )}
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
};

export { AppSidebarTrigger };

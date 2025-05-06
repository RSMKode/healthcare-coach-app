'use client';

import { IoMdLogOut } from 'react-icons/io';

import * as React from 'react';
import { Button } from '../ui/button';
import { cn } from '../components.utils';

const LogoutButton = ({
  className,
  onClick,
}: React.ComponentProps<typeof Button>) => {
  return (
    <Button
      className={cn(
        'border-current bg-danger-background text-sm font-semibold text-danger hover:border-danger hover:bg-danger hover:text-danger-foreground',
        className
      )}
      spinnerClassName="fill-danger">
      <IoMdLogOut className="size-4 sm:size-5" />
      <span>Salir</span>
    </Button>
  );
};

export { LogoutButton };

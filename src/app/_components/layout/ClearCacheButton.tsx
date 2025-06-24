'use client';

import { useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { TbRefresh } from 'react-icons/tb';
import { toast } from 'sonner';
import { cn } from '../components.utils';
import { Button } from '../ui/button';

export type ClearCacheButtonProps = React.ComponentProps<typeof Button> & {
  refreshPage?: boolean;
  refreshGlobal?: boolean;
  refreshTags?: boolean;
  refreshPath?: boolean;
  tags?: string[];
  path?: string;
};

export const ClearCacheButton = ({
  className,
  children,
  onClick,
  variant,
  size,
  tooltip,
  refreshPage = false,
  refreshGlobal = true,
  refreshTags = true,
  refreshPath = true,
  tags,
  path,
  ...props
}: ClearCacheButtonProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = React.useTransition();

  const queryClient = useQueryClient();

  const tooltipMessage = 'Reload';
  const message = 'Data reloaded successfully';

  return (
    <Button
      {...props}
      variant={variant || 'default'}
      tooltip={tooltip || tooltipMessage}
      onClick={event => {
        onClick?.(event);
        startTransition(() => {
          // Caché global
          if (refreshGlobal) {
            // queryClient.invalidateQueries({ type: 'all' });
            queryClient.resetQueries({ type: 'all' });
            toast.success(message);
          }
          if (refreshPage) router.refresh();
        });
      }}
      className={cn('', className)}>
      <TbRefresh className={cn('size-4', isPending && 'animate-spin')} />
      {/* <span className="sr-only">Volver atrás</span> */}
      {children}
    </Button>
  );
};

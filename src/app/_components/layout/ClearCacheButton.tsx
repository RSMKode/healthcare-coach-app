'use client';

import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react';
import { TbRefresh } from 'react-icons/tb';
import { toast } from 'sonner';
import { cn } from '../components.utils';
import { Button } from '../ui/button';
import { useQueryClient } from '@tanstack/react-query';
import { CACHE_TAGS } from '@/config/cache-tags.config';

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

  return (
    <Button
      {...props}
      variant={variant || 'default'}
      tooltip={tooltip || 'Vacíar caché y recargar'}
      onClick={event => {
        onClick?.(event);
        startTransition(() => {
          // Caché global
          if (refreshGlobal) {
            queryClient.invalidateQueries({ queryKey: [CACHE_TAGS.ALL] });
            toast.success('Caché global vaciada exitosamente');
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

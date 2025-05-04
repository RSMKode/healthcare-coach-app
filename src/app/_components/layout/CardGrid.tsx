import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../components.utils';

type CardGridProps = React.ComponentProps<'div'> & {
  asChild?: boolean;
};

export const CardGrid = ({
  children,
  className,
  asChild = false,
  ...props
}: CardGridProps) => {
  const Comp = asChild ? Slot : 'section';
  return (
    <Comp
      className={cn(
        'grid w-full grid-cols-auto-fit-xs justify-center gap-4',
        className
      )}
      {...props}>
      {children}
    </Comp>
  );
};

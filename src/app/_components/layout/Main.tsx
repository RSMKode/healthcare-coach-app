import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../components.utils';

type SectionProps = React.ComponentProps<'main'> & {
  asChild?: boolean;
};

export const Main = ({
  children,
  className,
  asChild = false,
  ...props
}: SectionProps) => {
  const Comp = asChild ? Slot : 'main';
  return (
    <Comp
      className={cn(
        'flex flex-col w-full h-full items-center gap-4',
        className
      )}
      {...props}>
      {children}
    </Comp>
  );
};

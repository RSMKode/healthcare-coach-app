import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../components.utils';

type SectionProps = React.ComponentProps<'section'> & {
  asChild?: boolean;
};

export const Section = ({
  children,
  className,
  asChild = false,
  ...props
}: SectionProps) => {
  const Comp = asChild ? Slot : 'section';
  return (
    <Comp
      className={cn(
        'flex flex-col w-full items-center gap-4 py-2',
        className
      )}
      {...props}>
      {children}
    </Comp>
  );
};

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/app/_components/components.utils';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';
import Spinner from './spinner';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive active:scale-90",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 border-none',
        link: 'text-primary underline-offset-4 hover:underline border-none',
      },
      size: {
        sm: 'px-2 py-1 text-xs [&_svg]:size-4 [&_svg]:shrink-0',
        md: 'px-2 py-1 [&_svg]:size-5 [&_svg]:shrink-0',
        lg: 'px-3 py-2 text-base',
        icon: 'p-1 w-fit h-fit',
      },
      shadow: {
        none: 'shadow-none',
        sm: 'shadow-sm',
        md: 'shadow-md',
        lg: 'shadow-lg',
      },
      border: {
        0: 'border-0',
        1: 'border',
        2: 'border-2',
        3: 'border-3',
        4: 'border-4',
      },
      rounded: {
        none: 'rounded-none',
        full: 'rounded-full',
        lg: 'rounded-lg',
        md: 'rounded-md',
        sm: 'rounded-sm',
        xs: 'rounded-xs',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      border: 1,
      rounded: 'md',
      shadow: 'none',
    },
  }
);

export type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isPending?: boolean;
    spinnerClassName?: string;
    tooltip?: string;
  };

const Button = ({
  children,
  tooltip,
  isPending,
  className,
  spinnerClassName,
  variant,
  size,
  border,
  rounded,
  shadow,
  asChild = false,
  ...props
}: ButtonProps) => {

  const TempButton = asChild ? (
    <Slot
      data-slot="button"
      className={cn(
        buttonVariants({ shadow, variant, size, border, rounded, className })
      )}
      data-pending={isPending}
      {...props}>
      {children}
      {/* {isPending && <Spinner className={cn('size-4', spinnerClassName)} />} */}
    </Slot>
  ) : (
    <button
      data-slot="button"
      className={cn(
        buttonVariants({ shadow, variant, size, border, rounded, className })
      )}
      data-pending={isPending}
      {...props}>
      {children}
      {isPending && <Spinner className={cn('size-4', spinnerClassName)} />}
    </button>
  );

  return tooltip ? (
    <Tooltip>
      <TooltipTrigger asChild>{TempButton}</TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  ) : (
    TempButton
  );
};

export { Button, buttonVariants };

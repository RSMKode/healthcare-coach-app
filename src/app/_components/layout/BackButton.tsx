'use client';

import { useRouter } from 'next/navigation';
import { TbChevronLeft } from 'react-icons/tb';
import { cn } from '../components.utils';
import { Button } from '../ui/button';

export type BackButtonProps = React.ComponentProps<typeof Button> & {
  backLink?: string;
};

const BackButton = ({
  className,
  children,
  backLink,
  onClick,
  ...props
}: BackButtonProps) => {
  const router = useRouter();

  return (
    <Button
      tooltip={props.tooltip || 'Go back'}
      onClick={event => {
        onClick?.(event);
        backLink ? router.push(backLink) : router.back();
      }}
      className={cn('', className)}
      {...props}>
      <TbChevronLeft className="-ml-[0.1rem] size-4" />
      <span className="sr-only">Go back</span>
      {children}
    </Button>
  );
};
export { BackButton };

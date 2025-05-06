'use client';

import React from 'react';
import { cn } from '../components.utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

type AppDialogProps = React.ComponentProps<typeof Dialog> & {
  open?: boolean;
  // setOpen?: (open: boolean) => void;
  trigger?: React.ReactNode;
  renderContent?: boolean;
  title: React.ReactNode;
  description?: React.ReactNode;
  header?: React.ReactNode;
  body?: React.ReactNode;
  footerButtons?: React.ReactNode;
  footer?: React.ReactNode;
  onInteractOutside?: () => void;
};

const AppDialog = ({
  open,
  // setOpen,
  trigger,
  renderContent = true,
  title,
  description,
  header,
  body,
  footerButtons,
  footer,
  onInteractOutside,
  ...props
}: AppDialogProps) => {

  return (
    <Dialog open={open} {...props} onOpenChange={onInteractOutside}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        className="max-w-[90dvw] sm:max-w-lg"
        onInteractOutside={onInteractOutside}>
        <DialogHeader>
          {title && (
            <DialogTitle className="flex items-center gap-x-2 underline decoration-primary underline-offset-4">
              {title}
            </DialogTitle>
          )}
          {description && <DialogDescription>{description}</DialogDescription>}
          {header && <div className="flex flex-col gap-2">{header}</div>}
        </DialogHeader>
        {body && <div className="flex flex-col gap-2">{body}</div>}
        <DialogFooter className={cn('w-full')}>
          {footer && <div className="flex flex-col gap-2">{footer}</div>}
          <div className="flex w-full flex-col-reverse flex-wrap-reverse items-center justify-between gap-2 sm:flex-row-reverse">
            {footerButtons}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { AppDialog };

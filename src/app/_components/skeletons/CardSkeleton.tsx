import { ComponentProps, Fragment } from 'react';
import { SHIMMER_CLASS } from '@/config/themes.config';
import { Card, CardContent, CardHeader } from '../ui/card';
import { cn } from '../components.utils';

type CardSkeletonProps = ComponentProps<typeof Card> & {
  headerSections?: number;
  sections?: number;
};

const CardSkeleton = ({
  headerSections = 1,
  sections = 1,
  className,
  ...props
}: CardSkeletonProps) => {
  const headerArray = Array.from({ length: headerSections });
  const sectionArray = Array.from({ length: sections });

  return (
    <Card
      hover={false}
      className={cn(
        'relative items-start overflow-hidden',
        SHIMMER_CLASS,
        className
      )}
      {...props}>
      <CardHeader className="w-full">
        {headerArray.map((item, index) => (
          <Fragment key={index}>
            <div className="flex gap-2 items-center">
              <div className="rounded-full bg-secondary size-10"></div>
              <div className="flex flex-col gap-2 grow">
                <span className="h-6 w-1/3 rounded-lg bg-foreground/30" />
                <span className="h-6 w-3/5 rounded-lg bg-muted" />
              </div>
            </div>
          </Fragment>
        ))}
      </CardHeader>
      <CardContent className="w-full gap-2 flex flex-col items-start">
        {sectionArray.map((item, index) => (
          <Fragment key={index}>
            <div className="h-6 w-full rounded bg-foreground/10" />
            <div className="h-6 w-3/5 rounded bg-foreground/10" />
            {index < sectionArray.length - 1 && (
              <hr className="w-full border-foreground/50" />
            )}
          </Fragment>
        ))}
      </CardContent>
    </Card>
  );
};
CardSkeleton.displayName = 'CardSkeleton';

export { CardSkeleton };

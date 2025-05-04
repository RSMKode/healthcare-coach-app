
import { ComponentProps, Fragment } from "react";
import { SHIMMER_CLASS } from "@/config/themes.config";
import { Card, CardContent, CardHeader } from "../ui/card";
import { cn } from "../components.utils";

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
      className={cn("relative items-start overflow-hidden", SHIMMER_CLASS, className)}
      {...props}
    >
      <CardHeader className="w-full">
        {headerArray.map((item, index) => (
          <Fragment key={index}>
            <div className="flex gap-2">
              <span className="h-6 w-1/3 rounded-lg bg-foreground/30" />
              <span className="h-6 w-3/5 rounded-lg bg-muted" />
            </div>
            {
              // headerSections > 1 && (
              <div className="flex gap-2">
                <span className="h-7 w-5/6 rounded-lg bg-foreground/30" />
              </div>
              // )
            }
          </Fragment>
        ))}
      </CardHeader>
      <CardContent>
      {sectionArray.map((item, index) => (
        <Fragment key={index}>
            <div className="p-x-2 flex w-full gap-2">
              <span className="h-5 w-1/4 rounded-lg bg-foreground/30" />
              <span className="h-5 w-2/5 rounded-lg bg-background/60" />
            </div>
            <div className="h-6 w-full rounded bg-background/60" />
            <div className="h-6 w-11/12 rounded bg-background/60" />
          {index < sectionArray.length - 1 && (
            <hr className="w-full border-foreground/50" />
          )}
        </Fragment>
      ))}
      </CardContent>
    </Card>
  );
};
CardSkeleton.displayName = "CardSkeleton";

export { CardSkeleton };

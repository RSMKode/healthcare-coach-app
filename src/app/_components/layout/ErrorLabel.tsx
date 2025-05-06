import { ComponentProps } from "react";
import { Label } from "../ui/label";
import { cn } from "../components.utils";

type ErrorLabelProps = ComponentProps<typeof Label> & {};

export default function ErrorLabel({
  className,
  children,
  ...props
}: ErrorLabelProps) {
  return (
    <Label
      className={cn(
        "bg-destructive/10 text-destructive flex w-full flex-wrap justify-center gap-2 overflow-clip rounded-lg border border-current p-2 break-words backdrop-blur-md",
        className,
      )}
      {...props}
    >
      {children}
    </Label>
  );
}

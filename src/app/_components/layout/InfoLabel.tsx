import { ComponentProps } from "react";
import { Label } from "../ui/label";
import { cn } from "../components.utils";

type InfoLabelProps = ComponentProps<typeof Label> & {};

export default function InfoLabel({
  className,
  children,
  ...props
}: InfoLabelProps) {
  return (
    <Label
      className={cn(
        "bg-notice/20 text-notice flex w-full flex-wrap justify-center gap-2 overflow-clip rounded-lg border border-current p-2 break-words backdrop-blur-md",
        className,
      )}
      {...props}
    >
      {children}
    </Label>
  );
}

import { cn } from "@/lib/components.lib.ts";
import Container from "../_layout/Container";
import Spinner from "../Spinner";
import { ComponentProps } from "react";
import { SHIMMER_CLASS } from "@/config/themes.config";

type LoadingContainerProps = ComponentProps<typeof Container> & {};

export default function Loading({
  className,
  ...props
}: LoadingContainerProps) {
  return (
    <Container
      className={cn("relative w-full border-foreground/50", SHIMMER_CLASS, className)}
      {...props}
    >
      <Spinner className="size-28 text-foreground/80" />
    </Container>
  );
}

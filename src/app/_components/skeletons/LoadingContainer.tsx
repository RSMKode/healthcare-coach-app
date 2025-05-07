
import { ComponentProps } from "react";
import { SHIMMER_CLASS } from "@/config/themes.config";
import { Container } from "lucide-react";
import { cn } from "../components.utils";
import Spinner from "../ui/spinner";

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

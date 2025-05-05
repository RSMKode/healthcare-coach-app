"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { TbMoonFilled, TbSunFilled } from "react-icons/tb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { VscColorMode } from "react-icons/vsc";
import { useTheme } from "next-themes";
import { IconType } from "react-icons";
import { cn } from "../components.utils";
import { useHydrated } from "@/hooks/useHydrated";

const THEMES: {
  label: string;
  className: string;
  Icon: IconType;
}[] = [
  {
    label: "Claro",
    className: "light",
    Icon: TbSunFilled,
  },
  {
    label: "Oscuro",
    className: "dark",
    Icon: TbMoonFilled,
  },
  {
    label: "Sistema",
    className: "system",
    Icon: VscColorMode,
  },
];

export type LightDarkPickerProps = React.ComponentProps<typeof Button> & {
  className?: string;
};

const LightDarkPicker = ({ className, ...props }: LightDarkPickerProps) => {
  const { theme, setTheme } = useTheme();
  const isHydrated = useHydrated();

  if (!isHydrated)
    return (
      <Button disabled className="p-1" variant={"default"}>
        <VscColorMode className="size-4" />
      </Button>
    );

  const Icon = THEMES.find((t) => t.className === theme)?.Icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn(
            className,
          )}
          tooltip="Switch theme"
          variant={"default"}
          {...props}
        >
          {Icon && <Icon className="size-4" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="border-2 bg-background/70 backdrop-blur-xs"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DropdownMenuLabel>Tema</DropdownMenuLabel>
        <DropdownMenuSeparator/>
        {THEMES.map((t) => {
          const { label, className, Icon } = t;
          return (
            <DropdownMenuItem
              key={label}
              className={cn(
                "flex items-center gap-2",
                theme === className && "bg-primary/40",
              )}
              onClick={() => setTheme(className)}
            >
              <Icon className="size-4" />
              <span>{label}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LightDarkPicker;

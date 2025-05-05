"use client";

import { LuPanelLeftClose, LuPanelLeftOpen } from "react-icons/lu";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";
import * as React from "react";
import { Button } from "../ui/button";
import { cn } from "../components.utils";
type AppSidebarTriggerProps = React.ComponentProps<typeof Button> & {};

const AppSidebarTrigger = ({
  className,
  onClick,
  ...props
}: AppSidebarTriggerProps) => {
  const { state, toggleSidebar } = useSidebar();

  return (
    // <SidebarTrigger className="text-accent-primary-foreground hover:bg-foreground hover:text-accent-primary"/>
    <Button
      variant={"ghost"}
      size={"icon"}
      tooltip={
        props.tooltip ||
        (state === "expanded" ? "Cerrar" : "Abrir") + " menú lateral"
      }
      data-sidebar="trigger"
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      className={cn("", className)}
      {...props}
    >
      {state === "expanded" ? (
        <LuPanelLeftClose className="size-4 sm:size-5" />
      ) : (
        <LuPanelLeftOpen className="size-4 sm:size-5" />
      )}
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
};

export {AppSidebarTrigger};

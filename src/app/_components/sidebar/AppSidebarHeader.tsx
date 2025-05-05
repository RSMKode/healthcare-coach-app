"use client";

import Link from "next/link";
import { cn } from "../components.utils";
import { useSidebar, SidebarHeader, SidebarMenu, SidebarMenuButton } from "../ui/sidebar";
import { TbHospital } from "react-icons/tb";


export function AppSidebarHeader() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarHeader  className={cn("items-center", isCollapsed ? "flex-col" : "flex-row")}>
      <SidebarMenu>
        <SidebarMenuButton
          size={"lg"}
          tooltip={"Home"}
          className="justify-center border-2 border-accent-primary bg-accent-primary/70 text-accent-primary-foreground hover:bg-accent-primary-foreground/90 hover:text-accent-primary hover:brightness-110 group-data-[collapsible=icon]:justify-normal group-data-[collapsible=icon]:!p-2"
          asChild
        >
          <Link href="/">
            <TbHospital className="group-data-[collapsible=icon]:[&_svg]:size-5" />
          </Link>
        </SidebarMenuButton>
      </SidebarMenu>
      {/* <AppSidebarTrigger /> */}
      {/* <Button
        className="hover:bg-accent-primary flex w-auto items-start justify-center gap-2 border-transparent bg-accent-primary/70 px-1 py-2 text-accent-primary-foreground"
        asChild
      >
        <Link href="/">
          <MainLogo className="transition group-data-[collapsible=icon]:[&>span]:hidden" />
        </Link>
      </Button> */}
    </SidebarHeader>
  );
}

"use client";

import Link from "next/link";
import { cn } from "../components.utils";
import { useSidebar, SidebarHeader, SidebarMenu, SidebarMenuButton } from "../ui/sidebar";
import { TbHospital } from "react-icons/tb";
import { APP_NAME } from "@/config/main.config";


export function AppSidebarHeader() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarHeader  className={cn("items-center", isCollapsed ? "flex-col" : "flex-row")}>
      <SidebarMenu>
        <SidebarMenuButton
          variant={"default"}
          size={"lg"}
          tooltip={"Home"}
          className="justify-center border-2 border-primary text-primary-foreground bg-primary/90 hover:bg-primary/20 hover:text-primary"
          asChild
        >
          <Link href="/">
            <TbHospital className="group-data-[collapsible=expanded]:[&_svg]:!size-6"/>
            {state === "expanded" && <span className="">{APP_NAME}</span>}
          </Link>
        </SidebarMenuButton>
      </SidebarMenu>
      {/* <AppSidebarTrigger /> */}
      {/* <Button
        className="hover:bg-primary flex w-auto items-start justify-center gap-2 border-transparent bg-primary/70 px-1 py-2 text-primary-foreground"
        asChild
      >
        <Link href="/">
          <MainLogo className="transition group-data-[collapsible=icon]:[&>span]:hidden" />
        </Link>
      </Button> */}
    </SidebarHeader>
  );
}

'use client';

import { AppSidebarHeader } from './AppSidebarHeader';
import { AppSidebarContent } from './AppSidebarContent';
import { AppSidebarFooter } from './AppSidebarFooter';
import { Sidebar, SidebarRail } from '../ui/sidebar';

export function AppSidebar() {
  // sessionUser.permissions = ["queries", "production", "work-orders"];
  // sessionUser.roles = ["sga", "terminal"];
  return (
    <Sidebar collapsible="icon" className="z-20 transition duration-200">
      <AppSidebarHeader />
      <SidebarRail className="hover:after:bg-primary" />
      <AppSidebarContent />
      <AppSidebarFooter />
    </Sidebar>
  );
}

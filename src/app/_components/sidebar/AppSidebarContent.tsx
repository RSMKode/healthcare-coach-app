'use client';

import { ROUTES } from '@/config/routes.config';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaUserNurse } from 'react-icons/fa';
import { cn } from '../components.utils';
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '../ui/sidebar';

export function AppSidebarContent() {
  const pathname = usePathname();

  const group = {
    name: 'Coaching',
    icon: FaUserNurse,
  };

  return (
    <SidebarContent className="overflow-x-clip">
      <SidebarGroup>
        <SidebarGroupLabel className="gap-2">
          {group.icon && <group.icon />}
          {group.name}
        </SidebarGroupLabel>
        {Object.entries(ROUTES).map(([key, item]) => {
          const { self, ...subRoutes } = item;

          const isSectionActive = pathname.includes(self.path);
          const isRouteActive = pathname.endsWith(self.path);
          if (self.type === 'section')
            return (
              <SidebarMenu key={self.name}>
                <SidebarMenuItem className="flex flex-col gap-1">
                  <SidebarMenuButton
                    tooltip={self.name}
                    className={cn(
                      isSectionActive &&
                        'rounded-b-none border-b-2 border-primary bg-primary/10',
                      isRouteActive &&
                        'rounded-b-none border-b-2 border-primary bg-primary/25'
                    )}
                    asChild>
                    <Link href={self.path}>
                      {self.icon && <self.icon />}
                      <span>{self.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            );
        })}
      </SidebarGroup>
    </SidebarContent>
  );
}

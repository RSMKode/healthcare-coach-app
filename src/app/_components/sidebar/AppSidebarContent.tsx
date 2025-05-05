'use client';

import { ROUTES, RoutesT } from '@/app/patients/[patientId]/routes.config';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../components.utils';
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '../ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';

export type AppSidebarContentProps = {};
export function AppSidebarContent() {
  const pathname = usePathname();

  return (
    <SidebarContent className="overflow-x-clip">
      {Object.entries(ROUTES).map(([key, item]) => {
        const { self, ...subRoutes } = item;

        return (
          <SidebarGroup key={`sidebar-group-${self.name}-${self.path}`}>
            <SidebarGroupLabel className="gap-2">
              {self.icon && <self.icon />}
              {self.name}
            </SidebarGroupLabel>

            {Object.entries((subRoutes as RoutesT) ?? {})?.map(
              ([key, item]) => {
                const { self, ...subRoutes } = item;
                const isSectionActive = pathname.includes(self.path);
                const isRouteActive = pathname.endsWith(self.path);

                if (self.type === 'section')
                  return (
                    <SidebarMenu key={self.name}>
                      <Collapsible
                        asChild
                        defaultOpen={isSectionActive || isRouteActive}
                        className="group/collapsible">
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
                          {Object.keys(subRoutes).length ? (
                            <>
                              <CollapsibleTrigger asChild>
                                <SidebarMenuAction className="data-[state=open]:rotate-90">
                                  <ChevronRight />
                                  <span className="sr-only">Toggle</span>
                                </SidebarMenuAction>
                              </CollapsibleTrigger>
                              <CollapsibleContent>
                                <SidebarMenuSub
                                  className={cn(
                                    'border-foreground/20',
                                    isSectionActive && 'border-primary/50'
                                  )}>
                                  {Object.entries(
                                    (subRoutes as RoutesT) ?? {}
                                  )?.map(([key, subItem]) => {
                                    const { self, ...subRoutes } = subItem;

                                    const isSubRouteActive = pathname.endsWith(
                                      self.path
                                    );
                                    const isSubSectionActive =
                                      pathname.includes(self.path);

                                    if (self.type === 'sub-section')
                                      return (
                                        <SidebarMenuSubItem key={self.name}>
                                          <SidebarMenuSubButton
                                            className={cn(
                                              isSubSectionActive &&
                                                'rounded-b-none border-b-2 border-primary bg-primary/10',

                                              isSubRouteActive &&
                                                'rounded-b-none border-b-2 border-primary bg-primary/25'
                                            )}
                                            asChild>
                                            <Link href={self.path}>
                                              {self.icon ? (
                                                <self.icon />
                                              ) : (
                                                item.self.icon && (
                                                  <item.self.icon />
                                                )
                                              )}
                                              <span>{self.name}</span>
                                            </Link>
                                          </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                      );
                                  })}
                                </SidebarMenuSub>
                              </CollapsibleContent>
                            </>
                          ) : null}
                        </SidebarMenuItem>
                      </Collapsible>
                    </SidebarMenu>
                  );
              }
            )}
          </SidebarGroup>
        );
      })}
    </SidebarContent>
  );
}

'use client';

import { getUser } from '@/app/api/user.services';
import { getInitialsFromName } from '@/lib/presenter.lib';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { ChevronsUpDown } from 'lucide-react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar';
import { LogoutButton } from './LogoutButton';

export function AppSidebarFooter() {
  const user = getUser();

  const UserAvatar = (
    <Avatar className="size-8 rounded-lg">
      <AvatarFallback className="font-semibol rounded-lg border-2 border-primary/50 bg-primary/50 font-semibold text-foreground/80 transition hover:bg-primary/80 hover:text-primary-foreground">
        {user &&
          getInitialsFromName(user.name || user.username, { maxLetters: 2 })}
      </AvatarFallback>
    </Avatar>
  );

  return (
    <SidebarFooter>
      <SidebarMenu>
        {user && (
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  tooltip={'Perfil'}
                  size={'lg'}
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                  {UserAvatar}
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="truncate text-xs font-semibold text-primary">
                      {user.role}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 max-w-full rounded-lg border bg-background/70 backdrop-blur p-2 py-1"
                side="bottom"
                align="start"
                sideOffset={4}>
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex max-w-full items-center gap-2 overflow-clip truncate p-1 text-left text-sm">
                    {UserAvatar}
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {user.name}
                      </span>
                      <span className="truncate text-xs font-semibold text-primary">
                        {user.role}
                      </span>
                      <div className="flex flex-col gap-x-2 text-foreground/80">
                        <span className="truncate text-xs text-primary/80">
                          <span className='text-primary/50'>Company</span> {user.company}
                        </span>
                        <span className="truncate text-xs text-primary/80">
                          <span className='text-primary/50'>Email</span> {user.email}
                        </span>
                      </div>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {/* <DropdownMenuItem
                  className="w-full gap-1 hover:cursor-pointer"
                  asChild
                > */}
                  <LogoutButton className="w-full" />
                  {/* </DropdownMenuItem> */}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        )}
      </SidebarMenu>
    </SidebarFooter>
  );
}
